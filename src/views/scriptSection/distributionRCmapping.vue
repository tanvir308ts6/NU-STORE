<template>
  <v-container fluid>
    <v-dialog v-model="mappedCenterDetailsDialog" width="500">
      <v-toolbar dark color="primary">
        <v-toolbar-title class="title">Mapped Center Details Info</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-data-table
          :headers="mappedCenterDetailsHeaders"
          :items="detailsCenters"
          class="elevation-1"
          hide-headers
          hide-actions
        >
          <template v-slot:items="props">
            <td>{{ props.index + 1}}</td>
            <td class="text-xs-left">{{ props.item.center_code }} - {{ props.item.center_name }}</td>
          </template>
        </v-data-table>
      </v-card>
      <!-- {{detailsCenters}} -->
    </v-dialog>
    <!-- {{ getRcMappingSummary }} -->
    <v-container fluid style="padding:10px">
      <v-layout class="my-2 pr-3">
        <v-flex xs11>
          <v-autocomplete
            class="ma-0"
            label="Select Regional Center"
            item-text="center_name"
            item-value="regional_center_code"
            v-model="searchParam.reg_center_code"
            :items="getRegCenList"
            prepend-inner-icon="edit"
            outline
            hide-details
          >
              <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="searchParam.reg_center_code = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >
                    {{ data.item.center_name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="
                         
                          data.item.center_name
                      "
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="
                          
                            data.item.center_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
    
          </v-autocomplete>
        </v-flex>
        <v-flex xs1></v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs5>
          <v-layout column>
            <v-flex xs6 class="mx-0">
              <v-autocomplete
                class="ma-1"
                v-model="searchParam.dist_code"
                :item-text="(item) => item.id + ' - ' + item.district_name"
                item-value="dist_code"
                :items="getDistrictList"
                menu-props="auto"
                label="Select District"
                hide-details
                prepend-inner-icon="subject"
                outline
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="searchParam.dist_code = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >{{ data.item.district_name }}</v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ data.item.dist_code }} -
                        {{ data.item.district_name }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs6>
              <v-autocomplete
                class="ma-1"
                v-model="searchParam.div_code"
                :item-text="
                  (item) => item.div_code + ' - ' + item.division_name
                "
                item-value="div_code"
                :items="getDivisionList"
                menu-props="auto"
                label="Select Division"
                hide-details
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
                    {{
                    data.item.div_code + " - " + data.item.division_name
                    }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="
                          data.item.div_code +
                          ' - ' +
                          data.item.division_name
                      "
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="
                            data.item.div_code +
                            ' - ' +
                            data.item.division_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs5>
          <v-layout column>
            <v-flex xs6 class="mx-0">
              <v-text-field
                class="ma-1"
                outline
                hide-details
                name="code"
                label="Center Code"
                v-model="searchParam.center_code"
                prepend-inner-icon="edit"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs2 class="mx-3">
          <v-layout justify-center row fill-height align-center>
            <v-btn outline round large @click="searchCenterList()">Search</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid style="padding:10px">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Regional Center to Center Mapping For Distribution:</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
        </v-layout>
      </v-card>
      <!-- <pre>{{getRcMappingCenterList[0]}} </pre>
      <pre>{{getRcMappingCenterList[1]}} </pre>-->
      <v-data-table
        v-if="forceRand"
        v-model="rcMappingSubmitParam.centers"
        item-key="id"
        select-all
        :loading="loading"
        :headers="headers"
        :items="getRcMappingCenterList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr :class="checkStatus(props.item.sameAsMappedRc)">
            <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ sl_count + props.index }}</td>
            <td class="text-xs">
              {{ props.item.center_code }} - {{ props.item.center_name }},
              {{ props.item.district_name }}
            </td>

            <td class="text-xs-center">
              <span
                v-if="(props.item.total_ms_count)!=0"
              >{{props.item.total_ms_packet_count * props.item.total_ms_count}}</span>
            </td>
            <!--  -->
            <td class="text-xs-center">
              <span v-if="(props.item.total_ms_count)!=0">{{ props.item.total_ms_count }}</span>
            </td>
            <td class="text-xs-center">
              <span
                v-if="(props.item.total_es_count)!=0"
              >{{props.item.total_es_packet_count * props.item.total_es_count}}</span>
            </td>
            <td class="text-xs-center">
              <span v-if="(props.item.total_es_count)!=0">{{props.item.total_es_count}}</span>
            </td>
            <td class="text-xs">{{ props.item.before_rc_mapping_regional_center_name }}</td>
            <td class="text-xs">{{ props.item.after_rc_mapping_regional_center_name }}</td>
          </tr>
          <!-- <td class="text-xs">{{ props.item.phone }}</td>
          <td class="text-xs">{{ props.item.email }}</td>-->
        </template>
      </v-data-table>
      <!-- <pre>{{getRcMappingCenterList}} </pre> -->
      <composeMail
        :toMail.sync="emailList"
        :toSms.sync="smsList"
        :dialogStatus.sync="mailDialogStatus"
      ></composeMail>
    </v-container>
    <v-container style="padding:0px">
      <v-card flat color="transparent">
        <v-layout row>
          <v-flex xs4 />
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              solo
              label="Select Regional Center"
              item-text="center_name"
              item-value="regional_center_code"
              v-model="rcMappingSubmitParam.regCenter"
              :items="getRegCenList"
              prepend-inner-icon="edit"
              outline
              return-object
              hide-details
            >
              <template v-slot:selection="data">
                <v-chip close @input="rcMappingSubmitParam.regCenter = undefined">
                  <span class="title">{{ data.item.center_name }}</span>
                </v-chip>
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
          <v-flex>
            <v-layout justify-center row fill-height align-center>
              <v-icon large>play_arrow</v-icon>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <v-layout justify-center row fill-height align-center>
              <v-btn dark large @click="addToRc()">ADD TO RC</v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <v-layout justify-center row fill-height align-center>
              <v-btn dark large @click="removeToRc()">REMOVE FROM RC</v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs4 />
        </v-layout>
      </v-card>
    </v-container>
    <!-- <pre> rcMappingSubmitParam: {{ rcMappingSubmitParam }} </pre> -->
    <v-container>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Regional Center to Center Mapping Summary:</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />
          <!-- <v-card flat> -->
          <!-- <v-card-text class="title"> -->
          <v-chip class="px-3">
            Total Unmapped Centers:
            <span class="title px-2">{{totalCenters-getSum()}}</span>
          </v-chip>
          <!-- </v-card-text> -->
          <!-- </v-card> -->
        </v-layout>
      </v-card>

      <v-data-table
        :loading="RcMappingSummaryloading"
        :headers="summaryHeaders"
        :items="getRcMappingSummary"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">
            {{ props.item.regional_center_code }} -
            {{ props.item.regional_center_name }}
          </td>
          <td class="text-xs-center">
            <v-btn
              @click="showMappedCenterDetails(props.item.regional_center_code)"
            >{{ props.item.allocated_center_count }}</v-btn>
          </td>
          <td class="text-xs-center">
            <v-btn @click="downloadMappedCenterDetailsReport( props.item)">download</v-btn>
          </td>
        </template>
      </v-data-table>
      <v-data-table
        :headers="summaryHeaders"
        :items="[{}]"
        class="elevation-1 mt-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        hide-actions
        :hide-headers="true"
      >
        <template v-slot:items="props">
          <td class="boarder"></td>
          <td class="text-xs boarder">{{ props.item.center_name }}</td>
          <td class="text-xs-center boarder">Sum: {{getSum()}}</td>
          <td class="text-xs-center boarder"></td>
        </template>
      </v-data-table>
    </v-container>
    <!-- <pre> {{rcMappingSubmitParam}}</pre> -->
    <!-- <pre> {{ getRegionalCenterList }} </pre>
    <pre style="opacity:.3"> {{ selected }}</pre>-->
  </v-container>
</template>

<script>
import formDialog from "@/components/centerList/centerForm.vue";
import centerDetail from "@/components/centerList/centerDetail.vue";
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "../../mixin/common_getters_mixin";
import Vue from "vue";

export default {
  mixins: [commonGet],
  components: {
    formDialog,
    centerDetail,
    composeMail,
  },
  data() {
    return {
      forceRand: true,
      selected: [],
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      mailDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      centerDetailDialog: false,
      currentItem: {},
      rowCount: 0,
      totalCenters: 0,
      search: "",
      sl_count: -1,
      smsList: [],
      emailList: [],
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "Center", value: "center_name", sortable: false },
        // { text: "Division", value: "center_code", sortable: false },
        // { text: "District", value: "district_code", sortable: false },
        { text: "Total MS Count", value: "script_count", sortable: false },

        {
          text: "Total MS Packet Count",
          value: "division_name",
          sortable: false,
        },

        { text: "Total ES Count", value: "script_count", sortable: false },

        {
          text: "Total ES Packet Count",
          value: "division_name",
          sortable: false,
        },
        { text: "Original RC", value: "district_code", sortable: false },
        { text: "Mapped Rc", value: "district_code", sortable: false },
      ],
      summaryHeaders: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
          width: "10%",
          class: "boarder",
        },
        {
          text: "Regional Center Name",
          value: "center_name",
          sortable: false,
          width: "20%",
          class: "boarder",
        },

        // { text: "District", value: "district_code", sortable: false },
        {
          text: "Allocated Center Count",
          value: "script_count",
          sortable: false,
          align: "center",
          width: "20%",
          class: "boarder",
        },
        {
          text: "Report",
          value: "center_code",
          sortable: false,
          align: "center",
          width: "20%",
          class: "boarder",
        },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      rcMappingSubmitParam: {
        centers: [],
        regCenter: {},
      },
      rcMappingSummaryParam: {},
      RcMappingSummaryloading: false,

      mappedCenterDetailsDialog: false,
      detailsCenters: [],
      mappedCenterDetailsHeaders: [
        {
          text: "Count",
          align: "left",
          sortable: false,
          value: "id",
        },
        {
          text: "Code - Name",
          align: "left",
          sortable: false,
          value: "id",
        },
      ],
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };

    this.$store.commit("UNSET_FORMNOTIFY");
    this.$store.dispatch("callCenterData");
    this.$store.dispatch("fetchDistrictData", limit);

    //division
    if (!this.$store.getters.getDivisionItems.length) {
      this.$store.dispatch("fetchDivisionData", limit);
    }

    //district
    if (!this.$store.getters.getDistrictItems.length) {
      this.$store.dispatch("fetchDistrictData", limit);
    }

    this.$store.dispatch("fetchRegCenterData");
    this.$store.dispatch("callRegionalCenterData", limit);

    // rcMappingSubmitParam
    this.rcMappingSubmitParam.exam_code = this.getLoggedInExam.code;
    this.rcMappingSubmitParam.exam_initiate_id = this.getExamInitiateId;
    this.rcMappingSubmitParam.year = "" + this.getLoggedInYear.year;

    this.rcMappingSummaryParam.exam_code = this.getLoggedInExam.code;
    this.rcMappingSummaryParam.exam_initiate_id = this.getExamInitiateId;
    this.rcMappingSummaryParam.year = "" + this.getLoggedInYear.year;

    this.$store
      .dispatch("fetchRcMappingSummary", this.rcMappingSummaryParam)
      .then((tc) => {
        this.totalCenters = tc;
      });
  },
  computed: {
    getRcMappingSummary() {
      return this.$store.getters.getRcMappingSummary;
    },
    getRegionalCenterList() {
      return this.$store.getters.getRegionalCentertItem;
    },
    getRcMappingCenterList() {
      return this.$store.getters.getRcMappingCenterList;
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

  watch: {
    "rcMappingSubmitParam.regCenter": function (val) {
      try {
        this.rcMappingSubmitParam.regional_center_code =
          val.regional_center_code;
        this.rcMappingSubmitParam.regional_center_name = val.center_name;
      } catch (ex) {
        this.rcMappingSubmitParam.regional_center_code = "";
        this.rcMappingSubmitParam.regional_center_name = "";
      }
      this.getRcMappingCenterList.forEach((obj) => {
        if (
          obj.after_rc_mapping_regional_center_code ===
          this.rcMappingSubmitParam.regional_center_code
        ) {
          let itemIndex = this.getRcMappingCenterList.indexOf(obj);
          let editedItem = obj;
          editedItem.sameAsMappedRc = true;
          this.getRcMappingCenterList.splice(itemIndex, 1, editedItem);
        } else {
          let itemIndex = this.getRcMappingCenterList.indexOf(obj);
          let editedItem = obj;
          editedItem.sameAsMappedRc = false;
          this.getRcMappingCenterList.splice(itemIndex, 1, editedItem);
        }
      });
    },

    pagination() {
      this.searchCenterList();
    },
  },

  methods: {
    downloadMappedCenterDetailsReport(item) {
      let data = {};
      data.exam_code = this.getLoggedInExam.code;
      data.exam_initiate_id = this.getExamInitiateId;
      data.year = this.getLoggedInYear.year;
      data.reg_center_code = item.regional_center_code;
      this.$store.dispatch("downloadMappedCenterDetailsReport", data);
    },
    getSum() {
      let sum = 0;
      // console.log("this.getRcMappingSummary}{}{}{", this.getRcMappingSummary);
      this.getRcMappingSummary.forEach((ele) => {
        sum += parseFloat(ele.allocated_center_count);
      });
      return sum;
    },
    addToRc() {
      if (this.rcMappingSubmitParam.centers.length === 0) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Selected Center to Add",
          color: "red",
        });
      } else {
        this.RcMappingSummaryloading = true;
        this.$store
          .dispatch("addCenterToRcMapping", this.rcMappingSubmitParam)
          .then(() => {
            this.searchCenterList();
            this.$store
              .dispatch("fetchRcMappingSummary", this.rcMappingSummaryParam)
              .then((tc) => {
                console.log("totalCenters", tc);
                this.RcMappingSummaryloading = false;
                this.totalCenters = tc;
              });
          });
      }
    },
    removeToRc() {
      console.log(this.rcMappingSubmitParam.centers.length);
      if (this.rcMappingSubmitParam.centers.length === 0) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Selected Center to Remove",
          color: "red",
        });
      } else {
        this.RcMappingSummaryloading = true;
        this.$store
          .dispatch("removeCenterToRcMapping", this.rcMappingSubmitParam)
          .then(() => {
            this.searchCenterList();
            this.$store
              .dispatch("fetchRcMappingSummary", this.rcMappingSummaryParam)
              .then((tc) => {
                console.log("totalCenters", tc);
                this.RcMappingSummaryloading = false;
                this.totalCenters = tc;
              });
          });
      }
    },
    checkStatus(flag) {
      return flag ? "green lighten-3" : "";
    },
    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.mobile);
        this.emailList.push(item.email);
      } else {
        this.getCenterList.forEach((item) => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      // console.log("tosms ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    unSetEditedData() {
      this.editedItem = {
        center_id: "",
        center_name: "",
        college_code: "",
        center_code: "",
        address: "",
        phone: "",
        email: "",
        mobile: "",
        student_capacity: "",
        district_code: "",
        responsible_person: "",
        active: 1,
      };
    },
    exportCenterListClick() {
      // // console.log("....");
      this.$store.dispatch("exportCenterList");
    },
    getActive(active) {
      var status = active == true ? "Yes" : "No";
      return status;
    },
    editItem(item) {
      this.editedIndex = this.getCenterList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      // console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const index = item.id;
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteCenterItem", index)
              .then(function (data) {
                self.$store.dispatch("callCenterData");
                // self.snackbar = true;
              })
              .catch(function (error) {
                // console.log(error);
                self.$store.dispatch("callCenterData");
              });
          }
        });
      //const index = this.getCenterList.indexOf(item);
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    showDetailItem(item) {
      this.currentItem = item;
      this.centerDetailDialog = !this.centerDetailDialog;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = "" + this.getLoggedInYear.year;
    },
    searchCenterList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRcMappingCenterListData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    showMappedCenterDetails(rcCode) {
      this.detailsCenters = [];
      this.mappedCenterDetailsDialog = true;
      let param = {};
      param.exam_code = this.getLoggedInExam.code;
      param.exam_initiate_id = this.getExamInitiateId;
      param.year = "" + this.getLoggedInYear.year;
      param.reg_center_code = rcCode;
      // console.log("****", param);
      this.$store
        .dispatch("fetchRcMappedCenterDetailsList", param)
        .then((data) => {
          // // console.log("---MMM", data.data.centers);
          this.detailsCenters = data.data.centers;
        });
    },
  },
};
</script>
<style>
.boarder {
  border: 1px solid transparent !important;
}
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
