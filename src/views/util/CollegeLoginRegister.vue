<template>
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
        <v-card class="elevation-12 rounded">
          <v-toolbar color="primary" dark flat>
            <v-layout justify-start>
              <v-toolbar-title>College Login</v-toolbar-title>
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
                v-model="user.username"
                label="Login (College Code)"
                name="username"
                prepend-icon="person"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center class="pb-2">
              <v-btn color="primary" @click="checkUser">
                <v-icon left dark>account_circle</v-icon>Login
              </v-btn>
              <a @click="goForgetPassword"  class="text-center mt-2 ml-3">
                Forget Password ?
              </a>
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
</template>

<script>
export default {
  data() {
    return {
      expansion: true,

      user: {
        password: "",
        username: ""
      }
    };
  },
  components: {},
  methods: {
    goStart() {
      this.$router.push("/");
    },
    goHome() {
      this.$router.push("/college/dashboard");
    },
    goForgetPassword() {
      this.$router.push("/c-forget-password");
    },
    checkUser() {
      // console.log(this.user)
      this.$store
        .dispatch("authenticateCollege", this.user)
        .then(() => {
          this.$router.push("/college/dashboard");
        })
        .catch(() => {
          alert("wrong");
        });
    }
  },
  mounted() {
    localStorage.clear();
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 15px;
}
</style>
