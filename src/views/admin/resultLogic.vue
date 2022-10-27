<template>
  <v-container fluid>
    <v-dialog v-model="formDialogStatus" max-width="700px" persistent>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :searchResultLogicList.sync="searchResultLogicList"
        :searchParam="searchParam"
      ></formDialog>
    </v-dialog>
    <div>
      <v-container fluid>
        <!-- <v-layout> -->
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Result Logic List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-card flat>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue" dark @click="downloadResultLogic"
                  >Export Result Logic</v-btn
                >
                <v-btn color="primary" dark @click="newItem"
                  >Create New Logic</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-card>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="getResultLogicData"
          class="elevation-1"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs-center">{{ props.item.result_type_name }}</td>
            <td class="text-xs-center">
              {{ getAllPassStatus(props.item.all_passed) }}
            </td>
            <td class="text-xs-center">{{ props.item.passed_count }}</td>
            <td class="text-xs-center">{{ props.item.failed_count }}</td>
            <td class="text-xs-center">{{ props.item.absent_count }}</td>
            <td class="text-xs-center">
              {{ getreportedStatus(props.item.is_reported) }}
            </td>
            <td class="text-xs-center">
              {{ getwithheldStatus(props.item.is_withheld) }}
            </td>
            <td class="text-xs-center">
              {{ getincourseWithheldStatus(props.item.is_incourse_withheld) }}
            </td>
            <td class="text-xs-center">
              {{ getcancelStatus(props.item.is_cancelled) }}
            </td>
            <td class="justify-center text-xs-center" nowrap="true">
              <v-item-group>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="primary" v-on="on">
                      <v-icon
                        @click="editItem(props.item)"
                        class="mr-0"
                        color="white"
                        >edit</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                <v-tooltip right color="red">
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="red" v-on="on">
                      <v-icon @click="deleteItem(props.item)" color="white"
                        >delete</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-item-group>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/admin/resultLogicForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      dialog: false,
      formDialogStatus: false,
      currentItem: {},
      search: "",
      sl_count: -1,
      smsList: [],
      emailList: [],
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Result Type Name",
          value: "result_type_name",
          sortable: false,
          align: "center",
        },
        {
          text: "Pass Status",
          value: "all_passed",
          sortable: false,
          align: "center",
        },
        {
          text: "Theory Passed Count",
          value: "passed_count",
          sortable: false,
          align: "center",
        },
        {
          text: "Failed Count",
          value: "failed_count",
          sortable: false,
          align: "center",
        },
        {
          text: "Absent Count",
          value: "absent_count",
          sortable: false,
          align: "center",
        },
        {
          text: "Is Reported",
          value: "is_reported",
          sortable: false,
          align: "center",
        },
        {
          text: "Is Withheld",
          value: "is_withheld",
          sortable: false,
          align: "center",
        },
        {
          text: "Is Incourse Withheld",
          value: "is_incourse_withheld",
          sortable: false,
          align: "center",
        },
        {
          text: "Is Cancelled",
          value: "is_cancelled",
          align: "center",
          sortable: false,
        },
        // { text: "Active", sortable: false, value: "active" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      exam_name: "",
      exam_year: "",
      ex_code: "",
    };
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;

    this.$store.commit("UNSET_FORMNOTIFY");
  },
  computed: {
    getResultLogicData() {
      return this.$store.getters.getResultLogicData;
    },
  },
  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.$store.getters.getAuthUserExamInitiates.forEach((obj) => {
        if (obj.id == val) {
          this.exam_name = obj.exam_name;
          this.ex_code = obj.exam_code;
          this.exam_year = obj.year;
          this.searchParam.exam_year = obj.year;
        }
      });
      this.searchResultLogicList();
    },
    pagination() {
      this.searchResultLogicList();
    },
  },
  methods: {
    downloadResultLogic() {
      let param = this.searchParam;
      param.pdf = true;
      this.$store.dispatch("exportResultLogic", param);
    },
    getAllPassStatus(val) {
      if (val == 1) {
        return "All";
      } else {
        return "Not All";
      }
    },
    getreportedStatus(val) {
      if (val == 1) {
        return "Yes";
      } else {
        return "";
      }
    },
    getwithheldStatus(val) {
      if (val == 1) {
        return "Yes";
      } else {
        return "";
      }
    },
    getincourseWithheldStatus(val) {
      if (val == 1) {
        return "Yes";
      } else {
        return "";
      }
    },
    getcancelStatus(val) {
      if (val == 1) {
        return "Yes";
      } else {
        return "";
      }
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_code: "",
        exam_year: "",
        exam_initiate_id: "",
        result_type_name: "",
        result_type: "",
        all_passed: "",
        passed_count: null,
        failed_count: "",
        absent_count: "",
        is_withheld: null,
        is_reported: null,
        is_cancelled: null,
        is_incourse_withheld: null,
      };
    },
    editItem(item) {
      this.editedIndex = this.getResultLogicData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const index = item.id;
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteResultLogicItem", index)
              .then(function(data) {
                self.searchResultLogicList();
              })
              .catch(function(error) {
                console.log(error);
                self.searchResultLogicList();
              });
          }
        });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchResultLogicList() {
      this.loading = true;
      this.setLimit();
      var that = this;
      this.$store
        .dispatch("searchResultLogicData", this.searchParam)
        .then((data) => {
          that.loading = false;
          that.sl_count = 1;
          //that.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
