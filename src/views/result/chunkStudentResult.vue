            <template>
              <v-container fluid>
                <v-card v-if="publishState == 1">
                  <v-alert :value="true" type="info">{{ publishMsg }}</v-alert>
                </v-card>
                <v-expansion-panel class="mb-3 mt-3" inset v-model="open">
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
                             v-model="searchParam.college_code"
                             class="ma-2"
                             name="college_code"
                             label="College Code"
                             prepend-icon="edit"
                          ></v-text-field>
                        </v-flex>          
                      
                        <v-flex xs12 sm12 md12 class="mb-3">
                          <v-layout justify-center row fill-height align-center>
                            <v-btn outline round large @click="getStdCustApplicationList()">
                              <v-icon left dark>search</v-icon>Search
                            </v-btn>
                          </v-layout>
                        </v-flex>

                    </v-layout>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                
                  <formDialog
                    :dialogStatus.sync="formDialogStatus"
                    :editedData="editedItem"
                    :reviseDetail="reviseDetail"
                    :editedPaperData="editedPaperData"
                    :indexEdited.sync="editedIndex"
                    :paperInfoData.sync="paperInfo"
                    :getChunkStudentDataList.sync="getChunkStudentDataList"
                    :getPaperDetailsMeth.sync="getPaperDetailsMeth"
                    :publishState="publishState"
                    :getStdAppPaperData="getStdAppPaperData"
                    :paperInfoInDialog="paperInfoInDialog"
                    :currentPaperCode="currentPaperCode"
                  ></formDialog>
                
                  <formDialogPractical
                   :dialogStatus.sync="formDialogPractical"
                   :getPaperDetailsMeth.sync="getPaperDetailsMeth"
                   :paperInfoInDialog="paperInfoInDialog"
                   :currentPracticalMark="currentPracticalMark"
                   :currentPracticalFullMark="currentPracticalFullMark"
                   :currentPaperCode="currentPaperCode"
                   :practicalExamType="practicalExamType"
                   :vivaExamType="vivaExamType"
                   :currentVivaMark="currentVivaMark"
                   :currentVivaFullMark="currentVivaFullMark"
                  ></formDialogPractical>
               
                <!-- shanita -->
            <v-dialog v-model="paperDialog" persistent fullscreen>
               
                <v-card color="white" height="2000px" flat>
                  <v-card color="primary" flat>

                    <v-card-title>
                      <span class="headline white--text">Course Detail</span>
                      <v-spacer></v-spacer>
                      <v-btn
                        fab
                        class="ma-0 pa-0"
                        small
                        color="white black--text "
                        @click="close"
                        
                      >
                        <v-icon medium>close</v-icon>
                      </v-btn>
                    </v-card-title>
                  </v-card>
                  <!-- {{stdAppPaperData}} -->
                  <!-- {{getStudentApplicationPaperData}} -->
                  <!-- {{getStudentApplicationPaperData.details}} -->
                  <v-data-table
                    :loading="loading"
                    :headers="headersPaper"
                    :items="getStudentApplicationPaperData.details"
                    class="elevation-1 mytablePap"
                    hide-actions
                  >
                    <template v-slot:items="props">
                      <td class="text-xs-left">{{ props.index + 1 }}</td>
                      <!-- <td class="text-xs">{{ props.item.installment_no }}</td> -->
                        <td class="text-xs">{{ props.item.paper_code }}-{{ props.item.paper_name }}</td>
                        <td class="text-xs-center">{{ props.item.incourse_mark }}</td>
                        <td class="text-xs-center">{{ props.item.practical_mark }}
                         <!-- {{props.item.paper_type}} -->
                          <v-btn fab small color="primary" v-on="on" align="right" v-if="props.item.paper_type == '2' && props.item.practical_mark == null">
                                <v-icon
                                  @click="addPracticalMarkBtn(props.item)"
                                  class="mr-0"
                                  color="white"
                                  >add_task</v-icon
                                >
                              </v-btn>
                         
                        </td>
                        <td class="text-xs-center">
                          {{ props.item.viva_mark }}
                          <v-btn fab small color="primary" v-on="on" align="right" v-if="props.item.paper_type == '3' &&  props.item.viva_mark == null">
                                <v-icon
                                  @click="addVivaMarkBtn(props.item)"
                                  class="mr-0"
                                  color="white"
                                  >add_task</v-icon
                                >
                              </v-btn>
                        </td>
                        <td class="text-xs-center">{{ props.item.letter_grade }}</td>
                        <td class="text-xs" >
                          <table style="width:100%" class="gridTableClass1">
                            <tr>
                              <th class="gridTableClass1" style="width:50%">Note</th>
                              <th class="gridTableClass1" style="width:50%">Category</th> 
                            </tr>
                            <tr>
                              <td class="gridTableClass1" style="width:50%"><ul>
                            <li>{{ props.item.note_and_app_category[0].note}}</li>                       
                          </ul></td>
                              <td class="gridTableClass1"><ul v-for="noteAppCat in props.item.note_and_app_category">
                            <li>{{noteAppCat.application_category_name}}</li>
                          </ul></td>
                            </tr>
                          </table>
                        </td>
                      <td class="text-xs" v-if="props.item.attendance_status == 0 || props.item.attendance_status == null">       <v-chip
                          color="red"
                        >
                         Absent
                        </v-chip>
                        <v-btn fab small color="primary" v-on="on" align="right">
                                <v-icon
                                  @click="addAttendBtn(props.item)"
                                  class="mr-0"
                                  color="white"
                                  >add_task</v-icon
                                >
                              </v-btn>
                      </td>
                        <td class="text-xs" v-if="props.item.attendance_status == 1 "> <v-chip
                          color="green"
                        >
                         Present 
     
                        </v-chip>
                        <!--  <v-btn fab small color="primary" v-on="on" align="right">
                                <v-icon
                                  @click="addAttendBtn(props.item)"
                                  class="mr-0"
                                  color="white"
                                  >add_task</v-icon
                                >
                              </v-btn> -->
                      </td>
                  
               
                    </template>
                  </v-data-table>
                  
                   <v-card  flat>

                    <v-card-title class="justify-center">
                      
                     
                      <v-btn
                        color="primary"
                        @click="sendBack"                   
                      >
                       Send Back 
                      </v-btn>
                      <v-btn
                        color="green"
                        @click="approveStatus"
                      >
                       Approve 
                      </v-btn>
                      <v-btn                    
                        color="red"
                        @click="cancelStatus"
                      >
                       Cancel 
                      </v-btn>
                    </v-card-title>
                  </v-card>
                  <v-container style="max-width:3000px; " >
                    <div  style="padding:0px; margin:0px;">
                        <table class="gridTableClass" v-if="admitAttachStatus">
                          <tr>
                            <td style="text-align:center"><h3>Admit Card</h3></td>
                          </tr>
                          <tr>
                            <td>
                              <div v-if="!admitfileTypePdf">
                                  <img width="700px" height="600px" :src="admitAttach">
                              </div>
                              <div v-if="admitfileTypePdf">
                                  <iframe :src="admitAttach" width="700px" height="600px"></iframe>
                              </div>
                            
                            </td>
                          </tr>
                        </table>
                        <table class="gridTableClass" v-if="regAttachStatus">
                          <tr>
                            <td style="text-align:center"><h3>Registration Card</h3></td>
                          </tr>
                          <tr>
                            <td >
                              
                              <div v-if="!fileTypePdf">
                              <img width="700px" height="600px" :src="regCardAttach">
                              </div>
                              <div v-if="fileTypePdf">
                              <iframe :src="regCardAttach" width="700px" height="600px"></iframe>
                              </div>
                            </td>

                          </tr>
                        </table>
                        
                    </div>

                      <div class="container" style="padding:0px; margin:0px;">
                        <table class="gridTableClass" v-if="examAttendanceSheetStatus">
                          <tr>
                            <td style="text-align:center"><h3>Exam Attendance Sheet</h3></td>
                          </tr>
                          <tr>
                            <td>
                              <div v-if="!attendanceSheetfileTypePdf">
                                  <img width="700px" height="600px" :src="examAttendanceSheet">
                              </div>
                              <div v-if="attendanceSheetfileTypePdf">
                                  <iframe :src="examAttendanceSheet" width="700px" height="600px"></iframe>
                              </div>
                              
                            </td>
                          </tr>
                        </table>
                        <table class="gridTableClass" v-if="examResultSheetStatus">
                          <tr>
                            <td style="text-align:center"><h3>Exam Result Sheet</h3></td>
                          </tr>
                          <tr>
                            <td>
                               <div v-if="!examResultSheetTypePdf">
                                  <img width="700px" height="600px" :src="examResultSheet">
                              </div>
                              <div v-if="examResultSheetTypePdf">
                                  <iframe :src="examResultSheet" width="700px" height="600px"></iframe>
                              </div>
                              
                             
                            </td>
                          </tr>
                        </table>
                        
                    </div>
                    <div class="container" style="padding:0px; margin:0px;" >
                        <table class="gridTableClass" v-if="examIncourseMarkSheetStatus">
                          <tr>
                            <td style="text-align:center"><h3>Exam Incourse Mark Sheet</h3></td>
                          </tr>
                          <tr>
                            <td>
                               <div v-if="!examIncourseMarkSheetTypePdf">
                                  <img width="700px" height="600px" :src="examIncourseMarkSheet">
                              </div>
                              <div v-if="examIncourseMarkSheetTypePdf">
                                  <iframe :src="examIncourseMarkSheet" width="700px" height="600px"></iframe>
                              </div>
                              
                            <!--   <iframe :src="examIncourseMarkSheet" width="700px" height="600px"></iframe> -->
                            </td>
                          </tr>
                        </table>
                        
                    </div>
                
              </v-container>
              </v-card>
            </v-dialog>
                <v-container fluid>
                  <v-card color="white">
                    <v-layout row>
                      <v-card flat>
                        <v-card-text class="title">Revise Result</v-card-text>
                      </v-card>
                      <v-divider class="my-2" vertical></v-divider>

                      <v-spacer />

                      <v-card-actions>
                        <v-spacer />

                       <!--  <v-btn color="primary" dark @click="newItem">Add New Student</v-btn> -->

                       <!--  <v-btn
                          color="primary"
                          @click="newItem"
                          :disabled="publishState == 1"
                          :dark="publishState != 1"
                          >Add New Student</v-btn
                        > -->
                        <v-btn
                          color="primary"
                          @click="generateDialogOpen()"
                          :dark="publishState == 1 && publishState != 1"
                          :disabled="
                            !getChunkStudentList.length || timeOut || publishState == 1
                          "
                        >
                          Generate</v-btn
                        >
                      </v-card-actions>
                    </v-layout>
                  </v-card>
                  <!-- {{getChunkStudentList}} -->
                  <!-- {{getStudentApplicationData}} -->
                  <v-data-table
                    :loading="loading"
                    :headers="headers"
                    :items="getStudentApplicationData"
                    class="elevation-1 mytable"
                    :total-items="pagination.totalItems"
                    :pagination.sync="pagination"
                    :rows-per-page-items="pagination.rowsPerPageItems"
                  >
                    <template v-slot:items="props">
                      <td class="text-xs" >{{ props.index + 1 }}</td>
                      <!-- <td class="text-xs">{{ props.item.installment_no }}</td> -->
                      <td class="text-xs">{{ props.item.reg_no }}</td>
                      <td class="text-xs">{{ props.item.exam_roll }}</td>
                      <td class="text-xs">{{ props.item.student_name }}</td>
                      <td class="text-xs">{{ props.item.college_code }}-{{props.item.college_name}}</td>
                      <td class="text-xs" v-if="props.item.application_status == 0">       <v-chip
                          color="green"
                        >
                         Approved By Student
                        </v-chip></td>
                        <td class="text-xs" v-if="props.item.application_status == 1"> <v-chip
                          color="#15B660"
                        >
                         Approved By College
                        </v-chip></td>
                        <td class="text-xs" v-if="props.item.application_status == 2"> <v-chip
                          color="#15AFB6"
                        >
                         Accept By Admin
                        </v-chip></td>
                        <td class="text-xs" v-if="props.item.application_status == 3"> <v-chip
                          color="#157EB6"
                        >
                         Processing by Admin
                        </v-chip></td>
                         <td class="text-xs" v-if="props.item.application_status == 4"> <v-chip
                          color="green"
                        >
                         Process Complete
                        </v-chip></td>
                         <td class="text-xs" v-if="props.item.application_status == 5"> <v-chip
                          color="#B69615"
                        >
                         Send back by Admin
                        </v-chip></td>
                          <td class="text-xs" v-if="props.item.application_status == 6"> <v-chip
                          color="red"
                        >
                         Application Cancel
                        </v-chip></td>
                      <!-- <td class="text-xs">
                        {{ props.item.student.subject.subject_code }}-{{
                          props.item.student.subject.subject_name
                        }}
                      </td>
                      <td class="text-xs">
                        {{ props.item.student.college.college_code }}-{{
                          props.item.student.college.college_name
                        }}
                      </td> -->
                      <td class="text-xs">
                   
                        <v-btn outline color="info" @click="showPaperDetails(props.item)">
                          <span>Course Details</span>
                        </v-btn>
                      </td>

                      
                    </template>
                  </v-data-table>
                </v-container>
                <v-dialog v-model="generateDialog" persistent max-width="750px">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Result Generate</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-textarea
                              class="mt-3 ml-2 mr-2"
                              name="installment_id"
                              rows="1"
                              auto-grow
                              label="Installment Number wise Generate"
                              v-model="installment_id"
                              data-vv-name="installment_id"
                              v-validate="'required'"
                              :error-messages="errors.collect('installment_id')"
                              prepend-icon="edit"
                            ></v-textarea>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        large
                        flat
                        @click="generateDialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn flat large @click="validationForm()" color="primary"
                        >Generate Result</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-container fluid v-if="getResultProgressList.length > 0">
                  <v-card>
                    <v-card color="white">
                      <v-layout row>
                        <v-card flat>
                          <v-card-text class="title">Current Status</v-card-text>
                        </v-card>
                        <v-divider class="my-2" vertical></v-divider>
                        <v-spacer />
                        <v-btn
                          small
                          fab
                          :loading="getProgressLoading"
                          @click="getProgress()"
                        >
                          <v-icon>refresh</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-card>
                    <v-data-table
                      :headers="headersProgress"
                      :items="getResultProgressList"
                      class="elevation-1"
                    >
                      <template v-slot:items="props">
                        <td class="text-xs-left">
                          {{ props.item.exam_code }} - {{ props.item.exam_name }}
                        </td>
                        <td class="text-xs-center">{{ props.item.exam_year }}</td>
                        <td class="text-xs-center">{{ props.item.total_student }}</td>
                        <td class="text-xs-center">{{ props.item.completed_student }}</td>
                        <td class="text-xs-center">
                          <div class="lang">{{ props.item.completed_student }}</div>
                          <span>Completed Examinee</span>
                          <v-progress-linear
                            class="custom"
                            :background-color="
                              findBackcolor(
                                100 /
                                  (props.item.total_student / props.item.completed_student)
                              )
                            "
                            :color="
                              findcolor(
                                100 /
                                  (props.item.total_student / props.item.completed_student)
                              )
                            "
                            :height="20"
                            :value="
                              100 /
                                (props.item.total_student / props.item.completed_student)
                            "
                          >
                            <strong
                              :class="
                                getClass(
                                  100 /
                                    (props.item.total_student /
                                      props.item.completed_student)
                                )
                              "
                              >{{
                                getVal(
                                  100 /
                                    (props.item.total_student /
                                      props.item.completed_student)
                                )
                              }}%
                            </strong>
                            <div
                              class="progress"
                              :style="{
                                background: findcolor(
                                  100 /
                                    (props.item.total_student /
                                      props.item.completed_student)
                                ),
                                width:
                                  getVal(
                                    100 /
                                      (props.item.total_student /
                                        props.item.completed_student)
                                  ) + '%',
                              }"
                            ></div>
                          </v-progress-linear>
                          <span class="lang2">0</span>
                          <span class="lang3">{{ props.item.total_student }}</span>
                        </td>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-container>
              </v-container>
            </template>

            <script>
            import formDialog from "@/components/result/chunkStudentResultForm.vue";
            import formDialogPractical from "@/components/result/formDialogPractical.vue";
            import commonGet from "../../mixin/common_getters_mixin";
            import commonExamYear from "../../mixin/exam_year_watch_mixin";
            import common_login_getters from "../../mixin/common_login_getters";
            import common_activities_get from "@/mixin/get_activities_time_publish";
            export default {
              mixins: [
                commonGet,
                commonExamYear,
                common_login_getters,
                common_activities_get,
              ],
              components: {
                formDialog,formDialogPractical
              },
              $_veeValidate: {
                validator: "new",
              },
              data() {
                return {
                  dictionary: {
                    custom: {
                      installment_id: {
                        required: () => "Provide Installment Number",
                      },
                    },
                  },
                  pagination: {
                    rowsPerPage: 10,
                    rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
                  },
                  limit: {},
                  admitAttach: "",
                  regCardAttach: "",
                  extensionExamIncourseMarkSheetFile:"",
                  examAttendanceSheet: "",
                  examResultSheet: "",
                  admitAttachStatus:false,
                  regAttachStatus: false,
                  
                  examResultSheetStatus:false,
                  reviseDetails: [],
                  searchParam: {},
                  statusChangeParam:{},
                  toggle_exclusive: 0,
                  totalDataItems: 0,
                  loading: false,
                  mailDialogStatus: false,
                  dialog: false,
                  formDialogStatus: false,
                  formDialogPractical:false,
                  search: "",
                  dummyPdf : "http://103.4.145.242:8006/storage/pdf/center_lists/center_lists.pdf",
                  headers: [
                    {
                      text: "SL.",

                      value: "id",
                      width: "10",
                      sortable: false,
                    },
                    {
                      text: "Registration No",
                      value: "reg_no",

                      sortable: false,
                    },
                    
                    {
                      text: "Exam Roll",
                      value: "exam_roll",

                      sortable: false,
                    },
                    {

                      text: "Student Name",
                      value: "student_name",
                      sortable: false,
                    },
                    {
                      text: "College",
                      value: "college_code",
                      align: "center",
                      sortable: false,
                    },
                    {
                      text: "Status",
                      value: "active",
                      align: "center",
                      sortable: false,
                    },
                    { text: "Action", align: "center", sortable: false },
                  ],
                  headersPaper: [
                    {
                      text: "SL.",
                      value: "id",
                      width: "1%",
                      sortable: false,
                    },
                    {
                      text: "Course",
                      value: "paper_code",
                      width: "20%",
                      sortable: false,
                    },
                    
                    {
                      text: "Incourse Mark",
                      value: "incourse_mark",
                    
                      sortable: false,
                    },
                    {

                      text: "Practical Mark",
                      value: "practical_mark",
                      width: "5%",
                      sortable: false,
                    },
                    {
                      text: "Viva Mark",
                      value: "viva_mark",
                      align: "center",
                      width: "5%",
                      sortable: false,
                    },
                      {
                      text: "Letter Grade",
                      value: "letter_grade",
                      align: "center",
                      width: "5%",
                      sortable: false,
                    },
                     {
                      text: "Note",
                      value: "note",
                      align: "center",
                      width: "60%",
                      sortable: false,
                    },
                    {
                      text: "Attendance Status",
                      value: "active",
                      align: "center",
                      width: "5%",
                      sortable: false,
                    },
                    
                  ],
                  editedIndex: -1,
                  currentVivaFullMark:"",
                  editedItem: {},
                  editedPaperData: {},
                  smsList: [],
                  paperInfo: [],
                  stdAppPaperData:[],
                  currentPracticalMark: "",
                  currentPracticalFullMark: "",
                  exam_name: "",
                  exam_year: "",
                  ex_code: "",
                
                  paperParam:{},
                  reviseDetail: [],
                  currentPaperCode: "",
                  appliedStudentData: [],
                  practicalExamType: false,
                  vivaExamType: false,
                  paperDialog: false,
                  paperInfoInDialog: "",
                  param: {},

                  regFileName:"",
                  admitFileName:"",
                  extensionAdmitFile:"",
                  admitfileTypePdf:true,
                  examResultSheetTypePdf:true,
                  examIncourseMarkSheetTypePdf:true,
                  extensionRegFile:"",
                  fileTypePdf:true,
                  loadingPro: false,
                  getProgressLoading: false,
                  AttachmentDetail:{},
                  examIncourseMarkSheet:"",
                  examIncourseMarkSheetStatus:false,
                  examAttendanceSheetStatus:false,
                  attendanceSheetfileTypePdf:true,
                  extensionexamResultSheetFile:"",
                  interval: 0,
                  currentVivaMark:"",
                  attendanceSheetFileName:"",
                  extensionAttendanceSheetFile:"",
                  headersProgress: [
                    {
                      text: "Exam",
                      value: "exam_code",
                      align: "left",
                      sortable: false,
                      width: "10%",
                    },
                    {
                      text: "Year",
                      value: "year",
                      align: "center",
                      sortable: false,
                      width: "5%",
                    },
                    {
                      text: "Total Examinee",
                      value: "total_student",
                      align: "center",
                      sortable: false,
                      width: "10%",
                    },
                    {
                      text: "Completed Examinee",
                      value: "completed_student",
                      align: "center",
                      sortable: false,
                      width: "10%",
                    },
                    {
                      text: "Progress Visually",
                      value: "completed_student",
                      align: "center",
                      sortable: false,
                      width: "50%",
                    },
                  ],
                  generateDialog: false,
                  stdCustAppDatailStatus: false,
                  installment_id: "",
                };
              },
              beforeDestroy() {
                window.clearInterval(this.interval);
              },
              created() {
                this.searchParam.exam_initiate_id = this.getExamInitiateId;
                this.getProgress();
                //get activities time & status
                this.paramTimePublishBoth.exam_initiate_id = this.getExamInitiateId;
                this.paramTimePublishBoth.exam_code = this.getLoggedInExam.code;
                this.paramTimePublishBoth.year = this.getLoggedInYear.year;
                this.paramTimePublishBoth.activity_tag =
                  "CorrectedResultGenerateandPublish";
                this.paramTimePublishBoth.limit = -1;
                this.getTimePublishStatusBoth();
              },
              watch: {
                pagination() {
                  this.getStdCustApplicationList();
                  // this.getChunkStudentDataList();
                },

                getStdAppPaperData(val){
                  console.log("val stdAppPaperData",stdAppPaperData);
                },
                // loadData: {
                //   handler(status) {
                //     if (status) this.showPaperDetails();
                //     this.loadData = false;
                //   }
                // }
                getResultProgressList(val) {
                  console.log("lets see", val);
                  if (val.length) {
                    if (val[0].completed_student == val[0].total_student) {
                      window.clearInterval(this.interval);
                    }
                  } else {
                    window.clearInterval(this.interval);
                  }
                },
                //after generate button click on mounted interval off as on generate interval called
                loadingPro(val) {
                  if (val) {
                    window.clearInterval(this.interval);
                  }
                },
              },
              computed: {
                getChunkStudentList() {
                  return this.$store.getters.getChunkStudentItem;
                },
                getStudentApplicationPaperData() {
                return this.$store.getters.getStudentApplicationPaperData;
                },
                getResultProgressList() {
                  return this.$store.getters.getResultProgressList;
                },
                getStudentApplicationData() {
                  return this.$store.getters.getStudentApplicationData;
                },
                 admitAttachFunction(){
                  return this.admit_card;
                },
                getStdAppPaperData(){
                  return this.stdAppPaperData;
                }
              },
              mounted() {
                this.$validator.localize("en", this.dictionary);
                this.$store.commit("UNSET_FORMNOTIFY");
                this.ifSearchExam = true;
                this.ifSearchYear = true;
                //on reload page interval call
                if (!this.getResultProgressList.length) {
                  console.log("----> ");
                  this.callInterval();
                }
                //on page change onreload interval off and on page change interval call
                if (this.getResultProgressList.length) {
                  console.log("----> ");
                  // window.clearInterval(this.interval);
                  this.callInterval();
                }
              },
              methods: {
                generateDialogOpen() {
                  this.generateDialog = true;
                },
                getSt(val) {
                  if (val == 100) {
                    return false;
                  } else {
                    return true;
                  }
                },
                findBackcolor(val) {
                  console.log("back", val);
                  if (val == 100) {
                    return "green darken-2";
                  } else if (val >= 50) {
                    return "blue lighten-4";
                  } else {
                    return "orange lighten-4";
                  }
                },
                findcolor(val) {
                  console.log(val);
                  if (val == 100) {
                    return "#388e3c";
                  } else if (val >= 50) {
                    return "#0288d1";
                  } else {
                    return "#f57c00";
                  }
                },
                getVal(val) {
                  return Math.floor(val);
                  // if(val == 100){}
                },
                getClass(val) {
                  if (val == 100) {
                    return "textWhite";
                  } else {
                    return "textBlack";
                  }
                },
                setParam() {
                  this.param.exam_code = this.searchParam.exam_code;
                  //this.param.exam_year = this.searchParam.year;
                  this.param.exam_initiate_id = this.getExamInitiateId;
                  this.param.year = this.searchParam.year;
                  this.param.type = "Installment";
                  this.param.college_codes = null;
                  this.param.reg_nos = null;
                  this.param.installment_id = this.installment_id;
                },
                validationForm() {
                  this.$validator.validateAll().then((isValid) => {
                    if (isValid) {
                      console.log("here");
                      this.submit();
                    } else {
                      this.$store.commit("SET_SNACKBAR", {
                        msg: "Please Provide Installment Number ",
                        color: "red",
                      });
                    }
                  });
                },

                submit() {
                  this.loadingPro = true;
                  this.setParam();
                  var self = this;
                  this.$root
                    .$confirm("Are you sure that you want to Generate?")
                    .then((confirm) => {
                      if (confirm) {
                        this.$store
                          .dispatch("callResultGenerate", this.param)
                          .then((data) => {
                            console.log("data---", data);
                            self.loadingPro = false;
                            self.generateDialog = false;
                            self.getProgress();
                            self.callInterval();
                          });
                      }
                    });
                },
                callInterval() {
                  var self = this;
                  self.interval = window.setInterval(() => self.getProgress(), 5000);
                },
                getProgress() {
                  this.getProgressLoading = true;
                  this.setParam();
                  this.$store.dispatch("resultGenerateProcess", this.param).then((data) => {
                    console.log("data", data);
                    this.getProgressLoading = false;
                  });
                },
                setLimit() {
                  const { sortBy, descending, page, rowsPerPage } = this.pagination;
                  this.searchParam.page = page;
                  this.searchParam.limit = rowsPerPage;
                  this.searchParam.sort = sortBy;
                  this.searchParam.search = this.search;
                },
               
                getChunkStudentDataList() {
                  this.loading = true;
                  this.openStat = true;
                  this.setLimit();
                  var self = this;
                  this.$store
                    .dispatch("callChunkStudentData", this.searchParam)
                    .then((data) => {
                      self.paperInfo = data.data;
                      self.loading = false;
                      self.sl_count = data.data.from;
                      self.pagination.totalItems = data.data.total;
                    });
                },
                getStdCustApplicationList() {
                  this.loading = true;
                  this.openStat = true;
                  this.setLimit();
                  this.searchParam.exam_year = this.searchParam.year;

                  this.$store
                    .dispatch("callStudentApplicationData", this.searchParam)
                    .then((data) => {
                      console.log("data show to get",data);
                      this.paperInfo = data.data;
                      this.loading = false;
                      this.sl_count = data.data.from;
                      this.pagination.totalItems = data.data.total;
                    });
                },
                exportRegCenterListClick() {
                  this.$store.dispatch("exportRegCenterList");
                },
                unSetEditedData() {
                  this.editedItem = {
                    id: "",
                    chunk_no: "",
                    reg_no: "",
                    paper_info: [
                      {
                        paper_code: "",
                        paper_name: "",
                      },
                    ],
                    created_at: "",
                    updated_at: "",
                    deleted_at: "",
                    created_by: "",
                    updated_by: "",
                    deleted_by: "",
                  };
                },
                editedIndexMeth(item) {
                  console.log("myyy", item.result_status_name);
                },
                showPaperDetails(details) {
                  console.log("yes called",details);
                  this.paperDialog = true;
                  this.paperParam.reg_no = details.reg_no;
                  this.paperParam.exam_initiate_id = this.getExamInitiateId;
                  this.paperParam.exam_code = this.searchParam.exam_code;
                  this.paperParam.exam_year = this.searchParam.year;
                  this.paperParam.application_id = details.id;
                  
                   this.$store
                    .dispatch("callStudentApplicationPaperData", this.paperParam)
                    .then((data) => {
                      console.log("fdfdff",data.attchment);
                      this.AttachmentDetail = data.attchment;
                      if(data.attchment.admit_card != null){
                        this.admitAttachStatus = true;
                        this.admitAttach = "http://103.4.145.242:8006/" + data.attchment.admit_card;

                        this.admitFileName = this.admitAttach;
                        
                        this.extensionAdmitFile = this.admitFileName.split('.').pop();
                        
                        if(this.extensionAdmitFile != "pdf"){
                          this.admitfileTypePdf = false;
                        }
                        else
                          this.admitfileTypePdf = true;
                      }
                      if(data.attchment.reg_card != null){
                        this.regAttachStatus = true;
                        this.regCardAttach = "http://103.4.145.242:8006/" + data.attchment.reg_card;
                        this.regFileName = this.regCardAttach;
                        console.log("this.regFileName",this.regFileName);
                        this.extensionRegFile = this.regFileName.split('.').pop();
                        console.log("this.extensionRegFile",this.extensionRegFile);
                        if(this.extensionRegFile != "pdf"){
                          this.fileTypePdf = false;
                        }
                        else
                          this.fileTypePdf = true;
                      }
                      if(data.attchment.exam_attendance_sheet != null){
                        examAttendanceSheetStatus = true;
                        this.examAttendanceSheet = "http://103.4.145.242:8006/" + data.attchment.exam_attendance_sheet;
                        this.attendanceSheetFileName = this.examAttendanceSheet;
                        
                        this.extensionAttendanceSheetFile = this.attendanceSheetFileName.split('.').pop();
                        
                        if(this.extensionAttendanceSheetFile != "pdf"){
                          this.attendanceSheetfileTypePdf = false;
                        }
                        else
                          this.attendanceSheetfileTypePdf = true;
                      }
                      if(data.attchment.exam_result_sheet != null){
                        examResultSheetStatus = true;
                        this.examResultSheet = "http://103.4.145.242:8006/" + data.attchment.exam_attendance_sheet;

                        this.extensionexamResultSheetFile = this.examResultSheet.split('.').pop();
                        
                        if(this.extensionexamResultSheetFile != "pdf"){
                          this.examResultSheetTypePdf = false;
                        }
                        else
                          this.examResultSheetTypePdf = true;

                      }
                      if(data.attchment.exam_incourse_mark_sheet != null){
                        examIncourseMarkSheetStatus = true;
                        this.examIncourseMarkSheet = "http://103.4.145.242:8006/" + data.attchment.exam_incourse_mark_sheet;

                        this.extensionExamIncourseMarkSheetFile = this.examIncourseMarkSheet.split('.').pop();
                        
                        if(this.extensionExamIncourseMarkSheetFile != "pdf"){
                          this.examIncourseMarkSheetTypePdf = false;
                        }
                        else
                          this.examIncourseMarkSheetTypePdf = true;
                      } 
                     
             
                    });
                  
                },
                getPaperDetailsMeth(){

                 this.$store.dispatch("callStudentApplicationPaperData", this.paperParam);
                },
                setAppStatusChangeParam() {
                 
                  this.statusChangeParam.exam_initiate_id = this.getExamInitiateId;
                  this.statusChangeParam.exam_code = this.searchParam.exam_code;
                  this.statusChangeParam.exam_year = this.searchParam.year;
                  this.statusChangeParam.application_id = this.paperParam.application_id ;

                },
                sendBack(){
                     this.setAppStatusChangeParam();
                     this.statusChangeParam.application_status = "5";
                        this.$root
                .$confirm("Are you sure that you want to send back?")
                .then((confirm) => {
                  if (confirm) {
                   this.$store.dispatch("putApplicationDataStatusChange", this.statusChangeParam);
                  }
                });
                     
                    },
               approveStatus(){

                   this.setAppStatusChangeParam();
                   this.statusChangeParam.application_status = "2";

                  this.$root
                .$confirm("Are you sure that you want to approve?")
                .then((confirm) => {
                  if (confirm) {
                   this.$store.dispatch("putApplicationDataStatusChange", this.statusChangeParam);
                  }
                });
                     
                  },
                cancelStatus(){
                 this.setAppStatusChangeParam();
                 this.statusChangeParam.application_status = "6";
                 this.$root
                .$confirm("Are you sure that you want to cancel?")
                .then((confirm) => {
                  if (confirm) {
                   this.$store.dispatch("putApplicationDataStatusChange", this.statusChangeParam);
                  }
                });
                },
                close(){
                  this.paperDialog = false;
                  this.searchParam.exam_year = this.searchParam.year;
                  this.$store
                    .dispatch("callStudentApplicationData", this.searchParam)
                    .then((data) => {
                      console.log("data show to get",data);
                      
                      this.loading = false;
                      this.sl_count = data.data.from;
                      this.pagination.totalItems = data.data.total;
                    });
                },
                addAttendBtn(item) { 
                  this.paperInfoInDialog =  item.paper_code + '-' + '(' + item.paper_name + ')'; 
                  this.currentPaperCode = item.paper_code;         
                  this.dialogOpen();
                },
                addPracticalMarkBtn(item) {
                  console.log("this item",item) ;
                  this.paperInfoInDialog =  item.paper_code + '-' + '(' + item.paper_name + ')';
                  this.practicalExamType = true;
                   this.vivaExamType = false;
                  this.currentPaperCode = item.paper_code;
                  this.currentPracticalMark =  item.practical_mark;  
                  this.currentPracticalFullMark =  item.full_mark;         
                  this.practicalMarkDialogOpen();
                },
                addVivaMarkBtn(item) {
                  console.log("this item",item) ;
                  this.paperInfoInDialog =  item.paper_code + '-' + '(' + item.paper_name + ')';
                  this.vivaExamType = true;
                  this.practicalExamType = false;
                  this.currentPaperCode = item.paper_code;
                  this.currentVivaMark =  item.viva_mark;  
                  this.currentVivaFullMark =  item.full_mark;         
                  this.practicalMarkDialogOpen();
                },
                attendanceDialog(item) {
                  this.reviseDetail = item.revise_detail;

                  this.editedIndex = this.getChunkStudentList.indexOf(item);
                  this.editedItem = Object.assign({}, item);
                  this.editedPaperData = item.revise_detail;
                  console.log("this.editedPaperData", this.editedPaperData);

                  this.dialogOpen();
                },
                dialogOpen() {
                  this.formDialogStatus = true;
                },
                practicalMarkDialogOpen() {
                  this.formDialogPractical = true;
                },
                newItem() {
                  var self = this;
                  self.unSetEditedData();
                  self.dialogOpen();
                  let param = {};
                  param.exam_code = this.searchParam.exam_code;
                  param.exam_year = this.searchParam.year;
                  this.$store.dispatch("callStudentApplicationData", param).then((data) => {
                    console.log("data show ", data.data);
                    this.appliedStudentData = data.data;
                    console.log("appliedStudentData", this.appliedStudentData);
                    // this.paperInfo = data.data;
                    // this.loading = false;
                    // this.sl_count = data.data.from;
                    // this.pagination.totalItems = data.data.total;
                  });
                  this.$store.dispatch("callCategoryData");
                  // this.$store.dispatch("callStudentApplicationData",param);
                },
                generateReport() {
                  console.log("..m clcik");
                  this.$store.commit("SET_LOADING", { color: "primary" });
                  this.$refs.html2Pdf.generatePdf();
                  setTimeout(() => {
                    this.$store.commit("UNSET_LOADING"); // loading Closing
                  }, 5000);
                },
                deleteItem(item) {
                  const id = item.id;
                  let self = this;
                  this.$root
                    .$confirm("Are you sure that you want to delete?")
                    .then((confirm) => {
                      if (confirm) {
                        this.$store
                          .dispatch("deleteChunkResultItem", id)
                          .then(function() {
                            self.setLimit();
                            self.$store.dispatch("callChunkStudentData", self.limit);
                            // self.snackbar = true;
                          })
                          .catch(function(error) {
                            console.log(error);
                            self.setLimit();
                            self.$store.dispatch("callChunkStudentData", self.limit);
                          });
                      }
                    });
                },
              },
            };
            </script>

            <style lang="scss">
            .gridTableClass1{
              border: 1px solid black;
              border-collapse: collapse;
            }
            .gridTableClass {
              float:left;
                width:50%;
                 border: 1px solid black;
              border-collapse: collapse;
            }
            .myCustomTable {
               border: 1px solid black;
              border-collapse: collapse;
            }
            .collapse {
              border-collapse: collapse;
            }
            .mytable .theme--light.v-table tbody tr:not(:last-child) {
              // border-bottom: none;
              padding: 0%;
            }

            .mytable table.v-table tbody td:not(:nth-child(1)) {
              padding: 0 5px;
            }
            .mytable table.v-table tbody td:first-child {
              padding: 0%;
            }
            .mytable{
              padding: 1%;
            }

            .progress {
              float: left;
              padding: 10px;
              border-radius: 2px;
            }

            .custom {
              margin: 5px;
              border-radius: 2px;
              overflow: hidden;
            }
            .lang {
              margin: 2px;
              font-size: 25px;
              font-weight: bold;
              color: rgb(116, 19, 103);
            }
            .lang2 {
              margin-left: 3px;
              font-size: 20px;
              font-weight: bold;
              color: rgb(40, 19, 116);
              /* background-image: repeating-linear-gradient(0deg, blue, green 40%, red); */
              background-color: none;
              float: left;
            }
            .lang3 {
              margin: 3px;
              font-size: 20px;
              font-weight: bold;
              color: rgb(40, 19, 116);
              background-color: none;
              float: right;
            }
            .textWhite {
              color: white;
              float: center !important;
              font-size: large;
            }
            .textBlack {
              color: black;
              float: right !important;
              font-size: large;
              margin-top: -4px !important;
            }
            .mytablePap .theme--light.v-table thead tr th:nth-child(3) {
              
              
               white-space:initial;
            }
            .mytablePap .theme--light.v-table thead tr th:nth-child(4) {
              
              
               white-space:initial;
            }
            .mytablePap .theme--light.v-table thead tr th:nth-child(5) {
              
              
               white-space:initial;
            }
              .mytablePap .theme--light.v-table thead tr th:nth-child(6) {
              
              
               white-space:initial;
            }
            .mytablePap .theme--light.v-table thead tr th:nth-child(8) {
              
              
               white-space:initial;
            }
            .mytablePap{
              padding: 1%;
            }
            </style>
