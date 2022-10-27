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
              >Answer Script Collection List</v-card-text
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
        :items="getAnsScriptCollectionList"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.script_qty }}</td>
          <td class="text-xs">{{ props.item.center_id }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="text-xs">{{ props.item.exam_id }}</td>
          <td class="text-xs">{{ props.item.subject_id }}</td>
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
import formDialog from "@/components/regionalCenter/answerScriptCollectionForm.vue";
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
        { text: "Center Id", value: "center_id" },
        { text: "Date", value: "date" },
        { text: "Exam Id", value: "exam_id" },
        { text: "Subject Id", value: "subject_id" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        script_qty: "",
        center_id: "",
        date: "",
        exam_id: "",
        subject_id: "",
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
    this.$store.dispatch("callAnsScriptCollectionData");
  },
  computed: {
    getAnsScriptCollectionList() {
      return this.$store.getters.getAnsScriptCollection;
    }
  },
  methods: {
    newItem() {
      this.formDialogStatus = true;
    },
    editItem(item) {
      this.editedIndex = this.getAnsScriptCollectionList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.newItem();
      console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const id = item.id;
      var self = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("deleteAnsScriptCollectionItem", id)
          .then(function(data) {
            self.$store.dispatch("callAnsScriptCollectionData");
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("callAnsScriptCollectionData");
          });
    }
  }
};
</script>
