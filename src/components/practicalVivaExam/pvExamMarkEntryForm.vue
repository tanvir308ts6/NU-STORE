<template>
  <v-container fluid>
    <!-- 102 : 313226 -->
    <v-dialog v-model="centerDetailDialog" width="500">
      <studentDetail :currentItem="currentItem"></studentDetail>
    </v-dialog>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <span class>
          <div class="display-1 mb-4">
            <v-icon size="50" color="primary">dashboard</v-icon>
            <span class="ml-2">Practical Marks Entry..</span>
          </div>
        </span>
        <!-- divider  -->
        <v-expansion-panel v-model="open1" inset v-if="forceRerenderFlag">
          <v-expansion-panel-content>
            <template v-slot:actions>
              <v-icon large color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template v-slot:header>
              <div>
                <v-icon color="primary">list</v-icon>
                <span class="pl-2 subheading">Get Student List</span>
              </div>
            </template>
            <v-layout row wrap align-center>
              <v-flex xs12 class="mx-4">
                <v-layout row>
                  <v-flex xs8>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.exam_code"
                      :item-text="(item) => item.code + ' - ' + item.title"
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
                          >{{
                            data.item.code + " - " + data.item.title
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
                              v-html="data.item.code + ' - ' + data.item.title"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs4>
                    <v-autocomplete
                      v-model="searchParam.year"
                      :items="getYearList"
                      :item-text="(item) => '' + item.year + ''"
                      item-value="year"
                      label="Select Year"
                      prepend-icon="calendar_today"
                      class="ml-0"
                      hide-selected
                      single-line
                      flat
                      :persistent-hint="searchParam.year ? true : false"
                      no-data-text="Please wait, We are fetching the year data"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.year = ''"
                          :selected="data.selected"
                        >
                          <span class="subheading">{{ data.item.year }}</span>
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
              </v-flex>
              <v-flex xs12>
                <v-card class="px-3 ma-3" color="#FAFAFA">
                  <v-layout row wrap align-center class="py-3">
                    <!-- {{getPracticalCenterList}} -->
                    <v-flex xs12 sm12 d-flex>
                      <v-autocomplete
                        class="ma-2"
                        :disabled="ifCenterUser"
                        v-model="searchParam.center_code"
                        :item-text="
                          (item) => item.center_code + ' - ' + item.center_name
                        "
                        item-value="center_code"
                        :items="getPracticalCenterList"
                        menu-props="auto"
                        label="Select Center"
                        prepend-inner-icon="list"
                        @change="centerChange($event)"
                        outline
                        hide-details
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="searchParam.center_code = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                          >
                            {{
                              data.item.center_code +
                              " - " +
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
                                  data.item.center_code +
                                  ' - ' +
                                  data.item.center_name
                                "
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>

                    <v-autocomplete
                      :disabled="!searchParam.center_code"
                      class="ma-2"
                      v-model="searchParam.subject_code"
                      :items="getSubjectListByPrac"
                      :item-text="
                        (item) => item.subject_code + ' - ' + item.subject_name
                      "
                      item-value="subject_code"
                      label="Select Subject"
                      persistent-hint
                      prepend-icon="library_books"
                      @change="subjectChange($event)"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.subject_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.subject_code +
                            " - " +
                            data.item.subject_name
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
                                data.item.subject_code +
                                ' - ' +
                                data.item.subject_name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>

                    <v-autocomplete
                      :disabled="!searchParam.center_code"
                      @change="paperChange($event)"
                      class="ma-2"
                      v-model="searchParam.paper_code"
                      :items="getPaperListbyPractical"
                      :item-text="
                        (item) => item.paper_code + ' - ' + item.paper_name
                      "
                      item-value="paper_code"
                      label="Select paper"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.paper_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.paper_code + " - " + data.item.paper_name
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
                                data.item.paper_code +
                                ' - ' +
                                data.item.paper_name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-layout>
                </v-card>
                <v-flex xs12 sm12 md12 class="mb-3 mt-1">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn
                      :disabled="!searchParam.center_code"
                      round
                      outline
                      large
                      @click="searchStudentList"
                      >Get Student List</v-btn
                    >
                    <v-btn
                      :disabled="!searchParam.center_code"
                      round
                      outline
                      @click="downloadPracticalWantingList()"
                      >Download Student List</v-btn
                    >
                    <v-btn
                      :disabled="!searchParam.center_code"
                      round
                      outline
                      @click="downloadPracticalMarkBlankList()"
                      >Download Blank MarkInput List</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-divider class="mt-4 mb-3"></v-divider>
        <!-- ------------------------------------------- getStudentListItem -------------------------------------- -->
        <!-- {{ getStudentListItem[0] }} -->
        <div v-if="true">
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
                      style="margin-top: -1.5em; font-size: 1.3em"
                      class="elevation-0"
                      v-if="pagination.totalDataItems"
                      >{{ pagination.totalDataItems }}</v-btn
                    >
                  </template>
                  <v-card-text class="title"
                    >Practical Student List</v-card-text
                  >
                </v-badge>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
            </v-layout>
          </v-card>

          <v-data-table
            :headers="headers"
            :items="getPracticalWantListByStd"
            :loading="loading"
            class="elevation-4 mytable"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :total-items="pagination.totalDataItems"
          >
            <template v-slot:items="props">
              <td class="text-xs">{{ sl_count + props.index }}</td>
              <td class="text-xs-center">{{ props.item.exam_roll }}</td>
              <td class="text-xs-center">{{ props.item.reg_no }}</td>
              <td class="text-xs-center">{{ props.item.session_year }}</td>
              <td class="text-xs-center" v-if="ifNew">
                {{ props.item.examinee_name }}
              </td>
              <td class="text-xs-center" v-else>
                {{ props.item.examinee_name }}
              </td>
              <td class="text-xs-left my--style" width="250">
                <v-text-field
                  v-model="props.item.mark"
                  label="Input Mark"
                  single-line
                  autofocus
                  hide-details
                  class="mb-3"
                  :ref="'text' + props.index"
                  @click="up(props.item)"
                  @keyup.enter="callRef(props.index + 1)"
                  @keyup.up="callRef(props.index - 1)"
                  @keyup.down="callRef(props.index + 1)"
                  :error="getErrorStatus(props.item)"
                  :prepend-icon="getIconForMarkEntry(props.item)"
                ></v-text-field>
              </td>
              <td class="text-xs-center">{{ props.item.full_marks }}</td>
            </template>
          </v-data-table>
        </div>
        <!-- submit button  -->
        <v-flex xs12 mt-4>
          <v-layout align-center justify-center row fill-height>
            <v-btn large round color="primary" @click="submit()">
              Submit
              <v-icon right dark>send</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <!-- <div>
          <div v-if="false">
            <v-flex xs12 mt-4>
              <v-layout align-center justify-center row fill-height>
                <v-btn large color="primary" @click="getStudents">Get Students..</v-btn>
              </v-layout>
            </v-flex>
          </div>
        </div>-->
      </v-flex>
    </v-layout>

    <!-- {{ ifNew }} -->
    <!-- <pre>searchParam; {{ searchParam }} </pre>
    <pre> {{ getPracticalWantListByStd }} </pre>-->
    <!-- <div style="color: white">{{ getStudentListItem }}</div> -->
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import moment from "moment";
import common_login_getters from "../../mixin/common_login_getters";
import commonFun from "../../mixin/common_function";
import studentDetail from "@/components/examinee/studentDetails.vue";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import { loadavg } from "os";

export default {
  mixins: [commonFun, commonGet, common_login_getters, commonExamYear],
  components: {
    studentDetail,
  },
  props: ["marksEntryStatus", "ifNew"],
  data: () => ({
    selected_center_name: "",
    selected_paper_name: "",
    loading: false,
    sl_count: 0,
    dialog: false,
    centerIdStatus: false,
    startModel: false,
    open1: 0,
    open2: 1,
    centerDetailDialog: false,
    searchParam: {
      full: true,
      admitcard: false,
      final: true,
    },
    headers: [
      {
        text: "Sl",
        align: "left",
        value: "examinee_name",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Exam Roll",
        align: "center",
        value: "examinee_name",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Registration No.",
        align: "center",
        value: "reg_no",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Session",
        align: "center",
        value: "reg_no",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Examinee Name",
        align: "center",
        value: "examinee_name",
        class: "my-style-2",
        sortable: false,
      },
      {
        text: "Practical/Field work Mark",
        align: "center",
        value: "id",
        sortable: false,
      },
      {
        text: "Full Marks",
        align: "center",
        value: "id",
        sortable: false,
      },
    ],
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
    },
    studentList: true,

    marks: [],
    datePicker: false,
    currentItem: {},
    pvMarks: [{}],
    getData: [],
  }),
  created() {
    //practical center list
    // var type = {
    //   type: 1
    // };

    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
      this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
    }
    console.log("searchParam print", this.searchParam);
    this.$store.dispatch("fetchPracticalWiseCenterData", this.searchParam);
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }

    // //subject
    // if (!this.$store.getters.getSubjectItems.length) {
    //   this.$store.dispatch("fetchSubjectData");
    // }
    this.$store.dispatch("fetchSubDataByPractical", this.searchParam);
  },
  computed: {
    getPracticalWantListByStd() {
      return this.$store.getters.getPracticalWantListByStd;
    },
    getPaperListbyPractical() {
      return this.$store.getters.getPaperByPractical;
    },

    startDateFormatted() {
      return this.searchParam.date_time
        ? moment(this.searchParam.startDate).format("Do MMMM, YYYY")
        : "";
    },
    ifAllSelected() {
      if (
        this.pvMarks.course_id &&
        this.pvMarks.exam_id &&
        this.pvMarks.date &&
        this.pvMarks.center_id
      ) {
        return true;
      }
      return true;
    },
    //all data
    getStudentListItem() {
      return this.$store.getters.getFinalExamineeList;
    },
    getSchema() {
      return this.$store.getters.getSchema;
    },

    // uncomment this section
    // if (this.ifNew) {
    //   return this.$store.getters.getFinalExamineeList;
    // } else {
    //   return this.pvMarks.marks;
    // }

    // if (Object.entries(this.pvMarks).length === 0) {
    //   return this.$store.getters.getFinalExamineeList;
    // } else {
    //   return this.pvMarks.marks;
    // }
  },
  watch: {
    pagination() {
      this.searchStudentList();
    },
    marksEntryStatus(val) {
      this.dialog = val;
      this.searchParam.full = true;
      this.searchParam.admitcard = false;
      this.searchParam.final = true;
      this.searchParam.paper_type = 2;
      this.searchParam.exam_type = 1;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      var userType = this.getUserTypeId();
      if (userType == 1) {
        this.centerIdStatus = true;
      }
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
      }
      console.log("created", this.searchParam);
    },
    dialog(val) {
      if (!val) this.close();
    },
    open1(val) {
      val == 0 ? (this.open2 = null) : (this.open2 = 0);
    },
    open2(val) {
      val == 0 ? (this.open1 = null) : (this.open1 = 0);
    },
  },
  mounted() {
    return this.up();
  },
  methods: {
    subjectChange(val) {
      this.searchParam.subject_code = val;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
        this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
      }
    },
    up(mark) {
      this.tab = "tab-2";
      console.log("mark.pass_marks", mark.pass_marks);
      if (parseInt(mark.mark) <= parseInt(mark.pass_marks)) {
        this.$root.$confirm("its fail mark.is this ok?").then((confirm) => {
          if (confirm) {
            console.log("ok done");
          } else {
            mark.mark = "";
          }
        });
        //   this.$store.commit("SET_SNACKBAR", {
        //   msg: "IT'S A FAIl MARK ",
        //   color: "red",
        // });
      }
    },
    downloadPracticalMarkBlankList() {
      this.$store.dispatch("downloadPracticalMarkBlankList", this.searchParam);
    },
    downloadPracticalWantingList() {
      this.$store.dispatch("downloadPracticalWantingList", this.searchParam);
    },
    getErrorStatus(item) {
      let flg1 = this.isPositiveInteger(item.mark);
      let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
      if (item.mark == "A") return false;
      if (flg1 & flg2) return false;
      else return true;
    },
    getIconForMarkEntry(item) {
      let flg1 = this.isPositiveInteger(item.mark);
      let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
      if (item.mark == "A") return "done";

      if (flg1 & flg2) return "done";
      else return "close";
    },
    isPositiveInteger(n) {
      return n >>> 0 === parseFloat(n);
    },

    close() {
      this.$emit("update:marksEntryStatus", false);
    },
    centerChange(val) {
      console.log("centerChange", val);
      this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
      var self = this;
      var dat = this.getCenterList.forEach(function (item) {
        if (item.center_code == val) {
          self.selected_center_name = item.center_name;
          console.log("res ", item);
          return item;
        }
      });
    },
    paperChange(val) {
      var self = this;
      var dat = this.getPaperListbyPractical.forEach(function (item) {
        if (item.code == val) {
          self.selected_paper_name = item.title;
          console.log("res ", item);
          return item;
        }
      });
    },

    showStudentDetailItem(item) {
      this.currentItem = item;
      this.centerDetailDialog = !this.centerDetailDialog;
    },

    getStudents() {
      var self = this;
      this.$store.dispatch("fetchStudentData").then(() => {
        let students = self.$store.getters.getStudentItems;
        // self.pvMarks.marks = student;
        self.pvMarks.marks = students.map((obj) => {
          var rObj = {};
          rObj.student_id = obj.id;
          rObj.mark = "";
          return rObj;
        });
        self.studentList = true;
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchStudentList() {
      this.setLimit();
      console.log("search action ", this.searchParam);
      var self = this;
      let pvMarks = [];
      //to avoid load before dialog open
      if (this.marksEntryStatus) {
        //To avoid default data load
        if (
          this.searchParam.paper_code > 0 ||
          this.searchParam.subject_code > 0
        ) {
          this.loading = true;
          this.$store
            .dispatch("searchPracticalWantDataByStd", this.searchParam)
            .then((data) => {
              self.loading = false;
              self.sl_count = data.from;
              self.pagination.totalDataItems = data.total;
            });
        } else {
          this.$store.commit("SET_SNACKBAR", {
            msg: "Please Select Subject & Paper ",
            color: "primary",
          });
        }
      }
      this.getData = pvMarks;
    },
    setMarks(pvMarksFromList) {
      this.pvMarks = pvMarksFromList;
      this.searchParam = pvMarksFromList;

      console.log("-->", this.pvMarks);
      if (this.studentList) {
        this.studentList = !this.studentList;
      }
      // if (Object.keys(this.pvMarks).length > 5) {
      //   this.studentList = true;
      // }
    },

    submit() {
      let data = [];
      this.getPracticalWantListByStd.forEach((obj) => {
        if (obj.mark != null) {
          if (this.isPositiveInteger(obj.mark) || obj.mark == "A") {
            if (
              parseInt(obj.mark) <= parseInt(obj.full_marks) ||
              obj.mark == "A"
            ) {
              data.push(obj);
            }
          }
        }
      });
      if (data.length < 1) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Data To Submit",
          color: "red",
        });
      } else {
        this.$store.dispatch("submitPVMarks", data);
      }
    },

    callRef(i) {
      try {
        this.$refs["text" + i].focus();
      } catch (er) {
        this.$refs["text" + 0].focus();
      }
    },
  },
};
</script>

<style lang="scss">
.v-text-field input {
  font-size: 1.5em;
}

.pvMarksEntry-v-select {
  .v-input__prepend-outer {
    margin-right: 20px;
    margin-left: 10px;
  }
}
.mytable {
  .v-table thead tr:not(:last-child) {
    background-color: #555555;
  }
  .theme--light.v-datatable thead th.column.sortable.active {
    color: white;
    font-size: 130%;
  }
  .theme--light.v-table thead th {
    color: white;
    font-size: 130%;
  }
  .theme--light.v-datatable thead th.column.sortable.active .v-icon {
    color: white;
    padding-right: 5px;
  }
  .my-style {
    border-style: solid;
    border-width: 1px;
    // border-top-width: 1px;
    // border-right-width: 2px;
    // border-bottom-width: 1px;
    // border-left-width: 2px;
  }
}
</style>

