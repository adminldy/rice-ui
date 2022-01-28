<template>
  <div class="rc-row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, withDefaults, defineProps } from "vue";
export default defineComponent({
  name: 'rc-row'
})
</script>

<script lang="ts" setup>
  interface Props {
    gutter?: number
  }
  
  const {gutter} = withDefaults(defineProps<Props>(), {
    gutter: 0
  })

  onMounted(() => {
      const instance: any = getCurrentInstance()
      let children = Array.from(instance.ctx['$el'].children)
      children.forEach(child => {
        child.gutter = gutter
        console.log(child.gutter)
      })
  })
</script>

<style lang="scss">
.rc-row {
  display: flex;
}
</style>