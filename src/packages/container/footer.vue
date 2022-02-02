<template>
  <footer class="rc-footer">
    <slot></slot>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'rc-footer'
})
</script>

<style lang="scss">
.rc-footer {
  height: 60px;
}
</style>