<template>
  <aside class="letters">
    <ul class="letters__list">
      <li class="letters__item" v-for="(value, letter) in alphabetObject" :key="letter">
        <a
          :href="`#${letter}`"
          class="letters__link"
          :class="{'letters__link--existing': value}"
        >{{letter}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { arr_EN } from "../js/data";
export default {
  props: {
    existingLetters: Array
  },
  data() {
    return {
      alphabetArray: arr_EN,
      alphabetObject: {}
    };
  },
  methods: {},
  created() {
    this.alphabetArray.forEach(letter => {
      this.$set(this.alphabetObject, letter, false);
    });
    this.existingLetters.forEach(letter => {
      this.alphabetObject[letter] = true;
    });
  },
  watch: {
    existingLetters() {
      for (const key in this.alphabetObject) {
        this.alphabetObject[key] = false;
      }
      this.existingLetters.forEach(letter => {
        this.alphabetObject[letter] = true;
      });
    }
  }
};
</script>

<style lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
.letters {
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  padding: 15px 0 0 0;
  @media (max-width: $xs) {
    padding: 45px 0 0 0;
  }
  &__list {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30px;
  }
  &__item {
    flex-grow: 1;
    text-align: center;
  }
  &__link {
    display: block;
    width: 100%;
    height: 100%;
    color: $black;
    border-radius: 50%;
    color: $missingLetter;
    @media (max-width: $sm) {
      font-size: 15px;
      line-height: 15px;
    }
    &:hover {
      color: $missingLetter;
    }
    &--existing {
      color: $black;
      @include bold();
      font-size: 20px;
      @media (max-width: $sm) {
        font-size: 18px;
        line-height: 18px;
      }
      &:hover {
        color: $existingLetter;
      }
    }
  }
}
</style>