<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialogStatus"
      persistent
      transition="dialog-bottom-transition"
      :max-width="500"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Edit Student Profile</v-toolbar-title>
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
                  <v-layout class="justify-center" row wrap>
                    <v-flex md12>
                      <v-text-field
                        name="email"
                        label="Email"
                        v-model="profile.email"
                        v-validate="'required'"
                        data-vv-name="email"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        name="mobile"
                        label="Mobile No."
                        v-model="profile.mobile"
                        v-validate="{ required: true }"
                        data-vv-name="mobile"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <!-- <v-flex md3>
                      <v-select
                        v-model="exm_master_fee.fee_title"
                        :items="getFeeHeads"
                        item-text="fee_title"
                        item-value="fee_title"
                        label="Select Fee Head"
                        @change="updateFee(exm_master_fee)"
                        prepend-icon="list"
                      ></v-select>
                    </v-flex>-->
                    <!-- <v-flex md2>
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
                        :items="fee_type"
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
                        @click="dialogData.exm_master_fee.splice(index,1)"
                      >
                        <v-icon dark>clear</v-icon>
                      </v-btn>
                    </v-flex>-->
                  </v-layout>
                  <!-- <v-layout>
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
                  </v-layout>-->
                  <v-layout>
                    <div class="justify-center layout px-0">
                      <v-btn color="success" @click="save">Update</v-btn>
                    </div>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
          <!-- <pre>{{profile}}</pre> -->
          <!-- <pre>{{dialogData}}</pre> -->
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
  $_veeValidate: {
    validator: "new"
  },
  props: ["dialogStatus", "dialogData"],
  computed: {
    profile() {
      return this.$store.getters.getStudentProfile;
    }
  },
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    save() {
      let self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$root.$confirm("Are you sure?").then(confirm => {
            if (confirm) {
              self.$store
                .dispatch("StudentInfoUpdate", self.profile)
                .then(success => {
                  this.close();
                });
            }
          });
        }

        // console.log(result);
      });
    },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
