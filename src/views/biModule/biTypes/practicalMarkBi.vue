<template>
  <v-container fluid>
    <v-layout column class="mx-0">
      <v-flex xs12 v-if="forceRerenderFlag">
        <span class="subheading ma-5">
          <v-icon left color="primary" medium>touch_app</v-icon>Practical
          Mark-wise search options
        </span>
        <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
          <v-layout row wrap align-center class="py-3">
            <v-flex xs12>
              <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                <v-layout row wrap align-center class="py-3">
                  <!-- {{getLoggedInExam}} -->
                  <v-flex xs9>
                    <v-autocomplete
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
                          color="#FAFAFA"
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
                              v-html="
                                '(' + data.item.code + ') ' + data.item.title
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <!-- {{getLoggedInYear}} -->
                  <v-flex xs3>
                    <v-autocomplete
                      class="ma-2"
                      menu-props="auto"
                      prepend-icon="calendar_today"
                      v-model="searchParam.year"
                      :items="getYearList"
                      :item-text="item => '' + item.year + ''"
                      item-value="year"
                      label="Select Year"
                      no-data-text="Please wait, We are fetching the year data"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          color="#FAFAFA"
                          close
                          @input="searchParam.year = ''"
                          :selected="data.selected"
                          style="padding-left: 0px; padding-right: 0px;"
                        >
                          <span
                            class="subheading"
                            style="padding-left: 0px; padding-right: 0px;"
                            >{{ data.item.year }}</span
                          >
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content
                            v-text="data.year"
                          ></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="data.item.year"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                <v-layout row wrap align-center class="py-3">
                  <v-autocomplete
                    :disabled="ifCenterUser"
                    class="ma-2"
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
                        color="#FAFAFA"
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
                    class="ma-2"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
                    prepend-icon="library_books"
                    @change="onSubjectSelect()"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        color="#FAFAFA"
                        close
                        @input="searchParam.subject_code = ''"
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
                            v-html="
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-autocomplete
                    class="ma-2"
                    v-model="searchParam.paper_code"
                    :items="getPracticalPaperItem"
                    :item-text="
                      item => '(' + item.paper_code + ') ' + item.paper_name
                    "
                    item-value="code"
                    label="Select paper"
                    persistent-hint
                    prepend-icon="library_books"
                    :loading="paperLoading"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        color="#FAFAFA"
                        close
                        @input="searchParam.paper_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          "(" +
                            data.item.paper_code +
                            ") " +
                            data.item.paper_name
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
                                data.item.paper_code +
                                ') ' +
                                data.item.paper_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- Search Button -->
      <v-flex xs12 sm12 md12 style="margin-top:5px;margin-bottom:8px;">
        <v-layout justify-center row fill-height align-center>
          <v-btn
            outline
            round
            large
            @click="searchPracticalExamList"
            color="primary"
          >
            <v-icon left dark>search</v-icon>Search
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mt-2 mb-3"></v-divider>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Practical Mark List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn color="primary" @click="downloadPracticalMarklist()"
            >Download Practical Mark List</v-btn
          >
        </v-layout>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="getDataList"
        class="elevation-2"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">
            {{ dateFormatted(props.item.created_at) }}
          </td>
          <td class="text-xs-center">
            ({{ props.item.paper_code }}) {{ props.item.paper_name }}
          </td>
          <td class="text-xs-center">
            ({{ props.item.subject_code }}) {{ props.item.subject_name }}
          </td>
          <td class="text-xs-center">
            ({{ props.item.exam_code }}) {{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.student_count }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import moment from "moment";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  data() {
    return {
      newEntry: true,
      buttonDisable: 0,
      open: 0,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      search: "",
      searchParam: {},
      editButton: false,
      loading: false,
      sl_count: 1,
      reviewStat: false,
      currentItem: {
        course_id: "",
        exam_code: "",
        date: "",
        center_code: "",
        marks: []
      },
      paperLoading: false,
      studentDetailDialog: false,
      marksEditStatus: false,
      marksEntryStatus: false,
      headers: [
        { text: "Date", value: "create", align: "center", sortable: false },
        // { text: "Course", value: "course_id", align: "center" },
        {
          text: "Paper",
          value: "paper_code",
          align: "center",
          sortable: false
        },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          sortable: false
        },
        { text: "Exam", value: "exam_code", align: "center", sortable: false },
        { text: "Year", value: "year", align: "center", sortable: false },
        {
          text: "Student Count",
          value: "student_count",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  watch: {
    pagination() {
      this.searchPracticalExamList();
    }
  },
  created() {
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year; // this line
    //this.$store.dispatch("searchPVMarksData", this.searchParam);
    // this.$store.dispatch("fetchPVMarks");
    //exam
    if (!this.$store.getters.getCenterItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchCenterData");
    }
    //exam
    if (!this.$store.getters.getExamItem.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
    this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchSubjectData");
    }
  },
  computed: {
    getDataList() {
      return this.$store.getters.getDataList;
    },
    getEditedDataList() {
      return this.$store.getters.getEditedDataList;
    },
    getMarkList() {
      return this.$store.getters.getMarkList;
    }
  },
  methods: {
    onSubjectSelect() {
      this.paperLoading = true;
      this.$store
        .dispatch("fetchPaperData", {
          subject_code: this.searchParam.subject_code
        })
        .then(() => {
          this.paperLoading = false;
        });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchPracticalExamList() {
      console.log("searchPracticalExamList...");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchPracticalExamData", this.searchParam)
        .then(data => {
          console.log("sppsspps:", data);
          this.loading = false;
          //this.pagination.totalItems = 49149;
          // uncomment the below section when back end is ready
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    searchPV() {
      console.log("searchPV.... ", this.searchParam);
      this.$store.dispatch("searchPVMarksData", this.searchParam);
    },
    dateFormatted(date) {
      return moment(date).format("Do MMMM, YYYY (dddd)");
    },
    showDetailItem(item) {
      this.currentItem = item;
      this.studentDetailDialog = !this.studentDetailDialog;
    },
    downloadPracticalMarklist() {
      this.$store.dispatch("downloadPracticalMarksListData", this.searchParam);
    }
  }
};
</script>
