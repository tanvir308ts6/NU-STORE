<template>
  <v-container fluid>
    <v-container fluid>
      <span class>
        <div class="display-1 mb-4">
          <v-icon size="50" color="primary">dashboard</v-icon>
          <span class="ml-2">Exam Timeline Control</span>
        </div>
      </span>
      <!-- <v-card class="py-3" floating color="cyan lighten-4">
        <v-layout row wrap fill-height align-center justify-center>
          <div>
            <v-icon left color="primary">account_balance</v-icon>
            <span class="title">Exam Timeline Control</span>
          </div>
        </v-layout>
      </v-card>-->
      <v-card flat class="pa-1 ma-2" color="cyan lighten-5">
        <!-- {{getData}} -->
        <v-layout
          row
          wrap
          v-for="activity in getData"
          :key="activity.tag"
          align-content-center
        >
          <v-card width="100%" class="px-4 mx-0 ma-1">
            <v-layout row wrap fill-height align-center justify-center>
              <v-flex xs12>
                <v-layout align-center justify-center row fill-height>
                  <v-flex
                    xs9
                    style="margin-top:0px;"
                    class="subheading mb-0 mt-0"
                  >
                    <v-icon color="primary">arrow_forward</v-icon>
                    <span class="ml-2">{{ activity.activity_name }}</span>
                    <!-- <span class="ml-2" style="color:blue;"> -->
                    <v-chip small :color="getStatusColor(activity.status)">{{
                      getstatus(activity.status)
                    }}</v-chip>
                    <!-- </span> -->
                  </v-flex>
                  <v-flex xs3>
                    <v-layout align-center justify-center row fill-height>
                      <v-btn
                        class="ma-1"
                        color="green white--text"
                        small
                        :disabled="activity.status == 1"
                        @click="changeState(activity)"
                        >Publish</v-btn
                      >
                      <v-btn
                        class="ma-1"
                        color="pink white--text"
                        small
                        :disabled="activity.status != 1"
                        @click="changeStateUN(activity)"
                        >Unpublish</v-btn
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],

  data: () => ({
    disable: false,
    disableun: false,
    searchParam: {}
  }),
  mounted() {
    this.getActivityStatus();
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    // this.getActivityStatus();
  },
  computed: {
    getData() {
      return this.$store.getters.getActivityStatusItem;
    }
  },
  methods: {
    getActivityStatus() {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.ifSearchExam = true;
      this.ifSearchYear = true;
      this.$store.dispatch("fetchActivityStatus", this.searchParam);
    },

    find(st) {
      console.log("...log", st);
      if (st == 1) {
        console.log("...if");
        return true;
      } else {
        return false;
      }
    },
    getStatusColor(st) {
      if (st == 1) {
        return "green lighten-3";
      } else {
        return "pink lighten-4";
      }
    },
    getstatus(st) {
      if (st == 1) {
        console.log("...if");
        return "Published";
      } else {
        return "Unpublished";
      }
    },
    changeState(item) {
      console.log("...mtu", item);
      this.searchParam.activity_id = item.id;
      this.searchParam.status = 2;
      var that = this;
      // if (item.status == 0) {
      this.$root
        .$confirm("Are you sure that you want to Publish?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("changeActivityStatus", this.searchParam)
              .then(() => {
                console.log("in return then ");
                that.searchParam.activity_id = "";

                that.$store.dispatch("fetchActivityStatus", this.searchParam);
                // .then(() => {
                //   that.getActivityStatus();
                // });
              });
          }
          //   else {
          //     that.find("0");
          //   }
        });
      // }
    },
    changeStateUN(item) {
      console.log("...mtu", item);
      this.searchParam.activity_id = item.id;
      this.searchParam.status = 0;
      var that = this;
      // if (item.status == 0) {
      this.$root
        .$confirm("Are you sure that you want to Unpublish?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("changeActivityStatus", this.searchParam)
              .then(() => {
                console.log("in return then ");
                that.searchParam.activity_id = "";

                that.$store.dispatch("fetchActivityStatus", this.searchParam);
              });
          }
          //   else {
          //     that.find("0");
          //   }
        });
      // }
    }
  },
  watch: {
    getExamInitiateId() {
      // this.searchParam.exam_initiate_id = this.getExamInitiateId;
      // this.searchParam.exam_year = this.getLoggedInYear.year;
      // this.searchParam.exam_code = this.getLoggedInExam.code;
      this.getActivityStatus();
    }
  }
};
</script>

<style lang="scss" scoped>
.input__label {
  color: black;
}
</style>
