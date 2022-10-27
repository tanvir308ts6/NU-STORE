<template>
  <v-container fluid>
    <v-card color="white">
      <!-- <avatar></avatar> -->
      <Info></Info>
    </v-card>
    <!-- <v-divider></v-divider>
    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-card-title primary-title>
            <h2>Notice</h2>
          </v-card-title>
          <v-card-text>
            <ol>
              <li>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</li>
              <li>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</li>
              <li>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</li>
              <li>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</li>
              <li>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</li>
              <li>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</li>
            </ol>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-card>-->
    <!-- <span class>
      <div class="display-1 mb-4">
        <table class="student-profile">
          <tr>
            <td class="title">Name</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.name}}</td>
          </tr>
          <tr>
            <td class="title">Student ID</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.std_id}}</td>
          </tr>
          <tr>
            <td class="title">REG. No.</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.reg_no}}</td>
          </tr>
          <tr>
            <td class="title">Score</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.admission_score}}</td>
          </tr>
          <tr>
            <td class="title">Merit</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.merit_position}}</td>
          </tr>
          <tr>
            <td class="title">Email</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.email}}</td>
          </tr>
          <tr>
            <td class="title">Mobile No.</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.mobile}}</td>
          </tr>
          <tr>
            <td class="title">Father</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.father_name}}</td>
          </tr>
          <tr>
            <td class="title">Mother</td>
            <td class="title">:</td>
            <td class="subheading">{{authStudent.mother_name}}</td>
          </tr>
        </table>
      </div>
    </span>-->
    <!-- <pre>{{studentToken}}</pre> -->
    <!-- <pre>{{authStudent}}</pre> -->
  </v-container>
</template>
<script>
import avatar from "@/components/collegePanel/avatar.vue";
import Info from "@/components/collegePanel/info.vue";

export default {
  components: {
    avatar,
    Info
  },
  computed: {
    studentToken() {
      return this.$store.getters.getAuthStudentToken;
    }
    // authStudent() {
    //   return this.$store.getters.getAuthStudent;
    // }
  },
  created() {
    // this.setAcademicInfo();
  },
  methods: {
    setAcademicInfo() {
      this.$store.dispatch("setAcademicInfo");
    }
  }
};
</script>
<style lang="scss">
.student-profile {
  tr {
    th {
      text-align: left;
    }
  }
}
</style>
