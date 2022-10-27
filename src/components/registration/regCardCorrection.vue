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
          <v-toolbar-title>
            Registration Card Request For
            <span v-if="confirmData.correction_type === '6'">
              Correction
            </span>
            <span v-else> Duplicate</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card>
            <v-toolbar dense>
              <v-toolbar-title class="text-uppercase">
                Personal Information
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <v-container grid-list-md fluid>
                <v-layout row wrap>
                  <template v-if="confirmData.correction_type != 7">
                    <v-flex md6>
                      <v-toolbar
                        color="cyan darken-4"
                        class="white--text"
                        dense
                      >
                        <v-toolbar-title class="text-uppercase"
                          >Registered Information
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>

                      <table>
                        <tr>
                          <th style="width: 20%">Name</th>
                          <td>: {{ confirmData.prev_std_name }}</td>
                        </tr>
                        <tr>
                          <th>Father Name</th>
                          <td>: {{ confirmData.prev_std_name }}</td>
                        </tr>
                        <tr>
                          <th>Mother Name</th>
                          <td>: {{ confirmData.prev_father_name }}</td>
                        </tr>
                      </table>
                    </v-flex>

                    <v-flex md6>
                      <v-toolbar
                        color="cyan darken-4"
                        class="white--text"
                        dense
                      >
                        <v-toolbar-title class="text-uppercase"
                          >Request for Correction
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>

                      <table>
                        <tr>
                          <th style="width: 20%">Name</th>
                          <td>
                            :
                            {{
                              confirmData.new_std_name
                                ? confirmData.new_std_name
                                : "N/A"
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th>Father Name</th>
                          <td>
                            :
                            {{
                              confirmData.new_father_name
                                ? confirmData.new_father_name
                                : "N/A"
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th>Mother Name</th>
                          <td>
                            :
                            {{
                              confirmData.new_mother_name
                                ? confirmData.new_mother_name
                                : "N/A"
                            }}
                          </td>
                        </tr>
                      </table>
                    </v-flex>
                  </template>

                  <template v-else>
                    <v-flex md12>
                      <v-toolbar
                        color="cyan darken-4"
                        class="white--text"
                        dense
                      >
                        <v-toolbar-title class="text-uppercase"
                          >Registered Information
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>

                      <table>
                        <tr>
                          <th style="width: 20%">Name</th>
                          <td>: {{ confirmData.prev_std_name }}</td>
                        </tr>
                        <tr>
                          <th>Father Name</th>
                          <td>: {{ confirmData.prev_std_name }}</td>
                        </tr>
                        <tr>
                          <th>Mother Name</th>
                          <td>: {{ confirmData.prev_father_name }}</td>
                        </tr>
                      </table>
                    </v-flex>
                  </template>

                  <v-spacer class="ma-3"></v-spacer>
                  <v-flex md12>
                    <v-toolbar color="cyan darken-4" class="white--text" dense>
                      <v-toolbar-title class="text-uppercase"
                        >Academic Information
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>

                    <table>
                      <tr>
                        <th class="text-md-center">Reg. No.</th>
                        <!--                                                <th class="text-md-center">Subject Code & Name</th>-->
                        <th class="text-md-center">Course</th>
                        <th class="text-md-center">College & Name</th>
                      </tr>
                      <tr>
                        <td class="text-md-center">{{ confirmData.reg_no }}</td>
                        <!--                                                <td class="text-md-center">Griffin</td>-->
                        <td class="text-md-center">
                          {{
                            confirmData.degree_group
                              ? confirmData.degree_group.degree_group_name
                              : "N/A"
                          }}
                        </td>
                        <td class="text-md-center">
                          ({{ confirmData.college_code }})
                          {{ confirmData.college_name }}
                        </td>
                      </tr>
                    </table>
                  </v-flex>

                  <v-spacer class="ma-3"></v-spacer>
                  <v-flex md12>
                    <v-toolbar color="cyan darken-4" class="white--text" dense>
                      <v-toolbar-title class="text-uppercase"
                        >Other Information
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>

                    <table>
                      <tr>
                        <th style="width: 20%">Remarks</th>
                        <td>
                          :
                          {{
                            confirmData.remarks ? confirmData.remarks : "N/A"
                          }}
                        </td>
                      </tr>
                      <tr>
                        <th>Amount Paid</th>
                        <td>
                          :
                          {{
                            confirmData.amount_pay
                              ? confirmData.amount_pay
                              : "N/A"
                          }}
                        </td>
                      </tr>

                      <tr>
                        <th>Bank Tracking No.</th>
                        <td>
                          :
                          {{
                            confirmData.tracking_no_bc
                              ? confirmData.tracking_no_bc
                              : "N/A"
                          }}
                        </td>
                      </tr>

                      <tr>
                        <th class="text-md-left">Approve Date</th>
                        <td>: {{ formatDate(confirmData.approved_date) }}</td>
                      </tr>
                    </table>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="justify-center layout px-0 mt-2">
                <v-btn
                  v-if="confirmData.correction_type == 6"
                  color="primary"
                  dark
                  @click="confirm"
                >
                  Confirm
                </v-btn>
                <v-btn color="error" @click="close">Close</v-btn>
              </div>
            </v-card-actions>
            <v-spacer class="mb-3"></v-spacer>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["dialogStatus", "confirmData"],
  data: () => ({
    dialog: false
  }),

  methods: {
    formatDate(dateconvart) {
      const current_datetime = new Date(dateconvart);
      const formatted_date =
        current_datetime.getDate() +
        "-" +
        ("0" + (current_datetime.getMonth() + 1)).slice(-2) +
        "-" +
        current_datetime.getFullYear();
      return formatted_date;
    },
    confirm() {
      if (this.confirmData) {
        let self = this;
        let item = [this.confirmData];
        const stdData = { correction: item };
        //let data = JSON.stringify(stdData);
        //console.log(data);
        this.$store
          .dispatch("studentRegCorrection", stdData)
          .then(function(data) {
            try {
              self.close();
              self.$store.dispatch("fetchRegCorrectionList", self.searchParam);
            } catch (ex) {
              console.log(ex);
            }
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchRegCorrectionList", self.searchParam);
          });
        //this.dialog = false;
      }
    },

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
/*  th, td {
          padding: 8px;
          font-size: 16px;
      }

      .v-icon {
          font-size: 20px;
      }*/

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
