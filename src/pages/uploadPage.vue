<template>
  <div>
    <rc-upload 
      name="avatar" 
      action="http://localhost:3001/upload"
      :accept="data.accept"
      :limit="3"
      :multiple="true"
      :file-list="data.fileList"
      :onChange="handleChange"
      :onExceed="handleExceed"
      :beforeUpload="beforeUpload"
    >
      <rc-button type="primary" icon="shangchuan">点击上传</rc-button>
      <template v-slot:tip>
        <p>只能上传jpg/png文件， 且不超过500kb</p>
      </template>
    </rc-upload>
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity'
export default {
  name: 'uploadpage',
}
</script>

<script lang="ts" setup>
let data = reactive({
  fileList: [{url: '', name: '123'}, {url: '', name: '234'}],
  accept: 'image/jpeg'
})

let handleExceed = (files: Array<Object>, fileList: Array<Object>) => {
  // console.log(`用户传递的已经超过预期`)
  
}

let handleChange = (file: Object) => {
  // console.log(file, '当前更新了')
}

let beforeUpload = (rawFile: any) => {
  let limitSize = rawFile.size / 1024 > 500
  if(limitSize) {
    console.log(`当前超过了最大限制`)
    return false
  }else if(!rawFile.name.endsWith('.jpg')) {
      console.log(`文件类型不对`)
      return false
  }
  return true
}
</script>

<style lang="scss" scoped>

</style>
