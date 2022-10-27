<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :getDataFromApi.sync="getDataFromApi"
    ></formDialog>
    <v-dialog v-model="detailsDialog" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Student List For Proposed Grace Mark</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="detailsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <progressDetails
          :detailsParam="detailsParam"
          :detailsDialog="detailsDialog"
        ></progressDetails>
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
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <!-- {{getPaperList}} -->
        <v-layout column class="mx-5">
          <v-flex class="mx-3">
            <v-layout row wrap align-center></v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.paper_code"
                    item-value="paper_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    :items="getPaperList"
                    menu-props="auto"
                    label="Select Course"
                    hide-details
                    prepend-icon="library_books"
                    required
                    v-validate="'required'"
                    :error-messages="errors.collect('paper_code')"
                    data-vv-name="paper_code"
                  >
                    <!-- :loading="subPap.paper_loading" -->
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.paper_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{  data.item.code + " - " + data.item.title }}
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
                               data.item.code + ' - ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="getDataFromApi">
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
            <v-card-text class="title">Grace Mark Proposal</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
            v-on:keyup.native.enter="getDataFromApi()"
          ></v-text-field>-->
          <v-spacer />
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-card-actions>
            <v-btn @click="exportPdf" color="primary" dark
              >Download Grace Mark Proposal</v-btn
            >
            <v-btn @click="newItem" color="primary" dark
              >Add Grace Mark Proposal</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="pagination.totalItems"
        :loading="loading"
        :headers="headers"
        :items="getGraceSummaryList"
        class="elevation-1"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">
            {{ props.item.paper.paper_code }} -
            {{ props.item.paper.paper_name }}
          </td>
          <td class="text-xs-center">{{ props.item.grace_mark }}</td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-center">{{ props.item.target_student }}</td>

          <td class="text-xs-center">{{ props.item.current_pass_rate }}</td>
          <td class="text-xs-center">{{ props.item.overall_pass_rate }}</td>
          <td class="text-xs-center">{{ props.item.total_passed }}</td>
          <td class="text-xs-center">{{ props.item.total_failed }}</td>
          <td class="justify-center text-xs-center" nowrap="true">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="primary"
                    v-on="on"
                  >
                    <v-icon
                      @click="showDetailsItem(props.item)"
                      class="mr-0"
                      color="white"
                      >details</v-icon
                    >
                  </v-btn>
                </template>
                <span>Show Details</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="blue" v-on="on">
                    <v-icon @click="exportDetailsItem(props.item)" color="white"
                      >cloud_download</v-icon
                    >
                  </v-btn>
                </template>
                <span>Export</span>
              </v-tooltip>
            </v-item-group>
          </td>
          <td class="text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 0"
              >Draft</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status == 1"
              >Approved</v-chip
            >
          </td>
          <td class="justify-center text-xs-center" nowrap="true">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="primary"
                    v-on="on"
                    :disabled="disableStatus(props.item)"
                  >
                    <v-icon
                      @click="editItem(props.item)"
                      class="mr-0"
                      color="white"
                      >edit</v-icon
                    >
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="orange" v-on="on">
                    <v-icon @click="approveItem(props.item)" color="white"
                      >send</v-icon
                    >
                  </v-btn>
                </template>
                <span>Approve</span>
              </v-tooltip>
              <v-tooltip top v-if="props.item.status == 1">
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="green"
                    v-on="on"
                    v-if="props.item.status == 1"
                  >
                    <v-icon @click="generateGrace(props.item)" color="white"
                      >play_for_work</v-icon
                    >
                  </v-btn>
                </template>
                <span>Generate</span>
              </v-tooltip>
              <v-tooltip right v-if="props.item.status == 1">
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="red"
                    v-on="on"
                    v-if="props.item.status == 1"
                  >
                    <v-icon @click="revertGrace(props.item)" color="white"
                      >undo</v-icon
                    >
                  </v-btn>
                </template>
                <span>revert</span>
              </v-tooltip>
            </v-item-group>
          </td>
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
          :headers="headersProgress"
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
              <span>Completed Examinee</span>

              <!-- <div class="bar">
                  <div
                    class="progress"
                    :style="{'background':findcolor(100 / (props.item.total_student/props.item.completed_student)), 'width':getVal(100 / (props.item.total_student/props.item.completed_student))+'%'}"
                  >
                    <div
                      :class="getClass(100 / (props.item.total_student / props.item.completed_student))"
                    ></div>
                    <span
                      class="percent"
                    >{{ getVal(100 / (props.item.total_student / props.item.completed_student)) }}%</span>
                  </div>
                  <div class="lang2">{{ props.item.completed_student }}</div>
                </div>
                <span class="lang2">0</span>
                <span class="lang3">{{ props.item.total_student }}</span>-->
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
                  }}%
                </strong>
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
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/result/graceMarkSummaryForm.vue";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import progressDetails from "@/components/result/gracePassStdDetails.vue";
export default {
  components: {
    formDialog,
    progressDetails,
  },
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      detailsParam: {},
      detailsDialog: false,
      loading: false,
      search: "",
      sl_count: 1,
      searchParam: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      dialog: false,
      formDialogStatus: false,
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Course", align: "center", value: "paper_code" },
        { text: "Grace Mark", value: "grace_mark", align: "center" },
        { text: "Total Student", value: "total_student", align: "center" },
        { text: "Target Student", align: "center", value: "target_student" },
        {
          text: "Current Pass Rate",
          align: "center",
          value: "current_pass_rate",
        },
        {
          text: "Overall Pass Rate",
          align: "center",
          value: "overall_pass_rate",
        },
        { text: "Total Passed", align: "center", value: "total_passed" },
        { text: "Total Failed", align: "center", value: "total_failed" },
        { text: "Details", align: "center", value: "details" },
        { text: "Status", align: "center", value: "status" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      param: {},
      interval: 0,
      loading1: false,
      getProgressLoading: false,
      headersProgress: [
        {
          text: "Exam",
          value: "exam_code",
          align: "left",
          sortable: false,
          width: "10%",
        },
        {
          text: "Year",
          value: "year",
          align: "center",
          sortable: false,
          width: "5%",
        },
        {
          text: "Total Examinee",
          value: "total_student",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Completed Examinee",
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
          width: "50%",
        },
      ],
    };
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.param.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.getProgress();
  },

  mounted() {
    this.$store.commit("UNSET_FORMNOTIFY");
    //this.getDataFromApi();
    // this.$validator.localize("en", this.dictionary);
    //on reload page interval call
    if (!this.getResultProgressList.length) {
      console.log("----> ");
      this.callInterval();
    }
    //on page change onreload interval off and on page change interval call
    if (this.getResultProgressList.length) {
      console.log("----> ");
      // window.clearInterval(this.interval);
      this.callInterval();
    }
  },

  computed: {
    getGraceSummaryList() {
      return this.$store.getters.getGraceSummaryList;
    },
    getResultProgressList() {
      return this.$store.getters.getResultProgressList;
    },
  },
  watch: {
    pagination() {
      this.getDataFromApi();
    },
    getResultProgressList(val) {
      console.log("lets see", val);
      if (val[0].completed_student == val[0].total_student) {
        window.clearInterval(this.interval);
      }
    },
    //after generate button click on mounted interval off as on generate interval called
    loading1(val) {
      if (val) {
        window.clearInterval(this.interval);
      }
    },
  },
  methods: {
    showDetailsItem(item) {
      this.detailsParam.grace_mark_summary_id = item.id;
      this.detailsDialog = !this.detailsDialog;
    },
    exportDetailsItem(item) {
      let param = {
        grace_mark_summary_id: item.id,
        pdf: true,
      };
      this.$store.dispatch("exportGracePassStdDetails", param);
    },
    disableStatus(item) {
      if (item.status == 1) {
        return true;
      } else {
        return false;
      }
    },
    getSt(val) {
      if (val == 100) {
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
      return Math.floor(val);
      // if(val == 100){}
    },
    getClass(val) {
      if (val == 100) {
        return "textWhite";
      } else {
        return "textBlack";
      }
    },
    getClass2(val) {
      if (val == 100) {
        return "animoff";
      } else {
        return "anim";
      }
    },
    setParam() {
      this.param.exam_code = this.searchParam.exam_code;
      //this.param.exam_year = this.searchParam.year;
      this.param.year = this.searchParam.year;
      this.param.type = "GraceMark";
      this.param.college_codes = null;
      this.param.reg_nos = null;
    },
    generateGrace(item) {
      this.loading1 = true;
      this.setParam();
      this.param.grace_mark_id = item.id;
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to Generate?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("callResultGenerate", this.param)
              .then((data) => {
                console.log("data---", data);
                self.loading1 = false;
                self.st = true;
                self.generateDialog = false;
                self.getProgress();
                self.callInterval();
              });
          }
        });
    },
    callInterval() {
      var self = this;
      self.interval = window.setInterval(() => self.getProgress(), 5000);
    },
    getProgress() {
      this.getProgressLoading = true;
      this.setParam();
      this.$store.dispatch("resultGenerateProcess", this.param).then((data) => {
        console.log("data", data);
        this.getProgressLoading = false;
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchGraceSummaryData", this.searchParam)
        .then((data) => {
          this.loading = false;
          //this.sl_count = data.meta.from;
          //this.pagination.totalItems = data.meta.total;
        });
    },
    exportPdf() {
      this.$store.dispatch("exportGraceSummary", this.searchParam);
    },
    getStatus(status) {
      var status1 = status == 1 ? "Yes" : "No";
      return status1;
    },
    getCode(code) {
      if (code == null) {
        return "X";
      } else {
        return code;
      }
    },

    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_code: "",
        exam_year: "",
        exam_type: "",
        paper_code: "",
        grace_mark: "",
        total_student: "",
        target_student: "",
        current_pass_rate: "",
        overall_pass_rate: "",
        total_passed: "",
        total_failed: "31",
        lock: "",
        status: "",
        created_by: "",
        updated_by: "",
        deleted_by: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      console.log("ddddd");
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getGraceSummaryList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    approveItem(item) {
      //this.editedIndex = this.getGraceSummaryList.indexOf(item);
      this.editedIndex = -2; //used to trace is approved button clicked or not
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },

    revertGrace(item) {
      let item2 = item;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to revert approval?")
        .then((confirm) => {
          if (confirm) {
            item2.status = 0;
            this.$store
              .dispatch("revertGraceItem", item2)
              .then(function() {
                self.setLimit();
                self.getDataFromApi();
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.getDataFromApi();
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
.custSty {
  margin: 8px 8px !important;
  padding: 0px 5px !important;
}
.custBtn {
  border-radius: 50px;
}
.bar {
  width: 100%;
  background: #dfdfdf;
  overflow: hidden;
  margin: 5px;
  border-radius: 30px;
}
/* .progress {
  float: left;
  padding: 5px;
  border-radius: 30px;
} */
@keyframes mymove {
  from {
    left: 1px;
  }
  to {
    left: 700px;
  }
}
.anim {
  float: right;
  display: inline;
  padding: 15px;
  border-radius: 30px;
  width: 100px;
  height: 10px;
  background: #f57c00;
  position: relative;
  animation: mymove 5s infinite;
  animation-timing-function: linear;
  background-image: repeating-linear-gradient(
    90deg,
    #f57c00,
    rgb(155, 153, 22) 40%,
    rgb(118, 141, 16)
  );
}
.animoff {
  width: 2px;
  height: 2px;
}
.percent {
  float: center;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
}
/* new ui */
.lang {
  margin: 5px;
  font-size: 20px;
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
.textWhite {
  color: white;
  float: center !important;
  font-size: large;
  vertical-align: middle !important;
}
.textBlack {
  color: black;
  float: right !important;
  font-size: large;
  margin-top: -3px !important;
  /* float: center !important; */
}
</style>
