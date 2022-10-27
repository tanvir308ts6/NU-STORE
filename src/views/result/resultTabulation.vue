<template>
  <div>
    <v-container fluid grid-list-md v-if="true">
      <v-expansion-panel class="mb-3" inset v-model="open">
        <v-expansion-panel-content class="CSP_BoarderStyle">
          <template v-slot:actions>
            <v-icon large color="primary">$vuetify.icons.expand</v-icon>
          </template>
          <template v-slot:header>
            <div>
              <v-icon color="primary">search</v-icon>
              <span class="pl-2 subheading">Custom Search Panel</span>
              <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
            </div>
          </template>
          <v-layout column class="mx-5">
            <v-flex class="mx-3">
              <v-layout row wrap align-center v-if="forceRerenderFlag">
                <v-flex xs9>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Exam"
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
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                <v-layout row wrap align-center class="py-3">
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="searchParam.reg_no"
                      class="ma-2"
                      name="reg_no"
                      label="Registration Number"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="searchParam.exam_roll"
                      class="ma-2"
                      name="exam_roll"
                      label="Exam Roll"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      class="ma-2"
                      name="code"
                      label="College Code"
                      v-model="searchParam.college_code"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>

                  <!-- <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.center_code"
                      :item-text="
                        (item) => item.center_code + ' - ' + item.center_name
                      "
                      item-value="center_code"
                      :items="getTheoryCenterList"
                      menu-props="auto"
                      label="Select Center"
                      prepend-icon="list"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.center_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{
                            data.item.center_code +
                              " - " +
                              data.item.center_name
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
                                data.item.center_code +
                                  ' - ' +
                                  data.item.center_name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex> -->

                  <!-- <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.paper_code"
                      :items="getPaperList"
                      :item-text="(item) => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Select Course"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.paper_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.code + " - " + data.item.title
                          }}</v-chip
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
                  </v-flex> -->

                  <v-flex xs12 sm6 md6>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.subject_code"
                      :items="getSubjectList"
                      :item-text="(item) => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Select Subject"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.subject_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.code + " - " + data.item.title
                          }}</v-chip
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
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <div>
              <v-flex xs12 sm12 md12 class="my-3">
                <v-layout justify-center row fill-height align-center>
                  <v-btn
                    outline
                    round
                    large
                    @click="searchresultTabulationData"
                  >
                    <v-icon left dark>search</v-icon>Search
                  </v-btn>
                </v-layout>
              </v-flex>
            </div>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider class="mt-2 mb-3"></v-divider>

      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-badge left overlap color="transparent">
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
                <v-card-text class="title">
                  Result Tabulation
                </v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
          </v-layout>
        </v-card>
        <v-data-table
          :loading="loading"
          :headers="formResultListHeaders"
          :items="getresultTabulationData"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">
              {{ props.item.college_code }} - {{ props.item.college_name }}
            </td>
            <td class="text-xs-left">
              {{ props.item.subject_code }}
              - {{ props.item.subject_name }}
            </td>
            <td class="text-xs">{{ props.item.exam_roll }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>
            <td class="text-xs">{{ props.item.session }}</td>
            <td class="text-xs-center">{{ props.item.student_name }}</td>
            <td class="text-xs-center">{{ props.item.cgpa }}</td>
            <td class="text-xs-center">{{ props.item.candidate_type }}</td>
            <td class="text-xs-center">
              {{ props.item.result_type_name }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p11 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p12 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p13 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p14 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p15 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p16 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p17 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p18 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p19 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p20 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p21 }}
            </td>
            <td class="text-xs-center" nowrap="true">
              {{ props.item.p22 }}
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {},
  data: () => ({
    paperDialog: false,
    consolidateDialog: false,
    promotedResult: false,
    notPromotedResult: false,
    absentResult: false,
    improvedResult: false,
    othersResult: false,
    details: [],
    result_status: "",
    passed: false,
    editedIndex: -1,
    warn: false,
    //forceRerenderFlag: true,
    visible: false,
    search: "",
    loading: false,
    consolidateResult: false,
    sl_count: 1,
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
    },
    searchParam: {},
    consolidateParam: {},
    degreePass: false,
    consolidateDataGet: false,
    examParam: {},
    showExamName: "",
    degreeTitle: "",
    F: false,
    result_status_name: "",
  }),
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
  },
  mounted() {
    if (this.searchParam.exam_code == "2204") {
      this.consolidateResult = true;
    }
  },
  computed: {
    getresultTabulationData() {
      return this.$store.getters.getresultTabulationData;
    },
    getPassed() {
      if (this.cgpa != "0.00") {
        this.passed = true;
        this.warn = false;
      } else {
        this.passed = false;
        this.warn = true;
      }
    },

    formResultListHeaders() {
      return [
        { text: "SL", value: "sl" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Registration No", value: "reg_no" },
        { text: "Session", value: "session" },
        { text: "Examinee Name", value: "student_name" },
        { text: "Cgpa/Grade", value: "cgpa" },
        { text: "Candidate Type", value: "candidate_type_name" },
        { text: "Result Type", value: "result_type_name" },
        { text: "P11", value: "p11", align: "center" },
        { text: "P12", value: "p12", align: "center" },
        { text: "P13", value: "p13", align: "center" },
        { text: "P14", value: "p14", align: "center" },
        { text: "P15", value: "p15", align: "center" },
        { text: "P16", value: "p16", align: "center" },
        { text: "P17", value: "p17", align: "center" },
        { text: "P18", value: "p18", align: "center" },
        { text: "P19", value: "p19", align: "center" },
        { text: "P20", value: "p20", align: "center" },
        { text: "P21", value: "p21", align: "center" },
        { text: "P22", value: "p22", align: "center" },
      ];
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchresultTabulationData() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchresultTabulationData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.data.from;
          this.pagination.totalItems = data.data.total;
        });
    },
  },
  watch: {
    pagination() {
      this.searchresultTabulationData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
