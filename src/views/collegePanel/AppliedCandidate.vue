<template>
  <v-container fluid>
    <!-- {{sl_count}} -->
    <!-- <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      ref="refDialogForm"
      :loadData.sync="loadData"
    ></formDialog>-->

    <v-container fluid>
      <v-expansion-panel v-model="panel" expand>
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
                  <v-flex md6>
                    <v-autocomplete
                      v-model="getProbableSchema.exam_initiate_id"
                      :items="getExamMasterList"
                      item-text="exam_display_name"
                      item-value="id"
                      label="Select Exam"
                      data-vv-name="exam_name"
                      :error-messages="errors.collect('id')"
                      required
                      prepend-icon="subject"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex md3>
                    <v-autocomplete
                      v-model="getProbableSchema.degree_group_code"
                      :items="getCollegeDegreeWiseDegreeGroup"
                      item-text="degree_group_display_name"
                      item-value="degree_group_code"
                      label="Select Degree Group"
                      data-vv-name="degree_group_code"
                      :error-messages="errors.collect('degree_group_code')"
                      required
                      prepend-icon="subject"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex md3 v-if="getProbableSchema.degree_code != 1">
                    <v-autocomplete
                      v-model="getProbableSchema.subject_code"
                      :items="getCollegeDegreeGroupWiseSubject"
                      :item-text="
                        item => `${item.subject_code}-${item.subject_name}`
                      "
                      item-value="subject_code"
                      label="Select Subject"
                      data-vv-name="subject_code"
                      :error-messages="errors.collect('subject_code')"
                      required
                      prepend-icon="subject"
                    ></v-autocomplete>
                  </v-flex>
                  <!-- <v-flex md3>
                    <v-autocomplete
                      v-model="getProbableSchema.degree_group_code"
                      :items="getExamMasterList"
                      item-text="exam_name"
                      item-value="id"
                      label="Select Exam"
                      data-vv-name="exam_name"
                      :error-messages="errors.collect('id')"
                      required
                      prepend-icon="edit"
                    ></v-autocomplete>
                  </v-flex>-->

                  <!-- <v-autocomplete
                  box
                  label="Select Exam"
                  :item-text="item =>item.id + ' - ' + item.exam_name"
                  item-value="id"
                  v-model="searchParam.exam_initiate_id"
                  :items="getExamMasterList"
                  class="mx-5 my-2"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      color="#EBEBEB"
                    >
                      <div class="title">{{ data.item.exam_name }}</div>
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.exam_name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                  </v-autocomplete>-->
                  <v-flex xs12 sm12 md12 style="margin-top:40px;">
                    <v-layout justify-center row fill-height align-center>
                      <v-btn color="primary" large @click="searchList()"
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
    </v-container>
    <v-container fluid class="mt-2" v-if="getProbableList.length > 0">
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
                  style="margin-top: -1.3em;"
                  class="elevation-0"
                  v-if="pagination.totalItems > 0"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Applied Candidate List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            label="Search"
            class="mt-1"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>
          <v-spacer />
          <v-btn
            @click="searchList()"
            class="ml-3"
            fab
            small
            flat
            dark
            color="primary"
          >
            <v-icon dark large>search</v-icon>
          </v-btn>
          <v-btn @click="downloadPdf" color="primary" dark>
            Export As PDF
            <v-icon right dark>cloud_download</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getProbableList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        item-key="std_id"
      >
        <template v-slot:items="props">
          <tr>
            <td>{{ sl_count + props.index }}</td>
            <!-- <td class="text-xs">{{ props.item.user_type }}</td> -->
            <td class="text-xs">{{ props.item.student.reg_no }}</td>
            <td class="text-xs">{{ props.item.student.ac_session }}</td>
            <td class="text-xs">{{ props.item.student.name }}</td>
            <td class="text-xs">{{ props.item.student.father_name }}</td>
            <td class="text-xs">
              {{ getPapers(props.item.papers) }}
            </td>
            <td class="text-xs">{{ props.item.student.mobile }}</td>
            <td class="text-xs">
              <v-chip
                v-if="
                  Number(props.item.student_confirm_status) == 1 &&
                    Number(props.item.teacher_confirm_status) == 1
                "
                small
                color="success"
                text-color="white"
                >Confirmed</v-chip
              >
              <v-chip
                v-else-if="Number(props.item.student_confirm_status) == 1"
                small
                color="info"
                text-color="white"
                >Applied</v-chip
              >
              <v-chip v-else small color="red" text-color="white"
                >Not Apply</v-chip
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
    <!-- <pre>{{getProbableList}}</pre> -->
  </v-container>
</template>

<script>
import commonGet from "@/mixin/college_common_getters_mixin";

export default {
  mixins: [commonGet],
  components: {},
  computed: {
    getProbableSchema() {
      return this.$store.getters.getProbableSchema;
    },
    getProbableList() {
      return this.$store.getters.getCollegeProbableList;
    },
    getCollegeDegreeWiseDegreeGroup() {
      return this.$store.getters.getCollegeDegreeWiseDegreeGroup;
    },
    getCollegeDegreeGroupWiseSubject() {
      return this.$store.getters.getCollegeDegreeGroupWiseSubject;
    }
  },
  created() {
    this.$store.commit("UNSET_PROBABLE_LIST");
    this.$store.commit("UNSET_PROBABLE_LIST_SCHEMA");
    this.$store.dispatch("getCollegeExamMasterList");
  },

  data() {
    return {
      panel: [true],
      searchParam: {},
      sl_count: -1,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      loading: false,
      totalDataItems: 0,
      loading: true,
      loadData: false,
      limit: {},
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Reg. No", value: "student.reg_no" },
        { text: "Session", value: "student.ac_session" },
        { text: "Name", value: "student.name" },
        { text: "Father Name", value: "student.father_name" },
        { text: "Paper Code", value: "papers.paper_code" },
        { text: "Mobile", value: "student.mobile" },
        { text: "Status", value: "teacher_confirm_status" }
      ]
    };
  },

  watch: {
    pagination() {
      this.searchList();
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    },
    "getProbableSchema.exam_initiate_id": function(val, oldval) {
      this.getProbableSchema.degree_code = null;
      if (val) {
        this.getDegreeCode();
      }
    },
    "getProbableSchema.degree_code": function(val, oldval) {
      this.getProbableSchema.degree_group_code = null;
      if (val) {
        this.$store.dispatch("getCollegeDegreeWiseDegreeGroup");
      }
    },
    "getProbableSchema.degree_group_code": function(val, oldval) {
      this.getProbableSchema.subject_code = null;
      if (val) {
        this.$store.dispatch("getCollegeDegreeGroupWiseSubject");
      }
    }
  },

  methods: {
    downloadPdf() {
      this.$store.dispatch("collegeProbableListDownloadPdf", {
        params: this.getProbableSchema,
        responseType: "blob"
      });
    },
    getPapers(papers){
      let paperCode = [];
      papers.forEach((element, index) => {
        if (element.confirm_paper) {
          paperCode.push(element.paper_code);
        }
      });
      return paperCode.join();
    },
    getDegreeCode() {
      this.getExamMasterList.forEach(element => {
        if (element.id == this.getProbableSchema.exam_initiate_id) {
          this.getProbableSchema.degree_code = element.core_exam.degree_code;
          // console.log(element);
          return element;
        }
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.getProbableSchema.page = page;
      this.getProbableSchema.limit = rowsPerPage;
      this.getProbableSchema.search = this.search;
      this.getProbableSchema.sort = sortBy;
      this.getProbableSchema.student_confirm_status = 1;
    },
    searchList() {
      // console.log("SEACH USER ......................");
      try {
        this.loading = true;
        this.setLimit();
        this.$store.dispatch("getCollegeProbableList").then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
      } catch (ex) {}
    }
  },
  mounted() {}
};
</script>

<style scope>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}
table.v-table tbody td,
table.v-table tbody th {
  white-space: nowrap;
}
</style>
