<template>
  <v-container fluid>
    <v-dialog v-model="examineraccess" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Examiner Access</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <examinerAccess
          ref="dialogAccess"
          :examineraccess.sync="examineraccess"
          :searchExaminerGroupList.sync="searchExaminerGroupList"
        ></examinerAccess>
      </v-card>
    </v-dialog>
    <v-expansion-panel focusable v-if="forceRerenderFlag">
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
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      @input="searchParam.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{ data.item.code + ' - ' + data.item.title }}
                    </v-chip>
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
                  prepend-icon="calendar_today"
                  multiple
                ></v-select>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn
                      color="primary"
                      large
                      @click="searchExaminerGroupList"
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
    <v-divider class="mt-5 mb-3"></v-divider>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>
                {{ getExaminerGroupItems.length }}
              </template>
              <v-card-text class="title">Examiner List</v-card-text>
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
        </v-layout>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="getExaminerGroupItems"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[
          25,
          50,
          100,
          {text: '$vuetify.dataIterator.rowsPerPageAll', value: -1},
        ]"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{on}">
                  <v-btn
                    small
                    class="mr-0"
                    color="info"
                    @click="showDetails(props.item)"
                    v-on="on"
                    >Details</v-btn
                  >
                </template>
                <span>Details</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from '../../mixin/common_getters_mixin';
import watchMixin from '../../mixin/exam_year_watch_mixin';
import examinerAccess from '@/views/examiner/examinerAccess.vue';
import common_login_getters from '../../mixin/common_login_getters';
export default {
  mixins: [commonGet, watchMixin, common_login_getters],
  components: {examinerAccess},
  data() {
    return {
      pagination: {
        rowsPerPage: 25,
      },
      search: '',
      examineraccess: false,
      searchParam: {},
      headers: [
        {text: 'SL.', align: 'left', sortable: true, value: 'id'},
        {text: 'Exam', value: 'exam_name'},
        {text: 'Exam Year', value: 'year'},
        {text: 'Actions', align: 'center', value: 'actions', sortable: false},
      ],
    };
  },
  created() {
    this.multipleYearFlag = true;
    this.multipleExamFlag = true;
    this.ifSearchParam = true;
    this.searchParam.exam_code = [this.getLoggedInExam.code];
    this.searchParam.year = [this.getLoggedInYear.year];
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_type = this.$store.getters.getLoggedInExamType;

    //all  list
    this.searchExaminerGroupList();
    //exam
    if (!this.$store.getters.getExamItem.length < 1) {
      console.log('----> ');
      this.$store.dispatch('fetchExamData');
    }
  },
  computed: {
    //all data
    getExaminerGroupItems() {
      return this.$store.getters.getExaminerGroupItems;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
  },
  methods: {
    searchExaminerGroupList() {
      //if(this.searchParam.exam_code[0])
      this.multipleYearFlag = true;
      this.multipleExamFlag = true;
      this.ifSearchParam = true;
      this.searchParam.exam_code = [this.getLoggedInExam.code];
      this.searchParam.year = [this.getLoggedInYear.year];

      let customSearchParam = this.searchParam;

      //console.log("seach para ", this.searchParam);
      // if ( this.searchParam.exam_code )
      this.$store
        .dispatch('searchExaminerGroup', customSearchParam)
        .then(() => {
          //this.forceRerender();
        });
    },
    showDetails(item) {
      var dataArray = item;
      this.$store.commit('SET_EXAMINER_ACCESS_SCHEMA', dataArray);
      console.log('set details', dataArray);
      this.examineraccess = !this.examineraccess;
      // this.$router.push("/examiner-access");
    },
    close() {
      this.examineraccess = false;
    },
  },
  watch: {
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    },
    getLoggedInYear(val) {
      // this.customSearchPanel = false;
      this.searchParam.year = [val.year];
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
      // console.log("---> in watch getLoggedInYear", val);
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
