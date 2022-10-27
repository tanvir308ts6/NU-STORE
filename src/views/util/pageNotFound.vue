<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12>
        <v-img
          :src="require('@/assets/nu_logos/nu_logo_r.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
        <v-btn large round color="primary" dark @click="goHome"
          >Go To Home</v-btn
        >
        <v-card class="subheading text-sm-center mt-3 pa-3"
          >Development In Process</v-card
        >
      </v-flex>
    </v-layout>
    <sms></sms>
  </v-container>
</template>

<script>
import sms from "@/components/utils/sendSMS";

export default {
  components: {
    sms
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    }
  }
};
</script>
