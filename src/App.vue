<script lang="ts" setup>
const fn = () => {
  
}
</script>

<template>
  <div>
    <!-- <rc-button type="primary" @click="fn">123</rc-button>
    <rc-button type="info" loading></rc-button>
    <rc-button icon="sousuo" type="primary" iconPosition="right">123</rc-button>
    <rc-button-group>
       <rc-button type="success">成功按钮</rc-button>
       <rc-button type="danger">危险按钮</rc-button>
    </rc-button-group> -->
    <rc-row :gutter="12">
      <rc-col :span="12">
        <div class="red">aaa</div>
      </rc-col>
      <rc-col :span="12">
        <div class="green">bbb</div>
      </rc-col>
    </rc-row>
    <rc-row>
      <rc-col :span="24">
        <div class="green">ddd</div>
      </rc-col>
    </rc-row>
    <rc-row>
      <rc-col :span="6" :offset="6">
        <div class="red">ccc</div>
      </rc-col>
      <rc-col :span="6">
        <div class="green">ddd</div>
      </rc-col>
    </rc-row>
  </div>
</template>

<style lang="scss">
.red {
  background: red;
}
.green {
  background: greenyellow;
}
</style>
