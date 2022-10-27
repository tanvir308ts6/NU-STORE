<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
    ></formDialog>
    <AssignPrivilege
      :dialogStatus.sync="AssignPrivilegeStatus"
      :Data="collegeUser"
    ></AssignPrivilege>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">College User List</v-card-text>
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
          <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Add User</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getAllCollegeUser"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <tr>
            <td>{{ props.index + 1 }}</td>
            <td class="text-xs">{{ props.item.username }}</td>
            <td class="text-xs">{{ props.item.name }}</td>
            <td class="text-xs">{{ props.item.email }}</td>
            <td class="text-xs">{{ props.item.mobile }}</td>
            <td class="text-xs">
              <span v-if="props.item.client_info">{{
                props.item.client_info.REMOTE_ADDR
              }}</span>
            </td>

            <td class="justify-center text-xs-center">
              <v-item-group>
                <!-- <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon @click="editItem(props.item)" class="mr-0" color="white">edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
                </v-tooltip>-->
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="primary" v-on="on">
                      <v-icon
                        @click="setPrivilege(props.item)"
                        class="mr-0"
                        color="white"
                        >playlist_add</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Assign Privilege</span>
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
          </tr>
        </template>
      </v-data-table>
    </v-container>
    <!-- <pre>{{collegeUser}}</pre> -->
  </v-container>
</template>
<script>
import formDialog from "@/components/collegePanel/CollegeUser/Form.vue";
import AssignPrivilege from "@/components/collegePanel/CollegeUser/AssignPrivilege.vue";

export default {
  components: {
    formDialog,
    AssignPrivilege
  },
  data() {
    return {
      expand: false,
      pagination: {},
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      AssignPrivilegeStatus: false,
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Username", value: "username" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "mobile" },
        { text: "IP", value: "client_info.REMOTE_ADDR" },
        { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      collegeUser: {}
    };
  },
  created() {
    // let collegeAdmin = JSON.parse(localStorage.getItem("college"));
    // this.$store.dispatch("getAllCollegeUser", collegeAdmin);
  },
  mounted() {
    // this.getDataFromApi();
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    }
  },
  computed: {
    getAuthCollege() {
      return this.$store.getters.getAuthCollege;
    },
    getAllCollegeUser() {
      return this.$store.getters.getAllCollegeUser;
    },
    getCollegeUserSchema() {
      return this.$store.getters.getCollegeUserSchema;
    }
  },
  methods: {
    unSetEditedData() {
      this.$store.commit("UNSET_COLLEGE_USER_SCHEMA");
      this.editedItem = this.getCollegeUserSchema;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search
      };
    },
    getDataFromApi() {
      this.loading = true;
      let collegeAdmin = JSON.parse(localStorage.getItem("college"));
      this.$store.dispatch("getAllCollegeUser", this.search).then(data => {
        this.loading = false;
        // this.totalDataItems = data.meta.total;
      });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    setPrivilege(item) {
      this.$store.dispatch("getCollegeUserPrivilege", item);
      // this.editedIndex = this.getAllCollegeUser.indexOf(item);
      this.collegeUser = Object.assign({}, item);
      this.AssignPrivilegeStatus = true;
      // this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getAllCollegeUser.indexOf(item);
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
              .dispatch("deleteCollegeUser", id)
              .then(function(data) {})
              .catch(function(error) {
                console.log(error);
              })
              .then(always => {
                self.setLimit();
                self.$store.dispatch("getAllCollegeUser", self.search);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
