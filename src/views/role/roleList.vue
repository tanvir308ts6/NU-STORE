<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
      :getDataFromApi.sync="getDataFromApi"
    ></formDialog>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Role List</v-card-text>
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
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>New Role</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getRoleItem"
        class="elevation-1"
        :total-items="pagination.totalDataItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.role_name }}</td>
          <td class="text-xs">{{ props.item.description }}</td>

          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 0"
              >Inactive</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status == 1"
              >Active</v-chip
            >
          </td>

          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip top>
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
import formDialog from "@/components/role/roleForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      snackbar: false,
      multiLine: true,
      dialog: false,
      loadData: false,
      sl_count: 0,
      formDialogStatus: false,
      totalDataItems: 0,
      loading: true,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Role Name", value: "role_name" },
        { text: "Description", value: "description" },
        { text: "Status", align: "center", value: "active" },

        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      searchParam: {},
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },
  // created() {
  //   this.$store.dispatch("callRoleData");
  // },
  // mounted() {
  //   this.getDataFromApi();
  // },
  computed: {
    getRoleItem() {
      return this.$store.getters.getRoleList;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        role_name: "",
        description: "",
        status: "",
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
      this.$store.dispatch("callRoleData", this.searchParam).then(data => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalDataItems = data.meta.total;
      });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.editedItem.status = 1;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getRoleItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (this.editedItem.status == 0) {
        this.editedItem.status = "";
        console.log("...m", this.editedItem.status);
      }
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
              .dispatch("deleteRoleItem", id)
              .then(function() {
                self.setLimit();
                self.getDataFromApi();
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.getDataFromApi();
              });
          }
        });
    }
  }
};
</script>

<style scoped>
.Pending {
  background-color: #fb8c00;
  color: white;
}
.Received {
  background-color: #388e3c;
  color: white;
}

/* :rows-per-page-items="[25,50,100 ,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]" */
</style>
