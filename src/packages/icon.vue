<template>
    <svg class="rc-icon" aria-hidden="true">
      <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script lang="ts">
import '../styles/icon'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'rc-icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss">
.rc-icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>