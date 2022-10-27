import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vueGoogleCharts";
import "./plugins/apexCharts";
import "./plugins/filter";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueLocalStorage from "vue-localstorage";
import VueSessionStorage from "vue-sessionstorage";
import VeeValidate from "vee-validate";
import VueTimers from "vue-timers";
import Axios from "axios"; // axios
import Notifications from "vue-notification";
import { fb, fs } from "@/plugins/firebase";
import i18n from "./i18n";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import VueCountdown from "@chenfengyuan/vue-countdown";
Vue.component(VueCountdown.name, VueCountdown);
// import { $, jquery } from "jquery";
//window.$ = window.jQuery = require("jquery");

// name is optional
Vue.use(VueLodash, { name: "custom", lodash: lodash });
// Use Notify
// Vue.use(Notify);
Vue.use(VueTimers);
Vue.use(VueSessionStorage);
Vue.use(VueLocalStorage);
Vue.use(VeeValidate);
Vue.use(Notifications);
Vue.config.productionTip = false;

// firebase and firestore
Vue.use(fb);
Vue.use(fs);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

// function no_of_request_increment(no_of_request) {
//   if (no_of_request > 0) {
//     localStorage.setItem("no_of_request", ++no_of_request);
//   } else {
//     localStorage.setItem("no_of_request", 1);
//   }
// }
// function no_of_request_discernment(no_of_request) {
//   if (no_of_request > 0) {
//     localStorage.setItem("no_of_request", --no_of_request);
//   } else {
//     localStorage.setItem("no_of_request", 0);
//   }
// }

Axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // no_of_request_increment(parseInt(localStorage.getItem("no_of_request")));
    // store.commit("SET_LOADING", { color: "primary" });
    // console.log("start loading");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  response => {
    // no_of_request_discernment(parseInt(localStorage.getItem("no_of_request")));
    // if (parseInt(localStorage.getItem("no_of_request")) == 0) {
    //   store.commit("UNSET_LOADING");
    //   console.log("stop loading");
    // }
    return response;
  },
  error => {
    // no_of_request_discernment(parseInt(localStorage.getItem("no_of_request")));
    if (error.response.status == "401") {
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error);
  }
);
