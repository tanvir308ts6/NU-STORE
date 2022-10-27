<template>
  <v-container fluid>
    <v-dialog v-model="paperStatus" fullscreen>
      <v-toolbar dark color="light-blue darken-4" class="mt-1">
        <v-toolbar-title>AdmitCard info</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="light-blue darken-4" class="mr-5">
            <v-layout
              row
              fill-height
              align-center
              justify-center
            >Current Center &nbsp; :&nbsp; {{ currentItem.center_code }} - {{ currentItem.center_name }}</v-layout>
          </v-card>

          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <absentReportWith
          ref="refAdmitCard"
          :dialogStatus.sync="paperStatus"
          :currentPaper="currentPaper"
          :currentItem="currentItem"
        ></absentReportWith>
      </v-card>
    </v-dialog>

    <v-container fluid>
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
              <v-card-text class="title">Absent/Reported/Withheld Course-wise List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAbsReportedWithheldPapList"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs" style="padding: 0 0px; !important">
            <v-chip color="transparent">
              {{ props.item.college_code }} -
              {{ props.item.college_name }}
            </v-chip>
          </td>
          <td class="text-xs" style="padding: 0 0px; !important">
            <v-chip color="transparent">
              {{ props.item.subject_code }} -
              {{ props.item.subject_name }}
            </v-chip>
          </td>
          <td class="text-xs-left" style="padding: 0 0px; !important">
            <v-btn
              small
              class="text-xs-left"
              @click="abWithRepDetails(props.item)"
            >{{ props.item.paper_code }} - {{ props.item.paper_name }}</v-btn>
          </td>
          <td class="text-xs">{{ props.item.total_examinee }}</td>
          <td class="text-xs">{{ props.item.total_reported }}</td>
          <td class="text-xs">{{ props.item.total_withheld }}</td>
          <td class="text-xs">{{ props.item.total_expelled }}</td>
          <td class="text-xs">{{ props.item.total_absence }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import absentReportWith from "@/views/overall/absentReportedWithheldList.vue";
export default {
  props: ["dialogStatus", "currentSubject"],
  mixins: [commonGet, commonExamYear],
  components: {
    absentReportWith,
  },
  data() {
    return {
      currentPaper: {},
      paperStatus: false,
      currentItem: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },

      search: "",
      sl_count: 0,
      loading: false,
      searchParam: {},
      expand: false,
      headers: [
        { text: "SL.", align: "left", value: "id", sortable: false },
        { text: "College ", value: "college_code", sortable: false },
        { text: "Subject", value: "subject_code", sortable: false },
        { text: "Course", value: "paper_code", sortable: false },
        { text: " Total Examinee", value: "total_examinee",sortable: false  },
        { text: " Total Reported", value: "total_reported" , sortable: false },
        { text: " Total Withheld", value: "total_withheld" , sortable: false },
        { text: " Total Expelled", value: "total_expelled", sortable: false  },
        { text: " Total Absent", value: "total_absence" , sortable: false },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    // this.$store.dispatch("fetchAdmitCardDataBySubject", this.searchParam);
  },
  computed: {
    getAbsReportedWithheldPapList() {
      return this.$store.getters.getAbsReportedWithheldPapList;
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    searchAbsReportedWithheldDataPap() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAbsReportedWithheldDataPap", this.searchParam)
        .then((data) => {
          console.log("return data searchAbsReportedWithheldDataPap-<", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    abWithRepDetails(item) {
      this.currentItem = item;
      this.currentPaper = item;
      this.currentPaper.center_code = this.currentSubject.center_code;
      this.paperStatus = true;
    },
    close() {
      this.paperStatus = false;
      this.$store.commit("UNSET_LOADING");
    },
  },
  watch: {
    pagination() {
      this.searchAbsReportedWithheldDataPap();
    },
    currentSubject(val) {
      console.log("see pap");
      this.searchParam.center_code = val.center_code;
      this.searchParam.subject_code = val.subject_code;
      this.searchParam.college_code = val.college_code;
      this.searchAbsReportedWithheldDataPap();
    },
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
