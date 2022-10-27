<template>
  <v-container fluid>
    <!-- <avatar></avatar> -->
    <student-info></student-info>
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
import avatar from "@/components/collegeUserPanel/avatar.vue";
import studentInfo from "@/components/collegeUserPanel/info.vue";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    avatar,
    studentInfo
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
