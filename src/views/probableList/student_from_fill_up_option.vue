<template>
  <v-container grid-list-md text-xs-left>
    <!-- v-if="getFillUpOptions.length" -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ `Form Fill Up` }}</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="getFillUpOptions.length">
      <v-flex xs12 v-for="(option, index) in getFillUpOptions" :key="index">
        <v-card
          v-if="
            option.exam_master.activity_setup[0].start_date <= today_date &&
              option.exam_master.activity_setup[0].end_date >= today_date
          "
        >
          <!-- <v-card-title primary-title>
            <div class="text-xs-center">
              <h3 class="headline mb-0">{{`Form Fill Up`}}</h3>
            </div>
          </v-card-title>-->
          <div class="text-xs-center">
            <h3 class="headline mb-0">
              {{
                `Form Fill Up for ${option.exam_master.exam_name} (${option.exam_master.exam_year})`
              }}
            </h3>
          </div>
          <div class="text-xs-center">
            <v-chip color="info" text-color="white"
              >Start Date :
              {{
                option.exam_master.activity_setup[0].start_date | dateFormat
              }}</v-chip
            >
            <v-chip color="red" text-color="white"
              >Last Date :
              {{
                option.exam_master.activity_setup[0].end_date | dateFormat
              }}</v-chip
            >
            <v-chip
              v-if="option.teacher_confirm_status == 1"
              color="green"
              text-color="white"
            >
              Payment Status:Paid
            </v-chip>
            <v-chip
              v-else-if="option.student_confirm_status == 1"
              color="orange"
              text-color="white"
            >
              Payment Status:Unpaid
            </v-chip>
          </div>
          <!-- <div class="text-xs-center" v-if="option.teacher_confirm_status == 1">
            <v-chip color="green" text-color="white">Payment:Paid</v-chip>
          </div>
          <div
            class="text-xs-center"
            v-else-if="option.student_confirm_status == 1"
          >
            <v-chip color="orange" text-color="white">Payment:Unpaid</v-chip>
          </div> -->
          <!-- <div class="text-xs-center" v-if="option.student_confirm_status==1">
            <v-chip color="orange" text-color="white">
              <a href="link-to.pdf" target="_blank">Download</a>
            </v-chip>
          </div>-->
          <div class="text-xs-right">
            <v-btn
              dark
              color="info"
              v-if="option.exam_master.activity_setup[0].notice_url"
              :href="option.exam_master.activity_setup[0].notice_url"
              target="_blank"
            >
              Notice
            </v-btn>
            <v-btn dark color="red" v-else>Notice Not Found</v-btn>
            <v-btn
              v-if="option.student_confirm_status == 0"
              dark
              color="success"
              @click="goTo(`/student/ff/student_form_fill_up/${option.id}`)"
              >Apply Now</v-btn
            >
            <v-btn
              v-else-if="option.student_confirm_status == 1"
              dark
              color="success"
              @click="goTo(`/student/ff/form_fill_up_details/${option.id}`)"
              >Form Fillup Details</v-btn
            >
            <v-btn
              v-if="option.student_confirm_status == 1"
              color="blue-grey"
              class="white--text"
              target="_blank"
              :href="`${getAssetUrl}/${option.application_form_url}`"
            >
              Application Form
              <v-icon right dark>cloud_download</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-auto" v-else-if="!getLoading">
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ `No data found.` }}</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import commonFun from "@/mixin/student_common_finction";

export default {
  mixins: [commonFun],
  computed: {
    getLoading() {
      return this.$store.getters.getLoading;
    },
    authStudent() {
      return this.$store.getters.getStudentProfile;
    },
    getFillUpOptions() {
      return this.$store.getters.getStudentFormFillUpOptions;
    },
    getAssetUrl() {
      return this.$store.getters.getAssetUrl;
    }
  },
  data: () => ({
    form_fill_up_options: [],
    today_date: ""
  }),
  created() {
    this.$store.dispatch("getStudentProfile").then(res => {
      this.$store.dispatch("fetchStudentFormFillUpOptions", this.authStudent);
    });
  },
  watch: {},
  methods: {
    // goTo(val) {
    //   this.$router.push({ path: val }).catch(err => {});
    // }
    todayDate() {
      //var currentDate = new Date();
      //alert(currentDate);
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      //console.log(currentDateWithFormat);
      this.today_date = currentDateWithFormat;
    }
  },
  mounted() {
    this.todayDate();
  }
};
</script>
