<template>
  <v-container fluid>
    <v-layout row wrap>
      <!-- <v-flex xs12 sm4 md4 lg4>
        <v-layout align-center justify-center row fill-height>
          <v-img :src="require('@/assets/nu_logos/nu_logo.png')" class="my-3" contain height="150"></v-img>
        </v-layout>
      </v-flex>-->
      <!-- <v-card width="100%" color="#e6e6e6"> -->
      <v-flex xs12 sm8 md8 lg8 class="mt-5 ml-3">
        <h3 class="display-2 text-sm-left">
          <b>Welcome to NU-EMS</b>
        </h3>
        <p class="title text-sm-left mt-1 ml-0">
          National University Examination Management System
        </p>
        <!-- <p class="text-sm-left">{{ text }}</p> -->
      </v-flex>
      <!-- </v-card> -->
      <v-flex xs2></v-flex>
    </v-layout>

    <v-divider class="my-2"></v-divider>

    <v-layout row wrap class="mt-4" v-if="true">
      <v-flex class="xs3" v-for="(item, i) in getHomeCardData" v-bind:key="i">
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="getClass(hover, i)"
            style="border-radius: 10px"
            :style="getFlexClass(i)"
            height="170"
            @click="goto(item.link)"
          >
            <v-card flat height="160">
              <v-layout align-center justify-center row fill-height>
                <v-flex class="ma-4">
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
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [common_login_getters],
  components: {},
  data: () => ({
    calendarStatus: false,
    tog_: false,
    text: "Created in 2020",
  }),
  watch: {
    calendarStatus(val) {
      console.log("calendarStatus", val);
    },
  },
  created() {},
  methods: {
    goto(link) {
      this.$router.push(link);
    },
    sendNotificationForAll() {
      this.$root
        .$confirm("Do you want to SEND a DEMO NOTIFICATION ?")
        .then((confirm) => {
          if (confirm) {
            let self = this;
            self.$store.dispatch("sendNotification", {
              main_title: "DEMO",
              main_body: "THIS IS A DEMO NOTIFICATION FOR ALL",
              noti_type: self.$store.getters.notiForALL,
              linkto: "/home",
              r_type: -1,
              r_type_id: -1,
              r_user_id: -1, // not sending to a specific user, so -1
              s_type: self.$store.getters.getAuthUserType, // needs to be filled
              s_type_id: self.$store.getters.getAuthUserTypeID, // needs to be filled
              s_user_id: self.$store.getters.getAuthUserID, // needs to be filled
            });
          }
        });
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
    getRndInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getCursor(link) {
      return link ? "cursor: pointer;" : "";
    },
  },
  computed: {
    getTotalStatus() {
      return this.$store.getters.getTotalStatus;
    },
    getAttendanceList() {
      return this.$store.getters.getattendanceItem;
    },
    getMenu() {
      return localStorage.getItem("menu");
    },
    getHomeCardData() {
      return [
        {
          icon: "account_circle",
          title: "Admin",
          description:
            "This is the Script Collection and Distribution Panel. From this panel Script Detail can be seen.",
          link: "/home",
        },
        // {
        //   icon: "all_out",
        //   title: "Admin Core",
        //   description:
        //   "This is the Script Collection and Distribution Panel. From this panel Script Detail can be seen.",
        //   link: "/core/student-type",
        // },
        {
          icon: "library_books",
          title: "Center Management Module",
          description:
            "This is the National University Exam Center Panel. From this panel centers details can be seen.",
          link: "/center/center-dashboard",
        },
        {
          icon: "account_balance",
          title: "Center Management Module (NU)",
          description:
            "This is the National University Exam Center Panel. From this panel centers details can be seen.",
          link: "/center/center-list",
        },
        {
          icon: "store",
          title: "Regional Center",
          description:
            "This is the Regional Center Panel. From this panel Regional Center details can be seen.",
          link: "/regional-center-dashboard",
        },
        {
          icon: "account_balance",
          title: "Regional Center Module (NU)",
          description:
            "This is the Regional Center Panel. From this panel Regional Center details can be seen.",
          link: "/regional-center-dashboard",
        },
        {
          icon: "perm_identity",
          title: "Head Examiner & Examiner",
          description:
            "This is the Head Examiner/Examiner Panel. From this panel Head Examiner/Examiner details can be seen.",
          link: "/examiner/examiner-dashboard",
        },
        {
          icon: "supervisor_account",
          title: "Exam Monitor",
          description:
            "This is the Exam Monitor Panel. From this panel Exam Monitoring details can be seen.",
          link: "/exam-routine-list",
        },
        {
          icon: "file_copy",
          title: "Admit Card",
          description:
            "This is the Admit Card Panel. From this panel Admit Card details can be seen.",
          link: "/admit-card",
        },
        {
          icon: "receipt",
          title: "Script Collection & Distribution",
          description:
            "This is the Script Collection and Distribution Panel. From this panel Script Detail can be seen.",
          link: "/store/dashboard",
        },

        {
          icon: "account_circle",
          title: "Invigilator Panel",
          description:
            "This is the Invigilator Panel. Invigilators condacts exams. From here Invigilator's detals can be seen.",
          link: "/invigilator-dashboard",
        },

        {
          icon: "visibility",
          title: "Audit",
          description:
            "This is the National University Audit Panel. From this panel Audit details can be seen.",
          link: "/log-data",
        },
        {
          icon: "science",
          title: "Practical Viva Exam Module",
          description:
            "From this panel user can control practical viva exam and more details can be seen.",
          link: "/practical-dashboard",
        },
        {
          icon: "format_list_numbered_rtl",
          title: "Form Fillup",
          description:
            "This is the National University Form Fillup Panel. From this panel Form Fillup details can be seen.",
          link: "/form-fillup",
        },
        {
          icon: "note",
          title: "PDF Settings",
          description:
            "This is the PDF Settings Panel.From here PDF Settings details can be seen.",
          link: "/pdf-setup",
        },
        {
          icon: "ballot",
          title: "Registration",
          description:
            "This is the Registration Panel. From here PDF Registration details can be seen.",
          link: "/reg-student",
        },
        {
          icon: "meeting_room",
          title: "College Affiliation and Information",
          description:
            "This is the College Affiliation Panel, from here College details can be seen.",
          link: "/college/college-list",
        },
        {
          icon: "wysiwyg",
          title: "Syllabus and Regulation",
          description:
            "This is the Syllabus and Regulation Panel.From here Syllabus and Regulation details can be seen.",
          link: "/syl-reg/degrees",
        },
        {
          icon: "account_balance",
          title: "Question Distribution",
          description:
            "This is the Question Distribution Panel.From here Question Distribution details can be seen.",
          link: "/exam_monitor/question-distribution",
        },
        {
          icon: "touch_app",
          title: "Result",
          description:
            "This is the Result Panel.From here Result details can be seen.",
          link: "/result/result-dashboard",
        },
        {
          icon: "supervised_user_circle",
          title: "Rescrutiny",
          description:
            "This is the Rescrutiny Panel.From here Rescrutiny details can be seen.",
          link: "/rescrutiny-monitoring",
        },
        {
          icon: "groups",
          title: "Examination Committee",
          description:
            "This is the Examination Committee Panel.From here Examination Committee details can be seen.",
          link: "/exm/committee",
        },
        {
          icon: "soap",
          title: "Service",
          description:
            "This is the Service Panel.From here Service details can be seen.",
          link: "/service/cv",
        },
        {
          icon: "timeline",
          title: "Business Intelligence",
          description:
            "This is the Business Intelligence Panel. From this panel Form Fillup details can be seen.",
          link: "/biReport",
        },
      ];
    },
  },
};
</script>

<style></style>
