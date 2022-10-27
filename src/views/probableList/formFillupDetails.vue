<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <div>
          <probableStudentDetails
            :dialogStatus.sync="detailsDialog"
            :examData="examData"
          ></probableStudentDetails>
        </div>
        <v-card color="white">
          <v-layout row>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  small
                  style="margin-top: -0.8em"
                  class="elevation-0"
                  v-if="totalStudents()"
                  >{{ totalStudents() }}
                </v-btn>
              </template>
              <v-card-text class="title">Probable Slot List</v-card-text>
            </v-badge>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-btn small fab @click="refresh()">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props" style="white-space: nowrap">
            <td class="text-xs-center">
              <v-chip small>
                {{ props.item.candidate_type.candidate_type }}
              </v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.slot }}</td>
            <td class="text-xs-left">
              <span v-if="props.item.json_text.regular_ac_session"
                >Session : {{ props.item.json_text.regular_ac_session }}<br
              /></span>
              <span v-if="props.item.json_text.irregular_ac_session"
                >Session : {{ props.item.json_text.irregular_ac_session }}<br
              /></span>
              <span v-if="props.item.json_text.improve_session"
                >Session : {{ props.item.json_text.improve_session }}<br
              /></span>
              <span v-if="props.item.json_text.irregular_exam_year"
                >Exam Year : {{ props.item.json_text.irregular_exam_year }}<br
              /></span>
              <span v-if="props.item.json_text.improve_exam_year"
                >Exam Year : {{ props.item.json_text.improve_exam_year }}<br
              /></span>
              <span v-if="props.item.json_text.improve_pass_cgpa"
                >Max CGPA : {{ props.item.json_text.improve_pass_cgpa | toFixed
                }}<br
              /></span>
              <span v-if="props.item.json_text.irregular_grade"
                >Grade : {{ props.item.json_text.irregular_grade }}<br
              /></span>
              <span v-if="props.item.json_text.improve_grade"
                >Grade : {{ props.item.json_text.improve_grade }}<br
              /></span>

              <span v-if="props.item.json_text.irregular_mark"
                >Bellow Mark : {{ props.item.json_text.irregular_mark }}<br
              /></span>
              <span v-if="props.item.json_text.improve_mark"
                >Bellow Mark : {{ props.item.json_text.improve_mark }}<br
              /></span>
            </td>
            <td class="text-xs-center"></td>

            <td>
              <v-icon v-if="props.item.is_execute == 2" class="text-xs-left"
                >done</v-icon
              >

              <v-progress-circular
                v-else-if="props.item.is_execute == 1"
                :size="20"
                :width="3"
                indeterminate
                color="primary"
                class="mr-3"
              ></v-progress-circular>
              {{ props.item.total }}
              <span v-if="props.item.is_execute == 1"
                >/{{ props.item.pre_total }}
              </span>
              <v-progress-linear
                class="text-xs-center"
                v-if="
                  props.item.is_execute == 1 &&
                  props.item.pre_total > 0 &&
                  props.item.pre_total >= props.item.total
                "
                color="success"
                height="20"
                :value="
                  Math.floor((props.item.total * 100) / props.item.pre_total)
                "
              >
                <strong class="white--text"
                  >{{
                    Math.floor((props.item.total * 100) / props.item.pre_total)
                  }}%</strong
                >
              </v-progress-linear>
              <v-progress-linear
                class="text-xs-center"
                v-else-if="
                  props.item.is_execute == 1 &&
                  props.item.pre_total > 0 &&
                  props.item.pre_total < props.item.total
                "
                color="success"
                height="20"
                :value="100"
              >
                <strong class="white--text">100%</strong>
              </v-progress-linear>
            </td>
            <td class="text-xs-center">
              <slot v-if="props.item.total">
                <v-chip
                  v-if="props.item.confirm_status == 0"
                  small
                  color="green"
                  text-color="white"
                >
                  Draft
                </v-chip>
                <v-chip v-else color="primary" small text-color="white"
                  >Confirm Upload</v-chip
                >
              </slot>
            </td>
            <td class="text-xs-left">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="props.item.is_execute == 0"
                    fab
                    dark
                    small
                    color="primary"
                    @click="executeProbableSlot(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>send</v-icon>
                  </v-btn>
                </template>
                <span>Start Probable Generate</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="
                      props.item.confirm_status == 0 &&
                      props.item.is_execute == 2
                    "
                    fab
                    dark
                    small
                    color="primary"
                    @click="probableConfirm(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>check_circle</v-icon>
                  </v-btn>
                </template>
                <span>Confirm Probable</span>
              </v-tooltip>
              <v-tooltip top>
                <!-- <template v-slot:activator="{ on }"> -->
                <!-- <v-btn
                    v-if="
                      props.item.is_execute == 2 || props.item.is_execute == 1
                    "
                    fab
                    dark
                    small
                    color="warning"
                    @click="showProbableDetails(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>list</v-icon>
                  </v-btn> -->
                <!-- <slot
                    v-if="
                      props.item.is_execute == 2 || props.item.is_execute == 1
                    "
                  >
                    <v-chip
                      v-if="getExamActivityStatus.FormFillUp"
                      color="teal"
                      small
                      text-color="white"
                      >Form Fill-Up Running</v-chip
                    >
                    <v-chip
                      v-else
                      color="orange darken-4"
                      small
                      text-color="white"
                      >Form Fill-Up Not Running/Closed</v-chip
                    >
                  </slot> -->
                <!-- </template> -->
                <span>Proble Student Details</span>
              </v-tooltip>

              <!--v-if="props.item.confirm_status != 1" -->

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="showDelete(props)"
                    fab
                    dark
                    small
                    color="red"
                    @click="deleteStudentData(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete Slot</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="showClear(props)"
                    fab
                    dark
                    small
                    color="red"
                    @click="clearStudentData(props.item)"
                    v-on="on"
                  >
                    <v-icon dark>close</v-icon>
                  </v-btn>
                </template>
                <span>Delete Slot Candidate</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:no-data> </template>
          <template v-slot:footer>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="5" class="text-xs-left">
              <strong>Total Students = {{ totalStudents() }}</strong>
            </td>
          </template>
        </v-data-table>
        <!-- <pre>{{is_refresh?'Y':'N'}}</pre> -->
        <!-- <pre>{{getExamInitiateId}}::{{getLoggedInYear.year}}</pre> -->
        <!-- <pre>{{searchParam}}</pre> -->
        <!-- <pre>{{getSchema}}</pre> -->
      </v-container>
    </div>
  </v-container>
</template>
<script>
import probableStudentDetails from "@/components/probable/ProbableStudentDetails.vue";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  mixins: [commonGet],
  name: "ProbableSlotList",

  components: {
    probableStudentDetails,
  },
  data: () => ({
    auto_refresh: null,
    is_refresh: false,
    pagination: {
      rowsPerPage: 50,
      rowsPerPageItems: [10, 20, 50],
    },
    loading: true,
    searchParam: {},
    search: "",
    totalItems: null,
    formFillUp: false,

    headers: [
      {
        text: "Candidate Type",
        align: "center",
        sortable: false,
        value: "reg_no",
      },
      { text: "Slot NO.", align: "center", sortable: false, value: "std_name" },
      {
        text: "Slot Details",
        align: "center",
        sortable: false,
        value: "reg_no",
      },
      { text: "Remarks", align: "center", sortable: false, value: "remarks" },
      {
        text: "No. Of Student",
        align: "center",
        sortable: false,
        value: "total",
      },
      { text: "Status", align: "center", sortable: false, value: "exam_year" },
      {
        text: "Action",
        align: "center",
        sortable: false,
        value: "paper_code",
        width: "320px",
      },
    ],
    examData: "",
    detailsDialog: false,
  }),

  computed: {
    // isRefresh() {
    //   this.getSchema.forEach(element => {
    //     if (element.is_execute == 1) {
    //       return true;
    //     }
    //   });
    //   return false;
    // },
    getSchema() {
      return this.$store.getters.generateProbableCriteriaList;
    },
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getLoggedInYear() {
      return this.$store.getters.getLoggedInYear;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getExamActivityStatus() {
      return this.$store.getters.getExamActivityStatus;
    },
  },

  created() {
    this.autoRefresh();
    //this.$store.dispatch("fetchFrormFillupDetailData");
    this.$store
      .dispatch("getExamActivityStatus", {
        exam_code: this.getLoggedInExam.code,
        exam_year: this.getLoggedInYear.year,
      })
      .then((data) => {
        console.log(data);
        //this.formFillUp = data;
      });
  },

  methods: {
    autoRefresh() {
      this.auto_refresh = setInterval(() => {
        this.is_refresh = false;
        this.getSchema.forEach((element) => {
          if (element.is_execute == 1) {
            // console.log('is_execute',{exam_code:element.exam_code,exam_year:element.exam_year,exam_initiate_id:element.exam_initiate_id})
            this.is_refresh = true;
          }
        });

        if (this.is_refresh && this.getSchema.length >= 1) {
          // console.log('getSchema',this.getSchema)
          this.refresh();
        }
      }, 10 * 1000);
    },
    totalStudents() {
      var total = 0;
      let arr = this.getSchema;
      arr.forEach(function (record) {
        total += parseInt(record.total);
      });
      return total;
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.exam_id = this.getExamInitiateId;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      // console.log('generateProbableCriteriaList action called',this.searchParam)
      this.$store
        .dispatch("generateProbableCriteriaList", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.pagination.totalItems = data.meta ? data.meta.total : 0;
          //console.log(data.meta.total);
        });
    },
    executeProbableSlot(item) {
      let self = this;
      let params = {
        exam_id: item.exam_initiate_id,
        criteria_id: item.id,
      };
      console.log("this.$root property", Object.keys(this.$root));
      this.$root
        .$confirm("Are you sure generate this probable data?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("executeProbableSlotQueue", params)
              .then(function (data) {
                // self.close();
                self.refresh();
              })
              .catch(function (error) {
                console.log(error);
                self.refresh();
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showDelete(props) {
      if (
        props.item.student_confirm_status == false &&
        props.item.is_execute != 1
      ) {
        return true;
      } else {
        return false;
      }
    },

    showClear(props) {
      if (
        props.item.student_confirm_status == false &&
        props.item.is_execute == 2
      ) {
        return true;
      } else {
        return false;
      }
    },

    showProbableDetails(item) {
      this.examData = item;
      this.detailsDialog = true;
    },
    probableConfirm(item) {
      console.log(item);
      //return false;
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;

      // let confirmParam = {
      //   exam_id: item.exam_initiate_id,
      //   ff_criteria: item.ff_criteria,
      //   slot_no: item.slot,
      // };

      let confirmParam = {
        slot_id: item.id,
      };

      this.$root
        .$confirm("Are you sure confirm this probable data?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("confirmProbableData", confirmParam)
              .then(function (data) {
                // self.close();
                self.refresh();
              })
              .catch(function (error) {
                console.log(error);
                self.refresh();
              });
          }
        });
    },

    deleteStudentData(item) {
      // console.log(item);
      //return false;
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;
      // let deleteParam = {
      //   exam_id: item.exam_initiate_id,
      //   ff_criteria: item.ff_criteria,
      //   slot_no: item.slot_no,
      // };
      let deleteParam = {
        slot_id: item.id,
        slot_delete: "yes",
      };

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteProbableData", deleteParam)
              .then(function (data) {
                // self.close();
                self.refresh();
              })
              .catch(function (error) {
                console.log(error);
                self.refresh();
              });
          }
        });
    },
    clearStudentData(item) {
      // console.log(item);
      //return false;
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;
      // let deleteParam = {
      //   exam_id: item.exam_initiate_id,
      //   ff_criteria: item.ff_criteria,
      //   slot_no: item.slot_no,
      // };
      let deleteParam = {
        slot_id: item.id,
        slot_delete: "no",
      };

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteProbableData", deleteParam)
              .then(function (data) {
                // self.close();
                self.refresh();
              })
              .catch(function (error) {
                console.log(error);
                self.refresh();
              });
          }
        });
    },
    refresh() {
      console.log("refresh called");
      this.is_refresh = false;
      this.getDataFromApi();
    },
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    },
  },
  mounted() {
    // window.setInterval(() => {
    //   console.log('no of slot',this.getSchema.length,'slot',this.getSchema)
    //   this.is_refresh = false;
    //   // console.log('setInterval called',this.is_refresh)
    //   this.getSchema.forEach(element => {
    //     if (element.is_execute == 1) {
    //       // console.log('is_execute',{exam_code:element.exam_code,exam_year:element.exam_year,exam_initiate_id:element.exam_initiate_id})
    //       this.is_refresh = true;
    //     }
    //   });
    //   if (this.is_refresh && this.getSchema.length>=1) {
    //     // console.log('getSchema',this.getSchema)
    //     // this.refresh();
    //   }
    // }, 10 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.auto_refresh);
  },
};
</script>

<style scoped>
table.v-table tbody td,
table.v-table tbody th {
  height: 0px;
  white-space: nowrap;
}
.spin {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
