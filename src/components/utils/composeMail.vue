<template>
  <v-dialog v-model="mailDialog" persistent max-width="500px">
    <v-card>
      <v-container fluid grid-list-md>
        <span class>
          <div class="headline mb-4">
            <v-icon size="30">mail</v-icon>
            <span class="ml-2">Mail</span>
          </div>
        </span>
        <v-card class="pa-4">
          <v-layout row wrap>
            <!-- <v-flex xs12>
              <div class="title mb-2">From:</div>
              <v-text-field outline single-line v-model="emailFrom" label="E-mail" required></v-text-field>
            </v-flex>-->
            <v-flex xs12>
              <div class="subtitle-1 mb-2">To:</div>
              <v-text-field
                readonly
                outline
                single-line
                v-model="mail.to"
                label="E-mail"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <div class="subtitle-1 mb-2">Subject:</div>
              <v-text-field
                outline
                auto-grow
                single-line
                v-model="mail.subject"
                name="input-7-4"
                label="Subject"
                value
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <div class="subtitle-1 mb-2">E-Mail Body:</div>
              <v-textarea
                outline
                auto-grow
                single-line
                v-model="mail.body"
                name="input-7-4"
                label="Mail body"
                value
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-switch v-model="switchSms" label="Send Sms"></v-switch>
            </v-flex>

            <v-flex xs12 v-if="switchSms">
              <div class="subtitle-1 mb-2">Mobile:</div>
              <v-text-field
                readonly
                outline
                single-line
                v-model="mail.sms_to"
                label="Mobile"
                required
              ></v-text-field>

              <div class="subtitle-1 mb-2">SMS Body:</div>
              <v-textarea
                outline
                auto-grow
                single-line
                v-model="mail.sms_body"
                name="input-7-4"
                label="SMS body"
                value
              ></v-textarea>
            </v-flex>

            <!-- send button -->
            <v-btn
              absolute
              dark
              fab
              top
              right
              round
              small
              color="primary"
              @click="close"
            >
              <v-icon>clear</v-icon>
            </v-btn>
            <v-flex xs12>
              <v-layout align-center justify-center row fill-height>
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
    <!-- <pre> {{toMail}} </pre> -->
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogStatus", "toSms", "toMail"],
  data: () => ({
    mailDialog: false,
    switchSms: false,
    mail: {
      to: "",
      subject: "",
      body: "",
      sms_to: "",
      sms_mody: ""
    }
  }),
  watch: {
    dialogStatus(val) {
      console.log("dialogStatus", this.dialogStatus);
      this.mailDialog = val;
      this.mail.to = this.toMail;
      this.mail.sms_to = this.toSms;
    },
    mailDialog(val) {
      if (!val) this.close();
    }
  },
  methods: {
    close() {
      this.$emit("update:dialogStatus", false);
    },
    sendMail() {
      console.log("mai", this.mail.to);
      console.log("in sendMail methods", Object.values(this.mail.to));
      this.mail.to = Object.values(this.mail.to);

      this.$store
        .dispatch("sendMail", this.mail)
        .then(msg => {
          this.mailDialog = false;
        })
        .catch(msg => {
          // this.mailDialog = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
