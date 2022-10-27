<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
    ></formDialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Off Day List</v-card-text>
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
          ></v-text-field>
          <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Add Off Day</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getOffDayList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ getFormattedDate(props.item.date) }}</td>
          <td class="text-xs">{{ props.item.description }}</td>
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
import formDialog from "@/components/offDay/offDayForm.vue";
import * as moment from "moment";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      sl_count: -1,
      loading: false,
      dialog: false,
      loadData: false,
      formDialogStatus: false,
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Date Name", value: "date" },
        { text: "Description", value: "description" },
        { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.$store.dispatch("fetchCenLsDistToRegData");
  // },
  mounted() {
    //this.getDataFromApi();
  },
  watch: {
    pagination() {
      this.getDataFromApi();
    },
    // pagination: {
    //   handler() {
    //     this.getDataFromApi();
    //   },
    //   deep: true
    // },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    }
  },
  computed: {
    getOffDayList() {
      return this.$store.getters.getOffDayDataList;
    }
  },
  methods: {
    getFormattedDate(date) {
      try {
        return moment(date).format("YYYY-MMM-DD");
      } catch (ex) {
        console.log(ex);
      }
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        date: "",
        description: "",
        exam_code: "",
        year: "",
        created_at: "",
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
      this.$store.dispatch("fetchOffDayData", this.limit).then(data => {
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
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getOffDayList.indexOf(item);
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
              .dispatch("deleteOffDay", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchOffDayData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchOffDayData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
