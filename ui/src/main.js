// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' 
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
const url = '/chat' /*设置全局请求地址*/

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("x-auth-token");
    if (token) {
      config.headers.token = `${token}`;
    }
    if (config.url.indexOf(url) === -1) {
      config.url = url + config.url;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

var post=function post(url, params) {
  return new Promise((resolve, reject) => {
      axios.post(url,params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err => {
          reject(err)
      })
  });
}

Vue.prototype.$urlContextPath = url;
Vue.prototype.$axios = axios;
Vue.prototype.$post = post;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: {
    App
  },
  template: '<App/>'
})
