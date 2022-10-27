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
          <v-toolbar-title class="text-uppercase">
            Certificate Verification For -
            {{
              detailData
                ? detailData.organization
                  ? detailData.organization.name
                  : ""
                : ""
            }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-toolbar color="cyan darken-4" class="white--text" dense>
            <v-toolbar-title class="text-uppercase"
              >Details Information</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>

          <table class="detail-info">
            <tr>
              <th style="width: 8%">Track No.</th>
              <td>{{ detailData ? detailData.track_no : "" }}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td class="text-capitalize">
                {{ detailData ? detailData.verification_status : "" }}
              </td>
            </tr>
            <tr>
              <th>Remarks</th>
              <td>{{ detailData ? detailData.remarks : "" }}</td>
            </tr>
          </table>

          <v-spacer class="pb-5"></v-spacer>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Student List</v-card-text>
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
            item-key="id"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :expand="expand"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.reg_no }}</td>
              <td class="text-xs-center">{{ props.item.ac_session }}</td>
              <td class="text-xs-center">{{ props.item.exam_roll_no }}</td>

              <td class="text-xs-center">
                {{ props.item.student ? props.item.student.name : "" }}
              </td>

              <td class="text-xs-center">
                {{
                  props.item.degree ? props.item.degree.degree_display_name : ""
                }}
              </td>
              <td class="text-xs-center">
                {{ props.item.exams ? props.item.exams.exam_display_name : "" }}
              </td>

              <td class="justify-center layout px-0">
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  @click="props.expanded = !props.expanded"
                >
                  <v-icon dark>assignment_returned</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:expand="props">
              <v-card flat>
                <v-card-text>
                  <table class="attach">
                    <caption>
                      Attachment Details
                    </caption>
                    <tr>
                      <th>Attachment Name</th>
                      <th>Download</th>
                    </tr>
                    <template v-for="data in props.item.attachment">
                      <tr>
                        <td>{{ data.attachment_name }}</td>
                        <td>
                          <v-btn
                            dark
                            color="purple"
                            :href="data.attachment_path"
                            target="_blank"
                          >
                            <v-icon dark>cloud_download</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </table>
                </v-card-text>
              </v-card>
            </template>
            <template v-slot:no-data></template>
          </v-data-table>

          <div v-if="requestLogData.length > 0">
            <v-spacer class="pb-4"></v-spacer>

            <v-toolbar color="cyan darken-4" class="white--text" dense>
              <v-toolbar-title class="text-uppercase"
                >Request & Status Details</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>

            <table class="detail-info">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
              <template v-for="data in requestLogData">
                <tr>
                  <td>{{ data.user_name }}</td>
                  <td>{{ data.user_email }}</td>
                  <td>{{ data.remarks }}</td>
                  <td class="text-capitalize">
                    {{
                      data.verification_status === "send"
                        ? "Send Back"
                        : data.verification_status
                    }}
                  </td>
                  <td>{{ data.created_at | dateFormat }}</td>
                </tr>
              </template>
            </table>
          </div>

          <v-spacer class="pb-4"></v-spacer>

          <v-card>
            <v-layout row wrap align-center>
              <v-flex xs12 sm12 offset-sm0>
                <v-card class="pl-3">
                  <v-card-title class="headline">Other Details</v-card-title>
                  <v-layout row wrap align-center>
                    <v-flex xs12 md4 lg6>
                      <v-textarea
                        name="remarks"
                        label="Remarks"
                        v-model="formData.remarks"
                        auto-grow
                        rows="2"
                        prepend-icon="edit"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12 md4 lg6>
                      <v-select
                        class="ml-2 mr-2"
                        name="status"
                        label="Select Status"
                        v-validate="'required'"
                        :error-messages="errors.collect('status')"
                        :items="statusArr"
                        item-text="name"
                        item-value="id"
                        data-vv-name="status"
                        v-model="formData.status"
                        required
                        prepend-icon="edit"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-spacer class="pb-4"></v-spacer>

                  <v-card-actions>
                    <div class="justify-center layout px-0 mt-2">
                      <v-btn color="primary" dark @click="submit">Submit</v-btn>
                    </div>
                  </v-card-actions>
                  <v-spacer class="pb-4"></v-spacer>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import common_login_getters from "@/mixin/common_login_getters";

Vue.use(VeeValidate);

export default {
  mixins: [common_login_getters],
  props: ["dialogStatus", "detailData"],

  data: () => ({
    dialog: false,
    pagination: {
      rowsPerPage: 5,
      rowsPerPageItems: [5]
    },
    expand: false,
    loading: true,
    searchParam: {},
    formData: {},
    search: "",

    headers: [
      { text: "Reg. No.", align: "center", value: "reg_no" },
      { text: "Ac. Session", align: "center", value: "ac_session" },
      { text: "Exam Roll", align: "center", value: "exam_roll" },
      { text: "Name", align: "center", value: "name" },
      { text: "Course", align: "center", value: "degree_code" },
      { text: "Exam Code & Name", align: "center", value: "exam_code" },
      { text: "Attachment", align: "center", sortable: false }
    ],

    statusArr: [
      { id: "approved", name: "Approved" },
      { id: "cancel", name: "Cancel" },
      { id: "send", name: "Send Back" }
    ],

    requestLogData: []
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getSchemaCvStudentList;
    }
  },

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
      this.searchParam.org_id = this.detailData.organization_id;
      this.searchParam.verification_id = this.detailData.id;
      this.$store
        .dispatch("fetchCvStudentData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
          this.requestLogData = data.log;
        });
    },

    submit() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let self = this;
          let item = this.formData;
          this.searchParam.status = "Pre-Approve";

          const fd = {
            id: this.detailData.id,
            org_id: this.detailData.organization_id,
            track_no: this.detailData.track_no,
            user: this.getAuthUser ? JSON.stringify(this.getAuthUser) : "",
            status: this.formData.status,
            remarks: this.formData.remarks
          };

          this.$store
            .dispatch("updateStatusCv", fd)
            .then(function(data) {
              try {
                self.close();
                self.$store.dispatch(
                  "fetchCertificateVerificationData",
                  self.searchParam
                );
                self.$validator.reset();
                Object.keys(item).forEach(function(key, index) {
                  item[key] = "";
                });
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function(error) {
              console.log(error);
              self.$store.dispatch(
                "fetchCertificateVerificationData",
                self.searchParam
              );
            });
        }
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
      if (val) {
        this.getDataFromApi();
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped>
.attach {
  border-collapse: collapse;
  width: 50%;
  margin: 0 auto;
}

.attach th,
.attach td {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

caption {
  display: table-caption;
  text-align: center;
  font-weight: bold;
}

table.detail-info {
  border-collapse: collapse;
  width: 100%;
}

.detail-info th,
.detail-info td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
