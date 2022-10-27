<template>
  <v-container fluid id="FprmFillUpDetails">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-md>
            <!-- <StudentInfo /> -->
            <studentConfirmedPaper
              :formFillUpData="getStudentConfirmedData"
              v-if="getStudentConfirmedData.hasOwnProperty('papers')"
            />
            <StudentFormFillUpFeeHistory
              v-if="
                getStudentFormFillUpFeeHistory.hasOwnProperty(
                  'form_fill_up_fee'
                )
              "
              :StudentFormFillUpFeeHistoryData="getStudentFormFillUpFeeHistory"
            />
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{getStudentFormFillUpFeeHistory}}</pre> -->
    <!-- <pre>{{getStudentConfirmedData}}</pre> -->
  </v-container>
</template>
<script>
import commonFun from "@/mixin/student_common_finction";
import StudentInfo from "@/components/probable/student_form_fill_up_subject/student_info";
import studentConfirmedPaper from "@/components/probable/student_form_fill_up_subject/studentConfirmedPaper";
import StudentFormFillUpFeeHistory from "@/components/probable/student_form_fill_up_subject/studentFormFillUpFeeHistory";
export default {
  name: "FprmFillUpDetails",
  mixins: [commonFun],
  components: {
    StudentInfo,
    studentConfirmedPaper,
    StudentFormFillUpFeeHistory
  },
  created() {
    this.$store.dispatch("getStudentProfile");
    this.$store.dispatch(
      "getFormFillUpStudentConfirmedDetails",
      this.$route.params.form_fill_up_id
    );
    this.$store.dispatch(
      "getStudentFormFillUpFeeHistory",
      this.$route.params.form_fill_up_id
    );
  },
  computed: {
    profile() {
      return this.$store.getters.getStudentProfile;
    },
    getStudentConfirmedData() {
      return this.$store.getters.getStudentConfirmedData;
    },
    getStudentFormFillUpFeeHistory() {
      return this.$store.getters.getStudentFormFillUpFeeHistory;
    }
  }
};
</script>
