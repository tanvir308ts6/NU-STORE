<template>
  <v-container fluid style="padding-right: 0px; padding-left: 0px">
    <!-- {{subject}} -->
    <!-- {{searchParam}} -->
    <!-- {{getExaminerAccessItems}} -->

    <v-expansion-panel class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
            <span class="pl-2">{{ sideTitleOfSearchPanel }}</span>
          </div>
        </template>
        <v-layout column class="mx-5">
          <v-flex class="mx-3">
            <v-layout row wrap align-center v-if="forceRerenderFlag">
              <!-- {{getLoggedInExam}} -->
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                ></v-select>
              </v-flex>
              <!-- {{getLoggedInYear}} -->
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="(item) => '' + item.year + ''"
                  item-value="year"
                  label="Year"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- Center  -->
                <v-flex xs12>
                  <v-autocomplete
                    class="ma-2"
                    v-model="searchParam.examiner_code"
                    :item-text="
                      (item) => item.tims_id + ' - ' + item.examiner_name
                    "
                    item-value="examiner_code"
                    :items="getExaminerItemsByType"
                    menu-props="auto"
                    label="Select Head Examiner"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        label
                        close
                        @input="
                          remove(
                            searchParam.examiner_code,
                            data.item.examiner_code
                          )
                        "
                        :selected="data.selected"
                        outline
                        color="black"
                        class="chip--select-multi"
                      >
                        <span class="subheading">
                          {{ data.item.tims_id }} -
                          {{ data.item.examiner_name }}
                        </span>
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
                          <v-list-tile-title>
                            {{ data.item.tims_id }} -
                            {{ data.item.examiner_name }}
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>

          <v-flex xs6>
            <v-autocomplete
              class="ma-2"
              v-model="searchParam.subject_code"
              :items="getSubjectList"
              :item-text="(item) => item.code + ' - ' + item.title"
              item-value="code"
              label="Select Subject"
              hide-details
              prepend-icon="library_books"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="removeSearchSubject(data.item)"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{ data.item.code + " - " + data.item.title }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
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

          <v-autocomplete
            class="ma-2"
            v-model="searchParam.paper_code"
            :item-text="(item) => item.code + ' - ' + item.title"
            item-value="code"
            :items="getPaperList"
            menu-props="auto"
            label="Select Course"
            hide-details
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
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
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

          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchData">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container fluid style="padding-top: 0px; padding-bottom: 0px">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Head Examiner/Examiner Monitoring</v-card-text
            >
          </v-card>
          <v-divider class="my-0" vertical></v-divider>
          <v-spacer />
          <!-- <v-btn @click="sendMail()" color="primary" dark>Mail to All</v-btn> -->
          <v-btn color="primary" @click="downloadReport()">
            <v-icon left dark>arrow_downward</v-icon>Download Report
          </v-btn>
        </v-layout>
      </v-card>
    </v-container>
    <v-container
      v-if="false"
      fluid
      style="padding-top: 10px; padding-bottom: 10px"
    >
      <!-- {{subPap}} -->
      <v-card>
        <v-layout row wrap class="mx-4 mt-0">
          <v-flex xs12 md3>
            <v-hover>
              <v-card flat class="py-3 px-1 ma-0" style="border-radius: 5px">
                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                  class="mx-2"
                >
                  <v-autocomplete
                    class="ma-0"
                    v-model="regCen"
                    :items="getregionalCenterMap.regional_centers"
                    :item-text="
                      (item) =>
                        item.regional_center_code +
                        ' - ' +
                        item.regional_center_name
                    "
                    return-object
                    label="Select regional_centers"
                    hide-details
                    outline
                    multiple
                    prepend-icon="library_books"
                    @change="onChange()"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSubject(subPap.subject_code, data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.regional_center_code +
                          " - " +
                          data.item.regional_center_name
                        }}
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
                            v-html="
                              data.item.regional_center_code +
                              ' - ' +
                              data.item.regional_center_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <!-- <v-flex xs1></v-flex> -->
          <!-- {{getPaperList}} -->
          <v-flex xs7>
            <v-hover>
              <v-card flat class="py-3 px-1 ml-1" style="border-radius: 5px">
                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                  class="mx-2"
                >
                  <v-autocomplete
                    class="ma-0"
                    v-model="subPap.paper_code"
                    :item-text="
                      (item) => item.center_code + ' - ' + item.center_name
                    "
                    return-object
                    :items="selectCen"
                    menu-props="auto"
                    label="Select Course"
                    hide-details
                    prepend-icon="library_books"
                    multiple
                    outline
                    :disabled="selectCen.length == 0 ? true : false"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="remove(subPap.paper_code, data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.center_code + " - " + data.item.center_name
                        }}
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
                            v-html="
                              data.item.center_code +
                              ' - ' +
                              data.item.center_name +
                              ' ( RC: ' +
                              data.item.rc_name +
                              ' )'
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-layout>
                <v-btn
                  small
                  absolute
                  dark
                  fab
                  top
                  right
                  flat
                  color="primary"
                  style="
                    margin-top: 1em;
                    margin-right: -1.5em;
                    pointer-events: none;
                  "
                >
                  <v-chip small flat label color="primary">
                    {{ getPaperList.length }}
                  </v-chip>
                </v-btn>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs2>
            <v-layout align-center justify-center row fill-height>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  color="green lighted-3"
                  :class="`elevation-${hover ? 0 : 6}`"
                  class="pa-0 ma-0"
                  style="cursor: pointer; border-radius: 5px"
                >
                  <v-layout
                    align-center
                    justify-center
                    row
                    fill-height
                    class="mx-0"
                  >
                    <v-btn
                      color="priamry "
                      class="subheading text-black pa-1 white--text"
                      flat
                      @click="getData()"
                      style="border-radius: 5px"
                      :disabled="subPap.paper_code.length == 0"
                    >
                      <v-icon outline class="mr-1">get_app</v-icon>
                      <span class="subheading text-black pa-1">Get Data</span>
                    </v-btn>
                  </v-layout>
                </v-card>
              </v-hover>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <v-container fluid style="padding-top: 0px; padding-bottom: 5px">
      <v-data-table
        expand
        item-key="tims_id"
        :headers="scriptMasterHeaders"
        :items="getExaminerMonitoringData"
        class="elevation-1"
        :loading="loading"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr style="cursor: pointer">
            <td @click="openExpand(props)">{{ props.index + sl_count }}</td>
            <td
              class="text-xs-left cyan lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <!-- <v-chip label class="subheading" color="white"> -->
              {{ arrToStr(props.item.subjects) }}
              <!-- </v-chip> -->
            </td>
            <td
              class="text-xs-left cyan lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <!-- <v-chip label class="subheading" color="white"> -->
              {{ arrToStr(props.item.papers) }}
              <!-- </v-chip> -->
            </td>
            <td class="title text-xs-center primary--text font-weight-black">
              {{ props.item.examiner_type }}
            </td>
            <td class="text-xs-left" @click="openExpand(props)">
              <!-- <v-chip
                label
                class="subheading"
                style="
                  border-top-right-radius: 20px;
                  border-bottom-right-radius: 20px;
                "
              > -->
              {{ props.item.tims_id }} -
              {{ props.item.examiner_name }}
              <!-- </v-chip> -->
            </td>

            <td class="text-xs-left" @click="openExpand(props)">
              <v-btn small @click="sendMail(props.item)">{{
                props.item.examiner_email
              }}</v-btn>
            </td>
            <td @click="openExpand(props)">{{ props.item.details.mobile }}</td>
            <td></td>
            <!-- <td
              class="text-xs-center blue lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <v-chip label class="subheading" color="white">
                {{ props.item.total_script_qty }}
              </v-chip>
            </td>-->
            <td
              class="text-xs-center blue lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <!-- <v-chip label class="subheading" color="white"> -->
              {{ props.item.total_scan_qty }}
              <!-- </v-chip> -->
            </td>
            <td></td>
            <td
              class="text-xs-center blue lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <!-- <v-chip label class="subheading" color="white"> -->
              {{ props.item.examiners.length }}
              <!-- </v-chip> -->
            </td>
            <td></td>
            <td
              class="text-xs-center blue lighten-3 pa-2"
              @click="openExpand(props)"
            >
              <!-- <v-chip label class="subheading" color="white"> -->
              {{ findMarkWiseExCount(props.item.examiners) }}
              <!-- </v-chip> -->
            </td>

            <!-- <td class="text-xs-center" @click="openExpand(props)">
              <v-chip v-if="props.item.script_received_status == 3" color="white green--text">
                <b>Distributed</b>
              </v-chip>
              <v-chip v-if="props.item.script_received_status == 2" color="white orange--text">
                <b>Pending</b>
              </v-chip>
              <v-chip v-if="props.item.script_received_status == 1" color="white pink--text">
                <b>Allocated</b>
              </v-chip>
            </td>-->
            <td class="text-xs-center" @click="openExpand(props)">
              <v-btn fab flat small>
                <v-icon medium v-if="!props.expanded"
                  >keyboard_arrow_down</v-icon
                >
                <v-icon medium v-else>keyboard_arrow_up</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <v-card
            :color="` ${props.index % 2 == 0 ? 'red' : 'green'} lighten-4`"
            class="pa-4"
            v-if="!(props.item.examiners.length == 0)"
          >
            <template>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                >
                  <v-data-table
                    :headers="scriptDetailsHeaders"
                    :items="props.item.examiners"
                    class="elevation-1 nestedTable"
                    hide-actions
                    v-if="force"
                  >
                    <template v-slot:items="prop">
                      <tr :class="getClass(prop.item)">
                        <td @click="openExpand(prop)">{{ prop.index + 1 }}</td>
                        <td class="text-xs-center" @click="openExpand(prop)">
                          <!-- <v-chip label class="subheading" color="white"> -->
                          {{ arrToStrS(prop.item.subjects) }}
                          <!-- </v-chip> -->
                        </td>
                        <td class="text-xs-center">
                          <!-- <v-chip label class="subheading" color="white"> -->
                          {{ arrToStrP(prop.item.papers) }}
                          <!-- </v-chip> -->
                        </td>
                        <td
                          class="title text-xs-center purple--text font-weight-black"
                        >
                          {{ prop.item.examiner_type }}
                        </td>
                        <td class="text-xs-left" @click="openExpand(prop)">
                          {{ prop.item.tims_id }} -
                          {{ prop.item.examiner_name }}
                        </td>

                        <td class="text-xs-left" @click="openExpand(props)">
                          <v-btn small @click="sendMail(prop.item)">
                            {{ prop.item.examiner_email }}
                          </v-btn>
                        </td>
                        <td @click="openExpand(prop)" class="text-xs-left">
                          {{ prop.item.details.mobile }}
                        </td>
                        <!-- <td></td> -->
                        <td @click="openExpand(prop)" class="text-xs-left">
                          {{ prop.item.script_received_date }}
                        </td>
                        <td @click="openExpand(prop)" class="text-xs-left">
                          {{ prop.item.script_submission_date }}
                        </td>
                        <td @click="openExpand(prop)" class="text-xs-left">
                          <countdown :time="time(prop.item)">
                            <template slot-scope="props"
                              >{{ props.days }} days, {{ props.hours }} hours,
                              {{ props.minutes }} minutes,
                              {{ props.seconds }} seconds.</template
                            >
                          </countdown>
                        </td>

                        <td
                          class="text-xs-center pa-2"
                          @click="openExpand(prop)"
                        >
                          <!-- <v-chip label class="subheading" color="white"> -->
                          {{ prop.item.total_scan_qty }}
                          <!-- </v-chip> -->
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </v-hover>
            </template>
          </v-card>
        </template>
      </v-data-table>
    </v-container>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Summary</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="summHeaders"
        :items="getExaminerMonitoringSum"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <tr>
            <td class="text-xs-center">{{ props.item.total_examinee }}</td>
            <td class="text-xs-center">{{ props.item.total_present }}</td>
            <td class="text-xs-center">{{ props.item.total_absent }}</td>
            <td class="text-xs-center">{{ props.item.total_head_examiner }}</td>
            <td class="text-xs-center">{{ props.item.total_examiner }}</td>
            <td class="text-xs-center">{{ props.item.total_scan_qty }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
    <composeMail
      :toMail.sync="emailList"
      :toSms.sync="smsList"
      :dialogStatus.sync="mailDialogStatus"
    ></composeMail>
  </v-container>
</template>

<!-- <v-layout justify-center row fill-height align-center>
      <v-btn color="primary" large @click.stop.prevent="submitQuesStm()" class="erBtn">Submit</v-btn>
    </v-layout>-->

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import composeMail from "@/components/utils/composeMail.vue";
import moment from "moment";
export default {
  props: ["dialogStatus"],
  components: { composeMail },
  mixins: [commonGet, commonExamYear, common_login_getters],

  data() {
    return {
      loading: false,
      summHeaders: [
        {
          text: "Total Examinee",
          align: "center",
          sortable: false,
          value: "id",
          width: "10%",
        },

        {
          text: "Total Present",
          value: "center_name",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Total Absent",
          value: "total_packet",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Total Head Ex.",
          value: "total_packet",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Total Examiner",
          value: "total_packet",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Total Scan Quantity",
          value: "total_packet",
          align: "center",
          sortable: false,
          width: "10%",
        },
      ],
      pagination: {
        rowsPerPage: 5,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },

      sl_count: 1,
      mailDialogStatus: false,
      force: true,
      searchParam: {
        exam_initiate_id: 1,
        limit: 10, // for all
      },
      subject: { subject_code: [] },
      paper: { paper_code: [] },
      paper_loading: false,
      t: null,
      v: 0,
      subPap: {
        subject_code: [],
        paper_code: [],
        paper_loading: false,
      },
      regCen: [],
      selectCen: [],
      smsList: [],
      emailList: [],
      examiner_type: "",
    };
  },

  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifHeadExaminerUser) {
      this.searchParam.examiner_code = [
        this.getAuthUser.examiner.examiner_code,
      ];
      this.examiner_type = this.getAuthUser.examiner.examiner_type;
      if (this.examiner_type == "E") {
        this.searchParam.nested = false;
      }
    }
    this.searchParam.examiner_type = "H";
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.loading = true;
    this.$store
      .dispatch("fetchExaminerMonitoringData", this.searchParam)
      .then((data) => {
        this.loading = false;
      });
    this.$store.dispatch("fetchExaminerMonitoringSum", this.searchParam);

    // /api/auth/tms-examiner
    this.$store.dispatch("fetchExaminerByTypeData", this.searchParam);
    // getExaminerItemsByType
  },

  computed: {
    getExaminerMonitoringSum() {
      var arr = this.$store.getters.getExaminerMonitoringSum;
      let arrr = [];
      arrr.push(arr);
      return arrr;
    },
    getExaminerMonitoringData() {
      return this.$store.getters.getExaminerMonitoringData;
    },

    getExaminerItemsByType() {
      return this.$store.getters.getExaminerItemsByType;
    },
    getregionalCenterMap() {
      return this.$store.getters.getregionalCenterMap;
    },

    // Exama
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    scriptMasterHeaders() {
      return [
        { text: "SL.", value: "sl", width: "1%", sortable: false },
        {
          text: "Subjects",
          value: "subjects",
          width: "5%",
          sortable: false,
          align: "left",
        },
        {
          text: "Courses",
          value: "paper_code",
          width: "3%",
          sortable: false,
          align: "left",
        },
        {
          text: "Type",
          value: "examiner_type",
          width: "3%",
          sortable: false,
          align: "left",
        },
        {
          text: "Head Examiner",
          value: "examiner_name",
          width: "10%",
          sortable: false,
          align: "left",
        },

        {
          text: "Head Examiner Email",
          value: "examiner_email",
          width: "5%",
          sortable: false,
        },
        {
          text: "Mobile",
          value: "mobile",
          width: "10%",
          sortable: false,
          align: "left",
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center",
        },
        // {
        //   text: "Total Script qty",
        //   value: "total_script_qty",
        //   width: "3%",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: "Total Scan qty",
          value: "total_scan_qty",
          width: "3%",
          sortable: false,
          align: "center",
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center",
        },
        {
          text: "Examiner Count",
          value: "count",
          width: "3%",
          sortable: false,
          align: "center",
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
          align: "center",
        },
        {
          text: "Ex. Mark Count",
          value: "total_scan_qty",
          width: "3%",
          sortable: false,
          align: "center",
        },
        // {
        //   text: "SEND",
        //   value: "SEND",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "INVOICE",
        //   value: "INVOICE",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // },
        {
          text: "",
          value: "action",
          width: "3%",
          align: "center",
          sortable: false,
        },
      ];
    },
    scriptDetailsHeaders() {
      return [
        { text: "SL", value: "sl", sortable: false },
        {
          text: "Subjects",
          value: "subjects",

          sortable: false,
          align: "center",
        },
        {
          text: "Courses",
          value: "papers",

          sortable: false,
          align: "center",
        },
        {
          text: "Type",
          value: "examiner_type",

          sortable: false,
          align: "left",
        },
        {
          text: "Examiner name",
          value: "examiner_name",

          sortable: false,
          align: "left",
        },

        {
          text: "Examiner Email",
          value: "examiner_email",

          sortable: false,
          align: "left",
        },
        {
          text: "Mobile",
          value: "mobile",

          sortable: false,
          align: "left",
        },
        // {
        //   text: "",
        //   value: "space",
        //   width: "1%",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: "Receive Date",
          value: "script_received_date",

          sortable: false,
          align: "left",
        },
        {
          text: "Submission Date",
          value: "script_submission_date",

          sortable: false,
          align: "left",
        },
        {
          text: "Time Remaining",
          value: "script_submission_date",

          sortable: false,
          align: "left",
        },
        // {
        //   text: "Examiner Total qty",
        //   value: "examiner_total_qty",
        //   width: "3%",
        //   sortable: false,
        //   align: "center",
        // },
        // {
        //   text: "",
        //   value: "space",
        //   width: "1%",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: "Examiner Scan qty",
          value: "examiner_scan_qty",

          sortable: false,
          align: "center",
        },

        // {
        //   text: "Script Status",
        //   value: "papers",
        //   width: "3%",
        //   sortable: false,
        //   align: "center",
        // },
        // {
        //   text: "SEND",
        //   value: "SEND",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // },
        // {
        //   text: "INVOICE",
        //   value: "INVOICE",
        //   width: "5%",
        //   align: "center",
        //   sortable: false
        // }
      ];
    },

    myClass() {
      return {
        highlight: this.changeColor,
        shrink: !this.changeColor,
      };
    },
  },
  methods: {
    time(time) {
      var t = Date.parse(time.script_submission_date) - Date.parse(new Date());
      console.log("ttime", t);
      if (t >= 0) {
        return t;
      }
    },
    findMarkWiseExCount(ex) {
      console.log("findMarkWiseExCount", ex);
      var exa = ex;
      let exaArr = [];
      exa.forEach((obj) => {
        if (obj.total_scan_qty != 0) {
          console.log("in ----/// --- return then", obj);
          exaArr.push(obj);
        }
      });
      return exaArr.length;
    },

    //new report
    downloadReport() {
      this.$store.dispatch("exportExaminerHeadwise", this.searchParam);
    },
    //previous one
    // downloadExaminerReport() {
    //   this.$store.dispatch("downloadExaminerReport", this.searchParam);
    // },
    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.examiner_mobile);
        this.emailList.push(item.examiner_email);
      } else {
        this.getExaminerMonitoringData.forEach((item) => {
          this.smsList.push(item.examiner_mobile);
          this.emailList.push(item.examiner_email);
        });
      }
      console.log("tosms ", this.emailList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    alert() {
      alert("/");
    },
    removeSearchSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "removeSearchSubject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },

    openExpand(props) {
      props.expanded = !props.expanded;
    },
    downloadQuesStm() {
      // console.log("->", this.searchParam);
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("getQuesStatementPdf", this.searchParam)
              .then(() => {
                console.log("in return then downloadScriptStm");
                // self.searchScriptStm();
              });
          }
        });
    },
    submitQuesStm() {
      console.log("clicked");
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("submitQuesStm", this.getQuesStmList)
              .then(() => {
                console.log("in return then");
                self.searchQuesStm();
              });
          }
        });
    },

    addPQ(props, item) {
      this.force = false;
      item.allotted_questions =
        parseInt(item.allotted_questions) + parseInt(item.packet_size) + "";
      item.total_packet =
        parseInt(item.allotted_questions) / parseInt(item.packet_size) + "";
      this.force = true;
      let all_total_packet = 0;
      props.current_total_packet =
        parseInt(props.current_total_packet) + 1 + "";
      // props.limit_exceed = props.max_packet < all_total_packet ? true : false;
      // console.log("-/> props", props);
      // console.log("-/> item", item);
    },
    removePQ(props, item) {
      this.force = false;
      // console.log("-/> props.item", props);
      item.allotted_questions =
        "" + parseInt(item.allotted_questions) - parseInt(item.packet_size);
      item.total_packet =
        "" + parseInt(item.allotted_questions) / parseInt(item.packet_size);
      let all_total_packet = 0;

      props.current_total_packet =
        parseInt(props.current_total_packet) - 1 + "";
      this.force = true;
    },
    remove(arr, item) {
      console.log(arr);
      console.log(item);
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },

    removeSubject(arr, item) {
      const index = arr.indexOf(item.code);
      if (index >= 0) arr.splice(index, 1);

      this.subjectChange();
    },
    removePaper(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    onChange() {
      this.selectCen = [];
      console.log(this.regCen);
      this.regCen.forEach((obj) => {
        let regC = obj.regional_center_code;
        let regN = obj.regional_center_name;
        obj.centers.forEach((cen) => {
          cen.rc_code = regC;
          cen.rc_name = regN;
          this.selectCen.push(cen);
          // console.log(cen);
        });
      });
    },
    getData(i) {
      this.$store.commit("UNSET_QUES_BY_SUB");
      let search = this.searchParam;
      search.paper_code = [];
      this.subPap.paper_code.forEach((ele) => {
        search.paper_code.push(ele.code);
      });
      this.$store.dispatch("searchQuesDistribution", search).then((data) => {
        console.log(data);
      });
    },
    setLimit() {
      // this.searchParam.exam_initiate_id = this.getExamInitiateId;
      // this.searchParam.exam_year = this.getLoggedInYear.year;
      // this.searchParam.exam_code = this.getLoggedInExam.code;
      // if (this.ifCenterUser) {
      //   this.searchParam.center_code = this.getAuthUser.center.center_code;
      // }
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      // this.searchParam.sortBy = sortBy;
      // this.searchParam.search = this.search;
    },
    searchData() {
      this.setLimit();
      this.loading = true;
      this.$store
        .dispatch("fetchExaminerMonitoringItem", this.searchParam)
        .then((data) => {
          console.log("dttt", data)
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    ifEmpty(item) {
      console.log(item);
      return true;
    },
    getSubject(pap_code) {
      let sub = "Subject";
      try {
        var i;
        for (i = 0; i < this.subPap.paper_code.length; i++) {
          if (this.subPap.paper_code[i].code === pap_code) {
            sub = this.subPap.paper_code[i].subject_code;
            break; // writing normal for because forEach can't break ; : sp
          }
        }
        return sub;
      } catch (er) {
        return "No Data Found";
      }
    },
    getClass(item) {
      return item.max_total_packet < item.current_total_packet
        ? "red white--text"
        : "white black--text";
    },
    ifDisabledBtn(item) {
      return item.max_total_packet < item.current_total_packet ? true : false;
    },
    arrToStr(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str = str + arr[i].code + " - " + arr[i].title;
        if (i != arr.length - 1) str = str + ", ";
      }
      console.log("...str", str);
      return str;
    },
    arrToStrP(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str = str + arr[i].paper_code + " - " + arr[i].paper_name;
        if (i != arr.length - 1) str = str + ", ";
      }
      console.log("...str...P", arr);
      return str;
    },
    arrToStrS(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str = str + arr[i].subject_code + " - " + arr[i].subject_name;
        if (i != arr.length - 1) str = str + ", ";
      }
      console.log("...str", str);
      return str;
    },
  },
  watch: {
    pagination() {
      // console.log("here ??");
      this.searchData();
      // this.fetchAdmitCardDataByCenter();
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
  },
};
</script>
<style lang="scss">
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.customRollGenCss {
  margin-top: -3em;
  margin-right: 2em;
}
.inputTable table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 10px;
}
.getWhite {
  background-color: rgb(233, 233, 233);
  font-size: 25px !important ;
}

.getHighlight {
  background-color: rgba(255, 255, 255, 0);
}

.custFavSm.v-btn--floating.v-btn--small {
  height: 20px;
  width: 20px;
}
.nestedTable thead th {
  background-color: #1e88e5 !important ;
  color: rgb(255, 255, 255);
  font-size: 18px;
}

.nestedTable tbody {
  tr:nth-of-type(odd) {
    background-color: #bbdefb !important ;
  }
  tr:nth-of-type(even) {
    background-color: #90caf9 !important ;
  }
}
</style>
