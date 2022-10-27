<template>
  <!-- <v-container fluid> -->
  <v-card flat class="my-0">
    <v-layout column>
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
        <!-- <pre>{{getProcessedData}}</pre> -->
        <v-layout row wrap>
          <v-flex v-for="(item, i) in getProcessedData" :key="i" sm6 md3 lg3 xs8 class="pa-2">
            <v-layout style="margin:20px; " column align-center justify-center row fill-height>
              <v-hover>
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
                          <v-icon color="white" size="60">{{ item.icon }}</v-icon>
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
                          <div
                            style="font-size:2.3em;"
                            v-if="
                              item.title[0] != 'passed_percentage' &&
                                item.title[0] != 'failed_percentage'
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
                            style="font-size:2.3em;"
                            v-if="
                              item.title[0] == 'passed_percentage' ||
                                item.title[0] == 'failed_percentage'
                            "
                          >
                            <b>
                              <!-- {{ parseFloat(item.title[1]) }} -->
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
                        </v-layout>
                      </v-card>
                    </v-layout>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-layout>
          </v-flex>
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
  }),
  created() {
    this.downParam.exam_initiate_id = this.getExamInitiateId;
    this.downParam.year = this.getLoggedInYear.year;
    this.downParam.exam_code = this.getLoggedInExam.code;
    this.downParam.exam_type = this.getLoggedInExamType;
    this.$store
      .dispatch("searchResultDashboardData", this.downParam)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          this.animCounter();
        }, 500);
      });
  },
  computed: {
    getResultDashboardData() {
      return this.$store.getters.getResultDashboardData;
    },
    getProcessedData() {
      var that = this;
      let arr = Object.entries(this.getResultDashboardData);
      let arrr = arr.slice(3);
      return that.getIconColorLink.map((item, index) => {
        item.title = arrr[index];
        return item;
      });
    },
    getIconColorLink() {
      return [
        {
          icon: "store_mall_directory",
          link: "/center-allocation/theory",
          color: "yellow",
        },
        {
          icon: "account_balance",
          link: "/form-fillup-group-by-college",
          color: "red",
        },
        { icon: "library_books", link: "", color: "pink" },
        { icon: "menu_book", link: "", color: "cyan" },
        {
          icon: "people",
          link: "/final-examinee-list",
          color: "primary",
        },
        {
          icon: "import_contacts",
          link: "/absent-reported-withheld-list",
          color: "orange",
        },
        {
          icon: "person",
          link: "/absent-reported-withheld-list",
          color: "green",
        },
        {
          icon: "assignment",
          link: "/absent-reported-withheld-list",
          color: "blue",
        },
        {
          icon: "assignment_ind",
          link: "/absent-reported-withheld-list",
          color: "red",
        },
        {
          icon: "assignment_late",
          link: "/absent-reported-withheld-list",
          color: "red",
        },
        { icon: "thumb_up_alt", link: "", color: "pink" },
        { icon: "thumb_down_alt", link: "", color: "cyan" },
        { icon: "how_to_reg", link: "", color: "primary" },
        { icon: "unpublished", link: "", color: "orange" },
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
