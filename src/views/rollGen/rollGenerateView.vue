<template>
  <div class="ma-5 pa-5">
    <rollGenerate></rollGenerate>
    <!-- {{getLoggedInExam}} -->
  </div>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";

import rollGenerate from "@/components/formFillup/rollGenerate";

export default {
  mixins: [commonGet],
  components: {
    rollGenerate
  },
  methods: {
    setSearchParam() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.year = this.getLoggedInYear.year;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
    }
  },
  watch: {
    getExamInitiateId(val) {
      console.log("getExamInitiateId", val);
    }
  },

  data() {
    return {
      searchParam: {}
    };
  },
  created() {
    this.setSearchParam();
    this.$store.dispatch("fetchRollGenSummaryData", this.searchParam);
  }
};
</script>

<style lang="scss" scoped></style>
