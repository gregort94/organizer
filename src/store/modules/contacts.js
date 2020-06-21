
import { getContactsData } from "../../js/backend";
export default {
   namespaced: true,
   state: {
      contactsData: false,
   },
   getters: {
      contactsData(state) {
         return state.contactsData
      }
   },
   mutations: {
      setContactsData(state, data) {
         state.contactsData = data;
      }
   },
   actions: {
      getData(store, formData) {
         getContactsData(formData).then(resolve => {
            store.commit('setContactsData', resolve);
         });
      }
   }
}