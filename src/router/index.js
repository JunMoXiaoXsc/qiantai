import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Main from '@/components/Main'
import ShopCar from '@/components/ShopCar'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/',
          name: 'Main',
          component: Main
        },
        {
          path: '/ShopCar',
          name: 'ShopCar',
          component: ShopCar
        },
      ]
    },
    {
      path: '/toLogin',
      name: 'Login',
      component: Login
    }, {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
