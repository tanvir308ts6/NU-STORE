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
          <v-toolbar-title>{{
            meetingDetail ? meetingDetail.meeting_name : ""
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-card>
            <v-layout row wrap align-center>
              <v-flex xs12 md6>
                <v-card class="pl-3">
                  <v-card-title class="headline">Agenda</v-card-title>
                  <v-layout row wrap align-center>
                    <v-flex xs12 md12>
                      <blockquote class="blockquote">
                        {{ meetingDetail ? meetingDetail.agenda : "" }}
                      </blockquote>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>

              <v-flex xs12 md6>
                <v-card class="pl-3">
                  <v-card-title class="headline">Decision</v-card-title>
                  <v-layout row wrap align-center>
                    <v-flex xs12 md12>
                      <blockquote class="blockquote">
                        {{ meetingDetail ? meetingDetail.decision : "" }}
                      </blockquote>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
          <v-spacer class="pb-5"></v-spacer>

          <v-card>
            <v-layout row>
              <v-toolbar color="cyan darken-4" class="white--text" dense>
                <v-toolbar-title class="text-uppercase"
                  >Member Present/Attend
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
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
                <slot v-if="props.item.member_details.reg_type == 1">
                  {{ designations(props.item.member_details.designation) }}
                </slot>
                <slot v-if="props.item.member_details.reg_type == 2">
                  {{
                    orgDesignations(
                      props.item.member_details.teacher_designation
                    )
                  }}
                </slot>
              </td>
              <td>
                <slot v-if="props.item.member_details.reg_type == 1">
                  {{
                    props.item.member_details.colleges
                      ? `${props.item.member_details.colleges.college_code}-` +
                        " " +
                        props.item.member_details.colleges.college_name
                      : ""
                  }}
                </slot>
                <slot v-if="props.item.member_details.reg_type == 2">
                  {{ orgName(props.item.member_details.teacher_organization) }}
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
  props: ["dialogStatus", "meetingDetail"],

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
      { text: "Designation", align: "left", value: "designation" },
      { text: "College code & name", align: "left", value: "college_code" },
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
      return this.$store.getters.getSchemaDesignation;
    },
    orgTypeArrData() {
      return this.$store.getters.getSchemaOrgType;
    },
    designationProfArrData() {
      return this.$store.getters.getSchemaProfDesignation;
    },
    orgArrData() {
      return this.$store.getters.getSchemaOrganization;
    }
  },
  methods: {
    designations(item) {
      const result = this.designationArrData.find(({ id }) => id == item);
      return result ? result.name : "";
    },
    orgDesignations(item) {
      const result = this.designationProfArrData.find(({ id }) => id == item);
      return result ? result.name : "";
    },
    orgName(name) {
      const result = this.orgArrData.find(({ id }) => id == name);
      return result ? result.name : "";
    },

    orgType(org) {
      const result = this.orgTypeArrData.find(({ id }) => id == org);
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
      this.searchParam.meeting_id = this.meetingDetail.id;
      this.$store
        .dispatch("fetchEecmMemberDetail", this.searchParam)
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
