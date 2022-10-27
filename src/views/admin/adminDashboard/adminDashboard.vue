<template>
  <v-container fluid>
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50">dashboard</v-icon>
        <span class="ml-2">Admin Dashboard</span>
      </div>
    </span>

    <v-card>
      <v-container fluid grid-list-md>
        <!-- mother -->
        <v-layout row wrap class="mt-auto">
          <v-flex xs12 sm6 md12 lg3>
            <v-card color="blue lighten-2">
              <v-card-title primary-title>
                <div
                  class="text-xs-center"
                  style="max-width: 400px; margin: auto;"
                >
                  <div class="headline">Center</div>
                  <v-btn
                    small
                    dark
                    @click="goToCenterDashboard"
                    color="white indigo--text"
                    >Go to Center Dashboard</v-btn
                  >
                </div>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 md12 lg3>
            <v-card color="blue lighten-3">
              <v-card-title primary-title>
                <div
                  class="text-xs-center"
                  style="max-width: 400px; margin: auto;"
                >
                  <div class="headline">Invigilators</div>
                  <div>
                    <v-btn
                      small
                      dark
                      @click="goToInvigilatorsList"
                      color="white indigo--text"
                      >Go to Invigilators List</v-btn
                    >
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md12 lg3>
            <v-card color="light-green">
              <v-card-title primary-title>
                <div
                  class="text-xs-center"
                  style="max-width: 400px; margin: auto;"
                >
                  <div class="headline">Regional Center</div>
                  <div>
                    <v-btn
                      small
                      dark
                      @click="goToRegionalCenterList"
                      color="white indigo--text"
                      >Go to Regional Center</v-btn
                    >
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md12 lg3>
            <v-card color="deep-orange accent-2">
              <v-card-title primary-title>
                <div
                  class="text-xs-center"
                  style="max-width: 400px; margin: auto;"
                >
                  <div class="headline">Users</div>
                  <div>
                    <v-btn
                      small
                      dark
                      @click="goToUsersList"
                      color="white indigo--text"
                      >Go to Users List</v-btn
                    >
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 md8 lg8 class="my-4">
            <adDashChart2 />
          </v-flex>
          <v-flex xs12 sm12 md4 lg4 class="my-4">
            <adDashChar1 />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import adDashChar1 from "@/components/charts/adDashChar1.vue";
import adDashChart2 from "@/components/charts/adDashChart2.vue";
export default {
  name: "dashboard",
  components: { adDashChar1, adDashChart2 },
  data: () => ({
    exams: [],
    year: "",
    exam: "",
    years: [],
    show: "6"
  }),
  created() {
    this.$store.dispatch("fetchExamData");
    this.$store.dispatch("collectTotalAdminStatistics");
    //this.$store.dispatch("fetchExamData");
  },
  computed: {
    getExamData() {
      return this.$store.getters.getExamItem;
    },
    getYearData() {
      return this.$store.getters.getYearItem;
    },
    getTotalStatus() {
      return this.$store.getters.getTotalAdminStatistics;
    },
    text() {
      var a = "sdsdsd";
      return a;
    }
  },
  methods: {
    goToCenterDashboard() {
      this.$router.push("/center/center-dashboard");
    },
    goToInvigilatorsList() {
      this.$router.push("/invigilator-list");
    },
    goToRegionalCenterList() {
      this.$router.push("/regional_center");
    },
    goToUsersList() {
      this.$router.push("/users");
    }
  }
};
</script>
