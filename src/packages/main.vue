<template>
  <main class="rc-main">
    <slot></slot>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'rc-main'
})
</script>

<style lang="scss">
.rc-main {
  flex: 1;
  padding: 20px;
}
</style>