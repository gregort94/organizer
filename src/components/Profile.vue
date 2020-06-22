<template>
  <div class="profile overlay" @click.self="$emit('close')">
    <form @submit.prevent="saveChange" class="form">
      <div class="top">
        <div class="avatar">
          <img class="fitImg" alt :src="contactData.avatar" />
        </div>
        <div class="favorite">
          <input
            ref="favorite"
            id="favorite"
            type="checkbox"
            class="inputControl favorite-input"
            :checked="contactData.favorite"
          />
          <label for="favorite" class="favorite-label">
            <img src="@/assets/img/icons/star.svg" alt="favorite" />
          </label>
        </div>
        <button @click="$emit('close')" type="button" class="button button--close">
          <img src="@/assets/img/icons/close.svg" alt="close" class="fitImg" />
        </button>
        <button
          @click="$emit('delete-contact', contactData.id)"
          type="button"
          class="button button--delete"
        >
          <img src="@/assets/img/icons/remove.svg" alt="delete" class="fitImg" />
        </button>
        <button type="submit" class="button button--save">
          <img src="@/assets/img/icons/save.svg" alt="save" class="fitImg" />
        </button>
        <div ref="saveMessage" class="message">Saved !</div>
      </div>
      <div class="bottom">
        <div
          v-for="(name, index) in basicInputs"
          :key="index"
          :class="['fieldset', `fieldset--${name}`]"
        >
          <label :for="name" class="label">{{name}}</label>
          <input
            required
            class="input input"
            :ref="name"
            :id="name"
            type="text"
            :value="contactData[name]"
            @input="checkNameValidity"
          />
        </div>
        <fieldset class="address">
          <legend>address</legend>
          <div
            v-for="(name, index) in adressInputs"
            :key="index"
            :class="['fieldset', `fieldset--${name}`]"
          >
            <label :for="name" class="label">{{name}}</label>
            <input
              required
              class="input input"
              :ref="name"
              :id="name"
              type="text"
              :value="contactData.address[name]"
              @input="checkNameValidity"
            />
          </div>
        </fieldset>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  props: ["contactData"],
  data() {
    return {
      basicInputs: ["name", "phone", "email"],
      adressInputs: ["country", "state", "city"]
    };
  },
  methods: {
    saveChange() {
      this.basicInputs.forEach(inputName => {
        this.contactData[inputName] = this.$refs[inputName][0].value;
      });
      this.adressInputs.forEach(inputName => {
        this.contactData.address[inputName] = this.$refs[inputName][0].value;
      });
      this.contactData.favorite = this.$refs.favorite.checked;
      this.showMessage();
    },
    showMessage() {
      this.$refs.saveMessage.classList.add("message--visable");
      setTimeout(() => {
        this.$refs.saveMessage.classList.remove("message--visable");
      }, 1000);
    },
    checkNameValidity(e) {
      const isValid = /^[A-Za-z0-9]+$/.test(e.target.value);
      if (!isValid) {
        e.target.value = "";
        e.target.placeholder = "enter in english please";
      }
    }
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
  font-style: italic;
  &:disabled {
    background-color: $desabled;
  }
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
  &--save {
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
.message {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  background-color: rgba(15, 231, 116, 0.575);
  padding: 5px 10px;
  border-radius: 5px;
  opacity: 0;
  &--visable {
    opacity: 1;
  }
}

.favorite-input:focus + .favorite-label img {
  outline: 5px auto -webkit-focus-ring-color;
}
.favorite-input:checked + .favorite-label img {
  filter: invert(0);
}
</style>