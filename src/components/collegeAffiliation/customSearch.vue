<template>
  <v-expansion-panel focusable>
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
                v-model="searchParam.college_code"
                class="mt-3 ml-2"
                name="college_code"
                label="College Code"
                prepend-icon="edit"
              ></v-text-field>

              <v-select
                v-model="searchParam.degree_code"
                :items="getDegree"
                item-text="degree_name"
                item-value="degree_code"
                class="mt-3 ml-2"
                name="degree_code"
                label="Degree"
                prepend-icon="edit"
              ></v-select>
              <v-select
                v-model="searchParam.degree_group_code"
                :items="getDegGroup"
                item-text="degree_group_name"
                item-value="degree_group_code"
                class="mt-3 ml-2"
                name="degree_group_code"
                label="Degree Group"
                prepend-icon="edit"
              ></v-select>
              <v-select
                v-model="searchParam.subject_code"
                :items="getDegSubject"
                item-text="subject_name"
                item-value="subject_code"
                class="mt-3 ml-2"
                name="subject_code"
                label="Subject"
                prepend-icon="edit"
              ></v-select>

              <v-flex xs12 sm12 md12 style="margin-top:40px;">
                <v-layout justify-center row fill-height align-center>
                  <v-btn color="primary" large @click="getDataFromApi"
                    >Search</v-btn
                  >
                  <v-btn color="error" large @click="resetInputData"
                    >Reset</v-btn
                  >
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["pagination"],

  data: () => ({
    searchParam: {},
    search: ""
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getSearchData;
    },
    getDegree() {
      return this.$store.getters.getAllDegree;
    },
    getDegGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getDegSubject() {
      return this.$store.getters.getAllSubject;
    },
    getDegSession() {
      return this.$store.getters.getAcSessionData;
    }
  },

  created() {
    this.$store.dispatch("fetchAllDegreeData");
    this.$store.dispatch("fetchAllDegreeGroupData");
    this.$store.dispatch("fetchAllSubjectData");
    this.$store.dispatch("fetchSessionData");
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  methods: {
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.setLimit();
      let item = this.searchParam;
      this.$store.dispatch("fetchCourseList", this.searchParam).then(data => {
        this.loading = false;
        this.totalDataItems = data.meta.total;
        Object.keys(this.searchParam).forEach(function(key, index) {
          item[key] = "";
        });
      });
    },

    resetInputData() {
      let self = this;
      self.$store.dispatch("fetchCourseList", this.searchParam);
    }
  }
};
</script>

<style scoped></style>
