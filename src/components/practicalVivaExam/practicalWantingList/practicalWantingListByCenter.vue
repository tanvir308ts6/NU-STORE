<template>
  <v-container fluid>
    <v-dialog v-model="pracDialogByCol" fullscreen>
      <v-toolbar dark color="light-blue darken-1">
        <v-toolbar-title>Practical Wanting List By College</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="closeDialogueByCollege()">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <practicalWantingListByCollege
          :pracDialogByCol.sync="pracDialogByCol"
        />
        <!-- <practicalWantingListByCollege :dialogStatus.sync="admitCardDialogStatus" :current="current"></admitCardCountByCollege> -->
      </v-card>
    </v-dialog>

    <v-layout row wrap align-center>
      <!-- {{getLoggedInExam}} -->
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

    <v-layout>
      <v-flex xs10>
        <v-autocomplete
          outline
          :disabled="ifCenterUser"
          class="ma-2"
          v-model="searchParam.center_code"
          :item-text="item => item.center_code + '-' + item.center_name"
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
              >{{
                data.item.center_code + "- " + data.item.center_name
              }}</v-chip
            >
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title
                  v-html="data.item.center_code + '- ' + data.item.center_name"
                ></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-layout justify-center row fill-height align-center>
          <v-btn outline round large @click="searchPracticalWantList">
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
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Practical Wanting List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getPracticalWantListByCenter"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.exam_code }}</td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">
            <v-btn @click="openDialogueByCollege(props.item)">
              <span>
                {{ props.item.center_code }} -
                {{ props.item.center_name }}
              </span>
            </v-btn>
          </td>
          <td class="text-xs">{{ props.item.total_students }}</td>
          <td class="text-xs">{{ props.item.total_absent_count }}</td>
          <td class="text-xs">{{ props.item.total_mark_count }}</td>
          <td class="text-xs">{{ props.item.total_wanting_numbers }}</td>
        </template>
      </v-data-table>
    </v-container>
    <!-- <pre>{{searchParam}} </pre> -->
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import practicalWantingListByCollege from "@/components/practicalVivaExam/practicalWantingList/practicalWantingListByCollege.vue";
// import studentDetail from "@/components/examinee/practicalWantingListByCollege.vue";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    practicalWantingListByCollege,
  },
  data() {
    return {
      pracDialogByCol: false,

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
        { text: "Exam", value: "exam_name" },
        { text: "Year", value: "year" },
        { text: "Center", value: "college_name" },
        { text: "Total Examinee ", value: "total" },
        { text: "Total Absent Count ", value: "total_absent_count" },
        { text: "Total Mark Count ", value: "total_mark_count" },
        { text: "Total wanting numbers", value: "total_wanting_numbers" },
      ],
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

    // if (!this.$store.getters.getCenterListByPractical.length) {
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    //param.center_code = this.getAuthUser.center.practical_center_code;
    this.$store.dispatch("fetchPracticalWiseCenterData", param);
    // }
  },
  computed: {
    //all data
    getPracticalWantListByCenter() {
      return this.$store.getters.getPracticalWantListByCenter;
    },

    // center
    // getPracticalCenterList() {
    //   return this.$store.getters.getPracticalCenterList;
    // },
  },
  methods: {
    openDialogueByCollege(currentItem) {
      //this.$store.commit("UNSET_PRACTICAL_WANT_DATA_BY_COLLEGE");
      this.$store.commit(
        "SET_PRACTICAL_WANT_DATA_BY_CENTER_CURRENT",
        currentItem
      );
      this.pracDialogByCol = true;
    },
    closeDialogueByCollege() {
      this.pracDialogByCol = false;
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchPracticalWantList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchPracticalWantDataByCenter", this.searchParam)
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
      this.searchPracticalWantList();
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
