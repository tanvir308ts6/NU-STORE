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
                            <v-toolbar-title>New Password</v-toolbar-title>
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
                        <div class="alert error" style="display: none;" id="alert">
                            <p class="text-md-center" id="alert-message" style="padding: 5px;color: white;"></p>
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
                                    id="confirmPassword"
                                    v-model="user.password_confirmation"
                                    label="Confirm Password"
                                    name="Confirm Password"
                                    prepend-icon="settings"
                                    type="password"
                                    @click="showError"
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
    </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        expansion: true,
        user: {
          password : "",
          password_confirmation: "",
          reset_code : this.$route.params.reset_code
        }
      };
    },
    components: {},

    methods: {
      login(){
        this.$router.push('/cu-login');
      },
      savePassword(){
        this.$store
        .dispatch("resetCollegeUserPassword", this.user)
        .then(response => {
          this.$router.push('/cu-login');

        })
        .catch(error => {
          console.log(error);
        });
      },
      showError(){
        var p = document.getElementById('password');
        var cp = document.getElementById('confimrPassword');
        if(p.value.length < 6 && cp.value.length < 6){
          document.getElementById('alert').style.display = "block";
          document.getElementById("alert-message").innerHTML= "At least 6 character";
        } else if(p.value == cp.value){
          var error = document.getElementById('error');
          error.style.display = "block";
          error.innerHTML = "Password Matched";
          error.style.color = "green";
        } else if(cp.value != p.value){
          var error = document.getElementById('error');
          error.style.display = "block";
          error.innerHTML = "Password Not Matched";
          error.style.color = "red";
        }
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
