<template>
  <v-container fluid>
    <v-dialog v-model="centerDetailDialog" width="500">
      <studentDetail :currentItem="currentItem"></studentDetail>
    </v-dialog>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <span class>
          <div class="display-1 mb-4">
            <v-icon size="50" color="primary">dashboard</v-icon>
            <span class="ml-2">{{ formTitle }}</span>
          </div>
        </span>
        <v-expansion-panel class="mb-3" inset v-model="open" v-if="editButton">
          <v-expansion-panel-content class="CSP_BoarderStyle">
            <template v-slot:actions>
              <v-icon large color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template v-slot:header>
              <div>
                <v-icon color="primary">search</v-icon>
                <span class="pl-2 title">Custom Search Panel</span>
                <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
              </div>
            </template>
            <v-layout column class="mx-5">
              <v-flex xs12>
                <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                  <v-layout row wrap align-center class="py-3">
                    <v-text-field
                      v-model="searchParam.reg_no"
                      class="ma-2"
                      name="rg_no"
                      menu-props="auto"
                      label="Registration Number"
                      prepend-icon="edit"
                    ></v-text-field>
                    <v-text-field
                      v-model="searchParam.exam_roll"
                      class="ma-2"
                      name="rg_no"
                      menu-props="auto"
                      label="Exam Roll"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-layout>
                </v-card>
                <v-flex
                  xs12
                  sm12
                  md12
                  style="margin-top: 5px; margin-bottom: 8px"
                >
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
        <!-- divider  -->
        <v-divider class="mt-4 mb-3"></v-divider>
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
                <v-card-text class="title">Practical Student List</v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getMarkList"
          :loading="loading"
          class="elevation-4 mytable"
          :total-items="pagination.totalDataItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs">{{ sl_count + props.index }}</td>
            <td class="text-xs-center">{{ props.item.exam_roll }}</td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>
            <td class="text-xs-center" v-if="props.item.session">
              {{ props.item.session }}
            </td>
            <td class="text-xs-center" v-else>x</td>
            <td class="text-xs-center" v-if="props.item.student_name">
              {{ props.item.student_name }}
            </td>
            <td class="text-xs-center" v-else>x</td>
            <!-- <td class="text-xs-left" v-if="ifNew">{{ props.item.student_name }}</td>
            <td class="text-xs-center" v-else>{{ props.item.student_name }}</td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>-->
            <td class="text-xs-left my--style" width="250">
              <v-text-field
                v-bind:readonly="getReadOnlyStatus(props.item)"
                :disabled="!editButton"
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

            <!-- <td class="text-xs-center">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon medium flat @click="showStudentDetailItem(props.item)">info</v-icon>
                  </v-btn>
                </template>
                <span>Info</span>
              </v-tooltip>
            </td>-->
          </template>
        </v-data-table>

        <!-- message show -->
        <v-flex xs12 mt-4 v-if="!editButton">
          <v-layout align-center justify-center row fill-height>
            <v-card
              color="cyan darken-4"
              dark
              width="800px"
              height="80px"
              align-center
              justify-center
            >
              <v-layout align-center justify-center row fill-height>
                <v-card-title style="font-size: 1.6em"
                  >"After the Final Submission, you won't be able to edit these
                  examinees' Practical marks anymore"</v-card-title
                >
              </v-layout>
            </v-card>
          </v-layout>
        </v-flex>

        <!-- submit button  -->
        <v-flex xs12 mt-4>
          <v-layout align-center justify-center row fill-height>
            <div>
              <v-btn
                large
                round
                color="primary"
                v-if="editButton"
                @click="submit()"
              >
                Edit
                <v-icon right dark>send</v-icon>
              </v-btn>
            </div>

            <div v-if="!editButton">
              <v-btn
                large
                round
                color="primary"
                :disabled="!finally_submited_status"
                @click="finalSubmit()"
              >
                Final Submit
                <v-icon right dark>send</v-icon>
              </v-btn>
            </div>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
    <!-- <pre> {{ getMarkList }} </pre> -->
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import moment from "moment";
import common_login_getters from "../../mixin/common_login_getters";
import commonFun from "../../mixin/common_function";
import studentDetail from "@/components/examinee/studentDetails.vue";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonFun, commonGet, common_login_getters, commonExamYear],
  components: {
    studentDetail,
  },
  props: [
    "marksEditStatus",
    "ifNew",
    "bothSearch",
    "buttonDisable",
    "reviewStat",
  ],
  data: () => ({
    selected_center_name: "",
    selected_paper_name: "",
    finally_submited_status: false,
    loading: false,
    dialog: false,
    editButton: true,
    centerIdStatus: false,
    startModel: false,

    //reviewStat:true,
    open1: 0,
    open2: 1,
    finalStatus: {
      final_Status: 1,
    },
    centerDetailDialog: false,
    searchParam: {},
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
      rowsPerPage: -1,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
    },
    search: "",
    // searchParam: {},
    // loading: false,
    sl_count: 0,

    studentList: true,

    marks: [],
    datePicker: false,
    currentItem: {},
    pvMarks: [{}],
    getData: [],
  }),
  watch: {
    marksEditStatus(val) {
      this.dialog = val;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;

      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
      }
      this.searchStudentList();
      console.log("watch ---marksEditStatus ", this.searchParam);
    },
    buttonDisable() {
      if (this.buttonDisable > 0) {
        this.editButton = false;
      } else {
        this.editButton = true;
      }
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      console.log("searchStudentList  Calling from PAGGI.... watch");
      this.searchStudentList();
    },
  },
  mounted() {
    return this.up();
  },
  methods: {
    close() {
      this.$emit("update:marksEditStatus", false);
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
    getIconForMarkEntry(item) {
      let flg1 = this.isPositiveInteger(item.mark);
      //item.full_marks = 50;
      let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
      console.log("item.full_marks", item);
      if (item.mark == "A") return "done";

      if (flg1 & flg2) return "done";
      else return "close";
    },
    isPositiveInteger(n) {
      return n >>> 0 === parseFloat(n);
    },
    getErrorStatus(item) {
      let flg1 = this.isPositiveInteger(item.mark);
      let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
      let fail = parseInt(item.mark) <= parseInt(item.pass_marks);
      // if (fail){
      //   alert("fail mark");

      // }
      if (item.mark == "A") return false;
      if (flg1 & flg2) return false;
      else return true;
    },

    getReadOnlyStatus(item) {
      console.log(" FINAL", this.finally_submited_status);
      console.log(item.final_status + " prractical roll", item.exam_roll);
      if (item.final_status == 0) {
        this.finally_submited_status = true;
      }
      if (item.final_status > 0 || !this.editButton) {
        return true;
      } else return false;

      //return !this.editButton
    },
    showStudentDetailItem(item) {
      this.currentItem = item;
      this.centerDetailDialog = !this.centerDetailDialog;
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
      //   if (this.buttonDisable > 0) {

      //   this.editButton = false;
      // }
      console.log("Edit page ... searchStudentList", this.searchParam);
      console.log("buttonDisablesss", this.buttonDisable);
      //console.log("current status check", this.getMarkList[0].final_status);
      var self = this;
      this.loading = true;
      this.$store
        .dispatch("searchPracticalMarks", this.searchParam)
        .then((data) => {
          self.loading = false;
          self.sl_count = data.meta.from;
          self.pagination.totalDataItems = data.meta.total;
          console.log("...", data);
        });
    },
    setMarks(pvMarksFromList) {
      this.pvMarks = pvMarksFromList;
      this.searchParam = pvMarksFromList;
      console.log("-->", this.pvMarks);
      if (this.studentList) {
        this.studentList = !this.studentList;
      }
      if (Object.keys(this.pvMarks).length > 5) {
        this.studentList = true;
      }
    },
    submit() {
      var self = this;
      var t = false;
      this.getMarkList.forEach((obj) => {
        var full_marks = obj.full_marks;
        console.log("print me", full_marks);
        if (obj.mark <= parseInt(full_marks) && obj.mark >= 0) {
          console.log("obj.mark", obj.mark);
          this.$store.dispatch("submitPVMarks", this.getMarkList).then(() => {
            self.close();
            self.bothSearch();
          });
        }
        if (obj.mark >= parseInt(full_marks) || obj.mark <= -1) {
          this.$store.commit("SET_SNACKBAR", {
            msg: "NOT VAlID MARK ",
            color: "red",
          });
        }
        //   if( obj.mark <= parseInt(obj.pass_marks) ){
        //   console.log("obj.mark",obj.mark)
        //      this.$store.commit("SET_SNACKBAR", {
        //   msg: "IT'S A FAIl MARK ",
        //   color: "red",
        // });
        //   this.$store.dispatch("submitPVMarks", this.getMarkList).then(() => {
        //     self.close();
        //     self.bothSearch();
        //   });
        // }
      });
    },
    // submit() {

    //   var self = this;
    //   console.log(" edit pvMarks -->", this.getMarkList);
    //   this.$store.dispatch("submitPVMarks", this.getMarkList).then(() => {
    //     self.close();
    //     self.bothSearch();
    //   });
    // },
    finalSubmit() {
      var self = this;
      this.getMarkList.forEach((obj) => {
        obj.final_status = 1;
      });
      console.log(" edit pvMarks -->", this.getMarkList);
      this.$store.dispatch("submitPVMarks", this.getMarkList).then(() => {
        this.finally_submited_status = false;
        self.close();
        self.bothSearch();
      });
    },

    callRef(i) {
      try {
        this.$refs["text" + i].focus();
      } catch (er) {
        this.$refs["text" + 0].focus();
      }
    },
  },
  created() {
    //practical center list
    var type = {
      type: 1,
    };
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    console.log(
      "edit exam initiateid chck ",
      this.searchParam.exam_initiate_id
    );
    console.log("Edit form call ", this.reviewStat);
    this.$store.dispatch("fetchPracticalWiseCenterData", this.searchParam);
  },
  computed: {
    startDateFormatted() {
      return this.searchParam.date_time
        ? moment(this.searchParam.startDate).format("Do MMMM, YYYY")
        : "";
    },
    //all data
    getStudentListItem() {
      return this.$store.getters.getFinalExamineeList;
    },
    getSchema() {
      return this.$store.getters.getSchema;
    },
    getMarkList() {
      return this.$store.getters.getMarkList;
    },
    formTitle() {
      return this.buttonDisable === 1
        ? "Review Practical Marks"
        : "Edit Practical Marks";
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