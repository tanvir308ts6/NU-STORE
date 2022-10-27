<template>
  <div>
    <v-toolbar flat white color="transparent">
      <v-toolbar-side-icon
        v-if="!navigation.ifPermanent"
        @click="navigation.shown = !navigation.shown"
      ></v-toolbar-side-icon>

      <v-avatar v-if="!navigation.shown" size="30" tile class="ml-2">
        <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
      </v-avatar>

      <v-toolbar-title>{{ $t("message") }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click="logout">
        <v-icon left dark>account_circle</v-icon>Logout
      </v-btn>
    </v-toolbar>

    <!-- navigation component  :navigationProp="navigation"-->
    <navDrawer v-if="fromApi" :navigation="navigation"></navDrawer>
    <!-- <navDrawerLocal v-else :navigation="navigation"></navDrawerLocal> -->
    <info />

    <!-- gone -->
    <transition name="router-anim">
      <router-view></router-view>
    </transition>
    <!-- snackbar -->

    <v-snackbar
      v-model="snackbar_vmodel"
      :color="snackbar_color"
      :timeout="snackbar_timeout"
      :multi-line="snackbar_multiline"
      bottom
      left
    >
      {{ snackbar_msg }}
      <v-icon color="white" flat @click="snackbar_vmodel = false">clear</v-icon>
    </v-snackbar>
    <!-- v-progress-circular -->
    <v-layout row justify-center>
      <v-dialog
        v-model="progress_status"
        persistent
        fullscreen
        content-class="loading-dialog"
      >
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="100"
              :width="10"
              :color="progress_color"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <confirm ref="confirm"></confirm>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div class="subheading font-italic">
        Developed by
        <a href="https://www.eatlbd.com/">EATL</a> -
        <a href="http://www.bigm-bd.com/">Bigm</a> -
        <a href="https://i360bd.com/">I360</a>
      </div>
    </v-footer>
  </div>
</template>
<script>
import notification from "@/layouts/notification.vue";
import navDrawer from "@/layouts/navDrawerForOrganizationPanel.vue";
import navDrawerLocal from "@/layouts/navDrawerLocal.vue";
import confirm from "@/components/utils/confirm.vue";
import info from "@/views/OrganizationPanel/info";
export default {
  components: {
    confirm,
    navDrawer,
    navDrawerLocal,
    notification,
    info
  },
  computed: {
    progress_status() {
      return this.$store.getters.getLoading;
    },
    progress_color() {
      return this.$store.getters.getLoadingColor;
    },
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
    }
  },
  data: () => ({
    fromApi: true,
    guard: false,
    navigation: {
      shown: true,
      width: 350,
      borderSize: 2,
      ifPermanent: false
    }
  }),
  watch: {},
  methods: {
    logout() {
      this.$store
        .dispatch("orgLogout")
        .then(() => {
          this.$router.push("/org-login");
        })
        .catch(() => {
          //   alert("wrong");
        });
    },
    navFromApi() {
      if (this.fromApi) {
        return "Api";
      } else {
        return "Local";
      }
    }
  },
  mounted() {}
};
</script>
