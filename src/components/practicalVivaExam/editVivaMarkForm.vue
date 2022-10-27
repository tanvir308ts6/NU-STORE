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
                <v-card-text class="title">Viva Student List</v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getVMarkList"
          :loading="loading"
          class="elevation-4 mytable"
          :total-items="pagination.totalDataItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.exam_roll }}</td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>
            <td class="text-xs-center" v-if="props.item.session">
              {{ props.item.session }}
            </td>
            <td class="text-xs-center" v-else>x</td>
            <td class="text-xs-center">{{ props.item.student_name }}</td>
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
                @keyup.enter="callRef(props.index + 1)"
                @keyup.up="callRef(props.index - 1)"
                @keyup.down="callRef(props.index + 1)"
                :error="getErrorStatus(props.item)"
                :prepend-icon="getIconForMarkEntry(props.item)"
                @click="marksEntryValidation(props.item)"
              ></v-text-field>
            </td>
            <td class="text-xs-center">{{ props.item.full_marks }}</td>
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
                  examinees' Viva marks anymore"</v-card-title
                >
              </v-layout>
            </v-card>
          </v-layout>
        </v-flex>

        <!-- submit button  -->
        <v-flex xs12 mt-4>
          <v-layout align-center justify-center row fill-height>
            <div v-if="editButton">
              <v-btn large round color="primary" @click="submit()">
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
    <!-- <pre> {{getVMarkList}}</pre> -->
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
    finally_submited_status: false,
    selected_center_name: "",
    selected_paper_name: "",
    loading: false,
    dialog: false,
    centerIdStatus: false,
    param1: false,
    param2: false,
    startModel: false,
    centerDetailDialog: false,
    searchParam: {},
    //reviewStat:true,
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
      { text: "Input Mark", align: "center", value: "id", sortable: false },
      {
        text: "Full Marks",
        align: "center",
        value: "full_marks",
        sortable: false,
      },
    ],
    pagination: {
      rowsPerPage: -1,
      rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
    },
    search: "",
    // searchParam: {},
    // loading: false,
    sl_count: 1,
    //final_status: 1,

    studentList: true,

    marks: [],
    editButton: true,
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
      //this.searchStudentList();
      console.log("created", this.searchParam);
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      this.searchStudentList();
    },

    buttonDisable() {
      if (this.buttonDisable > 0) {
        this.editButton = false;
        this.finally_submited_status = false;
      } else {
        this.editButton = true;
      }
    },
  },
  mounted() {
    return this.up();
  },
  methods: {
    getErrorStatus(item) {
      let flg1 = this.isPositiveInteger(item.mark);
      let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
      if (item.mark == "A") return false;
      if (flg1 & flg2) return false;
      else return true;
    },

    // myBtnClass(item){
    //   console.log("asas",item.mark)
    //   let flg1 = this.isPositiveInteger(item.mark);
    //   let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
    //   if(flg1 == true && flg2 == true){
    //    console.log("yyyy")
    //   }
    // },
    getIconForMarkEntry(item) {
      let flg1 = this.isPositiveInteger(item.mark);
      let flg2 = parseInt(item.mark) <= parseInt(item.full_marks);
      if (item.mark == "A") return "done";
      if (flg1 & flg2) return "done";
      else return "close";
    },
    marksEntryValidation(mark) {
      this.tab = "tab-2";
      console.log("mark.pass_marks", mark.pass_marks);
      if (parseInt(mark.mark) <= parseInt(mark.pass_marks)) {
        this.$root.$confirm("its fail mark.is this ok?").then((confirm) => {
          if (confirm) {
            console.log("ok done");
          } else {
            mark.mark = "";
            console.log("not done", mark.mark);
          }
        });
      }
    },
    isPositiveInteger(n) {
      return n >>> 0 === parseFloat(n);
    },
    getReadOnlyStatus(item) {
      //console.log("ITE", item)
      console.log(" FINAL", this.finally_submited_status);
      console.log(item.exam_roll + "  prractical status", item.final_status);

      if (item.final_status == 0) {
        this.finally_submited_status = true;
      }
      if (item.final_status > 0 || !this.editButton) {
        return true;
      } else return false;

      //return !this.editButton
    },
    close() {
      this.$emit("update:marksEditStatus", false);
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
      console.log("search action ", this.searchParam);
      console.log("button status ", this.buttonDisable);
      var self = this;
      this.loading = true;
      this.$store.dispatch("searchVivaMarks", this.searchParam).then((data) => {
        self.loading = false;
        self.pagination.sl_count = data.meta.from;
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
      this.getVMarkList.forEach((obj) => {
        var full_marks = obj.full_marks;
        if (obj.mark <= parseInt(full_marks) && obj.mark >= 0) {
          console.log("obj.mark", obj.mark);
          this.$store
            .dispatch("submitVivaMarks", this.getVMarkList)
            .then(() => {
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
        if (obj.mark <= parseInt(obj.pass_marks)) {
          console.log("obj.mark", obj.mark);
          this.$store.commit("SET_SNACKBAR", {
            msg: "IT'S A FAIl MARK ",
            color: "red",
          });
          this.$store.dispatch("submitVivaMarks", this.getMarkList).then(() => {
            self.close();
            self.bothSearch();
          });
        }
        //   if( ){
        //   alert("please give valid number again");
        // }
      });
      console.log(" edit vMarks -->", this.getVMarkList);
      // this.$store.dispatch("submitVivaMarks", this.getVMarkList).then(() => {
      //   self.close();
      //   self.bothSearch();
      // });
    },

    //  submit() {
    //   var self = this;
    //   console.log(" edit vMarks -->", this.getVMarkList);
    //   this.$store.dispatch("submitVivaMarks", this.getVMarkList).then(() => {
    //     self.close();
    //     self.bothSearch();
    //   });
    // },
    finalSubmit() {
      var self = this;
      this.getVMarkList.forEach((obj) => {
        obj.final_status = 1;
      });
      //this.getMarkList[0].final_status = this.final_status;

      this.$store
        .dispatch("submitFinalVivaMarks", this.getVMarkList)
        .then(() => {
          console.log(" final Submit vMarks -->");
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
    //viva center list
    var type = {
      type: 1,
    };
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    // this.searchParam.type = 1 ;
    this.$store.dispatch("fetchVivaWiseCenterData", this.searchParam);
    //  if(this.getVMarkList[0].final_status > 0){
    //      this.reviewStat = false;
    //  }
  },
  computed: {
    startDateFormatted() {
      return this.searchParam.date_time
        ? moment(this.searchParam.startDate).format("Do MMMM, YYYY")
        : "";
    },
    formTitle() {
      return this.buttonDisable === 1 ? "Review Viva Marks" : "Edit Viva Marks";
    },
    //all data
    getStudentListItem() {
      return this.$store.getters.getFinalExamineeList;
    },
    getSchema() {
      return this.$store.getters.getSchema;
    },
    getVMarkList() {
      return this.$store.getters.getVMarkList;
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




