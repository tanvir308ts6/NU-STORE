<template>
  <v-container fluid>
    <v-card>
      <v-layout row wrap>
        <v-flex>
          <v-container>
            <div class="title mb-4">Course-wise Pass-Fail Rate</div>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                class="ma-2"
                v-model="searchParam.paper_code"
                :items="getPaperList"
                :item-text="item => item.code + ' - ' + item.title"
                item-value="code"
                label="Select Course"
                persistent-hint
                prepend-icon="library_books"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="removePaper(data.item)"
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
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-layout justify-center row fill-height align-center>
                <v-btn color="primary" round large @click="fetchPassFailDataByPaper">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>
    <v-container fluid>
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
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Pass-Fail Percentage By Course</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getPapwisePassFailData"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs-left">
            <v-chip
              label
              color="cyan lighten-3"
              @click="viewPassFailSubDetails(props.item)"
            >{{ props.item.paper_code }} - {{ props.item.paper_name }}</v-chip>
          </td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-center">{{ props.item.total_pass_percentage }}%</td>
          <td class="text-xs-center">{{ props.item.total_fail_percentage }}%</td>
          <td class="text-xs-center">{{ props.item.total_others_percentage }}%</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  props: ["dialogStatus", "currentSubject"],
  mixins: [commonGet, commonExamYear],
  data() {
    return {
      admitCardDialogStatus: false,
      currentItem: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [ 10, 25, { text: "All", value: -1 }],
      },


      search: "",
      sl_count: 1,
      loading: false,
      searchParam: {},
      expand: false,
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "1%",
          sortable: false,
        },
        {
          text: "Course ",
          value: "paper_code",
          align: "left",
          width: "30%",
          sortable: false,
        },
        {
          text: "Total Examinee",
          align: "center",
          width: "10%",
          value: "total_student",
          sortable: false,
        },
        {
          text: "Passed",
          align: "center",
          width: "10%",
          value: "total_passed",
          sortable: false,
        },
        {
          text: "Failed",
          align: "center",
          width: "10%",
          value: "total_failed",
          sortable: false,
        },
        {
          text: "Others",
          align: "center",
          width: "10%",
          value: "total_failed",
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //this.$store.dispatch("fetchAdmitCardDataBySubject", this.searchParam);
  },
  computed: {
    getPapwisePassFailData() {
      return this.$store.getters.getPapwisePassFailData;
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    fetchPassFailDataByPaper() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchPapwisePassFailData", this.searchParam)
        .then((data) => {
          console.log(" fetchPassFailDataByPaper", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_LOADING");
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);

      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
  },
  watch: {
    pagination() {
      this.fetchPassFailDataByPaper();
    },
    currentSubject(val) {
      this.searchParam.subject_code = val.subject_code;
      this.searchParam.college_code = val.college_code;
      this.fetchPassFailDataByPaper();
    },
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
