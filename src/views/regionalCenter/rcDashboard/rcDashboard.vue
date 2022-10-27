<template>
  <v-container fluid>
    <span class>
      <v-layout>
        <div class="display-1 mb-4">
          <v-icon size="50" color="primary">dashboard</v-icon>
          <span class="ml-2">Regional Center Dashboard</span>
        </div>
        <v-spacer />
        <v-btn
          color="teal white--text"
          @click="goTo('/reg-center/reg-center-profile')"
        >
          <v-icon left>face</v-icon>Regional Profile
        </v-btn>
        <v-btn color="teal white--text" @click="goTo('/regional_center_user')">
          <v-icon left>people</v-icon>Regional Users
        </v-btn>
      </v-layout>
    </span>
    <v-layout wrap class="mt-4" v-if="false">
      <v-flex v-for="(item, i) in getTotalStatus" :key="i" sm6 md4 lg3 xs8>
        <v-layout style="margin: 15px" align-center justify-center column wrap>
          <!-- column wrap  -->
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
                  :color="item[2]"
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
                  <div class="ml-3" style="font-size: 2.2em">
                    <b>
                      <i-count-up
                        :delay="delay"
                        :start="0"
                        :endVal="item[1]"
                        :options="options"
                        :callback="callback"
                      ></i-count-up>
                    </b>
                  </div>

                  <h4 class="ml-3">
                    {{ item[0].toUpperCase().split("_").join(" ") }}
                  </h4>
                </v-card>
              </v-layout>
            </v-card>
          </v-hover>
        </v-layout>
      </v-flex>
      <v-card flat></v-card>
    </v-layout>
    <v-layout row wrap class="mt-4">
      <v-flex class="xs3" v-for="(item, i) in getHomeCardData" v-bind:key="i">
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="getClass(hover, i)"
            style="border-radius: 10px"
            :style="getFlexClass(i)"
            height="200"
            @click="goto(item.link)"
          >
            <v-card flat height="195" style="top: 3%">
              <v-layout align-center justify-center row fill-height>
                <v-flex class="ml-4">
                  <v-avatar
                    style="border: 5px solid red"
                    size="56px"
                    color="grey lighten-4"
                  >
                    <v-icon large :color="item.color">{{ item.icon }}</v-icon>
                  </v-avatar>

                  <div class="title pa-1 mt-1">{{ item.title }}</div>
                  <!-- <div class="title hidden-lg-and-up">{{ item.title }}</div> -->

                  <!-- <div class="mt-2">{{ item.description }}</div> -->
                </v-flex>
                <v-btn
                  small
                  flat
                  absolute
                  dark
                  fab
                  bottom
                  right
                  color="black"
                  style="
                    margin-bottom: 1em;
                    margin-right: -1em;
                    pointer-events: none;
                  "
                >
                  <v-icon dark v-if="item.link">link</v-icon>
                  <v-icon dark v-else>link_off</v-icon>
                </v-btn>
              </v-layout>
            </v-card>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <!-- <pre> {{getTotalStatus}} </pre> -->
    <!-- <v-layout wrap>
      <v-flex v-for="(item, i) in getHomeCardData" :key="i">
        <v-layout
          style="margin-top:50px; "
          column
          align-center
          justify-center
          row
          fill-height
        >
          <v-card @click="goTo(item.link)" height="150" width="320">
            <v-layout column align-start justify-center row fill-height>
              <v-layout
                style="margin-top:-30px"
                class="ml-3"
                row
                align-top
                justify-center
                fill-height
              >
                <v-card :color="item.color" height="80" width="100">
                  <v-layout column align-center justify-center row fill-height>
                    <v-icon color="white" size="70">{{ item.icon }}</v-icon>
                  </v-layout>
                </v-card>
                <v-card
                  class="ml-3"
                  color="transparent"
                  flat
                  height="80"
                  width="180"
                >
                  <v-layout column align-start justify-end row fill-height>
                    <h3>{{ item.title }}</h3>
                  </v-layout>
                </v-card>
              </v-layout>
              <v-layout
                style="margin-bottom:-15px"
                column
                align-center
                justify-center
                fill-height
                class="px-3 pb-3"
              >
                <v-card class="my-1 mb-2" height="1" width="250" dark></v-card>
                <p>{{ item.description }}</p>
              </v-layout>
            </v-layout>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>-->
    <!-- <v-divider class="mt-5" />
    <v-layout wrap>
      <v-flex class="pa-2" v-for="(item, i) in getTotalStatus" :key="i">
        <v-layout style="margin-top:50px; " column align-center justify-center row fill-height>
          <v-card @click="goTo(item.link)" height="75" width="250">
            <v-layout column align-start justify-center row fill-height>
              <v-layout
                style="margin-top:-30px"
                class="ml-3"
                row
                align-top
                justify-center
                fill-height
              >
                <v-card class="mr-2" color="transparent" flat height="80" width="120">
                  <v-layout column align-start justify-end row fill-height>
                    <h3>{{ item[0].toUpperCase() }}</h3>
                  </v-layout>
                </v-card>
                <v-card :color="item[2]" height="80" width="90">
                  <v-layout column align-center justify-center row fill-height>
                    <h2 class="white--text">{{ item[1] }}</h2>
                  </v-layout>
                </v-card>
              </v-layout>
            </v-layout>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>
<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "dashboard",
  components: { ICountUp },

  data: () => ({
    exams: [],
    year: "",
    exam: "",
    years: [],
    show: "6",
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
  }),
  created() {
    this.$store.dispatch("fetchExamData");
    this.$store.dispatch("collectTotalStatistics").then((data) => {
      console.log(data);
    });
  },
  computed: {
    getExamData() {
      return this.$store.getters.getExamItem;
    },
    getYearData() {
      return this.$store.getters.getYearItem;
    },
    getTotalStatus() {
      let arr = Object.entries(this.$store.getters.getTotalStatus);
      var that = this;
      arr.forEach((item) => {
        item.push(this.getRndColor());
      });
      return arr.map((item, index) => {
        item.icon = that.getRndIcon()[index];
        console.log("item", item);
        return item;
      });
      // return arr;
    },

    getHomeCardData() {
      return [
        {
          icon: "store_mall_directory",
          title: "BS Panel (Receive & Delivery)",
          description:
            "This is the National University Exam Center Panel. From this panel centers details can be seen.",
          link: "/rc/bs-panel",
          color: "yellow",
        },

        {
          icon: "store_mall_directory",
          title: "AS Panel ( Collection )",
          description:
            "This is the National University Exam Center Panel. From this panel centers details can be seen.",
          link: "/reg-center/as-coll-from-cen",
          color: "pink",
        },
        {
          icon: "menu_book",
          title: "AS Panel ( Distribute )",
          description:
            "This is the Invigilator Panel. Invigilators condacts exams. From here Invigilator's detals can be seen.",
          link: "/reg-center/as-dist-to-nu",
          color: "pink",
        },
        {
          icon: "store_mall_directory",
          title: "AS Panel ( Evaluation Process )",
          description:
            "This is the Regional Center Panel. From this panel Regional Center details can be seen.",
          link: "/reg-center/as-coll-from-nu",
          color: "cyan",
        },
      ];
    },
  },
  methods: {
    callback: function (ins) {
      ins.update(ins.endVal + 100);
    },
    goToAnsScriptDistToNu() {
      this.$router.push("/reg-center/as-dist-to-nu");
    },
    goTo(val) {
      this.$router.push({ path: val }).catch((err) => {});
    },
    // UI Methods
    getFlexClass(i) {
      // console.log(i);
      let rand = this.getRndInt(3, 4);
      this.getHomeCardData[i].flex = rand;
      if (i % 3 == 2) {
        rand =
          12 -
          (this.getHomeCardData[i - 1].flex + this.getHomeCardData[i - 2].flex);
      }
      // this.tog_ ? ""
      return "xs3";
      // return "xs" + "" + rand;
    },
    getClass(hover, i) {
      let f = "";
      let c = "";
      if (!hover) {
        f = " ma-2 , elevation-2 , ";
        c = this.getRndColor() + " darken-" + this.getRndInt(3, 5);

        if (
          this.getHomeCardData[i].color == undefined ||
          this.getHomeCardData[i].color != this.getHomeCardData[0].color
        ) {
          this.getHomeCardData[i].color = c;
        }

        if (i != 0) {
          if (this.getHomeCardData[i].color == this.getHomeCardData[0].color) {
            return f + this.getHomeCardData[0].color;
          } else {
            return f + c;
          }
        } else {
          this.getHomeCardData[i].color = c;
          return f + c;
        }
      } else {
        return "elevation-12 , ma-2  ";
      }
    },
    getRndColor() {
      var colors = [
        "red",
        "pink",
        "purple",
        "light-green",
        "indigo",
        "blue",
        "amber",
        "teal",
        "cyan",
        "light-blue",
      ];
      return colors[this.getRndInt(0, 9)];
    },
    getRndIcon() {
      var icons = [
        "corporate_fare",
        "domain",
        "account_box",
        "supervisor_account",
        "person",
      ];
      return icons;
    },
    getRndInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getCursor(link) {
      return link ? "cursor: pointer;" : "";
    },
  },
};
</script>
