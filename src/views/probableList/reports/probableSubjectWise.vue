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
                      <v-select
                        multiple
                        name="subject_code"
                        class="ma-2"
                        v-model="searchParam.subject_code"
                        item-text="subject_name"
                        item-value="subject_code"
                        :items="getSubjects"
                        menu-props="auto"
                        label="Select Subject"
                        prepend-icon="edit"
                      ></v-select>
                      <v-select
                        name="status"
                        class="ma-2"
                        v-model="searchParam.status"
                        item-text="value"
                        item-value="key"
                        :items="probableStatus"
                        menu-props="auto"
                        label="Data Source"
                        prepend-icon="edit"
                      ></v-select>
                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn
                            color="primary"
                            large
                            @click="searchProbableSubjectWise"
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
            <v-card flat>
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
                <v-card-text class="title"
                  >Subject & College Wise Probable List</v-card-text
                >
              </v-badge>
            </v-card>

            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn
              color="blue-grey darken-2"
              class="white--text"
              @click="exportReport()"
            >
              <v-icon left dark>arrow_downward</v-icon>
              Export
            </v-btn>
          </v-layout>
        </v-card>
        <v-data-table
          hide-headers
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <table class="report-table">
              <tr v-if="props.index === 0">
                <th class="text-xs-left">Subject Code & Name</th>
                <th class="text-xs-left">College Code & Name</th>
                <th>Total</th>
              </tr>
              <tr>
                <td
                  :rowspan="props.item.colleges.length + 1"
                  width="35%"
                  class="text-xs-left"
                >
                  {{ props.item.subject_code }} - {{ props.item.subject_name }}
                </td>
              </tr>
              <template v-for="(student, i) in props.item.colleges">
                <tr>
                  <td width="55%" class="text-xs-left">
                    ({{ student.college_code }})
                    {{ student.college ? student.college.college_name : "" }}
                  </td>
                  <td class="text-xs-right">{{ student.total_student }}</td>
                </tr>
              </template>
              <tr>
                <td colspan="2" class="text-xs-right font-weight-bold">
                  Subject Total =
                </td>
                <td class="text-xs-right  font-weight-bold">
                  {{ totalStudent(props.item.colleges) }}
                </td>
              </tr>
            </table>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import commonGet from "../../../mixin/common_getters_mixin";
export default {
  mixins: [commonGet],

  data: () => ({
    pagination: {
      rowsPerPage: -1
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    total_candidate: 0,
    search: "",

    headers: [
      { text: "SL.", align: "left", value: "rn" },
      {
        text: "Subject Code & Name",
        align: "center",
        sortable: false,
        value: "subject_code"
      },
      {
        text: "College Code & Name",
        align: "center",
        sortable: false,
        value: "college_code"
      },
      {
        text: "Total Student",
        align: "center",
        sortable: false,
        value: "total_student"
      }
      //{text: "View", align: "center", value: "view", sortable: false}
    ],
    probableStatus: [
      { key: "1", value: "Probable Candidate List" },
      { key: "2", value: "Confirm Candidate List" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getProbableSubjectWiseWiseDetails;
    },
    getSubjects() {
      return this.$store.getters.getSearchParamSubject;
    }
  },

  created() {
    this.$store.dispatch("fetchSessionData");
  },

  methods: {
    totalStudent(item) {
      let total = 0;
      item.forEach(function(data) {
        total += parseInt(data.total_student);
      });
      return total ? total : 0;
    },
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.searchParam.search = this.search;
    },

    getSubjectFromApi() {
      this.searchParam.exam_id = this.getExamInitiateId;
      this.$store.dispatch("fetchExamWiseSubjects", this.searchParam);
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchProbableSubjectWiseDetailData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data ? data.meta.total : 0;
          this.total_candidate = data ? data.total_candidate : 0;
          //console.log(data.meta.total);
        });
    },

    searchProbableSubjectWise() {
      this.loading = true;
      this.setLimit();
      let self = this;
      this.searchParam.status;
      this.$store
        .dispatch("fetchProbableSubjectWiseDetailData", this.searchParam)
        .then(data => {
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
          self.total_candidate = data.total_candidate;
          /*Object.keys(this.searchParam).forEach(function (key, index) {
                            item[key] = '';
                        });*/
        });
    },

    exportReport() {
      this.setLimit();
      this.searchParam.search = true;
      this.$store.dispatch("exportProbableSubjectWise", this.searchParam);
    }
  },
  watch: {
    pagination() {
      this.getDataFromApi();
      this.getSubjectFromApi();
    },
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
    },
    getLoggedInYear(val) {
      this.searchParam.exam_year = val.year;
    },
    getExamInitiateId(val) {
      this.searchParam.exam_id = val;
      this.getDataFromApi();
      this.getSubjectFromApi();
    }
  }
};
</script>

<style scoped>
.report-table {
  border-collapse: collapse;
  width: 100%;
}

.report-table td,
.report-table th {
  border: 1px solid #ddd !important;
}
</style>
