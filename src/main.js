import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueI18n from 'vue-i18n'
import PortalVue from 'portal-vue'


import {library} from '@fortawesome/fontawesome-svg-core'
import {faArrowRight, faGlobe, faFileAlt, faEnvelope, faUser, faAt, faUpload} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faTelegram,
  faMedium,
  faLinkedin,
  faFacebook,
  faDiscord,
  faYoutube,
  faTwitch,
  faTiktok,
  faSnapchatGhost
} from '@fortawesome/free-brands-svg-icons'
import {faCopy} from '@fortawesome/free-regular-svg-icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import en from './locale/en'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

library.add(faArrowRight, faFacebookF, faTwitter, faInstagram, faTelegram, faMedium, faLinkedin, faFacebook, faGlobe, faDiscord, faYoutube, faTwitch, faTiktok, faSnapchatGhost, faFileAlt, faEnvelope, faUser, faAt, faUpload, faCopy)


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueLoading)
Vue.use(VueI18n)
Vue.use(PortalVue)
Vue.use(VueAxios, axios)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const messages = {en}
const i18n = new VueI18n({
  locale: 'en',
  messages
})

Vue.config.productionTip = false


 new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.BACKEND_URL = 'http://localhost:3000';




