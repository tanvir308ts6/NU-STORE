<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
    ></formDialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Division List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
            v-on:keyup.native.enter="getDataFromApi()"
          ></v-text-field>
       
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Add New Division</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="pagination.totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getDivisionListData"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.division_name }}</td>
          <td class="text-xs">{{ props.item.div_code }}</td>
          <td class="text-xs">{{ props.item.old_div_code }}</td>
          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 0"
              >Pending</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status == 1"
              >Received</v-chip
            >
          </td>
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
import formDialog from "@/components/division/divisionForm.vue";

export default {
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Divison Name", value: "division_name" },
        { text: "Divison Code", value: "div_code" },
        { text: "Old Divison Code", value: "old_div_code" },
        { text: "Status", align: "center", value: "status" },
        { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.$store.dispatch("fetchCenLsDistToRegData");
  // },
  mounted() {
    this.getDataFromApi();
  },
  watch: {
    pagination(){
      this.getDataFromApi();
    },
    // pagination: {
    //   handler() {
    //     this.getDataFromApi();
    //   },
    //   deep: true
    // },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    }
  },
  computed: {
    getDivisionListData() {
      return this.$store.getters.getDivisionDataList;
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit.page = page;
      this.limit.limit = rowsPerPage;
      this.limit.sort = sortBy;
      this.limit.search = this.search;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        division_name: "",
        div_code: "",
        old_div_code: "",
        status: 1,
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
    },
    // setLimit() {
    //   const { sortBy, descending, page, rowsPerPage } = this.pagination;
    //   this.limit = {
    //     page: page,
    //     limit: rowsPerPage,
    //     sort: sortBy,
    //     search: this.search
    //   };
    // },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("fetchDivisionData", this.limit).then(data => {
        this.loading = false;
        this.pagination.totalDataItems = data.meta.total;
      });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getDivisionListData.indexOf(item);
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
              .dispatch("deleteDivisionItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchDivisionData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchDivisionData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
