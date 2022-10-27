<template>
  <v-container fluid>
    <v-dialog v-model="markdetailDialog" max-width="800px" persistent>
      <markDetail :currentItem="currentItem" :dialogStatus.sync="markdetailDialog"></markDetail>
    </v-dialog>
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
                <v-text-field
                  v-model="searchParam.reg_no"
                  class="mt-3 ml-2"
                  name="rg_no"
                  label="Registration Number"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  class="ml-2 mt-3"
                  name="college_code"
                  label="College Code"
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>

                <v-autocomplete
                  disabled
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item =>  item.code + ' - ' + item.title"
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
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
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
                  v-validate="'required'"
                  :error-messages="errors.collect('year')"
                  data-vv-name="year"
                  required
                  prepend-icon="calendar_today"
                ></v-select>
                <v-autocomplete
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.paper_code"
                  :item-text="item => item.code + ' - ' + item.title"
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
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
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
                    <v-btn color="primary" large @click="searchCollegeList">Search</v-btn>
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
            <v-badge left overlap>
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <!-- <template v-slot:badge>{{ pagination.totalItems }}</template> -->
              <v-card-text class="title">In-course // Marks</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>-->
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getInCourseListItem"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.student_name }}</td>
          <td class="text-xs">{{ props.item.college_code }} - {{ props.item.college_name }}</td>
          <td class="text-xs">{{ props.item.exam_code }}</td>
          <td class="justify-center text-xs-center">
            <v-list>
              <v-list-tile v-for="item in props.item.details" :key="item.title" avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Course Code:({{item.paper_code}}) = {{item.incourse_marks}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <!-- <v-list :v-for="item in gprops.item.details">
              <v-list-tile>Math</v-list-tile>

              <v-divider inset></v-divider>
            </v-list>-->
          </td>
          <td class="justify-center text-xs-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn fab small color="primary" v-on="on">
                  <v-icon small flat @click="showMarks(props.item.details)">details</v-icon>
                </v-btn>
              </template>
              <span>Marks</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <pre>{{pagination}} </pre>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import markDetail from "@/components/in-course/in-course.vue";
export default {
  components: {
    markDetail,
  },
  mixins: [commonGet, commonExamYear],
  data() {
    return {
      markdetailDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      search: "",
      sl_count: -1,
      searchParam: {},
      currentItem: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Reg No.", value: "reg_no", sortable: false },
        { text: "Student Name", value: "student_name", sortable: false },
        { text: "College Name", value: "college_name", sortable: false },
        { text: "Exam Code", value: "exam_code", sortable: false },
        {
          text: "In-course Marks ",
          align: "center",
          value: "details",
          sortable: false,
        },
        {
          text: "Action ",
          align: "center",

          value: "details",
          sortable: false,
        },
      ],
    };
  },
  created() {
    let param = {
      limit: -1,
    };
    //all  list
    //this.$store.dispatch("fetchInCourseListData");
    //exam
    if (!this.$store.getters.getExamItem.length) {
      console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchPaperData");
    }
    //year
    if (!this.$store.getters.getYearItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchYearData",param);
    }
  },
  watch: {
    pagination() {
      this.searchCollegeList();
    },
  },
  computed: {
    //all data
    getInCourseListItem() {
      return this.$store.getters.getInCourseListItem;
    },
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
  },
  methods: {
    remove(item) {
      console.log("item ", item);
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log(index + " remove ", this.searchParam.paper_code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    showMarks(item) {
      this.currentItem = item;
      this.markdetailDialog = !this.markdetailDialog;
    },
    getIncourseMarks(details) {
      var marks = [];
      details.forEach(function (item) {
        marks.push(
          item.paper_name + "(" + item.paper_code + ") = " + item.incourse_marks
        );
      });
      //var result = marks.join("$1\n");
      return marks;
      //return marks.join("\n");
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchCollegeList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchInCourseListData", this.searchParam)
        .then((data) => {
          // console.log("data---", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    // searchCollegeList() {
    //   this.loading = true;
    //   this.setLimit();
    //   this.$store
    //     .dispatch("searchInCourseListData", this.searchParam)
    //     .then(() => {
    //       //
    //     });
    // }
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
