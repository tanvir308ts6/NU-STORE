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
                  :item-text="item => '(' + item.code + ') ' + item.title"
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
                <v-text-field
                  class="ma-2"
                  name="college_code"
                  label="College Code"
                  hide-details
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchAmanuensis"
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
              <v-card-text class="title">Amanuensis List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-btn
            @click="searchAmanuensis()"
            class="ml-3"
            fab
            small
            flat
            dark
            color="primary"
          >
            <v-icon dark large>search</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            label="Search"
            class="mt-1"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>

          <v-spacer />
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getAmanuensisList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.name }}</td>
          <td class="text-xs">{{ props.item.address }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">
            ({{ props.item.college_code }}){{ props.item.college_name }}
          </td>
          <td class="text-xs">
            ({{ props.item.exam_code }}) {{ props.item.exam_name }}
          </td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">{{ props.item.session }}</td>
          <td class="text-xs">{{ props.item.type }}</td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 0"
              >Inactive</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status == 1"
              >Active</v-chip
            >
          </td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      @click="approveItem(props.item)"
                      class="mr-0"
                      color="white"
                      >memory</v-icon
                    >
                  </v-btn>
                </template>
                <span>Approve</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
      <!-- <v-flex xs12 mt-4>
        <v-layout align-center justify-center row fill-height>
          <v-btn large round color="primary" @click="submit">
            Submit
            <v-icon right dark>send</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>-->
    </v-container>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  data() {
    return {
      loading: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: " Name", value: "name" },
        { text: "Address", value: "address" },
        { text: "Registration No.", value: "reg_no" },
        { text: "College", value: "college_code" },
        { text: "Exam", value: "exam_code" },
        { text: "Year", value: "year" },
        { text: "Session", value: "session" },
        { text: "Type", value: "type" },
        { text: "Status", align: "center", value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      }
    };
  },
  watch: {
    pagination() {
      this.searchAmanuensis();
    }
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.$store.dispatch("fetchAmanuensisData");
  },
  computed: {
    getAmanuensisList() {
      return this.$store.getters.getAmanuensisList;
    },
    getSchema() {
      return this.$store.getters.getAmanuensisSchema;
    }
  },
  methods: {
    approveItem() {
      this.getSchema.status = "1";
    },
    // submit() {
    //   this.$store
    //     .dispatch("saveAmanuensisData", this.getAmanuensisList)
    //     .then(data => {
    //       this.searchAmanuensis();
    //     });
    //   console.log("try", this.getAmanuensisList);
    // },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchAmanuensis() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAmanuensisData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    }
  }
};
</script>

<style scoped></style>
