<template>
  <v-container fluid>
    <v-dialog v-model="studentDetailDialog" width="1000">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Student Details with Marks</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="studentDetailDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <studentDetails
          :currentItem.sync="currentItem"
          :studentDetailDialog.sync="studentDetailDialog"
        ></studentDetails>
      </v-card>
    </v-dialog>
    <v-dialog v-model="marksEntryStatus" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Marks Entry</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="marksEntryStatus = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <marksEntry
          ref="dialogMarks"
          :currentItem.sync="currentItem"
          :marksEntryStatus.sync="marksEntryStatus"
          :ifNew="newEntry"
          :searchVivaExamList.sync="searchVivaExamList"
        ></marksEntry>
      </v-card>
    </v-dialog>
    <v-dialog v-model="marksEditStatus" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Marks Edit</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="marksEditStatus = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <marksEdit
          ref="dialogVMarks"
          :currentItem.sync="currentItem"
          :marksEditStatus.sync="marksEditStatus"
          :ifNew="newEntry"
          :buttonDisable="buttonDisable"
          :reviewStat="reviewStat"
          :bothSearch.sync="bothSearch"
        ></marksEdit>
      </v-card>
    </v-dialog>

    <v-expansion-panel class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 title">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>

        <v-layout column class="mx-5">
          <!-- exam and year section  -->
          <v-flex xs12 class="mx-3">
            <v-layout row wrap align-center>
              <v-flex xs9>
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
                    <v-chip
                      color="#EBEBEB"
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
              </v-flex>
              <v-flex xs3>
                <v-autocomplete
                  class="ma-2"
                  menu-props="auto"
                  prepend-icon="calendar_today"
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="(item) => '' + item.year + ''"
                  item-value="year"
                  label="Select Year"
                  no-data-text="Please wait, We are fetching the year data"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="#EBEBEB"
                      close
                      @input="searchParam.year = ''"
                      :selected="data.selected"
                      style="padding-left: 0px; padding-right: 0px"
                    >
                      <span
                        class="subheading"
                        style="padding-left: 0px; padding-right: 0px"
                        >{{ data.item.year }}</span
                      >
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.year"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.year"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-autocomplete
                  :disabled="ifCenterUser"
                  class="ma-2"
                  v-model="searchParam.center_code"
                  :items="getVivaCenterList"
                  :item-text="
                    (item) => item.center_code + ' - ' + item.center_name
                  "
                  item-value="center_code"
                  label="Select Center"
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="#EBEBEB"
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
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectViva"
                  :item-text="(item) => item.subject_code"
                  item-value="code"
                  label="Select Subject"
                  persistent-hint
                  prepend-icon="library_books"
                  @change="onSubjectSelect()"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="#EBEBEB"
                      close
                      @input="searchParam.subject_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        data.item.subject_code + " - " + data.item.subject_name
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
                          v-html="
                            data.item.subject_code +
                            ' - ' +
                            data.item.subject_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :items="getVivaPaperItem"
                  :item-text="
                    (item) => item.paper_code + ' - ' + item.paper_name
                  "
                  item-value="paper_code"
                  label="Select Course"
                  persistent-hint
                  prepend-icon="library_books"
                  :loading="paperLoading"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="#EBEBEB"
                      close
                      @input="searchParam.paper_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        data.item.paper_code + " - " + data.item.paper_name
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
                          v-html="
                            data.item.paper_code + ' - ' + data.item.paper_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-layout>
            </v-card>
            <v-flex xs12 sm12 md12 style="margin-top: 5px; margin-bottom: 8px">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="bothSearch">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <div>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Viva Mark List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-btn color="primary" @click="downloadVivaMark()"
              >Download Viva Mark</v-btn
            >
            <v-btn
              color="primary"
              @click="goPVMarksEntry()"
              :disabled="!dateIsBetween"
              >Marks Entry</v-btn
            >
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getVDataList"
          class="elevation-2"
          :loading="loading"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">
              {{ dateFormatted(props.item.created_at) }}
            </td>

            <td class="text-xs-left">
              {{ props.item.subject_code }} - {{ props.item.subject_name }}
            </td>
            <td class="text-xs-left">
              {{ props.item.paper_code }} - {{ props.item.paper_name }}
            </td>
            <td class="text-xs-center">
              {{ props.item.exam_code }} {{ props.item.exam_name }}
            </td>
            <td class="text-xs-center">{{ props.item.exam_year }}</td>
            <td class="text-xs-center">{{ props.item.student_count }}</td>
            <!-- <td class="text-xs-center">
              <v-btn
                color="primary"
                outline
                round
                @click="showDetailItem(props.item)"
              >Click to See All The Student Details</v-btn>
            </td>-->
            <td class="text-xs-center">
              <v-btn
                color="primary"
                @click="editItem(props.item)"
                :disabled="!dateIsBetween"
                >Edit</v-btn
              >
              <v-btn color="warning" @click="reviewItem(props.item)"
                >Review</v-btn
              >
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Edited Data Log</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
        </v-layout>
      </v-card>

      <v-data-table
        :headers="editlogheaders"
        :items="getEditedDataList"
        class="elevation-2"
        :loading="loading2"
        :total-items="pagination2.totalItems"
        :pagination.sync="pagination2"
        :rows-per-page-items="pagination2.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <!-- <td class="text-xs-center">{{ props.item.course }}</td> -->
          <td class="text-xs-center">{{ props.item.exam_roll }}</td>
          <td class="text-xs-center">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">{{ props.item.session }}</td>
          <td class="text-xs-center">{{ props.item.candidate_type }}</td>
          <td class="text-xs-center">{{ props.item.user_name }}</td>
          <td class="text-xs-center">{{ props.item.old_mark }}</td>
          <td class="text-xs-center">{{ props.item.mark }}</td>
          <!-- <td class="text-xs-center">{{ props.item.created_at }}</td> -->
          <td class="text-xs-center">
            {{ dateFormate(props.item.updated_at) }}
          </td>
          <!-- <td class="text-xs-center">
              <v-btn
                color="primary"
                outline
                round
                @click="showDetailItem(props.item)"
              >Click to See All The Student Details</v-btn>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import moment from "moment";
import studentDetails from "@/components/practicalVivaExam/showVivaStudentDetails.vue";
import marksEntry from "@/components/practicalVivaExam/vivaMarksEntryForm.vue";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import marksEdit from "@/components/practicalVivaExam/editVivaMarkForm.vue";
export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  components: { studentDetails, marksEntry, marksEdit },
  data() {
    return {
      dateIsBetween: true,
      paperLoading: false,
      newEntry: true,
      open: 0,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      pagination2: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading2: false,
      sl_count2: 1,
      search: "",
      searchParam: {},
      param: {},
      loading: false,
      reviewStat: true,
      sl_count: 1,
      buttonDisable: 0,
      currentItem: {
        course_id: "",
        exam_code: "",
        date: "",
        center_code: "",
        marks: [],
      },
      studentDetailDialog: false,
      marksEntryStatus: false,
      marksEditStatus: false,
      headers: [
        { text: "Date", value: "create", align: "center", sortable: false },
        {
          text: "Subject",
          value: "subject_code",
          align: "left",
          sortable: false,
        },
        { text: "Course", value: "paper_code", align: "left", sortable: false },

        { text: "Exam", value: "exam_code", align: "center", sortable: false },
        { text: "Year", value: "year", align: "center", sortable: false },
        {
          text: "Examinee Count",
          value: "student_count",
          align: "center",
          sortable: false,
        },

        { text: "Edit", value: "edit", align: "center", sortable: false },
      ],
      editlogheaders: [
        { text: "Roll", value: "exam_roll", align: "center" },
        { text: "Registration No", value: "reg_no", align: "center" },
        { text: "Session", value: "session", align: "center" },
        { text: "Canditate Type", value: "candidate_type", align: "center" },
        { text: "User Name", value: "user_name", align: "center" },
        { text: "Previous Mark", value: "old_mark", align: "center" },
        { text: "New Mark", value: "mark", align: "center" },
        // { text: "Created Date", value: "created_at", align: "center" },
        { text: "Edited date", value: "updated_at", align: "center" },
      ],
    };
  },
  watch: {
    pagination() {
      this.searchVivaExamList();
    },
    pagination2() {
      this.searchVivaEditLog();
    },
  },
  created() {
    this.searchDate();
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
    }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year; // this line
    //exam
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    // if (!this.$store.getters.getPaperItems.length) {
    //   this.$store.dispatch("fetchPaperDataByViva");
    // },
    this.$store.dispatch("fetchSubDataByViva");
    this.$store.dispatch("fetchPaperDataByViva", this.searchParam);
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }

    //console.log("dsdsdsd", this.getVMarkList[0].final_status)
    //this.$store.dispatch("fetchVivaEditedLogData");
  },
  computed: {
    getVDataList() {
      return this.$store.getters.getVDataList;
    },
    getEditedDataList() {
      return this.$store.getters.getVivaEditedDataList;
    },
    getVMarkList() {
      return this.$store.getters.getVMarkList;
    },
    getSubjectViva() {
      return this.$store.getters.getSubByViva;
    },
  },
  methods: {
    dateFormate(date) {
      return date ? moment(date).format("MMMM D, YYYY LT") : "";
    },
    searchDate() {
      console.log("hey date");
      let todate = new Date().toISOString().substr(0, 10);
      let pr = {
        exam_initiate_id: this.getExamInitiateId,
        activity_tag: "PracticalVivaThesisMarkSubmissionCompleted",
      };
      this.$store.dispatch("searchExamTimeLineData", pr).then((data) => {
        console.log("muha..m:", data);
        let startdate = data.data[0].start_date;
        let enddate = data.data[0].end_date;
        console.log("yes", startdate);
        // startdate = startdate.split("-");
        // enddate = enddate.split("-");
        // todate = todate.split("-");
        console.log("yes f", startdate);
        console.log("yes n", enddate);

        // var d1 = new Date(
        //   startdate[2],
        //   parseInt(startdate[1]) - 1,
        //   startdate[0]
        // );
        // var d2 = new Date(enddate[2], parseInt(enddate[1]) - 1, enddate[0]);
        // var d3 = new Date(todate[2], parseInt(todate[1]) - 1, todate[0]);
        // console.log("yes f", d1 + startdate);
        // console.log("yes n", d2, enddate);

        if (moment(todate).isBetween(startdate, enddate, undefined, "[]")) {
          console.log("yes", startdate, enddate);
          this.dateIsBetween = true;
        } else {
          console.log("no");
          this.dateIsBetween = false;
        }
      });
    },
    onSubjectSelect() {
      this.paperLoading = true;
      this.$store
        .dispatch("fetchPaperData", {
          subject_code: this.searchParam.subject_code,
        })
        .then(() => {
          this.paperLoading = false;
        });
    },
    downloadVivaMark() {
      this.$store.dispatch("downloadVivaMarksListData", this.searchParam);
    },
    bothSearch() {
      this.searchVivaExamList();
      this.searchVivaEditLog();
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchVivaExamList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchVivaExamData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    setLimit2() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination2;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchVivaEditLog() {
      this.loading2 = true;
      this.setLimit2();
      this.$store
        .dispatch("fetchVivaEditedLogData", this.searchParam)
        .then((data) => {
          this.loading2 = false;
          this.sl_count2 = data.meta.from;
          this.pagination2.totalItems = data.meta.total;
        });
    },
    dateFormatted(date) {
      return moment(date).format("Do MMMM, YYYY (dddd)");
    },
    showDetailItem(item) {
      this.currentItem = item;
      // this.$refs.dialogVMarks.setMarks(this.currentItem);
      this.studentDetailDialog = !this.studentDetailDialog;
    },
    goPVMarksEntry() {
      this.newEntry = true;
      this.currentItem = {
        course_id: "",
        exam_code: this.getLoggedInExam.code,
        date: "",
        center_code: "",
        year: this.getLoggedInYear.year,
        marks: [],
        paper_code: "",
      };
      this.$store.commit("UNSET_VIVA_WANT_DATA_BY_STD");
      this.$refs.dialogMarks.setMarks(this.currentItem);
      this.marksEntryStatus = !this.marksEntryStatus;
    },
    editItem(item) {
      this.newEntry = false;
      this.currentItem = item;
      this.currentItem.center_code = this.getAuthUser.center.practical_center_code;
      this.$refs.dialogVMarks.setMarks(this.currentItem);
      this.marksEditStatus = !this.marksEditStatus;
      this.buttonDisable = 0;
      this.reviewStat = false;
      console.log("data item check", this.currentItem);
    },
    reviewItem(item) {
      this.newEntry = false;
      this.currentItem = item;
      this.currentItem.center_code = this.getAuthUser.center.practical_center_code;

      this.$refs.dialogVMarks.setMarks(this.currentItem);
      this.marksEditStatus = !this.marksEditStatus;
      this.buttonDisable = 1;
      this.reviewStat = true;
      this.$store.commit("UNSET_VIVA_MARK_DATA");

      //console.log("all data chk", this.getVMarkList[0].final_status);
      //console.log("status chk", this.getVMarkList[0].final_status);
    },
  },
};
</script>
