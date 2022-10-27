<template>
  <v-layout row justify-center>
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
      <v-icon color="white" flat @click="snackbar_vmodel = false">clear</v-icon>
    </v-snackbar>

    <!-- external end -->
    <v-dialog
      v-model="dialogStatus"
      persistent
      transition="dialog-bottom-transition"
      :max-width="500"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Edit Organization Info</v-toolbar-title>
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
                  <v-text-field
                    name="name"
                    label="Organization Name"
                    v-model="user.name"
                    v-validate="'required'"
                    data-vv-name="name"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    label="Email"
                    v-model="user.email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
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
                  <v-layout>
                    <div class="justify-center layout px-0">
                      <v-btn color="success" @click="update">Update</v-btn>
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
    user() {
      return this.$store.getters.organization;
    },
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
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    update() {
      this.$store
        .dispatch("updateOrganizationProfile", this.user)
        .then(success => {
          this.close();
        });
      // this.$root.$confirm("Are you sure?").then(confirm => {
      //   if (confirm) {
      //     this.$store
      //       .dispatch("updateOrganizationProfile", this.user)
      //       .then(success => {
      //         this.close();
      //       });
      //   }
      // });
    },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
