<template>
  <v-container fluid>
    <v-layout row>
      <v-expansion-panel focusable>
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
          <v-layout row wrap align-left>
            <v-flex>
              <v-card class="px-3">
                <v-layout row wrap align-left class="py-3">
                  <v-autocomplete
                    class="ma-2"
                    v-model="searchParam.college_code"
                    :item-text="
                      item => '(' + item.college_code + ') ' + item.college_name
                    "
                    item-value="college_code"
                    :items="getCollegeSchema"
                    menu-props="auto"
                    label="Select College"
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.college_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{
                          "(" +
                            data.item.college_code +
                            ") " +
                            data.item.college_name
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
                            v-html="
                              '(' +
                                data.item.college_code +
                                ') ' +
                                data.item.college_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>

                  <v-text-field
                    v-model="searchParam.college_eiin"
                    class="mt-3 ml-2"
                    name="college_code"
                    label="College Eiin"
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-select
                    v-model="searchParam.division"
                    :items="getDivisions"
                    item-text="division_name"
                    item-value="division_id"
                    label="Select Division"
                    name="division"
                    @change="getDistrictData"
                    class="mt-3 ml-2"
                    prepend-icon="edit"
                  ></v-select>

                  <v-select
                    v-model="searchParam.district"
                    :items="getDistricts"
                    item-text="district_name"
                    item-value="district_id"
                    label="Select District"
                    name="district"
                    @change="getThanaData"
                    class="mt-3 ml-2"
                    prepend-icon="edit"
                  ></v-select>

                  <v-select
                    v-model="searchParam.thana"
                    :items="getThanas"
                    item-text="thana_name"
                    item-value="thana_id"
                    class="mt-3 ml-2"
                    label="Select Thana"
                    name="thana"
                    prepend-icon="edit"
                  ></v-select>

                  <v-flex xs12 sm12 md12 style="margin-top:40px;">
                    <v-layout justify-left row fill-height align-left>
                      <v-btn color="primary" large @click="getDataFromApi"
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
    </v-layout>
    <v-divider class="mt-3 mb-3"></v-divider>

    <v-card color="white">
      <div>
        <addFormDialog :dialogStatus.sync="formDialogStatus"></addFormDialog>
      </div>

      <div>
        <editFormDialog
          :dialogStatus.sync="editFormDialogStatus"
          :editedData="editedItem"
          :indexEdited.sync="editedIndex"
        ></editFormDialog>
      </div>
      <div>
        <detailsDialog
          :dialogStatus.sync="detailsDialogStatus"
          :detailsData="detailsData"
        ></detailsDialog>
      </div>

      <v-layout row>
        <v-card flat>
          <v-card-text class="title">College List</v-card-text>
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
        <v-btn color="primary" dark class="mb-2" @click="newItem()"
          >New Item</v-btn
        >
      </v-layout>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="getSchema"
      class="elevation-1"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
      :loading="loading"
      :rows-per-page-items="pagination.rowsPerPageItems"
      style="white-space: nowrap"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.college_code }}</td>
        <td class="text-xs-left">{{ props.item.college_eiin }}</td>
        <td class="text-xs-left">{{ props.item.college_name }}</td>
        <td class="text-xs-left">
          {{
            props.item.college_type ? props.item.college_type.college_type : ""
          }}
        </td>
        <td class="text-xs-left">
          {{ props.item.email ? props.item.email : "N/A" }}
        </td>
        <td class="text-xs-left">
          {{ props.item.mobile ? props.item.mobile : "N/A" }}
        </td>
        <td class="text-xs-left">
          {{
            props.item.districts ? props.item.districts.district_name : "N/A"
          }}
        </td>
        <td class="justify-left layout px-0">
          <v-btn color="warning" fab small dark @click="showItem(props.item)">
            <v-icon>list</v-icon>
          </v-btn>
          <v-btn color="primary" fab small dark @click="editItem(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <!--<v-btn color="error" fab small dark @click="deleteItem(props.item)">
                        <v-icon>delete</v-icon>
          </v-btn>-->
        </td>
      </template>
      <template v-slot:no-data></template>
    </v-data-table>
  </v-container>
</template>

<script>
import addFormDialog from "@/components/college/addNewCollege.vue";
import editFormDialog from "@/components/college/editCollege.vue";
import detailsDialog from "@/components/college/collegeDetails.vue";

export default {
  components: {
    addFormDialog,
    editFormDialog,
    detailsDialog
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    loading: true,
    searchParam: {},
    search: "",
    dialog: false,

    headers: [
      { text: "Code", align: "left", value: "college_code" },
      { text: "EIIN", align: "left", value: "college_eiin" },
      { text: "Name", align: "left", sortable: false, value: "college_name" },
      { text: "College Type", align: "left", value: "college_type" },
      { text: "Email", align: "left", value: "email" },
      { text: "Mobile", align: "left", value: "mobile" },
      { text: "District", align: "left", value: "district_name" },
      { text: "Actions", align: "left", value: "name", sortable: false }
    ],

    detailsData: "",
    detailsDialogStatus: false,
    formDialogStatus: false,
    editFormDialogStatus: false,
    editedItem: "",
    editedIndex: -1
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getCollegeData;
    },
    getCollegeSchema() {
      return this.$store.getters.getAllCollege;
    },
    getDivisions() {
      return this.$store.getters.getDivision;
    },
    getDistricts() {
      return this.$store.getters.getDistrict;
    },
    getThanas() {
      return this.$store.getters.getThana;
    }
  },

  created() {
    this.$store.dispatch("fetchAllCollegeData");
    this.$store.dispatch("fetchDivisions");
    this.$store.dispatch("fetchDistricts");
    this.$store.dispatch("fetchThanas");
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  methods: {
    // get district data by division id
    getDistrictData(division_id) {
      if (division_id) {
        this.$store.dispatch("fetchDistricts", division_id);
      }
    },
    // get thana data by district id
    getThanaData(district_id) {
      if (district_id) {
        this.$store.dispatch("fetchThanas", district_id);
      }
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("fetchCollegeList", this.searchParam).then(data => {
        this.loading = false;
        this.pagination.totalItems = data.meta.total;
      });
    },

    showItem(item) {
      item ? (this.detailsData = item) : "";
      this.detailsDialogStatus = true;
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editFormDialogStatus = true;
    },

    deleteItem(item) {},
    newItem() {
      this.formDialogStatus = true;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  margin-left: 5px;
}
</style>
