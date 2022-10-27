<template>
  <div>
    <!-- {{this.searchParam}} -->
    <!-- {{getExamInitiateId}} -->
    <v-container fluid>
      <v-card v-if="publishState == 1" class="ma-3">
        <v-alert :value="true" type="info">
          <snap class="display-1">{{ publishMsg }}</snap>
        </v-alert>
      </v-card>
      <div>
        <v-container fluid>
          <v-card class="mx-5 mt-4">
            <v-layout row wrap align-center class="py-3" v-if="forceUpdate">
              <v-flex xs8 class="pl-3 pr-1">
                <v-autocomplete
                  disabled
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  color="primary"
                  label="Select Exam"
                  :item-text="(item) => item.title"
                  item-value="code"
                  prepend-icon="assignment_turned_in"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="grey lighten-4"
                      close
                      @input="searchParam.exam_code = ''"
                      :selected="data.selected"
                    >
                      <span class="subheading">{{ data.item.title }}</span>
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.title + data.item.code"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs4 class="pl-1 pr-3">
                <v-autocomplete
                  disabled
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.year"
                  :items="getYearList"
                  color="primary"
                  label="Select Year"
                  :item-text="(item) => item.year"
                  item-value="code"
                  prepend-icon="calendar_today"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="grey lighten-4"
                      close
                      @input="searchParam.year = ''"
                      :selected="data.selected"
                    >
                      <span class="subheading">{{ data.item.year }}</span>
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.year"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 class="mt-0">
                <v-divider></v-divider>
              </v-flex>
              <!-- tab below -->
              <v-toolbar flat color="white">
                <v-spacer />
                <v-btn
                  large
                  style="border-radius: 12px 0%"
                  color="primary"
                  @click="publishAdmitCard()"
                  :disabled="publishState == 1"
                >
                  <div class="title">Admit Publish</div>
                </v-btn>
              </v-toolbar>
              <v-flex xs12>
                <v-tabs fixed-tabs v-model="active" slider-color="black">
                  <v-tab ripple>
                    <div class="subheading">Generate ( All Admit )</div>
                  </v-tab>
                  <v-tab ripple>
                    <div class="subheading">Generate ( Only Ungenerated )</div>
                  </v-tab>
                  <v-tab-item v-for="n in 2" :key="n">
                    <v-card flat>
                      <v-layout row wrap align-center class="py-3">
                        <v-flex xs12 class="mx-3">
                          <v-layout row wrap align-center class="py-3">
                            <v-flex xs4 class="text-xs-center">
                              <span class="title">College Code:</span>
                            </v-flex>
                            <v-flex xs4>
                              <v-text-field
                                class="mx-3"
                                v-model="searchParam.from_college"
                                name="rg_no"
                                label="FROM"
                                prepend-icon="edit"
                                outline
                                hide-details
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                              <v-text-field
                                class="mx-3"
                                v-model="searchParam.to_college"
                                name="rg_no"
                                label="TO"
                                prepend-icon="edit"
                                outline
                                hide-details
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 class="mx-3">
                          <v-layout row wrap align-center class="py-3">
                            <v-flex xs4 class="text-xs-center">
                              <span class="title">Subject Code:</span>
                            </v-flex>
                            <v-flex xs4>
                              <v-text-field
                                class="mx-3"
                                v-model="searchParam.from_subject"
                                name="rg_no"
                                label="FROM"
                                prepend-icon="edit"
                                outline
                                hide-details
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                              <v-text-field
                                class="mx-3"
                                v-model="searchParam.to_subject"
                                name="rg_no"
                                label="TO"
                                prepend-icon="edit"
                                outline
                                hide-details
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md12 class="mx-3">
                          <v-layout row wrap align-center class="py-3">
                            <v-flex xs4 class="text-xs-center">
                              <span class="title">Registration Number:</span>
                            </v-flex>
                            <v-flex xs8>
                              <v-textarea
                                class="mt-3 ml-2 mr-2"
                                name="regNo"
                                rows="1"
                                auto-grow
                                label="Registration No. wise Generate"
                                v-model="regNo"
                                data-vv-name="regNo"
                                prepend-icon="edit"
                                placeholder="for multiple reg number use comma separator, i.e., 14210000002,14210000003"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>

                      <!-- <div class="text-xs-center py-3" publishState == 1>
                    <v-btn color="success" @click="processAdmitCard(n)">Admit Generate</v-btn>
                      </div>-->
                      <div class="text-xs-center py-3">
                        <v-btn
                          color="success"
                          @click="processAdmitCard(n)"
                          :disabled="checkToDisabled(n)"
                          >Admit Generate ..</v-btn
                        >
                      </div>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
        <v-card class="subheading pa-3 mt-3">
          <v-layout align-center justify-start row fill-height>
            <v-layout>
              <span class="title ml-3">Summary Data:</span>
              <div class="ml-5">Total Candidate: {{ getAdmitCardSummaryData.total_candidate }}</div>
            </v-layout>

            <v-btn :loading="summaryLoading" fab small @click="AdmitCardSummary()">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-layout>

          <div class="pl-5">
            <!-- <v-card> -->
            <v-layout row>
              <v-flex></v-flex>
              <v-flex text-xs-left>
                <v-chip>
                  <snap class="title">Total Admit Card Generated:</snap>
                  <v-btn fab>
                    <snap class="title">
                      {{ getAdmitCardSummaryData.total_admit_card_generated }}
                    </snap>
                  </v-btn>
                </v-chip>
              </v-flex>
              <v-flex text-xs-right>
                <v-chip>
                  <snap class="title">Total Admit Card Ungenerated:</snap>
                  <v-btn fab>
                    <snap class="title">
                      {{ getAdmitCardSummaryData.total_admit_card_ungenerated }}
                    </snap>
                  </v-btn>
                </v-chip>
              </v-flex>
              <v-flex></v-flex>
            </v-layout>
            <!-- </v-card> -->
          </div>

          <!-- <pre>
      {{getAdmitCardSummaryData}}
          </pre>-->
        </v-card>
        <v-container fluid>
          <!-- <v-layout> -->
          <v-card>
            <v-card color="white">
              <v-layout row>
                <v-card flat>
                  <v-card-text class="title">Current Status</v-card-text>
                </v-card>
                <v-divider class="my-2" vertical></v-divider>
                <v-spacer />
                <v-btn small fab :loading="getProgressLoading" @click="getProgress()">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </v-layout>
            </v-card>
            <!-- <template> -->
            <!-- {{ getAdmitCardProgressList }} -->
            <v-data-table
              :headers="progressHeaders"
              :items="getAdmitCardProgressList"
              class="elevation-1"
              :pagination.sync="pagination"
              :rows-per-page-items="pagination.rowsPerPageItems"
              :total-items="pagination.totalItems"
              :loading="loading"
            >
              <template v-slot:items="props">
                <td>{{ props.index + sl_count }}</td>
                <td class="text-xs-left">
                  <div v-if="!(props.item.json.from_subject == null)">
                    {{ props.item.json.from_subject }}
                  </div>
                  <v-icon v-else>close</v-icon>
                </td>
                <td class="text-xs-left">
                  <div v-if="!(props.item.json.to_subject == null)">
                    {{ props.item.json.to_subject }}
                  </div>
                  <v-icon v-else>close</v-icon>
                </td>
                <td class="text-xs-left">
                  <div v-if="!(props.item.json.from_college == null)">
                    {{ props.item.json.from_college }}
                  </div>
                  <v-icon v-else>close</v-icon>
                </td>
                <td class="text-xs-left">
                  <div v-if="!(props.item.json.to_college == null)">
                    {{ props.item.json.to_college }}
                  </div>
                  <v-icon v-else>close</v-icon>
                </td>
                <td class="text-xs-left">{{ props.item.total }}</td>
                <td class="text-xs-left">{{ props.item.completed }}</td>
                <td>
                  <v-progress-circular
                    :value="100 / (props.item.total / props.item.completed)"
                  ></v-progress-circular>
                </td>
                <td>
                  <v-btn
                    v-if="props.item.completed == props.item.total"
                    :disabled="publishState == 1"
                    :dark="publishState != 1"
                    small
                    fab
                    color="red"
                    @click="deleteFromSummary(props.item)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn small v-else disabled fab>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>

            <!-- </template> -->
          </v-card>
          <!-- </v-layout> -->
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
import common_activities_get from "@/mixin/get_activities_time_publish";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
// import format from "date-fns/format";

export default {
  mixins: [commonGet, commonExamYear, common_activities_get],
  data: () => ({
    regNo: "",
    regenerate: false,
    searchParam: {
      //   date: new Date().toISOString().substr(0, 10)
    },
    loading: false,
    search: "",
    sl_count: 1,
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
    },
    active: 0,
    forceUpdate: true,
    getOrderByOptions: [
      { name: "College", code: "1" },
      { name: "Subject", code: "2" },
      { name: "Gender", code: "3" },
    ],
    StartDate: false,
    summaryLoading: false,
    getProgressLoading: false,
  }),

  created() {
    //get activities status
    this.paramPublish.exam_initiate_id = this.getExamInitiateId;
    this.paramPublish.exam_code = this.getLoggedInExam.code;
    this.paramPublish.year = this.getLoggedInYear.year;
    this.paramPublish.activity_tag = "admitCardPublished";
    this.paramPublish.limit = -1;
    this.publishActivityUpdating(); // to get publish status

    if (this.getExamList.length == 0) {
      this.$store.dispatch("fetchExamData");
    }
    let param1 = {
      limit: -1,
    };
    this.$store.dispatch("fetchYearData", param1);
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    // this.$store.dispatch("fetchExamData");
    this.getProgress();
    this.AdmitCardSummary();
  },

  computed: {
    computedDateFormattedMomentjs() {
      return this.searchParam.date
        ? moment(this.searchParam.date).format("dddd, MMMM Do YYYY")
        : "";
    },
    getAdmitCardProgressList() {
      return this.$store.getters.getAdmitCardProgressList;
    },
    getAdmitCardSummaryData() {
      return this.$store.getters.getAdmitCardSummaryData;
    },
    progressHeaders() {
      return [
        { text: "Sl", sortable: false, value: "id" },
        {
          text: "from subject",
          sortable: false,
          value: "json.from_subject",
        },
        {
          text: "to subject",
          sortable: false,
          value: "json.to_subject",
        },
        {
          text: "from college",
          sortable: false,
          value: "json.from_college",
        },
        {
          text: "to college",
          sortable: false,
          value: "json.to_college",
        },

        { text: "total", value: "total", sortable: false },
        { text: "completed", value: "completed", sortable: false },
        { text: "Visually", value: "status", sortable: false },
        { text: "Delete", value: "status", sortable: false },
      ];
    },
  },
  // ..
  methods: {
    deleteFromSummary(item) {
      let param = { ...item.json };
      param.id = item.id;
      this.$root.$confirm("Are you sure that you want to Delete?").then((confirm) => {
        if (confirm) {
          this.$store.dispatch("admitSummaryDataDelete", param).then(() => {
            console.log();
            this.getProgress();
            this.AdmitCardSummary();
          });
        }
      });
    },
    checkToDisabled(n) {
      if (n == 1) {
        if (this.publishState == 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    publishAdmitCard() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "admitCardPublished";
      this.$store.dispatch("publishActivity", param).then(() => {
        let param = {};
        param.exam_initiate_id = this.getExamInitiateId;
        param.tag = "admitCardPublished";
        param.status = "1";
        this.$store.dispatch("publishActivity", param).then((data) => {
          this.publishState = data.publish_status;
        });
      });
    },
    AdmitCardSummary() {
      // console.log("AdmitCardSummary", this.searchParam);
      this.summaryLoading = true;
      this.$store
        .dispatch("fetchAdmitCardSummary", this.searchParam)
        .then((data) => {
          this.summaryLoading = false;
        })
        .catch(function(error) {
          this.summaryLoading = false;
        });
    },
    // /api/auth/admit-card-generated-ungenerated?exam_initiate_id=1&exam_code=3302&year=2017
    remove(item) {
      const index = this.searchParam.order_by.indexOf(item.name);
      if (index >= 0) this.searchParam.order_by.splice(index, 1);
    },
    processAdmitCard(n) {
      console.log("processAdmitCard", n);

      if (n == 1) {
        console.log("in 1", n);
        this.searchParam.regenerate = true;
      }
      if (n == 2) {
        console.log("in 2", n);
        this.searchParam.regenerate = false;
      }
      //var nameArr = new Array();
     // nameArr = this.regNo.split(",");
      // console.log(nameArr);
      //this.searchParam.reg_no = nameArr;
      this.searchParam.reg_no = this.regNo;
      let self = this;
      self.$root.$confirm("Are you sure that you want to Generate?").then((confirm) => {
        if (confirm) {
          let param = { ...this.searchParam };
          param.regenerate_confirmation = 0;
          self.$store.dispatch("generateAdmitCardFormTo", param).then((status) => {
            if (status) {
              self.$root.$confirm("Do you want to Re-Generate?").then((confirm) => {
                if (confirm) {
                  param.regenerate_confirmation = 1;
                  this.$store.dispatch("generateAdmitCardFormTo", param).then(() => {
                    self.getProgress();
                    console.log("success");
                  });
                } else {
                  self.getProgress();
                  console.log("success");
                }
              });
            }
          });
        }
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    getProgress() {
      this.loading = true;
      this.setLimit();
      this.getProgressLoading = true;
      var self = this;
      this.$store.dispatch("admitcardGenerateProcess", this.searchParam).then((data) => {
        console.log("ssss", data);
        self.getProgressLoading = false;
        self.loading = false;
        self.sl_count = data.from;
        self.pagination.totalItems = data.total;
      });
      // /api/auth/report/pdf-generate-process/admitcard
    },
  },
  watch: {
    pagination() {
      this.getProgress();
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
    },
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
    },
    getLoggedInYear(val) {
      this.forceUpdate = false;
      this.searchParam.exam_year = val.year;
      this.forceUpdate = true;
    },
    "searchParam.from_college": function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.searchParam.to_college = newVal;
      }
    },
    "searchParam.from_subject": function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.searchParam.to_subject = newVal;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
