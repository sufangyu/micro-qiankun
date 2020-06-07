<template>
  <div id="container">
    <div v-if="loading">loading</div>
    <!-- <div class="appContainer" v-html="content">content</div> -->
    <!-- 子应用盒子 -->
    <div id="root-view" class="app-view-box" v-html="content"></div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    loading: Boolean,
    content: String,
  },
};
</script>
