<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <!-- external start -->
      <v-dialog
        v-model="progress_status"
        persistent
        fullscreen
        content-class="loading-dialog"
      >
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="100"
              :width="10"
              :color="progress_color"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
      <!-- </v-layout> -->
      <v-snackbar
        v-model="snackbar_vmodel"
        :color="snackbar_color"
        :timeout="snackbar_timeout"
        :multi-line="snackbar_multiline"
        bottom
        left
      >
        {{ snackbar_msg }}
        <v-icon color="white" flat @click="snackbar_vmodel = false"
          >clear</v-icon
        >
      </v-snackbar>

      <!-- external end -->
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
              <v-toolbar-title>New Password</v-toolbar-title>
            </v-layout>
            <v-img
              justify-end
              wrap
              :src="require('@/assets/nu_logos/nu_logo_r.png')"
              contain
              height="100"
            >
            </v-img>
          </v-toolbar>
          <v-card-text class="pa-0 pt-3 pr-4 pl-3">
            <div class="alert error" style="display: none;" id="alert">
              <p
                class="text-md-center"
                id="alert-message"
                style="padding: 5px;color: white;"
              ></p>
            </div>
            <div class="alert info" style="display: none;" id="alert">
              <p
                class="text-md-center"
                id="alert-message"
                style="padding: 5px;color: white;"
              ></p>
            </div>
            <v-form>
              <v-text-field
                id="password"
                v-model="user.password"
                label="Password"
                name="Password"
                prepend-icon="settings"
                type="password"
              ></v-text-field>
              <v-text-field
                id="confimrPassword"
                v-model="user.password_confirmation"
                label="Confirm Password"
                name="Confirm Password"
                prepend-icon="settings"
                type="password"
                @keyup="showError"
              ></v-text-field>
              <p id="error" class="text-md-right"></p>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center class="pb-2">
              <v-btn color="error" @click="login">
                <v-icon left dark>account_circle</v-icon>Login
              </v-btn>
              <v-btn color="primary" @click="savePassword">
                <v-icon left dark>account_circle</v-icon>Update Password
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
    <confirm ref="confirm"></confirm>
  </v-container>
</template>

<script>
import confirm from "@/components/utils/confirm.vue";
export default {
  components: {
    confirm
  },
  data() {
    return {
      expansion: true,
      user: {
        password: "",
        password_confirmation: "",
        reset_code: this.$route.params.reset_code
      }
    };
  },

  methods: {
    login() {
      this.$router.push("/student-login");
    },
    savePassword() {
      var password = document.getElementById("password");
      var confirmPassword = document.getElementById("confimrPassword");
      if (password.value.trim() == "") {
        alert("Password Can not be empty");
      } else if (confirmPassword.value.trim() == "") {
        alert("Confirm Password Can not be empty");
      } else if (confirmPassword.value != password.value) {
        alert("Password & confirm  password not matched");
      } else {
        this.$root.$confirm("Are you sure ?").then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("resetStudentPassword", this.user)
              .then(response => {
                this.$router.push("/student-login");
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      }
    },
    showError() {
      var p = document.getElementById("password");
      var cp = document.getElementById("confimrPassword");
      if (p.value.length < 6 && cp.value.length < 6) {
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert-message").innerHTML =
          "At least 6 character";
      } else if (p.value == cp.value) {
        var error = document.getElementById("error");
        error.style.display = "block";
        error.innerHTML = "Password Matched";
        error.style.color = "green";
      } else if (cp.value != p.value) {
        var error = document.getElementById("error");
        error.style.display = "block";
        error.innerHTML = "Password Not Matched";
        error.style.color = "red";
      }
    }
  },
  computed: {
    progress_status() {
      return this.$store.getters.getLoading;
    },
    progress_color() {
      return this.$store.getters.getLoadingColor;
    },
    snackbar_color() {
      return this.$store.getters.getSnackbarColor;
    },
    snackbar_msg() {
      return this.$store.getters.getSnackbarMsg;
    },
    snackbar_timeout() {
      return this.$store.getters.getSnackbarTimeout;
    },
    snackbar_multiline() {
      return this.$store.getters.getSnackbarMultiline;
    },
    snackbar_vmodel: {
      get: function() {
        return this.$store.getters.getSnackbar;
      },
      set: function(val) {
        this.$store.commit("UNSET_SNACKBAR");
      }
    }
  },
  mounted() {
    localStorage.clear();
    this.$root.$confirm = this.$refs.confirm.open;
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 15px;
}
</style>
