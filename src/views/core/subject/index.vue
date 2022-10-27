<template>
  <v-container fluid>
    <div>
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
              <v-layout row wrap align-center>
                <v-flex>
                  <v-card class="px-3">
                    <v-layout row wrap align-center class="py-3">
                      <v-select
                        name="degree_group_code"
                        label="Degree Group"
                        v-model="searchParam.degree_group_code"
                        :items="getAllDegreeGroup"
                        :item-text=" (item) => item.degree_group_code + '-' + item.degree_group_name "
                        item-value="degree_group_code"
                        v-validate="'required'"
                        data-vv-name="degree_group_code"
                        prepend-icon="edit"
                        clearable
                      ></v-select>
                      <v-text-field
                        class="ma-2"
                        name="subject_code"
                        label="Subject Code"
                        v-model="searchParam.subject_code"
                        prepend-icon="edit"
                        clearable
                      ></v-text-field>
                      <!-- <v-text-field
                        class="ma-2"
                        name="subject_name"
                        label="Subject Name"
                        v-model="searchParam.subject_name"
                        prepend-icon="edit"
                      ></v-text-field> -->

                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="getDataFromApi">
                            Search
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
        <br />
        <v-card color="white">
          <formDialog
            :dialogStatus.sync="formDialogStatus"
            :editedData="editedItem"
            :indexEdited.sync="editedIndex"
          ></formDialog>
          <br />
          <v-layout row>
            <v-card flat>
              <v-badge left overlap>
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    fab
                    small
                    style="margin-top: -1.3em;"
                    class="elevation-0"
                    >{{ getSchema.length }}</v-btn
                  >
                </template>
                <v-card-text class="title">Subject List</v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <!-- <v-text-field
              v-model="search"
              prepend-inner-icon="search"
              label="Search"
              class="mt-0"
              hide-details
              solo
              flat
              single-line
            ></v-text-field> -->
            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem"
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
        >
          <template v-slot:items="props">
            <td class="text-xs-left font-weight-bold">
              <v-chip v-if="props.item.degree">
                ({{ props.item.degree.degree_code }})
                {{ props.item.degree.degree_name }}
              </v-chip>
            </td>
            <td class="text-xs-left font-weight-bold">
              <v-chip v-if="props.item.degree_group">
                ({{ props.item.degree_group.degree_group_code }})
                {{ props.item.degree_group.degree_group_name }}
              </v-chip>
            </td>
            <td class="text-xs-left font-weight-bold">
              <v-chip>
                ({{ props.item.subject_code }})
                {{ props.item.subject_name }}
              </v-chip>
            </td>
            <td class="text-xs-center">
              {{ props.item.status === "1" ? "Yes" : "No" }}
            </td>
            <td class="justify-center layout px-0">
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="editItem(props.item)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>
              <!--<v-btn fab dark small color="red">
                                <v-icon dark>delete</v-icon>
                            </v-btn>-->
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import formDialog from "@/components/core/subject/subjectForm.vue";

export default {
  components: {
    formDialog
  },
  data() {
    return {
      dialog: false,
      formDialogStatus: false,
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      },
      loading: true,
      searchParam: {},
      search: "",

      headers: [
        { text: "Degree Code & Name", align: "left", value: "degree_code" },
        {
          text: "Degree Group Code & Name",
          align: "left",
          value: "degree_group_code"
        },
        { text: "Subject Code & Name", align: "left", value: "subject_name" },
        { text: "Status", align: "center", value: "status" },
        { text: "Actions", align: "center", sortable: false }
      ],

      editedIndex: -1,
      editedItem: this.unSetEditedData()
    };
  },

  computed: {
    getSchema() {
      return this.$store.getters.getSubjectData;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getAllDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    }
  },

  created() {
    // this.$store.dispatch("fetchSubjectList");
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        subject_code: "",
        subject_name: "",
        degree_code: "",
        degree_group_code: "",
        status: 1
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },

    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
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
      this.$store.dispatch("fetchSubjectList", this.searchParam).then(data => {
        this.loading = false;
        this.pagination.totalItems = data.meta.total;
      });
    }
  },
  mounted() {
    this.$store.dispatch(
      "fetchAllDegreeGroupData",
      this.getLoggedInDegree.code
    );
  }
};
</script>

<style scoped></style>
