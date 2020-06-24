import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import notes from './modules/notes'
import contacts from './modules/contacts'

export const store = new Vuex.Store({
   modules: {
      notes,
      contacts
   },
})