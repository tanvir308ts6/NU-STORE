<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 v-if="spIns">
        <v-card grey darken-10 height="40">
          <marquee>
            <slot v-for="(spIns, i) in speIns">
              <span :key="'d' + i" v-if="i">{{ "||" }}</span>
              <span
                style="font-weight: bold"
                :key="i"
                :class="spIns.display_type == 1 ? 'red--text' : ''"
              >
                {{ spIns.instruction }}
              </span>
            </slot>
          </marquee>
        </v-card>
      </v-flex>

      <v-flex xs8 class="pr-1 mt-2" >
        <v-card v-if="genIns">
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>General Instruction</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!--
            <span
              v-for="(gen, i) in genIns"
              :key="i"
              v-html="gen.instruction"
            ></span> -->
            <v-alert
              :value="true"
              color="rgba(255, 0, 0, 0.5)"
              v-for="(gen, i) in genIns"
              v-html="gen.instruction"
              :key="i"
              style="background-color: #eceff187;border-color: #3f51b5 !important;"
            ></v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="info" float="right" @click="cuGenIns"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card>
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>College User</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card color="white">
              <v-layout row>
                <v-card flat>
                  <v-badge left overlap>
                    <template v-slot:badge>
                      <v-btn
                        round
                        color="primary"
                        fab
                        small
                        style="margin-top: -1.3em;"
                        class="elevation-0"
                        v-if="
                          getCollegeUserWiseConfirmCandidate.confirm_candidate
                        "
                        >{{
                          getCollegeUserWiseConfirmCandidate.confirm_candidate
                            .length
                        }}</v-btn
                      >
                    </template>
                  </v-badge>
                </v-card>
                <!-- <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
        ></v-text-field>-->
              </v-layout>
            </v-card>
            <v-data-table
              :headers="headers"
              :items="getCollegeUserWiseConfirmCandidate.confirm_candidate"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <td>{{ props.index + 1 }}</td>
                <td class="text-xs-left">
                  {{ props.item.college_user.name }}
                </td>
                <!-- <td class="text-xs-left">{{ props.item.probable_candidate }}</td> -->
                <!-- <td class="text-xs-left">{{ props.item.applied_candidate }}</td> -->
                <td class="text-xs-left">
                  {{ props.item.no_of_confirm_candidate }}
                </td>
              </template>
              <template v-slot:footer>
                <td :colspan="headers.length">
                  <strong
                    >Total Probable Candidate(s) -
                    {{
                      getCollegeUserWiseConfirmCandidate.probable_candidate
                    }}</strong
                  >
                  <strong
                    >, Total Applied Candidate(s) -
                    {{
                      getCollegeUserWiseConfirmCandidate.applied_candidate
                    }}</strong
                  >
                  <strong
                    >, Total Confirm Candidate(s) -
                    {{
                      getCollegeUserWiseConfirmCandidate.total_confirm_candidate
                    }}</strong
                  >
                </td>
              </template>
            </v-data-table>
            <!-- <pre>{{getCollegeUserWiseConfirmCandidate}}</pre> -->
          </v-card-text>
        </v-card>
        <v-card v-if="faq">
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>Faq</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="(faq, i) in faqs" :key="i">
                <template v-slot:header>
                  <div style="font-weight: bold">{{ faq.question }}</div>
                </template>
                <v-card>
                  <v-card-text class="ml-2">{{ faq.answer }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="info" float="right" @click="cuFaq"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs4 class="pr-1 mt-2">
        <v-card>
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>Notice</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <ul>
              <li v-for="(notice, index) in notices" :key="index">
                <a
                  :href="getBaseUrl + '/' + notice.attachment"
                  target="_blank"
                  style="text-decoration: none"
                  >{{ notice.title }}</a
                >
              </li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="info" align="right" @click="cuNotice"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{selected}}</pre> -->
    <!-- <pre>{{confirm_by_cu}}</pre> -->
  </v-container>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      notices: [],
      faqs: [],
      genIns: [],
      speIns: [],
      headers: [
        {
          text: "SL",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "User", value: "username" },
        // { text: "Probable Candidate", value: "probable_candidate" },
        // { text: "Applied Candidate", value: "applied_candidate" },
        {
          text: "No. of Confirm Candidate(s)",
          value: "no_of_confirm_candidate"
        }
      ],
      desserts: [
        {
          name: "Iqbal Hossain",
          no_of_prob_can: 161,
          no_of_app_can: 100,
          no_of_con_can: 20
        },
        {
          name: "Mamun",
          no_of_prob_can: 161,
          no_of_app_can: 100,
          no_of_con_can: 30
        },
        {
          name: "Farukh",
          no_of_prob_can: 161,
          no_of_app_can: 100,
          no_of_con_can: 30
        }
      ]
    };
  },
  computed: {
    cuToken() {
      return this.$store.getters.getAuthStudentToken;
    },
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    getCollegeUserWiseConfirmCandidate() {
      return this.$store.getters.getCollegeUserWiseConfirmCandidate;
    }
  },
  methods: {
    getNotice() {
      let self = this;
      Axios.get(self.getBaseUrl + "/api/college-user/all-notice").then(
        response => {
          self.notices = response.data.data;
        }
      );
    },
    getFaq() {
      let self = this;
      Axios.get(self.getBaseUrl + "/api/college-user/all-faq").then(
        response => {
          self.faqs = response.data.data;
        }
      );
    },
    getGenIns() {
      let self = this;
      Axios.get(
        self.getBaseUrl +
          "/api/college-user/instruction?" +
          "instruction_type=1"
      ).then(response => {
        self.genIns = response.data.data;
      });
    },
    getSpeIns() {
      let self = this;
      Axios.get(
        self.getBaseUrl +
          "/api/college-user/instruction?" +
          "instruction_type=2"
      ).then(response => {
        self.speIns = response.data.data;
      });
    },
    cuNotice() {
      this.$router.push("/cu/notices");
    },
    cuGenIns() {
      this.$router.push("/cu/general-instructions");
    },
    cuSpeIns() {
      this.$router.push("/cu/special-instructions");
    },
    cuFaq() {
      this.$router.push("/cu/faqs");
    }
  },
  mounted() {
    this.getNotice();
    this.getFaq();
    this.getGenIns();
    this.getSpeIns();
  },
  created() {
    let current_privilege = JSON.parse(
      localStorage.getItem("current-privilege")
    );
    this.$store.dispatch("getCollegeUserWiseConfirmCandidate", {
      current_privilege: current_privilege
    });
    // this.setAcademicInfo();
  }
};
</script>
<style lang="scss">
.scroll-div {
  height: 150px;
  display: flex !important;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}
marquee {
  font-size: 15px;
  font-weight: 100;
  font-family: sans-serif;
  padding: 10px 0;
}

.color {
  color: red;
}

.v-alert {
  border-radius: 5;
  border-width: 4px 0 0 0;
  border-style: solid;
  color: black;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 14px;
  margin: 4px auto;
  padding: 16px;
  position: relative;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.v-alert.v-alert {
  background-color: #eceff187;
}
</style>
