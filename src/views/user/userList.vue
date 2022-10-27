<template>
  <v-container fluid>
    <!-- {{sl_count}} -->
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      ref="refDialogForm"
      :loadData.sync="loadData"
    ></formDialog>

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
                <v-autocomplete
                  box
                  label="Select User Type"
                  :item-text="item => item.id + ' - ' + item.name"
                  item-value="id"
                  v-model="searchParam.user_type"
                  :items="getUserTypeList"
                  class="mx-5 my-2"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.user_type = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      color="#EBEBEB"
                    >
                      <div class="title">{{ data.item.name }}</div>
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchUserList()"
                      >Search</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">User List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            v-model="search"
            label="Search"
            class="mt-1"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>-->
          <v-spacer />
          <v-btn
            @click="searchUserList()"
            class="ml-3"
            fab
            small
            flat
            dark
            color="primary"
          >
            <!-- <v-icon dark large>search</v-icon> -->
          </v-btn>

          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Create New User</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getUserDataList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <!-- <td class="text-xs">{{ props.item.user_type }}</td> -->
          <td class="text-xs">{{ getUserType(props.item.user_type) }}</td>
          <td class="text-xs">{{ props.item.name }}</td>
          <td class="text-xs">{{ props.item.username }}</td>
          <td class="text-xs">{{ props.item.email }}</td>
          <td class="text-xs">{{ getRoleDetails(props.item) }}</td>
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
    <!--  <pre> {{getUserDataList}}</pre> -->
  </v-container>
</template>

<script>
import formDialog from "@/components/user/userForm.vue";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commFun from "@/mixin/common_function.vue";

export default {
  mixins: [commFun, common_login_getters, commonGet],
  components: {
    formDialog
  },
  data() {
    return {
      searchParam: {},
      sl_count: -1,
      //user_type: "", this variable already decleard in common_mixin (so be carefull about varaible declaration )
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      loading: false,
      totalDataItems: 0,
      loadData: false,
      limit: {},
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        //{ text: "Users", value: "user_type" },
        { text: "User Type", value: "user_type" },
        // { text: "Center", value: "center_list_id" },
        { text: "Name", value: "name" },
        { text: "User Name", value: "username" },
        { text: "Email", value: "email" },
        { text: "User Role", value: "roleDetails" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {
    var searchlimit = {};
    searchlimit.limit = -1;
    searchlimit.page = 1;
    this.$store.dispatch("fetchUSerTypeData", searchlimit);
  },
  mounted() {
    this.$store.commit("UNSET_FORMNOTIFY");
  },
  watch: {
    pagination() {
      // console.log("paggin >>>>>>> called ");
      this.searchUserList();
    },
    loadData: {
      handler(status) {
        if (status) this.searchUserList();
        this.loadData = false;
      }
    }
  },
  computed: {
    getUserDataList() {
      return this.$store.getters.getUserDataList;
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
    searchUserList() {
      // console.log("SEACH USER ......................");
      try {
        this.loading = true;
        this.setLimit();
        this.$store.dispatch("fetchUserData", this.searchParam).then(data => {
          console.log("sp:", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
      } catch (ex) {
        console.log(ex);
      }
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        user_type: 0,
        user_id: "",
        regional_center_id: "",
        center_list_id: "",
        username: "",
        email: "",
        name: "",
        password: "",
        confirmedPassword: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        roleDetails: {}
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
      console.log("FFILE ", this.editedItem);
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getUserDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      this.$refs.refDialogForm.setStepper(this.editedItem.user_type);
      console.log("item ", this.editedItem);
      console.log("edit", this.editedIndex);
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteUserItem", id)
              .then(function() {
                self.setLimit();
                self.searchUserList();
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.searchUserList();
              });
          }
        });
    },
    getRoleDetails(item) {
      try {
        if (item) {
          //console.log("ITEM ....", item)
          //return item.role_id;
          return item.type.name;
        }
      } catch (ex) {
        //console.log("aaa", ex);
      }
    }
  }
};
</script>

<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}
</style>
