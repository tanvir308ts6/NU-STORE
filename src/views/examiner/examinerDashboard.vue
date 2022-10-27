<template>
  <v-container fluid>
    <v-layout>
      <span class>
        <div class="display-1 mb-4">
          <v-icon color="primary" size="50">dashboard</v-icon>
          <span class="ml-2">Examiner Dashboard</span>
        </div>
      </span>

      <v-layout row class="title ml-5">
        <v-layout row class="title ml-2">
          <v-card flat class="pa-3 ma-2">Script Receive Date</v-card>
          <v-card dark class="pa-3 my-2 mx-1">
            {{ FormatDate([0].script_received_date) }}
          </v-card>
        </v-layout>
        <v-layout row class="title ml-2">
          <v-card flat class="pa-3 ma-2">Script Submission Date</v-card>
          <v-card dark class="pa-3 my-2 mx-1">
            {{
              FormatDate(getExaminerMonitoringData[0].script_submission_date)
            }}
          </v-card>
        </v-layout>
      </v-layout>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs3></v-flex>
      <countdown
        :time="time(getExaminerMonitoringData[0].script_submission_date)"
      >
        <template slot-scope="props">
          <v-layout row class="title ml-5">
            <v-card flat class="pa-3 ma-3"
              >Time Remaining to submit script</v-card
            >
            <v-card dark class="pa-4 my-2 mx-1">{{ props.days }} days</v-card>
            <v-card dark class="pa-4 my-2 mx-1">{{ props.hours }} hours</v-card>
            <v-card dark class="pa-4 my-2 mx-1"
              >{{ props.minutes }} minutes</v-card
            >
            <v-card dark class="pa-4 my-2 mx-1"
              >{{ props.seconds }} seconds</v-card
            >
          </v-layout>
        </template>
      </countdown>
    </v-layout>

    <!-- <v-spacer></v-spacer> -->
    <v-divider class="mt-3 mb-3"></v-divider>
    <v-card color="white lighten-2" flat>
      <v-container style="padding: 0px" fluid grid-list-md>
        <!-- mother -->
        <v-card flat v-if="!ifAdminUserType">
          <v-container style="padding: 0px" fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg6>
                <v-card
                  flat
                  style="height: 80px"
                  class="title mx-4"
                  color="cyan lighten-4"
                >
                  <v-layout
                    row
                    wrap
                    class="mt-auto"
                    align-center
                    justify-center
                    fill-height
                  >
                    <div class="ma-3">
                      <span style="color: #1a237e" class="ma-3">
                        Subjects &nbsp; : &nbsp;
                        {{ getsubject(subject) }}
                      </span>
                    </div>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs12 sm12 md12 lg6>
                <v-card
                  flat
                  style="height: 80px"
                  class="title mx-4"
                  color="cyan lighten-4"
                >
                  <v-layout
                    row
                    wrap
                    class="mt-auto"
                    align-center
                    justify-center
                    fill-height
                  >
                    <div class="ma-3">
                      <span style="color: #880e4f" class="ma-3">
                        Courses &nbsp; : &nbsp;
                        {{ getpaper(paper) }}
                      </span>
                    </div>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex xs8 v-if="headExaminer.length != 0">
            <v-card class="mx-5 my-5" color="white" flat>
              <v-data-iterator flat :items="headExaminer" hide-actions row wrap>
                <template v-slot:item="props">
                  <v-flex sm12 style="padding: 2px">
                    <v-card flat>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-card-text class="titlel"
                              >Head Examiner Information</v-card-text
                            >
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile class="ma-2">
                          <v-list-tile-action>
                            <v-icon color="indigo" medium>edit</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: 1.5em"
                              >TMIS ID:</v-list-tile-title
                            >
                          </v-list-tile-content>
                          <v-list-tile-content
                            style="font-size: 1.5em"
                            class="align-end"
                            >{{ props.item.tims_id }}</v-list-tile-content
                          >
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile class="ma-2">
                          <v-list-tile-action>
                            <v-icon color="indigo" medium>person</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: 1.5em"
                              >Name:</v-list-tile-title
                            >
                          </v-list-tile-content>
                          <v-list-tile-content
                            style="font-size: 1.5em"
                            class="align-end mr-2"
                          >
                            {{ props.item.examiner_code }} -
                            {{ props.item.examiner_name }}
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile class="ma-2">
                          <v-list-tile-action>
                            <v-icon color="indigo" medium
                              >account_balance</v-icon
                            >
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: 1.5em"
                              >Designation:</v-list-tile-title
                            >
                          </v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                            style="font-size: 1.5em"
                            >{{
                              props.item.details.designation_name
                            }}</v-list-tile-content
                          >
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile class="ma-2">
                          <v-list-tile-action>
                            <v-icon color="indigo" medium>home</v-icon>
                          </v-list-tile-action>

                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: 1.5em"
                              >College:</v-list-tile-title
                            >
                          </v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                            style="font-size: 1.5em"
                          >
                            {{ props.item.details.college_code }}
                            - {{ props.item.details.college_name }}
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile class="ma-2">
                          <v-list-tile-action>
                            <v-icon color="indigo" medium>call</v-icon>
                          </v-list-tile-action>

                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: 1.5em"
                              >Mobile:</v-list-tile-title
                            >
                          </v-list-tile-content>

                          <v-list-tile-content
                            class="align-end"
                            style="font-size: 1.5em"
                            >{{
                              props.item.details.mobile
                            }}</v-list-tile-content
                          >
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile class="ma-2">
                          <v-list-tile-action>
                            <v-icon color="indigo" medium>email</v-icon>
                          </v-list-tile-action>

                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: 1.5em"
                              >Email:</v-list-tile-title
                            >
                          </v-list-tile-content>
                          <v-list-tile-content
                            class="align-end"
                            style="font-size: 1.5em"
                            >{{
                              props.item.examiner_email
                            }}</v-list-tile-content
                          >
                        </v-list-tile>
                        <v-divider></v-divider>
                      </v-list>
                    </v-card>
                  </v-flex>
                </template>
              </v-data-iterator>
            </v-card>

            <!-- <v-card flat color="white">
              <v-layout row>
                <v-card flat>
                  <v-card-text class="title">Head - Examiner Information</v-card-text>
                </v-card>
                <v-divider class="my-2" vertical></v-divider>
                <v-spacer></v-spacer>
              </v-layout>
            </v-card>-->
            <!-- <v-data-table
              :headers="HE_headers"
              :items="headExaminer"
              hide-actions
              class="elevation-4"
              flat
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.tims_id }}</td>
                <td class="text-xs-center">{{ props.item.examiner_code }}</td>
                <td class="text-xs-center">{{ props.item.examiner_name }}</td>
                <td class="text-xs-center">{{ props.item.examiner_email }}</td>
              </template>
            </v-data-table>-->
          </v-flex>

          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card flat color="white">
                  <v-layout row>
                    <v-card flat>
                      <v-card-text class="titlel"
                        >Examiner Information</v-card-text
                      >
                    </v-card>
                    <v-divider class="my-2" vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mr-3"
                      color="primary"
                      @click="triggerAppOpen()"
                      >Mark Entry App</v-btn
                    >
                    <v-btn
                      class="mr-3"
                      color="primary"
                      @click="downloadRecruitmentReport()"
                      >Download Recruitment Report</v-btn
                    >
                  </v-layout>
                </v-card>
              </v-flex>
              <v-container fluid>
                <v-data-table
                  :headers="headers"
                  :items="getExaminerMonitoringData"
                  hide-actions
                  class="elevation-0"
                  flat
                >
                  <template v-slot:items="props">
                    <!-- <td>{{ props.index + 1 }}</td> -->
                    <td class="text-xs-left">{{ props.item.tims_id }}</td>
                    <td class="text-xs-left">
                      <v-chip
                        label
                        color="cyan lighten-3"
                        text-color="black"
                        class="subheading"
                        style="
                          border-top-right-radius: 20px;
                          border-bottom-right-radius: 20px;
                        "
                      >
                        {{ props.item.examiner_code }} -
                        {{ props.item.examiner_name }}
                      </v-chip>
                    </td>
                    <td class="text-xs-left">
                      {{ props.item.details.designation_name }}
                    </td>
                    <td class="text-xs-left">
                      {{ props.item.details.college_name }}
                    </td>
                    <td class="text-xs-left">
                      {{ props.item.examiner_email }}
                    </td>
                    <td class="text-xs-left">
                      {{ props.item.details.mobile }}
                    </td>
                    <td class="text-xs-center cyan lighten-3 pa-2">
                      {{ props.item.total_scan_qty }}
                    </td>
                  </template>
                </v-data-table>
              </v-container>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import moment from "moment";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  name: "dashboard",
  components: {},
  data: () => ({
    year: "",
    exam: "",
    show: "6",
    searchParam: {},
    myDate: "",
    headExaminer: [],
    subject: [],
    paper: [],
    examiner_type: "",
    headers: [
      // { text: "SL.", align: "left", sortable: true, value: "id" },
      { text: "TMIS ID", value: "year", align: "left", sortable: false },
      {
        text: "Examiner Name",
        align: "left",
        value: "examiner_name",
        sortable: false,
      },
      {
        text: "Designation",
        value: "designation",
        align: "left",
        sortable: false,
      },
      { text: "College", value: "college", align: "left", sortable: false },
      {
        text: "Email",
        value: "examiner_email",
        align: "left",
        sortable: false,
      },
      { text: "Mobile", align: "left", value: "actions", sortable: false },
      {
        text: "Total Scanned Script",
        value: "total_scan_qty",
        align: "center",
        sortable: false,
      },
    ],
    HE_headers: [
      { text: "TMIS ID", value: "year", align: "center", sortable: false },
      { text: "Examiner Code", value: "examiner_name", sortable: false },
      { text: "Examiner Name", value: "examiner_name", sortable: false },
      {
        text: "Examiner Email",
        value: "year",
        align: "center",
        sortable: false,
      },
    ],
  }),
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifExaminerUser) {
      this.searchParam.examiner_code = this.getAuthUser.examiner.examiner_code;
      this.examiner_type = this.getAuthUser.examiner.examiner_type;
      if (this.examiner_type == "E") {
        this.searchParam.nested = false;
      }
    }
    var that = this;
    try {
      this.$store
        .dispatch("fetchExaminerMonitoringData", this.searchParam)
        .then((data) => {
          console.log("data :", data);

          try {
            that.headExaminer = data[0].head_examiners;
            that.subject = data[0].subjects;
            that.paper = data[0].papers;
          } catch (er) {
            console.log(er);
            return "No Data Found";
          }
        });
    } catch (ex) {
      console.log(ex);
    }
  },
  mounted() {
    return (this.myDate = this.getExaminerMonitoringData[0].script_received_date);
    console.log("this.myDate", this.myDate);
  },
  computed: {
    getExaminerMonitoringData() {
      return this.$store.getters.getExaminerMonitoringData;
    },
  },
  methods: {
    onLayoutValueChangeFetchData() {
      var that = this;
      try {
        this.$store
          .dispatch("fetchExaminerMonitoringData", this.searchParam)
          .then((data) => {
            console.log("data :", data);

            try {
              that.headExaminer = data[0].head_examiners;
              that.subject = data[0].subjects;
              that.paper = data[0].papers;
            } catch (er) {
              console.log(er);
              return "No Data Found";
            }
          });
      } catch (ex) {
        console.log(ex);
      }
    },
    triggerAppOpen() {
      //this.openApp();
      setTimeout(this.fallbackToStore(), 700);
    },
    openApp() {
      window.location.replace("https://nu.eatlbd.com/examiner-app");
    },
    fallbackToStore() {
      window.open(
        "https://drive.google.com/file/d/1uMhKTG_ETWMa4YQlYeIrcFn3OvgKOrWS/view?usp=drive_web"
      );
    },
    time(time) {
      var t = Date.parse(time) - Date.parse(new Date());
      console.log("ttime", t);
      if (t >= 0) {
        return t;
      }
    },
    getsubject(item) {
      let sub = item;
      let subj = [];
      sub.forEach((element) => {
        subj.push(element.code + " - " + element.title);
      });
      // return subject;
      return subj.join("\n");
    },
    getpaper(item) {
      let pap = item;
      let paps = [];
      pap.forEach((element) => {
        paps.push(element.code + " - " + element.title);
      });
      return paps.join("\n");
    },
    FormatDate(date) {
      return date ? moment(date).format("DD-MM-YYYY") : "No date";
    },
  },
  watch: {
    getExamInitiateId() {
      if (this.ifExaminerUser) {
        this.searchParam.examiner_code = this.getAuthUser.examiner.examiner_code;
        this.examiner_type = this.getAuthUser.examiner.examiner_type;
        if (this.examiner_type == "E") {
          this.searchParam.nested = false;
        }
      }
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.year = this.getLoggedInYear.year;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.onLayoutValueChangeFetchData();
    },

    // getExaminerMonitoringData(val) {
    //   try {
    //     this.headExaminer = val[0].head_examiners;
    //     // this.subject = val[0].subjects;
    //     // this.paper = val[0].papers;
    //     // console.log("...w", this.subject);
    //   } catch (ex) {
    //     console.log(ex);
    //   }
    // }
  },
};
</script>
<style>
.titlel {
  font-size: 30px;
  font-weight: 500;
}
/* .v-list__tile:nth-of-type(odd) {
  background: red;
} */
</style>

<!-- <v-card v-f="false" color="blue darken-3" class="white--text">
              <v-card-title primary-title>
                <v-layout row wrap class="mt-auto" align-center justify-center fill-height>
                  <div class="text-xs-center">
                    <div class="headline">
                      Head Examiner Information &nbsp;
                      : &nbsp;
                    </div>
                    <div class="mt-2">
                      <v-card class="pl-2">
                        <v-list v-if="headExaminer[0]">
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="indigo">person</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Name: {{headExaminer[0].examiner_name}}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="indigo">account_balance</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                              <v-list-tile-title>
                                Designation: {{headExaminer[0].details.designation_name
                                }}
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="indigo">account_balance</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                              <v-list-tile-title>
                                College: ({{ headExaminer[0].details.college_code }}
                                ){{headExaminer[0].details.college_name
                                }}
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>

                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="indigo">call</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                              <v-list-tile-title>Mobile:</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="indigo">email</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                              <v-list-tile-title>Email: {{headExaminer[0].examiner_email}}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>-->
<!-- <pre>  {{headExaminer}} </pre> -->