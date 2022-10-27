<template>
  <div>
    <div v-if="ifCenterUser">
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          style=" border-radius: 10px; "
          class="ma-2 , elevation-2"
          height="165"
        >
          <v-layout class="ml-3">
            <div class="ma-3 text-sm-left">
              <v-icon large>store_mall_directory</v-icon>
              <div class="headline">{{ getAuthUser.center.center_name }}</div>
              <div class="mt-2">
                <v-icon style="margin-bottom: -.18em;">map</v-icon>
                Address: {{ getAuthUser.center.address }}.
                <br />
                <v-icon style="margin-bottom: -.18em;">phone</v-icon>
                Phone: {{ getAuthUser.center.phone }}
              </div>
            </div>
          </v-layout>
        </v-card>
      </v-hover>
    </div>

    <formNotification />
    <comCenterRc rcToCenter />
    <!-- rcToCenter -->
  </div>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import comCenterRc from "@/components/distribution/ansScript/comCenterRc.vue";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formNotification,
    comCenterRc
  },
  props: [""],
  data() {
    return {
      rcToCenter: true
    };
  },
  created() {},
  computed: {},

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
