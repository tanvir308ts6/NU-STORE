<template>
  <v-container fluid fill-height>
    <v-layout column align-center justify-center>
      <v-toolbar dense small flat color="transparent">
        <v-spacer></v-spacer>
        <v-toolbar-title></v-toolbar-title>
        <v-toolbar-items class="text-right">
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12 rounded">
              <v-toolbar color="primary" dark flat>
                <v-layout justify-start>
                  <!-- <div style="text-align: center">New here? Register</div> -->
                  <v-toolbar-title>Register</v-toolbar-title>
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
                    name="organization_name"
                    label=" Organization Name"
                    v-model="user.organization_name"
                    v-validate="'required'"
                    :error-messages="errors.collect('organization_name')"
                    data-vv-name="organization_name"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    name="name"
                    label="Name"
                    v-model="user.name"
                    v-validate="'required'"
                    :error-messages="errors.collect('name')"
                    data-vv-name="name"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-textarea
                    name="address"
                    label="Address"
                    auto-grow
                    rows="1"
                    :error-messages="errors.collect('address')"
                    data-vv-name="address"
                    v-validate="'required'"
                    v-model="user.address"
                    prepend-icon="edit"
                  ></v-textarea>

                  <v-text-field
                    name="mobile"
                    label="Mobile"
                    v-model="user.mobile"
                    v-validate="'required|numeric|max:11|min:11'"
                    :error-messages="errors.collect('mobile')"
                    data-vv-name="mobile"
                    required
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-text-field
                    name="email"
                    label="Email"
                    v-model="email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.username"
                    label="Login Email"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    v-validate="'required'"
                    :error-messages="errors.collect('username')"
                    data-vv-name="username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-validate="'required|min:6'"
                    :error-messages="errors.collect('password')"
                    data-vv-name="password"
                    placeholder="Password"
                    ref="password"
                  ></v-text-field>
                  <v-text-field
                    name="Confirmpassword"
                    label="Confirm Password"
                    placeholder="Password confirmation"
                    v-model="user.confirmedPassword"
                    type="password"
                    v-validate="'required|confirmed:password'"
                    :error-messages="errors.collect('confirmedPassword')"
                    data-vv-name="confirmedPassword"
                    required
                    prepend-icon="lock"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-center class="pb-2">
                  <v-btn color="primary" @click="validationForm">
                    <v-icon left dark>account_circle</v-icon>Register
                  </v-btn>
                </v-layout>
              </v-card-actions>
              <v-flex mb-4></v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  $_veeValidate: { validator: "new" },

  data() {
    return {
      dictionary: {
        custom: {
          name: {
            required: () => "Name field can not be empty"
          },
          organization_name: {
            required: () => " Organization Name field can not be empty"
          },
          address: {
            max: () => "The Address field may not be greater than 30 characters"
          },

          username: {
            required: () => "Username field can not be empty"
          },
          email: {
            required: () => "Email field can not be empty",
            email: " Please type a correct email"
          },
          password: {
            required: () => "Password field can not be empty",
            min: " The Password field may not be lesser than 6 characters"
          },
          confirmedPassword: {
            required: () => "Re-type your password",
            confirmed: "Password must match "
          },
          mobile: {
            required: () => "Mobile field can not be empty",
            numeric: "Mobile field may only contain numeric characters",
            max: "The Mobile field may not be greater than 11 characters",
            min: "The Mobile field may not be lesser than 11 characters"
          }
        }
      },
      expansion: true,
      email: "",
      user: {
        password: "",
        username: "",
        name: "",
        organization_name: "",
        address: "",
        email: "",
        mobile: "",
        confirmedPassword: ""
      }
    };
  },
  components: {},
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    email(val) {
      this.user.username = val;
    }
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    goStart() {
      this.$router.push("/");
    },
    goHome() {
      this.$router.push("/student/dashboard");
    },
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.checkUser();
        }
      });
    },
    checkUser() {
      console.log(this.user);
      this.user.email = this.email;
      this.user.username = this.email;
      var item = {
        email: this.user.email,
        organization_name: this.user.organization_name,
        name: this.user.name,
        mobile: this.user.mobile,
        username: this.user.username,
        password: this.user.password,
        address: this.user.address
      };
      this.$store
        .dispatch("saveSignupData", item)
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          alert("wrong");
        });
    }
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 15px;
}
</style>
