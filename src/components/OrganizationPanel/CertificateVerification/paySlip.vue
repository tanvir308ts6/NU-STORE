<template>
  <div id="PaySlip">
    <v-container>
      <p class="title">Your information saved successfully</p>
      <p class="title">Please check your Dashboard for further instruction</p>
      <v-layout>
        <div class="justify-center layout px-0">
          <v-btn color="success" @click="downloadPaySlip"
            >Download Payment Slip</v-btn
          >
        </div>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  methods: {
    downloadPaySlip() {
      this.$store.dispatch("generatePaySlip");
      //this.$route.push("cv/request_list");
      // this.$store.commit("UNSET_CV_STUDENT_SCHEMA");
      // this.$store.commit("SET_CV_STEP", 1);
    }
  }
};
</script>
