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
            <!--
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
                        <v-flex md6>
                            <v-select
                            label="Select Exam"
                            data-vv-name="exam_name"
                            required
                            prepend-icon="subject"
                            ></v-select>
                        </v-flex>
                        <v-flex md3>
                            <v-select
                            label="Select Degree Group"
                            data-vv-name="degree_group_code"
                            required
                            prepend-icon="subject"
                            ></v-select>
                        </v-flex>
                        
                        
                        <v-flex xs12 sm12 md12 style="margin-top:40px;">
                            <v-layout justify-center row fill-height align-center>
                            <v-btn color="primary" large 
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
            </v-container>

            -->

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
                    </v-btn> 
                    <v-btn
                      small
                      color="info"
                      @click="showDetails(props.item.id)"
                    >
                      View Details
                    </v-btn>
                    -->
                    <slot
                      v-for="(paper, index) in props.item.application_details"
                    >
                      {{ paper.course_code }},
                    </slot>
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
        { text: "Papers", align: "center", sortable: false, value: "sl" },
        { text: "Remarks", align: "center", sortable: false, value: "remarks" }
      ]
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.getResultCorrectionApplicationList;
    },
    getAllExmMaster() {
      return this.$store.getters.getAllExmMaster;
    }
  },
  created() {
    this.$store.dispatch("stdCustAppForCollege");
  },
  methods: {
    showDetails(id) {
      this.$router.push({ path: `/cu/application-details/${id}` });
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
