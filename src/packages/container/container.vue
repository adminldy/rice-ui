<template>
  <section class="rc-container" :class="{isVertical}">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import {defineComponent, onMounted, getCurrentInstance} from 'vue'
export default defineComponent({
  name: 'rc-container'
})
</script>

<script lang="ts" setup>
let isVertical: Boolean = true
let subComponentsName: Array<string> = []
interface childType {
  className?: string
}
onMounted(() => {
  const instance = getCurrentInstance()
  let proxy = instance.proxy
  let children = Array.from(proxy.$el.children)
  isVertical = children.some(<T extends childType>(child: T): Boolean => {
    return ['rc-footer', 'rc-header'].includes(child.className)
  })
})
let getSubName = (name: string) => {
  subComponentsName.push(name)
  console.log(name)
}
</script>

<style lang="scss">
.rc-container {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.rc-container .isVertical {
  flex-direction: column;
}
</style>