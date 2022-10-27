<template>
  <v-container fluid>
    <v-card>
      <v-layout row wrap>
        <v-flex>
          <v-container>
            <div class="title mb-4">Subject-wise Pass-Fail Rate</div>
            <v-flex xs12 sm12 md12>
              <v-autocomplete
                class="ma-2"
                v-model="searchParam.subject_code"
                :items="getSubjectList"
                :item-text="item => item.code + ' - ' + item.title"
                item-value="code"
                label="Select Subject"
                persistent-hint
                prepend-inner-icon="edit"
                multiple
                outline
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="removeSubject(data.item)"
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
                <v-btn color="primary" round large @click="fetchPassFailDataBySubject">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>
    <v-dialog v-model="resultDialogStatus" fullscreen>
      <v-toolbar dark color="cyan darken-2" class="mt-4">
        <v-toolbar-title>Pass Fail Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="cyan darken-2" class="mr-5">
            <v-layout row fill-height align-center justify-center>
              Current Subject &nbsp; :&nbsp;
              {{ currentSubject.subject_code }} - {{
              currentSubject.subject_name
              }}
            </v-layout>
          </v-card>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <passFailByPaper :dialogStatus.sync="resultDialogStatus" :currentSubject="currentSubject"></passFailByPaper>
      </v-card>
    </v-dialog>

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

              <v-card-text class="title">Pass-Fail Percentage By Subject</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getSubwisePassFailData"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{  props.index + sl_count }}</td>
          <td class="text-xs-left">
            <v-btn
              color="cyan lighten-2"
              @click="viewPassFailSubDetails(props.item)"
            >{{ props.item.subject_code }} - {{ props.item.subject_name }}</v-btn>
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
import passFailByPaper from "@/components/result/paperWisePassFail.vue";
export default {
  props: ["dialogStatus", "currentCollege"],
  mixins: [commonGet, commonExamYear],
  components: {
    passFailByPaper,
  },
  data() {
    return {
      resultDialogStatus: false,
      currentItem: {},
      currentSubject: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
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
          text: "Subject ",
          value: "subject_code",
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
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    //this.$store.dispatch("fetchPassFailDataBySubject", this.searchParam);
  },
  computed: {
    getSubwisePassFailData() {
      return this.$store.getters.getSubwisePassFailData;
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
    removeSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "removesubject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },

    fetchPassFailDataBySubject() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchSubwisePassFailData", this.searchParam)
        .then((data) => {
          console.log("PassFailDataBySubject", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },

    viewPassFailSubDetails(item) {
      this.currentSubject = item;
      this.currentSubject.center_code = this.currentCollege.center_code;
      this.resultDialogStatus = true;
    },
    close() {
      this.resultDialogStatus = false;
      //   this.$store.commit('UNSET_ADMIT_CARD_LIST_DATA')
      this.$store.commit("UNSET_LOADING");
    },
  },
  watch: {
    pagination() {
      this.fetchPassFailDataBySubject();
    },
    currentCollege(val) {
      console.log("sppsps");
      // this.searchParam.center_code = val.center_code;
      this.searchParam.college_code = val.college_code;
      this.fetchPassFailDataBySubject();
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
