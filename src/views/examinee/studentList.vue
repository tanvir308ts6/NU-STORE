<template>
  <v-container fluid>
    <v-dialog v-model="centerDetailDialog" width="500">
      <studentDetail :currentItem="currentItem"></studentDetail>
    </v-dialog>
    <!-- {{getStudentListItem}} -->
    <!-- {{getStudentListItem[0]}} -->
    <!-- <br /> -->
    <!-- {{getStudentListItem[1]}} -->
    <v-expansion-panel
      class="mb-3"
      inset
      v-model="open"
      v-if="forceRerenderFlag"
    >
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
                          {{ "(" + data.item.code + ") " + data.item.title }}
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
                    <v-text-field
                      hide-details
                      outline
                      class="ma-2"
                      name="code"
                      label="College Code"
                      v-model="searchParam.college_code"
                      prepend-icon="edit"
                    ></v-text-field>

                    <v-autocomplete
                      hide-details
                      outline
                      class="ma-2"
                      v-model="searchParam.paper_code"
                      :items="getPaperList"
                      :item-text="item => '(' + item.code + ') ' + item.title"
                      item-value="code"
                      label="Select Course"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.paper_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{ "(" + data.item.code + ") " + data.item.title }}
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
                              v-html="
                                '(' + data.item.code + ') ' + data.item.title
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
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
                          <v-list-tile-content
                            v-text="data.item"
                          ></v-list-tile-content>
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

                    <v-autocomplete
                      hide-details
                      outline
                      class="ma-2"
                      v-model="searchParam.subject_code"
                      :items="getSubjectList"
                      :item-text="item => '(' + item.code + ') ' + item.title"
                      item-value="code"
                      label="Select Subject"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.subject_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{ "(" + data.item.code + ") " + data.item.title }}
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
                              v-html="
                                '(' + data.item.code + ') ' + data.item.title
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
                <v-btn outline round large @click="searchStudentList">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <v-divider class="my-3"></v-divider> -->

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
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
              <v-card-text class="title">Student List</v-card-text>
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
        :items="getStudentListItem"
        :expand="expand"
        :loading="loading"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ sl_count + props.index }}</td>
            <td class="text-xs">{{ props.item.name }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>

            <td class="text-xs">
              ({{ props.item.exam_code }}) {{ props.item.exam_name }}
            </td>
            <td class="text-xs" v-if="props.item.center_name">
              ({{ props.item.center_code }}) {{ props.item.center_name }}
            </td>
            <td class="text-xs-center" v-else>
              <v-icon>close</v-icon>
            </td>
            <td class="text-xs">{{ props.item.session_year }}</td>

            <!-- <td class="text-xs">{{ props.item.mobile }}</td> -->
            <td class="text-xs">
              <v-chip :class="showGender(props.item.gender)">
                {{ showGender(props.item.gender) }}
              </v-chip>
            </td>
            <td class="text-xs">
              ({{ props.item.college_code }}) {{ props.item.college_name }}
            </td>
            <td class="text-xs">
              ({{ props.item.subject_code }}) {{ props.item.subject_name }}
            </td>
            <!-- <td class="text-xs">{{ props.item.merit_position }}</td> -->
            <td class="text-xs">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      medium
                      flat
                      @click="showStudentDetailItem(props.item)"
                      >info</v-icon
                    >
                  </v-btn>
                </template>
                <span>Info</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        <!-- <template v-slot:expand="props">
          <v-card flat color="grey">
            <v-card-text>
              <td class="text-xs">Admission Roll : {{ props.item.admission_roll }}</td>
              <td class="text-xs">College : {{ props.item.college_code }}</td>
              <td class="text-xs">Subject : {{ props.item.subject_code }}</td>
              <td class="text-xs">Student Type : {{ props.item.student_type }}</td>
            </v-card-text>
          </v-card>
        </template>-->
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import commonFun from "../../mixin/common_function";
import centerFun from "../../mixin/center_reg_mixin";
import studentDetail from "@/components/examinee/studentDetails.vue";
import { constants } from "crypto";
export default {
  mixins: [
    commonFun,
    centerFun,
    commonGet,
    commonExamYear,
    common_login_getters
  ],

  components: {
    studentDetail
  },
  data() {
    return {
      centerDetailDialog: false,
      currentItem: {},
      pagination: { rowsPerPage: 10, rowsPerPageItems: [10] },
      sl_count: 0,
      loading: false,
      search: "",
      searchParam: {},
      expand: false,
      headers: [
        { text: "SL.", sortable: true, value: "id" },
        { text: "Name", value: "name" },
        { text: "Registration No.", value: "reg_no" },
        { text: "Exam", value: "exam_name" },
        { text: "Exam Center", value: "center_code" },
        { text: "Session Year", value: "session_year" },
        { text: "Gender", value: "gender" },
        { text: "College", value: "college_code" },
        { text: "Subject", value: "subject_code" },
        { text: "Details", sortable: false, value: "id" }
      ]
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    // this.$store.dispatch("fetchStudentListData", this.getCenterUrl());

    if (this.ifCenterUser) {
      // this.searchParam.center_code = [this.getAuthUser.center.center_code];
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }

    // this.searchParam.center_code = [this.getAuthUser.center.center_code];

    // this.searchStudentList();

    //exam
    if (!this.$store.getters.getExamItem.length < 1) {
      // console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchSubjectData");
    }
    if (!this.$store.getters.getCenterItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchCenterData");
    }
  },
  watch: {
    pagination() {
      this.searchStudentList();
    }
  },
  computed: {
    //all data
    getStudentListItem() {
      return this.$store.getters.getStudentListItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    //subject
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },

    getStudentListPagiInfo() {
      return this.$store.getters.getStudentListPagiInfo;
    }
  },
  methods: {
    showGender(gender) {
      return gender == 1 ? "Male" : "Female";
    },
    showStudentDetailItem(item) {
      this.currentItem = item;
      this.centerDetailDialog = !this.centerDetailDialog;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchStudentList() {
      this.loading = true;
      this.setLimit();
      console.log("serach student api ", this.searchParam);
      this.$store
        .dispatch("searchStudentListData", this.searchParam)
        .then(data => {
          console.log("returned data ", data);
          console.log("sl_ount ", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    }
  }
};
</script>
<style scoped>
.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
