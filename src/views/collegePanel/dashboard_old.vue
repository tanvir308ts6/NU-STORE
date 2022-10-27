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
                v-if="getExamMasterList.length"
                >{{ getExamMasterList.length }}</v-btn
              >
            </template>
            <v-card-text class="title">Exam List</v-card-text>
          </v-badge>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-text-field
          v-model="search"
          label="Search"
          class="mt-1"
          hide-details
          solo
          flat
          single-line
        ></v-text-field>
        <v-spacer />
        <v-btn
          @click="searchList()"
          class="ml-3"
          fab
          small
          flat
          dark
          color="primary"
        >
          <v-icon dark large>search</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :search="search"
      :items="getAllOpenExamMasterList"
      class="elevation-1"
      item-key="id"
    >
      <template v-slot:items="props">
        <tr>
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.exam_code }}</td>
          <td class="text-xs">{{ props.item.exam_year }}</td>
          <!-- <td class="text-xs">{{ props.item.start_date|dateFormat('ll') }}</td> -->
          <!-- <td class="text-xs">{{ props.item.end_date|dateFormat('ll') }}</td> -->
        </tr>
      </template>
    </v-data-table>
    <ExamRoutine></ExamRoutine>
    <!-- <pre>{{getExamMasterList}}</pre> -->
  </v-container>
</template>
<script>
import ExamRoutine from "@/views/collegePanel/ExamRoutine";
import commonGet from "@/mixin/college_common_getters_mixin";

export default {
  mixins: [commonGet],
  components: {
    ExamRoutine
  },
  computed: {
    college() {
      return this.$store.getters.getAuthCollege;
    }
  },
  created() {
    this.$store.dispatch("getAllOpenExamMasterList");
  },
  data() {
    return {
      search: null,
      loading: false,
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "10",
          sortable: false
        },
        { text: "Name", value: "exam_name" },
        { text: "Eaxm Code", value: "exam_code" },
        { text: "Year", value: "exam_year" }
        // { text: "Start Date", value: "start_date" },
        // { text: "Close Date", value: "end_date" }
      ]
    };
  },
  methods: {}
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
