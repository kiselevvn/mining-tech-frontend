import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default route(function ({ store /*, ssrContext */ }) {
  // const createHistory = process.env.SERVER
  //   ? createMemoryHistory
  //   : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
    history: createWebHistory('/')
  })

  Router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem('user')
    // console.log(loggedIn)
    const publicPages = ['/', '/login', '/login', '/login', '/register', '/products', '/cart', '/create-profile', '/privacy']
    const authRequired = !publicPages.includes(to.path)
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (to.path === '/') {
      next({ name: 'products' })
    }
    if (authRequired && !loggedIn) {
      console.log('redirect login')
      next({ name: 'products' })
    } else {
      next()
    }
  })

  return Router
})
