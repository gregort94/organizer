<template>
  <div class="openContact overlay" @click.self="closeNotePage">
    <form @submit.prevent="saveChange" class="form">
      <transition name="fade">
        <confirm-window
          v-show="deleteWinActive"
          @cancel="deleteWinActive = false"
          text="Confirm remove"
          :buttons="[
              {name: 'Yes', type: 'danger', handler: deleteContact},
            ]"
        ></confirm-window>
      </transition>
      <transition name="fade">
        <confirm-window
          v-show="saveWinActive"
          @cancel="saveWinActive = false"
          text="Save changes ?"
          :buttons="[
              {name: 'Yes', type: 'success', handler: closeWithSave},
              {name: 'No', type: 'danger', handler: closeWithoutSave},
            ]"
        ></confirm-window>
      </transition>
      <div class="top">
        <div class="avatar">
          <img class="fitImg" alt :src="contactData.avatar" />
        </div>
        <button @click="closeNotePage" type="button" class="button button--close">
          <img src="@/assets/img/icons/close.svg" alt="close" class="fitImg" />
        </button>
        <button @click="deleteWinActive = true" type="button" class="button button--delete">
          <img src="@/assets/img/icons/remove.svg" alt="delete" class="fitImg" />
        </button>
        <button @click="editClickHandler" type="button" class="button button--edit">
          <svg class="fitImg">
            <use xlink:href="@/assets/img/sprite.svg#edit" />
          </svg>
        </button>
        <div class="favorite">
          <input
            ref="favorite"
            id="favorite"
            :disabled="!changed"
            type="checkbox"
            class="inputControl favorite-input"
            :checked="contactData.favorite"
          />
          <label for="favorite" class="favorite-label">
            <img src="@/assets/img/icons/star.svg" alt="favorite" />
          </label>
        </div>
      </div>
      <div class="bottom">
        <div
          v-for="(value, name) in basicInputsControls"
          :key="name"
          :class="['fieldset', `fieldset--${name}`]"
        >
          <label :for="name" class="label">{{name}}</label>
          <input
            required
            :disabled="!changed"
            class="input input--switchable"
            :id="name"
            type="text"
            v-model="basicInputsControls[name]"
            @input="checkNameValidity"
          />
        </div>
        <fieldset class="address">
          <legend>address</legend>
          <div
            v-for="(value, name) in addressInputsControls"
            :key="name"
            :class="['fieldset', `fieldset--${name}`]"
          >
            <label :for="name" class="label">{{name}}</label>
            <input
              required
              :disabled="!changed"
              class="input input--switchable"
              :id="name"
              type="text"
              v-model="addressInputsControls[name]"
              @input="checkNameValidity"
            />
          </div>
        </fieldset>
      </div>
    </form>
  </div>
</template>


<script>
import ConfirmWindow from "./ConfirmWindow";
export default {
  components: {
    ConfirmWindow
  },
  props: ["contactData"],
  data() {
    return {
      basicInputs: ["name", "phone", "email"],
      addressInputs: ["country", "state", "city"],
      basicInputsControls: {},
      addressInputsControls: {},
      deleteWinActive: false,
      saveWinActive: false,
      changed: false
    };
  },
  methods: {
    saveChanges() {
      this.basicInputs.forEach(inputName => {
        this.contactData[inputName] = this.basicInputsControls[inputName];
      });
      this.addressInputs.forEach(inputName => {
        this.contactData.address[inputName] = this.basicInputsControls[
          inputName
        ];
      });
      this.contactData.favorite = this.$refs.favorite.checked;
    },
    checkNameValidity(e) {
      const isValid = /^[A-Za-z0-9]+$/.test(e.target.value);
      if (!isValid) {
        e.target.value = "";
        e.target.placeholder = "enter in english please";
      }
    },
    closeNotePage() {
      if (this.changed) {
        this.saveWinActive = true;
      } else {
        this.$emit("close");
      }
    },
    closeWithSave() {
      this.saveChanges();
      this.$emit("close");
    },
    closeWithoutSave() {
      this.$emit("close");
    },
    editClickHandler() {
      this.changed = true;
      setTimeout(() => {
        this.$refs.favorite.focus();
      }, 100);
    },
    deleteContact() {
      this.$emit("delete-contact", this.contactData.id);
    }
  },
  created() {
    this.basicInputs.forEach(name => {
      this.$set(this.basicInputsControls, name, this.contactData[name]);
    });
    this.addressInputs.forEach(name => {
      this.$set(
        this.addressInputsControls,
        name,
        this.contactData.address[name]
      );
    });
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
.form {
  margin: 50px auto;
  background-color: #fff;
  position: relative;
  padding: 15px;
  width: 500px;
  background-color: $profileBG;
  border-radius: 5px;
  animation-duration: 0.3s;
  overflow: hidden;
  @media (max-width: $sm) {
    width: 100%;
    margin: 0;
    height: 100vh;
    overflow: auto;
  }
}
.top {
  position: relative;
  padding: 0px 0px 5px 0px;
  margin-bottom: 40px;
}
.avatar {
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  @media (max-width: $xs) {
    width: 180px;
    height: 180px;
  }
}
.fieldset {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.label {
  @include bold();
  text-transform: uppercase;
}
.input {
  text-align: center;
  &::placeholder {
    color: rgba(255, 2, 2, 0.726);
  }
}
.favorite {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.favorite-label {
  width: 100%;
  height: 100%;
  display: block;
  &:hover img {
    filter: invert(0.4);
  }
}
.favorite-label img {
  cursor: pointer;
  filter: invert(0.5);
}
.button {
  width: 35px;
  height: 35px;
  position: absolute;
  background-color: transparent;
  padding: 0;
  border: 0;
  img {
    filter: invert(0.2);
  }
  &:hover img {
    filter: invert(0);
  }
  &--edit {
    bottom: 0;
    right: 0;
  }
  &--close {
    top: 0;
    left: 0;
  }
  &--delete {
    top: 0;
    right: 0;
  }
}

.favorite-input:focus + .favorite-label img {
  outline: 0;
  box-shadow: 0 0 2px 2px #609fcf;
}
.favorite-input:checked + .favorite-label img {
  filter: invert(0);
}
.favorite-input:disabled + .favorite-label img {
  opacity: 0.5;
}
.favorite-input:disabled + .favorite-label:hover img {
  filter: invert(0.5);
}
</style>