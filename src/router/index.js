import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Home2 from '../components/Home2.vue'
import Welcome from '../components/Welcome.vue'
import Welcome2 from '../components/Welcome2.vue'
import First from '../components/user/First.vue'
import User from '../components/user/User.vue'
import Association1 from '../components/user/Association1.vue'
import Activity1 from '../components/user/Activity1.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, // 重定位
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/Welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/first', component: First },
        { path: '/user', component: User },
        { path: '/association1', component: Association1 },
        { path: '/activity1', component: Activity1 }
      ]
    },
    {
      path: '/home2',
      component: Home2,
      redirect: '/Welcome2',
      children: [
        { path: '/welcome2', component: Welcome2 }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
