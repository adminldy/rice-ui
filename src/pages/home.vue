<template>
  <div class="homeWrapper">
    <router-link to="/inputPage" class="linkStyle">
      <rc-button type="primary">跳转到inputPage</rc-button>
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
}
</style>