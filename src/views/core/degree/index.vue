<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <v-card color="white">
          <formDialog
            :dialogStatus.sync="formDialogStatus"
            :editedData="editedItem"
            :indexEdited.sync="editedIndex"
          ></formDialog>
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Degree List</v-card-text>
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
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Item</v-btn
            >
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :search="search"
          :items="getSchema"
          class="elevation-1"
          :pagination.sync="pagination"
          style="white-space: nowrap"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.degree_code }}</td>
            <td class="text-xs-left">{{ props.item.degree_name }}</td>
            <td class="text-xs-left">
              {{ props.item.degree_title ? props.item.degree_title : "N/A" }}
            </td>
            <td class="text-xs-left">
              {{ props.item.status === "1" ? "Yes" : "No" }}
            </td>
            <td class="justify-left layout px-0">
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="editItem(props.item)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>
              <!--<v-btn fab dark small color="red">
                                <v-icon dark>delete</v-icon>
              </v-btn>-->
            </td>
          </template>
          <template v-slot:no-data></template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import formDialog from "@/components/core/degree/degreeForm.vue";

export default {
  components: {
    formDialog
  },
  data: () => ({
    dialog: false,
    formDialogStatus: false,
    search: "",
    pagination: {
      ascending: true,
      rowsPerPage: 10,
      page: 1
    },
    headers: [
      { text: "Degree Code", align: "left", value: "degree_code" },
      { text: "Degree Name", align: "left", value: "degree_name" },
      { text: "Degree Title", align: "left", value: "degree_title" },
      { text: "Status", align: "left", value: "status" },
      { text: "Actions", align: "left", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      degree_code: "",
      degree_name: "",
      degree_title: "",
      status: 1
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getDegreeData;
    }
  },

  created() {
    this.$store.dispatch("fetchDegreeList");
  },

  methods: {
    newItem() {
      this.formDialogStatus = true;
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
    }
  }
};
</script>

<style scoped></style>
