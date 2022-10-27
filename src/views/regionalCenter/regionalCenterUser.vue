<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      ref="refDialogForm"
      :loadData.sync="loadData"
    ></formDialog>

    <!-- {{getRegionalCenterUserList}} -->
    <!-- <regCenterDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
    ></regCenterDialog>-->
    <v-expansion-panel class="mb-3" inset v-if="false">
      <v-expansion-panel-content class="CSP_BoarderStyle">
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
          <v-flex class="mx-5">
            <v-layout class="mx-5" row wrap align-center>
              <v-autocomplete
                v-if="!ifRegionalUser"
                class="ma-2"
                v-model="searchParam.reg_center_code"
                :item-text="
                  (item) => item.regional_center_code + ' - ' + item.center_name
                "
                item-value="regional_center_code"
                :items="getRegCenList"
                menu-props="auto"
                label="Select Regional Center"
                prepend-icon="list"
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="searchParam.reg_center_code = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >
                    {{
                      data.item.regional_center_code +
                        " - " +
                        data.item.center_name
                    }}
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
                        v-html="
                          data.item.regional_center_code +
                            ' - ' +
                            data.item.center_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>

              <!--    <v-autocomplete
            class="ma-2"
            label="Select Regional Center"
            item-text="center_name"
            item-value="regional_center_code"
            v-model="searchParam.reg_center_code"
            :items="getRegCenList"
            v-validate="'required'"
            :error-messages="errors.collect('reg_center_code')"
            data-vv-name="reg_center_code"
            required
            prepend-inner-icon="edit"
            outline
            return-object
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.reg_center_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
              >{{ data.item.center_name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.center_name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
              </v-autocomplete>-->

              <v-text-field
                name="email"
                label="Email"
                v-model="searchParam.email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                required
                prepend-icon="edit"
              ></v-text-field>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm12 md12 class="mb-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchRegCenUserList()">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <v-snackbar dark top mt-5 v-model="snackbar" :multi-line="multiLine">
      {{ getMsg }}
      <v-btn color="red" dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>-->

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Regional Center User</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
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

          <v-card-actions>
            <v-btn color="primary" dark @click="newItem"
              >New Regional Center User</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getRegionalCenterUserList"
        :search="search"
        class="elevation-1 mytable"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">{{ sl_count + props.index }}</td>
          <td class="text-xs-center">{{ props.item.regional_center_name }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.username }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>

          <!-- <td class="text-xs-center">{{ props.item.type.name }}</td>
          <td class="text-xs-center">{{ props.item.username }}</td>-->
          <!--   <td class="text-xs-center">{{ props.item.password }}</td> -->

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
            </v-item-group>
          </td>
          <td class="justify-center text-xs-center">
            <v-item-group>
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
import formDialog from "@/components/user/userForm.vue";
import centerRegMixin from "../../mixin/center_reg_mixin";
import commonFun from "../../mixin/common_function";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  mixins: [centerRegMixin, commonFun, common_login_getters, commonGet],
  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      sl_count: 1,
      loadData: false,
      searchParam: {},
      snackbar: false,
      multiLine: true,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: false,
        },
        {
          text: "Assigned Regional Center",
          value: "regional_center_name",
          align: "center",
          sortable: false,
        },
        {
          text: "User's Name",
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: "User's Username",
          value: "username",
          align: "center",
          sortable: false,
        },
        {
          text: "User's Email",
          value: "email",
          align: "center",
          sortable: false,
        },

        { text: "Edit", align: "center", sortable: false },
        { text: "Delete", align: "center", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {},
      reg_center_id_url: "",
    };
  },
  watch: {
    mailDialogStatus(val) {
      console.log("mailDialogStatus", val);
    },
    pagination: {
      handler() {
        this.searchRegCenUserList();
      },
      deep: true,
    },
    loadData: {
      handler(status) {
        if (status) this.searchRegCenUserList();
        this.loadData = false;
      },
    },
  },
  created() {
    this.unSetEditedData();
    if (this.ifRegionalUser) {
      this.searchParam.regional_center_id = this.getAuthUser.regional_center.id;
    }
    this.$store.dispatch("fetchRegCenterData");
  },
  computed: {
    getRegionalCenterUserList() {
      return this.$store.getters.getRegionalCentertUserItem;
    },
    // getMsg() {
    //   return this.$store.getters.getRegionalCenterUserMessage;
    // }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchRegCenUserList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRegCenUserData", this.searchParam)
        .then((data) => {
          console.log("pagiantion then", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },

    // getDataFromApi() {
    //   if (this.ifRegionalUser)
    //     this.reg_center_id_url =
    //       "regional_center_id=" +
    //       JSON.parse(localStorage.getItem("user")).regional_center.id;

    //   this.loading = true;
    //   this.setLimit();
    //   var self = this;
    //   this.$store
    //     .dispatch("callRegionalCenterUserData", {
    //       limit: this.limit,
    //       reg_center_id_url: this.reg_center_id_url
    //     })
    //     .then(data => {
    //       self.loading = false;
    //       this.sl_count = data.meta.from;
    //       this.pagination.totalItems = data.meta.total;
    //     });
    // },
    getActive(active) {
      var status = active == 1 ? "Yes" : "No";
      return status;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        active: "",
        user_type: 3, // 3 for regional
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
        roleDetails: {
          role_id: 3, // 3 for regional
        },
      };
      console.log("unset called ");
      this.setRegionalCode();
    },
    setRegionalCode() {
      console.log("set Regional code... ", this.ifRegionalUser);
      //FETCH LOGEND IN USER TYPE CHECK IF IT IS REG
      if (this.ifRegionalUser) {
        this.editedItem.regional_center_id = JSON.parse(
          localStorage.getItem("user")
        ).regional_center.id;
        console.log("if reg center enterd", this.editedItem.regional_center_id);
      }
    },
    editItem(item) {
      this.editedIndex = this.getRegionalCenterUserList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
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
              .dispatch("deleteRegionalCenterUserItem", id)
              .then(function() {
                self.searchRegCenUserList();
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.searchRegCenUserList();
              });
          }
        });
    },
  },
};
</script>

<style lang="scss">
.mytable .theme--light.v-table tbody tr:not(:last-child) {
  // border-bottom: none;
  padding: 0%;
}

.mytable table.v-table tbody td:not(:nth-child(1)) {
  padding: 0 5px;
}
.mytable table.v-table tbody td:first-child {
  padding: 0%;
}

.myborder {
  border-width: 1px;
  // border-right-style: solid;
  // border-left-style: solid;
  // padding: 5px;
}
</style>
