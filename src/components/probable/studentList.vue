<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <v-layout row>
          <v-flex md3>
            <div class="text-md-left">
              <v-chip>
                <v-avatar class="teal" text-color="white">
                  <h4 class="color-white">
                    {{ getFormFillUpInfo.probable_candidate }}
                  </h4>
                </v-avatar>
                <h3>Probable Candidate</h3>
              </v-chip>
            </div>
          </v-flex>
          <v-flex md3>
            <div class="text-md-left">
              <v-chip>
                <v-avatar class="teal" text-color="white">
                  <h4 class="color-white">
                    <h4 class="color-white">
                      {{ getFormFillUpInfo.applied_student }}
                    </h4>
                  </h4>
                </v-avatar>
                <h3>Applied Student</h3>
              </v-chip>
            </div>
          </v-flex>
          <v-flex md3>
            <div class="text-md-left">
              <v-chip>
                <v-avatar class="teal" text-color="white">
                  <h4 class="color-white">
                    <h4 class="color-white">
                      {{ getFormFillUpInfo.confirmed_by_college }}
                    </h4>
                  </h4>
                </v-avatar>
                <h3>Confirmed By College</h3>
              </v-chip>
            </div>
          </v-flex>
        </v-layout>
        <br />
        <v-layout row>
          <v-expansion-panel v-model="panel" expand>
            <v-expansion-panel-content class="mycustomExpansionPanel">
              <template v-slot:actions>
                <v-icon large color="primary">$vuetify.icons.expand</v-icon>
              </template>
              <template v-slot:header>
                <div>
                  <v-icon color="primary">search</v-icon>
                  <span class="pl-2 subheading">Search Student</span>
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
                        clearable
                      ></v-text-field>
                      <v-select
                        name="candidate_type"
                        class="ma-2"
                        v-model="searchParam.candidate_type"
                        item-text="candidate_type"
                        item-value="id"
                        :items="getCandidate"
                        menu-props="auto"
                        label="Select Candidate"
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-text-field
                        v-if="searchParam.candidate_type"
                        class="ma-2"
                        name="slot_no"
                        label="Slot No"
                        v-model="searchParam.slot_no"
                        prepend-icon="edit"
                        clearable
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
                        clearable
                      ></v-select>

                      <v-autocomplete
                        class="ma-2"
                        v-model="searchParam.college_code"
                        :item-text="
                          item => `${item.college_code}-${item.college_name}`
                        "
                        item-value="college_code"
                        :items="getColleges"
                        menu-props="auto"
                        label="Select College"
                        prepend-icon="subject"
                        clearable
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="searchParam.college_code = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                            >{{
                              `${data.item.college_code}-${data.item.college_name}`
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
                                v-html="
                                  `${data.item.college_code}-${data.item.college_name}`
                                "
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>

                      <v-select
                        name="degree_group_code"
                        class="ma-2"
                        v-model="searchParam.degree_group_code"
                        :item-text="
                          item =>
                            item.degree_group_code +
                            '-' +
                            item.degree_group_name
                        "
                        item-value="degree_group_code"
                        :items="getCourse"
                        menu-props="auto"
                        label="Degree Group"
                        prepend-icon="edit"
                        @change="getSubjectData"
                        clearable
                      ></v-select>

                      <v-autocomplete
                        v-if="getLoggedInDegree.degree_code != 1"
                        class="ma-2"
                        v-model="searchParam.subject_code"
                        :item-text="
                          item => `${item.subject_code}-${item.subject_name}`
                        "
                        item-value="subject_code"
                        :items="getSubject"
                        menu-props="auto"
                        label="Select Subject"
                        prepend-icon="subject"
                        @change="getPapersData"
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

                      <v-autocomplete
                        multiple
                        name="papers"
                        class="ma-2"
                        v-model="searchParam.papers"
                        :item-text="
                          item => `${item.paper_code}-${item.paper_name}`
                        "
                        item-value="id"
                        :items="getExamWisePapers"
                        menu-props="auto"
                        label="Select Papers"
                        prepend-icon="edit"
                        clearable
                      ></v-autocomplete>

                      <v-select
                        name="ff_criteria"
                        class="ma-2"
                        v-model="searchParam.ff_criteria"
                        item-text="criteria_name"
                        item-value="ff_criteria"
                        :items="getCriteria"
                        menu-props="auto"
                        label="Select Criteria"
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-select
                        name="student_confirm_status"
                        class="ma-2"
                        v-model="searchParam.student_confirm_status"
                        item-text="status_name"
                        item-value="student_confirm_status"
                        :items="getStdConfirmStatus"
                        menu-props="auto"
                        label="Student Apply Status"
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-select
                        name="teacher_confirm_status"
                        class="ma-2"
                        v-model="searchParam.teacher_confirm_status"
                        item-text="status_name"
                        item-value="teacher_confirm_status"
                        :items="getTecConfirmStatus"
                        menu-props="auto"
                        label="College Confirm Status"
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-select
                        name="status"
                        class="ma-2"
                        v-model="searchParam.status"
                        item-text="name"
                        item-value="id"
                        :items="sourceData"
                        menu-props="auto"
                        label="Source Data"
                        prepend-icon="edit"
                        clearable
                      ></v-select>

                      <v-select
                        name="form_fill_up_type"
                        class="ma-2"
                        v-model="searchParam.form_fill_up_type"
                        item-text="type_name"
                        item-value="form_fill_up_type"
                        :items="getFormFillUpType"
                        menu-props="auto"
                        label="Form Fillup Type"
                        prepend-icon="edit"
                        clearable
                      ></v-select>

                      <v-flex xs12 sm12 md12 style="margin-top: 40px">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn
                            color="primary"
                            large
                            @click="searchProbableCollegeWise"
                            >Search</v-btn
                          >
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
              <v-icon>close</v-icon>)
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
                    <tr :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <v-icon
                          v-if="paper.confirm_paper == 1"
                          class="text-xs-left"
                          >check</v-icon
                        >
                        {{ paper.paper_code }}-{{ paper.core_paper.paper_name }}
                      </td>
                    </tr>
                  </template>
                </table>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" width="700px">
          <v-card>
            <v-toolbar
              dense
              class="text-uppercase white--text"
              color="cyan darken-4"
            >
              <v-toolbar-title>
                Are you sure
                {{
                  formData && formData.status == 1
                    ? "confirm"
                    : formData.status == 2
                    ? "withheld"
                    : "Delete"
                }}
                Probable Data
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-spacer class="ma-4"></v-spacer>
              <v-textarea
                name="remarks"
                v-model="formData.remarks"
                auto-grow
                label="Remarks"
                rows="1"
                v-validate="'required'"
                :error-messages="errors.collect('remarks')"
                data-vv-name="remarks"
                required
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <div class="justify-center layout px-0 mt-2">
                <v-btn color="primary" dark @click="probableStatusUpdate"
                  >Update Status</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div v-if="getSchema && getSchema.length > 0">
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-badge left overlap color="transparent">
                  <template v-slot:badge>
                    <v-btn
                      round
                      color="primary"
                      small
                      style="margin-top: -0.8em"
                      class="elevation-0"
                      v-if="pagination.totalItems"
                      >{{ pagination.totalItems }}</v-btn
                    >
                  </template>
                  <v-card-text class="title text-uppercase"
                    >Probable Student List</v-card-text
                  >
                </v-badge>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer class="ml-5"></v-spacer>
              <slot v-if="searchParam.slot_no">
                <v-select
                  name="ac_session"
                  v-model="formData.status"
                  item-text="name"
                  item-value="id"
                  :items="statusData"
                  menu-props="auto"
                  label="Select Status"
                ></v-select>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="formData.status ? (dialog = true) : (dialog = false)"
                  >Update Status</v-btn
                >
              </slot>
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
            <template v-slot:items="props" style="white-space: nowrap">
              <td class="text-xs-left nowrap">
                <span v-if="props.item.student.subject">
                  {{
                    `${props.item.student.subject_code}-${props.item.student.subject_name}`
                  }}
                </span>
                <slot
                  v-else-if="props.item.student.student_subject_info.length"
                >
                  <span>
                    {{
                      getStudentSubject(props.item.student.student_subject_info)
                    }}
                  </span>
                </slot>
                <span v-else class="text-xs-center">N/A</span>
              </td>
              <td class="text-xs-center">{{ props.item.reg_no }}</td>
              <td class="text-xs-center">{{ props.item.ac_session }}</td>
              <td class="text-xs-left nowrap">{{ props.item.std_name }}</td>
              <td class="text-xs-left nowrap">
                {{
                  props.item.college
                    ? `${props.item.college.college_code}` +
                      "-" +
                      props.item.college.college_name
                    : ""
                }}
              </td>
              <td class="text-xs-left nowrap">
                {{
                  `${props.item.degree_group_code}-${props.item.degree_group_name}`
                }}
              </td>
              <td class="text-xs-left">
                {{
                  props.item.candi_date_type
                    ? props.item.candi_date_type.candidate_type
                    : ""
                }}
              </td>
              <td class="text-xs-left">
                <span class="nowrap" v-if="props.item.ff_criteria == 1"
                  >All Paper</span
                >
                <span class="nowrap" v-if="props.item.ff_criteria == 2"
                  >Fail And Improvement Paper</span
                >
                <span class="nowrap" v-if="props.item.ff_criteria == 3"
                  >Only Fail Paper</span
                >
              </td>
              <td class="text-xs-center">{{ props.item.slot_no }}</td>
              <td class="text-xs-center">
                <v-chip
                  color="primary"
                  text-color="white"
                  small
                  v-if="props.item.confirm_status == 0"
                >
                  Draft
                </v-chip>
                <v-chip
                  color="success"
                  text-color="white"
                  small
                  v-if="props.item.confirm_status == 1"
                >
                  Confirm
                </v-chip>
                <v-chip
                  color="red"
                  text-color="white"
                  small
                  v-if="props.item.confirm_status == 2"
                >
                  Withheld
                </v-chip>
              </td>

              <td class="text-xs-center">
                <v-chip
                  color="success"
                  text-color="white"
                  v-if="props.item.student_confirm_status === '1'"
                  small
                >
                  Applied
                </v-chip>
                <v-chip color="red" text-color="white" v-else small>
                  Not Apply
                </v-chip>
              </td>
              <td class="text-xs-center">
                <v-chip
                  color="success"
                  text-color="white"
                  v-if="props.item.teacher_confirm_status === '1'"
                  small
                  >Confirmed</v-chip
                >
              </td>
              <td class="text-xs-left">
                <v-chip
                  v-if="props.item.payment_status === '1'"
                  color="primary"
                  text-color="white"
                  small
                  >Paid</v-chip
                >
                <v-chip v-else color="red" text-color="white" small
                  >Unpaid</v-chip
                >
              </td>

              <!--Mendatory Papers -->
              <td class="text-xs-left nowrap">
                <span>
                  {{ getMendatoryPaperCode(props.item.papers) }}
                </span>
              </td>
              <!--Improvement Papers -->
              <td class="text-xs-left nowrap">
                <span>
                  {{ getImprovementPaperCode(props.item.papers) }}
                </span>
              </td>
              <!--Elective Papers -->
              <td class="text-xs-left nowrap">
                <span>
                  {{ getElectivePaperCode(props.item.papers) }}
                </span>
              </td>
              <!--Optionals Papers -->
              <td class="text-xs-left nowrap">
                <span>
                  {{ getOptionalPaperCode(props.item.papers) }}
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
            <template v-slot:no-data></template>
          </v-data-table>
        </div>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";

export default {
  mixins: [commonGet],
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    panel: [true],
    pagination: {
      rowsPerPage: 50,
      rowsPerPageItems: [50, 100, 500]
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    formData: {},
    search: "",
    paperDialog: false,
    dialog: false,
    details: [],

    headers: [
      { text: "Subject", align: "left", value: "subject_code" },
      { text: "Reg. No.", align: "left", value: "reg_no" },
      { text: "Session", align: "left", value: "ac_session" },
      { text: "Name", align: "left", value: "std_name" },
      { text: "College", align: "left", value: "college_code" },
      { text: "Course", align: "left", value: "degree_group_name" },
      { text: "Candidate Type", align: "left", value: "candi_date_type" },
      { text: "Criteria", align: "left", value: "ff_criteria" },
      { text: "Slot No.", align: "left", value: "slot_no" },
      { text: "Probable Status", align: "left", value: "confirm_status" },
      {
        text: "Form Fill-up Apply Status",
        align: "left",
        value: "student_confirm_status"
      },
      {
        text: "Form Fill-up Confirm Status",
        align: "left",
        value: "teacher_confirm_status"
      },
      { text: "Payment Status", align: "left", value: "payment_status" },
      {
        text: "Mandatory Paper",
        align: "left",
        sortable: false,
        value: "mandatory_papers"
      },
      {
        text: "Improvement Paper",
        align: "left",
        sortable: false,
        value: "improvement_papers"
      },
      {
        text: "Elective Paper",
        align: "left",
        sortable: false,
        value: "elective_papers"
      },
      {
        text: "Optional Paper",
        align: "left",
        sortable: false,
        value: "optional_papers"
      },
      { text: "Paper Details", align: "left", value: "paper_code" }
    ],
    examData: "",
    detailsDialog: false,
    sourceData: [
      { id: "1", name: "Probable Confirm" },
      { id: "2", name: "Probable With Held" }
    ],
    statusData: [
      { id: "1", name: "Confirm" },
      { id: "2", name: "Withheld" },
      { id: "3", name: "Delete" }
    ]
  }),

  computed: {
    getFormFillUpInfo() {
      return this.$store.getters.getFormFillupInfo;
    },
    getSchema() {
      return this.$store.getters.getProbableStudentDetails;
    },
    getCourse() {
      return this.$store.getters.getExamByCourse;
    },
    getColleges() {
      return this.$store.getters.getSearchParamCollege;
    },
    getCandidate() {
      return this.$store.getters.getCandidateType;
    },
    getSubjects() {
      return this.$store.getters.getSearchParamSubject;
    },
    getExamWisePapers() {
      return this.$store.getters.getSearchParamPapers;
    },
    getSubject() {
      return this.$store.getters.getAllSubject;
    },
    getSessions() {
      return this.$store.getters.getSearchParamSession;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getCriteria() {
      return [
        { ff_criteria: 1, criteria_name: "All Paper" },
        { ff_criteria: 2, criteria_name: "Fail And Improvement Paper" },
        { ff_criteria: 3, criteria_name: "Only Fail Paper" }
      ];
    },
    getStdConfirmStatus() {
      return [
        { student_confirm_status: 1, status_name: "Applied" },
        { student_confirm_status: 0, status_name: "Not Apply" }
      ];
    },
    getTecConfirmStatus() {
      return [
        { teacher_confirm_status: 1, status_name: "Confirmed By College" },
        { teacher_confirm_status: 0, status_name: "Not Confirm By College" }
      ];
    },
    getFormFillUpType() {
      return [
        { form_fill_up_type: 1, type_name: "Regular" },
        { form_fill_up_type: 2, type_name: "Special" }
      ];
    }
  },

  created() {
    this.$store.dispatch("fetchExamWisePapers", {
      exam_code: this.getLoggedInExam.code
    });
    this.$store.dispatch("getFormFillInfo", {
      exam_code: this.getLoggedInExam.code,
      exam_year: this.getLoggedInYear.year
    });
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
      //this.searchParam.exam_code = this.getLoggedInExam.code;
      //this.searchParam.exam_year = this.getLoggedInYear.year;
      this.searchParam.exam_id = this.getExamInitiateId;
    },

    getCollegeFromApi() {
      this.searchParam.exam_id = this.getExamInitiateId;
      this.searchParam.exam_code = this.getLoggedInExam.code;

      this.$store.dispatch("fetchCourseListInfo", this.searchParam);
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchProbableStudentDetailData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data ? data.meta.total : 0;
          //console.log(data.meta.total);
        });
    },

    getSubjectData(degree_group_code) {
      let self = this;
      if (self.getCourse[0].degree_code != 1) {
        self.$store.dispatch("fetchAllSubjectData", {
          params: { degree_group_code: degree_group_code }
        });
      }
    },

    getPapersData(subject_code) {
      let self = this;
      let searchBy = {
        exam_code: this.getLoggedInExam.code,
        subject_code: subject_code
      };
      self.$store.dispatch("fetchExamWisePapers", searchBy);
    },

    searchProbableCollegeWise() {
      this.loading = true;
      this.setLimit();
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.searchParam.search = true;
      this.$store
        .dispatch("fetchProbableStudentDetailData", self.searchParam)
        .then(data => {
          self.loading = false;
          self.sl_count = data.meta.from;
          self.pagination.totalItems = data.meta.total;
        });
    },

    probableStatusUpdate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.searchParam.exam_id = this.getExamInitiateId;
          this.searchParam.search = true;
          let arr = this.getSchema;
          let self = this;

          let data = [];
          arr.forEach(item => {
            data.push({
              id: item.id,
              exam_id: item.exam_initiate_id,
              ff_criteria: item.ff_criteria
            });
          });
          const probableData = JSON.stringify(data);
          let fd = {
            exam_id: self.getExamInitiateId,
            searchParam: self.searchParam,
            remarks: self.formData.remarks,
            probableData: probableData,
            status: self.formData.status
          };

          this.$store
            .dispatch("probableDataStatusUpdate", fd)
            .then(function(data) {
              try {
                self.$store.dispatch(
                  "fetchProbableStudentDetailData",
                  self.searchParam
                );
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function(error) {
              console.log(error);
              self.$store.dispatch(
                "fetchProbableStudentDetailData",
                self.searchParam
              );
            });
        }
      });
    },
    getStudentSubject(subjects) {
      var subjectString = [];
      subjects.forEach(subject => {
        subjectString.push(subject.reg_subject_display_name);
      });
      return subjectString.join();
    },
    getMendatoryPaperCode(papers) {
      var papers_code = [];
      papers.forEach(paper => {
        /*
        if (
          //(paper.prev_grade && paper.prev_grade == "F") ||
          paper.ff_type == 1 ||
          (!paper.prev_grade && paper.core_paper.paper_type_info_id == 1)
        ) {
          papers_code.push(paper.core_paper.paper_code);
        }
        */
        if (paper.ff_type == 1) {
          papers_code.push(paper.paper_code);
        }
      });
      return papers_code.join();
    },
    getImprovementPaperCode(papers) {
      var papers_code = [];
      papers.forEach(paper => {
        /* Previous improvement papers
        if (paper.prev_grade && paper.prev_grade != "F") {
          papers_code.push(paper.paper_code);
        }
        */
        if (paper.ff_type == 4) {
          papers_code.push(paper.paper_code);
        }
      });
      return papers_code.join();
    },
    getElectivePaperCode(papers) {
      var papers_code = [];
      papers.forEach(paper => {
        if (
          paper.prev_grade == null &&
          paper.core_paper.paper_type_info_id == 2
        ) {
          papers_code.push(paper.paper_code);
        }
      });
      return papers_code.join();
    },
    getOptionalPaperCode(papers) {
      var papers_code = [];
      papers.forEach(paper => {
        if (
          paper.prev_grade == null &&
          paper.core_paper.paper_type_info_id == 3
        ) {
          papers_code.push(paper.paper_code);
        }
      });
      return papers_code.join();
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
  },
  mounted() {
    this.searchParam.exam_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    // this.$store.dispatch("fetchExamWiseColleges", this.searchParam);
    // this.$store.dispatch("fetchExamWiseSubjects", this.searchParam);
    // this.$store.dispatch("fetchExamWiseSession", this.searchParam);
    //this.$store.dispatch("fetchCourseListInfo", this.searchParam);
    // this.$store.dispatch("fetchCandidateType");
  }
};
</script>

<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}
.nowrap {
  white-space: nowrap;
}
.color-white {
  color: whitesmoke;
}
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
