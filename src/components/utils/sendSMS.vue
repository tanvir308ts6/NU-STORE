<template>
  <v-dialog v-model="smsDialog" persistent max-width="500px">
    <v-card>
      <v-container fluid grid-list-md>
        <span class>
          <div class="subtitle mb-4">
            <v-icon size="30">mail</v-icon>
            <span class="ml-2">Send SMS</span>
          </div>
        </span>
        <v-card class="pa-4">
          <v-layout row wrap>
            <!-- <v-flex xs12>
              <div class="title mb-2">From:</div>
              <v-text-field outline single-line v-model="emailFrom" label="E-mail" required></v-text-field>
            </v-flex>-->
            <v-flex xs12>
              <div class="title mb-2">Phone:</div>
              <v-text-field
                outline
                single-line
                v-model="sms.phone"
                label="Number"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <div class="title mb-2">Body:</div>
              <v-textarea
                outline
                auto-grow
                single-line
                v-model="sms.body"
                name="input-7-4"
                label="SMS body"
                value
              ></v-textarea>
            </v-flex>
            <!-- send button -->
            <v-flex xs12>
              <v-layout align-end justify-end row fill-height>
                <v-btn round small fab color="accent" @click="close">
                  <v-icon>clear</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn round color="primary" @click="sendMail">
                  SEND
                  <!-- <v-icon right dark>send</v-icon> -->
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar" color="primary">
      {{ msg }}
      <v-btn color="accent" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  props: ["smsDialogStatus"],
  data: () => ({
    smsDialog: false,
    snackbar: false,
    msg: "",
    sms: {
      phone: "",
      body: ""
    }
  }),
  watch: {
    smsDialogStatus(val) {
      console.log("dialogStatus", val);
      this.smsDialog = val;
    },
    smsDialog(val) {
      if (!val) this.close();
    }
  },
  methods: {
    close() {
      this.$emit("update:smsDialogStatus", false);
    },
    sendMail() {
      console.log("in sendSMS methods");

      this.$store
        .dispatch("sendSMS", this.sms)
        .then(msg => {
          this.msg = msg;
          this.snackbar = true;
          // this.mailDialog = false;
        })
        .catch(msg => {
          this.msg = msg;
          this.snackbar = true;
          // this.mailDialog = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
