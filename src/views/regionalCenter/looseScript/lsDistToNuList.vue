<template>
  <v-container fluid>
    <!-- {{getRegLsDistToNuDataList}}   -->
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
            <!-- <v-card-text class="title">Loose Script Delivery To NU</v-card-text> -->
            <v-card-text class="title"
              >Unused Blank Script Delivery To NU</v-card-text
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
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark
              >Create New Loose Script Delivery To NU</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getRegLsDistToNuDataList"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-left">
            ({{ props.item.reg_center_code }}){{ props.item.reg_center_name }}
          </td>
          <td class="text-xs-left">
            ({{ props.item.center_code }}){{ props.item.center_name }}
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
          <!--  <td class="text-xs">Exam{{ props.item.exam_id }}</td> -->

          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 0"
              >Allocated</v-chip
            >
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.status == 1"
              >Pending</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.status == 2"
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
        <template v-slot:no-data>
          <v-alert outline :value="true" color="primary" icon="info"
            >Sorry, nothing to display here</v-alert
          >
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/regionalCenter/lsDistToNuForm.vue";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {},
      totalDataItems: 0,
      loading: true,
      loadData: false,
      dialog: false,

      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Regional Center", value: "reg_center_code" },
        { text: "Center", value: "center_code" },
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
  //   this.$store.dispatch("fetchRegLsDistToNuData");
  // },
  mounted() {
    //this.getDataFromApi();
  },
  computed: {
    getRegLsDistToNuDataList() {
      return this.$store.getters.getRegLsDistToNuDataList;
    },
    getSchema() {
      return this.$store.getters.getRegLsDistToNuSchema;
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
    unSetEditedData() {
      this.editedItem = {
        id: "",
        loose_qty: "",
        date: "",
        reg_center_code: "",
        center_code: "",
        main_packet_size: "",
        main_quantity: "",
        extra_packet_size: "",
        extra_quantity: "",
        total_packet: "",
        comment: "",
        sender_id: "",
        exam_initiate_id: "",
        exam_code: "",
        year: "",
        user_id: "",
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
      this.$store.dispatch("fetchRegLsDistToNuData", this.limit).then(data => {
        this.loading = false;
        this.totalDataItems = data.meta.total;
      });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.editedItem.exam_id = this.getLoggedInExam.code;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getRegLsDistToNuDataList.indexOf(item);
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
              .dispatch("deleteRegLsDistToNuItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchRegLsDistToNuData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchRegLsDistToNuData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
