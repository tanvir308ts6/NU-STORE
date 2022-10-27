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
                <v-autocomplete
                  disabled
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.code + ' - ' + data.item.title }}</v-chip
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
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
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
                  label="Select Year"
                  hide-details
                  prepend-icon="calendar_today"
                ></v-select>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.subject_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.code + ' - ' + data.item.title }}</v-chip
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
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <!-- {{getPaperByRescrutinerList}} -->
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="
                    (item) => item.paper_code + ' - ' + item.paper_name
                  "
                  item-value="paper_code"
                  :items="getPaperByRescrutinerList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.paper_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        data.item.paper_code + ' - ' + data.item.paper_name
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
                            data.item.paper_code + ' - ' + data.item.paper_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.rescrutiner_id"
                  :item-text="(item) => item.name"
                  item-value="id"
                  :items="getRescrutinerList"
                  menu-props="auto"
                  label="Select Re-scrutiner"
                  hide-details
                  prepend-icon="face"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.rescrutiner_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.name }}</v-chip
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
                          v-html="data.item.name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchRescrutinyCount"
                      >Search</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
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
              <v-card-text class="title"
                >Re-scrutinizer Script Count</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-card-actions>
            <v-btn
              color="blue-grey"
              class="white--text"
              @click="exportRescrutinerCount()"
            >
              <v-icon left dark>arrow_downward</v-icon>Export
            </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="mainheaders"
        :items="getRescrutinyCountList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.mobile }}</td>
          <td class="text-xs-center">{{ props.item.total_scripts }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import commonGet from '../../mixin/common_getters_mixin';
import watchMixin from '../../mixin/exam_year_watch_mixin';
export default {
  mixins: [commonGet, watchMixin],
  data() {
    return {
      loading: false,
      search: '',
      sl_count: 1,
      searchParam: {},
      mainheaders: [
        {text: 'SL', value: 'sl', width: '1%', sortable: false},
        {text: 'Name', value: 'name', align: 'center', sortable: false},
        {text: 'Email', value: 'email', align: 'center', sortable: false},
        {
          text: 'Mobile',
          value: 'mobile',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Total Scripts',
          value: 'total_scripts',
          align: 'center',
          sortable: false,
        },
      ],
      mark: '',
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, {text: 'All', value: -1}],
      },
    };
  },
  watch: {
    pagination() {
      this.searchRescrutinyCount();
    },
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.searchParam.type = "Recrutiner";
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch('fetchSubjectData',this.searchParam);
    }
    //paper
    if (!this.$store.getters.getPaperByResItems.length) {
      this.$store.dispatch('fetchPaperByRescrutinerData', this.searchParam);
    }
    this.$store.dispatch('searchRescrutiner', this.searchParam);
  },
  computed: {
    getRescrutinyCountList() {
      return this.$store.getters.getRescrutinyCountList;
    },
    getRescrutinerList() {
      return this.$store.getters.getRescrutinerDataList;
    },
  },
  methods: {
    exportRescrutinerCount() {
      // console.log("....");
      this.$store.dispatch('exportRescrutinerCount', this.searchParam);
    },
    setLimit() {
      const {sortBy, descending, page, rowsPerPage} = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchRescrutinyCount() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch('searchRescrutinyCountData', this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>

<style scoped></style>
