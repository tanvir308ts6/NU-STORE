<template>
  <div>
    <formNotification />
    <comNuRc />
    <!-- rcToCenter -->
  </div>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import comNuRc from "@/components/distribution/ansScript/comNuRc.vue";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formNotification,
    comNuRc
  },
  props: [""],
  data() {
    return {
      rcToNu: true,
      searchParam: {}
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.center_code = 101;
    this.searchParam.reg_center_code = 101;
    this.$store.dispatch("fetchUsedScriptData", this.searchParam);
    this.$store.dispatch("fetchAnsScriptPaperDataAtCenterRc", this.searchParam);
    this.$store.dispatch("fetchAnsScriptPaperDataAtRcNu", this.searchParam);
  },
  computed: {
    getUsedScriptData() {
      return this.$store.getters.getUsedScriptData;
    },
    getAnsScriptPaperDataAtCenterRc() {
      return this.$store.getters.getAnsScriptPaperDataAtCenterRc;
    },
    getAnsScriptPaperDataAtRcNu() {
      return this.$store.getters.getAnsScriptPaperDataAtRcNu;
    }
  },

  methods: {
    func() {
      this.$store.commit("SET_FORMNOTIFY", {
        type: "error", // success, info, warning, error
        msg: "response.data.message"
      });
    }
  },
  watch: {}
};
</script>
<style scoped></style>
