<template>
  <v-container fluid>
    <template>
      <v-layout>
        <v-flex xs12 md12>
          <v-toolbar color="blue" dark>
            <v-toolbar-title class="text-uppercase"
              >Result Correction Application List</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card>
            <v-container>
              <v-data-table
                :disable-initial-sort="true"
                :headers="headers"
                :items="getSchema"
                class="elevation-1"
                :total-items="pagination.totalItems"
                :pagination.sync="pagination"
                :rows-per-page-items="pagination.rowsPerPageItems"
              >
                <template v-slot:items="props" style="white-space: nowrap;">
                  <td align="center">{{ props.index + 1 }}</td>
                  <td align="center">{{ props.item.std_id }}</td>
                  <td align="center">
                    {{ props.item.exam.exam_name }}-{{ props.item.exam_year }}
                  </td>
                  <td align="center">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="default"
                      v-if="props.item.application_status == 0"
                    >
                      Pending
                    </v-chip>
                    <v-chip
                      class="ma-2"
                      color="primary"
                      text-color="white"
                      v-if="props.item.application_status == 1"
                    >
                      Approved By College
                    </v-chip>
                    <v-chip
                      class="ma-2"
                      color="Secondary"
                      text-color="white"
                      v-if="props.item.application_status == 2"
                    >
                      Accept By Admin
                    </v-chip>
                    <v-chip
                      class="ma-2"
                      color="green"
                      text-color="white"
                      v-if="props.item.application_status == 3"
                    >
                      Accept By Admin
                    </v-chip>
                  </td>
                  <td align="center">
                    <!--<v-btn
                      v-if="props.item.application_status == 0"
                      small
                      color="primary"
                      @click="approveApplication(props.item.id)"
                    >
                      Approve
                    </v-btn> -->
                    <v-btn
                      small
                      color="info"
                      @click="showDetails(props.item.id)"
                    >
                      View Details
                    </v-btn>
                  </td>
                  <td>{{ props.item.remarks }}</td>
                </template>
              </v-data-table>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      headers: [
        { text: "SL", align: "center", sortable: false, value: "sl" },
        { text: "Reg no.", align: "center", sortable: false, value: "sl" },
        { text: "Exam", align: "center", sortable: false, value: "sl" },
        {
          text: "Application Status",
          align: "center",
          sortable: false,
          value: "sl"
        },
        { text: "Action", align: "center", sortable: false, value: "sl" },
        { text: "Remarks", align: "center", sortable: false, value: "remarks" }
      ]
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.getResultCorrectionApplicationList;
    }
  },
  created() {
    this.$store.dispatch("getResultCorrectionApplicationList");
  },
  methods: {
    showDetails(id) {
      this.$router.push({ path: `/cu/application-details/${id}` });
    },
    approveApplication(id) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to approve?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("approveApplication", id)
              .then(function(data) {
                self.$store.dispatch("getResultCorrectionApplicationList");
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        });
    }
  }
};
</script>

<style scoped>
table.v-table tbody td,
table.v-table tbody th {
  height: 0px;
  white-space: nowrap;
}
</style>
