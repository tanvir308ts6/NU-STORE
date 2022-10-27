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
                  :item-text="(item) => item.code + ' - ' + item.title"
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
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
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
                    <v-btn color="primary" large @click="searchRescrutinyMonitoring">Search</v-btn>
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
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Re-scrutiny Summary</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="mainheaders"
        :items="getRescrutinyMonitoringList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <!-- <td class="text-xs-left">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.year }}</td>-->
          <td class="text-xs-center">{{ props.item.start_date }}</td>
          <td class="text-xs-center">{{ props.item.end_date }}</td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-center">{{ props.item.total_rescrutiner }}</td>
          <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white">
              {{
              props.item.exam_status
              }}
            </v-chip>
            <!-- <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.exam_status == Upcoming"
            >Upcoming</v-chip>
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.exam_status == Ongoing"
            >Ongoing</v-chip>
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.exam_status == Expired"
            >Expired</v-chip>
            </td>-->
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  data() {
    return {
      mailDialogStatus: false,
      loading: false,
      search: "",
      sl_count: 1,
      searchParam: {},
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        // {text: 'Exam', value: 'exam_code', align: 'left', sortable: false},
        // {text: 'Year', value: 'year', align: 'center', sortable: false},
        { text: "StartDate", value: "date", align: "center", sortable: false },
        { text: "End Date", value: "date", align: "center", sortable: false },
        {
          text: "Total Examinee",
          value: "candidate",
          align: "center",
          sortable: false,
        },
        {
          text: "Total Rescrutiner",
          value: "rescrutiner",
          align: "center",
          sortable: false,
        },
        { text: "Status", value: "status", align: "center", sortable: false },
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
    };
  },
  watch: {
    pagination() {
      this.searchRescrutinyMonitoring();
    },
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
  },
  computed: {
    getRescrutinyMonitoringList() {
      return this.$store.getters.getRescrutinyMonitoringList;
    },
    getSchema() {
      return this.$store.getters.getRescrutinyStdSchema;
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
    searchRescrutinyMonitoring() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRescrutinyMonitoringData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>

<style scoped></style>
