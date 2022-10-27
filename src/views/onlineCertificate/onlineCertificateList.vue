<template>
  <v-container fluid>
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
                    >
                      {{ "(" + data.item.code + ") " + data.item.title }}
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
                    <v-btn
                      color="primary"
                      large
                      @click="searchOnlineCertificate"
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
                >Online Verified Certificate List</v-card-text
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
        :items="getOnlineCertificateDataList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs-left">{{ props.item.exam_roll }}</td>
          <td class="text-xs-center">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">{{ props.item.session_year }}</td>
          <td class="text-xs-center">{{ props.item.student_name }}</td>
          <td class="text-xs-center">{{ props.item.cgpa }}</td>
          <td class="text-xs-center">{{ props.item.paid_amount }}</td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.verify_status == 0"
              >Verification Failed</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.verify_status == 1"
              >Verified</v-chip
            >
          </td>

          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.payment_status == 0"
              >Unpaid</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.payment_status == 1"
              >Paid</v-chip
            >
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin, common_login_getters],
  data() {
    return {
      loading: false,
      search: "",
      sl_count: 1,
      searchParam: {},
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          sortable: false
        },
        {
          text: "Registration Number",
          value: "reg_no",
          align: "center",
          sortable: false
        },
        {
          text: "Session",
          value: "session_year",
          align: "center",
          sortable: false
        },
        {
          text: "Student Name",
          value: "student_name",
          align: "center",
          sortable: false
        },
        { text: "CGPA", value: "cgpa", align: "center", sortable: false },
        {
          text: "Paid Amount",
          value: "paid_amount",
          align: "center",
          sortable: false
        },
        {
          text: "Verified Status",
          value: "verified_status",
          align: "center",
          sortable: false
        },

        {
          text: " Payment Status",
          value: "status",
          align: "center",
          sortable: false
        }
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
      this.searchOnlineCertificate();
    }
  },
  created() {
    if (this.ifOnlineUser) {
      this.searchParam.user_id = this.getAuthUser.id;
    }
    this.$store.commit("UNSET_ONLINE_CERTIFICATE_DATA");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.searchOnlineCertificate();
  },
  computed: {
    getOnlineCertificateDataList() {
      return this.$store.getters.getOnlineCertificateDataList;
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      // this.searchParam.page = page;
      // this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchOnlineCertificate() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchOnlineCertificateData", this.searchParam)
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
