<template>
  <v-container fluid>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title" v-if="valuetype"
              >Examiner-wise Mark List</v-card-text
            >
            <v-card-text class="title" v-if="!valuetype"
              >Head Examiner-wise Mark List</v-card-text
            >
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn color="primary" @click="downloadExaminerMarkReport()">
            <v-icon left dark>arrow_downward</v-icon>Download Mark List
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getMarkCountListByStd"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ sl_count + props.index }}</td>
          <!-- <td class="text-xs-center">{{ props.item.exam_roll }}</td>
          <td class="text-xs-center">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">({{ props.item.subject_code }}) {{props.item.subject_name}}</td>-->
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>
          <td class="text-xs-center">{{ props.item.tims_id }}</td>
          <td class="text-xs-center">{{ props.item.script_sl }}</td>
          <td class="text-xs-center">{{ props.item.e_mark }}</td>
          <td class="text-xs-center" v-if="!valuetype">
            {{ props.item.h_mark }}
          </td>
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
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      sl_count: 1,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      valuetype: false,
      examiner_type: "",
      search: "",
      markDetailsData: [],
      searchParam: {},
      //   headers: [
      //     { text: "Sl", align: "center", value: "sl" },
      //     //  { text: "ID", align: "center", value: "id" },
      //     // { text: "Exam Roll", align: "center", value: "exam_roll" },
      //     // { text: "Reg No", align: "center", value: "reg_no" },
      //     // { text: "Subject", align: "center", value: "subject_code" },
      //     // { text: "Paper", align: "center", value: "paper_code" },
      //     { text: "E Mark", align: "center", value: "e_mark" },
      //     // { text: "H Mark", align: "center", value: "h_mark" },
      //     { text: "Script Code", align: "center", value: "script_sl" },
      //     { text: "Datetime", align: "center", value: "datetime" },
      //     { text: "Imei", align: "center", value: "imei" }
      //     // { text: "Map", align: "center", value: "latitude" },
      //     // { text: "longitude", align: "center", value: "longitude" },
      //     // { text: "Expulsion", align: "center", sortable: false }
      //   ]
    };
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifExaminerUser) {
      this.searchParam.examiner_code = this.getAuthUser.examiner.examiner_code;
      this.searchParam.user_id = this.getAuthUser.examiner.user_id;
      this.examiner_type = this.getAuthUser.examiner.examiner_type;
      this.searchParam.type = this.examiner_type;
      console.log("...crtd", this.examiner_type);
    }
    if (this.examiner_type == "E") {
      this.valuetype = true;
    }
    if (this.examiner_type == "H") {
      this.valuetype = false;
    }
    this.fetchMarkCountByStd();
  },
  computed: {
    headers() {
      let headers = [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "1%",
          sortable: false,
        },
      ];
      if (this.valuetype) {
        console.log("..true", this.valuetype);
        headers.push({
          text: "Course",
          value: "paper_code",
          width: "20%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "TMIS ID",
          value: "paper_code",
          width: "10%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "Script SL.",
          value: "script_sl",
          width: "10%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "Examiner Marks",
          value: "e_mark",
          width: "10%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "Date-time",
          value: "datetime",
          width: "5%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "IMEI",
          value: "imei",
          width: "10%",
          align: "center",
          sortable: false,
        });
      }
      if (!this.valuetype) {
        console.log("..false", this.valuetype);
        headers.push({
          text: "Script SL.",
          value: "script_sl",
          width: "10%",
          align: "center",
          sortable: false,
        });

        headers.push({
          text: "Head Examiner Marks",
          value: "h_mark",
          width: "10%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "Examiner Marks",
          value: "e_mark",
          width: "10%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "Date-time",
          value: "datetime",
          width: "5%",
          align: "center",
          sortable: false,
        });
        headers.push({
          text: "IMEI",
          value: "imei",
          width: "10%",
          align: "center",
          sortable: false,
        });
      }
      return headers;
    },
    getMarkCountListByStd() {
      return this.$store.getters.getMarkCountListByStd;
    },
  },
  methods: {
    FormatDate1(date) {
      return date ? moment(date).format("Do MMMM YYYY HH:mm:ss") : "No date";
    },
    downloadExaminerMarkReport() {
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
      var self = this;
      this.setLimit();
      this.$store.commit("UNSET_MARK_COUNT_BY_STD");
      this.loading = true;
      this.$store
        .dispatch("fetchMarkCountByStd", this.searchParam)
        .then((data) => {
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },
  },
  watch: {
    pagination() {
      this.fetchMarkCountByStd();
    },
    // curentExaminerItem(val) {
    //   console.log("probro", val);
    //   try {
    //     this.searchParam.user_id = val.user_id;
    //   } catch (er) {}
    //   this.fetchMarkCountByStd();
    // }
  },
};
</script>
