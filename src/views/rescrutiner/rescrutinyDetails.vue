<template>
  <v-container fluid>
    <v-card v-if="publishState == 1">
      <v-alert :value="true" type="info">{{ publishMsg }}</v-alert>
    </v-card>
    <v-dialog v-model="detailsDialog" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Center-wise Progress Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="detailsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <progressDetails
          :currentItem="currentItem"
          :detailsDialog="detailsDialog"
        ></progressDetails>
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
                  hide-details
                  prepend-icon="calendar_today"
                ></v-select>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.subject_code = ''"
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

                <!-- {{getPaperByRescrutinerList}} -->
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="
                    (item) => item.paper_code + ' - ' + item.paper_name
                  "
                  item-value="paper_code"
                  :items="getPaperByRescrutinerList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
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
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.rescrutiner_id"
                  :item-text="(item) => item.name"
                  item-value="id"
                  :items="getRescrutinerList"
                  menu-props="auto"
                  label="Select Rescrutiner"
                  hide-details
                  prepend-icon="face"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.rescrutiner_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.name }}</v-chip
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
                          v-html="data.item.name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-checkbox
                  v-model="searchParam.mark_changes"
                  label="Mark changed"
                  class="mt-5 mr-2 ml-4"
                  color="indigo darken-3"
                  @change="markStatus($event)"
                ></v-checkbox>
                <!-- <v-checkbox
                  v-model="searchParam.payment_status"
                  label="Payment Completed"
                  class="mt-5 mr-2 ml-2"
                  color="indigo darken-3"
                  @change="paymentStatus($event)"
                ></v-checkbox>-->

                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn
                      color="primary"
                      large
                      @click="searchRescrutinyDetails"
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
    <!-- <div class="text-xs-center">
      <v-btn round color="primary" dark @click="processGenerate()">Generate</v-btn>
    </div>-->

    <!-- <v-container fluid>
      <v-card color="white">
        <v-layout row wrap>
          <v-flex xs6 sm12 md6 style="margin-top:5px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn color="blue-grey" class="white--text" @click="exportPapersummary()">
                <v-icon left dark>arrow_downward</v-icon>Generate
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs6 sm12 md6 style="margin-top:25px; margin-bottom:25px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn color="blue-grey" class="white--text" @click="exportbyPapRescrutiner()">
                <v-icon left dark>arrow_downward</v-icon>Export By Paper
                Rescrutiner-wise
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>-->
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
              <v-card-text class="title">Re-scrutiny Details List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-card-actions>
            <v-btn
              color="blue-grey"
              class="white--text"
              @click="exportbyMarkchange()"
            >
              <v-icon left dark>arrow_downward</v-icon>Export By Mark Changes
            </v-btn>
            <v-btn
              color="primary"
              @click="processGenerate()"
              :dark="publishState == 1 && publishState != 1 "
              :disabled="
                !getRescrutinyDetailsList.length || timeOut || publishState == 1
              "
              >Re-scrutiny Result Generate</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="mainheaders"
        :items="getRescrutinyDetailsList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-left">{{ parse(props.item.exam_roll) }}</td>
          <td class="text-xs-left">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">{{ props.item.session }}</td>
          <!-- <td class="text-xs-center">{{ props.item.student_name }}</td> -->
          <td class="text-xs-center">
            {{ props.item.subject_code }} - {{ props.item.subject_name }}
          </td>
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>
          <td class="text-xs-center">
            {{ props.item.head_examiner_code }} -
            {{ props.item.head_examiner_name }}
          </td>
          <td class="text-xs-center">
            {{ props.item.examiner_code }} - {{ props.item.examiner_name }}
          </td>
          <td class="text-xs-left">{{ props.item.rescrutiner_name }}</td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status !== 'No Change'"
              >{{ props.item.status }}</v-chip
            >
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 'No Change'"
              >{{ props.item.status }}</v-chip
            >
          </td>
          <td class="text-xs-center">
            {{ getOldMark(props.item.old_mark, props.item.incourse_mark) }}
          </td>
          <td class="text-xs-center">
            {{ getRevisedMark(props.item.new_mark, props.item.incourse_mark) }}
          </td>
          <td class="text-xs-center">{{ props.item.script_sl }}</td>
          <!-- <td class="text-xs-center">{{ props.item.unmatch_script }}</td> -->
          <!-- <td class="text-xs-center">({{ props.item.college_code }}){{ props.item.college_name }}</td>
          <td class="text-xs-center">({{ props.item.subject_code }}){{ props.item.subject_name }}</td>
          <td class="text-xs-center">{{ props.item.datetime }}</td>
          <td class="text-xs-center">{{ props.item.payment_amount }}</td>
          <td class="text-xs-center">{{ props.item.payment_date }}</td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      class="mr-0"
                      color="white"
                      dark
                      @click="mailDialogStatus = !mailDialogStatus"
                    >mail</v-icon>
                  </v-btn>
                </template>
                <span>Mail</span>
              </v-tooltip>
            </v-item-group>
          </td>-->
        </template>
      </v-data-table>
    </v-container>

    <v-container fluid v-if="getResultProgressList.length">
      <v-card>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Current Status</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-btn
              small
              fab
              :loading="getProgressLoading"
              @click="getProgress()"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-layout>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="getResultProgressList"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">
              {{ props.item.exam_code }} - {{ props.item.exam_name }}
            </td>
            <td class="text-xs-center">{{ props.item.exam_year }}</td>
            <td class="text-xs-center">{{ props.item.total_student }}</td>
            <td class="text-xs-center">{{ props.item.completed_student }}</td>
            <td class="text-xs-center">
              <!-- :value="100 * (props.item.completed_student/props.item.total_student)" -->
              <div class="lang">{{ props.item.completed_student }}</div>
              <span>Completed Student</span>
              <!-- :indeterminate="getSt(100 / (props.item.total_student/props.item.completed_student))" -->
              <v-progress-linear
                class="custom"
                :background-color="
                  findBackcolor(
                    100 /
                      (props.item.total_student / props.item.completed_student)
                  )
                "
                :color="
                  findcolor(
                    100 /
                      (props.item.total_student / props.item.completed_student)
                  )
                "
                :height="20"
                :value="
                  100 /
                    (props.item.total_student / props.item.completed_student)
                "
              >
                <strong
                  :class="
                    getClass(
                      100 /
                        (props.item.total_student /
                          props.item.completed_student)
                    )
                  "
                  >{{
                    getVal(
                      100 /
                        (props.item.total_student /
                          props.item.completed_student)
                    )
                  }}%</strong
                >
                <div
                  class="progress"
                  :style="{
                    background: findcolor(
                      100 /
                        (props.item.total_student /
                          props.item.completed_student)
                    ),
                    width:
                      getVal(
                        100 /
                          (props.item.total_student /
                            props.item.completed_student)
                      ) + '%',
                  }"
                ></div>
              </v-progress-linear>
              <span class="lang2">0</span>
              <span class="lang3">{{ props.item.total_student }}</span>
            </td>
            <td class="text-xs-center">
              <v-btn
                small
                fab
                color="primary"
                @click="showDetailItem(props.item.details)"
              >
                <v-icon>details</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
import progressDetails from "@/components/result/resultProgressDetails.vue";
import common_activities_get from "@/mixin/get_activities_time_publish";
export default {
  components: { progressDetails },
  mixins: [commonGet, watchMixin, common_activities_get],
  data() {
    return {
      loadingPro: false,
      valueFull: false,
      interval: null,
      currentItem: [],
      detailsDialog: false,
      getProgressLoading: false,
      mailDialogStatus: false,
      loading: false,
      search: "",
      sl_count: 0,
      searchParam: {},
      param: {},
      headers: [
        {
          text: "Exam",
          value: "exam_code",
          align: "center",
          sortable: false,
          width: "5%",
        },
        {
          text: "Year",
          value: "year",
          align: "center",
          sortable: false,
          width: "5%",
        },
        {
          text: "Total Student",
          value: "total_student",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Completed Student",
          value: "completed_student",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Progress Visually",
          value: "completed_student",
          align: "center",
          sortable: false,
          width: "40%",
        },
        {
          text: "Details",
          value: "status",
          sortable: false,
          align: "center",
          width: "5%",
        },
      ],
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          sortable: false,
        },
        {
          text: "Registration No.",
          value: "reg_no",
          align: "center",
          sortable: false,
        },
        {
          text: "Session",
          value: "session",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Student Name",
        //   value: "student_name",
        //   align: "center",
        //   sortable: false
        // },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          sortable: false,
        },
        { text: "Course", value: "paper_code", sortable: false },
        {
          text: " Head Examiner",
          value: "head_examiner_code",
          align: "center",
          sortable: false,
        },
        {
          text: "Examiner",
          value: "examiner_code",
          align: "center",
          sortable: false,
        },
        {
          text: "Rescrutinizer",
          value: "rescrutiner_name",
          sortable: false,
        },
        {
          text: "Status",
          align: "center",
          value: "payment_status",
          sortable: false,
        },
        {
          text: "Old Marks",
          value: "old_mark",
          align: "center",
          sortable: false,
        },
        {
          text: "Revised Marks",
          value: "mark",
          align: "center",
          sortable: false,
        },
        {
          text: "Script SL.",
          value: "script_sl",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Unmatch Script",
        //   value: "script_qr",
        //   align: "center",
        //   sortable: false,
        // },
        // {
        //   text: "College",
        //   value: "college_code",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Subject",
        //   value: "subject_code",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Date",
        //   value: "datetime",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Payment Amount",
        //   align: "center",
        //   value: "payment_amount",
        //   sortable: false
        // },
        // {
        //   text: "Payment Date",
        //   align: "center",
        //   value: "payment_date",
        //   sortable: false
        // },
        // {
        //   text: "Action",
        //   value: "action",
        //   align: "right",
        //   sortable: false
        // }
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
    };
  },
  mounted() {
    //on reload page interval call
    if (!this.getResultProgressList.length) {
      console.log("----> ");
      this.callInterval();
    }
    //on page change onreload interval off and on page change interval call
    if (this.getResultProgressList.length) {
      console.log("----> ");
      //window.clearInterval(this.interval);
      this.callInterval();
    }
  },
  watch: {
    getResultProgressList(val) {
      console.log("lets see", val);
      if (val.length) {
        if (val[0].completed_student == val[0].total_student) {
          window.clearInterval(this.interval);
        }
      } else {
        window.clearInterval(this.interval);
      }
    },
    pagination() {
      this.searchRescrutinyDetails();
    },
    //after generate button click on mounted interval off as on generate interval called
    loadingPro(val) {
      if (val) {
        window.clearInterval(this.interval);
      }
    },
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;

    this.searchParam.type = "Recrutiner";

    //get activities time & status
    this.paramTimePublishBoth.exam_initiate_id = this.getExamInitiateId;
    this.paramTimePublishBoth.exam_code = this.getLoggedInExam.code;
    this.paramTimePublishBoth.year = this.getLoggedInYear.year;
    this.paramTimePublishBoth.activity_tag = "RescrutinyResultPublished";
    this.paramTimePublishBoth.limit = -1;
    this.getTimePublishStatusBoth();

    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData", this.searchParam);
    }
    //paper
    if (!this.$store.getters.getPaperByResItems.length) {
      this.$store.dispatch("fetchPaperByRescrutinerData", this.searchParam);
    }
    this.$store.dispatch("searchRescrutiner", this.searchParam);
    this.getProgress();
    //this.callInterval();
  },
  computed: {
    getResultProgressList() {
      return this.$store.getters.getResultProgressList;
    },
    getRescrutinyDetailsList() {
      return this.$store.getters.getRescrutinyDetailsList;
    },
    getSchema() {
      return this.$store.getters.getRescrutinyStdSchema;
    },
    getRescrutinerList() {
      return this.$store.getters.getRescrutinerDataList;
    },
  },
  methods: {
    getRevisedMark(r1, r2) {
      if (r1 == "0") {
        return parseInt(r1);
      } else {
        return parseInt(r1) + parseInt(r2);
      }
    },
    getOldMark(m1, m2) {
      return parseInt(m1) + parseInt(m2);
    },
    getClass(val) {
      if (val == 100) {
        return "textWhite";
      } else {
        return "textBlack";
      }
    },
    getSt(val) {
      if (val == 100) {
        this.valueFull = true;
        return false;
      } else {
        return true;
      }
    },
    findBackcolor(val) {
      console.log("back", val);
      if (val == 100) {
        return "green darken-2";
      } else if (val >= 50) {
        return "blue lighten-4";
      } else {
        return "orange lighten-4";
      }
    },
    findcolor(val) {
      console.log(val);
      if (val == 100) {
        return "#388e3c";
      } else if (val >= 50) {
        return "#0288d1";
      } else {
        return "#f57c00";
      }
    },
    getVal(val) {
      return Math.ceil(val);
      // if(val == 100){}
    },
    exportbyMarkchange() {
      //this.searchParam.mark_changes = 1;
      this.$store.dispatch("exportRescrutinyByMarkchnge", this.searchParam);
      //this.searchParam.mark_changes = 0;
    },
    showDetailItem(item) {
      this.currentItem = item;
      this.detailsDialog = !this.detailsDialog;
    },
    setParam() {
      this.param.exam_code = this.searchParam.exam_code;
      //this.param.exam_year = this.searchParam.year;
      this.param.exam_initiate_id = this.getExamInitiateId;
      this.param.year = this.searchParam.year;
      this.param.type = "Rescrutiny";
      this.param.college_codes = null;
      this.param.reg_nos = null;
    },
    processGenerate() {
      this.loadingPro = true;
      var self = this;
      this.setParam();
      if (this.searchParam.exam_code == null || this.searchParam.year == null) {
        console.log("in if --> Null");
        this.$store.commit("SET_SNACKBAR", {
          msg: "Exam or Year not selected ",
          color: "red",
        });
      } else {
        this.$root
          .$confirm("Are you sure that you want to Generate?")
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("callResultGenerate", this.param)
                .then(() => {
                  console.log("success");
                  self.loadingPro = false;
                  self.getProgress();
                  self.callInterval();
                });
            }
          });
      }
    },
    callInterval() {
      var self = this;
      this.interval = window.setInterval(function() {
        self.getProgress();
        // if (self.valueFull) {
        //   window.clearInterval(self.interval);
        // }
      }, 5000);
    },
    getProgress() {
      this.setParam();
      this.getProgressLoading = true;
      this.$store.dispatch("resultGenerateProcess", this.param).then((data) => {
        console.log("data", data);
        this.getProgressLoading = false;
      });
    },
    markStatus(val) {
      if (val == true) {
        this.searchParam.mark_changes = 1;
      } else {
        this.searchParam.mark_changes = 0;
      }
    },
    paymentStatus(val) {
      if (val == true) {
        this.searchParam.payment_status = 1;
      } else {
        this.searchParam.payment_status = 0;
      }
    },

    parse(item) {
      return String(item.replace(/"|\,|\./g, ""));
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },

    searchRescrutinyDetails() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRescrutinyDetailsData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>

<style>
.progress {
  float: left;
  padding: 10px;
  border-radius: 2px;
}

.custom {
  margin: 5px;
  border-radius: 2px;
  overflow: hidden;
}
.lang {
  margin: 2px;
  font-size: 25px;
  font-weight: bold;
  color: rgb(116, 19, 103);
}
.lang2 {
  margin-left: 3px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(40, 19, 116);
  /* background-image: repeating-linear-gradient(0deg, blue, green 40%, red); */
  background-color: none;
  float: left;
}
.lang3 {
  margin: 3px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(40, 19, 116);
  background-color: none;
  float: right;
}
.textWhite {
  color: white;
  float: center !important;
  font-size: large;
}
.textBlack {
  color: black;
  float: right !important;
  font-size: large;
  margin-top: -4px !important;
}
</style>
