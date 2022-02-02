<template>
  <div class="rc-upload">
    <div @click="handleClick" class="rc-upload-btn">
      <slot></slot>
    </div>
    <input type="file" :accept="accept" :multiple="multiple" @change="handleChange" :name="name" ref="input" class="input" />
    <div>
      <slot name="tip"></slot>
    </div>
    <ul>
      <li v-for="file in data.files" :key="file.uid">
        <div class="list-item">
          <rc-icon icon="file"></rc-icon>
          {{file.name}}
          {{file.status}}
          <rc-icon icon="cha"></rc-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {withDefaults, defineProps, ref, onMounted, reactive, watch, effect} from 'vue'
import ajax from './ajax.ts'
export default {
  name: "rc-upload"
}
</script>

<script lang="ts" setup>
// props
interface fileType {
  uid?: number,
  url: string,
  name: string
}
interface Props {
  // name输入框提交到后台的字段名字
  name?: string,
  // action提交到后台的路径
  action: string,
  // 最大限制数
  limit?: number,
  // 是否上传多个
  multiple?: boolean,
  fileList?: Array<fileType>,
  accept?: string,
  // 超出限制后， 会执行此方法
  onExceed?: Function,
  onChange?: Function,
  onSuccess?: Function,
  onError?: Function,
  onProgress?: Function,
  beforeUpload?: Function,
  httpRequset?: Function // 我会默认提供一个ajax， 如果你传了会用你的
}

let props = withDefaults(defineProps<Props>(), {
  name: 'file',
  action: '',
  accept: '',
  onProgress: () => {

  },
  onSuccess: () => {

  },
  onError: () => {

  },
  onChange: () => {

  }
})

let input: any = ref(null)

let tempIndex = ref(1)

// data
let data = reactive({
  files: [],
  reqs: {}
})

// methods
let handleClick = () => {
  input.value.value = ''
  input.value.click()
}

let handleStart = (rawFile: any) =>  {
  rawFile.uid = Math.random() + tempIndex.value++
  let file = { // 构建文件信息
    status: 'ready', // 默认准备上传
    name: rawFile.name, // 文件名
    size: rawFile.size, // 上传图片的大小
    percentage: 0, // 上传的进度
    uid: rawFile.uid,
    raw: rawFile
  }
  data.files.push(file)
  props.onChange && props.onChange(file)
}

let getFile = (rawFile) => {
  return data.files.find(file => file.uid === rawFile.uid)
}

let handleProgress = (ev, rawFile) => {
  // 给不同的状态
  // 通过源文件 用户上传的文件 => 我格式化的结果
  let file = getFile(rawFile) // 这个file就是当前格式化后的
  file.status = 'uploading'
  file.percent = ev.percent || 0 // 赋值上传进度
  props.onProgress(ev, rawFile) // 调用用户的回调
}

let handleSuccess = (res, rawFile) => {
  let file = getFile(rawFile)
  file.status = 'success'
  props.onSuccess(res, rawFile)
  props.onChange(file)
  data.reqs[file.uid]
}

let handleError = (err, rawFile) => {
  let file = getFile(rawFile)
  file.status = 'fail'
  props.onError(err, rawFile)
  props.onChange(file)
  delete data.reqs[file.uid] // 已经失败的ajax 不需要后续在中断请求了
}

let post = (rawFile: any) => {
  // 真正的上传逻辑
  // 调用httpRequest方法
  // 需要整合一下参数， 调用ajax需要传递参数
  const uid = rawFile.uid
  const options = {
    file: rawFile, // 源文件
    filename: props.name, // avatar
    action: props.action,
    onProgress: ev => {
      // 处理上传的中的状态
      handleProgress(ev, rawFile)
    },
    onSuccess: res => {
      // 处理成功的状态
      console.log(`上传成功`, res)
      handleSuccess(res, rawFile)
    },
    onError: err => {
      // 处理失败时的状态
      console.log(`上传`, err)
      handleError(err, rawFile)
    }
  }
  // req就是当前的请求
  let req
  if(props.httpRequset) {
    req = props.httpRequset(options)
  }else {
    req = ajax(options)
  }
  data.reqs[uid] = req // 每个ajax先存起来， 稍后可以取消请求
  // 允许用户时使用的promise的ajax
  if(req?.then) {
    req.then(options.onSuccess, options.onError)
  }
}

let upload = (rawFile: any) => {
  // 上传文件
  // 先判断这个文件是否能够上传， 没有任何限制直接上传即可
  if(!props.beforeUpload) {
    // 直接上传
    post(rawFile)
  }
  // 否则需要调用用户的函数， 获取他的返回值
  let flag =  props.beforeUpload(rawFile)
  if(flag) {
    post(rawFile)
  }
}

// 
let uploadFiles = (files: any) => {
  // 限制上传是否到最大条件
  if(props.limit && props.fileList?.length + files.length > props.limit) {
    return props.onExceed && props.onExceed(files, props.fileList)
  }
  [...files].forEach(rawFile => {
    // 用户的文件 我需要做一些处理 可能用户频繁上传同一个文件
    // 将文件格式化成我最想要的结果
    handleStart(rawFile)
    upload(rawFile)
  })
}

// 文件变化
let handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  uploadFiles(files)
}

// 生命周期
onMounted(() => {
  
})


effect(() => {
  data.files = props.fileList?.map((item: any) => {
    item.uid = Date.now() + tempIndex.value++
    item.status = 'success'
    return item
  })
})
</script>


<style lang="scss">
.rc-upload {
  .rc-upload-btn {
    display: inline-block;
  }
  .input {
    display: none;
  }
}
</style>