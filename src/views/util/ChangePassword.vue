<template>
  <div id="changePassword" class="mt-5 pt-5">
    <v-container fluid fill-height style="margin-top: 170px;margin-bottom: 240px;">
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
              <v-form data-vv-scope="form1">
                <v-text-field
                  v-model="params.old_password"
                  id="old_password"
                  name="old_password"
                  prepend-icon="vpn_key"
                  ref="old_password"
                  type="password"
                  v-validate="modelValidations.old_password"
                  :error-messages="errors.collect('form1.old_password')"
                  label="Old Password"
                  data-vv-name="old_password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="params.password"
                  id="password"
                  name="password"
                  prepend-icon="key"
                  ref="password"
                  type="password"
                  v-validate="modelValidations.password"
                  :error-messages="errors.collect('form1.password')"
                  label="New Password"
                  data-vv-name="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="params.password_confirmation"
                  id="password_confirmation"
                  name="password_confirmation"
                  prepend-icon="lock"
                  type="password"
                  v-validate="modelValidations.password_confirmation"
                  :error-messages="errors.collect('form1.password_confirmation')"
                  label="Confirm Password"
                  data-vv-name="password_confirmation"
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
    modelValidations: {
      old_password: {
        required: true,
      },
      password: {
        required: true,
        min: 6,
      },
      password_confirmation: {
        required: true,
        confirmed: "password",
      },
    },
  }),
  methods: {
    submit() {
      let self = this;
      this.$validator.validateAll("form1").then((result) => {
        if (result) {
          this.$root.$confirm("Are you sure that you want to Change Password?").then((confirm) => {
            if (confirm) {
              self.$store.dispatch("ChangePassword", self.params).then((success) => {
                self.$router.push("/");
              });
            }
          });
        }

        // console.log(result);
      });
    },
    clear() {
      this.params = {};
    },
  },
  mounted() {
    this.$parent.navigation.shown = false;
    // this.$root.$confirm = this.$refs.confirm.open;
  },
};
</script>
<style scoped>
.rounded {
  border-radius: 15px;
}
</style>
