<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
      :searchScrutineerList.sync="searchScrutineerList"
    ></formDialog>
    <!-- {{downparam}} -->
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Scrutinizer List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"

          ></v-text-field>-->
          <!--  <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <div  v-if="!ifAdminUserType">
            <v-btn color="primary" class="white--text" @click="downloadHeadSrutiReport()">
              <v-icon left dark>arrow_downward</v-icon>Download scrutinizer  List
            </v-btn>
          </div>
          <v-divider class="my-2" vertical></v-divider>
            <v-btn @click="newItem" color="primary" dark>Add scrutinizer </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getScrutinerList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="justify-center text-xs-center">{{ props.item.h_ex_tmis_id }}</td>
          <td class="justify-center text-xs-center">{{ props.item.tmis_id }}</td>
          <td class="justify-center text-xs-center">{{ props.item.name }}</td>
          <td class="justify-center text-xs-center">{{ props.item.college_code }}-{{ props.item.college_name }}</td>
          <td class="justify-center text-xs-center">{{ props.item.subject_code }}-{{ props.item.subject_name }}</td>
          <td class="justify-center text-xs-center">{{ props.item.designation }}</td>
          <td class="justify-center text-xs-center">{{ props.item.total_scrutinize_script }}</td>
          <td class="justify-center text-xs-center">{{ props.item.account_no }}</td>
          <td class="justify-center text-xs-center">{{ props.item.bank_name }}</td>
          <td class="justify-center text-xs-center">{{ props.item.branch_name }}</td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{on}">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon @click="editItem(props.item)" class="mr-0" color="white">edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip right color="red">
                <template v-slot:activator="{on}">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white">delete</v-icon>
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
import formDialog from "@/components/scrutineer/scrutineerForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";

export default {
  components: {
    formDialog,
  },
  mixins: [commonGet, commonExamYear,common_login_getters],
  data() {
    return {
      forceRerenderFlag: true,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      sl_count: 1,
      downparam : {},
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Head Examiner TMIS ID", value: "h_ex_tmis_id" },
        { text: "TMIS ID", value: "tmis_id" },
        { text: "Name", value: "name" },
        { text: "College", value: "college_code" },
        { text: "Subject", value: "subject_name" },
        { text: "Designation", value: "designation" },
        { text: "Total Scrutinize Script", value: "total_scrutinize_script" },
        { text: "Account No", value: "acc" },
        { text: "Bank Name", value: "bank" },
        { text: "Branch Name", value: "branch" },        
       
        
        { text: "Action", align: "center", value: "id", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
  	 this.downparam.exam_code = this.getLoggedInExam.code;
    this.downparam.exam_year = this.getLoggedInYear.year;
    this.downparam.exam_initiate_id = this.getExamInitiateId;
      if (this.ifHeadExaminerUser) {
      this.downparam.h_examiner_code = this.getAuthUser.examiner.examiner_code;
      this.searchParam.h_examiner_code = this.getAuthUser.examiner.examiner_code;
      
    }
  	
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    //this.$store.dispatch("fetchPaperData");
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    //paper
    if (!this.$store.getters.getPaperByResItems.length) {
      this.$store.dispatch("fetchPaperByRescrutinerData", this.searchParam);
    }

   
  },
  mounted() {
    //this.getDataFromApi();
  },
  watch: {
    pagination() {
      this.searchScrutineerList();
    },
  },
  computed: {
    getScrutinerList() {
      return this.$store.getters.getScrutinerDataList;
    },
  },
  methods: {

  	downloadHeadSrutiReport() {
  		this.$store.dispatch("exportHeadExaminerScrutinizewise", this.downparam);
  	},

    unSetEditedData() {
      this.editedItem = {
      	exam_code: "",
      	exam_year: "",
      	name: "",
      	designation_id: "",
      	subject_code: "",
      	subject_name: "",
      	college_code: "",
      	dist_code: "",
      	h_ex_tmis_id: "",
      	h_examiner_code: "",
      	bank_name: "",
      	branch_name: "",
      	account_no: "",
      	tmis_id: "",        
      };
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchScrutineerList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchScrutineer", this.searchParam)
        .then((data) => {
          console.log("data---", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },

    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getScrutinerList.indexOf(item);
      this.editedItem = Object.assign({}, item);
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
              .dispatch("deleteScrutinerItem", id)
              .then(function (data) {
                self.setLimit();
                self.$store.dispatch("searchScrutineer", self.searchParam);
              })
              .catch(function (error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("searchScrutineer", self.searchParam);
              });
          }
        });
    },
  },
};
</script>

<style scoped></style>
