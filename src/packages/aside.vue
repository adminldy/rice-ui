<template>
  <aside class="rc-aside" :style="{width}">
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import {defineComponent, withDefaults, defineProps} from 'vue'
export default defineComponent({
  name: 'rc-aside'
})
</script>

<script lang="ts" setup>
interface Props {
  width?: string
}

let {width} = withDefaults(defineProps<Props>(), {
  width: '300px'
})
</script>

<style lang="scss"></style>