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
                v-model="searchParam.std_id"
                class="mt-3 ml-2"
                name="std_id"
                label="Student ID"
                prepend-icon="edit"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="searchParam.reg_no"
                class="mt-3 ml-2"
                name="reg_no"
                label="Reg. No."
                prepend-icon="edit"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="searchParam.name"
                class="mt-3 ml-2"
                name="name"
                label="Name"
                prepend-icon="edit"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="searchParam.college_code"
                class="mt-3 ml-2"
                name="college_code"
                label="College Code"
                prepend-icon="edit"
                clearable
              ></v-text-field>

              <v-select
                v-model="searchParam.ac_session"
                :items="getDegSession"
                item-text="ac_session"
                item-value="ac_session"
                class="mt-3 ml-2"
                name="rg_no"
                label="Ac. Session"
                prepend-icon="edit"
                clearable
              ></v-select>

              <v-select
                v-model="searchParam.degree_code"
                :items="getDegree"
                :item-text="item => item.degree_code + '-' + item.degree_name"
                item-value="degree_code"
                class="mt-3 ml-2"
                name="degree_code"
                label="Degree"
                prepend-icon="edit"
                @change="getDegreeGroup"
                clearable
              ></v-select>
              <v-select
                v-model="searchParam.degree_group_code"
                :items="getDegGroup"
                :item-text="
                  item => item.degree_group_code + '-' + item.degree_group_name
                "
                item-value="degree_group_code"
                class="mt-3 ml-2"
                name="degree_group_code"
                label="Degree Group"
                prepend-icon="edit"
                @change="getStubject"
                clearable
              ></v-select>
              <v-select
                v-model="searchParam.subject_code"
                :items="getDegSubject"
                :item-text="item => item.subject_code + '-' + item.subject_name"
                item-value="subject_code"
                class="mt-3 ml-2"
                name="subject_code"
                label="Subject"
                prepend-icon="edit"
                clearable
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
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
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
    this.$store.dispatch("fetchAllDegreeData", {
      params: { degree_code: this.getLoggedInExam.degree_code }
    });
    this.$store.dispatch("fetchAllDegreeGroupData", {
      params: {
        degree_code: this.getLoggedInExam.degree_code,
        degree_group_code: this.getLoggedInExam.degree_group_code
      }
    });
    this.$store.dispatch("fetchAllSubjectData", {
      params: {
        degree_code: this.getLoggedInExam.degree_code,
        degree_group_code: this.getLoggedInExam.degree_group_code
      }
    });
    this.$store.dispatch("fetchSessionData");
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  methods: {
    getDegreeGroup(degree_code) {
      if (degree_code) {
        this.$store.dispatch("fetchAllDegreeGroupData", {
          params: {
            degree_code: degree_code,
            degree_group_code: this.getLoggedInExam.degree_group_code
          }
        });
      }
    },
    getStubject(degree_group_code) {
      if (degree_group_code) {
        this.$store.dispatch("fetchAllSubjectData", {
          params: {
            degree_code: this.searchParam.degree_code,
            degree_group_code: degree_group_code
          }
        });
      }
    },
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.searchParam.degree_code = this.getLoggedInExam.degree_code;
      this.searchParam.degree_group_code = this.getLoggedInExam.degree_group_code;
    },

    getDataFromApi() {
      this.setLimit();
      let item = this.searchParam;
      this.$parent.loading = true;
      this.$store
        .dispatch("fetchRegStudentList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.$parent.loading = false;
          this.totalDataItems = data.meta.total;
          this.$parent.pagination.totalItems = data.meta.total;
          this.$parent.searchParam =  this.searchParam;
          // Object.keys(this.searchParam).forEach(function(key, index) {
          //   item[key] = "";
          // });
        });
    },

    resetInputData() {
      let self = this;
      self.searchParam = {};
      self.$store
        .dispatch("fetchRegStudentList", this.searchParam)
        .then(res => {
          this.$parent.pagination.totalItems = res.meta.total;
        });
    }
  }
};
</script>

<style scoped></style>
