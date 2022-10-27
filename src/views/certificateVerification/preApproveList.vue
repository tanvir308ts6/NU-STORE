<template>
  <v-container fluid>
    <div>
      <studentDetails
        :dialogStatus.sync="detailsDialog"
        :detailData="detailData"
      ></studentDetails>

      <v-container fluid>
        <v-layout row>
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
                      <v-select
                        name="subject_code"
                        class="ma-2"
                        v-model="searchParam.organization_id"
                        item-text="name"
                        item-value="id"
                        :items="getOrgSchema"
                        menu-props="auto"
                        label="Select Organization"
                        prepend-icon="edit"
                      ></v-select>
                      <v-text-field
                        name="status"
                        class="ma-2"
                        v-model="searchParam.track_no"
                        menu-props="auto"
                        label="Track No"
                        prepend-icon="edit"
                      ></v-text-field>

                      <v-text-field
                        name="status"
                        class="ma-2"
                        v-model="searchParam.bank_transaction_id"
                        menu-props="auto"
                        label="Bank Tr. ID"
                        prepend-icon="edit"
                      ></v-text-field>

                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="searchCvList">
                            Search
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>

        <v-divider class="mt-3 mb-3"></v-divider>

        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Pre Approved List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
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
              {{ props.item.organization ? props.item.organization.name : "" }}
            </td>
            <td class="text-xs-center text-capitalize">
              {{ props.item.track_no }}
            </td>
            <td class="text-xs-center text-capitalize">
              {{ props.item.bank_transaction_id }}
            </td>
            <td class="text-xs-center">
              {{ props.item.payment_status ? "Paid" : "Unpaid" }}
            </td>
            <td class="text-xs-center text-capitalize">
              {{ props.item.payment_date }}
            </td>
            <td class="text-xs-center text-capitalize">
              {{ props.item.created_at | dateFormat }}
            </td>
            <td class="text-xs-center text-capitalize">
              {{ props.item.verification_status }}
            </td>
            <td class="justify-center layout px-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    dark
                    small
                    color="warning"
                    v-on="on"
                    @click="showDetails(props.item)"
                  >
                    <v-icon dark>list</v-icon>
                  </v-btn>
                </template>
                <span>Details</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import studentDetails from "@/components/service/certificateVerification/StatusPreApproveDetails.vue";

export default {
  components: {
    studentDetails
  },

  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    totalItems: 0,
    searchParam: {},
    search: "",
    loading: true,
    detailsDialog: false,
    detailData: {},

    headers: [
      { text: "Organisation", align: "center", value: "name" },
      { text: "Track No.", align: "center", value: "track_no" },
      { text: "Bank Tr. ID.", align: "center", value: "bank" },
      { text: "Payment Status", align: "center", value: "payment_status" },
      { text: "Payment Date", align: "center", value: "payment_date" },
      { text: "Apply Date", align: "center", value: "created_at" },
      { text: "Status", align: "center", value: "verification_status" },
      { text: "Actions", align: "center", sortable: false }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getSchemaCvList;
    },
    getOrgSchema() {
      return this.$store.getters.getOrganizationList;
    }
  },

  watch: {
    pagination() {
      this.getCvListFromApi();
    }
  },

  created() {
    this.$store.dispatch("fetchOrganizationData");
  },

  methods: {
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getCvListFromApi() {
      this.setLimit();
      this.loading = true;
      this.searchParam.status = "Pre-Approve";
      this.$store
        .dispatch("fetchCertificateVerificationData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    searchCvList() {
      this.loading = true;
      this.setLimit();
      let self = this;
      let item = this.searchParam;
      this.$store
        .dispatch("fetchCertificateVerificationData", item)
        .then(data => {
          self.loading = false;
          self.pagination.totalItems = data.total;
          Object.keys(this.searchParam).forEach(function(key, index) {
            item[key] = "";
          });
        });
    },

    showDetails(item) {
      this.detailData = item;
      this.detailsDialog = true;
    }
  }
};
</script>

<style scoped></style>
