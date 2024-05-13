import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ChatList from '@/components/ChatList'
import ChatToChat from '@/components/ChatToChat'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ChatList',
      name: 'ChatList',
      component: ChatList
    },
    {
      path: '/ChatToChat',
      name: 'ChatToChat',
      component: ChatToChat
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
