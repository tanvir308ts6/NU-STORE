<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Exam Committee Member</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Member List</v-card-text>
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
            style="white-space: nowrap"
          >
            <template v-slot:items="props">
              <td>
                {{
                  props.item.member_details
                    ? props.item.member_details.index_no
                    : ""
                }}
              </td>
              <td>
                {{
                  props.item.member_details
                    ? props.item.member_details.name
                    : ""
                }}
              </td>
              <td>
                {{
                  props.item.member_designation
                    ? designations(props.item.member_designation)
                    : ""
                }}
              </td>
              <td>
                <slot v-if="props.item.member_details.teacher_organization">
                  {{ orgName(props.item.member_details.teacher_organization) }}
                </slot>
                <slot v-else>
                  {{
                    props.item.member_details.colleges
                      ? `${props.item.member_details.colleges.college_code}-` +
                        " " +
                        props.item.member_details.colleges.college_name
                      : ""
                  }}
                </slot>
              </td>
              <td>
                {{
                  props.item.member_details
                    ? props.item.member_details.email
                    : ""
                }}
              </td>
              <td>
                {{
                  props.item.member_details
                    ? props.item.member_details.mobile
                    : ""
                }}
              </td>
              <td>
                {{
                  props.item.member_details
                    ? orgType(props.item.member_details.organization_type)
                    : ""
                }}
              </td>
            </template>
            <template v-slot:no-data> </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  props: ["dialogStatus", "examCommittee"],

  data: () => ({
    dialog: false,
    pagination: {
      rowsPerPage: 5,
      rowsPerPageItems: [5]
    },
    loading: true,
    searchParam: {},
    search: "",

    headers: [
      { text: "Index No.", align: "left", value: "index_no" },
      { text: "Name", align: "left", value: "name" },
      { text: "Committe Role", align: "left", value: "member_designation" },
      { text: "Institute", align: "left", value: "college_code" },
      { text: "Email", align: "left", value: "email" },
      { text: "Mobile", align: "left", value: "mobile" },
      { text: "Organization", align: "left", value: "organization_type" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getExmCommitteeMemberList;
    },
    designationArrData() {
      return this.$store.getters.getSchemaProfDesignation;
    },
    orgTypeArrData() {
      return this.$store.getters.getSchemaOrgType;
    },
    orgArrData() {
      return this.$store.getters.getSchemaOrganization;
    },
    getCommiteeRoles() {
      return this.$store.getters.getCommiteeRoles;
    }
  },
  methods: {
    designations(item) {
      const result = this.getCommiteeRoles.find(({ id }) => id == item);
      return result ? result.name : "";
    },

    orgType(org) {
      const result = this.orgTypeArrData.find(({ id }) => id == org);
      return result ? result.name : "";
    },
    orgName(name) {
      const result = this.orgArrData.find(({ id }) => id == name);
      return result ? result.name : "";
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.setLimit();
      this.searchParam.committee_id = this.examCommittee.id;
      this.$store
        .dispatch("fetchExamCommitteeMember", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;

      if (this.dialog) {
        this.getDataFromApi();
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped></style>
