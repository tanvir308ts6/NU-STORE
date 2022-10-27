<template>
  <v-card flat class="my-0">
    <v-progress-linear v-if="!show" :indeterminate="true"></v-progress-linear>

    <v-layout wrap class="pb-5" v-if="show">
      <v-flex v-for="(item, i) in getProcessedData()" :key="i">
        <v-layout style="margin: 20px" row align-center justify-center wrap fill-height>
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="` elevation-${hover ? 12 : 2}`"
              height="80"
              width="300"
              @click="goTo(item.link)"
              style="border-radius: 10px"
            >
              <v-layout column wrap fill-height align-start justify-start align-content-start>
                <v-card
                  :color="item.color"
                  height="80"
                  width="70"
                  style="border-radius: 10px 0 0 10px"
                >
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
                  v-if="item.total_center != 0"
                >
                  <div class="ml-3" style="font-size: 2.2em">
                    <b>
                      <i-count-up
                        :delay="delay"
                        :start="0"
                        :endVal="parseInt(item.title[1])"
                        :options="optionsl"
                        :callback="callback"
                      ></i-count-up>
                    </b>
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
    show: false,
    updateCount: false,
    delay: 1500,
    optionsl: {
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
      decimalPlaces: 0,
      prefix: "",
      suffix: "",
    },
    loading: false,
  }),
  mounted() {
    this.getdata();
  },
  watch: {
    getDashboardData(val) {
      if (Object.entries(val)) {
        this.getProcessedData();
      }
    },
  },

  computed: {
    getDashboardData() {
      return this.$store.getters.getDashboardData;
    },

    getIconColorInv() {
      return [
        {
          icon: "account_balance",
          link: "/center/center-list",
          color: "cyan darken-4",
        },
        {
          icon: " supervised_user_circle",
          link: "/invigilator-list",
          color: "green darken-4",
        },
        {
          icon: "groups",
          link: "/users",
          color: "amber darken-4",
        },
        {
          icon: "account_balance",
          link: "/regional_center",
          color: "purple darken-4",
        },
        {
          icon: "account_balance",
          link: "/college/college-list",
          color: "blue darken-4",
        },
      ];
    },
  },
  methods: {
    getdata() {
      // this.loading = true;
      this.$store.dispatch("getDashData").then(() => {
        // this.loading = false;
      });
    },
    getProcessedData() {
      this.show = true;
      var that = this;
      let arr = Object.entries(this.getDashboardData);
      let arrr = arr.slice(0);
      return that.getIconColorInv.map((item, index) => {
        item.title = arrr[index];
        return item;
      });
    },

    callback: function(ins) {
      ins.update(ins.endVal + 100);
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
