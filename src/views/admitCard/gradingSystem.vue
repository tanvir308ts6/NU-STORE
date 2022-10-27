<template>
  <v-container fluid>
    <v-dialog v-model="formDialogStatus" max-width="500px" persistent>
      <regCenterDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :loadData.sync="loadData"
      ></regCenterDialog>
    </v-dialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Grading System List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue" dark @click="downloadGradeSystem"
              >Export Grading System</v-btn
            >
            <v-btn color="primary" dark @click="newItem"
              >Create New Grading System</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <!-- {{getGradingSystemList}} -->

      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getGradingSystemList"
        class="elevation-1 mytableGrade"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.index + 1 }}</td>
          <td class="text-xs-center">{{ props.item.mark_from }}</td>
          <td class="text-xs-center">{{ props.item.mark_to }}</td>
          <td class="text-xs-center">
            {{ getpoint(props.item.grade_point_from) }}
          </td>
          <td class="text-xs-center">
            {{ getpoint(props.item.grade_point_to) }}
          </td>
          <td class="text-xs-center">{{ props.item.letter_grade }}</td>
          <td class="text-xs-center">{{ getpoint(props.item.grade_point) }}</td>
          <td class="text-xs-center">{{ props.item.fail_letter_grade }}</td>
          <td class="text-xs-center">
            {{ getpoint(props.item.fail_grade_point) }}
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
  </v-container>
</template>

<script>
import regCenterDialog from "@/components/admitCard/gradingSystemForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    regCenterDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      limit: {},
      searchParam: {},
      toggle_exclusive: 0,
      totalDataItems: 0,
      loading: true,
      mailDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      loadData: false,
      headers: [
        {
          text: "SL.",
          align: "center",
          value: "id",
          width: "2",
          sortable: false,
        },
        {
          text: "Mark From(>=)",
          value: "mark_from",
          align: "center",
          sortable: false,
        },
        {
          text: "Mark To(<)",
          value: "mark_to",
          align: "center",
          sortable: false,
        },
        {
          text: "Grade Point From(>=)",
          value: "grade_point_from",
          align: "center",
          sortable: false,
        },
        {
          text: "Grade Point To(<)",
          value: "grade_point_to",
          align: "center",
          sortable: false,
        },
        {
          text: "Letter Grade",
          value: "letter_grade",
          align: "center",
          sortable: false,
        },
        {
          text: "Grade Point",
          value: "grade_point",
          align: "center",
          sortable: false,
        },
        {
          text: "Fail Letter Grade",
          value: "fail_letter_grade",
          align: "center",
          sortable: false,
        },
        {
          text: "Fail Grade Point",
          value: "fail_grade_point",
          align: "center",
          sortable: false,
        },

        { text: "Actions", align: "center", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      smsList: [],
      emailList: [],
      searchParam: {},
      exam_name: "",
      exam_year: "",
      ex_code: "",
    };
  },
  created() {
    //this.$store.dispatch("callGradingSystemData");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  watch: {
    pagination() {
      this.callGradingSystemData();
    },
    getExamInitiateId() {
      this.callGradingSystemData();
    },
  },
  computed: {
    getGradingSystemList() {
      return this.$store.getters.getGradingSystemItem;
    },
  },
  mounted() {},
  methods: {
    getpoint(item) {
      let item2 = parseFloat(item);
      // console.log("item1", item2);
      return item2.toFixed(2);
    },
    downloadGradeSystem() {
      let param = this.searchParam;
      param.pdf = true;
      this.$store.dispatch("exportGradingSystem", param);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    callGradingSystemData() {
      this.loading = true;
      this.setLimit();
      console.log("CAlling .... ", this.searchParam);
      this.$store
        .dispatch("callGradingSystemData", this.searchParam)
        .then((data) => {
          console.log("Return data ", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },

    unSetEditedData() {
      this.editedItem = {
        id: "",
        mark_from: "",
        mark_to: "",
        grade_point_from: "",
        grade_point_to: "",
        letter_grade: "",
        grade_point: "",
        fail_letter_grade: "",
        fail_grade_point: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        created_by: "",
        updated_by: "",
        deleted_by: "",
      };
    },
    editItem(item) {
      this.editedIndex = this.getGradingSystemList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },

    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteGradingSystemItem", id)
              .then(function() {
                self.setLimit();
                self.callGradingSystemData();
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.callGradingSystemData();
              });
          }
        });
    },
  },
};
</script>

<style lang="scss">
.mytableGrade .theme--light.v-table tbody tr:not(:last-child) {
  // border-bottom: none;
  padding: 0%;
}

.mytableGrade table.v-table tbody td:not(:nth-child(1)) {
  padding: 0%;
}
.mytableGrade table.v-table tbody td:first-child {
  padding: 0%;
}
</style>
