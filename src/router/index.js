import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Dashboard from '@/components/Dashboard'
// import UserList from '@/components/user/list'
// import BookList from '@/components/book/list'
// import BookCategoryList from '@/components/bookcategory/list'
// import Profile from '@/components/user/profile'
// import Changepwd from '@/components/user/changepwd'

// 懒加载方式，当路由被访问时才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
const Home = resolve => require(['@/components/Home'], resolve)
const Dashboard = resolve => require(['@/components/Dashboard'], resolve)
const BookList = resolve => require(['@/components/book/list'], resolve)
const BookCategoryList = resolve => require(['@/components/bookcategory/list'], resolve)
const UserList = resolve => require(['@/components/user/list'], resolve)
const Changepwd = resolve => require(['@/components/user/changepwd'], resolve)
const Profile = resolve => require(['@/components/user/profile'], resolve)
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {
          path: '/dashboard', component: Dashboard, name: '首页', menuShow: true
        }
      ]
    },
    {
      path: '/',
      name: '用户管理',
      component: Home,
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    },
    {
      path: '/',
      name: '图书管理',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/book/list', component: BookList, name: '图书列表', menuShow: true},
        {path: '/book/category', component: BookCategoryList, name: '图书分类', menuShow: true}
      ]
    }, {
      path: '/',
      name: '设置',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: Profile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: Changepwd, name: '修改密码', menuShow: true}
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
export default router
