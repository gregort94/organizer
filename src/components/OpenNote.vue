<template>
  <section @click.self="closeWinActive = true" class="openNote overlay">
    <a @click="closeWinActive = true" type="button" class="close">
      <svg class="fitImg">
        <use xlink:href="@/assets/img/sprite.svg#back" />
      </svg>
    </a>
    <form @submit.prevent="saveChangesHandler" class="body">
      <transition name="fade">
        <confirm-window
          v-show="deletingNote"
          @cancel="clearDeletingData"
          text="Confirm remove"
          :buttons="[
              {name: 'Delete', type: 'danger', handler: removeNoteHandler}
            ]"
        ></confirm-window>
      </transition>
      <transition name="fade">
        <confirm-window
          v-show="closeWinActive"
          @cancel="closeWinActive = false"
          text="Close note ?"
          :buttons="[
              {name: 'Close', type: 'close', handler: closeNotePage}
            ]"
        ></confirm-window>
      </transition>
      <button :disabled="!changed" class="btn btn--success save">Save</button>
      <button
        @click="setDeletingNote(sourceData)"
        type="button"
        class="btn btn--danger delete"
      >Delete</button>
      <button
        :disabled="!changed"
        @click="copySourceData"
        class="btn btn--info cancel"
      >Cancel changes</button>
      <div class="title">
        <input type="text" v-model="currentData.title" placeholder="set title" class="title-input" />
      </div>
      <ul class="list">
        <li v-for="(todo, index) in currentData.todos" :key="index" class="todo">
          <div class="checkbox">
            <input
              :id="`todoCheck${index}`"
              class="input checkbox__control"
              v-model="todo.done"
              type="checkbox"
            />
            <label :for="`todoCheck${index}`" class="checkbox__label"></label>
          </div>
          <input ref="input" required v-model="todo.text" type="text" class="input todo-text" />
          <button type="button" @click="currentData.todos.splice(index, 1)" class="todo-delete">
            <svg class="fitImg">
              <use xlink:href="@/assets/img/sprite.svg#remove" />
            </svg>
          </button>
        </li>
      </ul>
      <a @click="addTodo" class="add">
        <svg class="fitImg">
          <use xlink:href="@/assets/img/sprite.svg#addTodo" />
        </svg>
      </a>
    </form>
  </section>
</template>




<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import ConfirmWindow from "./ConfirmWindow";
export default {
  components: {
    ConfirmWindow
  },
  props: {
    sourceData: Object
  },
  data() {
    return {
      currentData: false,
      closeWinActive: false
    };
  },
  computed: {
    ...mapGetters("notes", { deletingNote: "deletingNote" }),
    changed() {
      return (
        JSON.stringify(this.sourceData) !== JSON.stringify(this.currentData)
      );
    }
  },
  methods: {
    ...mapMutations("notes", {
      setDeletingNote: "setDeletingNote",
      setEditingNote: "setEditingNote",
      removeNote: "removeNote",
      clearDeletingData: "clearDeletingData",
      closeEdit: "closeEdit",
      localStorageSync: "localStorageSync"
    }),
    ...mapActions("notes", { removeNoteHandler: "removeNoteHandler" }),
    saveChangesHandler() {
      this.sourceData.title = this.currentData.title;
      this.sourceData.todos = JSON.parse(
        JSON.stringify(this.currentData.todos)
      );
      this.localStorageSync();
    },
    addTodo() {
      this.currentData.todos.push({ done: false, text: "" });
      setTimeout(() => {
        this.focusOnLastInput();
      }, 100);
    },
    focusOnLastInput() {
      const lastInputIndex = this.currentData.todos.length - 1;
      const lastInput = this.$refs.input[lastInputIndex];
      lastInput.focus();
    },
    copySourceData() {
      this.currentData = JSON.parse(JSON.stringify(this.sourceData));
    },
    closeNotePage() {
      this.setEditingNote(false);
    }
  },
  watch: {},
  created() {
    this.copySourceData();
  }
};
</script>



<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
.openNote {
  display: flex;
  align-items: center;
  justify-content: center;
}
.body {
  padding: 15px 15px 15px 15px;
  background-color: #fff;
  width: 600px;
  height: 600px;
  background-color: $noteBG1;
  border-radius: 1px;
  position: relative;
  overflow: auto;
  @media (max-width: $xs) {
    padding: 55px 15px 15px 15px;
  }
  @media (max-width: $sm) {
    margin: 95px 0px 0px 0px;
    width: 100%;
    height: 100%;
  }
}
.save {
  position: absolute;
  top: 15px;
  right: 15px;
  color: white;
}
.delete {
  position: absolute;
  top: 15px;
  right: 80px;
  color: white;
}
.cancel {
  position: absolute;
  top: 15px;
  left: 15px;
  color: white;
}
.title {
  display: flex;
  justify-content: center;
  &-input {
    text-align: center;
    height: 40px;
    border: 0;
    background-color: $noteBG1;
    font-size: 30px;
    @include bold;
    width: 280px;
  }
}
.close {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 10px;
  background-color: transparent;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  &:hover {
    svg {
      fill: darken($noteBG1, 10%);
    }
  }
  svg {
    fill: $noteBG1;
  }
  @media (max-width: $sm) {
    top: 0;
    left: 0;
    width: 100%;
    height: 47px;
    border-bottom: 1px solid #000;
    background-color: lighten($noteBG1, 10%);
    svg {
      height: 100%;
    }
  }
}
.add {
  position: relative;
  width: 30px;
  height: 30px;
  display: block;
  cursor: pointer;
  margin: 15px 0px 0px 0px;
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
    fill: black;
  }
}
.todo {
  margin: 10px 0px 10px 0px;
  display: flex;
  position: relative;
}
.todo-text {
  flex: 1 0 0;
  background-color: transparent;
  @include unusual;
}
.todo-delete {
  position: absolute;
  padding: 0px;
  right: 0;
  top: 0;
  width: 25px;
  height: 100%;
  margin: 0;
  background: transparent;
  border: 0;
  svg {
    fill: rgb(78, 74, 74);
  }
  &:hover {
    svg {
      fill: rgb(3, 3, 3);
    }
  }
}
</style>