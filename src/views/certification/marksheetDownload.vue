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
                  :item-text="item =>  item.code + ' - ' + item.title"
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
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
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
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>{{ getTranscriptItem.length }}</template>
              <v-card-text class="title">Mark-Sheet List</v-card-text>
            </v-badge>
          </v-card>
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
        rowsPerPage: 25,
      },
      searchParam: {},
    };
  },
  created() {
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
  },
  methods: {
    searchTranscriptList() {
      let customSearchParam = this.searchParam;

      this.$store
        .dispatch("searchTranscript", customSearchParam)
        .then(() => {});
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
