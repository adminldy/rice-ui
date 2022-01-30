import { createRouter, createWebHistory } from 'vue-router'

const req = import.meta.globEager('../pages/*.vue')

let pagesName: string[] = Object.keys(req).map(key => key)

interface route {
  path: string,
  redirect?: string,
  component?: Object
}

let routes: Array<route> | any = [{
  path: '/',
  redirect: '/home'
}]


let addRoutes: Array<route> = pagesName.map((module: string) => {
  const mod = req[module]
  let pageObj = {
    path: `/${mod.default.name}`,
    component: mod.default
  }
  return pageObj
})


routes = [...routes, ...addRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router