<template>
  <v-container fluid>
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
                  v-model="searchParam.reg_no"
                  class="mt-3 ml-2"
                  name="rg_no"
                  label="Registration Number"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  v-model="searchParam.admission_roll"
                  class="mt-3 ml-2"
                  name="admission_roll"
                  label="Admission Roll"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  v-model="searchParam.name"
                  class="mt-3 ml-2"
                  name="name"
                  label="Name"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  v-model="searchParam.session_year"
                  class="mt-3 ml-2"
                  name="session_year"
                  label="Session Year"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  v-model="searchParam.college_code"
                  class="mt-3 ml-2"
                  name="college_code"
                  label="College Code"
                  prepend-icon="edit"
                ></v-text-field>
                <v-autocomplete
                  class="ma-2"
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.degree_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getDegreeList"
                  menu-props="auto"
                  label="Select Degree"
                  hide-details
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.degree_code = ''"
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-select
                  class="ma-2"
                  label="Select Gender"
                  item-text="name"
                  item-value="name"
                  v-model="searchParam.gender"
                  :items="getGender"
                  prepend-icon="edit"
                ></v-select>
                <v-select
                  class="ma-2"
                  label="Select Student Type"
                  item-text="name"
                  item-value="name"
                  v-model="searchParam.student_type"
                  :items="getStudentType"
                  prepend-icon="edit"
                ></v-select>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="registrationList"
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
    <v-divider class="mt-5 mb-3"></v-divider>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>{{
                getRegistrationListItem.length
              }}</template>
              <v-card-text class="title">Registration List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>
        </v-layout>
      </v-card>

      <v-data-table
        :headers="headers"
        :items="getRegistrationListItem"
        :search="search"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.name }}</td>
          <td class="text-xs">{{ props.item.session_year }}</td>
          <td class="text-xs">{{ props.item.email }}</td>
          <td class="text-xs">{{ props.item.mobile }}</td>
          <td class="text-xs">{{ props.item.gender }}</td>
          <td class="text-xs">{{ props.item.college_name }}</td>
          <td class="text-xs">{{ props.item.center_name }}</td>
          <td class="text-xs">{{ props.item.merit_position }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
export default {
  mixins: [commonGet],
  data() {
    return {
      details: [],
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      sl_count: 1,
      getGender: [
        { name: "Female", value: "1" },
        { name: "Male", value: "2" }
      ],
      getStudentType: [
        { name: "1", value: "1" },
        { name: "2", value: "2" }
      ],
      search: "",
      searchParam: {},

      headers: [
        { text: "SL.", sortable: true, value: "id" },
        { text: "Registration No.", value: "reg_no" },
        { text: "Name", value: "name" },
        { text: "Session Year", value: "session_year" },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "mobile" },
        { text: "Gender", value: "gender" },
        { text: "College Name", value: "college_name" },
        { text: "Center", value: "center_name" },
        { text: "Merit Position", value: "merit_position" }
      ]
    };
  },
  created() {
    //all  list
    this.$store.dispatch("fetchRegistrationListData");
    //degree
    if (!this.$store.getters.getDegreeItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchDegreeData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
  },
  computed: {
    //all data
    getRegistrationListItem() {
      return this.$store.getters.getRegistrationListItem;
    },
    getDegreeList() {
      return this.$store.getters.getDegreeItems;
    },
    //subject
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    registrationList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRegistrationList", this.searchParam)
        .then(data => {
          // console.log("data---", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    // registrationList() {
    //   let customSearchParam = this.searchParam;
    //   this.$store
    //     .dispatch("searchRegistrationList", customSearchParam)
    //     .then(() => {
    //       //
    //     });
    // },
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    }
  }
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
