<template>
  <div id="contacts">
    <finder
      @filtered="filteredData = $event"
      v-if="contactsData"
      :sourceData="contactsData"
      ref="finder"
    ></finder>
    <section class="contacts">
      <div class="contacts__logout"></div>
      <div class="container">
        <template v-if="filteredData">
          <div :key="i" v-for="(letter, i) in existingLetters" class="contacts__block">
            <div class="contacts__letter" :id="letter">{{letter}}</div>
            <ul class="contacts__list">
              <contact
                v-for="(value, key) in filterContactsByLetter(letter)"
                :key="key"
                :contact-data="value"
                @open-profile="currentContact = $event"
              ></contact>
            </ul>
          </div>
        </template>
      </div>
    </section>
    <transition name="soft">
      <profile
        v-if="currentContact"
        @delete-contact="deleteContact($event)"
        @close="currentContact = false"
        :contact-data="currentContact"
      ></profile>
    </transition>
    <letters :existingLetters="existingLetters"></letters>
  </div>
</template>

<script>
import { trimLetters } from "../js/tools";
import Contact from "./Contact";
import Profile from "./Profile";
import Finder from "./Finder";
import Letters from "./Letters";
import { mapGetters } from "vuex";
export default {
  components: {
    Contact,
    Profile,
    Finder,
    Letters
  },
  data() {
    return {
      currentContact: false,
      filteredData: []
    };
  },
  computed: {
    ...mapGetters("contacts", {
      contactsData: "contactsData"
    }),
    existingLetters() {
      const letters = this.filteredData.map(contact => contact.name[0]);
      return trimLetters(letters);
    }
  },
  methods: {
    deleteContact(id) {
      const filteredDataIndex = this.filteredData.findIndex(contact => {
        return contact.id == id;
      });
      const contactsDataIndex = this.contactsData.findIndex(contact => {
        return contact.id == id;
      });
      this.contactsData.splice(contactsDataIndex, 1);
      this.filteredData.splice(filteredDataIndex, 1);
      this.currentContact = false;
    },
    filterContactsByLetter(letter) {
      return this.filteredData.filter(
        contact => contact.name[0].toUpperCase() === letter
      );
    }
  },
  watch: {
    contactsData() {
      this.filteredData = this.contactsData;
      const finder = this.$refs.finder;
      if (finder) {
        finder.cleanValue();
      }
    }
  }
};
</script>

<style lang="scss">
@import "../scss/global/variables.scss";
.contacts {
  background-color: $background;
  padding: 50px 0px 0px 0px;
  min-height: 100vh;
  &__block {
    padding: 15px 0px 15px 50px;
    border-bottom: 2px solid black;
    position: relative;
    @media (max-width: $sm) {
      margin-right: 31px;
    }
    @media (max-width: $xs) {
      padding: 30px 0px 15px 0px;
    }
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 100px;
    grid-gap: 15px;
    @media (max-width: $lg) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: $sm) {
      grid-template-columns: 1fr;
    }
  }
  &__logout {
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 100;
    @media (max-width: $xs) {
      top: 50px;
    }
  }
  &__letter {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 50px;
    transform: translate(0, -50%);
    font-size: 50px;
    line-height: 50px;
    @media (max-width: $xs) {
      top: 0;
      font-size: 25px;
      transform: translate(0, 0);
      width: 25px;
      height: 25px;
      line-height: 25px;
    }
  }
}
</style>
