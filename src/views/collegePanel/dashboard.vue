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
            <v-btn small flat color="info" float="right" @click="collegeGenIns"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card>
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>Current Exam List</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card color="white">
              <v-layout row>
              <!--
                <v-badge left overlap>
                  <template v-slot:badge>
                    <v-btn
                      round
                      color="primary"
                      fab
                      small
                      style="margin-top: -1.3em;"
                      class="elevation-0"
                      v-if="getAllOpenExamMasterList.length"
                      >{{ getAllOpenExamMasterList.length }}</v-btn
                    >
                  </template>
                  <v-card-text class="title">Exam List</v-card-text>
                </v-badge>
                -->
                <v-divider class="my-2" vertical></v-divider>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="mt-1"
                  hide-details
                  solo
                  flat
                  single-line
                ></v-text-field>
                <v-spacer />
                <v-btn
                  @click="searchList()"
                  class="ml-3"
                  fab
                  small
                  flat
                  dark
                  color="primary"
                >
                  <v-icon dark large>search</v-icon>
                </v-btn>
              </v-layout>
            </v-card>
            <v-data-table
              :headers="headers"
              :search="search"
              :items="getAllOpenExamMasterList"
              class="elevation-1"
              item-key="id"
            >
              <template v-slot:items="props">
                <tr>
                  <td>{{ props.index + 1 }}</td>
                  <td class="text-xs">{{ props.item.exam_name }}</td>
                  <td class="text-xs">{{ props.item.exam_code }}</td>
                  <td class="text-xs">{{ props.item.exam_year }}</td>
                  <!-- <td class="text-xs">{{ props.item.start_date|dateFormat('ll') }}</td> -->
                  <!-- <td class="text-xs">{{ props.item.end_date|dateFormat('ll') }}</td> -->
                </tr>
              </template>
            </v-data-table>
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
            <v-btn small flat color="info" float="right" @click="collegeFaq"
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
            <v-btn small flat color="info" align="right" @click="collegeNotice"
              >View All</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 class="pr-1 mt-2">
        <v-card>
          <v-toolbar grey darken-10 height="40">
            <v-toolbar-title>Exam Routine</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <ExamRoutine></ExamRoutine>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{selected}}</pre> -->
    <!-- <pre>{{confirm_by_college}}</pre> -->
  </v-container>
</template>
<script>
import Axios from "axios";
import ExamRoutine from "@/views/collegePanel/ExamRoutine";
export default {
  components: {
    ExamRoutine
  },
  data() {
    return {
      search: '',
      notices: [],
      faqs: [],
      genIns: [],
      speIns: [],
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "10",
          sortable: false
        },
        { text: "Name", value: "exam_name" },
        { text: "Eaxm Code", value: "exam_code" },
        { text: "Year", value: "exam_year" }
        // { text: "Start Date", value: "start_date" },
        // { text: "Close Date", value: "end_date" }
      ]
    };
  },
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    getAllOpenExamMasterList() {
      return this.$store.getters.getAllOpenExamMasterList;
    }
  },
  methods: {
    getNotice() {
      let self = this;
      Axios.get(self.getBaseUrl + "/api/college/college-notice").then(
        response => {
          self.notices = response.data.data;
        }
      );
    },
    getFaq() {
      let self = this;
      Axios.get(self.getBaseUrl + "/api/college/all-faq").then(response => {
        self.faqs = response.data.data;
      });
    },
    getGenIns() {
      let self = this;
      Axios.get(
        self.getBaseUrl + "/api/college/instruction?" + "instruction_type=1"
      ).then(response => {
        self.genIns = response.data.data;
      });
    },
    getSpeIns() {
      let self = this;
      Axios.get(
        self.getBaseUrl + "/api/college/instruction?" + "instruction_type=2"
      ).then(response => {
        self.speIns = response.data.data;
      });
    },
    collegeNotice() {
      this.$router.push("/college/notices");
    },
    collegeGenIns() {
      this.$router.push("/college/general-instructions");
    },
    collegeSpeIns() {
      this.$router.push("/college/special-instructions");
    },
    collegeFaq() {
      this.$router.push("/college/faqs");
    }
  },
  created() {
    this.$store.dispatch("getAllOpenExamMasterList");
  },
  mounted() {
    this.getNotice();
    this.getFaq();
    this.getGenIns();
    this.getSpeIns();
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
.pointer {
  corsor: pointer;
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
