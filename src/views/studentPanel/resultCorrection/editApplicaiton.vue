<template>
  <v-container fluid fill-weight>
    <template>
      <v-layout justify-center>
        <v-flex xs12 md12>
          <v-toolbar color="primary" dark>
            <v-toolbar-title
              >Edit Result Correction Applicaiton</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card>
            <v-layout class="justify-left" row wrap>
              <v-flex md8>
                <form @submit.prevent="OnSubmit" style="padding-left: 20px;">
                  <v-layout class="justify-left" row wrap>
                    <v-flex md8>
                      <v-select
                        name="exam_code"
                        label="Select Exam"
                        v-model="getSchema.exam_code"
                        :items="getExamList"
                        item-text="exam_name"
                        item-value="exam_code"
                        v-validate="'required'"
                        :error-messages="errors.collect('exam_code')"
                        data-vv-name="exam_code"
                        required
                        prepend-icon="subject"
                        @change="getPaperCode"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        name="exam_year"
                        label="Exam Year"
                        v-model="getSchema.exam_year"
                        :items="getExamYear"
                        item-text="exam_year"
                        item-value="exam_year"
                        v-validate="'required'"
                        :error-messages="errors.collect('exam_year')"
                        data-vv-name="exam_year"
                        prepend-icon="subject"
                        @change="getPaperCode"
                      ></v-select>
                    </v-flex>
                    </br>
                    <!-- Paper code -->
                      <v-layout class="justify-left" row wrap v-for="(paper, c_index) in getSchema.application_details" 
                      :key="c_index">
                          <v-flex md8>
                          <v-select
                            :return-object="true"
                            name="paper_code"
                            label="Paper Code"
                            v-model="paper.course_code"
                            :items="getPaperCodes.details"
                            item-text="paper.paper_name"
                            v-validate="'required'"
                            :error-messages="errors.collect('paper_code')"
                            data-vv-name="paper_code"
                            prepend-icon="subject"
                            @change="getStatus()"
                          ></v-select>
                        </v-flex>
                      <v-flex md4>
                        <slot v-if="paper.course_code" class="d-block">
                          <p class="text-lg-right mt-4"> Current Status: 
                           IM-Y-TH-P C
                          </p>
                        </slot>
                        <slot v-else class="d-block">
                        </slot>
                      </v-flex>
                      <v-layout class="justify-left" row wrap style="padding-left: 20px;">
                        <v-flex md4 v-for="(category, index) in getCorrectionCategory" :key="index">
                        <!-- v-model="paper.categories[index]" -->
                          <v-checkbox
                            :label="category.application_category_name"
                            color="blue"
                            :value="category.id"
                            @change="setValue(c_index,category.id)"
                          ></v-checkbox>
                          </v-flex>
                      </v-layout>
                      <br>
                      
                      <v-layout class="justify-left" row wrap>
                      <v-flex md12 v-if="theory_absent">
                          <v-text-field
                            name="serial_number"
                            label="Serial Number"
                            type="text"
                            
                            v-model="paper.serial_number"
                            data-vv-name="serial_number"
                            prepend-icon="edit"
                            style="border: 1px solid red;"
                          ></v-text-field>
                        </v-flex>
                        <v-flex md10>
                          <v-text-field
                            name="note"
                            label="Note"
                            type="text"
                            v-model="paper.note"
                            data-vv-name="note"
                            prepend-icon="edit"
                          ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-btn
                          fab
                          dark
                          small
                          color="red"
                          @click="removePaper(c_index,paper.id)"
                        >
                          <v-icon dark>clear </v-icon>
                        </v-btn>
                      </v-flex>
                      </v-layout>
                    </v-layout>
                     <v-btn fab dark small color="info" @click="addMore()">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    <v-layout class="justify-left" row wrap>
                      <v-flex md6>
                      <v-text-field
                        name="admit_card"
                        label="Admit Card"
                        data-vv-name="Admit Card"
                        prepend-icon="attach_file"
                        disabled="disabled"
                        
                      ></v-text-field>
                      <input required type="file" name="admit_card" @change="setFile($event,'admit_card')" />
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        name="registration_card"
                        label="Registration Card"
                        data-vv-name="registration_card"
                        prepend-icon="attach_file"
                        disabled="disabled"
                      ></v-text-field>
                      <input type="file" name="registration_card" @change="setFile($event,'registration_card')"/>
                    </v-flex>
                    <br>
                    <v-flex md6>
                      <v-text-field
                        name="attendance_sheet"
                        label="Attendence Sheet"
                        v-validate="'required'"
                        data-vv-name="attendance_sheet"
                        prepend-icon="attach_file"
                        disabled="disabled"
                      ></v-text-field>
                      <input type="file" name="attendance_sheet" @change="setFile($event,'attendance_sheet')"/>
                    </v-flex>
                    <!--
                    <v-flex md6>
                      <v-text-field
                        name="result_sheet"
                        label="Result Sheet"
                        v-validate="'required'"
                        data-vv-name="result_sheet"
                        disabled="disabled"
                        prepend-icon="attach_file"
                      ></v-text-field>
                      <input type="file" name="result_sheet" @change="setFile($event,'result_sheet')"/>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        name="incourse_mark"
                        label="Incourse Mark"
                        v-validate="'required'"
                        data-vv-name="incourse_mark"
                        prepend-icon="attach_file"
                        disabled="disabled"
                      ></v-text-field>
                      <input type="file" name="incourse_mark" @change="setFile($event,'incourse_mark')"/>
                    </v-flex>
                    -->
                    </v-layout>
                    
                    
                  </v-layout>
                 
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12 style="margin-top: 40px">
                      <v-layout justify-center row fill-height align-center>
                        <v-btn color="primary" large @click="updateCorrection">Submit</v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </form>
              </v-flex>
              <!--
              <v-flex md4>
                <h1>Instruciton</h1>
              </v-flex>
              -->
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
    <!--<pre>{{getSchema}}</pre> -->
  </v-container>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      theory_absent: false,
    };
  },

  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    getSchema() {
      return this.$store.getters.getResultCorrectionDetails;
    },
    student() {
      return this.$store.getters.getStudentProfile;
    },
    getExamList() {
      return this.$store.getters.getCorrectionExamList;
    },
    getExamYear() {
      return this.$store.getters.getExamYear;
    },
    getPaperCodes() {
      return this.$store.getters.getCorrectionPaperCodes;
    },
     getCorrectionCategory() {
      return this.$store.getters.getCorrectionAppCategory;
    },
    getPaperCode(){
      let exam_code = this.getSchema.exam_code;
      let exam_year = this.getSchema.exam_year;
      let data = {
        exam_code: exam_code,
        exam_year: exam_year
      }
      if(data.exam_code != '' && data.exam_year != ''){
        this.$store.dispatch("getCorrectionPaperCodes",data)
      .then(function(data){
        console.log(data);
      });
      }
    },
  },

 
  methods: {
    addMore() {
      this.getSchema.application_details.push({ course_code: "", note: "",serial_number:"" , categories: []});
    },
    removePaper(c_index,id){
      this.$root
        .$confirm("Are you sure to delete?Paper will be remove from request")
        .then(confirm => {
          if (confirm) {
            this.getSchema.application_details.splice(c_index, 1);
            this.$store.dispatch("deletePaper",id);
          }
        });
      
      
    },
    getPaperCode(){
      let exam_code = this.getSchema.exam_code;
      let exam_year = this.getSchema.exam_year;
      let data = {
        exam_code: exam_code,
        exam_year: exam_year
      }
      if(data.exam_code != '' && data.exam_year != ''){
        this.$store.dispatch("getCorrectionPaperCodes",data)
      .then(function(data){
        console.log(data);
      });
      }
    },
    getStatus(a,b){
      console.log(a,b);
    },
    setValue(index,id){
     // let categories = this.categories;
      let categories = this.getSchema.application_details;
      console.log(categories);
      //categories[index].categories.push(id);

        if(id == '1'){
          this.theory_absent = true;
        }
      //console.log(categories.categories);

      const found = categories[index].categories.some(el => el === id);
      if(!found){
        categories[index].categories.push(id);
        if(id == '1'){
          this.theory_absent = true;
        }
      } else{
        if(id == '1'){
          this.theory_absent = false;
        }
        categories[index].categories.splice(value => value);
      }
      //console.log(categories.categories);
    },
    updateCorrection(){
      let self = this;
      let paper=new Array()
      this.getSchema.application_details.forEach(element => {
        // console.log(element)
        paper.push({
          'course_code':element.course_code.paper_code,
          'note':element.note,
          'serial_number': element.serial_number,
          'categories':element.categories
          })
      });
      //paper.push({});
      this.getSchema.papers = paper
      //console.log(this.getSchema);
      this.$store
          .dispatch("editCorrection", this.getSchema)
          .then(function(data) {
            self.$router.push({ path: "/student/result-correction" });
          })
          .catch(function(error) {
            
          });
    }, 
    setFile(event,name){
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        if(name == 'admit_card'){
            this.getSchema.admit_card = event.target.result;
        }else if(name == 'registration_card'){
            this.getSchema.registration_card = event.target.result;
        } else if(name == 'attendance_sheet'){
            this.getSchema.attendance_sheet = event.target.result;
        } else if(name == 'result_sheet'){
            this.getSchema.result_sheet = event.target.result;
        } else if(name == 'incourse_mark'){
           this.getSchema.incourse_mark = event.target.result;
        }
          console.log(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  },
mounded() {
  
  this.getPaperCode();
},
  created() {
    this.$store.dispatch("getStudentProfile");
    this.$store.dispatch("getCorrectionExam");
    this.$store.dispatch("fetchExamYearData");
    this.$store.dispatch("getCorrectionAppCategory");
    this.$store.dispatch("getResultCorrectionDetails",this.$route.params.application_id);
  }
};
</script>

<style>
#applicationDetails {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#applicationDetails td,
#applicationDetails th {
  border: 1px solid #ddd;
  padding: 8px;
}

#applicationDetails tr:nth-child(even) {
  background-color: #f2f2f2;
}

#applicationDetails tr:hover {
  background-color: #ddd;
}

#applicationDetails th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: white;
  color: black;
}
</style>
