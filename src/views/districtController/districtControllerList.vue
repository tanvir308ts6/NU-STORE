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
            <v-card-text class="title">District Controller List</v-card-text>
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
            <v-spacer />
            <v-btn @click="sendMail()" color="primary" dark>Mail to All</v-btn>
            <v-btn @click="newItem" color="primary" dark
              >Add New District Controller</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getDistrictControllerList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.dc_name }}</td>
          <td class="text-xs">{{ props.item.district_name }}</td>
          <td class="text-xs">{{ props.item.district_code }}</td>
          <td class="text-xs">{{ props.item.mobile }}</td>
          <td class="text-xs">
            <v-btn
              @click="sendMail(props.item)"
              style="text-transform: none;"
              >{{ props.item.email }}</v-btn
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
      <composeMail
        :toMail.sync="emailList"
        :toSms.sync="smsList"
        :dialogStatus.sync="mailDialogStatus"
      ></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/districtController/districtControllerForm.vue";
import composeMail from "@/components/utils/composeMail.vue";
export default {
  components: {
    formDialog,
    composeMail
  },
  data() {
    return {
      mailDialogStatus: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      loading: false,
      smsList: [],
      sl_count: 1,
      emailList: [],
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      search: "",
      limit: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "10",
          sortable: false
        },
        { text: "District Controller Name", value: "dc_name", sortable: false },
        { text: "District Name", value: "district_name", sortable: false },
        { text: "District Code", value: "district_code", sortable: false },
        { text: "Mobile", value: "mobile", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {},
  // mounted() {
  //   this.getDataFromApi();
  // },
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
    getDistrictControllerList() {
      return this.$store.getters.getDistrictControllerDataList;
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
        this.getDistrictControllerList.forEach(item => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      console.log("tosms ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },

    unSetEditedData() {
      this.editedItem = {
        id: "",
        dc_name: "",
        district_name: "",
        district_code: "",
        mobile: "",
        email: "",
        active: "1",
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
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
      this.setLimit();
      this.$store
        .dispatch("fetchDistrictControllerData", this.limit)
        .then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
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
      this.editedIndex = this.getDistrictControllerList.indexOf(item);
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
              .dispatch("deleteDistrictControllerItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchDistrictControllerData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchDistrictControllerData", self.limit);
              });
          }
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
