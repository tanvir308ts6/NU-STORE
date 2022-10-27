<template>
  <v-container fluid>
    <v-card v-if="publishState == 1" class="ma-3">
      <v-alert :value="true" type="info">
        <snap class="display-1">{{ publishMsg }}</snap>
      </v-alert>
    </v-card>
    <v-dialog v-model="centerAllocation" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>
          {{ editDataMode ? "Edit" : "Create" }} Center Allocation ~
          {{ getRouterParam }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <createCenterAllocation
          ref="dialogCenterAllo"
          :centerAllocation.sync="centerAllocation"
          :submitStatus1.sync="submitStatus1"
          :searchParam="searchParam"
          :editDataMode.sync="editDataMode"
          :publishState="publishState"
          :timeOut="timeOut"
        ></createCenterAllocation>
      </v-card>
    </v-dialog>
    <v-expansion-panel class="mb-3" inset v-if="forceRerenderFlag">
      <v-expansion-panel-content class="CSP_BoarderStyle">
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
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
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
                  name="exam"
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
                    <!-- <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template> v-else -->
                    <template>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <!-- <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.div_code"
                  item-text="division_name"
                  item-value="div_code"
                  :items="getDivisionList"
                  menu-props="auto"
                  label="Select Division"
                  hide-details
                  name="division"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.div_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.division_name }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item.division_name"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.division_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete> -->
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
              </v-layout>
            </v-card>
            <v-flex xs12 sm12 md12 style="margin-top: 5px; margin-bottom: 8px">
              <v-layout justify-center row fill-height align-center>
                <v-btn
                  color="primary"
                  large
                  outline
                  round
                  @click="searchCenterAllocationList"
                >
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-divider class="mt-1 mb-1"></v-divider>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>{{
                getCenterAllocationList.length
              }}</template>
              <v-card-text class="title"
                >Center Allocation List ~ {{ getRouterParam }}</v-card-text
              >
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
            <v-btn
              v-if="getRouterParam === 'theory' && ifAdminUserType"
              @click="newExamItem"
              color="primary"
              :disabled="publishState == 1 || timeOut"
              :dark="publishState == 1 && publishState != 1"
              >Create ~ Theory Center Allocation</v-btn
            >
            <v-btn
              v-if="getRouterParam === 'viva' && ifAdminUserType"
              @click="newPVItem"
              color="primary"
              :disabled="publishState == 1 || timeOut"
              :dark="publishState == 1 && publishState != 1"
              >Create ~ Viva Center Allocation</v-btn
            >
            <v-btn
              v-if="getRouterParam === 'practical' && ifAdminUserType"
              @click="newPVItem"
              color="primary"
              :disabled="publishState == 1 || timeOut"
              :dark="publishState == 1 && publishState != 1"
              >Create Practical Center Allocation</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>

      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getCenterAllocationList"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[
          25,
          50,
          100,
          { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 },
        ]"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">
            {{ props.item.division_id }} - {{ props.item.division_name }}
          </td>
          <td class="text-xs">{{ props.item.seal_no }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="primary"
              text-color="white"
              v-if="props.item.type == 1"
              >Theory</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.type == 2"
              >Practical</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.type == 3"
              >Viva</v-chip
            >
          </td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="primary"
                    v-on="on"
                    :disabled="publishState == 1 || !ifAdminUserType || timeOut"
                    :dark="publishState == 1 && publishState != 1"
                  >
                    <v-icon @click="cloneItem(props.item)" color="white"
                      >file_copy</v-icon
                    >
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
                      v-if="ifAdminUserType"
                      >edit</v-icon
                    >
                    <v-icon
                      @click="showDetails(props.item)"
                      color="white"
                      v-if="!ifAdminUserType"
                      >details</v-icon
                    >
                  </v-btn>
                </template>
                <span v-if="ifAdminUserType">Edit</span>
                <span v-if="!ifAdminUserType">View</span>
              </v-tooltip>

              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="red"
                    v-on="on"
                    :disabled="publishState == 1 || !ifAdminUserType || timeOut"
                    :dark="publishState == 1 && publishState != 1"
                  >
                    <v-icon @click="deleteItem(props.item)" color="white"
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
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import createCenterAllocation from "@/components/center/createCenterAllocationForm.vue";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import common_activities_get from "@/mixin/get_activities_time_publish";
export default {
  mixins: [
    commonGet,
    commonExamYear,
    common_login_getters,
    common_activities_get,
  ],
  components: { createCenterAllocation },
  data() {
    return {
      loading: false,
      menu2: false,
      details: [],
      masterForDetails: [],
      centerAllocation: false,
      editDataMode: false,
      submitStatus1: false,
      //dialog: false,
      pagination: {
        rowsPerPage: 25,
      },
      search: "",
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
        
          value: "id",
          sortable: false,
        },
        { text: "Exam Name", value: "exam_name", sortable: false },
        { text: "Year", value: "year", sortable: false },
        { text: "Division", value: "division_id", sortable: false },
        { text: "Seal No.", value: "seal_no", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Type", align: "center", value: "type", sortable: false },
        {
          text: "Duplicate",
          align: "center",
          value: "actions",
          sortable: false,
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      //showFormFillupListTable: true
    };
  },
  created() {
    this.$store.commit("UNSET_CENTER_ALLOCATION_DATA");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    //all  list
    console.log("pramrams->", this.$route.params);
    if (this.getRouterParam === "practical") {
      this.searchParam.type = 2;
    } else if (this.getRouterParam === "viva") {
      this.searchParam.type = 3;
    } else {
      this.searchParam.type = 1;
    }
    //get activities time
    this.paramGetTime.exam_initiate_id = this.getExamInitiateId;
    this.paramGetTime.exam_code = this.getLoggedInExam.code;
    this.paramGetTime.year = this.getLoggedInYear.year;
    this.paramGetTime.activity_tag = "CenterList";
    this.paramGetTime.limit = -1;
    this.getActivitiesTime();
    //get activities status
    this.paramPublish = Object.assign({}, this.paramGetTime);
    this.paramPublish.activity_tag = "CenterListPublished";
    this.publishActivityUpdating(); // to get publish status

    let param = {
      limit: -1,
    };
    //division
    if (!this.$store.getters.getDivisionItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchDivisionData", param);
    }
    //year
    if (!this.$store.getters.getYearItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchYearData", param);
    }
     this.searchCenterAllocationList();
  },
  computed: {
    //all data
    getCenterAllocationList() {
      return this.$store.getters.getCenterAllocationItem;
    },
    //schema data
    getCenterAllocationSchema() {
      return this.$store.getters.getCenterAllocationSchema;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    getRouterParam() {
      return this.$route.params.type;
    },
  },
  methods: {
    newExamItem() {
      this.editDataMode = false;
      this.$store.commit("UNSET_CENTER_ALLOCATION_SCHEMA");
      //this.$router.push("/create-center-allocation");
      this.centerAllocation = !this.centerAllocation;
      this.getCenterAllocationSchema.type = 1;
      this.getCenterAllocationSchema.exam_code = this.getLoggedInExam.code;
      this.getCenterAllocationSchema.year = this.getLoggedInYear.year;
    },
    newPVItem() {
      this.editDataMode = false;
      this.$store.commit("UNSET_CENTER_ALLOCATION_SCHEMA");
      //this.$router.push("/create-center-allocation");
      this.centerAllocation = !this.centerAllocation;
      this.getCenterAllocationSchema.type = this.searchParam.type;
      this.getCenterAllocationSchema.exam_code = this.getLoggedInExam.code;
      this.getCenterAllocationSchema.year = this.getLoggedInYear.year;
    },
    searchCenterAllocationList() {
      this.setLimit()
      this.loading = true;
      var self = this;
      console.log("this.searchParam", this.searchParam)
      this.$store
        .dispatch("searchCenterAllocationData", this.searchParam)
        .then(function(data) {
          self.loading = false;
        });
    },
    showDetails(item) {
      this.editDataMode = true;
      var dataArray = item;
      this.$refs.dialogCenterAllo.clearData();
      // dataArray.exam_name = item.exam_name;
      // dataArray.year = item.year;
      // dataArray.division_id = item.division_id;
      // dataArray.seal_no = item.seal_no;
      // dataArray.date = item.date;
      // dataArray.id = item.id;
      // this.masterForDetails = dataArray;
      // this.details = item.details;
      this.$store.commit("SET_CENTER_ALLOCATION_SCHEMA", dataArray);
      console.log(dataArray);
      //this.$router.push("/create-center-allocation");
      this.centerAllocation = !this.centerAllocation;
    },
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    cloneItem(item) {
      this.editDataMode = false;
      var dataArray = item;
      this.$refs.dialogCenterAllo.clearData();
      this.$store.commit("SET_SCHEMA_FOR_CLONE", dataArray);
      console.log(dataArray);
      this.centerAllocation = !this.centerAllocation;
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
              .dispatch("deleteCenterAllocationItem", id)
              .then(function(data) {
                // self.$store.dispatch("fetchCenterAllocationData");
                self.searchCenterAllocationList();
              })
              .catch(function(error) {
                console.log(error);
                // self.$store.dispatch("fetchCenterAllocationData");
                self.searchCenterAllocationList();
              });
          }
        });
    },
    close() {
      this.centerAllocation = false;
      this.submitStatus1 = false;
    },
  },
  watch: {
    getRouterParam(val) {
      console.log("get route pram ", val);
      if (val === "practical") {
        this.searchParam.type = 2;
      } else if (val === "viva") {
        this.searchParam.type = 3;
      } else {
        this.searchParam.type = 1;
      }
      //  this.searchParam
      this.searchCenterAllocationList();
      this.setLimit();
      // console.log("in watch : getRouterParam ~~>", val);
    },
    getExamInitiateId() {
      this.publishActivityUpdating();
      this.searchCenterAllocationList();
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
