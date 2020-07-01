<template>
  <section @click.self="closeWithSave" class="openNote overlay">
    <a @click="closeWithSave" type="button" class="close">
      <svg class="fitImg">
        <use xlink:href="@/assets/img/sprite.svg#back" />
      </svg>
    </a>
    <form ref="form" class="note">
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
      <div class="title">
        <input type="text" v-model="currentData.title" placeholder="set title" class="title-input" />
      </div>
      <div class="body">
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
            <input
              @input="setValidityTrue"
              ref="input"
              v-model="todo.text"
              type="text"
              name="input"
              autocomplete="off"
              class="input todo-text"
            />
            <button type="button" @click="currentData.todos.splice(index, 1)" class="todo-delete">
              <svg class="fitImg">
                <use xlink:href="@/assets/img/sprite.svg#remove" />
              </svg>
            </button>
          </li>
        </ul>
        <icon-btn @clicked="addTodo" hoverEffect="fill" spriteId="add" class="add"></icon-btn>
      </div>
    </form>
  </section>
</template>




<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import ConfirmWindow from "./ConfirmWindow";
import IconBtn from "./IconBtn";
export default {
  components: {
    ConfirmWindow,
    IconBtn
  },
  props: {
    sourceData: Object
  },
  data() {
    return {
      currentData: false,
      closeWinActive: false,
      saveWinActive: false
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
    closeNoteHandler() {
      const isChanged =
        JSON.stringify(this.sourceData) !== JSON.stringify(this.currentData);
      if (isChanged) {
        this.$refs.form.submit();
      } else {
        this.setEditingNote(false);
      }
    },
    saveChanges() {
      this.sourceData.title = this.currentData.title;
      this.sourceData.todos = JSON.parse(
        JSON.stringify(this.currentData.todos)
      );
      this.localStorageSync();
    },
    closeWithSave() {
      if (this.formIsValid()) {
        this.saveChanges();
        this.setEditingNote(false);
      } else {
        console.log("invalid");
      }
    },
    formIsValid() {
      let isValid = true;
      this.$refs.input.forEach(input => {
        if (input.value === "") {
          input.focus();
          input.placeholder = "please fill in the field";
          input.setCustomValidity("please fill in the field");
          isValid = false;
        }
      });
      return isValid;
    },
    setValidityTrue(e) {
      e.target.setCustomValidity("");
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
$openNoteBgColor: $noteBgGradient;
$openNoteHeaderBgColor: $noteHeaderBg;
$closeBtnBg: $noteBg;
.openNote {
  display: flex;
  align-items: center;
  justify-content: center;
}
.note {
  padding: 0;
  background-color: #fff;
  width: 500px;
  height: 550px;
  background: $openNoteBgColor;
  border-radius: 1px;
  position: relative;
  overflow: auto;
  @media (max-width: $xs) {
    padding: 0;
  }
  @media (max-width: $sm) {
    margin: 95px 0px 0px 0px;
    width: 100%;
    height: 100%;
  }
}
.body {
  padding: 15px;
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
  width: 100%;
  height: 60px;
  background-color: $openNoteHeaderBgColor;
  &-input {
    text-align: center;
    line-height: 60;
    border: 0;
    background-color: transparent;
    font-size: 30px;
    @include bold;
    width: 280px;
  }
}
.close {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  svg {
    fill: $closeBtnBg;
  }
  &:hover {
    svg {
      fill: darken($closeBtnBg, 10%);
    }
  }
  @media (max-width: $sm) {
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #000;
    background-color: lighten($closeBtnBg, 10%);
    border-radius: 0;
    svg {
      height: 100%;
    }
  }
}
.add {
  position: relative;
  margin: 15px 0px 0px 0px;
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
  position: relative;
  &::placeholder {
    color: red;
    @include reg;
    font-size: 16px;
    text-align: center;
  }
  &:invalid {
    border-color: red;
  }
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