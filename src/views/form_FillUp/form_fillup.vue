<template>
  <v-container fluid>
    <!-- {{getLoggedInExam}} -->
    <v-dialog v-model="rollGendialog" persistent width="700">
      <v-toolbar>
        <v-toolbar-title>Roll Generate</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat @click="rollGendialog = false">
          <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>
      <v-card>
        <rollGenerate @closeRollGendialog="closeRollGendialog"></rollGenerate>
      </v-card>
    </v-dialog>

    <v-dialog v-model="paperDialog" width="1050">
      <v-toolbar>
        <v-toolbar-title>
          <div class="title">Course Details</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn round outline flat @click="paperDialog = false">
          <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-layout row wrap class="ml-4 py-4">
          <v-flex
            v-for="(paper, i) in details"
            :key="paper.code"
            xs12
            class="ma-2"
          >
            <div class="title">
              <v-layout row class="ml-0">
                <v-flex xs1>
                  <span>({{ i + 1 }})</span>
                </v-flex>
                <v-flex xs1>
                  <span>{{ paper.paper_code }} -</span>
                </v-flex>
                <v-flex xs10>
                  <strong style="margin-left:1em">{{
                    paper.paper_name
                  }}</strong>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- <v-card v-if="publishState==1">
      <v-alert :value="true" type="info">Form Fillup Published</v-alert>
    </v-card>-->
    <!-- </br> -->

    <v-expansion-panel class="mb-3" inset v-model="open">
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
            <v-layout
              class="mx-5"
              row
              wrap
              align-center
              v-if="forceRerenderFlag"
            >
              <!-- {{getLoggedInExam}} -->
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                ></v-select>
              </v-flex>
              <!-- {{getLoggedInYear}} -->
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="(item) => '' + item.year + ''"
                  item-value="year"
                  label="Year"
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
                    v-model="searchParam.reg_no"
                    outline
                    class="ma-3"
                    name="rg_no"
                    menu-props="auto"
                    label="Registration Number"
                    prepend-inner-icon="edit"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    outline
                    class="ma-3"
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
                    class="ma-3"
                    v-model="searchParam.paper_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
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
                        >{{ data.item.code + " - " + data.item.title }}</v-chip
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
                <v-flex xs6>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    hide-details
                    v-model="searchParam.session_year"
                    :item-text="(item) => item.session"
                    item-value="session_year"
                    :items="getSessionList"
                    menu-props="auto"
                    label="Session Year"
                    prepend-inner-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSession(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.session }}</v-chip
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
                            v-html="data.item.session"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    hide-details
                    prepend-inner-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSubject(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{ data.item.code + " - " + data.item.title }}
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
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    v-model="searchParam.degree_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getDegreeList"
                    menu-props="auto"
                    label="Select Degree"
                    hide-details
                    prepend-inner-icon="list_alt"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.degree_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.code + " - " + data.item.title }}</v-chip
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
                <v-flex xs6>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    v-model="searchParam.degree_group_code"
                    :items="getDegreeGroupList"
                    color="primary"
                    label="Select Degree Group"
                    hide-details
                    :item-text="
                      (item) =>
                        item.degree_group_code + ' - ' + item.degree_group_name
                    "
                    item-value="degree_group_code"
                    prepend-inner-icon="list_alt"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.degree_group_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.degree_group_code +
                            " - " +
                            data.item.degree_group_name
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
                              data.item.degree_group_code +
                                ' - ' +
                                data.item.degree_group_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    outline
                    class="ma-3"
                    v-model="searchParam.ungenerated_roll"
                    label="Ungenerated Roll"
                    type="checkbox"
                    color="indigo darken-3"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mb-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchFormFillupList()">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <v-toolbar flat color="white">
  <v-spacer />
  <v-btn

  style="border-radius: 12px 0%;"
  color="primary"
  @click="publishFromFillup()"
  >
  <div class="title">From Fill-up Publish</div>
</v-btn>
    </v-toolbar>-->

    <v-divider class="mt-5 mb-3"></v-divider>
    <div class="text-xs-right customRollGenCss">
      <!-- <v-btn color="success" v-if="rollGendMode" @click="rollGendialog = true">Roll Generate</v-btn> -->
    </div>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  small
                  style="margin-top: -0.8em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Form Fill-up List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!--<v-btn @click="searchFormFillupList()" class="ml-3" fab small flat dark color="primary">
            <v-icon dark large>search</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            label="Search"
            class="mt-1"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>-->
        </v-layout>
      </v-card>
      <!--  <pre>  {{getFormFillupList[0]}} </pre> -->
      <v-data-table
        :loading="loading"
        :headers="formFillUpListHeaders"
        :items="getFormFillupList"
        class="elevation-1"
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
              <span class="title"
                >Code: {{ props.item.degree_group_code }}</span
              >
            </v-tooltip>
          </td>
          <td class="text-xs">{{ props.item.session_year }}</td>
          <td class="text-xs">{{ props.item.student_type }}</td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">
            <v-btn
              outline
              color="info"
              @click="showPaperDetails(props.item.details)"
            >
              <b class="mr-2">{{ props.item.details.length }}</b>
              <span class="mr-2" v-if="props.item.details.length - 1"
                >Courses</span
              >
              <span v-else class="mr-2">Course</span>
              <span class="mr-2">Details</span>
            </v-btn>
          </td>
          <!-- <td class="text-xs">{{ props.item.id }}</td> -->
          <!-- <td class="text-xs">
            <v-layout row wrap>
              <v-flex v-for="(paper,i) in props.item.details" :key="paper.code" xs12>
                <span>({{i+1}})</span>
                <strong>{{paper.paper_name}}</strong>
                <span>&nbsp;({{paper.paper_code}})</span>
              </v-flex>
            </v-layout>
          </td>-->
          <!-- {{ getMandatoryPaperName(props.item.details) }} -->
          <!-- <td class="text-xs">{{ getOptionalPaperName(props.item.details) }}</td>
          <td class="text-xs">{{ getImprovementPaperName(props.item.details) }}</td>-->
          <!-- <td
            class="text-xs"
          >{{ getStatusName(props.item.student_confirm_status, props.item.teacher_confirm_status) }}</td>-->
          <!-- <td class="text-xs-center">
            <v-btn color="info" @click="showDetails(props.item)">Info</v-btn>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import rollGenerate from "@/components/formFillup/rollGenerate";
// import formNotification from "@/components/utils/formNotification";
export default {
  props: ["dialogStatus"],
  components: {
    rollGenerate,
  },
  mixins: [commonGet, commonExamYear],

  data() {
    return {
      forceRerenderFlag: true,
      publishState: 0,
      sl_count: 1,
      loading: false,
      componentStatus: false,
      details: [],
      rollGendialog: false,
      rollGendMode: true,
      // examMode: true,
      // paperMode: true,
      dialog: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      getStatus: [
        { name: "All", value: 0 },
        { name: "Only Teacher Approved", value: 1 },
        { name: "Only Paid", value: 2 },
      ],
      searchParam: {
        full: true,
        admitcard: false,
        final: true,
      },
    };
  },

  created() {
    // this.$store.commit("UNSET_FORM_FILLUP_DATA");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;

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
    //degree group
    this.$store.dispatch("fetchDegreeGroupList");
    //session
    this.$store.dispatch("fetchAllSessionData");
    // let param = {};
    // param.exam_initiate_id = this.getExamInitiateId;
    // param.tag = "FormFillUp";
    // param.status = "1";
    // this.$store.dispatch("publishActivity", param).then(data => {
    //   this.publishState = data.publish_status;
    // });
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
  // mounted() {
  //   this.getDataFromApi();
  // },
  computed: {
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
        { text: "SL", value: "sl", sortable: false },
        { text: "Registration No", value: "reg_no", sortable: false },
        { text: "Exam", value: "exam_name", sortable: false },
        { text: "Year", value: "year", sortable: false },
        { text: "College", value: "college_name", sortable: false },
        { text: "Subject", value: "subject_code", sortable: false },
        { text: "Degree ", value: "degree_code", sortable: false },
        { text: "Degree Group", value: "degree_group_code", sortable: false },
        { text: "Session Year", value: "session_year", sortable: false },
        { text: "Student type", value: "student_type", sortable: false },
        { text: "Exam Roll", value: "exam_roll", sortable: false },
        { text: "Course Details", value: "mandatory_papers", sortable: false },
      ];
    },
  },
  methods: {
    publishFromFillup() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "FormFillUp";
      this.$store.dispatch("publishActivity", param);
    },
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
      this.$store
        .dispatch("searchFormFillup", this.searchParam)
        .then((data) => {
          // console.log("data---", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },

    getMandatoryPaperName(details) {
      var arr = [];
      details.forEach(function(item) {
        arr.push(item.paper_name + " (" + item.paper_code + ")");
        // arr.push("" + item.paper_name);
      });
      return arr;
      // return arr.join();
    },
    getOptionalPaperName(details) {
      var arr = [];
      details.forEach(function(item) {
        arr.push(item.paper_name + " (" + item.paper_code + ")");
      });
      return arr.join();
    },
    getImprovementPaperName(details) {
      var arr = [];
      details.forEach(function(item) {
        arr.push(item.paper_name + " (" + item.paper_code + ")");
      });
      return arr.join();
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
    /*
    // getPaperName(details) {
    //   var array = [];
    //   //return (array = JSON.stringify(details));
    //   array = JSON.stringify(details);
    //   var dog = JSON.parse(array);
    //   for (var key in dog) {
    //     this.accept_name[key] = dog[key].paper_name;
    //   }
    //   return this.accept_name.join();
    // },
    */

    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    removeSession(item) {
      console.log("session item", item);
      const index = this.searchParam.session_year.indexOf(item.session);
      console.log("session in", index);
      if (index >= 0) this.searchParam.session_year.splice(index, 1);
    },
    removeSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "remove subject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
    close() {
      this.$emit("update:dialogStatus", false);
      this.searchParam = {
        reg_no: "",
        exam_code: "",
        paper_code: "",
      };
    },
    closeRollGendialog(params) {
      this.rollGendialog = false;
      // console.log(params);
    },
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      this.searchFormFillupList();
    },
    rollGendialog(val) {
      if (val) {
        this.$store.dispatch("fetchRollGenSummaryData", this.searchParam);
      }
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
</style>
