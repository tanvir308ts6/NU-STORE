<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <v-layout row>
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
                      <v-text-field
                        class="ma-2"
                        name="reg_no"
                        label="Reg. No."
                        v-model="searchParam.reg_no"
                        prepend-icon="edit"
                      ></v-text-field>
                      <v-select
                        name="ac_session"
                        class="ma-2"
                        v-model="searchParam.ac_session"
                        item-text="ac_session"
                        item-value="ac_session"
                        :items="getSessions"
                        menu-props="auto"
                        label="Select Session"
                        prepend-icon="edit"
                      ></v-select>
                      <v-text-field
                        class="ma-2"
                        name="degree_group_code"
                        label="Course"
                        v-model="searchParam.degree_group_code"
                        prepend-icon="edit"
                      ></v-text-field>

                      <v-autocomplete
                        class="ma-2"
                        v-model="searchParam.college_code"
                        :item-text="
                          item =>
                            '(' + item.college_code + ') ' + item.college_name
                        "
                        item-value="college_code"
                        :items="getColleges"
                        menu-props="auto"
                        label="Select College"
                        prepend-icon="subject"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="searchParam.college_code = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                            >{{
                              "(" +
                                data.item.college_code +
                                ") " +
                                data.item.college_name
                            }}
                          </v-chip>
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
                                v-html="
                                  '(' +
                                    data.item.college_code +
                                    ') ' +
                                    data.item.college_name
                                "
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>

                      <v-autocomplete
                        class="ma-2"
                        v-model="searchParam.subject_code"
                        :item-text="
                          item =>
                            '(' + item.subject_code + ') ' + item.subject_name
                        "
                        item-value="subject_code"
                        :items="getSubjects"
                        menu-props="auto"
                        label="Select Subject"
                        prepend-icon="subject"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="searchParam.subject_code = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                            >{{
                              "(" +
                                data.item.subject_code +
                                ") " +
                                data.item.subject_name
                            }}
                          </v-chip>
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
                                v-html="
                                  '(' +
                                    data.item.subject_code +
                                    ') ' +
                                    data.item.subject_name
                                "
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>

                      <!--<v-select
                                                    name="ac_session"
                                                    class="ma-2"
                                                    v-model="searchParam.ac_session"
                                                    item-text="ac_session"
                                                    item-value="ac_session"
                                                    :items="getSessions"
                                                    menu-props="auto"
                                                    label="Select Session"
                                                    prepend-icon="edit"
                                            ></v-select>-->

                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn
                            color="primary"
                            large
                            @click="searchProbableCollegeWise"
                          >
                            Search
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-card color="white">
          <v-layout row>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  small
                  style="margin-top: -0.8em;"
                  class="elevation-0"
                  v-if="total_candidate"
                  >{{ total_candidate }}
                </v-btn>
              </template>
              <v-card-text class="title">Probable Student List</v-card-text>
            </v-badge>
          </v-layout>
        </v-card>

        <v-dialog v-model="paperDialog" width="900">
          <v-toolbar>
            <v-toolbar-title>
              <div class="title">Paper Details</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn round outline flat @click="paperDialog = false">
              <span class="mx-2 subheading">Close</span>(
              <v-icon>close</v-icon>
              )
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-layout row wrap class="ml-4 py-4">
              <v-flex md12>
                <table class="papers">
                  <tr>
                    <th>SL</th>
                    <th>Paper Name</th>
                  </tr>
                  <template v-for="(paper, i) in details">
                    <tr>
                      <td>{{ i + 1 }}</td>
                      <td>
                        ({{ paper.paper_code }})
                        {{ paper.core_paper.paper_name }}
                      </td>
                    </tr>
                  </template>
                </table>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">
              {{
                `(${props.item.subject_code})` + " " + props.item.subject_name
              }}
            </td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>
            <td class="text-xs-center">{{ props.item.ac_session }}</td>
            <td class="text-xs-center">{{ props.item.std_name }}</td>
            <td class="text-xs-center">
              {{
                props.item.college
                  ? `(${props.item.college.college_code})` +
                    props.item.college.college_name
                  : ""
              }}
            </td>
            <td class="text-xs-center">{{ props.item.degree_group_name }}</td>
            <td class="text-xs-center">
              {{
                props.item.candi_date_type
                  ? props.item.candi_date_type.candidate_type
                  : ""
              }}
            </td>
            <td class="text-xs-center">{{ props.item.slot_no }}</td>
            <td class="text-xs-center">
              <v-chip v-if="props.item.ff_criteria === '1'" small>
                REGULAR
              </v-chip>
              <v-chip v-if="props.item.ff_criteria === '2'" small>
                IRREGULAR
              </v-chip>
              <v-chip v-if="props.item.ff_criteria > 2" small>
                IMPROVEMENT
              </v-chip>
            </td>

            <td class="text-xs-center">
              <v-chip v-if="props.item.student_confirm_status === '1'" small>
                Applied
              </v-chip>
              <v-chip v-else small>
                Not Apply
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip v-if="props.item.teacher_confirm_status === '1'" small>
                Confirmed
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip
                v-if="props.item.payment_status === '1'"
                color="primary"
                text-color="white"
                small
              >
                Paid
              </v-chip>
              <v-chip v-else color="red" text-color="white" small>
                Unpaid
              </v-chip>
            </td>

            <td class="text-xs-center">
              <span
                v-if="
                  props.item.mandatory_papers > 0 &&
                    props.item.papers.length > 0
                "
              >
                {{ splitPaperCode(props.item.papers) }}
              </span>
            </td>
            <td class="text-xs-center">
              <span
                v-if="
                  props.item.improvement_papers > 0 &&
                    props.item.papers.length > 0
                "
              >
                {{ splitPaperCode(props.item.papers) }}
              </span>
            </td>
            <td class="text-xs-center">
              <span
                v-if="
                  props.item.optional_papers > 0 && props.item.papers.length > 0
                "
              >
                {{ splitPaperCode(props.item.papers) }}
              </span>
            </td>
            <td class="text-xs-center">
              <v-btn
                outline
                color="info"
                @click="showPaperDetails(props.item.papers)"
              >
                <b class="mr-2">{{ props.item.papers.length }}</b>
                <span v-if="props.item.papers.length - 1">Papers</span>
                <span v-else class="mr-2">Paper</span>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import moment from "moment";
import commonGet from "@/mixin/common_getters_mixin";
import common_login_getters from "../../mixin/common_login_getters";

export default {
  mixins: [commonGet],

  data: () => ({
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
    },
    loading: true,
    searchParam: {},
    total_candidate: 0,
    search: "",
    paperDialog: false,
    details: [],

    headers: [
      { text: "Subject", align: "center", value: "subject_code" },
      { text: "Reg. No.", align: "center", value: "reg_no" },
      { text: "Session", align: "center", value: "ac_session" },
      { text: "Name", align: "center", value: "std_name" },
      { text: "College", align: "center", value: "college_code" },
      { text: "Course", align: "center", value: "degree_group_name" },
      { text: "Candidate Type", align: "center", value: "candi_date_type" },
      { text: "Slot No.", align: "center", value: "slot_no" },
      { text: "FF. Criteria", align: "center", value: "ff_criteria" },
      {
        text: "Apply Status",
        align: "center",
        value: "student_confirm_status"
      },
      {
        text: "Confirm Status",
        align: "center",
        value: "teacher_confirm_status"
      },
      { text: "Payment Status", align: "center", value: "payment_status" },
      {
        text: "Mandatory Paper",
        align: "center",
        sortable: false,
        value: "mandatory_papers"
      },
      {
        text: "Improvement Paper",
        align: "center",
        sortable: false,
        value: "improvement_papers"
      },
      {
        text: "Optional Paper",
        align: "center",
        sortable: false,
        value: "optional_papers"
      },
      { text: "Paper Details", align: "center", value: "paper_code" }
    ],
    examData: "",
    detailsDialog: false
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getProbableStudentDetails;
    },
    getColleges() {
      return this.$store.getters.getSearchParamCollege;
    },
    getSubjects() {
      return this.$store.getters.getSearchParamSubject;
    },
    getSessions() {
      return this.$store.getters.getSearchParamSession;
    }
  },

  created() {
    getCollegeFromApi();
  },

  methods: {
    showPaperDetails(details) {
      this.paperDialog = true;
      this.details = details;
    },

    splitPaperCode(papers) {
      let paperData = papers;
      var paperCode = [];
      if (paperData && paperData.length) {
        paperData.forEach(function(item) {
          paperCode.push(item.paper_code);
        });
        return paperCode ? paperCode.join(",") : "";
      }
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.searchParam.search = this.search;
    },

    getCollegeFromApi() {
      this.searchParam.exam_id = this.getExamInitiateId;
      this.$store.dispatch("fetchExamWiseColleges", this.searchParam);
      this.$store.dispatch("fetchExamWiseSubjects", this.searchParam);
      this.$store.dispatch("fetchExamWiseSession", this.searchParam);
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchProbableStudentDetailData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
          this.total_candidate = data ? data.meta.total : 0;
          //console.log(data.meta.total);
        });
    },

    searchProbableCollegeWise() {
      this.loading = true;
      this.setLimit();
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.$store
        .dispatch("fetchProbableStudentDetailData", self.searchParam)
        .then(data => {
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
          self.total_candidate = data ? data.meta.total : 0;
          Object.keys(this.searchParam).forEach(function(key, index) {
            item[key] = "";
          });
        });
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
      this.getCollegeFromApi();
    },
    getLoggedInExam() {
      this.getDataFromApi();
    },
    getLoggedInYear() {
      this.getDataFromApi();
    },
    getExamInitiateId(val) {
      this.searchParam.exam_id = val;
      if (val) {
        this.getDataFromApi();
      }
    }
  }
};
</script>

<style scoped>
table.papers {
  border-collapse: collapse;
  width: 100%;
}

table.papers th,
table.papers td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
