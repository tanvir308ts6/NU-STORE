<template>
  <v-container fluid>
    <!-- form fillup generate -->
    <div>
      <!-- <mastersFinal
        :dialogStatus.sync="formDialogStatus"
        :studentData.sync="studentData"
      ></mastersFinal>
      <bedFirstSemester
        :dialogStatus.sync="formDialogBedFirstSemester"
        :studentData.sync="studentData"
      ></bedFirstSemester>
      <bed-second-semester
        :dialogStatus.sync="formDialogBedSecondSemester"
        :studentData.sync="studentData"
      ></bed-second-semester>
      <honoursPartOne
        :dialogStatus.sync="formDialogHnsPartOne"
        :studentData.sync="studentData"
      ></honoursPartOne>
      <honoursPartTwo
        :dialogStatus.sync="formDialogHnsPartTwo"
        :studentData.sync="studentData"
      ></honoursPartTwo>
      <honoursPartThree
        :dialogStatus.sync="formDialogHnsPartThree"
        :studentData.sync="studentData"
      ></honoursPartThree>
      <degreeFirstYear
        :dialogStatus.sync="formDialogDegreFirstYear"
        :studentData.sync="studentData"
      ></degreeFirstYear>
      <degreeSecondYear
        :dialogStatus.sync="formDialogDegreSecondYear"
        :studentData.sync="studentData"
      ></degreeSecondYear> -->
      <defaultForm
        :dialogStatus.sync="formDialogDefault"
        :studentData.sync="studentData"
      ></defaultForm>
    </div>
    <!-- end form fillup -->

    <div>
      <ExamMasterFee
        :dialogStatus.sync="showexamMaster"
        :dialogData.sync="examMaster"
      ></ExamMasterFee>
    </div>

    <div>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Exam List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <!--<v-text-field
                                            v-model="search"
                                            prepend-inner-icon="search"
                                            label="Search"
                                            class="mt-0"
                                            hide-details
                                            solo
                                            flat
                                            single-line
                        ></v-text-field>-->
            <v-spacer />
            <!--<v-btn color="primary" dark class="mb-2" @click="newItem">New Item</v-btn>-->
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
            <td class="text-xs-left">{{ props.item.exam_display_name }}</td>

            <td class="text-xs-left">
              {{
                props.item.start_date
                  ? formatted_date(props.item.start_date)
                  : ""
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.end_date ? formatted_date(props.item.end_date) : ""
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.total_student && props.item.total_student.length > 0
                  ? props.item.total_student[0].students
                  : ""
              }}
            </td>
            <td class="justify-left layout px-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="props.item.total_student.length > 0"
                    fab
                    dark
                    small
                    color="warning"
                    @click="showStudentCountDetails(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>list</v-icon>
                  </v-btn>
                </template>
                <span>Details List</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="props.item.exm_master_fee.length > 0"
                    fab
                    dark
                    small
                    color="primary"
                    @click="generateProbable(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </template>
                <span>Generate Probable</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="props.item.exm_master_fee.length > 0"
                    fab
                    dark
                    small
                    color="success"
                    v-on="on"
                    @click="showExamFee(props.item)"
                  >
                    <!-- <v-icon dark>attach_money</v-icon> -->
                    <span>&#2547;</span>
                  </v-btn>
                  <v-btn
                    v-else
                    fab
                    dark
                    small
                    color="red"
                    v-on="on"
                    @click="showExamFee(props.item)"
                  >
                    <!-- <v-icon dark>attach_money</v-icon> -->
                    <span>&#2547;</span>
                  </v-btn>
                </template>
                <span>Fee Setup</span>
              </v-tooltip>
            </td>
          </template>
          <template>
            <!-- v-slot:expand="props" -->
            <v-card flat>
              <v-card-text>Peek-a-boo!</v-card-text>
            </v-card>
          </template>
          <template v-slot:no-data></template>
        </v-data-table>
      </v-container>
    </div>
    <!-- <pre>{{getSchema}}</pre>  -->
  </v-container>
</template>
<script>
// @ts-nocheck

//generate probable
// import mastersFinal from "@/components/probable/masters/mastersFinal.vue";
// import honoursPartOne from "@/components/probable/honours/honoursPartOne.vue";
// import honoursPartTwo from "@/components/probable/honours/honoursPartTwo.vue";
// import honoursPartThree from "@/components/probable/honours/honoursPartThree.vue";
// Honours degree pass
// import degreeFirstYear from "@/components/probable/degree/degreeFirstYear.vue";
// import degreeSecondYear from "@/components/probable/degree/degreeSecondYear.vue";
//bed one year professional
// import bedFirstSemester from "@/components/probable/bedProf/bedFirstSemister.vue";
// import bedSecondSemester from "@/components/probable/bedProf/bedSecondSemister.vue";

// Default from
// const defaultForm = () => import(/* webpackChunkName: "group-foo" */ '@/components/probable/default/default.vue')
// const ExamMasterFee = () => import(/* webpackChunkName: "group-foo" */ '@/components/probable/ExamMasterFee.vue')
// import defaultForm from "@/components/probable/default/default.vue";
// end probable
// import ExamMasterFee from "@/components/probable/ExamMasterFee.vue";
import moment from "moment";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  mixins: [commonGet],

  components: {
    defaultForm: () =>
      import(
        /* webpackChunkName: "group-foo" */ "@/components/probable/default/default.vue"
      ),
    ExamMasterFee: () =>
      import(
        /* webpackChunkName: "group-foo" */ "@/components/probable/ExamMasterFee.vue"
      )
    // mastersFinal,
    // honoursPartOne,
    // honoursPartTwo,
    // honoursPartThree,
    // bedFirstSemester,
    // bedSecondSemester,
    // degreeFirstYear,
    // degreeSecondYear,
  },

  data: () => ({
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10]
    },
    totalDataItems: 0,
    loading: true,
    searchParam: {},
    search: "",

    headers: [
      { text: "Exam Code & Name", align: "left", value: "exam_code" },
      { text: "F.F Start Date", align: "left", value: "start_date" },
      { text: "F.F End Date", align: "left", value: "end_date" },
      { text: "Total Students", align: "left", value: "fat" },
      { text: "Actions", align: "left", sortable: false }
    ],

    dialog: false,
    studentData: "",
    examMaster: {},
    showexamMaster: false,
    formDialogStatus: false,
    formDialogHnsPartOne: false,
    formDialogHnsPartTwo: false,
    formDialogHnsPartThree: false,
    formDialogHnsPartFour: false,
    formDialogBedFirstSemester: false,
    formDialogBedSecondSemester: false,
    formDialogDegreFirstYear: false,
    formDialogDegreSecondYear: false,
    formDialogDefault: false
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getAllExamMaster;
    }
  },

  created() {
    //this.$store.dispatch("fetchAllExamsnData");
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
  watch: {
    pagination() {
      this.getDataFromApi();
    },
    /*getLoggedInExam(val) {
             //this.searchParam.exam_code = val.code;
             },
             getLoggedInYear(val) {
             //this.searchParam.exam_year = val.year;
             },*/
    getExamInitiateId(val) {
      this.searchParam.exam_id = val;
      //console.log('exams ====' + val)
      if (val) {
        this.getDataFromApi();
      }
    }
  },

  methods: {
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.loading = true;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.setLimit();
      this.$store
        .dispatch("fetchAllExamsnData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    formatted_date(date) {
      return moment(date).format("DD-MM-YYYY");
    },

    generateProbable(item) {
      let self = this;
      self.$store.dispatch("getSlotAcSession", {
        exam_code: self.getSchema[0].exam_code,
        exam_year: self.getSchema[0].exam_year
      });
      self.$store.dispatch("fetchSessionData");
      self.$store.dispatch("fetchExamYearData");
      self.$store.dispatch("fetchExamWiseColleges", self.searchParam);
      self.$store.dispatch("fetchExamWiseSession", self.searchParam);
      self.$store.dispatch("fetchCourseListInfo", {
        exam_code: self.getSchema[0].exam_code
      });
      self.$store.dispatch("fetchCandidateType");

      const exam_code = parseInt(item.exam_code);
      self.studentData = item;
      self.formDialogDefault = true;

      // switch (exam_code) {
      //   case 3302:
      //     this.studentData = item;
      //     this.formDialogStatus = true;
      //     break;
      // case 2201:
      //   this.studentData = item;
      //   this.formDialogHnsPartOne = true;
      //   break;
      // case 2202:
      //   this.studentData = item;
      //   this.formDialogHnsPartTwo = true;
      //   break;
      // case 2203:
      //   this.studentData = item;
      //   this.formDialogHnsPartThree = true;
      //   break;
      // case 8111:
      //   this.studentData = item;
      //   this.formDialogBedFirstSemester = true;
      //   break;
      // case 8112:
      //   this.studentData = item;
      //   this.formDialogBedSecondSemester = true;
      //   break;

      // default:
      //   this.studentData = item;
      //   this.formDialogDefault = true;
      //   break;
      // }
    },

    showStudentCountDetails() {
      this.$router.push({ path: "/prob/pbl-slot-wise" });
    },

    showExamFee(item) {
      this.$store.dispatch("fetchExmFeeHeads");
      this.$store.dispatch("fetchPaperType");

      if (!item.exm_master_fee.length) {
        item.exm_master_fee.push({
          fee_title: null,
          fee_type: "Per Exam",
          credit: null,
          amount: 0
        });
      }
      this.examMaster = item;
      this.showexamMaster = true;

      // console.log(this.examMaster);
      // console.log(this.showexamMaster);
    }
  }
};
</script>

<style scoped></style>
