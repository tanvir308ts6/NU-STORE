<template>
  <div :key="getExamInitiateId">
    <!-- {{getCorrectCenterStatus}} -->
    <!-- {{getLoggedInExam}} -->
    <!-- {{getExamList}} -->
    <!-- {{exam}} -->
    <!-- {{year}} -->

    <!-- color="transparent"  -->
    <v-toolbar color="#FFFFFF" fixed clipped-left app>
      <v-toolbar-side-icon
        v-if="!navigation.ifPermanent"
        @click="navigation.shown = !navigation.shown"
      ></v-toolbar-side-icon>

      <!-- <v-avatar v-if="!navigation.shown" size="30" tile class="ml-2">
        <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
      </v-avatar>-->

      <!-- <v-toolbar-title>{{ $t("message") }}</v-toolbar-t1itle> -->
      <v-toolbar-title style="margin-left: 0px">
        <v-chip>
          <v-avatar color="primary">
            <span v-if="getTypeText.length != 0" class="white--text headline">
              {{ getTypeText }}
            </span>
            <!-- <span v-if="ifCenterUser" class="white--text headline">C</span> -->
            <img v-else :src="require('@/assets/nu_logos/nu_logo_r.png')" />
          </v-avatar>
          <span class="title">{{ userName }}</span>
        </v-chip>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="hidden-md-and-up"
        :color="stateCheck ? '#FAFAFA' : 'red lighten-2'"
        @click="initiateChooser = !initiateChooser"
      >
        <span class="title">
          Exam:{{ getLoggedInExam.code }} - Year:{{ getLoggedInYear.year }}
        </span>
      </v-btn>
       <!-- {{getLoggedInExam}} -->
      <v-card
        class="mx-4 hidden-sm-and-down"
        :flat="stateCheck"
        :color="stateCheck ? 'grey lighten-2' : 'red lighten-2'"
        style="border-radius: 0.5em"
      >

        <v-layout justify-center row fill-height>
          <v-autocomplete
            background-color="#FAFAFA"
            v-model="getLoggedInExam"
            :item-text="(item) => item.code + ' - ' + item.title"
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
            :persistent-hint="exam ? true : false"
            :style="getExamSelectorStyle()"
            :cache-items="true"
            :loading="ifGettingExamListDone"
            @change="setExamInitiateId($event)"
            outline
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                dark
                label
                close
                @input="closeButtonExamUpdate()"
                :selected="data.selected"
                style="padding-left: 0px; padding-right: 0px"
              >
                <span
                  class="subheading"
                  style="padding-left: 0px; padding-right: 0px"
                  >{{ data.item.code + " - " + data.item.title }}</span
                >
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.code + ' - ' + data.item.title"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>

          <!-- <v-divider inset class="mx-3" vertical></v-divider> -->

          <v-autocomplete
            v-model="getLoggedInYear"
            :items="getYearList"
            :item-text="(item) => '' + item.year + ''"
            item-value="year"
            label="Select Year"
            prepend-inner-icon="calendar_today"
            return-object
            class="ml-0"
            hide-selected
            single-line
            flat
            background-color="#FAFAFA"
            style="padding-left: 0px; padding-right: 0px; max-width: 10em"
            no-data-text="Please wait, We are fetching the year data"
            :cache-items="true"
            :loading="ifGettingYearListDone"
            @change="setExamInitiateId()"
            outline
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                dark
                label
                close
                @input="closeButtonUpdate()"
                :selected="data.selected"
                style="padding-left: 0px; padding-right: 0px"
              >
                <span
                  class="subheading"
                  style="padding-left: 0px; padding-right: 0px"
                  >{{ data.item.year }}</span
                >
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.year"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.year"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>

          <!-- <v-divider inset class="mx-3" vertical></v-divider> -->

          <v-autocomplete
            label="Select Type"
            item-text="exam_type_name"
            item-value="exam_type"
            v-model="getLoggedInExamType"
            :items="getExamType"
            v-validate="'required'"
            :error-messages="errors.collect('exam_type')"
            data-vv-name="exam_type"
            required
            class="ml-0"
            hide-selected
            single-line
            flat
            background-color="#FAFAFA"
            style="padding-left: 0px; padding-right: 0px; max-width: 15em"
            @change="setExamInitiateId()"
            outline
            hide-details
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                label
                dark
                close
                @input="getLoggedInExamType = 1"
                :selected="data.selected"
                class="subheading"
                style="padding-left: 0px; padding-right: 0px"
                >{{ data.item.exam_type_name }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.exam_type_name"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-layout>
      </v-card>

      <!-- <v-divider inset class="mx-3" vertical></v-divider> -->

      <v-list v-if="false" style="opacity: 0.3">
        <v-list-tile>
          <v-checkbox v-model="fromApi" :label="navFromApi" />
        </v-list-tile>
        <v-list-tile>
          <v-checkbox v-model="guard" :label="guardTitle" />
        </v-list-tile>
      </v-list>

      <notification v-if="false"></notification>

      <v-btn color="primary" @click="logout">
        <v-icon left dark>account_circle</v-icon>Logout
      </v-btn>
    </v-toolbar>

    <!-- navigation component  :navigationProp="navigation"-->
    <navDrawer v-if="fromApi" :navigation="navigation"></navDrawer>
    <navDrawerLocal v-else :navigation="navigation"></navDrawerLocal>

    <!-- gone -->
    <transition name="router-anim">
      <router-view style="margin-top: 0px"></router-view>
    </transition>
    <!-- snackbar -->
    <!-- <v-toolbar color="#FFFFFF">
      <v-btn></v-btn>
    </v-toolbar>-->

    <v-snackbar
      v-model="snackbar_vmodel"
      :color="snackbar_color"
      :timeout="snackbar_timeout"
      :multi-line="snackbar_multiline"
      bottom
      left
      id="test"
      class="test"
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
    <v-dialog v-model="initiateChooser" width="800px">
      <v-card
        class="pa-4"
        :flat="stateCheck"
        :color="stateCheck ? '#FAFAFA' : 'red lighten-2'"
        style="border-radius: 0.5em"
      >
        <v-layout justify-end column fill-height>
          <v-autocomplete
            background-color="#FAFAFA"
            v-model="getLoggedInExam"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            :items="getExamList"
            label="Select Exam"
            data-vv-name="exam_code"
            name="exam_code"
            prepend-inner-icon="store_mall_directory"
            return-object
            class="pa-2"
            single-line
            hide-selected
            :persistent-hint="exam ? true : false"
            flat
            style="padding-left: 0px; padding-right: 0px"
            no-data-text="Please wait, We are fetching the exam data"
            :cache-items="true"
            :loading="ifGettingExamListDone"
            @change="setExamInitiateId()"
            outline
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                dark
                label
                close
                @input="closeButtonExamUpdate()"
                :selected="data.selected"
                style="padding-left: 0px; padding-right: 0px"
              >
                <span
                  class="subheading"
                  style="padding-left: 0px; padding-right: 0px"
                  >{{ data.item.code + " - " + data.item.title }}</span
                >
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.code + ' - ' + data.item.title"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>

          <!-- <v-divider inset class="mx-3" vertical></v-divider> -->

          <v-autocomplete
            v-model="getLoggedInYear"
            :items="getYearList"
            :item-text="(item) => '' + item.year + ''"
            item-value="year"
            label="Select Year"
            prepend-inner-icon="calendar_today"
            return-object
            class="pa-2"
            hide-selected
            single-line
            flat
            background-color="#FAFAFA"
            style="padding-left: 0px; padding-right: 0px"
            no-data-text="Please wait, We are fetching the year data"
            :cache-items="true"
            :loading="ifGettingYearListDone"
            @change="setExamInitiateId()"
            outline
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                dark
                label
                close
                @input="closeButtonUpdate()"
                :selected="data.selected"
                style="padding-left: 0px; padding-right: 0px"
              >
                <span
                  class="subheading"
                  style="padding-left: 0px; padding-right: 0px"
                  >{{ data.item.year }}</span
                >
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.year"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.year"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>

          <!-- <v-divider inset class="mx-3" vertical></v-divider> -->

          <v-autocomplete
            label="Select Type"
            item-text="exam_type_name"
            item-value="exam_type"
            v-model="getLoggedInExamType"
            :items="getExamType"
            v-validate="'required'"
            :error-messages="errors.collect('exam_type')"
            data-vv-name="exam_type"
            required
            class="pa-2"
            hide-selected
            single-line
            flat
            background-color="#FAFAFA"
            style="padding-left: 0px; padding-right: 0px"
            @change="setExamInitiateId()"
            outline
            hide-details
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                label
                dark
                close
                @input="getLoggedInExamType = 1"
                :selected="data.selected"
                class="subheading"
                style="padding-left: 0px; padding-right: 0px"
                >{{ data.item.exam_type_name }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.exam_type_name"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-layout>
      </v-card>
    </v-dialog>
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
import navDrawer from "@/layouts/navDrawer.vue";
// import navDrawerLocal from "@/layouts/navDrawerLocal.vue";
import navDrawerLocal from "@/layouts/navDrawer_.vue";
import confirm from "@/components/utils/confirm.vue";
import layoutStyle from "@/layouts/layoutStyle.vue";
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  components: {
    confirm,
    navDrawer,
    navDrawerLocal,
    notification,
  },
  data: () => ({
    spflg: true,
    exam: {},
    snackbar: true,
    fromApi: true,
    guard: false,
    navigation: {
      shown: false,
      width: 370,
      borderSize: 2,
      ifPermanent: false,
    },
    examList: [],
    stateCheck: true,
    initiateChooser: false,
  }),
  watch: {
    guard: function(val) {
      if (val) {
        localStorage.setItem("guard", true);
      } else {
        localStorage.setItem("guard", false);
      }
    },
    getExamList: function() {
      if (this.getExamList.length > 0) this.processAssignedExamList();
    },
    getYearList: function() {
      if (this.getLoggedInYear.year == "")
        this.$store.commit("SET_LOGGEDIN_YEAR", this.getYearList[0]);
    },
    getExamInitiateId(val) {
      this.stateCheck = parseInt(val) == 0 ? false : true;
      console.log("getExamInitiateId::", val);
    },
  },
  methods: {
    getExamSelectorStyle() {
      return "";
    },
    closeButtonExamUpdate() {
      this.getLoggedInExam = {};
      this.setExamInitiateId();
    },
    closeButtonUpdate() {
      this.getLoggedInYear = {};
      this.setExamInitiateId();
    },

    // getLoggedInExam
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
        if (this.getLoggedInExam.code == "" && this.examList.length > 0) {
          // this.$store.commit("SET_LOGGEDIN_EXAM", this.examList[0]);
        }
      } catch (ex) {
        console.log("PROCESS ", ex);
      }
    },
    //Check localstorage data and load  when user reload page
    checkAndLoadLocalData() {
      this.guard = localStorage.getItem("guard") == "true";
      let loggedInExam = JSON.parse(localStorage.getItem("loggedInExam"));
      let loggedInYear = JSON.parse(localStorage.getItem("loggedInYear"));
      let loggedInDegree = JSON.parse(localStorage.getItem("loggedInDegree"));
      try {
        if (loggedInExam == null) {
          if (this.getAuthUser.exam_initiates.length > 0) {
            this.$store.commit("SET_LOGGEDIN_EXAM", {
              code: this.getAuthUser.exam_initiates[0].exam_code,
            });
          }
        } else {
          this.$store.commit("SET_LOGGEDIN_EXAM", {
            code: loggedInExam.code,
          });
        }
        if (loggedInDegree == null) {
          if (this.getAuthUser.exam_initiates.length > 0) {
            this.$store.commit("SET_LOGGEDIN_DEGREE", {
              code: this.getAuthUser.exam_initiates[0].exam.degree_code,
            });
          }
        } else {
          this.$store.commit("SET_LOGGEDIN_DEGREE", {
            code: loggedInDegree.code,
          });
        }
        if (loggedInYear == null) {
          if (this.getAuthUser.exam_initiates.length > 0) {
            this.$store.commit("SET_LOGGEDIN_YEAR", {
              code: this.getAuthUser.exam_initiates[0].exam_year,
            });
          }
        } else {
          this.$store.commit("SET_LOGGEDIN_YEAR", {
            year: loggedInYear.year,
          });
        }

        //Check and set Authuser if user data available in localstorage
        if (this.getAuthUser.id == undefined) {
          // console.log(" enterd ");
          this.$store.commit(
            "SET_AUTH_USER",
            JSON.parse(localStorage.getItem("user"))
          );
          // set loggedin exam

          // set loggedin  year

          if (this.getAuthUser.exam_initiates.length > 0) {
            // this.$store.commit(
            //   "SET_EXAM_INITIATE_ID",
            //   this.getAuthUser.exam_initiates[0].id
            // );
            this.$store.commit(
              "SET_LOGGEDIN_EXAM_TYPE",
              parseInt(this.getAuthUser.exam_initiates[0].exam_type)
            );
          }
        }
        if (this.getExamList.length < 1) {
          //check and set if Exam list data available in localstorage
          // console.log("sp: 1 : exam",this.getExamList );
          if (JSON.parse(localStorage.getItem("allExams")) != null) {
            console.log("sp: 2 : exam");
            this.$store.commit(
              "SET_EXAM_DATA",
              JSON.parse(localStorage.getItem("allExams"))
            );
            console.log("sp: 1 : exam", this.getExamList);
          } else {
            console.log("sp: 3 : exam");
            this.$store.dispatch("fetchExamData");
          }
        } else {
          console.log("sp: 4 : in else exam");
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
            let param = {
              limit: -1,
            };
            this.$store.dispatch("fetchYearData", param);
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
    setExamInitiateId(val) {
      // console.log("setExamInitiateId in----");
      if(val){
        this.$store.commit("SET_LOGGEDIN_DEGREE", {
        code: val.degree_code,
      });
      }
      if(val){
        this.$store.commit("SET_LOGGEDIN_EXAM_NAME", {
        exam_name: val.title,
      });
      }

      let id = 0;
      try {
        if (this.getLoggedInYear.year && this.getLoggedInExam.code) {
          this.getAuthUser.exam_initiates.forEach((e) => {
            // console.log("setExamInitiateId in for loop", e);
            if (
              this.getLoggedInExam.code == e.exam_code &&
              this.getLoggedInYear.year == e.year &&
              this.getLoggedInExamType == e.exam_type
            ) {
              id = e.id;
            }
          });
          // console.log("--spspps---", id);
        }
        this.$store.commit("SET_EXAM_INITIATE_ID", id);
      } catch (ex) {
        console.log("setExamInitiate Error", ex);
      }
      if (this.ifCenterUser) {
        this.setCorrectCenter();
        console.log("test", this.ifCenterUser);
      }
    },
    setCorrectCenter() {
      let payload = {
        // type: 1
      };
      payload.center_list_id = this.getAuthUser.center.id;
      payload.exam_initiate_id = this.getExamInitiateId;
      console.log(
        "payload +-+-+ :: ",
        payload,
        this.getAuthUser.center.center_code,
        this.getAuthUser.center.center_code
      );
      this.$store.commit("UNSET_CORRECT_CENTER_STATUS");
      this.$store
        .dispatch("setCorrectCenter", payload)
        .then(() => {
          console.log("sp: in then");
          this.$store.commit("SET_CORRECT_CENTER_STATUS");
          // getCenterAsAlloc
        })
        .catch(function(error) {
          console.log("sp: in catch");
          this.$store.commit("SET_CORRECT_CENTER_STATUS");
        });
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
    getTypeText() {
      let typeText = "";
      if (this.ifAdminUserType) typeText = "A";
      if (this.ifCenterUser) typeText = "C";
      if (this.ifRegionalUser) typeText = "R";
      if (this.ifInvigilatorUser) typeText = "I";

      return typeText;
    },
    userName() {
      return JSON.parse(localStorage.getItem("user")).email.split("@")[0];
    },
    getLoggedInExam: {
      get: function() {
        return this.$store.getters.getLoggedInExam;
      },
      set: function(value) {
        this.$store.commit("SET_LOGGEDIN_EXAM", value);
      },
      //
    },
    getLoggedInYear: {
      get: function() {
        return this.$store.getters.getLoggedInYear;
      },
      set: function(value) {
        this.$store.commit("SET_LOGGEDIN_YEAR", value);
      },
      //
    },
    getLoggedInExamType: {
      get: function() {
        return this.$store.getters.getLoggedInExamType;
      },
      set: function(value) {
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
      get: function() {
        return this.$store.getters.getSnackbar;
      },
      set: function(val) {
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
    // let loggedInExam = JSON.parse(localStorage.getItem("loggedInExam"));
    // let loggedInYear = JSON.parse(localStorage.getItem("loggedInYear"));
    // if (loggedInExam == null) {
    //   console.log("oooooooo: sp : sp :ooooooooo", loggedInExam);
    // }

    // this.$store.commit("SET_LOGGEDIN_EXAM", {
    //   code: loggedInExam.code
    // });
    // this.$store.commit("SET_LOGGEDIN_YEAR", {
    //   year: loggedInYear.year
    // });
    // this.checkAndLoadLocalData();
    // this.setExamInitiateId();
    // console.log("sp:", this.getExamInitiateId);
    this.$root.$confirm = this.$refs.confirm.open;
  },
  created() {
    this.checkAndLoadLocalData();
    this.setExamInitiateId();
  },
};
</script>
<style scoped>
.test{
  margin-left: 100px;
}
</style>
