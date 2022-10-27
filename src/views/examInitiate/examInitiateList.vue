<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :getDataFromApi.sync="getDataFromApi"
    ></formDialog>
    <!-- <v-card v-if="publishState==1">
      <v-alert :value="true" type="info">Exam Initiate Published</v-alert>
    </v-card>-->
    <!-- :style="getPublishedStyle" -->
    <div>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Exam Initiate </v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <!-- <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
            v-on:keyup.native.enter="getDataFromApi()"
            ></v-text-field>-->
            <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
            </v-btn>-->
            <v-spacer />
            <v-card-actions>
              <v-btn @click="newItem" color="primary" dark
                >New Exam Initiate</v-btn
              >
              <!-- <v-btn color="primary" @click="publishExamInitiate()">
                <div>Exam Initiate Publish</div>
              </v-btn>-->
            </v-card-actions>
          </v-layout>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="getExamInitiateItem"
          class="elevation-1"
          :total-items="pagination.totalItems"
          :loading="loading"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td>{{ props.index + 1 }}</td>
            <td class="text-xs">{{ props.item.exam_name }}</td>
            <td class="text-xs">{{ props.item.year }}</td>
            <td class="justify-center text-xs-center">
              <v-chip
                color="#388E3C"
                text-color="white"
                v-if="props.item.exam_type == 1"
                >General/Regular</v-chip
              >
              <v-chip
                color="#EE3B00"
                text-color="white"
                v-if="props.item.exam_type == 2"
                >Special</v-chip
              >
            </td>

            <!-- <td class="text-xs">{{ props.item.session }}</td> -->

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
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/examInitiate/examInitiateForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog
  },
  data() {
    return {
      loading: false,
      publishState: 0,
      search: "",
      sl_count: 0,
      searchParam: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },

      dialog: false,
      formDialogStatus: false,
      limit: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "10",
          sortable: false
        },
        { text: "Exam Name", value: "exam_name", sortable: false },
        { text: "Year", value: "year", sortable: false },
        {
          text: "Exam Type",
          align: "center",
          value: "exam_type",
          sortable: false
        },

        // { text: "Session", value: "session" },
        { text: "Actions", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {
    
    // this.$store.dispatch("callExamInitiateData");
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.tag = "ExamInitiate";
    param.status = "1";
     param.limit = -1;
    this.$store.dispatch("publishActivity", param).then(data => {
      this.publishState = data.publish_status;
    });
    this.$store.dispatch("fetchYearData", param);
  },
  // mounted() {
  // 	this.getDataFromApi();
  // },
  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },
  computed: {
    getExamInitiateItem() {
      return this.$store.getters.getExamInitiateList;
    },
    getPublishedStyle() {
      if (this.publishState == 1) {
        return "pointer-events: none;opacity: 0.5;";
      }
    }
  },
  methods: {
    publishExamInitiate() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "ExamInitiate";
      this.$store.dispatch("publishActivity", param);
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_code: "",
        exam_name: "",
        exam_type: "",
        session: "",
        exam_type_name: "",
        year: "",
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("callExamInitiateData", this.searchParam)
        .then(data => {
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
      //this.editedItem.exam_id = this.getLoggedInExam.code;
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getExamInitiateItem.indexOf(item);
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
              .dispatch("deleteExamInitiateItem", id)
              .then(function() {
                self.getDataFromApi();
              })
              .catch(function(error) {
                console.log(error);

                self.getDataFromApi();
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
