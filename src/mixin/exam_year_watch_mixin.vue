<script>
export default {
  data() {
    return {
      cload: false,
      forceRerenderFlag: true,
      ifFormSchema: false,
      ifSearchParam: false,
      multipleYearFlag: false,
      multipleExamFlag: false,
      ifExamSchema: false,
      ifSearchExam: false,
      ifSearchYear: false,
      ifYearSchema: false,
      ifExamYearSchema: false,
      consolidateResult:false,
      honoursExam: false, // for Bachelor Degree Honors = 2 (degree code)
      bachelorDegree: false, // for Bachelor Degree (Pass) = 1 (degree code)
      mastersFinal: false, // for Masters Final = 3 (degree code)
      mastersPreli: false, //for Masters Preliminary = 4 (degree code)
      bachelorProfessional: false, // for Bachelor Professional = 5 (degree code)
      mastersProfessional: false, // for Masters Professional = 6 (degree code)
      professionalPassCourse: false, // for Professional Pass Course (3 Year) = 7 (degree code)
      oneYearProfessionalDegree: false, // for 1 Year Professional Degree = 8 (degree code)
    };
  },
  created() {
    // if nothing defined, we are assuming below value to be default
    this.ifSearchParam = true;
    this.multipleExamFlag = false;
    this.multipleYearFlag = false;
    //console.log("this.getLoggedInDegree.code", this.getLoggedInDegree.code);
    this.degreeIdentify(this.getLoggedInDegree); // on page reload degree check as watch value remains same 
  },
  mounted() {
    try {
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.exam_type = this.$store.getters.getLoggedInExamType;
      this.forceRerender();
    } catch (ex) {
      // console.log(ex);
    }

    /// all ok
    try {
      this.getSchema.exam_code = this.$store.getters.getLoggedInExam.code;
      this.getSchema.exam_id = this.$store.getters.getLoggedInExam.code;
      this.getSchema.year = this.$store.getters.getLoggedInYear.year;
      this.getSchema.exam_year = this.$store.getters.getLoggedInYear.year;
      this.forceRerender();
    } catch (ex) {
      // console.log(ex);
    }
  },
  watch: {
    getLoggedInDegree(val) {
      console.log("degree in watch??", val);
      this.degreeIdentify(val); // on degree value change degree code watch
    },
    getLoggedIneExamName(val) {
      console.log("exam name in watch??", val);
       // on degree value change degree code watch
    },
    getLoggedInExam(val) {
      if(this.searchParam.exam_code = "2204"){
        this.consolidateResult = true;
        console.log("this.consolidateResult in watch??",this.consolidateResult)
      }
      
      console.log("Exam obj??", val);
      this.degreeIdentify(val); // onlayout change degree check & it returns exam object with degree_code
      try {
        console.log("Exam", val);
        // this.customSearchPanel = false;
        if (this.ifSearchParam && this.multipleExamFlag) {
          this.searchParam.exam_code = [val.code];
          this.forceRerender();
        } else if (this.ifSearchParam && !this.multipleExamFlag) {
          console.log("im else if");
          console.log("Exam", val.code);
          this.searchParam.exam_code = val.code;

          this.forceRerender();
          // return val.code;
        }
        // For CRUD Form
        if (this.ifFormSchema) {
          this.getSchema.exam_id = val.code;
        }
        // console.log("ifExamschema", this.ifExamSchema);

        if (this.ifExamSchema) {
          this.getSchema.exam_code = val.code;
        }
        if (this.ifSearchExam) {
          this.searchParam.exam_code = val.code;
          this.forceRerender();
        }
        if (this.ifExamCASchema) {
          this.getCenterAllocationSchema.exam_code = val.code;
        }
        console.log("done success");
      } catch (ex) {
        console.log("ee", ex);
        console.error(
          "SP: Error in 'exam_year_watch_mixin.vue' in watch in method 'getLoggedInExam' "
        );
        // Maybe, this is happening because of the default created value .. look into the created section of this code
      }
    },
    getLoggedInYear(val) {
      console.log("mituuuu", val);
      this.searchParam.exam_type = this.$store.getters.getLoggedInExamType;
      try {
        if (this.ifSearchParam && this.multipleYearFlag)
          this.searchParam.exam_type = [val.year];
        else if (!this.multipleYearFlag && this.ifSearchParam) {
          this.searchParam.year = val.year;
        }

        if (this.ifYearSchema) {
          this.getSchema.year = val.year;
        }
        if (this.ifExamYearSchema) {
          this.getSchema.exam_year = val.year;
        }
        if (this.ifSearchYear) {
          this.searchParam.year = val.year;
        }
        if (this.ifYearCASchema) {
          this.getCenterAllocationSchema.year = val.year;
        }
        // console.log("VSL ", val);
        this.forceRerender();
      } catch (ex) {
        console.log("YY", ex);
        console.error(
          "SP: YEar Error in 'exam_year_watch_mixin.vue' in watch in method 'getLoggedInYear' "
        );
        // Maybe, this is happening because of the default created value .. look into the created section of this code
      }
    },
    getLoggedInExamType(val) {
      try {
        this.searchParam.exam_type = this.$store.getters.getLoggedInExamType;
        this.forceRerender();
      } catch (ex) {}
    },
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.searchParam.exam_initiate_id = val;
      try {
        setTimeout(() => {
          this.cload = !this.cload;
        }, 800);
      } catch (er) {
        console.log(er);
      }
    },
  },
  methods: {
    forceRerender() {
      try {
        this.forceRerenderFlag = false;
        this.forceRerenderFlag = true;
      } catch (ex) {
        //console.log(ex);
      }
    },

    degreeIdentify(val) {
      console.log("call????", val);
      if (val.code == "2" || val.degree_code == "2") {
        this.honoursExam = true;
      } else {
        this.honoursExam = false;
      }

      if (val.code == "1" || val.degree_code == "1") {
        this.bachelorDegree = true;
      } else {
        this.bachelorDegree = false;
      }

      if (val.code == "3" || val.degree_code == "3" ) {
        this.mastersFinal = true;
      } else {

        this.mastersFinal = false;
      }

      if (val.code == "4" || val.degree_code == "4") {
        this.mastersPreli = true;
      } else {
        this.mastersPreli = false;
      }
      if (val.code == "5" || val.degree_code == "5") {
        this.bachelorProfessional = true;
      } else {
        this.bachelorProfessional = false;
      }
      if (val.code == "6" || val.degree_code == "6") {
        this.mastersProfessional = true;
      } else {
        this.mastersProfessional = false;
      }
      if (val.code == "7" || val.degree_code == "7") {
        this.professionalPassCourse = true;
      } else {
        this.professionalPassCourse = false;
      }

      if (val.code == "8" || val.degree_code == "8") {
        this.oneYearProfessionalDegree = true;
      } else {

        this.oneYearProfessionalDegree = false;
      }
    },
  },
  computed: {},
};
</script>
