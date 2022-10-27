<template>
  <v-container fluid>
    <!-- {{getCorrectCenterStatus}} -->
    <v-layout row wrap v-if="ifCenterUser">
      <v-flex xs12 sm12 md2 class="hidden-sm-and-down" v-if="ifCenterUser">
        <v-layout align-center justify-center row fill-height>
          <v-img :src="require('@/assets/nu_logos/nu_logo.png')" contain height="130"></v-img>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm12 md10>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6>
            <v-hover>
              <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 0 : 0} `" style="border-radius: 10px" color="#fafafa" class="ma-2" height="140">
                <v-layout class="ml-0">
                  <div class="ma-3">
                    <h1 class="mt-3 display-3 text-sm-left">Center Panel</h1>
                    <!-- <h1
                      class="mt-4 display-2 text-sm-left hidden-md-and-down hidden-xl-and-up"
                    >Center Panel</h1>-->
                    <p class="subheading text-sm-left">
                      Welcome to
                      <strong>{{ getAuthUser.center.center_name }}</strong>
                      Examination Center.
                    </p>
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex xs12 sm12 md6>
            <!-- <v-layout align-space-between justify-center row fill-height> -->
            <v-hover>
              <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" style="border-radius: 10px" class="ma-2 , elevation-2" height="180" color="grey lighten-3">
                <v-layout class="ml-3">
                  <div class="ma-3 text-sm-left">
                    <v-icon large color="primary">store_mall_directory</v-icon>
                    <div class="headline">
                      {{ getAuthUser.center.center_name }}
                    </div>
                    <div class="mt-2">
                      <v-icon style="margin-bottom: -0.18em" color="primary">map</v-icon>
                      Address: {{ getAuthUser.center.address }}.
                      <br />
                      <v-icon style="margin-bottom: -0.18em" color="primary" class="mt-2">phone</v-icon>
                      Phone: {{ getAuthUser.center.phone }}
                    </div>
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
            <!-- </v-layout> -->
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="my-2 mt-4"></v-divider>
    <v-flex xs12 v-if="false">
      <v-layout column>
        <v-flex xs12>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 0 : 0} `" style="border-radius: 10px" color="darken-0">
              <v-layout align-center justify-center row fill-height>
                <v-flex v-if="false" xs5>
                  <v-autocomplete
                    class="ma-2"
                    v-model="topsheetParam.subject_code"
                    :items="getSubjectList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
                    prepend-icon="library_books"
                    hide-details
                    outline
                  >
                    <template v-slot:selection="data">
                      <v-chip :selected="data.selected" class="chip--select-multi">{{ data.item.code + " - " + data.item.title }}</v-chip>
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
                <v-flex v-if="false" xs5>
                  <v-autocomplete
                    class="ma-2"
                    v-model="topsheetParam.paper_code"
                    :items="getPaperList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select paper"
                    persistent-hint
                    prepend-icon="library_books"
                    hide-details
                    outline
                  >
                    <template v-slot:selection="data">
                      <v-chip :selected="data.selected" class="chip--select-multi">{{ data.item.code + " - " + data.item.title }}</v-chip>
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
                <v-flex xs8>
                  <v-menu v-model="menu_ts" :close-on-content-click="false" full-width max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        class="ma-2"
                        :value="getFormatedDate(topsheetParam.date)"
                        clearable
                        label="Pick a date"
                        readonly
                        v-on="on"
                        outline
                        hide-details
                        prepend-icon="library_books"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="topsheetParam.date" @change="menu_ts = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs3 class="text-xs-left">
                  <v-btn :disabled="!topsheetParam.date" @click="downLoadTopSheet()">DOWNLOAD TOPSHEET</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 0 : 0} `" style="border-radius: 10px" color="darken-0">
              <v-layout align-center justify-center row fill-height>
                <v-flex xs8>
                  <v-autocomplete
                    class="ma-2"
                    v-model="rollDescriptiveParam.subject_code"
                    :items="getSubjectList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
                    prepend-icon="library_books"
                    hide-details
                    outline
                  >
                    <template v-slot:selection="data">
                      <v-chip :selected="data.selected" class="chip--select-multi">{{ data.item.code + " - " + data.item.title }}</v-chip>
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
                <v-flex xs3 class="text-xs-left">
                  <v-btn @click="downLoadrollDescriptive()">DOWNLOAD Descriptive Roll Sheet</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
        <v-flex xs12>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 0 : 0} `" style="border-radius: 10px" color="darken-0">
              <v-layout align-center justify-center row fill-height>
                <v-flex xs8>
                  <v-autocomplete
                    class="ma-2"
                    v-model="attendanceSheetParam.subject_code"
                    :items="getSubjectList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
                    prepend-icon="library_books"
                    hide-details
                    outline
                  >
                    <template v-slot:selection="data">
                      <v-chip :selected="data.selected" class="chip--select-multi">{{ data.item.code + " - " + data.item.title }}</v-chip>
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
                <v-flex xs3 class="text-xs-left">
                  <v-btn @click="downloadAttendanceSheet()">DOWNLOAD attendance Sheet</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>

    <todaySummary></todaySummary>
    <v-card flat class="mb-2">
      <v-layout row>
        <v-flex v-for="(item, i) in gotoMidBtn" :key="i">
          <v-layout align-center justify-center row fill-height @click="goto(item.link)">
            <v-card color="primary" height="70" width="70" style="border-radius: 10px 0 0 10px">
              <v-layout align-center justify-center row fill-height>
                <v-icon color="white" size="50">{{ item.icon }}</v-icon>
              </v-layout>
            </v-card>
            <v-card class="pa-4 title" height="70" style="border-radius: 0px 10px 10px 0px">
              <span class="ml-2">{{ item.title }}</span>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card class="mt-3">
      <v-toolbar dense color class="mt-0">
        <v-toolbar-title>Center Details (Click on the center name for details)</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="white--text" @click="exportCenterDesSumm()"> <v-icon left dark>arrow_downward</v-icon>Export Center Descriptive Summary </v-btn>
      </v-toolbar>
      <v-layout>
        <admitCardCountByCenter fromDashboard />
      </v-layout>
    </v-card>

    <!-- ROUTINE CONTENT  -->
    <v-divider class="my-2 mt-4 mb-3"></v-divider>

    <formNotification />

    <v-card class="ma-2 " flat v-for="item in getRoutineChangeNoticeList" :key="item.notice">
      <v-card-text :class="[changeColor ? 'getWhite' : 'getHighlight']"> "{{ item.notice }}" </v-card-text>
    </v-card>

    <routinePdf ref="html2Pdf" :getCenterAllocationSchema="routineData.routine" :getRoutineSchema="getRoutineSchema"></routinePdf>

    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-card-text class="title">Exam Routine</v-card-text>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-spacer />
        <v-card flat>
          <v-card-actions>
            <!-- <v-btn @click="exportPdf" color="primary" dark>
              <v-icon dark>arrow_downward</v-icon>Download Exam Routine
            </v-btn> -->
            <v-btn @click="generateReport()" color="primary"> <v-icon dark>arrow_downward</v-icon>Download Exam Routine </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-card>
    <!-- <pre>{{ getRoutineSchema.routine }}</pre> -->
    <v-layout align-center justify-center row fill-height class="col-md-7 erLayoutCSS" v-for="(item, index) in getRoutineSchema.routine" :key="index">
      <v-flex>
        <!-- {{ getClass(item) }} -->
        <v-layout :class="getClass(item)" align-center justify-center row fill-height>
          <v-divider></v-divider>
          <v-flex xs2 class="text-xs-center" v-if="item.date != 'postponed'">
            <div class="title">{{ getFormatedDate(item.date) }}</div>
            <div class="subheading">{{ item.day }}</div>
            <div class="subheading">{{ getRoutineSchema.start_time }} am</div>
          </v-flex>
          <v-flex xs2 class="text-xs-center" v-else>
            <div class="title red--text">PostPoned</div>
          </v-flex>

          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-if="mastersFinal">
            <div class="ma-2" v-for="(elm, i) in getFormatedPaperCodeBySub(item.papers)" :key="i">
              {{ showData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="honoursExam">
            <div class="ma-2" v-for="(elm, i) in getFormatedPaperCodeBySub(item.papers)" :key="i">
              {{ showHonoursSubData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="bachelorProfessional">
            <div class="ma-2" v-for="(elm, j) in item.papers" :key="j">
              {{ showBachelorProfData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <!-- <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="mastersProfessional">
            <div class="ma-2" v-for="(elm, j) in getFormatedPaperCodeBySub(item.papers)" :key="j">
              {{ showData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="oneYearProfessionalDegree">
            <div class="ma-2" v-for="(elm, j) in item.papers" :key="j">
              {{ showOneProData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex> -->
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else>
            <div class="ma-2" v-for="(elm, j) in item.papers" :key="j">
              {{ showOneProData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-if="honoursExam">
            <div class="ma-2" v-for="(elm, j) in getFormatedPaperCodeBySub(item.papers)" :key="j">
              {{ showHonoursPapData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>

          <!-- <v-layout align-center justify-center column fill-height > -->
          <v-flex xs2 row class="text-xs-center erMidBoxCSS">
            <!-- <v-card flat class="pa-4"> -->
            <v-layout align-center justify-center row fill-height column>
              <v-flex>
                <span class="title">TOTAL EXAMINEE: {{ item.student_count }}</span>
              </v-flex>

              <v-flex class="mt-2">
                <v-btn color="primary" @click="downLoadStudentList((studentListParam.date = item.date))">EXAMINEE List</v-btn>
                <!-- <v-btn
              color="primary"
              @click="downLoadTopSheet((topsheetParam.date = item.date))"
            >DOWNLOAD TOPSHEET</v-btn>-->
              </v-flex>
            </v-layout>

            <!-- </v-card> -->
          </v-flex>
          <!-- <v-flex xs2 row class="text-xs-center">
        
        <v-layout align-center justify-center row fill-height column>
          <v-flex class="mt-2">
            <v-btn
              color="primary"
              @click="downLoadStudentList((studentListParam.date = item.date))"
            >STUDENT List</v-btn>
          </v-flex>
        </v-layout>

        
      </v-flex>-->
          <!-- </v-layout> -->
        </v-layout>
      </v-flex>
    </v-layout>

    <v-spacer class="ma-5"></v-spacer>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import common_getters_mixin from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import formNotification from "@/components/utils/formNotification";
import admitCardCountByCenter from "@/components/admitCard/admitCardCountByCenter.vue";
import todaySummary from "@/components/todaySummary/todaySummary.vue";
import routinePdf from "@/components/admin/routinePdf.vue";
import * as moment from "moment";
import Vue from "vue";
import draggable from "vuedraggable";
// import moment from "moment";
export default {
  mixins: [common_login_getters, common_getters_mixin, commonExamYear],
  components: {
    draggable,
    admitCardCountByCenter,
    todaySummary,
    formNotification,
    routinePdf,
  },
  data: () => ({
    t: null,
    changeColor: false,
    routineData: {},
    calendarStatus: false,
    text: "Examination Center Panel",
    downParam: {},
    searchParam: {},

    topsheetParam: {
      date: new Date().toISOString().substr(0, 10),
    },
    studentListParam: {},
    rollDescriptiveParam: {},
    attendanceSheetParam: {},
    isDragging: false,
    delayedDragging: false,
    // date:
    date_ts: new Date().toISOString().substr(0, 10),
    menu_ts: false,
    gotoMidBtn: [
      {
        title: "Blank Script",
        icon: "import_contacts",
        link: "",
      },
      {
        title: "Question",
        icon: "assignment",
        link: "",
      },
      {
        title: "Answer Script",
        icon: "text_snippet",
        link: "",
      },
    ],
  }),
  watch: {
    calendarStatus(val) {},
    getCorrectCenterStatus(val) {
      if (val) {
        this.searchParam.center_code = this.getAuthUser.center.center_code;
        this.topsheetParam.center_code = this.getAuthUser.center.center_code;
        this.searchExamRoutineList();
      }
    },
    getExamInitiateId() {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      this.topsheetParam.center_code = this.getAuthUser.center.center_code;
      this.topsheetParam.exam_code = this.getLoggedInExam.code;
      this.topsheetParam.year = this.getLoggedInYear.year;
      this.topsheetParam.exam_initiate_id = this.getExamInitiateId;
    },
  },
  created() {
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.exam_year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.center_code = this.getLoggedInExamType;
    this.downParam.exam_type = this.getLoggedInExamType;
    if (this.ifCenterUser) {
      this.downParam.center_code = this.getAuthUser.center.center_code;
    }

    this.studentListParam.exam_initiate_id = this.getExamInitiateId;
    this.studentListParam.exam_year = this.getLoggedInYear.year;
    this.studentListParam.exam_code = this.getLoggedInExam.code;
    this.studentListParam.center_code = this.getAuthUser.center.center_code;

    this.initialize();
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.type = 1;

  
    this.$store.dispatch("searchRoutineChangeNoticeData", this.searchParam);
    this.blink(event);

    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    //this.publishActivity("RoutineGeneration");
  },
  methods: {
    showOneProData(param) {
      let data = param;
      console.log("data:......", param);
      let string = "";
      string = data.paper_name + " ( " + data.paper_code + " ) ";
      return string;
    },
    blink(event) {
      this.t = setInterval(
        function() {
          this.changeColor = !this.changeColor;
          this.v = this.v + 1;
        }.bind(this),
        1500
      );
    },
    generateReport() {
      // console.log("..m clcik");
      // this.$store.commit("SET_LOADING", { color: "primary" });
      this.$refs.html2Pdf.generateReports();
      // setTimeout(() => {
      //   this.$store.commit("UNSET_LOADING"); // loading Closing
      // }, 5000);
    },
    getClass(item) {
      if (moment(item.date, "YYYY-MM-DD").isSame(moment(), "day")) {
        return " green lighten-4";
      } else if (moment(item.date, "YYYY-MM-DD").isAfter(moment(), "days")) {
        return " white";
      } else {
        return "red lighten-4";
      }
    },
    getFormatedPaperCodeBySub_(papers) {
      let subCode = [];
      papers.forEach((obj) => {
        if (subCode.indexOf(obj.subject_name) == -1) {
          subCode.push(obj.subject_name);
        }
      });
      let data = [];
      subCode.forEach((item) => {
        let sub = {
          subject_code: item,
          paper_code: [],
        };
        papers.forEach((obj) => {
          if (obj.subject_name === item) {
            sub.paper_code.push(obj.paper_code);
          }
        });
        data.push(sub);
      });

      return data;
    },

    getFormatedPaperCodeBySub(papers) {
       console.log("papers:", papers);
      let uniArr = [];

      papers.forEach((obj) => {
        let ind = uniArr.findIndex((el) => {
          return el === obj.degree_group_code;
        });
        // console.log("ind:", ind);
        if (ind == -1) {
          uniArr.push(obj.degree_group_code);
        }
      });
      let motherArr = [];

      uniArr.forEach((obj) => {
        let secArr = [];
        papers.forEach((pap) => {
          if (pap.degree_group_code === obj) {
            // console.log("pap:", pap);
            secArr.push(pap);
          }
        });
        motherArr.push({
          data: secArr,
        });
      });

      // console.log("motherArr:", motherArr);
      let fatherArr = [];

      motherArr.forEach((mA) => {
        let subCode = [];
        mA.data.forEach((obj) => {
          if (subCode.indexOf(obj.subject_name) == -1) {
            subCode.push(obj.subject_name);
          }
        });
        let data = [];
        subCode.forEach((item) => {
          let sub = {
            subject_code: item,
            paper_code: [],
          };
          mA.data.forEach((obj) => {
            if (obj.subject_name === item) {
              sub.paper_code.push(obj.paper_code);
            }
          });
          data.push(sub);
        });
        fatherArr.push({
          data: data,
        });
      });

      // console.log("fatherArr:", fatherArr);
      // this.fatherArray = fatherArr;
      return fatherArr;
    },

    showData(param) {
      let data = param.data;
      // console.log("data:", data);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        string = string + item.subject_code + " ( ";
        for (var i = 0; i < item.paper_code.length; i++) {
          string = string + item.paper_code[i];
          if (i != item.paper_code.length - 1) {
            string = string + ", ";
          }
        }
        string = string + " ) ";
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },
    showData_(data) {
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        string = string + item.subject_code + " [ ";
        for (var i = 0; i < item.paper_code.length; i++) {
          string = string + item.paper_code[i];
          if (i != item.paper_code.length - 1) {
            string = string + ", ";
          }
        }
        string = string + " ] ";
        if (j != data.length - 1) {
          string = string + " - ";
        }
      }
      return string;
    },
    showHonoursSubData(param) {
      let data = param.data;
      // console.log("data:", data);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        string = string + item.subject_code;
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },
    showBachelorProfData(param) {
      console.log("showBachelorProfData", param);
      let data = param;
      console.log("data:......", param);
      let string = "";
      string = data.paper_name + " ( " + data.paper_code + " ) ";
      return string;
    },
    showHonoursPapData(param) {
      console.log("shanita hns", param);
      let data = param.data;
      console.log("data:", param);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        for (var i = 0; i < item.paper_code.length; i++) {
          string = string + item.paper_code[i];
          if (i != item.paper_code.length - 1) {
            string = string + ", ";
          }
        }
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },
    exportCenterDesSumm() {
      var param = {};
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      param.exam_initiate_id = this.getExamInitiateId;
      param.center_code = this.getAuthUser.center.center_code;
      this.$store.dispatch("exportCenterDescripSummaryApi", param);
    },
    exportPdf() {
      // console.log("fdfd", this.downParam);
      this.$store.dispatch("exportExamRoutine", this.downParam);
    },

    initialize() {
      this.topsheetParam.center_code = this.getAuthUser.center.center_code;

      this.topsheetParam.exam_code = this.getLoggedInExam.code;
      this.topsheetParam.year = this.getLoggedInYear.year;
      this.topsheetParam.exam_initiate_id = this.getExamInitiateId;
      // rollDescriptiveParam
      this.rollDescriptiveParam.center_code = this.getAuthUser.center.center_code;
      this.rollDescriptiveParam.exam_code = this.getLoggedInExam.code;
      this.rollDescriptiveParam.year = this.getLoggedInYear.year;
      this.rollDescriptiveParam.exam_initiate_id = this.getExamInitiateId;
      // attendanceSheetParam
      this.attendanceSheetParam.center_code = this.getAuthUser.center.center_code;

      this.attendanceSheetParam.exam_code = this.getLoggedInExam.code;
      this.attendanceSheetParam.year = this.getLoggedInYear.year;
      this.attendanceSheetParam.exam_initiate_id = this.getExamInitiateId;
      // fetch routine data
      this.searchExamRoutineList();
    },
    goto(link) {
      this.$router.push(link);
    },
    downLoadTopSheet(date = "") {
      // console.log("dat", this.topsheetParam);
      this.$store.dispatch("downLoadTopSheet", this.topsheetParam);
    },
    downLoadStudentList(date = "") {
      // console.log("dat", this.topsheetParam);
      this.$store.dispatch("downLoadStudentList", this.studentListParam);
    },
    // center-descriptive
    downLoadrollDescriptive() {
      this.$store.dispatch("downloadRollDescriptiveSheet", this.rollDescriptiveParam);
    },
    downloadAttendanceSheet() {
      this.$store.dispatch("downloadAttendanceSheet", this.attendanceSheetParam);
    },
    remove(arr, item) {
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },

    // UI Methods

    getCursor(link) {
      return link ? "cursor: pointer;" : "";
    },
    searchExamRoutineList() {
      let searchRoutineParam = {};
      searchRoutineParam.exam_code = this.getLoggedInExam.code;
      searchRoutineParam.center_code = this.getAuthUser.center.center_code;
      searchRoutineParam.year = this.getLoggedInYear.year;
      searchRoutineParam.exam_initiate_id = this.getExamInitiateId;
      searchRoutineParam.type = 1;
      console.log("searchRoutineParam", this.getAuthUser.center.center_code);
      var self = this;
      this.$store.dispatch("searchExamRoutineData", searchRoutineParam).then((data) => {
        // console.log("RET Data ", data);
        if (data.data.length) {
          self.$store.commit("SET_ROUTINE_SCHEMA_DATA", data.data[0]);
          self.routineData = data.data[0];
        } else {
          self.$store.commit("SET_ROUTINE_SCHEMA_DATA", {});
        }

        // console.log("routine data fetch done", this.getRoutineSchema);
      });
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    onMove() {},
    goToScriptPage() {
      // this.$router.push("/regional-center-dashboard");
      this.$router.push("/center/as-dist-to-reg");
    },
    goToScriptPageBlank() {
      // this.$router.push("/regional-center-dashboard");
      this.$router.push("/center/bs-coll-from-reg");
    },
    goToQuestionPage() {
      this.$router.push("/exam_monitor/question-receive");
    },
  },
  computed: {
    getRoutineChangeNoticeList() {
      return this.$store.getters.getRoutineChangeNoticeList;
    },
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    //subject
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },
    getAuthUser() {
      return this.$store.getters.getAuthUser;
    },
    getTotalStatus() {
      return this.$store.getters.getTotalStatus;
    },
    getAttendanceList() {
      return this.$store.getters.getattendanceItem;
    },
    getMenu() {
      return localStorage.getItem("menu");
    },
    // goToCenterUsersList() {
    //   return this.$router.push("/center/center_user");
    // },
    getHomeCardData() {
      return [
        {
          icon: "store_mall_directory",
          title: "Center Profile",
          description: "This is Center Profile Panel. From this panel centers profile details can be seen.",
          link: "/center/center_profile",
        },

        {
          icon: "store_mall_directory",
          title: "Center User List",
          description: "This is Center User List Panel. From this panel centers User List details can be seen.",
          link: "/center/center_user",
        },
        {
          icon: "menu_book",
          title: "Final Examinee List",
          description: "This is Final Examinee List Panel. From this panel Final Examinee List details can be seen.",
          link: "/final-examinee-list",
        },
        {
          icon: "store_mall_directory",
          title: "Attendence List(RAW)",
          description: "This is the Attendence List Panel. From this panel Student Attendence List details can be seen.",
          link: "/std-attendence",
        },
        {
          icon: "store_mall_directory",
          title: "Attendance By EY",
          description: "This is the Student Attendance List By EXAM YEAR Panel. From this panel Student Attendance List By EXAM YEAR details can be seen.",
          link: "/attendence-by-exam-year",
        },
        {
          icon: "menu_book",
          title: "Invigilator Panel",
          description: "This is the Invigilator Panel. Invigilators condacts exams. From here Invigilator's detals can be seen.",
          link: "/invigilator-list",
        },
        {
          icon: "store_mall_directory",
          title: "Invigilator Access Panel",
          description: "This is the National University Invigilator Access Panel. From this panel Invigilator Access details can be seen.",
          link: "/invigilator-access",
        },
        {
          icon: "menu_book",
          title: "Blank Script Receive",
          description: "This is the Blank Script Receive Panel. Here we can see the information about blank script receive from regional center",
          link: "/center/bs-coll-from-reg",
        },
        {
          icon: "menu_book",
          title: "Answer Script Distribute Panel",
          description: "This is the Answer Script Distribute Panel. Here we can see the information about Answer Script Distribute to regional center.",
          link: "/center/as-dist-to-reg",
        },
        {
          icon: "store_mall_directory",
          title: "Loose Script Distribute Panel",
          description: "This is the Loose Script Distribute Panel. Here we can see the information about Loose Script Distribute to regional center.",
          link: "/center/ls-dist-to-reg",
        },
      ];
    },
    //routine schema
    getRoutineSchema() {
      return this.$store.getters.getRoutineSchema;
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style>
.getWhite {
  /* background-color: rgb(228, 217, 73) !important ; */
  background-color: white !important ;
  color: rgb(37, 37, 28) !important ;
  font-size: 20px !important ;
}
.getHighlight {
  /* background-color: rgb(236, 120, 120) !important ;  */
  color: red !important ;
  font-size: 22px !important ;
}
.examRoutineDraggable {
  margin-top: 24px !important;
  padding-left: 0px !important;
}
.selectedPaperDraggable {
  padding-left: 0px !important;
}
.erLayoutCSS {
  border-style: solid !important;
  /* border-radius: 15px 50px 30px; */
  border-width: thin;
}
.erMidBoxCSS {
  border-right-style: solid !important;
  border-left-style: solid !important;
  border-width: thin;

  font-size: 36px !important;
  font-weight: 400;
}
.erMidBoxTextCSS {
  font-size: 18px !important;
  font-weight: 400;
}
.erBtn {
  border-radius: 15px;
}
</style>
