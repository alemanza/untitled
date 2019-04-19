import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Tos from './views/Tos.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'

import Firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tos',
      name: 'Tos',
      component: Tos
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    }
  ]
})


router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('/login')
  else if (requiresAuth && currentUser) next()
  else next()
})



export default router