<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
      :getRoles.sync="getRoleGrantItem"
      :loadData.sync="loadData"
    ></formDialog>
    <!-- <v-snackbar :multi-line="multiLine" dark mt-5 top v-model="snackbar">
      {{ getMsg }}
      <v-btn @click="snackbar = false" color="red" dark text>Close</v-btn>
    </v-snackbar>-->

    <v-container fluid>
      <!-- <v-alert :value="snackbar_msg.length > 1" dismissible type="success">{{snackbar_msg}}</v-alert> -->

      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Role Grant</v-card-text>
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
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>New Role Grant</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getRoleGrantItem"
        :search="search"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <!--  <td class="text-xs">{{ props.item.user_id }}</td> -->
          <td class="text-xs">{{ props.item.user_name }}</td>
          <td class="text-xs">{{ props.item.user_email }}</td>
          <td class="text-xs">{{ props.item.role_name }}</td>
          <td class="text-xs">{{ props.item.start_date }}</td>
          <td class="text-xs">{{ props.item.end_date }}</td>
          <td class="text-xs">{{ props.item.status }}</td>

          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon @click="editItem(props.item)" class="mr-0" color="white">edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white">delete</v-icon>
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
import formDialog from "@/components/role/roleGrantForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      sl_count: 1,
      totalDataItems: 0,
      loading: true,
      loadData: false,
      limit: {},
      snackbar: false,
      multiLine: true,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        // { text: "User", value: "user_id" },
        { text: "User name", value: "user_name" },
        { text: "User Email", value: "user_email" },
        { text: "Role", value: "role_name" },
        { text: "Start Date", value: "start_date" },
        { text: "End Date", value: "end_date" },
        { text: "Status", value: "status" },

        { text: "Action", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },

  // created() {
  //   this.$store.dispatch("callRoleGrantData");
  // },
  mounted() {
    this.ifExamSchema = true;
    this.getDataFromApi();
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      },
    },
  },
  computed: {
    getRoleGrantItem() {
      return this.$store.getters.getRoleGrantList;
    },
    snackbar_msg() {
      return this.$store.getters.getSnackbarMsg;
    },
    getSchema() {
      return this.$store.getters.getRoleGrantSchema;
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search,
      };
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("callRoleGrantData", this.limit).then((data) => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalItems = data.meta.total;
      });
    },
    statusColor(status) {
      return status == 0 ? "Pending" : "Received";
    },
    statusText(status) {
      return status == 0 ? "Pending" : "Received";
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        user_id: "",
        role_id: "",
        start_date: "",
        end_date: "",
        status: "",
        user_name: "",
        role_name: "",
        exam_code: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getRoleGrantItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteRoleGrantItem", id)
              .then(function (data) {
                self.setLimit();
                self.$store.dispatch("callRoleGrantData", self.limit);
                // self.snackbar = true;
              })
              .catch(function (error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("callRoleGrantData", self.limit);
              });
          }
        });
    },
  },
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
