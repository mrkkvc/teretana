import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewMember from "@/views/NewMember";
import Member from "@/views/Member";
import Login from "@/views/Login";
import Register from "@/views/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit',
    name: 'NewMember',
    component: NewMember
  },
  {
    path: '/member/:id',
    name: 'Member',
    component: Member
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
