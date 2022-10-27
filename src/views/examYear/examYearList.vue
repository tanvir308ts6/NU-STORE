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
            <v-card-text class="title">Exam Year List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Add Year</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getYearList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.year }}</td>
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
import formDialog from "@/components/examYear/examYearForm.vue";

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
        { text: "SL.", align: "left", value: "id" },
        { text: "Year Name", value: "year" },
        { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.getDataFromApi();
  // },
  // mounted() {
  //   this.getDataFromApi();
  // },
  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },
  computed: {
    getYearList() {
      return this.$store.getters.getYearDataList;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        year: "",
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
    },
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
      this.$store.dispatch("fetchYearData", this.searchParam).then(data => {
        this.loading = false;
        console.log("data.meta", data[0]);
        console.log("data", data);
        this.sl_count = data[0].meta.from;
        this.pagination.totalItems = data[0].meta.total;
      });
    },
    // getDataFromApi() {
    //   this.loading = true;
    //   this.setLimit();
    //   this.$store.dispatch("fetchYearData", this.limit).then(data => {
    //     this.loading = false;
    //     this.sl_count = data.meta.from;
    //     this.pagination.totalItems = data.meta.total;
    //   });
    // },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getYearList.indexOf(item);
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
              .dispatch("deleteYearItem", id)
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
