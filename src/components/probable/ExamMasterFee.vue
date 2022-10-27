<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title
            >Fee Setup for
            {{
              `${dialogData.exam_name} (${dialogData.exam_year})`
            }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card>
            <v-card-text>
              <v-container fluid>
                <v-form>
                  <v-layout
                    class="justify-center"
                    row
                    wrap
                    v-for="(exm_master_fee, index) in dialogData.exm_master_fee"
                    :key="index"
                  >
                    <v-flex md3>
                      <v-select
                        v-model="exm_master_fee.fee_title"
                        :items="getFeeHeads"
                        item-text="fee_title"
                        item-value="fee_title"
                        label="Select Fee Head"
                        @change="updateFee(exm_master_fee)"
                        prepend-icon="list"
                      ></v-select>
                    </v-flex>
                    <!-- <v-flex md2>
                      <v-select
                        v-model="exm_master_fee.fee_for"
                        :items="fee_for"
                        item-text="text"
                        item-value="text"
                        label="Select Fee For"
                        prepend-icon="account_balance"
                      ></v-select>
                    </v-flex>-->
                    <v-flex md2>
                      <v-select
                        v-model="exm_master_fee.student_type"
                        :items="student_types"
                        item-text="text"
                        item-value="value"
                        label="Select Student Type"
                        prepend-icon="account_circle"
                      ></v-select>
                    </v-flex>
                    <v-flex md2>
                      <v-select
                        v-model="exm_master_fee.fee_type"
                        :items="getExamFeeType"
                        item-text="text"
                        item-value="text"
                        label="Select Fee Type"
                        prepend-icon="subject"
                      ></v-select>
                    </v-flex>
                    <v-flex md2>
                      <v-select
                        v-model="exm_master_fee.paper_type"
                        :items="getAllPaperType"
                        item-text="paper_type"
                        item-value="paper_type"
                        label="Select Paper Type"
                        prepend-icon="library_books"
                        clearable
                      ></v-select>
                    </v-flex>

                    <v-flex md1>
                      <v-text-field
                        name="credit"
                        label="Credit"
                        v-model="exm_master_fee.credit"
                        v-validate="'required'"
                        data-vv-name="credit"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md1>
                      <v-text-field
                        name="amount"
                        label="Amount"
                        v-model="exm_master_fee.amount"
                        v-validate="'required'"
                        data-vv-name="amount"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md1>
                      <v-btn
                        v-if="index"
                        fab
                        dark
                        small
                        color="red"
                        @click="dialogData.exm_master_fee.splice(index, 1)"
                      >
                        <v-icon dark>clear</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <div class="justify-left layout px-0">
                      <v-btn
                        fab
                        dark
                        small
                        color="info"
                        @click="addMore(dialogData.exm_master_fee)"
                      >
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </div>
                  </v-layout>
                  <v-layout>
                    <div class="justify-center layout px-0">
                      <v-btn color="success" @click="save">Submit</v-btn>
                    </div>
                  </v-layout>
                </v-form>
                <!-- <pre>{{dialogData.exm_master_fee}}</pre> -->
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  props: ["dialogStatus", "dialogData"],

  $_veeValidate: {
    validator: "new",
  },

  data: () => ({
    dialog: false,
    student_types: [
      { value: null, text: "All" },
      { value: "Regular", text: "Regular" },
      { value: "Irregular", text: "Irregular" },
      { value: "Improvement", text: "Improvement" },
    ],
    fee_type: [
      // { value: "per_exam", text: "Per Exam" },
      { value: "per_student", text: "Per Student" },
      { value: "per_paper", text: "Per Paper" },
    ],
    fee_for: [
      { value: "nu", text: "National University" },
      { value: "college", text: "College" },
    ],
  }),

  computed: {
    // getSchema() {
    //   return this.$store.getters.initFromData;
    // },
    // getSchemaSession() {
    //   return this.$store.getters.getAcSession;
    // // },
    // getSchemaExamYear() {
    //   return this.$store.getters.getExamYear;
    // },
    getAllPaperType() {
      return this.$store.getters.getAllPaperType;
    },
    getFeeHeads() {
      return this.$store.getters.getFeeHeads;
    },
    getExamFeeType() {
      return this.$store.getters.getExamFeeType;
    },
  },

  methods: {
    addMore(exm_master_fee) {
      this.dialogData.exm_master_fee.push({});
    },
    updateFee(exm_master_fee) {
      this.getFeeHeads.forEach((element) => {
        if (element.fee_title == exm_master_fee.fee_title) {
          // exm_master_fee.fee_for = "National University";
          exm_master_fee.student_type = null;
          exm_master_fee.fee_type = element.fee_type;
          exm_master_fee.amount = element.amount;
          exm_master_fee.credit = element.credit;
        }
      });
      // console.log(obj);
    },
    save() {
      let self = this;
      let item = this.dialogData;
      const formData = Object.assign(this.dialogData);
      const isEmpty = !Object.values(item).some((x) => x !== null && x !== "");

      if (!isEmpty) {
        // console.log(formData);
        this.$store
          .dispatch("updateExmMasterFee", formData)
          .then(function (data) {
            try {
              self.close();
              self.$store.dispatch(
                "fetchAllExamsnData",
                self.$parent.searchParam
              );
              Object.keys(item).forEach(function (key, index) {
                item[key] = "";
              });
            } catch (ex) {
              console.log(ex);
            }
          })
          .catch(function (error) {
            console.log(error);
            self.$store.dispatch(
              "fetchAllExamsnData",
              self.$parent.searchParam
            );
          });
      } else {
        console.log("empty");
      }
    },

    close() {
      if (this.dialogData.exm_master_fee.length==0) {
        this.dialogData.exm_master_fee = [];
      }else if(!this.dialogData.exm_master_fee[0].id){
        this.dialogData.exm_master_fee = [];
      }
      this.$emit("update:dialogStatus", false);
    },
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
  },

  created() {
    // this.$store.dispatch("fetchAcSessionData");
    // this.$store.dispatch("fetchExmFeeHeads");
    // this.$store.dispatch("fetchPaperType");
  },
};
</script>

<style scoped></style>
