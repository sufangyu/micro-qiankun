<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="handleLogin">子应用登录</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
  </div>
</template>

<script>
import actions from '../shared/acticon';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted() {
    console.log('actions =>>', actions);
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('子应用观察者：token 改变前的值为 ', prevState.token);
      console.log('子应用观察者：登录状态发生改变，改变后的 token 的值为 ', state.token);
    }, true);
  },
  methods: {
    handleLogin() {
      // 需要主应用创建初始化了状态
      actions.setGlobalState({
        token: `micro-app-vue-${Date.now()}`,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
