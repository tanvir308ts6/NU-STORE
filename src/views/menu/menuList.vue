<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
    ></formDialog>
    <v-container fluid>
      <v-card class="mx-5">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Menu List</v-card-text>
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
            ></v-text-field>
            <v-spacer />
            <v-card-actions>
              <v-btn @click="newItem" color="primary" dark>Create New Menu</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="getMenuDataList"
          :search="search"
          class="elevation-1"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>{{ props.index + 1 }}</td>
            <td class="text-xs title">{{ props.item.menu_name }}</td>
            <td class="text-xs">{{ props.item.sl_no }}</td>
            <td class="text-xs">{{ props.item.tag_name }}</td>
            <td class="text-xs">
              <v-icon>{{ props.item.icon}}</v-icon>
              <!-- {{ props.item.icon}} -->
            </td>
            <td class="text-xs">{{ getStatus(props.item.status)}}</td>
            <!-- <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.status == 0">Pending</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.status == 1">Received</v-chip>
            </td>-->
            <td class="justify-center text-xs-center">
              <v-item-group>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="primary" v-on="on">
                      <v-icon @click="editItem(props.item)" class="mr-0" color="white">edit</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                <v-tooltip right color="red">
                  <template v-slot:activator="{ on }">
                    <v-btn fab small color="red" v-on="on">
                      <v-icon @click="deleteItem(props.item)" color="white">delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-item-group>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/menu/menuForm.vue";
export default {
  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: -1,
      },
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "10",
          sortable: false,
        },
        { text: "Menu", value: "menu_name", sortable: false },
        { text: "SL. No", value: "sl_no", sortable: true },
        { text: "Tag Name", value: "tag_name", sortable: false },
        { text: "Icon", value: "icon", sortable: false },
        { text: "Active", value: "status", sortable: false },
        { text: "Action", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.$store.dispatch("fetchMenuData");
  },
  computed: {
    getMenuDataList() {
      return this.$store.getters.getMenuDataList;
    },
  },
  methods: {
    getStatus(status) {
      var status = status == 1 ? "Yes" : "No";
      return status;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        menu_name: "",
        sl_no: "",
        status: 1,
        menu_url: "",
        tag_name: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
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
      this.editedIndex = this.getMenuDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      //if (this.editedItem.status == "0") this.editedItem.status = 0;
      console.log("Edited item", this.editedItem);
      this.dialogOpen();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteMenuItem", id)
              .then(function (data) {
                self.$store.dispatch("fetchMenuData");
              })
              .catch(function (error) {
                console.log(error);
                self.$store.dispatch("fetchMenuData");
              });
          }
        });
    },
  },
};
</script>

<style scoped></style>
