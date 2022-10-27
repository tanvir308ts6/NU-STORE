<template>
  <div>
    <v-card>
      <!-- {{getTimeLineData}} -->
      <!-- <br /> -->
      <!-- {{searchParam}} -->
      <!-- <v-card-title> -->
      <v-card color="primary" class="py-3">
        <v-card-title class="title white--text"
          >Start date & End date Form</v-card-title
        >
      </v-card>
      <v-card color="white ml-0 ma-3 ">
        <v-card color="white ml-0 pl-3" flat>
          <v-timeline align-top dense class="ma-0 pt-4">
            <v-timeline-item
              v-for="(data, index) in getTimeLineData"
              :key="index"
              :color="getStatusColor(data.status)"
              small
            >
              <v-card class="elevation-4 mr-3">
                <v-card-title class="subheading"
                  >{{ data.id }}: {{ data.activity_name }}</v-card-title
                >
                <v-layout>
                  <v-flex xs6 class="pl-2 pr-3 pb-2">
                    <v-menu
                      v-model="data.menuShow1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="
                            computedStartDateFormattedMomentjs(data.start_date)
                          "
                          prepend-icon="event"
                          clearable
                          label="Start Date"
                          hide-details
                          v-on="on"
                          outline
                        ></v-text-field>
                      </template>
                      <v-card>
                        <v-date-picker
                          width="420"
                          v-model="data.start_date"
                          @change="data.menuShow1 = false"
                        ></v-date-picker>
                      </v-card>
                    </v-menu>
                  </v-flex>
                  <v-flex xs6 class="pr-2">
                    <v-menu
                      v-model="data.menuShow2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="
                            computedStartDateFormattedMomentjs(data.end_date)
                          "
                          prepend-icon="event"
                          clearable
                          label="End Date"
                          hide-details
                          v-on="on"
                          outline
                        ></v-text-field>
                      </template>
                      <v-card>
                        <v-date-picker
                          width="420"
                          v-model="data.end_date"
                          @change="data.menuShow2 = false"
                        ></v-date-picker>
                      </v-card>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-card>

      <v-card color="primary" class="text-xs-center py-3">
        <v-btn large class color="white" @click="submit()">Submit</v-btn>
      </v-card>
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
      menuShow: false,
      StartDate: false,
      EndDate: false,
      date: new Date().toISOString().substr(0, 10),
      topicNextBtn: true
    };
  },
  created() {
    // if (this.$store.getters.getTimeLineData.length < 1) {
    //   this.$store.dispatch("fetchExamTimeLineData");
    // }
  },
  mounted() {},
  computed: {
    getTimeLineData() {
      return this.$store.getters.getTimeLineData;
    }
  },
  methods: {
    getStatusColor(status) {
      return status == 0 ? "red" : "green";
    },
    computedStartDateFormattedMomentjs(date) {
      return date ? moment(date).format("Do MMMM YYYY") : "";
    },
    submit() {
      console.log(JSON.stringify(this.getTimeLineData));
      this.$store
        .dispatch("updateExamTimeLineData", this.getTimeLineData)
        .then(() => {
          console.log("ZAAAAAAAAAAAAAAAAHIDDDDDDDDD");
        });
    }
  },
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
