import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '@/views/Create'
import ViewOrder from '@/views/ViewOrder'
import CreateSelect from '@/views/Create-select'
import Contact from "../views/Contact";
import Explore from "../views/Explore";
import Terms from "../views/Terms";
import About from "../views/About";
import Privacy from "../views/Privacy";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    props: true,
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    component: () => import('@/views/EditProfile'),
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile'),
    props: true,
  },
  {
    path: '/Create-select',
    name: 'Create-select',
    component: CreateSelect,
    props: true,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    props: true,
  },
  {
    path: '/view-order/:chain/:order',
    name: 'ViewOrder',
    component: ViewOrder,
    props: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    props: true,
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: true,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    props: true,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
