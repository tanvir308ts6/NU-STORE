<template>
  <v-container fluid>
    <v-dialog v-model="studentDetailDialog" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Applicant Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="studentDetailDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-card style="background-color: white;">
        <studentDetails
          :currentItem.sync="currentItem"
          :studentDetailDialog.sync="studentDetailDialog"
        ></studentDetails>
      </v-card>
    </v-dialog>

    <v-expansion-panel focusable v-if="forceRerenderFlag">
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
                <v-autocomplete
                  disabled
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" + data.item.code + ") " + data.item.title
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-select
                  disabled
                  name="year"
                  class="ma-2"
                  v-model="searchParam.year"
                  item-text="year"
                  item-value="year"
                  :items="getYearList"
                  menu-props="auto"
                  label="Select Year"
                  hide-details
                  prepend-icon="calendar_today"
                ></v-select>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchPaidOrganization"
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
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title"
                >Paid Organization List (Online Certificate
                Verification)</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="mainheaders"
        :items="getPaidOrganizationList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs-center">{{ props.item.organization_name }}</td>
          <td class="text-xs-center">{{ props.item.total_amount }}</td>
          <td class="text-xs-center">{{ props.item.total_count }}</td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      @click="showDetailItem(props.item)"
                      class="mr-0"
                      color="white"
                      >info</v-icon
                    >
                  </v-btn>
                </template>
                <span>Verified Applicant Details</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import studentDetails from "@/components/onlineCertificate/showApplicantDetails.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  components: { studentDetails },
  mixins: [commonGet, watchMixin],
  data() {
    return {
      currentItem: {},
      studentDetailDialog: false,
      loading: false,
      search: "",
      sl_count: 1,
      searchParam: {},
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Organization Name",
          value: "organization_name",
          align: "center",
          sortable: false
        },
        {
          text: "Paid Total Amount",
          value: "total_amount",
          align: "center",
          sortable: false
        },
        {
          text: " Total Certificate",
          value: "total_count",
          align: "center",
          sortable: false
        },
        { text: "Action", value: "action", align: "center", sortable: false }
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      }
    };
  },
  watch: {
    pagination() {
      this.searchPaidOrganization();
    }
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
  },
  computed: {
    getPaidOrganizationList() {
      return this.$store.getters.getPaidOrganizationList;
    }
  },
  methods: {
    showDetailItem(item) {
      this.currentItem = item;
      this.studentDetailDialog = !this.studentDetailDialog;
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchPaidOrganization() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchPaidOrganizationData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    }
  }
};
</script>

<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
