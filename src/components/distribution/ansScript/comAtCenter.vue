<template>
  <v-container fluid>
    <v-container fluid style="padding: 0px" v-if="ifCenterUser">
      <v-card class="ma-2" dark>
        <v-layout>

          <v-flex xs3>
            <v-layout align-center justify-center row fill-height>
              <div class="title">Attendance Summary :</div>
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <v-layout align-center justify-center row fill-height>
              <v-menu
                v-model="datePickerModel_"
                :close-on-content-click="false"
                full-width
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="getFormatedDate(searchParam2.date)"
                    label="Pick a - date"
                    readonly
                    v-on="on"
                    hide-details
                    prepend-icon="calendar_today"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="searchParam2.date"
                  @change="searchsummary"
                ></v-date-picker>
              </v-menu>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout align-center justify-center row fill-height>
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
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card class="ma-2 pa-2" v-if="attSummaryByCenterList.length">
        <v-layout align-center justify-center row fill-height>
          <div class="title">
            <b
              >Total Student: {{ attSummaryByCenterList[0].total_student }} -
            </b>
            <span style="color: green">
              Present Student: {{ attSummaryByCenterList[0].present_student }}
            </span>
            - Absent Student: {{ attSummaryByCenterList[0].absent_student }} -
            <span style="color: red">
              Reported Student: {{ attSummaryByCenterList[0].reported_student }}
            </span>
          </div>
        </v-layout>
      </v-card>
      <!-- <v-card color="white" class="mt-5">
          <v-layout row>
            <v-card flat>
              <v-badge left overlap>
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    fab
                    small
                    style="margin-top: -1.5em"
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
        </v-data-table> -->
    </v-container>

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
    <!-- {{searchParam}} -->
    <v-container fluid style="padding: 10px">
      <!-- {{getTheoryCenterList}} -->
      <v-layout>
        <v-autocomplete
          :disabled="ifCenterUser"
          v-model="searchParam.center_code"
          :items="getTheoryCenterList"
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
          item-value="id"
          label="Select delivery options"
          outline
        >
          <template v-slot:selection="data">
            <v-chip close @input="searchParam.delivery_status_id = ''" :selected="data.selected" class="chip--select-multi">{{
              data.item.delivery_name
            }}</v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title
                  v-html="data.item.delivery_name"
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
              :value="getFormatedDate(searchParam.date)"
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
            v-model="searchParam.date"
            @change="datePickerModel = false"
          ></v-date-picker>
        </v-menu>
        <v-btn color="primary" large @click="searchCenterWiseDistributionData()"
          >search</v-btn
        >
      </v-layout>

      <v-container fluid style="padding-bottom: 0px">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">
                Ans Script Collection ..
                <span v-if="!rcToCenter">Status ( Center Shipment Panel )</span>
                <!-- <span v-else>information for Regional Center</span> -->
              </v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-hover>
              <v-btn
                slot-scope="{ hover }"
                :class="` elevation-${hover ? 12 : 0}`"
                large
                v-if="!rcToCenter"
                color="amber"
                @click="tsDialog = true"
              >
                <b class="title">Today Scrpt</b>
              </v-btn>
            </v-hover>
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
            <tr>
              <td class="text-xs-left">
                <div v-if="props.item.receive_status == 1">
                  <v-icon>highlight_alt</v-icon>
                </div>
                <div v-else>
                  <div class="text-xs" v-if="!rcToCenter">
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                      v-if="!props.item.distribute_status == 1"
                    ></v-checkbox>
                    <v-icon v-else>highlight_alt</v-icon>
                  </div>
                  <div class="text-xs" v-else>
                    <v-icon v-if="!props.item.distribute_status == 1"
                      >highlight_alt</v-icon
                    >
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                      v-else
                    ></v-checkbox>
                  </div>
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
              <td class="text-xs-left" v-if="!rcToCenter">
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
        <v-layout v-if="!ifAdminUserType">
          <v-flex xs12>
            <v-autocomplete
              class="mt-4"
              v-model="selectedChallan"
              :items="filteredChallanList"
              :item-text="(item) => item.challan_no"
              item-value="challan_no"
              label="Select Challan"
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
                      >{{ data.item.challan_no }} : From:
                      {{ data.item.delivery_from_name }} - To:
                      {{ data.item.delivery_to_name }}</v-list-tile-title
                    >
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>

            <v-btn
              color="primary"
              style="float: right; margin-top: -47px; margin-right: 50px"
              @click="addTochallan"
              >Add To Challan
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- <pre> {{ getAnsScriptPaperDataAtCenterRc }} </pre> -->
      <v-container fluid v-if="!ifAdminUserType">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Chalan Summary</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <!-- <v-btn color="primary" @click="openCreateNewChallan()">Create New Chalan</v-btn> -->
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
                    <b>Deliverd</b>
                  </v-chip>
                </div>
                <div v-else>
                  <v-chip color="red white--text">
                    <b>Not Deliverd</b>
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
    </v-container>

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
                <tr
                  :style="
                    parseInt(props.item.script_type) == 2
                      ? 'background-color: pink;'
                      : ''
                  "
                >
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
                        parseInt(
                          currentCenterChallanDetails.distribute_status
                        ) == 1
                      "
                      color="red white--text"
                      @click="deleteItemFromCenterChallan(props.item)"
                      >delete</v-btn
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
    <!-- <pre>{{getAnsScriptPaperDataAtCenterRc}} </pre> -->
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
      datePickerModel_: false,
      currentCenterChallanDetails: {},
      pagination2: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading2: false,
      sl_count2: 0,
      searchparam: {
        date: new Date().toISOString().substr(0, 10),
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
          text: "Paper",
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
      v: 0,
      openChenterChallanDetailsBox: false,

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
          text: "Paper",
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
      selectedChallan: {},
    };
  },
  created() {
    this.$store.dispatch("fetchDeliveryOptionsData");
    this.$store.dispatch("fetchDeliveryOptionsDataEW");
    this.$store.commit("UNSET_AS_PAPER_DATA_AT_CENTER_RC");
    var limit = {
      page: 1,
      limit: 1000,
    };
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
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);

    this.searchParam.date = new Date().toISOString().substr(0, 10);
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    // if (this.searchParam.center_code) {
    //   this.fetchAnsScriptPaperDataAtCenterRc();
    // } else {
    //   console.log("Not fetching at Created ");
    // }
  },
  computed: {
    getDeliveryOptionsData() {
      return this.$store.getters.getDeliveryOptionsData;
    },
    // getPaperList() {
    //   return this.$store.getters.getPaperItems;
    // },
    getCenterChallanDetailsList() {
      return this.$store.getters.getCenterChallanDetailsList;
    },
    filteredChallanList() {
      return this.getChalanList.filter(function(el) {
        return parseInt(el.distribute_status) == 0;
      });
    },
    getChalanList() {
      return this.$store.getters.getCenterChallanList;
    },
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
    ondateClear() {
      delete this.searchParam.datetime;
      delete this.searchParam.date;
      // this.searchParam.date = "";
      // console.log("here ??");
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

    addTochallan() {
      if (this.selected.length > 0) {
        this.selected.forEach((obj) => {
          obj.challan_no = this.selectedChallan;
        });

        this.$store
          .dispatch("addToChallanFromCenter", this.selected)
          .then(() => {
            this.fetchCenterChallanList();
          });
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "Please Select Items First",
          color: "red",
        });
      }
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
    distributeCenterChallan(item) {
      this.$root
        .$confirm("Are you sure that you want to Distribute?")
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

    fetchCenterChallanList() {
      let param = {
        limit: -1,
        challan_type: "CAS",
      };
      this.$store.dispatch("fetchCenterChallanList", param);
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
    searchsummary() {
      this.datePickerModel_ = false;
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
      if (date == null) return "";
      else return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
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
            this.selected = arr;
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
      this.searchParam.datetime = this.searchParam.date;
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
      //     msg: "Center not selected",
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
