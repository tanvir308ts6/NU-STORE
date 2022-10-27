<template>
  <v-container fluid>
    <v-dialog v-model="formDialogStatus" max-width="600px" persistent>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :type="type"
        :searchCenterList="searchCenterList"
      ></formDialog>
    </v-dialog>
    <v-dialog v-model="centerDetailDialog" width="500">
      <centerDetail :currentItem="currentItem"></centerDetail>
    </v-dialog>
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
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.district_code"
                  :item-text="item => '(' + item.id + ') ' + item.district_name"
                  item-value="id"
                  :items="getDistrictList"
                  menu-props="auto"
                  label="Select District"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.district_name }}</v-chip
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
                          v-html="data.item.district_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-text-field
                  class="ml-2 mt-3"
                  name="mobile"
                  label="Mobile"
                  v-model="searchParam.mobile"
                  prepend-icon="edit"
                ></v-text-field>
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchCenterList"
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
    <!-- <v-content> -->
    <v-container fluid>
      <!-- <v-layout> -->
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Viva Center List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>
          <!-- <v-btn @click="searchCenterList()" class="ml-3" fab small flat dark color="primary">
            <v-icon dark large>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card flat>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="sendMail()" color="primary" dark
                >Mail to All</v-btn
              >
              <v-btn color="primary" dark @click="newItem"
                >Create Viva Center</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-btn
            fab
            small
            color="primary"
            class="white--text"
            @click="exportCenterListClick()"
          >
            <v-icon dark>arrow_downward</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getCenterList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.center_name }}</td>
          <td class="text-xs">{{ props.item.college_code }}</td>
          <td class="text-xs">{{ props.item.center_code }}</td>
          <td class="text-xs">{{ props.item.address }}</td>
          <td class="text-xs">{{ props.item.phone }}</td>
          <td class="text-xs">{{ props.item.email }}</td>
          <td class="text-xs">{{ props.item.mobile }}</td>
          <td class="text-xs">{{ props.item.student_capacity }}</td>
          <td class="text-xs">{{ props.item.responsible_person }}</td>
          <td class="text-xs">{{ props.item.district_code }}</td>
          <td class="text-xs">{{ getActive(props.item.active) }}</td>
          <td class="justify-center text-xs-center">
            <v-tooltip top>
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
          <td class="justify-center text-xs-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn fab small color="primary" v-on="on">
                  <v-icon medium flat @click="showDetailItem(props.item)"
                    >info</v-icon
                  >
                </v-btn>
              </template>
              <span>Info</span>
            </v-tooltip>
          </td>

          <td class="justify-center text-xs-center">
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
      <composeMail
        :toMail.sync="emailList"
        :toSms.sync="smsList"
        :dialogStatus.sync="mailDialogStatus"
      ></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/centerList/centerForm.vue";
import centerDetail from "@/components/centerList/centerDetail.vue";
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "../../mixin/common_getters_mixin";
export default {
  mixins: [commonGet],
  components: {
    formDialog,
    centerDetail,
    composeMail
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      loading: false,
      mailDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      centerDetailDialog: false,
      currentItem: {},
      rowCount: 0,
      search: "",
      sl_count: -1,
      smsList: [],
      emailList: [],
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id"
        },
        { text: "Name", value: "center_name", sortable: false },
        { text: "College code", value: "college_code", sortable: false },
        { text: "Center code", value: "center_code", sortable: false },
        { text: "Address", value: "address", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Mobile", value: "mobile", sortable: false },
        {
          text: "Examinee Capacity",
          value: "student_capacity",
          sortable: false
        },
        {
          text: "Responsible Person",
          value: "responsible_person",
          sortable: false
        },
        { text: "District Code", value: "district_code", sortable: false },
        { text: "Active", sortable: false, value: "active" },
        { text: "Mail", align: "center", value: "actions", sortable: false },
        { text: "More", align: "center", value: "actions", sortable: false },

        { text: "Edit", align: "center", value: "actions", sortable: false },
        { text: "Delete", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      type: 0,
      editedItem: this.unSetEditedData
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000
    };
    this.searchParam.type = 2;
    this.$store.commit("UNSET_FORMNOTIFY");
    //this.$store.dispatch("callCenterData");
    this.$store.dispatch("fetchDistrictData", limit);
  },
  computed: {
    getCenterList() {
      return this.$store.getters.getCenterItem;
    }
  },
  watch: {
    pagination() {
      this.searchCenterList();
    }
  },
  methods: {
    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.mobile);
        this.emailList.push(item.email);
      } else {
        this.getCenterList.forEach(item => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      console.log("tosms ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    unSetEditedData() {
      this.editedItem = {
        center_id: "",
        center_name: "",
        college_code: "",
        center_code: "",
        address: "",
        phone: "",
        email: "",
        mobile: "",
        type: 0,
        student_capacity: "",
        district_code: "",
        responsible_person: "",
        active: 1
      };
    },
    exportCenterListClick() {
      // console.log("....");
      this.$store.dispatch("exportCenterList");
    },
    getActive(active) {
      var status = active == true ? "Yes" : "No";
      return status;
    },
    editItem(item) {
      this.editedIndex = this.getCenterList.indexOf(item);
      this.editedItem.type = 2;
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const index = item.id;
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteCenterItem", index)
              .then(function() {
                self.searchCenterList();
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.searchCenterList();
              });
          }
        });
      //const index = this.getCenterList.indexOf(item);
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.type = 2;
      this.dialogOpen();
    },
    showDetailItem(item) {
      this.currentItem = item;
      this.centerDetailDialog = !this.centerDetailDialog;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchCenterList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchCenterListData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    }
  }
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
