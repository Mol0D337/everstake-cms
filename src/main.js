import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import router from './router';
import store from './store';
import './plugins/bootstrapVue';
import i18n from './i18n';
import './plugins/vueAxios';
import './plugins/firebasePlugin';
import './plugins/vueMultiselect';
import './plugins/vueClipboard2';
import './scss/app.scss';
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)
Vue.use(Antd);

Vue.config.productionTip = false

Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);

let app;

Vue.prototype.$auth.onIdTokenChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
