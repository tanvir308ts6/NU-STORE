<template>
  <v-container fluid>
    <v-dialog v-model="detailsDialog" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Student Examination Record Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="detailsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <recordDetails
          :detailsItem="detailsItem"
          :detailsDialog="detailsDialog"
        ></recordDetails>
      </v-card>
    </v-dialog>
    <v-expansion-panel class="mb-3" inset v-model="open">
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
            <v-layout row wrap align-center></v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12>
                  <v-text-field
                    v-model="searchParam.reg_no"
                    outline
                    class="ma-1"
                    name="rg_no"
                    menu-props="auto"
                    label="Registration Number"
                    prepend-inner-icon="edit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="getDataFromApi">
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
            <v-card-text class="title">Student Examination Record</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-card-actions>
            <!-- <v-btn @click="exportPdf" color="primary" dark
              >Download Student Examination Record</v-btn
            > -->
          </v-card-actions>
        </v-layout>
      </v-card>
      <!-- {{datalist}} -->
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="datalist"
        class="elevation-1"
        no-data-text="There is no data to show. Search by Registration number to get data."
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{ 1 + props.index }}</td>
          <td class="text-xs-left" nowrap="true">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.exam_year }}</td>
          <td class="text-xs-center">{{ props.item.exam_roll }}</td>
          <td class="text-xs-center">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">{{ props.item.session }}</td>
          <td class="text-xs-left" nowrap="true">{{ props.item.student_name }}</td>
          <td class="text-xs-left" nowrap="true">
            {{ props.item.college_code }} - {{ props.item.college_name }}
          </td>
          <td class="text-xs-center">
            {{ getpoint(props.item.cgpa) }}
          </td>
          <td class="text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.candidate_type_id == 0"
              >{{props.item.candidate_type}}</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.candidate_type_id == 1"
              >{{props.item.candidate_type}}</v-chip
            >
          </td>
          <td class="text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.result_type == 0"
              >{{props.item.result_type_name}}</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.result_type == 1"
              >{{props.item.result_type_name}}</v-chip
            >
          </td>
          <td class="justify-center text-xs-center" nowrap="true">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      @click="showDetailsItem(props.item)"
                      class="mr-0"
                      color="white"
                      >details</v-icon
                    >
                  </v-btn>
                </template>
                <span>Show Details</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import recordDetails from "@/components/admin/studentExamRecordDetails.vue";
export default {
  components: {
    recordDetails,
  },
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      detailsItem: [],
      datalist: [],
      detailsDialog: false,
      loading: false,
      // search: "",
      // sl_count: 1,
      searchParam: {},
      // pagination: {
      //   rowsPerPage: 10,
      //   rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      // },
      dialog: false,
      formDialogStatus: false,
      headers: [
        { text: "SL.", align: "left", value: "id", width: "1" },
        { text: "Exam", align: "center", value: "exam_code" },
        { text: "Year", value: "exam_year", align: "center" },
        { text: "Exam Roll", value: "exam_roll", align: "center" },
        { text: "Reg No", align: "center", value: "reg_no" },
        {
          text: "Session",
          align: "center",
          value: "session",
        },
        {
          text: "Examinee Name",
          value: "name",
          align: "center",
          sortable: false,
          width: "10%",
        },
        { text: "College", align: "center", value: "college_code" },
        { text: "CGPA", align: "center", value: "cgpa" },
        { text: "Candidate Type", align: "center", value: "cgpa" },
        { text: "Result Type", align: "center", value: "cgpa" },
        { text: "Details", align: "center", value: "details" },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.param.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
  },

  mounted() {
    // this.$store.commit("UNSET_FORMNOTIFY");
  },

  computed: {
    getStudentExamRecordList() {
      return this.$store.getters.getStudentExamRecordList;
    },
  },
  watch: {
    // pagination() {
    //   this.getDataFromApi();
    // },
    getStudentExamRecordList(val) {
      console.log("valueee", val);
      this.datalist = val;
    },
  },
  methods: {
    getpoint(item) {
      let item2 = parseFloat(item);
      // console.log("item1", item2);
      return item2.toFixed(2);
    },
    showDetailsItem(item) {
      this.detailsItem = item.paper_infos;
      this.detailsDialog = !this.detailsDialog;
    },
    disableStatus(item) {
      if (item.status == 1) {
        return true;
      } else {
        return false;
      }
    },
    // setLimit() {
    //   const { sortBy, descending, page, rowsPerPage } = this.pagination;
    //   this.searchParam.page = page;
    //   this.searchParam.limit = rowsPerPage;
    //   this.searchParam.sort = sortBy;
    //   this.searchParam.search = this.search;
    // },
    getDataFromApi() {
      this.loading = true;
      // this.setLimit();
      this.$store
        .dispatch("searchStudentExaminationRecord", this.searchParam)
        .then((data) => {
          this.loading = false;
          //this.sl_count = data.meta.from;
          //this.pagination.totalItems = data.meta.total;
        });
    },
    exportPdf() {
      this.$store.dispatch("exportGraceSummary", this.searchParam);
    },
  },
};
</script>

<style scoped></style>
