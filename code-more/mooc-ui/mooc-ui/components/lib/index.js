import Demo from './demo'
import Card from './card'
import Utils from './utils/utils'

const components = {
  Demo,
  Card
}

const install = function(Vue){
  if(install.installed) return;
  Object.keys(components).forEach(key=>{
    Vue.component(components[key].name,components[key])
  });
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// 按需引入
export {
  Demo,
  Card,
  Utils,
  install
}
// 全局引入
export default{
  Demo,
  Card,
  Utils,
  install
}

