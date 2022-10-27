<template>
  <v-container fluid :style="getStyle">
    <!-- {{getCorrectCenterStatus}} -->
    <!-- {{ifCenterUser}} -->
    <v-dialog v-model="admitCardDialogStatus" fullscreen>
      <v-toolbar dark color="light-blue darken-1">
        <v-toolbar-title>
          <router-link
            v-if="isNotInConfig()"
            class="btn btn-fill btn-default"
            tag="button"
            to="/center/center-dashboard"
            >Examinee Count By Center</router-link
          >

          <router-link
            v-if="isNotInConfig2()"
            class="btn btn-fill btn-default"
            tag="button"
            to="/admit-card-dd"
            >AdmitCard info By College</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-card flat color="light-blue darken-1" class="mr-5">
            <v-layout row fill-height align-center justify-center>
              Current Center &nbsp; :&nbsp;
              {{ current.center_code }} - {{ current.center_name }}
            </v-layout>
          </v-card>
          <v-btn dark flat @click="close">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card style="background-color: white">
        <admitCardCountByCollege
          :dialogStatus.sync="admitCardDialogStatus"
          :current="current"
        ></admitCardCountByCollege>
      </v-card>
    </v-dialog>

    <v-container fluid :style="getStyle">
      <v-card color="white" v-if="!fromDashboard">
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
              <v-card-text class="title">Admit Card By Center..</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
      <!-- ...  -->
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAdmitCardDataByCenter"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        :hide-actions="fromDashboard"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">
            {{ props.item.exam_code }} - {{ props.item.exam_name }}
          </td>
          <td class="text-xs-left">
            <v-btn @click="viewAdmitCardColDetails(props.item)"
              >{{ props.item.center_code }} -
              {{ props.item.center_name }}</v-btn
            >
          </td>

          <!-- <td class="text-xs">({{ props.item.college_code }}) {{ props.item.college_name }}</td> -->

          <!-- <td class="text-xs">{{ props.item.session }}</td> -->
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.student_count }}</td>
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
          <!-- <td class="justify-center text-xs-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  outline
                  color="primary"
                  v-on="on"
                  @click="viewAdmitCardColDetails(props.item)"
                >Show Details of College</v-btn>
              </template>
              <span>Show Details of {{ props.item.student_count }} students.</span>
            </v-tooltip>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
    <!-- {{getExamInitiateId}} -->
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import admitCardCountByCollege from "@/components/admitCard/admitCardCountByCollege.vue";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    admitCardCountByCollege,
  },
  props: {
    fromDashboard: Boolean,
  },
  data() {
    return {
      admitCardDialogStatus: false,
      currentItem: {},
      current: {},
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
        { text: "SL.", align: "left", value: "id", sortable: false },
        { text: "Exam", value: "exam_code", sortable: false },
        { text: "Center", value: "center_code", sortable: false },
        // { text: "College ", value: "college_code", sortable: false },

        { text: "Year", value: "year", sortable: false },
        {
          text: "Examinee Count",
          align: "center",
          value: "student_count",
          sortable: false,
        },
        // { text: "Download", align: "center", value: "view", sortable: false },
        // {
        //   text: "Show Details",
        //   align: "center",
        //   value: "view",
        //   sortable: false
        // }
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }

    // this.$store.dispatch("fetchAdmitCardDataByCenter", this.searchParam);
  },
  computed: {
    getStyle() {
      if (this.fromDashboard) {
        return "padding:0px";
      } else {
        return "";
      }
    },
    getAdmitCardDataByCenter() {
      return this.$store.getters.getAdmitCardDataByCenter;
    },
  },
  methods: {
    setLimit() {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.center_code;
      }
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    isNotInConfig() {
      return this.$router.history.current["path"] !== "/admit-card-dd";
    },
    isNotInConfig2() {
      return (
        this.$router.history.current["path"] !== "/center/center-dashboard"
      );
    },
    // resolve(response.data.meta);
    fetchAdmitCardDataByCenter() {
      this.loading = true;
      this.setLimit();
      console.log("++++++++++++++ sp :", this.searchParam);
      this.$store
        .dispatch("fetchAdmitCardDataByCenter", this.searchParam)
        .then((data) => {
          console.log("return data -<", data);
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
      //   this.$store.commit("SET_ADMIT_CARD_CURRENT_ITEM_DETAILS", item);
      this.current = item;
      // console.log(item.center_code);
      // this.current.center_code
      this.admitCardDialogStatus = true;
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    },
  },
  watch: {
    pagination() {
      this.fetchAdmitCardDataByCenter();
    },
    getExamInitiateId() {
      this.fetchAdmitCardDataByCenter();
    },
    getCorrectCenterStatus(val) {
      if (val) {
        this.fetchAdmitCardDataByCenter();
      }
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
