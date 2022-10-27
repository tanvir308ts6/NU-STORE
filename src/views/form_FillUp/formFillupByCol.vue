<template>
  <v-container fluid>
    <v-dialog v-model="viewDialogStatus" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Form FillUp List Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <!-- <viewDialog
          ref="refFormFillUp"
          :dialogStatus.sync="viewDialogStatus"
        ></viewDialog>-->
        <formFillupByColDetails />
      </v-card>
    </v-dialog>
    <!-- {{ getFormFillupCollegewiseList }} -->
    <!--
    <br />
    {{ searchParam }}
    <br />
    {{ pagination }}-->
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
                <v-text-field
                  class="ma-2"
                  name="code"
                  label="College Code"
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>
                <v-autocomplete
                  disabled
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.code + " - " + data.item.title }}</v-chip
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
                          v-html="data.item.code + ' - ' + data.item.title"
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
                  prepend-icon="calendar_today"
                ></v-select>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn
                      color="primary"
                      large
                      @click="searchFormFillupCollegewise"
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
    <v-divider class="mt-5 mb-3"></v-divider>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>{{ pagination.totalItems }}</template>
              <v-card-text class="title"
                >Form Fill-up College-wise List</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>
          <!-- <v-spacer />
          <v-btn color="blue-grey" class="white--text" @click="exportFormFillupListListOnClick()">
            <v-icon left dark>arrow_downward</v-icon>Export
          </v-btn>-->
        </v-layout>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="getFormFillupCollegewiseList"
        :loading="loading"
        class="elevation-1"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
        style="white-space: nowrap"
      >
        <template v-slot:items="props">
          <!-- <td class="text-xs">{{ sl_count + props.index }}</td> -->
          <td>{{ props.item.rn }}</td>
          <td class="text-xs">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs">
            {{ props.item.college_code }} - {{ props.item.college_name }}
          </td>
          <!-- viewDialogStatus -->
          <!-- <td class="text-xs">{{ props.item.session }}</td> -->
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">{{ props.item.student_count }}</td>
          <td class="text-xs">
            <v-layout row>
              <v-btn small @click="downLoadrollDescriptive(props.item)"
                >Descriptive Roll Sheet</v-btn
              >
              <v-btn small @click="downloadAttendanceSheet(props.item)"
                >attendance Sheet</v-btn
              >
            </v-layout>
          </td>
          <td class="justify-center text-xs-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  outline
                  color="primary"
                  v-on="on"
                  @click="viewFromFillupColDetails(props.item)"
                >
                  <v-icon left>remove_red_eye</v-icon>Show Details
                </v-btn>
              </template>
              <span>View</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import formFillupByColDetails from "@/components/formFillup/formFillupByColDetails.vue";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  components: {
    formFillupByColDetails
  },
  mixins: [commonGet, commonExamYear],
  data() {
    return {
      details: [],
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      sl_count: 0,
      search: "",
      viewDialogStatus: false,
      searchParam: {},
      loading: false,
      headers: [
        { text: "SL.", align: "left", value: "rn" },
        { text: "Exam ", value: "exam_code" },
        // { text: "Exam Name", value: "exam_name" },
        { text: "College ", value: "college_code" },
        // { text: "College Name", value: "college_name" },
        // { text: "Session", value: "session" },
        { text: "Year", value: "year" },
        { text: "Total", value: "student_count" },
        { text: "Download", value: "student_count" },
        { text: "View", align: "center", value: "view", sortable: false }
      ]
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.commit("UNSET_FORM_FILLUP_DATA");
    //all from fillup list
    // this.$store.dispatch("fetchFormFillupCollegeWiseData");
    this.loading = true;
    //self = this;
    // this.searchFormFillupCollegewise().then(() => {
    //   self.loading = false;
    // });
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
  },
  computed: {
    //all data
    getFormFillupCollegewiseList() {
      return this.$store.getters.getFormFillupCollgeWiseItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    ifDataFetchingDone() {
      return this.$store.getters.getFormFillupCollgeWiseItem.length > 0
        ? false
        : true;
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchFormFillupCollegewise() {
      console.log("--->", this.searchParam);
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch("searchFormFillupCollegeWise", this.searchParam)
        .then(data => {
          console.log("data.total---", data.total);
          // console.log("data---", data);
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    close() {
      this.viewDialogStatus = false;
      this.$store.commit("UNSET_FORM_FILLUP_DATA");
      this.$store.commit("UNSET_LOADING");
    },
    viewFromFillupColDetails(item) {
      this.$store.commit("SET_FORM_FILLUP_CURRENT_ITEM_DETAILS", item);
      this.viewDialogStatus = true;
    },
    downLoadrollDescriptive(item) {
      console.log("pr item", item);
      //return false;
      let param = {};
      param.college_code = item.college_code;
      param.center_code = item.center_code;
      param.subject_code = item.subject_code;
      param.exam_initiate_id = item.exam_initiate_id;
      param.exam_code = item.exam_code;
      param.year = item.year;

      this.$store
        .dispatch("examWiseDescriptiveRollSheet", param)
        .then(result => {
          //console.log("ds roll sheet", result);
          setTimeout(function() {
            var fileLink = document.createElement("a");
            fileLink.href = result;
            fileLink.setAttribute("download", "file.pdf");
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
          }, 1000);
        });
    },
    downloadAttendanceSheet(item) {
      let param = {};
      param.college_code = item.college_code;
      param.center_code = item.center_code;
      param.subject_code = item.subject_code;
      param.exam_initiate_id = item.exam_initiate_id;
      param.exam_code = item.exam_code;
      param.year = item.year;
      //this.$store.dispatch("downloadAttendanceSheet", param);
      this.$store.dispatch("examWiseAttendanceSheet", param).then(result => {
        //console.log("in then", result);
        setTimeout(function() {
          var fileLink = document.createElement("a");
          fileLink.href = result;
          fileLink.setAttribute("download", "file.pdf");
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          fileLink.click();
        }, 1000);
      });
    }
  },
  watch: {
    // dialogStatus(val) {
    //   this.dialog = val;
    // },
    // dialog(val) {
    //   if (!val) this.close();
    // },
    pagination() {
      this.searchFormFillupCollegewise();
    }
  }
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
/* viewFromFormFillup(item) {
      // this.$store.commit("UNSET_FORM_FILLUP_DATA");
      this.$refs.refFormFillUp.searchParam.exam_code = item.exam_code;
      this.$refs.refFormFillUp.searchParam.college_code = item.college_code;
      this.$refs.refFormFillUp.searchParam.year = item.year;
      this.$refs.refFormFillUp.searchParam.session_year = item.session;
      this.$refs.refFormFillUp.rollGendMode = false;
      this.$refs.refFormFillUp.examMode = false;
      this.$refs.refFormFillUp.paperMode = false;
      this.$refs.refFormFillUp.searchFormFillupList();
      this.viewDialogStatus = !this.viewDialogStatus;
      //   this.customSearchParam = {
      //     exam_code: item.exam_code,
      //     college_code: item.college_code,
      //     session_year: item.session,
      //     year: item.year
      //   };

      //   console.log("in view", this.customSearchParam);
      //   this.$store
      //     .dispatch("searchFormFillup", this.customSearchParam)
      //     .then(() => {
      //       console.log("innnn");
      //     });
    }, */
</style>
