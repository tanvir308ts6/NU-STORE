<script>
export default {
  data() {
    return { open: -1 };
  },

  created() {},

  computed: {
    // YearList() {
    //   const year = new Date().getFullYear();
    //   return Array.from(
    //     { length: year - 2009 },
    //     (value, index) => 2011 + index
    //   );
    // },
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    getYearList() {
      return this.$store.getters.getYearItems;
    },
    getDegreeData() {
      return this.$store.getters.getDegreeData;
    },
    getDegreeHasDegreeGroup() {
      return this.$store.getters.getCollegeDegreeWiseDegreeGroup;
    },
    getAllOpenExamMasterList() {
      return this.$store.getters.getAllOpenExamMasterList;
    },
    getExamMasterList() {
      return this.$store.getters.getCollegeExamMasterList;
    },
    getCollegeAllDegreeGroup() {
      return this.$store.getters.getCollegeAllDegreeGroup;
    },
    getCollegeAllSubject() {
      return this.$store.getters.getCollegeAllSubject;
    },
    getCollegeUserCurrentPrivilege() {
      return this.$store.getters.getCollegeUserCurrentPrivilege;
    }
  }
};
</script>
