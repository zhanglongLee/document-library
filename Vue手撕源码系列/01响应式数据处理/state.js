
const { observe } = require('./observer/index')
/**
 * initState 总初始化函数，初始化 prop>methods>data>computed>watch 等
 */
function initState(vm) {
  // 获取vm上的$options对象，也就是options对象
  const ops = vm.$options
  if (ops.props) {
    initProps(vm)
  }
  if (ops.data) {
    initData(vm)
  }
  if (ops.computed) {
    initComputed(vm)
  }
  if (ops.watch) {
    initWatch(vm)
  }
}

// 初始化data数据
function initData(vm) {
  let data = vm.$options.data
  // 实例的_data属性就是传入data
  // Vue组件data推荐使用函数，防止数据在组件之间共享
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

  // 把data数据代理到vm 也就是Vue实例上 我们可以使用this.a 来访问 this._data.a
  for (let key in data) {
    proxy(vm, `_data`, key)
  }
  // 对数据进行观测---响应式核心
  observe(data)
}

// 数据代理
function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key]
    },
    set(newValue) {
      object[sourceKey][key] = newValue
    }
  })
}

function initProps() { }
function initComputed() { }
function initWatch() { }

module.exports = {
  initState
}
