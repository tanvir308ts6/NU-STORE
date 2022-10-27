<template>
  <v-container fluid style=" padding-right: 0px; padding-left: 0px;">
    <v-container fluid style="padding-top: 10px; padding-bottom: 5px;">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Question Receive</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-0" vertical></v-divider>
          <v-spacer />
          <v-btn
            outline
            color="primary"
            @click.stop.prevent="downloadQuesReceiveStm()"
            class="erBtn"
          >
            <v-icon left>cloud_download</v-icon>Download .. Statement
          </v-btn>
        </v-layout>
      </v-card>

      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getReceiveQuestionList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <!-- v-if="getStyle(props.item.remove_status)"  -->
        <template v-slot:items="props">
          <tr>
            <td class="text-xs-left" style=" padding-left: 20px;">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">{{ props.item.question_set }}</td>
            <td class="text-xs-left">{{ props.item.subject_code }} - {{ props.item.subject_name }}</td>
            <td class="text-xs-left">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
            <!-- <td class="text-xs-center">{{ props.item.printable_paper }}</td> -->
            <td class="text-xs-center">{{ props.item.allotted_questions }}</td>
            <td class="text-xs-center">{{ props.item.packet_size }}</td>
            <td class="text-xs-center">{{ props.item.total_packet }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
    <v-container fluid>
      <v-flex xs12 class="mt-2">
        <v-card class="pa-4 white---text" color="cyan darken-1">
          <v-layout row wrap align-center class="py-3" justify-center fill-heigh>
            <v-text-field
              v-model="note"
              class="mt-3 ml-2"
              name="note"
              label="Comment"
              prepend-icon="edit"
              :disabled="disable"
            ></v-text-field>
          </v-layout>
        </v-card>
        <v-flex class="mt-3">
          <v-layout align-center justify-center row fill-height>
            <v-btn round large color="primary" :disabled="disable" @click="receive">Receive</v-btn>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  props: ["dialogStatus"],
  components: {},
  mixins: [commonGet, commonExamYear, common_login_getters],

  data() {
    return {
      note: "",
      disable: false,
      sl_count: 1,
      loading: false,
      details: [],
      changeColor: false,
      pagination: {
        rowsPerPage: -1,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: { distribution_status: 1 },
    };
  },

  created() {
    if (this.ifCenterUser) {
      //this.searchParam.center_code = [this.getAuthUser.center.center_code]; //or
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  computed: {
    //all data
    getReceiveQuestionList() {
      return this.$store.getters.getReceiveQuestionList;
    },
    headers() {
      return [
        { text: "SL", value: "sl", width: "1%", align: "left", },
        { text: "Question Set", value: "question_set", width: "15%" , align: "center",},
        { text: "Subject Name", value: "subject_name", width: "15%" , align: "center",},
        { text: "Course Name", value: "paper_name", width: "20%" , align: "center",},
        { text: "Total Question", value: "printable_paper", width: "5%", align: "center", },
        { text: "Packet Size", value: "packet_size", width: "5%" , align: "center",},
        { text: "Total Packet", value: "total_packet", width: "5%" , align: "center",},
      ];
    },
  },
  methods: {
    receive() {
      let param = {};
      param.note = this.note;
      param.ids = [];
      var self = this;
      this.getReceiveQuestionList.forEach((obj) => {
        param.ids.push(obj.id);
      });
      this.$store.dispatch("receiveQuestion", param).then((data) => {
        // self.searchRepWithheldList();
        //self.close();
        self.disable = true;
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchReceiveQuestionData() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchReceiveQuestionData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    downloadQuesReceiveStm() {
      this.$store.dispatch("exportReceiveQuestionData", this.searchParam);
    },
  },
  watch: {
    pagination() {
      this.searchReceiveQuestionData();
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
