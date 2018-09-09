import Home from '@/components/Home'
import Kind from '@/components/Kind'
import Cart from '@/components/Cart'
import User from '@/components/User'
import Register from '@/components/Register'
import Login from '@/components/Login'
import MainFooter from '@/components/MainFooter'
import Header from '@/components/Header'

// 定义路由的规则以及匹配的组件
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
      {
         path: '/home',
         components: {
            header: Header,
            content:Home,
            footer: MainFooter
        }
      },
    {
        path: '/kind',
        components: {
            header: Header,
            content:Kind,
            footer: MainFooter
        }
    },
    {
        path: '/cart',
        components: {
            header: Header,
            content:Cart,
           footer: MainFooter     
        }
    },
    {
        path: '/user',
        components: {
            header: Header,                     
            content:User,
            footer: MainFooter    
        }
    },
    {
        path: '/register',
        components: {                    
            content:Register 
        }
    },
    {
        path: '/login',
        components: {                    
            content:Login 
        }
    }
]

export default routes
