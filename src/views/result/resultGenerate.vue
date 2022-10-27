<template>
  <v-container fluid>
    <v-dialog v-model="detailsDialog" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>College-wise Progress Details</v-toolbar-title>
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
    <v-card color="grey lighten-2">
      <v-card color="primary" flat>
        <v-card-title>
          <span class="headline white--text">Result Generate</span>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
      <!-- <v-layout row wrap justify-center align-center class="mt-4">
        <span class>
          <div class="display-1 mb-4">
            <v-icon size="40" color="primary">fact_check</v-icon>
            <span class="ml-2">Result Process Summary</span>
          </div>
        </span>
      </v-layout>-->
      <!-- <v-layout row fill-height>
        <v-flex class="custSty" xs12 md4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`custBtn elevation-${hover ? 12 : 2}`">
              <v-layout align-center justify-center row fill-height>
                <div class="title pa-2">
                  <v-icon left class="pl-2" color="#00695C" medium>check</v-icon>Completed Count &nbsp; :&nbsp;
                  <v-btn
                    color="blue darken-3"
                    class="white--text custBtn elevation-0"
                    style="font-size:1.8em;"
                  >{{getResultProcessSummaryStatus.completed_count}}</v-btn>
                </div>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex class="custSty" xs12 md4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`custBtn elevation-${hover ? 12 : 2}`">
              <v-layout align-center justify-center row fill-height>
                <div class="title pa-2">
                  <v-icon left class="pl-2" color="#00695C" medium>pending_actions</v-icon>In-progress Count &nbsp; :&nbsp;
                  <v-btn
                    color="blue darken-3"
                    class="white--text custBtn elevation-0"
                    style="font-size:1.8em;"
                  >{{getResultProcessSummaryStatus.in_progress_count}}</v-btn>
                </div>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex class="custSty" xs12 md4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`custBtn elevation-${hover ? 12 : 2}`">
              <v-layout align-center justify-center row fill-height>
                <div class="title pa-2">
                  <v-icon left class="pl-2" color="#00695C" medium>add_to_queue</v-icon>New Count &nbsp; :&nbsp;
                  <v-btn
                    color="blue darken-3"
                    class="white--text custBtn elevation-0"
                    style="font-size:1.8em;"
                  >
                    {{getResultProcessSummaryStatus.new_count
                    }}
                  </v-btn>
                </div>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>-->
      <v-card class="my-0">
        <resultStepsSummary></resultStepsSummary>
      </v-card>

      <v-flex xs12 sm12 md12 class="ma-4 pb-3">
        <v-layout justify-center row fill-height align-center>
          <v-btn
            round
            large
            @click="generateDialogOpen()"
            color="primary"
            :disabled="
              !getResultProcessSummaryStatus.button_status ||
                timeOut ||
                publishState == 1
            "
            :dark="publishState == 1 && publishState != 1"
            >Generate Result</v-btn
          >
        </v-layout>
      </v-flex>
      <v-dialog v-model="generateDialog" persistent max-width="750px">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Result Generate</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <!-- {{ collegeEntries }} -->
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="collegeCode"
                    :items="collegeEntries"
                    :item-text="
                      (item) => item.college_code + ' - ' + item.college_name
                    "
                    item-value="college_code"
                    :search-input.sync="searchCollege"
                    prepend-icon="house"
                    name="collegeCode"
                    label="College wise Generate"
                    hide-no-data
                    hide-selected
                    multiple
                    ><template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeCollege(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.college_code +
                            " - " +
                            data.item.college_name
                        }}
                      </v-chip>
                    </template>
                    <!-- <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content
                          v-text="data.item"
                        ></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title
                            v-html="
                              data.item.college_code +
                                ' - ' +
                                data.item.college_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template> -->
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    class="mt-3 ml-2 mr-2"
                    name="regNo"
                    rows="1"
                    auto-grow
                    label="Registration No. wise Generate"
                    v-model="regNo"
                    data-vv-name="regNo"
                    prepend-icon="edit"
                    placeholder="for multiple reg no use comma separator, i.e., 14210000002,14210000003"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              large
              flat
              @click="generateDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              flat
              large
              @click="submit()"
              color="primary"
              :disabled="
                !getResultProcessSummaryStatus.button_status ||
                  timeOut ||
                  publishState == 1
              "
              :dark="publishState == 1 && publishState != 1"
              >Generate Result</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid>
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
                        (props.item.total_student /
                          props.item.completed_student)
                    )
                  "
                  :color="
                    findcolor(
                      100 /
                        (props.item.total_student /
                          props.item.completed_student)
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
              <td style=" border-left-style: hidden;"></td>
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
    </v-card>
  </v-container>
</template>

<script>
import commonFun from "../../mixin/common_function";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
import progressDetails from "@/components/result/resultProgressDetails.vue";
import resultStepsSummary from "@/components/result/resultStepsSummary.vue";
import common_activities_get from "@/mixin/get_activities_time_publish";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_activities_get],
  components: { progressDetails, resultStepsSummary },
  data: () => ({
    searchCollege: null,
    collegeEntries: [],
    generateDialog: false,
    collegeCode: [],
    regNo: "",
    currentItem: [],
    detailsDialog: false,
    getProgressLoading: false,
    st: false,
    searchParam: {},
    param: {},
    loading: false,
    interval: 0,
    headers: [
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
      {
        text: "",
        value: "",
        sortable: false,
        align: "center",
        width: "1%",
        class: "noborders",
      },
      {
        text: "Details",
        value: "status",
        sortable: false,
        align: "center",
        width: "3%",
      },
    ],
  }),
  watch: {
    searchCollege(val) {
      //console.log("here in watch", val.length);
      if (this.collegeEntries.length > 0) return;
      if (val.length >= 3) {
        // Lazily load input items
        let param = this.searchParam;
        param.searchCollege = val;
        param.limit = -1;
        param.page = 1;
        this.$store.dispatch("fetchCollegeList", param).then((res) => {
          this.collegeEntries = res.data;
          //console.log("here in watch", this.collegeEntries);
        });
      }
    },
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
    //after generate button click on mounted interval off as on generate interval called
    loading(val) {
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
    this.param.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    //get activities time
    this.paramGetTime.exam_initiate_id = this.getExamInitiateId;
    this.paramGetTime.exam_code = this.getLoggedInExam.code;
    this.paramGetTime.year = this.getLoggedInYear.year;
    this.paramGetTime.activity_tag = "FinalResultGenerated";
    this.paramGetTime.limit = -1;
    this.getActivitiesTime();
    //get activities status
    this.paramPublish = Object.assign({}, this.paramGetTime);
    this.paramPublish.activity_tag = "FinalResultPublished";
    this.publishActivityUpdating(); // to get publish status

    //this.$store.dispatch("fetchAllSessionData");
    this.$store.dispatch("getResultProcessSummary", this.searchParam);
    this.getProgress();
    //this.$store.dispatch("fetchCollegeList", this.searchParam);
  },
  mounted() {
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
    getResultGenerateSchema() {
      return this.$store.getters.getResultGenerateSchema;
    },
    getResultProgressList() {
      return this.$store.getters.getResultProgressList;
    },
    getResultProcessSummaryStatus() {
      return this.$store.getters.getResultProcessSummaryStatus;
    },
  },
  methods: {
    removeCollege(item) {
      var position = -1;
      //console.log("..", item);
      this.collegeCode.forEach(function(e, index) {
        if (item.college_code == e) position = index;
      });
      if (position > -1) this.collegeCode.splice(position, 1);
    },
    generateDialogOpen() {
      this.generateDialog = true;
    },
    showDetailItem(item) {
      this.currentItem = item;
      this.detailsDialog = !this.detailsDialog;
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
      this.param.type = "Result";
      this.param.college_codes = this.collegeCode;
      this.param.reg_nos = this.regNo;
    },
    submit() {
      this.loading = true;
      this.setParam();
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to Generate?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("callResultGenerate", this.param)
              .then((data) => {
                console.log("data---", data);
                self.loading = false;
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
.noborders {
  border-left: none;
}
</style>
