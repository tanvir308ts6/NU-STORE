<template>
  <div>
    <v-card>
      <!-- {{getTimeLineData}} -->
      <!-- <br /> -->
      {{ searchParam }}
      <!-- <v-card-title> -->
      <div>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">
            Select an app
            <small>Summarize if needed</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card flat>
              <v-autocomplete
                background-color="#FAFAFA"
                v-model="searchParam.topic"
                :item-text="item => item.title"
                item-value="id"
                :items="getTimeLineData"
                label="Select Exam"
                data-vv-name="exam_code"
                name="exam_code"
                prepend-inner-icon="account_balance"
                return-object
                class="ml-0"
                single-line
                hide-selected
                :hint="topic ? 'Selected Topic' : ''"
                :persistent-hint="topic ? true : false"
                flat
                style="padding-left: 0px; padding-right: 0px;"
                no-data-text="Please wait, We are fetching the exam data"
                :cache-items="true"
              >
                <template v-slot:selection="data">
                  <v-chip
                    color="#FAFAFA"
                    close
                    @input="searchParam.topic = {}"
                    :selected="data.selected"
                    style="padding-left: 0px; padding-right: 0px;"
                  >
                    <span
                      class="subheading"
                      style="padding-left: 0px; padding-right: 0px;"
                      >{{ data.item.title }}</span
                    >
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="data.item"
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.title"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-card>

            <div class="text-xs-right">
              <v-btn
                :disabled="topicNextBtn"
                color="primary"
                class="mt-3"
                @click="e6 = 2"
                >next</v-btn
              >
            </div>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2"
            >Configure analytics for this app</v-stepper-step
          >

          <v-stepper-content step="2">
            <v-card flat class="mb-5">
              <v-menu
                v-model="StartDate"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="computedStartDateFormattedMomentjs"
                    prepend-icon="event"
                    clearable
                    label="Start Date"
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-card>
                  <v-date-picker
                    width="420"
                    v-model="searchParam.startDate"
                    @change="StartDate = false"
                  ></v-date-picker>
                </v-card>
              </v-menu>
              <v-menu
                v-model="EndDate"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="computedEndDateFormattedMomentjs"
                    prepend-icon="event"
                    clearable
                    label="End Date"
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-card>
                  <v-date-picker
                    width="420"
                    v-model="searchParam.endDate"
                    @change="EndDate = false"
                  ></v-date-picker>
                </v-card>
              </v-menu>
            </v-card>
            <!-- <div class="text-xs-center"> -->
            <!-- <div> -->
            <v-toolbar flat color="white">
              <v-btn color="primary" @click="e6 = 1">back</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="e6 = 3">next</v-btn>
            </v-toolbar>

            <!-- </div> -->
            <!-- </div> -->
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3"
            >Configure analytics for this app</v-stepper-step
          >

          <v-stepper-content step="3">
            <v-card flat class="mb-5"></v-card>
            <v-btn color="primary" @click="e6 = 2">back</v-btn>
          </v-stepper-content>
        </v-stepper>
        <!-- <v-toolbar flat color="white">
          <v-btn color="primary" @click="e6 = 1">back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="e6 = 3">next</v-btn>
        </v-toolbar>-->
      </div>
      <!-- </v-card-title> -->
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      e6: 1,
      searchParam: {},
      topic: {},
      StartDate: false,
      EndDate: false,
      date: new Date().toISOString().substr(0, 10),
      topicNextBtn: true
    };
  },
  created() {
    if (this.$store.getters.getTimeLineData.length < 1) {
      this.$store.dispatch("fetchExamTimeLineData");
    }
  },
  mounted() {},
  computed: {
    getTimeLineData() {
      return this.$store.getters.getTimeLineData;
    },
    computedStartDateFormattedMomentjs() {
      return this.searchParam.startDate
        ? moment(this.searchParam.date).format("dddd, MMMM Do YYYY")
        : "";
    },
    computedEndDateFormattedMomentjs() {
      return this.searchParam.endDate
        ? moment(this.searchParam.date).format("dddd, MMMM Do YYYY")
        : "";
    }
  },
  methods: {},
  watch: {
    "searchParam.topic": function(val) {
      try {
        Object.entries(val).length === 0
          ? (this.topicNextBtn = true)
          : (this.topicNextBtn = false);
      } catch (ex) {
        this.topicNextBtn = true;
      }
      // console.log("---> topicNextBtn", this.topicNextBtn);
    }
  }
};
</script>

<style lang="scss" scoped></style>
