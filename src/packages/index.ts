/**
 * 通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,
 * 在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,
 * 它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块\
 */

// 匹配所有vue
// const req = require.context('./', false, /[^.]+\.vue/)
// 因为vite不能使用require 在vite官方文档中用 import.meta.globEager替代了require.context 他们是一样的效果
import type {App} from 'vue'
const req = import.meta.globEager('./*.vue')

let componentsName: string[] = Object.keys(req).map(key => key)

const components = componentsName.reduce((component: Object | any, module: string) => {
  const mod = req[module]
  component[mod.default.name] = mod.default
  return component
}, {})

const install = (app: App) => {  
  Object.keys(components).forEach(name => {
    app.component(name, components[name])
  });
}

export default {
  install
}