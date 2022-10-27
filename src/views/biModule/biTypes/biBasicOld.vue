<template>
  <v-container fluid>
    <!-- {{searchParam}} -->
    <v-expansion-panel v-if="false" class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>
        <v-layout column class="mx-0">
          <!-- Exam-wise search options -->
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left>touch_app</v-icon>Exam-wise search options
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- Registration  -->
                <v-flex xs12>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    :item-text="
                      item => '( Code:' + item.code + ' ) ' + item.title
                    "
                    item-value="code"
                    label="Exam"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm3 md3>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.year"
                    :items="getYearList"
                    :item-text="item => '' + item.year + ''"
                    item-value="year"
                    label="Year"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm9 md9>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.degree_code"
                    :items="getDegreeList"
                    :item-text="
                      item => '( Code:' + item.code + ' ) ' + item.title
                    "
                    item-value="code"
                    label="Select Degree"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- Result-wise search options -->
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left>touch_app</v-icon>Result-wise search options
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- Registration  -->
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.result"
                    :items="[{ title: 'CGPA' }, { title: 'GPA' }]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Result"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.result_type"
                    :items="[
                      { title: 'Pass-failed' },
                      { title: 'Expelled' },
                      { title: 'Practical-viva' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Result Type"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-layout row wrap align-center class="mx-3">
                    <v-flex xs6>
                      <v-range-slider
                        prepend-icon="edit"
                        v-model="searchParam.cgpa_range"
                        :max="4"
                        :min="2"
                        :step="0.1"
                        label="CGPA Range"
                        color="grey lighten-1"
                        thumb-color="primary"
                        thumb-label
                      ></v-range-slider>
                    </v-flex>
                    <v-flex xs1></v-flex>
                    <v-flex xs2>
                      <v-text-field
                        readonly
                        v-model="searchParam.cgpa_range[0]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        outline
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs1>
                      <span class="ml-4">to</span>
                    </v-flex>

                    <v-flex xs2>
                      <v-text-field
                        readonly
                        v-model="searchParam.cgpa_range[1]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        outline
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.result_status"
                    :items="[{ title: 'VC Approved' }, { title: 'VC Refused' }]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Result Status"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.mark_type"
                    :items="[
                      { title: 'Theory' },
                      { title: 'In-course' },
                      { title: 'Practical-viva' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Marks Type"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- College-info-wise search options -->
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left>touch_app</v-icon>College-info-wise search
              options????
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- College -->
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    class="ma-2"
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.college_type"
                    :items="[{ title: 'Govt' }, { title: 'Non-Govt' }]"
                    :item-text="item => item.title"
                    item-value="code"
                    prepend-icon="edit"
                    label="College Type"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- Student-info-wise search options -->
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left>touch_app</v-icon>Student-info-wise search options
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.gender"
                    :items="[
                      { title: 'Male' },
                      { title: 'Female' },
                      { title: 'Other' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    prepend-icon="edit"
                    label="Student Gender"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.student_type"
                    :items="[{ title: 'Regular' }, { title: 'Irregular' }]"
                    :item-text="item => item.title"
                    item-value="code"
                    prepend-icon="edit"
                    label="Student Type"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    class="mx-3"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
                    prepend-icon="library_books"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.subject_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{
                          "(" + data.item.code + ") " + data.item.title
                        }}</v-chip
                      >
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content
                          v-text="data.item"
                        ></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title
                            v-html="
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    class="mx-3"
                    v-model="searchParam.degree_group"
                    :items="getDegreeGroupList"
                    color="blue-grey lighten-2"
                    label="Select Degree Group"
                    :item-text="
                      item =>
                        '(' +
                        item.degree_group_code +
                        ') ' +
                        item.degree_group_name
                    "
                    item-value="degree_group_code"
                    return-object
                    multiple
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.degree_group = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          "(" +
                            data.item.degree_group_code +
                            ") " +
                            data.item.degree_group_name
                        }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content
                          v-text="data.item"
                        ></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title
                            v-html="
                              '(' +
                                data.item.degree_group_code +
                                ') ' +
                                data.item.degree_group_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- Result-wise search options -->
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left>touch_app</v-icon>Registration-wise search options
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- Registration  -->
                <v-flex xs12 sm6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.session"
                    :items="[
                      { title: '2015-2016' },
                      { title: '2016-2017' },
                      { title: '2017-2018' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Session"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.division"
                    :items="[
                      { title: 'Dhaka' },
                      { title: 'Khulna' },
                      { title: 'Barishal' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Division"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.district"
                    :items="[
                      { title: 'District 1' },
                      { title: 'District 2' },
                      { title: 'District  3' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="District"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    class="mx-3"
                    v-model="searchParam.course"
                    :items="[
                      { title: 'Course 1' },
                      { title: 'Course 2' },
                      { title: 'Course  3' }
                    ]"
                    :item-text="item => item.title"
                    item-value="code"
                    label="Course"
                    prepend-icon="edit"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-checkbox
                    class="mx-3"
                    v-model="searchParam.dropout"
                    label="Dropout"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- Search Button -->
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchResultList()">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <v-divider class="mt-2 mb-3"></v-divider> -->
    <v-container fluid>
      <v-layout>
        <v-card color="primary">
          <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            hide-overlay
            stateless
          >
            <v-toolbar flat>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="require('@/assets/nu_logos/nu_logo_r.png')" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title class="title">BI Type</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon @click.stop="mini = !mini">
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list class="pt-0">
              <v-list-tile
                v-for="item in items"
                :key="item.value"
                @click="clicked(item)"
              >
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-layout column>
          <v-flex xs12>
            <examBi v-if="currentTab == 0" />
            <resultBi v-if="currentTab == 1" />
            <collegeBi v-if="currentTab == 2" />
            <studentBi v-if="currentTab == 3" />
            <registrationBi v-if="currentTab == 4" />
            <examinerBi v-if="currentTab == 5" />
            <practicalBi v-if="currentTab == 6" />
          </v-flex>
          <v-flex xs12>
            <biExamples />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import biExamples from "./biExamples";
import examBi from "./biTypes/examBi";
import resultBi from "./biTypes/resultBi";
import collegeBi from "./biTypes/collegeBi";
import studentBi from "./biTypes/studentBi";
import registrationBi from "./biTypes/registrationBi";
import examinerBi from "./biTypes/examinerBi";
import practicalBi from "./biTypes/practicalMarkBi";

export default {
  mixins: [commonGet, commonExamYear],
  components: {
    biExamples,
    examBi,
    resultBi,
    collegeBi,
    studentBi,
    registrationBi,
    examinerBi,
    practicalBi
  },
  data: () => ({
    drawer: true,
    mini: true,
    paperDialog: false,
    details: [],
    forceRerenderFlag: true,
    visible: false,
    search: "",
    loading: false,
    sl_count: 1,
    pagination: { rowsPerPage: 10, rowsPerPageItems: [10] },
    searchParam: {
      cgpa_range: [2, 4]
    },
    currentTab: 0,
    items: [
      { title: "Exam-wise search options", icon: "edit", value: 0 },
      {
        title: "Result-wise search options",
        icon: "school",
        value: 1
      },
      {
        title: "College-info-wise search options",
        icon: "people",
        value: 2
      },
      {
        title: "Student-info-wise search options",
        icon: "person",
        value: 3
      },
      {
        title: "Registration-wise search options",
        icon: "emoji_people",
        value: 4
      },
      {
        title: "Examiner/Head Examiner-wise search options",
        icon: "people",
        value: 5
      },
      {
        title: "Practical-wise search options",
        icon: "library_books",
        value: 6
      }
    ],
    right: null
  }),
  created() {
    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchSubjectData");
    }

    this.$store.dispatch("fetchDegreeGroupList");
  },
  computed: {
    getResultData() {
      return this.$store.getters.getResultData;
    }
  },
  methods: {
    searchResultList() {},
    clicked(item) {
      this.currentTab = item.value;
      console.log("clicekd", item);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchBIList() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("searchBIData", this.searchParam).then(data => {
        this.loading = false;
        this.pagination.totalItems = 49149;
        // uncomment the below section when back end is ready
        // this.sl_count = data.meta.from;
        // this.pagination.totalItems = data.meta.total;
      });
    }
  },
  watch: {
    pagination() {
      this.searchBIList();
    }
  }
};
</script>
<style lang="scss" scoped></style>
