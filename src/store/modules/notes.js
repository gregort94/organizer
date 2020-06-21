
export default {
   namespaced: true,
   state: {      
      deletingNote: false,
      editingNote: false,
      notesData: [
         {
            title: 'Go shopping',
            id: 0,
            todos: [
               {
                  text: 'onion',
                  done: true
               },
               {
                  text: 'potato',
                  done: false
               },
               {
                  text: 'milk',
                  done: false
               },
               {
                  text: 'cheese',
                  done: false
               },
            ]
         },

      ],
   },
   getters: {
      notesData(state) {
         return state.notesData
      },
      editingNote(state) {
         return state.editingNote
      },
      deletingNote(state) {
         return state.deletingNote
      }
   },
   mutations: {
      addNote(state, note) {
         state.notesData.unshift(note);
      },
      removeNote(state) {
         const index = state.notesData.indexOf(state.deletingNote);
         state.notesData.splice(index, 1);
      },
      setEditingNote(state, note) {
         state.editingNote = note;
      },
      setDeletingNote(state, note) {
         state.deletingNote = note;
      },
      clearDeletingData(state) {
         state.deletingNote = false;
      },
      setDataFromLocalStorage(state) {
         const localStorageData = localStorage.getItem("notesData");
         if (localStorageData) {
            const data = JSON.parse(localStorageData);
            state.notesData = data;
         }
      },
      localStorageSync(state) {
         localStorage.setItem('notesData', JSON.stringify(state.notesData))
      },
   },
   actions: {
      removeNoteHandler(store) {
         store.commit("removeNote");
         store.commit('localStorageSync');
         store.commit('setEditingNote', false);
      },
      addNoteHandler(store) {
        
         const newNote = { id: getCurrentId(store.getters.notesData), title: "", todos: [] };
         store.commit('addNote', newNote);
         store.commit('localStorageSync');
         store.commit('setEditingNote', newNote);
      }
   }
};

function getCurrentId(dataArray){
   let id = 0;
   dataArray.forEach(note => {
      if (note.id > id) {
         id = note.id;
      }
   });
   return id + 1;
}