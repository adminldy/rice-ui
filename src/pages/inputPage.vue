<template>
  <div>
    <rc-input v-model="username" type="text" placeholder="请输入内容" name="username" clearable />
    <rc-input v-model="password" type="text" placeholder="请输入内容" name="password" :disabled="true" />
    <rc-input v-model="username" type="text" placeholder="请输入内容" name="username"  show-password  />
    <rc-input v-model="username" type="text" prefix-icon="sousuo"></rc-input>
    <rc-input v-model="username" type="text" suffix-icon="sousuo"></rc-input>
    password: {{password}}
    <rc-button @click="getFormInfo" type="danger">提交</rc-button>
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