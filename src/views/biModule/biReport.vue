<template>
  <div>
    <v-container fluid style="padding-bottom:0px">
      <span class>
        <div class="display-1 mb-4">
          <v-icon size="50">dashboard</v-icon>
          <span class="ml-2">Bussiness Intelligence | Overview</span>
        </div>
      </span>
    </v-container>
    <v-divider />
    <v-container fluid>
      <span class>
        <div class="title mb-4">
          <span class="ml-2">
            Pass-Fail by Year | ({{
              getBiResultData_yearWisePassFail[0].exam_code
            }}) {{ getBiResultData_yearWisePassFail[0].exam_name }}
          </span>
        </div>
      </span>
      <v-layout row wrap align-center>
        <v-flex xs12 sm10 md6 lg6>
          <apexchart
            type="bar"
            :options="getFormatedChartByYearOptions"
            :series="getFormatedChartByYearOptions.series"
          ></apexchart>
        </v-flex>
        <v-flex xs12 sm10 md6 lg6>
          <apexchart
            type="bar"
            :options="getFormatedChartByYearPercentOptions"
            :series="getFormatedChartByYearPercentOptions.series"
          ></apexchart>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider />
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 md12 lg12>
          <apexchart
            type="bar"
            :options="getFormatedChartByDivisionOptions"
            :series="getFormatedChartByDivisionOptions.series"
          ></apexchart>
        </v-flex>
      </v-layout>
    </v-container>
   <!--  <pre>{{ getBiResultData }} </pre> -->
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      // data section
      ChartOptions_passFailByYearPercent: {
        chart: {
          type: "bar",
          stacked: true,
          stackType: "100%"
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: []
        },
        series: []
      },
      ChartOptions_passFailByYear: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: []
        },
        series: []
      },
      ChartOptions_passFailByDivision: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: []
        },
        series: []
      }
    };
  },
  created() {
    this.$store.dispatch("fetchBiResultData");
  },
  computed: {
    getBiResultData() {
      return this.$store.getters.getBiResultData;
    },
    getBiResultData_yearWisePassFail() {
      let arr = this.$store.getters.getBiResultData.year_wise_pass_fail;
      if (arr == null) {
        arr = [{ exam_name: "", exam_code: "" }];
      }
      return arr;
    },
    getFormatedChartByYearPercentOptions() {
      return this.formateChartOptions_passFailByYearPercent();
    },
    getFormatedChartByYearOptions() {
      return this.formateChartOptions_passFailByYear();
    },
    getFormatedChartByDivisionOptions() {
      return this.formateChartOptions_passFailByDivision();
    }
  },
  methods: {
    formateChartOptions_passFailByYearPercent() {
      let obj = this.$store.getters.getBiResultData.year_wise_pass_fail;
      let arrCategories = [];
      let arrFail = [];
      let arrPass = [];
      if (!this._.isEmpty(obj)) {
        obj.forEach(ele => {
          arrCategories.push(ele.year);
          arrFail.push(Math.round(ele.fail_percentage));
          arrPass.push(Math.round(ele.pass_percentage));
        });
      }
      this.ChartOptions_passFailByYearPercent.xaxis.categories = arrCategories;
      this.ChartOptions_passFailByYearPercent.series = [
        {
          name: "pass_percentage",
          data: arrPass
        },
        {
          name: "fail_percentage",
          data: arrFail
        }
      ];
      return this.ChartOptions_passFailByYearPercent;
    },
    formateChartOptions_passFailByYear() {
      let obj = this.$store.getters.getBiResultData.year_wise_pass_fail;
      let arrCategories = [];
      let arrFail = [];
      let arrPass = [];
      if (!this._.isEmpty(obj)) {
        obj.forEach(ele => {
          arrCategories.push(ele.year);
          arrFail.push(Math.round(ele.total_fail));
          arrPass.push(Math.round(ele.total_pass));
        });
      }
      this.ChartOptions_passFailByYear.xaxis.categories = arrCategories;
      this.ChartOptions_passFailByYear.series = [
        {
          name: "total_pass",
          data: arrPass
        },
        {
          name: "total_fail",
          data: arrFail
        }
      ];
      return this.ChartOptions_passFailByYear;
    },
    formateChartOptions_passFailByDivision() {
      let obj = this.$store.getters.getBiResultData.division_wise_pass_fail;
      let arrCategories = [];
      let arrFail = [];
      let arrPass = [];
      if (!this._.isEmpty(obj)) {
        obj.forEach(ele => {
          arrCategories.push(ele.year);
          arrFail.push(Math.round(ele.total_fail));
          arrPass.push(Math.round(ele.total_pass));
        });
      }
      this.ChartOptions_passFailByDivision.xaxis.categories = arrCategories;
      this.ChartOptions_passFailByDivision.series = [
        {
          name: "total_pass",
          data: arrPass
        },
        {
          name: "total_fail",
          data: arrFail
        }
      ];
      return this.ChartOptions_passFailByDivision;
    }
  }
};
</script>
