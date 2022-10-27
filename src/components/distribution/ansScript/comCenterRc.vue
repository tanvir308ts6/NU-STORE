<template>
  <v-container fluid>
    <!-- {{rcToCenter}} -->
<!-- {{searchParam}} -->
    <v-dialog v-model="tsDialog" fullscreen>
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Script Packaging</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="tsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <toDayScript :dialogStatus="tsDialog" />
      </v-card>
    </v-dialog>

    <!-- {{getCenterList}} -->
    <v-container fluid style="padding:10px">
      <v-layout v-if="!ifCenterUser" row class="mb-2">
        <v-flex xs12>
          <v-autocomplete
            v-model="searchParam.center_code"
            :items="getCenterList"
            :item-text="item => item.center_code + ' - ' + item.center_name"
            item-value="center_code"
            label="Select Center"
            persistent-hint
            prepend-icon="library_books"
            outline
            hide-details
            @change="searchCenterWiseDistributionData($event)"
          >
            <template v-slot:selection="data">
              <v-chip
                color="#FAFAFA"
                close
                @input="removecen()"
                :selected="data.selected"
                class="chip--select-multi"
                >{{
                  data.item.center_code + " - " + data.item.center_name
                }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="
                      data.item.center_code + ' - ' + data.item.center_name
                    "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <!-- rcToCenter -->
        <v-flex xs12 v-if="rcToCenter">
          <v-autocomplete
            :disabled="ifRegionalUser"
            class="mx-2"
            hide-details
            label="Select Regional Center"
            item-text="center_name"
            item-value="regional_center_code"
            v-model="searchParam.reg_center_code"
            :items="getRegCenList"
            v-validate="'required'"
            :error-messages="errors.collect('reg_center_code')"
            data-vv-name="reg_center_code"
            required
            prepend-inner-icon="edit"
            outline
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.reg_center_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
                >{{ data.item.center_name }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
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
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-btn
            color="primary"
            large
            @click="searchCenterWiseDistributionData()"
            >search</v-btn
          >
        </v-flex>
        <!-- <v-flex v-if="!rcToCenter" xs2 class="text-xs-center">
          <v-layout justify-center row fill-height align-center>
            <v-btn color="primary" outline @click="downloadASReportBYCenter()">report</v-btn>
          </v-layout>
        </v-flex>-->
      </v-layout>

  
     <!-- {{searchParam}} -->
      <!-- <v-container fluid v-if="ifCenterUser">
        <v-card dark>
          <v-card-text class="subheading">Attendance Summary :</v-card-text>
          <v-layout
            align-center
            justify-center
            row
            fill-height
            class="my-2 mb-2 pb-2"
          >
            <v-flex></v-flex>
            <v-flex>
              <v-menu
                v-model="datePickerModel"
                :close-on-content-click="false"
                full-width
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    color="cyan"
                    dark
                    class="ma-2"
                    :value="getFormatedDate(searchParam2.date)"
                    label="Pick a - date"
                    readonly
                    v-on="on"
                    outline
                    hide-details
                    prepend-icon="calendar_today"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="searchParam2.date"
                  @change="searchsummary"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex></v-flex>
         
            <v-flex>
              <v-btn
                color="primary"
                class="white--text"
                @click="exportSubPapSummary()"
                v-if="searchParam.center_code"
              >
                <v-icon left dark>arrow_downward</v-icon>Export Sub/Paper-wise
              </v-btn>
              <v-btn
                color="primary"
                class="white--text"
                @click="exportRoomInviSummary()"
                v-if="searchParam.center_code"
              >
                <v-icon left dark>arrow_downward</v-icon>Export
                Room/Inivigilator-wise
              </v-btn>
            </v-flex>
            <v-flex></v-flex>
          </v-layout>
        </v-card>
        <v-card color="white" class="mt-5">
          <v-layout row>
            <v-card flat>
              <v-badge left overlap>
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    fab
                    small
                    style="margin-top: -1.5em;"
                    class="elevation-0"
                    v-if="pagination2.totalItems"
                    >{{ pagination2.totalItems }}</v-btn
                  >
                </template>
                <v-card-text class="title"
                  >Attendance Summary By Center</v-card-text
                >
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-btn
              color="blue-grey"
              class="white--text"
              @click="exportSummary()"
            >
              <v-icon left dark>arrow_downward</v-icon>Export
            </v-btn>
          </v-layout>
        </v-card>
        <v-data-table
          class="elevation-1"
          :headers="headers2"
          :items="attSummaryByCenterList"
          :loading="loading2"
          :pagination.sync="pagination2"
          :total-items="pagination2.totalItems"
          :rows-per-page-items="pagination2.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ sl_count2 + props.index }}</td>
            <td class="text-xs-left">{{ props.item.attendance_date }}</td>
            <td class="text-xs-left">
              {{ props.item.exam_code }} - {{ props.item.exam_name }}
            </td>
            <td class="text-xs-center">{{ props.item.year }}</td>
            <td class="text-xs-left">
              {{ props.item.center_code }} - {{ props.item.center_name }}
            </td>
            <td class="text-xs-center">{{ props.item.total_student }}</td>
            <td class="text-xs-center">{{ props.item.present_student }}</td>
            <td class="text-xs-center">{{ props.item.absent_student }}</td>
            <td class="text-xs-center">{{ props.item.reported_student }}</td>
          </template>
        </v-data-table>

      </v-container>
      Search: -->
      <v-layout>
        <!-- <v-flex xs3>
           <v-select
          clearable
          v-model="searchParam.script_type"
          :items="[
            { name: 'Script', script_type: '1' },
            { name: 'E Type', script_type: '2' },
            { name: 'Expeled Type', script_type: '3' },
          ]"
          :item-text="(item) => '' + item.name + ''"
          item-value="script_type"
          label="Search By Type"
          outline
        ></v-select>
        </v-flex> -->
        <!-- <v-flex xs3>
          <v-select
            v-model="searchParam.year"
            :items="[]"
            :item-text="item => '' + item.year + ''"
            item-value="year"
            label="Search By Course"
            outline
          ></v-select>
        </v-flex>
        <v-flex xs3>
          <v-select
            v-model="searchParam.year"
            :items="[]"
            :item-text="item => '' + item.year + ''"
            item-value="year"
            label="Search By Status"
            outline
          ></v-select>
        </v-flex>
        <v-flex xs3>
          <v-select
            v-model="searchParam.year"
            :items="[]"
            :item-text="item => '' + item.year + ''"
            item-value="year"
            label="Search By Date"
            outline
          ></v-select>
        </v-flex> -->
      </v-layout>

      </v-container>

      <v-container fluid style="padding-bottom:0px">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">
                Ans Script Delivery ..
                <span v-if="!rcToCenter">Status ( Center Shipment Panel )</span>
                <span v-else>information for Regional Center ...</span>
              </v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn
              large
              v-if="!rcToCenter"
              color="primary"
              @click="tsDialog = true"
              >Today Scrpt</v-btn
            >
          </v-layout>
        </v-card>
       
        <v-data-table
          v-model="selected"
          item-key="id"
          select-all
          :loading="loading"
          :headers="getHeaders"
          :items="getAnsScriptPaperDataAtCenterRc"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <tr :style="getTrStyle(props.item.receive_status)">
              <td class="text-xs-left">
                <div v-if="props.item.receive_status == 1">
                  <v-icon>highlight_alt</v-icon>
                </div>
                <div v-else>
                  <div class="text-xs" >
                    <!-- {{props.item.distribute_status}} -->
                    <!-- <v-icon v-if="!props.item.distribute_status == 1">highlight_alt</v-icon> -->
                    <v-checkbox v-model="props.selected" primary hide-details ></v-checkbox>
                  </div>
                </div>
              </td>
              <td class="text-xs" style=" padding-left: 20px;">
                {{ sl_count + props.index }}
              </td>
              <td class="text-xs-left">
                <v-chip
                  label
                  text-color="black"
                  color="transparent"
                  style="padding: 0 0px !important;"
                >
                  ({{ props.item.center_code }})
                  {{ props.item.center_name }}
                </v-chip>
              </td>
              <td class="text-xs-left" v-if="!rcToCenter">
                <v-chip
                  label
                  text-color="black"
                  color="transparent"
                  style="padding: 0 0px !important;"
                  >{{ getFormatedDate(props.item.created_at) }}</v-chip
                >
              </td>

              <td class="text-xs-left">
                <v-chip
                  label
                  text-color="black"
                  color="transparent"
                  style="padding: 0 0px !important;"
                >
                  ({{ props.item.paper_code }})
                  {{ props.item.paper_name }}
                </v-chip>
              </td>
              <td class="text-xs-left">{{ props.item.total_script }}</td>
              <td class="text-xs-left">{{ props.item.total_packet }}</td>

              <td class="text-xs-center">
                {{props.item.status_name}}
                <!-- <div v-if="props.item.receive_status == 1">
                  <v-chip color="yellow black--text">
                    <b>Recieved By RC</b>
                  </v-chip>
                </div>
                <div v-else>
                  <div v-if="props.item.distribute_status == 1">
                    <v-chip color="white orange--text">
                      <b>AT RC</b>
                    </v-chip>
                  </div>
                  <div v-else>
                    <div v-if="props.item.treasury_status == 1">
                      <v-chip color="white green--text">
                        <b>AT TREAGERY</b>
                      </v-chip>
                    </div>
                    <div v-else>
                      <v-chip color="white cyan--text">
                        <b>AT Center</b>
                      </v-chip>
                    </div>
                  </div>
                </div> -->
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>

      <v-dialog v-model="receiverDialog" width="500" persistent>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="title">Receiver's Info</v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-2">
          <div class="pb-3">
            <v-text-field
              class="pa-2"
              label="Name"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Title"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Inistitution Name"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Phone"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              class="pa-2"
              label="Email"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
          </div>
          <v-divider />
          <div class="text-xs-center py-3">
            <v-btn outline color="primary" @click="receiverDialog = false"
              >Save</v-btn
            >
          </div>
        </v-card>
      </v-dialog>

      <div class="text-xs-center ma-2 pb-2" v-if="selected.length">
        <v-btn
          v-if="!rcToCenter"
          color="primary"
          @click="downloadASChalanBYCenterByPaper()"
          class="mt-3"
          >Download Chalan</v-btn
        >
      </div>
      <v-layout class="mt-2" justify-center row fill-height align-center v-if="selected.length!=0">
        <v-flex >
          <v-layout justify-center row fill-height align-center>
            <v-flex>
              <v-layout justify-end row fill-height align-center>
                <v-btn
                  large
                  round
                  class="ma-4"
                  color="primary"
                  @click="downloadASListBYCenterByPaper()"
                  >Download List</v-btn
                >
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout justify-start row fill-height align-center>
                <v-btn
                  large
                  round
                  class="ma-4"
                  color="green white--text"
                  @click="postAnsScriptRcToCenterRecieve()"
                >Recieve </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
       <!-- <pre> {{getAnsScriptPaperDataAtCenterRc[0]}} </pre> -->
    </v-container>
    <!-- <pre> {{ getAnsScriptPaperDataAtCenterRc }} </pre> -->
    <!--   <pre>{{searchParam}} </pre>-->
    
  </v-container>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import toDayScript from "@/views/center/treasury.vue";
import moment from "moment";

export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formNotification,
    toDayScript,
  },
  props: {
    rcToCenter: Boolean,
  },
  data() {
    return {
      pagination2: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading2: false,
      sl_count2: 0,
      searchparam: {
        script_type: 1,
        reg_center_code: 104,
        center_code: 101,
      },

      headers2: [
        {
          text: "SL",
          value: "sl",
          align: "left",
          sortable: false,
          width: "1%",
        },
        {
          text: "Attendance Date",
          value: "attendance_date",
          align: "left",
          width: "2%",
        },
        { text: "Exam", value: "exam_name", align: "left", width: "5%" },
        { text: "Year", value: "year", align: "center", width: "1%" },
        { text: "Center", value: "center_code", align: "left", width: "20%" },
        {
          text: "Total Candidate",
          value: "total_student",
          align: "center",
          width: "3%",
        },
        {
          text: "Total Present ",
          value: "present_student",
          align: "center",
          width: "3%",
        },
        {
          text: "Total Absent ",
          value: "absent_student",
          align: "center",
          width: "3%",
        },
        {
          text: "Total Reported ",
          value: "reported_student",
          align: "center",
          width: "3%",
        },
      ],
      selectedReg: "",
      tsDialog: false,
      selected: [],
      reportDialog: false,
      ifRc: false,
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      receiverDialog: false,
      sl_count: 1,
      searchParam: {},
      datePickerModel: false,
      searchParam2: {
        date: new Date().toISOString().substr(0, 10),
      },
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "20%",
        },
        {
          text: "Center",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        {
          text: " Date",
          value: "center_name",
          sortable: false,
          width: "30%",
        },
        {
          text: " Course",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        // { text: "District", value: "district_name", sortable: false },

        {
          text: "Total Script",
          value: "total_script",
          sortable: false,
          width: "20%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },

        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "20%",
        },
      ],
      rcHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "10%",
        },
        {
          text: "Center",
          value: "center_name",
          sortable: false,
          width: "30%",
          align: "left",
        },
        {
          text: "Course",
          value: "paper_code",
          sortable: false,
          width: "30%",
          align: "left",
        },
        {
          text: "Total Script",
          value: "total_script",
          sortable: false,
          width: "10%",
          align: "left",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "10%",
          align: "left",
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "20%",
        },
      ],
    };
  },
  created() {
    this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
    var limit = {
      page: 1,
      limit: 1000,
    };

    // center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }

    this.initialize();
    this.$store.dispatch("fetchRegCenterData");
    if (this.ifRegionalUser) {
      this.searchParam.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
    }

    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }

    // this.searchParam.center_code = 101;
    // this.searchParam.reg_center_code = 104 ;
    this.searchParam.script_type = 1;

    // if (this.searchParam.center_code) {
    //   this.fetchAnsScriptPaperDataAtCenterRc();
    // } else {
    //   console.log("Not fetching at Created ");
    // }
  },
  computed: {
    getAnsScriptPaperDataAtCenterRc() {
      return this.$store.getters.getAnsScriptPaperDataAtCenterRc;
    },
    getHeaders() {
      console.log("this.rcToCenter:", this.rcToCenter);
      if (this.rcToCenter) {
        return this.rcHeaders;
      } else {
        return this.headers;
      }
    },

    ifShowRegSection() {
      console.log();
      let x = this.getRegFromSearchParam[0];
      if (x == undefined) return false;
      if (x == "") return false;
      else return true;
    },

    getRegFromSearchParam() {
      return [this.searchParam.reg_center_code];
    },
    getCenterWiseDistCenterList() {
      return [
        { id: 1, status: 2 },
        { id: 2, status: 2 },
        { id: 3, status: 5 },
        { id: 4, status: 2 },
        { id: 5, status: 5 },
      ];
      //   return this.$store.getters.getCenterWiseDistCenterList;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },
    //att. summary centerwise
    attSummaryByCenterList() {
      return this.$store.getters.attSummaryByCenterList;
    },
  },

  methods: {
    getTrStyle(status) {
      if (status == 1) {
        return " background-color: #00e689;";
      }
    },
    searchsummary() {
      this.datePickerModel = false;
      this.centerWiseAttSummaryList();
    },
    removecen() {
      console.log("to to");
      this.searchParam.center_code = "";
      this.centerWiseAttSummaryList();
    },
    setLimit2() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination2;
      this.searchparam.page = page;
      this.searchparam.limit = rowsPerPage;
      this.searchparam.sortBy = sortBy;
      this.searchparam.search = this.search;
    },
    centerWiseAttSummaryList() {
      this.searchparam.attendance_date = this.searchParam2.date;
      this.searchparam.exam_initiate_id = this.getExamInitiateId;
      this.searchparam.year = this.getLoggedInYear.year;
      this.searchparam.exam_code = this.getLoggedInExam.code;
      if (this.ifCenterUser) {
        this.searchparam.center_code = this.getAuthUser.center.center_code;
      } else {
        this.searchparam.center_code = this.searchParam.center_code;
      }
      this.loading2 = true;
      this.setLimit2();
      var that = this;
      this.$store
        .dispatch("attSummaryCenterwiseData", this.searchparam)
        .then((data) => {
          console.log("d", data);
          try {
            that.loading2 = false;
            that.sl_count2 = data.meta.from;
            that.pagination2.totalItems = data.meta.total;
          } catch (ex) {
            console.log("....", ex);
          }
        });
    },
    exportSummary() {
      var param = {};
      param.download = true;
      param.attendance_date = this.searchParam2.date;
      param.exam_initiate_id = this.getExamInitiateId;
      param.year = this.getLoggedInYear.year;
      param.exam_code = this.getLoggedInExam.code;
      if (this.ifCenterUser) {
        param.center_code = this.getAuthUser.center.center_code;
      } else {
        param.center_code = this.searchParam.center_code;
      }
      this.$store.dispatch("exportSummary", param);
    },
    setExportParam() {
      if (this.ifCenterUser) {
        this.searchParam2.center_code = this.getAuthUser.center.center_code;
      } else {
        this.searchParam2.center_code = this.searchParam.center_code;
      }
      this.searchParam2.datetime = this.searchParam2.date;
      this.searchParam2.exam_initiate_id = this.getExamInitiateId;
      this.searchParam2.exam_code = this.getLoggedInExam.code;
      this.searchParam2.year = this.getLoggedInYear.year;
    },
    exportSubPapSummary() {
      // console.log("....");
      this.setExportParam();
      this.$store.dispatch("exportSummaryBySubPaper", this.searchParam2);
    },
    exportRoomInviSummary() {
      // console.log("....");
      this.setExportParam();
      this.$store.dispatch("exportSummaryByRoomInvi", this.searchParam2);
    },
    getParam() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      return param;
    },
    downloadASReportBYCenter() {
      let param = this.getParam();
      param.center_code = this.searchParam.center_code;
      this.$store.dispatch("download_AS_StmReport", param).then((res) => {});
    },
    downloadASChalanBYCenterByPaper() {
      let param = this.getParam();
      param.center_code = this.searchParam.center_code;
      let paperArr = [];
      this.selected.forEach((obj) => {
        if (obj.distribute_status != 1) {
          console.log("in ----/// --- return then", obj);
          paperArr.push(obj.paper_code);
        }
      });
      param.paper_code = paperArr;
      this.$store.dispatch("download_AS_StmReport", param).then((res) => {});
    },
    downloadASListBYCenterByPaper() {
      let param = this.getParam();
      param.center_code = this.searchParam.center_code;
      param.reg_center_code = this.searchParam.reg_center_code;
      let paperArr = [];
      this.selected.forEach((obj) => {
        console.log("in ----/// --- return then", obj);
        if (obj.receive_status) {
          // console.log("in ----/// --- return then", obj.distribute_status);
        } else {
          paperArr.push(obj.paper_code);
        }
      });
      // regCenAnsScriptCollFromCenDownload
      param.paper_code = paperArr;
      this.$store
        .dispatch("download_AS_StmReport_DOWNLOADLIST", param)
        .then((res) => {});
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    postAnsScriptRcToCenterRecieve() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (obj.distribute_status == 1) {
                console.log("in ----/// --- return then", obj);
                arr.push(obj);
              }
            });
            // this.selected = arr;
            console.log("sajhflkjdsahflkjh--->", arr);
            this.$store
              .dispatch("postAnsScriptRcToCenterRecieve", this.selected)
              .then((res) => {
                console.log("in ----/// --- return then", res);
                this.fetchAnsScriptPaperDataAtCenterRc();
                // self.fetchTreasuryData();
              });
          }
        });
    },
    postAnsScriptCenterToRc() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            this.selected.forEach((obj) => {
              obj.reg_center_code = this.selectedReg;
            });

            this.$store
              .dispatch("postAnsScriptCenterToRc", this.selected)
              .then((res) => {
                console.log("in ----/// --- return then", res);
                this.fetchAnsScriptPaperDataAtCenterRc();
                // self.fetchTreasuryData();
              });
          }
        });
    },
    getRightStyle(item) {
      if (parseInt(item.treasury_status) == 1) {
        return "background-color: #b2ebf2;";
      } else if (parseInt(item.distribute_status) == 1) {
        return "background-color: #4dd0e1;";
      } else {
        return "background-color: #e0f7fa;";
      }
      //
    },
    fetchAnsScriptPaperDataAtCenterRc() {
      this.loading = true;
      this.$store
        .dispatch("fetchAnsScriptPaperDataAtCenterRc", this.searchParam)
        .then(() => {
          this.selected = [];
          this.loading = false;
          if (
            parseInt(this.getAnsScriptPaperDataAtCenterRc[0].packet_size) == 0
          ) {
            this.func_ms_packetSize();
          }
          // this.func_ms_packetSize();
        });
    },

    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    addReceiverInfo(item) {
      item.receiver = {};
      item.receiver.name = "";
      item.receiver.title = "";
      item.receiver.phone = "";
      item.receiver.email = "";
      this.receiverDialog = true;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchCenterWiseDistributionData(val) {
      if (val) {
        this.centerWiseAttSummaryList();
      }
      // if (this.searchParam.center_code) {
      if (this.rcToCenter) {
        if (this.searchParam.reg_center_code) {
          this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
          this.loading = true;
          this.setLimit();
          this.$store
            .dispatch("fetchAnsScriptPaperDataAtCenterRc", this.searchParam)
            .then((data) => {
              console.log(data);
              this.loading = false;
              this.sl_count = data.from;
              this.pagination.totalItems = data.total;
            });
        } else {
          this.$store.commit("SET_SNACKBAR", {
            msg: "Reg Center not selected",
            color: "red",
          });
        }
      } else {
        this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
        this.searchParam.td_status = 1;
        // this.searchParam.treasury_status = 1;
        this.loading = true;
        this.setLimit();
        this.$store
          .dispatch("fetchAnsScriptPaperDataAtCenterRc", this.searchParam)
          .then((data) => {
            console.log(data);
            this.loading = false;
            this.sl_count = data.from;
            this.pagination.totalItems = data.total;
          });
      }
      // } else {
      //   this.$store.commit("SET_SNACKBAR", {
      //     msg: "Center not selected  ... ?/",
      //     color: "red",
      //   });
      //   this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
      //   console.log("Not fetching at Created ");
      // }
    },
  },
  watch: {
    pagination2() {
      this.centerWiseAttSummaryList();
    },
    pagination() {
      this.searchCenterWiseDistributionData();
    },
    tsDialog(val) {
      console.log("tsDialog-->", val);
      if (!val) {
        this.searchCenterWiseDistributionData();
      }
    },
  },
};
</script>
<style scoped></style>
