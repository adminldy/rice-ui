<template>
  <button class="rc-button" :class="btnClass" :disabled="loading" @click="clickBtn($event)">
    <!-- 普通icon -->
    <rc-icon :icon="icon" v-if="icon && !loading" class="icon"></rc-icon>
    <!-- loading的icon -->
    <rc-icon icon="jiazai" v-if="loading" class="icon"></rc-icon>
    <!-- 文本内容 -->
    <span>
      <slot></slot>
    </span>
  </button>
</template>
 
<script lang="ts">
 import { defineComponent, computed, defineProps, withDefaults, defineEmits, onMounted} from 'vue'
 export default defineComponent({
    name: 'rc-button',
 })
 </script>
 
<script lang="ts" setup>
    // props
    interface Props {
      type?: string,
      icon?: string,
      iconPosition?: string,
      loading?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
      type: '',
      icon: '',
      iconPosition: 'left',
      loading: false
    })

    if(props.type && !['warning', 'success', 'danger', 'info', 'primary'].includes(props.type)) {
      console.error(`type类型必须为 ${['warning', 'success', 'danger', 'info', 'primary'].join('、')}`)
    }

    if(!['left', 'right'].includes(props.iconPosition)) {
      console.error(`iconPosition属性必须为: left | right`)
    }
    
    // emit
    const emit = defineEmits<{
      (e: 'click', num: number): void,
    }>()

    const clickBtn = (e: any) => {
      emit('click', e)
    }

    let btnClass = computed(() => {
      let classes = []
      if(props.type) {
        classes.push(`rc-button-${props.type}`)
      }
      if(props.iconPosition) {
        classes.push(`rc-button-${props.iconPosition}`)
      }
      return classes
    })
</script>

<style lang="scss">
// 设置button默认样式
@import '/@/styles/_var.scss';
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;
.rc-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  line-height: 1;
  height: $height;
  font-size: $font-size;
  cursor: pointer;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  // 防止选取div元素的文本
  user-select: none;
  &:hover {
    border-color: $border-color;
    background-color: $background;
    color: $active-color;
    outline: none;
    border: 1px solid $active-color;
  }
  &:active {
    color: $active-color;
    border: 1px solid $active-color;
    outline: none;
    background-color: $background;
  }
  // $type相当于key $color相当于value
  @each $type, $color in (primary: $primary, success: $success, info: $info, warning: $warning, danger: $danger) {
    &-#{$type} {
        background: #{$color};
        border: 1px solid #{$color};
        color: #fff;
        fill: #fff;
    }
  }

 @each $type, $color in (primary: $primary-hover, success: $success-hover, info: $info-hover, warning: $warning-hover, danger: $danger-hover) {
    &-#{$type}:hover {
        background: #{$color};
        border: 1px solid #{$color};
        color: #fff;
        fill: #fff;
    }
  }

  @each $type, $color in (primary: $primary-active, success: $success-active, info: $info-active, warning: $warning-active, danger: $danger-active) {
    &-#{$type}:active {
        background: #{$color};
        border: 1px solid #{$color};
        color: #fff;
    }
  }
  
  .icon {
    width: 16px;
    height: 16px;
  }
  // 调整顺序
   &-left {
    svg {order: 1;margin-right: 4px;margin-left: 0};
    span {order: 2;};
   }

   &-right {
    svg {order: 2};
    span {order: 1;margin-left: 0px;margin-right: 4px;};
   }
   &[disabled] {
     cursor: not-allowed;
   }
}
</style>