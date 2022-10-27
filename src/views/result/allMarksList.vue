<template>
  <v-container fluid>
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
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
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
                <v-text-field
                  v-model="searchParam.reg_no"
                  class="mt-3 mr-2 ml-2"
                  name="rg_no"
                  label="Registration Number"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  v-model="searchParam.exam_roll"
                  class="mt-3 mr-2 ml-2"
                  name="exam_roll"
                  label="Exam Roll"
                  prepend-icon="edit"
                ></v-text-field>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.center_code"
                  :item-text="
                    item => item.center_code + ' - ' + item.center_name
                  "
                  item-value="center_code"
                  :items="getCenterList"
                  menu-props="auto"
                  label="Select Center"
                  prepend-icon="list"
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
                      data.item.center_code + " - " + data.item.center_name
                      }}
                    </v-chip>
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

                <v-text-field
                  class="mt-3 mr-2 ml-2"
                  name="code"
                  label="College Code"
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.subject_code = ''"
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
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getPaperList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.paper_code = ''"
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
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchAllMarks">Search</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white" class="mt-3">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  medium
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <p></p>
              <v-card-text class="title">All Marks View</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <!-- <v-card-actions>
            <v-btn color="blue-grey" class="white--text" @click="exportAllMarksList()">
              <v-icon left dark>arrow_downward</v-icon>Export All Marks List
            </v-btn>
          </v-card-actions>-->
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="mainheaders"
        :items="getAllMarksList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + sl_count }}</td>
          <!-- <td class="text-xs-left">{{ parse(props.item.exam_roll) }}</td> -->
          <td class="text-xs-left">{{ props.item.exam_roll }}</td>
          <td class="text-xs-left">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">{{ props.item.session_year }}</td>
          <td class="text-xs-center">{{ props.item.subject_code }} - {{ props.item.subject_name }}</td>
          <td class="text-xs-left">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
          <td class="text-xs-center">{{ props.item.examiner_mark }}</td>
          <td class="text-xs-center">{{ props.item.head_examiner_mark }}</td>
          <td class="text-xs-center">{{ props.item.incourse_mark }}</td>
          <td class="text-xs-center">{{ props.item.practical_mark }}</td>
          <td class="text-xs-center">{{ props.item.viva_mark }}</td>
        </template>
      </v-data-table>
      <composeMail :dialogStatus.sync="mailDialogStatus"></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  components: { composeMail },
  mixins: [commonGet, watchMixin],
  data() {
    return {
      mailDialogStatus: false,
      loading: false,
      search: "",
      sl_count: 0,
      searchParam: {},
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          sortable: false,
        },
        {
          text: "Registration No.",
          value: "reg_no",
          align: "center",
          sortable: false,
        },
        {
          text: "Session",
          value: "session_year",
          align: "center",
          sortable: false,
        },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          sortable: false,
        },
        { text: "Course", value: "paper_code", sortable: false },
        {
          text: "E Mark",
          value: "examiner_mark",
          align: "center",
          sortable: false,
        },
        {
          text: " H Mark",
          value: "head_examiner_mark",
          align: "center",
          sortable: false,
        },
        {
          text: "In-course Mark",
          align: "center",
          value: "incourse_mark",
          sortable: false,
        },
        {
          text: "Practical Mark",
          align: "center",
          value: "practical_mark",
          sortable: false,
        },
        {
          text: "Viva Mark",
          align: "center",
          value: "viva_mark",
          sortable: false,
        },
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
    };
  },
  watch: {
    pagination() {
      this.searchAllMarks();
    },
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
  },
  computed: {
    getAllMarksList() {
      return this.$store.getters.getAllMarksList;
    },
    getSchema() {
      return this.$store.getters.getAllMarksSchema;
    },
  },
  methods: {
    exportAllMarksList() {
      // console.log("....");
      this.$store.dispatch("exportAllMarksList", this.searchParam);
    },
    parse(item) {
      return String(item.replace(/"|\,|\./g, ""));
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchAllMarks() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAllMarksData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>

<style scoped></style>
