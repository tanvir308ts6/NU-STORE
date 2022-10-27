<template>
  <div>
    <!-- result details hons -->
    <v-dialog v-model="paperDialog" persistent max-width="1600" >
      <div v-if="!degreePass">
         <v-toolbar>
          <v-toolbar-title>
            <!-- <div class="title">Course Details</div> -->
          </v-toolbar-title>
          
          <v-spacer></v-spacer>
          <v-btn round outline flat @click="paperDialog = false">
            <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
          </v-btn>
         </v-toolbar>

         <v-card height="800">
          <div style="float: left; width: 70px; margin-left:80px;">
               <img src="@/assets/nu_logos/nu_logo.png" style="width: 100% !important;"/>
          </div>
 
          <div>
            <h1 align ="center">National University,Bangladesh</h1>
            <h3 align ="center">{{this.showExamName}},{{this.searchParam.year}}</h3>
            <h2 align ="center">Result Sheet</h2>
          </div>
          <br>
          <div align="center">
            <table style="width:90%" class="a">
              
            <tr>
              <td class="a" ><h3 style="margin-left:20px;"><b>Name of Student</b></h3></td>
              <td class="a"><h3 style="margin-left:20px;"><b>{{this.student_name}}</b></h3></td>
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Father's Name</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.father_name}}</h3></td>
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">Mother's Name</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.mother_name}}</h3></td>            
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">Name of College</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.college_code}}-{{this.college_name}}</h3></td>            
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">Exam. Roll</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.exam_roll_no}}</h3></td>            
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">Registration</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.reg_no}}</h3></td>            
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Session</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.session}}</h3></td>            
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Student Type</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.student_type_name}}</h3></td>            
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Subject Name</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.subject_code}}-{{this.subject_name}}</h3></td>            
            </tr>
            <tr v-if="consolidateResult">
              <td class="a"><h3 style="margin-left:20px;">CGPA</h3></td>
              <td class="a"><h3 style="margin-left:20px;">Visit Consolidated Result</h3></td>            
            </tr>
            <tr v-if="passed && !honoursExam">
              <td class="a"><h3 style="margin-left:20px;">CGPA</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.cgpa}}</h3></td>            
            </tr>
            <tr align="center" v-if="warn && !honoursExam">
              <td class="a" colspan="4"><h1   style="color:red;">CGPA not Fulfilled</h1></td>
            </tr>
            <tr v-if="honoursExam && !consolidateResult">
              <td class="a"><h3 style="margin-left:20px;">Result</h3></td>
              <td class="a" >
                <h3 style="margin-left:20px;">{{this.result_status_name}}</h3>
                <!-- <h3 v-if="notPromotedResult" style="margin-left:20px;">Not Promoted</h3>
                <h3 v-if="absentResult" style="margin-left:20px;">Absent</h3>
                <h3 v-if="improvedResult" style="margin-left:20px;">Improved</h3>
                <h3 v-if="othersResult" style="margin-left:20px;">Others</h3> -->
              </td>            
            </tr>
            <!-- <tr align="center" v-if="honoursExam">
              <td class="a" colspan="4"><h1   style="color:red;">Promoted</h1></td>
            </tr> -->
          </table>
         
          
          </div>
          <br>
         <div align="center">
         <table style="width:90%;" class="a" margin-bottom="50">
             <tr align="center">
              <td class="a" colspan="4"><h1 style="margin-left:20px;">Course wise Grade/Marks...</h1></td>
              
            </tr>
            <tr >
              <td class="a" ><h3 style="margin-left:20px;">Course Code</h3></td>
              <td class="a"><h3 style="margin-left:20px;">Course Title</h3></td>
              <td class="a" v-if="!honoursExam"><h3 style="margin-left:20px;">Credit</h3></td>
              <td class="a" v-if="honoursExam"><h3 style="margin-left:20px;">Credit</h3></td>
              <td class="a" v-if="!honoursExam"><h3 style="margin-left:20px;">Ltr Grade</h3></td>
              <td class="a" v-if="honoursExam"><h3 style="margin-left:20px;">LG</h3></td>
            </tr>
            <tr v-for="item in details">
              <td class="a" ><h3 style="margin-left:20px;">{{item.paper_code}}</h3></h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{item.paper_name}}</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{item.credit}}</h3></td>
              <td class="a" v-if="item.letter_grade == 'F' && item.credit == 0 &&item.attendance_status != 0"><h3 style="margin-left:20px;">Fail</h3></td>
              <td class="a" v-if="item.letter_grade != 'F' && item.credit == 0 ">
                <h3 style="margin-left:20px;">Pass</h3>
              </td>
              
             <!--  <td class="a" v-if="F && item.attendance_status == 0 "><h3 style="margin-left:20px;">Absent</h3></td> -->
             <td class="a" v-if="item.credit == 0 && item.attendance_status == 0 "><h3 style="margin-left:20px;">Absent</h3></td>
              <td class="a" v-if="item.credit != 0 && item.attendance_status != 0 "><h3 style="margin-left:20px;">{{item.letter_grade}}</h3></td>
              <td class="a" v-if="item.credit != 0 && item.attendance_status == 0 "><h3 style="margin-left:20px;">Absent</h3></td

            </tr>
            <tr v-if="consolidateResult && this.cgpa != '0.00'" >
              <td class="a" colspan="4" align="center"><h3 style="margin-left:20px;">CGPA={{this.cgpa}}</h3></td>
                        
            </tr>
          </table>
          </div>
          <br> 
         </v-card>
      </div>
      <!-- degreePassView -->
      <div v-if="degreePass">
         <v-toolbar>
          <v-toolbar-title>
            <!-- <div class="title">Course Details</div> -->
          </v-toolbar-title>
          
          <v-spacer></v-spacer>
          <v-btn round outline flat @click="paperDialog = false">
            <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
          </v-btn>
         </v-toolbar>

         <v-card height="800">
          <div style="float: left; width: 70px; margin-left:80px;">
               <img src="@/assets/nu_logos/nu_logo.png" style="width: 100% !important;"/>
          </div>
 
          <div>
            <h1 align ="center">National University,Bangladesh</h1>
            <h3 align ="center">{{this.showExamName}},{{this.searchParam.year}}</h3>
            <h2 align ="center">Result Sheet</h2>
          </div>
          <br>
          <div align="center">
            <table style="width:90%" class="a">
              
            <tr>
              <td class="a" ><h3 style="margin-left:20px;"><b>Student's Name</b></h3></td>
              <td class="a"><h3 style="margin-left:20px;"><b>{{this.student_name}}</b></h3></td>
            </tr>
            <tr v-if="degreeThirdYear">
              <td class="a"><h3 style="margin-left:20px;">Father's Name</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.father_name}}</h3></td>
            </tr>
             <tr v-if="degreeThirdYear">
              <td class="a"><h3 style="margin-left:20px;">Mother's Name</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.mother_name}}</h3></td>            
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">College</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.college_code}}-{{this.college_name}}</h3></td>            
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">Roll No</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.exam_roll_no}}</h3></td>            
            </tr>
             <tr>
              <td class="a"><h3 style="margin-left:20px;">Registration</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.reg_no}}</h3></td>            
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Session</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.session}}</h3></td>            
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Student Type</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.student_type_name}}</h3></td>            
            </tr>
            <tr>
              <td class="a"><h3 style="margin-left:20px;">Course</h3></td>
              <td class="a"><h3 style="margin-left:20px;">B.S.S</h3></td>            
            </tr>
            <tr v-if="!degreeThirdYear && !degreeConsolidate">
              <td class="a"><h3 style="margin-left:20px;">Result</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.result_status_name}}</h3></td>            
            </tr>
            <tr v-if="degreeThirdYear && degreeThirdYearFailed" align="center">
              <td class="a" colspan="4"><h1   style="color:red;">CGPA not Fulfilled</h1></td>
                          
            </tr>
            <tr v-if="degreeThirdYear && degreeThirdYearPass" align="center">
              <td class="a" colspan="4"><h1   style="color:red;">{{this.cgpa}}</h1></td>
                          
            </tr>
            <tr v-if="degreeConsolidate">
              <td class="a"><h3 style="margin-left:20px;">CGPA</h3></td>
              <td class="a"><h3 style="margin-left:20px;">Visit Consolidated Result</h3></td>            
            </tr>
          <!--   <tr v-if="passed && !honoursExam">
              <td class="a"><h3 style="margin-left:20px;">CGPA</h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{this.cgpa}}</h3></td>            
            </tr>
            <tr align="center" v-if="warn && !honoursExam">
              <td class="a" colspan="4"><h1   style="color:red;">CGPA not Fulfilled</h1></td>
            </tr> -->
            <tr v-if="degreeThirdYearPass">
              <td class="a"><h3 style="margin-left:20px;">Result</h3></td>
              <td class="a" >
                <h3 style="margin-left:20px;">{{this.result_status_name}}</h3>
                <!-- <h3 v-if="notPromotedResult" style="margin-left:20px;">Not Promoted</h3>
                <h3 v-if="absentResult" style="margin-left:20px;">Absent</h3>
                <h3 v-if="improvedResult" style="margin-left:20px;">Improved</h3>
                <h3 v-if="othersResult" style="margin-left:20px;">Others</h3> -->
              </td>            
            </tr>
            <!-- <tr align="center" v-if="honoursExam">
              <td class="a" colspan="4"><h1   style="color:red;">Promoted</h1></td>
            </tr> -->
          </table>
         
          
          </div>
          <br>
         <div align="center">
         <table style="width:90%;" class="a" margin-bottom="50">
             <tr align="center">
              <td class="a" colspan="4"><h1 style="margin-left:20px;">Course wise Grade/Marks</h1></td>
              
            </tr>
            <tr >
              <td class="a" ><h3 style="margin-left:20px;">Course Code</h3></td>
              <td class="a"><h3 style="margin-left:20px;">Course Title</h3></td>
              <td class="a"><h3 style="margin-left:20px;">Ltr Grade</h3></td>
              
            </tr>
            <tr v-for="item in details">
              <td class="a" ><h3 style="margin-left:20px;">{{item.paper_code}}</h3></h3></td>
              <td class="a"><h3 style="margin-left:20px;">{{item.paper_name}}</h3></td>
              <!-- <td class="a"><h3 style="margin-left:20px;">{{item.credit}}</h3></td> -->
              <!-- <td class="a" v-if="F && item.credit == 0 "><h3 style="margin-left:20px;">Fail</h3></td>
              <td class="a" v-if="!F && item.credit == 0 ">
                <h3 style="margin-left:20px;">Pass</h3>
              </td>
              
              <td class="a" v-if="F && item.attendance_status == 0 "><h3 style="margin-left:20px;">Absent</h3></td> -->
              <td class="a" v-if="item.credit != 0 && item.attendance_status != 0 "><h3 style="margin-left:20px;">{{item.letter_grade}}</h3></td>

            </tr>
          </table>
          </div>
          <br> 
         </v-card>
      </div>
    </v-dialog>
    <!-- consolidateView -->
    <v-dialog v-model="consolidateDialog" persistent max-width="1600" >
      <v-toolbar>
        <v-toolbar-title>
          <!-- <div class="title">Course Details</div> -->
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-btn round outline flat @click="consolidateDialog = false">
          <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>

      <v-card height="1400">
        <div style="float: left; width: 70px; margin-left:150px;">
             <img src="@/assets/nu_logos/nu_logo.png" style="width: 100% !important;"/>
        </div>
 
        <div>
          <h1 align ="center">National University,Bangladesh</h1>
          <h3 align ="center">{{this.degreeTitle}} Examination,{{this.searchParam.year}}</h3>
          <h2 align ="center">Consolidated Result</h2>
        </div>
        <br>
        <div align="center">
          <table style="width:80%" class="a" >
            
          <tr>
            <td class="a" ><h3 style="margin-left:20px;"><b>Name of Student</b></h3></td>
            <td class="a"><h3 style="margin-left:20px;"><b>{{this.con_student_name}}</b></h3></td>
          </tr>
          <tr>
            <td class="a"><h3 style="margin-left:20px;">Father's Name</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_fathers_name}}</h3></td>
          </tr>
           <tr>
            <td class="a"><h3 style="margin-left:20px;">Mother's Name</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_mothers_name}}</h3></td>            
          </tr>
           <tr>
            <td class="a"><h3 style="margin-left:20px;">Name of College</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_college_code}}-{{this.con_name_of_college}}</h3></td>            
          </tr>
           <tr>
            <td class="a"><h3 style="margin-left:20px;">Exam. Roll</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_exam_roll}}</h3></td>            
          </tr>
           <tr>
            <td class="a"><h3 style="margin-left:20px;">Registration & session</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_reg_no}}/{{this.con_session}}</h3></td>            
          </tr>
          <tr>
            <td class="a"><h3 style="margin-left:20px;">Subject Name</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_subject_code}}-{{this.con_subject_name}}</h3></td>            
          </tr>
          <tr>
            <td class="a"><h3 style="margin-left:20px;">Credit(Completed/Total)</h3></td>
            <td class="a"><h3 style="margin-left:20px;">{{this.con_credit_completed}}/{{this.con_credit_total}}</h3></td>            
          </tr>
          <tr v-if="passed ">
            <td class="a"><h3 style="margin-left:20px;">CGPA</h3></td>
            <td class="a" v-if="this.con_credit_completed == this.con_credit_total"><h3 style="margin-left:20px;">{{this.con_cgpa}}</h3></td>  
            <td class="a" v-if="this.con_credit_completed != this.con_credit_total" ><h3 style="margin-left:20px; color:red;">CGPA not Fulfilled</h3></td>          
          </tr>        
        </table>
       
        
        </div>
        <br>
         <div align="center">
         <table style="width:80%" class="a">
           <div  style="width:100%" >
            <h2 align="center">Course wise Letter Grade</h2>
            <table style="width:100%">
                <tr >
                  <td class="a" style="width:25%" align="center"><h2  >First Year</h2></td>
                  <td class="a" style="width:25%" align="center"><h2 s>Second Year</h2></td> 
                  <td class="a" style="width:25%" align="center"><h2 >Third Year</h2></td>
                  <td class="a" style="width:25%" align="center"><h2 >Fourth Year</h2></td>
                </tr>
               
            </table>
             <table class="mytableClass" style="margin-right:0px; width:25%">
                <tr>
                  <td  class="a"><h3 style="margin-left:20px;">Course Code(Credit)</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">LG</h3></td>
                </tr>

                <tr v-for="item in getConsolidateResultData.first_year_result">
                  <td  class="a"><h3 style="margin-left:20px;">{{item.paper_code}}({{item.credit}})</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">{{item.letter_grade}}</h3></td>
                </tr>
                 <tr v-for="item in getConsolidateResultData.first_year_result">
                  <td  class="a" v-if="item.credit == 0"><h3 style="margin-left:20px;">{{item.paper_name}}</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade != 'F'"><h3 style="margin-left:20px;">Pass</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade == 'F'"><h3 style="margin-left:20px;">Fail</h3></td>
                </tr>
              </table>
              <table class="mytableClass" style="width:25%">
                 <tr>
                  <td  class="a"><h3 style="margin-left:20px;">Course Code(Credit)</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">LG</h3></td>
                </tr>
                <tr v-for="item in getConsolidateResultData.second_year_result">
                  <td  class="a" v-if="item.credit != 0"><h3 style="margin-left:20px;">{{item.paper_code}}({{item.credit}})</h3></td>
                  <td  class="a" v-if="item.credit != 0"><h3 style="margin-left:20px;">{{item.letter_grade}}</h3></td>
                </tr>
                 <tr v-for="item in getConsolidateResultData.second_year_result">
                  <td  class="a" v-if="item.credit == 0"><h3 style="margin-left:20px;">{{item.paper_name}}</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade != 'F'"><h3 style="margin-left:20px;">Pass</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade == 'F'"><h3 style="margin-left:20px;">Fail</h3></td>
                </tr>
              </table>
              <table class="mytableClass" style="width:25%">
                 <tr>
                  <td  class="a"><h3 style="margin-left:20px;">Course Code(Credit)</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">LG</h3></td>
                </tr>
                <tr v-for="item in getConsolidateResultData.third_year_result">
                  <td  class="a"><h3 style="margin-left:20px;">{{item.paper_code}}({{item.credit}})</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">{{item.letter_grade}}</h3></td>
                </tr>
                <tr v-for="item in getConsolidateResultData.third_year_result">
                  <td  class="a" v-if="item.credit == 0"><h3 style="margin-left:20px;">{{item.paper_name}}</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade != 'F'"><h3 style="margin-left:20px;">Pass</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade == 'F'"><h3 style="margin-left:20px;">Fail</h3></td>
                </tr>
              </table>
              <table class="mytableClass" style="width:25%">
                 <tr>
                  <td  class="a"><h3 style="margin-left:20px;">Course Code(Credit)</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">LG</h3></td>
                </tr>
                <tr v-for="item in getConsolidateResultData.fourth_year_result">
                  <td  class="a"><h3 style="margin-left:20px;">{{item.paper_code}}({{item.credit}})</h3></td>
                  <td  class="a"><h3 style="margin-left:20px;">{{item.letter_grade}}</h3></td>
                </tr>
                <tr v-for="item in getConsolidateResultData.fourth_year_result">
                  <td  class="a" v-if="item.credit == 0"><h3 style="margin-left:20px;">{{item.paper_name}}</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade != 'F'"><h3 style="margin-left:20px;">Pass</h3></td>
                  <td  class="a" v-if="item.credit == 0 && item.letter_grade == 'F'"><h3 style="margin-left:20px;">Fail</h3></td>
                </tr>
              </table>
               
          </div>
          
              <table style="width:100%">
                <tr >
                  <td class="a" style="width:25%" align="center"><h3>First Year:{{this.first_year_summary}}</h3></td>
                  <td class="a" style="width:25%" align="center"><h3>Second Year:{{this.second_year_summary}}</h3></td> 
                  <td class="a" style="width:25%" align="center"><h3>Third Year:{{this.third_year_summary}}</h3></td>
                  <td class="a" style="width:25%" align="center"><h3>Fourth Year:{{this.fourth_year_summary}}</h3></td>
                </tr>
               
            </table>
         </table>
         </div>
        
         
      </v-card>
    </v-dialog>
        
    <v-container fluid grid-list-md v-if="true">
      <v-expansion-panel class="mb-3" inset v-model="open">
        <v-expansion-panel-content class="CSP_BoarderStyle">
          <template v-slot:actions>
            <v-icon large color="primary">$vuetify.icons.expand</v-icon>
          </template>
          <template v-slot:header>
            <div>
              <v-icon color="primary">search</v-icon>
              <span class="pl-2 subheading">Custom Search Panel</span>
              <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
            </div>
          </template>
          <v-layout column class="mx-5">
            <v-flex class="mx-3">
              <v-layout row wrap align-center v-if="forceRerenderFlag">
                
                <v-flex xs9>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Exam"
                  ></v-select>
                </v-flex>
                <!-- {{getLoggedInYear}} -->
                <v-flex xs3>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.year"
                    :items="getYearList"
                    :item-text="(item) => '' + item.year + ''"
                    item-value="year"
                    label="Year"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                <v-layout row wrap align-center class="py-3">
                  
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="searchParam.reg_no"
                      class="ma-2"
                      name="rg_no"
                      label="Registration Number"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      class="ma-2"
                      name="code"
                      label="College Code"
                      v-model="searchParam.college_code"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  

                  <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.center_code"
                      :item-text="
                        (item) => item.center_code + ' - ' + item.center_name
                      "
                      item-value="center_code"
                      :items="getTheoryCenterList"
                      menu-props="auto"
                      label="Select Center"
                      prepend-icon="list"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.center_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{
                            data.item.center_code +
                            " - " +
                            data.item.center_name
                          }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content
                            v-text="data.item"
                          ></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="
                                data.item.center_code +
                                ' - ' +
                                data.item.center_name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  
                  <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.paper_code"
                      :items="getPaperList"
                      :item-text="(item) => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Select Course"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.paper_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.code + " - " + data.item.title
                          }}</v-chip
                        >
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content
                            v-text="data.item"
                          ></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="data.item.code + ' - ' + data.item.title"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  
                  <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.subject_code"
                      :items="getSubjectList"
                      :item-text="(item) => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Select Subject"
                      persistent-hint
                      prepend-icon="library_books"
                      
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.subject_code = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.code + " - " + data.item.title
                          }}</v-chip
                        >
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content
                            v-text="data.item"
                          ></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="data.item.code + ' - ' + data.item.title"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      class="ma-2"
                      v-model="searchParam.result_status"
                      :items="getResultTypeData"
                      :item-text="(item) => item.result_type + ' - ' + item.result_type_name"
                      item-value="result_type_id"
                      label="Result Type"
                      persistent-hint
                      prepend-icon="library_books"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="searchParam.result_status = ''"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{
                            data.item.result_type + " - " + data.item.result_type_name
                          }}</v-chip
                        >
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content
                            v-text="data.item"
                          ></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="data.item.result_type + ' - ' + data.item.result_type_name"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <div  >
              <v-flex xs12 sm12 md12 class="my-3" >
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="searchResultList">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
            </div>
           <!--  <div v-if="consolidateResult">
               <v-flex xs12 sm12 md12 class="my-3" >
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large  @click="searchConsolidateResultList" >
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
            </div> -->
           
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
   
      <v-divider class="mt-2 mb-3"></v-divider>
     
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-badge left overlap color="transparent">
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    fab
                    small
                    style="margin-top: -1.5em"
                    class="elevation-0"
                    v-if="pagination.totalItems"
                    >{{ pagination.totalItems }}</v-btn
                  >
                </template>
                <v-card-text class="title">
                   
                  <!-- {{getLoggedIneExamName.exam_name}} -->
                  Result List
                  <!-- <span class="caption">( hover to see code )</span> -->
                </v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
           
          </v-layout>
        </v-card>
       <!--  {{this.degreePass}}{{this.honoursExam}} -->
          <v-data-table
          :loading="loading"
          :headers="formResultListHeaders"
          :items="getResultData"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
          
             
            <td class="text-xs-left">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">
              {{ props.item.college_code }} - {{ props.item.college_name }}
            </td>
            <td class="text-xs-left">
              {{ props.item.subject_code }}
              - {{ props.item.subject_name }}
            </td>

            
            <td class="text-xs">{{ props.item.exam_roll_no }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>

            <td class="text-xs">{{ props.item.student_name }}</td>

            <td class="text-xs-center">{{ props.item.earned_credit }}</td>
            <td class="text-xs-center">
              {{ props.item.letter_grade }} / {{ props.item.cgpa }}
            </td>
            <td class="text-xs-center" v-if="honoursExam">
              {{props.item.result_status_name}}
            </td>
            <!-- <td class="text-xs-center" v-if="props.item.result_status == 1  && honoursExam">
              Promoted
            </td>
            <td class="text-xs-center" v-if="props.item.result_status == 2 && honoursExam">
              Not Promoted
            </td>
            <td class="text-xs-center" v-if="props.item.result_status == 3  && honoursExam">
              Absent
            </td>
            <td class="text-xs-center" v-if="props.item.result_status == 4  && honoursExam">
              Improved
            </td>
            <td class="text-xs-center" v-if="props.item.result_status == 
            5  && honoursExam">
              Others
            </td>
            <td class="text-xs-center" v-if="props.item.result_status == 6  && honoursExam">
              Conditional Promoted
            </td> -->
            
            <td class="text-xs-center">
              <v-btn 
                outline
                color="info"
                @click="showPaperDetails(props.item.details)"
                v-on:click="editedIndexMeth(props.item)"
                v-bind:getPassed="getPassed"
                
              >
            
                <span >Result Details</span>
                
              </v-btn>
            </td>
            <td class="text-xs-center" v-if="consolidateResult">
              <v-btn
                outline
                color="info"
                @click="showConsolidateDetails(props.item)"
                v-bind:getPassed="getPassed"
                
              >
            
                <span >Consolidate Result</span>
                
              </v-btn>
            </td>
            
          </template>
        </v-data-table>
        
      </v-container>
      <!-- mother -->
    </v-container>
    <!-- {{getResultData}} -->
  </div>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {},
  data: () => ({
    paperDialog: false,
    consolidateDialog: false,
    promotedResult: false,
    notPromotedResult: false,
    absentResult: false,
    improvedResult: false,
    othersResult: false,
    details: [],
    student_name : "",
    college_name : "",
    exam_roll_no : "",
    session: "",
    reg_no : "",
    subject_name: "",
    father_name: "",
    mother_name: "",
    student_type_name: "",
    subject_code: "",
    college_code: "",
    cgpa: "",
    result_status: "",
    passed: false,
    editedIndex: -1,
    warn : false,
    //forceRerenderFlag: true,
    visible: false,
    search: "",
    loading: false,
    consolidateResult:false,
    sl_count: 1,
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
    },
    searchParam: {},
    consolidateParam:{
      
    },
    degreePass: false,
    consolidateDataGet:false,
    con_student_name : "",
    con_fathers_name : "",
    con_mothers_name : "",
    con_name_of_college : "",
    con_college_code : "",
    con_exam_roll : "",
    con_reg_no : "",
    con_session : "",
    con_subject_code: "",
    con_subject_name: "",
    con_credit_completed: "",
    con_credit_total: "",
    con_cgpa : "",
    examParam: {},
    showExamName: "",
    degreeTitle: "",
    F: false,
    first_year_summary:"",
    second_year_summary:"",
    third_year_summary:"",
    fourth_year_summary:"",
    result_status_name:"",
    degreeThirdYear:false,
    degreeThirdYearFailed:false,
    degreeConsolidate:false,
    degreeThirdYearPass:false,
  }),
  created() {
   
    this.searchParam.exam_initiate_id = this.getExamInitiateId;

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    console.log("this.bachelorDegree",this.bachelorDegree);
    if(this.bachelorDegree == true){
      this.degreePass = true;
    }
    else{
      this.degreePass = false;
    }
   this.$store.dispatch("searchResultTypeData");

  },
  mounted(){
    if(this.searchParam.exam_code == "2204"){     
      this.consolidateResult = true;      
    }  
  },
  computed: {
    getResultTypeData() {
      return this.$store.getters.getResultTypeData;
    },
    getResultData() {
      return this.$store.getters.getResultData;
    },
     getConsolidateResultData() {
      return this.$store.getters.getConsolidateResultData;
    },
     getPassed(){
       if(this.cgpa != "0.00"){
        this.passed = true;
        this.warn = false;
      }
      else {
        this.passed = false;
        this.warn = true;
      }
    },
    
    formResultListHeaders() {
      if(this.consolidateResult == true){
        return [
        { text: "SL", value: "sl" },      
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Exam Roll", value: "exam_roll_no" },
        { text: "Registration No", value: "reg_no" },       
        { text: "Examinee Name", value: "student_name" },
        { text: "Earned Credit", value: "earned_credit" },
        { text: "Cgpa/Grade", value: "cgpa" },
        { text: "Result Status", value: "result_status" },
        { text: "Course Details", value: "details", align: "center" },
        { text: "Consolidate Result", value: "details", align: "center" }, 
      ];
      }
        if(this.honoursExam == true){
        return [
        { text: "SL", value: "sl" },      
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Exam Roll", value: "exam_roll_no" },
        { text: "Registration No", value: "reg_no" },       
        { text: "Examinee Name", value: "student_name" },
        { text: "Earned Credit", value: "earned_credit" },
        { text: "Cgpa/Grade", value: "cgpa" },
        { text: "Result Status", value: "result_status" },
        { text: "Course Details", value: "details", align: "center" },
         
      ];
      }
       else if(this.honoursExam == false){
        return [
        { text: "SL", value: "sl" },     
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Exam Roll", value: "exam_roll_no" },
        { text: "Registration No", value: "reg_no" },
        { text: "Examinee Name", value: "student_name" },
        { text: "Earned Credit", value: "earned_credit" },
        { text: "Cgpa/Grade", value: "cgpa" },
        { text: "Course Details", value: "details", align: "center" },

      ];
      }
    
    },

  },
  methods: {
    
    editedIndexMeth(item){
      console.log("myyy",item.result_status_name);
      this.result_status_name = item.result_status_name;
      this.student_name = item.student_name;
      this.college_name = item.college_name;
      this.exam_roll_no = item.exam_roll_no;
      this.reg_no = item.reg_no;
      this.session = item.session;
      this.subject_code = item.subject_code;
      this.subject_name = item.subject_name;
      this.father_name = item.father_name;
      this.mother_name = item.mother_name;
      this.student_type_name = item.student_type_name;
      this.college_code = item.college_code;
      this.cgpa = item.cgpa;
      if(item.letter_grade == "F"){
        this.F = true;
        console.log("show me",this.F)
      }
      else{
        this.F = false;
      }
      this.result_status = item.result_status;
      if(this.result_status == "1"){
        this.promotedResult = true;
      }
      else{
        this.promotedResult = false;
      }
      if(this.result_status == "2"){
        this.notPromotedResult = true;       
      }
      else{
        this.notPromotedResult = false;
      }
      if(this.result_status == "3"){
        this.absentResult = true;
      }
      else{
        this.absentResult = false;
      }
      if(this.result_status == "4"){
        this.improvedResult = true;
      }
      else{
        this.improvedResult = false;
      }
      if(this.result_status == "5"){
        this.othersResult = true;
      }
       else{
        this.othersResult = false;
      }   
    },
   
    publishFinalResult() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "FinalResultPublished";
      this.$store.dispatch("publishActivity", param);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchResultList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchResultData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    // searchConsolidateResultList() {
    //   this.loading = true;
    //   this.setLimit();
    //   this.$store
    //     .dispatch("searchConsolidateResultData", this.consolidateParam)
    //     .then((data) => {
    //       console.log("consolidate data",data.status)
    //       if(data.status == "success"){
    //         console.log("yes i am in");
    //         this.consolidateDataGet = true;
    //       }
    //       this.loading = false;
          
    //     });
    // },
    showPaperDetails(details) {
     this.paperDialog = true;
      this.details = details;
      this.examParam.exam_code = this.searchParam.exam_code;
      console.log("this.examParam.exam_code",this.examParam.exam_code)
       this.$store
        .dispatch("fetchExamData", this.examParam)
        .then((data) => {
          console.log("fdfdff",data.data[0].title);
          this.showExamName = data.data[0].title;
         

        });
     
      // console.log(details);
    },
    showConsolidateDetails(item) {
      console.log("item print",item.reg_no);
      this.consolidateParam.reg_no = item.reg_no;
      this.examParam.exam_code = this.searchParam.exam_code;
      this.$store
        .dispatch("fetchExamData", this.examParam)
        .then((data) => {
          console.log("fdfdff",data.data[0].title);
          this.showExamName = data.data[0].title;
           this.degreeTitle = data.data[0].degree_title;
        });
        this.$store
        .dispatch("searchConsolidateResultData", this.consolidateParam)
        .then((data) => {
          console.log("consolidate data",data.status)
          if(data.status == "success"){
            console.log("yes i am in",data.data.basic_info[0].student_name);
            this.con_student_name = data.data.basic_info[0].student_name;
            this.con_fathers_name = data.data.basic_info[0].father_name;
            this.con_mothers_name = data.data.basic_info[0].mother_name;
            this.con_name_of_college = data.data.basic_info[0].name_of_college;
            this.con_college_code = data.data.basic_info[0].college_code;
            this.con_exam_roll = data.data.basic_info[0].exam_roll;
            this.con_reg_no = data.data.basic_info[0].reg_no;
            this.con_session = data.data.basic_info[0].session; 
            this.con_subject_code = data.data.basic_info[0].subject_code;
            this.con_subject_name = data.data.basic_info[0].subject_name;
            this.con_credit_completed = data.data.basic_info[0].completed;
            this.con_credit_total = data.data.basic_info[0].total_credit;
            this.con_cgpa = data.data.basic_info[0].cgpa;
            this.first_year_summary = data.data.first_year_summary.gpa;
            this.second_year_summary = data.data.second_year_summary.gpa;
            this.third_year_summary = data.data.third_year_summary.gpa;
            this.fourth_year_summary = data.data.fourth_year_summary.gpa;
            this.consolidateDataGet = true;
            console.log("getConsolidateResultData",this.getConsolidateResultData)
          }        
        });   
      this.consolidateDialog = true;
    },
  },
  watch: {
    pagination() {
      this.searchResultList();      
    },
    getLoggedIneExamName(val){
      console.log("getLoggedIneExamName",val);
    }

  },
};
</script>

<style lang="scss" scoped>
  
  .a {
  border: 1px solid black;
  border-collapse: collapse;

}
.b {
  padding: 5px;
  text-align: left;    
}
.mytableClass{
  float:left;
    width:25%;
}
</style>
