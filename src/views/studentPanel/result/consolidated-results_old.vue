<template>
  <v-container fluid>
    <v-btn color="info" align="right" @click="downloadResult">
      Download Result
      <v-icon right dark>cloud_download</v-icon>
    </v-btn>
    <v-card id="details">
      <div style="float: left; width: 70px; margin-left:80px;">
        <img
          src="@/assets/nu_logos/nu_logo.png"
          style="width: 100% !important;"
        />
      </div>

      <div>
        <h1 align="center">National University, Bangladesh</h1>
        <h3 align="center">
          {{ getConsolidateResultData.cumulative_data.degree.degree_name }}
          Examination-{{ getConsolidateResultData.cumulative_data.exam_year }}
        </h3>
        <h2 align="center">Result Sheet</h2>
      </div>
      <br />
      <div>
        <table style="width:100%">
          <tr>
            <td>
              <b>Name of Student</b>
            </td>
            <td>
              <b>{{ getConsolidateResultData.basic_info.student_name }}</b>
            </td>
          </tr>
          <tr>
            <td>Father's Name</td>
            <td>
              {{ getConsolidateResultData.basic_info.father_name }}
            </td>
          </tr>
          <tr>
            <td>Mother's Name</td>
            <td>
              {{ getConsolidateResultData.basic_info.mother_name }}
            </td>
          </tr>
          <tr>
            <td>
              Name of College
            </td>
            <td>
              {{ getConsolidateResultData.basic_info.name_of_college }}
            </td>
          </tr>
          <tr>
            <td>Exam. Roll</td>
            <td>
              {{ getConsolidateResultData.basic_info.exam_roll }}
            </td>
          </tr>
          <tr>
            <td>Registration</td>
            <td>
              {{ getConsolidateResultData.basic_info.reg_no }}
            </td>
          </tr>
          <tr>
            <td>Session</td>
            <td>
              {{ getConsolidateResultData.basic_info.session }}
            </td>
          </tr>
          <tr>
            <td>Student Type</td>
            <td>
              {{ getConsolidateResultData.basic_info.father_name }}
            </td>
          </tr>
          <tr>
            <td>Subject Name</td>
            <td>
              [{{ getConsolidateResultData.basic_info.subject_code }}]
              {{ getConsolidateResultData.basic_info.subject_name }}
            </td>
          </tr>
          <tr>
            <td>Credit<small>(Completed/Total) </small></td>
            <td>
              {{ getConsolidateResultData.basic_info.completed }}/{{
                getConsolidateResultData.basic_info.total_credit
              }}
            </td>
          </tr>
          <tr v-if="passed">
            <td><b>CGPA</b></td>
            <td
              v-if="
                getConsolidateResultData.basic_info.completed ==
                  getConsolidateResultData.basic_info.total_credit
              "
            >
              <b>{{ getConsolidateResultData.basic_info.cgpa }}</b>
            </td>
            <td
              v-if="
                getConsolidateResultData.basic_info.con_credit_completed !=
                  getConsolidateResultData.basic_info.con_credit_total
              "
            >
              CGPA not Fulfilled
            </td>
          </tr>
        </table>
      </div>
      <br />
      <div align="" style="width: 100%;">
        <h2 align="center">Course wise Letter Grade</h2>
        <table width="100%" border="1">
          <tr style="text-align:center;font-weight:bold;font-size: 16px;">
            <td>First Year</td>
            <td>Second Year</td>
            <td>Third Year</td>
            <td>Fourth Year</td>
          </tr>
          <tr>
            <td>
              <!-- First Year Data -->
              <table width="100%">
                <tr class="a">
                  <td>Course Code(credit)</td>
                  <td>LG</td>
                </tr>
                <tr
                  class="b"
                  v-for="(item, index) in getConsolidateResultData
                    .first_year_result.papers"
                  :key="index"
                >
                  <td>{{ item.paper_code }}({{ item.credit }})</td>
                  <td>{{ item.letter_grade }}</td>
                </tr>
              </table>
            </td>
            <td>
              <!-- Second Year Data -->
              <table width="100%">
                <tr class="a">
                  <td>Course Code(credit)</td>
                  <td>LG</td>
                </tr>
                <tr
                  class="b"
                  v-for="(item, index) in getConsolidateResultData
                    .second_year_result.papers"
                  :key="index"
                >
                  <td>{{ item.paper_code }}({{ item.credit }})</td>
                  <td>{{ item.letter_grade }}</td>
                </tr>
              </table>
            </td>
            <td>
              <!-- Third Year Data -->
              <table width="100%">
                <tr class="a">
                  <td>Course Code(credit)</td>
                  <td>LG</td>
                </tr>
                <tr
                  class="b"
                  v-for="(item, index) in getConsolidateResultData
                    .third_year_result.papers"
                  :key="index"
                >
                  <td>{{ item.paper_code }}({{ item.credit }})</td>
                  <td>{{ item.letter_grade }}</td>
                </tr>
              </table>
            </td>
            <td>
              <!-- Fourth Year Data -->
              <table width="100%">
                <tr class="a">
                  <td>Course Code(credit)</td>
                  <td>LG</td>
                </tr>
                <tr
                  class="b"
                  v-for="(item, index) in getConsolidateResultData
                    .fourth_year_result.papers"
                  :key="index"
                >
                  <td>{{ item.paper_code }}({{ item.credit }})</td>
                  <td>{{ item.letter_grade }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <h3>
                First Year:{{ getConsolidateResultData.first_year_summary.gpa }}
              </h3>
            </td>
            <td align="center">
              <h3>
                Year Year:{{ getConsolidateResultData.second_year_summary.gpa }}
              </h3>
            </td>
            <td align="center">
              <h3>
                Third Year:{{ getConsolidateResultData.third_year_summary.gpa }}
              </h3>
            </td>
            <td align="center">
              <h3>
                Fourth Year:{{
                  getConsolidateResultData.fourth_year_summary.gpa
                }}
              </h3>
            </td>
          </tr>
        </table>
      </div>
      <p style="float: right;margin-top: 20px;font-weight: bold;">
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
    downloadResult(){
      
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
