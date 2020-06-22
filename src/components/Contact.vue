<template>
  <li
    @click="contactClickHandler"
    class="contact"
    :class="{'contact--favorite':contactData.favorite}"
    tabindex="0"
  >
    <div class="avatar">
      <img :src="contactData.avatar" alt="avatar" class="fitImg avatar-img" />
    </div>
    <div class="info">
      <p class="name">{{contactData.name}}</p>
      <div class="optional">
        <p class="phone">
          <span class="phone-number">{{contactData.phone}}</span>
          <a :href="`tel:${contactData.phone}`" @click.stop class="phone-link">
            <img class="phone-icon" src="@/assets/img/icons/phone.svg" alt />
          </a>
        </p>
        <p class="email">{{contactData.email}}</p>
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

<style scoped lang="scss">
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
  &--favorite {
    .avatar {
      border: 5px solid $favoriteAvatarBorder;
    }
  }
  @media (max-width: $xs) {
    padding: 15px 50px 15px 5px;
  }
  .avatar {
    flex-grow: 0;
    flex: 0 0 70px;
    height: 70px;
    margin: 0px 10px 0px 0px;
    border-radius: 50%;
    overflow: hidden;
    align-self: center;
    position: relative;
  }
  .info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
  }
  .name {
    @include bold();
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .phone {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .phone-link {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-10px, -50%);
    &:hover .phone-icon {
      filter: invert(1);
    }
    &:focus .phone-icon {
      filter: invert(1);
    }
  }
  .email {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
  }
}
</style>