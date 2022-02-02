<template>
  <div class="homeWrapper">
    <router-link to="/inputpage" class="linkStyle">
      <rc-button type="primary">跳转到inputPage</rc-button>
    </router-link>
    <router-link to="/selectpage" class="linkStyle">
      <rc-button type="success">跳转到selectPage</rc-button>
    </router-link>
    <router-link to="/uploadpage" class="linkStyle">
      <rc-button type="danger">跳转到uploadPage</rc-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<script lang="ts" setup>


</script>

<style lang="scss">
.homeWrapper {
  padding: 20px;
}
.linkStyle {
  text-decoration: none;
  margin-left: 10px;
}
</style>