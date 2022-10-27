<template>
  <v-container fluid>
    <v-dialog v-model="admitCardDialogStatus" fullscreen>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Admit Card List ( College-Wise )</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <admitCardDialog ref="refAdmitCard" :dialogStatus.sync="admitCardDialogStatus"></admitCardDialog>
      </v-card>
    </v-dialog>
    <v-expansion-panel class="mb-4" inset v-model="open" v-if="forceRerenderFlag">
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
        <v-layout column class="mx-5">
          <v-flex class="mx-5 pr-5">
            <v-layout row wrap align-center>
              <v-flex xs7>
                <v-autocomplete
                  disabled
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="item =>  item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      color="#FAFAFA"
                    >{{ data.item.code + " - " + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs5>
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
                  prepend-icon="calendar_today"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- <v-divider inset /> -->
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    outline
                    class="ma-2"
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    outline
                    class="mt-4 ml-2 mr-2 mb-2"
                    v-model="searchParam.center_code"
                    :item-text="item =>  item.center_code + ' - ' + item.center_name"
                    item-value="center_code"
                    :items="getCenterItems"
                    label="Select Center"
                    prepend-icon="list"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.center_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        data.item.center_code +
                        " - " +
                        data.item.center_name
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
                            '(' +
                              data.item.center_code +
                              ') ' +
                              data.item.center_name
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
          <v-flex xs12 sm12 md12 style="margin-top:5px;margin-bottom:8px;">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchAdmitCardCollegewiseList">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- <div class="text-xs-center">
      <v-btn
        round
        color="primary"
        dark
        @click="processAdmitCardGenColWise()"
      >Admit Generate College-wise</v-btn>
    </div>-->
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
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Admit Card College-wise List</v-card-text>
            </v-badge>
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
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAdmitCardGroupByCollegeList"
        :expand="expand"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.exam_code }} - {{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.college_code }} - {{ props.item.college_name }}</td>
          <!-- <td class="text-xs">{{ props.item.session }}</td> -->
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.student_count }}</td>
          <td class="justify-center text-xs-center">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn flat fab small v-on="on" target="_blank" @click="downloadAdmit(props.item)">
                  <img src="@/assets/nu_logos/pdf1.png" style="width: 70% !important;" />
                </v-btn>
              </template>

              <span>Download Admit Card</span>
            </v-tooltip>
          </td>
          <td class="justify-center text-xs-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  outline
                  color="primary"
                  v-on="on"
                  @click="viewAdmitCardColDetails(props.item)"
                >
                  <v-icon left>remove_red_eye</v-icon>Show Details
                </v-btn>
              </template>
              <span>Show Details of {{ props.item.student_count }} students.</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import admitCardDialog from "@/components/admitCard/admitCardByColDetails.vue";
export default {
  mixins: [commonGet, commonExamYear],
  components: {
    admitCardDialog,
  },
  data() {
    return {
      admitCardDialogStatus: false,
      currentItem: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      sl_count: 0,
      loading: false,
      searchParam: {},
      expand: false,
      headers: [
        { text: "SL.", align: "left", value: "id" },
        { text: "Exam", value: "exam_code" },
        { text: "College ", value: "college_code" },
        // { text: "Session", value: "session" },
        { text: "Year", value: "year" },
        { text: "Student Count", align: "center", value: "student_count" },
        { text: "Download", align: "center", value: "view", sortable: false },
        {
          text: "Show Details",
          align: "center",
          value: "view",
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.searchParam.type = "college";
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    if (!this.$store.getters.getTheoryCenterList.length) {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      this.$store.dispatch("fetchTheoryWiseCenterData", param);
    }
  },
  computed: {
    // center
    getCenterItems() {
      return this.$store.getters.getTheoryCenterList;
    },

    //all data
    getAdmitCardGroupByCollegeList() {
      return this.$store.getters.getAdmitCardGroupByCollegeList;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
  },
  methods: {
    processAdmitCardGenColWise() {
      // console.log("--->", this.searchParam.exam_code);

      if (this.searchParam.exam_code == null || this.searchParam.year == null) {
        console.log("in if --> Null");
        this.$store.commit("SET_SNACKBAR", {
          msg: "Exam or Year not selected ",
          color: "red",
        });
      } else {
        console.log("in else --> Not Null");
        this.$root
          .$confirm("Are you sure that you want to Generate?")
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("generateAdmitCardColwise", this.searchParam)
                .then(() => {
                  console.log("success");
                });
            }
          });
      }
    },
    onStartedDownload(id) {
      console.log(`Started downloading: ${id}`);
    },

    onFailed(error) {
      console.log(`Download failed: ${error}`);
    },
    downloadAdmit(item) {
      console.log("down method", item);
      var param = {
        exam_code: item.exam_code,
        exam_year: item.year,
        college_code: item.college_code,
        module_name: "College",
      };

      this.$store.dispatch("downloadAdmitCollegewise", param).then((result) => {
        console.log("in then", result);
        result.forEach((url) => {
          setTimeout(function () {
            var fileLink = document.createElement("a");
            fileLink.href = url;
            fileLink.setAttribute("download", "file.pdf");
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
          }, 1000);
        });
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    // resolve(response.data.meta);
    searchAdmitCardCollegewiseList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAdmitCardCollegewiseData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    viewAdmitCard(item) {
      this.$refs.refAdmitCard.searchParam.exam_code = item.exam_code;
      this.$refs.refAdmitCard.searchParam.college_code = item.college_code;
      this.$refs.refAdmitCard.searchParam.year = item.year;
      this.$refs.refAdmitCard.searchParam.session_year = item.session;
      this.$refs.refAdmitCard.admitGenMode = false;
      this.$refs.refAdmitCard.centerMode = false;
      this.$refs.refAdmitCard.collegeMode = false;
      this.$refs.refAdmitCard.paperMode = false;
      this.$refs.refAdmitCard.regMode = true;
      this.$refs.refAdmitCard.searchAdmitCardList();
      this.admitCardDialogStatus = !this.admitCardDialogStatus;
    },
    viewAdmitCardColDetails(item) {
      this.$store.commit("SET_ADMIT_CARD_CURRENT_ITEM_DETAILS", item); //setting current data & then these value set to searchparam on dialog open
      this.admitCardDialogStatus = true;
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
      this.$store.commit("UNSET_ADMIT_CARD_CURRENT_ITEM_DETAILS"); //unsetting on dialog close to load data on same row open
    },
  },
  watch: {
    pagination() {
      this.searchAdmitCardCollegewiseList();
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
