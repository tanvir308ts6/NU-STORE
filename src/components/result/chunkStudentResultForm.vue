  <template>
    <!-- <v-container fluid>
     
    </v-container> -->
    <div class="form">
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <!-- {{getStudentApplicationPaperData}} -->
         <!-- {{paperInfoInDialog}} -->
         <!-- {{currentPaperCode}} -->
          <v-card color="primary" flat>
            <v-card-title>
              <span class="headline white--text">Attendance Entry</span>
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
                name="reg_no"
                label="Paper Code"
                v-model="paperInfoInDialog"
                data-vv-name="reg_no"
                required
                
              ></v-text-field>
            
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
      "editedData",
      "editedPaperData",
      "indexEdited",
      "paperInfoInDialog",
      "loadData",
      "paperInfoData",
      "reviseDetail",
      "getChunkStudentDataList",
      "getPaperDetailsMeth",
      "getStdAppPaperData",
      "publishState",
      "currentPaperCode"
    ],
    data: () => ({
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
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
      // pagination() {
      //   this.getAppliedStudentDataList();
      // },
      dialogStatus(val) {
        this.dialog = val;
        
        this.paperText = this.getStudentApplicationPaperData.details[0].paper_code + '-' + '(' + this.getStudentApplicationPaperData.details[0].paper_name + ')';
  
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
      getCategoryList() {
        return this.$store.getters.getCategoryListData;
      },

      getReviseDetailSchema() {
        return this.$store.getters.getReviseDetailSchema;
      },
      buttonTitle() {
        return this.indexEdited === -1 ? "Update Attendance" : "Update Marks";
      },
      formTitle() {
        return this.indexEdited === -1 ? "Add New Student" : "Edit";
      },
    },
    methods: {
      theoryTypeFunc(val) {
        console.log("hi", val.paper.paper_type);
        if (val.paper.paper_type != 1) this.theoryType = false;
      },
      practicalTypeFunc(val) {
        console.log("hi", val.paper.paper_type);
        if (val.paper.paper_type != 2) this.practicalType = false;
      },
      vivaTypeFunc(val) {
        console.log("hi", val.paper.paper_type);
        if (val.paper.paper_type != 3) this.vivaType = false;
      },

     
      valueOfAttendence(val) {
        console.log("val atten", val);
    
      },
      isPositiveInteger(n) {
        return n >>> 0 === parseFloat(n);
      },

      getErrorStatusCat(item) {
        console.log("item getErrorStatusCat", item);
        if (item == undefined) return true;
        else return false;
      },
      getErrorMessageCat(item) {
        if (item == undefined) return "select Category";
      },
      getErrorStatusPractical(item) {
        let flg1 = this.isPositiveInteger(item.practical_mark);
        let flg2 =
          parseInt(item.practical_mark) >
          parseInt(item.paper.practical_full_marks);
        if (flg1 & flg2) return true;
        else return false;
      },
      getErrorStatus(item) {
        let flg1 = this.isPositiveInteger(item.incourse_mark);
        let flg2 =
          parseInt(item.incourse_mark) > parseInt(item.paper.incourse_marks);
        if (flg1 & flg2) return true;
        else return false;
      },
      getErrorMessage(item) {
        let flg1 = this.isPositiveInteger(item.incourse_mark);
        let flg2 =
          parseInt(item.incourse_mark) > parseInt(item.paper.incourse_marks);
        if (flg1 & flg2) return "Invalid marks";
      },
      getErrorMessagePractical(item) {
        let flg1 = this.isPositiveInteger(item.practical_mark);
        let flg2 =
          parseInt(item.practical_mark) >
          parseInt(item.paper.practical_full_marks);
        if (flg1 & flg2) return "Invalid marks";
      },
      getErrorStatusViva(item) {
        let flg1 = this.isPositiveInteger(item.viva_mark);
        let flg2 =
          parseInt(item.viva_mark) > parseInt(item.paper.practical_full_marks);
        if (flg1 & flg2) return true;
        else return false;
      },
      getErrorMessageViva(item) {
        let flg1 = this.isPositiveInteger(item.viva_mark);
        let flg2 =
          parseInt(item.viva_mark) > parseInt(item.paper.practical_full_marks);
        if (flg1 & flg2) return "Invalid marks";
      },
      validationForm() {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
             this.attendanceEntry()
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

      attendanceEntry() {
        console.log("yes its acccc");
        
        let self = this;
        let item = {};
        item.exam_initiate_id = this.getExamInitiateId;
        item.exam_code = this.searchParam.exam_code;
        item.exam_year = this.searchParam.year;
        item.paper_code = this.currentPaperCode;
        item.reg_no = this.getStudentApplicationPaperData.attchment.reg_no;
        item.attendance_status = "1";
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
        this.$root
        .$confirm("Are you sure that you want to give attendance?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("saveAttendanceEntry", item)
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
    
      },


      clear() {
        this.$store.commit("UNSET_FORMNOTIFY");
        this.$store.commit("UNSET_CHUNK_STUDENT_PAPER_SCHEMA");
        this.$validator.reset();
      },
      close() {
        // this.getChunkStudentDataList();
        this.getPaperDetailsMeth();
        this.$store.commit("UNSET_FORMNOTIFY");
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
