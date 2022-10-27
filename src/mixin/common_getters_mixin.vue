<script>
export default {
  data() {
    return { open: -1 };
  },

  created() {},
  methods: {},

  computed: {
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    getExamType() {
      return [
        { exam_type_name: "General/Regular", exam_type: 1 },
        { exam_type_name: "Special", exam_type: 2 }
      ];
    },
    getRegCenList() {
      return this.$store.getters.getRegCenterItems;
    },
    getCenterList() {
      return this.$store.getters.getCenterItems;
    },
    getExaminerList() {
      return this.$store.getters.getExaminerItems;
    },
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    getPaperByRescrutinerList() {
      return this.$store.getters.getPaperByResItems;
    },

    getCourseList() {
      return this.$store.getters.getCourseItems;
    },
    getDegreeList() {
      return this.$store.getters.getDegreeItems;
    },
    getDistrictList() {
      return this.$store.getters.getDistrictDataList;
    },
    getDivisionList() {
      return this.$store.getters.getDivisionDataList;
    },
    getInvigilatorList() {
      return this.$store.getters.getInvigilatorItem;
    },
    // year
    getYearList() {
      return this.$store.getters.getYearItems;
    },
    getMenuList() {
      return this.$store.getters.getMenuDataList;
    },
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },
    //sub by PV
    getSubjectListByPrac() {
      return this.$store.getters.getSubByPractical;
    },
    getSubjectListByViva() {
      return this.$store.getters.getSubByViva;
    },

    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getLoggedIneExamName() {
      return this.$store.getters.getLoggedIneExamName;
    },
    getLoggedInYear() {
      return this.$store.getters.getLoggedInYear;
    },
    getCollegeList() {
      return this.$store.getters.getCollegeItems;
    },
    getPVCenterList() {
      return this.$store.getters.getPVCenterItems;
    },
    getTheoryCenterList() {
      return this.$store.getters.getTheoryCenterList;
    },
    getPracticalCenterList() {
      return this.$store.getters.getCenterListByPractical;
    },
    getVivaCenterList() {
      return this.$store.getters.getCenterListByViva;
    },
    //degree group
    getDegreeGroupList() {
      return this.$store.getters.getDegreeGroupData;
    },
    getUserTypeList() {
      return this.$store.getters.getUserTypeItems;
    },

    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
    // ui
    sideTitleOfSearchPanel() {
      if (this.open === 0) return "( click to close )";
      else return "( click to open )";
    },

    getSessionList() {
      return this.$store.getters.getSessionItems;
    },

    // // logged in ye≠ar exam
    // getLoggedInExam() {
    //   return this.$store.getters.getLoggedInExam;
    // },
    // getLoggedInYear() {
    //   return this.$store.getters.getLoggedInYear;
    // },
    getLoggedInExamType() {
      return this.$store.getters.getLoggedInExamType;
    },
    getPracticalPaperItem() {
      return this.$store.getters.getPaperByPractical;
    },
    getVivaPaperItem() {
      return this.$store.getters.getPaperByViva;
    },
    getCorrectCenterStatus() {
      return this.$store.getters.getCorrectCenterStatus;
    },
    getIncoursePVSub() {
      return this.$store.getters.getIncoursePVSub;
    },
     getIncoursePVPap() {
      return this.$store.getters.getIncoursePVPap;
    },
  }
};
</script>
