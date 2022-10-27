<template>
  <v-container fluid>
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50">dashboard</v-icon>
        <span class="ml-2">Result Overview</span>
      </div>
    </span>
    <v-layout row wrap align-center>
      <v-flex xs8>
        <v-card>
          <v-layout row wrap align-center>
            <v-flex xs12 sm12 md12 lg4>
              <div class="ml-3">
                <v-icon>edit</v-icon>
                <v-title class="ml-2 title">Exam</v-title>
              </div>
              <v-select
                class="mx-3"
                v-model="e1"
                :items="states"
                menu-props="auto"
                label="Exam"
                hide-details
                prepend-icon="horizontal_split"
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg8>
              <v-card flat color="transparent">
                <v-card-text class="range-slider px-3">
                  <v-icon>calendar_today</v-icon>
                  <v-title class="ml-2">Exam Year</v-title>
                  <v-range-slider
                    v-model="price"
                    thumb-label="always"
                    :max="2020"
                    :min="2010"
                    :step="1"
                  ></v-range-slider>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs12 sm12 md12 lg4>
              <div class="ml-3">
                <v-icon>wc</v-icon>
                <v-title class="ml-2 title">Gender</v-title>
              </div>
              <v-select
                class="ma-3"
                v-model="e1"
                :items="states"
                menu-props="auto"
                label="Gender"
                hide-details
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg4>
              <v-select
                class="ma-3"
                v-model="e1"
                :items="states"
                menu-props="auto"
                label="Exam Semester"
                hide-details
                prepend-icon="supervisor_account"
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12 lg4></v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-layout row wrap align-center>
          <v-flex xs12 sm12 md12 lg12>
            <apexchart
              height="350"
              type="pie"
              :options="chartOptions"
              :series="series"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import formDialog from "../components/centerList/centerForm.vue";
// import pieChart from "../../components/charts/pieChart.vue";
export default {
  components: {
    // pieChart
  },

  data() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        labels: ["Bangla", "English", "Math", "Physics", "Chemistry"],
        legend: { position: "bottom" }
      },
      price: [2014, 2017],
      chartsLib: null,

      // Array will be automatically processed with visualization.arrayToDataTable function

      states: ["Male", "Female", "Others"],

      chartData: [
        ["Year", "Male", "Female", "Others"],
        ["2014", 1000, 400, 2],
        ["2015", 1170, 460, 1],
        ["2016", 900, 700, 5],
        ["2017", 1030, 540, 2]
      ]
    };
  },
  created() {
    // this.$store.dispatch("callCenterData");
  },
  computed: {
    // chartOptions() {
    //   if (!this.chartsLib) return null;
    //   return this.chartsLib.charts.Bar.convertOptions({
    //     // chart: {
    //     //   title: "Company Performance",
    //     //   subtitle: "Sales, Expenses, and Profit: 2014-2017"
    //     // },
    //     bars: "horizontal", // Required for Material Bar Charts.
    //     hAxis: { format: "decimal" },
    //     height: 400,
    //     colors: ["#1b9e77", "#d95f02", "#7570b3"]
    //   });
    // }
  },
  methods: {
    // onChartReady(chart, google) {
    //   this.chartsLib = google;
    // }
  }
};
</script>
<style scoped>
.range-slider {
  padding: 0px;
  padding-top: 22px;
}
</style>
