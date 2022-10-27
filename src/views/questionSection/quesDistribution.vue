<template>
  <v-container fluid style="padding-right: 0px; padding-left: 0px">
    <v-container fluid style="padding-top: 0px; padding-bottom: 0px">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Question Distribution Statement</v-card-text
            >
          </v-card>
          <v-divider class="my-0" vertical></v-divider>
          <v-spacer />

          <!-- <v-btn
            outline
            color="primary"
            @click.stop.prevent="downloadQuesStm_subWiseCenter()"
            class="erBtn"
          >Subject wise center list</v-btn>-->
          <!-- question distribution report -->

          <v-btn
            outline
            color="primary"
            @click.stop.prevent="downloadQuesSortingReport()"
            class="erBtn"
            >QUESTION DISTRIBUTION STATEMENT</v-btn
          >
          <!-- question sorting report -->

          <v-btn
            outline
            color="primary"
            @click.stop.prevent="downloadQuesDistributionSamaryReport()"
            class="erBtn"
            >distribution summary</v-btn
          >
        </v-layout>
      </v-card>
    </v-container>

    <v-container fluid style="padding-top: 10px; padding-bottom: 10px">
      <!-- {{subPap}} -->
      <v-card>
        <v-layout row wrap class="mx-4 mt-0">
          <v-flex xs12 md3>
            <v-hover>
              <v-card flat class="py-3 px-1 ma-0" style="border-radius: 5px">
                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                  class="mx-2"
                >
                  <v-autocomplete
                    class="ma-0"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    hide-details
                    outline
                    prepend-icon="library_books"
                    @change="subjectChange()"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSubject()"
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
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <!-- <v-flex xs1></v-flex> -->
          <!-- {{getPaperList}} -->
          <v-flex xs7>
            <v-hover>
              <v-card flat class="py-3 px-1 ml-1" style="border-radius: 5px">
                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                  class="mx-2"
                >
                  <v-autocomplete
                    class="ma-0"
                    v-model="searchParam.paper_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getPaperList"
                    menu-props="auto"
                    label="Select Course"
                    hide-details
                    prepend-icon="library_books"
                    outline
                    :loading="paperLoading"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.paper_code = ''"
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
                </v-layout>
                <v-btn
                  small
                  absolute
                  dark
                  fab
                  top
                  right
                  flat
                  color="primary"
                  style="
                    margin-top: 1em;
                    margin-right: -1.5em;
                    pointer-events: none;
                  "
                >
                  <v-chip color="cyan" small flat label>{{
                    getPaperList.length
                  }}</v-chip>
                </v-btn>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs2>
            <v-layout align-center justify-center row fill-height>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  color="green lighted-3"
                  :class="`elevation-${hover ? 0 : 6}`"
                  class="pa-0 ma-0"
                  style="cursor: pointer; border-radius: 5px"
                >
                  <v-layout
                    align-center
                    justify-center
                    row
                    fill-height
                    class="mx-0"
                  >
                    <v-btn
                      color="priamry "
                      class="subheading text-black pa-1 white--text"
                      flat
                      @click="fetchQuestionDistributionPaperWiseCenterData()"
                      style="border-radius: 5px"
                    >
                      <v-icon outline class="mr-1">get_app</v-icon>
                      <span
                        class="subheading text-black pa-1"
                        @click="fetchQuestionDistributionPaperWiseCenterData()"
                        >Get Data</span
                      >
                    </v-btn>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <v-layout>
      <v-flex>
        <v-hover>
          <v-card flat class="px-0 ma-1" style="border-radius: 5px">
            <v-layout align-center justify-center row fill-height>
              <v-flex xs1></v-flex>
              <v-flex xs3>
                <v-layout align-center justify-center row fill-height>
                  <span class="title">Set Allocated Question % :</span>
                </v-layout>
              </v-flex>
              <v-flex xs7>
                <v-layout align-center justify-center row fill-height>
                  <v-text-field
                    class="ma-2"
                    label="Allocated question %"
                    prepend-inner-icon="folder"
                    outline
                    hide-details
                    v-model="allocated_question_percent"
                    v-on:keyup.enter="allocated_question_size()"
                  ></v-text-field>
                  <v-btn
                    style="margin-left: -8em"
                    @click="allocated_question_size()"
                    >set data</v-btn
                  >
                </v-layout>
              </v-flex>
              <v-flex xs1></v-flex>
            </v-layout>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <!-- <v-card>
      <v-btn color="red"></v-btn>
    </v-card>-->
    <v-container fluid style="padding-top: 0px; padding-bottom: 5px">
      <v-data-table
        expand
        item-key="paper_code"
        :headers="quesDistStmMainHeaders"
        :items="getQuesDistData"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        :key="forceKey"
      >
        <template v-slot:items="props">
          <tr
            @click="props.expanded = !props.expanded"
            :style="getTRStyle(props.item)"
          >
            <td>{{ props.index + 1 }}</td>
            <td class="text-xs-left">
              <!-- <v-chip
                color="transparent"
                label
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
              ></v-chip>-->
              {{ props.item.question_set }}
            </td>
            <td class="text-xs-left">
              <!-- <v-chip
                color="transparent"
                label
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
              ></v-chip>-->
              {{ props.item.subject_code }} - {{ props.item.subject_name }}
            </td>
            <td class="text-xs-left">
              <!-- <v-chip
                color="transparent"
                label
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
              ></v-chip>-->
              {{ props.item.paper_code }} - {{ props.item.paper_name }}
            </td>
            <td class="text-xs-center">
              <v-chip color="transparent" label class="subheading">{{
                props.item.total_printed_packet
              }}</v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip color="transparent" label class="subheading">{{
                props.item.total_distributed_packet
              }}</v-chip>
            </td>
            <td>
              <v-chip color="transparent" label class="subheading">{{
                props.item.total_packet_balance
              }}</v-chip>
            </td>
            <td class="text-xs-right">
              <v-btn color="primary">Details</v-btn>
              <!-- <v-btn fab flat small>
                <v-icon medium v-if="!props.expanded">keyboard_arrow_down</v-icon>
                <v-icon medium v-else>keyboard_arrow_up</v-icon>
              </v-btn>-->
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card
            :color="` ${props.index % 2 == 0 ? 'red' : 'green'} lighten-4`"
            class="pa-2 pt-3 px-3 ma-0"
            v-if="!(props.item.statements.length == 0)"
          >
            <template>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                >
                  <v-data-table
                    item-key="id"
                    :headers="quesStatementHeaders"
                    :items="props.item.statements"
                    class="elevation-1"
                    hide-actions
                    v-if="force"
                  >
                    <template v-slot:items="prop">
                      <tr>
                        <!-- :class="getClass(props.item)" -->
                        <td>{{ prop.index + 1 }}</td>
                        <td class="text-xs-left">
                          <!-- <v-chip
                            color="transparent"
                            class="subheading"
                          ></v-chip>-->
                          {{ prop.item.center_code }} -
                          {{ prop.item.center_name }}
                        </td>
                        <td>
                          <v-chip :color="getStatusColor(prop.item)">{{
                            getStatus(prop.item)
                          }}</v-chip>
                        </td>
                        <td class="text-xs-center">
                          {{ prop.item.student_count }}
                        </td>
                        <td class="text-xs-center">
                          <v-layout align-center justify-center row fill-height>
                            <v-flex>
                              <!-- color="pink lighten-1" -->
                              <v-icon
                                @click="removePQ(props.item, prop.item)"
                                v-if="!getBtnStatus(prop.item)"
                                >remove_circle</v-icon
                              >

                              <v-tooltip left v-else>
                                <template v-slot:activator="{ on }">
                                  <v-icon v-on="on" color="grey lighten-1"
                                    >remove_circle</v-icon
                                  >
                                </template>
                                <span>disabled as distributed</span>
                              </v-tooltip>
                            </v-flex>
                            <v-flex>{{ prop.item.allotted_questions }}</v-flex>
                            <v-flex>
                              <v-icon
                                @click="addPQ(props.item, prop.item)"
                                v-if="!getBtnStatus(prop.item)"
                                >add_circle</v-icon
                              >
                              <v-tooltip right v-else>
                                <template v-slot:activator="{ on }">
                                  <v-icon v-on="on" color="grey lighten-1"
                                    >add_circle</v-icon
                                  >
                                </template>
                                <span>disabled as distributed</span>
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </td>
                        <td class="text-xs-center">
                          {{ prop.item.packet_size }}
                        </td>
                        <td class="text-xs-center">
                          {{ prop.item.total_packet }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </v-hover>
            </template>

            <v-layout align-center justify-center row fill-height class="pt-2">
              <!-- <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  color="primary"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="pa-0 mt-2"
                  style="cursor: pointer;  border-radius: 5px;"
                >
                  <v-layout align-center justify-center row fill-height class="mx-0">
                    <v-btn
                      class="subheading text-black pa-1 white--text"
                      flat
                      style=" border-radius: 5px; "
                      @click="submitQuesStm(props.item.statements)"
                      :disabled="ifDisabledBtn(props.item)"
                    >
                      <span class="subheading text-black pa-1 pl-3">SEND</span>
                      <v-icon right outline class="mr-1">send</v-icon>
                    </v-btn>
                  </v-layout>
                </v-card>
              </v-hover>-->
              <!-- <v-btn
                class="subheading"
                color="primary"
                style=" border-radius: 5px; "
                @click="submitQuesStm(props.item.statements)"
                :disabled="ifDisabledBtn(props.item)"
              >
                <span class="subheading text-black pa-1 pl-3">SEND</span>
                <v-icon right outline class="mr-1">send</v-icon>
              </v-btn>-->
            </v-layout>
          </v-card>
        </template>
      </v-data-table>
    </v-container>

    <v-layout align-center justify-center row fill-height>
      <v-btn
        outline
        class="subheading"
        color="primary"
        style="border-radius: 5px"
        @click="saveQuesDistributionCenterWise(0)"
      >
        <span class="subheading text-black pa-0 pl-0">SAVE</span>
        <!-- <v-icon right outline class="mr-1">SAVE</v-icon> -->
      </v-btn>
    </v-layout>
    <v-divider></v-divider>
    <v-layout align-center justify-center row fill-height>
      <v-btn
        class="subheading"
        color="primary"
        style="border-radius: 5px"
        @click="saveQuesDistributionCenterWise(1)"
        large
      >
        <span class="subheading text-black pa-1 pl-3">SEND</span>
        <v-icon right outline class="mr-1">send</v-icon>
      </v-btn>
    </v-layout>
    <!-- <v-divider /> -->
    <!-- <hr style="height:5px" class="my-3" color="#DCDCDC" />-->
    <!-- <pre style="font-size: 10px !important;">
      <b>Expecting for "GetApi" :</b>
       {{getQuesDistData}}
    </pre>-->
  </v-container>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";

export default {
  props: ["dialogStatus"],
  components: {},
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],

  data() {
    return {
      paperLoading: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },
      force: true,
      searchParam: {
        generate: true,
      },
      subject: { subject_code: [] },
      Course: { paper_code: [] },
      paper_loading: false,
      t: null,
      v: 0,
      subPap: {
        subject_code: [],
        paper_code: [],
        paper_loading: false,
      },
      allocated_question_percent: 0,
      forceKey: 0,
    };
  },

  created() {
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    // this.$store.dispatch("fetchAllSessionData");
    this.initialize();

    // this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  mounted() {},

  computed: {
    getQuesDistData() {
      return this.$store.getters.getQuesDistData;
    },
    //all data

    // Exama
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    quesDistStmMainHeaders() {
      return [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Question Set",
          value: "subject_code",
          width: "10%",
          sortable: false,
        },
        {
          text: "Subject",
          value: "subject_code",
          width: "10%",
          sortable: false,
        },
        { text: "Course", value: "paper_code", width: "20%", sortable: false },
        {
          text: "Printed Pack",
          value: "total_printed_packet",
          width: "1%",
          sortable: false,
        },
        {
          text: "Distributed Pack",
          value: "total_distributed_packet",
          width: "1%",
          sortable: false,
        },
        {
          text: "Balance",
          value: "total_distributed_packet",
          width: "1%",
          sortable: false,
        },
        {
          text: "Action",
          value: "action",
          width: "1%",
          align: "right",
          sortable: false,
        },
      ];
    },
    quesStatementHeaders() {
      return [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        { text: "Center", value: "center_code", width: "20%", sortable: false },
        { text: "Status", value: "center_code", width: "20%", sortable: false },
        {
          text: "Std No.",
          value: "student_count",
          width: "5%",
          align: "center",
          sortable: false,
        },
        {
          text: "Allotted Questions",
          value: "allotted_questions",
          width: "1%",
          align: "center",
          sortable: false,
        },
        {
          text: "Packet Size",
          value: "packet_size",
          width: "5%",
          align: "center",
          sortable: false,
        },
        {
          text: "Total Packet",
          value: "total_packet",
          width: "5%",
          align: "center",
          sortable: false,
        },
        // { text: "Action", value: "total_packet", width: "1%", align: "center" }
      ];
    },

    myClass() {
      return {
        highlight: this.changeColor,
        shrink: !this.changeColor,
      };
    },
  },
  methods: {
    getTRStyle(item) {
      return parseInt(item.total_packet_balance) < 0
        ? "background-color: #FF8A80;"
        : "";
    },
    saveQuesDistributionCenterWise(val) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Send?")
        .then((confirm) => {
          if (confirm) {
            let param = [...this.getQuesDistData];
            if (val == 1) {
              param.forEach((obj) => {
                obj.distribution_status = val;
              });
            }
            this.$store
              .dispatch("saveQuesDistributionCenterWise", param)
              .then(() => {
                console.log("in return then downloadScriptStm");
              });
          }
        });
    },
    allocated_question_size() {
      // this.force = false;
      let _cQuesDistData = [...this.getQuesDistData];
      console.log("---??", _cQuesDistData);
      let i = 0;
      _cQuesDistData.forEach((obj) => {
        let currentCount = 0;

        obj.statements.forEach((ele) => {
          let calVal = Math.ceil(
            parseInt(ele.allotted_questions) +
              parseInt(ele.allotted_questions) *
                (parseInt(this.allocated_question_percent) / 100)
          );

          ele.allotted_questions = calVal;
          ele.total_packet = Math.ceil(calVal / parseInt(ele.packet_size));
          currentCount += ele.total_packet;
        });

        obj.total_packet_balance = obj.total_printed_packet - currentCount;
        this.$set(this.getQuesDistData, i, obj);
        i += 1;
      });
      // this.force = true;
      // this.forceKey += 1;
    },

    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },

    downloadQuesStm() {
      // console.log("spspsp->", this.searchParam);
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("getQuesStatementPdf", this.searchParam)
              .then(() => {
                // console.log("in return then downloadScriptStm");
                // self.searchScriptStm();
              });
          }
        });
    },
    downloadQuesSortingReport() {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("getQuesSortingReportPdf", this.searchParam)
              .then(() => {
                console.log("in return then downloadScriptStm");
              });
          }
        });
    },
    downloadQuesDistributionSamaryReport() {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("getQuesDistributionSamaryReportPdf", this.searchParam)
              .then(() => {
                console.log("in return then downloadScriptStm");
              });
          }
        });
    },
    //
    submitQuesStm(prop) {
      console.log("sp bro sp :: ", prop);
      console.log("clicked");
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("postQuestionDistributionData", prop)
              .then(() => {
                console.log("in return then");
                self.fetchQuestionDistributionPaperWiseCenterData();
                // self.searchQuesStm();
              });
          }
        });
    },

    addPQ(props, item) {
      this.force = false;
      item.allotted_questions =
        Math.ceil(
          parseInt(item.allotted_questions) + parseInt(item.packet_size)
        ) + "";
      item.total_packet =
        Math.ceil(
          parseInt(item.allotted_questions) / parseInt(item.packet_size)
        ) + "";

      let all_total_packet = 0;
      this.force = true;
      this.$set(
        props,
        "total_packet_balance",
        parseInt(props.total_packet_balance) - 1
      );

      console.log("item:", item);
      console.log("props:", props);

      // props.total_distributed_packet =
      //   parseInt(props.total_distributed_packet) + 1 + "";
      // props.limit_exceed = props.max_packet < all_total_packet ? true : false;
      // console.log("-/> props", props);
      // console.log("-/> item", item);
    },
    removePQ(props, item) {
      this.force = false;
      // console.log("-/> props.item", props);

      let newAllotQue =
        parseInt(item.allotted_questions) - parseInt(item.packet_size);

      if (newAllotQue >= 0) {
        item.allotted_questions =
          "" +
          Math.ceil(
            parseInt(item.allotted_questions) - parseInt(item.packet_size)
          );
        item.total_packet =
          "" +
          Math.ceil(
            parseInt(item.allotted_questions) / parseInt(item.packet_size)
          );
        let all_total_packet = 0;
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "Value can't be negative",
          color: "red",
        });
      }
      props.total_packet_balance = parseInt(props.total_packet_balance) + 1;

      this.force = true;
    },

    removePaper() {
      this.searchParam.paper_code = "";
    },
    removeSubject() {
      this.searchParam.subject_code = "";
      this.subjectChange();
    },
    subjectChange() {
      this.paperLoading = true;
      this.$store
        .dispatch("fetchPaperData", {
          subject_code: this.searchParam.subject_code,
        })
        .then((data) => {
          this.paperLoading = false;
        })
        .catch(function (error) {
          this.paperLoading = false;
        });
    },

    ifEmpty(item) {
      console.log(item);
      return true;
    },

    getClass(item) {
      let flg = item.total_printed_packet < item.total_distributed_packet;
      return flg ? "red lighten-2 white--text" : "";
    },
    ifDisabledBtn(item) {
      // console.log("--->", item);
      let flg = item.total_printed_packet <= item.total_distributed_packet;
      if (item.total_printed_packet < item.total_distributed_packet) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "Exceeded total printed amount " + item.total_printed_packet,
          color: "red",
        });
      }
      return flg ? true : false;
    },
    getStatus(item) {
      if (item.receive_status == 1) {
        return "Recieved";
      } else {
        if (item.distribution_status == 1) {
          return "Distributed";
        } else {
          return "Not Distributed";
        }
      }
    },
    getStatusColor(item) {
      if (item.receive_status == 1) {
        return "green lighten-2";
      } else {
        if (item.distribution_status == 1) {
          return "yellow darken-1";
        } else {
          return "grey lighten-3";
        }
      }
    },
    getBtnStatus(item) {
      if (item.receive_status == 1) {
        return true;
      } else {
        if (item.distribution_status == 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    setLimit() {
      const { descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.search = this.search;
    },

    fetchQuestionDistributionPaperWiseCenterData() {
      console.log("fetchQuestionDistributionPaperWiseCenterData -1");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch(
          "fetchQuestionDistributionPaperWiseCenterData",
          this.searchParam
        )
        .then((data) => {
          console.log("fetchQuestionDistributionPaperWiseCenterData -2", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
          this.selected = [];
          this.tsDialog = false;
          this.allocated_question_size();
        });
    },
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.fetchQuestionDistributionPaperWiseCenterData();
    },
  },
};
</script>
<style lang="scss">
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}
.inputTable table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 10px;
}
.getWhite {
  background-color: rgb(233, 233, 233);
  font-size: 25px !important ;
}

.getHighlight {
  background-color: rgba(255, 255, 255, 0);
}

.custFavSm.v-btn--floating.v-btn--small {
  height: 20px;
  width: 20px;
}
</style>
