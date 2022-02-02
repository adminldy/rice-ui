<template>
  <div class="rc-input" :class="inputClass">
    <rc-icon :icon="prefixIcon" v-if="prefixIcon"></rc-icon>
    <input 
    ref="input"
    :type="showPassword? (passwordVisible ? 'text' : 'password'): type" 
    :value="modelValue" 
    :placeholder="placeholder"
    :disabled="disabled"
    :name="name"
    @input="inputEvent($event)"
    />
    <rc-icon :icon="suffixIcon" v-if="suffixIcon"></rc-icon>
    <rc-icon icon="qingkong" v-if="clearable && modelValue" @click="$emit('update:modelValue', '')"></rc-icon>
    <rc-icon icon="eye" v-if="showPassword && modelValue" @click="changeStatus"></rc-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps, withDefaults, defineEmits, watch, ref, getCurrentInstance, computed, nextTick } from 'vue'
export default defineComponent({
  name: 'rc-input'
})
</script>

<script lang="ts" setup>
 interface Props {
   name?: string,
   type?: string,
   placeholder?: string,
   modelValue?: string,
   disabled?: boolean,
   clearable?: boolean,
   showPassword?: boolean,
   prefixIcon?: string,
   suffixIcon?: string
 }

let props = withDefaults(defineProps<Props>(), {
  name: '',
  type: '',
  placeholder: '请输入内容',
  modelValue: '',
  disabled: false,
  clearable: false,
  showPassword: false,
  prefixIcon: '',
  suffixIcon: ''
})

  let passwordVisible = ref(false)
  let input: any = ref(null)

 const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

const inputEvent = (e: Event) => {
  let input = (e.target as HTMLInputElement).value  
  emit('update:modelValue', input)
}

const inputClass = computed((): Array<string> => {
  let classes = []
  if(props.clearable || props.showPassword || props.suffixIcon) {
    classes.push(`rc-input-suffix-icon`)
  }
  if(props.prefixIcon) {
    classes.push(`rc-input-prefix-icon`)
  }
  return classes
})

const changeStatus = () => {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => {
    input.value.focus()
  })
}
 
</script>

<style lang="scss" scoped>
@import '/@/styles/_var.scss';
.rc-input {
  display: inline-flex;
  position: relative;
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
    &[disabled] {
      cursor: not-allowed;
      background: #eee;
    }
  }
}
.rc-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .rc-icon {
    position: absolute;
    right: 8px;
    top: 13px;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}

.rc-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .rc-icon {
    position: absolute;
    left: 8px;
    top: 13px;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}
</style>