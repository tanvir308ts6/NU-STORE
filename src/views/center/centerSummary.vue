<template>
  <v-container fluid>
    <v-card style="border-radius: 25px">
      <v-layout row wrap class="mx-5">
        <v-flex class="mx-3" xs12 sm12 md12>
          <!-- <v-card color="grey darken-3" height="65px"> -->
          <v-flex xs12 class="ma-3">
            <v-menu
              v-model="datePickerModel"
              :close-on-content-click="false"
              full-width
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="cyan"
                  class="ma-2 title"
                  :value="getFormatedDate(searchParam.datetime)"
                  label="Pick a date"
                  readonly
                  v-on="on"
                  outline
                  hide-details
                  prepend-icon="calendar_today"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="searchParam.datetime"
                @change="searchdata()"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <!-- </v-card> -->
        </v-flex>
      </v-layout>
    </v-card>
    <v-container fluid class="mt-4">
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
              <v-card-text class="title"
                >Subject Course-wise Summary</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-btn
            color="blue-grey"
            class="white--text"
            @click="exportSubPapSummary()"
          >
            <v-icon left dark>arrow_downward</v-icon>Export
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="subPaperwiseSummaryList"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ sl_count + props.index }}</td>
          <td class="text-xs-left">{{ props.item.datetime }}</td>
          <td class="text-xs-left">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.year }}</td>
          <td class="text-xs-left">
            {{ props.item.subject_code }} - {{ props.item.subject_name }}
          </td>
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-center">{{ props.item.e_type_count }}</td>
          <td class="text-xs-center">{{ props.item.script_count }}</td>
        </template>
      </v-data-table>
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
                  style="margin-top: -1.5em"
                  class="elevation-0"
                  v-if="pagination2.totalItems"
                  >{{ pagination2.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title"
                >Room Invigilator-wise Summary</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-btn
            color="blue-grey"
            class="white--text"
            @click="exportRoomInviSummary()"
          >
            <v-icon left dark>arrow_downward</v-icon>Export
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers2"
        :items="summaryByRoomInviList"
        :loading="loading2"
        :pagination.sync="pagination2"
        :total-items="pagination2.totalItems"
        :rows-per-page-items="pagination2.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ sl_count2 + props.index }}</td>
          <td class="text-xs-left">{{ props.item.datetime }}</td>
          <td class="text-xs-left">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.year }}</td>
          <td class="text-xs-left">
            {{ props.item.subject_code }} - {{ props.item.subject_name }}
          </td>
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>
          <td class="text-xs-center">{{ props.item.inv_name }}</td>
          <td class="text-xs-center">{{ props.item.room_no }}</td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-center">{{ props.item.present_count }}</td>
          <td class="text-xs-center">{{ props.item.absent_count }}</td>
          <td class="text-xs-center">{{ props.item.reported_count }}</td>
          <td class="text-xs-center">{{ props.item.e_type_count }}</td>
          <td class="text-xs-center">{{ props.item.script_count }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import * as moment from "moment";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      datePickerModel: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      sl_count: 0,
      pagination2: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading2: false,
      sl_count2: 0,
      search: "",
      searchParam: {},
      searchParam2: {},
      headers: [
        { text: "SL", value: "sl", align: "left", sortable: false },
        { text: "Date", value: "date", align: "left", sortable: false },
        { text: "Exam", value: "exam_name", align: "left", sortable: false },
        { text: "Year", value: "year", align: "center", sortable: false },
        {
          text: "Subject",
          value: "subject_code",
          align: "left",
          sortable: false,
        },
        { text: "Course", value: "paper_code", align: "left", sortable: false },
        {
          text: "Total Student",
          value: "total_student",
          align: "center",
          sortable: false,
        },
        {
          text: "E-type Count",
          value: "e_type_count",
          align: "center",
          sortable: false,
        },
        {
          text: "Script Count",
          value: "script_count",
          align: "center",
          sortable: false,
        },
      ],
      headers2: [
        {
          text: "SL",
          value: "sl",
          align: "left",
          sortable: false,
          width: "1%",
        },
        {
          text: "Date",
          value: "date",
          align: "left",
          width: "1%",
          sortable: false,
        },
        {
          text: "Exam",
          value: "exam_name",
          align: "left",
          width: "3%",
          sortable: false,
        },
        {
          text: "Year",
          value: "year",
          align: "center",
          width: "1%",
          sortable: false,
        },
        {
          text: "Subject",
          value: "subject_code",
          align: "left",
          width: "10%",
          sortable: false,
        },
        {
          text: "Course",
          value: "paper_code",
          align: "left",
          width: "30%",
          sortable: false,
        },
        {
          text: "Invigilator",
          value: "year",
          align: "inv_name",
          width: "10%",
          sortable: false,
        },
        {
          text: "Room No.",
          value: "year",
          align: "room_no",
          width: "3%",
          sortable: false,
        },
        {
          text: "Total Candidate",
          value: "year",
          align: "total_student",
          width: "3%",
          sortable: false,
        },
        {
          text: "Present Count",
          value: "year",
          align: "present_count",
          width: "3%",
          sortable: false,
        },
        {
          text: "Absent Count",
          value: "year",
          align: "absent_count",
          width: "3%",
          sortable: false,
        },
        {
          text: "Reported Count",
          value: "year",
          align: "reported_count",
          width: "3%",
          sortable: false,
        },
        {
          text: "E-type Count",
          value: "e_type_count",
          align: "center",
          width: "1%",
          sortable: false,
        },
        {
          text: "Script Count",
          value: "script_count",
          align: "center",
          width: "1%",
          sortable: false,
        },
      ],
    };
  },
  created() {
    if (this.ifCenterUser) {
      console.log("center code ????");
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      this.searchParam2.center_code = this.getAuthUser.center.center_code;
    }
    this.searchParam.datetime = new Date().toISOString().substr(0, 10);
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;

    this.searchParam2.datetime = new Date().toISOString().substr(0, 10);
    this.searchParam2.exam_initiate_id = this.getExamInitiateId;
    this.searchParam2.exam_code = this.getLoggedInExam.code;
    this.searchParam2.year = this.getLoggedInYear.year;
  },
  computed: {
    //all summary by sub-paper
    subPaperwiseSummaryList() {
      return this.$store.getters.subPaperwiseSummaryList;
    },
    //all summary by sub-paper
    summaryByRoomInviList() {
      return this.$store.getters.summaryByRoomInviList;
    },
    getAuthUserType() {
      return this.$store.getters.getAuthUserType;
    },
  },
  methods: {
    searchdata() {
      this.datePickerModel = false;
      this.subPapWiseSummaryList();
      this.RoomInviWiseSummaryList();
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    subPapWiseSummaryList() {
      this.loading = true;
      this.setLimit();
      var that = this;
      this.$store
        .dispatch("subPaperwiseSummaryData", this.searchParam)
        .then((data) => {
          if (data.status == "error") {
            console.log("...subif");
            that.loading = false;
            console.log("...subif", that.loading);
            that.pagination.totalItems = 0;
          } else {
            try {
              that.loading = false;
              that.sl_count = data.meta.from;
              that.pagination.totalItems = data.meta.total;
            } catch (ex) {
              console.log(ex);
            }
          }
        });
    },
    setLimit2() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination2;
      this.searchParam2.page = page;
      this.searchParam2.limit = rowsPerPage;
      this.searchParam2.sortBy = sortBy;
      this.searchParam2.search = this.search;
    },
    RoomInviWiseSummaryList() {
      this.searchParam2.datetime = this.searchParam.datetime;
      this.loading2 = true;
      this.setLimit2();
      var that = this;
      this.$store
        .dispatch("summaryByRoomInviData", this.searchParam2)
        .then((data) => {
          if (data.status == "error") {
            console.log("...roomif");
            that.loading2 = false;
            that.pagination2.totalItems = 0;
          } else {
            try {
              that.loading2 = false;
              that.sl_count2 = data.meta.from;
              that.pagination2.totalItems = data.meta.total;
            } catch (ex) {
              console.log("....");
            }
          }
        });
    },
    exportSubPapSummary() {
      // console.log("....");
      this.$store.dispatch("exportSummaryBySubPaper", this.searchParam);
    },
    exportRoomInviSummary() {
      // console.log("....");
      this.$store.dispatch("exportSummaryByRoomInvi", this.searchParam2);
    },
  },
  watch: {
    getExamInitiateId(val) {
      console.log("vall", val);
      this.searchParam.exam_initiate_id = val;
      this.searchParam2.exam_initiate_id = val;
    },
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
      this.searchParam2.exam_code = val.code;
    },
    getLoggedInYear(val) {
      this.searchParam.year = val.year;
      this.searchParam2.year = val.year;
    },
    pagination() {
      this.subPapWiseSummaryList();
    },
    pagination2() {
      this.RoomInviWiseSummaryList();
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
