<template>
  <v-container fluid>
    <v-dialog v-model="dialogStatus" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <!-- <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>-->
         <!--  <v-toolbar-title v-if="!ifCenterUser">Reported/ WithHeld Details</v-toolbar-title> -->
          <v-toolbar-title >Reported Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialogStatus = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <withheldDetails
          :dialogStatus.sync="dialogStatus"
          :curentItem="curentItem"
          :searchRepWithheldList="searchRepWithheldList"
        ></withheldDetails>
      </v-card>
    </v-dialog>

    <v-dialog v-model="formDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <!-- <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>-->
          <!-- <v-toolbar-title v-if="!ifCenterUser">Report/WithHeld Entry Form</v-toolbar-title> -->
          <v-toolbar-title >Withheld Entry Form</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="formDialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <withheldEntryForm
          :dialogStatus.sync="formDialog"
          :ifCenterItem="ifCenterItem"
          :searchRepWithheldList="searchRepWithheldList"
        ></withheldEntryForm>
      </v-card>
    </v-dialog>

    <v-dialog v-model="paperDialog" width="900">
      <v-toolbar>
        <v-toolbar-title>
          <div class="title">Paper Details</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn round outline flat @click="paperDialog = false">
          <span class="mx-2 subheading">Close</span>(
          <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-layout row wrap class="ml-4 py-4">
          <v-flex v-for="(paper, i) in details" :key="paper.code" xs12 class="ma-2">
            <div class="title">
              <v-layout row class="ml-0">
                <v-flex xs1>
                  <span>({{ i + 1 }})</span>
                </v-flex>
                <v-flex xs1>
                  <span>({{ paper.paper_code }})</span>
                </v-flex>
                <v-flex xs10>
                  <strong style="margin-left:1em">{{ paper.paper_name }}</strong>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-dialog v-model="beforeSubmit" width="900" persistent>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <div class="title white--text">Before Submit Please fillup these info</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark color="white black--text" @click="beforeSubmit = false">
          <span class="mx-2 subheading">Close</span>(
          <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-layout row wrap class="ml-0 py-0">
          <v-flex xs12>
            <v-textarea
              hide-details
              class="ma-3"
              outline
              name="input-7-4"
              label="Reason"
              v-model="reason"
              auto-grow
              box
              rows="2"
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              hide-details
              class="ma-3"
              outline
              name="input-7-4"
              label="Policy"
              v-model="policy"
              auto-grow
              box
              rows="2"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-alert
          :value="showBeforeSubmitAlert"
          class="my-2"
          type="warning"
        >Please fill up the reason and policy section.</v-alert>

        <v-layout justify-center row fill-height align-center>
          <v-btn
            class="ma-2 mb-3 erBtn"
            color="primary"
            large
            @click.stop.prevent="submitWithHeld()"
          >Submit</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <!-- <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>-->
              </template>
              <!-- <v-card-text class="title" v-if="!ifCenterUser">Reported / WithHeld List</v-card-text> -->
              <v-card-text class="title" >Withheld List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn color="primary" @click.stop.prevent="showEntryForm()" class="erBtn">
            Add New
            <v-icon right>library_add</v-icon>
          </v-btn>
        </v-layout>
      </v-card>

      <v-data-table
        :loading="getloading(loading)"
        :headers="formFillUpListHeaders"
        :items="getWithheldReportData"
        class="elevation-1"
        :class="getCustTableCss(radioGroup)"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <!-- <td
            class="text-xs-center"
            v-if="props.item.details.length >0"
          >{{ sl_count + props.index }}</td>-->
          <td class="text-xs-center" v-if="props.item.details.length >0">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.exam_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.exam_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-center" v-if="props.item.details.length >0">{{ props.item.year }}</td>
         <!--  <td
            class="text-xs-center"
            v-if="props.item.type == 1 && props.item.details.length >0"
          >Reported</td> -->
          <!-- <td
            class="text-xs-center"
            v-if="props.item.type == 2 && props.item.details.length >0"
          >WithHeld</td> -->
          <!-- <td class="text-xs-center">{{ props.item.status }}status..</td> -->
          <td class="text-xs-center" v-if="props.item.details.length >0">
            <v-btn
              color="info"
              @click="showDetailsDialog(props.item)"
            >Examinee Details ({{props.item.details.length}})</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <!-- <v-radio-group v-model="radioGroup">
      <v-radio v-for="n in 4" :key="n" :label="getCustTableCss(n)" :value="n"></v-radio>
    </v-radio-group>
    <pre>  {{getWithheldReportData}} </pre>-->
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import withheldDetails from "@/components/withheld/withheldDetails";
import withheldEntryForm from "@/components/withheld/withheldEntryNewForm";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  components: { withheldDetails, withheldEntryForm },
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      curentItem: {},
      radioGroup: 0,
      reason: "",
      policy: "",
      showBeforeSubmitAlert: false,
      forceRerenderFlag: true,
      formDialog: false,
      sl_count: 1,
      loading: false,
      componentStatus: false,
      details: [],
      beforeSubmit: false,
      rollGendMode: true,
      dialogStatus: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: {
        full: true,
        admitcard: false,
        final: true,
      },
      ifCenterItem: {},
      colors: { green: "green", grey: "grey", red: "red" },
    };
  },

  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      this.searchParam.type = 1;
      this.ifCenterItem = {
        center_code: this.getAuthUser.center.center_code,
        type: 1,
      };
      console.log("...m", this.ifCenterItem);
    }

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
    //degree group
    this.$store.dispatch("fetchDegreeGroupList");
    this.$store.dispatch("fetchAllSessionData");
  },
  // all from fillup list
  // if (this.$store.getters.getFormFillupItem.length == 0) {
  // this.$store.dispatch("fetchFormFillupData");
  // this.$store.dispatch("searchFormFillup", this.searchParam);
  // }
  //this.$store.dispatch("fetchFormFillupData");
  // mounted() {
  //   this.$validator.localize("en", this.dictionary);
  // },
  // mounted() {
  //   this.getDataFromApi();
  // },
  computed: {
    getWithheldReportData() {
      return this.$store.getters.getWithheldReportData;
    },
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    ifLoadingListDone() {
      return this.$store.getters.getWithheldReportData.length > 0
        ? false
        : true;
    },
    formFillUpListHeaders() {
      return [
        // { text: "SL.", value: "sl", align: "center" },
        { text: "Exam", value: "exam_name", align: "center" },
        { text: "Year", value: "year", align: "center" },
        // { text: "Type", value: "type", align: "center" },
        // { text: "Status", value: "status", align: "center" },
        { text: "Details", value: "details", align: "center" },
      ];
    },
  },
  methods: {
    getloading(load) {
      if (load) {
        return this.colors.red;
      }
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchRepWithheldList() {
      this.loading = true;
      this.setLimit();
      this.searchParam.type = 2;
      this.searchParam.deleted = 0;
      this.$store
        .dispatch("searchWithHeldReport", this.searchParam)
        .then((data) => {
          console.log("searchWithHeldReport", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },

    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    removeSub(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
    close() {
      this.$emit("update:dialogStatus", false);
      this.searchParam = {
        reg_no: "",
        exam_code: "",
        paper_code: "",
      };
    },
    openBeforeSubmit() {
      this.beforeSubmit = true;
    },
    submitWithHeld() {
      if (!this.reason || !this.policy) {
        // console.log("if", this.reason + " / " + this.policy);
        this.showBeforeSubmitAlert = true;
      } else {
        this.showBeforeSubmitAlert = false;
        this.$store.commit("SET_SNACKBAR", {
          msg: "Success !! Submitted",
          color: "green",
        });
        this.beforeSubmit = false;
      }
    },
    showDetailsDialog(item) {
      this.curentItem = item;
      this.dialogStatus = true;
    },
    showEntryForm() {
      this.formDialog = true;
    },
    getCustTableCss(n) {
      if (n == 1) return "chessboard";
      if (n == 2) return "rowStrip";
      if (n == 3) return "colStrip";
      if (n == 4) return "None";
    },
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      this.searchRepWithheldList();
    },
  },
};
</script>
<style lang="scss">
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}
</style>
