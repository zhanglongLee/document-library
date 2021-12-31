import Vue from 'vue'
import App from './App.vue'
// import '../components/css/demo.scss';
// import Demo from '../components/lib/demo/index.js'
// import '../components/css/card.scss';
// import Card from '../components/lib/card/index.js'

// Vue.use(Demo);
// Vue.use(Card);

import '../components/css/index.scss';
import Mui from '../components/lib/index.js';
console.log(Mui.Utils);
Vue.use(Mui);

// import '../components/css/card.scss';
// import {Card} from '../components/lib/index.js';
// console.log(Card);
// Vue.use(Card);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
