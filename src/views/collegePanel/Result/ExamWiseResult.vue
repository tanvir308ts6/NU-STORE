<template>
  <div id="ExamWiseResultForCollege">
    <v-container>
      <v-card color="white">
        <v-card-text class="title">Exam Wise Result</v-card-text>
      </v-card>
      <v-layout row wrap align-center>
        <v-flex>
          <v-card class="px-3">
            <CustomSearchForm :form="search"></CustomSearchForm>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex>
          <v-card class="px-3">
            <ExamWiseResultTable
              v-if="resultStatus"
              :data="getClgExamWiseResult"
            ></ExamWiseResultTable>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <CurrentExamSearchPanel></CurrentExamSearchPanel> -->

    <!-- <pre>{{getClgExamWiseResult}}</pre> -->
  </div>
</template>
<script>
// import CurrentExamSearchPanel from "@/components/collegePanel/CurrentExamSearchPanel.vue";
import CustomSearchForm from "@/components/collegePanel/CustomSearchForm.vue";
import ExamWiseResultTable from "@/components/collegePanel/Result/ExamWiseResultTable.vue";
export default {
  created() {
    this.ExamWiseResultTableStatus = false;
    this.$store.commit("UNSET_COLLEGE_EXAM_WISE_RESULT");
  },
  components: {
    ExamWiseResultTable,
    CustomSearchForm
  },
  computed: {
    getClgExamWiseResult() {
      return this.$store.getters.getClgExamWiseResult;
    }
  },
  data() {
    return {
      resultStatus: false,
      search: {
        data: {},
        show: {
          exam_code: true,
          degree_code: false,
          exam_year: true,
          degree_group: true,
          subject: false,
          reg_no: true
        },
        validation: {
          exam_code: {
            required: true
          },
          degree_code: {
            required: true
          },
          degree_group: {
            required: true
          },
          fee_title: {
            required: true,
            numeric: true,
            min: 6,
            max: 10
          },
          exam_year: {
            required: true
          },
          subject: {
            required: true
          }
        }
      }
    };
  },
  methods: {
    // ExamChangeCallBack(currentExam) {
    //   this.$store
    //     .dispatch("getClgExamWiseResult", {
    //       params: {
    //         exam_code: currentExam.exam_code,
    //         exam_year: currentExam.exam_year,
    //       },
    //     })
    //     .then((response) => {
    //       this.ExamWiseResultTableStatus = true;
    //     });
    //   console.log("ExamChangeCallBack called");
    //   console.log(currentExam);
    // },
    submit() {
      this.$store
        .dispatch("getClgExamWiseResult", {
          params: this.search.data
        })
        .then(success => {
          this.resultStatus = true;
        });
      console.log("submit call >>>>");
    },
    downloadPdf() {
      this.$store.dispatch("getClgExamWiseResultDownloadPdf", {
        params: this.search.data,
        responseType: "blob"
      });
    }
  }
};
</script>
