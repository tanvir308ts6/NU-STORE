<template>
  <div>
    <bsDistToRegCenter rcToCenter />
  </div>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import bsDistToRegCenter from "@/components/distribution/blankScript/toRegCenter.vue";
export default {
  mixins: [commonFun, commonGet, watchMixin],
  components: {
    formNotification,
    bsDistToRegCenter
  },
  props: [""],
  data() {
    return {
      rcToCenter: true
    };
  },
  created() {},
  computed: {},

  methods: {},
  watch: {}
};
</script>
<style scoped></style>
