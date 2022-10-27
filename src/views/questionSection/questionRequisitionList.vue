<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
    ></formDialog>

    <v-expansion-panel focusable>
      <v-expansion-panel-content class="mycustomExpansionPanel" v-if="forceRerenderFlag">
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
                    <v-btn color="primary" large @click="searchQuestionRequisitionList">Search</v-btn>
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
            <v-card-text class="title">Question Requisition</v-card-text>
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
            v-on:keyup.native.enter="getDataFromApi()"
          ></v-text-field>
          <!--   <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Question Requisition Entry</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>

      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getQuestionRequisitionDataList"
        item-key="item-key"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
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
import formDialog from "@/components/questionRequisitionForm/questionRequisitionForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
// watchMixin
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog,
  },
  data() {
    return {
      force: true,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      searchParam: {},
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Exam Name", value: "exam_name" },
        { text: "Exam Year", value: "exam_year" },
        { text: "Center Name", value: "center_name" },
        { text: "College Name", value: "college_name" },
        { text: "Subject Name", value: "subject_name" },
        { text: "Paper Name", value: "paper_name" },
        { text: "quantity", align: "center", value: "qty" },
        { text: "Action", align: "center", value: "id", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.ifSearchExam = true;
    this.ifSearchYear = true;
  },
  mounted() {
    this.getDataFromApi();
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      },
    },
  },
  computed: {
    getQuestionRequisitionDataList() {
      let arr = this.$store.getters.getQuestionRequisitionList;
      let customID = 0;
      arr.map((obj) => {
        obj.customID = customID;
        customID = customID + 1;
      });

      // there was no unique id in the data that was coming from the back-end, attaching a unique custom ID for vue to render it correctly . - sp

      return arr;
    },
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_code: "",
        session: "",
        exam_name: "",
        exam_year: "",
        center_code: "",
        center_name: "",
        college_code: "",
        college_name: "",
        subject_code: "",
        subject_name: "",
        paper_code: "",
        paper_name: "",
        qty: "",
        note: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      };
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search,
      };
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchQuestionRequisitionData", this.limit)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.editedItem.exam_year = this.getLoggedInYear.year;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getQuestionRequisitionDataList.indexOf(item);
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
              .dispatch("deleteQuestionRequisitionItem", id)
              .then(function (data) {
                self.setLimit();
                self.$store.dispatch(
                  "fetchQuestionRequisitionData",
                  self.limit
                );
              })
              .catch(function (error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch(
                  "fetchQuestionRequisitionData",
                  self.limit
                );
              });
          }
        });
    },
    searchQuestionRequisitionList() {
      this.$store
        .dispatch("searchQuestionRequisitionData", this.searchParam)
        .then(() => {
          //
        });
    },
  },
};
</script>

<style scoped></style>
