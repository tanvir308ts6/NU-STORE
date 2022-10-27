<template>
  <v-container fluid>
    <v-expansion-panel
      class="mb-3"
      inset
      v-model="open"
      v-if="forceRerenderFlag"
    >
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout column class="mx-5">
          <v-flex class="mx-3" v-if="!currentPaper">
            <v-layout row wrap align-center>
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                  prepend-icon="store_mall_directory"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="item => '' + item.year + ''"
                  item-value="year"
                  label="Year"
                  prepend-icon="calendar_today"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12 v-if="!currentPaper">
                  <v-autocomplete
                    outline
                    :disabled="ifCenterUser"
                    class="ma-2"
                    v-model="searchParam.center_code"
                    :item-text="
                      item => item.center_code + ' - ' + item.center_name
                    "
                    item-value="center_code"
                    :items="getCenterList"
                    menu-props="auto"
                    label="Select Center"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeCenter(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{ data.item.center_code +
                        " - " +
                        data.item.center_name
                        }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title
                            v-html="
                                data.item.center_code +
                                ' - ' +
                                data.item.center_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 v-if="!currentPaper">
                  <v-text-field
                    outline
                    class="ma-2"
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.paper_code"
                    :items="getPaperList"
                    :item-text="item => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Course"
                    persistent-hint
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removePaper(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.code + " - " + data.item.title }}</v-chip
                      >
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
                            v-html="data.item.code + ' - ' + data.item.title"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.absence"
                    label="Absent "
                    class="mt-5 mr-2 ml-5"
                    color="indigo darken-3"
                    @change="absentStatus($event)"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.reported"
                    label="Reported"
                    class="mt-5 mr-2 ml-2"
                    color="indigo darken-3"
                    @change="reportedStatus($event)"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.withheld"
                    label="Withheld"
                    class="mt-5 mr-2 ml-5"
                    color="indigo darken-3"
                    @change="withheldStatus($event)"
                  ></v-checkbox>
                </v-flex>

                <v-flex xs6>
                  <v-checkbox
                    v-model="searchParam.expelled"
                    label="Expel"
                    class="mt-5 mr-2 ml-2"
                    color="indigo darken-3"
                    @change="expelStatus($event)"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="fetchAbsReportedWithheldData">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  medium
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title mt-2"
                >Absent/Reported/Withheld Student List</v-card-text
              >
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <!-- <v-btn medium color="primary" class="white--text" @click="generateReport()">
            <v-icon dark>arrow_downward</v-icon>Export
          </v-btn>-->
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getAbsReportedWithheldList"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.session_year }}</td>
          <!-- <td class="text-xs display-4" >
            <v-chip
              color="transparent"
            >{{ props.item.center_code }} - {{ props.item.center_name }}</v-chip>
          </td>-->
          <td class="text-xs-left">
            {{ props.item.college_code }} -
            {{ props.item.college_name }}
          </td>
          <td class="text-xs-left">
            {{ props.item.subject_code }} -
            {{ props.item.subject_name }}
          </td>

          <!-- <td class="text-xs">{{ props.item.student_name }}</td> -->
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>

          <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.type == 4"
              >Absent</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.type == 1"
              >Reported</v-chip
            >
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.type == 2"
              >Withheld</v-chip
            >
            <v-chip color="red" text-color="white" v-if="props.item.type == 3"
              >Expelled</v-chip
            >
          </td>
          <!-- <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.theory_status == 0">Pending</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.theory_status == 1">Complete</v-chip>
          </td>-->
          <!-- <td class="justify-center text-xs-center">
            <v-chip
              color="#FB8C00"
              text-color="white"
              v-if="props.item.practical_status == 0"
            >Pending</v-chip>
            <v-chip
              color="#388E3C"
              text-color="white"
              v-if="props.item.practical_status == 1"
            >Complete</v-chip>
          </td>-->
        </template>
      </v-data-table>
      <div>
        <vue-html2pdf
          :show-layout="false"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="absReportedWithheldList"
          :pdf-quality="2"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="1000px"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div class="row">
              <div class="col-12">
                <table
                  style="border: 1px solid red;width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
                >
                  <tbody>
                    <tr style="background-color:white;">
                      <td
                        style="border: 1px solid black; padding: 8px; width: 50%"
                      >
                        <div style="float: left; width: 70px;">
                          <img
                            src="../../assets/nu_logos/nu_logo.png"
                            style="width: 100% !important;"
                          />
                        </div>
                        <div style="float: left; padding-left: 10px;">
                          <h1 style="margin: 0; padding: 0; line-height: 1.2;">
                            National University
                          </h1>
                          <h3
                            style="padding: 0; font-weight: 500; margin: 5px 0;"
                          >
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style="margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                          >
                            Absent/Reported/Withheld List
                          </h3>
                          <h3
                            style="margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            {{ exam_name }}- {{ exam_year }}
                          </h3>
                        </div>
                      </td>
                      <td
                        style="border: 1px solid black;padding: 8px; width: 50%"
                      >
                        <div style="float: right; padding-left: 10px;">
                          <h1
                            style=" text-align: right; margin: 0; padding: 0; line-height: 1.2;"
                          >
                            National University
                          </h1>
                          <h3
                            style=" text-align: right; padding: 0; font-weight: 500; margin: 5px 0;"
                          >
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style=" text-align: right; margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                          ></h3>
                          <h3
                            style=" text-align: right;margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            Absent/Reported/Withheld List
                          </h3>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <table
              style="width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
            >
              <thead>
                <tr>
                  <td
                    style="width: 32.45pt;border: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>SL.</strong>
                    </p>
                  </td>
                  <td
                    style="width: 72.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Exam Roll</strong>
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Regitration No</strong>
                    </p>
                  </td>
                  <td
                    style="width: 58.95pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Session Year</strong>
                    </p>
                  </td>
                  <!-- <td
                    style="width: 2cm;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style='margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;'
                    >
                      <strong>Phone</strong>
                    </p>
                  </td>-->
                  <td
                    style="width: 60.9pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Center</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>College</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Subject</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Course</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Status</strong>
                    </p>
                  </td>
                </tr>
              </thead>
              <tbody
                v-for="(item, index) in getAbsReportedWithheldList"
                :key="item.index"
              >
                <tr style="background-color:white;">
                  <td
                    style="width: 32.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ index + 1 }}
                    </p>
                  </td>
                  <td
                    style="width: 72.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.exam_roll }}
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.reg_no }}
                    </p>
                  </td>
                  <td
                    style="width: 58.95pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.session_year }}
                    </p>
                  </td>
                  <!-- <td
                    style="width: 2cm;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style='margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;'
                    >
                      {{ item.phone }}
                    </p>
                  </td>-->
                  <td
                    style="width: 60.9pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.center_name }}
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.college_name }}
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.subject_name }}
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.paper_name }}
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      v-if="item.type == 4"
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      Absent
                    </p>
                    <p
                      v-if="item.type == 1"
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      Reported
                    </p>
                    <p
                      v-if="item.type == 2"
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      Withheld
                    </p>
                    <p
                      v-if="item.type == 3"
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      Expelled
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:Calibri,sans-serif;"
            >
              &nbsp;
            </p>
          </section>
        </vue-html2pdf>
      </div>
    </v-container>
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import VueHtml2pdf from "vue-html2pdf";
export default {
  components: {
    VueHtml2pdf
  },
  props: ["dialogStatus", "currentPaper", "currentItem"],
  mixins: [commonGet, commonExamYear, common_login_getters],
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
      },
      loading: false,
      sl_count: 0,
      search: "",
      exam_name: "",
      exam_year: "",
      searchParam: {},
      headers: [
        { text: "SL", value: "sl" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Registration No", value: "reg_no" },
        { text: "Session Year", value: "session_year" },
        // { text: "Center", value: "center_code" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        // { text: "Name", value: "student_name" },
        { text: "Course", value: "paper_code" },
        // { text: "Absent", value: "subject_code" },
        // { text: "Reported", value: "subject_code" },
        // { text: "Withheld", value: "subject_code" },
        { text: "Status", align: "center", value: "status" }
      ]
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
    // if (this.ifCenterUser) {
    //   this.searchParam.center_code = [this.getAuthUser.center.center_code];
    // }
    //exam
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData");
    }
    // if (!this.$store.getters.getCenterItems.length) {
    //   this.$store.dispatch("fetchCenterData");
    // }
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    param.limit = -1;
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterAllocData", param);
    }

    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
  },
  computed: {
    //all data
    getAbsReportedWithheldList() {
      return this.$store.getters.getAbsReportedWithheldList;
    }
  },
  methods: {
    generateReport() {
      console.log("..m clcik");
      this.$store.commit("SET_LOADING", { color: "primary" });
      this.$refs.html2Pdf.generatePdf();
      setTimeout(() => {
        this.$store.commit("UNSET_LOADING"); // loading Closing
      }, 5000);
    },
    absentStatus(val) {
      if (val == true) {
        this.searchParam.absence = 1;
      } else {
        this.searchParam.absence = 0;
      }
    },
    reportedStatus(val) {
      if (val == true) {
        this.searchParam.reported = 1;
      } else {
        this.searchParam.reported = 0;
      }
    },

    withheldStatus(val) {
      if (val == true) {
        this.searchParam.withheld = 1;
      } else {
        this.searchParam.withheld = 0;
      }
    },

    expelStatus(val) {
      if (val == true) {
        this.searchParam.expelled = 1;
      } else {
        this.searchParam.expelled = 0;
      }
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    fetchAbsReportedWithheldData() {
      console.log("..lulu");
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchAbsReportedWithheldData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    }
  },
  watch: {
    getExamInitiateId(val) {
      console.log("vall", val);
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.fetchAbsReportedWithheldData();
    },
    currentPaper(val) {
      console.log("see stu...");
      this.searchParam.center_code = val.center_code;
      this.searchParam.subject_code = this.currentItem.subject_code;
      this.searchParam.college_code = this.currentItem.college_code;
      this.searchParam.paper_code = this.currentItem.paper_code;
      this.fetchAbsReportedWithheldData();
    }
  }
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
