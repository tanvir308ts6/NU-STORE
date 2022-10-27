<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex>
        <v-card class="px-3">
          <v-layout row wrap align-center class="py-3">
            <v-flex md6>
              <v-select
                v-model="currentExam"
                :items="getExamMasterList"
                item-text="exam_display_name"
                :item-value="[]"
                label="Select Exam"
                data-vv-name="exam_name"
                :error-messages="errors.collect('id')"
                required
                prepend-icon="subject"
                v-on:change="SetCurrentExam"
              ></v-select>
            </v-flex>
            <!-- <v-flex xs12 sm12 md12 style="margin-top:40px;">
              <v-layout justify-center row fill-height align-center>
                <v-btn color="primary" large @click="searchList()">Search</v-btn>
              </v-layout>
            </v-flex>-->
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{getExamMasterList}}</pre> -->
  </v-container>
</template>
<script>
import ClgCommonGet from "@/mixin/college_common_getters_mixin";
export default {
  created() {
    this.$store.dispatch("getCollegeExamMasterList").then(response => {
      // console.log(response.data);
    });
  },
  mixins: [ClgCommonGet],
  data: () => ({
    currentExam: {}
  }),
  methods: {
    SetCurrentExam(exam) {
      localStorage.setItem("current_exam", JSON.stringify(exam));
      this.$parent.ExamChangeCallBack(exam);
    }
  }
};
</script>
