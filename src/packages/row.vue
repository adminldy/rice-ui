<template>
  <div class="rc-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, withDefaults, defineProps, provide, computed } from "vue";
export default defineComponent({
  name: 'rc-row'
})
</script>

<script lang="ts" setup>
  interface Props {
    gutter?: number,
    justify: string
  }
  
  const {gutter, justify} = withDefaults(defineProps<Props>(), {
    gutter: 0,
    justify: ''
  })
  
  let justifyArr = ['start', 'end', 'center', 'space-around', 'space-between']

  if(justify && !justifyArr.includes(justify)) {
    console.error(`类型必须是${justifyArr.join(`、`)}`)
  }

  const rowStyle = computed(() => {
    let style = {}
    if(gutter) {
      style = {
        ...style,
        marginLeft: -gutter / 2 + 'px',
        marginRight: -gutter / 2 + 'px'
      }
    }
    if(justify) {
      let key = ['start', 'end'].includes(justify) ? `flex-${justify}` : justify
      style = {
        ...style,
        justifyContent: key
      }
    }
    return style
  })

  provide('gutter', gutter)
</script>

<style lang="scss">
.rc-row {
  display: flex;
}
</style>