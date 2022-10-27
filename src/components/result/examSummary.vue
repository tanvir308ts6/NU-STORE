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
              <span class="ml-2">Exam Summary</span>
            </div>
          </span>
          <v-spacer />
          <v-btn @click="exportPdf" color="primary" dark>
            <v-icon dark>arrow_downward</v-icon>Download Exam Summary
          </v-btn>
        </v-layout>
        <!-- {{getResultDashboardData}} -->
        <v-layout wrap v-if="show">
          <v-flex
            v-for="(item, i) in getProcessedData"
            :key="i"
            sm6
            md4
            lg3
            xs8
          >
            <!-- <v-flex v-for="(item, i) in getProcessedData" :key="i"> without window size works fine -->
            <v-layout
              style="margin:15px;"
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
                  @click="goTo(item.link)"
                  style="border-radius:10px;"
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
                      style="border-radius: 10px 0 0 10px;"
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
                        style="font-size:2.2em;"
                        v-if="
                          item.title[0] != 'passed_percentage' &&
                            item.title[0] != 'failed_percentage' &&
                            item.title[0] != 'others_percentage' &&
                            item.title[0] != 'promoted_percentage'
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
                            item.title[0] == 'failed_percentage' ||
                            item.title[0] == 'others_percentage' ||
                            item.title[0] == 'promoted_percentage'
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
                            .split("_")
                            .join(" ")
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
  mounted(){
    if(this.downParam.exam_code == "2204") {
        this.mastersFinal = true;
        this.honoursExam = false;
      }
  },

  created() {
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.exam_type = this.getLoggedInExamType;
    this.getDashboardData();
  },
  watch: {
    // getExamInitiateId() {
    //   this.getDashboardData();
    // },
    // "downParam.exam_code": function(val) {
    //   if (val == "2204") {
    //     this.mastersFinal = true;

    //   }
    // },
  },
  computed: {
    getResultDashboardData() {
      return this.$store.getters.getResultDashboardData;
    },
    getProcessedData() {
      var that = this;
      let arr = Object.entries(this.getResultDashboardData);
      let arrr = arr.slice(1);
      return that.getIconColorLink.map((item, index) => {
        item.title = arrr[index];
        return item;
      });
    },
    getIconColorLink() {
      let getIconColorLink = [
        {
          icon: "corporate_fare",
          link: "/center-allocation/theory",
          color: "blue",
        },
        {
          icon: "location_city",
          link: "/form-fillup-group-by-college",
          color: "purple",
        },
        { icon: "chrome_reader_mode", link: "", color: "teal" },
        { icon: "menu_book", link: "", color: "cyan" },
        {
          icon: "school",
          link: "/final-examinee-list",
          color: "primary",
        },
        {
          icon: "unpublished",
          link: "/absent-reported-withheld-list",
          color: "deep-orange",
        },
        {
          icon: "add_task",
          link: "/std-attendance",
          color: "green",
        },
        {
          // icon: "assignment",
          icon: "grading",
          link: "/absent-reported-withheld-list",
          color: "yellow",
        },
        {
          icon: "layers_clear",
          link: "/absent-reported-withheld-list",
          color: "amber",
        },
        {
          icon: "label_off",
          link: "/absent-reported-withheld-list",
          color: "red",
        },
        // { icon: "sentiment_very_dissatisfied", link: "", color: "orange" },
      ];
      if (this.mastersFinal) {
        console.log("..true", this.mastersFinal);
        getIconColorLink.push({ icon: "blur_on", link: "", color: "green" });
        getIconColorLink.push({ icon: "blur_off", link: "", color: "orange" });
        getIconColorLink.push({ icon: "priority_high", link: "", color: "#A09D9C" });
        getIconColorLink.push({
          icon: "sentiment_very_satisfied",
          link: "",
          color: "green",
        });
        getIconColorLink.push({
          icon: "sentiment_very_dissatisfied",
          link: "",
          color: "orange",
        });
        getIconColorLink.push({ icon: "report", link: "", color: "#B2BEB7" });
        }
      if (this.honoursExam) {
        console.log("..true", this.honoursExam);
        getIconColorLink.push({
          icon: "brightness_high",
          link: "",
          color: "green",
        });
        getIconColorLink.push({
          icon: "brightness_medium",
          link: "",
          color: "orange",
        });
        getIconColorLink.push({
          icon: "brightness_low",
          link: "",
          color: "red ",
        });
        getIconColorLink.push({ icon: "blur_on", link: "", color: "blue" });
        getIconColorLink.push({
          icon: "sentiment_very_satisfied",
          link: "",
          color: "green",
        });
      }

      return getIconColorLink;
    },
  },
  methods: {
    getDashboardData() {
      this.loading = true;
      var self = this;
      this.$store
        .dispatch("searchResultDashboardData", this.downParam)
        .then((data) => {
          console.log(data);
          self.show = true;
          self.loading = false;
          setTimeout(() => {
            self.animCounter();
          }, 500);
        });
    },
    // getH(){
    //   if(this.honoursExam){
    //     return 90;
    //   }else{
    //     return 80;
    //   }
    // },
    callback: function(ins) {
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
        }, 5); // Call function every ms now 3 cz small data
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
