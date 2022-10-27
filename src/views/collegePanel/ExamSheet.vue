<template>
  <v-container fluid>
    <v-container fluid>
      <v-expansion-panel focusable>
        <v-expansion-panel-content class="mycustomExpansionPanel">
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
                  <v-flex xs12 sm12 md12 style="margin-top:40px;">
                    <v-layout justify-center row fill-height align-center>
                      <v-btn color="primary" large @click="searchList()">Search</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>


    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>

              <v-card-text class="title">Exam Sheet</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <admitCardCountByCollege
          :dialogStatus.sync="admitCardDialogStatus"
          :current="current"
        ></admitCardCountByCollege>
    </v-container>
    <div style="opacity: 0.2;" class="mt-5">
      came from :
      <pre>
        <!-- {{college}} -->
    </pre>
    </div>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import ClgCommonGet from "@/mixin/college_common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import admitCardCountByCollege from "@/components/admitCard/admitCardCountByCollege.vue";
export default {
  props: ["dialogStatus", "currentCollege"],
  mixins: [commonGet, commonExamYear, ClgCommonGet],
  components: {
    admitCardCountByCollege
  },
  data() {
    return {
      admitCardDialogStatus: false,
      currentExam: {},
      currentItem: {},
      currentSubject: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      sl_count: 0,
      loading: false,
      searchParam: {},
      expand: false,
      headers: [
        { text: "SL.", align: "left", value: "id", sortable: false },
        { text: "Exam", value: "exam_code", sortable: false },
        { text: "College ", value: "college_code", sortable: false },
        { text: "Subject", value: "subject_code", sortable: false },
        { text: "Year", value: "year", sortable: false },
        {
          text: "Student Count",
          align: "center",
          value: "student_count",
          sortable: false,
        },
        { text: "Download", align: "center", value: "view", sortable: false },
      ],
    };
  },
  created() {
    this.$store.dispatch("getCollegeExamMasterList").then((response) => {
      // console.log(response.data);
    });
    this.$store.commit("SET_LOGGEDIN_EXAM", {
      code: 3302,
    });
    this.$store.commit("SET_LOGGEDIN_YEAR", {
      year: 2017,
    });
    this.$store.commit("SET_EXAM_INITIATE_ID", 63);
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.college_code = "0201";
    // this.$store.dispatch("fetchAdmitCardDataBySubject", this.searchParam);
  },
  computed: {
    college() {
      return this.$store.getters.getAuthCollege;
    },
    getAdmitCardDataBySubject() {
      return this.$store.getters.getAdmitCardDataBySubject;
    },
  },
  methods: {
    getParam() {
      let param = {};
      param.college_code = this.currentCollege.college_code;
      param.center_code = this.currentCollege.center_code;
      param.exam_initiate_id = this.currentCollege.exam_initiate_id;
      param.exam_code = this.currentCollege.exam_code;
      param.year = this.currentCollege.year;
      return param;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    downLoadrollDescriptive(item) {
      let param = this.getParam();
      param.subject_code = item.subject_code;

      this.$store.dispatch("downloadRollDescriptiveSheet", param);
    },
    downloadAttendanceSheet(item) {
      let param = this.getParam();
      param.subject_code = item.subject_code;

      this.$store.dispatch("downloadAttendanceSheet", param);
    },
    // resolve(response.data.meta);
    fetchAdmitCardDataBySubject() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchAdmitCardDataBySubject", this.searchParam)
        .then((data) => {
          console.log("return data fetchAdmitCardDataBySubject-<", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },

    processAdmitCardGenColWise() {
      // console.log("--->", this.searchParam.exam_code);

      if (this.searchParam.exam_code == null || this.searchParam.year == null) {
        console.log("in if --> Null");
        this.$store.commit("SET_SNACKBAR", {
          msg: "Exam or Year not selected ",
          color: "red",
        });
      } else {
        console.log("in else --> Not Null");
        this.$root
          .$confirm("Are you sure that you want to Generate?")
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("generateAdmitCardColwise", this.searchParam)
                .then(() => {
                  console.log("success");
                });
            }
          });
      }
    },
    onStartedDownload(id) {
      console.log(`Started downloading: ${id}`);
    },

    onFailed(error) {
      console.log(`Download failed: ${error}`);
    },
    downloadAdmit(item) {
      console.log("down method", item);
      var param = {
        exam_code: item.exam_code,
        subject_code: item.subject_code,
        exam_year: item.year,
        college_code: item.college_code,
        module_name: "College",
      };

      this.$store.dispatch("downloadAdmitCollegewise", param).then((result) => {
        console.log("in then", result);
        result.forEach((url) => {
          setTimeout(function () {
            var fileLink = document.createElement("a");
            fileLink.href = url;
            fileLink.setAttribute("download", "file.pdf");
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
          }, 1000);
        });
      });
    },

    viewAdmitCard(item) {
      this.$refs.refAdmitCard.searchParam.exam_code = item.exam_code;
      this.$refs.refAdmitCard.searchParam.college_code = item.college_code;
      this.$refs.refAdmitCard.searchParam.year = item.year;
      this.$refs.refAdmitCard.searchParam.session_year = item.session;
      this.$refs.refAdmitCard.admitGenMode = false;
      this.$refs.refAdmitCard.centerMode = false;
      this.$refs.refAdmitCard.collegeMode = false;
      this.$refs.refAdmitCard.paperMode = false;
      this.$refs.refAdmitCard.regMode = true;
      this.$refs.refAdmitCard.searchAdmitCardList();
      this.admitCardDialogStatus = !this.admitCardDialogStatus;
    },
    viewAdmitCardColDetails(item) {
      console.log(item);
      // this.$store.commit("SET_ADMIT_CARD_CURRENT_ITEM_DETAILS", item);
      this.currentSubject = item;
      this.currentSubject.center_code = item.center_code;
      this.admitCardDialogStatus = true;
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    },
    SetCurrentExam(obj) {
      this.$store.commit("SET_LOGGEDIN_EXAM", {
        code: obj.exam_code,
      });
      this.$store.commit("SET_LOGGEDIN_YEAR", {
        year: obj.exam_year,
      });
      this.$store.commit("SET_EXAM_INITIATE_ID", obj.id);
    },
    searchList() {
      this.fetchAdmitCardDataBySubject();
    },
  },
  watch: {
    pagination() {
      this.fetchAdmitCardDataBySubject();
    },
    currentCollege(val) {
      console.log("sppsps");
      this.searchParam.center_code = val.center_code;
      this.searchParam.college_code = val.college_code;
      this.fetchAdmitCardDataBySubject();
    },
  },
  mounted() {
    this.searchParam.college_code = this.college.college_code;
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
