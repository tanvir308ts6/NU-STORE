<template>
  <div id="chart">
    <apexchart
      type="radialBar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: "RadialBarExample",
  data: function() {
    return {
      series: [44, 55, 67, 83],
      chartOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "Total",
                formatter: function(w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                }
              }
            }
          }
        },
        labels: ["Apples", "Oranges", "Bananas", "Berries"]
      }
    };
  }
};
</script>
