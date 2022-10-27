<template>
  <v-container fluid>
    <div align="right">
      <v-btn color="info" @click="downloadResult">
        Download Result
        <v-icon right dark>cloud_download</v-icon>
      </v-btn>
    </div>
    <v-card id="details">
      <v-spacer class="pa-1"></v-spacer>
      <v-container>
        <!-- <div style="float: left; width: 70px; margin-left:20px;">
          <img
            src="@/assets/nu_logos/nu_logo.png"
            style="width: 100% !important;"
          />
        </div> -->

        <div>
          <h1 align="center">National University, Bangladesh</h1>
          <h3 align="center">
            {{ getSchema.core_exam.exam_name }}
            Examination-{{ getSchema.exam_year }}
          </h3>
        </div>

        <br />
        <h2 align="center"><u>Result Sheet</u></h2>
        <br />
        <table>
          <tr style="font-weight: bold;padding: 2px 0px 2px 0px">
            <th>Name Of Student</th>
            <td>{{ studentProfile.name }}</td>
          </tr>
          <tr>
            <td>Father's Name</td>
            <td>{{ studentProfile.father_name }}</td>
          </tr>
          <tr>
            <td>Mother's Name</td>
            <td>{{ studentProfile.mother_name }}</td>
          </tr>
          <tr>
            <td>College</td>
            <td>
              {{ studentProfile.college_code }}-
              {{
                studentProfile.college
                  ? studentProfile.college.college_name
                  : ""
              }},
              {{ studentProfile.college.districts.district_name }}
            </td>
          </tr>
          <tr>
            <td>Exam Roll</td>
            <td>{{ getSchema.exam_roll }}</td>
          </tr>
          <tr>
            <td>Registration No</td>
            <td>{{ studentProfile.reg_no }}</td>
          </tr>
          <tr>
            <td>Session</td>
            <td>{{ studentProfile.ac_session }}</td>
          </tr>
          <tr>
            <td>Student Type</td>
            <td>
              {{ studentProfile.student_type == 1 ? "REGULAR" : "IREGULAR" }}
            </td>
          </tr>
          <tr v-if="studentProfile.subjects.length || studentProfile.subject">
            <td>Subject</td>
            <td v-if="studentProfile.subjects.length > 0">
              {{ studentProfile.subjects[0].subject_code }}-
              {{ studentProfile.subjects[0].subject_name }}
            </td>
            <td v-else-if="studentProfile.subject">
              {{ studentProfile.subject.subject_code }}-
              {{ studentProfile.subject.subject_name }}
            </td>
          </tr>
          <tr style="font-weight: bold;">
            <th>GPA</th>
            <td>{{ getSchema.cgpa | toFixed }}</td>
            <!-- <td>{{ getSchema.cgpa ? getSchema.cgpa : "Failed" }}</td> -->
          </tr>
          <tr style="font-weight: bold;" v-if="getSchema.result_type != null">
            <th>Result</th>
            <td>
              {{ getSchema.result_type.result_type_name }}
            </td>
            <!-- <td>{{ getSchema.cgpa ? getSchema.cgpa : "Failed" }}</td> -->
          </tr>
          <!--  <tr v-if="studentProfile.degree.degree_code != 3">
              <th>Year GPA</th>
              <td>
                {{ studentProfile.degree_group.degree_group_display_name }}
              </td>
            </tr> -->
        </table>

        <br />
        <div>
          <table>
            <tr>
              <td class="text-md-center">
                <strong>Course wise Grade</strong>
              </td>
            </tr>
            <tr>
              <td>
                <table>
                  <tr style="white-space: nowrap;">
                    <th class="text-md-center">Course Code</th>
                    <th class="text-md-center">Title of Course</th>
                    <!-- <th class="text-md-center">Course Type</th> -->
                    <th class="text-md-center">Total Marks/Credit</th>
                    <th class="text-md-center">Obtained Marks/Ltr.Grade</th>
                  </tr>

                  <tr v-for="(data, index) in getSchema.details" :key="index">
                    <td class="text-md-center">{{ data.paper_code }}</td>
                    <td>{{ data.paper.paper_name }}</td>
                    <!-- <td class="text-md-center">
                          {{ data.paper.paper_types.paper_type }}
                        </td> -->
                    <td class="text-md-center">{{ data.paper.credit }}</td>
                    <td class="text-md-center">
                      <span v-if="data.paper.credit != 0">{{
                        data.letter_grade
                      }}</span>
                      <span v-else>
                        <span v-if="data.paper.letter_grade == 'F'">PASS</span>
                        <span v-else>PASS</span>
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!--
            <tr style="font-weight: bold;">
              <td>CGPA : {{ getSchema.cgpa | toFixed }}</td>
            </tr>
            -->
          </table>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    getSchema() {
      return this.$store.getters.getResultDetails;
    },
    studentProfile() {
      return this.$store.getters.getStudentProfile;
    }
  },

  methods: {
    export_result() {
      const resultExport = {
        result_id: this.$route.params.result_id,
        result_export: true
      };
      this.$store.dispatch("exportResultDetailList", resultExport);
    },
    printDiv() {
      var printContents = document.getElementById("details").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
    downloadResult() {
      let result_id = this.$route.params.result_id;
      this.$store.dispatch("downloadResultDetails", {
        params: {
          result_id: result_id
        },
        responseType: "blob"
      });
    }
  },

  created() {
    this.$store.dispatch("getStudentProfile");
    this.$store.dispatch("fetchResultDetailList", this.$route.params.result_id);
  }
};
</script>

<style scoped>
.container {
  font-size: 14px;
}
table tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.05);
}
table tr:nth-of-type(odd) {
  background-color: white;
}
table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 10px;
}

.v-toolbar__title {
  text-align: center !important;
}

.v-toolbar__content > *:last-child,
.v-toolbar__extension > *:last-child {
  margin: auto !important;
}
</style>
