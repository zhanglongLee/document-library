# linkCli
## 一个快速搭建和开发前端项目的脚手架

> 正式版本在公司内部使用，这个属于demo版本

如何安装？

```shell
npm install linkCli -g
```

## 创建项目

vue常规模板：

* vue.config.js（vue的常规配置）
* axios（网络请求axios的安装以及二次封装）
* vue-router（router的安装和配置，另外有路由的动态加载）
* vuex（vuex的安装和配置，另外有动态加载子模块）

vue主应用（qiankun-vue-main）

vue子应用（qiankun-vue-sub）

> 这里为了演示，qiankun项目的模板从qiankun官方github下载

创建项目

```shell
linkCli create your_project_name
例如：linkCli create demo1
```

自动拉取项目模板、安装项目依赖、自动启动项目

## 查看项目模板列表

```shell
linkCli list
```

##  新增项目模板

```shell
linkCli add template_name gitRepo_address
例如：linkCli add demo1 www.github.com/demo1/demo.git
```

##  删除项目模板

```shell
linkCli delete template_name
例如：linkCli delete demo1
```



## 项目开发

项目开发目前提供三个功能：

* 创建Vue组件
* 创建Vue页面，并配置路由
* 创建Vuex子模块



### 创建Vue组件：

````shell
linkCli addcpn YourComponentName # 例如linkCli add NavBar，默认会存放到src/components文件夹中
linkCli addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````



### 创建Vue页面，并配置路由

```shell
linkCli addpage YourPageName # 例如linkCli addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
linkCli addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

为什么会创建router.js文件：

* `router.js`文件是路由的其中一个配置；
* 创建该文件中 `src/router/index.js`中会自动加载到路由的 `routes`配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）

`src/router/index.js`中已经完成如下操作：

```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```



### 创建Vuex子模块

```shell
linkCli addstore YourVuexChildModuleName # 例如linkCli addstore home，默认会放到src/store/modules/home/index.js和types.js
linkCli addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
```

创建完成后，不需要手动配置，已经动态将所有子模块集成进去：

```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```


