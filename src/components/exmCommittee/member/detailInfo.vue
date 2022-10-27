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
          <v-toolbar-title>Member Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-card>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  md3
                  offset-md9
                  align-end
                  v-if="_.isEmpty(getSchema.photo) === false"
                >
                  <v-img
                    :src="getSchema.photo"
                    aspect-ratio="1.6"
                    contain
                  ></v-img>
                </v-flex>
                <v-spacer class="ma-2"></v-spacer>

                <v-toolbar color="cyan darken-4" class="white--text" dense>
                  <v-toolbar-title class="text-uppercase"
                    >Personal Information
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-flex md12>
                  <table>
                    <tr>
                      <th style="width: 15%">Name</th>
                      <td style="width: 25%">: {{ getSchema.name }}</td>
                      <th style="width: 15%">Father Name</th>
                      <td>: {{ getSchema.father_name }}</td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td>: {{ genderType(getSchema.gender) }}</td>
                      <th>Date Of Birth</th>
                      <td>: {{ formatted_date(getSchema.date_of_birth) }}</td>
                    </tr>
                    <tr>
                      <th>NID No.</th>
                      <td>: {{ getSchema.nid_no }}</td>
                      <th>Joining Date</th>
                      <td>: {{ formatted_date(getSchema.joining_date) }}</td>
                    </tr>

                    <tr>
                      <th>Organization</th>
                      <td>: {{ orgType(getSchema.organization_type) }}</td>
                      <th>Designation</th>
                      <td>: {{ teacherDesignation(getSchema.designation) }}</td>
                    </tr>

                    <tr>
                      <th>Subject Code & Name</th>
                      <td>
                        :
                        {{
                          getSchema.subjects
                            ? `(${getSchema.subjects.subject_code})` +
                              " " +
                              getSchema.subjects.subject_name
                            : ""
                        }}
                      </td>
                      <th>Index No.</th>
                      <td>: {{ getSchema.index_no }}</td>
                    </tr>
                    <tr>
                      <th>Signature</th>
                      <td>
                        <span v-if="_.isEmpty(getSchema.signature) === false">
                          <v-img
                            :src="getSchema.signature"
                            width="80"
                            contain
                          ></v-img>
                        </span>
                      </td>
                    </tr>
                  </table>

                  <br />
                  <br />
                </v-flex>

                <v-toolbar color="cyan darken-4" class="white--text" dense>
                  <v-toolbar-title class="text-uppercase"
                    >College Information
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-flex md12>
                  <table>
                    <tr>
                      <th style="width: 15%">Division</th>
                      <td style="width: 25%">
                        :
                        {{
                          getSchema.divisions
                            ? getSchema.divisions.division_name
                            : ""
                        }}
                      </td>
                      <th style="width: 15%">District</th>
                      <td>
                        :
                        {{
                          getSchema.districts
                            ? getSchema.districts.district_name
                            : ""
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>Thana</th>
                      <td>
                        :
                        {{
                          getSchema.thanas ? getSchema.thanas.thana_name : ""
                        }}
                      </td>
                      <th>College Code & Name</th>
                      <td>
                        :
                        {{
                          getSchema.colleges
                            ? `(${getSchema.colleges.college_code})` +
                              "" +
                              getSchema.colleges.college_name
                            : ""
                        }}
                      </td>
                    </tr>
                  </table>

                  <br />
                  <br />
                </v-flex>

                <v-toolbar color="cyan darken-4" class="white--text" dense>
                  <v-toolbar-title class="text-uppercase"
                    >Teacher (Other Then College)
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-flex md12>
                  <table>
                    <tr>
                      <th style="width: 15%">Organization</th>
                      <td style="width: 25%">
                        :
                        {{
                          getSchema.teacher_organization
                            ? getSchema.teacher_organization
                            : "N/A"
                        }}
                      </td>
                      <th style="width: 15%">Designation</th>
                      <td>
                        :
                        {{
                          getSchema.teacher_designation
                            ? getSchema.teacher_designation
                            : "N/A"
                        }}
                      </td>
                    </tr>
                  </table>

                  <br />
                  <br />
                </v-flex>

                <v-toolbar color="cyan darken-4" class="white--text" dense>
                  <v-toolbar-title class="text-uppercase"
                    >Contact Information
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-flex md12>
                  <table>
                    <tr>
                      <th style="width: 15%">Present Address</th>
                      <td style="width: 25%">
                        :
                        {{
                          getSchema.present_address
                            ? getSchema.present_address
                            : "N/A"
                        }}
                      </td>
                      <th style="width: 15%">Permanent Address</th>
                      <td>
                        :
                        {{
                          getSchema.permanent_address
                            ? getSchema.permanent_address
                            : "N/A"
                        }}
                      </td>
                    </tr>

                    <tr>
                      <th>Email</th>
                      <td>: {{ getSchema.email }}</td>
                      <th>Mobile</th>
                      <td>: {{ getSchema.mobile }}</td>
                    </tr>

                    <tr>
                      <th>Home Phone</th>
                      <td>: {{ getSchema.phone ? getSchema.phone : "N/A" }}</td>
                      <th>Office Phone</th>
                      <td>
                        :
                        {{
                          getSchema.office_phone
                            ? getSchema.office_phone
                            : "N/A"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>Registration Type</th>
                      <td>: {{ regType(getSchema.reg_type) }}</td>
                    </tr>
                  </table>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  props: ["dialogStatus", "detailData"],

  data: () => ({
    dialog: false
  }),

  computed: {
    getSchema() {
      return this.detailData ? this.detailData : "";
    },
    genderArrData() {
      return this.$store.getters.getSchemaGender;
    },
    orgTypeArrData() {
      return this.$store.getters.getSchemaOrgType;
    },
    designationArrData() {
      return this.$store.getters.getSchemaDesignation;
    },
    regTypeArrData() {
      return this.$store.getters.getSchemaRegType;
    }
  },
  methods: {
    genderType(gender) {
      const result = this.genderArrData.find(({ id }) => id == gender);
      return result ? result.name : "";
    },
    orgType(org) {
      const result = this.orgTypeArrData.find(({ id }) => id == org);
      return result ? result.name : "";
    },
    regType(reg) {
      const result = this.regTypeArrData.find(({ id }) => id == reg);
      return result ? result.name : "";
    },
    teacherDesignation(deg) {
      const result = this.designationArrData.find(({ id }) => id == deg);
      return result ? result.name : "";
    },

    formatted_date(date) {
      return moment(date).format("DD-MM-YYYY");
    },

    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    },

    settingsData() {
      this.photo_imageUrl =
        this.getSchema.photo != null ? this.getSchema.photo : "";
      this.signature_imageUrl =
        this.getSchema.signature != null ? this.getSchema.signature : "";
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      //this.settingsData();
    },

    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {}
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  padding: 5px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
