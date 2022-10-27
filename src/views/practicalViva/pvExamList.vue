<template>
  <v-container fluid>
    <div>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :snackbar.sync="snackbar"
      ></formDialog>
      <!--msg Section-->
      <v-snackbar dark top mt-5 v-model="snackbar" :multi-line="multiLine">
        {{ getMsg }}
        <v-btn color="red" dark text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Practical Viva Exam List</v-card-text>
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
          :items="getPracticalVivaExamList"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs">{{ props.item.exam_name }}</td>
            <td class="text-xs">{{ props.item.exam_date }}</td>
            <td class="text-xs">{{ props.item.center_id }}</td>
            <td class="text-xs">{{ props.item.center_name }}</td>
            <td class="text-xs">{{ props.item.college_code }}</td>
            <td class="justify-center">
              <v-icon color="primary" class="mr-0" @click="editItem(props.item)"
                >edit</v-icon
              >
            </td>
            <td class="justify-center">
              <v-icon color="primary" @click="deleteItem(props.item)"
                >delete</v-icon
              >
            </td>
          </template>
        </v-data-table>
      </v-container>
    </div>
    <div class="text-xs-center">
      <v-btn
        color="red lighten-2"
        dark
        @click="mailDialogStatus = !mailDialogStatus"
        >Mail</v-btn
      >
      <composeMail :dialogStatus.sync="mailDialogStatus"></composeMail>
    </div>
    <pre> {{ getPracticalVivaExamList }} </pre>
  </v-container>
</template>

<script>
import formDialog from "@/components/practicalVivaExam/practicalVivaExamForm.vue";
import composeMail from "@/components/utils/composeMail.vue";
export default {
  components: {
    formDialog,
    composeMail
  },
  data() {
    return {
      mailDialogStatus: false,
      snackbar: false,
      multiLine: true,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        {
          text: "ID",
          align: "left",
          value: "id"
        },
        { text: "Exam Name", value: "exam_name" },
        { text: "Exam Date", value: "exam_date" },
        { text: "Center Id", value: "center_id" },
        { text: "Center Name", value: "center_name" },
        { text: "College Code", value: "college_code" },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        exam_name: "",
        exam_date: "",
        center_id: "",
        center_name: "",
        college_code: "",
        created_by: "",
        updated_by: "",
        deleted_by: "",
        created_at: "",
        updated_at: ""
      }
    };
  },
  watch: {
    mailDialogStatus(val) {
      console.log("mailDialogStatus", val);
    }
  },
  created() {
    this.$store.dispatch("callPracticalVivaExamData");
  },
  computed: {
    getPracticalVivaExamList() {
      return [
        {
          // might
          id: "01",
          exam_code: "101",
          exam_name: "test",
          exam_year: "2017",
          exam_inisiate_id: "23",
          //must
          std_name: "Kamal jamal",
          std_roll: "0101",
          std_reg: "01010",
          session: "11-12",
          college_code: "112",
          college_name: "",
          center_code: "102",
          center_naem: "",
          subject_code: "10",
          subject_name: "",
          paper_code: "102",
          paper_name: ""
        }
      ];
      // return this.$store.getters.getPracticalVivaExam;
    },
    getMsg() {
      return this.$store.getters.getPracticalVivaExamMessage;
    }
  },
  methods: {
    newItem() {
      this.formDialogStatus = true;
    },
    editItem(item) {
      this.editedIndex = this.getPracticalVivaExamList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.newItem();
      //console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const id = item.id;
      var self = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("deletePracticalVivaExamItem", id)
          .then(function(data) {
            self.$store.dispatch("callPracticalVivaExamData");
            self.snackbar = true;
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("callPracticalVivaExamData");
          });
    }
  }
};
</script>
