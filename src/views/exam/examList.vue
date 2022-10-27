<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :getDataFromApi.sync="getDataFromApi"
    ></formDialog>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Exam List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
            v-on:keyup.native.enter="getDataFromApi()"
          ></v-text-field>-->
          <v-spacer />
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Add New Exam</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="pagination.totalItems"
        :loading="loading"
        :headers="headers"
        :items="getExamDataList"
        class="elevation-1"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.degree_title }}</td>
          <td class="text-xs">{{ props.item.code }}</td>
          <td class="text-xs">{{ props.item.title }}</td>
          <td class="text-xs">{{ props.item.short_title }}</td>
          <td class="justify-center text-xs-center">
            {{ getCode(props.item.old_code) }}
          </td>
          <td class="text-xs">{{ props.item.duration }}</td>
          <td class="justify-center text-xs-center">
            {{ getStatus(props.item.status) }}
          </td>
          <!-- <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.status == 0">Pending</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.status == 1">Received</v-chip>
          </td>-->
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      @click="editItem(props.item)"
                      class="mr-0"
                      color="white"
                      >edit</v-icon
                    >
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white"
                      >delete</v-icon
                    >
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/exam/examForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      loading: false,
      search: "",
      sl_count: 0,
      searchParam: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      dialog: false,
      formDialogStatus: false,
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Degree", value: "degree_title" },
        { text: "Exam Code", value: "code" },
        { text: "Exam Title", value: "title" },
        { text: "Short Title", value: "short_title" },
        { text: "Old Code", align: "center", value: "old_code" },
        { text: "Duration", value: "duration" },
        { text: "Active", align: "center", value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.$store.dispatch("fetchExamCreateData");
  // },

  mounted() {
    this.$store.commit("UNSET_FORMNOTIFY");
    //this.getDataFromApi();
  },

  computed: {
    getExamDataList() {
      return this.$store.getters.getExamDataList;
    }
  },
  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchExamCreateData", this.searchParam)
        .then(data => {
          // console.log("-->", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    getStatus(status) {
      var status1 = status == 1 ? "Yes" : "No";
      return status1;
    },
    getCode(code) {
      if (code == null) {
        return "X";
      } else {
        return code;
      }
    },

    unSetEditedData() {
      this.editedItem = {
        id: "",
        degree_code: "",
        course_code: "",
        code: "",
        status: 1,
        title: "",
        short_title: "",
        old_code: "",
        duration: "",
        created_at: "",
        updated_at: "",
        deleted_at: ""
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
      this.editedIndex = this.getExamDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteExamCreateItem", id)
              .then(function() {
                self.setLimit();
                self.getDataFromApi();
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.getDataFromApi();
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
