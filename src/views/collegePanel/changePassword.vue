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
                  v-model="params.password"
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
                  v-model="params.confirm_password"
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
  data: () => ({
    params: {},
    pass: "",
    pass2: ""
  }),
  methods: {
    submit() {
      let self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$root
            .$confirm("Are you sure that you want to Change Password?")
            .then(confirm => {
              if (confirm) {
                self.$store
                  .dispatch("CollegeChangePassword", self.params)
                  .then(success => {
                    this.$router.push("/c-login");
                  });
              }
            });
        }
        // console.log(result);
      });
    },
    clear() {
      this.params = {};
    }
  },
  mounted() {
    this.$parent.navigation.shown = false;
  }
};
</script>
<style scoped>
.rounded {
  border-radius: 15px;
}
</style>
