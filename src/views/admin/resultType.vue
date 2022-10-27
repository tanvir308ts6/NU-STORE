<template>
  <v-container fluid>
    <v-dialog v-model="formDialogStatus" max-width="600px" persistent>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :searchResultTypeList.sync="searchResultTypeList"
        :searchParam="searchParam"
      ></formDialog>
    </v-dialog>
    <div>
      <v-container fluid>
        <!-- <v-layout> -->
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Result Type List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-card flat>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" dark @click="newItem"
                  >Create New Result Type</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-card>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="getResultTypeData"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs-center">{{ props.item.result_type_name }}</td>
            <td class="text-xs-center">{{ props.item.result_type }}</td>
            <td class="justify-center text-xs-center">
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
import formDialog from "@/components/admin/resultTypeForm.vue";
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
          text: "Result Type",
          value: "result_type",
          align: "center",
          sortable: false,
        },
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
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;

    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchResultTypeList();
    this.$store.commit("UNSET_FORMNOTIFY");
  },
  computed: {
    getResultTypeData() {
      return this.$store.getters.getResultTypeData;
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
        }
      });
      this.searchResultTypeList();
    },
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        result_type: "",
        result_type_name: "",
        created_at: "",
        updated_at: "",
        result_type_id: "",
        status: false,
      };
    },
    editItem(item) {
      this.editedIndex = this.getResultTypeData.indexOf(item);
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
              .dispatch("deleteResultTypeItem", index)
              .then(function(data) {
                self.searchResultTypeList();
                
              })
              .catch(function(error) {
                console.log(error);
                self.searchResultTypeList();
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
    searchResultTypeList() {
      this.loading = true;
      var that = this;
      this.$store.dispatch("searchResultTypeData").then((data) => {
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
