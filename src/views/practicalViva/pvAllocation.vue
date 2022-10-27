<template>
  <v-container fluid>
    <v-card v-if="publishState == 1" class="ma-3">
      <v-alert :value="true" type="info">
        <snap class="display-1">{{ publishMsg }}</snap>
      </v-alert>
    </v-card>
    <v-dialog v-model="unAllocCollSubDialog" fullscreen>
      <v-toolbar dark color="light-blue darken-1">
        <v-toolbar-title>Unallocated Colleges By Subject</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="closeCollSub()">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <pvUnAllocCollege
          :unAllocCollSubDialog.sync="unAllocCollSubDialog"
          :getPVCollList.sync="getPVCollList"
          :searchPVCenterAllocationList.sync="searchPVCenterAllocationList"
          :publishState="publishState"
        />
      </v-card>
    </v-dialog>

    <div class="mb-2 pb-2 mt-4" style="text-align:center">
      <v-btn
        color="purple darken-3"
        @click="createAutoCenter()"
        class="white--text "
        :dark="publishState == 1 && publishState != 1"
        :disabled="getPVCenterAllocationItem.length > 0 || publishState == 1"
      >
        <v-icon dark left>add_circle</v-icon>Create Auto Center
      </v-btn>
      <v-btn
        class="ma-4"
        color="primary"
        @click="generateReport()"
        :disabled="!getPVCenterAllocationItem.length"
      >
        <v-icon dark left>arrow_downward</v-icon>Export Center List
      </v-btn>
    </div>
    <v-dialog v-model="centerAllocationAuto" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title
          >Create Auto Center Allocation ~ Viva/practical</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="centerAllocationAuto = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <centerAllocationAuto
          :centerAllocationAuto.sync="centerAllocationAuto"
          :searchPVCenterAllocationList.sync="searchPVCenterAllocationList"
        ></centerAllocationAuto>
      </v-card>
    </v-dialog>

    <v-divider class="mx-2 pa-2" v-if="!ifCenterUser"></v-divider>

    <div>
      <div class="mx-2 pa-3">
        <div v-if="!ifCenterUser" class=" pa-2">
          <!-- <v-btn
            :disabled="publishState == 1"
            color="primary"
            round
            @click="centerCodeDialog = true"
            dark
            >Set Starting Code</v-btn
          > -->
          <v-btn color="primary" @click="showUnallocColleges()"
            >Sub-wise Unallocated Colleges
          </v-btn>
        </div>

        <v-card
          color="white"
          v-for="item in getPVCenterAllocationItem"
          :key="item.subject_code"
          flat
        >
          <v-layout column>
            <v-card color="#0097a7" class="CATCSS">
              <v-layout>
                <v-card flat color="#0097a7">
                  <v-card-text class="headline white--text"
                    >Subject Name : {{ item.subject_code }} -
                    {{ item.subject_name }}</v-card-text
                  >
                </v-card>
                <v-spacer></v-spacer>
              </v-layout>
            </v-card>
            <v-data-table
              hide-actions
              :headers="headers"
              :items="item.centers"
              class="elevation-4 colorChange "
            >
              <template v-slot:items="props">
                <td class="text-xs-left CATCSS">
                  {{ props.item.center_code }}
                </td>
                <td class="text-xs-left CATCSS">
                  <h3>
                    {{ props.item.center_college_code }} -
                    {{ props.item.center_name }}
                  </h3>
                  <br />
                  <v-chip label color="#1565C0" text-color="white">
                    <v-avatar> <v-icon>account_circle</v-icon> </v-avatar>Total
                    Examinee :
                    <strong> {{ setCenterTotal(props.item.colleges) }}</strong>
                  </v-chip>
                </td>
                <td class="text-xs-center CATCSS" style="padding: 0 0px">
                  <v-data-table
                    hide-actions
                    :headers="colleges_header"
                    :hide-headers="hideCollegesTableHeader(1)"
                    :items="props.item.colleges"
                    class="elevation-0"
                  >
                    <template v-slot:items="c_props">
                      <td :class="getClass(props.item.colleges)">
                        {{ c_props.item.college_code }}
                      </td>
                    </template>
                  </v-data-table>
                </td>
                <td class="text-xs-center  CATCSS" style="padding: 0 0px">
                  <v-data-table
                    hide-actions
                    :headers="colleges_header"
                    :hide-headers="hideCollegesTableHeader(1)"
                    :items="props.item.colleges"
                    class="elevation-0"
                  >
                    <template v-slot:items="c_props">
                      <td :class="getClass(props.item.colleges)">
                        <h3>
                          {{ c_props.item.college_name }},{{
                            c_props.item.district_name
                          }}
                          <span style="color: #1565C0"
                            >(Examinee Count :
                            {{ c_props.item.student_count }})</span
                          >
                        </h3>
                      </td>
                    </template>
                  </v-data-table>
                </td>
                <td class="text-xs-center CATCSS_r" style="padding: 0 0px">
                  <v-data-table
                    hide-actions
                    :headers="colleges_header"
                    :hide-headers="hideCollegesTableHeader(1)"
                    :items="props.item.colleges"
                    class="elevation-0"
                  >
                    <template v-slot:items="c_props">
                      <td :class="getClass(props.item.colleges)">
                        <v-layout
                          align-center
                          justify-center
                          column
                          fill-height
                        >
                          <v-btn
                            :dark="publishState == 1 && publishState != 1"
                            :disabled="ifCenterUser || publishState == 1"
                            fab
                            depressed
                            small
                            color="red"
                            @click="deleteItem(c_props.item, c_props.index)"
                          >
                            <v-icon dark>delete</v-icon>
                          </v-btn>
                        </v-layout>
                      </td>
                    </template>
                  </v-data-table>
                </td>
              </template>
            </v-data-table>
            <v-spacer class="pa-2"></v-spacer>
          </v-layout>
        </v-card>
      </div>

      <v-dialog v-model="centerCodeDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Set Center Starting Code</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    class="mt-3 ml-2 mr-2"
                    name="center_code_starting"
                    label="Starting Center Code"
                    v-model="start_center_code"
                    data-vv-name="center_code_starting"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="centerCodeDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" flat @click="setCenerCount()"
              >Update List</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
import centerAllocationAuto from "@/components/practicalVivaExam/createPVautoCenter.vue";
import common_login_getters from "@/mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import pvUnAllocCollege from "@/components/practicalVivaExam/pvUnAllocCollList.vue";
import common_activities_get from "@/mixin/get_activities_time_publish";
export default {
  components: { centerAllocationAuto, pvUnAllocCollege },
  mixins: [
    commonGet,
    common_login_getters,
    commonExamYear,
    common_activities_get,
  ],
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      addToCenter: false,
      unAllocCollSubDialog: false,
      show: false,
      centerAllocationAuto: false,
      subject_code: "",
      centerCodeDialog: false,
      headers: [
        // {
        //   text: "Subject",
        //   align: "center",
        //   width: "50",
        //   value: "subject_code",
        //   sortable: false,
        // },
        {
          text: "Center Code",
          align: "center",
          width: "10",
          value: "center_code",
          sortable: false,
        },
        {
          text: "Center Name",
          align: "center",
          width: "30",
          value: "center_name",
          sortable: false,
        },
        {
          text: "College Code",
          width: "5",
          align: "center",
          value: "college_code",
          sortable: false,
        },
        {
          text: "College Name",
          width: "30",
          sortable: false,
          align: "center",
          value: "college_name",
        },
        {
          text: "Actions",
          sortable: false,
          width: "3",
          align: "center",
          value: "",
        },
      ],
      colleges_header: [
        {
          text: "Code",
          align: "center",
          width: "50",
          value: "center_code",
          sortable: false,
          class: "", // college table header - css
        },
        {
          text: "Name",
          align: "center",
          width: "70",
          value: "center_code",
          sortable: false,
          class: "", // college table header - css
        },
      ],
      dictionary: {
        custom: {
          exam_code: {
            required: () => "Select Exam ",
          },
        },
      },
      dialog: false,
      dialog2: false,
      start_center_code: 101,
      publishState: 0,
      searchParam: {},
      loading: false,
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamCASchema = true;
    this.ifYearCASchema = true;
    this.ifExamYearSchema = true;
  },
  created() {
    this.searchPVCenterAllocationList();
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.type = 2;
    this.$store.dispatch("showPVCollListData", this.searchParam);
    this.searchParam.limit = -1;
    //subject
    this.$store.dispatch("fetchSubDataByPV", this.searchParam);
    //get activities status
    this.paramPublish.exam_initiate_id = this.getExamInitiateId;
    this.paramPublish.exam_code = this.getLoggedInExam.code;
    this.paramPublish.year = this.getLoggedInYear.year;
    this.paramPublish.activity_tag = "PVCenterAllocation";
    this.paramPublish.limit = -1;
    this.publishActivityUpdating(); // to get publish status
  },
  computed: {
    //schema data
    getCenterAllocationSchema() {
      return this.$store.getters.getCenterAllocationSchema;
    },
    //pv alloc item
    getPVCenterAllocationItem() {
      return this.$store.getters.getPVCenterAllocationItem;
    },

    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
    getSubByVivaPrac() {
      return this.$store.getters.getSubByVivaPrac;
    },
    getPVCollList() {
      return this.$store.getters.getPVCollList;
    },
  },
  methods: {
    getClass(val) {
      // console.log("claa", val)
      if (val.length > 1) {
        return "yesBorder";
      } else {
        return "noBorder";
      }
    },
    closeCollSub() {
      this.unAllocCollSubDialog = false;
    },
    showUnallocColleges() {
      this.unAllocCollSubDialog = true;
    },
    // addToCenterFun(item) {
    //   this.addToCenter = true;
    // },
    createAutoCenter() {
      this.centerAllocationAuto = true;
    },
    generateReport() {
      let param = {
        exam_code: this.searchParam.exam_code,
        exam_year: this.searchParam.exam_year,
        year: this.searchParam.exam_year,
        exam_initiate_id: this.searchParam.exam_initiate_id,
        limit: -1,
        download: 1,
        exam_type: 1,
      };
      this.$store.dispatch("exportPVCenterAlloc", param);
    },
    setCenerCount() {
      try {
        let self = this;
        this.getCenterAllocationSchema.center.forEach((element) => {
          element.center_code = self.start_center_code++;
        });
        this.centerCodeDialog = false;
      } catch (ex) {
        console.log("ex ", ex);
      }
    },
    deleteItem(item, index) {
      let that = this;
      let param = {
        exam_code: this.searchParam.exam_code,
        exam_year: this.searchParam.exam_year,
        exam_initiate_id: this.searchParam.exam_initiate_id,
        center_code: item.center_code,
        college_code: item.college_code,
        subject_code: item.subject_code,
      };
      this.$store.dispatch("deletePVCenterAlloc", param).then((data) => {
        that.searchPVCenterAllocationList();
      });
    },
    clearData() {
      this.center_id = "";
      this.subject_code = "";
      // this.$validator.reset();
    },
    searchPVCenterAllocationList() {
      this.$store.dispatch("searchPVCenterAllocationData", this.searchParam);
    },
    close() {
      this.$emit("update:centerAllocation", false);
      //this.clearData();
    },
    setCenterTotal(item) {
      //console.log("collge total", item);
      let total = 0;
      item.forEach((element) => {
        total = parseInt(total) + parseInt(element.student_count);
      });
      return total;
    },
    hideCollegesTableHeader(i) {
      return true;
    },
  },
};
</script>

<style>
.CATCSS {
  border-style: solid !important;
  border-width: thin;
}
.CATCSS_r {
  border-top-style: solid !important;
  border-bottom-style: solid !important;
  border-width: thin;
}
.noBorder {
  border-style: none !important;
  /* border-width: thin; */
}
.yesBorder {
  border-top-style: solid !important;
  border-width: thin;
}
.colorChange tbody td {
  background-color: #e0f7fa !important;
}
</style>
