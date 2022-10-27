<template>
  <div>
    <!-- {{this.searchParam}} -->
    <!-- {{getExamInitiateId}} -->
    <!-- here :: {{publishState}} -->
    <v-card v-if="publishState == 1" class="ma-3">
      <v-alert :value="true" type="info">
        <snap class="display-1">{{ publishMsg }}</snap>
      </v-alert>
    </v-card>
    <v-card>
      <v-layout row wrap align-center class="py-3">
        <v-flex xs8 class="pl-3 pr-1">
          <v-autocomplete
            disabled
            class="mt-3 ml-2 mr-2"
            v-model="searchParam.exam_code"
            :items="getExamList"
            color="primary"
            label="Select Exam"
            :item-text="(item) => item.title"
            item-value="code"
            prepend-icon="assignment_turned_in"
          >
            <template v-slot:selection="data">
              <v-chip
                color="grey lighten-4"
                close
                @input="searchParam.exam_code = ''"
                :selected="data.selected"
              >
                <span class="subheading">{{ data.item.title }}</span>
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.title + data.item.code"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs4 class="pl-1 pr-3">
          <v-autocomplete
            disabled
            class="mt-3 ml-2 mr-2"
            v-model="searchParam.year"
            :items="getYearList"
            color="primary"
            label="Select Year"
            :item-text="(item) => item.year"
            item-value="code"
            prepend-icon="calendar_today"
          >
            <template v-slot:selection="data">
              <v-chip
                color="grey lighten-4"
                close
                @input="searchParam.year = ''"
                :selected="data.selected"
              >
                <span class="subheading">{{ data.item.year }}</span>
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.year"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>

        <v-flex xs12 class="mt-0">
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-tabs color="cyan" fixed-tabs v-model="active" slider-color="black">
            <v-tab ripple>
              <div style="color:white; font-weight: 900;" class="subheading">
                All Roll Generate ({{
                  getRollGenSummaryData.total_roll_generated
                }})
              </div>
            </v-tab>
            <v-tab ripple>
              <div class="subheading" style="color:white; font-weight: 900;">
                Ungenerated Roll ({{
                  getRollGenSummaryData.total_roll_ungenerated
                }})
              </div>
            </v-tab>
            <v-tab-item v-for="n in generate" :key="n">
              <v-card flat>
                <v-layout row wrap align-center class="py-3">
                  <v-flex xs12 class="ma-3">
                    <v-text-field
                      v-model="searchParam.roll"
                      class="mt-0 ml-0"
                      name="rg_no"
                      label="Start Roll Number"
                      prepend-inner-icon="edit"
                      hint="Exam roll lenght at least 7 disit"
                      outline
                      hide-details
                      @change="checkRollValidation()"
                      :readonly="checkIfReadOnly()"
                      :disabled="
                        getRollGenSummaryData.admit_card_publish_status == 1
                      "
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 class="ma-3">
                    <v-autocomplete
                      v-model="searchParam.order_by"
                      :items="getOrderByOptions"
                      color="primary"
                      label="Order By"
                      :item-text="(item) => item.name"
                      item-value="code"
                      multiple
                      prepend-inner-icon="edit"
                      outline
                      hide-details
                      :disabled="
                        getRollGenSummaryData.admit_card_publish_status == 1
                      "
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          color="grey lighten-4"
                          close
                          @input="remove(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                        >
                          <span class="subheading">{{ data.item.name }}</span>
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
                              v-html="data.item.name"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
                <!-- <v-card-text>{{ text }}</v-card-text> -->
                <v-divider></v-divider>
                <div class="text-xs-center py-3">
                  <v-btn
                    color="success"
                    @click="rollGen(n)"
                    :disabled="checkRollGenBtnStatus(n)"
                    hint="ROll MUST TO BE 7 DIGIT LONG"
                    >Roll Generate</v-btn
                  >
                </div>
                <!-- {{getRollGenSummaryData}}  -->
                <v-card class="subheading pa-3" v-if="!active">
                  <div class="subheading ma-2" v-if="publishState == 0">
                    Admit Card Not Published
                  </div>
                  <div class="subheading ma-2" v-else>
                    Admit Card Published, So All Generate Disabled
                  </div>
                </v-card>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
      <!-- <v-layout> -->
      <!-- <pre> {{getRollGenSummaryData}}</pre> -->

      <!-- </v-layout> -->
    </v-card>
    <v-card class="subheading pa-3 mt-3">
      <div class="title ma-2">Summary Data:</div>
      <v-layout class="pl-5">
        <v-flex xs5>
          <div>Total Examinee: {{ getRollGenSummaryData.total_examinee }}</div>
          <div>
            Total Roll Generated:
            {{ getRollGenSummaryData.total_roll_generated }}
          </div>
          <div>Max Roll: {{ getRollGenSummaryData.max_roll }}</div>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs5>
          <div class="title">
            Total Roll Ungenerated:
            <v-chip label class="display-1 red white--text">
              <span>{{ getRollGenSummaryData.total_roll_ungenerated }}</span>
            </v-chip>
          </div>
        </v-flex>
      </v-layout>

      <v-btn @click="dispatchRollGenSummeryData()">update</v-btn>
    </v-card>
  </div>
</template>

<script>
import common_activities_get from "@/mixin/get_activities_time_publish";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
// import format from "date-fns/format";

export default {
  mixins: [commonGet, commonExamYear, common_activities_get],
  data: () => ({
    generate: ["all", "re"],
    searchParam: {
      roll: "",
      //   date: new Date().toISOString().substr(0, 10)
    },
    active: 0,

    getOrderByOptions: [
      { name: "College", code: "COLLEGE_CODE" },
      { name: "Subject", code: "SUBJECT_CODE" },
      { name: "Gender", code: "GENDER" },
      { name: "Division", code: "DIVISION" },
      { name: "District", code: "DISTRICT" },
      { name: "Student Type", code: "CANDIDATE_TYPE_ID" },
      { name: "Session", code: "AC_SESSION" },
      { name: "Registration No", code: "REG_NO" },
    ],
    StartDate: false,
  }),

  created() {
    //get activities status
    this.paramPublish.exam_initiate_id = this.getExamInitiateId;
    this.paramPublish.exam_code = this.getLoggedInExam.code;
    this.paramPublish.year = this.getLoggedInYear.year;
    this.paramPublish.activity_tag = "admitCardPublished";
    this.paramPublish.limit = -1;
    this.publishActivityUpdating(); // to get publish status

    if (this.getExamList.length == 0) {
      this.$store.dispatch("fetchExamData");
    }
    let param = {
      limit: -1,
    };
    this.$store.dispatch("fetchYearData", param);
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.dispatch("fetchRollGenSummaryData", this.searchParam);

    //this.checkIfPublished();
  },

  computed: {
    computedDateFormattedMomentjs() {
      return this.searchParam.date
        ? moment(this.searchParam.date).format("dddd, MMMM Do YYYY")
        : "";
    },
    getRollGenSummaryData() {
      return this.$store.getters.getRollGenSummaryData;
    },
  },
  methods: {
    checkIfReadOnly() {
      return (
        this.searchParam.roll ==
        parseInt(this.getRollGenSummaryData.max_roll) + 1
      );
    },
    checkIfPublished() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "admitCardPublished";
      param.status = "1";
      this.$store.dispatch("publishActivity", param).then((data) => {
        console.log("- sp :: sp -");
        this.publishState = data.publish_status;
      });
    },
    dispatchRollGenSummeryData() {
      console.log("searchParam", this.searchParam);
      this.$store.dispatch("fetchRollGenSummaryData", this.searchParam);
    },

    checkRollGenBtnStatus(n) {
      let flg1;
      let flg2;
      let flg3;
      try {
        flg2 = this.searchParam.roll.length < 7;
        flg3 = isNaN(this.searchParam.roll);
      } catch (er) {
        flg1 = true;
        flg2 = true;
        flg3 = true;
      }
      // console. lo
      // console.log("˜˜˜˜", this.getRollGenSummaryData.admit_card_publish_status);

      let returnVal = flg2 || flg3;

      if (n === "re") {
        if (this.getRollGenSummaryData.total_roll_ungenerated == 0) {
          return true;
        } else {
          return returnVal;
        }
      } else {
        return returnVal;
      }

      // return flg2;
    },
    checkRollValidation() {
      // console.log("bro its sp", !isNaN(this.searchParam.roll));

      if (isNaN(this.searchParam.roll)) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "Roll Generate has to be number",
          color: "red",
        });
      } else {
        if (this.searchParam.roll.length < 7) {
          this.$store.commit("SET_SNACKBAR", {
            msg: "Roll Generate Lenght " + this.searchParam.roll.length,
            color: "red",
          });
        }
      }
    },
    remove(item) {
      const index = this.searchParam.order_by.indexOf(item.name);
      if (index >= 0) this.searchParam.order_by.splice(index, 1);
    },
    rollGen(n) {
      console.log(n);
      if (n == "all") this.searchParam.regenerate = true;
      if (n == "re") this.searchParam.regenerate = false;
      this.$store.dispatch("startRollGenerate", this.searchParam).then(() => {
        // this.$store.dispatch("fetchFormFillupData");
        this.$emit("closeRollGendialog", false);
        this.dispatchRollGenSummeryData();
      });
      // console.log("here--->", this.searchParam);
    },
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.checkIfPublished();
    },
    active(val) {
      if (val) {
        this.searchParam.roll =
          parseInt(this.getRollGenSummaryData.max_roll) + 1;
      } else {
        this.searchParam.roll = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// <v-flex xs12 class="mx-3">
//           <v-switch v-model="searchParam.regenerate" label="Do you want to change Regenerate ?"></v-switch>
//         </v-flex>

//  <v-flex xs12 class="mx-3">
//                     <v-layout>
//                       <v-flex xs6 class="mr-2">
//                         <v-text-field
//                           v-model="searchParam.from"
//                           class="mt-0 ml-0"
//                           name="from"
//                           label="From"
//                           prepend-inner-icon="edit"
//                           outline
//                           hide-details
//                         ></v-text-field>
//                       </v-flex>
//                       <v-flex xs6 class="ml-2">
//                         <v-text-field
//                           v-model="searchParam.to"
//                           class="mt-0 ml-0"
//                           name="to"
//                           label="To"
//                           prepend-inner-icon="edit"
//                           outline
//                           hide-details
//                         ></v-text-field>
//                       </v-flex>
//                     </v-layout>
//                   </v-flex>
</style>
