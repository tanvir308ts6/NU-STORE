<template>
  <v-container fluid>
    <v-card v-if="publishState == 1" class="ma-3">
      <v-alert :value="true" type="info">
        <snap class="display-1">{{ publishMsg }}</snap>
      </v-alert>
    </v-card>
    <v-dialog v-model="examRoutine" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title
          >{{ editDataMode ? "Edit" : "Create" }} Exam Routine</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <createRoutine
          ref="dialogRoutine"
          :examRoutine.sync="examRoutine"
          :submitStatus1.sync="submitStatus1"
          :searchExamRoutineList.sync="searchExamRoutineList"
          :searchParam="searchParam"
          :editDataMode.sync="editDataMode"
          :publishState="publishState"
          :timeOut="timeOut"
        ></createRoutine>
      </v-card>
    </v-dialog>
    <div>
      <v-expansion-panel focusable v-if="showPanel">
        <v-expansion-panel-content class="mycustomExpansionPanel">
          <template v-slot:actions>
            <v-icon large color="primary">$vuetify.icons.expand</v-icon>
          </template>
          <template v-slot:header>
            <div>
              <v-icon color="primary">search</v-icon>
              <span class="pl-2 subheading">Custom Search Panel</span>
            </div>
          </template>
          <v-layout row wrap align-center>
            <v-flex>
              <v-card class="px-3">
                <v-layout row wrap align-center class="py-3">
                  <v-autocomplete
                    disabled
                    class="ma-2"
                    v-model="searchParam.exam_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getExamList"
                    menu-props="auto"
                    label="Select Exam"
                    hide-details
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.exam_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.code + " - " + data.item.title }}</v-chip
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
                            v-html="data.item.code + ' - ' + data.item.title"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>

                  <v-select
                    disabled
                    name="year"
                    class="ma-2"
                    v-model="searchParam.year"
                    item-text="year"
                    item-value="year"
                    :items="getYearList"
                    menu-props="auto"
                    label="Select Year"
                    hide-details
                    v-validate="'required'"
                    :error-messages="errors.collect('year')"
                    data-vv-name="year"
                    required
                    prepend-icon="calendar_today"
                  ></v-select>

                  <v-flex xs12 sm12 md12 style="margin-top: 40px">
                    <v-layout justify-center row fill-height align-center>
                      <v-btn
                        color="primary"
                        large
                        @click="searchExamRoutineList"
                        >Search</v-btn
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-toolbar class="mt-3" flat color="#FAFAFA">
        <v-layout class="mt-0" align-center justify-start row fill-height>
          <v-flex xs2>
            <v-menu
              v-model="manu_from"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="From Date"
                  v-model="examCalDownload.from_date"
                  readonly
                  v-on="on"
                  clearable
                  @click:clear="examCalDownload.from_date = ''"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="examCalDownload.from_date"
                @input="manu_from = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs3 style="padding-right:30px">
            <v-menu
              v-model="manu_to"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="To Date"
                  v-model="examCalDownload.to_date"
                  prepend-icon="compare_arrows"
                  readonly
                  v-on="on"
                  clearable
                  @click:clear="callthismeth"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="examCalDownload.to_date"
                @input="manu_to = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3>
            <v-btn small @click="DownloadExamCalender" color="primary" dark>
              Download Exam Calendar</v-btn
            >
          </v-flex>
        </v-layout>
        <v-spacer />
        <!-- <v-btn
          v-if="!publishState"
          style="border-radius: 12px 0%"
          color="primary"
          @click="publishExamRoutine()"
        >
          <div>Routine Publish</div>
        </v-btn> -->
      </v-toolbar>
      <!-- <v-divider class="mt-5 mb-3"></v-divider> -->
      <!-- {{ examCalDownload }} -->

      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-badge left overlap>
                <template v-slot:badge>{{
                  getRoutineDataList.length
                }}</template>
                <v-card-text class="title">Exam Routine List</v-card-text>
              </v-badge>
            </v-card>

            <v-divider class="my-2" vertical></v-divider>
            <v-text-field
              v-model="search"
              prepend-inner-icon="search"
              label="Search"
              class="mt-0"
              hide-details
              solo
              flat
              single-line
            ></v-text-field>
            <v-spacer />

            <v-card-actions>
              <v-btn @click="exportPdf" color="primary" dark>
                <v-icon dark>arrow_downward</v-icon>Download Exam Routine
              </v-btn>
              <v-btn
                @click="newRoutine"
                color="primary"
                :disabled="publishState == 1 || timeOut"
                :dark="publishState == 1 && publishState != 1"
                >Create New Routine</v-btn
              >
            </v-card-actions>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getRoutineDataList"
          :search="search"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
          :loading="loading"
        >
          <template v-slot:items="props">
            <td>{{ sl_count + props.index }}</td>
            <td class="text-xs">{{ props.item.exam_name }}</td>
            <td class="text-xs">{{ props.item.year }}</td>
            <td class="text-xs">{{ props.item.date }}</td>
            <td class="text-xs">{{ props.item.seal_no }}</td>
            <td class="justify-center text-xs-center">
              <v-item-group>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      v-on="on"
                      @click="cloneItem(props.item)"
                      :disabled="publishState == 1 || timeOut"
                      :dark="publishState == 1 && publishState != 1"
                    >
                      <v-icon left color="white">file_copy</v-icon>Clone
                    </v-btn>
                  </template>
                  <span>Clone</span>
                </v-tooltip>
              </v-item-group>
            </td>
            <td class="justify-center text-xs-center">
              <v-item-group>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="primary" v-on="on">
                      <v-icon
                        @click="showDetails(props.item)"
                        color="white"
                        v-if="!ifControllerUser"
                        >edit</v-icon
                      >
                      <v-icon
                        @click="showDetails(props.item)"
                        color="white"
                        v-if="ifControllerUser"
                        >details</v-icon
                      >
                    </v-btn>
                  </template>
                  <span v-if="!ifControllerUser">Edit</span>
                  <span v-if="ifControllerUser">View</span>
                </v-tooltip>
              </v-item-group>
            </td>
            <td class="justify-center text-xs-center">
              <v-item-group>
                <v-tooltip right color="red">
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="red" v-on="on">
                      <v-icon
                        @click="deleteItem(props.item)"
                        color="white"
                        :disabled="publishState == 1 || timeOut"
                        :dark="publishState == 1 && publishState != 1"
                        >delete</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-item-group>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import createRoutine from "@/components/admin/createExamRoutineForm.vue";
import common_login_getters from "../../mixin/common_login_getters";
import common_activities_get from "@/mixin/get_activities_time_publish";
export default {
  mixins: [
    commonGet,
    commonExamYear,
    common_login_getters,
    common_activities_get,
  ],
  components: { createRoutine },
  data() {
    return {
      manu_from: false,
      manu_to: false,
      examCalDownload: {
        from_date: null,
        to_date: null,
      },
      sl_count: 1,
      loading: false,
      loadData: false,
      showPanel: true,
      downParam: {},
      searchParam: {},
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      details: [],
      masterForDetails: [],
      //dialog: false,
      editDataMode: false,
      examRoutine: false,
      submitStatus1: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
          sortable: false,
        },
        { text: "Exam Name", value: "exam_name", sortable: false },
        { text: "Year", value: "year", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Seal No.", value: "seal_no", sortable: false },
        {
          text: "Duplicate",
          align: "center",
          value: "actions",
          sortable: false,
        },
        {
          text: "Edit/View",
          align: "center",
          value: "actions",
          sortable: false,
        },
        { text: "Delete", align: "center", value: "actions", sortable: false },
      ],
      //showFormFillupListTable: true
    };
  },
  mounted() {
    try {
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.exam_year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.type = 1;
      this.showPanel = false;
      this.showPanel = true;
      this.searchExamRoutineList();
    } catch (ex) {}
  },
  created() {
    if (this.mastersFinal) {
      console.log("loged honours degrre", this.mastersFinal);
    }
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.exam_year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.exam_type = this.getLoggedInExamType;
    if (this.ifCenterUser) {
      this.downParam.center_code = this.getAuthUser.center.center_code;
    }
    //get activities time & status
    this.paramTimePublishBoth.exam_initiate_id = this.getExamInitiateId;
    this.paramTimePublishBoth.exam_code = this.getLoggedInExam.code;
    this.paramTimePublishBoth.year = this.getLoggedInYear.year;
    this.paramTimePublishBoth.activity_tag = "RoutineGeneration";
    this.paramTimePublishBoth.limit = -1;
    this.getTimePublishStatusBoth();

    //exam
    if (!this.$store.getters.getExamItem.length) {
      console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
  },
  computed: {
    //all data
    getRoutineDataList() {
      return this.$store.getters.getRoutineDataList;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    getSelectedExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getSelectedYear() {
      return this.$store.getters.getLoggedInYear;
    },
    getRoutineSchema() {
      return this.$store.getters.getRoutineSchema;
    },
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchExamRoutineList();
    },
    getSelectedExam() {
      this.showPanel = false;
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      console.log("exam", this.getExamList);
      this.showPanel = true;
    },
    getSelectedYear(val) {
      this.showPanel = false;
      this.searchParam.year = val.year;
      console.log("year", this.getYearList);
      this.showPanel = true;
    },

    pagination: {
      handler() {
        this.searchExamRoutineList();
      },
      deep: true,
    },
    loadData: {
      handler(status) {
        if (status) this.searchExamRoutineList();
        this.loadData = false;
      },
    },
  },
  methods: {
    callthismeth() {
      this.examCalDownload.to_date = "..";
      console.log("this.examCalDownload:", this.examCalDownload);
    },
    DownloadExamCalender() {
      console.log("this.examCalDownload:", this.examCalDownload);
      if (this.examCalDownload.from_date) {
        if (this.examCalDownload.to_date) {
          this.$store
            .dispatch("downloadExamCalender", this.examCalDownload)
            .then(() => {});
        } else {
          this.$store.commit("SET_SNACKBAR", {
            msg: "To Date Not selected",
            color: "red",
          });
        }
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "From Date Not selected",
          color: "red",
        });
      }
    },
    publishExamRoutine() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "RoutineGeneration";
      this.$store.dispatch("publishActivity", param).then(() => {});
    },
    exportPdf() {
      this.$store.dispatch("exportExamRoutine", this.downParam);
    },
    newRoutine() {
      this.$store.commit("UNSET_ROUTINE_SCHEMA_DATA");
      //this.$router.push("/exam-routine");
      this.editDataMode = false;
      this.examRoutine = !this.examRoutine;
      this.getRoutineSchema.type = 1; // 1 for theory routine
    },
    searchExamRoutineList() {
      this.loading = true;
      this.$store
        .dispatch("searchExamRoutineData", this.searchParam)
        .then((data) => {
          this.$store.commit("SET_ROUTINE_SCHEMA_DATA", data.data[0]); // to update shcema after schedule change
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    showDetails(item) {
      this.editDataMode = true;
      this.$refs.dialogRoutine.clearData();

      var data = Object.assign({}, item);
      this.$store.commit("SET_ROUTINE_SCHEMA_DATA", data);
      //this.$router.push("/exam-routine");
      this.examRoutine = !this.examRoutine;
    },
    cloneItem(item) {
      console.log("item: sp sp", item);

      this.editDataMode = false;
      var dataArray = item;
      this.$refs.dialogRoutine.clearData();
      dataArray.id = "";
      this.$store.commit("SET_CLONE_SCHEMA_DATA", dataArray);
      // console.log(dataArray);
      this.examRoutine = !this.examRoutine;
      this.submitStatus1 = true;
    },
    deleteItem(item) {
      const id = item.id;
      console.log("id in method", id);
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteROUTINEItem", id)
              .then(function(data) {
                self.searchExamRoutineList();
              })
              .catch(function(error) {
                console.log(error);
                self.searchExamRoutineList();
              });
          }
        });
    },
    close() {
      this.examRoutine = false;
      this.submitStatus1 = false;
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
