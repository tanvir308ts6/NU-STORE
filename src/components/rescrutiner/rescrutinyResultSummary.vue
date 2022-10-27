<template>
  <!-- <v-container fluid> -->
  <v-card flat class="my-0">
    <!-- {{loading}} -->
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <v-layout v-else column>
      <v-container fluid>
        <v-layout row wrap justify-center align-center>
          <span class>
            <div class="display-1 mb-4">
              <v-icon size="40" color="primary">dashboard</v-icon>
              <span class="ml-2">Re-scrutiny Result Summary</span>
            </div>
          </span>
          <v-spacer />
          <v-btn @click="exportPdf" color="primary" dark>
            <v-icon dark>arrow_downward</v-icon>Download Re-scrutiny Summary
          </v-btn>
        </v-layout>
        <!-- {{getRescrutinyDashboardData}} -->
        <v-layout wrap v-if="show">
          <v-flex v-for="(item, i) in getProcessedData" :key="i" sm6 md4 lg4 xs8>
            <!-- <v-flex v-for="(item, i) in getProcessedData" :key="i"> without window size works fine -->
            <v-layout style="margin:15px;" align-center justify-center row wrap fill-height>
              <!-- column wrap  -->
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="` elevation-${hover ? 12 : 2}`"
                  height="90"
                  width="320"
                  @click="goTo(item.link)"
                  style="border-radius:10px;"
                >
                  <v-layout column wrap fill-height align-start justify-start align-content-start>
                    <v-card
                      :color="item.color"
                      height="90"
                      width="70"
                      style="border-radius: 10px 0 0 10px;"
                    >
                      <!-- /* top-left | top-right | bottom-right | bottom-left */ -->

                      <v-layout align-center justify-center row fill-height>
                        <v-icon color="white" size="50">{{ item.icon }}</v-icon>
                      </v-layout>
                    </v-card>

                    <v-card flat max-width="220" width="220" max-height="90" height="90">
                      <div
                        class="ml-3"
                        style="font-size:2.2em;"
                        v-if="
                          item.title[0] != 'passed_percentage' &&
                            item.title[0] != 'failed_percentage' && item.title[0] != 'others_percentage'
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
                      <div
                        class="ml-3"
                        style="font-size:2.2em;"
                        v-if="
                          item.title[0] == 'passed_percentage' ||
                            item.title[0] == 'failed_percentage' || item.title[0] == 'others_percentage'
                        "
                      >
                        <b>
                          <i-count-up
                            :delay="delay"
                            :start="0"
                            :endVal="parseFloat(item.title[1])"
                            :options="optionsl"
                            :callback="callback"
                          ></i-count-up>
                        </b>
                        <b>%</b>
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

export default {
 name:"ressummary",
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
     this.downParam.exam_year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.exam_type = this.getLoggedInExamType;
    this.loading = true;
    this.$store
      .dispatch("searchRescrutinyDashboardData", this.downParam)
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
    getRescrutinyDashboardData() {
      return this.$store.getters.getRescrutinyDashboardData;
    },
    getProcessedData() {
      var that = this;
      let arr = Object.entries(this.getRescrutinyDashboardData);
      //let arrr = arr.slice(0);
      return that.getIconColorLink.map((item, index) => {
        item.title = arr[index];
        return item;
      });
    },
    getIconColorLink() {
      return [
        {
          icon: "school",
          link: "/center-allocation/theory",
          color: "blue",
        },
        {
          icon: "person",
          link: "/form-fillup-group-by-college",
          color: "purple",
        },
        { icon: "chrome_reader_mode", link: "", color: "teal" },
        { icon: "menu_book", link: "", color: "cyan" },
        { icon: "blur_on", link: "", color: "green" },
        { icon: "blur_off", link: "", color: "orange" },
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
      this.$store.dispatch("exportRescrutinySummary", this.downParam);
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
