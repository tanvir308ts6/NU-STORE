<template>
  <v-container fluid>
    <v-dialog v-model="paperDialog" width="900">
      <v-toolbar>
        <v-toolbar-title>
          <div class="title">Course Details</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn round outline flat @click="paperDialog = false">
          <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-layout row wrap class="ml-4 py-4">
          <v-flex
            v-for="(paper, i) in details"
            :key="paper.code"
            xs12
            class="ma-2"
          >
            <div class="title">
              <v-layout row class="ml-0">
                <v-flex xs1>
                  <span>({{ i + 1 }})</span>
                </v-flex>
                <v-flex xs1>
                  <span>{{ paper.paper_code }} -</span>
                </v-flex>
                <v-flex xs10>
                  <strong style="margin-left: 1em">{{
                    paper.paper_name
                  }}</strong>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- {{ getAuthUserType }}
    <br />
    {{ searchParam }}
    <br />
    ifCenterUser: {{ ifCenterUser }}-->
    <v-dialog v-model="centerDetailDialog" width="500">
      <studentDetail :currentItem="currentItem"></studentDetail>
    </v-dialog>
    <v-expansion-panel
      class="mb-3"
      inset
      v-model="open"
      v-if="forceRerenderFlag"
    >
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout column class="mx-5">
          <v-flex class="mx-3">
            <v-layout row wrap align-center>
              <!-- {{getLoggedInExam}} -->
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                  prepend-icon="store_mall_directory"
                ></v-select>
              </v-flex>
              <!-- {{getLoggedInYear}} -->
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="(item) => '' + item.year + ''"
                  item-value="year"
                  label="Year"
                  prepend-icon="calendar_today"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    outline
                    v-model="searchParam.reg_no"
                    class="ma-3"
                    name="rg_no"
                    menu-props="auto"
                    label="Registration Number"
                    prepend-icon="edit"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    outline
                    class="ma-2"
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <!-- {{getSessionList.length}} -->
                  <v-autocomplete
                    outline
                    class="ma-3"
                    hide-details
                    v-model="searchParam.session_year"
                    :item-text="(item) => item.session"
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
                        >{{ data.item.session }}</v-chip
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
                            v-html="data.item.session"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.paper_code"
                    :items="getPaperList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Course"
                    persistent-hint
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removePaper(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{ data.item.code + " - " + data.item.title }}
                      </v-chip>
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
                            v-html="data.item.code + ' - ' + data.item.title"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSubject(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{ data.item.code + " - " + data.item.title }}
                      </v-chip>
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
                            v-html="data.item.code + ' - ' + data.item.title"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    :disabled="ifCenterUser"
                    class="ma-2"
                    v-model="searchParam.center_code"
                    :item-text="
                      (item) => item.center_code + ' - ' + item.center_name
                    "
                    item-value="center_code"
                    :items="getCenterItems"
                    menu-props="auto"
                    label="Select Center"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeCenter(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.center_code + " - " + data.item.center_name
                        }}
                      </v-chip>
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
                              data.item.center_code +
                              ' - ' +
                              data.item.center_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    v-model="searchParam.degree_group_code"
                    :items="getDegreeGroupList"
                    color="primary"
                    label="Select Degree Group"
                    hide-details
                    :item-text="
                      (item) =>
                        item.degree_group_code + ' - ' + item.degree_group_name
                    "
                    item-value="degree_group_code"
                    prepend-icon="list_alt"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.degree_group_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.degree_group_code +
                          " - " +
                          data.item.degree_group_name
                        }}
                      </v-chip>
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
                              data.item.degree_group_code +
                              ' - ' +
                              data.item.degree_group_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchFinalExamineeList">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <v-divider class="mt-5 mb-3"></v-divider> -->
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Final Examinee List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <!-- {{ pagination }} -->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getFinalExamineeList"
        :expand="expand"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <!-- <tr @click="props.expanded = !props.expanded"> -->
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.subject_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.subject_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.student_name }}</td>
          <!-- <td class="text-xs">
            <v-chip :class="showGender(props.item.gender)">
              {{
              showGender(props.item.gender)
              }}
            </v-chip>
          </td>-->
          <!-- ...  -->
          <!-- <td class="text-xs">{{ sl_count + props.index }}</td> -->
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.session_year }}</td>
          <!-- <td class="text-xs">({{ props.item.details.paper_code }}){{ props.item.details.paper_name }}</td> -->

          <!-- <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.course_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.course_code }}</span>
            </v-tooltip>
          </td>-->
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.exam_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.exam_code }}</span>
            </v-tooltip>
          </td>
          <!-- <td class="text-xs">{{ props.item.exam_date }}</td> -->
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.college_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.college_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.degree_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.degree_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.degree_group_name }}</span>
              </template>
              <span class="title"
                >Code: {{ props.item.degree_group_code }}</span
              >
            </v-tooltip>
          </td>

          <td class="text-xs">
            <v-btn
              outline
              color="info"
              @click="showPaperDetails(props.item.details)"
            >
              <b class="mr-2">{{ props.item.details.length }}</b>
              <span v-if="props.item.details.length - 1">Courses</span>
              <span v-else class="mr-2">Paper</span>
              <!-- <span class="mr-2">Paper Details</span> -->
            </v-btn>
          </td>
          <!-- ....  -->

          <!-- <td class="text-xs">{{ props.item.reg_no }}</td>
            <td class="text-xs">({{ props.item.exam_code }}) {{ props.item.exam_name }}</td>
            <td class="text-xs">{{ props.item.session_year }}</td>

          <td class="text-xs">({{ props.item.college_code }}) {{ props.item.college_name }}</td>-->
          <!-- <td class="text-xs">({{props.item.degree_code}}) {{ props.item.subject_code }}</td> -->
          <!-- <td class="text-xs">
              <span v-if="props.item.center_code">({{ props.item.center_code }})</span>
              {{ props.item.center_name }}
            </td>
            <td class="text-xs">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon medium flat @click="showFinalExamineeDetailItem(props.item)">info</v-icon>
                  </v-btn>
                </template>
                <span>Info</span>
              </v-tooltip>
          </td>-->
          <!-- </tr> -->
        </template>
      </v-data-table>
    </v-container>
    <!-- <div class="caption">{{getFinalExamineeList[0]}}</div> -->
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import studentDetail from "@/components/examinee/studentDetails.vue";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    studentDetail,
  },
  data() {
    return {
      menu2: false,
      centerDetailDialog: false,
      currentItem: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      paperDialog: false,
      details: [],

      loading: false,
      sl_count: 0,
      search: "",
      searchParam: {
        full: true,
        admitcard: false,
        final: true,
      },
      expand: false,
      headers: [
        { text: "SL", value: "sl" },
        { text: "Subject", value: "subject_code" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Name", value: "student_name" },
        { text: "Registration No", value: "reg_no" },
        { text: "Session Year", value: "session_year" },
        // { text: "Paper", value: "paper_code" },
        // { text: "Course", value: "course_code" },
        { text: "Exam", value: "exam_name" },
        // { text: "Exam Date", value: "exam_date" },
        { text: "Year", value: "year" },
        { text: "College", value: "college_name" },
        { text: "Degree ", value: "degree_code" },
        { text: "Degree Group", value: "degree_group_code" },

        { text: "Course Details", value: "mandatory_papers" },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = [this.getAuthUser.center.center_code];
    }

    // if (!this.$store.getters.getCenterItems.length) {
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);
    //  }
    // this.$store.dispatch("searchFinalExamineeData", this.searchParam);

    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }

    //exam
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData");
    }
    //session
    this.$store.dispatch("fetchAllSessionData");
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
    //degree group
    this.$store.dispatch("fetchDegreeGroupList");
  },
  computed: {
    //all data
    getFinalExamineeList() {
      return this.$store.getters.getFinalExamineeList;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    //paper
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    //subject
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },
    // center
    getCenterItems() {
      return this.$store.getters.getTheoryCenterList;
    },
    getAuthUserType() {
      return this.$store.getters.getAuthUserType;
    },
  },
  methods: {
    showGender(gender) {
      return gender == 1 ? "Male" : "Female";
    },
    removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
    removeSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "removesubject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    removeSession(item) {
      console.log("session item", item);
      const index = this.searchParam.session_year.indexOf(item.session);
      console.log("session in", index);
      if (index >= 0) this.searchParam.session_year.splice(index, 1);
    },

    showFinalExamineeDetailItem(item) {
      this.currentItem = item;
      this.centerDetailDialog = !this.centerDetailDialog;
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchFinalExamineeList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchFinalExamineeData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    showPaperDetails(details) {
      this.paperDialog = true;
      this.details = details;
      // console.log(details);
    },
  },
  watch: {
    getExamInitiateId(val) {
      console.log("vall", val);
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.searchFinalExamineeList();
    },
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
