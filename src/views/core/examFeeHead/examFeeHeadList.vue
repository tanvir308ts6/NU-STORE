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
              <v-card-text class="title">Exam Fee Head</v-card-text>
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

        <v-data-table :headers="headers" :items="getSchema" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.fee_title }}</td>
            <td class="text-xs-left">{{ props.item.fee_type }}</td>
            <td class="text-xs-left">{{ props.item.credit }}</td>
            <td class="text-xs-left">{{ props.item.amount }}</td>
            <td class="text-xs-center">
              {{ props.item.status == 1 ? "Yes" : "No" }}
            </td>
            <td class="justify-center layout px-0">
              <v-btn
                color="primary"
                fab
                small
                dark
                @click="editItem(props.item)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data></template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import formDialog from "@/components/core/examFeeHead/Form.vue";

export default {
  components: {
    formDialog
  },
  data: () => ({
    formDialogStatus: false,
    search: "",

    headers: [
      { text: "SL", align: "center", sortable: false, value: "index" },
      { text: "Fee Title", align: "left", value: "fee_title" },
      { text: "Fee Type", align: "left", value: "fee_type" },
      { text: "Course Credit", align: "left", value: "credit" },
      { text: "Fee Amount", align: "left", value: "amount" },
      { text: "Status", align: "center", value: "status" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],

    editedIndex: -1,
    editedItem: ""
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getExamFeeHeadData;
    }
  },

  created() {
    this.$store.dispatch("fetchCoreExamFeeHeadList");
  },

  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        fee_title: "",
        fee_type: "",
        credit: "",
        amount: "",
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
