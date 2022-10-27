<template>
  <v-container fluid>
    <!-- <pre>getLoggedInExam:{{ getLoggedInExam }}</pre> -->
    <!-- <pre>{{ searchParam }}</pre> -->
    <!-- <pre>{{ getSubjectData.length }}</pre> -->
    <!-- <pre>{{ getSubjectData }}</pre> -->
    <!-- <pre>{{ getExamItem }}</pre> -->
    <!-- <pre>{{ getAllDegreeGroup }}</pre> -->
    <div>
      <formDialog :dialogStatus.sync="formDialogStatus"></formDialog>
      <editFormDialog
        :dialogStatus.sync="editFormDialogStatus"
        :editedData="editedItem"
      ></editFormDialog>
      <detailDialog
        :dialogStatus.sync="detailDialogStatus"
        :detailData="detailItem"
      ></detailDialog>
    </div>

    <div>
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
                      <v-text-field
                        name="index_no"
                        class="ma-2"
                        v-model="searchParam.index_no"
                        menu-props="auto"
                        label="Index No"
                        prepend-icon="edit"
                        clearable
                      ></v-text-field>
                      <v-text-field
                        name="status"
                        class="ma-2"
                        v-model="searchParam.name"
                        menu-props="auto"
                        label="Name"
                        prepend-icon="edit"
                        clearable
                      ></v-text-field>
                      <v-select
                        v-model="searchParam.designation"
                        :items="designationArrData"
                        item-text="name"
                        item-value="id"
                        label="Select Designation"
                        clearable
                      ></v-select>
                      <v-text-field
                        name="email"
                        class="ma-2"
                        v-model="searchParam.email"
                        menu-props="auto"
                        label="Email"
                        prepend-icon="edit"
                        clearable
                      ></v-text-field>
                      <v-text-field
                        name="mobile"
                        class="ma-2"
                        v-model="searchParam.mobile"
                        menu-props="auto"
                        label="Mobile"
                        prepend-icon="edit"
                        clearable
                      ></v-text-field>
                      <v-select
                        v-model="searchParam.organization_type"
                        :items="orgTypeArrData"
                        item-text="name"
                        item-value="id"
                        label="Organization Type"
                        clearable
                      ></v-select>

                      <v-select
                        v-model="searchParam.college_code"
                        label="Select College"
                        data-vv-name="college_code"
                        item-text="college_name"
                        item-value="college_code"
                        :items="getCollegeData"
                        required
                        clearable
                      ></v-select>
                      <v-select
                        name="degree_group_code"
                        class="ma-2"
                        v-model="searchParam.degree_group_code"
                        :item-text="
                          item =>
                            item.degree_group_code +
                            '-' +
                            item.degree_group_name
                        "
                        item-value="degree_group_code"
                        :items="getAllDegreeGroup"
                        menu-props="auto"
                        label="Select Degree Group"
                        prepend-icon="edit"
                        @change="fetchAllSubjectData"
                      ></v-select>
                      <v-select
                        v-if="
                          searchParam.degree_group_code &&
                            Object.keys(getSubjectData).length != 0 &&
                            getLoggedInExam.degree_code != 1
                        "
                        name="subject_code"
                        class="ma-2"
                        v-model="searchParam.subject_code"
                        item-text="subject_name"
                        item-value="subject_code"
                        :items="getSubjectData"
                        menu-props="auto"
                        label="Select Subject"
                        prepend-icon="edit"
                        clearable
                      ></v-select>

                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="searchMember">
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
              <v-card-text class="title">Member List</v-card-text>
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
            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Member
            </v-btn>
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
            <td>{{ props.item.index_no }}</td>
            <td>{{ props.item.name }}</td>
            <td>
              <slot v-if="props.item.reg_type == 1">
                {{ designations(props.item.designation) }}
              </slot>
              <slot v-if="props.item.reg_type == 2">
                {{ orgDesignations(props.item.teacher_designation) }}
              </slot>
            </td>
            <td>
              <slot v-if="props.item.reg_type == 1">
                {{
                  props.item.colleges
                    ? `${props.item.colleges.college_code}-` +
                      " " +
                      props.item.colleges.college_name
                    : ""
                }}
              </slot>
              <slot v-if="props.item.reg_type == 2">
                {{ orgName(props.item.teacher_organization) }}
              </slot>
            </td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.mobile }}</td>
            <td>
              {{ orgType(props.item.organization_type) }}
            </td>
            <td class="justify-center layout px-0">
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="editItem(props.item)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="warning"
                @click="showDetails(props.item)"
              >
                <v-icon dark>list</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/exmCommittee/member/addMember.vue";
import editFormDialog from "@/components/exmCommittee/member/editMember.vue";
import detailDialog from "@/components/exmCommittee/member/detailInfo.vue";

export default {
  components: {
    formDialog,
    editFormDialog,
    detailDialog
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    search: "",
    formDialogStatus: false,
    editFormDialogStatus: false,

    headers: [
      { text: "Index No.", align: "left", value: "index_no" },
      { text: "Name", align: "left", value: "name" },
      { text: "Designation", align: "left", value: "designation" },
      { text: "Institute", align: "left", value: "college_code" },
      { text: "Email", align: "left", value: "email" },
      { text: "Mobile", align: "left", value: "mobile" },
      { text: "Organization", align: "left", value: "organization_type" },
      { text: "Actions", align: "left", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      father_name: "",
      gender: "",
      date_of_birth: "",
      nid_no: "",
      joining_date: "",
      organization_type: "",
      jod_present_deg: "",
      designation: "",
      subject_code: "",
      index_no: "",
      photo: "",
      signature: "",

      division_id: "",
      district_id: "",
      thana_id: "",
      college_code: "",

      teacher_organization: "",
      teacher_designation: "",

      present_address: "",
      permanent_address: "",
      email: "",
      mobile: "",
      phone: "",
      office_phone: "",
      reg_type: "",
      username: "",
      password: ""
    },

    detailItem: "",
    detailDialogStatus: false
  }),

  computed: {
    getExamItem() {
      return this.$store.getters.getExamItem;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getAllDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getSchema() {
      return this.$store.getters.getSchemaList;
    },
    getSubjectData() {
      return this.$store.getters.getAllSubject;
    },
    getCollegeData() {
      return this.$store.getters.getAllCollege;
    },
    orgTypeArrData() {
      return this.$store.getters.getSchemaOrgType;
    },
    designationArrData() {
      return this.$store.getters.getSchemaDesignation;
    },
    designationProfArrData() {
      return this.$store.getters.getSchemaProfDesignation;
    },
    orgArrData() {
      return this.$store.getters.getSchemaOrganization;
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  methods: {
    fetchAllSubjectData(val) {
      this.$store.dispatch("fetchAllSubjectData", {
        params: {
          degree_code: this.getLoggedInExam.degree_code,
          degree_group_code: val
        }
      });
    },
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

    newItem() {
      this.formDialogStatus = true;
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.searchParam.exam_code = this.getLoggedInExam.code;
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchExmCommitteeMemberList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    searchMember() {
      this.loading = true;
      this.setLimit();
      let self = this;
      let item = this.searchParam;
      this.$store.dispatch("fetchExmCommitteeMemberList", item).then(data => {
        self.loading = false;
        self.pagination.totalItems = data.total;
        /*Object.keys(this.searchParam).forEach(function (key, index) {
                         item[key] = '';
                         });*/
      });
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editFormDialogStatus = true;
    },
    showDetails(item) {
      this.detailItem = Object.assign({}, item);
      this.detailDialogStatus = true;
    },
    setLoggedInExam() {
      this.getExamItem.forEach(exam => {
        if (exam.code == this.getLoggedInExam.code) {
          this.$store.commit("SET_LOGGEDIN_EXAM", exam);
        }
      });
    }
  },

  created() {},
  mounted() {
    this.setLoggedInExam();
    this.$store.dispatch("fetchAllSubjectData", {
      params: {
        degree_code: this.getLoggedInExam.degree_code,
        degree_group_code: this.getLoggedInExam.degree_group_code
      }
    });
    this.$store.dispatch("fetchAllCollegeData");
    this.$store.dispatch("fetchExamWiseDegreeGroup", this.getLoggedInExam.code);
  }
};
</script>

<style scoped></style>
