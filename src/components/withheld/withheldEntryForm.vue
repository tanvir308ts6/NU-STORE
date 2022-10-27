<template>
  <v-container fluid>
    <v-card flat color="white" class="mb-0">
      <v-expansion-panel class="mb-0" inset v-model="open">
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
          <v-layout row wrap align-center>
            <v-flex class="mx-5">
              <v-layout class="mx-5" row wrap align-center v-if="forceRerenderFlag">
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    :item-text="item => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Exam"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.year"
                    :items="getYearList"
                    :item-text="item => '' + item.year + ''"
                    item-value="year"
                    label="Year"
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    class="mx-3"
                    disabled
                    v-model="searchParam.exam_type"
                    :items="getExamType"
                    item-text="exam_type_name"
                    item-value="exam_type"
                    label="Select Type"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                <v-layout row wrap align-center class="py-3">
                  <v-flex xs6>
                    <v-text-field
                      :disabled="!show"
                      v-model="searchParam.reg_no"
                      outline
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Registration Number"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>
                  </v-flex>
                    <v-flex xs6>
                    <v-text-field
                      :disabled="!show"
                      v-model="searchParam.exam_roll"
                      outline
                      class="ma-1"
                      name="exam_roll"
                      menu-props="auto"
                      label="Roll Number"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 v-if="!ifCenterUser">
                    <v-text-field
                      outline
                      :disabled="!show"
                      class="ma-1"
                      hide-details
                      name="code"
                      label="College Code"
                      v-model="searchParam.college_code"
                      prepend-inner-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete
                      outline
                      class="ma-1"
                      :disabled="!show"
                      v-model="searchParam.paper_code"
                      :item-text="item => item.code + ' - ' + item.title"
                      item-value="code"
                      :items="getPaperList"
                      menu-props="auto"
                      label="Select Course"
                      hide-details
                      prepend-inner-icon="library_books"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="remove(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          {{
                          data.item.code + " - " + data.item.title
                          }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs6 v-if="!ifCenterUser">
                    <v-autocomplete
                      outline
                      :disabled="!show"
                      class="ma-1"
                      v-model="searchParam.subject_code"
                      :items="getSubjectList"
                      :item-text="item => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Select Subject"
                      hide-details
                      prepend-inner-icon="library_books"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="removeSub(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >{{ data.item.code + " - " + data.item.title }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete
                      class="ma-1"

                      :disabled="ifCenterUser || !show"
                      v-model="searchParam.center_code"
                      :items="getTheoryCenterList"
                      color="blue-grey lighten-2"
                      label="Select Center"
                      :item-text="
                        item => item.center_code + ' - ' + item.center_name
                      "
                      item-value="center_code"
                      prepend-icon="face"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="removeCenter(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >{{ data.item.center_name }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
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
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 class="mb-3" v-if="show">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large :disabled="!searchParam.reg_no" @click="searchFormFillupList()">
                  <v-icon left dark>add</v-icon>ADD STUDENT
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

    <v-card flat color="white" class="mb-0">
      <v-container fluid style=" padding: 5px;">
      <!--   <v-card flat color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Students After Search</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
          </v-layout>
        </v-card> -->
      <!--   <v-data-table
          v-model="selected"
          :loading="loading"
          :headers="formFillUpListHeaders"
          :items="getFormFillupList"
          class="elevation-0"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        > -->
     <!--      <template v-slot:items="props">
            <td class="text-xs">{{ sl_count + props.index }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.exam_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.exam_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ props.item.year }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.college_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.college_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.subject_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.subject_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.degree_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.degree_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.degree_group_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.degree_group_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ props.item.session_year }}</td>
            <td class="text-xs">{{ props.item.exam_roll }}</td>
            <td class="text-xs">{{paperString(props.item.details)}}</td>
          </template> -->

        <!-- </v-data-table> -->

      </v-container>
       <div v-if="openStat">
         <h1 align="center">Student's Detail..</h1>
         <br>
        <table class="b" style="margin-left:100px; margin-right:50px;" v-for="item in getFormFillupList">
          <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Student Name</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.student_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Registration Number</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.reg_no}}</p>
          </td>
        </tr>
           <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Exam Roll</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.exam_roll}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Session</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.session_year}}</p>
          </td>
        </tr>
             <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Exam Name</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; margin-top:10px;">{{item.exam_code}}-{{item.exam_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Year</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; margin-top:10px">{{item.year}}</p>
          </td>
        </tr>
             <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">College Name</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; ">{{item.college_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Subject</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
           
            <p style="margin-left:10px; margin-right:50px; ">{{item.subject_name}}</p>
          </td>
        </tr>
             <tr>
          <th class="a" width="1000" align="left" >
            <h3 style="margin-left:10px; margin-right:50px;">Degree</h3>
          </th>
          <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            
            <p style="margin-left:10px; margin-right:50px; ">{{item.degree_name}}</p>
          </td>
          <th class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
            <h3 style="margin-left:10px; margin-right:50px;">Degree Group</h3>
          </th>
         <td class="a" width="1000" align="left" style="margin-left:10px; margin-right:50px;">
           
            <p style="margin-left:10px; margin-right:50px; ">{{item.degree_group_name}}</p>
          </td>
        </tr>
        </table>
        </div>
        <br>
        <!-- {{subjectWisePaper}} -->
        <div align="right" v-if="openStat" style="margin-right:50px;">
          <v-flex xs4>
            <v-autocomplete
            class="ma-1"

            v-model="searchParam.paper_code"
            :items="subjectWisePaper"
            color="blue-grey lighten-2"
            label="Select Course"
            :item-text="
            item => item.paper_code + ' - ' + item.paper_name
            "
            item-value="paper_code"
            prepend-icon="face"
            >
            <template v-slot:selection="data">
              <v-chip
              close
              @input="removeCenter(data.item)"
              :selected="data.selected"
              class="chip--select-multi"
              >{{ data.item.paper_name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                  v-html="
                  data.item.paper_code +
                  ' - ' +
                  data.item.paper_name
                  "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
          <v-btn color="primary" class="white--text" @click="downloadExaplanation()" align="right">
          <v-icon left dark>arrow_downward</v-icon>Download Explanation
          </v-btn>
          <v-btn color="primary" class="white--text" @click="downloadExpelled()" align="right">
          <v-icon left dark>arrow_downward</v-icon>Download Expelled Form
        </v-btn>
        </div>
        <br>
        
     <!-- {{subjectWisePaper}} -->
             <div v-if="openStat">
              <div class="col-12" align="center">
              
                  <tbody>
                        <div style="float: left; width: 70px;">
                          <img
                            src="../../assets/nu_logos/nu_logo.png"
                            style="width: 100% !important;"
                          />
                        </div>
                        <div style="float: left; padding-left: 10px;">
                          <h1 style="margin: 0; padding: 0; line-height: 1.2;">জাতীয় বিশ্ববিদ্যালয়</h1>
                          <br>
                          <h2 align="center" 
                            style="margin: 0; padding: 0; line-height: 1.2;"
                          >গাজীপুর</h2>
                         
                        </div>
                                          
                  </tbody>
                </div>
                            
                <br>
                <h2 align="center" >
                  পরীক্ষার্থী কর্তৃক অসদুপায় অবলম্বন বা পরীক্ষার নিয়ম ভঙ্গ সংক্রান্ত তথ্য ফরম 

                          
                          
                         
                         
                    
                </h2>
                <br>
                <div align="center" style="margin-left: 200px; margin-right: 50px;">
                  <h3 >
                   দ্রষ্টব্য :প্রত্যেক বহিষ্কৃত পরীক্ষার্থীর জন্য একটি ফরম ব্যবহার করতে হবে। ফরমের কোন অংশ খালি রাখা যাবে না।উত্তরপত্র আটক করা কাগজের সাথে এই রিপোর্ট সংযুক্ত করে স্বতন্ত্র প্যাকেটে রেজিস্টার ডাকযোগে পরীক্ষা নিয়ন্ত্রকের নিকট সঙ্গে সঙ্গে পাঠাতে হবে।  যে কাগজপত্র  নকল করার সময় ধরা হয়েছে সেই কাগজপত্র যে অফিসার / ইনভিজিলেটর নকল ধরেছেন সে অফিসার/ইনভিজিলেটর কর্তৃক তারিখসহ  দস্তখত দ্বারা সত্যায়িত হতে হবে।  
                 </h3>
               </div>
                <br>
              
               
              </div>
               </div>
               <div  v-if="openStat">  
                   <table style="margin-left:200px; margin-right:0px;">
                    <tr>
                      <th>১.পরীক্ষার নাম :
                      </th><v-flex xs12<v-select
                      class="mx-3"
                      disabled
                      v-model="subParam.exam_code"
                      :items="getExamList"
                      :item-text="item => item.code + ' - ' + item.title"
                      item-value="code"
                      label="Exam"
                      ></v-select></v-flex>
                      <th>সাল:</th>
                      
                      <v-select
                      class="mx-3"
                      disabled
                      v-model="subParam.year"
                      :items="getYearList"
                      :item-text="item => '' + item.year + ''"
                      item-value="year"
                      label="Year"
                      ></v-select> 
                      <!-- {{subParam.centesr_name}} -->
                      <th>কেন্দ্র :</th>

                        <v-autocomplete
                      class="ma-1"
                      :disabled="ifCenterUser || !show"
                      v-model="subParam.center_name"
                      :items="getTheoryCenterList"
                      color="blue-grey lighten-2"
                      label="Select Center"
                      :item-text="
                        item =>  item.center_name
                      "
                      item-value="center_name"
                      prepend-icon="face"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="removeCenter(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >{{ data.item.center_name }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="
                                
                                  data.item.center_name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                     <th>কেন্দ্র কোড :</th>
                     <v-flex xs10 >
                      <v-text-field
                      
                      :disabled="!show"
                      class="ma-1"
                      hide-details
                      name="code"
                      label="Center Code"
                      :items="getTheoryCenterList"
                      :item-text="
                      item => item.center_code 
                      "
                      v-model="subParam.center_code"
                      prepend-inner-icon="edit"
                      ></v-text-field>
                    </v-flex>

                    </tr>


                  </table> 
                 </div>
              
                <!-- <h3>
                 ১.পরীক্ষার নাম :.......................................................................... ১.সাল:...................................১.কেন্দ্র :............................................   ১. কেন্দ্র কোড  :...............................................
                </h3> -->
            
                <br>
                <div v-if="openStat">
               <table class="b" style="margin-left:200px; margin-right:50px;">
                <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;"> ২.যে পরীক্ষার্থীর রিপোর্ট দেওয়া হয়েছে তার বিবরন </h3></th>
                    <th class="a" width="1000" align="left">
                      <h3  style="margin-left:10px; margin-top:10px; margin-right:10px;"><div v-for="item in getFormFillupList" >রোল নং : {{item.exam_roll}} , রেজিস্ট্রেশন নং:  {{item.reg_no}}</div></h3>
                      <h3  style="margin-left:10px; margin-top:10px; margin-right:10px;"><div v-for="item in getFormFillupList" >সেশন: {{item.session_year}} , বর্তমান যোগাযোগের ঠিকানা  :  ঢাকা,বাংলাদেশ </div></h3>
                    </th>
                  </tr>
                  <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;"> ৩.পরীক্ষার্থী যে পরীক্ষা সম্পর্কে রিপোর্ট করা হচ্ছে তার বিবরণ </h3></th>
                    <th class="a" width="1000" align="left"><h3  style="margin-left:10px;  margin-top:10px; margin-right:10px;">
                      <div v-for="item in getFormFillupList" >বিষয়: {{item.subject_name}}</div></h3><br>
                      <h3  style="margin-left:10px;  margin-top:10px margin-bottom:2; margin-right:10px;">
                       পত্র :    <v-flex xs12>
                    <v-autocomplete
                      class="ma-1"
                      
                      v-model="subParam.paper_code"
                      :items="subjectWisePaper"
                      color="blue-grey lighten-2"
                      label="Select Course"
                      :item-text="
                        item => item.paper_code + ' - ' + item.paper_name
                      "
                      item-value="paper_code"
                      prepend-icon="face"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          close
                          @input="removeCourse(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >{{ data.item.paper_name }}</v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="
                                data.item.paper_code +
                                  ' - ' +
                                  data.item.paper_name
                              "
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete> 
                  </v-flex></h3>
                  <br>
                    </th>
             
                  </tr>
                   <tr>

                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;"> ৪. ঘটনার তারিখ ও সময় </h3></th>
                   
                      <th class="a" width="1000" align="left"><h3  style="margin-left:10px;  margin-top:10px; margin-right:10px;">
                     তারিখ:    <v-flex xs12>
                      <v-menu
                      class="ma-2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                      >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                        class="mt-4"
                        v-model="subParam.exam_date"
                        label="Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="subParam.exam_date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex> 
                , সময়:  
                <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                lazy
                full-width
                width="290px"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                  v-model="subParam.exam_time"
                  label="time"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                v-if="modal2"
                v-model="subParam.exam_time"
                full-width
                >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
                  <!-- <v-text-field
                      
                      v-model="searchParam.exam_time"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Time"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field> -->
                  </h3>
                  <br>
                    
              
                    </th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;">৫.নিরীক্ষণকারী অথবা কর্তব্য পালনরত অন্য যে অফিসার/ইনভিজিলেটর নকল ধরেছেন তার বিবরণ [যিনি নকল ধরেছেন তার মূল রিপোর্ট  সংযুক্ত করে দিতে হবে ]</h3></th>
                    <th class="a" width="1000" align="left">
                      <h3  style="margin-left:10px;  margin-top:10px; margin-right:10px;">
                     নাম:<v-text-field
                      v-model="subParam.observer_name"                     
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Name"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field><br>  পদবী:    <v-text-field
                      
                      v-model="subParam.observer_designation"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Designation"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>

                  </h3>
                  <br>
                    
                      <!-- <h3  style="margin-left:10px;  margin-top:10px; margin-right:10px;">নাম: .............................</h3>
                      <h3  style="margin-left:10px;">পদবী : .............................</h3> -->
                    <h3  style="margin-left:10px;">[যে কাজে নিজুক্ত হয়েছেন ]</h3><br>
                  </th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;"> ৬.পরীক্ষার্থীকে নকল করার সময় ধরা হয়েছে অথবা তার নিকট নকল করার মতো কাগজপত্র ছিল বলে ধৃত হয়েছে  এবং সে নকল করার কাজ সম্পন্ন করতে সমর্থ হয়েছে কিনা তার প্রকৃত অবস্থার পূর্ণ বিবরণ দিতে হবে । যদি নকল করার সময় ধরা হয়ে থাকে তবে যে অংশ নকল করা হয়েছে সেই অংশ উত্তরপত্রে এবং নকলের কাগজপত্রে লাল কালী অথবা লাল পেন্সিল দ্বারা অবশ্যই চিহ্নিত করতে হবে এবং নকলের কাগজপত্র অফিসার/ইনভিজিলেটর কর্তৃক স্বাক্ষরিত হতে হবে  </h3></th>
                    <th class="a" width="1000" align="left"><h3  style="margin-left:10px;  margin-top:10px; margin-right:10px;">বহিষ্কারের কারণ/বিবরণ :  <v-flex xs12>    
                      <v-select
                      v-model="subParam.reason"
                      :items="reasons"
                      attach
                      chips
                      label="reason/description"
                      multiple
                      ></v-select> 
                    </v-flex></h3>
                    </th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;">৭.পরীক্ষার্থী কাগজ সমর্পন করতে কোন বাধা দিয়ে থাকলে অথবা কোন নির্দেশ অমান্য করে থাকলে অথবা নিয়োজিত অফিসার/ইনভিজিলেটরের সাথে অশোভন আচরণ করে থাকলে তার বিস্তৃত বিবরণ দিতে হবে[প্রয়োজন হলে অতিরিক্ত কাগজ ব্যবহার করা যাবে ]</h3></th>
                    <th class="a" width="1000" align="left"><v-text-field
                      
                      v-model="subParam.report_seven"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field></th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;">৮.নকল ধরার পরও পরীক্ষার্থীকে বহিষ্কার না করে পরীক্ষা দেওয়ার অনুমতি দেওয়া হয়ে থাকলে এরূপ ব্যবস্থা গ্রহণের করুন বর্ণনা করতে হবে [প্রয়োজন হলে অতিরিক্ত কাগজ ব্যবহার করা যাবে ]</h3></th>
                    <th class="a" width="1000" align="left"><v-text-field
                      
                      v-model="subParam.report_eight"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field></th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;">৯.আটক করা কাগজপত্র[উত্তরপত্র,প্রবেশ পত্র,নকল করার কাগজ  ] এবং এতদসহ দাখিল করা অন্যান্য রিপোর্টের বিস্তৃত বিবরণ </h3></th>
                    <th class="a" width="1000" align="left"><v-text-field
                      
                      v-model="subParam.report_night"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field></th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;">১০.সংশ্লিষ্ট রিপোর্টের একটি অনুলিপি জাতীয় বিশ্ববিদ্যালয়ের    কম্পিউটার ইউনিটে প্রেরণ করতে হবে </h3></th>
                    <th class="a" width="1000" align="left"><v-text-field
                      
                      v-model="subParam.report_ten"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field></th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;">১১.ভারপ্রাপ্ত অফিসারের স্বাক্ষর ও সিলমোহর </h3></th>
                    <th class="a" width="1000" align="left"></th>
                  </tr>
                   <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px;"></h3></th>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;">স্বাক্ষর:..........</h3>
                    <h3 style="margin-left:10px;">সিলমোহর:..........</h3></th>
                  </tr>
                </table>
              </div>
              <div v-if="openStat">
                <div v-if="!ifCenterUser">
             <h2 align="center" style="margin-left:220px;  margin-top:10px; margin-right:10px;">বিশ্ববিদ্যালয় কর্তৃক পূরণ হবে </h2>
             <table class="b" style="margin-left:200px; margin-right:50px;">
                 <tr>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px; margin-bottom:50x;"> ১২.শৃঙ্খলা কমিটির নিকট কাগজপত্রসহ ঘটনার বিষয়বস্তু পেশ করার তারিখ: <v-flex xs12>
                      <v-menu
                      class="ma-2"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                      >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                        class="mt-4"
                        v-model="subParam.submission_date"
                        label="Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="subParam.submission_date" @input="menu3 = false"></v-date-picker>
                    </v-menu>
                  </v-flex></h3>
                    <h3 style="margin-left:10px;   margin-right:10px; margin-bottom:30px;">১৩.পরীক্ষা নিয়ন্ত্রকের সুপারিশ : <v-text-field
                      
                      v-model="subParam.report_thirteen"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field></h3>
                  </th>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px; margin-bottom:50px;"> ১৪.শৃঙ্খলা কমিটির সুপারিশ:  <v-text-field
                      
                      v-model="subParam.report_fourteen"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field></h3></th>
                    <th class="a" width="1000" align="left"><h3 style="margin-left:10px;  margin-top:10px; margin-right:10px; margin-bottom:50px;"> 
                      ১৫.বিশ্ববিদ্যালয় কর্তৃপক্ষের সিদ্ধান্ত: <v-text-field
                      
                      v-model="subParam.report_fifteen"
                      class="ma-1"
                      name="rg_no"
                      menu-props="auto"
                      label="Description"
                      prepend-inner-icon="edit"
                      hide-details
                    ></v-text-field>  </h3></th>
                  </tr>
             </table>
           </div>
           </div>
              </v-card>
            <!--   <v-flex xs12 v-if="!ifCenterUser">
                <v-card flat height="80px">
                  <v-select
                  outline
                  name="year"
                  class="ma-2 pa-2"
                  v-model="type"
                  item-text="title"
                  item-value="value"
                  :items="getItem"
                  menu-props="auto"
                  label="Select Report or Withheld"
                  hide-details
                  prepend-inner-icon="edit"
                  ></v-select>
                </v-card>
              </v-flex> -->

    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
<!--         <v-layout row wrap class="ml-0 py-0">
          <v-flex xs12>
            <v-textarea
              hide-details
              class="mx-3 mt-3"
              outline
              name="input-7-4"
              label="Reason"
              v-model="reason"
              auto-grow
              box
              rows="2"
              style="background-color: #FFEBEE;"
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              hide-details
              class="ma-3"
              outline
              name="input-7-4"
              label="Policy"
              v-model="policy"
              auto-grow
              box
              rows="2"
              style="background-color: #FFCDD2;"
            ></v-textarea>
          </v-flex>
        </v-layout> -->
        <!-- <v-alert
          :value="showBeforeSubmitAlert"
          class="my-2"
          type="warning"
        >Please fill up the reason and policy section.</v-alert> -->
        <v-layout justify-center row fill-height align-center>
          <v-btn
            class="ma-2 mb-3 erBtn"
            color="primary"
            large
            dismissible
            @click.stop.prevent="submitWithHeld()"
          >Submit</v-btn>
        </v-layout>
      </v-card>
    </v-hover>
  </v-container>
</template>
<script>
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import commonFunction from "@/mixin/common_function";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  props: ["dialogStatus", "ifCenterItem", "searchRepWithheldList"],
  components: {},
  mixins: [commonGet, commonExamYear, commonFunction, common_login_getters],

  data() {
    return {
      type: 0,
      menu2: false,
      menu3:false,
      openStat:false,
      show: true,
      open: 0,
      e13: 1,
      downParam:{},
      subParam:{
        subject_code : [],
      },
      // reason: "",
      policy: "",
      showBeforeSubmitAlert: false,
      reasons:[ "নকল করাকালীন ধৃত হয়েছে ","নকল পাওয়া গিয়েছে ","উত্তরপত্র পরিবর্তন করেছে "
      ],
      forceRerenderFlag: true,
      sl_count: 1,
      time: null,
        menu2: false,
        modal2: false,
      selected: [],
      loading: false,
      componentStatus: false,
      details: [],
      beforeSubmit: false,
      rollGendMode: true,
      dialog: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: -1,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      subjectWisePaper:[],
      search: "",
      searchParam: {
        reg_no: "",
        college_code: "",
       
        exam_roll_no:  "",
        ac_session : "",
        
        full: true,
        admitcard: false,
        final: true,
      },
    };
  },

  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.exam_year = this.getLoggedInYear.year;
    this.subParam.exam_initiate_id = this.getExamInitiateId;
    this.subParam.exam_code = this.getLoggedInExam.code;
    this.subParam.year = this.getLoggedInYear.year;
    
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.ifCenterItem.center_code;
      this.searchParam.subject_code = [];
      this.searchParam.college_code = "";
      // this.searchParam.submission_date = "12:12:2020"
      // this.searchParam.report_thirteen = "aaa"
      // this.searchParam.report_fourteen = "aaa"
      // this.searchParam.report_fifteen = "aaa"
    }
    // center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
  },
  // all from fillup list
  // if (this.$store.getters.getFormFillupItem.length == 0) {
  // this.$store.dispatch("fetchFormFillupData");
  // this.$store.dispatch("searchFormFillup", this.searchParam);
  // }
  //this.$store.dispatch("fetchFormFillupData");
  // mounted() {
  //   this.$validator.localize("en", this.dictionary);
  // },
  computed: {
    getItem() {
      return [
        { title: "Report", value: "1" },
        { title: "Withheld", value: "2" },
      ];
    },

    //all data
    getFormFillupList() {
      return this.$store.getters.getFormFillupItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    ifLoadingListDone() {
      return this.$store.getters.getFormFillupItem.length > 0 ? false : true;
    },
    formFillUpListHeaders() {
      return [
        { text: "SL", value: "sl" },
        { text: "Registration No", value: "reg_no" },
        { text: "Exam", value: "exam_name" },
        { text: "Year", value: "year" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Degree ", value: "degree_code" },
        { text: "Degree Group", value: "degree_group_code" },
        { text: "Session Year", value: "session_year" },
        { text: "Exam Roll", value: "exam_roll" },
        // { text: "Paper Details", value: "mandatory_papers" }
      ];
    },
  },
  methods: {
    downloadExaplanation() {
      let param = this.downParam;
      param.reg_no = this.searchParam.reg_no;
      param.type = "1";
      param.paper_code = this.searchParam.paper_code;
      this.$store.dispatch("exportExplanation", param);
    },
     downloadExpelled() {
      let param = this.downParam;
      param.reg_no = this.searchParam.reg_no;
      param.type = "1";
      param.paper_code = this.searchParam.paper_code;
      this.$store.dispatch("exportExpelledForm", param);
    },
    
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
     removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
     removeCourse(item) {
      const index = this.subParam.paper_code.indexOf(item.paper_code);
      if (index >= 0) this.subParam.paper_code.splice(index, 1);
    },
    searchFormFillupList() {
      this.loading = true;
      this.openStat = true;
      this.setLimit();
      var that = this;
      this.$store
        .dispatch("searchFormFillup", this.searchParam)
        .then((data) => {
          // console.log("data---aitase", data.data[0].center_name);
          if (data.data.length) {
            that.show = false;
            console.log("..", that.show);
          } else {
            that.show = true;
          }
          that.subParam.exam_roll_no = data.data[0].exam_roll;
          that.subParam.ac_session = data.data[0].session_year;
          that.subParam.center_code = parseInt(data.data[0].center_code);
          that.subParam.center_name = data.data[0].center_name;
          // that.subParam.year = parseInt(data.data[0].year);
          that.subParam.college_code = parseInt(data.data[0].college_code);
          that.subParam.reg_no = parseInt(data.data[0].reg_no);
          that.subParam.subject_code = [data.data[0].subject_code];
          console.log("that.searchParam.center_code----->",that.searchParam.center_code)
          that.subjectWisePaper = data.data[0].details;
          console.log("that.searchParam.ac_session",data.data[0].session_year)
          that.loading = false;
          that.sl_count = data.meta.from;
          that.pagination.totalItems = data.meta.total;
          that.e13 = 2;
        });
    },
    getStatusName(stdStatus, tchStatus) {
      var statusName = stdStatus == 0 ? "Std : No " : "Std : Yes ";
      statusName += tchStatus == 0 ? "Tch : No " : "Tch : Yes ";
      return statusName;
    },

    showPaperDetails(details) {
      this.paperDialog = true;
      this.details = details;
      // console.log(details);
    },

    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    close() {
      console.log(this.dialogStatus);
      // this.$store.commit("UNSET_FORM_FILLUP_DATA");
      this.openStat = false;
      this.$emit("update:dialogStatus", false);
      // this.searchParam = {
      //   reg_no: "",
      //   //exam_code: "",
      //   paper_code: "",
      //   center_code: "",
      //   full: true,
      //   admitcard: false,
      //   final: true
      // };
      this.searchParam.reg_no = "";
      this.searchParam.paper_code = [];
      this.reason = "";
      this.policy = "";
    },
    showPapers(papers) {
      let str = "( ";
      papers.forEach((obj, index) => {
        str = str + obj.paper_code;
        if (!(papers.length - 1 == index)) {
          str = str + " , ";
        } else {
          str = str + " )";
        }
      });
      return str;
    },
    openBeforeSubmit() {
      this.beforeSubmit = true;
    },
    submitWithHeld() {
        let postData = this.subParam;
        
        postData.policy = this.policy;
        postData.type = 1;
        
        var that = this;
        console.log("..print ", JSON.stringify(postData));
        this.$store
          .dispatch("withHeldReportedStudentAdd", postData)
          .then((data) => {
            that.searchRepWithheldList();
            that.close();
          });
      
    },
    paperString(papers) {
      let s = "";
      papers.forEach((paper, i) => {
        if (i != 0) {
          s = s + "," + paper.paper_code;
        } else {
          s = s + paper.paper_code;
        }
      });
      return s;
    },
    removeSub(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      console.log("..mtu", this.ifCenterItem);
      this.show = true;
    },
    dialog(val) {
      if (!val) this.close();
    },
    // pagination() {
    //   if (this.dialog) this.searchFormFillupList();
    // },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}

.v-stepper__content {
}
.table {
  border-collapse: collapse;
}

.a {
  border: 1px solid black;
}
.b{
  border-collapse: collapse;
}

</style>
