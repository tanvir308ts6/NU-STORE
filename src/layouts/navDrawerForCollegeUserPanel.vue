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
          <v-avatar @click="goTo('/cu/dashboard')" size="150" tile class="ma-3">
            <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-card>
        <v-card-title class="title font-weight-light">
          <v-layout align-center justify-center row fill-height text-capitalize
            >Welcome to College User Panel</v-layout
          >
        </v-card-title>
      </v-card>
      <v-list>
        <v-list-tile @click="goTo('/cu/dashboard')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/profile')">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/ff/probable-list')">
          <v-list-tile-action>
            <v-icon>done_all</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Confirm Data Entry</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/ff/probable-data')">
          <v-list-tile-action>
            <v-icon>view_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Probable Candidate List</v-list-tile-title>
        </v-list-tile>
        
        <!-- <v-list-tile @click="goTo('/cu/ff/pending-student-data')">
          <v-list-tile-action>
            <v-icon>menu_book</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Pending Data (Student)</v-list-tile-title>
        </v-list-tile>-->
        <v-list-tile @click="goTo('/cu/ff/confirm-student-data')">
          <v-list-tile-action>
            <v-icon>list_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Applied Candidate List</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/ff/confirm-data')">
          <v-list-tile-action>
            <v-icon>filter_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Confirmed Candidate List</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/ff/admit-card')">
          <v-list-tile-action>
            <v-icon>cloud_done</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Admit Card</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/ff/fee_statement')">
          <v-list-tile-action>
            <v-icon>money</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Fee Summary</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/result-correction-application')">
          <v-list-tile-action>
            <v-icon>check_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Result Correction</v-list-tile-title>
        </v-list-tile>
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

          <v-list-tile @click="goTo('/cu/notices')">
            <v-list-tile-action>
              <v-icon>find_in_page</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Notice</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/cu/faqs')">
            <v-list-tile-action>
              <v-icon>quiz</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Faq</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/cu/general-instructions')">
            <v-list-tile-action>
              <v-icon>integration_instructions</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>General Instruction</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goTo('/cu/special-instructions')">
            <v-list-tile-action>
              <v-icon>explore</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Special Instruction</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="goTo('/cu/support')">
          <v-list-tile-action>
            <v-icon>support</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Support</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="goTo('/cu/change-password')">
          <v-list-tile-action>
            <v-icon>password</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Change Password</v-list-tile-title>
        </v-list-tile>
      </v-list>
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
      this.$router.push("/college/dashboard");
    },
    goTo(val) {
      //   alert(val);
      this.$router.push({ path: val }).catch(err => {});
    }
  }
};
</script>
