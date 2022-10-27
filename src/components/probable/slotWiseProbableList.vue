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

        <v-card color="blue-grey lighten-5">
          <v-layout row>
            <v-card flat color="blue-grey lighten-5">
              <v-badge left overlap color="transparent">
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    small
                    style="margin-top: -0.8em;"
                    class="elevation-0"
                    v-if="totalStudents()"
                    >{{ totalStudents() }}</v-btn
                  >
                </template>
                <v-card-text class="title text-uppercase"
                  >Probable Slot List</v-card-text
                >
              </v-badge>
            </v-card>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="totalItems"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">
              <v-chip v-if="props.item.ff_criteria == 1" small>
                REGULAR
              </v-chip>
              <v-chip v-if="props.item.ff_criteria == 2" small>
                IRREGULAR
              </v-chip>
              <v-chip v-if="props.item.ff_criteria > 2" small>
                IMPROVEMENT
              </v-chip>
            </td>
            <td class="text-xs-center">
              <span v-if="props.item.ff_criteria == 1">2016-17</span>
              <span v-if="props.item.ff_criteria == 2">2014-15, 2015-16</span>
              <span v-if="props.item.ff_criteria == 3"
                >2014-15, 2015-16 and [Grade-F]
              </span>
              <span v-if="props.item.ff_criteria == 4"
                >2016 [Exam Year] and [Grade-C,D,F]
              </span>
              <span v-if="props.item.ff_criteria == 5"
                >2016 [Exam Year], CGPA-2.5 or below,[Grade-C,D], Max Paper
                -2</span
              >
            </td>
            <td class="text-xs-center"></td>
            <td class="text-xs-center">{{ props.item.slot_no }}</td>
            <td class="text-xs-center">
              {{ props.item.total }}
            </td>
            <td class="text-xs-center">
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
            </td>
            <td class="text-xs-center">
              <v-btn
                v-if="props.item.confirm_status == 0"
                fab
                dark
                small
                color="primary"
                @click="probableConfirm(props.item)"
              >
                <v-icon dark>check_circle</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="warning"
                @click="showProbableDetails(props.item)"
              >
                <v-icon dark>list</v-icon>
              </v-btn>
              <v-btn
                v-if="props.item.confirm_status == 0"
                fab
                dark
                small
                color="red"
                @click="deleteStudentData(props.item)"
              >
                <v-icon dark>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
          <template v-slot:footer v-if="totalStudents()">
            <td></td>
            <td></td>
            <td></td>
            <td colspan="5" class="text-xs-left">
              <strong>Total Students = {{ totalStudents() }}</strong>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import moment from "moment";
import probableStudentDetails from "@/components/probable/ProbableStudentDetails.vue";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  mixins: [commonGet],

  components: {
    probableStudentDetails
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10]
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    search: "",

    headers: [
      {
        text: "FF. Criteria",
        align: "center",
        sortable: false,
        value: "reg_no"
      },
      {
        text: "FF. Criteria Details",
        align: "center",
        sortable: false,
        value: "reg_no"
      },
      { text: "Remarks", align: "center", sortable: false, value: "remarks" },
      { text: "Slot NO.", align: "center", sortable: false, value: "std_name" },
      {
        text: "No. Of Student",
        align: "center",
        sortable: false,
        value: "total"
      },
      { text: "Status", align: "center", sortable: false, value: "exam_year" },
      {
        text: "Action",
        align: "center",
        sortable: false,
        value: "paper_code",
        width: "220px"
      }
    ],
    examData: "",
    detailsDialog: false
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getFormFillupDetailList;
    }
  },

  created() {
    //this.$store.dispatch("fetchFrormFillupDetailData");
    this.getDataFromApi();
  },

  methods: {
    totalStudents() {
      var total = 0;
      let arr = this.getSchema;
      arr.forEach(function(record) {
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
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchProbableDetails", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
          //console.log(data.meta.total);
        });
    },

    showProbableDetails(item) {
      this.examData = item;
      this.detailsDialog = true;
    },
    probableConfirm(item) {
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;

      let confirmParam = {
        exam_id: item.exam_initiate_id,
        ff_criteria: item.ff_criteria,
        slot_no: item.slot_no
      };

      this.$root
        .$confirm("Are you sure confirm this probable data?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("confirmProbableData", confirmParam)
              .then(function(data) {
                self.close();
                self.$store.dispatch("fetchProbableDetails", self.searchParam);
              })
              .catch(function(error) {
                console.log(error);
                self.$store.dispatch("fetchProbableDetails", self.searchParam);
              });
          }
        });
    },

    deleteStudentData(item) {
      let self = this;
      this.searchParam.exam_id = this.getExamInitiateId;
      let deleteParam = {
        exam_id: item.exam_initiate_id,
        ff_criteria: item.ff_criteria,
        slot_no: item.slot_no
      };

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteProbableData", deleteParam)
              .then(function(data) {
                self.close();
                self.$store.dispatch("fetchProbableDetails", self.searchParam);
              })
              .catch(function(error) {
                console.log(error);
                self.$store.dispatch("fetchProbableDetails", self.searchParam);
              });
          }
        });
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    },
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
    },
    getLoggedInYear(val) {
      this.searchParam.exam_year = val.year;
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
.container {
  padding-bottom: 0;
}
</style>
