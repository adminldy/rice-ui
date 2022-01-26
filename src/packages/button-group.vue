<template>
  <div class="rc-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue'
export default defineComponent({
  name: 'rc-button-group'
})
</script>

<script lang="ts" setup>
   // 校验内部孩子是否是我们的button组件 如果不是报错
    onMounted(() => {
      // 获取当前组件实例
      const instance: any = getCurrentInstance()
      let children = instance.ctx['$el'].children
      for(let i = 0;i < children.length;i++) {
        // assert 第一个参数如果是false 那么打印第二个参数
        console.log(children[i].tagName)
        console.assert(children[i].tagName === 'BUTTON', '子元素必须是button')
      }
    })
</script>
<style lang="scss">
@import '../styles/_var.scss';
.rc-button-group {
  display: inline-flex;
  vertical-align: middle;
  button {
    position: relative;
    border-radius: 0;
    &:not(first-child) {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    &:hover {
      z-index: 1;
    }
    &:active {
      z-index: 2;
    }
  }
}
</style>