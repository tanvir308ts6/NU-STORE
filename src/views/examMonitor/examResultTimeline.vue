<template>
  <v-container fluid>
    <!-- {{loading}} -->
    <v-layout>
      <v-flex xs5>
        <span class>
          <div class="display-1 mb-4">
            <v-icon size="50" color="primary">dashboard</v-icon>
            <span class="ml-2">Result Processing Timeline</span>
          </div>
        </span>
      </v-flex>
      <v-flex xs5>
        <!-- <pre> {{getResultActivitiesSummaryData}} </pre> -->
        <v-card class="ml-3 pa-3 mb-0">
          <v-layout>
            <v-flex class="title"
              >New Count: {{ getResultActivitiesSummaryData.new_count }}</v-flex
            >
            <v-flex class="title"
              >In Progress Count:
              {{ getResultActivitiesSummaryData.in_progress_count }}</v-flex
            >
            <v-flex class="title"
              >Completed Count:
              {{ getResultActivitiesSummaryData.completed_count }}</v-flex
            >
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-btn
          class="ml-2"
          style="float:right"
          color="primary"
          @click="addNewStepFormModel = true"
          >Add New Step</v-btn
        >
      </v-flex>
    </v-layout>

    <!-- <v-btn style="float:right" color="primary" @click="addNewStepFormModel =true ">Add New Step</v-btn> -->

    <v-dialog v-model="addNewStepFormModel" max-width="600px">
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">ADD NEW</span>
            <v-spacer></v-spacer>
            <v-btn
              fab
              class="ma-0 pa-0"
              small
              color="white black--text "
              @click="addNewStepFormModel = false"
            >
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-card class="mt-5 mx-4" flat color="white">
          <v-autocomplete
            class="ma-2"
            v-model="searchParam.step_id"
            item-text="title"
            item-value="id"
            :items="getResultActivitiesData"
            menu-props="auto"
            label="Select Step"
            hide-details
            prepend-icon="edit"
            outline
          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" class="chip--select-multi">{{
                data.item.title
              }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content
                  v-text="data.item.title"
                ></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.title"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-card>
        <v-card color="white" flat>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="funcAddExamWiseResultProcessStep"
              >Add New Step</v-btn
            >
          </v-card-title>
        </v-card>
      </v-card>
    </v-dialog>

    <v-card class="ma-3" v-if="false">
      <v-btn v-for="(data, index) in getResultTimeLineData" :key="index">
        <v-btn
          v-for="(item, i) in data.data"
          :key="i"
          flat
          style="pointer-events: none;"
          >{{ item.title }} - {{ item.value }}</v-btn
        >
      </v-btn>
    </v-card>
    <!-- {{getResultTimeLineData[0].url}} -->
    <!-- <v-data-table
      v-if="getResultTimeLineData.length"
      :headers="headers"
      :items="getResultTimeLineData"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <tr @click="goTo(props.item.url)" style="cursor: pointer;">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>
            <span v-for="(obj,i) in props.item.data" :key="i">
              {{ obj.title }} -
              <span class="title">{{ obj.value }}</span>
              <span v-if="!(i==props.item.data.length-1)" class="mx-3">||</span>
            </span>
          </td>
          <td>
            <v-chip :color="getColor_(props.item.status_details)">{{ props.item.status_details }}</v-chip>
          </td>
          <td>
            <v-btn v-if="!(props.item.url==null)" @click="goTo(props.item.url)" small>Visit Page</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>-->
    <!-- <v-card v-else>
      <v-alert :value="true" color="error" icon="warning" outline>No Data To Show</v-alert>
    </v-card>-->

    <v-card flat color="white ml-0 " v-if="getResultTimeLineData.length">
      <v-card color="white ml-0 pl-4" flat>
        <v-timeline v-if="true" dense clipped align-top class="ma-0 pt-4">
          <v-timeline-item
            v-for="(data, index) in getResultTimeLineData"
            :key="index"
            :color="getStatusColor(data)"
            large
          >
            <template v-slot:icon>
              <!-- <v-icon color="white"> </v-icon> -->
              <h2 color="text--white">{{ index + 1 }}</h2>
            </template>

            <v-card class="elevation-4 mr-5" :color="getStatusColor(data)">
              <v-layout column>
                <v-toolbar class="mb-1" flat :color="getStatusColor(data)">
                  <v-btn
                    @click="goTo(data.url)"
                    style="pointer-events: auto;"
                    class="elevation-0 title"
                  >
                    <span>{{ data.title }}</span>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-for="(item, i) in data.data"
                    :key="i"
                    flat
                    style="pointer-events: none;"
                    class="title elevation-0"
                    >{{ item.title }} - {{ item.value }}</v-btn
                  >
                  <v-toolbar-items></v-toolbar-items>
                  <v-chip
                    @click="changeStatusExamResultActivities(data)"
                    :disabled="data.status == '3'"
                    >{{ data.status_details }}</v-chip
                  >
                </v-toolbar>
              </v-layout>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-card>
    <v-card v-else>
      <v-progress-linear v-model="loading" indeterminate></v-progress-linear>
      <v-alert :value="true" color="error" icon="warning" outline
        >No Data To Show</v-alert
      >
    </v-card>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
// import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import * as moment from "moment";
// import formNotification from "@/components/utils/formNotification";
export default {
  mixins: [common_login_getters, commonExamYear, commonGet],
  components: {},

  data() {
    return {
      date: "27th February 2020",
      dateDialog: false,
      searchParam: {},
      headers: [
        { text: "SL.", align: "left", value: "id", sortable: false },
        { text: "Title", value: "title", sortable: false },
        { text: "Data", value: "data", sortable: false },
        { text: "Status", value: "status_details", sortable: false },
        { text: "Visit", value: "status_details", sortable: false },
      ],
      addNewStepFormModel: false,
      loading: false,
      responseData: [],
    };
  },
  created() {
    this.$store.dispatch("fetchExamResultActivitiesData");
  },
  mounted() {
    this.fetchResultTimeLineData();
    this.fetchResultTimeLineSummaryData();
  },
  computed: {
    getResultTimeLineData() {
      return this.$store.getters.getResultTimeLineData;
    },
    getResultActivitiesSummaryData() {
      return this.$store.getters.getResultActivitiesSummaryData;
    },
    getResultActivitiesData() {
      return this.$store.getters.getResultActivitiesData;
    },
  },
  methods: {
    funcAddExamWiseResultProcessStep() {
      console.log(this.searchParam);
      this.$store
        .dispatch("addExamResultActivitiy", this.searchParam)
        .then((data) => {
          this.addNewStepFormModel = false;
          this.fetchResultTimeLineData();
          this.fetchResultTimeLineSummaryData();
        });
    },
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
    fetchResultTimeLineData() {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.exam_year = this.searchParam.year;
      this.loading = true;
      this.$store
        .dispatch("fetchResultTimeLineData", this.searchParam)
        .then((data) => {
          this.responseData = data;
          this.loading = false;
        })
        .catch(function(error) {
          this.loading = false;
        });
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
      // console.log("data:", data);

      // var date = moment(data.end_date, "YYYY-MM-DD");
      // var now = moment();

      // if (data.progress_status == 0) {
      //   if (data.start_date) {
      //     if (now > date) {
      //       return "red";
      //     } else {
      //       return "blue lighten-4";
      //     }
      //   } else {
      //     return "white";
      //   }
      // } else {
      //   return "green";
      // }

      let color = "";
      if (parseInt(data.status) == 1) {
        color = "cyan lighten-2";
      }
      if (parseInt(data.status) == 2) {
        color = "yellow";
      }
      if (parseInt(data.status) == 3) {
        color = "green";
      }
      return color;
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
    changeStatusExamResultActivities(item) {
      if (item.status != '3') {
        this.$root
          .$confirm("Are you sure that you want to change the status ?")
          .then((confirm) => {
            if (confirm) {
              console.log("item:", item);
              this.$store
                .dispatch("changeStatusExamResultActivities", { id: item.id })
                .then(() => {
                  this.fetchResultTimeLineData();
                  this.fetchResultTimeLineSummaryData();
                });
            }
          });
      }
    },
    fetchResultTimeLineSummaryData() {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.exam_year = this.searchParam.year;
      // console.log("this.searchParam:", this.searchParam);

      this.$store.dispatch(
        "fetchExamResultActivitiesSummary",
        this.searchParam
      );
    },
    goTo(val) {
      if (val) {
        window.open(val);
      }
      //  console.log("val", val);
      // this.$router.push({ path: val }).catch((err) => {});
    },
    getColor_(status) {
      if (status === "Completed") {
        return "green lighten-2";
      }
      if (status === "In Progress") {
        return "yellow lighten-2";
      }
      if (status === "New") {
        return "cyan lighten-2";
      }
    },
    getParsedData(data) {
      let str = "";
      data.forEach((obj) => {
        str = str + obj.title + " - " + obj.value + ", ";
      });
      return str;
    },
  },
  watch: {
    getExamInitiateId() {
      this.fetchResultTimeLineData();
      this.fetchResultTimeLineSummaryData();
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
