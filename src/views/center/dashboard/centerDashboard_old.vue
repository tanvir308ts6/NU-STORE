<template>
  <v-container fluid>
    {{ getTotalStatus }}
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50">dashboard</v-icon>
        <span class="ml-2">Center Dashboard</span>
      </div>
    </span>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap v-if="forceRerenderFlag">
          <v-flex xs12 sm12 md12 lg6>
            <v-select
              disabled
              name="year"
              class="ma-2"
              v-model="searchParam.year"
              item-text="year"
              item-value="year"
              :items="getYearList"
              menu-props="auto"
              label="Select Year"
              hide-details
              prepend-icon="calendar_today"
            ></v-select>
            <!-- <v-card-title primary-title>
                <div>
                  <div class="headline">Unlimited music now</div>
                  <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>-->
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-autocomplete
              disabled
              name="Exam"
              class="ma-2"
              v-model="searchParam.exam_code"
              :item-text="item => '(' + item.code + ') ' + item.title"
              item-value="code"
              :items="getExamList"
              menu-props="auto"
              label="Select Exam"
              hide-details
              prepend-icon="subject"
            >
              <template v-slot:selection="data">
                <v-chip :selected="data.selected" class="chip--select-multi">{{
                  "(" + data.item.code + ") " + data.item.title
                }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="'(' + data.item.code + ') ' + data.item.title"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-spacer></v-spacer>
    <v-divider class="mt-4 mb-4"></v-divider>
    <v-card>
      <v-container fluid grid-list-md>
        <!-- mother -->
        <v-layout row wrap class="mt-auto">
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{ getTotalStatus.total_exam_committee }}</span>
                      </template>
                      <v-icon large color="white">people_alt</v-icon>
                    </v-badge>
                    <div class="headline">Exam Commitees</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToExamCommiteesList"
                        color="white indigo--text"
                        >Go to Exam Commitees List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{ getTotalStatus.total_invigilator }}</span>
                      </template>
                      <v-icon large color="white">person</v-icon>
                    </v-badge>
                    <div class="headline">Invigilators</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToInvigilatorsList"
                        color="white indigo--text"
                        >Go to Invigilators List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{ getTotalStatus.total_center_user }}</span>
                        <span></span>
                      </template>
                      <v-icon large color="white">people</v-icon>
                    </v-badge>
                    <div class="headline">Center Users</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToCenterUsersList"
                        color="white indigo--text"
                        >Go to Center Users List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{ getTotalStatus.total_attendance }}</span>
                        <span></span>
                      </template>
                      <v-icon large color="white">people</v-icon>
                    </v-badge>
                    <div class="headline">Attendance</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToAttendanceList"
                        color="white indigo--text"
                        >Go to Attendance List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{
                          getTotalStatus.question.total_questions
                        }}</span>
                      </template>
                      <v-icon large color="white">assignment</v-icon>
                    </v-badge>
                    <div class="headline">Questions</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToQuestionsList"
                        color="white indigo--text"
                        >Go to Questions List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{
                          getTotalStatus.blank_script.total_collection
                        }}</span>
                      </template>
                      <v-icon large color="white">import_contacts</v-icon>
                    </v-badge>
                    <div class="headline">Blank Scripts Collection</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToBlankScriptsCollectionList"
                        color="white indigo--text"
                        >Go to Blank Scripts Collection List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{
                          getTotalStatus.answer_script.total_distribution
                        }}</span>
                      </template>
                      <v-icon large color="white">menu_book</v-icon>
                    </v-badge>
                    <div class="headline">Answer Scripts Distribution</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToAnswerScriptDistributionList"
                        color="white indigo--text"
                        >Go to Answer Scripts Distribution List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-card color="blue darken-4" class="white--text">
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center">
                    <v-badge v-model="show" color="cyan" left overlap>
                      <template v-slot:badge>
                        <span>{{
                          getTotalStatus.loose_script.total_distribution
                        }}</span>
                      </template>
                      <v-icon large color="white">import_contacts</v-icon>
                    </v-badge>
                    <div class="headline">Loose Scripts Distribution</div>
                    <div>
                      <v-btn
                        small
                        dark
                        @click="goToLooseScriptDistributionList"
                        color="white indigo--text"
                        >Go to Loose Scripts Distribution List</v-btn
                      >
                    </div>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import commonGet from "../../../mixin/common_getters_mixin";
import commonExamYear from "../../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear],
  name: "dashboard",
  components: {},
  data: () => ({
    exams: [],
    year: "",
    exam: "",
    years: [],
    show: "6",
    searchParam: {}
  }),
  created() {
    this.$store.dispatch("collectTotalCenterStatistics");
    this.$store.dispatch("fetchExamData");
  },
  computed: {
    getTotalStatus() {
      return this.$store.getters.getTotalCenterStatus;
    }
  },
  methods: {
    goToExamCommiteesList() {
      this.$router.push("/exam_committee");
    },
    goToInvigilatorsList() {
      this.$router.push("/invigilator-list");
    },
    goToQuestionsList() {
      this.$router.push("/");
    },
    goToAttendanceList() {
      this.$router.push("/attendence");
    },
    goToBlankScriptsCollectionList() {
      this.$router.push("/center/bs-coll-from-reg");
    },
    goToAnswerScriptDistributionList() {
      this.$router.push("/center/as-dist-to-reg");
    },
    goToLooseScriptDistributionList() {
      this.$router.push("/center/ls-dist-to-reg");
    },
    goToCenterUsersList() {
      this.$router.push("/center/center_user");
    }
  }
};
</script>
