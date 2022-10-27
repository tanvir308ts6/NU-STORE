<template>
  <v-container fluid>
    <!-- {{getUserType}} -->

    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
      :loadData.sync="loadData"
    ></formDialog>
    <v-snackbar :multi-line="multiLine" dark mt-5 top v-model="snackbar">
      {{ getMsg }}
      <v-btn @click="snackbar = false" color="red" dark text>Close</v-btn>
    </v-snackbar>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Blank Script Collection From NU</v-card-text
            >
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
          <v-spacer />
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-card-actions>
            <!-- <v-btn @click="newItem" color="primary" dark>New Blank Script Collection from NU</v-btn> -->
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getRegBsCollFromNuDataList"
        class="elevation-1"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-left">
            ({{ props.item.reg_center_code }}){{ props.item.reg_center_name }}
          </td>
          <td class="text-xs-left">
            ({{ props.item.exam_code }}){{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.main_packet_size }}</td>
          <td class="text-xs-center">{{ props.item.main_quantity }}</td>
          <td class="text-xs-center">{{ props.item.extra_packet_size }}</td>
          <td class="text-xs-center">{{ props.item.extra_quantity }}</td>
          <td class="text-xs-center">{{ props.item.total_packet }}</td>
          <td class="text-xs-center">{{ props.item.date }}</td>
          <td class="text-xs-center">{{ props.item.comment }}</td>
          <td class="text-xs-center">
            <v-chip v-if="props.item.status == 3" color="white green--text">
              <b>Distributed</b>
            </v-chip>
            <v-chip v-if="props.item.status == 2" color="white orange--text">
              <b>Pending</b>
            </v-chip>
            <v-chip v-if="props.item.status == 1" color="white pink--text">
              <b>Allocated</b>
            </v-chip>
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
                      >memory</v-icon
                    >
                  </v-btn>
                </template>
                <span>Approve</span>
              </v-tooltip>
              <!-- <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon @click="editItem(props.item)" class="mr-0" color="white">edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>-->
              <div v-if="ifAdminUserType">
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
              </div>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/regionalCenter/RegBsCollFromNuForm.vue";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [common_login_getters],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      totalDataItems: 0,
      loading: true,
      loadData: false,
      sl_count: 1,
      limit: {},
      snackbar: false,
      multiLine: true,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        // { text: "Script quantity", value: "script_qty" },
        { text: "Regional Center", value: "reg_center_code" },
        { text: "Exam Name", value: "exam_code" },
        { text: "Main Packet Size", value: "main_packet_size" },
        { text: "Main Quantity", value: "main_quantity" },
        { text: "Extra Packet Size", value: "extra_packet_size" },
        { text: "Extra Quantity", value: "extra_quantity" },
        { text: "Total Packet", value: "total_packet" },
        { text: "Date", value: "date" },
        { text: "Comments", value: "comment" },
        { text: "Status", align: "center", value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.$store.dispatch("callRegBsCollFromNuData");
  // },
  mounted() {
    //this.getDataFromApi();
  },
  computed: {
    getRegBsCollFromNuDataList() {
      return this.$store.getters.getRegBsCollFromNuDataList;
    },
    getMsg() {
      return this.$store.getters.getRegBsCollFromNuMessage;
    },
    ifAdminUserType() {
      return parseInt(this.$store.getters.getAuthUserType) == 1 ? true : false;
    }
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
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search
      };
      if (this.ifRegionalUser) {
        this.limit.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
      }
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("callRegBsCollFromNuData", this.limit).then(data => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.totalDataItems = data.meta.total;
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
        reg_center_code: "",
        reg_center_name: "",
        main_packet_size: "",
        main_quantity: "",
        extra_packet_size: "",
        extra_quantity: "",
        total_packet: "",
        date: "",
        comment: "",
        sender_id: "",
        exam_initiate_id: "",
        exam_code: "",
        exam_name: "",
        year: "",
        user_id: "",
        user_name: "",
        status: "",
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    editItem(item) {
      this.editedIndex = this.getRegBsCollFromNuDataList.indexOf(item);
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
              .dispatch("deleteRegBsCollFromNuItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("callRegBsCollFromNuData", self.limit);
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("callRegBsCollFromNuData", self.limit);
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
