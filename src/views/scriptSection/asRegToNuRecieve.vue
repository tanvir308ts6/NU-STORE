<template>
  <div>
    <formNotification />
    <comRcNu nuToRc v-if="this.ifRegionalUser" />
    <comAtNu nuToRc v-else />
    <!-- rcToCenter -->
  </div>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import comRcNu from "@/components/distribution/ansScript/comRcNu.vue";
import comAtNu from "@/components/distribution/ansScript/comAtNu.vue";

export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formNotification,
    comRcNu,
    comAtNu,
  },
  props: [""],
  data() {
    return {
      rcToCenter: true,
    };
  },
  created() {
    // if (this.ifRegionalUser) {
    //   this.searchParam.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
    // }
  },
  computed: {},

  methods: {
    func() {
      this.$store.commit("SET_FORMNOTIFY", {
        type: "error", // success, info, warning, error
        msg: "response.data.message",
      });
    },
  },
  watch: {},
};
</script>
<style scoped></style>
