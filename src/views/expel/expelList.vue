<template>
  <v-container fluid>
    <formDialog :dialogStatus.sync="formDialogStatus" :editedData="editedItem" :indexEdited.sync="editedIndex"></formDialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Explanation List</v-card-text>
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
            <v-btn @click="newItem" color="primary" dark>Add New Student to explanation list</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getExpelDataList"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.student_name }}</td>
          <td class="text-xs">{{ props.item.college_code }} - {{ props.item.college_name }}</td>
          <td class="text-xs">{{ props.item.exam_code }} - {{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">{{ props.item.expel_date }}</td>
          <td class="text-xs">{{ props.item.punishment_start }}</td>
          <td class="text-xs">{{ props.item.punishment_end }}</td>
          <td class="text-xs">{{ props.item.remarks }}</td>
          <td class="justify-center text-xs-center">
            <v-chip color="#388E3C" text-color="white" v-if="props.item.status == 0">Inactive</v-chip>
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.status == 1">Active</v-chip>
          </td>
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
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/expel/expelForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 25,
      },
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Reg No", value: "reg_no" },
        { text: "Student Name", value: "student_name" },
        { text: "College", value: "college_code" },
        { text: "Exam", value: "exam_code" },
        { text: "Course Code", value: "paper_code" },
        { text: "Year", value: "year" },
        { text: "Expel Date", value: "expel_date" },
        { text: "Punishment Start", value: "punishment_start" },
        { text: "Punishment End", value: "punishment_end" },
        { text: "Remarks", value: "remarks" },
        { text: "Status", align: "center", value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1, 
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.$store.dispatch("fetchExpelDataList");

  },

  computed: {
    getExpelDataList() {
      return this.$store.getters.getExpelDataList;
    },
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {        
        reg_no: "",
        exam_code: "",
        paper_code: "",
        year: "",
        expel_date: "",
        punishment_start: "",
        punishment_end: "",
        remarks: "",
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
      //Get & Set Seleccted exam to New Schema
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.editedItem.year = this.getLoggedInYear.year; // this line
    },
    editItem(item) {
      this.editedIndex = this.getExpelDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
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
              .dispatch("deleteExpelItem", id)
              .then(function (data) {
                self.$store.dispatch("fetchExpelDataList");
              })
              .catch(function (error) {
                console.log(error);
                self.$store.dispatch("fetchExpelDataList");
              });
          }
        });
    },
  },
};
</script>

<style scoped></style>
