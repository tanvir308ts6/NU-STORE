<template>
  <v-container fluid>
    <v-card class="ma-4">
      <v-card-title>
        <h2>Mark Details</h2>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="downloadExaminerMarkReport()"
          >Download Mark Details</v-btn
        >
        <!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field> -->
      </v-card-title>
      <v-data-table
        :headers="headers"
        :loading="loading"
        :items="getMarkCountListByStd"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <!-- <td class="text-xs-center">{{ props.item.reg_code }}</td>
          <td class="text-xs-center">{{ props.item.student_name }}</td>-->
          <td class="text-xs-center">{{ sl_count + props.index }}</td>
          <td class="text-xs-left">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
          <td class="text-xs-center">{{ props.item.tims_id }}</td>
          <td class="text-xs-center">{{ props.item.script_sl }}</td>
          <td class="text-xs-center">{{ props.item.e_mark }}</td>
          <td class="text-xs-center">{{ props.item.h_mark }}</td>
          <td class="text-xs-center">{{ FormatDate1(props.item.datetime) }}</td>
          <td class="text-xs-center">{{ props.item.imei }}</td>
          <!-- <td class="text-xs-center">{{ props.item.latitude }}</td>
          <td class="text-xs-center">{{ props.item.longitude }}</td>-->
          <!-- <td class="text-xs-center">
          latitude:{{ props.item.latitude }}
          longitude:{{ props.item.longitude }}
          <v-btn color="primary" @click="openMap(props.item)">Map</v-btn>
          </td>-->
          <!-- <td class="text-xs-center">
            <v-btn disabled color="error" @click="studentExpulsion()">Student Expulsion</v-btn>
          </td>-->
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning" outline
            >Your search for "{{ search }}" found no results.</v-alert
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- <div style="opacity:.3;">
      <hr />
      <pre style=" font-size: 10px !important;"> searchParam:{{searchParam}} </pre>
      <hr />
      <pre style="font-size: 10px !important;"> {{getMarkCountListByStd}} </pre>
      <hr />
    </div>-->
  </v-container>
</template>

<script>
import moment from "moment";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  props: ["curentExaminerItem"],
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      subModule: { loading: false },
      sl_count: 1,
      showLogTable: false,
      search: "",
      markDetailsData: [],
      searchParam: {},
      headers: [
        { text: "SL.", align: "center", value: "sl", sortable: false },
        //  { text: "ID", align: "center", value: "id" },

        { text: "Paper", align: "left", value: "paper_code", sortable: false },
        {
          text: "Examiner TMIS ID",
          align: "center",
          value: "id",
          sortable: false,
        },
        // { text: "Student Name", align: "center", value: "student_name" },
        {
          text: "Script SL.",
          align: "center",
          value: "script_sl",
          sortable: false,
        },
        { text: "E Mark", align: "center", value: "e_mark", sortable: false },
        { text: "H Mark", align: "center", value: "h_mark", sortable: false },
        {
          text: "Datetime",
          align: "center",
          value: "datetime",
          sortable: false,
        },
        { text: "Imei", align: "center", value: "imei", sortable: false },
        // { text: "Map", align: "center", value: "latitude" },
        // { text: "longitude", align: "center", value: "longitude" },
        // { text: "Expulsion", align: "center", sortable: false }
      ],
    };
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.code;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  computed: {
    getMarkCountListByStd() {
      return this.$store.getters.getMarkCountListByStd;
    },
  },
  methods: {
    FormatDate1(date) {
      return date ? moment(date).format("Do MMMM YYYY HH:mm:ss") : "No date";
    },
    downloadExaminerMarkReport() {
      // if (this.ifAdminUserType) {
      this.searchParam.type = "H";
      // }
      this.$store.dispatch("downloadExaminerMarkReport", this.searchParam);
    },
    studentExpulsion() {
      this.$root
        .$confirm("Are you sure that you want to Expel?")
        .then((confirm) => {
          if (confirm) {
            console.log("studentExpulsion");
          }
        });
    },
    openMap(dataArray) {
      console.log(dataArray.latitude);
      console.log(dataArray.longitude);
      window.open(
        "https://www.google.com/maps/search/" +
          dataArray.latitude +
          ",+" +
          dataArray.longitude,
        "_blank"
      );
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    fetchMarkCountByStd() {
      this.$store.commit("UNSET_MARK_COUNT_BY_STD");
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch("fetchMarkCountByStd", this.searchParam)
        .then((data) => {
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
      //this.pagination = {};
    },
  },
  watch: {
    curentExaminerItem(val) {
      this.pagination = {};
      console.log("probro", val);
      try {
        this.searchParam.user_id = val.user_id;
        // if (this.ifAdminUserType) {
        //   this.searchParam.examiner_type = val.examiner_type;
        // } else {
        //   this.searchParam.examiner_type = this.getAuthUser.examiner.examiner_type;
        // }
      } catch (er) {}
      this.fetchMarkCountByStd();
    },
    pagination() {
      this.fetchMarkCountByStd();
    },
  },
};
</script>
