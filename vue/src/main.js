import 'babel-polyfill'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import NProgress from 'nprogress';
import Meta from 'vue-meta'


//폰트어썸
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faTimes } from '@fortawesome/pro-regular-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-light-svg-icons';

//스와퍼 슬라이드
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

//디바이스 체크
import device from "vue-device-detector"

//페이지 로딩
import '../node_modules/nprogress/nprogress.css';

library.add(
  faGlobe,
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueAwesomeSwiper);
Vue.use(Meta)
Vue.use(device)

Vue.config.productionTip = false;

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.beforeEach(function (to, from, next) {
  require('@/assets/CssKr/style.css');
  require('@/assets/CssKr/common.css');
  require('@/assets/CssKr/content.css');
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


// var languageChk = window.location.href;

// if (languageChk.indexOf("/kr") != -1) {
//   require("@/assets/CssKr/style.css");
//   require("@/assets/CssKr/common.css");
//   require("@/assets/CssKr/content.css");
// } else if (languageChk.indexOf("/en") != -1) {
//   require("@/assets/CssEn/style.css");
//   require("@/assets/CssEn/common.css");
//   require("@/assets/CssEn/content.css");
// }
