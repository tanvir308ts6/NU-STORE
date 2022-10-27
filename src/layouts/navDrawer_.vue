<template>
  <div>
    <!-- {{ NavbarItemsFromLogin }} -->
    <!-- {{ filteredItems }} -->
    <v-navigation-drawer
      :permanent="navigation.ifPermanent"
      ref="drawer"
      app
      :dark="darkSwitch"
      :width="navigation.width"
      v-model="navigation.shown"
    >
      <v-layout column align-center>
        <v-flex>
          <v-avatar @click="goHome" size="150" tile class="ma-3">
            <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-card>
        <v-card-title class="title font-weight-light">
          <v-layout align-center justify-center row fill-height
            >Welcome to {{ userName }}</v-layout
          >
        </v-card-title>
      </v-card>
      <v-text-field
        v-model="search"
        class="mx-3 mt-4 customVTF"
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
        flat
      ></v-text-field>
      <v-list>
        <v-list-tile @click="goHome">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>

        <v-list-group v-for="(item, i) in filteredItems" :key="i">
          <v-icon slot="prependIcon" :color="icon_dark">{{ item.icon }}</v-icon>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </template>

          <div v-for="(subitem, i) in item.children" :key="i">
            <v-divider v-if="subitem.link === 'divider'"></v-divider>
            <v-list-tile
              v-else
              value="true"
              :to="subitem.link"
              class="ml-3 tile"
            >
              <v-list-tile-action>
                <v-icon>{{ subitem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="subitem.name"></v-list-tile-title>
            </v-list-tile>
          </div>
        </v-list-group>
      </v-list>

      <div class="locale-changer">
        <v-select
          class="mx-4 customVTF"
          v-model="$i18n.locale"
          :items="$i18n.availableLocales"
          label="Select Language"
          outline
        ></v-select>
      </div>
      <div class="pl-3">
        <v-switch
          v-model="navigation.ifPermanent"
          color="black"
          label="Permanent"
        ></v-switch>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { navbarSeeder } from "@/store/navBar";
import lodash from "lodash";
import deepdash from "deepdash";
import filterDeep from "deepdash/filterDeep";
const _ = deepdash(lodash);

export default {
  props: ["navigation"],
  data: () => ({
    search: "",
    searchItem: [],
    langs: ["ja", "en"],
    // ifPermanent: true,
    NavbarItems: navbarSeeder,
    darkSwitch: false,
    drawer: true
  }),

  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goTo(val) {
      this.$router.push({ path: val }).catch(err => {});
    },
    // drawer resizing
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navigation.borderSize + "px";
      i.style.cursor = "ew-resize";
    },
    setEvents() {
      const minSize = this.navigation.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      const vm = this;
      const direction = el.classList.contains("v-navigation-drawer--right")
        ? "right"
        : "left";

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "right"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        el.style.width = f + "px";
      }

      drawerBorder.addEventListener(
        "mousedown",
        function(e) {
          if (e.offsetX < minSize) {
            // m_pos = e.x;
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );

      document.addEventListener(
        "mouseup",
        function() {
          el.style.transition = "";
          vm.navigation.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    }
    // dataFilterMethod(data) {
    //   return this.data.filter(item => {
    //     return item.name.toLowerCase().match(this.search);
    //   });
    // }
  },
  computed: {
    filteredItems() {
      var search = this.search;
      console.log("-->", this.NavbarItems);
      let searchedArray = _.filterDeep(
        this.NavbarItems,
        item => (item.name.toLowerCase().match(search) ? true : false),
        { childrenPath: "children" }
      );
      return searchedArray;
    },
    userName() {
      return JSON.parse(localStorage.getItem("user")).name;
    },

    // Navigation
    NavbarItems_() {
      console.log(" NaV ", this.$store.getters.getNavbarItems);
      return this.$store.getters.getNavbarItems;
    },
    NavbarItemsFromLogin() {
      return JSON.parse(localStorage.getItem("menu"));
    },

    //snacker status getter
    direction() {
      return this.navigation.shown === false ? "Open" : "Closed";
    },
    icon_dark() {
      return this.darkSwitch === false ? "" : "white";
    },
    title_dark() {
      return this.darkSwitch === false ? "black" : "white";
    },
    //snackbar
    snackbar_color() {
      return this.$store.getters.getSnackbarColor;
    },
    snackbar_msg() {
      return this.$store.getters.getSnackbarMsg;
    },
    snackbar_timeout() {
      return this.$store.getters.getSnackbarTimeout;
    },
    snackbar_multiline() {
      return this.$store.getters.getSnackbarMultiline;
    },
    snackbar_vmodel: {
      get: function() {
        return this.$store.getters.getSnackbar;
      },
      set: function(val) {
        this.$store.commit("UNSET_SNACKBAR");
      }
    },

    //loading
    progress_status() {
      return this.$store.getters.getLoading;
    },
    progress_color() {
      return this.$store.getters.getLoadingColor;
    }
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  },
  created() {
    this.$store.dispatch("fetchNavbarItems");
    this.searchItem = JSON.parse(localStorage.getItem("menu"));
  }
};
</script>

<style lang="scss">
.theme--light.v-text-field--outline > .v-input__control > .v-input__slot {
  border: 1px solid rgba(153, 153, 153, 0.5);
}

.customVTF.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none;
}
</style>
