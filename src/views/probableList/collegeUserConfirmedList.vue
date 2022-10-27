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
            <v-card-text class="title">Confirm Data</v-card-text>
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
          <!-- <v-card-actions>
            <v-btn @click="submit" color="info" dark>Submit</v-btn>
          </v-card-actions>-->
        </v-layout>
      </v-card>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="getMasterExam.form_fill_up"
        :pagination.sync="pagination"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:headers="props">
          <tr>
            <!-- <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
            </th>-->
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="[
                'column sortable',
                pagination.descending ? 'desc' : 'asc',
                header.value === pagination.sortBy ? 'active' : ''
              ]"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr
            :active="props.selected"
            @click="props.selected = !props.selected"
          >
            <!-- <td>
              <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
            </td>-->
            <td>{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.std_id }}</td>
            <td class="text-xs-right">{{ props.item.reg_no }}</td>
            <td class="text-xs-left">
              <span
                v-for="(paper, index) in props.item.details"
                :key="paper.id"
                >{{
                  paper.confirm_paper
                    ? index
                      ? ` ,${paper.paper_code}`
                      : paper.paper_code
                    : ""
                }}</span
              >
            </td>
            <td class="text-xs-right">{{ props.item.ac_session }}</td>
            <!-- <td class="text-xs-right">{{ props.item.iron }}</td> -->
          </tr>
        </template>
      </v-data-table>
      <!-- <v-card-actions>
        <v-btn @click="submit" color="info" dark>Submit</v-btn>
      </v-card-actions>-->
    </v-container>
    <!-- <pre>{{getMasterExam.form_fill_up}}</pre> -->
    <!-- <pre>{{selected}}</pre> -->
  </v-container>
</template>

<script>
import formDialog from "@/components/district/districtForm.vue";

export default {
  components: {
    formDialog
  },
  data() {
    return {
      selected: [],
      pagination: {},
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      search: "",
      limit: {},
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Name", align: "left", value: "name" },
        { text: "Student ID", value: "std_id" },
        { text: "Reg. No", value: "reg_no" },
        { text: "Paper Code", align: "left", value: "details.paper_code" },
        { text: "Session", value: "ac_session" }
        // { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  // created() {
  //   this.$store.dispatch("fetchCenLsDistToRegData");
  // },
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
    profile() {
      return this.$store.getters.getCollegeUserProfile;
    },
    getMasterExam() {
      return this.$store.getters.getMasterExamConfirmData;
    },
    getDistrictList() {
      return this.$store.getters.getDistrictDataList;
    }
  },
  methods: {
    submit() {
      this.$store
        .dispatch("ffConfirmByCollegeUser", this.selected)
        .then(response => {
          this.getDataFromApi();
        });
      // this.selected.forEach(element => {
      //   let index = this.getMasterExam.form_fill_up.indexOf(element);
      //   this.getMasterExam.form_fill_up.splice(index, 1);
      //   // console.log(index);
      // });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.getMasterExam.form_fill_up.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        district_name: "",
        dist_code: "",
        old_dist_code: "",
        div_code: "",
        old_div_code: "",
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
      this.$store
        .dispatch("fetchCollageUserConfirmData", this.limit)
        .then(data => {
          this.loading = false;
          // this.totalDataItems = data.meta.total;
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
      this.editedIndex = this.getDistrictList.indexOf(item);
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
              .dispatch("deleteDistrictItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("fetchCollageUserStudent", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("fetchCollageUserStudent", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
