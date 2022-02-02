<template>
  <!-- 松手并阻止默认行为 -->
  <div class="rc-upload-dragger" @drop.prevent="onDrop" @dragover.prevent @dragleave.prevent>
    <rc-icon icon="shangchuan" class="icon"></rc-icon>
    <span>将文件拖拽到此区域即可</span>
  </div>
</template>

<script lang="ts" setup> 
import {defineProps, withDefaults, defineEmits} from 'vue'
interface Props {
  accept?: string
}
let props = withDefaults(defineProps<Props>(), {
  accept: ''
})
const emit = defineEmits<{
  (e: 'file', num: Object): void,
}>()
let onDrop = (e: Event) => {
  if(!props.accept) {
    // 拖拽数据传递对象
    emit('file', e.dataTransfer.files)
  }else {
    // 进行过滤， 看一下文件后缀 移除掉不需要的文件
    let files = [...e.dataTransfer.files].filter(file => file.name.endsWith(props.accept))
    emit('file', files)
  }
}
</script>

<style lang="scss">
@import '/@/styles/_var.scss';
.rc-upload-dragger {
  background: pink;
  box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
  border: 1px solid #aaa;
  width: 220px;
  height: 180px;
  line-height: 180px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .icon {
    width: 40px;
    height: 40px;
    margin: 70px auto 10px;
  }
}
</style>