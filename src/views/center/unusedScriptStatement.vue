<template>
  <v-container fluid>
    <!-- {{getLsCollFromCenterList}} -->
    <!--   <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
    ></formDialog>-->
    <v-expansion-panel class="mb-3" inset v-model="open" v-if="forceRerenderFlag">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>

        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout column wrap align-center class="py-3">
                <v-flex>
                  <v-layout row wrap align-center>
                    <!-- exam  -->
                    <v-autocomplete
                      disabled
                      class="ma-2"
                      v-model="searchParam.exam_code"
                      :item-text="item => '(' + item.code + ') ' + item.title"
                      item-value="code"
                      :items="getExamList"
                      menu-props="auto"
                      label="Select Exam"
                      prepend-icon="subject"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.exam_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{
                          "(" + data.item.code + ") " + data.item.title
                          }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="
      										'(' + data.item.code + ') ' + data.item.title
      										"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                    <!-- year  -->
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
                      prepend-icon="calendar_today"
                    ></v-select>
                  </v-layout>
                </v-flex>

                <v-flex>
                  <v-layout row wrap align-center>
                    <!-- college_code -->

                    <!-- {{getCenterList}} -->
                    <!-- {{searchParam}} -->
                    <v-autocomplete
                      hide-details
                      outline
                      class="ma-2"
                      :disabled="ifCenterUser"
                      v-model="searchParam.center_code"
                      :items="getCenterList"
                      :item-text="
      						item => '(' + item.center_code + ') ' + item.center_name
      						"
                      item-value="center_code"
                      label="Select Center"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.center_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{
                          "(" +
                          data.item.center_code +
                          ") " +
                          data.item.center_name
                          }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="
      								'(' +
      								data.item.center_code +
      								') ' +
      								data.item.center_name
      								"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <v-flex xs12 sm12 md12 style="margin-top:5px;margin-bottom:8px;">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="searchUnusedScriptStatemetList">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container style="width: 100%" center>
      <div class="catalog-list">
        <br />
        <h2 align="center">Used Script Summary</h2>
        <v-container center>
          <v-container class="grey lighten-5">
            <v-layout>
              <v-flex xs5>
                <v-card dark color="white">
                  <v-card-text>
                    <v-list-tile-content>
                      <v-list-tile-title>Total Used Main Script :{{getSummary.total_used_main_script}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs5>
                <v-card dark color="white">
                  <v-card-text>
                    <v-list-tile-content>
                      <v-list-tile-title>Total Unused Main Script :{{getSummary.total_unused_main_script}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid>
            <v-layout>
              <v-flex xs5>
                <v-card dark color="white">
                  <v-card-text>
                    <v-list-tile-content>
                      <v-list-tile-title>Total Used Extra Script :{{getSummary.total_used_extra_script}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs5>
                <v-card dark color="white">
                  <v-card-text>
                    <v-list-tile-content>
                      <v-list-tile-title>Total Unused Extra Script :{{getSummary.total_unused_extra_script}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
      </div>
    </v-container>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Used Script Statement</v-card-text>
            <!-- <v-card-text class="title">Loose Script Collection From Center</v-card-text> -->
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
          ></v-text-field>
          <v-spacer />
          <v-card-actions>
            <!-- <v-btn @click="newItem" color="primary" dark>Create New LS Collection From Center</v-btn> -->
          </v-card-actions>
        </v-layout>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="getUnusedScriptList"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[
	25,
	50,
	100,
	{ text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
	]"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <!-- <td class="text-xs-center">{{ props.item.script_qty }}</td> -->

          <td class="text-xs-center">{{ props.item.datetime }}</td>
          <td class="text-xs-center">{{ props.item.ms_count }}</td>
          <td class="text-xs-center">{{ props.item.es_count }}</td>
          <td class="text-xs-center">{{ props.item.remark }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/regionalCenter/lsCollFromCenterForm.vue";
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import commonFun from "@/mixin/common_function";
import centerFun from "@/mixin/center_reg_mixin";
export default {
  mixins: [
    commonFun,
    centerFun,
    commonGet,
    commonExamYear,
    common_login_getters,
  ],

  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 25,
      },
      dialog: false,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        // { text: "Script quantity", value: "script_qty" },
        { text: "Date", value: "datetime", align: "center" },
        { text: "Used MS", value: "ms_count", align: "center" },
        { text: "Used ES", value: "es_count", align: "center" },
        { text: "Remarks", value: "remark", align: "center" },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.dispatch("fetchUsStatementData", this.searchParam);
    this.$store.dispatch("summaryData", this.searchParam);
    this.$store.dispatch("fetchCenterData");
    if (this.ifCenterUser) {
      //this.searchParam.center_code = [this.getAuthUser.center.center_code];
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      console.log("center code", this.searchParam.center_code);
    }
  },
  computed: {
    getUnusedScriptList() {
      return this.$store.getters.getUsStatementList;
    },
    getSummary() {
      return this.$store.getters.getSummaryList;
    },
  },

  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchUnusedScriptStatemetList() {
      this.loading = true;
      this.setLimit();
      console.log("serach student api ", this.searchParam);
      this.$store
        .dispatch("fetchUsStatementData", this.searchParam)
        .then((data) => {
          console.log("returned data ", data);
          console.log("sl_ount ", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
  },
};
</script>

<style scoped>
.catalog-list {
  flex-wrap: wrap;
  padding-top: 1px;
  padding-left: 1px;
  box-sizing: border-box;

  margin: auto;
  box-shadow: inset 0 0 0 1px #8c8c8c;
}
</style>
