<template>
  <v-container fluid fill-weight>
    <template>
      <v-layout justify-center>
        <v-flex xs12 md12>
          <v-toolbar color="primary" dark>
            <v-toolbar-title
              >Apply For Correction/Revised Result</v-toolbar-title
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
                        v-model="form.data.exam_code"
                        :items="getExamList"
                        item-text="exam_name"
                        item-value="exam_code"
                        id="exam_code"
                        data-vv-name="exam_code"
                        required
                        prepend-icon="subject"
                        @change="getPaperCode"
                        clearable
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        name="exam_year"
                        label="Exam Year"
                        v-model="form.data.exam_year"
                        :items="getExamYear"
                        item-text="exam_year"
                        id="exam_year"
                        item-value="exam_year"
                        required
                        :error-messages="errors.collect('exam_year')"
                        data-vv-name="exam_year"
                        prepend-icon="subject"
                        @change="getPaperCode"
                        clearable
                      ></v-select>
                    </v-flex>
                    </br>
                    <!-- Paper code -->
                      <v-layout class="justify-left" row wrap v-for="(paper, c_index) in correctionAppliedList" 
                      :key="c_index">
                          <v-flex md8 id="paper_code">
                          <v-select
                            :return-object="true"
                            name="paper_code"
                            clearable
                            label="Paper Code"
                            v-model="paper.course_code"
                            :items="getPaperCodes.details"
                            item-text="paper.paper_name"
                            data-vv-name="paper_code"
                            prepend-icon="subject"
                            @change="getStatus()"
                          ></v-select>
                        </v-flex>
                      <v-flex md4>
                        <slot v-if="paper.course_code" class="d-block">
                          <p class="text-lg-right mt-4"> Current Status: 
                            IM- {{ paper.course_code.incourse_mark > 0? 'Y':'N' }}
                            {{ paper.course_code.paper.paper_types.paper_type.substring(0,2) }}-{{ paper.course_code.attendance_status?'P':'A' }}
                            {{ paper.course_code.letter_grade }}
                          </p>
                        </slot>
                        <slot v-else class="d-block">
                        </slot>
                      </v-flex>
                      <v-layout class="justify-left" row wrap style="padding-left: 20px;">
                        <v-flex md4 v-for="(category, index) in getCorrectionCategory" :key="index">
                          <v-checkbox
                            :label="category.application_category_name"
                            color="blue"
                            :value="category.id"
                            @change="setValue(c_index,category.id)"
                          ></v-checkbox>
                          </v-flex>
                      </v-layout>
                      <br>
                      <v-spacer></v-spacer>
                      <v-layout class="justify-left" row wrap>
                      <v-flex md12 v-if="theory_absent">
                          <v-text-field
                            name="serial_number"
                            label="Serial Number"
                            type="text"
                            v-model="paper.serial_number"
                            data-vv-name="serial_number"
                            prepend-icon="edit"
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
                          v-if="c_index"
                          fab
                          dark
                          small
                          color="red"
                          @click="correctionAppliedList.splice(c_index, 1)"
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
                      <input id="admit_card" type="file" name="admit_card" @change="setFile($event,'admit_card')" />
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        name="registration_card"
                        
                        label="Registration Card"
                        data-vv-name="registration_card"
                        prepend-icon="attach_file"
                        disabled="disabled"
                      ></v-text-field>
                      <input type="file" id="registration_card" name="registration_card" @change="setFile($event,'registration_card')"/>
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
                        <v-btn color="primary" large @click="applyForCorrection">Submit</v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </form>
              </v-flex>
              <v-flex md4>
                <h1>Instruciton</h1>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
    <!--<pre>{{form.data}}</pre> -->
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      form: {
        data: {
          exam_code: "",
          exam_year: "",
          admit_card: "",
          registration_card: "",
          attendance_sheet: "",
          result_sheet: "",
          incourse_mark: "",
          papers : []
        },
      },
      correctionAppliedList: [{ course_code: "", note: "",serial_number:"" , categories: []}],
      // categories: [],
      theory_absent: false,
      submitMode: true,
    };
  },

  computed: {
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
    
  },

  methods: {
    addMore() {
      this.correctionAppliedList.push({ course_code: "", note: "",serial_number:"" , categories: []});
    },
    getPaperCode(){
      let exam_code = this.form.data.exam_code;
      let exam_year = this.form.data.exam_year;
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
      let categories = this.correctionAppliedList;
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
  
    applyForCorrection(){
      let self = this;
      if(self.form.data.exam_code ==""){
        self.submitMode = false;
        document.getElementById('exam_code').style.border  = '1px solid red';
      } else if(self.form.data.exam_year ==""){
        self.submitMode = false;
        document.getElementById('exam_year').style.border  = '1px solid red';
      } else if(!self.correctionAppliedList.length){
        self.submitMode = false;
        document.getElementById('paper_code').style.border  = '1px solid red';
      }else if(self.form.data.admit_card ==""){
        self.submitMode = false;
        document.getElementById('admit_card').style.border  = '1px solid red';
      }else if(self.form.data.registration_card ==""){
        self.submitMode = false;
        document.getElementById('registration_card').style.border  = '1px solid red';
      }else{
        self.submitMode = true;
      }
      let paper=new Array()
      this.correctionAppliedList.forEach(element => {
        // console.log(element)
        paper.push({
          'course_code':element.course_code.paper_code,
          'note':element.note,
          'serial_number': element.serial_number,
          'categories':element.categories
          })
      });
      //paper.push({});
      this.form.data.papers = paper
      //console.log(this.form.data);
      if(self.submitMode){
        this.$store
          .dispatch("submitCorrectionRequestToCollege", this.form.data)
          .then(function(response) {
            if(response.status == 'error'){
              console.log(response.data);
            } else if(response.status == 'success'){
              self.$router.push({ path: "/student/result-correction" });
            }
            
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }, 
    setFile(event,name){
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        if(name == 'admit_card'){
            this.form.data.admit_card = event.target.result;
        }else if(name == 'registration_card'){
            this.form.data.registration_card = event.target.result;
        } else if(name == 'attendance_sheet'){
            this.form.data.attendance_sheet = event.target.result;
        } else if(name == 'result_sheet'){
            this.form.data.result_sheet = event.target.result;
        } else if(name == 'incourse_mark'){
           this.form.data.incourse_mark = event.target.result;
        }
          //console.log(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  },

  created() {
    this.$store.dispatch("getStudentProfile");
    this.$store.dispatch("getCorrectionExam");
    this.$store.dispatch("fetchExamYearData");
    this.$store.dispatch("getCorrectionAppCategory");
  }
};
</script>

<style scoped>
.v-card__title--primary {
  padding-top: 0;
}

.v-card__title {
  padding-bottom: 16px;
}

input {
  margin-left: 30px;
}
</style>
