<template>
  <v-container fluid>
    <!-- {{getCenterList}} -->
    <v-container fluid style="padding:10px">
      <v-layout row class="mb-2">
        <v-flex xs11>
          <v-autocomplete
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
                disabled
                close
                @input="searchParam.reg_center_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
              >{{ data.item.center_name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.center_name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs11>
          <v-autocomplete
            class="mx-2"
            outline
            v-model="searchParam.subject_code"
            :items="getSubjectList"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            label="Select Subject"
            persistent-hint
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.subject_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
              >{{ data.item.code + " - " + data.item.title }}</v-chip>
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
        <v-flex xs11>
          <v-autocomplete
            outline
            class="mx-2"
            v-model="searchParam.paper_code"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            :items="getPaperList"
            menu-props="auto"
            label="Select Course"
            hide-details
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.paper_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
              >{{ data.item.code + " - " + data.item.title }}</v-chip>
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
        <v-flex xs11>
          <v-text-field
            name="challan_no"
            label="Challan "
            v-model="searchParam.challan_no"
            prepend-inner-icon="edit"
            outline
          ></v-text-field>
        </v-flex>
        <v-flex xs11 v-if="true">
          <v-autocomplete
            class="mx-2"
            outline
            v-model="searchParam.rc_receive_status"
            :items="[
              { code: -1, title: 'All' },
              { code: 1, title: 'Recieveed' },
              { code: 0, title: 'Not Recieveed' },
            ]"
            :item-text="(item) => item.title"
            item-value="code"
            label="Select Status"
            persistent-hint
            prepend-inner-icon="edit"
          >
            <template v-slot:selection="data">
              <b>{{ data.item.title }}</b>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-layout align-center justify-center row fill-height>
            <v-btn style="margin-top:-2em" fab class="primary" @click="fetchRegAsCollFromNuData()">
              <v-icon>search</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout justify-center row fill-height align-center>
        <v-card
          width="800px"
          v-if="
            searchParam.challan_no && (challan.length || challan.challan_no)
          "
        >
          <v-toolbar dark color="primary">
            <v-toolbar-title class="title">Challan Info</v-toolbar-title>
          </v-toolbar>
          <v-card class="pa-2">
            <v-flex class="mx-2">
              <v-layout justify-center row fill-height align-center>
                <v-list>
                  <!-- v-for="(item, index) in challan" :key="index" -->
                  <v-list-tile class="ma-2">
                    <v-list-tile-action>
                      <v-icon color="indigo" medium>receipt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title style="font-size:1.2em;">Challan No:</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-content style="font-size:1.2em;" class="align-end">
                      {{ challan.challan_no }}
                      <!-- {{item}} -->
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile class="ma-2">
                    <v-list-tile-action>
                      <v-icon color="indigo" medium>today</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title style="font-size:1.2em;">Challan Date:</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-content
                      style="font-size:1.2em;"
                      class="align-end"
                    >{{ getFormatedDate(challan.challan_date) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile class="ma-2">
                    <v-list-tile-action>
                      <v-icon color="indigo" medium>person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title style="font-size:1.2em;">Receiver Name:</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-content
                      style="font-size:1.2em;"
                      class="align-end"
                    >{{ challan.receiver_name }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile class="ma-2">
                    <v-list-tile-action>
                      <v-icon color="indigo" medium>account_balance</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title style="font-size:1.2em;">Receiver Designation:</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-content
                      style="font-size:1.2em;"
                      class="align-end ml-3"
                    >{{ challan.receiver_designation }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-list>
              </v-layout>
            </v-flex>
          </v-card>
        </v-card>
      </v-layout>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Ans Script Receive ( Reg From NU )</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <!-- <v-btn color="primary" @click="downloadListNUtoREG()"
              >Report Download</v-btn
            >-->
          </v-layout>
        </v-card>
        <v-data-table
          v-model="selected"
          item-key="id"
          select-all
          :loading="loading"
          :headers="nuHeaders"
          :items="getRegAsCollFromNuData"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <tr>
              <td class="text-xs" style="padding: 0 10px;">
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                  :disabled="!challan.length || !challan.challan_no"
                  v-if="props.item.rc_receive_status != 1"
                ></v-checkbox>
                <v-icon v-else>highlight_alt</v-icon>
              </td>

              <td>{{ sl_count + props.index }}</td>

              <td class="text-xs-left">
                <v-chip color="transparent">
                  {{ props.item.subject_code }} -
                  {{ props.item.subject_name }}
                </v-chip>
              </td>
              <td class="text-xs-left">
                <v-chip color="transparent">
                  {{ props.item.paper_code }} -
                  {{ props.item.paper_name }}
                </v-chip>
              </td>

              <td class="text-xs-left">{{ props.item.total_packet }}</td>
              <!-- <td>{{props.item.total_script}}</td> -->
              <td class="text-xs-center">
                <div v-if="props.item.rc_receive_status == 1">
                  <!-- <v-tooltip bottom> -->
                  <!-- <template v-slot:activator="{ on }"> -->
                  <v-chip disabled color="cyan white--text">
                    <b>Received By RC</b>
                  </v-chip>
                  <!-- </template> -->
                  <!-- <span>
                      <span style="font-size:1.2em;">
                        Received By {{ props.item.rc_receiver_name }} On Date:
                        {{ getFormatedDate(props.item.rc_received_at) }}
                      </span>
                    </span>
                  </v-tooltip>-->
                </div>
                <div v-else>
                  <v-chip disabled color="white cyan--text">
                    <b>Not Received</b>
                  </v-chip>
                </div>
              </td>

              <td class="text-xs-center">
                <div v-if="props.item.rc_receive_status == 1">
                  <v-chip disabled color="cyan white--text">
                    <b>{{ props.item.rc_receiver_name }}</b>
                    <span>
                      - Date:
                      {{ getFormatedDate(props.item.rc_received_at) }}
                    </span>
                  </v-chip>
                </div>
                <div v-else>
                  <!-- <v-chip disabled color="white cyan--text"> -->
                  <b>-</b>
                  <!-- </v-chip> -->
                </div>
              </td>

              <td class="text-xs-center">
                {{ props.item.challan_no }} -
                {{ getFormatedDate(props.item.challan_date) }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>

      <v-layout justify-center row fill-height align-center>
        <v-flex v-if="selected.length && (challan.length || challan.challan_no)" class="mx-2">
          <v-layout justify-end row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              round
              class="mt-3"
              color="primary"
              @click="downloadListNUtoREG()"
            >Download List</v-btn>
          </v-layout>
        </v-flex>
        <v-flex v-if="selected.length  && (challan.length || challan.challan_no)" class="mx-2">
          <v-layout justify-start row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              round
              class="mt-3"
              color="success"
              @click="postAnsScriptRcToNuRecieve()"
            >Recieve</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider class="mt-3" />
    </v-container>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Subject-wise Summary</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        :loading="loading"
        :headers="summHeaders"
        :items="getRegAsCollFromNuSummData"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr>
            <td>{{ sl_count + props.index }}</td>

            <td class="text-xs-left">
              <v-chip color="transparent">
                {{ props.item.subject_code }} -
                {{ props.item.subject_name }}
              </v-chip>
            </td>

            <td class="text-xs-left">{{ props.item.total_packet }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-btn
        @click="allotmentReport_RC_Recieve_ExaminerByHeadExaminer()"
      >( received ) head examiner wise examiner</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import moment from "moment";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],

  props: {
    rcToNu: Boolean,
    examiner: Boolean,
  },
  data() {
    return {
      challan: [],
      currentExaminer: {},
      tsDialog: false,
      selected: [],
      reportDialog: false,
      ifRc: false,
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      receiverDialog: false,
      sl_count: 1,
      searchParam: {
        reg_center_code: "",
      },
      summHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "5%",
        },

        {
          text: "Subject",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },
      ],
      nuHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "3%",
        },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          sortable: false,
          width: "15%",
        },

        {
          text: "Course",
          value: "paper_code",
          sortable: false,
          width: "20%",
          align: "center",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "5%",
          align: "center",
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "10%",
        },
        {
          text: "Received By",
          value: "rc_receiver_name",
          sortable: false,
          align: "center",
          width: "20%",
        },
        {
          text: "Chalan",
          value: "challan_no",
          sortable: false,
          align: "center",
          width: "20%",
        },
      ],
      recieverBox: false,
      reciever: {},
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };

    this.initialize();
    this.$store.dispatch("fetchRegCenterData");
    if (this.ifRegionalUser) {
      this.searchParam.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
  },
  computed: {
    getRegAsCollFromNuData() {
      return this.$store.getters.getRegAsCollFromNuData;
    },
    getRegAsCollFromNuSummData() {
      return this.$store.getters.getRegAsCollFromNuSummData;
    },
  },

  methods: {
    getParam() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.exam_year = this.getLoggedInYear.year;
      return param;
    },

    downloadListNUtoREG() {
      let arr = [];
      let paper_arr = [];
      this.selected.forEach((obj) => {
        if (parseInt(obj.rc_receive_status) != 1) {
          arr.push(obj.examiner_code);
          paper_arr.push(obj.paper_code);
        }
      });

      // if (arr.length != 0) {
      let param = this.getParam();
      param.reg_center_code = this.searchParam.reg_center_code;

      this.$root
        .$confirm("Are you sure that you want to Recieve? ")
        .then((confirm) => {
          if (confirm) {
            param.examiner_code = arr;
            param.paper_code = paper_arr;
            this.$store
              .dispatch("nuAnsScriptDistNuToRegReportApi", param)
              .then((res) => {});
          }
        });
      // } else {
      //   this.$store.commit("SET_SNACKBAR", {
      //     msg: "No data",
      //     color: "red",
      //   });
      // }
    },

    postAnsScriptRcToNuRecieve() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Receive?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            self.selected.forEach((obj) => {
              try {
                if (parseInt(obj.rc_receive_status) != 1) {
                  arr.push(obj);
                }
              } catch (er) {
                console.error("here ?/");
              }
              console.log("arr", arr);
            });

            if (!arr.length) {
              self.$store.commit("SET_SNACKBAR", {
                msg: "No data",
                color: "red",
              });
            } else {
              self.selected = arr;

              self.$store
                .dispatch("receiveAnsScriptRcToNuRecieve", self.selected)
                .then((res) => {
                  console.log("in ----/// --- return then", res);
                  self.fetchRegAsCollFromNuData();
                });
            }
          }
        });
    },

    getFormatedDate(date) {
      if (date === null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    fetchRegAsCollFromNuData() {
      this.loading = true;
      var that = this;
      this.setLimit();
      console.log("fetchRegAsCollFromNuData -2");
      this.$store
        .dispatch("fetchRegAsCollFromNuData", this.searchParam)
        .then((data) => {
          console.log("fetchRegAsCollFromNuData -2", data);
          that.loading = false;
          that.sl_count = data.links.from;
          that.pagination.totalItems = data.links.total;
          that.selected = [];
          that.challan = data.challan_info;
          //that.tsDialog = false;
          //that.setDefaultPacketSize();
        });
    },
    allotmentReport_RC_Recieve_ExaminerByHeadExaminer() {
      let param = this.getParam();
      if (this.searchParam.reg_center_code) {
        param.reg_center_code = this.searchParam.reg_center_code;
        param.rc_receive_status = 1;
        param.year = this.getLoggedInYear.year;
        this.$store.dispatch("downloadAllotmentReport", param);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Reg Center Selected",
          color: "red",
        });
      }
    },
  },
  watch: {
    pagination() {
      console.log("fetchRegAsCollFromNuData -2");
      this.fetchRegAsCollFromNuData();
    },
  },
};
</script>
<style lang="scss">
.distributeSectionCSS {
  // color: red !important;
  background-color: #00838f !important;
}
// .custDTSelection {
// .theme--light .v-table tbody tr[active] {
//   background: pink !important;
// }
// }
</style>
