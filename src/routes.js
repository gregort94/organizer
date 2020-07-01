import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import notesPage from './components/notesPage'
import contactsPage from './components/contactsPage'

import {store} from './store'

const routes = [
   {
      path: '/',
      redirect: '/notes'
   },
   {
      path: '/notes',
      component: notesPage,
      beforeEnter(to, from, next) { 
         store.commit('notes/setDataFromLocalStorage');
         next();
      }
   },
   {
      path: '/contacts',
      component: contactsPage,
      beforeEnter(to, from, next) { 
         store.dispatch('contacts/getData');
         next();
      }
   },
   {
      path: '*',
      redirect: '/notes'
   },

]

export const router = new VueRouter({
   routes,
   mode: 'history'
})