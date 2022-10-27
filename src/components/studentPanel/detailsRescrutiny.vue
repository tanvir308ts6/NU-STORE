<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            Re-scrutiny For [ ({{
              studentData && studentData.exam_master.exam_code
                ? studentData.exam_master.exam_code
                : ""
            }})
            {{
              studentData && studentData.exam_master.exam_name
                ? studentData.exam_master.exam_name
                : ""
            }}
            -
            {{
              studentData && studentData.exam_master.exam_year
                ? studentData.exam_master.exam_year
                : ""
            }}
            ]
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-card color="white">
              <v-layout row>
                <v-card flat>
                  <v-card-text class="title">
                    Re-scrutiny Details
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-card>

            <v-data-table
              :headers="headers"
              :items="getSchema"
              class="elevation-1"
              :total-items="pagination.totalItems"
              :pagination.sync="pagination"
              :loading="loading"
              :rows-per-page-items="pagination.rowsPerPageItems"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">
                  {{
                    `(${props.item.papers.paper_code})` +
                      " " +
                      props.item.papers.paper_name
                  }}
                </td>
                <td class="text-xs-center">
                  {{
                    props.item.papers.paper_types
                      ? props.item.papers.paper_types.paper_type
                      : ""
                  }}
                </td>
                <td class="text-xs-center">{{ props.item.old_gpa }}</td>
                <!--                                <td class="text-xs-center">{{props.item.letter_grade}}</td>-->
                <td class="text-xs-center">{{ props.item.old_mark }}</td>
                <td class="text-xs-center">{{ props.item.payment_amount }}</td>
              </template>

              <template v-slot:footer>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-xs-right">Total</td>
                  <td class="text-xs-center">{{ totalPaperFee }}</td>
                </tr>
                <tr>
                  <td :colspan="headers.length + 1">
                    <div class="text-xs-center">
                      <v-btn
                        round
                        color="primary"
                        dark
                        @click="downloadResCrutinyPaySleep()"
                        >Rescrutiny PaySleep
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-slot:no-data> </template>
            </v-data-table>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["dialogStatus", "studentData"],
  data: () => ({
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
        align: "center",
        sortable: false,
        value: "paper_code"
      },
      {
        text: "Paper Type",
        align: "center",
        sortable: false,
        value: "paper_type"
      },
      { text: "CGPA", align: "center", sortable: false, value: "cgpa" },
      {
        text: "Grade",
        align: "center",
        sortable: false,
        value: "letter_grade"
      },
      { text: "Paper Fee", align: "center", sortable: false, value: "" }
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

    downloadResCrutinyPaySleep() {},

    close() {
      this.$emit("update:dialogStatus", false);
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    },

    dialogStatus(val) {
      this.dialog = val;
    },

    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped></style>
