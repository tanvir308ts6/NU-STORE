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
            >Welcome to Student Panel</v-layout
          >
        </v-card-title>
      </v-card>
      <v-list>
        <v-list-tile @click="goTo('/student/dashboard')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/student/profile')">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/student/ff/from_fill_up_option')">
          <v-list-tile-action>
            <v-icon>dynamic_form</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Form Fill Up</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/student/results')">
          <v-list-tile-action>
            <v-icon>light_mode</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Result</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/student/consolidated-results')">
          <v-list-tile-action>
            <v-icon>gamepad</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Consolidated Result</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/student/re-scrutiny')">
          <v-list-tile-action>
            <v-icon>web_asset</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Re-scrutiny Apply</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/student/result-correction')">
          <v-list-tile-action>
            <v-icon>check_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Result Correction Apply</v-list-tile-title>
        </v-list-tile>
        <!--
        <v-list-tile @click="goTo('/student/faq')">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>FAQ</v-list-tile-title>
        </v-list-tile>
        -->
        <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-icon>help_outline</v-icon>
              <v-list-tile-content>
                <v-list-tile-title style="margin-left: 30px;"
                  >Help Desk</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile @click="goTo('/student/notices')">
            <v-list-tile-action>
              <v-icon>find_in_page</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Notice</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/student/faqs')">
            <v-list-tile-action>
              <v-icon>quiz</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Faq</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/student/general-instructions')">
            <v-list-tile-action>
              <v-icon>integration_instructions</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>General Instruction</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/student/special-instructions')">
            <v-list-tile-action>
              <v-icon>explore</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Special Instruction</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="goTo('/student/change-password')">
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
