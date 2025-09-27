import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// Layouts
import HomeLayout from '@/views/home-layout/index.vue'
import Login from '@/views/login/index.vue'
import MyOrder from '@/views/my-order/index.vue'
import Pay from '@/views/pay/index.vue'
import SearchLayout from '@/views/search-layout/index.vue'
import SearchList from '@/views/search-layout/list.vue'
import ProductDetails from '@/views/product-details/index.vue'

// Home Layout Children
import Home from '@/views/home-layout/home.vue'
import Category from '@/views/home-layout/category.vue'
import Cart from '@/views/home-layout/cart.vue'
import User from '@/views/home-layout/user.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: HomeLayout,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/order', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/search', component: SearchLayout },
    { path: '/search-list', component: SearchList },
    { path: '/product-details/:id', component: ProductDetails }

  ]
})

// Array for routes that do not require authentication
const authRoutes = ['/pay', '/order', '/cart', '/user']

// Global navigation guard
router.beforeEach((to, from, next) => {
  // No authentication required, proceed
  if (!authRoutes.includes(to.path)) {
    next()
    return
  }

  // Check if user is logged in
  const token = store.getters.getUserToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
