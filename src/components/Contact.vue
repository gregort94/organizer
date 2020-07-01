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
            <svg class="fitImg">
              <use xlink:href="@/assets/img/sprite.svg#phone" />
            </svg>
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
      this.$emit("open-contact", this.contactData);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
$contactBg: $primary-color;
$borderColor: $text-color-muddy;
$favoriteAvatarBorder: $accent-color;
.contact {
  display: flex;
  background-color: $contactBg;
  padding: 13px 50px 13px 15px;
  position: relative;
  border-radius: 10px;
  overflow: auto;
  cursor: pointer;
  border: 2px solid $borderColor;
  &:hover {
    border-color: darken($borderColor, 40%);
  }
  &--favorite {
    .avatar {
      border: 5px solid $favoriteAvatarBorder;
    }
  }
  @media (max-width: $xs) {
    padding: 15px 50px 15px 5px;
  }
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
  width: 30px;
  height: 30px;
  transform: translate(-10px, -50%);
  &:hover svg {
    fill: #fff;
  }
}
.email {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
}
</style>