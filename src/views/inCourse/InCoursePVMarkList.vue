<template>
  <v-container fluid>
    <v-dialog v-model="markEntryDialog" fullscreen>
      <v-toolbar dark color="light-blue darken-2" class="mt-2">
        <v-toolbar-title>
          Incourse Practical Viva Marks
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <markEntry :markEntryDialog="markEntryDialog"></markEntry>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <span class>
          <div class="display-1 mb-4">
            <v-icon size="50" color="primary">dashboard</v-icon>
            <span class="ml-2">Incourse Practical Viva Marks</span>
          </div>
        </span>

        <v-expansion-panel v-if="forceRerenderFlag">
          <v-expansion-panel-content>
            <template v-slot:actions>
              <v-icon large color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template v-slot:header>
              <div>
                <v-icon color="primary">list</v-icon>
                <span class="pl-2 subheading">Get Student List</span>
              </div>
            </template>
            <v-layout row wrap align-center>
              <v-flex xs12 class="mx-4">
                <v-layout row>
                  <v-flex xs8>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.exam_code"
                      :item-text="(item) => item.code + ' - ' + item.title"
                      item-value="code"
                      :items="getExamList"
                      menu-props="auto"
                      label="Select Exam"
                      prepend-icon="subject"
                    >
                      <template v-slot:selection="data">
                        <v-chip close @input="searchParam.exam_code = ''" :selected="data.selected" class="chip--select-multi">
                          {{ data.item.code + " - " + data.item.title }}
                        </v-chip>
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
                  </v-flex>
                  <v-flex xs4>
                    <v-autocomplete
                      v-model="searchParam.year"
                      :items="getYearList"
                      :item-text="(item) => '' + item.year + ''"
                      item-value="year"
                      label="Select Year"
                      prepend-icon="calendar_today"
                      class="ml-0"
                      hide-selected
                      single-line
                      flat
                      :persistent-hint="searchParam.year ? true : false"
                      no-data-text="Please wait, We are fetching the year data"
                    >
                      <template v-slot:selection="data">
                        <v-chip close @input="searchParam.year = ''" :selected="data.selected">
                          <span class="subheading">{{ data.item.year }}</span>
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.year"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.year"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-card class="px-3 ma-3" color="#FAFAFA">
                  <v-layout row wrap align-center class="py-3">
                    <v-flex xs12 sm12 d-flex>
                      <v-autocomplete
                        class="ma-2"
                        v-model="searchParam.center_code"
                        :item-text="(item) => item.center_code + ' - ' + item.center_name"
                        item-value="center_code"
                        :items="getPracticalCenterList"
                        menu-props="auto"
                        label="Select Center"
                        prepend-inner-icon="list"
                        @change="centerChange($event)"
                        outline
                        hide-details
                      >
                        <template v-slot:selection="data">
                          <v-chip close @input="searchParam.center_code = ''" :selected="data.selected" class="chip--select-multi">
                            {{ data.item.center_code + " - " + data.item.center_name }}
                          </v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                          </template>
                          <template v-else>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.center_code + ' - ' + data.item.center_name"></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-autocomplete
                      :disabled="!searchParam.center_code"
                      class="ma-2"
                      v-model="searchParam.subject_code"
                      :items="getIncoursePVSub"
                      :item-text="(item) => item.subject_code + ' - ' + item.subject_name"
                      item-value="subject_code"
                      label="Select Subject"
                      persistent-hint
                      prepend-icon="library_books"
                      @change="subjectChange($event)"
                    >
                      <template v-slot:selection="data">
                        <v-chip close @input="searchParam.subject_code = ''" :selected="data.selected" class="chip--select-multi">{{
                          data.item.subject_code + " - " + data.item.subject_name
                        }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.subject_code + ' - ' + data.item.subject_name"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>

                    <v-autocomplete
                      :disabled="!searchParam.center_code"
                      class="ma-2"
                      v-model="searchParam.paper_code"
                      :items="getIncoursePVPap"
                      :item-text="(item) => item.paper_code + ' - ' + item.paper_name"
                      item-value="paper_code"
                      label="Select paper"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip close @input="searchParam.paper_code = ''" :selected="data.selected" class="chip--select-multi">{{
                          data.item.paper_code + " - " + data.item.paper_name
                        }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.paper_code + ' - ' + data.item.paper_name"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-layout>
                </v-card>
                <v-flex xs12 sm12 md12 class="mb-3 mt-1">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn :disabled="!searchParam.center_code || !searchParam.subject_code || !searchParam.paper_code" round color="primary" large @click="searchStudentList"
                      >Get Student List</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider class="mt-4 mb-3"></v-divider>
        <div v-if="true">
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-badge left overlap>
                  <template v-slot:badge>
                    <v-btn round color="primary" fab small style="margin-top: -1.5em; font-size: 1.3em" class="elevation-0" v-if="pagination.totalDataItems">{{
                      pagination.totalDataItems
                    }}</v-btn>
                  </template>
                  <v-card-text class="title"> Student List</v-card-text>
                </v-badge>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>

              <v-spacer />
              <v-btn :disabled="!searchParam.center_code" color="primary" @click="markEntryOpen()"> Mark Entry</v-btn>
            </v-layout>
          </v-card>

          <v-data-table
            :headers="headers"
            :items="getInCoursePVWantingList"
            :loading="loading"
            class="elevation-4 mytable"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :total-items="pagination.totalDataItems"
          >
            <template v-slot:items="props">
              <td class="text-xs">{{ sl_count + props.index }}</td>
              <td class="text-xs-center">{{ props.item.exam_roll }}</td>
              <td class="text-xs-center">{{ props.item.reg_no }}</td>
              <td class="text-xs-center">{{ props.item.session_year }}</td>
              <td class="text-xs-center">
                {{ props.item.examinee_name }}
              </td>
              <td class="text-xs-left ">{{ props.item.incourse_practical_marks }}</td>
              <td class="text-xs-center">{{ props.item.practical_full_marks }}</td>
              <td class="text-xs-left ">{{ props.item.incourse_viva_marks }}</td>

              <td class="text-xs-center">{{ props.item.viva_full_marks }}</td>
            </template>
          </v-data-table>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import moment from "moment";
import common_login_getters from "../../mixin/common_login_getters";
import commonFun from "../../mixin/common_function";
import markEntry from "@/views/inCourse/IncoursePVWantingList";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
//import { loadavg } from "os";
export default {
  mixins: [commonFun, commonGet, common_login_getters, commonExamYear],
  components: {
    markEntry,
  },
  data: () => ({
    selected_center_name: "",
    selected_paper_name: "",
    loading: false,
    dialog: false,
    centerIdStatus: false,
    startModel: false,
    markEntryDialog: false,
    searchParam: {
      full: true,
      admitcard: false,
      final: true,
    },
    headers: [
      {
        text: "Sl",
        align: "left",
        value: "examinee_name",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Exam Roll",
        align: "center",
        value: "examinee_name",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Registration No.",
        align: "center",
        value: "reg_no",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Session",
        align: "center",
        value: "reg_no",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Examinee Name",
        align: "center",
        value: "examinee_name",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Practical Marks",
        align: "center",
        value: "id",
        sortable: false,
      },
      {
        text: "Practical Full Marks",
        align: "center",
        value: "full_marks",
        sortable: false,
      },
      {
        text: "Viva Marks",
        align: "center",
        value: "id",
        sortable: false,
      },
      {
        text: " Viva Full Marks",
        align: "center",
        value: "full_marks",
        sortable: false,
      },
    ],
    sl_count: 0,
    pagination: {
      rowsPerPage: 10,
    },
    studentList: true,
    marks: [],
    datePicker: false,
    getData: [],
  }),
  watch: {
    pagination() {
      this.searchStudentList();
    },
  },

  methods: {
    subjectChange(val) {
      this.searchParam.subject_code = val;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
        this.$store.dispatch("fetchInCoursePVPapData", this.searchParam);
      }
    },
    downloadVivaWantingList() {
      this.$store.dispatch("downloadVivaWantingList", this.searchParam);
    },

    centerChange(val) {
      this.$store.dispatch("fetchPaperDataByViva", this.searchParam);
      var self = this;
      var dat = this.getCenterList.forEach(function(item) {
        if (item.center_code == val) {
          self.selected_center_name = item.center_name;
          return item;
        }
      });
    },
    markEntryOpen() {
      this.markEntryDialog = !this.markEntryDialog;
    },
    close() {
      this.markEntryDialog = !this.markEntryDialog;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    searchStudentList() {
      this.setLimit();
      console.log("search action ", this.searchParam);
      var self = this;
      //to avoid load before dialog open

      //To avoid default data load
      if (this.searchParam.paper_code > 0 || this.searchParam.subject_code > 0) {
        this.loading = true;
        this.$store
          .dispatch("fetchInCoursePVWantingListData", this.searchParam) //also for viva
          .then((data) => {
            self.loading = false;
            self.sl_count = data.from;
            self.pagination.totalDataItems = data.total;
          });
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "Please Select Subject & Paper",
          color: "orange",
        });
      }
    },
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.is_wanting = 0;
    this.searchParam.type = 1;
    this.searchParam.full = true;
    this.searchParam.admitcard = false;
    this.searchParam.final = true;
    this.searchParam.paper_type = 3;
    this.searchParam.exam_type = 1;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    var userType = this.getUserTypeId();
    if (userType == 1) {
      this.centerIdStatus = true;
    }
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
    }
    this.$store.dispatch("fetchPracticalWiseCenterData", this.searchParam);
    // this.$store.dispatch("fetchInCoursePVPapData", this.searchParam);
    this.$store.dispatch("fetchInCoursePVSubData", this.searchParam);
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
  },
  computed: {
    getInCoursePVWantingList() {
      return this.$store.getters.getInCoursePVWantingList;
    },
    startDateFormatted() {
      return this.searchParam.date_time ? moment(this.searchParam.startDate).format("Do MMMM, YYYY") : "";
    },
  },
};
</script>

<style lang="scss">
.v-text-field input {
  font-size: 1.5em;
}

.mytable {
  .v-table thead tr:not(:last-child) {
    background-color: #555555;
  }
  .theme--light.v-datatable thead th.column.sortable.active {
    color: white;
    font-size: 130%;
  }
  .theme--light.v-table thead th {
    color: white;
    font-size: 130%;
  }
  .theme--light.v-datatable thead th.column.sortable.active .v-icon {
    color: white;
    padding-right: 5px;
  }
  .my-style {
    border-style: solid;
    border-width: 1px;
    // border-top-width: 1px;
    // border-right-width: 2px;
    // border-bottom-width: 1px;
    // border-left-width: 2px;
  }
}
</style>
