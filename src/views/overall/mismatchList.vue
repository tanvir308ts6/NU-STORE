<template>
  <v-container fluid>
    <v-expansion-panel
      class="mb-3"
      inset
      v-model="open"
      v-if="forceRerenderFlag"
    >
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout column class="mx-5">
          <v-flex class="mx-3">
            <v-layout row wrap align-center>
              <!-- {{getLoggedInExam}} -->
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                  prepend-icon="store_mall_directory"
                ></v-select>
              </v-flex>
              <!-- {{getLoggedInYear}} -->
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="(item) => '' + item.year + ''"
                  item-value="year"
                  label="Year"
                  prepend-icon="calendar_today"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-checkbox
                  v-model="searchParam.attendance"
                  label="Attendance"
                  class="mt-5 mr-2 ml-2"
                  color="indigo darken-3"
                  @change="absentStatus($event)"
                ></v-checkbox>
                <v-checkbox
                  v-model="searchParam.theory"
                  label="Theory Marks"
                  class="mt-5 mr-2 ml-2"
                  color="indigo darken-3"
                  @change="theoryMarkStatus($event)"
                ></v-checkbox>

                <!-- <v-checkbox
                  v-model="searchParam.practical"
                  label="Practical"
                  class="mt-5 mr-2 ml-2"
                  color="indigo darken-3"
                  @change="practicalStatus($event)"
                  ></v-checkbox>-->

                <!-- <v-checkbox
                  v-model="searchParam.viva"
                  label="Viva"
                  class="mt-5 mr-2 ml-2"
                  color="indigo darken-3"
                  @change="vivaStatus($event)"
                  ></v-checkbox>-->
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchMismatchList">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

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
                  medium
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title mt-2">Mismatch List</v-card-text>
            </v-badge>
          </v-card>

          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />

          <v-btn
            medium
            color="primary"
            class="white--text"
            @click="generateReport()"
          >
            <v-icon dark>arrow_downward</v-icon>Download Mismatch List
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getMismatchList"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.session_year }}</td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.center_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.center_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.college_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.college_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.subject_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.subject_code }}</span>
            </v-tooltip>
          </td>
          <!-- <td class="text-xs">{{ props.item.student_name }}</td> -->
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.paper_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.paper_code }}</span>
            </v-tooltip>
          </td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.attendance_status == 'NO'"
              >Absent</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.attendance_status == 'YES'"
              >Present</v-chip
            >
          </td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.theory_status == 'NO'"
              >No</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.theory_status == 'YES'"
              >Yes</v-chip
            >
          </td>
          <!-- <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.practical_status == 0"
            >Not Collected</v-chip>
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.practical_status == 1"
            >Collected</v-chip>
          </td>-->
          <!-- <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.viva_status == 0"
            >Not Collected</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.viva_status == 1">Collected</v-chip>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      sl_count: 0,
      search: "",
      searchParam: {},
      exam_name: "",
      exam_year: "",
      headers: [
        { text: "SL", value: "sl" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Registration No", value: "reg_no" },
        { text: "Session Year", value: "session_year" },
        { text: "Center", value: "center_code" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        // { text: "Name", value: "student_name" },
        { text: "Course", value: "paper_code" },
        { text: "Attendance Status", value: "attendance_status" },
        { text: "Theory Mark Status", value: "theory_status" },
        // { text: "Practical Status", value: "subject_code" },
        // { text: "Viva Status", value: "subject_code" }
      ],
    };
  },

  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    // if (this.ifCenterUser) {
    //   this.searchParam.center_code = [this.getAuthUser.center.center_code];
    // }
    //exam
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData");
    }
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
  },
  computed: {
    //all data
    getMismatchList() {
      return this.$store.getters.getMismatchList;
    },
  },
  methods: {
    generateReport() {
      let param = this.searchParam;
      param.pdf = true;
      this.$store.dispatch("exportMismatchDetails", param);
    },
    absentStatus(val) {
      if (val == true) {
        this.searchParam.attendance = 1;
      } else {
        this.searchParam.attendance = 0;
      }
    },
    theoryMarkStatus(val) {
      if (val == true) {
        this.searchParam.theory = 1;
      } else {
        this.searchParam.theory = 0;
      }
    },

    practicalStatus(val) {
      if (val == true) {
        this.searchParam.practical = 1;
      } else {
        this.searchParam.practical = 0;
      }
    },

    vivaStatus(val) {
      if (val == true) {
        this.searchParam.viva = 1;
      } else {
        this.searchParam.viva = 0;
      }
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchMismatchList() {
      this.loading = true;
      this.searchParam.pdf = false;
      this.setLimit();
      this.$store
        .dispatch("searchMismatchData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
  watch: {
    getExamInitiateId(val) {
      console.log("vall", val);
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.searchMismatchList();
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
