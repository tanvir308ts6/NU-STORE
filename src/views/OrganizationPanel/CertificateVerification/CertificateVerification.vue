<template>
  <div id="CertificateVerification">
    <CertificateVerificationForm v-if="getCVStep == 1" />
    <CertificateVerificationPreview v-if="getCVStep == 2" />
    <paySlip v-if="getCVStep == 3" />
    <!-- <pre>{{ getCVStep }}</pre> -->
  </div>
</template>
<script>
import CertificateVerificationForm from "@/components/OrganizationPanel/CertificateVerification/form.vue";
import CertificateVerificationPreview from "@/components/OrganizationPanel/CertificateVerification/Preview.vue";
import paySlip from "@/components/OrganizationPanel/CertificateVerification/paySlip.vue";
export default {
  created() {
    this.$store.commit("SET_CV_STEP", 1);
  },
  components: {
    CertificateVerificationForm,
    CertificateVerificationPreview,
    paySlip
  },
  computed: {
    getCVStep() {
      return this.$store.getters.getCVStep;
    }
  },
  methods: {
    submitAttachment() {
      this.$store.dispatch("storeCV", this.getCVStudentSchema);
      this.$store.commit("SET_CV_STEP", 3);
      //this.$store.dispatch("generatePaySlip");
    }
  }
};
</script>
