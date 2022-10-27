<template>
  <v-container fluid>
    <v-layout
      align-center
      justify-center
      row
      fill-height
      class="ma-3"
      v-if="false"
    >
      <v-chip color="red" text-color="white">under construction</v-chip>
    </v-layout>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary darken-2">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Examiner Wise Mark Data</v-toolbar-title>
          <v-spacer></v-spacer>
          Head Examiner: {{ curentItem.tims_id }} -
          {{ curentItem.examiner_name }}
          <v-divider class="mx-4" inset vertical />
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <MarkCountByExaminer
          :curentHeadExaminerItem="curentItem"
        ></MarkCountByExaminer>
      </v-card>
    </v-dialog>
    <v-expansion-panel v-if="false">
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
                <!-- .. -->
                <!-- <v-layout row wrap align-center class="pt-3"> -->
                <!-- Starting Date Dialogue -->
                <v-flex xs12 sm12 md6>
                  <v-card class="pa-2 ma-2">
                    <v-layout row wrap align-center>
                      <v-flex xs3>
                        <h3
                          class="headline ml-3"
                          style="font-size: 20px !important"
                        >
                          Start:
                        </h3>
                      </v-flex>
                      <v-flex xs9 class="pr-3">
                        <v-menu
                          v-model="startModel"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <div class>
                              <v-text-field
                                v-model="startDateFormatted"
                                class="pvMarksEntry-v-select"
                                prepend-icon="event"
                                v-on="on"
                                label="Select Start Date"
                                hide-details
                                single-line
                                solo
                              ></v-text-field>
                            </div>
                          </template>

                          <v-date-picker
                            v-model="searchParam.startDate"
                            no-title
                            @input="startModel = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>

                <!-- Ending Date Dialogue -->
                <v-flex xs12 sm12 md6>
                  <v-card class="pa-2 ma-2">
                    <v-layout row wrap align-center>
                      <v-flex xs3>
                        <h3
                          class="headline mb-0 ml-3"
                          style="font-size: 20px !important"
                        >
                          End:
                        </h3>
                      </v-flex>
                      <v-flex xs9>
                        <v-menu
                          v-model="endModel"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <div class>
                              <v-text-field
                                v-model="endDateFormatted"
                                class="pvMarksEntry-v-select"
                                prepend-icon="event"
                                v-on="on"
                                label="Select End Date"
                                hide-details
                                single-line
                                solo
                              ></v-text-field>
                            </div>
                          </template>

                          <v-date-picker
                            v-model="searchParam.endDate"
                            no-title
                            @input="endModel = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <!-- </v-layout> -->
                <!-- ..  -->
                <!-- Exam Selection-->
                <!-- <v-flex xs12 sm12 md6>
                  <v-card class="pa-2 ma-2">
                    <v-layout row wrap align-center>
                      <v-flex xs3>
                        <h3 class="headline mb-0 ml-3" style="font-size: 20px !important;">Exam:</h3>
                      </v-flex>
                      <v-flex xs9>

                        <v-select
                          disabled
                          class="mx-0"
                          v-model="searchParam.exam"
                          :item-text="item => '(' + item.code + ') ' + item.title"
                          item-value="code"
                          :items="getExamList"
                          menu-props="auto"
                          label="Select a Exam"
                          hide-details
                          prepend-icon="horizontal_split"
                          multiple
                          solo
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>-->

                <!-- Center Selection-->
                <v-flex xs12 sm12 md6>
                  <v-card class="pa-2 ma-2">
                    <v-layout row wrap align-center>
                      <v-flex xs3>
                        <h3
                          class="headline mb-0 ml-3"
                          style="font-size: 20px !important"
                        >
                          Center:
                        </h3>
                      </v-flex>

                      <v-autocomplete
                        class="mt-3 ml-2 mr-2"
                        v-model="searchParam.center"
                        item-text="center_name"
                        :items="getCenterList"
                        color="blue-grey lighten-2"
                        label="Select Center"
                        item-value="center_code"
                        prepend-icon="face"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="searchParam.center = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                            >{{ data.item.center_name }}</v-chip
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
                                v-html="data.item.center_name"
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>

                      <!--   <v-flex xs9>
                        <v-select
                          class="mx-0"
                          v-model="searchParam.center"
                          item-text="center_name"
                          item-value="center_code"
                          :items="getCenterList"
                          menu-props="auto"
                          label="Select a Center"
                          hide-details
                          prepend-icon="face"
                          multiple
                          solo
                        ></v-select>
                      </v-flex>-->
                    </v-layout>
                  </v-card>
                </v-flex>

                <!-- subject selection  -->
                <v-flex xs12 sm12 md6>
                  <v-card class="pa-2 ma-2">
                    <v-layout row wrap align-center>
                      <v-flex xs3>
                        <h3
                          class="headline mb-0 ml-3"
                          style="font-size: 20px !important"
                        >
                          Subject:
                        </h3>
                      </v-flex>
                      <v-autocomplete
                        class="mt-3 ml-2 mr-2"
                        v-model="searchParam.subject"
                        item-text="title"
                        :items="getSubjectList"
                        color="blue-grey lighten-2"
                        label="Select Subject"
                        item-value="code"
                        prepend-icon="face"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="searchParam.subject = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                            >{{ data.item.title }}</v-chip
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
                                v-html="data.item.title"
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                      <!-- <v-flex xs9>
                        <v-select
                          class="mx-0"
                          v-model="searchParam.subject"
                          item-text="title"
                          item-value="code"
                          :items="getSubjectList"
                          menu-props="auto"
                          label="Select Subject"
                          hide-details
                          prepend-icon="face"
                          multiple
                          solo
                        ></v-select>
                      </v-flex>-->
                    </v-layout>
                  </v-card>
                </v-flex>

                <!-- year -->
                <v-flex xs12 sm12 md6>
                  <v-card class="pa-2 ma-2">
                    <v-layout row wrap align-center>
                      <v-flex xs3>
                        <h3
                          class="headline mb-0 ml-3"
                          style="font-size: 20px !important"
                        >
                          Exam Year:
                        </h3>
                      </v-flex>
                      <v-flex xs9>
                        <v-select
                          class="mx-0"
                          v-model="searchParam.year"
                          item-text="name"
                          item-value="id"
                          :items="getYearList"
                          menu-props="auto"
                          label="Select Year"
                          hide-details
                          prepend-icon="face"
                          multiple
                          solo
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>

                <v-flex xs12 sm12 md6>
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchMarks"
                      >Search</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <!-- select date -->
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Marks List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <!-- <v-btn color="primary" @click="downloadReport()">
            <v-icon left dark>arrow_downward</v-icon>Export Report
          </v-btn> -->
        </v-layout>
      </v-card>
      <v-data-table
      :loading="loading"
        :headers="headers"
        :items="getMarkCountListByHeadExaminer"
        :search="search"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ 1 + props.index }}</td>
          <td class="text-xs-left">
            {{ props.item.subject_code }} - {{ props.item.subject_title }}
          </td>
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>

          <td class="text-xs-left">
            <v-btn color="#99D5FF" @click="showMarkCountByExaminer(props.item)">
              {{ props.item.tims_id }} -
              {{ props.item.examiner_name }}
            </v-btn>
          </td>
          <!-- <td class="text-xs-center">{{ props.item.tims_id }}</td> -->
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.phone }}</td>
          <!-- <td class="text-xs-center">{{ props.item.script_quantity }}</td> -->
          <td class="text-xs-center">{{ props.item.scan_quantity }}</td>
        </template>
      </v-data-table>
    </v-container>

    <!-- <hr style="height:5px" class="my-3" color="#DCDCDC" />
    <pre style="font-size: 10px !important;">
      <b>"GetApi" :</b>
       {{getMarkCountListByHeadExaminer}}
    </pre>-->
  </v-container>
</template>

<script>
import moment from "moment";
// import examinerMarkDetails from "@/components/examiner/examinerMarkDetails";
import MarkCountByExaminer from "@/components/examiner/MarkCountByExaminer";

import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    // examinerMarkDetails,
    MarkCountByExaminer,
  },

  data() {
    return {
      sl_count: 1,
      loading: false,
      details: [],
      dialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [ 10, 25, { text: "All", value: -1 }],
      },
      searchParam: {},
      formDialogStatus: false,
      search: "",
      curentItem: {},
      headers: [
        { text: "Sl", align: "center", value: "id", width: "1%" },
        { text: "Subject", align: "center", value: "Subject", width: "15%" },
        { text: "Course", align: "center", value: "Course", width: "15%" },
        {
          text: "Head Examiner Name",
          align: "left",
          value: "examiner_name",
          width: "15%",
        },
        // {
        //   text: "TMIS ID",
        //   align: "center",
        //   value: "tims_id",
        //   width: "5%",
        // },
        { text: "E-mail", align: "center", value: "Email", width: "8%" },
        { text: "Phone", align: "center", value: "Phone", width: "5%" },
        // {text: 'Script Quantity', align: 'center', value: 'Script_Count'},
        {
          text: "  Scaned Script Quantity",
          align: "center",
          value: "Script_Scaned",
          width: "5%",
        },
      ],
      startModel: false,
      endModel: false,
    };
  },
   watch: {
    pagination() {
      this.searchMarkByHList();
    },
  },
  methods: {
    //new report
    downloadReport() {
      this.$store.dispatch("exportExaminerHeadwise", this.searchParam);
    },
    //previous report
    // downloadExaminerReport() {
    //   this.$store.dispatch("downloadExaminerReport", this.searchParam);
    // },
    showMarkCountByExaminer(item) {
      this.curentItem = item;
      this.dialog = true;
    },
    showDetails(dataArray) {
      this.details = dataArray;
      this.dialog = true;
      // console.log(dataArray);
    },
    searchMarks() {
      this.loading = true;
      this.$store.dispatch("searchMarks", this.searchParam).then(() => {
        this.showAttendanceTable = true;
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchMarkByHList() {
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch("fetchMarkCountByHeadExaminer", this.searchParam)
        .then((data) => {
          console.log("data---", data);
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifHeadExaminerUser) {
      this.searchParam.examiner_code = this.getAuthUser.examiner.examiner_code;
      this.searchParam.user_id = this.getAuthUser.examiner.user_id;
      this.searchParam.examiner_type = this.getAuthUser.examiner.examiner_type;
    }
   // this.$store.dispatch("fetchMarkCountByHeadExaminer", this.searchParam);
    this.$store.dispatch("fetchAllSubjects");
    this.$store.dispatch("fetchCenterData");
    this.$store.dispatch("fetchPaperData");
  },
  computed: {
    getMarkCountListByHeadExaminer() {
      return this.$store.getters.getMarkCountListByHeadExaminer;
    },
    startDateFormatted() {
      return this.searchParam.startDate
        ? moment(this.searchParam.startDate).format("Do MMMM, YYYY (dddd)")
        : "";
    },
    endDateFormatted() {
      return this.searchParam.endDate
        ? moment(this.searchParam.endDate).format("Do MMMM, YYYY (dddd)")
        : "";
    },
    getMarksList() {
      return this.$store.getters.getMarksList;
    },
    getAttendanceList() {
      return this.$store.getters.getattendanceItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    // Center
    getCenterList() {
      return this.$store.getters.getCenterItems;
    },
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },

    // year list
    getYearList() {
      return [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
      ];
    },
  },
};
</script>

<style scoped></style>
