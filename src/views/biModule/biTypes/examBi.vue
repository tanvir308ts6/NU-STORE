<template>
  <v-container fluid>
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
                :item-text="item => '( Code:' + item.code + ' ) ' + item.title"
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
                :item-text="item => '( Code:' + item.code + ' ) ' + item.title"
                item-value="code"
                label="Select Degree"
                prepend-icon="edit"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- Search Button -->
      <v-flex xs12 sm12 md12 class="my-0">
        <v-layout justify-center row fill-height align-center>
          <v-btn outline round large @click="searchResultList()">
            <v-icon left dark>search</v-icon>Search
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider class="mt-2 mb-3"></v-divider>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear],
  components: {},
  data: () => ({
    ep: 0,
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
    }
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
    // if (!this.$store.getters.getDistrictItems.length) {
    // console.log("----> ");

    // }
  },
  computed: {
    getResultData() {
      return this.$store.getters.getResultData;
    }
  },
  methods: {
    searchResultList() {},
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
