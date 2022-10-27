<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md2 class="hidden-sm-and-down">
        <v-layout align-center justify-center row fill-height>
          <v-img
            :src="require('@/assets/nu_logos/nu_logo.png')"
            contain
            height="130"
          ></v-img>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md10>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 0 : 0} `"
                style=" border-radius: 10px; "
                color="#fafafa"
                class="ma-2"
                height="140"
              >
                <v-layout class="ml-0">
                  <div class="ma-3">
                    <h1 class="mt-3 display-3 text-sm-left">
                      Invigilator Panel
                    </h1>
                    <!-- <h1
                      class="mt-4 display-2 text-sm-left hidden-md-and-down hidden-xl-and-up"
                    >Center Panel</h1>-->
                    <p class="subheading text-sm-left">
                      Welcome to "{{ getAuthUser.invigilator.name }}". This is
                      invigilator panel.
                    </p>
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex xs12 sm12 md6>
            <!-- <v-layout align-space-between justify-center row fill-height> -->
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                style=" border-radius: 10px; "
                class="ma-2 , elevation-2"
                height="180"
              >
                <v-layout class="ml-3">
                  <div class="ma-3 text-sm-left">
                    <!--  -->

                    <div class="headline">
                      <v-icon large>account_box</v-icon>
                      "{{ getAuthUser.invigilator.name }}" Your Center:
                    </div>
                    <v-divider></v-divider>
                    <div class="headline mt-2">
                      <v-icon large>store_mall_directory</v-icon>
                      {{ getAuthUser.invigilator.center.center_name }}
                    </div>

                    <div>
                      <v-icon style="margin-bottom: -.18em;">map</v-icon>
                      Address: {{ getAuthUser.invigilator.center.address }}.
                      <br />
                      <v-icon style="margin-bottom: -.18em;">phone</v-icon>
                      Phone: {{ getAuthUser.invigilator.center.phone }}
                    </div>
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
            <!-- </v-layout> -->
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout align-center justify-center row fill-height>
        <v-card>
          <v-flex xs12>
            <v-btn class="mr-3" color="primary" @click="triggerAppOpen()">Take Attendance</v-btn>
          </v-flex>
        </v-card>
      </v-layout>
    </v-layout>
    <!-- <pre> {{ getAuthUser }}</pre> -->
    <v-divider class="my-2 mt-4"></v-divider>
    <v-layout row wrap class="mt-4">
      <v-flex
        class="pa-0"
        v-for="(item, i) in getHomeCardData"
        v-bind:key="i"
        :class="getFlexClass(i)"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="getClass(hover, i)"
            style=" border-radius: 10px; "
            :style="getCursor(item.link)"
            height="200"
            color="darken-0"
            @click="goto(item.link)"
          >
            <v-layout align-center justify-center row fill-height>
              <div class="ma-4">
                <v-icon large>{{ item.icon }}</v-icon>
                <div class="headline">{{ item.title }}</div>
                <div class="mt-2">{{ item.description }}</div>
              </div>
              <v-btn
                small
                flat
                absolute
                dark
                fab
                bottom
                right
                color="black"
                style="margin-bottom: 1em;margin-right: -1em; pointer-events: none;"
              >
                <v-icon dark v-if="item.link">link</v-icon>
                <v-icon dark v-else>link_off</v-icon>
              </v-btn>
            </v-layout>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data: () => ({
    calendarStatus: false,
    text: "Examination Center Panel",
  }),
  watch: {
    calendarStatus(val) {
      console.log("calendarStatus", val);
    },
  },
  created() {},
  methods: {
    triggerAppOpen() {
      //this.openApp();
      setTimeout(this.fallbackToStore(), 700);
    },
    openApp() {
      window.location.replace("https://nu.eatlbd.com/invigilator-app");
    },
    fallbackToStore() {
      window.open(
        "https://drive.google.com/file/d/1cHx23qnJjSF1L4L2UXxHGvy_7eBcW3LG/view?usp=drive_web"
      );
    },
    goto(link) {
      this.$router.push(link);
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
      return "xs" + "" + rand;
    },
    getClass(hover, i) {
      let f = "";
      let c = "";
      if (!hover) {
        f = " ma-2 , elevation-2 , ";
        c = this.getRndColor() + " lighten-" + this.getRndInt(3, 5);

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
        return "elevation-12 , ma-0  ";
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
    getRndInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getCursor(link) {
      return link ? "cursor: pointer;" : "";
    },
  },
  computed: {
    getAuthUser() {
      return this.$store.getters.getAuthUser;
    },
    getTotalStatus() {
      return this.$store.getters.getTotalStatus;
    },
    getAttendanceList() {
      return this.$store.getters.getattendanceItem;
    },
    getMenu() {
      return localStorage.getItem("menu");
    },
    goToCenterUsersList() {
      this.$router.push("/center/center_user");
    },
    getHomeCardData() {
      return [
        {
          icon: "face",
          title: "invigilator-profile",
          description: "This is panel. invigilators can update their profile.",
          link: "/invigilator-profile",
        },

        {
          icon: "list",
          title: "Attendence Collection",
          description: "From this panel list of Attendence can be seen.",
          link: "/std-attendance",
        },
      ];
    },
  },
};
</script>

<style></style>
