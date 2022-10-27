<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
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
                <v-autocomplete
                  disabled
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item => '(' + item.code + ') ' + item.title"
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
                      >{{
                        "(" + data.item.code + ") " + data.item.title
                      }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-select
                  disabled
                  name="year"
                  class="ma-2"
                  v-model="searchParam.year"
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
                <v-flex xs6>
                  <v-menu
                    ref="dateMenu1"
                    v-model="dateMenu1"
                    :close-on-content-click="true"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="searchParam.date"
                        label="Start Date"
                        hint="MM-DD-YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        v-validate="'required'"
                        :error-messages="errors.collect('date')"
                        data-vv-name="date"
                        required
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker
                      v-model="searchParam.date"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6>
                  <v-menu
                    ref="dateMenu2"
                    v-model="dateMenu2"
                    :close-on-content-click="true"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="searchParam.end_date"
                        label="End Date"
                        hint="MM-DD-YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        v-validate="'required'"
                        :error-messages="errors.collect('end_date')"
                        data-vv-name="end_date"
                        required
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker
                      v-model="searchParam.end_date"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchPVRoutineList"
                      >Search</v-btn
                    >
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
            <v-card-text class="title">Practical/Viva Routine List</v-card-text>
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
          <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark
              >Add Practical/Viva Routine</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getPVRoutineList"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">{{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">{{ props.item.seal_no }}</td>
          <td class="text-xs">{{ props.item.date }}</td>
          <td class="text-xs">{{ props.item.end_date }}</td>
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
import formDialog from "@/components/practicalVivaExam/pvRoutineForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {},
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      dateMenu1: false,
      dateMenu2: false,
      searchParam: {},
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Exam Name", value: "exam_name" },
        { text: "Exam Year", value: "year" },
        { text: "Seal No", value: "seal_no" },
        { text: "Start Date", value: "date" },
        { text: "End Date", value: "end_date" },

        { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  mounted() {
    this.getDataFromApi();
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    }
  },
  computed: {
    getPVRoutineList() {
      return this.$store.getters.getPVRoutineList;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        date: "",
        end_date: "",
        year: "",
        exam: "",
        exam_name: "",
        seal_no: "",
        type: "2",
        type_description: "",
        created_at: "",
        exam_initiate_id: "",
        updated_at: "",
        deleted_at: ""
      };
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search
      };
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("fetchPVRoutineData", this.limit).then(data => {
        this.loading = false;
        this.totalDataItems = data.meta.total;
      });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.editedItem.exam_code = this.getLoggedInExam.code;
      this.editedItem.year = this.getLoggedInYear.year;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getPVRoutineList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deletePVRoutineItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchPVRoutineData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchPVRoutineData", self.limit);
              });
          }
        });
    },
    searchPVRoutineList() {
      this.$store.dispatch("searchPVRoutineData", this.searchParam).then(() => {
        //
      });
    }
  }
};
</script>

<style scoped></style>
