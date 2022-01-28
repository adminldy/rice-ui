<template>
  <div class="rc-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, defineProps, watch, withDefaults } from "vue";
export default defineComponent({
  name: 'rc-col'
})
</script>

<script lang="ts" setup>
  interface Props {
    span?: number,
    offset?: number
  }
  
  const {offset, span} = withDefaults(defineProps<Props>(), {
    span: 24,
    offset: 0
  })

  let gutter = 0
  
  // 统一管理样式
  let colClass = computed(() => {
    let classes = []
    classes.push(`rc-col-${span}`)
    if(offset) { // 说明用户传入的偏移量
      classes.push(`rc-col-offset-${offset}`)
    }
    return classes
  })
  
  let colStyle = computed(() => {
    let style = {}
    if(gutter) {
      style = {
        ...style,
        paddingLeft: gutter / 2 + 'px',
        paddingRight: gutter / 2 + 'px'
      } 
    }
    return style
  })
</script>

<style lang="scss">
// 需要通过循环24 来创造出不同的宽度
@for $i from 0 through 24 {
  .rc-col-#{$i} {
    width: calc($i/24) * 100%;
  }
  .rc-col-offset-#{$i} {
    margin-left: calc($i/24) * 100%;
  }
  
}
</style>