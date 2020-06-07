import { registerMicroApps, setDefaultMountApp, start } from 'qiankun';
import Vue from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import App from '../App.vue';
import router from '../router';
import store from '../store';

let app = null;

/**
 * 渲染函数
 * appContent 子应用html内容
 * loading 子应用加载效果，可选
 *
 * @param {*} [{ appContent, loading }={}]
 * @returns
 */
function render({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}

/**
 * 路由监听
 *
 * @param {*} routerPrefix 前缀
 * @returns
 */
function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix);
}


function initApp() {
  render({ appContent: '', loading: true });
}

initApp();

// 传入子应用的数据
const msg = {
  data: {
    auth: false,
  },
  fns: [
    {
      name: '_LOGIN',
      LOGIN(data) {
        console.log(`父应用返回信息${data}`);
      },
    },
  ],
};

// 注册子应用
registerMicroApps(
  [
    {
      name: 'vueApp',
      entry: '//localhost:7101',
      render,
      activeRule: genActiveRule('/vue'),
      props: msg,
    },
  ],
  {
    beforeLoad(microApp) {
      NProgress.start();
      console.log('before load', microApp.name);
      return Promise.resolve();
    },
    afterMount(microApp) {
      NProgress.done();
      console.log('after mount', microApp.name);
      return Promise.resolve();
    },
  },
);

// 设置默认子应用,与 genActiveRule中的参数保持一致
setDefaultMountApp('/vue');

// 启动
start();
