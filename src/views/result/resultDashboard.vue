<template>
  <v-container fluid>
    <v-dialog v-model="resultDialogStatus" fullscreen>
      <v-toolbar dark color="cyan darken-4" class="mt-2">
        <v-toolbar-title>Pass Fail Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="cyan darken-4" class="mr-5">
            <v-layout row fill-height align-center justify-center>
              Current College &nbsp; :&nbsp;
              {{ currentCollege.college_code }} -
              {{ currentCollege.college_name }}
            </v-layout>
          </v-card>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <passFailBySubject
          :dialogStatus.sync="resultDialogStatus"
          :currentCollege="currentCollege"
        ></passFailBySubject>
      </v-card>
    </v-dialog>

    <v-card class="my-0">
      <examSummary></examSummary>
    </v-card>
    <!-- <v-card>
      <v-card-title primary-title>
        <div class="title">
          <v-icon left medium color="primary">dashboard</v-icon>Result Dashboard
        </div>
      </v-card-title>
    </v-card>-->
    <v-card class="my-3" v-if="mastersFinal">
      <v-layout column>
        <v-flex>
          <v-container>
            <div class="title ma-2">Overall Pass-Rate (last 3 years)</div>
            <!-- {{passRates}} -->
            <v-layout row>
              <v-flex
                v-for="item in getResultDashboardData.pass_percentage"
                :key="item.exam_year"
                class="ma-2"
              >
                <v-card color="blue lighten-3" style=" border-radius: 5px; ">
                  <div class="title pa-2">YEAR: {{ item.exam_year }}</div>
                  <v-divider class="py-0" />
                  <div class="subheading pa-2">Pass Rate</div>
                  <div class="subheading pa-2">
                    {{ item.total_pass_percentage }}%
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <!-- <v-flex>
          <v-container>
            <div class="title">Division Wise Status</div>
            <apexchart
              height="350"
              type="bar"
              :options="divisionData.options"
              :series="divisionData.series"
            ></apexchart>
          </v-container>
        </v-flex>-->
      </v-layout>
    </v-card>
    <v-card color="white" class="mt-5">
      <v-layout row>
        <v-card flat>
          <v-badge left overlap>
            <v-card-text class="title"
              >Subject-wise Result Statistics</v-card-text
            >
          </v-badge>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-spacer />
        <v-btn color="primary" class="white--text" @click="exportStatistics()">
          <v-icon left dark>arrow_downward</v-icon>Download Statistics
        </v-btn>
      </v-layout>
    </v-card>
    <!-- {{getSubjectWiseResultStatistics}} -->
    <div v-if="mastersExam">
      <v-data-table
        class="elevation-1"
        :headers="headers2"
        :items="getSubjectWiseResultStatistics.subject_wise_result_statistics"
        :loading="loading"
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{ props.index + sl_count }}</td>
          <!-- <td class="text-xs-center">({{ props.item.center_code }}) {{ props.item.center_name }}</td> -->

          <td class="text-xs-center">
            ({{ props.item.subject_code }}){{ props.item.subject_name }}
          </td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-center">{{ props.item.total_pass }}</td>
          <td class="text-xs-center">{{ props.item.percentage_of_pass }}</td>
        </template>
      </v-data-table>
    </div>
    <div v-if="honoursExam">
      <v-data-table
        class="elevation-1"
        :headers="headers3"
        :items="getSubjectWiseResultStatistics.subject_wise_result_statistics"
        :loading="loading"
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{ props.index + sl_count }}</td>
          <!-- <td class="text-xs-center">({{ props.item.center_code }}) {{ props.item.center_name }}</td> -->

          <td class="text-xs-center">
            ({{ props.item.subject_code }}){{ props.item.subject_name }}
          </td>
          <td class="text-xs-center">{{ props.item.total }}</td>
          <td class="text-xs-center">{{ props.item.regular }}</td>
          <td class="text-xs-center">{{ props.item.promoted }}</td>
          <td class="text-xs-center">{{ props.item.improve }}</td>
          <td class="text-xs-center">{{ props.item.not_promoted }}</td>
          <td class="text-xs-center">
            {{ props.item.percentage_of_promoted }}
          </td>
        </template>
      </v-data-table>
    </div>
    <v-card class="px-4 mt-3 pt-3 pb-2" v-if="mastersFinal">
      <span class>
        <div class="display-1 mb-4">
          <v-icon size="50" color="primary">dashboard</v-icon>
          <span class="ml-2">College-wise Fail-Pass Rate</span>
        </div>
      </span>
      <v-layout row wrap>
        <v-flex xs10>
          <!-- <v-container fluid> -->
          <!-- <div class="title mb-0"></div> -->

          <v-flex xs12 sm12 md12>
            <v-text-field
              outline
              class="ma-2"
              name="code"
              label="College Code"
              v-model="searchParam.college_code"
              prepend-inner-icon="edit"
              hide-details
            ></v-text-field>
          </v-flex>
          <!-- </v-container> -->
        </v-flex>
        <v-flex xs2>
          <!-- <v-flex xs12 sm12 md12> -->
          <v-layout justify-center row fill-height align-center>
            <v-btn
              color="primary"
              round
              large
              @click="searchCollwisePassFailList"
            >
              <v-icon left dark>search</v-icon>Search
            </v-btn>
          </v-layout>
          <!-- </v-flex> -->
        </v-flex>
      </v-layout>
    </v-card>
    <!-- <v-container fluid class="mt-0"> -->
    <v-card color="white" class="mt-5" v-if="mastersFinal">
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
                >{{ pagination.totalItems }}</v-btn
              >
            </template>
            <v-card-text class="title"
              >Pass-Fail Percentage By College</v-card-text
            >
          </v-badge>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
      </v-layout>
    </v-card>
    <v-data-table
      v-if="mastersFinal"
      class="elevation-1"
      :headers="headers"
      :items="getCollwisePassFailData"
      :loading="loading"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
      :rows-per-page-items="pagination.rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td>{{ props.index + sl_count }}</td>
        <!-- <td class="text-xs-center">({{ props.item.center_code }}) {{ props.item.center_name }}</td> -->
        <td class="text-xs-left">
          <v-btn
            color="cyan lighten-1"
            @click="viewPassFailColDetails(props.item)"
            >{{ props.item.college_code }} -
            {{ props.item.college_name }}</v-btn
          >
        </td>
        <td class="text-xs-center">{{ props.item.total_student }}</td>
        <td class="text-xs-center">{{ props.item.total_pass_percentage }}%</td>
        <td class="text-xs-center">{{ props.item.total_fail_percentage }}%</td>
        <td class="text-xs-center">
          {{ props.item.total_others_percentage }}%
        </td>
      </template>
    </v-data-table>
    <!-- </v-container> -->
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import passFailBySubject from "@/components/result/subjectWisePassFail.vue";
import examSummary from "@/components/result/examSummary.vue";
export default {
  mixins: [commonGet, commonExamYear],
  components: { passFailBySubject, examSummary },
  data: () => ({
    resultDialogStatus: false,
    currentCollege: {},
    headers: [
      { text: "SL.", align: "left", value: "id", width: "1%", sortable: false },

      {
        text: "College ",
        value: "college_code",
        align: "left",
        width: "30%",
        sortable: false,
      },
      {
        text: "Total Examinee",
        align: "center",
        width: "5%",
        value: "total_student",
        sortable: false,
      },
      {
        text: "Passed",
        align: "center",
        width: "5%",
        value: "total_passed",
        sortable: false,
      },
      {
        text: "Failed",
        align: "center",
        width: "5%",
        value: "total_failed",
        sortable: false,
      },
      {
        text: " Others",
        align: "center",
        width: "5%",
        value: "total_failed",
        sortable: false,
      },
    ],
    headers2: [
      { text: "SL.", align: "left", value: "id", width: "1%", sortable: false },

      {
        text: "Subject Code & Name",
        value: "subject_code",
        align: "center",
        width: "30%",
        sortable: false,
      },
      {
        text: "Total Student",
        align: "center",
        width: "5%",
        value: "total_student",
        sortable: false,
      },
      {
        text: "Total Pass",
        align: "center",
        width: "5%",
        value: "total_passed",
        sortable: false,
      },
      {
        text: "Percentage of Pass",
        align: "center",
        width: "5%",
        value: "percentage_of_pass",
        sortable: false,
      },
    ],
    headers3: [
      { text: "SL.", align: "left", value: "id", width: "1%", sortable: false },

      {
        text: "Subject Code & Name",
        value: "subject_code",
        align: "center",
        width: "30%",
        sortable: false,
      },
      {
        text: "Total",
        align: "center",
        width: "5%",
        value: "total_student",
        sortable: false,
      },
      {
        text: "Regular",
        align: "center",
        width: "5%",
        value: "total_passed",
        sortable: false,
      },
      {
        text: "Promoted",
        align: "center",
        width: "5%",
        value: "percentage_of_pass",
        sortable: false,
      },
      {
        text: "Improve",
        align: "center",
        width: "5%",
        value: "percentage_of_pass",
        sortable: false,
      },
      {
        text: "Not Promoted",
        align: "center",
        width: "5%",
        value: "percentage_of_pass",
        sortable: false,
      },
      {
        text: "% of Promoted",
        align: "center",
        width: "5%",
        value: "percentage_of_pass",
        sortable: false,
      },
    ],
    searchParam: {},
    resultStatisticsParam: {},
    honoursExam: false,
    mastersExam: false,
    forceRerenderFlag: true,
    search: "",
    loading: false,
    sl_count: 1,
    // divisionData: {
    //   options: {
    //     xaxis: {
    //       categories: [
    //         "Dhaka",
    //         "Khulna",
    //         "Barisal",
    //         "Chittagong",
    //         "Mymensingh ",
    //         "Rajshahi ",
    //         "Rangpur ",
    //         "Sylhet "
    //       ]
    //     }
    //   },
    //   series: [
    //     {
    //       data: [70, 40, 45, "60", 49, 60, 70, 91]
    //     }
    //   ]
    // },
    pagination: {
      rowsPerPage: 5,
      rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
    },
  }),
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.resultStatisticsParam.exam_initiate_id = this.getExamInitiateId;
    this.resultStatisticsParam.exam_year = this.getLoggedInYear.year;
    this.resultStatisticsParam.exam_code = this.getLoggedInExam.code;
    this.$store.dispatch("searchResultDashboardData", this.searchParam);
    this.$store.dispatch(
      "searchResultStatisticsData",
      this.resultStatisticsParam
    );
  },
  computed: {
    getCollwisePassFailData() {
      return this.$store.getters.getCollwisePassFailData;
    },
    getSubjectWiseResultStatistics() {
      return this.$store.getters.getSubjectWiseResultStatistics;
    },
    getResultDashboardData() {
      return this.$store.getters.getResultDashboardData;
    },

    passRates() {
      return [
        {
          year: "2017",
          rate: "80",
        },
        {
          year: "2018",
          rate: "80",
        },
        {
          year: "2019",
          rate: "80",
        },
      ];
    },
  },
  mounted() {
    this.identifyDegree();
    if(this.searchParam.exam_code == "2204") {
        this.mastersFinal = true;
        this.mastersExam = true;
        this.honoursExam = false;
      }
      // else{
      //   this.mastersFinal = false;
      //   this.mastersExam = false;
      // }

  },
  methods: {
    exportStatistics() {
      this.resultStatisticsParam.pdf = true;
      // console.log("....");
      this.$store.dispatch(
        "exportResultStatistics",
        this.resultStatisticsParam
      );
    },
    identifyDegree() {
      this.$store
        .dispatch("searchResultStatisticsData", this.resultStatisticsParam)
        .then((data) => {
          console.log("data dekhau", data.degree_code);
          console.log("data dekhau", this.mastersExam);
          if (data.degree_code == "3") {
            this.mastersExam = true;
            this.honoursExam = false;
          }
          if (data.degree_code == "2") {
            this.mastersExam = false;
            this.honoursExam = true;
            if(this.searchParam.exam_code == "2204") {
              this.mastersFinal = true;
              this.mastersExam = true;
              this.honoursExam = false;
            }
          }
          console.log("data dekhau", this.mastersExam);
        });
    },
    goToList() {
      this.$router.push("/absent-reported-withheld-list");
    },
    goToRepWith() {
      this.$router.push("/report-withheld");
    },
    goToCenterCount() {
      this.$router.push("/center-allocation/practical");
    },
    goToPaperCount() {
      //console.log("ddddd")
      this.$router.push("/practical_viva/paper-wise-passfail");
    },
    goToSubjectCount() {
      this.$router.push("/practical_viva/subject-wise-passfail");
    },

    viewPassFailColDetails(item) {
      this.currentCollege = item;
      // this.currentCollege.center_code = this.current.center_code;
      this.resultDialogStatus = true;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchCollwisePassFailList() {
      this.loading = true;
      this.setLimit();
      var that = this;
      this.$store
        .dispatch("searchCollwisePassFailData", this.searchParam)
        .then((data) => {
          that.loading = false;
          that.sl_count = data.meta.from;
          that.pagination.totalItems = data.meta.total;
        });
    },

    close() {
      this.resultDialogStatus = false;
      // this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    },
  },
  watch: {
    pagination() {
      this.searchCollwisePassFailList();
    },
    // "searchParam.exam_code": function(val) {
    //   if (val == "2204") {
    //     this.mastersFinal = true;
    //     this.mastersExam = true;
    //   }
    //   else{
    //     this.mastersFinal = false;
    //     this.mastersExam = false;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped></style>
