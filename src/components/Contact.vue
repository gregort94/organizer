<template>
  <li
    @click="contactClickHandler"
    class="contact"
    :class="{'contact--favorite':contactData.favorite}"
    tabindex="0"
  >
    <div class="contact__avatar">
      <img :src="contactData.avatar" alt="avatar" class="fitImg contact__avatar-img" />
    </div>
    <div class="contact__info">
      <p class="contact__name">{{contactData.name}}</p>
      <div class="contact__optional">
        <p class="contact__phone">
          <span class="contact__phone-number">{{contactData.phone}}</span>
          <a :href="`tel:${contactData.phone}`" @click.stop class="contact__phone-link">
            <img class="contact__phone-icon" src="@/assets/img/icons/phone.svg" alt />
          </a>
        </p>
        <p class="contact__email">{{contactData.email}}</p>
      </div>
    </div>
  </li>
</template>


<script>
export default {
  props: {
    contactData: Object
  },
  data() {
    return {};
  },
  methods: {
    contactClickHandler() {
      this.$emit("open-profile", this.contactData);
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
.contact {
  display: flex;
  background-color: $contactBG;
  padding: 15px 50px 15px 15px;
  position: relative;
  border-radius: 10px;
  overflow: auto;
  cursor: pointer;
  &__avatar {
    flex-grow: 0;
    flex: 0 0 70px;
    height: 70px;
    margin: 0px 10px 0px 0px;
    border-radius: 50%;
    overflow: hidden;
    align-self: center;
    position: relative;
  }
  &__info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
  }
  &__name {
    @include bold();
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__phone {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__phone-link {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-10px, -50%);

    &:hover .contact__phone-icon {
      filter: invert(1);
    }
    &:focus .contact__phone-icon {
      filter: invert(1);
    }
  }

  &__email {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
  }
  &--favorite {
    .contact__avatar {
      border: 5px solid $favoriteAvatarBorder;
    }
  }
  @media (max-width: $xs) {
    padding: 15px 50px 15px 5px;
  }
}
</style>