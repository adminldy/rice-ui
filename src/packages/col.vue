<template>
  <div class="rc-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, defineProps, watch, withDefaults, inject } from "vue";
export default defineComponent({
  name: 'rc-col'
})
</script>

<script lang="ts" setup>
  type ObjorNum = Object | number

  interface Props {
    span?: number,
    offset?: number,
    xs?: ObjorNum,
    sm?: ObjorNum,
    md?: ObjorNum,
    lg?: ObjorNum,
    xl?: ObjorNum
  }

  interface type {
    span?: number,
    offset?: number
  }

  
  const {offset, span, xs, sm, md, lg, xl} = withDefaults(defineProps<Props>(), {
    span: 24,
    offset: 0,
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
  })

  let gutter: number | any = inject('gutter') 

  // 统一管理样式
  let colClass = computed((): Array<String> => {
    let classes = []
    classes.push(`rc-col-${span}`)
    if(offset) { // 说明用户传入的偏移量
      classes.push(`rc-col-offset-${offset}`)
    }
    let typeArr: Array<string> = ['xs', 'sm', 'md', 'lg', 'xl']

    let map = {
      xs,
      sm,
      md,
      lg,
      xl
    }

    typeArr.forEach(type => {
      if(typeof map[type] === 'object') {
        let {span, offset} = map[type]
        span && classes.push(`rc-col-${type}-${span}`)
        offset && classes.push(`rc-col-${type}-${offset}`)
      }else {
        map[type] && classes.push(`rc-col-${type}-${map[type]}`)
      }
    })
    return classes
  })
  
  let colStyle = computed((): Object => {
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
@import '/@/styles/_var.scss';
// 需要通过循环24 来创造出不同的宽度
@for $i from 1 through 24 {
  .rc-col-#{$i} {
    width: calc($i/24) * 100%;
  }
  .rc-col-offset-#{$i} {
    margin-left: calc($i/24) * 100%;
  }
}

@include res(xs) {
  @for $i from 1 through 24 {
    .rc-col-xs-#{$i} {
      width: calc($i/24) * 100%;
    }
    .rc-col-xs-offset-#{$i} {
      width: calc($i/24) * 100%;
    }
  }
}

@include res(sm) {
  @for $i from 1 through 24 {
    .rc-col-sm-#{$i} {
      width: calc($i/24) * 100%;
    }
    .rc-col-sm-offset-#{$i} {
      width: calc($i/24) * 100%;
    }
  }
}

@include res(lg) {
  @for $i from 1 through 24 {
    .rc-col-lg-#{$i} {
      width: calc($i/24) * 100%;
    }
    .rc-col-lg-offset-#{$i} {
      width: calc($i/24) * 100%;
    }
  }
}

@include res(md) {
  @for $i from 1 through 24 {
    .rc-col-md-#{$i} {
      width: calc($i/24) * 100%;
    }
    .rc-col-md-offset-#{$i} {
      width: calc($i/24) * 100%;
    }
  }
}

@include res(xl) {
  @for $i from 1 through 24 {
    .rc-col-xl-#{$i} {
      width: calc($i/24) * 100%;
    }
    .rc-col-xl-offset-#{$i} {
      width: calc($i/24) * 100%;
    }
  }
}
</style>