<template>
  <v-container fluid>
    <div>
      <!-- Search Panel -->
      <v-container fluid>
        <v-card color="white">
          <formDialog
            :dialogStatus.sync="formDialogStatus"
            :editedItem="editedItem"
            :editedIndex.sync="editedIndex"
          ></formDialog>
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Rules List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Item</v-btn
            >
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
          style="white-space: nowrap;"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.rule }}</td>
            <td class="text-xs-left">{{ props.item.expire_date }}</td>
            <td class="text-xs-left">
              {{ props.item.student_panel === "1" ? "Yes" : "No" }}
            </td>
            <td class="text-xs-left">
              {{ props.item.college_panel === "1" ? "Yes" : "No" }}
            </td>
            <td class="text-xs-left">
              {{ props.item.college_user_panel === "1" ? "Yes" : "No" }}
            </td>
            <td class="text-xs-left">
              {{ props.item.center_panel === "1" ? "Yes" : "No" }}
            </td>
            <!--
            <td class="text-xs-left">
              <v-chip v-if="props.item.degree">
                ({{ props.item.degree.degree_code }})
                {{ props.item.degree.degree_name }}
              </v-chip>
            </td>
            <td class="text-xs-left">
              <v-chip v-if="props.item.degree_group">
                ({{ props.item.degree_group.degree_group_code }})
                {{ props.item.degree_group.degree_group_name }}
              </v-chip>
            </td>
            <td class="text-xs-left">
              <v-chip v-if="props.item.subject">
                ({{ props.item.subject.subject_code }})
                {{ props.item.subject.subject_name }}
              </v-chip>
            </td>
            -->
            <td class="text-xs-left">
              {{ props.item.status == 1 ? "Active" : "In Active" }}
            </td>
            <td class="justify-left layout px-0">
              <v-btn
                color="primary"
                fab
                small
                dark
                @click="editItem(props.item)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="error"
                fab
                small
                dark
                @click="deleteItem(props.item.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/instruction/rulesForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      formDialogStatus: false,
      headers: [
        { text: "SL", align: "left", sortable: false, value: "index" },
        { text: "Rule", align: "left", value: "rule" },
        { text: "Expire Date", align: "left", value: "expire_date" },
        { text: "Student Panel", align: "left", value: "student_panel" },
        { text: "College Panel", align: "left", value: "college_panel" },
        {
          text: "College User Panel",
          align: "left",
          value: "college_user_panel"
        },
        { text: "Center Panel", align: "left", value: "center_panel" },
        // { text: "Degree", align: "left", value: "degree_code" },
        // { text: "Degree Goup", align: "left", value: "degree_group_code" },
        // { text: "Subject", align: "left", value: "degree_group_code" },
        { text: "Status", align: "left", value: "status" },
        { text: "Actions", align: "left", value: "name", sortable: false }
      ],
      editedIndex: "",
      editedItem: this.unSetEditedData(),
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      },
      loading: false
      // searchParam: {
      //   'degree_group_code' : '',
      //   'subject_code': ''
      // }
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.getInstRulesList;
    }
  },

  methods: {
    dialogOpen() {
      this.formDialogStatus = true;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        title: "",
        attachment: "",
        expire_date: "",
        student_panel: "",
        college_panel: "",
        college_user_panel: "",
        center_panel: "",
        examineer_panel: "",
        status: ""
      };
    },
    newItem() {
      this.editedIndex = 0;
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = 1;
      //this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
    },
    deleteItem(id) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteRule", { id: id })
              .then(function() {
                self.$store.dispatch("getInstRulesList");
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(() => {
                self.$store.dispatch("getInstRulesList");
              });
          }
        });
    }
  },

  mounted() {
    this.$store.dispatch("getInstRulesList");
  }
};
</script>

<style></style>
