<template>
  <v-container fluid fill-height>
    <v-layout column align-center justify-center>
      <v-toolbar dense small flat color="transparent">
        <v-spacer></v-spacer>
        <v-toolbar-items class="text-right">
          <!-- <v-btn color="primary" @click="register">Register</v-btn> -->
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <!-- loging -->

            <!-- <v-expansion-panel popout
        v-model="expansion">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Login</div>
            </template>-->
            <v-card class="elevation-12 rounded mt-5">
              <v-toolbar color="primary" dark flat>
                <v-layout justify-start>
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-layout>
                <!-- <v-progress-linear :indeterminate="true"></v-progress-linear> -->
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
                    v-model="user.email"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    @keyup.enter="checkUser()"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    @keyup.enter="checkUser()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-progress-linear v-if="loader" :indeterminate="true"></v-progress-linear>
              <v-card-actions>
                <v-layout justify-center class="pb-2">
                  <v-btn color="primary" @click="checkUser">
                    <v-icon left dark>account_circle</v-icon>Login
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
    </v-layout>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [common_login_getters],
  data() {
    return {
      expansion: true,
      loader: false,
      user: {
        password: "",
        email: "",
      },
    };
  },
  components: {},
  methods: {
    register() {
      this.$router.push("/register");
    },

    goStart() {
      this.$router.push("/");
    },
    goHome() {
      this.$router.push("/home");
    },
    goTo() {
      if (this.ifCenterUser) {
        this.$router.push("/center/center-dashboard");
      } else if (this.ifInvigilatorUser) {
        this.$router.push("/invigilator-dashboard");
      } else if (this.ifRegionalUser) {
        this.$router.push("/regional-center-dashboard");
      } else if (this.ifRescrutinerUser) {
        this.$router.push("/rescrutiny-std-list");
      } else if (this.ifExaminerUser) {
        this.$router.push("/examiner/examiner-dashboard");
      } else if (this.ifHeadExaminerUser) {
        this.$router.push("/examiner-by-head-examiner");
      } else if (this.ifDirectorICTUser) {
        this.$router.push("/result-approval");
      } else if (this.ifSeniorAnalystUser) {
        this.$router.push("/result-approval");
      } else if (this.ifITUser) {
        this.$router.push("/result-approval");
      } else if (this.ifControllerUser) {
        this.$router.push("/result-approval");
      } else if (this.ifVcUser) {
        this.$router.push("/result-approval");
      } else if (this.ifAdminUserType || this.ifControllerUser) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/home");
      }
    },
    checkUser() {
      // console.log(this.user)
      this.loader = true;
      this.$store
        .dispatch("authenticateUser", this.user)
        .then(() => {
          this.loader = false;
          if (this.ifCenterUser) {
            // this.setCorrectCenter();
          }
          this.goTo();
        })
        .catch((ex) => {
          console.log("ex", ex);
          this.loader = false;
          alert("wrong... authentication");
        });
    },
    setCorrectCenter() {
      let payload = {};
      payload.type = 1;
      payload.center_list_id = this.getAuthUser.center.id;
      payload.exam_initiate_id = this.getExamInitiateId;
      console.log("payload === ", payload);
      this.$store.dispatch("setCorrectCenter", payload);
    },
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 15px;
}
</style>
