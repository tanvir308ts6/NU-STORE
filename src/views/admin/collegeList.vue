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
                  class="ml-2 mt-3"
                  name="college_code"
                  label="College Code"
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>

                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.div_code"
                  :item-text="
                    item => '(' + item.div_code + ') ' + item.division_name
                  "
                  item-value="div_code"
                  :items="getDivisionList"
                  menu-props="auto"
                  label="Select Division"
                  hide-details
                  name="division"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.div_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" +
                          data.item.div_code +
                          ") " +
                          data.item.division_name
                      }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="
                          '(' +
                            data.item.div_code +
                            ') ' +
                            data.item.division_name
                        "
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="
                            '(' +
                              data.item.div_code +
                              ') ' +
                              data.item.division_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.dist_code"
                  :item-text="
                    item => '(' + item.dist_code + ') ' + item.district_name
                  "
                  item-value="dist_code"
                  :items="getDistrictList"
                  menu-props="auto"
                  label="Select District "
                  hide-details
                  name="division"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.dist_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" +
                          data.item.dist_code +
                          ") " +
                          data.item.district_name
                      }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="
                          '(' +
                            data.item.dist_code +
                            ') ' +
                            data.item.district_name
                        "
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="
                            '(' +
                              data.item.dist_code +
                              ') ' +
                              data.item.district_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchCollegeList"
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
              <template v-slot:badge>{{ getCollegeListItem.length }}</template>
              <v-card-text class="title">College List..</v-card-text>
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
          <v-btn
            @click="searchCollegeList()"
            class="ml-3"
            fab
            small
            flat
            dark
            color="primary"
          >
            <v-icon dark large>search</v-icon>
          </v-btn>
        </v-layout>
      </v-card>

      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getCollegeListItem"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.college_name }}</td>
          <td class="text-xs">{{ props.item.college_code }}</td>
          <td class="text-xs">{{ props.item.eiin }}</td>
          <td class="text-xs">{{ props.item.division_name }}</td>
          <td class="text-xs">{{ props.item.district_name }}</td>
          <td class="text-xs">{{ props.item.upazila_name }}</td>
          <td class="text-xs">{{ props.item.email }}</td>
          <td class="text-xs">{{ props.item.mobile }}</td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10],
      },
      loading: false,
      sl_count: -1,
      search: "",
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "College Name", value: "college_name" },
        { text: "College Code", value: "college_code" },
        { text: "EIIN", value: "eiin" },
        { text: "Division ", value: "division_name" },
        { text: "District ", value: "district_name" },
        { text: "Upazila ", value: "upazila_name" },
        { text: "Email ", value: "email" },
        { text: "Mobile", value: "mobile" },
      ],
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    //all  list
    this.$store.dispatch("fetchCollegeListData");
    //division
    if (!this.$store.getters.getDivisionItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchDivisionData", limit);
    }
    //district
    if (!this.$store.getters.getDistrictItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchDistrictData", limit);
    }
  },
  watch: {
    pagination() {
      this.searchCollegeList();
    },
  },
  computed: {
    //all data
    getCollegeListItem() {
      return this.$store.getters.getCollegeListItem;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchCollegeList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchCollegeListData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
