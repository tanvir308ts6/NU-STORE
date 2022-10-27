<template>
  <v-container fluid>
    <div>
      <formDialog :dialogStatus.sync="formDialogStatus"></formDialog>
      <editFormDialog
        :dialogStatus.sync="editFormDialogStatus"
        :editedData="editedItem"
      ></editFormDialog>
      <memberList
        :dialogStatus.sync="detailDialogStatus"
        :meetingDetail="meetingDetail"
      ></memberList>

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
                      <!--<v-text-field
                                                    name="status"
                                                    class="ma-2"
                                                    v-model="searchParam.exam_committee_id"
                                                    menu-props="auto"
                                                    label="Meeting"
                                                    prepend-icon="edit"
                                            ></v-text-field>-->

                      <v-text-field
                        name="status"
                        class="ma-2"
                        v-model="searchParam.meeting_name"
                        menu-props="auto"
                        label="Meeting"
                        prepend-icon="edit"
                      ></v-text-field>

                      <v-flex xs12 sm12 md12 style="margin-top:40px;">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="searchMeeting">
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
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Meeting List</v-card-text>
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
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Meeting
            </v-btn>
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
            <td>
              {{
                props.item.exam_committee
                  ? props.item.exam_committee.committee_name
                  : ""
              }}
            </td>
            <td>{{ props.item.meeting_name }}</td>
            <td>{{ props.item.place }}</td>
            <!--                        <td>{{ props.item.agenda }}</td>-->
            <!--                        <td>{{ props.item.decision }}</td>-->
            <td>
              {{ formatted_date(props.item.meeting_start) }}
            </td>
            <!--<td>
                            <v-btn color="white" @click="showMembers(props.item)" class="mr-0">Members</v-btn>
                        </td>-->
            <td class="justify-center layout px-0">
              <v-btn
                fab
                dark
                small
                color="warning"
                @click="showMembers(props.item)"
              >
                <v-icon dark>list</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                @click="editItem(props.item)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>

              <v-btn
                fab
                dark
                small
                color="teal"
                @click="exportEcmDetail(props.item)"
              >
                <v-icon dark>cloud_download</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/exmCommittee/meeting/addMeeting.vue";
import editFormDialog from "@/components/exmCommittee/meeting/editMeeting.vue";
import memberList from "@/components/exmCommittee/meeting/memberList.vue";
import commonGet from "../../../mixin/common_getters_mixin";
import moment from "moment";

export default {
  mixins: [commonGet],

  components: {
    formDialog,
    editFormDialog,
    memberList
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10
    },
    totalItems: 0,
    loading: true,
    searchParam: {},
    search: "",
    formDialogStatus: false,
    editFormDialogStatus: false,
    detailDialogStatus: false,
    meetingDetail: "",

    headers: [
      { text: "Exam Committee", align: "left", value: "name" },
      { text: "Meeting Title", align: "left", value: "name" },
      { text: "Place", align: "left", value: "email" },
      // {text: 'Agenda', align: 'left', value: 'agenda'},
      // {text: 'Decision', align: 'left', value: 'decision'},
      { text: "Date & Time", align: "left", value: "meeting_start" },
      // {text: 'Members', align: 'left', value: 'meeting_start'},
      { text: "Actions", align: "left", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {
      id: "",
      exam_committee_id: "",
      meeting_name: "",
      place: "",
      agenda: "",
      decision: "",
      meeting_start: "",
      meeting_date: "",
      meeting_time: "",
      selected: []
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getMeetingList;
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  methods: {
    formatted_date(date) {
      return moment(date).format("DD-MM-YYYY, hh:mm A");
    },

    newItem() {
      this.formDialogStatus = true;
    },

    showMembers(item) {
      this.meetingDetail = item;
      this.detailDialogStatus = true;
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
    },

    getDataFromApi() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchExmCommitteeMeetingList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    searchMeeting() {
      this.loading = true;
      this.setLimit();
      let self = this;
      let item = this.searchParam;
      this.$store.dispatch("fetchExmCommitteeMeetingList", item).then(data => {
        self.loading = false;
        self.pagination.totalItems = data.total;
        Object.keys(this.searchParam).forEach(function(key, index) {
          item[key] = "";
        });
      });
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.meeting_date = moment(
        this.editedItem.meeting_start
      ).format("YYYY-MM-DD");
      this.editedItem.meeting_time = moment(
        this.editedItem.meeting_start
      ).format("hh:mm");
      this.editedItem.exam_committee_id = parseInt(
        this.editedItem.exam_committee_id
      );
      this.editedItem.selected = item.committee_member;
      this.editFormDialogStatus = true;
    },

    exportEcmDetail(item) {
      const meeting = { meeting_id: item.id };
      this.$store.dispatch("exportExamCommitteeMeetingDetail", meeting);
    }
  }
};
</script>

<style scoped></style>
