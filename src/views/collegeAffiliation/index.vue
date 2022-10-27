<template>
  <v-container fluid>
    <searchForm :pagination="pagination"></searchForm>
    <br />

    <div>
      <courseDetails
        :dialogStatus.sync="detailsDialogStatus"
        :detailsData="detailsData"
      ></courseDetails>
    </div>
    <v-card color="white">
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
      ></formDialog>
      <v-layout row>
        <v-card flat>
          <v-card-text class="title">Course And Subject List</v-card-text>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>

        <!--<v-text-field
                                v-model="search"
                                prepend-inner-icon="search"
                                label="Search"
                                class="mt-0"
                                hide-details
                                solo
                                flat
                                single-line
        ></v-text-field>-->
        <v-spacer />
        <v-btn color="primary" dark class="mb-2" @click="newItem()"
          >New Item</v-btn
        >
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
        <td class="text-xs-left">
          {{
            props.item.college
              ? `${props.item.college_code}` +
                "-" +
                props.item.college.college_name
              : props.item.college_code
          }}
        </td>
        <td class="text-xs-left">
          {{
            props.item.degree
              ? `(${props.item.degree_code})` +
                " " +
                props.item.degree.degree_name
              : props.item.degree_code
          }}
        </td>
        <td class="text-xs-left">
          {{
            props.item.degree_group
              ? `(${props.item.degree_group_code})` +
                " " +
                props.item.degree_group.degree_group_name
              : props.item.degree_group_code
          }}
        </td>
        <td class="text-xs-left">
          {{
            props.item.course_subject
              ? `(${props.item.course_subject_code})` +
                " " +
                props.item.course_subject.subject_name
              : "N/A"
          }}
        </td>
        <td class="text-xs-left">
          {{
            props.item.ac_session_start ? props.item.ac_session_start : "N/A"
          }}
        </td>
        <td class="text-xs-left">
          {{ props.item.renew_up_to ? props.item.renew_up_to : "N/A" }}
        </td>
        <td class="justify-left layout px-0">
          <v-btn
            v-if="props.item.degree_code == 1"
            color="warning"
            fab
            small
            dark
            @click="showItem(props.item)"
          >
            <v-icon>list</v-icon>
          </v-btn>
          <v-btn color="primary" fab small dark @click="editItem(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <!--<v-btn color="error" fab small dark @click="deleteItem(props.item)">
                                  <v-icon>delete</v-icon>
          </v-btn>-->
        </td>
      </template>
      <template v-slot:no-data></template>
    </v-data-table>
  </v-container>
</template>

<script>
import searchForm from "@/components/collegeAffiliation/customSearch.vue";
import courseDetails from "@/components/collegeAffiliation/courseDetails.vue";
import formDialog from "@/components/collegeAffiliation/courseForm.vue";

export default {
  components: {
    searchForm,
    courseDetails,
    formDialog
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    loading: true,
    searchParam: {},
    search: "",
    dialog: false,

    headers: [
      { text: "College Code & Name", align: "left", value: "college_name" },
      { text: "Degree Code & Name", align: "left", value: "degree_code" },
      {
        text: "Degree Group Code & Name",
        align: "left",
        value: "degree_group_code"
      },
      { text: "Subject Code & Name", align: "left", value: "course_subject" },
      { text: "Session", align: "left", value: "ac_session_start" },
      { text: "Renew", align: "left", value: "renew_up_to" },
      { text: "Actions", align: "left", value: "name", sortable: false }
    ],

    detailsData: "",
    detailsDialogStatus: false,
    formDialogStatus: false,
    editedItem: "",
    editedIndex: -1
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getCourseData;
    }
  },

  /*  created() {
         this.$store.dispatch("fetchCollegeList");
         },*/

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
      this.loading = true;
      this.$store.dispatch("fetchCourseList", this.searchParam).then(data => {
        this.loading = false;
        this.pagination.totalItems = data.meta.total;
      });
    },

    showItem(item) {
      item ? (this.detailsData = item) : "";
      this.$store.dispatch("fetchDegreeSubjectDetails", item).then(data => {
        this.detailsDialogStatus = true;
      });
    },

    unSetEditedData() {
      this.editedItem = {
        id: "",
        college_code: "",
        degree_code: "",
        degree_group_code: "",
        ac_session_start: "",
        renew_up_to: "",
        status: 1
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },

    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
    },

    deleteItem(item) {}
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  margin-left: 5px;
}
</style>
