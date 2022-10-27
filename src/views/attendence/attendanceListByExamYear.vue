<template>
  <v-container fluid>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Attendance Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <attendanceByEYDetails
          :studentDetailsData="details"
          :studentMasterDataForDetails="masterForDetails"
        ></attendanceByEYDetails>
      </v-card>
    </v-dialog>
    <v-expansion-panel v-if="forceRerenderFlag">
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>
            <v-icon>search</v-icon>
            <span class="pl-2 subheading">Custom search panel</span>
            <span class="pl-1 subheading"></span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3">
              <v-layout row wrap align-center class="py-3">
                <!-- :disabled="ifCenterUser" -->

                <v-autocomplete
                  disabled
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  color="blue-grey lighten-2"
                  label="Select Exam"
                  :item-text="item =>  item.code + ' - ' + item.title"
                  item-value="code"
                  prepend-icon="subject"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      @input="searchParam.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + " - " + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <!-- <v-autocomplete
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.paper_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getPaperList"
                  menu-props="auto"
                  label="Select Paper"
                  hide-details
                  prepend-icon="library_books"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ "(" + data.item.code + ") " + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>-->

                <!-- <v-autocomplete
                  :disabled="ifCenterUser"
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.center_code"
                  :items="getCenterList"
                  color="blue-grey lighten-2"
                  label="Select Center"
                  item-text="center_name"
                  item-value="center_code"
                  prepend-icon="face"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeCenter(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.center_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.center_name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>-->

                <!-- <v-autocomplete
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.college_code"
                  :items="getCollegeListItem"
                  color="blue-grey lighten-2"
                  label="Select college"
                  item-text="college_name"
                  item-value="college_code"
                  prepend-icon="face"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeCollege(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.college_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.college_name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>-->
                <v-text-field
                  class="ma-2"
                  hide-details
                  name="code"
                  label="College Code"
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>
                <v-select
                  disabled
                  class="ma-2"
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="item => '' + item.year + ''"
                  item-value="year"
                  menu-props="auto"
                  label="Select Year"
                  hide-details
                  prepend-icon="face"
                  multiple
                ></v-select>

                <!-- <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.invigilator_code"
                  item-text="name"
                  item-value="id"
                  :items="getInvigilatorList"
                  menu-props="auto"
                  label="Select Invigilator"
                  hide-details
                  prepend-icon="face"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeInvigilator(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>-->

                <v-flex xs12 sm12 md12>
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchAttendanceByExamYear">Search</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid v-if="showAttendanceTable">
      <!-- <v-layout> -->
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>{{ pagination.totalItems }}</template>
              <v-card-text class="title">Attendance List By EXAM YEAR</v-card-text>
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
          <v-spacer />
          <v-btn color="blue-grey" class="white--text" @click="exportAttendanceListOnClick()">
            <v-icon left dark>arrow_downward</v-icon>Export
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getAttendanceByEYMainItem"
        class="elevation-1"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
        :loading="loading"
      >
        <template v-slot:items="props">
          <!-- <td class="text-xs-right">({{ props.item.center_code }}) {{ props.item.center_name }}</td> -->
          <td class="text-xs-center">{{ props.item.rn }}</td>
          <td class="text-xs-center">{{ props.item.exam_code }} - {{ props.item.exam_name }}</td>
          <!-- <td class="text-xs-right">({{ props.item.subject_code }}) {{ props.item.subject_name }}</td> -->
          <!-- <td class="text-xs-right">({{ props.item.paper_code }}) {{ props.item.paper_name }}</td> -->
          <td class="text-xs-center">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.student_count }}</td>
          <td class="text-xs-center">{{ props.item.attendance_count }}</td>
          <td class="text-xs-center">
            <v-btn color="info" @click="viewAttendanceByEYDetails(props.item)">Info</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <!-- issues:
    <br />expulsion not working-->
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import attendanceByEYDetails from "@/components/invigilator/attendanceByExamYearDetails";
import commonGet from "../../mixin/common_getters_mixin";
// import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, common_login_getters],
  components: {
    attendanceByEYDetails,
  },
  data() {
    return {
      details: [],
      masterForDetails: [],
      dialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      sl_count: 0,
      search: "",
      searchParam: {},
      headers: [
        // { text: "Exam", align: "left" },
        // { text: "Center Name", align: "right", value: "center_name" },
        // { text: "Center Code", align: "left", value: "center_code" },
        { text: "SL.", align: "center", value: "rn", sortable: false },
        {
          text: "Exam Name",
          align: "center",
          value: "exam_name",
          sortable: false,
        },
        { text: "Year", align: "center", value: "year", sortable: false },
        {
          text: "Total Examinee",
          align: "center",
          value: "student_count",
          sortable: false,
        },
        {
          text: "Total Attendance",
          align: "center",
          value: "attendance_count",
          sortable: false,
        },

        // { text: "Exam Code", align: "left", value: "exam_code" },
        // { text: "Subject Name", align: "right", value: "subject_name" },
        // { text: "Subject Code", align: "left", value: "subject_code" },
        // { text: "Paper Name", align: "right", value: "paper_name" },
        // { text: "Paper Code", align: "left", value: "paper_code" },

        // {
        //   text: "invigilator Name",
        //   align: "center",
        //   value: "invigilator_name"
        // },
        { text: "Details", sortable: false, align: "center", sortable: false },
      ],
      showAttendanceTable: true,
      forceRerenderFlag: true,
    };
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchAttendanceByExamYear() {
      console.log("--->", this.searchParam);
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch("searchAttendanceByExamYear", this.searchParam)
        .then((data) => {
          // console.log("data.total---", data.total);
          // console.log("data---", data);
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },

    showDetails(data) {
      var dataArray = {};
      dataArray.paper_code = data.paper_code;
      dataArray.paper_name = data.paper_name;
      dataArray.center_code = data.center_code;
      dataArray.center_name = data.center_name;
      dataArray.id = data.id;
      this.masterForDetails = dataArray;
      this.details = data.details;
      this.dialog = true;
      console.log(dataArray);
    },
    // searchAttendance() {
    //   this.$store.dispatch("searchAttendance", this.searchParam).then(() => {
    //     this.showAttendanceTable = true;
    //   });
    // },
    exportAttendanceListOnClick() {
      // console.log("....");
      this.$store.dispatch("exportAttendanceList");
    },
    remove(item) {
      console.log("item ", item);
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log(index + " remove ", this.searchParam.paper_code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    removeCenter(item) {
      console.log("center item ", item);
      const index = this.searchParam.center_code.indexOf(item.center_code);
      console.log(index + " remove center", this.searchParam.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
    removeCollege(item) {
      console.log("College item ", item);
      const index = this.searchParam.college_code.indexOf(item.college_code);
      console.log(index + " remove college", this.searchParam.college_code);
      if (index >= 0) this.searchParam.college_code.splice(index, 1);
    },
    removeInvigilator(item) {
      console.log(" item inv", item);
      const index = this.searchParam.invigilator_code.indexOf(item.id);
      console.log(index + " remove invigilator", this.searchParam.id);
      if (index >= 0) this.searchParam.invigilator_code.splice(index, 1);
    },

    viewAttendanceByEYDetails(item) {
      this.$store.commit("SET_ATTENDANCE_BY_EY_CURRENT_ITEM_DETAILS", item);
      this.dialog = true;
    },
    //  removeYear(item) {
    //   const index = this.searchParam.year.indexOf(item.id);
    //   if (index >= 0) this.searchParam.year.splice(index, 1);
    // }
  },
  created() {
    this.ifSearchParam = true;
    this.multipleYearFlag = true;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = [this.getAuthUser.center.center_code];
    }
    // this.searchParam.exam_code = [this.searchParam.exam_code];

    // this.$store.dispatch("searchAttendance", this.searchParam).then(() => {
    //   this.showAttendanceTable = true;
    // });

    // this.$store.dispatch("callAttendanceData");

    // later

    // if (!this.$store.getters.getInvigilatorItem.length) {
    //   this.$store.dispatch("callInvigilatorData");
    // }
    // if (!this.$store.getters.getCollegeListItem.length) {
    //   this.$store.dispatch("fetchCollegeListData");
    // }

    // dispatch fetchExamData

    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }

    // // dispatch fetchCenterData
    // if (this.$store.getters.getExamItem.length < 1) {
    //   this.$store.dispatch("fetchCenterData");
    // }

    // this.$store.dispatch("fetchPaperData");

    // for layout exam and year section
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = [this.getLoggedInYear.year];
  },
  computed: {
    getAttendanceList() {
      return this.$store.getters.getattendanceItem;
    },
    getCollegeListItem() {
      return this.$store.getters.getCollegeListItem;
    },
    getAttendanceByEYMainItem() {
      return this.$store.getters.getAttendanceByEYMainItem;
    },
    // year list
  },
  watch: {
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    },
    getLoggedInYear(val) {
      // this.customSearchPanel = false;
      this.searchParam.year = [val.year];
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
      // console.log("---> in watch getLoggedInYear", val);
    },
    pagination() {
      this.searchAttendanceByExamYear();
    },
  },
};
</script>
