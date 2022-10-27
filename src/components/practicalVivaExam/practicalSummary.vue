<template>
  <!-- <v-container fluid> -->
  <v-card flat class="my-0">
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <v-layout v-else column>
      <v-container fluid>
        <v-layout row wrap justify-center align-center>
          <span class>
            <div class="display-1 mb-4">
              <v-icon size="40" color="primary">dashboard</v-icon>
              <span class="ml-2">Practical Summary</span>
            </div>
          </span>
          <v-spacer />
          <!-- <v-btn @click="exportPdf" color="primary" dark>
            <v-icon dark>arrow_downward</v-icon>Download Exam Summary
          </v-btn>-->
        </v-layout>
        <!-- <pre> {{getIconColorLink}}</pre> -->
        <v-layout wrap v-if="show">
          <v-flex
            v-for="(item, i) in getIconColorLink"
            :key="i"
            sm6
            md4
            lg3
            xs8
          >
            <!-- <v-flex v-for="(item, i) in getProcessedData" :key="i"> without window size works fine -->
            <v-layout
              style="margin: 15px"
              align-center
              justify-center
              row
              wrap
              fill-height
            >
              <!-- column wrap  -->
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="` elevation-${hover ? 12 : 2}`"
                  height="80"
                  width="300"
                  style="border-radius: 10px"
                  @click="goTo(item.link)"
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
                      <!-- /* top-left | top-right | bottom-right | bottom-left */ -->

                      <v-layout align-center justify-center row fill-height>
                        <v-icon color="white" size="50">{{ item.icon }}</v-icon>
                      </v-layout>
                    </v-card>

                    <v-card
                      flat
                      max-width="200"
                      width="200"
                      max-height="80"
                      height="80"
                    >
                      <div
                        class="ml-3"
                        style="font-size: 2.2em"
                        v-if="
                          item.title[0] != 'status' &&
                          item.title[0] != 'start_date' &&
                          item.title[0] != 'end_date'
                        "
                      >
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
                      <div class="ml-3" style="font-size: 1.8em" v-else>
                        <b>
                          {{ getdateif(item.title[1]) }}
                          <p></p>
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
          <v-card flat></v-card>
        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
  <!-- </v-container> -->
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import ICountUp from "vue-countup-v2";
import moment from "moment";

export default {
  mixins: [commonGet, commonExamYear],
  components: { ICountUp },

  data: () => ({
    downParam: {},
    dataObj: [],
    show: false,
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
      decimalPlaces: 2,
      prefix: "",
      suffix: "",
    },
    loading: false,
  }),
  created() {
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.exam_type = this.getLoggedInExamType;
    this.loading = true;
    var that = this;
    this.$store.dispatch("searchDashboardData", this.downParam).then((data) => {
      console.log(data);
      that.loading = false;
      that.show = true;
      that.dataObj = data.data;
      that.getProcessedData();
    });
  },
  computed: {
    getPvDashDataList() {
      console.log("arrr...");
      return this.$store.getters.getPvDashDataList[0];
    },

    getIconColorLink() {
      return [
        {
          icon: "hourglass_empty",
          link: "",
          color: "primary",
        },
        {
          icon: "today",
          link: "",
          color: "purple",
        },
        { icon: "event", link: "", color: "teal" },
        { icon: "playlist_add_check", link: "", color: "green" },
        {
          icon: "plagiarism",
          link: "/practical_viva/practical-wanting",
          color: "amber",
        },
        {
          icon: "unpublished",
          link: "",
          color: "red",
        },
      ];
    },
  },
  methods: {
    getdateif(val) {
      if (!isNaN(Date.parse(val))) {
        //checking is it date type
        return moment(val).format("DD-MM-YYYY");
      } else {
        return val;
      }
    },
    getProcessedData() {
      var that = this;
      console.log("arrr", that.dataObj[0]);
      let arr = Object.entries(that.dataObj[0]);
      let arrr = arr.slice(4);
      console.log("arrr", arrr);
      return that.getIconColorLink.map((item, index) => {
        item.title = arrr[index];
        return item;
      });
    },
    callback: function (ins) {
      ins.update(ins.endVal + 100);
    },

    exportPdf() {
      this.$store.dispatch("exportExamSummary", this.downParam);
    },
    goTo(val) {
      if (val) {
        window.open(val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.iCountUp {
  font-size: 3em;
}
</style>
