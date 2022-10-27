<template>
  <div>
    <center>
      <div
        style="width:800px; height:500px; padding:20px; text-align:center; border: 10px solid #787878"
      >
        <div
          style="width:750px; height:450px; padding:20px; text-align:center; border: 5px solid #787878"
        >
          <span style="font-size:40px; font-weight:bold"
            >National University</span
          >
          <br />
          <span style="font-size:20px; font-weight:bold"
            >Gazipur Bangladesh</span
          >
          <br />
          <hr />
          <span
            style="font-size:30px; font-weight:bold; border-style: dotted; padding-right: 10px; padding-left: 10px; border-width: thin;border-radius: 15px;"
            >Provision Certificate</span
          >
          <br />
          <span style="font-size:40px; font-weight:bold"
            >Bachelor of Business Administration</span
          >
          <br />

          <span style="font-size:25px">
            <i>This is to certify that</i>
          </span>
          <br />

          <span style="font-size:30px">
            <b>MD. XXX XXXX XX</b>
          </span>
          <br />

          <span style="font-size:25px">
            <i>has completed the course</i>
          </span>
          <br />

          <span style="font-size:25px">
            <i>Completed Date</i>
          </span>
          <br />
          <span style="font-size:25px">
            <i>20-Nov-2019</i>
          </span>
          <br />
        </div>
      </div>
    </center>
    <v-btn @click="getCertificateOnClick()" block
      >Download the Signed Certificate</v-btn
    >
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    body: ""
  }),
  methods: {
    getCertificateOnClick() {
      this.$store.dispatch("getCertificate");
    }
  }
};
</script>

<style lang="scss" scoped></style>
