  <template>
  <div class="notesPage">
    <header class="header">
      <div class="container">
        <icon-btn @clicked="addNoteHandler" hoverEffect="fill" spriteId="add" class="header-add"></icon-btn>
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
                {name: 'Yes', type: 'danger', handler: removeNoteHandler}
              ]"
            ></confirm-window>
          </transition>
          <h2 class="note-title">{{note.title}}</h2>
          <ul class="note-list">
            <li v-for="(value, index) in note.todos" :key="index" class="todo">
              <div class="todo-status">
                <img
                  v-if="value.done"
                  class="fitImg"
                  style="transform: scale(1.1) translate(1px,0)"
                  src="@/assets/img/icons/checked.svg"
                  alt
                />
                <img v-else class="fitImg" src="@/assets/img/icons/process.svg" alt />
              </div>
              <p class="todo-text">{{value.text}}</p>
            </li>
          </ul>
          <div class="note-menu">
            <icon-btn
              @clicked="setEditingNote(note)"
              hoverEffect="fill"
              spriteId="edit"
              class="note-menu-item"
            ></icon-btn>
            <icon-btn
              @clicked="setDeletingNote(note)"
              hoverEffect="fill"
              spriteId="remove"
              class="note-menu-item"
            ></icon-btn>
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
import IconBtn from "./IconBtn";
export default {
  components: {
    ConfirmWindow,
    OpenNote,
    IconBtn
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

$notesPageBg: $primary-color-light;
$noteBgColor: $noteBgGradient;
$noteHeaderBgColor: $noteHeaderBg;
$addBtnFill: $primary-color-dark;
$addBtnFillHover: $divider-color;

.notesPage {
  padding: 50px 0px 0px 0px;
  background-color: $notesPageBg;
}
.header {
  padding: 15px 0px;
  &-add {
    color: white;
    position: relative;
    width: 50px;
    height: 50px;
    padding: 0;
    background-color: transparent;
    border: 0;
    svg {
      fill: $addBtnFill;
    }
    &:hover {
      svg {
        fill: $addBtnFillHover;
      }
    }
    &:active {
      svg {
        fill: darken($addBtnFillHover, 20%);
      }
    }
  }
}
.notes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  grid-gap: 15px;
  justify-content: space-around;
}
.note {
  position: relative;
  overflow: hidden;
  background: $noteBgColor;
  border-radius: 1px;
  padding: 0;
  &:hover {
    .note-menu {
      display: block;
    }
  }
}
.note-list {
  padding: 15px;
}
.note-title {
  font-size: 30px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  background-color: $noteHeaderBgColor;
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
  padding: 5px !important;
}
.todo {
  display: flex;
}
.todo-status {
  width: 25px;
  height: 25px;
  margin: 0px 5px 5px 0px;
}
.todo-text {
  overflow: hidden;
  @include unusual;
}
</style>
