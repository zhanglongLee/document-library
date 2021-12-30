import Demo from './src/main.vue';

Demo.install = function (Vue) {
    Vue.component(Demo.name, Demo);
}

export default Demo;