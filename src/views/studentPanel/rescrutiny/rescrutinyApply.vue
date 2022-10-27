<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 md12>
        <v-toolbar color="blue-grey darken-3" dark>
          <v-toolbar-title>
            Re-scrutiny Apply For
            {{ getSchema.student_result ? getSchema.student_result.exam_info.exam_display_name : "" }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card v-if="getSchema.rescrutiny_status != 1">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex md4>
                <StudentInfo />
              </v-flex>
              <v-flex md8>
                <studentRescrutiny></studentRescrutiny>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <v-card v-else>
          <v-container fluid>
            <v-alert :value="true" color="error" icon="warning"
              >Already Applied stay wait for result !!</v-alert
            >
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import studentRescrutiny from "@/components/studentPanel/applyRescrutiny.vue";
import StudentInfo from "@/components/probable/student_form_fill_up_subject/student_info";

export default {
  components: {
    StudentInfo,
    studentRescrutiny
  },

  data: () => ({
    studentData: "",
    applyRescrutinyDialog: false,
    detailsDialog: false
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRescrunityPaperList;
    }
  },
  created() {
    //console.log(this.$route.params.result_id);
    this.$store.dispatch("getStudentProfile");
    this.$store.dispatch(
      "fetchRescrunityPaperist",
      this.$route.query.result_id
    );
  }
};
</script>

<style scoped></style>
