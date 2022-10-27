<template>
  <v-container fluid>
    <!-- {{getLoggedInYear}}
    {{schema}}-->
    <!-- {{getYearList[0]}}
    {{schema}}-->
    <!-- {{getCollegeStm}} -->

    <v-expansion-panel class="mb-3" v-model="open" inset>
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 title">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-layout v-if="forceRerenderFlag">
                  <!-- {{getLoggedInExam}} -->
                  <v-flex xs9>
                    <v-select
                      class="mx-3"
                      disabled
                      v-model="schema.exam_code"
                      :items="getExamList"
                      :item-text="
                        item => '( Code:' + item.code + ' ) ' + item.title
                      "
                      item-value="code"
                      label="Exam"
                      v-on:change="getData"
                    ></v-select>
                  </v-flex>
                  <!-- {{getLoggedInYear}} -->
                  <v-flex xs3>
                    <v-select
                      class="mx-3"
                      disabled
                      v-model="schema.year"
                      :items="getYearList"
                      :item-text="item => '' + item.year + ''"
                      item-value="year"
                      label="Year"
                      v-on:change="getData"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-flex xs12>
                  <v-select
                    v-model="schema.subject"
                    :items="getSubjectList"
                    :item-text="
                      item => '( Code:' + item.code + ' ) ' + item.title
                    "
                    item-value="code"
                    label="Select Subject"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card>
            <v-flex xs12 sm12 md12 style="margin-top:5px;margin-bottom:8px;">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="getData">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- {{getCollegeStm}} -->
    {{ getCollegeStm_.data.length }}
    <br />
    <span class="title">College Statement (Subject Wise)</span>
    <v-data-table :headers="headers" :items="getCollegeStm" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.exam_code }}</td>
        <td>{{ props.item.exam_title }}</td>
        <td>{{ props.item.college_name }}</td>
        <td>{{ props.item.college_code }}</td>
        <td>{{ props.item.session }}</td>
        <td>{{ props.item.year }}</td>
        <td>{{ props.item.total }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
export default {
  mixins: [commonGet],
  created() {
    this.schema.year = this.getLoggedInYear.year;
    this.schema.exam_code = this.getLoggedInExam.code;
    this.getData();
    // if (this.$store.getters.getCollegeStm.length < 1) {
    //   this.$store.dispatch("fetchCollegeStmSubWise");
    // }

    if (this.$store.getters.getSubjectItems.length < 1) {
      this.$store.dispatch("fetchSubjectData");
    }
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData");
    }
    if (this.$store.getters.getYearItems.length < 1) {
      this.$store.dispatch("fetchYearData");
    }

    //year
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //year
    // if (!this.$store.getters.getYearItems.length) {
    //   console.log("----> fetchYearData");
    //   this.$store.dispatch("fetchYearData");
    // }
    //exam
    // if (!this.$store.getters.getExamItem.length) {
    //   console.log("----> fetchExamData");
    //   this.$store.dispatch("fetchExamData");
    // }
  },
  methods: {
    getData() {
      this.$store.dispatch("fetchCollegeStm", this.schema);
    }
  },
  watch: {
    getLoggedInExam(val) {
      console.log("-->", val);
      this.schema.exam_code = val.code;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    },
    getLoggedInYear(val) {
      this.schema.year = val.year;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    }
  },
  computed: {
    getCollegeStm() {
      return this.$store.getters.getCollegeStm.data;
    },
    getCollegeStm_() {
      return this.$store.getters.getCollegeStm;
    },

    sideTitleOfSearchPanel() {
      if (this.open === 0) return "( click to close )";
      else return "( click to open )";
    }
  },
  data() {
    return {
      forceRerenderFlag: true,
      schema: {},
      open: 0,
      headers: [
        { text: "exam_code", value: "exam_code" },
        { text: "exam_title", value: "exam_title" },
        { text: "college_name", value: "college_name" },
        { text: "college_code", value: "college_code" },
        { text: "session", value: "session" },
        { text: "year", value: "year" },
        { text: "total", value: "total" }
      ]
    };
  }
};
</script>
