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
              <v-layout
                class="mx-5"
                row
                wrap
                align-center
                v-if="forceRerenderFlag"
              >
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    :item-text="
                      item => '( Code:' + item.code + ' ) ' + item.title
                    "
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
                      v-model="searchParam.exam_roll"
                      outline
                      class="ma-1"
                      name="exam_roll"
                      menu-props="auto"
                      label="Exam Roll"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
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
                      outline
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
                      v-model="searchParam.paper_code"
                      :item-text="item => item.code + ' - ' + item.title"
                      item-value="code"
                      :items="getPaperList"
                      menu-props="auto"
                      label="Select Paper"
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
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete
                      outline
                      class="ma-1"
                      hide-details
                      v-model="searchParam.session"
                      :item-text="item => item.session"
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
                          @input="searchParam.center_code = ''"
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
                      class="ma-1"
                      v-model="searchParam.subject_code"
                      :items="getSubjectList"
                      :item-text="item => '(' + item.code + ') ' + item.title"
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
                  <v-flex xs6>
                    <v-autocomplete
                      outline
                      class="ma-1"
                      v-model="searchParam.degree_code"
                      :item-text="item => item.code + ' - ' + item.title"
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
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete
                      outline
                      class="ma-1"
                      v-model="searchParam.degree_group_code"
                      :items="getDegreeGroupList"
                      color="primary"
                      label="Select Degree Group"
                      hide-details
                      :item-text="
                        item =>
                          '(' +
                          item.degree_group_code +
                          ') ' +
                          item.degree_group_name
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
                            "(" +
                              data.item.degree_group_code +
                              ") " +
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
                                '(' +
                                  data.item.degree_group_code +
                                  ') ' +
                                  data.item.degree_group_name
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
            <!-- <v-flex xs12 sm12 md12 class="mb-3">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="searchFormFillupList()">
                  <v-icon left dark>add</v-icon>ADD STUDENT
                </v-btn>
              </v-layout>
            </v-flex>-->
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
    <v-container fluid>
      <v-card flat color="white">
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
              <v-card-text class="title">Transcript List</v-card-text>
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
          <!-- <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>-->
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.session_year }}</td>
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
          <td class="text-xs">{{ paperString(props.item.details) }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";

export default {
  components: {},
  mixins: [commonGet, commonExamYear],

  data() {
    return {
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
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }]
      },
      search: "",
      getStatus: [
        { name: "All", value: 0 },
        { name: "Only Teacher Approved", value: 1 },
        { name: "Only Paid", value: 2 }
      ],
      searchParam: {
        reg_no: "16316000191",
        full: true,
        admitcard: false,
        final: true
      }
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
    this.$store.dispatch("fetchAllSessionData");
  },
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
        { text: "SL", value: "sl" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Registration No", value: "reg_no" },
        { text: "Session Year", value: "session_year" },
        { text: "Exam", value: "exam_name" },
        { text: "Year", value: "year" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Degree ", value: "degree_code" },
        { text: "Degree Group", value: "degree_group_code" },
        { text: "Paper Details", value: "mandatory_papers" }
      ];
    }
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
      this.$store.dispatch("searchFormFillup", this.searchParam).then(data => {
        // console.log("data---", data);
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalItems = data.meta.total;
        this.e13 = 2;
      });
    },

    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    close() {
      this.searchParam = {
        reg_no: "",
        exam_code: "",
        paper_code: ""
      };
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
    }
  },
  watch: {
    pagination() {
      this.searchFormFillupList();
    }
  }
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
</style>
