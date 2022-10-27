<template>
  <v-container fluid>
    <v-dialog v-model="centerAllocation" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title
          >{{ editDataMode ? "Edit" : "Create" }} Center Allocation ~
          Practical/Viva</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <createCenterAllocation
          ref="dialogCenterAllo"
          :editDataMode.sync="editDataMode"
          :centerAllocation.sync="centerAllocation"
          :submitStatus1.sync="submitStatus1"
          :searchParam="searchParam"
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
                  :item-text="(item) => '(' + item.code + ') ' + item.title"
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
                      >{{
                        "(" + data.item.code + ") " + data.item.title
                      }}</v-chip
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
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
                <!-- <v-menu
                  class="mt-4"
                  v-model="menu2"
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
                      class="mt-4"
                      v-model="searchParam.date"
                      label="Exam date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="searchParam.date" @input="menu2 = false"></v-date-picker>
                </v-menu>-->
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
    <v-divider class="mt-5 mb-3"></v-divider>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>{{
                getCenterAllocationList.length
              }}</template>
              <v-card-text class="title"
                >Practical/Viva Center Allocation</v-card-text
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
            <v-btn @click="newVItem" color="primary" v-if="!ifCenterUser" dark
              >Create Viva/Practical Center Allocation</v-btn
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
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">
            {{ props.item.exam_name }} ({{ props.item.exam_code }})
          </td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">{{ props.item.division_name }}</td>
          <td class="text-xs">{{ props.item.seal_no }}</td>
          <!-- <td class="text-xs">{{ uff(props.item.date) }}</td> -->
          <td class="text-xs">{{ props.item.date }}</td>
          <!-- <td class="justify-center text-xs-center">
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
              v-if="props.item.type == 2"
              >Viva</v-chip
            >
          </td> -->
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      @click="showDetails(props.item)"
                      color="white"
                      v-if="!ifCenterUser"
                      >edit</v-icon
                    >
                    <v-icon
                      @click="showDetails(props.item)"
                      color="white"
                      v-if="ifCenterUser"
                      >details</v-icon
                    >
                  </v-btn>
                </template>
                <span v-if="!ifCenterUser">Edit</span>
                <span v-if="ifCenterUser">View</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="primary"
                    v-on="on"
                    :disabled="ifCenterUser"
                  >
                    <v-icon @click="cloneItem(props.item)" color="white"
                      >file_copy</v-icon
                    >
                  </v-btn>
                </template>
                <span>Clone</span>
              </v-tooltip>
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    small
                    color="red"
                    v-on="on"
                    :disabled="ifCenterUser"
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
          <!-- <td class="text-xs-center">
            <v-btn color="info" @click="showDetails(props.item)">Details</v-btn>
            <v-btn color="error" @click="deleteItem(props.item)">Delete</v-btn>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import createCenterAllocation from "@/components/practicalVivaExam/createPVCenterAlloc.vue";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { createCenterAllocation },
  data() {
    return {
      menu2: false,
      details: [],
      masterForDetails: [],
      centerAllocation: false,
      editDataMode: false,
      submitStatus1: false,
      //dialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      sl_count: 0,
      loading: false,
      search: "",
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "Exam Name", value: "exam_name" },
        { text: "Year", value: "year" },
        { text: "Division", value: "division_name" },
        { text: "Seal No.", value: "seal_no" },
        { text: "Date", value: "date" },
        //{ text: "Type", align: "center", value: "type" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      //showFormFillupListTable: true
    };
  },
  created() {
    this.$store.commit("UNSET_CENTER_ALLOCATION_DATA");
    this.searchParam.type = 2;
    //  this.searchParam
    // this.searchCenterAllocationList();

    // this.$store.dispatch("fetchCenterAllocationData");
    //exam
    // if (this.$store.getters.getExamItem.length < 1) {
    //   console.log("----> ");
    //   this.$store.dispatch("fetchExamData");
    // }
    let param = {
      limit: -1,
    };
    //examiner
    if (!this.$store.getters.getExaminerItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchExaminerData", param);
    }
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
    //Examiner
    getExaminerList() {
      return this.$store.getters.getExaminerItems;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
  },
  methods: {
    uff(current_datetime1) {
       let current_datetime = new Date(current_datetime1);
      console.log(current_datetime);

      let formatted_date =
        current_datetime.getDate() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getFullYear();
      console.log(formatted_date);
      return formatted_date;
    },
    newVItem() {
      this.editDataMode = false;
      this.$store.commit("UNSET_CENTER_ALLOCATION_SCHEMA");
      //this.$router.push("/create-center-allocation");
      this.centerAllocation = !this.centerAllocation;
      this.getCenterAllocationSchema.type = 2;
      this.getCenterAllocationSchema.exam_code = this.getLoggedInExam.code;
      this.getCenterAllocationSchema.year = this.getLoggedInYear.year;
    },
    // searchCenterAllocationList() {
    //   this.$store.dispatch("searchCenterAllocationData", this.searchParam);
    // },
    showDetails(item) {
      this.editDataMode = true;
      var dataArray = item;
      this.$refs.dialogCenterAllo.clearData();
      this.$store.commit("SET_CENTER_ALLOCATION_SCHEMA", dataArray);
      console.log(dataArray);
      //this.$router.push("/create-center-allocation");
      this.centerAllocation = !this.centerAllocation;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchCenterAllocationList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchCenterAllocationData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    cloneItem(item) {
      this.editDataMode = false;
      console.log("...", item);
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
              .then(function() {
                self.searchCenterAllocationList();
              })
              .catch(function(error) {
                console.log(error);
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
    pagination() {
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
