<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :searchAnswerScriptList="searchAnswerScriptList"
    ></formDialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Ans Script Delivery To Examiner</v-card-text
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
          ></v-text-field>-->
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark
              >Create New Ans Delivery To Examiner</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getRegAsDistToExamDataList"
        :search="search"
        class="elevation-1"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-left">
            ({{ props.item.reg_center_code }}){{ props.item.reg_center_name }}
          </td>
          <td class="text-xs-left">
            ({{ props.item.examiner_code }}){{ props.item.examiner_name }}
          </td>
          <td class="text-xs-left">
            ({{ props.item.exam_code }}){{ props.item.exam_name }}
          </td>
          <td class="text-xs-center">{{ props.item.main_packet_size }}</td>
          <!-- <td class="text-xs-center">{{ props.item.extra_packet_size }}</td> -->
          <td class="text-xs-center">{{ props.item.main_quantity }}</td>
          <!-- <td class="text-xs-center">{{ props.item.extra_quantity }}</td> -->
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
              <!-- <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white">delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>-->
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/regionalCenter/RegAsDistToExamForm.vue";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonGet, watchMixin, common_login_getters],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      searchParam: {},
      loading: false,
      sl_count: 1,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id" },
        { text: "Regional Center", value: "reg_center_code" },
        { text: "Examiner", value: "examiner_code" },
        { text: "Exam Name", value: "exam_code" },
        { text: "Main Packet Size", value: "main_packet_size" },
        // { text: "Extra Packet Size", value: "extra_packet_size" },
        { text: "Main Quantity", value: "main_quantity" },
        // { text: "Extra Quantity", value: "extra_quantity" },
        { text: "Total Packet", value: "total_packet" },
        {
          text: "Date",
          value: "date"
        },
        { text: "Comments", value: "comment" },
        { text: "Status", align: "center", value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  watch: {
    pagination() {
      this.searchAnswerScriptList();
    }
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifRegionalUser) {
      this.searchParam.reg_center_code = this.getAuthUser.regional_center.regional_center_code;
    }
    this.$store.commit("UNSET_FORMNOTIFY");
    //this.$store.dispatch("callRegAsDistToExamData");
  },
  computed: {
    getRegAsDistToExamDataList() {
      return this.$store.getters.getRegAsDistToExamDataList;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        script_qty: "",
        date: "",
        reg_center_code: "",
        reg_center_name: "",
        examiner_code: "",
        exam_name: "",
        exam_code: "",
        status: 0,
        created_at: "",
        updated_at: "",
        deleted_at: "",
        examiner_name: "",
        comment: "",
        exam_initiate_id: "",
        extra_packet_size: "",
        extra_quantity: 0,
        main_packet_size: "",
        main_quantity: "",
        sender_id: "",
        total_packet: "",
        user_id: "",
        year: ""
      };
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchAnswerScriptList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("callRegAsDistToExamData", this.searchParam)
        .then(data => {
          console.log("this.searchParam", this.searchParam);
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
      //Get & Set Seleccted exam to New Schema
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.editedItem.year = this.getLoggedInYear.year; // this line
    },
    editItem(item) {
      this.editedIndex = this.getRegAsDistToExamDataList.indexOf(item);
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
              .dispatch("deleteRegAsDistToExamItem", id)
              .then(function() {
                self.searchAnswerScriptList();
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.searchAnswerScriptList();
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
