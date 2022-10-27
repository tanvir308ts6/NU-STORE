<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex>
        <v-card class="px-3">
          <v-layout row wrap align-center class="pt-3">
            <!-- Starting Date Dialogue -->
            <v-flex xs12 sm12 md6>
              <v-card class="pa-2 ma-2">
                <v-layout row wrap align-center>
                  <v-flex xs3>
                    <h3
                      class="headline ml-3"
                      style="font-size: 20px !important;"
                    >
                      Start:
                    </h3>
                  </v-flex>

                  <v-flex xs9 class="pr-3">
                    <!-- {{searchParam.startDate}} -->
                    <v-menu
                      v-model="startModel"
                      
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <div class>
                          <v-text-field
                            v-model="startDateFormatted"
                            class="pvMarksEntry-v-select"
                            prepend-icon="event"
                            v-on="on"
                            label="Select Start Date"
                            hide-details
                            single-line
                            solo
                            clearable
                          ></v-text-field>
                        </div>
                      </template>

                      <v-date-picker
                        
                        v-model="searchParam.startDate"
                        no-title
                        @input="startModel = false"
                      ></v-date-picker>
                    </v-menu>
                    <div v-if="searchParam.startDate == null" style="margin-top:10px; margin-left:30px; color:red;">Please select start date</div>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
    
            <!-- Ending Date Dialogue -->
            <v-flex xs12 sm12 md6>
              <v-card class="pa-2 ma-2">
                <v-layout row wrap align-center>
                  <v-flex xs3>
                    <h3
                      class="headline mb-0 ml-3"
                      style="font-size: 20px !important;"
                    >
                      End:
                    </h3>
                  </v-flex>
                  <v-flex xs9>
                    <!-- {{searchParam.endDate}} -->
                    <v-menu
                      v-model="endModel"
                     
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <div class>
                          <v-text-field
                            v-model="endDateFormatted"
                            class="pvMarksEntry-v-select"
                            prepend-icon="event"
                            v-on="on"
                            label="Select End Date"
                            hide-details
                            single-line
                            solo
                            clearable
                          ></v-text-field>
                        </div>
                      </template>

                      <v-date-picker
                        v-model="searchParam.endDate"
                        no-title
                        @input="endModel = false"
                      ></v-date-picker>

                    </v-menu>
                     <div v-if="searchParam.endDate == null" style="margin-top:10px; margin-left:30px; color:red;">Please select end date</div>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>

          </v-layout>
          <v-layout row wrap align-center class="py-3">
            <!-- Module Selection-->
            <v-flex xs12 sm12 md6>
              <v-card class="pa-2 ma-2">
                <v-layout row wrap align-center>
                  <v-flex xs3>
                    <h3
                      class="headline mb-0 ml-3"
                      style="font-size: 20px !important;"
                    >
                      Module:
                    </h3>
                  </v-flex>
                  <v-flex xs9>
                    <v-autocomplete
                      class="mx-0"
                      v-model="module"
                      item-text="menu_name"
                      item-value="tag_name"
                      :items="getModuleList"
                      label="Select a Module"
                      hide-details
                      prepend-icon="horizontal_split"
                      solo
                      return-object
                      @change="moduleChange($event)"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="module = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{ data.item.menu_name }}</v-chip
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
                              v-html="data.item.menu_name"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-card class="pa-2 ma-2">
                <v-layout row wrap align-center>
                  <v-flex xs3>
                    <h3
                      class="headline mb-0 ml-3"
                      style="font-size: 20px !important;"
                    >
                      Sub-Module:
                    </h3>
                  </v-flex>
                  <v-flex xs9>
                    <v-autocomplete
                      class="mx-0"
                      v-model="submodule"
                      item-text="sub_menu_name"
                      item-value="tag_name"
                      :items="getSubMenuDataList"
                      menu-props="auto"
                      prepend-icon="horizontal_split"
                      label="Select a SubModule"
                      hide-details
                      :loading="subModule.loading"
                      solo
                      multi-line
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="submodule = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{ data.item.sub_menu_name }}</v-chip
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
                              v-html="data.item.sub_menu_name"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap align-center class="pb-3">
            <!-- User Selection-->
            <v-flex xs12 sm12 md6>
              <v-card class="pa-2 ma-2">
                <v-layout row wrap align-center>
                  <v-flex xs3>
                    <h3
                      class="headline mb-0 ml-3"
                      style="font-size: 20px !important;"
                    >
                      User:
                    </h3>
                  </v-flex>
                  <v-flex xs9>
                    <v-autocomplete
                      class="mx-0"
                      v-model="searchParam.user"
                      item-text="name"
                      item-value="id"
                      :items="getUserList"
                      menu-props="auto"
                      prepend-icon="list_alt"
                      label="Select a User"
                      hide-details
                      multiple
                      solo
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="remove(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            "(" + data.item.id + ") " + data.item.name
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
                              v-html="
                                '(' + data.item.id + ') ' + data.item.name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-card class="pa-2 ma-2">
                <v-layout row wrap align-center>
                  <v-flex xs2>
                    <h3
                      class="headline mb-0 ml-3"
                      style="font-size: 20px !important;"
                    >
                      Action Type:
                    </h3>
                  </v-flex>
                  <v-flex xs10>
                    <v-select
                      class="mx-0"
                      v-model="searchParam.action"
                      item-text="title"
                      item-value="value"
                      :items="getActionList"
                      menu-props="auto"
                      label="Select a Action Type"
                      hide-details
                      prepend-icon="compare_arrows"
                      multiple
                      solo
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex xs12 sm12>
              <v-layout justify-center row fill-height align-center>
                <v-btn color="primary" large v-if="searchParam.startDate != null && searchParam.endDate != null"   @click="searchlog">Search</v-btn>
                <!-- <v-btn color="blue-grey" large class="white--text" @click="exportLogList()">
                  <v-icon left dark>arrow_downward</v-icon>Export
                </v-btn>-->
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
        <!-- select date -->
      </v-flex>
    </v-layout>
    <v-container fluid v-if="showLogTable" class="mt-3">
      <v-card color="white">
        <v-layout row wrap>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Log-data List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn
            color="blue-grey"
            large
            class="white--text"
            @click="exportLogList()"
          >
            <v-icon left dark>arrow_downward</v-icon>Export
          </v-btn>
        </v-layout>
      </v-card>
      <!-- <v-layout row wrap align-center justify-center> -->
      <v-data-table
        :headers="headers"
        :loading="loading"
        :items="getLogData"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.created_at }}</td>
          <td class="text-xs-center">{{ props.item.updated_at }}</td>
          <td class="text-xs-center">{{ props.item.module }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.user }}</td>
          <td class="text-xs-center">{{ props.item.description }}</td>
          <td class="text-xs-center">{{ props.item.type }}</td>
          <td class="text-xs-center">{{ props.item.old_value }}</td>
          <td class="text-xs-center">{{ props.item.new_value }}</td>
        </template>
      </v-data-table>
      <!-- </v-layout> -->
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
    },
    loading: false,
    subModule: { loading: false },
    submodule: "",
    sl_count: 1,
    showLogTable: false,
    searchParam: {},
    search: "",
        dictionary: {
      custom: {
        start_date: {
          required: () => "Center Name field can not be empty",
        },
        
      },
    },
    headers: [
      { text: "Created at", value: "created_at", align: "center" },
      { text: "Updated at", value: "updated_at", align: "center" },
      { text: "Module", value: "module", align: "center" },
      { text: "Submodule", value: "name", align: "center" },
      { text: "User", value: "user", align: "center" },
      { text: "Description", value: "description", align: "center" },
      { text: "Type", value: "type", align: "center" },
      { text: "Old value", value: "old_value", align: "center" },
      { text: "New value", value: "new_value", align: "center" }
    ],
    startModel: false,
    endModel: false,
    module: {}
  }),
  watch: {
    pagination() {
      this.searchlog();
    }
  },
   mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    remove(item) {
      const index = this.searchParam.user.indexOf(item.id);
      console.log(index + "removesubject", this.searchParam.user);
      if (index >= 0) this.searchParam.user.splice(index, 1);
    },
    moduleChange(item) {
      console.log("...", item[0]);
      var self = this;
      //this.getSchema.paper_code = [];
      this.subModule.loading = true;
      console.log("print", this.module);
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.menu_id = item.id;
      this.searchParam.limit = -1;

      if (this.module.length != 0) {
        this.$store
          .dispatch("searchSubmenuData", this.searchParam)
          .then(data => {
            console.log("...mtu", data);
            self.subModule.loading = false;
          });
      }
    },
    exportLogList() {
      // console.log("....");
      this.$store.dispatch("exportLogList", this.searchParam);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchlog() {
      this.loading = true;
      this.setLimit();
      this.searchParam.module = [this.module.tag_name];
      this.searchParam.submodule = [this.submodule];
      this.$store.dispatch("searchLogData", this.searchParam).then(data => {
        this.showLogTable = true;
        console.log("pagiantion then", data);
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalItems = data.meta.total;
      });
    }
    // search() {
    //   this.$store.dispatch("searchLogData", this.searchParam).then(() => {
    //     this.showLogTable = true;
    //   });
    // }
  },
  created() {
    this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
    this.searchParam.year = this.$store.getters.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;

    // /api/auth/common/actions
    this.$store.dispatch("fetchAuditActions");
    // /api/auth/common/users
    this.$store.dispatch("fetchAuditUsers");
    // /api/auth/common/modules
    //this.$store.dispatch("fetchAuditModules");
    this.$store.dispatch("fetchMenuData");
  },
  computed: {
    getSubMenuDataList() {
      return this.$store.getters.getSubMenuDataList;
    },
    getActionList() {
      return this.$store.getters.getAuditActions;
    },
    getUserList() {
      return this.$store.getters.getAuditUsers;
    },
    // getModuleList() {
    //   return this.$store.getters.getAuditModules;
    // },
    //menu
    getModuleList() {
      return this.$store.getters.getMenuDataList;
    },
    getLogData() {
      return this.$store.getters.getLogData;
    },
    startDateFormatted() {
      return this.searchParam.startDate
        ? moment(this.searchParam.startDate).format("Do MMMM, YYYY (dddd)")
        : "";
    },
    endDateFormatted() {
      return this.searchParam.endDate
        ? moment(this.searchParam.endDate).format("Do MMMM, YYYY (dddd)")
        : "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
