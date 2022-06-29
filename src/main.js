// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//
import App from './App'
import router from './router'
import axios from 'axios';
import qs from 'qs';


Vue.config.productionTip = false
//同意请求前缀
axios.defaults.baseURL='http://localhost:9090/';
//允许携带cookie
axios.defaults.withCredentials=true;
//
Vue.use(ElementUI);
//添加axios请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
	//把所有参数 qs装成 formdata
	config.data=qs.stringify(config.data,{allowDots:true});
	console.info(config.data);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  // 添加axios相应拦截器
  axios.interceptors.response.use(function (response) {
	  //根据后台传递code   判断是否登录   如果403  没有
	  if(response.data.code==403){
		  vue.$router.push("/toLogin");
	  }
      return response;
    }, function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
//把axios 绑定到vue对象
Vue.prototype.$http=axios;
//定义图片访问路径
Vue.prototype.$imgServer="http://localhost:8848/img/";

/* eslint-disable no-new */
let  vue=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
