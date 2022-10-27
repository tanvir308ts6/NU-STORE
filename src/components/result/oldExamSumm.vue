<template>
  <!-- <v-container fluid> -->
  <v-card flat class="my-0">
    <v-layout column>
      <v-container fluid>
        <!-- {{getResultDashboardData}} -->
        <v-layout row wrap justify-center align-center>
          <span class>
            <div class="display-1 mb-4">
              <v-icon size="40" color="primary">dashboard</v-icon>
              <span class="ml-2">Exam Summary</span>
            </div>
          </span>
          <!-- <v-divider class="my-2" vertical></v-divider>  -->
          <v-spacer />
          <v-card-actions>
            <v-btn @click="exportPdf" color="primary" dark
              ><v-icon dark>arrow_downward</v-icon>Download Exam Summary</v-btn
            >
          </v-card-actions>
        </v-layout>

        <v-layout row wrap>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">view_array</v-icon
                    >Total Center &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToCenterCount()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_center"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C"
                      >account_balance</v-icon
                    >Total College &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToCollegeCount()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_college"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">article</v-icon
                    >Total Subject &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToSubjectCount()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_subject"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">article</v-icon
                    >Total Paper &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToPaperCount()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_paper"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">grading</v-icon
                    >Total passed &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToRepWith()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_passed"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">help</v-icon>Total
                    Failed &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToList()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_failed"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C"
                      >published_with_changes</v-icon
                    >Total Pass percentage &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToList()"
                      style="font-size:1.8em;"
                      :data-target="
                        getResultDashboardData.pass_percentage[0]
                          .total_pass_percentage
                      "
                      >0 %</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">article</v-icon
                    >Total Fail Percentage &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToList()"
                      style="font-size:1.8em;"
                      :data-target="
                        getResultDashboardData.pass_percentage[0]
                          .total_fail_percentage
                      "
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">pan_tool</v-icon
                    >Total Withheld &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToRepWith()"
                      style="font-size:1.8em;"
                      :data-target="
                        getResultDashboardData.reported_withheld.withheld
                      "
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C"
                      >pending_actions</v-icon
                    >Total Reported &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToRepWith()"
                      style="font-size:1.8em;"
                      :data-target="
                        getResultDashboardData.reported_withheld.reported
                      "
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">article</v-icon
                    >Total Present &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToList()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.attendance.present"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>

          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">spellcheck</v-icon
                    >Total Absent &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToList()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.attendance.absence"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex class="custSty">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`custBtn elevation-${hover ? 12 : 2}`"
              >
                <v-layout align-center justify-center row fill-height>
                  <div class="title pa-2">
                    <v-icon left class="pl-2" color="#00695C">face</v-icon>Total
                    Examinee &nbsp; :&nbsp;
                    <v-btn
                      color="blue darken-3"
                      class="white--text custBtn elevation-0 counter"
                      @click.stop.prevent="goToRepWith()"
                      style="font-size:1.8em;"
                      :data-target="getResultDashboardData.total_examinee"
                      >0</v-btn
                    >
                  </div>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- <v-layout row wrap>
        <v-flex class="custSty" v-for="(item,i) in getProcessedData" :key="i">
          <v-card class="custBtn" v-if="i>2">
            <v-layout align-center justify-center row fill-height>
              <div class="title pa-2">
                <v-icon left class="pl-2">view_array</v-icon>
                {{item[0]}} &nbsp; :&nbsp;
                <v-btn
                  color="blue darken-3"
                  class="white--text custBtn elevation-0"
                  @click.stop.prevent="goToCenterCount()"
                  style="font-size:1.8em;"
                >{{item[1]}}</v-btn>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>-->
      <!-- <pre>  {{getProcessedData}} </pre> -->
    </v-layout>
  </v-card>
  <!-- </v-container> -->
</template>

<script>
import commonGet from '../../mixin/common_getters_mixin'
import commonExamYear from '../../mixin/exam_year_watch_mixin'

export default {
  mixins: [commonGet, commonExamYear],

  data: () => ({
    downParam: {},
    updateCount: false
  }),
  created () {
    this.downParam.exam_initiate_id = this.getExamInitiateId
    this.downParam.year = this.getLoggedInYear.year
    this.downParam.exam_code = this.getLoggedInExam.code
    this.downParam.exam_type = this.getLoggedInExamType
    this.$store
      .dispatch('searchResultDashboardData', this.downParam)
      .then(data => {
        setTimeout(() => {
          this.animCounter()
        }, 500)
      })
  },
  computed: {
    getResultDashboardData () {
      return this.$store.getters.getResultDashboardData
    },
    getProcessedData () {
      let arr = Object.entries(this.getResultDashboardData)
      return arr
    }
  },
  methods: {
    animCounter () {
      console.log('anim')
      clearInterval(this.updateCount)

      const speed = 550 // The lower the slower // now 550 cz small data
      document.querySelectorAll('.counter').forEach(counter => {
        const counterNumber = +counter.getAttribute('data-target') //target

        this.updateCount = setInterval(() => {
          const divContent = +counter.innerText
          const increaseBy = counterNumber / speed

          console.log('counterNumber', counterNumber)
          console.log('divContent', divContent)
          console.log('increaseBy', increaseBy)

          // Check if target is reached
          divContent < counterNumber
            ? (counter.innerText = Math.ceil(divContent + increaseBy))
            : Math.floor(divContent + increaseBy)
        }, 4) // Call function every ms now 3 cz small data
      })
    },
    exportPdf () {
      this.$store.dispatch('exportExamSummary', this.downParam)
    },
    goToList () {
      window.open('/absent-reported-withheld-list')
    },
    goToRepWith () {
      window.open('/report-withheld')
    },
    goToCenterCount () {
      window.open('/center-allocation/practical')
    },
    goToPaperCount () {
      //console.log("ddddd")
      window.open('/practical_viva/paper-wise-passfail')
    },
    goToSubjectCount () {
      window.open('/practical_viva/subject-wise-passfail')
    }
  }
}
</script>

<style lang="scss">
.custSty {
  margin: 8px 8px !important;
  padding: 0px 5px !important;
}
.custBtn {
  border-radius: 50px;
}
</style>
