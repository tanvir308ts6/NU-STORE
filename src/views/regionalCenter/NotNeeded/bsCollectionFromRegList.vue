<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
    ></formDialog>
    <!--msg Section-->
    <v-snackbar dark top mt-5 v-model="snackbar" :multi-line="multiLine">
      {{ getMsg }}
      <v-btn color="red" dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Blank Script Collection From Reginal Center List</v-card-text
            >
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
          <v-spacer />
          <v-card-actions>
            <v-btn color="primary" dark @click="newItem">New Item</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getBsCollectionFromRegList"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.main_qty }}</td>
          <td class="text-xs">{{ props.item.loose_qty }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="text-xs">{{ props.item.regional_center_id }}</td>
          <td class="text-xs">{{ props.item.center_id }}</td>
          <td class="text-xs">{{ props.item.exam_id }}</td>
          <td class="text-xs">{{ getStatus(props.item.status) }}</td>
          <td class="justify-center ">
            <v-icon color="primary" class="mr-0" @click="editItem(props.item)">
              edit
            </v-icon>
          </td>
          <td class="justify-center ">
            <v-icon color="primary" @click="deleteItem(props.item)">
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/regionalCenter/bsCollectionFromRegForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      snackbar: false,
      multiLine: true,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id"
        },
        { text: "Main quantity", value: "main_qty" },
        { text: "Loose quantity", value: "loose_qty" },
        { text: "Date", value: "date" },
        { text: "Regional Center Id", value: "regional_center_id" },
        { text: "Center Id", value: "center_id" },
        { text: "Exam Id", value: "exam_id" },
        //{ text: "Reg_bs_dist_to_cen_id", value: "reg_bs_dist_to_cen_id" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        main_qty: "",
        loose_qty: "",
        date: "",
        regional_center_id: "",
        center_id: "",
        exam_id: ""
        /*reg_bs_dist_to_cen_id: "",
        status: "",
        created_by: "",
        updated_by: "",
        deleted_by: "",
        created_at: "",
        updated_at: ""*/
      }
    };
  },
  created() {
    this.$store.dispatch("fetchBsCollectionFromRegData");
  },
  computed: {
    getBsCollectionFromRegList() {
      return this.$store.getters.getBsCollectionFromReg;
    },
    getMsg() {
      return this.$store.getters.getBsCollectionFromRegMessage;
    }
  },
  methods: {
    getStatus(status) {
      var status = status == 1 ? "Yes" : "No";
      return status;
    },
    newItem() {
      this.formDialogStatus = true;
    },
    editItem(item) {
      this.editedIndex = this.getBsCollectionFromRegList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.newItem();
      //console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const id = item.id;
      var self = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("deleteBsCollectionFromRegItem", id)
          .then(function(data) {
            self.$store.dispatch("fetchBsCollectionFromRegData");
            self.snackbar = true;
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchBsCollectionFromRegData");
          });
    }
  }
};
</script>
