<template>
  <v-container fluid>
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
                  :item-text="(item) => item.code + ' - ' + item.title"
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
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
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
                  prepend-icon="calendar_today"
                ></v-select>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.subject_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <!-- {{getPaperByRescrutinerList}} -->
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="
                    (item) => item.paper_code + ' - ' + item.paper_name
                  "
                  item-value="paper_code"
                  :items="getPaperByRescrutinerList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.paper_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{
                      data.item.paper_code + ' - ' + data.item.paper_name
                      }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="
                            data.item.paper_code + ' - ' + data.item.paper_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.rescrutiner_id"
                  :item-text="(item) =>  item.name"
                  item-value="id"
                  :items="getRescrutinerList"
                  menu-props="auto"
                  label="Select Re-scrutiner"
                  hide-details
                  prepend-icon="face"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.rescrutiner_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-checkbox
                  v-model="searchParam.mark_changes"
                  label="Mark changed"
                  class="mt-5 mr-2 ml-4"
                  color="indigo darken-3"
                  @change="markStatus($event)"
                ></v-checkbox>
                <!-- <v-checkbox
                  v-model="searchParam.payment_status"
                  label="Payment Completed"
                  class="mt-5 mr-2 ml-2"
                  color="indigo darken-3"
                  @change="paymentStatus($event)"
                ></v-checkbox>-->

                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchRescrutinyApplicant">Search</v-btn>
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
        <v-layout row wrap>
          <v-flex xs6 sm12 md6 style="margin-top:25px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn color="primary" class="white--text" @click="exportPapersummary()">
                <v-icon left dark>arrow_downward</v-icon>Export By Subject-Course-wise
                Summary
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs6 sm12 md6 style="margin-top:25px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn color="primary" class="white--text" @click="exportKhataRequisition()">
                <v-icon left dark>arrow_downward</v-icon>Export Script
                Requisition
              </v-btn>
            </v-layout>
          </v-flex>

          <v-flex xs6 sm12 md6 style="margin-top:25px; margin-bottom:25px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn color="blue-grey" class="white--text" @click="exportbyMarkchange()">
                <v-icon left dark>arrow_downward</v-icon>Export By Mark Changes
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs6 sm12 md6 style="margin-top:25px; margin-bottom:25px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn color="blue-grey" class="white--text" @click="exportbyPapRescrutiner()">
                <v-icon left dark>arrow_downward</v-icon>Export By Subject
                Re-scrutinizer-wise
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <v-container fluid>
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
              <v-card-text class="title">Re-scrutiny Applicant List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-btn @click="searchRescrutinyApplicant()" class="ml-3" fab small flat dark color="primary">
            <v-icon dark large>search</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            label="Search"
            class="mt-1"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>-->
          <v-spacer />
          <v-card-actions>
            <v-btn color="blue-grey" class="white--text" @click="exportRescrutinyApplicantList()">
              <v-icon left dark>arrow_downward</v-icon>Export Applicant List
            </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="mainheaders"
        :items="getRescrutinyApplicantList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-left">{{ parse(props.item.exam_roll) }}</td>
          <td class="text-xs-left">{{ props.item.reg_no }}</td>
          <td class="text-xs-center">{{ props.item.session }}</td>
          <!-- <td class="text-xs-center">{{ props.item.student_name }}</td> -->
          <td class="text-xs-center">{{ props.item.subject_code }} - {{ props.item.subject_name }}</td>
          <td class="text-xs-left">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
          <!-- <td class="text-xs-left">({{ props.item.rescrutiner_id }}){{props.item.rescrutiner_name}}</td> -->
          <td class="text-xs-center">
            {{ props.item.head_examiner_code }} -
            {{ props.item.head_examiner_name }}
          </td>
          <td class="text-xs-center">{{ props.item.examiner_code }} - {{ props.item.examiner_name }}</td>
          <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.payment_status == 0">Pending</v-chip>
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.payment_status == 1"
            >Completed</v-chip>
          </td>
          <!-- <td class="text-xs-center">{{ props.item.old_mark }}</td>
          <td class="text-xs-center">{{props.item.new_mark}}</td>
          <td class="text-xs-center">{{ props.item.script_sl }}</td>
          <td class="text-xs-center">{{props.item.script_qr}}</td>
          <td class="text-xs-center">({{ props.item.college_code }}){{ props.item.college_name }}</td>
          <td class="text-xs-center">({{ props.item.subject_code }}){{ props.item.subject_name }}</td>
          <td class="text-xs-center">{{ props.item.datetime }}</td>
          <td class="text-xs-center">{{ props.item.payment_amount }}</td>
          <td class="text-xs-center">{{ props.item.payment_date }}</td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      class="mr-0"
                      color="white"
                      dark
                      @click="mailDialogStatus = !mailDialogStatus"
                    >mail</v-icon>
                  </v-btn>
                </template>
                <span>Mail</span>
              </v-tooltip>
            </v-item-group>
          </td>-->
        </template>
      </v-data-table>
      <composeMail :dialogStatus.sync="mailDialogStatus"></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  components: { composeMail },
  mixins: [commonGet, watchMixin],
  data() {
    return {
      mailDialogStatus: false,
      loading: false,
      search: "",
      sl_count: 0,
      searchParam: {},
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          sortable: false,
        },
        {
          text: "Registration No.",
          value: "reg_no",
          align: "center",
          sortable: false,
        },
        {
          text: "Session",
          value: "session",
          align: "center",
          sortable: false,
        },
        // {
        //   text: "Student Name",
        //   value: "student_name",
        //   align: "center",
        //   sortable: false
        // },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          sortable: false,
        },
        { text: "Course", value: "paper_code", sortable: false },
        // {
        //   text: "Rescrutiner",
        //   value: "rescrutiner_name",
        //   sortable: false
        // },
        {
          text: " Head Examiner",
          value: "head_examiner_code",
          align: "center",
          sortable: false,
        },
        {
          text: "Examiner",
          value: "examiner_code",
          align: "center",
          sortable: false,
        },
        {
          text: "Payment Status",
          align: "center",
          value: "payment_status",
          sortable: false,
        },
        // {
        //   text: "Old Marks",
        //   value: "old_mark",
        //   align: "center",
        //   sortable: false
        // },
        // { text: "New Marks", value: "mark", align: "center", sortable: false },
        // {
        //   text: "Script SL.",
        //   value: "script_sl",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Script QR Code",
        //   value: "script_qr",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "College",
        //   value: "college_code",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Subject",
        //   value: "subject_code",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Date",
        //   value: "datetime",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "Payment Amount",
        //   align: "center",
        //   value: "payment_amount",
        //   sortable: false
        // },
        // {
        //   text: "Payment Date",
        //   align: "center",
        //   value: "payment_date",
        //   sortable: false
        // },
        // {
        //   text: "Action",
        //   value: "action",
        //   align: "right",
        //   sortable: false
        // }
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
    };
  },
  watch: {
    pagination() {
      this.searchRescrutinyApplicant();
    },
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.searchParam.type = "Recrutiner";
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData", this.searchParam );
    }
    //paper
    if (!this.$store.getters.getPaperByResItems.length) {
      this.$store.dispatch("fetchPaperByRescrutinerData", this.searchParam);
    }
    this.$store.dispatch("searchRescrutiner", this.searchParam);
  },
  computed: {
    getRescrutinyApplicantList() {
      return this.$store.getters.getRescrutinyApplicantList;
    },
    getSchema() {
      return this.$store.getters.getRescrutinyStdSchema;
    },
    getRescrutinerList() {
      return this.$store.getters.getRescrutinerDataList;
    },
  },
  methods: {
    exportRescrutinyApplicantList() {
      // console.log("....");
      this.$store.dispatch("exportRescrutinyApplicantList", this.searchParam);
    },
    exportPapersummary() {
      // console.log("....");
      this.$store.dispatch("exportRescrutinyByPaperSummary", this.searchParam);
    },
    exportKhataRequisition() {
      // console.log("....");
      this.$store.dispatch(
        "exportRescrutinyByKhataRequisition",
        this.searchParam
      );
    },
    exportbyMarkchange() {
      // console.log("....");
      //this.searchParam.mark_changes = 1;
      this.$store.dispatch("exportRescrutinyByMarkchnge", this.searchParam);
      //this.searchParam.mark_changes = 0;
    },
    exportbyPapRescrutiner() {
      // console.log("....");
      this.$store.dispatch("exportByPaperRescrutiner", this.searchParam);
    },
    markStatus(val) {
      if (val == true) {
        this.searchParam.mark_changes = 1;
      } else {
        this.searchParam.mark_changes = 0;
      }
    },
    paymentStatus(val) {
      if (val == true) {
        this.searchParam.payment_status = 1;
      } else {
        this.searchParam.payment_status = 0;
      }
    },

    parse(item) {
      return String(item.replace(/"|\,|\./g, ""));
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },

    searchRescrutinyApplicant() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRescrutinyApplicantData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>

<style scoped></style>
