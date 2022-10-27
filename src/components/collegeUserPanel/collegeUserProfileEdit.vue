/* eslint-disable no-unused-vars */
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
          <v-toolbar-title>College User Profile Update</v-toolbar-title>
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
                        name="username"
                        label="User Name"
                        v-model="profile.username"
                        v-validate="'required'"
                        data-vv-name="username"
                        required
                        prepend-icon="edit"
                      ></v-text-field>
                      <v-text-field
                        name="name"
                        label="name"
                        v-model="profile.name"
                        v-validate="'required'"
                        data-vv-name="name"
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
                      <label for="">Photo</label>
                      <input
                        name="photo_url"
                        type="file"
                        @change="changePhoto($event)"
                      />
                      <img
                        v-show="photo_url"
                        :src="photo_url"
                        alt=""
                        width="80"
                        height="80"
                      />
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
      return this.$store.getters.getAuthCollegeUser;
    }
  },
  data() {
    return {
      dialog: true,
      photo_url: null
    };
  },
  methods: {
    changePhoto(event) {
      this.profile.photo_url = event.target.files[0];
      //   console.log(this.profile)
      let reader = new FileReader();
      //   let file = event.target.files[0];
      reader.onload = event => {
        this.photo_url = event.target.result;
        console.log(this.photo_url);
      };
      //   reader.readAsDataURL(file);
    },
    save() {
      let self = this;
      this.$root.$confirm("Are you sure?").then(confirm => {
        if (confirm) {
          self.$store
            .dispatch("profileUpdateCollegeUser", self.profile)
            // eslint-disable-next-line no-unused-vars
            .then(success => {
              self.$store.dispatch("getCollegeUserProfile");

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
