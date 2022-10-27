<template>
  <v-container fluid>
   

    <v-container fluid>
      <v-card color="white">
      	<v-layout row>
          <v-card flat>
            <v-card-text class="title">Examiner Standard Evaluation</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn color="primary" @click="downloadReport()">
            <v-icon left dark>arrow_downward</v-icon>Export Report
          </v-btn>
        </v-layout>
       
      </v-card>
      <!-- {{getExamStandardEvaList}} -->
      <!-- {{examiners}} -->
      <v-data-table
        :total-items="pagination.totalItems"
        :loading="loading"
        :headers="headers"
        :items="examiners"
        class="elevation-1"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      > 

        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.examiner_code }}-{{ props.item.examiner_name }}</td>
 
          <td class="justify-center text-xs-center">{{ props.item.details.mobile }}</td>
          <td class="justify-center text-xs-center">{{ props.item.subjects[0].subject_code }}-{{ props.item.subjects[0].subject_name }}</td>
          <td class="justify-center text-xs-center">{{ props.item.papers[0].paper_code }}-{{ props.item.papers[0].paper_name }}</td>
          <td class=""><ul class="no-bullets">
            <li>Designation:{{ props.item.details.designation_name }}</li>
            <li>College Name:{{ props.item.details.college_name }}</li>
            
          </ul></td>
     
          <td class="justify-center text-xs-center">{{ props.item.total_scan_qty }}</td>
          <td class="justify-center text-xs-center">{{ props.item.total_day_of_delay }}</td>
          <td class="justify-center text-xs-center">{{ props.item.script_received_date }}</td>
          <td class="justify-center text-xs-center">{{ props.item.script_submission_date }}</td>
          
          
          
          <td class="justify-center text-xs-center"><v-text-field
          	name="title"
          	label="Number of Error"
          	v-model="props.item.number_of_error"
          	
          	:error-messages="errors.collect('number_of_error')"
          	data-vv-name="number_of_error"
          	@input = "getNumOfErr(props.item.number_of_error)"
          	prepend-icon="edit"
          	></v-text-field></td>
          <!-- <td class="justify-center text-xs-center">
          	<v-text-field
          	name="title"
          	label="Number of Error"
          	v-model="props.item.number_of_error"
          	v-validate="'required'"
          	:error-messages="errors.collect('number_of_error')"
          	data-vv-name="number_of_error"
          	@input = "getNumOfErr(props.item.number_of_error)"
          	prepend-icon="edit"
          	></v-text-field>
          </td> -->
          <td class="justify-center text-xs-center">
            <v-text-field
          	name="title"
          	label="Statements"
          	v-model="props.item.statement_of_error"
          	
          	:error-messages="errors.collect('statement_of_error')"
          	data-vv-name="statement_of_error"
          	@input = "getStatOfErr(props.item.statement_of_error)"
          	prepend-icon="edit"
          	></v-text-field>
          </td>
           
            <td class="justify-center text-xs-center">

           <v-autocomplete
                   label="Select Standard"
                  
                  :item-text="(item) => item.examiner_standard"
                  item-value="standard_type"
                  v-model="props.item.examiner_standard"
                  :items="standards"                  
                  :error-messages="errors.collect('examiner_standard')"
                  data-vv-name="degree_code"
                  @input = "getExaminerStand(props.item.standard_type)"
                  prepend-icon="edit"
                  name="degreeCode"
                  
                >
                  <template v-slot:selection="data">
                    <v-chip
                      
                      
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.examiner_standard}}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.examiner_standard"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
             </td>
       
     
        </template>
      </v-data-table>
        <v-flex xs12 mt-4>
          <v-layout align-center justify-center row fill-height>
            <v-btn large round color="primary" @click="submit()">
              Submit
              <v-icon right dark>send</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
    </v-container>
  </v-container>
</template>

<script>
// import formDialog from "@/components/examiner/examinerEvaluationForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  components: {
    
  },
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      loading: false,
      search: "",
      sl_count: 1,
      searchParam: {},
      downparam: {
      	
      },
      examiners:[],
      examiner_code : "",
      exam_initiate_id: "",
      number_of_error:{},
      statement_of_error:{},
      examiner_standard:{},
      // standards: ["Best","Satisfactory","Below Standard"],
      standards:[
        {
          "standard_type" : "A",
          "examiner_standard" : "Best"
        },
        {
          "standard_type" : "B",
          "examiner_standard" : "Satisfactory"
        },
        {
          "standard_type" : "C",
          "examiner_standard" : "Below Standard"
        }
      ],
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      dialog: false,
      formDialogStatus: false,
      headers: [
        { text: "SL.", align: "left", value: "id" },
        { text: "Examiner", value: "examiner_name" },
        
        { text: "Mobile", value: "mobile" },
         { text: "Subject",  value: "subject_name" },
         { text: "Course",  value: "paper_name" },
         { text: "Details", value: "details", align: "center" },
        { text: "Total Scan Quantity", align: "center", value: "total_scan_qty" },
        { text: "Total Day of Delay",  value: "total_day_of_delay" },
        { text: "Script Received Date", value: "script_received_date" },
        { text: "Script Submission Date", value: "script_submission_date" },
        
        { text: "Number of Error", value: "number_of_error" },
        
        { text: "Statement of Error",  value: "statement_of_error" },
        
        { text: "Examiner Standard",  value: "examiner_standard" },
        
        // { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {
  	 if (this.ifHeadExaminerUser) {
  	 	console.log("true return")
      this.searchParam.examiner_code = this.getAuthUser.examiner.examiner_code;
      this.examiner_type = this.getAuthUser.examiner.examiner_type;
      // if (this.examiner_type == "E") {
      //   this.searchParam.nested = false;
      // }
    }
    //this.$store.dispatch("fetchExamCreateData");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.exam_initiate_id = this.getExamInitiateId;

    this.downparam.exam_initiate_id = this.getExamInitiateId;
    this.downparam.exam_code = this.getLoggedInExam.code;
    this.downparam.year = this.getLoggedInYear.year;
    
   if (this.ifHeadExaminerUser) {
  	 	console.log("true return")
      this.downparam.examiner_code = this.getAuthUser.examiner.examiner_code;
      //this.examiner_type = this.getAuthUser.examiner.examiner_type;
      // if (this.examiner_type == "E") {
      //   this.searchParam.nested = false;
      // }
    }
   

  },

  mounted() {
    this.$store.commit("UNSET_FORMNOTIFY");
    //this.getExamninationStandurdData();
  },

  computed: {
    getExamStandardEvaList() {
      return this.$store.getters.getExamStandardEvaList;
    }
  },
  watch: {
    pagination() {
      this.getExamninationStandurdData();
    }
  },
  methods: {
      removeDesignation(item) {
        console.log("item----->>>>",item)
        item = "";  
        console.log("ssssss",item)    
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
     downloadReport() {
      let item = this.downparam;
      
      // item.examiner_code = this.examiner_code.toString();
      this.$store.dispatch("exportExaminerEvaluationReport", item);
    },

    getExamninationStandurdData() {
      var self = this;
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchExaminerStandardEvaluationData", this.searchParam)
        .then(data => {
          console.log("---->show",data.data[0].examiners);
          self.examiners = data.data[0].examiners;
          
          this.loading = false;
          // this.sl_count = data.meta.from;
          // this.pagination.totalItems = data.meta.total;
        });
    },
      submit() {
      	
           let self = this;

      	   let data = [];
     	  
      	   // data.exam_initiate_id = self.exam_initiate_id;
      	   
           this.getExamStandardEvaList.forEach((obj) => {
           	    obj.statement_of_error = self.statement_of_error;
                obj.number_of_error = self.number_of_error;
                obj.examiner_standard = self.examiner_standard;
                obj.exam_initiate_id = self.exam_initiate_id.toString();
      	   data.push(obj);
           
      });
      var post = {
      	searchParam : self.searchParam,
      	data : data[0]
      };
      this.$store.dispatch("saveExaminerStandardData", post);
  
    },
 
  

    unSetEditedData() {
      this.editedItem = {
      examiners: [
		{
			tims_id: "",
			examiner_code: "",
			examiner_name: "",
			examiner_username: "",
			examiner_email: "",
			examiner_type: "",
			exam_initiate_id: "",
			exam_code: "",
			year: "",
			total_script_qty: "",
			total_scan_qty: "",
			script_received_date: "",
			script_submission_date: "",
			number_of_error: "",
			statement_of_error: "",
			examiner_standard: "",
			total_day_of_delay: "",
			examiner_standard: "",
			access: "",
			subjects: [
			{
				subject_code: "",
				subject_name: ""
			}
			],
			papers: [
			{
				paper_code: "",
				paper_name: ""
			}
			],
			details: "",
		}
		],
	};
},
    dialogOpen() {
      this.formDialogStatus = true;
    },
    // newItem() {
    //   this.unSetEditedData();
    //   this.dialogOpen();
    // },
    editItem(item) {
      this.editedIndex = this.getExamStandardEvaList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    getStatOfErr(item){
    	console.log("item",item);
    	this.statement_of_error = item;
    	console.log("statement_of_error",this.statement_of_error);
    },
    getExaminerStand(item){
    	this.examiner_standard = item;
    },
    getNumOfErr(item){
    	this.number_of_error = item;
    }
    
  }
};
</script>

<style scoped>
.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
