<template>
  <v-container fluid>
    <formDialog2
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      ref="refDialogForm"
      :loadData.sync="loadData"
    ></formDialog2>

    <v-expansion-panel class="mb-3" inset v-model="open">
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
                v-if="!ifCenterUser"
                class="ma-2"
                v-model="searchParam.center_id"
                :item-text="
                  (item) => item.center_code + ' - ' + item.center_name
                "
                item-value="id"
                :items="getCenterItems"
                menu-props="auto"
                label="Select Center"
                prepend-icon="list"
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="searchParam.center_id = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >
                    {{ data.item.center_code + " - " + data.item.center_name }}
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
                          data.item.center_code + ' - ' + data.item.center_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-text-field
                name="email"
                label="Email"
                v-model="searchParam.email"
                v-validate="'required'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                required
                prepend-icon="edit"
              ></v-text-field>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm12 md12 class="mb-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchCenterUserList()">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Center User List..</v-card-text>
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
            <v-btn color="primary" dark @click="newItem">New Center User</v-btn>
          </v-card-actions>

          <!-- <v-btn fab small color="primary" class="white--text" @click="exportCenterUserListClick()">
            <v-icon dark>arrow_downward</v-icon>
          </v-btn>-->
        </v-layout>
      </v-card>
      <!-- {{getCenterUserList[0]}} -->
      <!-- { "id": 125, "name": "kh", "email": "kk@gmail.com", "username": "kk", "user_type": 2, "type": { "id": 2, "name": "Center", "description": "Center", "status": "1", "created_by": "1", "updated_by": "1", "deleted_by": null, "created_at": "2020-03-24 06:54:11", "updated_at": "2020-03-24 06:54:11" }, "user_type_name": "Center", "roleDetails": null, "center_list_id": "13", "center_name": "KHULNA GOVT. MAHILA COLLEGE" } -->
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getCenterUserList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.center_name }}</td>
          <td class="text-xs">{{ props.item.name }}</td>
          <td class="text-xs">{{ props.item.username }}</td>
          <td class="text-xs">{{ props.item.email }}</td>

          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      class="mr-0"
                      color="white"
                      dark
                      @click="sendMail(props.item)"
                      >mail</v-icon
                    >
                  </v-btn>
                  <!-- @click="mailDialogStatus = !mailDialogStatus" -->
                </template>
                <span>Mail</span>
              </v-tooltip>
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
      <composeMail
        :toMail.sync="emailList"
        :toSms.sync="smsList"
        :dialogStatus.sync="mailDialogStatus"
      ></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import formDialog2 from "@/components/user/userForm.vue";
import composeMail from "@/components/utils/composeMail.vue";
import commonFun from "../../mixin/common_function";
import centerRegMixin from "../../mixin/center_reg_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";

export default {
  mixins: [commonFun, centerRegMixin, common_login_getters, commonGet],
  components: {
    formDialog2,
    composeMail,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      totalDataItems: 0,
      sl_count: 1,
      loading: true,
      toggle_exclusive: 0,
      mailDialogStatus: false,
      snackbar: false,
      multiLine: true,
      loadData: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      // "name": "kh", "email": "kk@gmail.com", "username": "kk",
      headers: [
        {
          text: "SL.",
          align: "left",
        },
        { text: "Center's Name", value: "center_name" },
        { text: "Center User's Name", value: "name" },
        { text: "Center User's Username", value: "username" },
        { text: "Center User's Email", value: "email" },
        { text: "Action", align: "center", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      emailList: [],
      smsList: [],
    };
  },
  watch: {
    mailDialogStatus(val) {
      console.log("mailDialogStatus", val);
    },
    pagination: {
      handler() {
        this.searchCenterUserList();
      },
      deep: true,
    },
    loadData: {
      handler(status) {
        if (status) this.searchCenterUserList();
        this.loadData = false;
      },
    },
  },
  created() {
    if (!this.$store.getters.getCenterItems.length) {
      console.log("sssss");
      this.$store.dispatch("fetchCenterData");
    }
    if (this.ifCenterUser) {
      //this.searchParam.center_code = [this.getAuthUser.center.center_code]; //or
      this.searchParam.center_id = this.getAuthUser.center.id;
    }
  },
  mounted() {},
  computed: {
    getCenterUserList() {
      return this.$store.getters.getCenterUserItem;
    },
    getMsg() {
      return this.$store.getters.getCenterUserMessage;
    },
    getCenterItems() {
      return this.$store.getters.getCenterItems;
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.getCenterUserList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      console.log(" editItem ", this.editedItem);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    // searchCenterUserList() {
    //   this.loading = true;
    //   this.setLimit();
    //   var self = this;
    //   this.$store
    //   .dispatch("callCenterUserData", {
    //     limit: this.limit,
    //     center_id_url: this.getCenterUrl()
    //   })
    //   .then(data => {
    //     this.loading = false;
    //     this.sl_count = data.meta.from;
    //     this.pagination.totalItems = data.meta.total;
    //   });
    // },
    searchCenterUserList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchCenterUserList", this.searchParam)
        .then((data) => {
          // console.log("data---", data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.mobile);
        this.emailList.push(item.email);
      } else {
        this.getRegionalCenterList.forEach((item) => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      console.log("tosms ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    exportCenterUserListClick() {
      this.$store.dispatch("exportCenterUserList");
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteCenterUserItem", id)
              .then(function () {
                self.searchCenterUserList();
                // self.snackbar = true;
              })
              .catch(function (error) {
                console.log(error);
                self.searchCenterUserList();
              });
          }
        });
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    setCenterCode() {
      console.log("setCetner code... ", this.ifCenterUser);
      //FETCH LOGEND IN USER TYPE CHECK IF IT IS CENTER
      if (this.ifCenterUser) {
        //this.editedItem.center_list_id = this.getAuthUser.center.center_code ;
        this.editedItem.center_list_id = JSON.parse(
          localStorage.getItem("user")
        ).center.id;
        console.log("ifcenter enterd", this.editedItem.center_list_id);
      }
    },

    unSetEditedData() {
      this.editedItem = {
        id: "",
        active: "",
        user_type: 2, // 2 for center
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
          role_id: 2, // 2 for center
        },
      };
      console.log("unset called ");
      this.setCenterCode();
    },
  },
};
</script>
