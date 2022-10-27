<template>
  <v-container fluid>
    <span class v-if="false">
      <div class="display-1 mb-4">
        <v-icon size="50">dashboard</v-icon>
        <span class="ml-2">Result ..|.. Overview</span>
      </div>
    </span>
    <v-card v-if="false">
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 md12 lg6>
          <v-select
            class="ma-3"
            v-model="e1"
            :items="states"
            menu-props="auto"
            label="Map"
            hide-details
            prepend-icon="map"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md12 lg6>
          <v-select
            class="ma-3"
            v-model="e1"
            :items="states"
            menu-props="auto"
            label="Location"
            hide-details
            prepend-icon="eco"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md12 lg4>
          <v-select
            class="ma-3"
            v-model="e1"
            :items="states"
            menu-props="auto"
            label="Exam"
            hide-details
            prepend-icon="horizontal_split"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md12 lg4>
          <v-select
            class="ma-3"
            v-model="e1"
            :items="states"
            menu-props="auto"
            label="Select"
            hide-details
            prepend-icon="calendar_today"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md12 lg4>
          <v-select
            class="ma-3"
            v-model="e1"
            :items="states"
            menu-props="auto"
            label="Select"
            hide-details
            prepend-icon="supervisor_account"
            single-line
          ></v-select>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6 md4 lg4>
        <pie-chart />
      </v-flex>
      <v-flex xs12 sm6 md8 lg8>
        <area-chart />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <bar-chart />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <bubble-chart />
      </v-flex>
      <v-flex xs12 sm6 md8 lg8>
        <column-chart />
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <donut-chart />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <heatmap-chart />
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <line-chart />
      </v-flex>
      <v-flex xs12 sm8 md8 lg8>
        <mixed-chart />
      </v-flex>
      <v-flex xs12 sm4 md4 lg4>
        <radial-bar-chart />
      </v-flex>
      <v-flex xs12 sm12 md12 lg12>
        <scatter-chart />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import areaChart from "../../components/charts/areaChart.vue";
import barChart from "../../components/charts/barChart.vue";
import bubbleChart from "../../components/charts/bubbleChart.vue";
import columnChart from "../../components/charts/columnChart.vue";
import donutChart from "../../components/charts/donutChart.vue";
import heatmapChart from "../../components/charts/heatmapChart.vue";

import lineChart from "../../components/charts/lineChart.vue";
import mixedChart from "../../components/charts/mixedChart.vue";
import radialBarChart from "../../components/charts/radialBarChart.vue";

import scatterChart from "../../components/charts/scatterChart.vue";

import pieChart from "../../components/charts/pieChart.vue";

export default {
  name: "MixedExample",
  components: {
    pieChart,
    areaChart,
    barChart,
    bubbleChart,
    columnChart,
    donutChart,
    heatmapChart,
    lineChart,
    mixedChart,
    radialBarChart,
    scatterChart
  }
};
</script>
