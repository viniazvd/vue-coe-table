import Vue from 'vue'
// import Index from './Index.vue'
import Example from './example/Index.vue'

Vue.config.productionTip = false

// new Vue({ render: h => h(Index) }).$mount('#app')
new Vue({ render: h => h(Example) }).$mount('#app')
