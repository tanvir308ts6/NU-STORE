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
          <v-toolbar-title>Edit College Profile</v-toolbar-title>
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
                        name="web_url"
                        label="Web Url"
                        v-model="profile.web_url"
                        v-validate="'required'"
                        data-vv-name="web_url"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
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
                        label="Mobile"
                        v-model="profile.mobile"
                        v-validate="'required'"
                        data-vv-name="mobile"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        name="phone"
                        label="Phone"
                        v-model="profile.phone"
                        v-validate="'required'"
                        data-vv-name="phone"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        name="fax"
                        label="Fax"
                        v-model="profile.fax"
                        v-validate="'required'"
                        data-vv-name="fax"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

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
      return this.$store.getters.getAuthCollege;
    }
  },
  data() {
    return {
      dialog: true,
      college: {
        web_url: "",
        email: "",
        mobile: "",
        phone: "",
        fax: ""
      }
    };
  },
  methods: {
    save() {
      let self = this;
      this.$root.$confirm("Are you sure?").then(confirm => {
        if (confirm) {
          self.$store
            .dispatch("updateCollegeProfile", self.profile)
            .then(success => {
              this.close();
            });
        }
      });
      // let self = this;
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      //     this.$root.$confirm("Are you sure?").then(confirm => {
      //       if (confirm) {
      //         self.$store
      //         .dispatch("updateCollegeProfile", self.profile)
      //         .then(success => {
      //           this.close();
      //         });
      //       }
      //     });
      //   }
      //
      //   // console.log(result);
      // });
    },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
