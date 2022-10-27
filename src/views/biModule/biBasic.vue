<template>
  <v-container fluid>
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
                  <v-icon color="primary">{{ item.icon }}</v-icon>
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
          <!-- <v-flex xs12>
            <biExamples />
          </v-flex>-->
        </v-layout>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
//import biExamples from "./biExamples";
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
    //biExamples,
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
