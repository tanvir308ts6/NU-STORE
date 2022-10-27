<template>
  <v-container fluid style="padding: 0px" v-if="true">
    <!-- {{searchParam}} -->
    <v-card color="pink" class="pa-3">
      <v-card class="pa-3" color="pink lighten-5">
        <v-text-field
          label="Provide Packet Size (Press Enter)"
          v-model="packetSize"
          outline
          @change="setPacketSize"
          @keyup.enter="setPacketSize"
        ></v-text-field>
        <v-btn
          color="primary"
          style="float: right; margin-top: -75px; margin-right: 50px"
          @click="setPacketSize"
          >Set Packet Size</v-btn
        >
        <div>
          <v-data-table
            v-model="selected"
            item-key="id"
            select-all
            :loading="fetchingStatus"
            :headers="headers"
            :items="getAnsScriptPaperDataAtCenterRc"
            class="elevation-0 mt-0"
            hide-actions
          >
            <template v-slot:items="props">
              <!-- :style="getRightStyle(props.item)" -->
              <tr>
                <td class="text-xs" style="padding: 0 10px">
                  <div
                    v-if="
                      props.item.treasury_status == 1 ||
                      props.item.distribute_status == 1
                    "
                  >
                    <v-icon>highlight_alt</v-icon>
                  </div>
                  <div v-else>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details
                      :disabled="
                        props.item.treasury_status == 1 ||
                        props.item.distribute_status == 1
                      "
                    ></v-checkbox>
                  </div>
                </td>
                <td class="text-xs" style="padding-left: 20px">
                  {{ 1 + props.index }}
                </td>

                <td class="text-xs">
                  {{ props.item.paper_name }} ({{ props.item.paper_code }})
                </td>
                <td class="text-xs-center">{{ props.item.total_student }}</td>
                <td class="text-xs-center">{{ props.item.total_script }}</td>
                <td class="text-xs-center">{{ props.item.packet_size }}</td>
                <td class="text-xs-center">{{ props.item.total_packet }}</td>
                <td class="text-xs-center">
                  <v-btn small @click="download_AS_Sticker(props.item)"
                    >Label</v-btn
                  >
                </td>
                <td class="text-xs-center">
                  <v-chip>
                    <b>{{ props.item.status_name }}</b>
                  </v-chip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
        <!-- http://103.4.145.242:8006/api/auth/report/update-ans-script-packet-size -->
        <!-- <pre> {{getCenterChalanList}} </pre> -->
        <v-layout>
          <v-flex xs2>
            <v-layout justify-center row fill-height align-center>
              <v-btn
                color="primary"
                class="mt-4"
                @click="saveCenterDataAllotment"
                >Save allotment</v-btn
              >
            </v-layout>
          </v-flex>
          <v-flex xs10>
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
              >Add To Challan</v-btn
            >
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {},
  props: {
    searchParam: Object,
    fetchData: Function,
    fetchingStatus: Boolean,
    updateChallanList: Function,
  },
  data() {
    return {
      selectedChallan: "",
      packetSize: 10,
      selected: [],
      loading: false,
    };
  },
  created() {
    // this.downParam.exam_initiate_id = this.getExamInitiateId;
    // this.downParam.exam_year = this.getLoggedInYear.year;
    // this.downParam.exam_code = this.getLoggedInExam.code;
  },
  mounted() {
    this.fetchData();
    this.fetchCenterChallanList();
  },
  computed: {
    getAnsScriptPaperDataAtCenterRc() {
      return this.$store.getters.getAnsScriptPaperDataAtCenterRcTS;
    },
    filteredChallanList() {
      return this.getCenterChalanList.filter(function (el) {
        return parseInt(el.distribute_status) == 0;
      });
    },
    getCenterChalanList() {
      return this.$store.getters.getCenterChallanList;
    },

    headers() {
      return [
        {
          text: "Sl",
          value: "id",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "5%",
        },

        {
          text: "Paper",
          value: "paper_code",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "40%",
        },
        {
          text: "No. Std",
          value: "total_student",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "10%",
        },
        {
          text: "Total Script",
          value: "total_script",
          sortable: false,
          align: "left",
          class: "mainScriptCss",
          width: "10%",
        },
        {
          text: "Packet Size",
          value: "packet_size",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "10%",
        },
        {
          text: "Total Packet",
          value: "total_packet",
          align: "center",
          sortable: false,
          class: "mainScriptCss",
          width: "10%",
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
  },
  // http://127.0.0.1:8000/api/auth/report/center-ans-script-challans?limit=10&challan_type=AS
  methods: {
    download_AS_Sticker(item) {
      let param = {};

      param.exam_initiate_id = this.getExamInitiateId;
      param.year = this.getLoggedInYear.year;
      param.exam_code = this.getLoggedInExam.code;
      param.paper_code = item.paper_code;
      param.center_code = this.searchParam.center_code;
      // param.datetime = this.searchParam.date;
      param.script_type = 3;
      // exam_initiate_id=63&year=2017&exam_code=3302&paper_code=311007&center_code=101&script_type=1

      this.$store.dispatch("download_AS_Sticker", param);
    },
    saveCenterDataAllotment() {
      // http://103.4.145.242:8006/api/auth/report/update-ans-script-packet-size
      this.$store.dispatch(
        "saveCenterToScriptDataAllotment",
        this.getAnsScriptPaperDataAtCenterRc
      );
    },
    fetchCenterChallanList() {
      let param = {
        limit: -1,
        challan_type: "CAS",
      };
      this.$store.dispatch("fetchCenterChallanList", param);
    },
    addTochallan() {
      this.selected.forEach((obj) => {
        obj.challan_no = this.selectedChallan;
      });
      this.$store.dispatch("addToChallanFromCenter", this.selected).then(() => {
        this.updateChallanList();
      });
    },
    getParam() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      param.exam_year = this.getLoggedInYear.year;
      return param;
    },
    setPacketSize() {
      this.getAnsScriptPaperDataAtCenterRc.forEach((obj) => {
        obj.packet_size = this.packetSize;
      });
      this.getAnsScriptPaperDataAtCenterRc.forEach((obj) => {
        obj.total_packet = Math.ceil(
          parseInt(obj.total_script) / parseInt(this.packetSize)
        );
      });
      let self = this;
      setTimeout(function () {
        self.saveCenterDataAllotment();
      }, 50);
      // this.saveCenterDataAllotment();
    },
    getAnsScriptChallanNumberList() {
      this.$store.dispatch("fetchAnsScriptChallanNumberList", {
        challan_type: "AS",
      });
    },
  },
  watch: {},
};
</script>

