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
          <v-toolbar-title>Course Details</v-toolbar-title>
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
                {{
                  detailsData.college ? detailsData.college.college_name : ""
                }}
              </h1>
              <h2 class="headline font-weight-light text-md-center">
                {{ detailsData.degree ? detailsData.degree.degree_name : "" }}
              </h2>
              <v-spacer class="pa-1"></v-spacer>
              <h3 class="title text-md-center text--primary">
                {{
                  detailsData.degree_group
                    ? detailsData.degree_group.degree_group_name
                    : ""
                }}
              </h3>
              <v-spacer class="pa-3"></v-spacer>
              <v-layout row wrap>
                <v-flex md10 offset-md1>
                  <v-card flat>
                    <v-card-text>
                      <table>
                        <tr>
                          <th>All The Subjects</th>
                        </tr>
                        <tr>
                          <td>
                            <span v-for="data in getSchema"
                              >({{ data.subjects.subject_code }})
                              {{ data.subjects.subject_name }},</span
                            >
                          </td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-spacer class="pa-3"></v-spacer>
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

  computed: {
    getSchema() {
      return this.$store.getters.getDegreeSubject;
    }
  },

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
  },

  created() {}
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: center;
  padding: 8px;
}
</style>
