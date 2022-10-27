<template>
  <v-container fluid>
    <bsDistributeDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
    ></bsDistributeDialog>

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
              >Blank Script Distribution List</v-card-text
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
        :items="getBlankScriptDistributeList"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[
          25,
          50,
          100,
          { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
        ]"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.main_qty }}</td>
          <td class="text-xs">{{ props.item.loose_qty }}</td>
          <td class="text-xs">{{ props.item.center_id }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="text-xs">{{ props.item.exam_id }}</td>

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
import bsDistributeDialog from "@/components/regionalCenter/blankScriptDistributionForm.vue";
export default {
  components: {
    bsDistributeDialog
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
        { text: "Main Quantity", value: "main_qty" },
        { text: "Loose Quantity", value: "loose_qty" },
        { text: "Center Id", value: "center_id" },
        { text: "Date", value: "date" },
        { text: "Exam Id", value: "exam_id" },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        main_qty: "",
        loose_qty: "",
        center_id: "",
        date: "",
        exam_id: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        created_by: "",
        updated_by: "",
        deleted_by: ""
      }
    };
  },
  created() {
    this.$store.dispatch("callBlankScriptDistributeData");
  },
  computed: {
    getBlankScriptDistributeList() {
      return this.$store.getters.getBlankScriptDistributeItem;
    },
    getMsg() {
      return this.$store.getters.getBlankScriptDistributeMessage;
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.getBlankScriptDistributeList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.newItem();
      console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const index = item.id;
      var self = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("deleteBlankScriptDistributeItem", index)
          .then(function(data) {
            self.$store.dispatch("callBlankScriptDistributeData");
            self.snackbar = true;
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("callBlankScriptDistributeData");
          });
    },
    newItem() {
      this.formDialogStatus = true;
    }
  }
};
</script>
