<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <searchPanel :pagination="pagination"></searchPanel>
        <br />
        <studentDetails
          :dialogStatus.sync="detailDialog"
          :studentData="studentDetail"
        ></studentDetails>
        <v-card color="white">
          <v-layout row>
            <!-- <v-card flat>
              <v-card-text class="title">Registered Student List</v-card-text>
            </v-card> -->
            <!-- <v-divider class="my-2" vertical></v-divider>
            <v-text-field
              v-model="search"
              prepend-inner-icon="search"
              label="Search"
              class="mt-0"
              hide-details
              solo
              flat
              single-line
            ></v-text-field> -->
            <!-- <v-spacer /> -->
            <!--<v-btn color="primary" dark class="mb-2" @click=""
                        >New Item
                        </v-btn
            >-->
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  small
                  style="margin-top: -0.8em"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}
                </v-btn>
              </template>
              <v-card-text class="title">Registered Student List</v-card-text>
            </v-badge>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <!-- <v-btn small fab @click="refresh()">
              <v-icon>refresh</v-icon>
            </v-btn> -->
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="[10, 50, 100, 500]"
        >
          <template v-slot:items="props">
            <td class="text-left">
              <v-img
                v-if="props.item.photo_url"
                :src="props.item.photo_url"
                width="32px"
                height="auto"
              ></v-img>
            </td>
            <td class="text-xs-left">
              {{
                props.item.subject
                  ? `${props.item.subject.subject_code}-${props.item.subject.subject_name}`
                  : props.item.subject_code
              }}
            </td>
            <td class="text-xs-left">{{ props.item.reg_no }}</td>
            <td class="text-xs-left">{{ props.item.ac_session }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">
              {{
                props.item.college
                  ? `${props.item.college.college_code}-${props.item.college.college_name}`
                  : ""
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.degree
                  ? `${props.item.degree.degree_code}-${props.item.degree.degree_name}`
                  : ""
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.degree_group
                  ? `${props.item.degree_group.degree_group_code}-${props.item.degree_group.degree_group_name}`
                  : ""
              }}
            </td>
            <td class="text-xs-left">
              {{
                props.item.student_types
                  ? props.item.student_types.student_type
                  : "N/A"
              }}
            </td>
            <td class="justify-left">
              <v-btn
                fab
                dark
                small
                color="warning"
                @click="showStudentDetails(props.item)"
              >
                <v-icon dark>list</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data></template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import searchPanel from "@/components/registration/regStudentSearch.vue";
import studentDetails from "@/components/registration/regStudentDetails.vue";

export default {
  components: {
    searchPanel,
    studentDetails
  },

  data: () => ({
    detailDialog: false,
    studentDetail: "",
    pagination: {
      rowsPerPage: 10
    },
    loading: false,
    searchParam: {},
    search: "",

    headers: [
      { text: "Image", align: "center", value: "photo_url" },
      { text: "Subject", align: "center", value: "subject_code" },
      { text: "Reg No", align: "center", value: "reg_no" },
      { text: "Session", align: "center", value: "ac_session" },
      { text: "Name", align: "center", value: "name" },
      { text: "College", align: "center", value: "college_code" },
      { text: "Degree", align: "center", value: "degree" },
      { text: "Degree Group", align: "center", value: "degree_group_name" },
      { text: "Reg Type", align: "center", value: "degree" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRegStudentData;
    }
  },

  created() {
    // this.$store.dispatch("fetchRegStudentList");
  },

  watch: {
    pagination() {
      this.getDataFromApi();
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
      // this.loading = true;
      // this.$store
      //   .dispatch("fetchRegStudentList", this.searchParam)
      //   .then(data => {
      //     // console.log("data.meta.total", data);
      //     this.loading = false;
      //     this.pagination.totalItems = data.meta.total;
      //   });
    },
    getStatus(status) {
      var statusText = status == 1 ? "Yes" : "No";
      return statusText;
    },

    showStudentDetails(item) {
      this.studentDetail = item;
      this.detailDialog = true;
    }
  }
};
</script>

<style scoped>
td {
  white-space: nowrap;
}
</style>
