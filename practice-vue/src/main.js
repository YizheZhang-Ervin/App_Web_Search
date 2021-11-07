import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './Router/router.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
require("./Mock/mock.js")

Vue.config.productionTip = false

// UI
Vue.use(iView);

// 路由
Vue.use(VueRouter);
const RouterConfig = {
    routes: routes
};
const router = new VueRouter(RouterConfig);

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');