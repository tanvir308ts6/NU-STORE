<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
    ></formDialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Answer Script Distribution To ReginalCenter List</v-card-text
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
        :items="getAnsDistributionToRegList"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.script_qty }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="text-xs">{{ props.item.regional_center_id }}</td>
          <td class="text-xs">{{ props.item.center_id }}</td>
          <td class="text-xs">{{ props.item.exam_id }}</td>
          <td class="text-xs">{{ getStatus(props.item.status) }}</td>
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
import formDialog from "@/components/regionalCenter/ansDistributionToRegForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id"
        },
        { text: "Script quantity", value: "script_qty" },
        { text: "Date", value: "date" },
        { text: "Regional Center Id", value: "regional_center_id" },
        { text: "Center Id", value: "center_id" },
        { text: "Exam Id", value: "exam_id" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {
    this.$store.dispatch("fetchAnsDistributionToRegData");
  },
  computed: {
    getAnsDistributionToRegList() {
      return this.$store.getters.getAnsDistributionToReg;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        script_qty: "",
        date: "",
        regional_center_id: "",
        center_id: "",
        exam_id: ""
        /*
        status: "",
        created_by: "",
        updated_by: "",
        deleted_by: "",
        created_at: "",
        updated_at: ""*/
      };
    },
    getStatus(status) {
      var status = status == 1 ? "Yes" : "No";
      return status;
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getAnsDistributionToRegList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      //console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const id = item.id;
      var self = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("deleteAnsDistributionToRegItem", id)
          .then(function(data) {
            self.$store.dispatch("fetchAnsDistributionToRegData");
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchAnsDistributionToRegData");
          });
    }
  }
};
</script>
