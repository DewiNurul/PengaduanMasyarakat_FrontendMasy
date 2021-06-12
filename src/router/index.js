import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Pengaduan from '../views/Pengaduan.vue'
import Register from '../views/Register.vue'
import store from '../store'
import Navbar from '../views/Navbar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login,}
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register,}
  },
  {
    path: '/',
    name: 'pengaduan',
    components: {default: Pengaduan, header: Navbar},
    meta: { 
      requiresAuth: true
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})


export default router

