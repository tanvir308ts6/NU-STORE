<template>
  <v-container fluid>
    <v-card class="ma-4">
      <v-container fluid grid-list-md>
        <span class>
          <div class="headline mb-4">
            <v-icon color="primary" size="35">mail</v-icon>
            <span class="ml-2">Result Published Note</span>
          </div>
        </span>
        <v-card class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <div class="subtitle-1 mb-2">To:</div>
              <v-select
                :disabled="vcStatus"
                outline
                single-line
                v-model="forwarded_role_id"
                item-text="title"
                item-value="value"
                :items="getType"
                label="Select Reciever"
                v-validate="'required'"
                :error-messages="errors.collect('forwarded_role_id')"
                data-vv-name="forwarded_role_id"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <div class="subtitle-1 mb-2">Initiate Note:</div>
              <v-textarea
                v-if="itstatus"
                :readonly="itstatus"
                outline
                color="primary"
                auto-grow
                single-line
                v-model="initiate_note"
                name="input-7-4"
                label="Write here........"
                value
                required
                v-validate="'required'"
                :error-messages="errors.collect('initiate_note')"
                data-vv-name="initiate_note"
              ></v-textarea>
              <textEditor ref="texteditor" v-if="!itstatus"></textEditor>
            </v-flex>
            <v-flex xs12 v-if="depControllerStatus">
              <div class="subtitle-1 mb-2">Deputy Controller:</div>
              <!-- <v-textarea
                :readonly="depConstatus"
                outline
                auto-grow
                single-line
                color="primary"
                v-model="dep_controller_note"
                name="input-7-4"
                label="Write here........"
                value
                required
                v-validate="'required'"
                :error-messages="errors.collect('dep_controller_note')"
                data-vv-name="dep_controller_note"
              ></v-textarea>-->
              <textEditor ref="texteditor"></textEditor>
            </v-flex>
            <v-flex xs12 v-if="controllerStatus">
              <div class="subtitle-1 mb-2">Controller:</div>
              <!-- <v-textarea
                :readonly="constatus"
                outline
                auto-grow
                single-line
                color="primary"
                v-model="controller_note"
                name="input-7-4"
                label="Write here........"
                value
                required
                v-validate="'required'"
                :error-messages="errors.collect('controller_note')"
                data-vv-name="controller_note"
              ></v-textarea>-->
              <textEditor ref="texteditor"></textEditor>
            </v-flex>
            <v-flex xs12 v-if="vcStatus">
              <div class="subtitle-1 mb-2">VC/Pro-VC:</div>
              <!-- <v-textarea
                :readonly="vcstatus"
                outline
                auto-grow
                single-line
                color="primary"
                v-model="vc_note"
                name="input-7-4"
                label="Write here........"
                value
                required
                v-validate="'required'"
                :error-messages="errors.collect('vc_note')"
                data-vv-name="vc_note"
              ></v-textarea>-->
              <textEditor ref="texteditor"></textEditor>
            </v-flex>

            <!-- <v-flex xs12>
              <div class="subtitle-1 mb-2">Mobile:</div>
              <v-text-field outline single-line v-model="mail.sms_to" label="E-mail" required></v-text-field>
            </v-flex>-->

            <!-- send button -->
            <v-flex xs12>
              <v-layout align-center justify-center row fill-height>
                <v-btn
                  round
                  large
                  color="primary"
                  :disabled="disable"
                  @click="validationForm"
                  v-if="!vcStatus"
                  >Send</v-btn
                >
                <v-btn
                  round
                  large
                  :disabled="disable"
                  color="primary"
                  @click="validationForm"
                  v-if="vcStatus"
                  >Publish</v-btn
                >
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import textEditor from "@/components/pdf/textEditor.vue";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { textEditor },

  data: () => ({
    dictionary: {
      custom: {
        forwarded_role_id: {
          required: () => "TO field can to be empty."
        },
        initiate_note: {
          required: () => "Write a note"
        },
        dep_controller_note: {
          required: () => "Write a note"
        },
        vc_note: {
          required: () => "Write note"
        },
        controller_note: {
          required: () => "Write a note"
        }
      }
    },
    disable: false,
    searchParam: {},
    vcStatus: true,
    depControllerStatus: true,
    controllerStatus: true,
    itstatus: false,
    depConstatus: false,
    constatus: false,
    vcstatus: false,
    role_id: "",
    user_id: "",
    initiate_note: "",
    dep_controller_note: "",
    controller_note: "",
    vc_note: "",
    forwarded_role_id: "",
    approval_details: [],
    app: {}
  }),
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.searchParam.user_type = this.getAuthUser.user_type;

    var self = this;
    if (self.ifITUser) {
      self.role_id = self.getAuthUser.id;
      self.user_id = self.getAuthUser.id;
      self.forwarded_role_id = self.getType[1].value;
      self.vcStatus = false;
      self.controllerStatus = false;
      self.depControllerStatus = false;
    }
    if (self.ifDepuControllerUser) {
      self.approval_details.forEach(function(item) {
        if (item.role_id == 32) {
          self.initiate_note = item.comment;
        }
      });

      self.role_id = self.getAuthUser.id;
      self.user_id = self.getAuthUser.id;
      self.forwarded_role_id = self.getType[2].value;
      self.vcStatus = false;
      self.controllerStatus = false;
      self.itstatus = true;
    }
    if (self.ifControllerUser) {
      self.approval_details.forEach(function(item) {
        if (item.role_id == 32) {
          self.initiate_note = item.comment;
        }
        if (item.role_id == 33) {
          self.dep_controller_note = item.comment;
        }
      });
      self.role_id = self.getAuthUser.id;
      self.user_id = self.getAuthUser.id;
      self.forwarded_role_id = self.getType[3].value;
      self.vcStatus = false;
      self.depConstatus = true;
      self.itstatus = true;
      console.log("...sss", self.depConstatus);
    }
    if (self.ifProvcUser) {
      self.approval_details.forEach(function(item) {
        if (item.role_id == 32) {
          self.initiate_note = item.comment;
        }
        if (item.role_id == 33) {
          self.dep_controller_note = item.comment;
        }
        if (item.role_id == 34) {
          self.controller_note = item.comment;
        }
      });
      self.role_id = self.getAuthUser.id;
      self.user_id = self.getAuthUser.id;
      self.forwarded_role_id = self.getType[3].value;
      self.constatus = true;
      self.depConstatus = true;
      self.itstatus = true;
    }
    if (self.ifVcUser) {
      self.approval_details.forEach(function(item) {
        if (item.role_id == 32) {
          self.initiate_note = item.comment;
        }
        if (item.role_id == 33) {
          self.dep_controller_note = item.comment;
        }
        if (item.role_id == 34) {
          self.controller_note = item.comment;
        }
      });
      self.role_id = self.getAuthUser.id;
      self.user_id = self.getAuthUser.id;
      self.forwarded_role_id = self.getType[3].value;
      self.constatus = true;
      self.depConstatus = true;
      self.itstatus = true;
    }
    this.$store.dispatch("getNoteData", this.searchParam).then(data => {
      console.log("then", data);
      self.app = self.$store.getters.getResultNoteData;
      self.approval_details = self.app.approval_details;
      console.log("...app", self.approval_details[0]);
    });
  },

  computed: {
    getType() {
      return [
        { title: "IT", value: "32" },
        { title: "Deputy controller", value: "33" },
        { title: "Controller", value: "34" },
        { title: "VC", value: "35" },
        { title: "Pro VC", value: "36" }
      ];
    },
    // getSchema() {
    //   return this.$store.getters.getResultNoteData;
    // },
    getData() {
      return this.$store.getters.getData;
    }
  },
  // watch: {
  //   approval_details(val) {
  //     console.log("approval_details watch", val);
  //   }
  // },
  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          // if (!this.ifVcUser || !this.ifProvcUser) {
          //   this.sendNote();
          // }
          if (this.ifVcUser || this.ifProvcUser) {
            this.publishNote();
          } else {
            this.sendNote();
          }
        }
      });
    },
    publishNote() {
      var item = {
        role_id: this.role_id,
        user_id: this.user_id,
        forwarded_role_id: this.forwarded_role_id
      };
      item.exam_initiate_id = this.getExamInitiateId;
      item.exam_code = this.getLoggedInExam.code;
      item.year = this.getLoggedInYear.year;
      item.type = 1;
      if (this.role_id == 35) {
        item.comment = this.vc_note;
      }
      if (this.role_id == 36) {
        item.comment = this.vc_note;
      }
      var self = this;
      this.$store
        .dispatch("publishedNote", item)
        .then(msg => {
          console.log(msg);
          self.$store.dispatch("getNoteData", this.searchParam);
          self.disable = true;
          self.vcstatus = true;
        })
        .catch(msg => {
          console.log(msg);
        });
    },
    sendNote() {
      var item = {
        role_id: this.role_id,
        user_id: this.user_id,
        forwarded_role_id: this.forwarded_role_id
      };
      item.exam_initiate_id = this.getExamInitiateId;
      item.exam_code = this.getLoggedInExam.code;
      item.year = this.getLoggedInYear.year;
      item.type = 1;

      if (this.role_id == 32) {
        item.comment = this.initiate_note;
      }
      if (this.role_id == 33) {
        item.comment = this.dep_controller_note;
      }
      if (this.role_id == 34) {
        item.comment = this.controller_note;
      }
      if (this.role_id == 35) {
        item.comment = this.vc_note;
      }
      if (this.role_id == 36) {
        item.comment = this.vc_note;
      }
      var self = this;
      this.$store
        .dispatch("sendNote", item)
        .then(msg => {
          console.log(msg);
          self.$store.dispatch("getNoteData", this.searchParam);
          self.disable = true;
          self.constatus = true;
          self.depConstatus = true;
          self.itstatus = true;
        })
        .catch(msg => {
          console.log(msg);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
