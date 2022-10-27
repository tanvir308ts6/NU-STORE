<template>
  <v-container fluid>
    <!-- {{getNuLsCollFromRCList}} -->
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
            <v-card-text class="title"
              >Loose Script ( Unused ) Collection From Regional
              Center</v-card-text
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
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <!--    <v-btn @click="newItem" color="primary" dark>Create New LS Collection From RC</v-btn> -->
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getNuLsCollFromRCList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
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
          <td class="justify-center text-xs-center">
            <v-chip
              color="#EE3B00"
              text-color="white"
              v-if="props.item.status == 1"
              >Allocated</v-chip
            >
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 2"
              >Pending</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status == 3"
              >Received</v-chip
            >
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
              <v-tooltip right v-if="ifAdminUserType">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon
                      @click="deleteItem(props.item)"
                      class="mr-0"
                      color="white"
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
import commonFun from "@/mixin/common_function";
import formDialog from "@/components/nu/lsCollFromRcForm.vue";
export default {
  mixins: [commonFun],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      sl_count: 1,
      loadData: false,
      totalDataItems: 0,
      loading: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "center", value: "id", width: "10" },
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
  created() {
    this.$store.dispatch("fetchNuLsCollFromRCData");
  },
  mounted() {
    //this.getDataFromApi();
  },
  watch: {
    pagination() {
      this.getDataFromApi();
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    }
  },
  computed: {
    getNuLsCollFromRCList() {
      return this.$store.getters.getNuLsCollFromRCList;
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
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchNuLsCollFromRCData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        loose_qty: "",
        date: "",
        reg_center_code: "",
        reg_center_name: "",
        exam_name: "",
        exam_code: "",
        status: "",
        comment: "",
        exam_initiate_id: "",
        extra_packet_size: "",
        extra_quantity: "",
        main_packet_size: "",
        main_quantity: "",
        sender_id: "",
        total_packet: "",
        user_id: "",
        year: ""
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getNuLsCollFromRCList.indexOf(item);
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
              .dispatch("deleteNuLsCollFromRCItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchNuLsCollFromRCData", self.limit);
              })
              .catch(function(error) {
                self.setLimit();
                console.log(error);
                self.$store.dispatch("fetchNuLsCollFromRCData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
