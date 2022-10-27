<template>
  <div id="chart">
    <apexchart
      height="350"
      type="pie"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: "MixedExample",
  data: function() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        labels: ["Bangla", "English", "Math", "Physics", "Chemistry"],
        legend: {
          position: "bottom"
        }
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 300
        //       },
        //       legend: {
        //         position: "bottom"
        //       }
        //     }
        //   }
        // ]
      }
    };
  }
};
</script>
