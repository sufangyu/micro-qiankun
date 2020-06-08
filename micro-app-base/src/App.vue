<template>
  <div id="container">
    <button @click="handleLogin">登录</button>
    <!-- <div v-if="loading">loading</div> -->
    <!-- <div class="appContainer" v-html="content">content</div> -->

    <!-- 子应用盒子 -->
    <div id="root-view" class="app-view-box" v-html="content"></div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import actions from '@/shared/actions';

export default {
  name: 'App',
  props: {
    loading: Boolean,
    content: String,
  },
  // `mounted` 是 Vue 的生命周期钩子函数，在组件挂载时执行
  mounted() {
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('主应用观察者：token 改变前的值为 ', prevState.token);
      console.log('主应用观察者：登录状态发生改变，改变后的 token 的值为 ', state.token);
    });
  },
  methods: {
    handleLogin() {
      // 登录成功后，设置 token
      actions.setGlobalState({ token: Date.now() });
    },
  },
};
</script>
