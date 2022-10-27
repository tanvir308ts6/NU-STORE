<template>
  <v-container fluid>
    <v-card color="grey lighten-2">
      <v-card color="primary" flat>
        <v-card-title>
          <span class="headline white--text">E-H Type Matching</span>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>

      <v-flex xs12 sm12 md12 class="ma-4 pb-3">
        <v-layout justify-center row fill-height align-center>
          <v-btn round large @click="submit()" color="primary"
            >Match E-H-type</v-btn
          >
        </v-layout>
      </v-flex>
      <v-container fluid>
        <v-card>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title"
                  >E-H-type Matching Process Status</v-card-text
                >
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
              <v-btn
                small
                fab
                :loading="getProgressLoading"
                @click="getProgress()"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-layout>
          </v-card>
          <v-data-table
            :headers="headers"
            :items="getMatchingProgressList"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <!-- <td class="text-xs-center">{{ props.item.unmatch_student }}</td>
              <td class="text-xs-center">{{ props.item.total_e_type }}</td> -->
              <!-- <td class="text-xs-center">{{ props.item.match_e_type }}</td> -->
              <td class="text-xs-center">{{ props.item.unmatch_h_type }}</td>
              <td class="text-xs-center">{{ props.item.match_h_type }}</td>
              <td class="text-xs-center">{{ getUnmatch(props.item) }} </td>
              <td class="text-xs-center">
                <v-chip
                  :color="findcolor(props.item.status)"
                  class="title white--text"
                  >{{ getStatus(props.item.status) }}</v-chip
                >
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import commonFun from "../../mixin/common_function";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonFun, commonGet, watchMixin],
  data: () => ({
    currentItem: [],
    detailsDialog: false,
    getProgressLoading: false,
    st: false,
    searchParam: {},
    param: {},
    loading: false,
    interval: 0,
    headers: [
    //   {
    //     text: "Unmatch Examinee",
    //     value: "unmatch_student",
    //     align: "center",
    //     sortable: false,
    //     width: "15%",
    //   },
    //   {
    //     text: "Total E-Type",
    //     value: "total_e_type",
    //     align: "center",
    //     sortable: false,
    //     width: "15%",
    //   },
      //   {
      //     text: "Matched E-Type",
      //     value: "completed_student",
      //     align: "center",
      //     sortable: false,
      //     width: "15%",
      //   },
      {
        text: "H-Type Count",
        value: "unmatch_h_type",
        align: "center",
        sortable: false,
        width: "15%",
      },
      {
        text: "Match H-Type",
        value: "match_h_type",
        align: "center",
        sortable: false,
        width: "15%",
      },
      {
        text: "Unmatch H-type",
        value: "unmatch",
        align: "center",
        sortable: false,
        width: "15%",
      },
      {
        text: "Status",
        value: "status",
        sortable: false,
        align: "center",
        width: "15%",
      },
    ],
  }),
  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.getProgress();
    },
    getMatchingProgressList(val) {
      console.log("lets see", val);
      if (val[0].status == 3) {
        window.clearInterval(this.interval);
      }
    },
    //after generate button click on mounted interval off as on generate interval called
    loading(val) {
      if (val) {
        window.clearInterval(this.interval);
      }
    },
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.param.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.getProgress();
  },
  mounted() {
    //on reload page interval call
    if (!this.getMatchingProgressList.length) {
      console.log("----> ");
      this.callInterval();
    }
    //on page change onreload interval off and on page change interval call
    if (this.getMatchingProgressList.length) {
      console.log("----> ");
      // window.clearInterval(this.interval);
      this.callInterval();
    }
  },
  computed: {
    getMatchingProgressList() {
      return this.$store.getters.getMatchingProgressList;
    },
  },
  methods: {
    getUnmatch(item) {
      return item.unmatch_h_type - item.match_h_type;
    },
    getStatus(val) {
      console.log(val);
      if (val == 1) {
        return "New";
      } else if (val == 2) {
        return "On going";
      } else {
        return "Matched";
      }
    },
    findcolor(val) {
      console.log(val);
      if (val == 1) {
        return "orange";
      } else if (val == 2) {
        return "blue";
      } else {
        return "green";
      }
    },
    setParam() {
      this.param.exam_code = this.searchParam.exam_code;
      this.param.exam_year = this.searchParam.year;
      //this.param.year = this.searchParam.year;
    },
    submit() {
      this.loading = true;
      this.setParam();
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to Match E-H type?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("callhTypeMatching", this.param)
              .then((data) => {
                console.log("data---", data);
                self.loading = false;
                self.st = true;
                self.getProgress();
                self.callInterval();
              });
          }
        });
    },
    callInterval() {
      var self = this;
      self.interval = window.setInterval(() => self.getProgress(), 5000);
    },
    getProgress() {
      this.getProgressLoading = true;
      //   this.setParam();
      this.$store
        .dispatch("gethTypeMatchingProcess", this.searchParam)
        .then((data) => {
          console.log("data", data);
          this.getProgressLoading = false;
        });
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
.custSty {
  margin: 8px 8px !important;
  padding: 0px 5px !important;
}
.custBtn {
  border-radius: 50px;
}
.bar {
  width: 100%;
  background: #dfdfdf;
  overflow: hidden;
  margin: 5px;
  border-radius: 30px;
}
/* .progress {
  float: left;
  padding: 5px;
  border-radius: 30px;
} */
@keyframes mymove {
  from {
    left: 1px;
  }
  to {
    left: 700px;
  }
}
.anim {
  float: right;
  display: inline;
  padding: 15px;
  border-radius: 30px;
  width: 100px;
  height: 10px;
  background: #f57c00;
  position: relative;
  animation: mymove 5s infinite;
  animation-timing-function: linear;
  background-image: repeating-linear-gradient(
    90deg,
    #f57c00,
    rgb(155, 153, 22) 40%,
    rgb(118, 141, 16)
  );
}
.animoff {
  width: 2px;
  height: 2px;
}
.percent {
  float: center;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
}
/* new ui */
.lang {
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(116, 19, 103);
}
.lang2 {
  margin-left: 3px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(40, 19, 116);
  /* background-image: repeating-linear-gradient(0deg, blue, green 40%, red); */
  background-color: none;
  float: left;
}
.lang3 {
  margin: 3px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(40, 19, 116);
  background-color: none;
  float: right;
}
.progress {
  float: left;
  padding: 10px;
  border-radius: 2px;
}
.custom {
  margin: 5px;
  border-radius: 2px;
  overflow: hidden;
}
.textWhite {
  color: white;
  float: center !important;
  font-size: large;
  vertical-align: middle !important;
}
.textBlack {
  color: black;
  float: right !important;
  font-size: large;
  margin-top: -3px !important;
  /* float: center !important; */
}
</style>
