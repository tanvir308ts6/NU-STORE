<script>
export default {
  data() {
    return {};
  },
  methods: {
    getCenterUrl() {
      var center_id = "";
      var center_id_url = "?";
      var user_type = this.getUserType();
      if (user_type == "Center") {
        center_id = this.getCenterId();
        center_id_url = "?center_id=" + center_id;
      }
      return center_id_url;
    },
    getInvUrl() {
      var center_code = "";
      var center_code_url = "";
      var user_type = this.getUserType();
      if (user_type == "Center") {
        //console.log("this.getCenterCode---->", this.getCenterCode())
        center_code = this.getCenterCode();
        center_code_url = "?center_code=" + center_code;
      }
      return center_code_url;
    },
    loadCenterListData() {
      //center_id_url = ""
      console.log("center_id", this.getCenterUrl());
      this.$store.dispatch("callCenterUserData", this.getCenterUrl());
    },
    loadRegCenterListData() {
      var regional_center_id = "";
      var reg_center_id_url = "";
      var user_type = this.getUserType();
      if (user_type == "Regional Center") {
        regional_center_id = this.getRegionalCenterId();
        reg_center_id_url = "?regional_center_id=" + regional_center_id;
      }
      //center_id_url = ""
      console.log("regional_center_id", reg_center_id_url);
      this.$store.dispatch("callRegionalCenterUserData", reg_center_id_url);
    }
  },
  computed: {}
};
</script>
