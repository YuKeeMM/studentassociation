import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import First from '../components/user/First.vue'
import User from '../components/user/User.vue'
import Association1 from '../components/user/Association1.vue'
import AssociationMy from '../components/user/AssociationMy.vue'
import Activity1 from '../components/user/Activity1.vue'
import ActivityMy from '../components/user/ActivityMy.vue'
import Home2 from '../components/Home2.vue'
import Welcome2 from '../components/Welcome2.vue'
import First2 from '../components/chief/First2.vue'
import User2 from '../components/chief/User2.vue'
import Association12 from '../components/chief/Association12.vue'
import AssociationMy2 from '../components/chief/AssociationMy2.vue'
import Activity12 from '../components/chief/Activity12.vue'
import ActivityMy2 from '../components/chief/ActivityMy2.vue'
import Home3 from '../components/Home3.vue'
import Welcome3 from '../components/Welcome3.vue'

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
        { path: '/associationmy', component: AssociationMy },
        { path: '/activity1', component: Activity1 },
        { path: '/activitymy', component: ActivityMy }
      ]
    },
    {
      path: '/home2',
      component: Home2,
      redirect: '/Welcome2',
      children: [
        { path: '/welcome2', component: Welcome2 },
        { path: '/first2', component: First2 },
        { path: '/user2', component: User2 },
        { path: '/association12', component: Association12 },
        { path: '/associationmy2', component: AssociationMy2 },
        { path: '/activity12', component: Activity12 },
        { path: '/activitymy2', component: ActivityMy2 }
      ]
    },
    {
      path: '/home3',
      component: Home3,
      redirect: '/Welcome3',
      children: [
        { path: '/welcome3', component: Welcome3 }
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
