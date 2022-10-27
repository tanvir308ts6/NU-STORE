<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>College Information</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-flex xs12 md10 offset-md1>
            <v-card>
              <v-spacer class="pa-3"></v-spacer>
              <h1 class="display-1 font-weight-light text-md-center">
                {{ detailsData ? detailsData.college_name : "" }} ({{
                  detailsData.college_code
                }})
                <v-divider inset></v-divider>
              </h1>
              <h2 class="headline font-weight-light text-md-center">
                EIIN NO - ({{ detailsData ? detailsData.college_eiin : "" }})
              </h2>
              <v-spacer class="pa-1"></v-spacer>
              <h4 class="body-2 text-md-center text--primary">
                {{ detailsData ? detailsData.address : "" }}
              </h4>
              <v-spacer class="pa-3"></v-spacer>

              <v-layout row wrap>
                <v-flex md10 offset-md1>
                  <v-card flat>
                    <v-card-text>
                      <table>
                        <tr>
                          <th class="text-md-left">
                            <v-icon color="indigo">mail</v-icon> Email
                          </th>
                          <td>: {{ detailsData.email }}</td>
                        </tr>
                        <tr v-if="detailsData.phone">
                          <th class="text-md-left">
                            <v-icon color="indigo">phone</v-icon> Phone
                          </th>
                          <td>: {{ detailsData.phone }}</td>
                        </tr>
                        <tr>
                          <th class="text-md-left">
                            <v-icon color="indigo">smartphone</v-icon> Mobile
                          </th>
                          <td>: {{ detailsData.mobile }}</td>
                        </tr>
                        <tr v-if="detailsData.fax">
                          <th class="text-md-left">
                            <v-icon color="indigo">local_printshop</v-icon> FAX
                          </th>
                          <td>: {{ detailsData.fax }}</td>
                        </tr>
                        <tr>
                          <th class="text-md-left">
                            <v-icon color="indigo">vpn_key</v-icon> Password
                          </th>
                          <td>: {{ detailsData.password_txt }}</td>
                        </tr>
                        <tr v-if="detailsData.web_url">
                          <th class="text-md-left">
                            <v-icon color="indigo">web</v-icon> Website
                          </th>
                          <td>
                            :
                            <a :href="detailsData.web_url" target="_blank">
                              {{ detailsData.college_name }}
                            </a>
                          </td>
                        </tr>

                        <tr v-if="detailsData.divisions">
                          <th class="text-md-left">
                            <v-icon color="indigo">place</v-icon> Division
                          </th>
                          <td>: {{ detailsData.divisions.division_name }}</td>
                        </tr>
                        <tr v-if="detailsData.districts">
                          <th class="text-md-left">
                            <v-icon color="indigo">place</v-icon> District
                          </th>
                          <td>: {{ detailsData.districts.district_name }}</td>
                        </tr>
                        <tr v-if="detailsData.thanas">
                          <th class="text-md-left">
                            <v-icon color="indigo">place</v-icon> Thana
                          </th>
                          <td>: {{ detailsData.thanas.thana_name }}</td>
                        </tr>
                        <tr v-if="detailsData.post_code">
                          <th class="text-md-left">
                            <v-icon color="indigo">place</v-icon> Post Code
                          </th>
                          <td>: {{ detailsData.post_code }}</td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-spacer class="pa-3"></v-spacer>

              <!--<pre>
                                 {{detailsData}}
                            </pre>-->
            </v-card>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["dialogStatus", "detailsData"],
  data: () => ({
    dialog: false
  }),

  methods: {
    close() {
      this.$emit("update:dialogStatus", false);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped>
th,
td {
  padding: 8px;
  font-size: 16px;
}
.v-icon {
  font-size: 20px;
}
</style>
