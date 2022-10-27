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
                            <v-toolbar-title>Reset Password</v-toolbar-title>
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
                        <div class="alert info" style="display: none;" id="alert">
                            <p class="text-md-center" id="alert-message" style="padding: 5px;color: white;"></p>
                        </div>
                        <v-form>
                            <v-text-field
                                    v-model="user.email"
                                    label="Email"
                                    name="email"
                                    prepend-icon="email"
                                    type="text"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout justify-center class="pb-2">
                            <v-btn color="error" @click="goBack">
                                <v-icon left dark>account_circle</v-icon>Back
                            </v-btn>
                            <v-btn color="primary" @click="sendEmail">
                                <v-icon left dark>account_circle</v-icon>Send Link
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
  export default {
    data() {
      return {
        expansion: true,
        user: {
          email : ""
        }
      };
    },
    components: {},
    methods: {
      goBack() {
        this.$router.push("/cu-login");
      },
      sendEmail(){
        this.$store.dispatch("sendCollegeUserEmail",this.user).then(response=>{

        }).catch(error=>{
          console.log(error);
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
