import Vue from 'vue'
window.Vue = Vue;
import App from './App.vue'
import login from './components/login'
import index from './components/index'
import user_management from './components/user_management'
import manage_anzeige from './components/manage_anzeige'
import edit_anzeige from './components/edit_anzeige'
import view_anzeige from './components/view_anzeige'
import view_users from './components/view_users'
import email_bestatigung from './components/email_bestatigung'
import referenz_anmeldungen from './components/referenz_anmeldungen'
window.$ = require('jquery')
window.JQuery = require('jquery')
import VueRouter from 'vue-router';
import VueSession from 'vue-session'



Vue.use(VueSession)
Vue.use(VueRouter)
const routes= [
  {     path: '/login',
        component: login
    },{
        path: '/',
        component: index
    },{
        path: '/edit_anzeige/:anzeigeid?',
        component: edit_anzeige,
        name: 'edit_anzeige'
    },{
        path: '/manage_anzeige/',
        component: manage_anzeige
    },{
        path: '/view_anzeige/:viewanzeigeid?',
        component: view_anzeige,
        name: view_anzeige
    },{
        path: '/user_management/',
        component: user_management,
        name: user_management
    },{
        path: '/view_users/',
        component: view_users,
        name: view_users
    },{
        path: '/referenz_anmeldung/:referenz',
        component: referenz_anmeldungen,
        name: referenz_anmeldungen
    },{
        path: '/email_bestatigung/:ref_id',
        component: email_bestatigung,
    }];

const router = new VueRouter({
    routes
})

new Vue({router,
  render: h => h(App)
}).$mount('#app')
