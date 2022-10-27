<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
    ></formDialog>
    <v-expansion-panel class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-text-field
                  class="ma-2"
                  name="reg_no"
                  label="Registration Number"
                  v-model="searchParam.reg_no"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('reg_no')"
                  data-vv-name="reg_no"
                  required
                  prepend-icon="edit"
                ></v-text-field>
                <v-flex xs12>
                  <v-autocomplete
                    class="ma-2"
                    hide-details
                    v-model="searchParam.session_year"
                    :item-text="item => item.session"
                    item-value="session_year"
                    :items="getSessionList"
                    menu-props="auto"
                    label="Session Year"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSession(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >{{ data.item.session }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.session"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-text-field
                  class="ma-2"
                  name="name"
                  label="Name"
                  v-model="searchParam.name"
                  v-validate="'required'"
                  :error-messages="errors.collect('name')"
                  data-vv-name="name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  class="ma-2"
                  name="father_name"
                  label="Father's Name"
                  v-model="searchParam.father_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('father_name')"
                  data-vv-name="father_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>

                <v-text-field
                  class="ma-2"
                  name="mother_name"
                  label="Mother's Name"
                  v-model="searchParam.mother_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('mother_name')"
                  data-vv-name="mother_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="mb-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large :disabled="!searchParam.reg_no" @click="searchTranscriptList()">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Student List</v-card-text>
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

          ></v-text-field>-->
          <!--  <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <v-card-actions>
            <!-- <v-btn @click="newItem" color="primary" dark>Create Transcript</v-btn> -->
          </v-card-actions>
        </v-layout>
      </v-card>
     <div v-if="openStat">
          <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getTranscriptList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <!-- <td class="text-xs">{{ props.item.print_date }}</td> -->
          <td class="text-xs">{{ props.item.college_code }} - {{ props.item.college_name }}</td>
          <td class="text-xs">{{ props.item.degree_group_code }} - {{ props.item.degree_group_name }}</td>
          <td class="text-xs">{{ props.item.subject_code }} - {{ props.item.subject_name }}</td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.name }}</td>
           
          <td class="text-xs">
            <v-item-group>
                           
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon @click="submit(props.item)" class="mr-0" color="white">speaker_notes</v-icon>
                  </v-btn>
                </template>
                <span>Generate</span>
              </v-tooltip>
              
            </v-item-group>
          </td>
         <!--  <td class="text-xs">{{ props.item.status }}</td> -->
        </template>
      </v-data-table>
     </div>
   
  
    </v-container>
  </v-container>
</template>

<script>
import formDialog from "@/components/transcript/transcriptForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";

export default {
  components: {
    formDialog
  },
  mixins: [commonGet, commonExamYear],
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      sessions: ["2011-2012", "2012-2013", "2013-2014", "2015-2016"],
      sl_count: 1,
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      openStat: false,
      formDialogStatus: false,
      search: "",
      searchParam: {},
      limit: {},
      headers: [
      { text: "SL.", align: "left", value: "id", width: "10" },
        // { text: "Print Date", value: "print_date" },
        { text: "College ", value: "degree", sortable: false },
        { text: "Degree Group", value: "degree", sortable: false },
        { text: "Subject", value: "subject_code", sortable: false },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Registration No", value: "reg_no" },
        { text: "Name", value: "name" },

        
     
        
        { text: "Generate Transcript", value: "degree", sortable: false },
        // { text: "Status", value: "status" }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.dispatch("fetchAllSessionData");
  },
  mounted() {
    //this.getDataFromApi();
  },
  watch: {
    pagination() {
      this.searchTranscriptList();
    }
  },
  computed: {
    getTranscriptList() {
      return this.$store.getters.getTranscriptDataList;
    }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        rn: "",
        exam_roll: "",
        reg_no: "",
        session: "",
        name: "",
        father_name: "",
        mother_name: "",
        college: "",
        degree: "",
        degree_group: "",
        subject: "",
        cgpa: "",
        total_credit: "",
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
     submit() {
      
      this.setLimit();
      this.$store.dispatch("submitGenerateTranscriptData", this.searchParam).then(data => {
        // console.log("data---", data);
        this.loading = false;
      });
    },

    searchTranscriptList() {
      this.loading = true;
      this.openStat = true;
      this.setLimit();
      this.$store.dispatch("searchTranscript", this.searchParam).then(data => {
        console.log("data---", data);
        this.loading = false;
        this.sl_count = data[0].data.from;
        this.pagination.totalItems = data[0].data.total;
      });
    },

    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    }
  }
};
</script>

<style scoped></style>
