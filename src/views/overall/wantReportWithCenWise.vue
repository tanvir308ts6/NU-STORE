<template>
  <v-container fluid>
    <v-dialog v-model="centerStatus" fullscreen>
      <v-toolbar dark color="light-blue darken-1">
        <v-toolbar-title>College-wise</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="light-blue darken-1" class="mr-5">
            <v-layout row fill-height align-center justify-center
              >Current Center &nbsp; :&nbsp; {{ current.center_code }} -
              {{ current.center_name }}</v-layout
            >
          </v-card>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <countByCollege
          :dialogStatus.sync="centerStatus"
          :current="current"
        ></countByCollege>
      </v-card>
    </v-dialog>

    <v-expansion-panel
      class="mb-3"
      inset
      v-model="open"
      v-if="forceRerenderFlag"
    >
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
          <v-flex class="mx-3">
            <v-layout row wrap align-center>
              <!-- {{getLoggedInExam}} -->
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="
                    item => '( Code:' + item.code + ' ) ' + item.title
                  "
                  item-value="code"
                  label="Exam"
                  prepend-icon="store_mall_directory"
                ></v-select>
              </v-flex>
              <!-- {{getLoggedInYear}} -->
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="item => '' + item.year + ''"
                  item-value="year"
                  label="Year"
                  prepend-icon="calendar_today"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12>
                  <v-autocomplete
                    outline
                    :disabled="ifCenterUser"
                    class="ma-2"
                    v-model="searchParam.center_code"
                    :item-text="
                      item => item.center_code + ' - ' + item.center_name
                    "
                    item-value="center_code"
                    :items="getCenterList"
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
                          data.item.center_code + " - " + data.item.center_name
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
                </v-flex>
                <!-- <v-flex xs12>
                  <v-text-field
                    outline
                    class="ma-2"
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>-->
                <!-- <v-flex xs12>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.paper_code"
                    :items="getPaperList"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    label="Select paper"
                    persistent-hint
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removePaper(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >{{ '(' + data.item.code + ') ' + data.item.title }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title
                            v-html="
                    '(' + data.item.code + ') ' + data.item.title
                    "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.absence"
                    label="Absent "
                    class="mt-5 mr-2 ml-5"
                    color="indigo darken-3"
                    @change="absentStatus($event)"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.reported"
                    label="Reported"
                    class="mt-5 mr-2 ml-2"
                    color="indigo darken-3"
                    @change="reportedStatus($event)"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.withheld"
                    label="Withheld"
                    class="mt-5 mr-2 ml-5"
                    color="indigo darken-3"
                    @change="withheldStatus($event)"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.expelled"
                    label="Expel"
                    class="mt-5 mr-2 ml-2"
                    color="indigo darken-3"
                    @change="expelStatus($event)"
                  ></v-checkbox>
                </v-flex>-->
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchAbsReportedWithheldList">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

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
                  medium
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title mt-2"
                >Absent/Reported/Withheld Center-wise List</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <!-- <v-btn medium color="primary" class="white--text" @click="generateReport()">
            <v-icon dark>arrow_downward</v-icon>Export
          </v-btn>-->
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAbsReportedWithheldCenList"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">
            <v-btn @click="openDialogueByCollege(props.item)">
              <span>
                {{ props.item.center_code }} -
                {{ props.item.center_name }}
              </span>
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
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import countByCollege from "@/components/overall/wantReportWithCollWise.vue";
export default {
  components: {
    countByCollege
  },
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      centerStatus: false,
      currentItem: {},
      current: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      loading: false,
      sl_count: 0,
      search: "",
      exam_name: "",
      exam_year: "",
      searchParam: {},
      headers: [
        { text: "SL", value: "sl" },
        { text: "Center", value: "center_code" },
        { text: " Total Examineee", value: "total_examinee" },
        { text: " Total Reported", value: "total_reported" },
        { text: " Total Withheld", value: "total_withheld" },
        { text: " Total Expelled", value: "total_expelled" },
        { text: " Total Absent", value: "total_absence" }
      ]
    };
  },
  created() {
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;

    // if (!this.$store.getters.getCenterItems.length) {
    //   this.$store.dispatch("fetchCenterData");
    // }
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    param.limit = -1;
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterAllocData", param);
    }
  },
  computed: {
    //all data
    getAbsReportedWithheldCenList() {
      return this.$store.getters.getAbsReportedWithheldCenList;
    }
  },
  methods: {
    openDialogueByCollege(currentItem) {
      this.current = currentItem;
      this.centerStatus = true;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    searchAbsReportedWithheldList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAbsReportedWithheldData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    close() {
      this.centerStatus = false;
      //   this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    }
  },
  watch: {
    getExamInitiateId(val) {
      console.log("vall", val);
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.searchAbsReportedWithheldList();
    }
  }
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
