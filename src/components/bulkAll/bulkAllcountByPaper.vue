<template>
  <v-container fluid>
    <v-dialog v-model="admitCardDialogStatus" fullscreen>
      <v-toolbar dark color="light-blue darken-4" class="mt-1">
        <v-toolbar-title>Information</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="light-blue darken-4" class="mr-5">
            <v-layout row fill-height align-center justify-center>
              Current Center &nbsp; :&nbsp;
              {{ currentItem.center_code }} - {{
              currentItem.center_name
              }}
            </v-layout>
          </v-card>

          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white;">
        <admitCardDialog ref="refAdmitCard" :dialogStatus.sync="admitCardDialogStatus"></admitCardDialog>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex xs1 />
      <v-flex xs6 class="mr-5">
        <v-layout align-center justify-center row fill-height>
          <v-autocomplete
            class="ma-0"
            v-model="currentSubject.subject_code"
            :items="getSubjectList"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            label="Select Subject"
            single-line
            outline
            persistent-hint
            prepend-inner-icon="library_books"
            hide-details
            readonly
            dense
          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" class="chip--select-multi">
                {{
                data.item.code + " - " + data.item.title
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
                     data.item.code + ' - ' + data.item.title
                    "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
          <!--  <v-btn
            style="margin-left: -25.0em "
            @click="downLoadrollDescriptive()"
          >DOWNLOAD roll Descriptive Sheet</v-btn>-->
          <!--  <v-btn style="margin-left: -36.0em " @click="downloadAdmit()">DOWNLOAD Admit card</v-btn> -->
          <!-- downloadAdmit -->
        </v-layout>
      </v-flex>
      <v-flex xs1 />
    </v-layout>

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
              <v-card-text class="title">Bulk By Paper</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>

      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAdmitCardDataByPaper"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs" style="padding: 0 0px; !important">
            <v-chip color="transparent">{{ props.item.exam_code }} - {{ props.item.exam_name }}</v-chip>
          </td>
          <td class="text-xs" style="padding: 0 0px; !important">
            <v-chip
              color="transparent"
            >{{ props.item.college_code }} - {{ props.item.college_name }}</v-chip>
          </td>
          <td class="text-xs" style="padding: 0 0px; !important">
            <v-chip
              color="transparent"
            >{{ props.item.subject_code }} - {{ props.item.subject_name }}</v-chip>
          </td>
          <td class="text-xs-left" style="padding: 0 0px; !important">
            <v-btn
              small
              class="text-xs-left"
              @click="viewAdmitCardColDetails(props.item)"
            >{{ props.item.paper_code }} - {{ props.item.paper_name }}</v-btn>
          </td>

          <!-- <td class="text-xs">{{ props.item.session }}</td> -->
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.student_count }}</td>
          <!-- <td>
            <v-btn @click="downLoadrollDescriptive(props.item)">roll Descriptive Sheet</v-btn>
          </td>-->
          <td class="justify-center text-xs-center">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  color="primary"
                  v-on="on"
                  @click="downloadCertificate(props.item)"
                >Certificate</v-btn>
              </template>
              <span>Download</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  color="primary"
                  v-on="on"
                  @click="downloadTranscript(props.item)"
                >Transcript</v-btn>
              </template>
              <span>Download</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  color="primary"
                  v-on="on"
                  @click="downloadMarksheet(props.item)"
                >Marksheet</v-btn>
              </template>
              <span>Download</span>
            </v-tooltip>
          </td>
          <!-- <td class="justify-center text-xs-center">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn fab small color="primary" v-on="on">
                  <v-icon medium flat @click="downloadAdmit(props.item)">cloud_download</v-icon>
                </v-btn>
              </template>
              <span>Download</span>
            </v-tooltip>
          </td>-->
        </template>
      </v-data-table>
    </v-container>

    <!-- <div style="opacity: 0.2;" class="mt-5">
      came from :
      <pre>
        {{currentSubject}}
      </pre>
      <v-divider />
      <pre> {{getAdmitCardDataByPaper}}</pre>
    </div>-->
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import admitCardDialog from "@/components/bulkAll/bulkFinal.vue";
export default {
  props: ["dialogStatus", "currentSubject"],
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
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },

      search: "",
      sl_count: 0,
      loading: false,
      searchParam: {},
      expand: false,
      headers: [
        { text: "SL.", align: "left", value: "id", sortable: false },
        { text: "Exam", value: "exam_code", sortable: false },
        { text: "College ", value: "college_code", sortable: false },
        { text: "Subject", value: "subject_code", sortable: false },
        { text: "Paper", value: "paper_code", sortable: false },
        { text: "Year", value: "year", sortable: false },
        {
          text: "Examinee Count",
          align: "center",
          value: "student_count",
          sortable: false,
        },
        { text: "Download", align: "center", value: "view", sortable: false },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    // this.$store.dispatch("fetchAdmitCardDataBySubject", this.searchParam);
  },
  computed: {
    getAdmitCardDataByPaper() {
      return this.$store.getters.getAdmitCardDataByPaper;
    },
  },
  methods: {
    getParam() {
      let param = {};
      param.college_code = this.currentSubject.college_code;
      //param.center_code = this.currentSubject.center_code;
      param.subject_code = this.currentSubject.subject_code;
      param.exam_initiate_id = this.currentSubject.exam_initiate_id;
      param.exam_code = this.currentSubject.exam_code;
      param.year = this.currentSubject.year;
      return param;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    downLoadrollDescriptive() {
      this.$store.dispatch("downloadRollDescriptiveSheet", this.getParam());
    },
    downloadAttendanceSheet(item) {
      let param = this.getParam();
      param.paper_code = item.paper_code;
      console.log("downloadAttendanceSheet:::", param);
      this.$store.dispatch("downloadAttendanceSheet", param);
    },
    // downloadAdmit(item) {
    //   let param = {};

    //   param = this.getParam();
    //   param.module_name = "College";
    //   param.exam_year = param.year;
    //   delete param.year;

    //   this.$store.dispatch("downloadAdmitCollegewise", param).then(result => {
    //     console.log("in then", result);
    //     result.forEach(url => {
    //       setTimeout(function() {
    //         var fileLink = document.createElement("a");
    //         fileLink.href = url;
    //         fileLink.setAttribute("download", "file.pdf");
    //         fileLink.setAttribute("target", "_blank");
    //         document.body.appendChild(fileLink);
    //         fileLink.click();
    //       }, 1000);
    //     });
    //   });
    // },
    downloadCertificate(item) {
      let param = {};

      param = this.getParam();
      param.module_name = "College";
      param.exam_year = param.year;
      delete param.year;

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
    downloadTranscript(item) {
      let param = {};

      param = this.getParam();
      param.module_name = "College";
      param.exam_year = param.year;
      delete param.year;

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
    downloadMarksheet(item) {
      let param = {};

      param = this.getParam();
      param.module_name = "College";
      param.exam_year = param.year;
      delete param.year;

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
    // resolve(response.data.meta);
    fetchAdmitCardDataByPaper() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchAdmitCardDataByPaper", this.searchParam)
        .then((data) => {
          console.log("return data fetchAdmitCardDataByPaper-<", data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },

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
    downloadAdmit_(item) {
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
      this.currentItem = item;
      this.$store.commit("SET_ADMIT_CARD_CURRENT_ITEM_DETAILS", item);
      this.admitCardDialogStatus = true;
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    },
    // downLoadrollDescriptive() {
    //   this.$store.dispatch("downloadRollDescriptiveSheet", this.currentSubject);
    // }
  },
  watch: {
    pagination() {
      this.fetchAdmitCardDataByPaper();
    },
    currentSubject(val) {
      console.log("sppsps");
      //this.searchParam.center_code = val.center_code;
      this.searchParam.subject_code = val.subject_code;
      this.searchParam.college_code = val.college_code;
      this.fetchAdmitCardDataByPaper();
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
