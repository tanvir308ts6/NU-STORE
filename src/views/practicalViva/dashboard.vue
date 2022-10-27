<template>
  <v-container fluid>
    <v-expansion-panel class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 title">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>

        <v-layout column class="mx-5">
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  persistent-hint
                  prepend-icon="library_books"
                  @change="onSubjectSelect()"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="#FAFAFA"
                      close
                      @input="searchParam.subject_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.code + " - " + data.item.title }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
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
                <v-flex xs6>
                  <v-text-field
                    name="college_code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    data-vv-name="college_code"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
            <v-flex xs12 sm12 md12 style="margin-top: 5px; margin-bottom: 8px">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="getPracCandSummary">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-card class="my-0">
      <practicalSummary></practicalSummary>
    </v-card>
    <v-card class="my-0">
      <vivaSummary></vivaSummary>
    </v-card>
    <!-- <v-container fluid>
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
              <v-card-text class="title">Practical Dashboard</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getPvDashDataList"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.status }}</td>
          <td class="text-xs">{{ props.item.wanting_count }}</td>
          <td class="text-xs">{{ props.item.completed_count }}</td>
          <td class="text-xs">{{ props.item.absence_count }}</td>
          <td class="text-xs">{{ props.item.start_date }}</td>
          <td class="text-xs">{{ props.item.end_date }}</td>
        </template>
      </v-data-table>
    </v-container>-->

    <v-container fluid class="mt-3">
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
                  v-if="pagination1.totalItems"
                  >{{ pagination1.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title"
                >Viva-Practical Candidate List Summary</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="white--text"
            @click="generateReportSubject()"
          >
            <v-icon outline left dark>arrow_downward</v-icon>Candidate List
            Subject Wise
          </v-btn>
          <v-btn
            color="primary"
            class="white--text"
            @click="generateReportCollege()"
          >
            <v-icon outline left dark>arrow_downward</v-icon>Candidate List
            College Wise
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers1"
        :items="getPracCandSummaryDataList"
        :loading="loading"
        :pagination.sync="pagination1"
        :total-items="pagination1.totalItems"
        :rows-per-page-items="pagination1.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <!-- <tr @click="props.expanded = !props.expanded"> -->
          <td class="text-xs">{{ props.index + sl_count }}</td>
          <td class="text-xs">
            {{ props.item.college_code }} - {{ props.item.college_name }}
          </td>
          <td class="text-xs">
            {{ props.item.subject_code }} - {{ props.item.subject_name }}
          </td>
          <td class="text-xs-center">
            {{ props.item.total_practical_student }}
          </td>
          <td class="text-xs-center">{{ props.item.total_viva_student }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import practicalSummary from "@/components/practicalVivaExam/practicalSummary.vue";
import vivaSummary from "@/components/practicalVivaExam/vivaSummary.vue";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { practicalSummary, vivaSummary },
  data() {
    return {
      menu2: false,

      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      pagination1: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },

      loading: false,
      sl_count: 0,
      search: "",
      searchParam: {},
      headers: [
        { text: "SL", value: "sl" },
        { text: "Practical Viva Status", value: "status" },
        { text: "Wanting Count", value: "wanting_count" },
        { text: "Complete Count", value: "completed_count" },
        { text: "Absent Count ", value: "absence_count" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
      ],
      headers1: [
        { text: "SL", value: "sl" },
        { text: "College", value: "status" },
        { text: "Subject", value: "wanting_count" },
        {
          text: "Total Practical Examinee",
          value: "completed_count",
          align: "center",
        },
        {
          text: "Total Viva Examinee",
          value: "completed_count",
          align: "center",
        },
      ],
    };
  },
  created() {
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    this.$store.dispatch("fetchCollegeListData");
    // if (this.ifCenterUser) {
    //   this.searchParam.college_code = this.getAuthUser.center.center_code;
    // }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  computed: {
    getPvDashDataList() {
      return this.$store.getters.getPvDashDataList;
    },
    getPracCandSummaryDataList() {
      return this.$store.getters.getPracCandSummaryDataList;
    },
    getCollegeListItem() {
      return this.$store.getters.getCollegeListItem;
    },
  },
  methods: {
    // setLimit() {
    //   const { sortBy, descending, page, rowsPerPage } = this.pagination;
    //   this.searchParam.page = page;
    //   this.searchParam.limit = rowsPerPage;
    //   this.searchParam.sortBy = sortBy;
    //   this.searchParam.search = this.search;
    // },
    setLimit1() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination1;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    // getDashboardData() {
    //   this.loading = true;
    //   this.setLimit();
    //   this.$store
    //     .dispatch("searchDashboardData", this.searchParam)
    //     .then((data) => {
    //       this.loading = false;
    //       this.sl_count = data.from;
    //       this.pagination.totalItems = data.total;
    //     });
    // },
    getPracCandSummary() {
      this.searchParam.download = false;
      this.searchParam.report = "";
      this.loading = true;
      this.setLimit1();
      this.$store
        .dispatch("getPracticalCanditateListSummary", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination1.totalItems = data.total;
        });
    },
    generateReportCollege() {
      this.searchParam.download = true;
      this.searchParam.report = "college";
      this.$store.dispatch("exportPracCandSummaryList", this.searchParam);
    },
    generateReportSubject() {
      this.searchParam.download = true;
      this.searchParam.report = "subject";
      this.$store.dispatch("exportPracCandSummaryList", this.searchParam);
    },
  },
  watch: {
    getExamInitiateId(val) {
      console.log("vall", val);
      this.searchParam.exam_initiate_id = val;
    },
    // pagination() {
    //   this.getDashboardData();
    //   //this.getPracCandSummary();
    // },
    pagination1() {
      this.getPracCandSummary();
    },
  },
};
</script>

