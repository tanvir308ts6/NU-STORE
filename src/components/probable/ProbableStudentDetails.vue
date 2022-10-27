<template>
  
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            Probable Details [ ({{ examData.exam_code }})
            {{ examData.exam_name }} - {{ examData.exam_year }} ]
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
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
                  <v-flex md12>
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

                        <v-flex xs12 sm12 md12 style="margin-top:40px;">
                          <v-layout justify-center row fill-height align-center>
                            <v-btn
                              color="primary"
                              large
                              @click="searchStudentData"
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

          <v-container fluid>
            <v-card color="white">
              <v-layout row>
                <v-card flat>
                  <v-card-text class="title">
                    <span v-if="examData.ff_criteria === '1'"
                      >Regular Student Session ({{
                        getSessions[0]["ac_session"]
                      }})</span
                    >
                    <span v-if="examData.ff_criteria === '2'"
                      >Irregular Student Session - 2014-15, 2015-16</span
                    >
                    <span v-if="examData.ff_criteria === '3'"
                      >Improvement Student Session - 2014-15, 2015-16 and
                      [Grade-F]
                    </span>
                    <span v-if="examData.ff_criteria === '4'"
                      >Improvement Student Exam Year - 2016 and [Grade-C,D,F]
                    </span>
                    <span v-if="examData.ff_criteria === '5'"
                      >Improvement Student Exam Year - 2016, CGPA-2.5 or
                      below,[Grade-C,D], Max Paper -2</span
                    >
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-card>
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
                <td class="text-xs-left" style="white-space: nowrap;">
                  {{
                    `${props.item.subject_code}-` +
                      " " +
                      props.item.subject_name
                  }}
                </td>
                <td class="text-xs-left">{{ props.item.reg_no }}</td>
                <td class="text-xs-left">{{ props.item.ac_session }}</td>
                <td class="text-xs-left" style="white-space: nowrap;">
                  {{ props.item.std_name }}
                </td>
                <td class="text-xs-left" style="white-space: nowrap;">
                  {{
                    `(${props.item.college_code})` +
                      " " +
                      props.item.college_name
                  }}
                </td>

                <td class="text-xs-left" style="white-space: nowrap;">
                  {{ props.item.degree_group_name }}
                </td>

                <td class="text-xs-left">
                  {{ props.item.exam_roll_no ? props.item.exam_roll_no : "" }}
                </td>
                <td class="text-xs-left">
                  <div
                    v-if="
                      props.item.mandatory_papers > 0 &&
                        props.item.papers.length > 0
                    "
                  >
                    <span v-for="(paper, i) in props.item.papers"
                      >{{ paper.paper_code }},
                    </span>
                  </div>
                </td>
                <td class="text-xs-left">
                  <div
                    v-if="
                      props.item.improvement_papers > 0 &&
                        props.item.papers.length > 0
                    "
                  >
                    <span v-for="(paper, i) in props.item.papers"
                      >{{ paper.paper_code }},
                    </span>
                  </div>
                </td>
                <td class="text-xs-left">
                  <div
                    v-if="
                      props.item.optional_papers > 0 &&
                        props.item.papers.length > 0
                    "
                  >
                    <span v-for="(paper, i) in props.item.papers"
                      >{{ paper.paper_code }},
                    </span>
                  </div>
                </td>
                <td class="text-xs-left">
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
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  name: "ProbableSlotListDetail",
  props: ["dialogStatus", "examData"],
  mixins: [commonGet],

  data: () => ({
    dialog: false,
    pagination: {
      rowsPerPage: 5,
      rowsPerPageItems: [5]
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    search: "",
    paperDialog: false,
    details: [],

    headers: [
      // {text: "Exam Name", align: "center", value: "name"},
      { text: "Subject", align: "left", value: "subject_code" },
      { text: "Reg. No", align: "left", value: "reg_no" },
      {
        text: "Session",
        align: "left",
        sortable: false,
        value: "ac_session"
      },
      { text: "Name", align: "left", value: "std_name" },
      { text: "College", align: "left", value: "college_code" },
      { text: "Course", align: "left", value: "degree_group_name" },
      { text: "Exam Roll", align: "left", value: "exam_roll_no" },
      { text: "Mandatory Paper", align: "left", value: "mandatory_papers" },
      {
        text: "Improvement Paper",
        align: "left",
        value: "improvement_papers"
      },
      { text: "Optional Paper", align: "left", value: "optional_papers" },
      { text: "Paper Details", align: "left", value: "paper_code" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getProbableDetails;
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
  created() {},

  methods: {
    showPaperDetails(details) {
      this.paperDialog = true;
      this.details = details;
      // console.log(details);
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
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
      this.searchParam.exam_id = this.examData.exam_initiate_id;
      this.searchParam.ff_criteria = this.examData.ff_criteria;
      this.searchParam.slot_no = this.examData.slot_no;
      this.$store
        .dispatch("fetchProbableSlotDetailData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    searchStudentData() {
      this.loading = true;
      this.setLimit();
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.$store
        .dispatch("fetchProbableSlotDetailData", self.searchParam)
        .then(data => {
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },

    formatted_date(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      if (this.dialog) {
        this.getDataFromApi();
        this.getCollegeFromApi();
      }
    },

    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped>
table.papers {
  border-collapse: collapse;
  width: 100%;
}

table.papers td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 5px;
}
</style>
