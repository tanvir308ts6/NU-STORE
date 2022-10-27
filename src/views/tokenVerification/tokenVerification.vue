<template>
  <v-container fluid>
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50" color="primary">emoji_people</v-icon>
        <span class="ml-2">Token Verification</span>
      </div>
    </span>
    <!-- {{examiner}} -->
    <v-hover>
      <v-card>
        <v-layout row class="pt-5">
          <v-flex xs2></v-flex>
          <v-flex xs12 class="mr-5">
            <v-layout column>
              <v-flex xs5>
                <div class="title mb-4">
                  <v-icon size="35" color="primary">emoji_people</v-icon>
                  <span class="ml-2">Examiner Code</span>
                </div>
              </v-flex>
              <v-flex xs7>
                <v-text-field
                  :disabled="flg"
                  name="examiner_code"
                  label="Examiner Code"
                  v-model="searchParam.examiner_code"
                  required
                  box
                  :error-messages="errors.collect('examiner_code')"
                  v-validate="'required'"
                  data-vv-name="examiner_code"
                  prepend-inner-icon="edit"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout column>
              <v-flex xs5>
                <div class="title mb-4">
                  <v-icon size="35" color="primary">emoji_people</v-icon>
                  <span class="ml-2">Verification Code</span>
                </div>
              </v-flex>
              <v-flex xs7>
                <v-text-field
                  name="verification_code"
                  label="Verification Code"
                  v-model="searchParam.verification_code"
                  required
                  box
                  :error-messages="errors.collect('verification_code')"
                  v-validate="'required'"
                  data-vv-name="verification_code"
                  prepend-inner-icon="edit"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- <v-flex xs0></v-flex> -->
          <v-flex v-if="tvDialog" xs6 class="ml-5">
            <v-card>
              <v-card-title>
                <h4>Examiner</h4>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Regional Center Code:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{examiner.reg_center_code}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Examiner Code:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ examiner.examiner_code }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Paper Code:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ examiner.paper_code }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Total Script:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ examiner.total_script }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Packet Size:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ examiner.packet_size }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Total Packet:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ examiner.total_packet }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs2></v-flex>
        </v-layout>
        <v-divider class="my-3" />
        <v-flex xs12>
          <div align="center" class="pb-4">
            <v-btn large @click="validateForm" color="primary">Verify</v-btn>
          </div>
        </v-flex>
      </v-card>
    </v-hover>

    <div v-if="toShowOrNotToShow">
      <v-layout column>
        <v-layout row>
          <v-flex xs-4></v-flex>
          <v-flex>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                class="mt-3 mb-5 mx-5"
                color="grey lighten-2"
              >
                <v-card-title>
                  <div
                    class="display-1"
                    style="color:#1A237E;"
                  >{{ getVarifiedExaminer[0].examiner_name }}</div>
                </v-card-title>
                <v-divider></v-divider>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="indigo">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Examiner Code:</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                      style="color:#1A237E;"
                    >{{ getVarifiedExaminer[0].examiner_code }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="indigo">face</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Examiner Type:</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                      style="color:#1A237E;"
                    >{{ getVarifiedExaminer[0].examiner_type }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="indigo">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Examiner Username:</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                      style="color:#1A237E;"
                    >{{ getVarifiedExaminer[0].examiner_username }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="indigo">list_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Examiner Total Script:</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                      style="color:#1A237E;"
                    >{{ getVarifiedExaminer[0].total_script_qty }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="indigo">book</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Examiner Subject:</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                      style="color:#1A237E;"
                    >{{ getsubject(subject) }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="indigo">library_books</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Examiner Paper:</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                      style="color:#1A237E;"
                    >{{ getpaper(paper) }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs-4></v-flex>
        </v-layout>
      </v-layout>
      <v-layout row class="pt-1">
        <v-flex xs3>
        </v-flex>
        <v-flex xs6>
          <v-text-field
          name="script_receiver_name"
          label="Name"
          v-model="examiner.script_receiver_name"
          data-vv-name="name"
          prepend-inner-icon="edit"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row class="pt-1">
        <v-flex xs3>
        </v-flex>
        <v-flex xs6>
          <v-text-field
          name="script_receiver_mobile"
          label="Mobile Number"
          v-model="examiner.script_receiver_mobile"
          required
          box
          :error-messages="errors.collect('script_receiver_mobile')"
           v-validate="{
                    required: true, max: 13, min: 11, regex: /^([+]88)?(01)(?!2)(?!1)\d{9}/ }"
          data-vv-name="script_receiver_mobile"
          prepend-inner-icon="edit"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <div class="text-xs-center mt-3" v-if="tvDialog">
        <v-btn
          @click="postAnsScriptRcToExaminer()"
        >Distribute to Examiner: {{examiner.examiner_code}}</v-btn>
      </div>
    </div>
    <div v-else>
      <v-layout column v-if="getVarifiedExaminer.message">
        <v-layout row>
          <v-flex xs-4></v-flex>
          <v-flex>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                class="mt-3 mb-5 mx-5"
                color="red darken-1"
                style="border-radius: 20em"
              >
                <v-layout justify-center row fill-height align-center>
                  <v-card-title>
                    <div class="display-1" style="color:white;">{{ getVarifiedExaminer.message }}</div>
                  </v-card-title>
                </v-layout>
                <v-divider></v-divider>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs-4></v-flex>
        </v-layout>
      </v-layout>
    </div>
    <!-- <div class="text-xs-center mt-3">
      <v-btn @click="postAnsScriptRcToExaminer()">Distribute to Examiner: {{examiner.examiner_code}}</v-btn>
    </div>-->
    <!-- <pre>
          {{getVarifiedExaminer}}
    </pre>-->
  </v-container>
</template>
<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  props: ["examiner", "tvDialog", "callMethod"],

  data: () => ({
    flg: false,
    subject: [],
    paper: [],
    searchParam: { examiner_code: "", verification_code: "" },
    dictionary: {
      custom: {
        name: {
          required: () => "Name field is required",
        },
        password: {
          required: () => "Select a password",
        },
        verification_code: {
          required: () => "Verification code must be given",
        },
        examiner_code: {
          required: () => "Examiner code must be given",
        },
        script_receiver_mobile: {
          required: () => "Script Receiver Mobile is required"
        },
      },
    },
  }),
  $_veeValidate: {
    validator: "new",
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.year = this.getLoggedInYear.year;
  },

  computed: {
    getSchema() {
      return this.$store.getters.getTokeVerifySchema;
    },
    getVarifiedExaminer() {
      return this.$store.getters.getVarifiedExaminer;
    },
    toShowOrNotToShow() {
      // console.log("-->", Object.entries(this.getVarifiedExaminer).length === 0);
      // return this.$store.getters.getVarifiedExaminer.length > 0 ? true : false;
      return this.getVarifiedExaminer.status;
    },
  },
  methods: {
    postAnsScriptRcToExaminer() {
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            let arr = [];
            arr.push(this.examiner);

            this.$store
              .dispatch("postAnsScriptRcToExaminer", arr)
              .then((res) => {
                console.log("in ----/// --- return then", res);
                this.callMethod();
                // this.fetchAsNuToRcToExaminerData();
                // self.fetchTreasuryData();
              });
          }
        });
    },
    validateForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.submit();
        }
      });
    },
    getsubject(item) {
      let sub = item;
      let subj = [];
      sub.forEach((element) => {
        subj.push(element.title + "(" + element.code + ") ");
      });
      return subj.join("\n");
    },
    getpaper(item) {
      let pap = item;
      let paps = [];
      pap.forEach((element) => {
        paps.push(element.title + "(" + element.code + ") ");
      });
      return paps.join("\n");
    },
    submit() {
      // let self = this;
      // let item = this.getSchema;
      var self = this;
      this.$store.dispatch("searchTokenData", this.searchParam).then((data) => {
        self.subject = data[0].subjects;
        self.paper = data[0].papers;
        self.getsubject(self.subject);
        self.getpaper(self.paper);
      });
    },
  },
  watch: {
    examiner(val) {
      this.searchParam.examiner_code = val.examiner_code;
      this.flg = true;
      // console.log(val);
    },
    tvDialog(val) {
      if (!val) {
        //this.searchParam.examiner_code = "";
        //this.flg = false;
      }
    },
  },
};
</script>
