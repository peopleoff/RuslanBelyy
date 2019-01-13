import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import ContentfulVue from 'contentful-vue';

Vue.use(ContentfulVue, {
  space: 'vc5pfknbvaqs',
  accessToken: '20405780c8cd5af31ce06ad536d92c2200eb0bc9dfce843a957f1f9acd37d636'
});
Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
