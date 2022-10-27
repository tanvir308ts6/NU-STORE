<template>
  <v-container fluid>
    <!-- here ?? -->
    <!-- {{ searchParam }} -->
    <!-- .......... -->
    <v-dialog v-model="tsDialog" fullscreen>
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Center wise paper details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="tsDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card></v-card>
    </v-dialog>

    <!-- {{ ifCenterUser }} -->
    <v-container fluid style="padding: 10px">
      <v-layout>
        <v-autocomplete
          :disabled="ifCenterUser"
          v-model="searchParam.center_code"
          :items="getCenterList"
          :item-text="(item) => item.center_code + ' - ' + item.center_name"
          item-value="center_code"
          label="Select Center"
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
                  v-html="data.item.center_code + ' - ' + data.item.center_name"
                ></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>

        <v-autocomplete
          hide-details
          label="Select Regional Center"
          item-text="center_name"
          item-value="regional_center_code"
          v-model="searchParam.reg_center_code"
          :items="getRegCenList"
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

        <v-autocomplete
          v-model="searchParam.paper_code"
          :item-text="(item) => item.code + ' - ' + item.title"
          item-value="code"
          :items="getPaperList"
          menu-props="auto"
          label="Search By Paper"
          outline
          hide-details
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
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
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
        <v-autocomplete
          v-model="searchParam.delivery_status_id"
          :items="getDeliveryOptionsData"
          :item-text="(item) => item.delivery_name"
          item-value="options.id"
          label="Select delivery options"
          outline
        >
          <template v-slot:selection="data">
            <v-chip :selected="data.selected" class="chip--select-multi">{{
              data.item.options.delivery_name
            }}</v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title
                  v-html="data.item.options.delivery_name"
                ></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
        <v-menu
          v-model="datePickerModel"
          :close-on-content-click="false"
          full-width
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="getFormatedDate(searchParam.datetime)"
              label="Pick a - date"
              readonly
              v-on="on"
              outline
              hide-details
              clearable
              @click:clear="ondateClear"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="searchParam.datetime"
            @change="datePickerModel = false"
          ></v-date-picker>
        </v-menu>
        <v-btn color="primary" @click="fetchAnsScriptPaperDataAtRcNu()"
          >search</v-btn
        >
      </v-layout>
      <!-- <v-layout row class="mb-2">
        <v-flex xs12>
          <v-autocomplete
            v-model="searchParam.center_code"
            :items="getCenterList"
            :item-text="(item) => item.center_code + ' - ' + item.center_name"
            item-value="center_code"
            label="Select Center"
            persistent-hint
            prepend-icon="library_books"
            outline
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                color="#FAFAFA"
                close
                @input="searchParam.center_code = ''"
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

        <v-flex xs3>
          <v-btn color="primary" @click="fetchAnsScriptPaperDataAtRcNu()"
            >search</v-btn
          >
        </v-flex>
      </v-layout> -->

      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text v-if="!nuToRc" class="title"
                >Ans Script Distribution ( Reg to NU )</v-card-text
              >
              <v-card-text v-if="nuToRc" class="title"
                >Ans Script Recieve ( Monitoring Panel )</v-card-text
              >
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <!-- <v-btn color="primary" @click="tsDialog=true">Today Scrpt</v-btn> -->
          </v-layout>
        </v-card>

        <v-data-table
          v-model="selected"
          item-key="id"
          select-all
          :loading="loading"
          :headers="nuHeader"
          :items="getAnsScriptPaperDataAtCenterRc"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <tr>
              <td class="text-xs-left">
                <div
                  v-if="
                    props.item.delivery_status_id == 5 ||
                    props.item.delivery_status_id == 2 ||
                    props.item.delivery_status_id == 21
                  "
                >
                  <!-- <div v-if="props.item.receive_status == 1">
                    <v-icon>highlight_alt</v-icon>
                  </div>
                  <div v-else> -->
                  <div class="text-xs">
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                      v-if="!props.item.distribute_status == 1"
                    ></v-checkbox>
                    <v-icon v-else>highlight_alt</v-icon>
                  </div>
                  <!-- <div class="text-xs" v-else>
                    <v-icon v-if="!props.item.distribute_status == 1"
                      >highlight_alt</v-icon
                    >
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                      v-else
                    ></v-checkbox>
                  </div> -->
                  <!-- </div> -->
                </div>
                <div v-else>
                  <v-icon>highlight_alt</v-icon>
                </div>
              </td>
              <td class="text-xs" style="padding-left: 20px">
                {{ sl_count + props.index }}
              </td>
              <td class="text-xs-left">
                <v-chip
                  label
                  text-color="black"
                  color="transparent"
                  style="padding: 0 0px !important"
                >
                  ({{ props.item.center_code }})
                  {{ props.item.center_name }}
                </v-chip>
              </td>
              <td class="text-xs-left">
                <v-chip
                  label
                  text-color="black"
                  color="transparent"
                  style="padding: 0 0px !important"
                  >{{ getFormatedDate(props.item.created_at) }}</v-chip
                >
              </td>

              <td class="text-xs-left">
                <v-chip
                  label
                  text-color="black"
                  color="transparent"
                  style="padding: 0 0px !important"
                >
                  ({{ props.item.paper_code }})
                  {{ props.item.paper_name }}
                </v-chip>
              </td>

              <td class="text-xs-left">{{ props.item.total_student }}</td>
              <td class="text-xs-left">{{ props.item.total_script }}</td>
              <td class="text-xs-left">{{ props.item.packet_size }}</td>
              <td class="text-xs-left">{{ props.item.total_packet }}</td>
              <td class="text-xs-left">
                {{ getScriptTypeName(props.item.script_type) }}
              </td>
              <td class="text-xs-center">
                <v-chip>{{ props.item.status_name }}</v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
      <!-- <pre> {{ getAnsScriptPaperDataAtRcNu }} </pre> -->
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

      <v-layout justify-center row fill-height align-center>
        <v-flex v-if="selected.length && !nuToRc" class="mx-2">
          <v-layout justify-center row fill-height align-center>
            <v-btn block color="primary" @click="downloadChalan()" class="mt-3"
              >Download Chalan</v-btn
            >
          </v-layout>
        </v-flex>
        <v-flex v-if="selected.length" class="mx-2">
          <v-layout justify-end row fill-height align-center>
            <v-btn
              :block="!nuToRc"
              color="primary"
              @click="downloadListRUtoNU()"
              class="mt-3"
              >Download List</v-btn
            >
          </v-layout>
        </v-flex>
        <!-- <v-flex v-if="selected.length && nuToRc" class="mx-2">
          <v-layout justify-start row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              round
              class="mt-3"
              color="success"
              @click="postAnsScriptNuToRcRecieve()"
              >Recieve</v-btn
            >
          </v-layout>
        </v-flex> -->
      </v-layout>

      <v-layout justify-center row fill-height align-center>
        <v-flex v-if="!nuToRc">
          <v-layout justify-center row fill-height align-center>
            <v-btn
              :disabled="selected.length == 0"
              large
              round
              class="ma-4"
              color="primary"
              @click="postAnsScriptRcToNu()"
              >Submit to National University</v-btn
            >
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- <pre> {{searchParam}} </pre> -->

    <!-- <pre>{{getAnsScriptPaperDataAtRcNu}} </pre> -->
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
    nuToRc: Boolean,
  },
  data() {
    return {
      datePickerModel: false,
      tsDialog: false,
      selected: [],
      reportDialog: false,
      ifRc: false,
      selected: [],
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      receiverDialog: false,
      sl_count: 1,
      searchParam: {
        exam_type: 1,
      },
      nuHeader: [
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
          text: " Paper",
          value: "center_name",
          sortable: false,
          width: "20%",
        },
        // { text: "District", value: "district_name", sortable: false },
        {
          text: "Total Student",
          value: "total_student",
          sortable: false,
          width: "20%",
        },
        {
          text: "Total Script",
          value: "total_script",
          sortable: false,
          width: "20%",
        },
        {
          text: "Packet Size",
          value: "packet_size",
          sortable: false,
          width: "20%",
        },
        {
          text: "Total Packet ",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },

        {
          text: "Data Type",
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
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
          width: "10%",
        },
        {
          text: "Reg Center",
          value: "reg_center_name",
          sortable: false,
          width: "30%",
        },
        { text: "Center", value: "center_name", sortable: false, width: "60%" },

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
        // {
        //   text: "Details",
        //   value: "status",
        //   sortable: false,
        //   align: "center",
        //   width: "20%"
        // }
      ],
      nuHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "10%",
        },

        { text: "Center", value: "center_name", sortable: false, width: "60%" },

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
        // {
        //   text: "Details",
        //   value: "status",
        //   sortable: false,
        //   align: "center",
        //   width: "20%"
        // }
      ],
    };
  },
  created() {
    this.$store.dispatch("fetchDeliveryOptionsDataEW");
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }

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
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    if (!this.nuToRc) {
      this.searchParam.nu_received_status = 1;
    }
  },
  mounted() {},
  computed: {
    getDeliveryOptionsData() {
      return this.$store.getters.getDeliveryOptionsDataEW;
    },
    getAnsScriptPaperDataAtCenterRc() {
      let arr = this.$store.getters.getAnsScriptPaperDataAtCenterRc;

      return arr;
    },
    getAnsScriptPaperDataAtRcNu() {
      return this.$store.getters.getAnsScriptPaperDataAtRcNu;
    },
    //
    getHeaders() {
      if (this.nuToRc) {
        return this.headers;
      } else {
        return this.nuHeaders;
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
  },

  methods: {
    getScriptTypeName(type) {
      let name = "Ans Script";
      if (parseInt(type) == 2) {
        name = "E Type Packet";
      }
      if (parseInt(type) == 3) {
        name = "Expelled Script";
      }
      return name;
    },
    ondateClear() {
      delete this.searchParam.datetime;
      delete this.searchParam.date;
      // this.searchParam.date = "";
      // console.log("here ??");
    },
    func_question_packetSize() {
      console.log("---");
    },
    getParam() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      return param;
    },
    downloadChalan() {
      let param = this.getParam();
      param.reg_center_code = this.searchParam.reg_center_code;
      param.chalan = 1;
      this.$root
        .$confirm("Are you sure that you want to Recieve? ")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (parseInt(obj.distribute_status) != 1) {
                // if (obj.receive_status != 1) {
                arr.push(obj.center_code);
                // }
              }
            });

            param.center_code = arr;

            if (arr.length != 0) {
              this.$store
                .dispatch("ansScriptDistToNuReportList", param)
                .then((res) => {
                  // this.fetchAnsScriptPaperDataAtRcNu();
                });
            } else {
              this.$store.commit("SET_SNACKBAR", {
                msg: "No data",
                color: "red",
              });
            }
            console.log("sandipon:: param.center_code = arr", param);
          }
        });
    },
    downloadListRUtoNU() {
      let param = this.getParam();
      param.reg_center_code = this.searchParam.reg_center_code;
      // param.chalan = 1;
      this.$root
        .$confirm("Are you sure that you want to Recieve? ")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (parseInt(obj.distribute_status) != 1) {
                // if (obj.receive_status != 1) {
                arr.push(obj.center_code);
                // }
              }
            });

            param.center_code = arr;

            if (arr.length != 0) {
              this.$store
                .dispatch("ansScriptDistToNuReportList", param)
                .then((res) => {
                  // this.fetchAnsScriptPaperDataAtRcNu();
                });
            } else {
              this.$store.commit("SET_SNACKBAR", {
                msg: "No data",
                color: "red",
              });
            }
            console.log("sandipon:: param.center_code = arr", param);
          }
        });
    },
    getFormatedDate(date) {
      if (date == null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    postAnsScriptNuToRcRecieve() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Recieve? ")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (obj.distribute_status == 1) {
                if (obj.nu_received_status != 1) {
                  arr.push(obj);
                }
              }
            });
            this.selected = arr;

            this.$store
              .dispatch("postAnsScriptNuToRcRecieve", this.selected)
              .then((res) => {
                self.fetchAnsScriptPaperDataAtRcNu();
              });
          }
        });
    },
    postAnsScriptRcToNu() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            this.selected.forEach((obj) => {
              if (obj.distribute_status != 1) {
                console.log("in ----/// --- return then", obj);
                arr.push(obj);
              }
            });
            this.selected = arr;
            console.log("sajhflkjdsahflkjh--->", arr);
            this.$store
              .dispatch("postAnsScriptRcToNu", this.selected)
              .then((res) => {
                console.log("in ----//o.O/ --- return then", res);
                this.fetchAnsScriptPaperDataAtRcNu();
                // self.fetchTreasuryData();
              });
          }
        });
      // postAnsScriptRcToNu
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

    fetchAnsScriptPaperDataAtRcNu() {
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
    },

    fetchAnsScriptPaperDataAtRcNu____() {
      console.log("lognakiLoga1");
      // if (this.searchParam.reg_center_code) {
      console.log("lognakiLoga2");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchAnsScriptPaperDataAtCenterRc", this.searchParam)
        .then((data) => {
          console.log("lognakiLoga3");
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
      // } else {
      //   console.log("no reg");
      // }
    },
  },
  watch: {
    pagination() {
      this.fetchAnsScriptPaperDataAtRcNu();
    },
  },
};
</script>
<style scoped></style>
