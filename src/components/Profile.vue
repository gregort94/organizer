<template>
  <div class="overlay" @click.self="$emit('close')">
    <form @submit.prevent="saveChange" class="profile">
      <div class="profile__top">
        <div class="profile__avatar">
          <img class="fitImg" alt :src="contactData.avatar" />
        </div>
        <div class="profile__star">
          <input
            ref="favorite"
            id="favorite"
            type="checkbox"
            class="inputControl profile__star-input"
            :checked="contactData.favorite"
          />
          <label for="favorite" class="profile__star-label">
            <img src="@/assets/img/icons/star.svg" alt />
          </label>
        </div>
        <button @click="$emit('close')" type="button" class="btn profile__close"></button>
        <button
          @click="$emit('delete-contact', contactData.id)"
          type="button"
          class="btn profile__delete"
        ></button>
        <button type="submit" class="btn profile__save"></button>
        <div ref="saveMessage" class="profile__message">Saved !</div>
      </div>
      <div class="profile__bottom">
        <div class="profile__fieldset profile__fieldset--name">
          <input
            required
            class="profile__input"
            ref="name"
            id="name"
            type="text"
            :value="contactData.name"
            @input="checkNameValidity"
          />
        </div>
        <div class="profile__fieldset profile__fieldset--phone">
          <label for="phone" class="profile__label">Phone</label>
          <input
            ref="phone"
            id="phone"
            type="phone"
            class="profile__input"
            :value="contactData.phone"
          />
        </div>
        <div class="profile__fieldset profile__fieldset--email">
          <label for="email" class="profile__label">Email</label>
          <input
            ref="email"
            id="email"
            type="email"
            class="profile__input"
            :value="contactData.email"
          />
        </div>
        <fieldset class="profile__address">
          <legend>address</legend>
          <div class="profile__fieldset profile__fieldset--city">
            <label for="country" class="profile__label">Country</label>
            <input
              ref="country"
              id="country"
              type="text"
              class="profile__input"
              :value="contactData.address.country"
            />
          </div>
          <div class="profile__fieldset profile__fieldset--state">
            <label for="state" class="profile__label">State</label>
            <input
              ref="state"
              id="state"
              type="text"
              class="profile__input"
              :value="contactData.address.state"
            />
          </div>
          <div class="profile__fieldset profile__fieldset--city">
            <label for="city" class="profile__label">City</label>
            <input
              ref="city"
              id="city"
              type="text"
              class="profile__input"
              :value="contactData.address.city"
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
    return {};
  },
  methods: {
    saveChange() {
      this.contactData.name = this.$refs.name.value;
      this.contactData.phone = this.$refs.phone.value;
      this.contactData.email = this.$refs.email.value;
      this.contactData.address.country = this.$refs.country.value;
      this.contactData.address.state = this.$refs.state.value;
      this.contactData.address.city = this.$refs.city.value;
      this.contactData.favorite = this.$refs.favorite.checked;

      this.showMessage();
    },
    showMessage() {
      this.$refs.saveMessage.classList.add("profile__message--visable");
      setTimeout(() => {
        this.$refs.saveMessage.classList.remove("profile__message--visable");
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

<style lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
.profile {
  margin: 50px auto;
  background-color: #fff;
  position: relative;
  padding: 15px;
  width: 500px;
  background-color: $profileBG;
  border-radius: 5px;
  animation-duration: 0.3s;
  &__top {
    position: relative;
    padding: 0px 0px 5px 0px;
    margin-bottom: 40px;
  }
  &__avatar {
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
  &__edit {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    background: #fff url("../assets/img/icons/edit.svg") center/80% no-repeat;
  }
  &__fieldset {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &__label {
    @include bold();
    text-transform: uppercase;
  }
  &__input {
    text-align: center;
    font-style: italic;
    &:disabled {
      background-color: $desabled;
    }
    &::placeholder {
      color: rgba(255, 2, 2, 0.726);
    }
  }
  &__star {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
  }
  &__star-label img {
    filter: invert(0.5);
  }
  &__close {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    &:before {
      content: "";
      display: block;
      height: 2px;
      top: 50%;
      transform: translate(0, -50%) rotate(-45deg);
      background-color: black;
    }
    &:after {
      content: "";
      display: block;
      height: 2px;
      top: 50%;
      transform: translate(0, -120%) rotate(45deg);
      background-color: black;
    }
  }
  &__save {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background: #fff url("../assets/img/icons/save.svg") center/80% no-repeat;
  }
  &__delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background: #fff url("../assets/img/icons/remove.svg") center/80% no-repeat;
  }
  &__message {
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
  @media (max-width: $sm) {
    width: 100%;
    margin: 0;
    height: 100vh;
    overflow: auto;
  }
}
.profile__star-input:focus + .profile__star-label img {
  outline: 5px auto -webkit-focus-ring-color;
}
.profile__star-input:checked + .profile__star-label img {
  filter: invert(0);
}
</style>