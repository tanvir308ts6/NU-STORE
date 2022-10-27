<template>
  <div>
    <!-- {{getAuthUserExamInitiates}}-->
    <!-- {{exam}} -->
    <!-- {{year}} -->
    <!-- <v-toolbar flat white color="transparent">
      <v-toolbar-side-icon
        v-if="!navigation.ifPermanent"
        @click="navigation.shown = !navigation.shown"
      ></v-toolbar-side-icon>

      <v-avatar v-if="!navigation.shown" size="30" tile class="ml-2">
        <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
      </v-avatar>

      <v-toolbar-title>{{ $t("message") }}</v-toolbar-title>
      <v-divider inset class="mx-3 myDividerInsert" vertical></v-divider>


      <v-divider inset class="mx-3" vertical></v-divider>

    </v-toolbar>-->

    <v-toolbar color="primary" dark extended>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-avatar v-if="!navigation.shown" size="30" tile class="ml-2">
        <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
      </v-avatar>
      <v-toolbar-title>National University, Bangladesh</v-toolbar-title>

      <!-- <template v-slot:extension>
        <v-toolbar-title class="white--text">Online Certificate Verifiation</v-toolbar-title>
      </template>-->

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="certificateList">Certificate list</v-btn>
        <v-btn flat @click="transaction">Transactions</v-btn>
      </v-toolbar-items>
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <!-- <v-list>
          <v-list-tile>
        <v-list-tile-title>-->
        <v-card>
          <v-btn color="primary" medium @click="logout">
            <v-icon>account_circle</v-icon>Logout
          </v-btn>
        </v-card>

        <!-- </v-list-tile-title>
          </v-list-tile>
        </v-list>-->
      </v-menu>
    </v-toolbar>

    <!-- navigation component  :navigationProp="navigation"-->
    <navDrawer v-if="fromApi" :navigation="navigation"></navDrawer>
    <navDrawerLocal v-else :navigation="navigation"></navDrawerLocal>

    <!-- gone -->
    <transition name="router-anim">
      <v-layout row pb-2>
        <v-flex xs8 offset-xs2>
          <router-view></router-view>
        </v-flex>
      </v-layout>
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
    <!-- {{getExamList}} -->
  </div>
</template>

<script>
import notification from "@/layouts/notification.vue";
import navDrawer from "@/layouts/navDrawer.vue";
// import navDrawerLocal from "@/layouts/navDrawerLocal.vue";
import navDrawerLocal from "@/layouts/navDrawer_.vue";
import confirm from "@/components/utils/confirm.vue";
import layoutStyle from "@/layouts/layoutStyle.vue";
export default {
  components: {
    confirm,
    navDrawer,
    navDrawerLocal,
    notification,
  },
  data: () => ({
    exam: {},
    snackbar: true,
    fromApi: true,
    guard: false,
    navigation: {
      shown: false,
      width: 380,
      borderSize: 2,
      ifPermanent: false,
    },
    examList: [],
  }),
  watch: {
    guard: function (val) {
      if (val) {
        localStorage.setItem("guard", true);
      } else {
        localStorage.setItem("guard", false);
      }
    },
    getExamList: function () {
      //after loading all exam data call to update exam dropdown list according to assigned exam list
      if (this.getExamList.length > 0) this.processAssignedExamList();
    },
    getYearList: function () {
      // console.log("GET year list watch ", this.getYearList)
      // console.log("LOgged in yer ", this.getLoggedInYear)
      // Set first exam year if no exam_initiates found
      if (this.getLoggedInYear.year == "")
        this.$store.commit("SET_LOGGEDIN_YEAR", this.getYearList[0]);
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logoutUser")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("wrong...logout process");
        });
    },
    transaction() {
      this.$router.push("/online/online-certificate-add");
    },
    certificateList() {
      this.$router.push("/online/online-certificate-list");
    },
    // prepare exam list according to assigned exam
    processAssignedExamList() {
      let count = 0;
      try {
        this.getAssignedExamList.forEach((element) => {
          count++;
          for (var i = 0; i < this.getExamList.length; i++) {
            if (element.exam_code == this.getExamList[i].code) {
              this.examList.push(this.getExamList[i]);
            }
          }
        });
        // Check if no assigned exam found set all exam to current user
        if (count == 0)
          this.examList = JSON.parse(JSON.stringify(this.getExamList));
        // Set first exam if no exam_initiates found
        if (this.getLoggedInExam.code == "" && this.examList.length > 0)
          this.$store.commit("SET_LOGGEDIN_EXAM", this.examList[0]);
      } catch (ex) {
        console.log("PROCESS ", ex);
      }
    },
    //Check localstorage data and load  when user reload page
    checkAndLoadLocalData() {
      this.guard = localStorage.getItem("guard") == "true";
      // console.log("check and reload");
      try {
        //Check and set Authuser if user data available in localstorage
        if (this.getAuthUser.id == undefined) {
          // console.log(" enterd ");
          this.$store.commit(
            "SET_AUTH_USER",
            JSON.parse(localStorage.getItem("user"))
          );
          // set loggedin exam year and type
          if (this.getAuthUser.exam_initiates.length > 0) {
            this.$store.commit("SET_LOGGEDIN_EXAM", {
              code: this.getAuthUser.exam_initiates[0].exam_code,
            });
            this.$store.commit("SET_LOGGEDIN_YEAR", {
              year: this.getAuthUser.exam_initiates[0].year,
            });
            this.$store.commit(
              "SET_EXAM_INITIATE_ID",
              this.getAuthUser.exam_initiates[0].id
            );
            this.$store.commit(
              "SET_LOGGEDIN_EXAM_TYPE",
              parseInt(this.getAuthUser.exam_initiates[0].exam_type)
            );
          }
        }
        if (this.getExamList.length < 1) {
          //check and set if Exam list data available in localstorage
          if (JSON.parse(localStorage.getItem("allExams")) != null) {
            this.$store.commit(
              "SET_EXAM_DATA",
              JSON.parse(localStorage.getItem("allExams"))
            );
          } else {
            this.$store.dispatch("fetchExamData");
          }
        }
        // console.log("year", this.getYearList);
        if (this.getYearList.length < 1) {
          //check and set if Year list data available in localstorage
          if (JSON.parse(localStorage.getItem("allYears")) != null) {
            // console.log("year 2", this.getYearList);
            this.$store.commit(
              "SET_ALL_YEARS",
              JSON.parse(localStorage.getItem("allYears"))
            );
          } else {
            this.$store.dispatch("fetchYearData");
          }
        }
        // Check and set if assigned exam data available in localstorage
        if (this.getAssignedExamList.length < 1) {
          this.$store.commit(
            "SET_ASSIGNED_EXAMS",
            JSON.parse(localStorage.getItem("exams"))
          );
          // set user exam list
          this.processAssignedExamList();
        } else if (this.examList.length < 1)
          // if exam dropdown list is empty
          this.processAssignedExamList();
      } catch (ex) {
        console.log("CHECK AND LOAD error--- ", ex);
      }
    },
    setExamInitiateId() {
      try {
        let id = 0;
        if (this.getLoggedInYear.year && this.getLoggedInExam.code) {
          this.getAuthUser.exam_initiates.forEach((e) => {
            if (
              this.getLoggedInExam.code == e.exam_code &&
              this.getLoggedInYear.year == e.year &&
              this.getLoggedInExamType == e.exam_type
            ) {
              id = e.id;
            }
          });
        }
        this.$store.commit("SET_EXAM_INITIATE_ID", id);
      } catch (ex) {
        console.log("setExamInitiate Error", ex);
      }
    },

    login() {
      alert("login");
    },
    logout() {
      this.$store
        .dispatch("logoutUser")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("wrong...logout process");
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    goNext() {
      this.$router.go(1);
    },
  },
  computed: {
    // getLoggedInExam() {
    //   return this.$store.getters.getLoggedInExam;
    // },
    getLoggedInExam: {
      get: function () {
        return this.$store.getters.getLoggedInExam;
      },
      set: function (value) {
        this.$store.commit("SET_LOGGEDIN_EXAM", value);
      },
      //
    },
    getLoggedInYear: {
      get: function () {
        return this.$store.getters.getLoggedInYear;
      },
      set: function (value) {
        this.$store.commit("SET_LOGGEDIN_YEAR", value);
      },
      //
    },
    getLoggedInExamType: {
      get: function () {
        return this.$store.getters.getLoggedInExamType;
      },
      set: function (value) {
        this.$store.commit("SET_LOGGEDIN_EXAM_TYPE", value);
      },
      //
    },
    getExamType() {
      return [
        { exam_type_name: "General/Regular", exam_type: 1 },
        { exam_type_name: "Special", exam_type: 2 },
      ];
    },
    getAuthUser() {
      return this.$store.getters.getAuthUser;
    },

    getYearList() {
      return this.$store.getters.getYearItems;
    },
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    ifGettingExamListDone() {
      return this.$store.getters.getExamItem.length > 0 ? false : true;
    },
    ifGettingYearListDone() {
      return this.$store.getters.getYearItems.length > 0 ? false : true;
    },
    getAuthUserExamInitiates() {
      return this.$store.getters.getAuthUserExamInitiates;
    },
    getAssignedExamList() {
      return this.$store.getters.getAssignedExamList;
    },
    // getAuthUserExamInitiates
    //snacker status getter

    //snackbar
    navFromApi() {
      if (this.fromApi) {
        return "Api";
      } else {
        return "Local";
      }
    },
    guardTitle() {
      if (this.guard) {
        return "Guard on";
      } else {
        return "Guard off";
      }
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
      get: function () {
        return this.$store.getters.getSnackbar;
      },
      set: function (val) {
        this.$store.commit("UNSET_SNACKBAR");
      },
    },

    //loading
    progress_status() {
      return this.$store.getters.getLoading;
    },
    progress_color() {
      return this.$store.getters.getLoadingColor;
    },
  },
  mounted() {
    this.$root.$confirm = this.$refs.confirm.open;
  },
  created() {
    this.checkAndLoadLocalData();
  },
};
</script>
