<template>
  <v-container fluid>


    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Invigilator List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />

       
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getInvigilatorList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.name }}</td>
          <td class="text-xs">{{ props.item.mobile }}</td>
          <td class="text-xs">{{ props.item.email }}</td>
          <td class="text-xs">{{ props.item.nid_no }}</td>
          <td class="text-xs">{{ props.item.teacher_code }}</td>
        
          
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
      <deleteConfirm
        :ddialogStatus.sync="deleteDialogStatus"
        :deleteAction.sync="deleteActionStatus"
      ></deleteConfirm>
      <composeMail
        :dialogStatus.sync="mailDialogStatus"
        :toMail.sync="emailList"
        :toSms.sync="smsList"
      ></composeMail>
    </v-container>
    <!-- <pre> {{searchParam}} </pre>pagination:
    <pre> {{pagination}} </pre>-->
  </v-container>
</template>

<script>


import commonFunction from "@/mixin/common_function";
import common_login_getters from "@/mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  mixins: [commonFunction, common_login_getters, commonGet, commonExamYear],
  components: {
    
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      deleteAction: false,
      mailDialogStatus: false,
      // deleteDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      loading: false,
      sl_count: 1,
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          sortable: false,
        },
        { text: "Invigilator Name", value: "name", sortable: false },
        { text: "Mobile", value: "mobile", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "NID No", value: "nid_no", sortable: false },
        { text: "Teacher Code", value: "teacher_code", sortable: false },
        
       
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      index: -1,
      centercode: "",
      smsList: [],
      emailList: [],
    };
  },
  watch: {
    deleteActionStatus: {
      handler: function (val) {
        console.log(" watch value ", val);
        this.deleteData();
      },
      deep: true,
    },
    pagination() {
      this.checkUserType();
      this.searchInvigilatorList();
    },
    cload(val) {
      console.log("lets see mitu", val);
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      console.log("lets see mitu", this.getAuthUser.center.center_code);
    },
  },
  created() {
        if (this.ifCenterUser) {
      	this.searchParam.center_code = this.getAuthUser.center.center_code;
      }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.college_code = "";
    this.$store.commit("UNSET_FORMNOTIFY");
    if (!this.$store.getters.getCenterItems.length) {
      console.log("sssss");
      //this.$store.dispatch('fetchCenterData');
    }
    setTimeout(() => {
      this.checkUserType();
    }, 800);
  },
  computed: {
    getInvigilatorList() {
      return this.$store.getters.getInvigilatorItem;
    },
   
  },
  methods: {
    checkUserType() {
      if (this.ifCenterUser) {
        console.log("Entered cneter CHECK", this.searchParam);
        //this.searchParam.center_code = [this.getAuthUser.center.center_code]; //or
        this.searchParam.center_code = this.getAuthUser.center.center_code;
        this.searchParam.college_code = this.$store.getters.getAuthUser.center.college_code;
      }
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;

      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.details = true;
    },
    searchInvigilatorList() {
      this.loading = true;
      this.setLimit();
      console.log("CAlling .... ", this.searchParam);
      this.$store
        .dispatch("searchInvigilatorCenterwiseCountData", this.searchParam)
        .then((data) => {
          console.log("Return data ", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },

   



   
    
  
  },
};
</script>
