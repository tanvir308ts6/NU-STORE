<template>
  <!-- <v-container fluid> -->
  <v-card class="ma-2">
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

    <v-layout v-else column>
      <v-container fluid>
        <v-layout row wrap justify-center align-center>
          <span class>
            <div class="display-1 mb-0">
              <v-icon size="40" color="primary">dashboard</v-icon>
              <span class="ml-2">Today's Summary</span>
            </div>
          </span>
          <v-spacer />
          <!-- <v-btn @click="exportPdf" color="primary" dark>
            <v-icon dark>arrow_downward</v-icon>Download Exam Summary
          </v-btn>-->
        </v-layout>

        <v-layout wrap v-if="show">
          <!-- dataSum -->
          <v-flex v-for="(item, i) in getIconColorLink" :key="i">
            <v-layout
              style="margin: 20px"
              row
              align-center
              justify-center
              wrap
              fill-height
            >
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="` elevation-${hover ? 12 : 2}`"
                  height="70"
                  width="300"
                  @click="goTo(item.link)"
                  style="border-radius: 10px"
                >
                  <v-layout
                    column
                    wrap
                    fill-height
                    align-start
                    justify-start
                    align-content-start
                  >
                    <v-card
                      :color="item.color"
                      height="70"
                      width="70"
                      style="border-radius: 10px 0 0 10px"
                    >
                      <!-- /* top-left | top-right | bottom-right | bottom-left */ -->

                      <v-layout align-center justify-center row fill-height>
                        <!-- <v-icon color="white" size="50">{{ item.icon }}</v-icon> -->
                        <div class="display-2">
                          {{ item.title[0].charAt(0).toUpperCase() }}
                        </div>
                      </v-layout>
                    </v-card>

                    <v-card
                      flat
                      max-width="200"
                      width="200"
                      max-height="80"
                      height="80"
                    >
                      <div class="ml-3" style="font-size: 2.2em">
                        <b>
                          <i-count-up
                            :delay="delay"
                            :start="0"
                            :endVal="item.title[1]"
                            :options="options"
                            :callback="callback"
                          ></i-count-up>
                        </b>
                      </div>

                      <h4 class="ml-3">
                        {{ item.title[0].toUpperCase().split("_").join(" ") }}
                      </h4>
                    </v-card>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex v-for="(item, i) in getIconColorInv" :key="i">
            <v-layout
              style="margin: 20px"
              row
              align-center
              justify-center
              wrap
              fill-height
            >
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="` elevation-${hover ? 12 : 2}`"
                  height="80"
                  width="300"
                  @click="goTo(item.link)"
                  style="border-radius: 10px"
                >
                  <v-layout
                    column
                    wrap
                    fill-height
                    align-start
                    justify-start
                    align-content-start
                  >
                    <v-card
                      :color="item.color"
                      height="80"
                      width="70"
                      style="border-radius: 10px 0 0 10px"
                    >
                      <v-layout align-center justify-center row fill-height>
                        <v-icon color="white" size="50">{{ item.icon }}</v-icon>
                        <!-- <div class="display-2">
                          {{ item.title[0].charAt(0).toUpperCase() }}
                        </div> -->
                      </v-layout>
                    </v-card>

                    <v-card
                      flat
                      max-width="200"
                      width="200"
                      max-height="80"
                      height="80"
                      v-if="dataInv != 0"
                    >
                      <div class="ml-3" style="font-size: 2.2em">
                        <b>
                          <i-count-up
                            :delay="delay"
                            :start="0"
                            :endVal="dataInv"
                            :options="optionsl"
                            :callback="callback"
                          ></i-count-up>
                        </b>
                      </div>

                      <h4 class="ml-3">INVIGILATOR COUNT</h4>
                    </v-card>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
  <!-- </v-container>
  <v-card
  slot-scope="{ hover }"
  :class="` elevation-${hover ? 12 : 2}`"
  height="150"
  width="250"
  @click="goTo(item.link)"
>
                  <v-layout align-center justify-center row fill-height>
                    <v-layout
                      style="margin-top:-30px"
                      class="ml-3"
                      row
                      align-top
                      justify-center
                      fill-height
                    >
                      <v-card :color="item.color" height="60" width="60">
                        <v-layout column align-center justify-center row fill-height>
                          <v-icon color="white" size="60">
                            {{
                            item.icon
                            }}
                          </v-icon>
                        </v-layout>
                      </v-card>
                      <v-card class="ml-3" color="transparent" flat height="80" width="180">
                        <v-layout column align-start justify-end row fill-height>
                          <h3>
                            {{
                            item.title[0]
                            .toUpperCase()
                            .split('_')
                            .join(' ')
                            }}
                          </h3>
                        </v-layout>
                        <v-card class="mb-2" height="2" width="150" dark></v-card>
                      </v-card>
                      <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout align-center justify-center fill-height column class="mt-4 mr-5">
                      <v-card class="mt-5 mr-5 pa-3" color="cyan lighten-4">
                        <v-layout align-center justify-center fill-height>
                          <div style="font-size:2.3em;">
                            <b>
                              <i-count-up
                                :delay="delay"
                                :start="0"
                                :endVal="parseInt(item.title[1])"
                                :options="options"
                                :callback="callback"
                              ></i-count-up>
                            </b>
                          </div>
                        </v-layout>
                      </v-card>
                    </v-layout>
                  </v-layout>
                </v-card>
  -->
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";

import ICountUp from "vue-countup-v2";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { ICountUp },

  data: () => ({
    show: false,
    dataSum: [],
    dataInv: {
      title: "rrrrr",
    },
    searchParam: {
      date: new Date().toISOString().substr(0, 10),
    },
    invCountPar: {},
    updateCount: false,
    delay: 1000,
    options: {
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
      // decimalPlaces: 2,
      prefix: "",
      suffix: "",
    },
    optionsl: {
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
      // decimalPlaces: 2,
      prefix: "",
      suffix: "",
    },
    loading: false,
    interval: null,
    interval2: null,
  }),
  // destroyed() {
  //   window.clearInterval(this.interval);
  //   window.clearInterval(this.interval2);
  // },
  beforeDestroy() {
    window.clearInterval(this.interval);
    window.clearInterval(this.interval2);
  },
  // beforeRouteLeave(to, from, next) {
  //   if (this.interval) window.clearInterval(this.interval);
  //   next();
  // },
  created() {
    this.searchParam.attendance_date = this.searchParam.date;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_code = this.getLoggedInExam.code;

    this.invCountPar.exam_year = this.getLoggedInYear.year;
    this.invCountPar.exam_code = this.getLoggedInExam.code;
    this.invCountPar.exam_initiate_id = this.getExamInitiateId;
    this.invCountPar.count = true;
    if (this.ifCenterUser) {
      this.invCountPar.center_code = this.getAuthUser.center.center_code;
    }
    this.loading = true;
    if (this.ifCenterUser) {
      console.log(
        "this.getAuthUser.center.center_code",
        this.getAuthUser.center.center_code
      );
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    var that = this;
    that.$store
      .dispatch("attSummaryCenterwiseData", that.searchParam)
      .then((data) => {
        console.log("d", data);
        that.dataSum = data.data;
        that.loading = false;
        that.show = true;
        that.getProcessedData();
      });

    this.interval = window.setInterval(function () {
      that.$store
        .dispatch("attSummaryCenterwiseData", that.searchParam)
        .then((data) => {
          console.log("d", data);
          that.dataSum = data.data;
          that.loading = false;
          that.show = !that.show; //for rendering
          that.show = !that.show; //for rendering and instant show
          that.getProcessedData();
        });
    }, 30000);

    that.$store.dispatch("CenterwiseInvData", that.invCountPar).then((data) => {
      that.dataInv = data.data;
      console.log("that.dataInv", that.dataInv);
      that.getProcessedData();
    });
    this.interval2 = window.setInterval(function () {
      that.$store
        .dispatch("CenterwiseInvData", that.invCountPar)
        .then((data) => {
          that.dataInv = data.data;
          console.log("that.dataInv", that.dataInv);
          that.getProcessedData();
        });
    }, 30000);
  },
  computed: {
    //att. summary centerwise
    // attSummaryByCenterList() {
    //   console.log(
    //     "this.$store.getters.attSummaryByCenterList",
    //     this.$store.getters.attSummaryByCenterList
    //   );
    //   return this.$store.getters.attSummaryByCenterList;
    // },

    getIconColorLink() {
      return [
        {
          icon: "people",
          link: "/final-examinee-list",
          color: "cyan darken-4",
        },
        { icon: "check", link: "/std-attendance", color: "green" },
        { icon: "close", link: "/std-attendance", color: "red" },
        { icon: "unpublished", link: "/report-withheld", color: "orange" },
      ];
    },
    getIconColorInv() {
      return [
        {
          icon: "people",
          link: "/invigilator-list-detail",
          color: "cyan darken-4",
        },
      ];
    },
  },
  watch: {
    getCorrectCenterStatus(val) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      this.invCountPar.center_code = this.getAuthUser.center.center_code;
      if (val) {
        var that = this;
        that.$store
          .dispatch("attSummaryCenterwiseData", that.searchParam)
          .then((data) => {
            console.log("d", data);
            that.dataSum = data.data;
            this.loading = false;
            that.getProcessedData();
          });
      }
    },
    getExamInitiateId() {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      this.invCountPar.center_code = this.getAuthUser.center.center_code;
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.year = this.getLoggedInYear.year;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
    },
  },
  methods: {
    getProcessedData() {
      //it was in computed
      var that = this;
      if (that.dataSum.length) {
        var arr = Object.entries(that.dataSum[0]);
        console.log("arr", arr);
        let arrr = arr.slice(7);
        return that.getIconColorLink.map((item, index) => {
          item.title = arrr[index];
          return item;
        });
      } else {
        that.dataSum = {
          exam_initiate_id: "63",
          exam_code: "3302",
          exam_name: "Masters Final",
          year: "2017",
          center_code: "103",
          center_name: "SATKHIRA GOVT. MAHILA COLLEGE",
          attendance_date: "2020-07-14",
          total_student: 0,
          present_student: 0,
          absent_student: 0,
          reported_student: 0,
        };
        console.log("arr.", that.dataSum);
        var arr = Object.entries(that.dataSum);
        console.log("arr", arr);
        let arrr = arr.slice(7);
        that.getIconColorLink.map((item, index) => {
          item.title = arrr[index];
          return item;
        });
      }
    },
    callback: function (ins) {
      ins.update(ins.endVal + 100);
    },
    exportPdf() {
      this.$store.dispatch("exportExamSummary", this.downParam);
    },
    goTo(val) {
      window.open(val);
      // .catch((err) => {
      //   console.log(err);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.iCountUp {
  font-size: 3em;
}
</style>
