<template>
  <v-container fluid>
    <v-dialog v-model="collStatus" fullscreen>
      <v-toolbar dark color="light-blue darken-2" class="mt-2">
        <v-toolbar-title>Subject-wise</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="light-blue darken-2" class="mr-5">
            <v-layout
              row
              fill-height
              align-center
              justify-center
            >Current Center &nbsp; :&nbsp; {{ currentCollege.center_code }} - {{ currentCollege.center_name }}</v-layout>
          </v-card>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <wantReportWithSubWise :dialogStatus.sync="collStatus" :currentCollege="currentCollege"></wantReportWithSubWise>
      </v-card>
    </v-dialog>
    <!-- <v-expansion-panel class="mb-3" inset>
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout column class="mx-5">
          <v-flex xs12>
            <v-text-field
              outline
              class="ma-2"
              name="code"
              label="College Code"
              v-model="searchParam.college_code"
              prepend-icon="edit"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchAbsReportedWithheldDataColl">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>-->

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
              <v-card-text class="title">Absent/Reported/Withheld College-wise List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAbsReportedWithheldCollList"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs display-4" style="padding: 0 0px; !important">
            <v-chip color="transparent">{{ props.item.center_code }} - {{ props.item.center_name }}</v-chip>
          </td>
          <td class="text-xs-left">
            <v-btn small @click="viewAdmitCardColDetails(props.item)">
              {{ props.item.college_code }} -
              {{ props.item.college_name }}
            </v-btn>
          </td>
          <td class="text-xs">{{ props.item.total_examinee }}</td>
          <td class="text-xs">{{ props.item.total_reported }}</td>
          <td class="text-xs">{{ props.item.total_withheld }}</td>
          <td class="text-xs">{{ props.item.total_expelled }}</td>
          <td class="text-xs">{{ props.item.total_absence }}</td>
        </template>
      </v-data-table>
    </v-container>
    <!-- {{}} -->
    <!-- <div style="opacity: 0.2;" class="mt-5">
      came from :
      <pre>
        {{current}}
    </pre>
    </div>-->
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import wantReportWithSubWise from "@/components/overall/wantReportWithSubWise.vue";
export default {
  props: ["dialogStatus", "current"],
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    wantReportWithSubWise,
  },
  data() {
    return {
      collStatus: false,
      currentItem: {},
      currentCollege: {},
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
        { text: "Center ", value: "center_code", sortable: false },
        { text: "College ", value: "college_code", sortable: false },
        { text: " Total Examinee", value: "total_examinee", sortable: false  },
        { text: " Total Reported", value: "total_reported", sortable: false  },
        { text: " Total Withheld", value: "total_withheld", sortable: false  },
        { text: " Total Expelled", value: "total_expelled", sortable: false  },
        { text: " Total Absent", value: "total_absence", sortable: false  },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.$store.dispatch("searchAbsReportedWithheldDataColl", this.searchParam);
  },
  computed: {
    getAbsReportedWithheldCollList() {
      return this.$store.getters.getAbsReportedWithheldCollList;
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
    searchAbsReportedWithheldDataColl() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAbsReportedWithheldDataColl", this.searchParam)
        .then((data) => {
          console.log("return data searchAbsReportedWithheldDataColl-<", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    viewAdmitCardColDetails(item) {
      this.currentCollege = item;
      this.currentCollege.center_code = this.current.center_code;
      this.collStatus = true;
    },
    close() {
      this.collStatus = false;
      //   this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    },
  },
  watch: {
    pagination() {
      this.searchAbsReportedWithheldDataColl();
    },
    current(val) {
      console.log("see");
      this.searchParam.center_code = val.center_code;
      this.searchAbsReportedWithheldDataColl();
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
