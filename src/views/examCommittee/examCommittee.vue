<template>
  <v-container fluid>
    <!-- {{getExamCommitteeItem}} -->
    <!-- {{getExamCommitteeItem}} -->
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :snackbar.sync="snackbar"
      :loadData.sync="loadData"
    ></formDialog>
    <v-dialog v-model="centerExamCommitteeMembersDetailDialog" width="800">
      <!-- <centerDetail></centerDetail> -->
      <examCommitteeMembers :currentItem="currentItem"></examCommitteeMembers>
    </v-dialog>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Exam Committee List</v-card-text>
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
              >New Exam Committee</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getExamCommitteeItem"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.year }}</td>

          <td class="text-xs-center">
            <!-- <v-card> -->
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
            <!-- </v-card> -->
          </td>
          <!-- <td class="text-xs-center">{{ props.item.title }}</td> -->
          <!--  <td class="text-xs">{{ props.item.description }}</td> -->

          <td class="text-xs-center">
            <v-btn color="white" @click="showMembers(props.item)" class="mr-0"
              >Members</v-btn
            >
          </td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip top>
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
import formDialog from "@/components/examCommittee/examCommitteeForm.vue";
import examCommitteeMembers from "@/components/examCommittee/examCommitteeMembers.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    formDialog,
    examCommitteeMembers
  },

  data() {
    return {
      pagination: {},
      centerExamCommitteeMembersDetailDialog: false,
      currentItem: [],
      snackbar: false,
      multiLine: true,
      totalDataItems: 0,
      loading: true,
      loadData: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Exam Committee", align: "center", value: "name" },
        { text: "Exam Year", align: "center", value: "year" },
        { text: "Exam Name", align: "center", value: "id" },
        { text: "Members", align: "center", value: "id" },
        { text: "Action", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.$store.dispatch("callExamCommitteeData");
  // },
  mounted() {
    this.ifExamSchema = true;
    this.ifYearSchema = true;
    this.getDataFromApi();
  },
  computed: {
    getSchema() {
      return this.$store.getters.getExamCommitteeSchema;
    },
    getExamCommitteeItem() {
      return this.$store.getters.getExamCommitteeList;
    }
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
  methods: {
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
      this.$store.dispatch("callExamCommitteeData", this.limit).then(data => {
        this.loading = false;
        this.totalDataItems = data.meta.total;
      });
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        name: "",
        designation: "",
        mobile: "",
        code: "",
        updated_at: "",
        deleted_at: "",
        members: []
      };
    },
    showMembers(curItem) {
      this.currentItem = curItem.members;
      this.centerExamCommitteeMembersDetailDialog = true;
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
      this.editedIndex = this.getExamCommitteeItem.indexOf(item);
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
              .dispatch("deleteExamCommitteeItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("callExamCommitteeData", self.limit);
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("callExamCommitteeData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped>
.Pending {
  background-color: #fb8c00;
  color: white;
}
.Received {
  background-color: #388e3c;
  color: white;
}

/* :rows-per-page-items="[25,50,100 ,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]" */
</style>
