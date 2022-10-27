<template>
  <v-container fluid>
    <v-dialog v-model="admitCardDialogStatus" fullscreen>
      <v-toolbar dark color="light-blue darken-3" class="mt-1">
        <v-toolbar-title>
          <router-link
            v-if="isNotInConfig()"
            class="btn btn-fill btn-default"
            tag="button"
            to="/center/center-dashboard"
            >Examinee Count Info</router-link
          >

          <router-link
            v-if="isNotInConfig2()"
            class="btn btn-fill btn-default"
            tag="button"
            to="/admit-card-dd"
            >AdmitCard info</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="light-blue darken-3" class="mr-5">
            <v-layout row fill-height align-center justify-center>
              Current Center &nbsp; :&nbsp;
              {{ currentSubject.center_code }} -
              {{ currentSubject.center_name }}
            </v-layout>
          </v-card>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <admitCardCountByPaper
          :dialogStatus.sync="admitCardDialogStatus"
          :currentSubject="currentSubject"
        ></admitCardCountByPaper>
      </v-card>
    </v-dialog>

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
                  style="margin-top: -1.5em"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>

              <v-card-text class="title">
                <router-link
                  v-if="isNotInConfig()"
                  class="btn btn-fill btn-default"
                  tag="button"
                  to="/center/center-dashboard"
                  >Examinee Count By Subject</router-link
                >

                <router-link
                  v-if="isNotInConfig2()"
                  class="btn btn-fill btn-default"
                  tag="button"
                  to="/admit-card-dd"
                  >Admit Card By Subject</router-link
                >
              </v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAdmitCardDataBySubject"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs" style="padding: 0 0px; !important">
            <v-chip color="transparent"
              >{{ props.item.exam_code }} - {{ props.item.exam_name }}</v-chip
            >
          </td>
          <td class="text-xs display-4" style="padding: 0 0px; !important">
            <v-chip color="transparent"
              >{{ props.item.college_code }} -
              {{ props.item.college_name }}</v-chip
            >
          </td>
          <td class="text-xs-left">
            <v-btn small @click="viewAdmitCardColDetails(props.item)"
              >{{ props.item.subject_code }} -
              {{ props.item.subject_name }}</v-btn
            >
          </td>

          <!-- <td class="text-xs">{{ props.item.session }}</td> -->
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.student_count }}</td>
          <td class="justify-center text-xs-center">
            <v-layout row>
              <v-btn
                v-if="!ifCenterUser"
                small
                @click="downloadAdmit(props.item)"
                >Admit card</v-btn
              >
              <v-btn small @click="downLoadrollDescriptive(props.item)"
                >Descriptive Roll Sheet</v-btn
              >
              <v-btn small @click="downloadAttendanceSheet(props.item)"
                >attendance Sheet</v-btn
              >
            </v-layout>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <!-- {{ifCenterUser}} -->
    <!-- <div style="opacity: 0.2;" class="mt-5">
      came from :
      <pre>
        {{currentCollege}}
    </pre>
    </div>-->
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import admitCardCountByPaper from "@/components/admitCard/admitCardCountByPaper.vue";
export default {
  props: ["dialogStatus", "currentCollege"],
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    admitCardCountByPaper,
  },
  data() {
    return {
      admitCardDialogStatus: false,
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
          text: "Examinee Count",
          align: "center",
          value: "student_count",
          sortable: false,
        },
        { text: "Download", align: "center", value: "view", sortable: false },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    // this.$store.dispatch("fetchAdmitCardDataBySubject", this.searchParam);
  },
  computed: {
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
    isNotInConfig() {
      return this.$router.history.current["path"] !== "/admit-card-dd";
    },
    isNotInConfig2() {
      return (
        this.$router.history.current["path"] !== "/center/center-dashboard"
      );
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
      // this.$store.commit("SET_ADMIT_CARD_CURRENT_ITEM_DETAILS", item);
      this.currentSubject = item;
      this.currentSubject.center_code = this.currentCollege.center_code;
      this.admitCardDialogStatus = true;
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
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
