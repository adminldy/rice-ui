<script lang="ts" setup>
const fn = () => {
  
}
</script>

<template>
  <div>
    <rc-button type="primary" @click="fn">123</rc-button>
    <rc-button type="info" loading></rc-button>
    <rc-button icon="sousuo" type="primary" iconPosition="right">123</rc-button>
    <rc-button-group>
       <rc-button type="success">成功按钮</rc-button>
       <rc-button type="danger">危险按钮</rc-button>
    </rc-button-group>
  </div>
</template>

<style>

</style>
