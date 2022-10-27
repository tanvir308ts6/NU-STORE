  <template>
    <!-- <v-container fluid>
     
    </v-container> -->
    <div class="form">
      <v-dialog v-model="dialog" max-width="800px" persistent>
        <v-card>
          <!-- {{getStudentApplicationPaperData}} -->
            <!-- {{paperInfoInDialog}} -->
          <!-- {{currentPaperCode}} -->
          <!-- {{practicalExamType}} -->
          <!-- {{currentPracticalFullMark}} -->
          
          <v-card color="primary" flat>
            <v-card-title>
              <span class="headline white--text">Practical Mark Entry</span>
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
            <formNotification />
          </v-card>
          <v-card-text>
           

            <v-form>
              
              <v-text-field
                readonly
                name="reg_no"
                label="Registration No"
                v-model="getStudentApplicationPaperData.attchment.reg_no"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('reg_no')"
                data-vv-name="reg_no"
                required
              ></v-text-field>
              <v-text-field
                readonly
                name="paper_code"
                label="Paper Code"
                v-model="paperInfoInDialog"
              ></v-text-field>
              <div v-if="vivaExamType">
              <v-text-field
                name="viva_mark"
                label="Viva mark"
                v-model="vivaMarkAdd"
                v-validate="'required|numeric'"
                 :error="getErrorMessageViva(vivaMarkAdd)"
                :error-messages="errors.collect('viva_mark')"
                data-vv-name="viva_mark"
                required
              ></v-text-field>
              <p style="color:#B61E08;" v-if="messageReturn">Mark Must be less or equals to full marks</p>
            </div>
              <div v-if="practicalExamType">
               
              <v-text-field
                name="practical mark"
                label="Practical Mark"
                v-model="practicalMarkAdd"
                v-validate="'required|numeric'"
                :error="getErrorMessagePractical(practicalMarkAdd)"
                :error-messages="errors.collect('practical_mark')"
                data-vv-name="practical_mark"
                required
              ></v-text-field>
              <p style="color:#B61E08;" v-if="messageReturn">Mark Must be less or equals to full marks</p>
             </div>
              <!--  <div v-if="vivaExamType">
              <v-text-field
                name="viva_mark"
                label="Viva Mark"
                v-model="vivaMarkAdd"
                data-vv-name="viva_mark"
                v-validate="'required|numeric'"
                type="number" min="0"
                :error="getErrorStatusPractical(vivaMarkAdd)" 
                :error-messages="getErrorMessagePractical(vivaMarkAdd)"               
              ></v-text-field>
             </div> -->
         </v-form>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-layout justify-center>
              <!--    <v-btn
              color="primary  white--text"
              @click="save()"
            >Save</v-btn> -->

             <!--  <v-btn
                color="primary  white--text"
                @click.stop.prevent="validationForm()"
                :disabled="publishState == 1"
                :dark="publishState != 1"
                >{{ buttonTitle }}</v-btn
              > -->
               <v-btn
                color="primary  white--text"
                @click.stop.prevent="validationForm()"
                >{{ buttonTitle }}</v-btn
              >
              <!-- <v-btn color="primary  white--text" @click="clear">Reset</v-btn> -->
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
  import formNotification from "@/components/utils/formNotification";
  import commonGet from "../../mixin/common_getters_mixin";
  import commonExamYear from "../../mixin/exam_year_watch_mixin";
  import common_login_getters from "../../mixin/common_login_getters";

  export default {
    $_veeValidate: {
      validator: "new",
    },
    components: {
      formNotification,
    },
    mixins: [commonGet, commonExamYear, common_login_getters],
    props: [
      "dialogStatus",
      "currentPaperCode",
      "editedData",
      "currentPracticalMark",
      "editedPaperData",
      "indexEdited",
      "paperInfoInDialog",
      "loadData",
      "paperInfoData",
      "reviseDetail",
      "getChunkStudentDataList",
      "getPaperDetailsMeth",
      "getStdAppPaperData",
      "currentPracticalFullMark",
      "publishState",
      "practicalExamType",
      "vivaExamType",
      "currentVivaMark",
      "currentVivaFullMark"

    ],
    data: () => ({
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      practicalMarkAdd:"",
      messageReturn:false,
      vivaMarkAdd:"",
      dialog: false,
      loading: false,
      searchParam: {},
      editedStatus: false,
      examId: [],
      crediential: true,
      theoryType: true,
      practicalType: true,
      vivaType: true,
      stdAppParam: {},
      paperText: "",
      menu1: false,
      ifEditedMode: false,
      errorMessageShow: false,
      dictionary: {
        custom: {
          chunk_no: {
            required: () => "Regional Center Name field can not be empty",
          },
          reg_no: {
            required: () => "Address field can not be empty",
          },
        },
      },
    }),
    created() {},
    mounted() {
      this.$validator.localize("en", this.dictionary);
    },
    watch: {
      editedPaperData(val) {},
   
      dialogStatus(val) {
        this.dialog = val;      
      },
      dialog(val) {
        if (!val) this.close();
      },
    },
    computed: {
      getChunkStudentList() {
        return this.$store.getters.getChunkStudentItem;
      },
      getChunkStudentList() {
        return this.$store.getters.getChunkStudentItem;
      },
      getSchema() {
        return this.$store.getters.getChunkSchema;
      },
      getAppliedStudentSchema() {
        return this.$store.getters.getAppliedStudentSchema;
      },
      getStudentApplicationData() {
        return this.$store.getters.getStudentApplicationData;
      },
      getStudentApplicationPaperData() {
        return this.$store.getters.getStudentApplicationPaperData;
      },
     
      buttonTitle() {
        return "Update Mark";
      },
      
    },
    methods: {
      isPositiveInteger(n) {
        return n >>> 0 === parseFloat(n);
      },

   
      getErrorStatusPractical(item) {
        console.log("44444 ",this.currentPracticalFullMark);
        let fullMark = this.currentPracticalFullMark;
        let flg1 = this.isPositiveInteger(item);
        let flg2 = parseInt(item) > parseInt( fullMark);
        if (flg1 & flg2) return true;
        else return false;
      },
      getErrorMessagePractical(item) {
         console.log("44444 ",this.currentPracticalFullMark);
        let fullMark = this.currentPracticalFullMark;
        // console.log("item",item);
        // if(item > this.currentPracticalFullMark || item <= 0){
        //   return true;
        // }
        let flg1 = this.isPositiveInteger(item);
        let flg2 = parseInt(item) > parseInt( fullMark);
        if (flg1 & flg2) return this.messageReturn=true;
        // if(flg1 & flg2){
          
        // }
        else return this.messageReturn=false;
      },
       getErrorMessageViva(item) {
        
        let fullMark = this.currentVivaFullMark;
       
        let flg1 = this.isPositiveInteger(item);
        let flg2 = parseInt(item) > parseInt( fullMark);
        if (flg1 & flg2) return this.messageReturn=true;
        // if(flg1 & flg2){
          
        // }
        else return this.messageReturn=false;
      },
      // getErrorStatus(item) {
      //   let flg1 = this.isPositiveInteger(item.incourse_mark);
      //   let flg2 =
      //     parseInt(item.incourse_mark) > parseInt(item.paper.incourse_marks);
      //   if (flg1 & flg2) return true;
      //   else return false;
      // },
      // getErrorMessage(item) {
      //   let flg1 = this.isPositiveInteger(item.incourse_mark);
      //   let flg2 =
      //     parseInt(item.incourse_mark) > parseInt(item.paper.incourse_marks);
      //   if (flg1 & flg2) return "Invalid marks";
      // },
      
      getErrorStatusViva(item) {
        let flg1 = this.isPositiveInteger(item.viva_mark);
        let flg2 =
          parseInt(item.viva_mark) > parseInt(item.paper.practical_full_marks);
        if (flg1 & flg2) return true;
        else return false;
      },
     
      validationForm() {

        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
             if(this.practicalExamType == true){
              this.practicalMarkEntry()
             }
             if(this.vivaExamType == true){
              this.vivaMarkEntry()
             }
          }
        });
      },

      setLimit() {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        this.stdAppParam.page = page;
        this.stdAppParam.limit = rowsPerPage;
        this.stdAppParam.sort = sortBy;
        this.stdAppParam.search = this.search;
      },
      getAppliedStudentDataList() {
        this.loading = false;
        // this.openStat = true;
        this.setLimit();
        // let param = {};
        this.stdAppParam.exam_code = this.searchParam.exam_code;
        this.stdAppParam.exam_year = this.searchParam.year;
        this.$store
          .dispatch("callStudentApplicationData", this.stdAppParam)
          .then((data) => {
            // this.paperInfo = data.data;
            // this.loading = false;
            // this.sl_count = data.data.from;
            // this.pagination.totalItems = data.data.total;
          });
      },

      practicalMarkEntry() {
        console.log("yes its acccc");
        
        let self = this;
        let item = {};
        item.exam_initiate_id = this.getExamInitiateId;
        item.exam_code = this.searchParam.exam_code;
        item.exam_year = this.searchParam.year;
        item.paper_code = this.currentPaperCode;
        item.mark = this.practicalMarkAdd;
        item.reg_no = this.getStudentApplicationPaperData.attchment.reg_no;
        
        // let dataArr = [];
        // this.getStudentApplicationData.forEach((obj) => {
        //   obj.exam_initiate_id = this.getExamInitiateId;
        //   obj.installment_no = this.getStudentApplicationData.installment_no;
        //   console.log("obj.exam_initiate_id", obj.exam_initiate_id);
        //   dataArr.push(obj);
        // });
        // var post = {
        //   data: dataArr,
        // }
        if(this.messageReturn == false){
           this.$root
        .$confirm("Are you sure that you want to give attendance?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("savePracticalMarkEntry", item)
              .then(function (data) {
                self.close();
                self.getStdAppPaperData();
                // this.store.dispatch("callStudentApplicationPaperData");
              })
              .catch(function (error) {
                console.log(error);
                
              });
          }
        });
        }
       
      
      },
       vivaMarkEntry() {
        console.log("yes its acccc");
        
        let self = this;
        let item = {};
        item.exam_initiate_id = this.getExamInitiateId;
        item.exam_code = this.searchParam.exam_code;
        item.exam_year = this.searchParam.year;
        item.paper_code = this.currentPaperCode;
        item.mark = this.vivaMarkAdd;
        item.reg_no = this.getStudentApplicationPaperData.attchment.reg_no;
        
        // let dataArr = [];
        // this.getStudentApplicationData.forEach((obj) => {
        //   obj.exam_initiate_id = this.getExamInitiateId;
        //   obj.installment_no = this.getStudentApplicationData.installment_no;
        //   console.log("obj.exam_initiate_id", obj.exam_initiate_id);
        //   dataArr.push(obj);
        // });
        // var post = {
        //   data: dataArr,
        // };
        if(this.messageReturn==false){
          this.$root
        .$confirm("Are you sure that you want to give attendance?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("saveVivaMarkEntry", item)
              .then(function (data) {
                self.close();
                self.getStdAppPaperData();
                // this.store.dispatch("callStudentApplicationPaperData");
              })
              .catch(function (error) {
                console.log(error);
                
              });
          }
        });
        }
        
      
      },
      

      close() {
        // this.getChunkStudentDataList();
        this.getPaperDetailsMeth();
        this.$store.commit("UNSET_FORMNOTIFY");
        this.practicalMarkAdd = "";
        this.$emit("update:dialogStatus", false);
        setTimeout(() => {
          this.$emit("update:indexEdited", -1);
        }, 300);
        setTimeout(() => {
          this.$emit("update:snackbar", false);
        }, 5000);
        this.clear();
      },
    },
  };
  </script>
  <style scoped>
  .scroll {
    overflow-y: auto;
  }
  </style>
