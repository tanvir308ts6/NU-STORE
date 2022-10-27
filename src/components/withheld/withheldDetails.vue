<template>
  <v-container fluid>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent" v-if="curentItem.details">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                >{{ getWithheldReportData.length }}</v-btn>
              </template>
              <v-card-text class="title">Report Details</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
      <v-data-table
        :select-all="valueselect"
        v-model="selected"
        :loading="loading"
        :headers="formFillUpListHeaders"
        :items="getWithheldReportData"
        class="elevation-1 inputTable"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr :style="getStyle(props.item.remove_status)">
            <td v-if="!ifCenterUser">
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
              <!-- {{props.item.remove_status}} -->
            </td>
            <td class="text-xs ml-2">{{ sl_count + props.index }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.exam_code }}</span>
                </template>
                <span class="title">Code: {{ props.item.exam_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ props.item.year }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.college_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.college_code }}</span>
              </v-tooltip>
            </td>
            <!-- <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.subject_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.subject_code }}</span>
              </v-tooltip>
            </td>-->
            <!-- <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.degree_group_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.degree_group_code }}</span>
              </v-tooltip>
            </td>-->
            <!-- <td class="text-xs">{{ props.item.exam_roll }}</td> -->
            <td class="text-xs">{{ props.item.reason }}</td>
            <!-- <td class="text-xs">{{ props.item.policy }}</td> -->
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.paper_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.paper_code }}</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        <template slot="actions-append" v-if="selected.length">
          <v-btn
            round
            color="primary"
            fab
            small
            style="margin-top: +0.5em;"
            class="elevation-0"
            v-if="selected.length"
          >{{ selected.length }}</v-btn>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <!-- <v-card class="pa-3">Reason:{{curentItem.reason}}</v-card>
      <v-card class="pa-3 mt-2">Policy:{{curentItem.policy}}</v-card>-->
      <v-hover v-if="!ifCenterUser">
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
          <v-layout row wrap class="ml-0 py-0">
            <v-flex xs12>
              <v-textarea
                hide-details
                class="mx-3 mt-3"
                outline
                name="input-7-4"
                label="Reason"
                v-model="revoke_reason"
                auto-grow
                box
                rows="2"
                style="background-color: #FFEBEE;"
              ></v-textarea>
            </v-flex>
           <!--  <v-flex xs12>
              <v-textarea
                hide-details
                class="ma-3"
                outline
                name="input-7-4"
                label="Policy"
                v-model="revoke_policy"
                auto-grow
                box
                rows="2"
                style="background-color: #FFCDD2;"
              ></v-textarea>
            </v-flex> -->
          </v-layout>
          <v-alert
            :value="showBeforeSubmitAlert"
            class="my-2"
            type="warning"
          >Please fill up the revoke reason section.</v-alert>
          <v-layout justify-center row fill-height align-center v-if="selected.length">
            <v-btn
              color="primary"
              large
              @click.stop.prevent="removeWithFromWR()"
              class="erBtn"
            >remove from WithHeld / Reported</v-btn>
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
      valueselect: true,
      selected: [],
      revoke_reason: "",
      revoke_policy: "",
      showBeforeSubmitAlert: false,
      forceRerenderFlag: true,
      sl_count: 1,
      loading: false,
      componentStatus: false,
      details: [],
      beforeSubmit: false,
      rollGendMode: true,
      dialog: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      search: "",
      searchParam: {
        full: true,
        admitcard: false,
        final: true
      }
    };
  },

  created() {
    // this.$store.commit("UNSET_FORM_FILLUP_DATA");
    if (this.ifCenterUser) {
      this.valueselect = false;
    }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;3

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
  },

  computed: {
    //all data
    getWithheldReportData() {
      return this.curentItem.details;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    formFillUpListHeaders() {
      return [
        { text: "SL", value: "sl", width: "1%" },
        { text: "Reg No", value: "reg_no", width: "10%" },
        { text: "Exam", value: "exam_code", width: "10%" },
        { text: "Year", value: "year", width: "10%" },
        { text: "College", value: "college_name", width: "19%" },
        // { text: "Subject", value: "subject_code", width: "10%" },
        // { text: "Degree Group", value: "degree_group_name", width: "10%" },
        // { text: "Exam Roll", value: "exam_roll", width: "10%" },
        { text: "Reason", value: "reason", width: "10%" },
        // { text: "Policy", value: "policy", width: "10%" },
        { text: "Course Details", value: "mandatory_papers", width: "10%" }
      ];
    }
  },
  methods: {
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },

    openBeforeSubmit() {
      this.beforeSubmit = true;
    },

    removeSub(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
    close() {
      this.$emit("update:dialogStatus", false);
      this.revoke_reason = "";
      this.revoke_policy = "";
    },
    removeWithFromWR() {
      if (!this.revoke_reason) {
        // console.log("if", this.revoke_reason + " / " + this.revoke_policy);
        this.showBeforeSubmitAlert = true;
      } else {
        this.showBeforeSubmitAlert = false;
        let param = {};
        param.master_id = this.curentItem.id;
        param.detail_ids = [];
        this.selected.forEach(obj => {
          param.detail_ids.push(obj.id);
        });
        param.revoke_reason = this.revoke_reason;
        param.revoke_policy = this.revoke_policy;
        var self = this;
        this.$store.dispatch("withHeldReportRevoke", param).then(data => {
          self.searchRepWithheldList();
          self.close();
        });
      }
    },
    getStyle(status) {
      // return status ? true : false;
      // background-color: red;
      if (status == undefined) {
        console.log(undefined);
        return "background-color: #E0F7FA;"; // light green
      } else {
        return status
          ? "background-color: #FFCDD2; "
          : "background-color: #E0F7FA; "; // light green
      }
    }
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      // this.searchFormFillupList();
    }
  }
};
</script>
<style>
.inputTable table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}
</style>
