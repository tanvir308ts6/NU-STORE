<template>
  <div class="example">
    <apexchart
      ref="donut"
      height="350"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div>
      <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DonutExample",
  data: function() {
    return {
      chartOptions: {
        labels: ["Blue", "Green", "Yellow", "Red"],
        legend: {
          position: "bottom"
        }
      },
      series: [11, 32, 45, 32]
    };
  },
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.series.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });

      this.series = newData;
    }
  }
};
</script>
