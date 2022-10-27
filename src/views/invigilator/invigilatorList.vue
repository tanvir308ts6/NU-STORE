<template>
  <v-container fluid>
    <v-dialog v-model="formDialogStatus" max-width="600px" persistent>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :centercode="centercode"
        :indexEdited.sync="editedIndex"
        :searchInvigilatorList.sync="searchInvigilatorList"
        :searchParam.sync="searchParam"
      ></formDialog>
    </v-dialog>
    <v-expansion-panel class="mb-3" inset>
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
              <!-- {{ searchParam.center_code }} -->
              <v-autocomplete
                v-if="!ifCenterUser"
                class="ma-2"
                v-model="searchParam.center_code"
                :item-text="
                  (item) => item.center_code + ' - ' + item.center_name
                "
                item-value="center_code"
                :items="getCenterItems"
                menu-props="auto"
                label="Select Center"
                prepend-icon="list"
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="searchParam.center_code = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                    >{{
                      data.item.center_code + " - " + data.item.center_name
                    }}</v-chip
                  >
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
              <v-btn outline round large @click="searchInvigilatorList()">
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
            <v-card-text class="title">Invigilator List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />
          <v-card-actions>
            <v-btn color="primary" dark @click="exportInvigilatorList"
              >Download Invigilator List</v-btn
            >
          </v-card-actio
          <v-card-actions>
            <v-btn color="primary" dark @click="newItem"
              >Create New Invigilator</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getInvigilatorList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.mobile }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.nid_no }}</td>
          <td class="text-xs-center">{{ props.item.teacher_code }}</td>
          <!-- <td class="text-xs">{{ props.item.college_code }}</td> -->
          <td class="text-xs-left">{{ props.item.college }}</td>
          <!-- <td class="text-xs">{{ props.item.active }}</td> -->
          <!-- <td class="text-xs">{{ props.item.password }}</td>
          <td class="text-xs">{{ props.item.username }}</td>-->
          <td>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn fab small color="primary" v-on="on">
                  <v-icon
                    @click="sendMail(props.item)"
                    class="mr-0"
                    color="white"
                    >mail</v-icon
                  >
                </v-btn>
              </template>
              <span>Send Mail</span>
            </v-tooltip>
          </td>
          <td>
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
          </td>
          <td class="justify-center text-xs-center">
            <v-tooltip right color="red">
              <template v-slot:activator="{ on }">
                <v-btn fab small color="red" v-on="on"  :disabled="ifCenterUser">
                  <v-icon @click="deleteItem(props.item)" color="white"
                    >delete</v-icon
                  >
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert
          >
        </template>
      </v-data-table>
      <deleteConfirm
        :ddialogStatus.sync="deleteDialogStatus"
        :deleteAction.sync="deleteActionStatus"
      ></deleteConfirm>
      <composeMail
        :dialogStatus.sync="mailDialogStatus"
        :toMail.sync="emailList"
        :toSms.sync="smsList"
      ></composeMail>
    </v-container>
    <!-- <pre> {{searchParam}} </pre>pagination:
    <pre> {{pagination}} </pre>-->
  </v-container>
</template>

<script>
import formDialog from "@/components/invigilator/invigilatorForm.vue";
import composeMail from "@/components/utils/composeMail.vue";
import deleteConfirm from "@/components/utils/deleteDialog.vue";
import commonFunction from "@/mixin/common_function";
import common_login_getters from "@/mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  mixins: [commonFunction, common_login_getters, commonGet, commonExamYear],
  components: {
    formDialog,
    composeMail,
    deleteConfirm,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      deleteAction: false,
      mailDialogStatus: false,
      // deleteDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      loading: false,
      sl_count: 1,
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          sortable: false,
        },
        { text: "Invigilator Name", value: "name", sortable: false },
        { text: "Mobile", value: "mobile", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "NID No", value: "nid_no", sortable: false },
        { text: "Teacher TMIS ID", value: "teacher_code", sortable: false },
        // { text: "College code", value: "college_code" },
        { text: "Center ", value: "center", sortable: false },
        // { text: "Active", value: "active" },
        // { text: "Password", value: "password" },
        //{ text: "User Name", value: "username" },
        { text: "Mail ", align: "center", value: "mail", sortable: false },
        { text: "Edit", align: "center", value: "edit", sortable: false },
        { text: "Delete", align: "center", value: "delete", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      index: -1,
      centercode: "",
      smsList: [],
      emailList: [],
    };
  },
  watch: {
    deleteActionStatus: {
      handler: function (val) {
        console.log(" watch value ", val);
        this.deleteData();
      },
      deep: true,
    },
    pagination() {
      this.checkUserType();
      this.searchInvigilatorList();
    },
    cload(val) {
      console.log("lets see mitu", val);
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      console.log("lets see mitu", this.getAuthUser.center.center_code);
    },
  },
  created() {
    this.ifExamSchema = true;
    this.ifYearSchema = true;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    //this.searchParam.college_code = "";
    this.$store.commit("UNSET_FORMNOTIFY");
    // if (!this.$store.getters.getCenterItems.length) {
    //   console.log("sssss");
    //   //this.$store.dispatch('fetchCenterData');
    // }
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);
    setTimeout(() => {
      this.checkUserType();
    }, 800);
  },
  computed: {
    getInvigilatorList() {
      return this.$store.getters.getInvigilatorItem;
    },
    getCenterItems() {
      return this.$store.getters.getTheoryCenterList;
    },
  },
  methods: {
    checkUserType() {
      if (this.ifCenterUser) {
        console.log("Entered cneter CHECK", this.searchParam);
        //this.searchParam.center_code = [this.getAuthUser.center.center_code]; //or
        this.searchParam.center_code = this.getAuthUser.center.center_code;
        this.searchParam.college_code = this.$store.getters.getAuthUser.center.college_code;
      }
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    exportInvigilatorList(){
      console.log("print seadfff",this.searchParam);
      let param = this.searchParam;
      param.pdf = true;
      this.$store.dispatch("downnloadInviList",param);
    },
    searchInvigilatorList() {
      this.loading = true;
      this.setLimit();
      console.log("CAlling .... ", this.searchParam);
      this.$store
        .dispatch("searchInvigilatorData", this.searchParam)
        .then((data) => {
          console.log("Return data ", data);
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
        //if want to sent all
        this.getInvigilatorList.forEach((item) => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      console.log("tosms... ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        name: "",
        email: "",
        mobile: "",
        nid_no: "",
        user_id: "",
        tmis_id: "",
        teacher_code: "",
        college_code: "",
        center_id: "",
        username: "",
        password: "",
        active: "",
        role_id: 4,
        user_type: this.getInvigilatorUserType(),
      };
    },
    editItem(item) {
      //this.unSetEditedData()
      this.editedIndex = this.getInvigilatorList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.user_type = this.getInvigilatorUserType(); // call mixin fun
      this.editedItem.role_id = 4;
      this.$store.commit("SET_INVIGILATOR_SCHEMA", this.editedItem);
      console.log(this.formDialogStatus + " editItem ", this.editedItem);
      console.log("role ", this.$store.getters.getRoleList);
      this.dialogOpen();
    },

    deleteData() {
      if (this.deleteActionStatus == true) {
        console.log("deleteItem from list called ", this.index);
        var self = this;
        this.$store
          .dispatch("deleteInvigilatorItem", this.index)
          .then(function (data) {
            console.log(data);
            self.searchInvigilatorList();
            // self.$store.dispatch("callInvigilatorData", self.centercode);
            self.deleteDialogStatus = false;
            self.deleteActionStatus = false;
          })
          .catch(function (error) {
            console.log(error);
            self.searchInvigilatorList();
            self.deleteDialogStatus = false;
            self.deleteActionStatus = false;
          });
      }
    },
    deleteItem(item) {
      this.index = item.id;
      this.deleteDialogStatus = true;
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();

      console.log(" editItem ", this.editedItem);
    },
  },
};
</script>
