<template>
  <v-container fluid>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em"
                  class="elevation-0"
                  >{{ getRevisedMarkReqData.length }}</v-btn
                >
              </template>
              <v-card-text class="title"
                >Revised Mark Request Details</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
      <v-data-table
        :select-all="valueselect"
        v-model="selected"
        :loading="loading"
        :headers="headers"
        :items="getRevisedMarkReqData"
        class="elevation-1 inputTable"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr :style="getStyle(props.item.revise_marks_status)">
            <td class="text-xs" style="padding: 0 10px">
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
                :disabled="
                  props.item.revise_marks_status === '2' ||
                  props.item.revise_marks_status === '3'
                "
                v-if="props.item.revise_marks_status === '1'"
              ></v-checkbox>
              <v-icon v-else>highlight_alt</v-icon>
            </td>
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs">{{ props.item.script_sl }}</td>
            <td class="text-xs">{{ props.item.revise_marks_reason }}</td>
            <td class="text-xs">{{ props.item.tims_id }}</td>
            <td class="text-xs">{{ props.item.h_tims_id }}</td>
            <td class="text-xs">{{ props.item.e_mark }}</td>
            <td></td>
          </tr>
        </template>
        <template slot="actions-append" v-if="selected.length">
          <v-btn
            round
            color="primary"
            fab
            small
            style="margin-top: +0.5em"
            class="elevation-0"
            v-if="selected.length"
            >{{ selectedItem.length }}</v-btn
          >
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
          <v-layout row wrap class="ml-0 py-0" v-if="selectedItem.length">
            <v-flex xs12 v-if="ifrejectClicked">
              <v-textarea
                hide-details
                class="ma-3"
                outline
                name="input-7-4"
                label="Reason of Rejection"
                v-model="reject_reason"
                auto-grow
                box
                rows="2"
                style="background-color: #ffcdd2"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-alert
            :value="showBeforeSubmitAlert"
            class="my-2 black--text"
            type="warning"
            style="font-size: 1.5em"
            >Please fill up the reject reason section.</v-alert
          >
          <v-layout
            justify-center
            row
            fill-height
            align-center
            v-if="selectedItem.length"
          >
            <v-btn
              color="primary"
              large
              @click.stop.prevent="rejectRequest()"
              class="erBtn"
              >Reject</v-btn
            >
            <v-btn
              color="primary"
              large
              @click.stop.prevent="approveRequest()"
              class="erBtn"
              >Approve</v-btn
            >
          </v-layout>
        </v-card>
      </v-hover>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";

export default {
  props: ["dialogStatus", "curentItem", "searchRepWithheldList"],
  components: {},
  mixins: [commonGet, commonExamYear, common_login_getters],

  data() {
    return {
      ifrejectClicked: false,
      showBeforeSubmitAlert: false,
      reject_reason: "",
      revisedStatus: false,
      valueselect: true,
      selected: [],
      selectedItem: [],
      sl_count: 1,
      loading: false,
      details: [],
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: {},
    };
  },

  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
  },

  computed: {
    //all data
    getRevisedMarkReqData() {
      return this.$store.getters.getRevisedMarkReqData;
    },
    headers() {
      return [
        { text: "SL", value: "sl", width: "5%", sortable: false },
        {
          text: "Script Sl.",
          value: "exam_code",
          width: "10%",
          sortable: false,
        },
        {
          text: "Revise Marks Reason",
          value: "revise_marks_reason",
          width: "40%",
          sortable: false,
        },
        {
          text: "Examiner TMIS ID",
          value: "tmis_id",
          width: "20%",
          sortable: false,
        },
        {
          text: "Head Ex. TMIS ID",
          value: "tmis_id",
          width: "30%",
          sortable: false,
        },
        {
          text: "Examiner Mark",
          value: "e_mark",
          width: "10%",
          sortable: false,
        },
        { text: "", value: "", width: "1%", sortable: false },
        // {
        //   text: "Paper Details",
        //   value: "mandatory_papers",
        //   width: "10%",
        //   sortable: false,
        // },
      ];
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchRescrutinyStd() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchRevisedMarkReqData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.selected = [];
          this.selectedItem = [];
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    approveRequest() {
      this.ifrejectClicked = false;
      console.log("selected,", this.selected);
      let param = {};
      param.detail_ids = [];
      //let detail_ids = [];
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to Approve these Request?")
        .then((confirm) => {
          if (confirm) {
            self.selected.forEach((obj) => {
              if (obj.revise_marks_status === "1") {
                obj.revise_marks_status = "2";
                param.detail_ids.push(obj);
              }
            });
            param.reject_reason = "";
            this.$store
              .dispatch("saveRevisedMarkReqData", param)
              .then((data) => {
                self.searchRescrutinyStd();
              });
          }
        });
    },
    rejectRequest() {
      this.ifrejectClicked = true;
      if (!this.reject_reason) {
        // console.log("if", this.reject_reason + " / " + this.revoke_policy);
        this.showBeforeSubmitAlert = true;
      } else {
        this.showBeforeSubmitAlert = false;
        console.log("selected,", this.selected);
        let param = {};
        param.detail_ids = [];
        // let detail_ids = [];
        var self = this;
        this.$root
          .$confirm("Are you sure that you want to Reject these Request?")
          .then((confirm) => {
            if (confirm) {
              self.selected.forEach((obj) => {
                if (obj.revise_marks_status === "1") {
                  obj.revise_marks_status = "3";
                  param.detail_ids.push(obj);
                }
              });
              param.reject_reason = this.reject_reason;
              this.$store
                .dispatch("saveRevisedMarkReqData", param)
                .then((data) => {
                  self.searchRescrutinyStd();
                });
            }
          });
      }
    },
    getStyle(status) {
      if (status === "2" || status === "3") {
        return "background-color: #E0F7FA;"; // light green
      } else {
        return "background-color: #FFCDD2; "; // light red
      }
    },
  },
  watch: {
    selected(val) {
      this.selectedItem = [];
      val.forEach((obj) => {
        if (obj.revise_marks_status === "1") {
          this.selectedItem.push(obj); // get count of only those with status 1 from all selected
        }
      });
    },
    pagination() {
      this.searchRescrutinyStd();
    },
  },
};
</script>
<style>
/* .inputTable table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 5px;
} */
</style>
