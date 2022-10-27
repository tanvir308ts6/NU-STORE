<template>
  <div id="changePassword">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12 rounded">
            <v-toolbar color="primary" dark flat>
              <v-layout justify-start>
                <v-toolbar-title>Change Password</v-toolbar-title>
              </v-layout>
              <v-img
                justify-end
                wrap
                :src="require('@/assets/nu_logos/nu_logo_r.png')"
                contain
                height="100"
              ></v-img>
            </v-toolbar>
            <v-card-text class="pa-0 pt-3 pr-4 pl-3">
              <v-form>
                <v-text-field
                        v-model="user.id"
                        id="organizationId"
                        name="password"
                        type="hidden"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  id="password"
                  name="password"
                  prepend-icon="vpn_key"
                  ref="password"
                  type="password"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  label="New Password"
                  data-vv-name="pass"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.confirm_password"
                  id="confirm_password"
                  name="confirm_password"
                  prepend-icon="lock"
                  type="password"
                  v-validate="'required|confirmed:password'"
                  :error-messages="errors.collect('confirm_password')"
                  label="Confirm Password"
                  data-vv-name="password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center class="pb-2">
                <v-btn color="primary" @click="submit">
                  <v-icon left dark>account_circle</v-icon>Submit
                </v-btn>
              </v-layout>
            </v-card-actions>
            <v-flex mb-4></v-flex>
          </v-card>
          <!-- </v-expansion-panel-content>
          </v-expansion-panel>-->

          <!-- <v-layout justify-center>
          <v-btn color="primary" outline @click="goStart">Start</v-btn>
          </v-layout>-->
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <pre>{{params}}</pre> -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      form : {
        'id' : "",
        password : '',
        confirm_password : ''
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters.organization;
    },
  },
  methods: {
    submit() {
      var password = document.getElementById('password');
      var confirmPassword = document.getElementById('confirm_password');
      if(password.value.trim() == ""){
        alert('Password Required');
      } else if(confirmPassword.value.trim() == ""){
        alert('Confirm Password Required');
      } else if(confirmPassword.value != password.value){
        alert('Password And Confirm password not matched');
      } else {
        this.$store.dispatch("ChangeOrganizationPassword", this.form)
        .then(() => {
        this.$router.push("/org-login");
      });
      }
      
      // let self = this;
      // this.$validator.validateAll().then((result) => {
      //   if (result) {
      //     this.$root
      //       .$confirm("Are you sure that you want to Change Password?")
      //       .then((confirm) => {
      //         if (confirm) {
      //           self.$store
      //             .dispatch("ChangeOrganizationPassword", self.form,self.user)
      //             .then((success) => {
      //               this.$router.push("/org-login");
      //             });
      //         }
      //       });
      //   }
      //
      //   // console.log(result);
      // });
    },
    clear() {
      this.params = {};
    },
  },
  mounted() {
    this.$parent.navigation.shown = false;
    var takeId = document.getElementById('organizationId').value;
    this.form.id = takeId;
    // this.$root.$confirm = this.$refs.confirm.open;
    console.log(this.form)
  },
};
</script>
</script>
<style scoped>
.rounded {
  border-radius: 15px;
}
</style>