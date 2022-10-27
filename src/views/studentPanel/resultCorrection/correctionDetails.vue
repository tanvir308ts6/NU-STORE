<template>
  <v-container fluid>
    <template>
      <v-layout>
        <v-flex xs12 md12>
          <v-toolbar color="blue" dark>
            <v-toolbar-title
              >Result Correction Application Details</v-toolbar-title
            >
          </v-toolbar>

          <v-card>
            <v-container>
              
              <table id="applicationDetails">
                <template>
                  <tr>
                    <th style="padding-left:15px;">Course Code</th>
                    <th style="padding-left:15px;">Application Category</th>
                    <th style="padding-left:15px;">Details</th>
                    <th style="padding-left:15px;">Remarks</th>
                  </tr>
                  <tr
                    v-for="(paper, index) in getSchema.application_details"
                    :key="index"
                  >
                    <td style="padding-left:15px;">
                      {{ paper.course_code }}
                    </td>
                    <td style="padding-left:15px;">
                      <span
                        v-for="(category, cat) in paper.categories"
                        :key="cat"
                      >
                        <span
                          v-for="(cat_name, cname) in category.category_name"
                          class="btn btn-secondary"
                          :key="cname"
                        >
                          <span
                            style="color: red;font-weight:bold;background-color: white;padding: 5px;border-radius: 50px;"
                          >
                            {{ cat_name.application_category_name }}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td style="padding-left:15px;">{{ paper.note }}</td>
                    <td style="padding-left:15px;">{{ paper.remarks }}</td>
                  </tr>
                </template>
              </table>
              <br />
              <v-toolbar
                color="cyan darken-3"
                class="white--text text-center"
                dense
                width="100%"
              >
                <v-toolbar-title>Attachment Details</v-toolbar-title>
              </v-toolbar>
              <table width="100%" border="1" style="text-align: center;">
                <template>
                  <tr>
                    <td>Admit Card</td>
                    <td>
                      <v-btn
                        v-if="getSchema.admit_card"
                        dark
                        color="purple"
                        :href="getBaseUrl + '/' + getSchema.admit_card"
                        target="_blank"
                      >
                        <v-icon dark>attach_file</v-icon>
                      </v-btn>
                      <v-btn v-else dark color="red">
                        <v-icon error>attach_file</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>Registration Card</td>
                    <td>
                      <v-btn
                      v-if="getSchema.reg_card"
                        dark
                        color="purple"
                        :href="getBaseUrl + '/' + getSchema.reg_card"
                        target="_blank"
                      >
                        <v-icon dark>attach_file</v-icon>
                      </v-btn>
                      <v-btn v-else dark color="red">
                        <v-icon error>attach_file</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>Attendance Sheet</td>
                    <td>
                      <v-btn
                        v-if="getSchema.exam_attendance_sheet"
                        dark
                        color="purple"
                        :href="
                          getBaseUrl + '/' + getSchema.exam_attendance_sheet
                        "
                        target="_blank"
                      >
                        <v-icon dark>attach_file</v-icon>
                      </v-btn>
                      <v-btn v-else dark color="red">
                        <v-icon error>attach_file</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </table>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    getSchema() {
      return this.$store.getters.getResultCorrectionDetails;
    }
  },
  created() {
    this.$store.dispatch(
      "getResultCorrectionDetails",
      this.$route.params.application_id
    );
  },
  methods: {}
};
</script>

<style>
#applicationDetails {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#applicationDetails td,
#applicationDetails th {
  border: 1px solid #ddd;
  padding: 8px;
}

#applicationDetails tr:nth-child(even) {
  background-color: #f2f2f2;
}

#applicationDetails tr:hover {
  background-color: #ddd;
}

#applicationDetails th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: white;
  color: black;
}
</style>
