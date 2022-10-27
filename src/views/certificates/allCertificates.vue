<template>
  <div>
    <certificate></certificate>
  </div>
</template>

<script>
import certificate from "@/components/certificates/certificate.vue";
export default {
  components: {
    certificate
  },
  data: () => ({
    body: ""
  })
};
</script>

<style lang="scss" scoped></style>
