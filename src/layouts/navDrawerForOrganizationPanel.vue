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
          <v-avatar
            @click="goTo('/student/dashboard')"
            size="150"
            tile
            class="ma-3"
          >
            <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-card>
        <v-card-title class="title font-weight-light">
          <v-layout align-center justify-center row fill-height text-capitalize
            >Welcome to Organization Panel</v-layout
          >
        </v-card-title>
      </v-card>
      <v-list>
        <v-list-tile @click="goTo('/org/dashboard')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/org/profile')">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/org/cv')">
          <v-list-tile-action>
            <v-icon>domain_verification</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Certificate Verification</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/org/cv/request_list')">
          <v-list-tile-action>
            <v-icon>format_list_bulleted</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Request list</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/org/change-password')">
          <v-list-tile-action>
            <v-icon>password</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Change Password</v-list-tile-title>
        </v-list-tile>

        <!-- <v-list-group v-for="(item, i) in filteredItems" :key="i">
          <v-icon slot="prependIcon" :color="icon_dark">{{ item.icon }}</v-icon>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </template>

          <div v-for="(subitem, i) in item.children" :key="i">
            <v-list-tile value="true" :to="subitem.link" class="ml-3 tile">
              <v-list-tile-action>
                <v-icon>{{ subitem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="subitem.name"></v-list-tile-title>
            </v-list-tile>
          </div>
        </v-list-group>-->
      </v-list>

      <!-- <div class="locale-changer">
        <v-select
          class="mx-4 customVTF"
          v-model="$i18n.locale"
          :items="$i18n.availableLocales"
          label="Select Language"
          outline
        ></v-select>
      </div>
      <div class="pl-3">
        <v-switch v-model="navigation.ifPermanent" color="black" label="Permanent"></v-switch>
      </div>-->
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: ["navigation"],
  computed: {
    userName() {
      return JSON.parse(localStorage.getItem("student")).name;
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
    }
  },
  data: () => ({
    // search: "",
    // searchItem: [],
    // langs: ["ja", "en"],
    // ifPermanent: true,
    // NavbarItems: navbarItems,
    darkSwitch: false,
    drawer: true
  }),
  methods: {
    goHome() {
      this.$router.push("/student/dashboard");
    },
    goTo(val) {
      //   alert(val);
      this.$router.push({ path: val }).catch(err => {});
    }
  }
};
</script>
