<template>
  <div>
    <rc-input v-model="password" type="password" placeholder="请输入内容" name="username" />
    <rc-button @click="getFormInfo" type="danger">提交</rc-button>
    password: {{password}}
  </div>
</template>

<script lang="ts">
import {defineComponent, watch, ref} from 'vue'
export default defineComponent({
  name: 'inputpage'
})
</script>

<script lang="ts" setup>
let username = ref('zs')

let password = ref('123')  

let getFormInfo = () => {
  console.log(username.value)
  console.log(password.value)
}

</script>