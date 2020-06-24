  <template>
  <div class="notes">
    <header class="header">
      <div class="container">
        <a @click="addNoteHandler" class="header-add">
          <svg class="fitImg">
            <use xlink:href="@/assets/img/sprite.svg#addTodo" />
          </svg>
        </a>
      </div>
    </header>
    <section class="body">
      <ul class="notes-list">
        <li v-for="(note, index) in notesData" :key="index" class="note">
          <transition name="fade">
            <confirm-window
              v-show="deletingNote === note"
              @cancel="clearDeletingData"
              text="Confirm remove"
              :buttons="[
                {name: 'delete', type: 'danger', handler: removeNoteHandler}
              ]"
            ></confirm-window>
          </transition>
          <h2 class="note-title">{{note.title}}</h2>
          <ul class="note-list">
            <li v-for="(value, index) in note.todos" :key="index" class="todo">
              <div class="todo-status">
                <div class="todo-img">
                  <img v-if="value.done" class="fitImg" src="@/assets/img/icons/done.svg" alt />
                  <img else class="fitImg" src="@/assets/img/icons/process.svg" alt />
                </div>
              </div>
              <p class="todo-text">{{value.text}}</p>
            </li>
          </ul>
          <div class="note-menu">
            <button @click="setEditingNote(note)" class="note-menu-item">
              <img src="@/assets/img/icons/edit.svg" alt="edit" class="fitImg" />
            </button>
            <button @click="setDeletingNote(note)" class="note-menu-item note-menu-item--remove">
              <img src="@/assets/img/icons/remove.svg" alt="remove" class="fitImg" />
            </button>
          </div>
        </li>
      </ul>
    </section>
    <transition name="soft">
      <open-note v-if="editingNote" :sourceData="editingNote"></open-note>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import ConfirmWindow from "./ConfirmWindow";
import OpenNote from "./OpenNote";
export default {
  components: {
    ConfirmWindow,
    OpenNote
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("notes", {
      notesData: "notesData",
      editingNote: "editingNote",
      deletingNote: "deletingNote"
    })
  },
  methods: {
    ...mapMutations("notes", {
      removeNote: "removeNote",
      addNote: "addNote",
      setEditingNote: "setEditingNote",
      closeEdit: "closeEdit",
      setDeletingNote: "setDeletingNote",
      clearDeletingData: "clearDeletingData",
      setDataFromLocalStorage: "setDataFromLocalStorage"
    }),
    ...mapActions("notes", {
      removeNoteHandler: "removeNoteHandler",
      addNoteHandler: "addNoteHandler"
    })
  },
  created() {
    const localStorageData = localStorage.getItem("notesData");
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      this.setDataFromLocalStorage(data);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";

.notes {
  padding: 50px 0px 0px 0px;
}
.header {
  padding: 15px 0px;
  &-add {
    color: white;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    cursor: pointer;
    &:hover {
      svg {
        fill: darken($hoverLink, 10%);
      }
    }
    &:active {
      svg {
        fill: darken($hoverLink, 20%);
      }
    }
    svg {
      fill: rgb(75, 72, 72);
    }
  }
}
.notes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-template-rows: repeat(auto-fill, 300px);
  grid-gap: 15px;
  justify-content: space-around;
}
.note {
  position: relative;
  overflow: hidden;
  background-color: $noteBG1;
  padding: 15px;
  border-radius: 1px;
  &:hover {
    .note-menu {
      display: block;
    }
  }
  &:nth-child(3n) {
    background-color: $noteBG1;
  }
  &:nth-child(3n + 1) {
    background-color: $noteBG2;
  }
  &:nth-child(3n-1) {
    background-color: $noteBG3;
  }
}
.note-title {
  font-size: 30px;
  text-align: center;
}
.note-menu {
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: transparent;
  display: none;
  border-radius: 0 0 0 5px;
}
.note-menu-item {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 5px;
  padding: 0;
  background: transparent;
  border: 0;
  img {
    filter: invert(0.2);
  }
  &:hover img {
    filter: invert(0);
  }
}
.todo {
  display: flex;
}
.todo-img {
  position: relative;
  width: 25px;
  height: 25px;
  margin: 0px 5px 5px 0px;
}
.todo-text {
  overflow: hidden;
  @include unusual;
}
</style>
