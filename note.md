#### defineProps

```ts
interface Props {
  msg?: string,
  labels: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

#### defineEmits

```vue
<template>
  <div @click="clickThis">点我</div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', num: number): void
}>()

const clickThis = () => {
  emit('click', 2)
}
</script>
```

#### defineExpost

组件暴露自己的属性

| 子组件
```vue
<template>
  <div>子组件 helloworld</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123)
defineExpose({
  count
})
</script>
```

| 父组件

```vue
<template>
  <div>父组件</div>
  <helloworld ref="hello"></helloworld>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const hello = ref(null)
const helloClick = () => {
  console.log(hello.value.count)
}
</script>
```
