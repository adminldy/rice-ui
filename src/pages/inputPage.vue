<template>
  <div>
    <rc-input v-model="password" type="password" placeholder="请输入内容" name="password"></rc-input>
    <rc-button @click="getFormInfo" type="danger">提交</rc-button>
    {{password}}
  </div>
</template>

<script lang="ts">
import {defineComponent, watch} from 'vue'
export default defineComponent({
  name: 'inputpage'
})
</script>

<script lang="ts" setup>
let username = 'zs'

let password = '123'

let getFormInfo = () => {
  console.log(username)
  console.log(password)
}

</script>