<template>
  <v-container fluid style="padding:0px">
    <v-container fluid v-if="switch1">
      <!-- {{subject}} -->
      <!-- {{searchParam}} -->
      <!-- {{getQuesDataListBySub}} -->

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
                      v-model="searchParam.session"
                      :item-text="(item) => item.session"
                      item-value="session_year"
                      :items="getSessionList"
                      menu-props="auto"
                      label="Select Session"
                      prepend-icon="list"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          label
                          close
                          @input="remove(data.item, 'session')"
                          :selected="data.selected"
                          outline
                          color="black"
                          class="chip--select-multi"
                        >
                          <span class="subheading">
                            {{ data.item.session }}
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
                            <v-list-tile-title
                              v-html="data.item.session"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 class="my-3">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="searchQuesStm">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-container fluid style="padding-top: 0px; padding-bottom: 0px;">
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Blank Script Distribution</v-card-text>
            </v-card>
            <v-divider class="my-0" vertical></v-divider>
            <v-spacer />
            <v-btn
              outline
              color="primary"
              @click.stop.prevent="downloadQuesStm()"
              class="erBtn"
            >
              <v-icon left>cloud_download</v-icon>Download Statement
            </v-btn>
          </v-layout>
        </v-card>
      </v-container>
      <v-container
        v-if="true"
        fluid
        style="padding-top: 10px; padding-bottom: 10px;"
      >
        <!-- {{subPap}} -->
        <v-card>
          <v-layout row wrap class="mx-4 mt-0">
            <v-flex xs12 md3>
              <v-hover>
                <v-card
                  flat
                  class="py-3 px-1 ma-0"
                  style=" border-radius: 5px;"
                >
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
                <v-card
                  flat
                  class="py-3 px-1 ml-1"
                  style=" border-radius: 5px;"
                >
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
                      label="Select Paper"
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
                            data.item.center_code +
                              " - " +
                              data.item.center_name
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
                    style="margin-top: 1em;margin-right: -1.5em; pointer-events: none;"
                  >
                    <v-chip small flat label color="primary">{{
                      getPaperList.length
                    }}</v-chip>
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
                    style="cursor: pointer;  border-radius: 5px;"
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
                        style=" border-radius: 5px;"
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

      <v-container fluid style="padding-top: 0px; padding-bottom: 5px;">
        <v-data-table
          expand
          item-key="id"
          :headers="scriptMasterHeaders"
          :items="getScriptStmDistributionList"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <tr style="cursor: pointer; ">
              <td @click="openExpand(props)">{{ props.index + 1 }}</td>
              <td class="text-xs-left" @click="openExpand(props)">
                <v-chip
                  label
                  class="subheading"
                  style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
                >
                  {{ props.item.reg_center_code }} -
                  {{ props.item.rc_name }}
                </v-chip>
              </td>

              <td
                class="text-xs-center blue lighten-3 pa-2"
                @click="openExpand(props)"
              >
                <v-chip label class="subheading" color="white">{{
                  props.item.main_quantity
                }}</v-chip>
              </td>
              <td
                class="text-xs-center blue lighten-3 pa-2"
                @click="openExpand(props)"
              >
                <v-chip label class="subheading" color="white">{{
                  props.item.main_packet_size
                }}</v-chip>
              </td>
              <td @click="openExpand(props)"></td>
              <td
                class="text-xs-center cyan lighten-3 pa-2"
                @click="openExpand(props)"
              >
                <v-chip label class="subheading" color="white">{{
                  props.item.extra_quantity
                }}</v-chip>
              </td>
              <td
                class="text-xs-center cyan lighten-3 pa-2"
                @click="openExpand(props)"
              >
                <v-chip label class="subheading" color="white">{{
                  props.item.extra_packet_size
                }}</v-chip>
              </td>
              <td class="text-xs-center">
                <v-chip v-if="props.item.status == 3" color="white green--text">
                  <b>Distributed</b>
                </v-chip>
                <v-chip
                  v-if="props.item.status == 2"
                  color="white orange--text"
                >
                  <b>Pending</b>
                </v-chip>
                <v-chip v-if="props.item.status == 1" color="white pink--text">
                  <b>Allocated</b>
                </v-chip>
              </td>
              <td class="text-xs-center">
                <v-btn
                  :disabled="props.item.status == 2 || props.item.status == 3"
                  fab
                  flat
                  small
                  @click="sendDataMaster(props)"
                >
                  <v-icon>send</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">
                <v-btn fab flat small>
                  <v-icon medium>list_alt</v-icon>
                </v-btn>
              </td>
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
              v-if="!(props.item.centers.length == 0)"
            >
              <template>
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                  >
                    <v-data-table
                      :headers="scriptDetailsHeaders"
                      :items="props.item.centers"
                      class="elevation-1"
                      hide-actions
                      v-if="force"
                    >
                      <template v-slot:items="prop">
                        <tr :class="getClass(props.item)">
                          <td>{{ prop.index + 1 }}</td>
                          <td class="text-xs-left">
                            {{ prop.item.center_code }} -
                            {{ prop.item.center_name }}
                          </td>
                          <td class="text-xs-center blue lighten-3 pa-2">
                            <v-chip label class="subheading" color="white">
                              {{
                                prop.item.main_quantity *
                                  prop.item.main_packet_size
                              }}
                            </v-chip>
                          </td>
                          <td class="text-xs-center blue lighten-3 pa-2">
                            <v-chip label class="subheading" color="white">
                              {{ prop.item.main_quantity }}
                            </v-chip>
                          </td>
                          <td class="text-xs-center blue lighten-3 pa-2">
                            <v-chip label class="subheading" color="white">
                              {{ prop.item.main_packet_size }}
                            </v-chip>
                          </td>
                          <td></td>
                          <td class="text-xs-center cyan lighten-3 pa-2">
                            <v-chip label class="subheading" color="white">
                              {{
                                prop.item.extra_quantity *
                                  prop.item.extra_packet_size
                              }}
                            </v-chip>
                          </td>
                          <td class="text-xs-center cyan lighten-3 pa-2">
                            <v-chip label class="subheading" color="white">
                              {{ prop.item.extra_quantity }}
                            </v-chip>
                          </td>
                          <td class="text-xs-center cyan lighten-3 pa-2">
                            <v-chip label class="subheading" color="white">
                              {{ prop.item.extra_packet_size }}
                            </v-chip>
                          </td>
                          <td class="text-xs-center">
                            <v-chip
                              v-if="prop.item.status == 3"
                              color="green white--text"
                            >
                              <b>Distributed</b>
                            </v-chip>
                            <v-chip
                              v-if="prop.item.status == 2"
                              color="orange white--text"
                            >
                              <b>Pending</b>
                            </v-chip>
                            <v-chip
                              v-if="prop.item.status == 1"
                              color="pink white--text"
                            >
                              <b>Not Distributed</b>
                            </v-chip>
                          </td>
                          <td class="text-xs-center">
                            <!--  -->
                            <v-btn
                              :disabled="
                                prop.item.status == 2 || prop.item.status == 3
                              "
                              fab
                              flat
                              small
                              @click="sendData(props, prop)"
                            >
                              <v-icon>send</v-icon>
                            </v-btn>
                          </td>
                          <td class="text-xs-center">
                            <v-btn fab flat small @click="alert()">
                              <v-icon medium>list_alt</v-icon>
                            </v-btn>
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

      <!-- <v-divider /> -->

      <hr style="height:40px" class="my-3" color="#DCDCDC" />

      <!-- <pre>
      searchParam:
      {{ searchParam }}
      </pre>-->
      <!-- <pre style="font-size: 10px !important;">
       {{getScriptStmDistributionList}}
      </pre>-->
    </v-container>
    <v-container fluid v-else style="padding:0px">
      <bsd></bsd>
    </v-container>
    <!-- <v-switch v-model="switch1" :label="`Switch: ${switch1.toString()}`"></v-switch> -->
  </v-container>
</template>

<!-- <v-layout justify-center row fill-height align-center>
      <v-btn color="primary" large @click.stop.prevent="submitQuesStm()" class="erBtn">Submit</v-btn>
    </v-layout>-->

<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import bsd from "@/components/missingScript/blankScriptDistribution_";
export default {
  props: ["dialogStatus"],
  components: { bsd },
  mixins: [commonGet, commonExamYear],

  data() {
    return {
      switch1: false,
      force: true,
      searchParam: {
        exam_initiate_id: 1,
        limit: -1, // for all
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
    };
  },

  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.$store.dispatch("fetchRegionalCenterMap", this.searchParam);

    this.$store.dispatch("fetchAllSessionData");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;

    this.$store
      .dispatch("fetchScriptDistributionData", this.searchParam)
      .then((data) => {
        console.log("-->", data);
      });
  },

  computed: {
    getregionalCenterMap() {
      return this.$store.getters.getregionalCenterMap;
    },

    getScriptStmDistributionList() {
      return this.$store.getters.getScriptStmDistributionList;
    },

    //all data
    getQuesDataListBySub() {
      let localData = [
        {
          id: 1,
          rc_code: "111",
          rc_name: "Rangpur",
          ms_issued: "20",
          ms_total: "20",
          es_issued: "20",
          es_total: "20",
          data: [
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
          ],
        },
        {
          id: 2,
          rc_code: "111",
          rc_name: "Rangpur",
          ms_issued: "20",
          ms_total: "20",
          es_issued: "20",
          es_total: "20",
          data: [
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
            {
              id: null,
              exam_code: "3302",
              exam_name: "Masters Final",
              year: "2017",
              exam_initiate_id: "1",
              center_code: "104",
              center_name: "SATKHIRA CITY COLLEGE",
              ms_issued: "20",
              ms_total: "20",
              es_issued: "20",
              es_total: "20",
            },
          ],
        },
      ];
      return localData;
      // return this.$store.getters.getQuesDataListBySub;
    },
    // Exama
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    scriptMasterHeaders() {
      return [
        { text: "SL", value: "sl", width: "5%", sortable: false },
        {
          text: "Regional Center",
          value: "regional_code",
          width: "30%",
          sortable: false,
          align: "left",
        },
        {
          text: "MS Packet Count",
          value: "ms_issued",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "MS Packet Size",
          value: "ms_total",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
        },
        {
          text: "ES Packet Count",
          value: "es_issued",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "ES Packet Size",
          value: "es_total",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "Status",
          value: "status",
          width: "5%",
          align: "center",
          sortable: false,
        },
        {
          text: "Distribute",
          value: "SEND",
          width: "5%",
          align: "center",
          sortable: false,
        },
        {
          text: "Chalan",
          value: "INVOICE",
          width: "5%",
          align: "center",
          sortable: false,
        },

        {
          text: "",
          value: "action",
          width: "5%",
          align: "center",
          sortable: false,
        },
      ];
    },
    scriptDetailsHeaders() {
      return [
        { text: "SL", value: "sl", width: "5%", sortable: false },
        {
          text: "Center",
          value: "center_code",
          width: "20%",
          sortable: false,
          align: "left",
        },
        {
          text: "MS Count",
          value: "ms_issued",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "MS Packet Count",
          value: "ms_issued",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "MS PacketSize",
          value: "ms_total",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "",
          value: "space",
          width: "1%",
          sortable: false,
        },
        {
          text: "ES Count",
          value: "ms_issued",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "ES Packet Count",
          value: "es_issued",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "ES PacketSize",
          value: "es_total",
          width: "5%",
          sortable: false,
          align: "center",
        },
        {
          text: "Status",
          value: "INVOICE",
          width: "1%",
          align: "center",
          sortable: false,
        },
        {
          text: "Distribute",
          value: "SEND",
          width: "5%",
          align: "center",
          sortable: false,
        },
        {
          text: "Chalan",
          value: "INVOICE",
          width: "5%",
          align: "center",
          sortable: false,
        },
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
    alert() {
      alert("/");
    },
    sendDataMaster(props) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Distribute?")
        .then((confirm) => {
          if (confirm) {
            props.item.status = 2;
            props.item.centers.forEach((obj) => {
              console.log(obj);
              obj.status = 2;
            });
            this.$store
              .dispatch(
                "postScriptDistributionData",
                this.getScriptStmDistributionList
              )
              .then(() => {
                console.log("in return then postScriptDistributionData");
                // self.searchScriptStm();
              });
          }
        });
    },
    sendData(props, prop) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Distribute?")
        .then((confirm) => {
          if (confirm) {
            props.item.centers[prop.index].status = 3;
            this.$store
              .dispatch(
                "postScriptDistributionData",
                this.getScriptStmDistributionList
              )
              .then(() => {
                console.log("in return then postScriptDistributionData");
                // self.searchScriptStm();
              });
          }
        });
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
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },
    removeSubject(arr, item) {
      const index = arr.indexOf(item.code);
      if (index >= 0) arr.splice(index, 1);

      this.subjectChange();
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
    searchQuesStm() {
      alert("ok");
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
  },
  watch: {
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
</style>
