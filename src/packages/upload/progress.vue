<template>
  <div class="rc-progress">
    <!-- element ui 提供了两种 进度条 圆形 svg 长条形的 -->
    <div class="bar">
      <div class="bar-outer" :style="{height: strokeWidth + 'px'}">
        <div class="bar-inner" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineProps, withDefaults, computed, defineComponent} from 'vue'
export default defineComponent({
  name: 'rc-progress'
})
</script>

<script lang="ts" setup>
interface Props {
  strokeWidth?: number,
  percentage: number,
  color?: string
}

interface barStyleType {
  width?: string,
  background?: string
}
let props = withDefaults(defineProps<Props>(), {
  strokeWidth: 6,
  percentage: 0,
  color: 'skyblue'
})
let barStyle = computed(() => {
  let style: barStyleType = {}
  style.width = props.percentage + '%'
  style.background = props.color
  return style
})
</script>


<style lang="scss">
.bar-outer {
  border-radius: 100px;
  background: #eee;
  position: relative;
  vertical-align: middle;
}
.bar-inner {
  transition: width .6s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
