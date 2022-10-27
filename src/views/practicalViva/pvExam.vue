<template>
  <v-container fluid>
    <v-dialog v-model="studentDetailDialog" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Student Details with Marks</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="studentDetailDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <studentDetails
          :currentItem="currentItem"
          :studentDetailDialog="studentDetailDialog"
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
          :pvMarks="currentItem"
          :marksEntryStatus.sync="marksEntryStatus"
          :ifNew="newEntry"
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
          ref="dialogPMarks"
          :pvMarks="currentItem"
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
              <!-- {{getLoggedInExam}} -->
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
                    >
                      {{ data.item.code + " - " + data.item.title }}
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
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <!-- {{getLoggedInYear}} -->
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
          <!-- {{getPracticalCenterList}} -->
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-autocomplete
                  :disabled="ifCenterUser"
                  class="ma-2"
                  v-model="searchParam.center_code"
                  :items="getPracticalCenterList"
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
                  :items="getPracticalSubject"
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
                    >
                      {{
                        data.item.subject_code + " - " + data.item.subject_name
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
                  :items="getPracticalPaperItem"
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
              <v-card-text class="title">Practical Mark List ..</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-btn color="primary" @click="downloadPracticalMarklist()"
              >Download Practical Mark List</v-btn
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
          :items="getDataList"
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
            <!-- <td class="text-xs-center">{{ props.item.course }}</td> -->
            <td class="text-xs-center">
              {{ props.item.subject_code }} - {{ props.item.subject_name }}
            </td>
            <td class="text-xs-center">
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
    <!-- <pre>{{getDataList}} </pre> -->
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import moment from "moment";
import studentDetails from "@/components/practicalVivaExam/pvExamShowStudentData.vue";
import marksEntry from "@/components/practicalVivaExam/pvExamMarkEntryForm.vue";
import marksEdit from "@/components/practicalVivaExam/editPracticalMarkForm.vue";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  components: { studentDetails, marksEntry, marksEdit },
  data() {
    return {
      dateIsBetween: true,
      newEntry: true,
      buttonDisable: 0,
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
      editButton: false,
      loading: false,
      sl_count: 1,
      reviewStat: false,
      currentItem: {
        course_id: "",
        exam_code: "",
        date: "",
        center_code: "",
        marks: [],
      },
      paperLoading: false,
      studentDetailDialog: false,
      marksEditStatus: false,
      marksEntryStatus: false,
      headers: [
        { text: "Date", value: "create", align: "center", sortable: false },
        // { text: "Course", value: "course_id", align: "center" },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          sortable: false,
        },
        {
          text: "Course",
          value: "paper_code",
          align: "center",
          sortable: false,
        },

        { text: "Exam", value: "exam_code", align: "center", sortable: false },
        { text: "Year", value: "year", align: "center", sortable: false },
        {
          text: "Examinee Count",
          value: "student_count",
          align: "center",
          sortable: false,
        },
        // { text: "Student Details", value: "mark", align: "center" },
        { text: "Action", value: "edit", align: "center", sortable: false },
      ],
      editlogheaders: [
        { text: "Roll", value: "exam_roll", align: "center", sortable: false },
        {
          text: "Registration No",
          value: "reg_no",
          align: "center",
          sortable: false,
        },
        { text: "Session", value: "session", align: "center", sortable: false },
        {
          text: "Canditate Type",
          value: "candidate_type",
          align: "center",
          sortable: false,
        },
        {
          text: "User Name",
          value: "user_name",
          align: "center",
          sortable: false,
        },
        {
          text: "Previous Mark",
          value: "old_mark",
          align: "center",
          sortable: false,
        },
        { text: "New Mark", value: "mark", align: "center", sortable: false },
        // { text: "Created Date", value: "created_at", align: "center" },
        {
          text: "Edited date",
          value: "updated_at",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  watch: {
    pagination() {
      this.searchPracticalExamList();
    },
    pagination2() {
      this.searchPracticalEditLog();
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
    //this.$store.dispatch("searchPVMarksData", this.searchParam);
    // this.$store.dispatch("fetchPVMarks");
    //exam
    if (!this.$store.getters.getCenterItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchCenterData");
    }
    //exam
    if (!this.$store.getters.getExamItem.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
    //paper
    // if (!this.$store.getters.getPaperItems.length) {
    //   // console.log("----> ");
    //   this.$store.dispatch("fetchPaperDataByPractical");
    // }
    this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
    this.$store.dispatch("fetchSubDataByPractical");
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchSubjectData");
    }

    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    if (this.ifCenterUser) {
      param.center_code = this.getAuthUser.center.practical_center_code;
    }
    this.$store.dispatch("fetchPracticalWiseCenterData", param);
    //this.$store.dispatch("fetchEditedLogData",this.searchParam);
  },
  mounted() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year; // this line
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
      // this.searchParam.practical_center_code = this.getAuthUser.center.practical_center_code;
      // this.searchParam.viva_center_code = this.getAuthUser.center.viva_center_code;
    }
  },
  computed: {
    getPracticalVivaExamList() {
      return [
        {
          // might
          id: "01",
          exam_code: "101",
          exam_name: "test",
          exam_year: "2017",
          exam_inisiate_id: "23",
          //must
          std_name: "Kamal jamal",
          std_roll: "0101",
          std_reg: "01010",
          session: "11-12",
          // 1
          center_code: "102",
          center_naem: "",
          subject_code: "10",
          subject_name: "",
          paper_code: "102",
          paper_name: "",
          total_student: "",
        },
      ];
      // return this.$store.getters.getPracticalVivaExam;
    },
    getDataList() {
      return this.$store.getters.getDataList;
    },
    getEditedDataList() {
      return this.$store.getters.getEditedDataList;
    },
    getMarkList() {
      return this.$store.getters.getMarkList;
    },
    getPracticalSubject() {
      return this.$store.getters.getSubByPractical;
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
        if (moment(todate).isBetween(startdate, enddate, undefined, "[]")) {
          console.log("yes");
          this.dateIsBetween = true;
        } else {
          this.dateIsBetween = false;
          console.log("No");
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
    bothSearch() {
      this.searchPracticalExamList();
      this.searchPracticalEditLog();
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchPracticalExamList() {
      console.log("searchPracticalExamList...");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchPracticalExamData", this.searchParam)
        .then((data) => {
          console.log("sppsspps:", data);
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
    searchPracticalEditLog() {
      this.loading2 = true;
      this.setLimit2();
      this.$store
        .dispatch("fetchEditedLogData", this.searchParam)
        .then((data) => {
          this.loading2 = false;
          this.sl_count2 = data.from;
          this.pagination2.totalItems = data.total;
        });
    },
    searchPV() {
      console.log("searchPV.... ", this.searchParam);
      this.$store.dispatch("searchPVMarksData", this.searchParam);
    },
    dateFormatted(date) {
      return moment(date).format("Do MMMM, YYYY (dddd)");
    },
    showDetailItem(item) {
      this.currentItem = item;
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

      this.$store.commit("UNSET_PRACTICAL_WANT_DATA_BY_STD");
      this.$refs.dialogMarks.setMarks(this.currentItem);
      this.marksEntryStatus = !this.marksEntryStatus;
    },
    downloadPracticalMarklist() {
      this.$store.dispatch("downloadPracticalMarksListData", this.searchParam);
    },
    editItem(item) {
      this.newEntry = false;
      this.currentItem = item;
      this.$refs.dialogPMarks.setMarks(this.currentItem);
      this.marksEditStatus = !this.marksEditStatus;
      this.buttonDisable = 0;
      this.reviewStat = false;
      //     if(this.getMarkList[0].final_status > 0){
      //      this.reviewStat = false;
      //  }
      //console.log("-->..", this.currentItem);
    },
    reviewItem(item) {
      this.newEntry = false;
      console.log("buttonDisable", this.buttonDisable);
      this.currentItem = item;
      this.$refs.dialogPMarks.setMarks(this.currentItem);
      this.marksEditStatus = !this.marksEditStatus;
      this.buttonDisable = 1;
      this.reviewStat = true;
      this.$store.commit("UNSET_PRACTICAL_MARK_DATA");

      console.log("STAE ", this.$store.getters.getMarkList);

      //console.log("chk", this.getMarkList[0].final_status);
    },
  },
};
</script>
