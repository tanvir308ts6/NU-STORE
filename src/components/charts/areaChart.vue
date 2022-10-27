<template>
  <apexchart
    type="area"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: "AreaExample",
  data: function() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
        },
        responsive: [
          {
            breakpoint: 750,
            options: {
              chart: {
                height: 400
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 300
              }
            }
          }
        ]
      },
      series: [
        {
          name: "Male",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Famale",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  }
};
</script>
