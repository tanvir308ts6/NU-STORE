<template>
  <!-- <v-container fluid> -->
  <v-card flat class="my-0">
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <v-layout v-else column>
      <v-container fluid>
        <v-layout row wrap justify-center align-center>
          <span class>
            <div class="display-1 mb-4">
              <v-icon size="40" color="primary">fact_check</v-icon>
              <span class="ml-2">Result Process Summary</span>
            </div>
          </span>
          <v-spacer />
        </v-layout>
        <!-- {{getProcessedData}} -->
        <v-layout wrap v-if="show">
          <v-flex v-for="(item, i) in getProcessedData" :key="i">
            <!-- <v-flex v-for="(item, i) in getProcessedData" :key="i"> without window size works fine -->
            <v-layout style="margin:15px;" align-center justify-center row wrap fill-height>
              <!-- column wrap  -->
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="` elevation-${hover ? 12 : 2}`"
                  height="80"
                  width="300"
                  @click="goTo(item.link)"
                  style="border-radius:10px;"
                >
                  <v-layout column wrap fill-height align-start justify-start align-content-start>
                    <v-card
                      :color="item.color"
                      height="80"
                      width="70"
                      style="border-radius: 10px 0 0 10px;"
                    >
                      <!-- /* top-left | top-right | bottom-right | bottom-left */ -->

                      <v-layout align-center justify-center row fill-height>
                        <v-icon color="white" size="50">{{ item.icon }}</v-icon>
                      </v-layout>
                    </v-card>

                    <v-card flat max-width="200" width="200" max-height="80" height="80">
                      <div class="ml-3" style="font-size:2.2em;">
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
                      <h4 class="ml-3">
                        {{
                        item.title[0]
                        .toUpperCase()
                        .split('_')
                        .join(' ')
                        }}
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
import { parse } from "path";

export default {
  mixins: [commonGet, commonExamYear],
  components: { ICountUp },

  data: () => ({
    downParam: {},
    show: false,
    updateCount: false,
    delay: 1500,
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
    this.downParam.exam_year = this.getLoggedInYear.year;
    this.loading = true;
    this.$store
      .dispatch("getResultProcessSummary", this.downParam)
      .then((data) => {
        // console.log(data);
        this.loading = false;
        this.show = true;
        setTimeout(() => {
          this.animCounter();
        }, 500);
      });
  },
  computed: {
    getResultProcessSummaryStatus() {
      return this.$store.getters.getResultProcessSummaryStatus;
    },
    getProcessedData() {
      var that = this;
      let arr = Object.entries(this.getResultProcessSummaryStatus);
      // let arrr = arr.slice(3);
      console.log("arr", arr);
      let sum =
        parseInt(this.getResultProcessSummaryStatus.new_count) +
        parseInt(this.getResultProcessSummaryStatus.completed_count);
      sum += parseInt(this.getResultProcessSummaryStatus.in_progress_count);

      arr[3] = ["total_process", sum];
      console.log("arr", arr);

      return that.getIconColorLink.map((item, index) => {
        item.title = arr[index];
        return item;
      });
    },
    getIconColorLink() {
      return [
        {
          icon: "add_to_queue",
          link: "/exam_monitor/result-activities-timeline",
          color: "blue",
        },
        {
          icon: "pending_actions",
          link: "/exam_monitor/result-activities-timeline",
          color: "purple",
        },
        {
          icon: "check",
          link: "/exam_monitor/result-activities-timeline",
          color: "teal",
        },
        {
          icon: "T",
          link: "/exam_monitor/result-activities-timeline",
          color: "teal",
        },
      ];
    },
  },
  methods: {
    callback: function (ins) {
      ins.update(ins.endVal + 100);
    },
    animCounter() {
      console.log("anim");
      clearInterval(this.updateCount);

      const speed = 550; // The lower the slower // now 550 cz small data
      document.querySelectorAll(".counter").forEach((counter) => {
        const counterNumber = +counter.getAttribute("data-target"); //target

        this.updateCount = setInterval(() => {
          const divContent = +counter.innerText;
          const increaseBy = counterNumber / speed;

          // console.log("counterNumber", counterNumber);
          // console.log("divContent", divContent);
          // console.log("increaseBy", increaseBy);

          // Check if target is reached
          divContent < counterNumber
            ? (counter.innerText = Math.ceil(divContent + increaseBy))
            : Math.floor(divContent + increaseBy);
        }, 4); // Call function every ms now 3 cz small data
      });
    },
    exportPdf() {
      this.$store.dispatch("exportExamSummary", this.downParam);
    },
    goTo(val) {
      if (val) {
        window.open(val);
        // .catch((err) => {
        //   console.log(err);
        // });
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
