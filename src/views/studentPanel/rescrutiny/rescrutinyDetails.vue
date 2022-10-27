<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 md12>
        <v-toolbar color="blue-grey darken-3" dark>
          <v-toolbar-title>Applied Paper List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card>
          <v-data-table
            :headers="headers"
            :items="getSchema"
            class="elevation-1"
            :total-items="pagination.totalItems"
            :pagination.sync="pagination"
            :loading="loading"
            :rows-per-page-items="pagination.rowsPerPageItems"
            hide-actions
          >
            <template v-slot:items="props">
              <td class="text-xs-left">
                {{
                  `(${props.item.papers.paper_code})` +
                    " " +
                    props.item.papers.paper_name
                }}
              </td>
              <td class="text-xs-left">
                {{
                  props.item.papers.paper_types
                    ? props.item.papers.paper_types.paper_type
                    : ""
                }}
              </td>
              <td class="text-xs-left">{{ props.item.old_gpa | toFixed }}</td>
              <!--                                <td class="text-xs-left">{{props.item.letter_grade}}</td>-->
              <!-- <td class="text-xs-left">{{ props.item.old_mark }}</td> -->
              <td class="text-xs-right">
                {{ props.item.payment_amount | toFixed }}
              </td>
            </template>
            <template v-slot:no-data> </template>
          </v-data-table>
        </v-card>
        <v-toolbar color="blue-grey darken-3" dark>
          <v-toolbar-title>Rescrutiny Fee (University)</v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="text-md-left">Total = {{ totalPaperFee | toFixed }}</div>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    result:null,
    dialog: false,
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10]
    },
    loading: true,
    searchParam: {},
    search: "",

    headers: [
      {
        text: "Paper Code & Name",
        align: "left",
        sortable: false,
        value: "paper_code"
      },
      {
        text: "Paper Type",
        align: "left",
        sortable: false,
        value: "paper_type"
      },
      // { text: "CGPA", align: "left", sortable: false, value: "cgpa" },
      { text: "CGPA", align: "left", sortable: false, value: "old_gpa" },
      { text: "Re-scrutiny Fee", align: "right", sortable: false, value: "" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRescrunityDetailList;
    },

    totalPaperFee() {
      let total = 0;
      this.getSchema.forEach(function(data) {
        total += parseInt(data.payment_amount);
      });
      return total ? total : 0;
    }
  },
  created() {},

  methods: {
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.searchParam.exam_code = this.$route.query.exam_code;
      this.searchParam.exam_year = this.$route.query.exam_year;
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchRescrunityDetailsList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    downloadResCrutinyPaySleep() {}
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },
  mounted() {
    // this.result=this.$route.query
  },
};
</script>

<style scoped></style>
