<template>
  <v-container fluid>
    <!-- {{getExamInitiateId}} -->
    <!-- {{getAuthUserExamInitiates[0].id}} -->
    <!-- {{getTimeLineData.length}} -->
    <v-dialog v-model="dateDialog" width="800">
      <timelineDateUpdate></timelineDateUpdate>
    </v-dialog>
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50" color="primary">dashboard</v-icon>
        <span class="ml-2">Exam Timeline</span>
      </div>
    </span>
    <!-- <v-toolbar  color="#FAFAFA" class="mb-1" flat>
      <div class="ml-3 mb-3 examtimeline text-xs-left">
        <v-btn round disabled style="color: red;">
          <span class="display-1 customExamTimeLineCss">Exam Timeline</span>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
   
    </v-toolbar>-->

    <v-card color="white ml-4 " v-if="getTimeLineData.length">
      <v-card color="white ml-4 pl-4" flat>
        <v-timeline dense clipped align-top class="ma-0 pt-4">
          <v-timeline-item
            v-for="(data, index) in getTimeLineData"
            :key="index"
            :color="getStatusColor(data)"
            large
          >
            <template v-slot:icon>
              <v-icon color="white">account_balance</v-icon>
            </template>

            <v-card class="elevation-4 mr-5" :color="getStatusColor(data)">
              <v-layout column>
                <v-toolbar class="mb-1" flat :color="getStatusColor(data)">
                  <v-btn style="pointer-events: none;" flat class="title">{{
                    data.activity_name
                  }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-toolbar-items></v-toolbar-items>
                  <v-btn
                    style="pointer-events:none;"
                    flat
                    small
                    v-if="data.start_date"
                    class="title"
                  >
                    <v-chip small style="margin-top:-2em ; margin-right:-1.2em"
                      >Start</v-chip
                    >
                    <v-chip
                      label
                      class="subheading font-weight-medium"
                      style="z-index: 10;"
                      >{{ getFormatedDate(data.start_date) }}</v-chip
                    >
                  </v-btn>
                  <v-btn
                    style="pointer-events:none;"
                    class="title"
                    flat
                    small
                    v-if="checkIfEndDate(data)"
                  >
                    <v-chip
                      label
                      class="subheading font-weight-medium"
                      style="z-index: 10;"
                      >{{ getFormatedDate(data.end_date) }}</v-chip
                    >
                    <v-chip small style="margin-top:-2em ; margin-left:-1.2em"
                      >End</v-chip
                    >
                  </v-btn>
                  <v-btn
                    v-if="data.notice_url"
                    small
                    color="primary"
                    @click="downloadNotice(data.notice_url)"
                  >
                    notice
                    <v-icon right>notifications</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-layout>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-card>
    <v-card v-else>
      <v-alert :value="true" color="error" icon="warning" outline
        >No Data To Show</v-alert
      >
    </v-card>

    <!-- {{getTimeLineData}} -->
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
// import commonGet from "../../mixin/common_getters_mixin";
import timelineDateUpdate from "@/components/examTimeline/examTimelineDateUpdate";
import common_login_getters from "../../mixin/common_login_getters";
import * as moment from "moment";
// import formNotification from "@/components/utils/formNotification";
export default {
  mixins: [common_login_getters, commonExamYear, commonGet],
  components: {
    timelineDateUpdate,
  },
  // mixins: [commonGet],
  // $_veeValidate: {
  //   validator: "new"
  // },
  data() {
    return {
      date: "27th February 2020",
      dateDialog: false,
      searchParam: {},
    };
  },
  created() {},
  mounted() {
    this.getExamTimeLineData();
  },
  computed: {
    getTimeLineData() {
      return this.$store.getters.getTimeLineData;
    },
  },
  methods: {
    downloadNotice(url) {
      // console.log("ashfjkahsfd", url);
      if (url) {
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.setAttribute("download", "file.pdf");
        fileLink.setAttribute("target", "_blank");
        document.body.appendChild(fileLink);
        fileLink.click();
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No notice to download",
          color: "red",
        });
      }
    },
    getExamTimeLineData() {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.limit = -1;
      this.$store.dispatch("fetchExamTimeLineData", this.searchParam);
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    checkIfEndDate(date) {
      if (date.activity_name === "Exam Initiate") {
        return false;
      }
      return date.end_date;
    },
    getStatusColor(data) {
      var date = moment(data.end_date, "YYYY-MM-DD");
      var now = moment();

      if (data.progress_status == 0) {
        if (data.start_date) {
          if (now > date) {
            return "red";
          } else {
            return "blue lighten-4";
          }
        } else {
          return "white";
        }
      } else {
        return "green";
      }
    },
    getStatusColorLogo(date) {
      var date = moment(data.end_date, "YYYY-MM-DD");
      var now = moment();

      if (data.progress_status == 0) {
        if (data.start_date) {
          if (now > date) {
            return "red";
          } else {
            return "blue ";
          }
        } else {
          return "black";
        }
      } else {
        return "green";
      }
    },
  },
  watch: {
    getExamInitiateId() {
      this.getExamTimeLineData();
    },
  },
};
</script>

<style lang="scss">
.examtimeline {
  .theme--light.v-btn.v-btn--disabled {
    color: rgba(0, 0, 0, 1) !important;
  }
  .theme--light.v-btn.v-btn--disabled .v-icon {
    color: rgba(0, 0, 0, 1) !important;
  }
  .customExamTimeLineCss {
    margin-top: -0.7em;
    // margin-right: 2em;
  }
}
</style>
