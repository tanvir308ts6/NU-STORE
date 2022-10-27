<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :enable-download="false"
      :preview-modal="true"
      filename="Exam Routine"
      :pdf-quality="2"
      :paginateElementsByHeight="0"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      :manual-pagination="true"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <!-- :paginate-elements-by-height="20000" -->

      <div
        slot="pdf-content"
        style="margin-top: 00px !important; border: 5px solid white"
      >
        <div
          class="pa-0 mt-3 pt-3 mr-3 ml-3"
          style="margin-top: 0px !important; border: 5px solid white"
        >
          <div class="row">
            <div class="col-12">
              <table>
                <tbody>
                  <tr style="background-color: white">
                    <td style="padding: 8px; width: 20%"></td>
                    <td style="padding: 8px; width: 50%">
                      <div style="float: left; width: 70px">
                        <img
                          src="../../assets/nu_logos/nu_logo.png"
                          style="width: 100% !important"
                        />
                      </div>
                      <div style="float: left; padding-left: 10px">
                        <p
                          style="
                            line-height: 1.2;
                            color: green;
                            font-size: 26px;
                            font-weight: bold;
                            margin: 0 !important;
                            padding: 0 !important;
                          "
                        >
                          National University
                        </p>
                        <p
                          style="
                            float: left;
                            line-height: 1.2;
                            font-size: 18px;
                            font-weight: 400;
                            margin: 0 !important;
                            padding: 0 !important;
                          "
                        >
                          Bangladesh
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12">
            <div class="col-3"></div>
            <div class="col-3" style="margin-bottom: 5px">
              <div style="padding-left: 10px">
                <h1
                  class="underline"
                  style="
                    text-align: center;
                    margin: 0;
                    padding: 0;
                    line-height: 1.2;
                  "
                >
                  Exam Routine for {{ exam_name }} - {{ exam_year }}
                </h1>
              </div>
              <br />
            </div>
            <p></p>
          </div>
          <!--
              text-align: center //put in the 2nd div from start
              <div class="row">
            <div class="col-12">
              <div class="col-3"></div>
              <div class="col-3">
                <img
                  src="../../assets/nu_logos/nu_logo.png"
                  style="width: 15% !important"
                />
              </div>
              <div class="col-6">
                <p
                  style="
                    color: green;
                    font-size: 26px;
                    font-weight: bold;
                    margin: 0 !important;
                    padding: 0 !important;
                  "
                >
                  National University
                </p>
                <p
                  style="
                    font-size: 18px;
                    font-weight: 400;
                    margin-top: 5px;
                    margin-left: 80px;
                    padding: 0 !important;
                  "
                >
                  Bangladesh
                </p>
              </div>
            </div>
          </div> -->
          <v-layout
            align-center
            justify-center
            row
            fill-height
            class="col-md-8 erLayoutCSS"
            v-for="item in getCenterAllocationSchema"
            :key="item.date"
          >
            <v-flex
              xs2
              row
              class="text-xs-left erMidBoxCSS"
              v-if="!ifCenterUser"
            ></v-flex>
            <v-flex xs2 class="text-xs-left" v-if="item.date != 'postponed'">
              <div class="title">{{ getFormatedDate(item.date) }}</div>
              <div class="subheading">{{ showDayName(item.date) }}</div>
              <div class="subheading">{{ getRoutineSchema.start_time }} am</div>
            </v-flex>
            <v-flex xs2 class="text-xs-left" v-else>
              <div class="title red--text">PostPoned</div>
            </v-flex>
            <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-if="mastersFinal">
              <div
                class="ma-2"
                v-for="(elm, i) in getFormatedPaperCodeBySub(item.papers)"
                :key="i"
              >
                {{ showData(elm) }}
                <v-divider style="background: black" />
              </div>
            </v-flex>
            <v-flex
            xs8
            style="font-size: 16px !important"
            class="erMidBoxCSS"
            v-if="oneYearProfessionalDegree"
          >
            <div
              class="ma-2"
              v-for="(elm, j) in item.papers"
              :key="j"
            >
              {{ showOneProData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
            <v-flex
              xs2
              row
              class="text-xs-center erMidBoxCSS"
              v-if="ifCenterUser"
            >
              <v-layout align-center justify-center row fill-height column>
                <v-flex>
                  <span class="title"
                    >TOTAL Examinee: {{ item.student_count }}</span
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </vue-html2pdf>
  </div>
</template>
<script>
import commonGet from "@/mixin/common_getters_mixin";
import VueHtml2pdf from "vue-html2pdf";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import * as moment from "moment";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  props: ["getCenterAllocationSchema","getRoutineSchema"],
  data: () => ({
    exam_name: "",
    exam_year: "",
    ex_code: "",
    tdPerPage: 7,
  }),
  created() {
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
  },
  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.$store.getters.getAuthUserExamInitiates.forEach((obj) => {
        if (obj.id == val) {
          this.exam_name = obj.exam_name;
          this.ex_code = obj.exam_code;
          this.exam_year = obj.year;
        }
      });
    },
  },
  methods: {
    showOneProData(param) {
      let data = param;
       console.log("data:......", param);
      let string = "";
      string = data.paper_name + " ( " + data.paper_code  +" ) ";
      return string;
    },
    showData(param) {
      let data = param.data;
      // console.log("data:", data);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        string = string + item.subject_code + " ( ";
        for (var i = 0; i < item.paper_code.length; i++) {
          string = string + item.paper_code[i];
          if (i != item.paper_code.length - 1) {
            string = string + ", ";
          }
        }
        string = string + " ) ";
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },
    getFormatedPaperCodeBySub(papers) {
      let uniArr = [];

      papers.forEach((obj) => {
        let ind = uniArr.findIndex((el) => {
          return el === obj.degree_group_code;
        });
        // console.log("ind:", ind);
        if (ind == -1) {
          uniArr.push(obj.degree_group_code);
        }
      });
      let motherArr = [];

      uniArr.forEach((obj) => {
        let secArr = [];
        papers.forEach((pap) => {
          if (pap.degree_group_code === obj) {
            // console.log("pap:", pap);
            secArr.push(pap);
          }
        });
        motherArr.push({
          data: secArr,
        });
      });

      // console.log("motherArr:", motherArr);
      let fatherArr = [];

      motherArr.forEach((mA) => {
        let subCode = [];
        mA.data.forEach((obj) => {
          if (subCode.indexOf(obj.subject_name) == -1) {
            subCode.push(obj.subject_name);
          }
        });
        let data = [];
        subCode.forEach((item) => {
          let sub = {
            subject_code: item,
            paper_code: [],
          };
          mA.data.forEach((obj) => {
            if (obj.subject_name === item) {
              sub.paper_code.push(obj.paper_code);
            }
          });
          data.push(sub);
        });
        fatherArr.push({
          data: data,
        });
      });

      console.log("fatherArr:", fatherArr);
      // this.fatherArray = fatherArr;
      return fatherArr;
    },
    showDayName(date) {
      return moment(date, "YYYY-MM-DD").format("dddd");
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    onProgress(e) {
      console.log("onProgress", e);
    },
    hasGenerated(e) {
      console.log("hasGenerated", e);
    },
    hasStartedGeneration() {
      console.log("hasStartedGeneration");
    },
    generateReports() {
      this.$refs.html2Pdf.generatePdf();
    },
    hideCollegesTableHeader(i) {
      return true;
    },
    getClassForTR(i) {
      if (i % this.tdPerPage == 0) {
        console.log(i);
        return "html2pdf__page-break ";
      }
    },
    getStyleForTR(i) {
      // if (i % 7 == 0) {
      //   console.log(i);
      //   return "margin-top:5px";
      // }
      return "";
    },
    getIfShowHeader(i) {
      if (i != 0) {
        if (i % this.tdPerPage == 0) {
          return true;
        } else {
          return false;
        }
      }
    },
  },

  components: {
    VueHtml2pdf,
  },
};
</script>
<style scoped>
.erLayoutCSS {
  border-style: solid !important;
  /* border-radius: 15px 50px 30px; */
  border-width: thin;
}
.erMidBoxCSS {
  border-right-style: solid !important;
  border-left-style: solid !important;
  border-width: thin;

  font-size: 36px !important;
  font-weight: 400;
}
.underline {
  text-decoration: underline;
}
</style>
