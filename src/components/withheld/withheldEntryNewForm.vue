<template>
  <v-container fluid>
    <v-card flat color="white" class="mb-0">
      <v-expansion-panel class="mb-0" inset v-model="open">
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
            <v-flex class="mx-5">
              <v-layout class="mx-5" row wrap align-center v-if="forceRerenderFlag">
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    :item-text="item => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Exam"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.year"
                    :items="getYearList"
                    :item-text="item => '' + item.year + ''"
                    item-value="year"
                    label="Year"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_type"
                    :items="getExamType"
                    item-text="exam_type_name"
                    item-value="exam_type"
                    label="Select Type"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                <v-layout row wrap align-center class="py-3">
                  <v-flex xs6>
                    <v-text-field
                      :disabled="!show"
                      v-model="searchParam.reg_no"
                      outline
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Registration Number"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      :disabled="!show"
                      v-model="searchParam.exam_roll"
                      outline
                      class="ma-1"
                      name="exam_roll"
                      menu-props="auto"
                      label="Roll Number"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 v-if="!ifCenterUser">
                    <v-text-field
                      outline
                      :disabled="!show"
                      class="ma-1"
                      hide-details
                      name="code"
                      label="College Code"
                      v-model="searchParam.college_code"
                      prepend-inner-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete
                      outline
                      class="ma-1"
                      :disabled="!show"
                      v-model="searchParam.paper_code"
                      :item-text="item => item.code + ' - ' + item.title"
                      item-value="code"
                      :items="getPaperList"
                      menu-props="auto"
                      label="Select Course"
                      hide-details
                      prepend-inner-icon="library_books"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="remove(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{
                          data.item.code + " - " + data.item.title
                          }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 v-if="!ifCenterUser">
                    <v-autocomplete
                      outline
                      :disabled="!show"
                      class="ma-1"
                      v-model="searchParam.subject_code"
                      :items="getSubjectList"
                      :item-text="item => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Select Subject"
                      hide-details
                      prepend-inner-icon="library_books"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="removeSub(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >{{ data.item.code + " - " + data.item.title }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete
                      class="ma-1"
                      :disabled="ifCenterUser || !show"
                      v-model="searchParam.center_code"
                      :items="getCenterList"
                      color="blue-grey lighten-2"
                      label="Select Center"
                      :item-text="
                        item => item.center_code + ' - ' + item.center_name
                      "
                      item-value="center_code"
                      prepend-icon="face"
                      
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="removeCenter(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >{{ data.item.center_name }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
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
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 class="mb-3" v-if="show">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="searchFormFillupList()">
                  <v-icon left dark>add</v-icon>ADD STUDENT
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

    <v-card flat color="white" class="mb-0">
      <v-container fluid style=" padding: 5px;">
        <!-- <v-card flat color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Students After Search</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
          </v-layout>
        </v-card> -->
    <!--     <v-data-table
          v-model="selected"
          :loading="loading"
          :headers="formFillUpListHeaders"
          :items="getFormFillupList"
          class="elevation-0"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs">{{ sl_count + props.index }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.exam_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.exam_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ props.item.year }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.college_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.college_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.subject_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.subject_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.degree_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.degree_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.degree_group_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.degree_group_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ props.item.session_year }}</td>
            <td class="text-xs">{{ props.item.exam_roll }}</td>
            <td class="text-xs">{{paperString(props.item.details)}}</td>
          </template>
        </v-data-table> -->
      </v-container>
    </v-card>

     <h1 align="center">Student's Detail</h1>
         <br>
        <table class="b" style="margin-left:100px; margin-right:50px;" v-for="item in getFormFillupList">
          <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Student Name</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.student_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Registration Number</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.reg_no}}</p>
          </td>
        </tr>
           <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Exam Roll</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.exam_roll}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Session</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.session_year}}</p>
          </td>
        </tr>
             <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Exam Name</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.exam_code}}-{{item.exam_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Year</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; margin-top:10px">{{item.year}}</p>
          </td>
        </tr>
             <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">College Name</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; ">{{item.college_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Subject</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
           
            <p style="margin-left:10px; margin-right:50px; ">{{item.subject_name}}</p>
          </td>
        </tr>
             <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Degree</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; ">{{item.degree_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Degree Group</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
           
            <p style="margin-left:10px; margin-right:50px; ">{{item.degree_group_name}}</p>
          </td>
        </tr>
        </table>
    <!-- <v-flex xs12 v-if="!ifCenterUser">
      <v-card flat height="80px">
        <v-select
          outline
          name="year"
          class="ma-2 pa-2"
          v-model="type"
          item-text="title"
          item-value="value"
          :items="getItem"
          menu-props="auto"
          label="Select Report or Withheld"
          hide-details
          prepend-inner-icon="edit"
        ></v-select>
      </v-card>
    </v-flex> -->

    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
        <v-layout row wrap class="ml-0 py-0">
          <v-flex xs12>
            <v-textarea
              hide-details
              class="mx-3 mt-3"
              outline
              name="input-7-4"
              label="Reason"
              v-model="reason"
              auto-grow
              box
              rows="2"
              style="background-color: #FFEBEE;"
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              hide-details
              class="ma-3"
              outline
              name="input-7-4"
              label="Policy"
              v-model="policy"
              auto-grow
              box
              rows="2"
              style="background-color: #FFCDD2;"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-alert
          :value="showBeforeSubmitAlert"
          class="my-2"
          type="warning"
        >Please fill up the reason and policy section.</v-alert>
        <v-layout justify-center row fill-height align-center>
          <v-btn
            class="ma-2 mb-3 erBtn"
            color="primary"
            large
            dismissible
            @click.stop.prevent="submitWithHeld()"
          >Submit</v-btn>
        </v-layout>
      </v-card>
    </v-hover>
  </v-container>
</template>
<script>
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import commonFunction from "@/mixin/common_function";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  props: ["dialogStatus", "ifCenterItem", "searchRepWithheldList"],
  components: {},
  mixins: [commonGet, commonExamYear, commonFunction, common_login_getters],

  data() {
    return {
      type: 0,
      show: true,
      open: 0,
      e13: 1,
      reason: "",
      policy: "",
      showBeforeSubmitAlert: false,
      forceRerenderFlag: true,
      sl_count: 1,
      selected: [],
      loading: false,
      componentStatus: false,
      details: [],
      beforeSubmit: false,
      rollGendMode: true,
      dialog: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: -1,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: {
        reg_no: "",
        college_code: "",
        paper_code: [],
        subject_code: [],
        
        full: true,
        admitcard: false,
        final: true,
      },
    };
  },

  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = parseInt(this.ifCenterItem.center_code);
      this.searchParam.subject_code = [];
      this.searchParam.college_code = "";
    }
    // center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
  },
  // all from fillup list
  // if (this.$store.getters.getFormFillupItem.length == 0) {
  // this.$store.dispatch("fetchFormFillupData");
  // this.$store.dispatch("searchFormFillup", this.searchParam);
  // }
  //this.$store.dispatch("fetchFormFillupData");
  // mounted() {
  //   this.$validator.localize("en", this.dictionary);
  // },
  computed: {
    getItem() {
      return [
        { title: "Report", value: "1" },
        { title: "Withheld", value: "2" },
      ];
    },

    //all data
    getFormFillupList() {
      return this.$store.getters.getFormFillupItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    ifLoadingListDone() {
      return this.$store.getters.getFormFillupItem.length > 0 ? false : true;
    },
    formFillUpListHeaders() {
      return [
        { text: "SL", value: "sl" },
        { text: "Registration No", value: "reg_no" },
        { text: "Exam", value: "exam_name" },
        { text: "Year", value: "year" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Degree ", value: "degree_code" },
        { text: "Degree Group", value: "degree_group_code" },
        { text: "Session Year", value: "session_year" },
        { text: "Exam Roll", value: "exam_roll" },
        // { text: "Paper Details", value: "mandatory_papers" }
      ];
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchFormFillupList() {
      this.loading = true;
      this.setLimit();
      var that = this;
      this.$store
        .dispatch("searchFormFillup", this.searchParam)
        .then((data) => {
          that.searchParam.center_code = parseInt(that.searchParam.center_code);
          // console.log("data---", data);
          if (data.data.length) {
            that.show = false;
            console.log("..", that.show);
          } else {
            that.show = true;
          }
          that.searchParam.exam_roll_no = data.data[0].exam_roll;
          that.searchParam.ac_session = data.data[0].session_year;
          that.loading = false;
          that.sl_count = data.meta.from;
          that.pagination.totalItems = data.meta.total;
          that.e13 = 2;
        });
    },
    getStatusName(stdStatus, tchStatus) {
      var statusName = stdStatus == 0 ? "Std : No " : "Std : Yes ";
      statusName += tchStatus == 0 ? "Tch : No " : "Tch : Yes ";
      return statusName;
    },

    showPaperDetails(details) {
      this.paperDialog = true;
      this.details = details;
      // console.log(details);
    },

    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    close() {
      console.log(this.dialogStatus);
      this.$store.commit("UNSET_FORM_FILLUP_DATA");
      this.$emit("update:dialogStatus", false);
      // this.searchParam = {
      //   reg_no: "",
      //   //exam_code: "",
      //   paper_code: "",
      //   center_code: "",
      //   full: true,
      //   admitcard: false,
      //   final: true
      // };
      this.searchParam.reg_no = "";
      this.searchParam.paper_code = [];
      this.reason = "";
      this.policy = "";
    },
    showPapers(papers) {
      let str = "( ";
      papers.forEach((obj, index) => {
        str = str + obj.paper_code;
        if (!(papers.length - 1 == index)) {
          str = str + " , ";
        } else {
          str = str + " )";
        }
      });
      return str;
    },
    openBeforeSubmit() {
      this.beforeSubmit = true;
    },
    submitWithHeld() {
      if (!this.reason || !this.policy) {
        // console.log("if", this.reason + " / " + this.policy);
        this.showBeforeSubmitAlert = true;
      } else {
        this.showBeforeSubmitAlert = false;
        // this.$store.commit("SET_SNACKBAR", {
        //   msg: "Success !! Submitted",
        //   color: "green"
        // });
        this.beforeSubmit = false;
        
        let postData = this.searchParam;
        postData.reason = this.reason;
        postData.policy = this.policy;
         // postData.center_code = [this.ifCenterItem.center_code];
        postData.type = 2;
        // if (this.ifCenterUser) {
        //   postData.center_code = [this.ifCenterItem.center_code];
        //   postData.type = 2;
        //   // postData.subject_code = [];
        // } 
        // else {
        //   postData.type = this.type;
        // }
        // delete postData.full;
        // delete postData.final;
        // delete postData.admitcard;
        var that = this;
        console.log("..print ", JSON.stringify(postData));
        this.$store
          .dispatch("withHeldReportedStudentAdd", postData)
          .then((data) => {
            that.searchRepWithheldList();
            that.close();
          });
      }
    },
    paperString(papers) {
      let s = "";
      papers.forEach((paper, i) => {
        if (i != 0) {
          s = s + "," + paper.paper_code;
        } else {
          s = s + paper.paper_code;
        }
      });
      return s;
    },
    removeSub(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      console.log("..mtu", this.ifCenterItem);
      this.show = true;
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      if (this.dialog) this.searchFormFillupList();
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}

.v-stepper__content {
}
.table {
  border-collapse: collapse;
}

.a {
  border: 1px solid black;
}
.b{
  border-collapse: collapse;
}
</style>
