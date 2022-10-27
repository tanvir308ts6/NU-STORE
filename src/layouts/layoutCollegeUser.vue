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
      <!-- <v-divider inset class="mx-3 myDividerInsert" vertical></v-divider> -->
      <!-- hide-details solo-->

      <!-- <v-autocomplete
        background-color="#FAFAFA"
        v-model="exam"
        :item-text="item => '(' + item.code + ') ' + item.title"
        item-value="code"
        :items="getExamList"
        label="Select Exam"
        data-vv-name="exam_code"
        name="exam_code"
        prepend-inner-icon="store_mall_directory"
        return-object
        class="ml-0"
        single-line
        hide-selected
        :hint="year?'Selected Exam':''"
        :persistent-hint="exam?true:false"
        flat
        style="padding-left: 0px; padding-right: 0px;"
        no-data-text="Please wait, We are fetching the exam data"
        :cache-items="true"
        :loading="ifGettingExamListDone"
      >
        <template v-slot:selection="data">
          <v-chip
            color="#FAFAFA"
            close
            @input="exam = {}"
            :selected="data.selected"
            style="padding-left: 0px; padding-right: 0px;"
          >
            <span
              class="subheading"
              style="padding-left: 0px; padding-right: 0px;"
            >{{ '(' + data.item.code + ') ' + data.item.title }}</span>
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>-->
      <!-- <v-divider inset class="mx-3" vertical></v-divider> -->
      <!-- single-line  hide-details-->
      <!-- <v-autocomplete
        v-model="year"
        :items="getYearList"
        :item-text="item => '' + item.year + '' "
        item-value="year"
        label="Select Year"
        prepend-inner-icon="calendar_today"
        return-object
        class="ml-0"
        hide-selected
        single-line
        flat
        background-color="#FAFAFA"
        :hint="year?'Selected Year':''"
        :persistent-hint="year?true:false"
        style="padding-left: 0px; padding-right: 0px;"
        no-data-text="Please wait, We are fetching the year data"
        :cache-items="true"
        :loading="ifGettingYearListDone"
      >
        <template v-slot:selection="data">
          <v-chip
            color="#FAFAFA"
            close
            @input="year = {}"
            :selected="data.selected"
            style="padding-left: 0px; padding-right: 0px;"
          >
            <span
              class="subheading"
              style="padding-left: 0px; padding-right: 0px;"
            >{{ data.item.year }}</span>
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.year"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.year"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>-->

      <v-spacer></v-spacer>

      <!-- <v-list style="opacity: .3; ">
        <v-list-tile>
          <v-checkbox v-model="fromApi" :label="navFromApi" />
        </v-list-tile>
        <v-list-tile>
          <v-checkbox v-model="guard" :label="guardTitle" />
        </v-list-tile>
      </v-list>-->

      <!-- <notification></notification> -->

      <v-btn color="primary" @click="logout">
        <v-icon left dark>account_circle</v-icon>Logout
      </v-btn>
    </v-toolbar>

    <!-- navigation component  :navigationProp="navigation"-->
    <navDrawer
      v-if="fromApi && currentPrivilege"
      :navigation="navigation"
    ></navDrawer>
    <navDrawerLocal
      v-else-if="currentPrivilege"
      :navigation="navigation"
    ></navDrawerLocal>
    <collegeUserInfo :currentPrivilege="currentPrivilege" />

    <!-- gone -->
    <transition name="router-anim" v-if="currentPrivilege">
      <router-view></router-view>
    </transition>
    <div v-else>
      <choosePrivilege :userData="collegeUser" />
    </div>
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
    <!-- <v-btn dark fab fixed bottom left>
      <v-icon>add</v-icon>
    </v-btn>-->
    <!-- 
    <v-btn fixed fab bottom left small @click="goBack()">
      <v-icon large>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn fixed fab bottom right small class="_myCustfab" @click="goNext()">
      <v-icon large>keyboard_arrow_right</v-icon>
    </v-btn>-->
    <!-- <pre>{{currentPrivilege}}</pre> -->
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
import navDrawer from "@/layouts/navDrawerForCollegeUserPanel.vue";
import navDrawerLocal from "@/layouts/navDrawerLocal.vue";
import confirm from "@/components/utils/confirm.vue";
import choosePrivilege from "@/views/collegeUserPanel/choosePrivilege";
import collegeUserInfo from "@/views/collegeUserPanel/collegeUserInfo";
export default {
  components: {
    collegeUserInfo,
    confirm,
    navDrawer,
    navDrawerLocal,
    notification,
    choosePrivilege
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
    },
    currentPrivilege() {
      return this.$store.getters.getCollegeUserCurrentPrivilege;
    },
    collegeUser() {
      return this.$store.getters.getAuthCollegeUser;
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
        .dispatch("logoutCollegeUser")
        .then(() => {
          this.$router.push("/cu-login");
        })
        .catch(() => {
          alert("wrong");
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
  mounted() {
    this.$root.$confirm = this.$refs.confirm.open;
  }
};
</script>
