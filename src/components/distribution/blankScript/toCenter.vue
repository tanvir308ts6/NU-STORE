<template>
  <div>
    <v-container fluid style="padding:10px">
      <v-layout row class="mb-2">
        <v-flex xs4>
          <v-autocomplete
            class="mx-2"
            hide-details
            v-model="searchParam.division_id"
            :item-text="(item) => item.div_code + ' - ' + item.division_name"
            item-value="div_code"
            :items="getDivisionList"
            menu-props="auto"
            label="Select Division"
            name="division"
            prepend-inner-icon="subject"
            outline
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.div_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
              >
                {{ data.item.div_code + " - " + data.item.division_name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content
                  v-text="data.item.div_code + ' - ' + data.item.division_name"
                ></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="
                      data.item.div_code + ' - ' + data.item.division_name
                    "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs4>
          <v-autocomplete
            name="Exam"
            class="mx-2"
            hide-details
            v-model="searchParam.district_id"
            :item-text="(item) => item.id + ' - ' + item.district_name"
            item-value="dist_code"
            :items="getDistrictList"
            menu-props="auto"
            label="Select District"
            prepend-inner-icon="subject"
            outline
          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" class="chip--select-multi">
                {{ data.item.district_name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.district_name"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            outline
            class="ma-0"
            hide-details
            name="code"
            label="Center Code"
            v-model="searchParam.center_code"
            prepend-inner-icon="edit"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 class="text-xs-center">
          <v-btn
            fab
            small
            class="primary"
            @click="searchCenterWiseDistributionData()"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- center  -->
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Center Wise Distribution</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />

            <div class="text-xs-center py-0">
              <v-btn
                outline
                color="primary"
                @click.stop.prevent="downloadCenterDocuments('', {})"
                class="erBtn"
              >
                <v-icon left>cloud_download</v-icon>Download FULL PAGE Report
              </v-btn>
            </div>
            <div v-if="false">
              <v-dialog v-model="reportDialog" width="500">
                <v-card>
                  <v-select
                    class="pa-5"
                    outline
                    :items="['Division', 'District', 'All']"
                    label="Order By"
                    hide-details
                  ></v-select>
                  <v-divider />
                  <div class="text-xs-center py-3">
                    <v-btn
                      outline
                      color="primary"
                      @click.stop.prevent="downloadScriptStm()"
                      class="erBtn"
                    >
                      <v-icon left>cloud_download</v-icon>Download allotment
                      Report
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
              <v-btn color="primary" @click="reportDialog = !false"
                >allotment Report</v-btn
              >
            </div>
          </v-layout>
        </v-card>

        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="getCenterWiseDistCenterList"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td>{{ sl_count + props.index }}</td>
            <td class="text-xs">
              {{ props.item.center_code }} - {{ props.item.center_name }},
              {{ props.item.district_name }}
            </td>
            <td class="text-xs">{{ props.item.main_packet_size }}</td>
            <td class="text-xs">{{ props.item.main_quantity }}</td>
            <td class="text-xs">{{ props.item.extra_packet_size }}</td>
            <td class="text-xs">{{ props.item.extra_quantity }}</td>
            <td class="text-xs">{{ props.item.total_packet }}</td>
            <td class="text-xs-center" style="padding:0px 0px">
              <v-layout align-center justify-center row fill-height>
                <!-- <v-btn
                  small
                  @click="downloadCenterDocuments('chalan', props.item)"
                >
                  <span class="caption">Chalan</span>
                </v-btn> -->
                <v-btn
                  small
                  @click="downloadCenterDocuments('allot', props.item)"
                >
                  <span class="caption">allotment Details</span>
                </v-btn>
              </v-layout>
            </td>
            <td class="text-xs-center cyan lighten-3">
              <v-chip
                v-if="props.item.distribute_status == 1"
                color="white green--text"
              >
                <b>Distributed</b>
              </v-chip>
              <div v-else>
                <v-chip v-if="props.item.status == 3" color="white green--text">
                  <b>Distributed</b>
                </v-chip>
                <v-chip
                  v-if="props.item.status == 2"
                  color="white orange--text"
                >
                  <b>Pending</b>
                </v-chip>
                <v-chip v-if="props.item.status == 1" color="white pink--text">
                  <b>Allocated</b>
                </v-chip>
                <v-chip
                  v-if="!props.item.status"
                  color="cyan darken-1 white--text"
                >
                  <b>status</b>
                </v-chip>
              </div>
            </td>
            <!-- <td class="justify-center text-xs-center cyan lighten-3">
              <v-btn
                small
                color="primary lighten-2"
                @click="addReceiverInfo(props.item)"
                >Add Receiver</v-btn
              >
            </td> -->
            <td>
              <v-btn
                small
                color="primary"
                @click="openAddToChallanModal(props.item)"
              >
                Add To Challan
              </v-btn>
            </td>
            <!-- <td class="justify-center text-xs-center cyan lighten-3">
              <v-btn
                v-if="props.item.distribute_status == 1"
                small
                color="primary"
                disabled
                >Distribute</v-btn
              >
              <v-btn
                v-else
                :disabled="!props.item.receiver"
                small
                color="primary"
                @click="distributeBsByCenter(props.item)"
                >Distribute</v-btn
              >
            </td> -->
          </template>
        </v-data-table>
      </v-container>

      <v-container fluid>
        <div v-if="challanSummaryForce">
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Challan Summary</v-card-text>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
              <v-btn color="primary" @click="openCreateNewChallan()"
                >Create New Challan</v-btn
              >
              <v-icon class="mx-3" @click="fetchNUtoCenterChallanList()"
                >refresh</v-icon
              >
            </v-layout>
          </v-card>
          <v-card color="white" class="pa-2">
            <v-data-table
              :headers="chalanHeader"
              :items="getBsNUCChallanList"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <!-- <tr> -->
                <td class="text-xs-left" style="padding: 0 10px">
                  {{ props.index + 1 }}
                </td>
                <td class="text-xs-center" style="padding: 0 10px">
                  <v-chip label color="pink" text-color="white">
                    {{ props.item.challan_no }}
                  </v-chip>
                </td>
                <!-- <td class="text-xs" style="padding: 0 10px;">{{ props.item.challan_type }}</td> -->
                <td class="text-xs-center" style="padding: 0 10px">
                  <div v-if="props.item.challan_date">
                    {{ getFormatedDate(props.item.challan_date) }}
                  </div>
                </td>
                <td class="text-xs-left" style="padding: 0 10px">
                  National University
                </td>
                <td class="text-xs-left" style="padding: 0 10px">
                  {{ props.item.center_code }} - {{ props.item.center_name }}
                </td>

                <td class="text-xs-center" style="padding: 0 10px">
                  {{ props.item.total_packet }}
                </td>

                <td class="text-xs-center" style="padding: 0 10px">
                  <div v-if="props.item.distribute_status == 1">
                    <v-chip color="green white--text">
                      <b>Delivered</b>
                    </v-chip>
                  </div>
                  <div v-else>
                    <v-chip color="red white--text">
                      <b>Not Delivered</b>
                    </v-chip>
                  </div>
                  <!-- {{ props.item.nu_distribute_status }} -->
                </td>
                <td class="text-xs-center" style="padding: 0 10px">
                  <v-btn
                    small
                    v-if="props.item.distribute_status == 1"
                    color="primary"
                    @click="downloadNUToCenChallanByCode(props.item)"
                  >
                    <span class="caption">Challan</span>
                    <!-- <v-icon large>insert_drive_file</v-icon> -->
                  </v-btn>
                  <v-btn
                    small
                    @click="downloadCenterDocuments('gp', props.item)"
                    v-if="props.item.distribute_status == 1"
                  >
                    <span class="caption">Gate Pass</span>
                  </v-btn>
                </td>
                <!-- <td class="text-xs-center" style="padding: 0 10px">
                <v-btn
                  small
                  v-if="props.item.distribute_status == 1"
                  color="primary"
                  @click="downloadAnsRequsitonByCode(props.item)"
                >
                  Requsiton letter
                </v-btn>
              </td> -->

                <td class="text-xs-center" style="padding: 0 10px">
                  <div>
                    <v-btn
                      :disabled="props.item.distribute_status == 1"
                      color="primary"
                      @click="addReceiverInfo(props.item)"
                      >Deliver</v-btn
                    >
                  </div>
                </td>
                <!-- <td class="text-xs" style="padding: 0 10px">
                <div>
                  <v-btn
                    color="primary"
                    @click="openCenterChallanDetails(props.item)"
                    >Details</v-btn
                  >
                </div>
              </td> -->
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-container>

      <v-dialog v-model="receiverDialog" width="500" persistent>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="title">Receiver's Info</v-toolbar-title>
          <v-spacer> </v-spacer>
          <v-btn flat fab @click="close()">Close</v-btn>
        </v-toolbar>
        <v-card class="pa-2">
          <div class="pb-3">
            <v-text-field
              v-model="receiverInfoObj.name"
              class="pa-2"
              label="Name"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              v-model="receiverInfoObj.title"
              class="pa-2"
              label="Title"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              v-model="receiverInfoObj.phone"
              class="pa-2"
              label="Phone"
              outline
              hide-details
              :error="phoneErr"
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              v-model="receiverInfoObj.email"
              class="pa-2"
              label="Email"
              outline
              hide-details
              prepend-icon="edit"
            ></v-text-field>
          </div>
          <v-divider />
          <div class="text-xs-center py-3">
            <v-btn large color="primary" @click="distributeBsByCenter()">
              deliver
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modalCreateChalan" width="700">
        <v-toolbar dark color="primary" class="mt-0">
          <v-toolbar-title>Create New Challan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="light-blue lighten-1" @click="modalCreateChalan = false"
            >Close</v-btn
          >
        </v-toolbar>
        <v-layout>
          <v-flex xs12 sm12>
            <v-card class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 class="pa-2">
                  <v-text-field
                    v-model="bsCenterChallan.center_code"
                    label="Center Code"
                    prepend-icon="edit"
                    v-validate="'required'"
                    :error-messages="errors.collect('center_code')"
                    data-vv-name="center_code"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 class="pa-2">
                  <v-layout row wrap>
                    <v-text-field
                      v-model="bsCenterChallan.from_name"
                      label="from name"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('from_name')"
                      data-vv-name="from_name"
                    ></v-text-field>
                    <v-text-field
                      v-model="bsCenterChallan.from_designation"
                      label="from designation"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('from_designation')"
                      data-vv-name="from_designation"
                    ></v-text-field>
                    <v-text-field
                      v-model="bsCenterChallan.from_address"
                      label="from address"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('from_address')"
                      data-vv-name="from_address"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs6 class="pa-2">
                  <v-layout row wrap>
                    <v-text-field
                      v-model="bsCenterChallan.to_name"
                      label="to name"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('to_name')"
                      data-vv-name="to_name"
                    ></v-text-field>
                    <v-text-field
                      v-model="bsCenterChallan.to_designation"
                      label="to designation"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('to_designation')"
                      data-vv-name="to_designation"
                    ></v-text-field>
                    <v-text-field
                      v-model="bsCenterChallan.to_address"
                      label="to address"
                      prepend-icon="edit"
                      v-validate="'required'"
                      :error-messages="errors.collect('to_address')"
                      data-vv-name="to_address"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="validationForm()">
                  <v-icon left large>add</v-icon>Create New Challan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>

      <div class="text-xs-center" v-if="selected.length">
        <v-btn color="primary" @click="showDetailItem(props.item)" class="mt-3"
          >Distribute To Multiple Center</v-btn
        >
      </div>
    </v-container>
    <!-- <pre> {{searchParam}}</pre>
    <pre>{{getCenterWiseDistCenterList}} </pre>-->
    <v-dialog v-model="addToChallanModal" width="700">
      <v-card class="pa-4">
        <v-layout>
          <v-flex xs12>
            <v-autocomplete
              class="mt-0"
              v-model="selectedChallan"
              :items="filteredChallanList"
              :item-text="(item) => item.challan_no"
              item-value="challan_no"
              label="Select Challan .."
              persistent-hint
              prepend-inner-icon="edit"
              outline
              hide-details
            >
              <template v-slot:selection="data">
                <b>{{ data.item.challan_no }}</b>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      >{{ data.item.challan_no }} : From: National University -
                      To: ( {{ data.item.center_code }} )
                      {{ data.item.center_name }}</v-list-tile-title
                    >
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>

            <v-btn
              color="primary"
              style="float: right; margin-top: -47px; margin-right: 50px"
              @click="addToChallan"
              >Add To Challan
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import * as moment from "moment";
export default {
  $_veeValidate: {
    validator: "new"
  },
  mixins: [commonFun, commonGet, watchMixin],
  components: {
    formNotification,
  },
  props: ["test"],
  data() {
    return {
      dictionary: {
      custom: {
        center_code: {
          required: () => "Center Code field can not be empty"
        },
        from_name: {
          required: () => "From name field can not be empty"
        },
        from_designation: {
          required: () => "From Designation field can not be empty"
        },
        from_address: {
          required: () => "From Address field can not be empty"
        },
        to_name: {
          required: () => "To name field can not be empty"
        },
        to_designation: {
          required: () => "To Designation field can not be empty"
        },
        to_address: {
          required: () => "To Address field can not be empty"
        },
      }
    },
      phoneErr: false,
      receiverInfoObj: {},
      reportDialog: false,
      selected: [],
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      receiverDialog: false,
      sl_count: -1,
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
          sortable: false,
        },
        { text: " Name", value: "center_name", sortable: false },
        // { text: "District", value: "district_name", sortable: false },

        { text: "MS Packet Size", value: "main_packet_size", sortable: false },
        { text: "MS Packet Count", value: "main_quantity", sortable: false },
        { text: "ES Packet Size", value: "extra_packet_size", sortable: false },
        { text: "ES Packet Count", value: "extra_quantity", sortable: false },
        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
        },
        {
          text: "Download",
          align: "center",
          value: "district_code",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          class: "cyan lighten-2 white--text subheading",
        },
        // {
        //   text: "Receiver Info",
        //   align: "center",
        //   value: "actions",
        //   sortable: false,
        //   class: "cyan lighten-2 white--text subheading",
        // },
        {
          text: "Distribute",
          align: "center",
          value: "actions",
          sortable: false,
          class: "cyan lighten-2 white--text subheading",
        },
      ],
      chalanHeader: [
        {
          text: "Sl",
          value: "sl",
          align: "left",
          sortable: false,
        },
        {
          text: "Challan No",
          value: "challan_no",
          align: "center",
          sortable: false,
        },

        {
          text: "Challan Date",
          value: "challan_date",
          align: "center",
          sortable: false,
        },
        {
          text: "Challan From",
          value: "delivery_option",
          align: "center",
          sortable: false,
        },
        {
          text: "Challan To",
          value: "delivery_option",
          align: "center",
          sortable: false,
        },

        {
          text: "Total Packet",
          value: "total_packet",
          sortable: false,
          width: "5%",
        },

        {
          text: "Status",
          value: "nu_distribute_status",
          align: "center",
          sortable: false,
        },
        {
          text: "Download",
          value: "nu_distribute_status",
          align: "center",
          sortable: false,
        },

        {
          text: "Deliver",
          value: "distribute",
          align: "center",
          sortable: false,
        },
      ],
      rcWiseDistSummaryParam: {},
      modalCreateChalan: false,
      addToChallanModal: false,
      selectedChallan: "",
      bsCenterChallan: {
        delivery_from_id: 21,
        delivery_to_id: 1,
      },
      currentCenter: {},
      currentCenForAddToChallan: {
        center_code: -1,
      },
      currentSelectedChallan: {},
      challanSummaryForce: true,
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    this.initialize();
    this.$store.dispatch("fetchRegCenterData");
    this.fetchNUtoCenterChallanList();
  },
  computed: {
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
      return this.$store.getters.getCenterWiseDistCenterList;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },

    filteredChallanList() {
      let arr = [];
      for (var i = 0; i < this.getBsNUCChallanList.length; i++) {
        if (
          this.currentCenter.center_code ==
          this.getBsNUCChallanList[i].center_code
        ) {
          if (parseInt(this.getBsNUCChallanList[i].distribute_status) == 0)
            arr.push(this.getBsNUCChallanList[i]);
        }
      }
      return arr;
    },

    getBsNUCChallanList() {
      return this.$store.getters.getBsNUCChallanList;
    },
    getBsChallanList() {
      return this.$store.getters.getBsChallanList;
    },
  },

  methods: {
    downloadNUToCenChallanByCode(item) {
      console.log("item:", item);
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;
      param.challan = true;
      this.$root
        .$confirm("Are you sure that you want to download Challan? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("download_BS_CenterChallanByCode", param)
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },
    getFormatedDate(date) {
      if (date == null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    downloadCenterDocuments(what, item) {
      // console.log("..", item);
      let self = this;
      let text = "";
      let param = { ...this.searchParam };
      param.exam_year = this.searchParam.year;
      if (what == "gp") {
        param.gate_pass = true;
        param.challan_no = item.challan_no;
        text = "gate pass";
        this.$root
          .$confirm(
            "Are you sure that you want to download " + "\n" + text + "?"
          )
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("download_BS_gatepass_NUto_cen", param)
                .then(() => {});
            }
          });
      } else {
        if (what == "chalan") {
          param.chalan = 1;
          text = "chalan";
        }
        if (what == "allot") param.indi_allot = 1;

        param.center_code = item.center_code;

        this.$root
          .$confirm(
            "Are you sure that you want to download " + "\n" + text + "?"
          )
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("download_BS_AllotmentReport_ByCenter", param)
                .then(() => {});
            }
          });
      }
    },
    saveReceiverInfo() {
      if (!isNaN(this.receiverInfoObj.phone)) {
        this.phoneErr = false;
        this.receiverDialog = false;
      } else {
        this.phoneErr = true;
      }
    },
    close() {
      this.receiverDialog = false;
    },
    distributeBsByCenter() {
      let item = this.currentSelectedChallan;
      item.receiver = JSON.stringify(this.receiverInfoObj);

      if (item.total_packet == null) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Data",
          color: "red",
        });
      } else {
        this.$store.dispatch("distributeBsNuToCenter", item).then((data) => {
          this.searchCenterWiseDistributionData();
          this.receiverDialog = false;
          this.fetchNUtoCenterChallanList();
        });
      }
    },
    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    addReceiverInfo(item) {
      this.currentSelectedChallan = item;
      // if (item.receiver === null) {
      //   item.receiver = {};
      //   item.receiver.name = "";
      //   item.receiver.title = "";
      //   item.receiver.phone = "";
      //   item.receiver.email = "";
      // } else {
      //   this.receiverInfoObj = JSON.parse(item.receiver);
      // }
      this.receiverDialog = true;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchCenterWiseDistributionData() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchCenterWiseDistributionData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.links.from;
          this.pagination.totalItems = data.links.total;
        });
    },
    // challan
    filteredBsCenterChallanList() {
      return this.getBsCenterChallanList;
    },
    getBsCenterChallanList() {
      return this.$store.getters.getBsCenterChallanList;
    },
    fetchNUtoCenterChallanList() {
      let param = {
        limit: -1,
        challan_type: "BSNUC",
      };

      this.$store
        .dispatch("fetchBSNUtoCenterChallanList", param)
        .then((result) => {
          console.log(result);
          this.challanSummaryForce = false;
          this.challanSummaryForce = true;
        });
    },
    openCreateNewChallan() {
      this.modalCreateChalan = true;
    },
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.createNewChallan();
        }
      });
    },
    createNewChallan() {
      this.bsCenterChallan.challan_type = "BSNUC";
      this.$root
        .$confirm("Are you sure that you want to create new challan? ")
        .then((confirm) => {
          if (confirm) {
            this.modalCreateChalan = false;
            this.$store
              .dispatch("addNewChallan", this.bsCenterChallan)
              .then(() => {
                this.fetchNUtoCenterChallanList();
              });
          }
        });
    },
    openAddToChallanModal(item) {
      //  this.currentCenForAddToChallan = item;
      this.currentCenter = { ...item };
      this.addToChallanModal = true;
    },
    addToChallan() {
      let that = this;
      this.currentCenter.challan_no = this.selectedChallan;
      this.currentCenter.year = this.currentCenter.exam_year;

      this.$store
        .dispatch("addToChallanBsNuToCenter", [this.currentCenter])
        .then(() => {
          that.fetchNUtoCenterChallanList();
          that.addToChallanModal = false;
        });
    },
  },
  watch: {
    pagination() {
      this.searchCenterWiseDistributionData();
    },
  },
};
</script>
<style scoped></style>
