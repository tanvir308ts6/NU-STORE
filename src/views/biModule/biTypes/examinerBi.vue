<template>
  <v-container fluid style=" padding-right: 0px; padding-left: 0px;">
    <div>
      <v-container fluid>
        <v-layout column class="mx-0">
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left color="primary" medium>touch_app</v-icon
              >Examiner/Head Examiner-wise search options
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex class="mx-3">
                  <v-layout row wrap align-center v-if="forceRerenderFlag">
                    <v-flex xs9>
                      <v-select
                        class="mx-3"
                        disabled
                        v-model="searchParam.exam_code"
                        :items="getExamList"
                        :item-text="
                          item => '( Code:' + item.code + ' ) ' + item.title
                        "
                        item-value="code"
                        label="Exam"
                      ></v-select>
                    </v-flex>
                    <!-- {{getLoggedInYear}} -->
                    <v-flex xs3>
                      <v-select
                        class="mx-3"
                        disabled
                        v-model="searchParam.year"
                        :items="getYearList"
                        :item-text="item => '' + item.year + ''"
                        item-value="year"
                        label="Year"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                    <v-layout row wrap align-center class="py-3">
                      <!-- Center  -->
                      <v-flex xs12>
                        <v-autocomplete
                          class="ma-2"
                          v-model="searchParam.examiner_code"
                          :item-text="item => item.examiner_code"
                          item-value="examiner_code"
                          :items="getExaminerItemsByType"
                          menu-props="auto"
                          label="Select Head Examiner"
                          prepend-icon="list"
                          multiple
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              label
                              close
                              @input="
                                remove(
                                  searchParam.examiner_code,
                                  data.item.examiner_code
                                )
                              "
                              :selected="data.selected"
                              outline
                              color="black"
                              class="chip--select-multi"
                            >
                              <span class="subheading">
                                {{ data.item.examiner_name }} ({{
                                  data.item.examiner_code
                                }})
                              </span>
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
                                <v-list-tile-title>
                                  {{ data.item.examiner_name }} ({{
                                    data.item.examiner_code
                                  }})
                                </v-list-tile-title>
                              </v-list-tile-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    class="ma-2"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    hide-details
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSearchSubject(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{
                          "(" + data.item.code + ") " + data.item.title
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
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>

                <v-autocomplete
                  class="ma-2"
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
                      @input="removePaper(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" + data.item.code + ") " + data.item.title
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- Search Button -->
          <v-flex xs12 sm12 md12 class="my-0">
            <v-layout justify-center row fill-height align-center>
              <v-btn
                outline
                round
                large
                @click="searchMonitoring()"
                color="primary"
              >
                <v-icon left dark>search</v-icon>Examiner Monitoring
              </v-btn>
              <v-btn
                outline
                round
                large
                @click="searchMarkList()"
                color="primary"
              >
                <v-icon left dark>search</v-icon>Exam Marks
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider class="mt-2 mb-3"></v-divider>
      </v-container>
    </div>
    <v-container
      fluid
      v-if="monitor"
      style="padding-top: 0px; padding-bottom: 0px;"
    >
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Examiner Monitoring</v-card-text>
          </v-card>
          <v-divider class="my-0" vertical></v-divider>
          <v-spacer />
          <v-btn color="primary" @click="downloadReport()">
            <v-icon left dark>arrow_downward</v-icon>Download Report
          </v-btn>
        </v-layout>
      </v-card>
    </v-container>
    <v-container
      v-if="monitor"
      fluid
      style="padding-top: 0px; padding-bottom: 5px;"
    >
      <v-data-table
        expand
        item-key="tims_id"
        :headers="scriptMasterHeaders"
        :items="getExaminerMonitoringData"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <tr style="cursor: pointer;">
            <td @click="openExpand(props)">{{ props.index + 1 }}</td>
            <td
              class="text-xs-center cyan lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <v-chip label class="subheading" color="white">{{
                arrToStr(props.item.subjects)
              }}</v-chip>
            </td>
            <td
              class="text-xs-center cyan lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <v-chip label class="subheading" color="white">{{
                arrToStr(props.item.papers)
              }}</v-chip>
            </td>
            <td class="title text-xs-center primary--text font-weight-black">
              {{ props.item.examiner_type }}
            </td>
            <td class="text-xs-left" @click="openExpand(props)">
              <v-chip
                label
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
                >{{ props.item.examiner_name }} ({{
                  props.item.examiner_code
                }})</v-chip
              >
            </td>

            <td class="text-xs-left" @click="openExpand(props)">
              <v-btn @click="sendMail(props.item)">{{
                props.item.examiner_email
              }}</v-btn>
            </td>
            <td @click="openExpand(props)">{{ props.item.mobile }}</td>
            <td
              class="text-xs-center blue lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <v-chip label class="subheading" color="white">{{
                props.item.total_script_qty
              }}</v-chip>
            </td>
            <td
              class="text-xs-center blue lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <v-chip label class="subheading" color="white">{{
                props.item.total_scan_qty
              }}</v-chip>
            </td>
            <td></td>
            <td></td>
            <td class="text-xs-center" @click="openExpand(props)">
              <v-chip
                v-if="props.item.script_received_status == 3"
                color="white green--text"
              >
                <b>Distributed</b>
              </v-chip>
              <v-chip
                v-if="props.item.script_received_status == 2"
                color="white orange--text"
              >
                <b>Pending</b>
              </v-chip>
              <v-chip
                v-if="props.item.script_received_status == 1"
                color="white pink--text"
              >
                <b>Allocated</b>
              </v-chip>
            </td>
            <td class="text-xs-center" @click="openExpand(props)">
              <v-btn fab flat small>
                <v-icon medium v-if="!props.expanded"
                  >keyboard_arrow_down</v-icon
                >
                <v-icon medium v-else>keyboard_arrow_up</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card
            :color="` ${props.index % 2 == 0 ? 'red' : 'green'} lighten-4`"
            class="pa-4"
            v-if="!(props.item.examiners.length == 0)"
          >
            <template>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                >
                  <v-data-table
                    :headers="scriptDetailsHeaders"
                    :items="props.item.examiners"
                    class="elevation-1"
                    hide-actions
                    v-if="force"
                  >
                    <template v-slot:items="prop">
                      <tr :class="getClass(prop.item)">
                        <td @click="openExpand(prop)">{{ prop.index + 1 }}</td>
                        <td
                          class="text-xs-center cyan lighten-3 pa-2"
                          @click="openExpand(prop)"
                        >
                          <v-chip label class="subheading" color="white">{{
                            arrToStr(prop.item.subjects)
                          }}</v-chip>
                        </td>
                        <td class="text-xs-center cyan lighten-3 pa-2">
                          <v-chip label class="subheading" color="white">{{
                            arrToStr(prop.item.papers)
                          }}</v-chip>
                        </td>
                        <td
                          class="title text-xs-center primary--text font-weight-black"
                        >
                          {{ prop.item.examiner_type }}
                        </td>
                        <td class="text-xs-left" @click="openExpand(prop)">
                          <v-chip
                            label
                            class="subheading"
                            style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
                            >{{ prop.item.examiner_name }} ({{
                              prop.item.examiner_code
                            }})</v-chip
                          >
                        </td>
                        <td class="text-xs-left" @click="openExpand(props)">
                          <v-btn @click="sendMail(prop.item)">{{
                            prop.item.examiner_email
                          }}</v-btn>
                        </td>
                        <td
                          class="text-xs-center blue lighten-3 pa-2"
                          @click="openExpand(prop)"
                        >
                          <v-chip label class="subheading" color="white">{{
                            prop.item.total_script_qty
                          }}</v-chip>
                        </td>
                        <td
                          class="text-xs-center blue lighten-3 pa-2"
                          @click="openExpand(prop)"
                        >
                          <v-chip label class="subheading" color="white">
                            {{ prop.item.total_scan_qty }}
                          </v-chip>
                        </td>
                        <td></td>
                        <td></td>
                        <td class="text-xs-center">
                          <v-chip
                            v-if="prop.item.script_received_status == 3"
                            color="white green--text"
                          >
                            <b>Distributed</b>
                          </v-chip>
                          <v-chip
                            v-if="prop.item.script_received_status == 2"
                            color="white orange--text"
                          >
                            <b>Pending</b>
                          </v-chip>
                          <v-chip
                            v-if="prop.item.script_received_status == 1"
                            color="white pink--text"
                          >
                            <b>Allocated</b>
                          </v-chip>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </v-hover>
            </template>
          </v-card>
        </template>
      </v-data-table>
    </v-container>
    <v-layout>
      <marklist v-if="mark"></marklist>
    </v-layout>
    <composeMail
      :toMail.sync="emailList"
      :toSms.sync="smsList"
      :dialogStatus.sync="mailDialogStatus"
    ></composeMail>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import composeMail from "@/components/utils/composeMail.vue";
import marklist from "@/views/examiner/markList";
export default {
  props: ["dialogStatus"],
  components: { composeMail, marklist },
  mixins: [commonGet, commonExamYear, common_login_getters],

  data() {
    return {
      mark: false,
      monitor: true,
      mailDialogStatus: false,
      force: true,
      searchParam: {
        //exam_initiate_id: 1,
        limit: -1 // for all
      },
      subject: { subject_code: [] },
      paper: { paper_code: [] },
      paper_loading: false,
      t: null,
      v: 0,
      subPap: {
        subject_code: [],
        paper_code: [],
        paper_loading: false
      },
      smsList: [],
      emailList: [],
      examiner_type: ""
    };
  },

  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifExaminerUser) {
      this.searchParam.examiner_code = [
        this.getAuthUser.examiner.examiner_code
      ];
      this.examiner_type = this.getAuthUser.examiner.examiner_type;
      if (this.examiner_type == "E") {
        this.searchParam.nested = false;
      }
    }
    this.searchParam.examiner_type = "H";
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.$store.dispatch("fetchExaminerMonitoringData", this.searchParam);

    // /api/auth/tms-examiner
    this.$store.dispatch("fetchExaminerByTypeData", this.searchParam);
    // getExaminerItemsByType
  },

  computed: {
    getExaminerMonitoringData() {
      return this.$store.getters.getExaminerMonitoringData;
    },
    getExaminerItemsByType() {
      return this.$store.getters.getExaminerItemsByType;
    },
    getregionalCenterMap() {
      return this.$store.getters.getregionalCenterMap;
    },
    // Exama
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    scriptMasterHeaders() {
      return [
        { text: "SL", value: "sl", width: "5%", sortable: false },
        {
          text: "subjects",
          value: "subjects",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "papers",
          value: "papers",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "Type",
          value: "examiner_type",
          width: "1%",
          sortable: false,
          align: "left"
        },
        {
          text: "Examiner name",
          value: "examiner_name",
          width: "30%",
          sortable: false,
          align: "left"
        },

        {
          text: "Examiner Email",
          value: "examiner_email",
          width: "1%",
          sortable: false
        },
        {
          text: "Mobile",
          value: "mobile",
          width: "30%",
          sortable: false,
          align: "left"
        },
        {
          text: "total_script_qty",
          value: "total_script_qty",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "total_scan_qty",
          value: "total_scan_qty",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center"
        },

        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center"
        },
        {
          text: "Script Status",
          value: "papers",
          width: "5%",
          sortable: false,
          align: "center"
        },
        // {
        //   text: "SEND",
        //   value: "SEND",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "INVOICE",
        //   value: "INVOICE",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // },
        {
          text: "",
          value: "action",
          width: "5%",
          align: "center",
          sortable: false
        }
      ];
    },
    scriptDetailsHeaders() {
      return [
        { text: "SL", value: "sl", width: "5%", sortable: false },
        {
          text: "Subjects",
          value: "subjects",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "Papers",
          value: "papers",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "Type",
          value: "examiner_type",
          width: "1%",
          sortable: false,
          align: "left"
        },
        {
          text: "Examiner name",
          value: "examiner_name",
          width: "20%",
          sortable: false,
          align: "left"
        },

        {
          text: "Examiner Email",
          value: "examiner_email",
          width: "1%",
          sortable: false
        },
        {
          text: "examiner_total_qty",
          value: "examiner_total_qty",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "examiner_scan_qty",
          value: "examiner_scan_qty",
          width: "5%",
          sortable: false,
          align: "center"
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center"
        },

        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center"
        },
        {
          text: "Script Status",
          value: "papers",
          width: "5%",
          sortable: false,
          align: "center"
        }
        // {
        //   text: "SEND",
        //   value: "SEND",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "INVOICE",
        //   value: "INVOICE",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // }
      ];
    },

    myClass() {
      return {
        highlight: this.changeColor,
        shrink: !this.changeColor
      };
    }
  },
  methods: {
    //new report
    downloadReport() {
      this.$store.dispatch("exportExaminerHeadwise", this.searchParam);
    },
    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.examiner_mobile);
        this.emailList.push(item.examiner_email);
      } else {
        this.getExaminerMonitoringData.forEach(item => {
          this.smsList.push(item.examiner_mobile);
          this.emailList.push(item.examiner_email);
        });
      }
      console.log("tosms ", this.emailList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    removeSearchSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "removeSearchSubject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },

    openExpand(props) {
      props.expanded = !props.expanded;
    },
    remove(arr, item) {
      console.log(arr);
      console.log(item);
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    searchMarkList() {
      this.mark = true;
      this.monitor = false;
    },
    searchMonitoring() {
      this.mark = false;
      this.monitor = true;
      this.searchData();
    },
    searchData() {
      this.$store.dispatch("fetchExaminerMonitoringData", this.searchParam);
    },
    getClass(item) {
      return item.max_total_packet < item.current_total_packet
        ? "red white--text"
        : "white black--text";
    },
    arrToStr(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str = str + arr[i].title;
        if (i != arr.length - 1) str = str + ", ";
      }
      return str;
    }
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    }
  }
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
