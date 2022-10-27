<template>
  <v-container fluid>
    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-badge left overlap>
            <template v-slot:badge>
              <v-btn
                round
                color="primary"
                fab
                small
                style="margin-top: -1.3em;"
                class="elevation-0"
                v-if="getCollegeUserWiseConfirmCandidate.confirm_candidate"
                >{{
                  getCollegeUserWiseConfirmCandidate.confirm_candidate.length
                }}</v-btn
              >
            </template>
            <v-card-text class="title">COllege User</v-card-text>
          </v-badge>
        </v-card>
        <!-- <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
        ></v-text-field>-->
      </v-layout>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="getCollegeUserWiseConfirmCandidate.confirm_candidate"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.index + 1 }}</td>
        <td class="text-xs-left">{{ props.item.college_user.name }}</td>
        <!-- <td class="text-xs-left">{{ props.item.probable_candidate }}</td> -->
        <!-- <td class="text-xs-left">{{ props.item.applied_candidate }}</td> -->
        <td class="text-xs-left">{{ props.item.no_of_confirm_candidate }}</td>
      </template>
      <template v-slot:footer>
        <td :colspan="headers.length">
          <strong
            >Total Probable Candidate(s) -
            {{ getCollegeUserWiseConfirmCandidate.probable_candidate }}</strong
          >
          <strong
            >, Total Applied Candidate(s) -
            {{ getCollegeUserWiseConfirmCandidate.applied_candidate }}</strong
          >
          <strong
            >, Total Confirm Candidate(s) -
            {{
              getCollegeUserWiseConfirmCandidate.total_confirm_candidate
            }}</strong
          >
        </td>
      </template>
    </v-data-table>
    <!-- <pre>{{getCollegeUserWiseConfirmCandidate}}</pre> -->
  </v-container>
</template>
<script>
import avatar from "@/components/collegeUserPanel/avatar.vue";
import studentInfo from "@/components/collegeUserPanel/info.vue";

export default {
  components: {
    avatar,
    studentInfo
  },
  computed: {
    studentToken() {
      return this.$store.getters.getAuthStudentToken;
    },
    getCollegeUserWiseConfirmCandidate() {
      return this.$store.getters.getCollegeUserWiseConfirmCandidate;
    }
    // authStudent() {
    //   return this.$store.getters.getAuthStudent;
    // }
  },
  created() {
    let current_privilege = JSON.parse(
      localStorage.getItem("current-privilege")
    );
    this.$store.dispatch("getCollegeUserWiseConfirmCandidate", {
      current_privilege: current_privilege
    });
    // this.setAcademicInfo();
  },
  data() {
    return {
      headers: [
        {
          text: "SL",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "User", value: "username" },
        // { text: "Probable Candidate", value: "probable_candidate" },
        // { text: "Applied Candidate", value: "applied_candidate" },
        {
          text: "No. of Confirm Candidate(s)",
          value: "no_of_confirm_candidate"
        }
      ],
      desserts: [
        {
          name: "Iqbal Hossain",
          no_of_prob_can: 161,
          no_of_app_can: 100,
          no_of_con_can: 20
        },
        {
          name: "Mamun",
          no_of_prob_can: 161,
          no_of_app_can: 100,
          no_of_con_can: 30
        },
        {
          name: "Farukh",
          no_of_prob_can: 161,
          no_of_app_can: 100,
          no_of_con_can: 30
        }
      ]
    };
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
