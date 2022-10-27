<script>
export default {
  data() {
    return { open: -1 };
  },

  created() {
    // this.ifExamSchema = true;
    // this.ifExamYearSchema = true;
    // this.$store.dispatch("fetchSubjectData");
    // this.$store.dispatch("fetchCenterData");
    // //year
    // if (!this.$store.getters.getPaperItems.length) {
    //   console.log("----> fetchPaperData");
    //   this.$store.dispatch("fetchPaperData");
    // }
    // //year
    // if (!this.$store.getters.getYearItems.length) {
    //   console.log("----> fetchYearData");
    //   this.$store.dispatch("fetchYearData");
    // }
    // //exam
    // if (!this.$store.getters.getExamItem.length) {
    //   console.log("----> fetchExamData");
    //   this.$store.dispatch("fetchExamData");
    // }
  },

  computed: {
    getAllDegree() {
      return this.$store.getters.getAllDegree;
    }
  }
};
</script>
