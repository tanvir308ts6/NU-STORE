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
          <v-toolbar-title>Student Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout>
            <v-flex md10 offset-md1>
              <v-card>
                <v-card-text>
                  <v-layout>
                    <v-flex xs12 sm2>
                      <v-img
                        v-if="studentData.photo_url"
                        :src="studentData.photo_url"
                        width="200px"
                      ></v-img>
                    </v-flex>
                  </v-layout>
                  <v-tabs color="blue-grey lighten-5">
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab href="#tab-1">
                      Personal Info.
                    </v-tab>

                    <v-tab href="#tab-2">
                      Academic Info.
                    </v-tab>

                    <v-tab-item :value="'tab-1'">
                      <v-card flat>
                        <v-card-text>
                          <table>
                            <tr>
                              <th width="25%" class="text-lg-left">Name</th>
                              <td>: {{ studentData.name }}</td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Father Name</th>
                              <td>: {{ studentData.father_name }}</td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Mother Name</th>
                              <td>: {{ studentData.mother_name }}</td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Student ID</th>
                              <td>: {{ studentData.std_id }}</td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Registration No.</th>
                              <td>: {{ studentData.reg_no }}</td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Academic Session</th>
                              <td>: {{ studentData.ac_session }}</td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Student Type</th>
                              <td>
                                :
                                {{
                                  studentData.student_types
                                    ? studentData.student_types.student_type
                                    : ""
                                }}
                              </td>
                            </tr>
                          </table>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item :value="'tab-2'">
                      <v-card flat>
                        <v-card-text>
                          <table>
                            <tr>
                              <th width="25%" class="text-lg-left">Degree</th>
                              <td>
                                :
                                {{
                                  studentData.degree
                                    ? studentData.degree.degree_name
                                    : ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Degree Group</th>
                              <td>
                                :
                                {{
                                  studentData.degree_group
                                    ? studentData.degree_group.degree_group_name
                                    : ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Subject</th>
                              <td>
                                :
                                {{
                                  studentData.subject
                                    ? studentData.subject.subject_name
                                    : ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <th class="text-lg-left">Student ID</th>
                              <td>: {{ studentData.std_id }}</td>
                            </tr>
                            <tr>
                              <th
                                class="text-lg-left"
                                v-if="
                                  studentData.papers &&
                                    studentData.papers.length > 0
                                "
                              >
                                Papers
                              </th>
                              <td>
                                :
                                <span v-for="paper in studentData.papers">{{
                                  paper.paper_code + ", "
                                }}</span>
                              </td>
                            </tr>
                          </table>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["dialogStatus", "studentData"],

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
table,
th,
td {
  border-collapse: collapse;
  padding: 10px;
}
</style>
