<template>
  <v-container fluid style="padding: 0px">
    <!-- {{searchParam}} -->
    <v-layout>
      <v-flex xs12>
        <v-autocomplete
          class="mx-3 mt-3"
          :disabled="ifCenterUser"
          v-model="searchParam.center_code"
          :items="getTheoryCenterList"
          :item-text="(item) => item.center_code + ' - ' + item.center_name"
          item-value="center_code"
          label="Select Center"
          persistent-hint
          outline
          hide-details
          @change="fetchUsedUnusedData()"
        >
          <template v-slot:selection="data">
            <v-chip
              color="#FAFAFA"
              close
              @input="clearingCenterSelection()"
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
        <v-alert :value="true" v-if="!searchParam.center_code" type="error"
          >Please Select an Center</v-alert
        >
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card dark>
      <v-layout align-center justify-center row fill-height class="my-2">
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
                :value="getFormatedDate(searchParam.date)"
                label="Pick a - date"
                readonly
                v-on="on"
                outline
                hide-details
                prepend-icon="library_books"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="searchParam.date"
              @change="datePickerModel = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex>
          <v-layout justify-center row fill-height align-center>
            <v-btn
              dark
              round
              large
              class="cyan"
              @click="searchAnsScriptDistTrageryOrRC()"
              >Search</v-btn
            >
          </v-layout>
        </v-flex>
        <v-btn color="primary" @click="downLoadTopSheet()"
          >DOWNLOAD TOPSHEET</v-btn
        >
        <v-flex></v-flex>
      </v-layout>
    </v-card>
    <span class="display-1 pa-2 my-4" v-if="StudentCountByRoutine"
      >| Student Count : {{ StudentCountByRoutine }}</span
    >
    <!-- {{getUsedScriptData}} -->
    <!-- used / unused  -->
    <v-container fluid :style="getStyleForShipping(!showShipping)">
      <v-card>
        <div class="pa-3 title">
          <v-icon left>face</v-icon>Used / Unsed Calculation
        </div>
        <v-divider class="mt-3" />
        <v-layout align-center justify-center row fill-height class="pa-4">
          <v-layout align-space-around justify-space-around column fill-height>
            <v-flex xs3>
              <v-text-field
                class="ma-2"
                label="Used Main Script"
                prepend-icon="folder"
                outline
                v-model="getUsedScriptData.ms_count"
                :error="msUsedFlag"
                hide-details
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                class="ma-2"
                label="Used Extra Script"
                prepend-icon="folder"
                outline
                hide-details
                :error="esUsedFlag"
                v-model="getUsedScriptData.es_count"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex xs5>
            <v-textarea
              class="ma-2"
              label="Remark"
              prepend-icon="fact_check"
              outline
              hide-details
              v-model="getUsedScriptData.remark"
            ></v-textarea>
          </v-flex>
          <v-flex xs1>
            <v-btn
              :disabled="!searchParam.center_code"
              color="primary"
              @click="submitUsedUnused()"
              >SUBMIT</v-btn
            >
          </v-flex>
        </v-layout>
        <!-- <pre> {{usedUnused}}</pre> -->
        <!-- </v-layout> -->
      </v-card>
    </v-container>

    <v-divider class="mt-3 mb-3" />
    <div>
      <v-tabs
        centered
        grow
        v-model="ShippingType"
        :style="getStyleForShipping(showShipping)"
      >
        <v-tab
          class="title"
          :class="ShippingType == 0 ? 'lime darken-1 white--text ' : ''"
          >Script Packaging and Shipping</v-tab
        >
        <v-tab
          class="title"
          :class="ShippingType == 1 ? 'cyan white--text ' : ''"
          >E Type Packaging and Shipping</v-tab
        >
        <v-tab
          class="title"
          :class="ShippingType == 2 ? 'pink white--text ' : ''"
          >Expelled Script Packaging and Shipping</v-tab
        >
      </v-tabs>
      <div :style="getStyleForShipping(showShipping)">
        <v-container v-if="ShippingType == 0" fluid style="padding: 0px">
          <sendingScript
            :searchParam="searchParam"
            :fetchData="fetchAnsScriptPaperDataAtCenterRc"
            :fetchingStatus="loading"
            :updateChallanList="fetchCenterChallanList"
          />
        </v-container>
        <v-container v-if="ShippingType == 1" fluid style="padding: 0px">
          <sendingEtype
            :searchParam="searchParam"
            :fetchData="fetchAnsScriptPaperDataAtCenterRc"
            :fetchingStatus="loading"
            :updateChallanList="fetchCenterChallanList"
          />
        </v-container>

        <v-container v-if="ShippingType == 2" fluid style="padding: 0px">
          <sendingExType
            :searchParam="searchParam"
            :fetchData="fetchAnsScriptPaperDataAtCenterRc"
            :fetchingStatus="loading"
            :updateChallanList="fetchCenterChallanList"
          />
        </v-container>
      </div>
    </div>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Chalan Summary</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn color="primary" @click="openCreateNewChallan()"
            >Create New Chalan</v-btn
          >
          <v-icon class="mx-3" @click="fetchCenterChallanList()"
            >refresh</v-icon
          >
        </v-layout>
      </v-card>
      <v-card color="white" class="pa-2">
        <v-data-table
          :headers="chalanHeader"
          :items="getChalanList"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <!-- <tr> -->
            <td class="text-xs" style="padding: 0 10px">
              {{ props.index + 1 }}
            </td>
            <td class="text-xs" style="padding: 0 10px">
              {{ props.item.challan_no }}
            </td>
            <!-- <td class="text-xs" style="padding: 0 10px;">{{ props.item.challan_type }}</td> -->
            <td class="text-xs" style="padding: 0 10px">
              <div v-if="props.item.challan_date">
                {{ getFormatedDate(props.item.challan_date) }}
              </div>
            </td>
            <td class="text-xs" style="padding: 0 10px">
              {{ props.item.delivery_from_name }}
            </td>
            <td class="text-xs" style="padding: 0 10px">
              {{ props.item.delivery_to_name }}
            </td>

            <td class="text-xs" style="padding: 0 10px">
              {{ props.item.total_e_type_packet }}
            </td>
            <td class="text-xs" style="padding: 0 10px">
              {{ props.item.total_script_packet }}
            </td>
            <td class="text-xs" style="padding: 0 10px">
              {{ props.item.total_expelled_type_packet }}
            </td>
            <td class="text-xs" style="padding: 0 10px">
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
                fab
                flat
                v-if="props.item.distribute_status == 1"
                color="primary"
                @click="downloadAnsChallanByCode(props.item)"
              >
                <v-icon large>insert_drive_file</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-center" style="padding: 0 10px">
              <v-btn
                small
                v-if="props.item.distribute_status == 1"
                color="primary"
                @click="downloadAnsRequsitonByCode(props.item)"
              >
                Requsiton letter
              </v-btn>
            </td>

            <td class="text-xs" style="padding: 0 10px">
              <div>
                <v-btn
                  :disabled="props.item.distribute_status == 1"
                  color="primary"
                  @click="distributeCenterChallan(props.item)"
                  >Deliver</v-btn
                >
              </div>
            </td>
            <td class="text-xs" style="padding: 0 10px">
              <div>
                <v-btn
                  color="primary"
                  @click="openCenterChallanDetails(props.item)"
                  >Details</v-btn
                >
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

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
              <v-flex xs6 class="pa-2">
                <v-layout row wrap>
                 

                  <v-autocomplete
                    v-model="centerChallan.delivery_from_id"
                    :items="getDeliveryOptionsData"
                    :item-text="(item) => item.delivery_name"
                    item-value="options.id"
                    label="Select delivery options"
                    prepend-icon="library_books"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.options.delivery_name }}</v-chip
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
                            v-html="data.item.options.delivery_name"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <!-- {{centerChallan.delivery_from_id}} 41 -->

                  <v-autocomplete
                    v-if="centerChallan.delivery_from_id == 3"
                    label="Select Regional Center"
                    item-text="center_name"
                    item-value="regional_center_code"
                    v-model="centerChallan.regional_center_code"
                    :items="getRegCenList"
                    prepend-icon="edit"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="centerChallan.regional_center_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.center_name }}</v-chip
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
                            v-html="data.item.center_name"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-text-field
                    v-model="centerChallan.from_name"
                    label="from name"
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    v-model="centerChallan.from_designation"
                    label="from designation"
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    v-model="centerChallan.from_address"
                    label="from address"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6 class="pa-2">
                <v-layout row wrap>
                  <!-- {{ centerChallan }} -->
                  <v-autocomplete
                    v-model="centerChallan.delivery_to_id"
                    :items="getDeliveryOptionsData"
                    :item-text="(item) => item.delivery_name"
                    item-value="options.id"
                    label="Select delivery options"
                    prepend-icon="library_books"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.options.delivery_name }}</v-chip
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
                            v-html="data.item.options.delivery_name"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-autocomplete
                    v-if="centerChallan.delivery_to_id == 3"
                    label="Select Regional Center"
                    item-text="center_name"
                    item-value="regional_center_code"
                    v-model="centerChallan.regional_center_code"
                    :items="getRegCenList"
                    hide-details
                    prepend-icon="edit"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="centerChallan.regional_center_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.center_name }}</v-chip
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
                            v-html="data.item.center_name"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-text-field
                    v-model="centerChallan.to_name"
                    label="to name"
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    v-model="centerChallan.to_designation"
                    label="to designation"
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    v-model="centerChallan.to_address"
                    label="to address"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="createNewChallan()">
                <v-icon left large>add</v-icon>Create New Challan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
    <v-dialog v-model="openChenterChallanDetailsBox" width="90%">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Challan Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="light-blue lighten-1"
          @click="openChenterChallanDetailsBox = false"
          >Close</v-btn
        >
      </v-toolbar>
      <v-card class="pa-4">
        <v-layout>
          <v-flex xs6 class="title"
            >Challan No: {{ currentCenterChallanDetails.challan_no }}</v-flex
          >
          <v-flex xs3 class="title"
            >From: {{ currentCenterChallanDetails.delivery_from_name }}</v-flex
          >
          <v-flex xs3 class="title"
            >To: {{ currentCenterChallanDetails.delivery_to_name }}</v-flex
          >
        </v-layout>
      </v-card>
      <v-layout>
        <v-flex xs12 sm12>
          <v-card class="pa-4">
            <!-- <pre>{{getCenterChallanDetailsList[0]}}</pre> -->
            <v-data-table
              :headers="chalanDetailsHeader"
              :items="getCenterChallanDetailsList"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <td class="text-xs" style="padding: 0 10px">
                  {{ props.index + 1 }}
                </td>

                <td class="text-xs" style="padding: 0 10px">
                  {{ props.item.paper_code }} - {{ props.item.paper_name }}
                </td>

                <td class="text-xs" style="padding: 0 10px">
                  {{ props.item.total_script }}
                </td>
                <td class="text-xs" style="padding: 0 10px">
                  {{ props.item.packet_size }}
                </td>
                <td class="text-xs" style="padding: 0 10px">
                  {{ props.item.total_packet }}
                </td>
                <td class="text-xs" style="padding: 0 10px">
                  {{ getScriptTypeName(props.item.script_type) }}
                </td>

                <td class="text-xs" style="padding: 0 10px">
                  <v-btn
                    :disabled="
                      parseInt(currentCenterChallanDetails.distribute_status) ==
                      1
                    "
                    color="red white--text"
                    @click="deleteItemFromCenterChallan(props.item)"
                    >delete</v-btn
                  >
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </v-container>
</template>
<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import * as moment from "moment";
import sendingScript from "@/components/distribution/ansScript/comCenterTo/sendingScript";
import sendingEtype from "@/components/distribution/ansScript/comCenterTo/sendingEtype";

import sendingExType from "@/components/distribution/ansScript/comCenterTo/sendingExType";
export default {
  props: ["dialogStatus"],
  components: { sendingScript, sendingEtype, sendingExType },
  mixins: [commonGet, commonExamYear, common_login_getters],

  data() {
    return {
      currentCenterChallanDetails: {},
      centerChallan: {},
      distributeBox: false,
      deliveryOptionsModel: "",
      ShippingType: 0,
      flg: true,
      datePickerModel: false,
      selectedReg: "",
      showShipping: false,
      usedUnused: {
        ms_count: "",
        es_count: "",
        date: new Date().toISOString().substr(0, 10),
      },
      msUsedFlag: false,
      esUsedFlag: false,
      submitBtn: false,
      selected: [],
      menu_ts: false,
      menu_usedUnused: false,
      // main script
      ms_packetSize: 100,
      ms_multiplier: 1,
      // extra script
      es_packetSize: 50,
      es_multiplier: 1,
      // hudai
      forceRerenderFlag: true,
      packetSize: 50,
      scriptLoose: 2,
      sl_count: 1,
      loading: false,
      componentStatus: false,
      details: [],
      rollGendialog: false,
      rollGendMode: true,
      examMode: true,
      paperMode: true,
      changeColor: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },
      StudentCountByRoutine: 0,
      search: "",
      getStatus: [
        { name: "All", value: 0 },
        { name: "Only Teacher Approved", value: 1 },
        { name: "Only Paid", value: 2 },
      ],
      searchParam: {
        exam_initiate_id: 1,
        date: new Date().toISOString().substr(0, 10),
      },
      t: null,
      v: 0,
      chalanHeader: [
        {
          text: "Sl",
          value: "challan_no",
          align: "left",
          sortable: false,
        },
        {
          text: "Challan No",
          value: "challan_no",
          align: "left",
          sortable: false,
        },

        {
          text: "Challan Date",
          value: "challan_date",
          align: "left",
          sortable: false,
        },
        {
          text: "Challan From",
          value: "delivery_option",
          align: "left",
          sortable: false,
        },
        {
          text: "Challan To",
          value: "delivery_option",
          align: "left",
          sortable: false,
        },

        {
          text: "TP (E/Type)",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },
        {
          text: "TP (S/Type)",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },
        {
          text: "TP (Ex/Type)",
          value: "total_packet",
          sortable: false,
          width: "20%",
        },

        {
          text: "Status",
          value: "nu_distribute_status",
          align: "left",
          sortable: false,
        },
        {
          text: "Download Challan",
          value: "nu_distribute_status",
          align: "left",
          sortable: false,
        },
        {
          text: "Download Requsation Letter",
          value: "nu_distribute_status",
          align: "left",
          sortable: false,
        },
        {
          text: "Distribute",
          value: "distribute",
          align: "center",
          sortable: false,
        },
        {
          text: "Challan Details",
          value: "challan_details",
          align: "center",
          sortable: false,
        },
      ],

      chalanDetailsHeader: [
        {
          text: "Sl",
          value: "challan_no",
          align: "left",
          sortable: false,
        },
        {
          text: "Course",
          value: "paper_name",
          align: "left",
          sortable: false,
        },

        {
          text: "Script Count",
          value: "total_script",
          align: "left",
          sortable: false,
        },
        {
          text: "Packet Size",
          value: "packet_size",
          align: "left",
          sortable: false,
        },
        {
          text: "Total Packet",
          value: "total_packet",
          align: "left",
          sortable: false,
        },
        {
          text: "Script Type",
          value: "script_type",
          align: "left",
          sortable: false,
        },
        {
          text: "Delete",
          value: "script_type",
          align: "left",
          sortable: false,
        },
      ],

      topsheetParam: {
        date: new Date().toISOString().substr(0, 10),
      },

      et_packetSize: 200,
      ex_packetSize: 1,
      modalCreateChalan: false,
      openChenterChallanDetailsBox: false,
    };
  },

  created() {
    this.$store.dispatch("fetchDeliveryOptionsDataEW");
    // this.$store.commit("UNSET_FORM_FILLUP_DATA");

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    // if (!this.$store.getters.getSessionItems.length) {
    this.$store.dispatch("fetchAllSessionData");

    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    // this.searchParam.center_code = 101;
    // this.searchParam.date = "2020-09-04";
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }

    if (this.searchParam.center_code) {
      this.fetchUsedUnusedData();
    } else {
      console.log("Not fetching at Created ");
    }
    // }

    //call treasury data
    //this.fetchTreasuryData();
    this.fetchCenterChallanList();
  },
  mounted() {
    // let division_id = JSON.parse(localStorage.getItem("user")).center
    //   .division_id;
    // this.$store.dispatch("fetchRegCenterData", {
    //   division_id: division_id,
    // });
  },
  // mounted() { getScriptStatement
  // },
  computed: {
    getCenterChallanDetailsList() {
      return this.$store.getters.getCenterChallanDetailsList;
    },
    getDeliveryOptionsData() {
      return this.$store.getters.getDeliveryOptionsDataEW;
    },
    getChalanList() {
      return this.$store.getters.getCenterChallanList;
    },

    getAnsScriptPaperDataAtCenterRc_() {
      // [ { "rn": "1", "id": 5740, "center_code": "101", "reg_center_code": null, "paper_code": "311007", "total_student": "3", "total_script": "3", "packet_size": 100, "total_packet": 1, "treasury_status": null, "treasury_sent_at": null, "treasury_sent_by": null, "distribute_status": null, "distributed_at": null, "distributed_by": null, "receive_status": null, "received_at": null, "received_by": null, "exam_initiate_id": "63", "exam_code": "3302", "exam_year": "2017", "lock": "0", "status": "0", "active": "0", "created_by": null, "updated_by": null, "deleted_by": null, "created_at": "2020-09-04 14:46:22", "updated_at": "2020-09-20 14:25:47", "deleted_at": null, "attendance_date": "2020-09-04 00:00:00", "year": "2017", "regional_center_name": null, "center_name": "BAGERHAT GOVT. MAHILA COLLEGE", "exam_name": "Masters Final", "paper_name": "BANGLA DRAMA", "district_name": "BAGERHAT" } ]
      return this.$store.getters.getAnsScriptPaperDataAtCenterRcTS;
    },

    getAnsScriptPaperDataAtCenterRc() {
      return [
        {
          rn: "1",
          id: 5740,
          center_code: "101",
          reg_center_code: null,
          paper_code: "311007",
          total_student: "3",
          total_script: "3",
          packet_size: 200,
          total_packet: 1,

          exam_initiate_id: "63",
          exam_code: "3302",
          exam_year: "2017",
          lock: "0",
          status: "0",
          active: "0",

          created_at: "2020-09-04 14:46:22",
          updated_at: "2020-09-20 14:25:47",
          deleted_at: null,
          attendance_date: "2020-09-04 00:00:00",
          year: "2017",
          regional_center_name: null,
          center_name: "BAGERHAT GOVT. MAHILA COLLEGE",
          exam_name: "Masters Final",
          paper_name: "BANGLA 1ST PAPER",
          district_name: "BAGERHAT",
        },
        {
          rn: "1",
          id: 5740,
          center_code: "101",
          reg_center_code: null,
          paper_code: "311007",
          total_student: "5",
          total_script: "5",
          packet_size: 200,
          total_packet: 1,

          exam_initiate_id: "63",
          exam_code: "3302",
          exam_year: "2017",
          lock: "0",
          status: "0",
          active: "0",

          created_at: "2020-09-04 14:46:22",
          updated_at: "2020-09-20 14:25:47",
          deleted_at: null,
          attendance_date: "2020-09-04 00:00:00",
          year: "2017",
          regional_center_name: null,
          center_name: "BAGERHAT GOVT. MAHILA COLLEGE",
          exam_name: "Masters Final",
          paper_name: "BANGLA 2ND PAPER",
          district_name: "BAGERHAT",
        },
        {
          rn: "1",
          id: 5740,
          center_code: "101",
          reg_center_code: null,
          paper_code: "311007",
          total_student: "13",
          total_script: "13",
          packet_size: 200,
          total_packet: 1,

          exam_initiate_id: "63",
          exam_code: "3302",
          exam_year: "2017",
          lock: "0",
          status: "0",
          active: "0",

          created_at: "2020-09-04 14:46:22",
          updated_at: "2020-09-20 14:25:47",
          deleted_at: null,
          attendance_date: "2020-09-04 00:00:00",
          year: "2017",
          regional_center_name: null,
          center_name: "BAGERHAT GOVT. MAHILA COLLEGE",
          exam_name: "Masters Final",
          paper_name: "BANGLA DRAMA",
          district_name: "BAGERHAT",
        },
      ];
    },

    getAnsScriptExpelledPaperDataAtCenterRc() {
      return [
        {
          rn: "1",
          id: 5740,
          center_code: "101",
          reg_center_code: null,
          paper_code: "311007",
          total_student: "1",
          total_script: "1",
          packet_size: 1,
          total_packet: 1,
          exam_initiate_id: "63",
          exam_code: "3302",
          exam_year: "2017",
          lock: "0",
          status: "0",
          active: "0",
          created_at: "2020-09-04 14:46:22",
          updated_at: "2020-09-20 14:25:47",
          deleted_at: null,
          attendance_date: "2020-09-04 00:00:00",
          year: "2017",
          regional_center_name: null,
          center_name: "BAGERHAT GOVT. MAHILA COLLEGE",
          exam_name: "Masters Final",
          paper_name: "BANGLA 1ST PAPER",
          district_name: "BAGERHAT",
        },
        {
          rn: "1",
          id: 5740,
          center_code: "101",
          reg_center_code: null,
          paper_code: "311007",
          total_student: "1",
          total_script: "1",
          packet_size: 1,
          total_packet: 1,

          exam_initiate_id: "63",
          exam_code: "3302",
          exam_year: "2017",
          lock: "0",
          status: "0",
          active: "0",

          created_at: "2020-09-04 14:46:22",
          updated_at: "2020-09-20 14:25:47",
          deleted_at: null,
          attendance_date: "2020-09-04 00:00:00",
          year: "2017",
          regional_center_name: null,
          center_name: "BAGERHAT GOVT. MAHILA COLLEGE",
          exam_name: "Masters Final",
          paper_name: "BANGLA 2ND PAPER",
          district_name: "BAGERHAT",
        },
      ];
    },

    getUsedScriptData() {
      return this.$store.getters.getUsedScriptData;
    },

    //all data
    getScriptStmList() {
      return this.$store.getters.getScriptStmItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    // paper -	total khata -	packet size	 - total packet
    headers() {
      return [
        {
          text: "Sl",
          value: "id",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Center",
          value: "center_code",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Paper",
          value: "paper_code",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "No. Std",
          value: "total_student",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Total Script",
          value: "total_script",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Packet Size",
          value: "packet_size",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Download",
          value: "total_packet",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "20%",
        },
        {
          text: "Status",
          value: "total_packet",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "20%",
        },
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
    methCall() {
      this.$store.dispatch("download_AS_ChallanByCode", fetchRegCenterData);
    },
    downloadAnsChallanByCode(item) {
      console.log("item:", item);
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;
      param.challan = true;

      this.$root
        .$confirm("Are you sure that you want to download? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("download_AS_ChallanByCode", param)
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },
    downloadAnsRequsitonByCode(item) {
      console.log("item:", item);
      let param = {};
      param.challan_no = item.challan_no;
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.exam_year = this.searchParam.year;
      param.requ = true;

      this.$root
        .$confirm("Are you sure that you want to download? ")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("download_AS_ChallanByCode", param)
              .then((res) => {
                console.log("res:", res);
              });
          }
        });
    },

    deleteItemFromCenterChallan(item) {
      console.log("item:", item);
      let param = {
        challan_no: this.currentCenterChallanDetails.challan_no,
        ans_script_id: item.id,
      };
      this.$store.dispatch("deleteItemFromCenterChallan", param).then(() => {
        this.openCenterChallanDetails(item);
        this.fetchCenterChallanList();
      });
    },
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
    openCenterChallanDetails(item) {
      this.currentCenterChallanDetails = item;
      let param = {
        limit: -1,
        challan_type: "CAS",
        challan_no: item.challan_no,
      };
      this.$store.dispatch("fetchCenterChallanDetails", param);
      this.openChenterChallanDetailsBox = true;
    },
    fetchCenterChallanList() {
      let param = {
        limit: -1,
        challan_type: "CAS",
      };
      this.$store.dispatch("fetchCenterChallanList", param);
    },

    distributeCenterChallan(item) {
      this.$root
        .$confirm("Are you sure that you want to Deliver?")
        .then((confirm) => {
          if (confirm) {
            let param = {};
            param.challan_no = item.challan_no;
            this.$store
              .dispatch("distributeCenterChallan", param)
              .then((res) => {
                this.fetchCenterChallanList();
              });
            this.distributeBox = true;
          }
        });
    },
    downLoadTopSheet() {
      this.topsheetParam.date = this.searchParam.date;
      this.topsheetParam.center_code = this.searchParam.center_code;
      this.topsheetParam.exam_code = this.getLoggedInExam.code;
      this.topsheetParam.year = this.getLoggedInYear.year;
      this.topsheetParam.exam_initiate_id = this.getExamInitiateId;
      this.$store.dispatch("downLoadTopSheet", this.topsheetParam);
    },
    openCreateNewChallan() {
      this.modalCreateChalan = true;
    },
    createNewChallan() {
      this.centerChallan.challan_type = "CAS";
      this.centerChallan.center_code = this.searchParam.center_code;
      this.$root
        .$confirm("Are you sure that you want to create new challan? ")
        .then((confirm) => {
          if (confirm) {
            this.modalCreateChalan = false;
            this.$store
              .dispatch("addNewChallan", this.centerChallan)
              .then(() => {
                this.fetchCenterChallanList();
              });
          }
        });
    },

    searchAnsScriptDistTrageryOrRC() {
      this.fetchUsedUnusedData();
    },

    download_AS_StmReport(paper_code) {
      this.submitBtn = false;
      let param = {};

      param.exam_initiate_id = this.getExamInitiateId;
      param.year = this.getLoggedInYear.year;
      param.exam_code = this.getLoggedInExam.code;
      param.paper_code = paper_code;
      param.center_code = this.searchParam.center_code;
      param.datetime = this.searchParam.date;

      this.$store.dispatch("download_AS_StmReport", param);
    },
    clearingCenterSelection() {
      this.searchParam.center_code = "";
      this.showShipping = false;
      this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
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
    getStyleForShipping(flg) {
      return !flg
        ? " opacity:.3;pointer-events: none ; display:none"
        : "padding-top:0px !important";
      // display:none
    },
    fetchUsedUnusedData() {
      this.topsheetParam.center_code = this.searchParam.center_code;
      this.searchParam.datetime = this.searchParam.date;
      this.$store
        .dispatch("fetchUsedScriptData", this.searchParam)
        .then((data) => {
          console.log("look here ->", data);
          if (data.status != null) {
            if (data.status == 1) {
              this.showShipping = true;
              this.fetchAnsScriptPaperDataAtCenterRc();
            } else {
              this.showShipping = false;
            }
          } else {
            this.$store.commit("SET_SNACKBAR", {
              msg:
                "No Attendance on this date ( " + this.searchParam.date + " )",
              color: "red",
            });
            this.showShipping = false;
          }

          console.log("data.statusdata.statusdata.status", data);
        });
      this.fetchRoutineWiseStudentCount();
    },
    fetchRoutineWiseStudentCount() {
      // console.log("hay sp ->", this.searchParam);
      let param = { ...this.searchParam };
      param.exam_date = this.searchParam.date;
      this.$store
        .dispatch("fetchRoutineWiseStudentCount", param)
        .then((data) => {
          this.StudentCountByRoutine = data.student_count;
        });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      // this.searchParam.sort = sortBy;
      //this.searchParam.search = this.search;
    },

    fetchAnsScriptPaperDataAtCenterRc() {
      console.log("am I here ...", this.searchParam);
      this.setLimit();
      this.loading = true;
      this.searchParam.datetime = this.searchParam.date;
      this.searchParam.final = true;
      this.searchParam.script_type = this.ShippingType + 1; // 1 script type
      this.$store
        .dispatch(
          "fetchAnsScriptPaperDataAtCenterRcTodayScript",
          this.searchParam
        )
        .then((data) => {
          console.log("am I here --- in then", data);
          this.selected = [];
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
          if (
            parseInt(this.getAnsScriptPaperDataAtCenterRc[0].packet_size) == 0
          ) {
            this.func_ms_packetSize();
          }
          this.func_ms_packetSize();
        });
    },

    submitUsedUnused() {
      console.log("getUsedScriptDatagetUsedScriptData", this.getUsedScriptData);
      this.$store
        .dispatch("postUsedScriptData", this.getUsedScriptData)
        .then((response) => {
          console.log("------->response", response);
          this.fetchUsedUnusedData();
        });
    },
    getFormatedDate(date) {
      if (date == null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    fetchTreasuryData() {
      // try {
      console.log("called");
      this.loading = true;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.center_code;
      }
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.year = this.getLoggedInYear.year;
      console.log("calling dispatc", this.searchParam);
      this.$store
        .dispatch("fetchTreasuryReportData", this.searchParam)
        .then((data) => {
          this.loading = false;
          try {
            this.sl_count = data.from;
            this.pagination.totalItems = data.total;
          } catch (err) {}

          console.log("Done fetch ", data);
          // this.updateData();
          // this.updatePacketSize(false);
          // this.updateLooseScript();
        });
      // } catch (ex) {}
    },
    // main script
    func_ms_packetSize() {
      console.log("func_ms_packetSize", this.ms_packetSize);
      this.getAnsScriptPaperDataAtCenterRc.forEach((obj, i) => {
        if (obj.treasury_status == 1 || obj.distribute_status == 1) {
          console.log("obj:", obj);
        } else {
          obj.packet_size = parseInt(this.ms_packetSize);
          obj.total_packet = Math.ceil(
            parseInt(obj.total_student) / parseInt(obj.packet_size)
          );
        }
      });
    },
    func_ms_multiplier() {
      console.log("func_ms_multiplier", this.ms_multiplier);
      this.getScriptStmList.forEach((obj, i) => {
        obj.main_script_multiplier = parseFloat(this.ms_multiplier);
      });
    },
    func_ms_multiplier_calculated(item) {
      return (item.main_script_multiplier_calculated = Math.ceil(
        parseFloat(item.main_script_multiplier) *
          parseInt(item.main_script_count)
      ));
    },
    func_ms_adjustment_count(item) {
      let temp =
        parseInt(item.main_script_multiplier_calculated) -
        parseInt(item.main_script_adjustment_count);
      // console.log("-->", parseInt(item.main_script_adjustment_count));
      item.main_script_issued_rounded =
        Math.ceil(temp / parseInt(item.main_script_packet_size)) *
        parseInt(item.main_script_packet_size);

      item.main_script_total_packet = Math.ceil(
        parseInt(item.main_script_issued_rounded) /
          parseInt(item.main_script_packet_size)
      );

      console.log(item.main_script_issued_rounded);
      return parseInt(item.main_script_adjustment_count);
    },
    // add remove functions
    removeMS(item) {
      let temp =
        parseInt(item.main_script_issued_rounded) -
        parseInt(item.main_script_packet_size);
      if (temp <= 0) {
        item.main_script_issued_rounded = 0;
      } else {
        item.main_script_issued_rounded =
          parseInt(item.main_script_issued_rounded) -
          parseInt(item.main_script_packet_size);
      }
      item.main_script_total_packet =
        parseInt(item.main_script_issued_rounded) /
        parseInt(item.main_script_packet_size);
    },
    addMS(item) {
      item.main_script_issued_rounded =
        parseInt(item.main_script_issued_rounded) +
        parseInt(item.main_script_packet_size);
      item.main_script_total_packet =
        parseInt(item.main_script_issued_rounded) /
        parseInt(item.main_script_packet_size);
      item.remove_status = true;
    },
    // extra script
    func_es_packetSize() {
      console.log("func_es_packetSize", this.es_packetSize);
      this.getScriptStmList.forEach((obj, i) => {
        obj.extra_script_packet_size = parseInt(this.es_packetSize);
        obj.extra_script_issued_rounded =
          Math.ceil(
            obj.extra_script_issued_rounded /
              parseInt(obj.extra_script_packet_size)
          ) * parseInt(obj.extra_script_packet_size);
        obj.extra_script_total_packet = Math.ceil(
          parseInt(obj.extra_script_issued_rounded) /
            parseInt(obj.extra_script_packet_size)
        );
      });
    },
    func_es_multiplier() {
      console.log("func_es_multiplier", this.es_multiplier);
      this.getScriptStmList.forEach((obj, i) => {
        obj.extra_script_multiplier = parseFloat(this.es_multiplier);
      });
    },
    func_es_multiplier_calculated(item) {
      return (item.extra_script_multiplier_calculated = Math.ceil(
        parseFloat(item.extra_script_multiplier) *
          parseInt(item.extra_script_count)
      ));
    },
    func_es_adjustment_count(item) {
      let temp =
        parseInt(item.extra_script_multiplier_calculated) -
        parseInt(item.extra_script_adjustment_count);

      item.extra_script_issued_rounded =
        Math.ceil(temp / parseInt(item.extra_script_packet_size)) *
        parseInt(item.extra_script_packet_size);

      item.extra_script_total_packet = Math.ceil(
        parseInt(item.extra_script_issued_rounded) /
          parseInt(item.extra_script_packet_size)
      );
      return parseInt(item.extra_script_adjustment_count);
    },
    // add remove functions
    removeES(item) {
      let temp =
        parseInt(item.extra_script_issued_rounded) -
        parseInt(item.extra_script_packet_size);
      if (temp <= 0) {
        item.extra_script_issued_rounded = 0;
      } else {
        item.extra_script_issued_rounded =
          parseInt(item.extra_script_issued_rounded) -
          parseInt(item.extra_script_packet_size);
      }
      item.extra_script_total_packet =
        parseInt(item.extra_script_issued_rounded) /
        parseInt(item.extra_script_packet_size);
    },
    addES(item) {
      item.extra_script_issued_rounded =
        parseInt(item.extra_script_issued_rounded) +
        parseInt(item.extra_script_packet_size);
      item.extra_script_total_packet =
        parseInt(item.extra_script_issued_rounded) /
        parseInt(item.extra_script_packet_size);
      item.remove_status = true;
    },
    // hudai

    searchScriptStm() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("searchScriptStm", this.searchParam).then((data) => {
        this.loading = false;
        try {
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        } catch (err) {
          this.sl_count = 1;
        }
        // this.updateData();
        // this.updatePacketSize(false);
        // this.updateLooseScript();
      });
    },

    updateData() {
      console.log("˜˜", this.getScriptStmList);
      this.getScriptStmList.forEach(function (item) {
        console.log("--->", item);
        // item.main_script_packet_size =
        let main =
          parseInt(item.main_script_multiplier_calculated) -
          parseInt(item.main_script_adjustment_count);

        console.log("main->", main);
        item.main_script_issued_rounded =
          Math.ceil(main / parseInt(item.main_script_packet_size)) *
          parseInt(item.main_script_packet_size);

        item.main_script_total_packet = Math.ceil(
          parseInt(item.main_script_issued_rounded) /
            parseInt(item.main_script_packet_size)
        );

        // obj.main_script_issued_rounded ;
        // obj.packet_size = ps;
        // console.log("˜˜> this one ??");

        let extra =
          parseInt(item.extra_script_multiplier_calculated) -
          parseInt(item.extra_script_adjustment_count);

        item.extra_script_issued_rounded =
          Math.ceil(extra / parseInt(item.extra_script_packet_size)) *
          parseInt(item.extra_script_packet_size);

        item.extra_script_total_packet = Math.ceil(
          parseInt(item.extra_script_issued_rounded) /
            parseInt(item.extra_script_packet_size)
        );
      });
    },

    // done upto this point

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

    submitASCenterToTreasury() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("postAnsScriptCenterToTreasury", this.selected)
              .then((res) => {
                console.log("in ----/// --- return then", res);
                this.fetchAnsScriptPaperDataAtCenterRc();
                this.download_AS_StmReport();
                // self.fetchTreasuryData();
              });
          }
        });
    },

    downloadScriptStm() {
      console.log("->", this.searchParam);
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("getScriptStatementPdf", this.searchParam)
              .then(() => {
                console.log("in return then downloadScriptStm");
                // self.searchScriptStm();
              });
          }
        });
    },
    // extra
    updatePacketSize(val) {
      this.startEffect(val);
      let ps = parseInt(this.packetSize);

      this.getScriptStmList.forEach(function (obj) {
        obj.packet_size = ps;
        // console.log("˜˜>", obj.packet_size);
      });
      // console.log("->", this.getScriptStmList);
      this.updateLooseScript();
    },

    updateLooseScript() {
      let ep = parseFloat(this.scriptLoose);
      this.getScriptStmList.forEach(function (obj) {
        obj.loose_percentage = ep;
        obj.loose_count = Math.ceil(ep * parseInt(obj.script_count));
        // obj.total_script_count =
        //   parseInt(obj.script_count) + parseInt(obj.loose_count);
      });
      this.updateTotalPacket();
    },

    updateTotalPacket() {
      let ps = parseInt(this.packetSize);
      this.getScriptStmList.forEach(function (obj) {
        obj.main_packet = Math.ceil(parseInt(obj.script_count) / parseInt(ps));
        obj.extra_packet = Math.ceil(parseInt(obj.loose_count) / parseInt(ps));
      });
    },

    startEffect(val) {
      // this.v = 0;
      if (val) {
        this.t = setInterval(
          function () {
            this.changeColor = !this.changeColor;
            this.v = this.v + 1;
          }.bind(this),
          500
        );
      }
    },
  },
  watch: {
    // getUsedScriptData(val) {
    //   let date = this.usedUnused.date;
    //   this.usedUnused = val;
    //   this.usedUnused.ms_count = val.student_count;
    //   this.usedUnused.es_count = val.student_count;
    //   this.usedUnused.date = date;
    // },
    // .
    // .
    // .
    //  this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
    // searchParam: {
    //   deep: true,
    //   handler(val) {
    //     this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");

    //   }
    // },
    usedUnused: {
      deep: true,
      handler(val) {
        for (let i = 0; i < val.ms_count.length; i++) {
          if (Number.isInteger(parseInt(val.ms_count[i]))) {
            this.msUsedFlag = false;
          } else {
            this.msUsedFlag = true;
            break;
          }
        }
        for (let i = 0; i < val.es_count.length; i++) {
          if (Number.isInteger(parseInt(val.es_count[i]))) {
            this.esUsedFlag = false;
          } else {
            this.esUsedFlag = true;
            break;
          }
        }
      },
    },

    pagination() {
      this.fetchAnsScriptPaperDataAtCenterRc();
    },
    v(val) {
      if (val % 2 == 0) {
        clearInterval(this.t);
      }
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
    getScriptStmList(val) {
      this.ms_packetSize = val[0].main_script_packet_size;
      this.ms_multiplier = val[0].main_script_multiplier;
      this.es_packetSize = val[0].extra_script_packet_size;
      this.es_multiplier = val[0].extra_script_multiplier;
    },
    getCorrectCenterStatus(val) {
      if (val) {
        this.topsheetParam.center_code = this.getAuthUser.center.center_code;
        // this.searchExamRoutineList();
      }
    },
    getExamInitiateId() {
      this.topsheetParam.center_code = this.getAuthUser.center.center_code;
      this.topsheetParam.exam_code = this.getLoggedInExam.code;
      this.topsheetParam.year = this.getLoggedInYear.year;
      this.topsheetParam.exam_initiate_id = this.getExamInitiateId;
    },
  },
};
</script>
<style>
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
.fcTable table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 10px;
}
/* .sp .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  padding-left: 10px;
} */
.sp .v-text-field__slot {
  padding-left: 10px;
}
.getWhite {
  background-color: rgb(233, 233, 233);
  font-size: 25px !important ;
}

.getHighlight {
  background-color: rgba(255, 255, 255, 0);
}

.primaryStm {
  background-color: #e0f7fa;
}

.mainScriptCss {
  background-color: #b2ebf2;
  /* background-color: #00bfd8; */
}

.extraScriptCss {
  background-color: #4dd0e1;
}

table.v-table thead tr {
  background-color: rgb(236, 236, 236);
}

/* .tfCSS {
  padding-top: 0px;
  margin-top: 0px;
} */
.tfCSS .v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}

/* .v-chip .v-chip__content {
  padding: 0 0px;
} */
</style>
