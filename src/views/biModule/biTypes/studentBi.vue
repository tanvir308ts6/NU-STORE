<template>
  <v-container fluid>
    <v-layout column class="mx-0">
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
                :items="[{title:'Male'},{title:'Female'},{title:'Other'}]"
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
                :items="[{title:'Regular'},{title:'Irregular'}]"
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
                  >
                    {{
                    "(" + data.item.code + ") " + data.item.title
                    }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
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
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
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
// import formDialog from "../components/centerList/centerForm.vue";
export default {
  components: {
    // formDialog
  },

  data() {
    return {
      chartsLib: null,
      // Array will be automatically processed with visualization.arrayToDataTable function

      states: [
        "Dhaka",
        "Chittagong",
        "Rajshahi",
        "Khulna",
        "Sylhet",
        "Mymensingh",
        "Barisal",
        "Rangpur",
        "Comilla",
        "Narayanganj",
        "Gazipur"
      ],

      chartData: [
        ["Year", "BCS", "MSC", "DEGREE"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350]
      ]
    };
  },
  created() {
    // this.$store.dispatch("callCenterData");
  },
  computed: {
    chartOptions() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Bar.convertOptions({
        // chart: {
        //   title: "Company Performance",
        //   subtitle: "Sales, Expenses, and Profit: 2014-2017"
        // },
        bars: "horizontal", // Required for Material Bar Charts.
        hAxis: { format: "decimal" },
        height: 400,
        colors: ["#1b9e77", "#d95f02", "#7570b3"]
      });
    }
  },
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    }
  }
};
</script>
