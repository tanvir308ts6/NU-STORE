<template>
  <v-container fluid>
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
                  <strong style="margin-left:1em">
                    {{ paper.paper_name }}
                  </strong>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-expansion-panel inset v-if="true">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <v-toolbar flat color="white" dense>
            <v-toolbar-side-icon>
              <v-icon color="primary">search</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title>Custom Search Panel</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="body-1 ml-2">
              EXAM: {{ getCurrentDetailItem.exam_code }} -
              {{ getCurrentDetailItem.exam_name }} - ({{
                getCurrentDetailItem.year
              }}) | COLLEGE: {{ getCurrentDetailItem.college_code }} -
              {{ getCurrentDetailItem.college_name }}
            </div>
          </v-toolbar>
          <!-- <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
            <v-spacer />
            <div class="body-1 ml-2">
              EXAM: ({{ getCurrentDetailItem.exam_code }})
              {{ getCurrentDetailItem.exam_name }} | YEAR: ({{
              getCurrentDetailItem.year
              }}) | COLLEGE: ({{ getCurrentDetailItem.college_code }})
              {{ getCurrentDetailItem.college_name }}
            </div>
          </div>-->
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-text-field
                  class="ma-2"
                  v-model="searchParam.reg_no"
                  menu-props="auto"
                  label="Registration Number"
                  hide-details
                  prepend-icon="horizontal_split"
                  name="rg_no"
                ></v-text-field>
                <v-flex xs6>
                  <v-autocomplete
                    disabled
                    class="ma-2"
                    menu-props="auto"
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    color="blue-grey lighten-2"
                    label="Select Exam"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    prepend-icon="subject"
                    hide-details
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.exam_code = ''"
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
                <v-flex xs3>
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
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    disabled
                    class="ma-2"
                    hide-details
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getPaperList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
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
                <v-autocomplete
                  class="ma-2"
                  hide-details
                  v-model="searchParam.session_year"
                  :item-text="(item) => item.session"
                  item-value="session_year"
                  :items="getSessionList"
                  menu-props="auto"
                  label="Session Year"
                  prepend-icon="list"
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

                <!-- <v-text-field
                  class="ma-2 mt-4"
                  name="session"
                  label="Session Year"
                  menu-props="auto"
                  v-model="searchParam.session_year"
                  prepend-icon="edit"
                  hint="example : 2014-15"
                  persistent-hint
                ></v-text-field>-->
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  prepend-icon="library_books"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeSubject(data.item)"
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
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.degree_code"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getDegreeList"
                  menu-props="auto"
                  label="Select Degree"
                  hide-details
                  prepend-icon="list_alt"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.degree_code = ''"
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
                <v-autocomplete
                  class="ma-2"
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
                  prepend-icon="list_alt"
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
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchFormFillupList()"
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
              <v-card-text class="title">Form FillUp List Details</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-btn
            @click="searchFormFillupList()"
            class="ml-3"
            fab
            small
            flat
            dark
            color="primary"
          >
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

          <!-- <v-spacer />
          <v-btn color="blue-grey" class="white--text" @click="exportFormFillupListListOnClick()">
            <v-icon left dark>arrow_downward</v-icon>Export
          </v-btn>-->
        </v-layout>
      </v-card>
      <!-- {{getFormFillupCollgeWiseDetailsItem[0]}} -->
      <v-data-table
        :loading="loading"
        :headers="formFillUpListHeaders"
        :items="getFormFillupCollgeWiseDetailsItem"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr v-if="checkDataInItem(props.item)">
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
            <td class="text-xs">{{ props.item.exam_roll }}</td>
            <td class="text-xs">
              <v-btn
                outline
                color="info"
                @click="showPaperDetails(props.item.details)"
              >
                <b class="mr-2">{{ props.item.details.length }}</b>
                <span v-if="props.item.details.length - 1">Courses</span>
                <span v-else class="mr-2">Course</span>
                <!-- <span class="mr-2">Paper Details</span> -->
              </v-btn>
            </td>
          </tr>

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
    <!-- {{ getFormFillupCollgeWiseDetailsItem }} -->
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
export default {
  props: ["dialogStatus"],
  components: {},
  mixins: [commonGet],
  data() {
    return {
      sl_count: -1,
      loading: true,
      componentStatus: false,
      details: [],
      rollGendialog: false,
      rollGendMode: true,
      dialog: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: {
        full: true,
        admitcard: false,
        final: true,
      },
    };
  },

  created() {
    // this.$store.commit("UNSET_FORM_FILLUP_DATA");

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
  },
  computed: {
    //all data
    getFormFillupList() {
      return this.$store.getters.getFormFillupItem;
    },
    getCurrentDetailItem() {
      return this.$store.getters.getCurrentDetailItem;
    },
    getFormFillupCollgeWiseDetailsItem() {
      return this.$store.getters.getFormFillupCollgeWiseDetailsItem;
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
        { text: "Degree", value: "degree_code" },
        { text: "Degree Group", value: "degree_group_code" },
        { text: "Session Year", value: "session_year" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Course Details", value: "mandatory_papers" },
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
      console.log("--->", this.searchParam);
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch("searchFormFillupCollegeWiseDetails", this.searchParam)
        .then((data) => {
          console.log("--->", data);
          self.loading = false;
          self.sl_count = data.meta.from;
          self.pagination.totalItems = data.meta.total;
          console.log("..pag", this.pagination);
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
      console.log(index + "removesubject", this.searchParam.subject_code);
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
    checkDataInItem(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
        ? false
        : true;
    },
  },
  watch: {
    getCurrentDetailItem(val) {
      this.$store.commit("UNSET_FORM_FILLUP_COLLEGEWISE_DATA_DETAILS");
      this.pagination.totalItems = 0;
      this.searchParam.exam_code = val.exam_code;
      this.searchParam.year = val.year;
      this.searchParam.college_code = val.college_code;
      this.searchParam.exam_initiate_id = val.exam_initiate_id;
      this.searchFormFillupList();
    },
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      let obj = this.getCurrentDetailItem;
      if (!(Object.keys(obj).length === 0 && obj.constructor === Object)) {
        this.searchFormFillupList();
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
