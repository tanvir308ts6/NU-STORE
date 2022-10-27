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
            <v-card-text class="title"
              >Loose Script Delivery To Regional Center(Unused)</v-card-text
            >
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
            <v-btn @click="newItem" color="primary" dark
              >Create New Loose Script Distribution To RC</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getCenLsDistToRegDataList"
        :search="search"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <!-- <td class="text-xs">{{ props.item.loose_qty }}</td>
          <td class="text-xs">{{ props.item.regional_center_id }}</td>
          <td class="text-xs">{{ props.item.reg_center_name }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="text-xs">{{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.comments }}</td>
          <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.status == 0">Pending</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.status == 1">Received</v-chip>
          </td>-->

          <!-- new requirement -->
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
              >Sent</v-chip
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
  </v-container>
</template>

<script>
import formDialog from "@/components/center/lsDistToRegForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        // { text: "Loose quantity", value: "loose_qty" },
        // { text: "Regional Center ID", value: "regional_center_id" },
        // { text: "Regional Center", value: "reg_center_name" },
        // { text: "Date", value: "date" },
        // { text: "Exam Name", value: "exam_name" },
        // { text: "Comments", value: "comments" },
        // { text: "Status", align: "center", value: "status" },
        // { text: "Action", align: "center", value: "id", sortable: false }

        //new requirement after api done
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
  //   this.$store.dispatch("fetchCenLsDistToRegData");
  // },
  mounted() {
    this.getDataFromApi();
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
    getCenLsDistToRegDataList() {
      return this.$store.getters.getCenLsDistToRegDataList;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        // loose_qty: "",
        // date: "",
        // regional_center_id: "",
        // center_id: "",
        // status: 0,
        // exam_id: "",
        // comments: "",
        // created_at: "",
        // updated_at: "",
        // deleted_at: ""

        //new requirement after api done
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
      this.$store.dispatch("fetchCenLsDistToRegData", this.limit).then(data => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.totalDataItems = data.meta.total;
      });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.editedItem.year = this.getLoggedInYear.year;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getCenLsDistToRegDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log("edit item", this.editedItem);
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
              .dispatch("deleteCenLsDistToRegItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchCenLsDistToRegData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchCenLsDistToRegData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
