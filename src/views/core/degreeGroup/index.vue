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
              <v-card-text class="title">Degree Group List</v-card-text>
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
        >
          <template v-slot:items="props">
            <td class="text-xs-left font-weight-bold">
              <v-chip v-if="props.item.degree">
                <v-avatar class="blue-grey lighten-2">{{
                  props.item.degree_code
                }}</v-avatar>
                {{ props.item.degree.degree_name }}
              </v-chip>
            </td>
            <td class="text-xs-left font-weight-bold">
              <v-chip>
                <v-avatar class="blue-grey lighten-2">{{
                  props.item.degree_group_code
                }}</v-avatar>
                {{ props.item.degree_group_name }}
              </v-chip>
            </td>
            <td class="text-xs-left font-weight-bold">
              {{
                props.item.degree_group_title
                  ? props.item.degree_group_title
                  : "N/A"
              }}
            </td>
            <td class="text-xs-center">
              {{ props.item.status === "1" ? "Yes" : "No" }}
            </td>
            <td class="justify-center layout px-0">
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
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import formDialog from "@/components/core/degreeGroup/degreeGroupForm.vue";

export default {
  components: {
    formDialog
  },

  data() {
    return {
      dialog: false,
      formDialogStatus: false,
      search: "",
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      },
      headers: [
        { text: "Degree Code & Name", width: "30%", value: "degree_code" },
        {
          text: "Degree Group Code & Name",
          width: "30%",
          value: "degree_group_name"
        },
        { text: "Degree Group Title", value: "degree_group_title" },
        { text: "Status", align: "center", value: "status" },
        { text: "Actions", align: "center", value: "name", sortable: false }
      ],

      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },

  computed: {
    getSchema() {
      return this.$store.getters.getDegreeGroupData;
    }
  },

  created() {
    this.$store.dispatch("fetchDegreeGroupList");
  },

  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        degree_code: "",
        degree_group_code: "",
        degree_group_name: "",
        degree_group_title: "",
        status: 1
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
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
    }
  }
};
</script>

<style scoped></style>
