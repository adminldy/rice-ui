<template>
  <div class="rc-input">
    <input 
    :type="type" 
    :value="modelValue" 
    :placeholder="placeholder"
    :name="name"
    @input="inputEvent($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, withDefaults, defineEmits, watch, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'rc-input'
})
</script>

<script lang="ts" setup>
 interface Props {
   name?: string,
   type?: string,
   placeholder?: string,
   modelValue?: string
 }

let props = withDefaults(defineProps<Props>(), {
  name: '',
  type: '',
  placeholder: '请输入内容',
  modelValue: ''
})

 const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

const inputEvent = (e: Event) => {
  let input = (e.target as HTMLInputElement).value  
  emit('update:modelValue', input)
}
 
</script>

<style lang="scss" scoped>
@import '/@/styles/_var.scss';
.rc-input {
  display: inline-flex;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
  }
}
</style>