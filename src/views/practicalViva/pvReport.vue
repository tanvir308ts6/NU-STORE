<template>
  <v-container fluid style="padding: 0 0">
    <v-container fluid style="padding-bottom: 0px">
      <span class>
        <div class="display-1 mb-4">
          <v-icon size="50" color="primary">content_paste</v-icon>
          <span class="ml-2">Practical Viva ~ Report</span>
        </div>
      </span>
    </v-container>
    <v-divider class="mb-4" />
    <!-- <pre>  {{getPracticalCenterList}} </pre> -->
    <v-container fluid style="padding-top: 0px">
      <v-btn class="elevation-0" style="pointer-events: none; ">
        <span class="title">Practical:</span>
      </v-btn>
      <v-card>
        <v-layout>
          <v-flex xs2 v-if="false">
            <v-layout justify-center row fill-height align-center>
              <v-btn block flat style="pointer-events: none;">
                <span class="title">Practical:</span>
              </v-btn>
            </v-layout>
          </v-flex>
          <!-- {{ getPracticalCenterList }} -->
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.practical_center_code"
              :items="getPracticalCenterList"
              :item-text="item => item.center_code + ' - ' + item.center_name"
              item-value="center_code"
              label="Select Center"
              persistent-hint
              prepend-inner-icon="library_books"
              @change="centerChange()"
              outline
              hide-details
              :disabled="ifCenterUser"
            >
              <template v-slot:selection="data">
                <v-chip
                  color="#FAFAFA"
                  close
                  @input="searchParam.center_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    data.item.center_code + " - " + data.item.center_name
                  }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        data.item.center_code + ' - ' + data.item.center_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.practical_subject_code"
              :items="getSubjectListByPrac"
              :item-text="item => item.subject_code + ' - ' + item.subject_name"
              item-value="subject_code"
              label="Select Subject"
              persistent-hint
              prepend-icon="library_books"
              @change="subjectChangeP($event)"
              outline
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="searchParam.practical_subject_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    data.item.subject_code + " - " + data.item.subject_name
                  }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        data.item.subject_code + ' - ' + data.item.subject_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>

          <!-- {{getPaperByPractical}} -->
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.practical_paper_code"
              :items="getPaperByPractical"
              :item-text="item => item.paper_code + ' - ' + item.paper_name"
              item-value="paper_code"
              label="Select Course"
              persistent-hint
              :loading="paperLoading"
              prepend-inner-icon="library_books"
              outline
              hide-details
            >
              <template v-slot:selection="data">
                <v-chip
                  color="#FAFAFA"
                  close
                  @input="searchParam.paper_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    data.item.paper_code + " - " + data.item.paper_name
                  }}</v-chip
                >
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
          </v-flex>
          <v-flex xs0>
            <v-chip style="margin-left:-2em; margin-top:-.6em">{{
              getPaperByPractical.length
            }}</v-chip>
          </v-flex>
        </v-layout>

        <v-divider class="my-1" />

        <v-layout>
          <v-flex class="mx-2">
            <v-btn block @click="downloadPracticalMarkBlankList()"
              >Practical Mark Blank List Export</v-btn
            >
          </v-flex>

          <v-flex class="mx-2">
            <v-btn block @click="downloadPracticalWantingList()"
              >Practical Wanting List Export</v-btn
            >
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <!-- viva  -->
    <v-container fluid style="padding-top: 0px">
      <v-btn class="elevation-0" style="pointer-events: none; ">
        <span class="title">Viva:</span>
      </v-btn>
      <v-card>
        <v-layout>
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.center_code"
              :items="getVivaCenterList"
              :item-text="item => item.center_code + ' - ' + item.center_name"
              item-value="center_code"
              label="Select Center"
              persistent-hint
              prepend-inner-icon="library_books"
              outline
              hide-details
              :disabled="ifCenterUser"
            >
              <template v-slot:selection="data">
                <v-chip
                  color="#FAFAFA"
                  close
                  @input="searchParam.center_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    data.item.center_code + " - " + data.item.center_name
                  }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        data.item.center_code + ' - ' + data.item.center_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <!-- {{getPaperByPractical}} -->
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.subject_code"
              :items="getSubjectListByViva"
              :item-text="item => item.subject_code + ' - ' + item.subject_name"
              item-value="subject_code"
              label="Select Subject"
              persistent-hint
              prepend-icon="library_books"
              @change="subjectChangeV($event)"
              outline
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="searchParam.subject_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    data.item.subject_code + " - " + data.item.subject_name
                  }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        data.item.subject_code + ' - ' + data.item.subject_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.paper_code"
              :items="getVivaPaperItem"
              :item-text="item => item.paper_code + ' - ' + item.paper_name"
              item-value="paper_code"
              label="Select Course"
              persistent-hint
              prepend-inner-icon="library_books"
              outline
              hide-details
            >
              <template v-slot:selection="data">
                <v-chip
                  color="#FAFAFA"
                  close
                  @input="searchParam.paper_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    data.item.paper_code + " - " + data.item.paper_name
                  }}</v-chip
                >
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
          </v-flex>
          <v-flex xs0>
            <v-chip style="margin-left:-2em; margin-top:-.6em">{{
              getVivaPaperItem.length
            }}</v-chip>
          </v-flex>
        </v-layout>

        <v-divider class="my-1" />

        <v-layout>
          <v-flex class="mx-2">
            <v-btn block @click="downloadVivaMarkBlankList()"
              >Viva Mark Blank List Export</v-btn
            >
          </v-flex>

          <v-flex class="mx-2">
            <v-btn block @click="downloadVivaWantingList()"
              >Viva Wanting List Export</v-btn
            >
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <!-- <pre> {{getCenterItems}} </pre> -->
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  components: {
    // formDialog
  },
  data() {
    return {
      paperLoading: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      searchParam: {
        exam_initiate_id: 1,
        exam_code: "3302",
        year: "2017",
        exam_type: 1
      },
      loading: false
    };
  },
  mounted() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year; // this line
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
      this.searchParam.practical_center_code = this.getAuthUser.center.practical_center_code;
      this.searchParam.viva_center_code = this.getAuthUser.center.practical_center_code;
    }
    this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
    this.$store.dispatch("fetchSubDataByPractical", this.searchParam);
    // if (this.ifCenterUser) {
    //   this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
    // }
    var limit = {
      page: 1,
      limit: 1000
    };

    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    // //subject
    // if (!this.$store.getters.getSubjectItems.length) {
    //   this.$store.dispatch("fetchSubjectData");
    // }

    //paper
    // if (!this.$store.getters.getPaperItems.length) {
    //   this.$store.dispatch("fetchPaperData");
    // }

    // if (this.ifCenterUser) {
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    if (this.ifCenterUser) {
      param.center_code = this.getAuthUser.center.practical_center_code;
    }
    this.$store.dispatch("fetchPracticalWiseCenterData", param);
    // }

    // if (this.ifCenterUser) {
    param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    if (this.ifCenterUser) {
      param.center_code = this.getAuthUser.center.practical_center_code;
    }
    this.$store.dispatch("fetchVivaWiseCenterData", param);
    // }`

    // this.$store.dispatch("fetchPracticalWiseCenterData");
    this.$store.dispatch("fetchPaperDataByViva", this.searchParam);
    this.$store.dispatch("fetchSubDataByViva", this.searchParam);
  },
  computed: {
    getCenterItems() {
      return this.$store.getters.getCenterItems;
    },
    getPaperByPractical() {
      return this.$store.getters.getPaperByPractical;
    },
    //center
    getCenterList() {
      return this.$store.getters.getCenterItem;
    },
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    }
  },
  watch: {
    pagination() {
      //   this.searchCenterList();
    }
  },
  methods: {
    subjectChangeP(val) {
      this.searchParam.subject_code = val;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
        this.$store.dispatch("fetchPaperDataByPractical", this.searchParam);
      }
    },
    subjectChangeV(val) {
      this.searchParam.subject_code = val;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.practical_center_code;
        this.$store.dispatch("fetchPaperDataByViva", this.searchParam);
      }
    },
    getParam() {
      let param = {};
      param.exam_initiate_id = this.searchParam.exam_initiate_id;
      param.exam_code = this.searchParam.exam_code;
      param.year = this.searchParam.year;
      return param;
    },
    centerChange(val) {
      let param = this.getParam();
      param.center_code = this.searchParam.practical_center_code;
      this.paperLoading = true;
      this.$store.dispatch("fetchPaperDataByPractical", param).then(() => {
        this.paperLoading = false;
      });
    },
    //   Practical
    downloadPracticalCandidateList() {
      this.$store.dispatch("downloadPracticalCandidateList", this.searchParam);
    },
    downloadPracticalMarkBlankList() {
      let param = this.getParam();
      param.center_code = this.searchParam.practical_center_code;
      param.paper_code = this.searchParam.practical_paper_code;
      param.subject_code = this.searchParam.practical_subject_code;
      this.$store.dispatch("downloadPracticalMarkBlankList", param);
    },
    downloadPracticalMarkList() {
      this.$store.dispatch("downloadPracticalMarkList", this.searchParam);
    },
    downloadPracticalWantingList() {
      let param = this.getParam();
      param.center_code = this.searchParam.practical_center_code;
      param.paper_code = this.searchParam.practical_paper_code;
      param.subject_code = this.searchParam.practical_subject_code;
      this.$store.dispatch("downloadPracticalWantingList", param);
    },
    // viva
    downloadVivaCandidateList() {
      this.$store.dispatch("downloadVivaCandidateList", this.searchParam);
    },
    downloadVivaMarkBlankList() {
      let param = this.getParam();
      param.center_code = this.searchParam.center_code;
      param.paper_code = this.searchParam.paper_code;
      param.subject_code = this.searchParam.subject_code;
      this.$store.dispatch("downloadVivaMarkBlankList", param);
    },
    downloadVivaMarkList() {
      this.$store.dispatch("downloadVivaMarkList", this.searchParam);
    },
    downloadVivaWantingList() {
      let param = this.getParam();
      param.center_code = this.searchParam.center_code;
      param.paper_code = this.searchParam.paper_code;
      param.subject_code = this.searchParam.subject_code;
      this.$store.dispatch("downloadVivaWantingList", param);
    }
  }
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
