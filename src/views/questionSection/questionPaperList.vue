<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
    ></formDialog>
    <v-expansion-panel focusable v-if="forceRerenderFlag">
      <v-expansion-panel-content class="mycustomExpansionPanel">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3">
              <v-layout row wrap align-center class="py-3">
                <v-text-field
                  v-model="searchParam.session"
                  class="mt-3 ml-2"
                  name="rg_no"
                  label="Session"
                  prepend-icon="edit"
                ></v-text-field>
                <v-autocomplete
                  disabled
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item =>  item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-select
                  disabled
                  name="year"
                  class="ma-2"
                  v-model="searchParam.exam_year"
                  item-text="year"
                  item-value="year"
                  :items="getYearList"
                  menu-props="auto"
                  label="Select Year"
                  hide-details
                  v-validate="'required'"
                  :error-messages="errors.collect('year')"
                  data-vv-name="year"
                  required
                  prepend-icon="calendar_today"
                ></v-select>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.center_code"
                  :items="getCenterList"
                  :item-text="item =>  item.center_code + ' - ' + item.center_name"
                  item-value="center_code"
                  label="Select Center"
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.center_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.center_code + ' - ' + data.item.center_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html=" data.item.center_code + ' - ' + data.item.center_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchQuestionPaperList">Search</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Question Packet Info</v-card-text>
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
            <v-btn @click="newItem" color="primary" dark>Create New Question Entry</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getQuesEntryDataList"
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
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.exam_year }}</td>
          <td class="text-xs">{{ props.item.center_name }}</td>
          <td class="text-xs">{{ props.item.college_name }}</td>
          <td class="text-xs">{{ props.item.subject_name }}</td>
          <td class="text-xs">{{ props.item.paper_name }}</td>
          <td class="text-xs">{{ props.item.qty }}</td>
          <td class="text-xs">{{ props.item.size }}</td>
          <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.status == 0">Inactive</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.status == 1">Active</v-chip>
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
import formDialog from "@/components/questionPaper/questionPaperEntryForm.vue";
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
      searchParam: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Exam", value: "exam_name" },
        { text: "Year", value: "exam_year" },
        { text: "Center ", value: "center_name" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_name" },
        { text: "Paper", value: "paper_name" },
        { text: "Quantity", value: "qty" },
        { text: "Packet Size", value: "size" },
        { text: "Status", align: "center", value: "status" },
        { text: "Action", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.$store.dispatch("fetchQuesEntryData");
    this.ifSearchExam = true;
    this.ifSearchYear = true;
  },
  computed: {
    getQuesEntryDataList() {
      return this.$store.getters.getQuesEntryDataList;
    },
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        college_code: "",
        subject_code: "",
        paper_code: "",
        center_code: "",
        session: "",
        qty: "",
        size: "",
        exam_code: "",
        exam_year: "",
        status: "",
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
      //Get & Set Seleccted exam to New Schema
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.editedItem.exam_year = this.getLoggedInYear.year; // this line
    },
    editItem(item) {
      this.editedIndex = this.getQuesEntryDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      console.log("dele meth", id);
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteQuesEntryItem", id)
              .then(function (data) {
                self.$store.dispatch("fetchQuesEntryData");
              })
              .catch(function (error) {
                console.log(error);
                self.$store.dispatch("fetchQuesEntryData");
              });
          }
        });
    },
    searchQuestionPaperList() {
      this.$store
        .dispatch("searchQuestionPaperData", this.searchParam)
        .then(() => {
          //
        });
    },
  },
};
</script>

<style scoped></style>
