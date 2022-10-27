<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm8 md8 lg8 class="mt-5 ml-3">
        <h3 class="display-2 text-sm-left">
          <b>Welcome to NU-EMS</b>
        </h3>
        <p class="title text-sm-left mt-1 ml-0">
          National University Examination Management System
        </p>
      </v-flex>
      <v-flex xs2></v-flex>
    </v-layout>
    <v-divider class="my-2"></v-divider>

    <v-card class="my-0">
      <DashboardSummary></DashboardSummary>
    </v-card>

    <v-layout row wrap class="mt-4" v-if="true">
      <v-container fluid>
        <v-card>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Exams Status</v-card-text>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
            </v-layout>
          </v-card>
          <v-data-table
            :headers="headers"
            :items="getDashboardData.exam_status"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:headers>
              <tr>
                <th
                  v-for="(h, i) in headers"
                  :key="i"
                  class="text-center parent-header td-border-style"
                  :rowspan="h.children ? 1 : 3"
                  :colspan="h.children ? h.children.length : 1"
                >
                  {{ h.text }}
                </th>
              </tr>
              <tr>
                <th
                  v-for="(h1, i1) in getSubHeader(headers)"
                  :key="i1"
                  :rowspan="i1 == 0 ? 2 : 1"
                  class="text-center child-header td-border-style"
                >
                  {{ h1.text }}
                </th>
              </tr>
              <tr>
                <th
                  v-for="(h1, i1) in getSubHeader2(headers)"
                  :key="i1"
                  class="text-center child-header td-border-style"
                >
                  {{ h1.text }}
                </th>
              </tr>
            </template>
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.exam_code }} - {{ props.item.exam_name }}</td>
              <td class="text-xs-center">{{ props.item.exam_year }}</td>
              <td class="text-xs-center">
                {{ props.item.exam_start_date }}
              </td>
              <td class="text-xs-center">
                <div>{{ props.item.ff_start_date }}</div>
                {{ props.item.ff_end_date }}
              </td>
              <!-- <td class="text-xs-center"></td> -->
              <td class="text-xs-center">
                <div>{{ props.item.prob_start_date }}</div>
                {{ props.item.prob_end_date }}
              </td>
              <!-- <td class="text-xs-center"></td> -->
              <td class="text-xs-center">
                <div>{{ props.item.cen_start_date }}</div>
                {{ props.item.cen_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.cen_end_date }}</td> -->
              <td class="text-xs-center">
                <div>{{ props.item.rou_start_date }}</div>
                {{ props.item.rou_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.rou_end_date }}</td> -->
              <td class="text-xs-center">
                <div>{{ props.item.adm_start_date }}</div>
                {{ props.item.adm_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.adm_end_date }}</td> -->
              <td class="text-xs-center">
                <div>{{ props.item.em_start_date }}</div>
                {{ props.item.em_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.em_end_date }}</td> -->
              <td class="text-xs-center">
                <div>{{ props.item.pv_start_date }}</div>
                {{ props.item.pv_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.pv_end_date }}</td> -->
              <td class="text-xs-center">
                <div>{{ props.item.rg_start_date }}</div>
                {{ props.item.rg_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.rg_end_date }}</td> -->
              <td class="text-xs-center">
                <div>
                  {{ props.item.ra_start_date }}
                </div>
                {{ props.item.ra_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.ra_end_date }}</td> -->
              <td class="text-xs-center">
                <div>{{ props.item.rrp_start_date }}</div>
                {{ props.item.rrp_end_date }}
              </td>
              <!-- <td class="text-xs-center">{{ props.item.rrp_end_date }}</td> -->
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import DashboardSummary from "./DashboardSummary";
export default {
  mixins: [common_login_getters],
  components: { DashboardSummary },
  data: () => ({
    calendarStatus: false,
    headers: [
      {
        text: "Exam",
        value: "exam_code",
        align: "left",
        sortable: false,
      },
      {
        text: "Year",
        value: "year",
        align: "center",
        sortable: false,
      },
      {
        text: "Exam ",
        value: "total_student",
        align: "center",
        sortable: false,

        children: [{ text: "Start Date" }],
      },
      {
        text: "Form fill-up ",
        value: "total_student",
        align: "center",
        sortable: false,

        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        // text: "Probable (Start Date - End Date)",
        text: "Probable",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Center Allocation ",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Routine ",
        value: "total_student",
        align: "center",
        sortable: false,
        children2: [{ text: "End Date" }],
        children: [{ text: "Start Date" }],
      },
      {
        text: "Admit Card",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Examiner Mark  ",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Practical-Viva Mark",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Result Generate",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Rescrutiny Apply",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
      {
        text: "Rescrutiny Result Processing",
        value: "total_student",
        align: "center",
        sortable: false,
        children: [{ text: "Start Date" }],
        children2: [{ text: "End Date" }],
      },
    ],
  }),
  watch: {
    calendarStatus(val) {
      console.log("calendarStatus", val);
    },
  },
  created() {
    this.getdata();
  },
  methods: {
    goto(link) {
      this.$router.push(link);
    },
    getdata() {
      // this.getProgressLoading = true;
      this.$store.dispatch("getDashData").then(() => {
        // this.getProgressLoading = false;
      });
    },
    getMainHeader(headers) {
      return headers.filter((i) => i.children);
    },
    getSubHeader(headers) {
      let result = [];
      headers
        .filter((i) => i.children)
        .forEach((v) => {
          result = result.concat(v.children);
        });
      console.log("result", result);
      return result;
    },
    getSubHeader2(headers) {
      let result = [];
      headers
        .filter((i) => i.children2)
        .forEach((v) => {
          result = result.concat(v.children2);
        });
      console.log("result", result);
      return result;
    },
  },
  computed: {
    getDashboardData() {
      return this.$store.getters.getDashboardData;
    },
  },
};
</script>

<style></style>
