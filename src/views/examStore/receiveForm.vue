<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Receive Items
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="indigo">
          <v-toolbar-title>Receive Item Form</v-toolbar-title>
          <v-spacer />
          <v-btn
            fab
            class="ma-1 pa-0"
            small
            color="red darken-3 white--text"
            @click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- dialog body -->
        <v-card>
          <template>
            <v-form v-model="valid">
              <v-container>
                <v-layout>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="email"
                      label="Date"
                      type = "date"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </template>
        </v-card>
        <v-footer>
          <v-spacer />
          <v-toolbar-items>
            <v-btn color="indigo white--text" text @click="dialog = false">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-footer>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
    };
  },
};
</script>

<style></style>
