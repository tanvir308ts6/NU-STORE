<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
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

      <v-flex xs8 class="pr-1 mt-2">
        <v-card>
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>General Instruction</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
              :value="true"
              color="rgba(255, 0, 0, 0.5)"
              v-for="(gen, i) in genIns"
              v-html="gen.instruction"
              :key="i"
              style="background-color: #eceff187;border-color: #3f51b5 !important;"
            ></v-alert>
          </v-card-text>
          <v-card-actions class="pa-3">
            <v-btn small flat color="info" float="right" @click="studentGenIns"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 class="pa-1 pointer" @click="formFillUp">
                <v-toolbar color="pink" dark>
                  <v-icon>dynamic_form</v-icon>
                  <v-toolbar-title>Fromfill Up</v-toolbar-title>
                </v-toolbar>
              </v-flex>
              <v-flex xs4 class="pa-1 pointer" @click="result">
                <v-toolbar color="primary" dark>
                  <v-icon>light_mode</v-icon>
                  <v-toolbar-title>Result</v-toolbar-title>
                </v-toolbar>
              </v-flex>
              <v-flex xs4 class="pa-1 pointer" @click="consolidatedResult">
                <v-toolbar color="success" dark>
                  <v-icon>gamepad</v-icon>
                  <v-toolbar-title>Consolidated Result</v-toolbar-title>
                </v-toolbar>
              </v-flex>
              <v-flex xs4 class="pa-1 pointer" @click="rescrutiny">
                <v-toolbar color="orange" dark>
                  <v-icon>web_asset</v-icon>
                  <v-toolbar-title>Rescutiny</v-toolbar-title>
                </v-toolbar>
              </v-flex>
              <v-flex xs4 class="pa-1 pointer" @click="resultCorrection">
                <v-toolbar color="info" dark>
                  <v-icon>check_circle</v-icon>
                  <v-toolbar-title>Result Correction</v-toolbar-title>
                </v-toolbar>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card>
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>Faq</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content
                v-for="(faq, i) in faqs"
                :key="`faq_${i}`"
              >
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
            <v-btn small flat color="info" float="right" @click="studentFaq"
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
              <li
                v-for="(notice, index) in notices"
                :key="`notice_${index}`"
                style="list-style: circle"
              >
                <a
                  :href="getBaseUrl + '/' + notice.attachment"
                  target="_blank"
                  style="text-decoration: none;"
                  >{{ notice.title }}</a
                >
              </li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="info" align="right" @click="studentNotice"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{selected}}</pre> -->
    <!-- <pre>{{confirm_by_student}}</pre> -->
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
      speIns: []
    };
  },
  computed: {
    studentToken() {
      return this.$store.getters.getAuthStudentToken;
    },
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    }
  },
  methods: {
    getNotice() {
      let self = this;
      Axios.get(self.getBaseUrl + "/api/student/all-notice").then(response => {
        self.notices = response.data.data;
      });
    },
    getFaq() {
      let self = this;
      Axios.get(self.getBaseUrl + "/api/student/faq-list").then(response => {
        self.faqs = response.data.data;
      });
    },
    getGenIns() {
      let self = this;
      Axios.get(
        self.getBaseUrl +
          "/api/student/general-instruction?" +
          "instruction_type=1"
      ).then(response => {
        self.genIns = response.data.data;
      });
    },
    getSpeIns() {
      let self = this;
      Axios.get(
        self.getBaseUrl +
          "/api/student/general-instruction?" +
          "instruction_type=2"
      ).then(response => {
        self.speIns = response.data.data;
      });
    },
    studentNotice() {
      this.$router.push("/student/notices");
    },
    studentGenIns() {
      this.$router.push("/student/general-instructions");
    },
    studentSpeIns() {
      this.$router.push("/student/special-instructions");
    },
    studentFaq() {
      this.$router.push("/student/faqs");
    },
    formFillUp() {
      this.$router.push("/student/ff/from_fill_up_option");
    },
    result() {
      this.$router.push("/student/results");
    },
    consolidatedResult() {
      this.$router.push("/student/consolidated-results");
    },
    rescrutiny() {
      this.$router.push("/student/re-scrutiny");
    },
    resultCorrection() {
      this.$router.push("/student/result-correction");
    }
  },
  mounted() {
    this.getNotice();
    this.getFaq();
    this.getGenIns();
    this.getSpeIns();
  }
};
</script>

<style>
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
.pointer {
  cursor: pointer;
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
