<template>
  <v-container fluid>
    <div>
      <formDialog :dialogStatus.sync="formDialogStatus"></formDialog>
      <editFormDialog
        :dialogStatus.sync="editFormDialogStatus"
        :editedData="editedItem"
      ></editFormDialog>
      <memberList
        :dialogStatus.sync="detailDialogStatus"
        :examCommittee="examCommitteeDetail"
      ></memberList>

      <v-container fluid>
        <v-layout row>
          <v-expansion-panel focusable>
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
                        name="status"
                        class="ma-2"
                        v-model="searchParam.committee_name"
                        menu-props="auto"
                        label="Exam Committee"
                        prepend-icon="edit"
                      ></v-text-field>

                      <v-select
                        name="subject_code"
                        class="ma-2"
                        v-model="searchParam.subject_code"
                        item-text="subject_name"
                        item-value="subject_code"
                        :items="getSubjectData"
                        menu-props="auto"
                        label="Select Subject"
                        prepend-icon="edit"
                        clearable
                      ></v-select>

                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="searchCommittee">
                            Search
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>

        <v-divider class="mt-3 mb-3"></v-divider>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Exam Committee List</v-card-text>
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
            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Exam Committee
            </v-btn>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
          style="white-space: nowrap"
        >
          <template v-slot:items="props">
            <td>{{ props.item.committee_name }}</td>
            <td>
              {{
                props.item.exam_master
                  ? props.item.exam_master.exam_display_name
                  : ""
              }}
            </td>
            <td>
              {{
                props.item.subjects
                  ? `${props.item.subject_code}-` +
                    " " +
                    props.item.subjects.subject_name
                  : ""
              }}
            </td>
            <td>
              <v-btn color="white" @click="showMembers(props.item)" class="mr-0"
                >Members</v-btn
              >
            </td>
            <td class="justify-center layout px-0">
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="editItem(props.item)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>

              <v-btn
                fab
                dark
                small
                color="teal"
                @click="exportExmCm(props.item)"
              >
                <v-icon dark>cloud_download</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/exmCommittee/addCommitte.vue";
import editFormDialog from "@/components/exmCommittee/editCommitte.vue";
import memberList from "@/components/exmCommittee/memberList.vue";
import commonGet from "../../mixin/common_getters_mixin";
import moment from "moment";

export default {
  mixins: [commonGet],

  components: {
    formDialog,
    editFormDialog,
    memberList
  },

  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    search: "",
    formDialogStatus: false,
    editFormDialogStatus: false,
    examCommitteeDetail: "",
    detailDialogStatus: "",

    headers: [
      { text: "Exam Committee", align: "left", value: "committee_name" },
      { text: "Exam Name", align: "left", value: "exam_code" },
      { text: "Subject Code & Name", align: "left", value: "subject_code" },
      { text: "Members", align: "left", value: "id" },
      { text: "Actions", align: "left", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {
      id: "",
      committee_name: "",
      subject_code: "",
      member_designation: "",
      selected: []
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getExmCommitteeList;
    },
    getSubjectData() {
      return this.$store.getters.getAllSubject;
    }
  },

  methods: {
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getExmCommitteeListFromApi() {
      this.setLimit();
      this.loading = true;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.$store
        .dispatch("fetchExmCommitteeList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    searchCommittee() {
      this.loading = true;
      this.setLimit();
      let self = this;
      let item = this.searchParam;
      this.$store.dispatch("fetchExmCommitteeList", item).then(data => {
        self.loading = false;
        self.pagination.totalItems = data.total;
        Object.keys(this.searchParam).forEach(function(key, index) {
          item[key] = "";
        });
      });
    },

    newItem() {
      this.formDialogStatus = true;
    },

    showMembers(item) {
      this.examCommitteeDetail = item;
      this.detailDialogStatus = true;
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.member_designation =
        item.committee_member.member_designation;
      this.editedItem.selected = item.committee_member;
      this.editFormDialogStatus = true;
    },
    exportExmCm(item) {
      const committee = { committee_id: item.id };
      this.$store.dispatch("exportExamCommitteeDetail", committee);
    }
  },

  watch: {
    pagination() {
      this.getExmCommitteeListFromApi();
    },
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
    },
    getLoggedInYear(val) {
      this.searchParam.exam_year = val.year;
    }
  },

  created() {
    this.$store.dispatch("fetchAllSubjectData");
    //this.$store.dispatch("fetchAllDegreeBySubjects", {'degree_group_code':this.});
  }
};
</script>

<style scoped></style>
