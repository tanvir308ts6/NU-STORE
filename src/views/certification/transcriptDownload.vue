<template>
  <v-container fluid>
    <v-expansion-panel focusable v-if="forceRerenderFlag">
      <v-expansion-panel-content class="mycustomExpansionPanel">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3">
              <v-layout row wrap align-center class="py-3">
                <v-text-field
                  v-model="searchParam.reg_no"
                  class="ma-2"
                  name="rg_no"
                  menu-props="auto"
                  label="Registration Number"
                  prepend-icon="edit"
                  hide-details
                ></v-text-field>

                <v-autocomplete
                  disabled
                  class="ma-2"
                  menu-props="auto"
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  color="blue-grey lighten-2"
                  label="Select Exam"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  prepend-icon="subject"
                  hide-details
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ '(' + data.item.code + ') ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-select
                  disabled
                  name="year"
                  class="ma-2"
                  v-model="searchParam.year"
                  item-text="year"
                  item-value="year"
                  :items="getYearList"
                  menu-props="auto"
                  label="Select Exam Year"
                  hide-details
                  prepend-icon="calendar_today"
                ></v-select>
                <v-text-field
                  class="ma-2"
                  name="session"
                  label="Session Year"
                  hide-details
                  menu-props="auto"
                  v-model="searchParam.session_year"
                  prepend-icon="edit"
                ></v-text-field>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchTranscriptList">Search</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-divider class="mt-5 mb-3"></v-divider>
    <v-container fluid>
      <v-card color="white" class="pa-4">
        <v-layout row wrap>
          <v-flex xs12 sm12 offset-sm0>
            <v-card flat>
              <p class="ma-2">Ref:NU/Con/Certi/Trans/444/2020</p>
              <div align="center" style="font-size:150%;">
                <strong>
                  <u>ACADEMIC TRANSCRIPT</u>
                </strong>
              </div>
              <div class="ma-2">
                <strong class="mr-3">Name of the Student:</strong>
                {{getSchema.name}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Father's Name:</strong>
                {{getSchema.f_name}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Mother's Name:</strong>
                {{getSchema.m_name}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Name of Institution:</strong>
                {{getSchema.institution_name}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Entrance Qualification:</strong>
                {{getSchema.entrance_qlf}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Degree Conferred/ Name of Examination:</strong>
                {{getSchema.exam_name}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Discipline/Subject:</strong>
                {{getSchema.subject}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Duration of Course:</strong>
                {{getSchema.dur_of_course}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Registration No.:</strong>
                {{getSchema.reg_no}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Examination Roll No.:</strong>
                {{getSchema.exam_roll_no}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Session:</strong>
                {{getSchema.session}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Year of Passing:</strong>
                {{getSchema.year_of_passing}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">Total Earned Credit:</strong>
                {{getSchema.total_earnd_credit}}
              </div>
              <div class="ma-2">
                <strong class="mr-3">CGPA:</strong>
                {{getSchema.cgpa}}
              </div>

              <!-- <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>-->
            </v-card>
            <table style="width:100%">
              <caption>
                <strong>Academic Attainments</strong>
              </caption>
              <thead>
                <tr>
                  <th rowspan="2">Year</th>
                  <th rowspan="2">Semester</th>
                  <th rowspan="2">Course Code</th>
                  <th rowspan="2">Course Title</th>
                  <th rowspan="2">Credit</th>
                  <th rowspan="2">Letter Grade</th>
                  <th colspan="2">Total Semester</th>
                </tr>
                <tr>
                  <th>Credit</th>
                  <th>GPA</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in getSchema.attainments">
                  <tr :key="item.year">
                    <th :rowspan="countRow(item) + 2" scope="rowgroup">{{item.year}} {{index}}</th>
                  </tr>

                  <template v-for="(subitem, index2) in item.semester">
                    <tr :key="subitem.s_title">
                      <th
                        scope="row"
                        :rowspan="subitem.courses.length + 1"
                        :key="item.year"
                      >{{subitem.s_title}}</th>
                    </tr>
                    <tr v-for="(subitems,index3) in subitem.courses" :key="subitems.code">
                      <td>{{subitems.code}}</td>
                      <td>{{subitems.title}}</td>
                      <td>{{subitems.credit}}</td>
                      <td>{{subitems.l_grade}}</td>
                      <th
                        scope="row"
                        :rowspan="countRow(item)"
                        v-if="index2 == 0 && index3 == 0"
                      >{{item.credit}}</th>
                      <th
                        scope="row"
                        :rowspan="countRow(item)"
                        v-if="index2 == 0 && index3 == 0"
                      >{{item.gpa}}</th>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
            <br />
            <table>
              <tbody>
                <tr>
                  <th rowspan="11">Grading System</th>
                  <th>Marks Range</th>
                  <th>Letter Grade</th>
                  <th>Grade Point</th>
                </tr>
                <tr>
                  <td>80% & above</td>
                  <td>A+</td>
                  <td>4.00</td>
                </tr>
                <tr>
                  <td>75% - 79%</td>
                  <td>A</td>
                  <td>3.75</td>
                </tr>
                <tr>
                  <td>70% - 74%</td>
                  <td>A-</td>
                  <td>3.50</td>
                </tr>
                <tr>
                  <td>65% - 69%</td>
                  <td>B+</td>
                  <td>3.25</td>
                </tr>
                <tr>
                  <td>60% - 64%</td>
                  <td>B</td>
                  <td>3.00</td>
                </tr>
                <tr>
                  <td>55% - 59%</td>
                  <td>B-</td>
                  <td>2.75</td>
                </tr>
                <tr>
                  <td>50% - 54%</td>
                  <td>C+</td>
                  <td>2.50</td>
                </tr>
                <tr>
                  <td>45% - 49%</td>
                  <td>C</td>
                  <td>2.25</td>
                </tr>
                <tr>
                  <td>40% - 44%</td>
                  <td>D</td>
                  <td>2.00</td>
                </tr>
                <tr>
                  <td>Below 40%</td>
                  <td>F</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear],
  data() {
    return {
      details: [],
      pagination: {
        rowsPerPage: 25
      },
      searchParam: {}
    };
  },
  created() {
    this.ifSearchParam = true;
    this.multipleExamFlag = false;
    // all
    if (this.$store.getters.getTranscriptItem.length == 0) {
      this.$store.dispatch("fetchTranscriptData");
    }
  },
  computed: {
    //all data
    getTranscriptItem() {
      return this.$store.getters.getTranscriptItem;
    },
    getSchema() {
      return this.$store.getters.getTranscriptSchema;
    }
  },
  methods: {
    countRow(item) {
      try {
        var count = 1;
        for (var i = 0; i < item.semester.length; i++) {
          count = count + item.semester[i].courses.length;
        }
        console.log("count ", count);
        return count;
      } catch (ex) {
        console.log(ex);
      }
    },
    searchTranscriptList() {
      let customSearchParam = this.searchParam;

      this.$store
        .dispatch("searchTranscript", customSearchParam)
        .then(() => {});
    }
  }
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 2px;
}
</style>
