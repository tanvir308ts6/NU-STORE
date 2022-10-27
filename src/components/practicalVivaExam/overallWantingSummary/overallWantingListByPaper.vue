<template>
  <v-container fluid>
    <v-dialog v-model="pracDialogByStd" fullscreen>
      <v-toolbar dark color="light-blue darken-3" class="mt-4">
        <v-toolbar-title>Overall Wanting List By Student</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="closeDialogueByStd()">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <overallWantByStd />
        <!-- <admitCardCountByCollege :dialogStatus.sync="admitCardDialogStatus" :current="current"></admitCardCountByCollege> -->
      </v-card>
    </v-dialog>

    <v-layout row wrap align-center>
      <v-flex xs9>
        <v-select
          class="mx-3"
          disabled
          v-model="searchParam.exam_code"
          :items="getExamList"
          :item-text="item => item.code + ' - ' + item.title"
          item-value="code"
          label="Exam"
          prepend-icon="store_mall_directory"
        ></v-select>
      </v-flex>
      <!-- {{getLoggedInYear}} -->
      <v-flex xs3>
        <v-select
          class="mx-3"
          disabled
          v-model="searchParam.year"
          :items="getYearList"
          :item-text="item => '' + item.year + ''"
          item-value="year"
          label="Year"
          prepend-icon="calendar_today"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-divider class="my-3"></v-divider>

    <v-layout v-if="false">
      <v-flex xs10>
        <v-autocomplete
          outline
          :disabled="false"
          class="ma-2"
          v-model="searchParam.center_code"
          :item-text="item => item.center_code + ' - ' + item.center_name"
          item-value="center_code"
          :items="getPracticalCenterList"
          menu-props="auto"
          label="Select Center"
          prepend-icon="list"
          multiple
          hide-details
        >
          <template v-slot:selection="data">
            <v-chip
              close
              @input="removeCenter(data.item)"
              :selected="data.selected"
              class="chip--select-multi"
            >{{ data.item.center_code + " - " + data.item.center_name }}</v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.center_code + ' - ' + data.item.center_name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-layout justify-center row fill-height align-center>
          <v-btn outline round large @click="searchOverallWantList">
            <v-icon left dark>search</v-icon>Search
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider class="my-3"></v-divider>

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
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Overall Wanting List By Course</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-layout justify-center row fill-height align-center>
            <v-btn flat round large>
              Flow: ( {{ getOverallWantListByPaper_current.center_name }}
              <v-icon dark class="mx-2">arrow_right_alt</v-icon>
              {{ getOverallWantListByPaper_current.college_name }}
              <v-icon dark class="mx-2">arrow_right_alt</v-icon>
              {{ getOverallWantListByPaper_current.subject_name }})
            </v-btn>
          </v-layout>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getOverallWantListByPaper"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">
            <span>{{ props.item.center_code }} - {{ props.item.center_name }}</span>
          </td>
          <td class="text-xs">
            <span>
              {{ props.item.college_code }} -
              {{ props.item.college_name }}
            </span>
          </td>
          <td class="text-xs">
            <span>
              {{ props.item.subject_code }} -
              {{ props.item.subject_name }}
            </span>
          </td>
          <td class="text-xs">
            <v-btn @click="openDialogueByStd(props.item)">
              <span>{{ props.item.paper_code }} - {{ props.item.paper_name }}</span>
            </v-btn>
          </td>
          <td class="text-xs">
            {{ props.item.total_attendance
            }}
          </td>
          <td class="text-xs">{{ props.item.total_ict }}</td>

          <td class="text-xs">{{ props.item.total_practical }}</td>
          <td class="text-xs">{{ props.item.total_student }}</td>
          <td class="text-xs">{{ props.item.total_term_paper }}</td>
          <td class="text-xs">{{ props.item.total_theory }}</td>
          <td class="text-xs">{{ props.item.total_thesis }}</td>
          <td class="text-xs">{{ props.item.total_viva }}</td>
        </template>
      </v-data-table>
    </v-container>
    <!-- <pre> {{getOverallWantListByPaper}} </pre> -->
    <!--  <pre>{{searchParam}} </pre>
    <pre>{{getOverallWantListByPaper_current}} </pre>-->
  </v-container>
</template>
<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import studentDetail from "@/components/examinee/studentDetails.vue";
import overallWantByStd from "@/components/practicalVivaExam/overallWantingSummary/overallWantingListByStd.vue";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    overallWantByStd,
  },
  props: ["pracDialogByCol"],
  data() {
    return {
      pracDialogByStd: false,

      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },

      loading: false,
      sl_count: 0,

      searchParam: {
        full: true,
        admitcard: false,
        final: true,
        paper_type: 2,
      },

      headers: [
        { text: "SL", value: "sl" },
        { text: "Center", value: "center_code" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Course", value: "paper_code" },
        { text: "Total Attendance", value: "total_attendance" },
        { text: "Total Ict", value: "total_ict" },

        { text: "Total Practical ", value: "total_practical" },
        { text: "Total Examinee ", value: "total_student" },
        { text: "Total Term Paper ", value: "total_term_paper" },
        { text: "Total Theory", value: "total_theory" },
        { text: "Total Thesis ", value: "total_thesis" },
        { text: "Total Viva", value: "total_viva" },
      ],
      forceRander: true,
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = [
        this.getAuthUser.center.practical_center_code,
      ];
    }
    // if (!this.$store.getters.getCenterItems.length) {
    //   this.$store.dispatch("fetchCenterData");
    // }
  },
  computed: {
    //all data
    getOverallWantListByPaper() {
      return this.$store.getters.getOverallWantListByPaper;
    },

    // center
    getCenterItems() {
      return this.$store.getters.getCenterItems;
    },

    getOverallWantListByPaper_current() {
      return this.$store.getters.getOverallWantListByPaper_current;
    },
  },
  methods: {
    openDialogueByStd(currentItem) {
      // this.$store.commit("UNSET_PRACTICAL_WANT_DATA_BY_STD");
      console.log("here ");
      this.$store.commit("SET_OVERALL_WANT_DATA_BY_STD_CURRENT", currentItem);

      this.pracDialogByStd = true;
    },
    closeDialogueByStd() {
      this.pracDialogByStd = false;
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchOverallWantList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchOverallWantDataByPaper", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },

    removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.searchOverallWantList();
    },
    pracDialogByCol(val) {
      if (val) this.searchOverallWantList();
    },
    getOverallWantListByPaper_current(val) {
      if (Object.keys(val).length > 0) {
        this.searchParam.center_code = [val.center_code];
        this.searchParam.college_code = [val.college_code];
        this.searchParam.subject_code = [val.subject_code];
        this.searchOverallWantList();
      }
    },
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
