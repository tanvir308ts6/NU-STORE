<template>
  <div>
    <v-expansion-panel focusable>
      <v-expansion-panel-content class="mycustomExpansionPanel mt-20">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3">
              <v-layout row wrap align-center class="py-3">
                <v-flex md6>
                  <v-autocomplete
                    v-model="currentExam"
                    :items="getExamMasterList"
                    item-text="exam_display_name"
                    :item-value="[]"
                    label="Select Exam"
                    data-vv-name="exam_name"
                    :error-messages="errors.collect('id')"
                    required
                    prepend-icon="subject"
                    v-on:change="SetCurrentExam"
                  ></v-autocomplete>
                </v-flex>
                <!-- <v-flex md3>
                    <v-select
                      v-model="getProbableSchema.degree_group_code"
                      :items="getCollegeDegreeWiseDegreeGroup"
                      item-text="degree_group_name"
                      item-value="degree_group_code"
                      label="Select Degree Group"
                      data-vv-name="degree_group_code"
                      :error-messages="errors.collect('degree_group_code')"
                      required
                      prepend-icon="subject"
                    ></v-select>
                  </v-flex>
                  <v-flex md3 v-if="getProbableSchema.degree_code!=1">
                    <v-select
                      v-model="getProbableSchema.subject_code"
                      :items="getCollegeDegreeGroupWiseSubject"
                      item-text="subject_name"
                      item-value="subject_code"
                      label="Select Subject"
                      data-vv-name="subject_code"
                      :error-messages="errors.collect('subject_code')"
                      required
                      prepend-icon="subject"
                    ></v-select>
                </v-flex>-->
                <v-flex xs12 sm12 md12 style="margin-top: 40px">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchList()"
                      >Search</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-card color="white">
      <v-layout row class="mt-20">
        <v-card flat>
          <v-card-text class="title">Exam Routine</v-card-text>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-spacer />
        <v-card flat>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">DOWNLOAD ROUTINE</v-btn>
            <!-- <v-btn color="primary" @click="downloadAttendanceSheet"
              >DOWNLOAD ATTENDANCE</v-btn
            > -->
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-card>
    <!-- <pre> {{ getRoutineSchema }} </pre> -->
    <draggable
      class="list-group examRoutineDraggable"
      tag="ul"
      v-model="getRoutineSchema.routine"
      v-bind="dragOptions"
      :move="onMove"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="'flip-list'">
        <v-layout
          align-center
          justify-center
          row
          fill-height
          class="col-md-7 erLayoutCSS"
          v-for="item in getRoutineSchema.routine"
          :key="item"
        >
          <v-divider></v-divider>
          <v-flex xs2 class="text-xs-center">
            <div class="title">{{ getFormatedDate(item.date) }}</div>
            <div class="subheading">{{ item.day }}</div>
          </v-flex>
          <!-- <v-divider class="mx-3" inset vertical></v-divider> -->
          <v-flex xs10 class="text-xs-center erMidBoxCSS">
            <draggable
              class="list-group selectedPaperDraggable"
              tag="ul"
              v-model="item.papers"
              v-bind="dragOptions"
              :move="onMove"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" :name="'flip-list'">
                <v-item
                  v-for="element in item.papers"
                  :key="element.paper_code"
                >
                  <v-btn flat round color="primary" dark>
                    <div class="erMidBoxTextCSS">
                      ({{ element.paper_code }}) {{ element.paper_name }}
                    </div>
                  </v-btn>
                </v-item>
              </transition-group>
            </draggable>
          </v-flex>
        </v-layout>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import common_login_getters from "@/mixin/common_login_getters";
import common_getters_mixin from "@/mixin/common_getters_mixin";
import ClgCommonGet from "@/mixin/college_common_getters_mixin";
import admitCardCountByCenter from "@/components/admitCard/admitCardCountByCenter.vue";
import * as moment from "moment";
import Vue from "vue";
import draggable from "vuedraggable";
// import moment from "moment";
export default {
  mixins: [common_login_getters, common_getters_mixin, ClgCommonGet],
  components: { draggable, admitCardCountByCenter },
  data: () => ({
    calendarStatus: false,
    text: "Examination Center Panel",
    searchParam: {},
    topsheetParam: {
      date: new Date().toISOString().substr(0, 10)
    },
    rollDescriptiveParam: {},
    attendanceSheetParam: {},
    isDragging: false,
    delayedDragging: false,
    // date:
    date_ts: new Date().toISOString().substr(0, 10),
    menu_ts: false,
    currentExam: {}
  }),
  watch: {
    calendarStatus(val) {},
    getCorrectCenterStatus(val) {
      if (val) {
        // this.topsheetParam.center_code = this.getAuthUser.center.center_code;
        this.searchExamRoutineList();
      }
    },
    getExamInitiateId() {
      //   this.topsheetParam.center_code = this.getAuthUser.center.center_code;
      this.topsheetParam.exam_code = this.getLoggedInExam.code;
      this.topsheetParam.year = this.getLoggedInYear.year;
      this.topsheetParam.exam_initiate_id = this.getExamInitiateId;
    }
  },
  created() {
    this.$store.dispatch("getCollegeExamMasterList").then(response => {
      // console.log(response.data);
    });
    this.initialize();

    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
  },
  methods: {
    searchList() {
      let searchRoutineParam = {};
      searchRoutineParam.exam_code = this.currentExam.exam_code;
      searchRoutineParam.year = this.currentExam.exam_year;
      searchRoutineParam.exam_initiate_id = this.currentExam.id;
      searchRoutineParam.type = 1;
      this.$store
        .dispatch("searchExamRoutineData", searchRoutineParam)
        .then(data => {
          // console.log("RET Data ", data, data.data.length);
          // this.$store.commit("SET_ROUTINE_SCHEMA_DATA", data[0]);
          if (data.data.length) {
            console.log("if");
            this.$store.commit("SET_ROUTINE_SCHEMA_DATA", data.data[0]);
          } else {
            console.log("else");
            this.$store.commit("SET_ROUTINE_SCHEMA_DATA", {});
          }

          // console.log("routine data fetch done", this.getRoutineSchema);
        });
    },
    SetCurrentExam(obj) {
      console.log(obj);
      //   this.$store.commit("SET_LOGGEDIN_EXAM", {
      //     code: obj.exam_code,
      //   });
      //   this.$store.commit("SET_LOGGEDIN_YEAR", {
      //     year: obj.exam_year,
      //   });
      //   this.$store.commit("SET_EXAM_INITIATE_ID", obj.id);
      //   let searchRoutineParam = {};
      //   searchRoutineParam.exam_code = obj.code;
      //   searchRoutineParam.year = obj.exam_year;
      //   searchRoutineParam.exam_initiate_id = obj.id;
      //   searchRoutineParam.type = 1;
    },
    initialize() {
      //   this.topsheetParam.center_code = this.getAuthUser.center.center_code;

      this.topsheetParam.exam_code = this.getLoggedInExam.code;
      this.topsheetParam.year = this.getLoggedInYear.year;
      this.topsheetParam.exam_initiate_id = this.getExamInitiateId;
      // rollDescriptiveParam
      //   this.rollDescriptiveParam.center_code = this.getAuthUser.center.center_code;
      this.rollDescriptiveParam.exam_code = this.getLoggedInExam.code;
      this.rollDescriptiveParam.year = this.getLoggedInYear.year;
      this.rollDescriptiveParam.exam_initiate_id = this.getExamInitiateId;
      // attendanceSheetParam
      //   this.attendanceSheetParam.center_code = this.getAuthUser.center.center_code;

      this.attendanceSheetParam.exam_code = this.getLoggedInExam.code;
      this.attendanceSheetParam.year = this.getLoggedInYear.year;
      this.attendanceSheetParam.exam_initiate_id = this.getExamInitiateId;
      // fetch routine data
      //   this.searchExamRoutineList();
    },
    goto(link) {
      this.$router.push(link);
    },
    downLoadTopSheet(date = "") {
      // console.log("dat", this.topsheetParam);
      this.$store.dispatch("downLoadTopSheet", this.topsheetParam);
    },
    // center-descriptive
    downLoadrollDescriptive() {
      this.$store.dispatch(
        "downloadRollDescriptiveSheet",
        this.rollDescriptiveParam
      );
    },
    downloadAttendanceSheet() {
      console.log("exam code", this.currentExam.code);
      this.$store.dispatch(
        "downloadAttendanceSheet",
        this.attendanceSheetParam
      );
    },
    remove(arr, item) {
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },

    // UI Methods
    getFlexClass(i) {
      // console.log(i);
      let rand = this.getRndInt(3, 4);
      this.getHomeCardData[i].flex = rand;
      if (i % 3 == 2) {
        rand =
          12 -
          (this.getHomeCardData[i - 1].flex + this.getHomeCardData[i - 2].flex);
      }
      return "xs" + "" + rand;
    },
    getClass(hover, i) {
      let f = "";
      let c = "";
      if (!hover) {
        f = " ma-2 , elevation-2 , ";
        c = this.getRndColor() + " lighten-" + this.getRndInt(3, 5);

        if (
          this.getHomeCardData[i].color == undefined ||
          this.getHomeCardData[i].color != this.getHomeCardData[0].color
        ) {
          this.getHomeCardData[i].color = c;
        }

        if (i != 0) {
          if (this.getHomeCardData[i].color == this.getHomeCardData[0].color) {
            return f + this.getHomeCardData[0].color;
          } else {
            return f + c;
          }
        } else {
          this.getHomeCardData[i].color = c;
          return f + c;
        }
      } else {
        return "elevation-12 , ma-0  ";
      }
    },
    getRndColor() {
      var colors = [
        "red",
        "pink",
        "purple",
        "light-green",
        "indigo",
        "blue",
        "amber",
        "teal",
        "cyan",
        "light-blue"
      ];
      return colors[this.getRndInt(0, 9)];
    },
    getRndInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getCursor(link) {
      return link ? "cursor: pointer;" : "";
    },
    searchExamRoutineList() {
      let searchRoutineParam = {};
      searchRoutineParam.exam_code = this.getLoggedInExam.code;
      searchRoutineParam.year = this.getLoggedInYear.year;
      searchRoutineParam.exam_initiate_id = this.getExamInitiateId;
      searchRoutineParam.type = 1;
      this.$store
        .dispatch("searchExamRoutineData", searchRoutineParam)
        .then(data => {
          console.log("RET Data ", data);
          if (data.length) {
            this.$store.commit("SET_ROUTINE_SCHEMA_DATA", data[0]);
          } else {
            this.$store.commit("SET_ROUTINE_SCHEMA_DATA", {});
          }

          // console.log("routine data fetch done", this.getRoutineSchema);
        });
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    onMove() {}
  },
  computed: {
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    //subject
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },
    getAuthUser() {
      return this.$store.getters.getAuthUser;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getTotalStatus() {
      return this.$store.getters.getTotalStatus;
    },
    getAttendanceList() {
      return this.$store.getters.getattendanceItem;
    },
    getMenu() {
      return localStorage.getItem("menu");
    },
    goToCenterUsersList() {
      this.$router.push("/center/center_user");
    },
    getHomeCardData() {
      return [
        {
          icon: "store_mall_directory",
          title: "Center Profile",
          description:
            "This is Center Profile Panel. From this panel centers profile details can be seen.",
          link: "/center/center_profile"
        },

        {
          icon: "store_mall_directory",
          title: "Center User List",
          description:
            "This is Center User List Panel. From this panel centers User List details can be seen.",
          link: "/center/center_user"
        },
        {
          icon: "menu_book",
          title: "Final Examinee List",
          description:
            "This is Final Examinee List Panel. From this panel Final Examinee List details can be seen.",
          link: "/final-examinee-list"
        },
        {
          icon: "store_mall_directory",
          title: "Attendence List(RAW)",
          description:
            "This is the Attendence List Panel. From this panel Student Attendence List details can be seen.",
          link: "/std-attendence"
        },
        {
          icon: "store_mall_directory",
          title: "Attendance By EY",
          description:
            "This is the Student Attendance List By EXAM YEAR Panel. From this panel Student Attendance List By EXAM YEAR details can be seen.",
          link: "/attendence-by-exam-year"
        },
        {
          icon: "menu_book",
          title: "Invigilator Panel",
          description:
            "This is the Invigilator Panel. Invigilators condacts exams. From here Invigilator's detals can be seen.",
          link: "/invigilator-list"
        },
        {
          icon: "store_mall_directory",
          title: "Invigilator Access Panel",
          description:
            "This is the National University Invigilator Access Panel. From this panel Invigilator Access details can be seen.",
          link: "/invigilator-access"
        },
        {
          icon: "menu_book",
          title: "Blank Script Receive",
          description:
            "This is the Blank Script Receive Panel. Here we can see the information about blank script receive from regional center",
          link: "/center/bs-coll-from-reg"
        },
        {
          icon: "menu_book",
          title: "Answer Script Distribute Panel",
          description:
            "This is the Answer Script Distribute Panel. Here we can see the information about Answer Script Distribute to regional center.",
          link: "/center/as-dist-to-reg"
        },
        {
          icon: "store_mall_directory",
          title: "Loose Script Distribute Panel",
          description:
            "This is the Loose Script Distribute Panel. Here we can see the information about Loose Script Distribute to regional center.",
          link: "/center/ls-dist-to-reg"
        }
      ];
    },
    //routine schema
    getRoutineSchema() {
      return this.$store.getters.getRoutineSchema;
    },

    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style scope>
.examRoutineDraggable {
  margin-top: 24px !important;
  padding-left: 0px !important;
}
.selectedPaperDraggable {
  padding-left: 0px !important;
}
.erLayoutCSS {
  border-style: solid !important;
  /* border-radius: 15px 50px 30px; */
  border-width: thin;
}
.erMidBoxCSS {
  border-right-style: solid !important;
  border-left-style: solid !important;
  border-width: thin;

  font-size: 36px !important;
  font-weight: 400;
}
.erMidBoxTextCSS {
  font-size: 14px !important;
  font-weight: 400;
}
.erBtn {
  border-radius: 15px;
}
.mt-20 {
  margin-top: 20px !important;
}
</style>
