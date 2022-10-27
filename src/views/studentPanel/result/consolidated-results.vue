<template>
  <v-container fluid>
    <div align="right">
      <v-btn color="info" @click="downloadResult">
        Download Result
        <v-icon right dark>cloud_download</v-icon>
      </v-btn>
    </div>
    <v-card id="details">
      <div>
        <h1 align="center">National University, Bangladesh</h1>
        <h3 align="center">
          {{ getConsolidateResultData.student.degree.degree_name }}
          Examination-{{ getConsolidateResultData.exam_year }}
        </h3>
        <h2 align="center"><u>Consolidated Result</u></h2>
      </div>
      <br />
      <div>
        <table style="width: 100%">
          <tr>
            <td>
              <b>Name of Student</b>
            </td>
            <td>
              <b>{{ getConsolidateResultData.student.name }}</b>
            </td>
          </tr>
          <tr>
            <td>Father's Name</td>
            <td>
              {{ getConsolidateResultData.student.father_name }}
            </td>
          </tr>
          <tr>
            <td>Mother's Name</td>
            <td>
              {{ getConsolidateResultData.student.mother_name }}
            </td>
          </tr>
          <tr>
            <td>Name of College</td>
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
            <td>Exam. Roll</td>
            <td>
              {{ getConsolidateResultData.exam_roll }}
            </td>
          </tr>
          <tr>
            <td>Registration</td>
            <td>
              {{ getConsolidateResultData.student.reg_no }}
            </td>
          </tr>
          <tr>
            <td>Session</td>
            <td>
              {{ getConsolidateResultData.student.ac_session }}
            </td>
          </tr>
          <tr>
            <td>Student Type</td>
            <td>
              <span v-if="getConsolidateResultData.student.student_type == 1"
                >REGULAR</span
              >
              <span v-else>IRREGULAR</span>
            </td>
          </tr>
          <tr>
            <td>Subject Name</td>
            <td>
              {{ getConsolidateResultData.student.subject.subject_code }}-
              {{ getConsolidateResultData.student.subject.subject_name }}
            </td>
          </tr>
          <tr>
            <td>Credit<small>(Completed/Total) </small></td>
            <td>
              {{ getConsolidateResultData.total_credits_earned }}/{{
                getConsolidateResultData.total_credit
              }}
            </td>
          </tr>
          <tr v-if="passed">
            <td><b>CGPA</b></td>
            <td
              v-if="
                getConsolidateResultData.student.completed ==
                  getConsolidateResultData.student.total_credit
              "
            >
              <b>{{ getConsolidateResultData.cgpa | toFixed }}</b>
            </td>
            <td
              v-if="
                getConsolidateResultData.student.con_credit_completed !=
                  getConsolidateResultData.student.con_credit_total
              "
            >
              CGPA not Fulfilled
            </td>
          </tr>
        </table>
      </div>
      <br />
      <div align="" style="width: 100%">
        <h2 align="center">Course wise Letter Grade</h2>
        <table width="100%" border="1">
          <tr style="text-align: center; font-weight: bold; font-size: 16px">
            <td
              v-for="(c_r, index) in getConsolidateResultData.combine_results"
              :key="index"
            >
              {{ c_r.core_exam.exam_short_name }}
            </td>
          </tr>
          <tr>
            <td
              v-for="(papers,
              aindex) in getConsolidateResultData.combine_results"
              :key="aindex"
            >
              <!-- First Year Data -->
              <table width="100%">
                <tr class="a">
                  <td>Course Code(credit)</td>
                  <td>LG</td>
                </tr>
                <tr
                  class="b"
                  v-for="(item, bindex) in papers.details"
                  :key="bindex"
                >
                  <td v-if="item.credit != 0">
                    {{ item.paper_code }}({{ item.credit }})
                  </td>
                  <td v-else-if="item.credit == 0">
                    {{ item.paper.paper_name }}
                  </td>
                  <td v-if="item.credit != 0">{{ item.letter_grade }}</td>
                  <td v-else-if="item.credit == 0">
                    <span v-if="item.letter_grade != 'F'">PASS</span>
                    <span v-else>FAIL</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              v-for="(c_r, index) in getConsolidateResultData.combine_results"
              :key="index"
            >
              <h3>
                {{ c_r.core_exam.exam_short_name }} GPA :
                {{ c_r.cgpa | toFixed }}
              </h3>
            </td>
          </tr>
        </table>

        <!-- <pre>{{ getConsolidateResultData.combine_results }}</pre> -->
      </div>
      <p style="float: right; margin-top: 20px; font-weight: bold">
        <span>sd/-</span><br />
        <span>(Badruzzaman)</span><br />
        <span>Controller of Examinations</span>
      </p>
      <div></div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      details: [],
      passed: false,
      warn: false,
      cgpa: "",
      showExamName: ""
    }
  }),
  created() {
    this.$store.dispatch("fetchConsolidatedResult");
    this.$store.dispatch("getStudentProfile");
    this.getPassed();
  },

  computed: {
    getConsolidateResultData() {
      return this.$store.getters.getConsolidatedResult;
    },
    studentProfile() {
      return this.$store.getters.getStudentProfile;
    }
  },
  methods: {
    getPassed() {
      if (this.cgpa != "0.00") {
        this.passed = true;
        this.warn = false;
      } else {
        this.passed = false;
        this.warn = true;
      }
    },
    downloadResult() {
      this.$store.dispatch("downloadConsolidateResult", {
        responseType: "blob"
      });
    },
    printDiv() {
      var printContents = document.getElementById("details").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  },
  watch: {
    // pagination() {
    //   this.searchResultList();
    // },
  },
  mounted() {}
};
</script>

<style scoped>
.a {
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}
.b {
  text-align: center;
  font-weight: normal;
}
table tr td,
table tbody tr td {
  vertical-align: top;
  border: 1px solid #dee2e6;
}
</style>
