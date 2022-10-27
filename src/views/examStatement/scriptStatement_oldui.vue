<template>
  <v-container fluid>
    <!-- ... -->
    <!-- {{searchParam}} -->
    <!-- {{getSessionList}} -->
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
                  :item-text="
                    item => '( Code:' + item.code + ' ) ' + item.title
                  "
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
                  :item-text="item => '' + item.year + ''"
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
                    :item-text="item => item.session"
                    item-value="center_code"
                    :items="getSessionList"
                    menu-props="auto"
                    label="Select Center"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.center_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.session }}</v-chip
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
              <v-btn outline round large @click="searchScriptStm">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container fluid style=" padding: 0px;">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Script Statement</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-btn
            outline
            color="primary"
            @click.stop.prevent="downloadScriptStm()"
            class="erBtn"
          >
            <v-icon left>cloud_download</v-icon>Download Statement
          </v-btn>
        </v-layout>
      </v-card>
    </v-container>
    <v-layout row wrap class="mx-4 mt-0">
      <v-flex xs6>
        <v-layout row wrap class="mx-4 mt-0">
          <v-flex xs1 />
          <v-flex xs5>
            <v-text-field
              class="ma-2"
              @blur="updatePacketSize"
              v-on:keyup.enter="updatePacketSize"
              v-model="packetSize"
              label="Packet Size"
              prepend-icon="edit"
              outline
              hide-details
            ></v-text-field>
          </v-flex>
          <!-- <v-flex xs2 /> -->
          <v-flex xs5>
            <v-text-field
              class="ma-2"
              @blur="updateLooseScript"
              v-on:keyup.enter="updateLooseScript"
              v-model="scriptLoose"
              label="Select Extra Paper Multiplier"
              prepend-icon="edit"
              outline
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex xs1 />
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap class="mx-4 mt-0">
          <v-flex xs1 />
          <v-flex xs5>
            <v-text-field
              class="ma-2"
              @blur="updatePacketSize"
              v-on:keyup.enter="updatePacketSize"
              v-model="packetSize"
              label="Packet Size"
              prepend-icon="edit"
              outline
              hide-details
            ></v-text-field>
          </v-flex>
          <!-- <v-flex xs2 /> -->
          <v-flex xs5>
            <v-text-field
              class="ma-2"
              @blur="updateLooseScript"
              v-on:keyup.enter="updateLooseScript"
              v-model="scriptLoose"
              label="Select Extra Paper Multiplier"
              prepend-icon="edit"
              outline
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex xs1 />
        </v-layout>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="specialHeaders"
      :items="[{}]"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <div v-if="false">{{ props.item }}</div>
        <td style="padding:0px">
          <v-container style="padding:0px">
            <v-data-table
              hide-actions
              :loading="loading"
              :headers="scriptStatementHeaders"
              :items="getScriptStmList"
              class="elevation-0"
              :total-items="pagination.totalItems"
              :pagination.sync="pagination"
              :rows-per-page-items="pagination.rowsPerPageItems"
            >
              <template v-slot:items="props">
                <td class="text-xs primaryStm" style=" padding-left: 20px;">
                  {{ sl_count + props.index }}
                </td>
                <td class="text-xs primaryStm">
                  <!-- <v-tooltip top>
                    <template v-slot:activator="{ on }">
                  <span v-on="on">-->
                  <v-chip label text-color="black" color="white"
                    >{{ props.item.center_name }} ({{
                      props.item.center_code
                    }})</v-chip
                  >
                  <!-- </span>
                    </template>
                     <div class="title">( {{ props.item.center_code }} ) {{ props.item.center_name }}</div> 
                  </v-tooltip>-->
                </td>
                <!-- <td class="text-xs-left primaryStm">({{ props.item.center_code }})</td> -->
                <td class="text-xs-center primaryStm">
                  {{ props.item.student_count }}
                </td>
                <td class="text-xs-center primaryStm">
                  {{ props.item.script_count }}
                </td>

                <td class="text-xs-center primaryStm">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <v-chip label outline text-color="black">{{
                          props.item.loose_count
                        }}</v-chip>
                      </span>
                    </template>
                    <div class>
                      Extra Paper Multiplier * Main Script No. = Extra Script
                      No.
                    </div>
                    <div class="title">
                      ( {{ props.item.loose_percentage }} *
                      {{ props.item.script_count }} ) =
                      {{ props.item.loose_count }}
                    </div>
                  </v-tooltip>
                </td>

                <td
                  class="text-xs-center primaryStm"
                  :class="[changeColor ? 'primaryStm' : 'getHighlight']"
                >
                  {{ props.item.packet_size }}
                </td>

                <td class="text-xs-center primaryStm">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <v-chip label outline text-color="black">{{
                          props.item.main_packet
                        }}</v-chip>
                      </span>
                    </template>
                    <div class>
                      Main Script No. / Packet Size = Main Script Packet No.
                    </div>
                    <div class="title">
                      ( {{ props.item.script_count }} /
                      {{ props.item.packet_size }} ) =
                      {{ props.item.main_packet }}
                    </div>
                  </v-tooltip>
                </td>

                <td class="text-xs-center primaryStm">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <v-chip label outline text-color="black">{{
                          props.item.extra_packet
                        }}</v-chip>
                      </span>
                    </template>
                    <div class>
                      Extra Script No. / Packet Size = Extra Script Packet No.
                    </div>
                    <div class="title">
                      ( {{ props.item.loose_count }} /
                      {{ props.item.packet_size }} ) =
                      {{ props.item.extra_packet }}
                    </div>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </v-container>
        </td>
        <td style="padding:0px">
          <v-container style="padding:0px">
            <v-data-table
              hide-actions
              :loading="loading"
              :headers="adjustHeaders"
              :items="getScriptStmList"
              class="elevation-0"
              :total-items="pagination.totalItems"
              :pagination.sync="pagination"
              :rows-per-page-items="pagination.rowsPerPageItems"
            >
              <template v-slot:items="props">
                <td class="text-xs-center adjustStm">
                  <v-text-field
                    class="sp v-text-field__slot"
                    hide-details
                    style="' margin-top: 0px; border: 1px solid black;; padding: 0px !important; '"
                    single-line
                    v-model="props.item.printable_paper"
                  ></v-text-field>
                </td>
                <td class="text-xs-center adjustStm">
                  <v-text-field
                    class="sp v-text-field__slot"
                    hide-details
                    style="' margin-top: 0px; border: 1px solid black;; padding: 0px !important; '"
                    single-line
                    v-model="props.item.printable_paper"
                  ></v-text-field>
                </td>
              </template>
            </v-data-table>
          </v-container>
        </td>
        <td style="padding:0px">
          <v-container style="padding:0px">
            <v-data-table
              hide-actions
              :loading="loading"
              :headers="distributeStatementHeaders"
              :items="getScriptStmList"
              class="elevation-0"
              :total-items="pagination.totalItems"
              :pagination.sync="pagination"
              :rows-per-page-items="pagination.rowsPerPageItems"
            >
              <template v-slot:items="props">
                <td class="text-xs-center distributeStm">
                  {{ props.item.script_count }}
                </td>
                <td class="text-xs-center distributeStm">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <v-chip label outline text-color="black">{{
                          props.item.loose_count
                        }}</v-chip>
                      </span>
                    </template>
                    <div class>
                      Extra Paper Multiplier * Main Script No. = Extra Script
                      No.
                    </div>
                    <div class="title">
                      ( {{ props.item.loose_percentage }} *
                      {{ props.item.script_count }} ) =
                      {{ props.item.loose_count }}
                    </div>
                  </v-tooltip>
                </td>
                <td class="text-xs-center distributeStm">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <v-chip label outline text-color="black">{{
                          props.item.main_packet
                        }}</v-chip>
                      </span>
                    </template>
                    <div class>
                      Main Script No. / Packet Size = Main Script Packet No.
                    </div>
                    <div class="title">
                      ( {{ props.item.script_count }} /
                      {{ props.item.packet_size }} ) =
                      {{ props.item.main_packet }}
                    </div>
                  </v-tooltip>
                </td>
                <td class="text-xs-center distributeStm">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <v-chip label outline text-color="black">{{
                          props.item.extra_packet
                        }}</v-chip>
                      </span>
                    </template>
                    <div class>
                      Extra Script No. / Packet Size = Extra Script Packet No.
                    </div>
                    <div class="title">
                      ( {{ props.item.loose_count }} /
                      {{ props.item.packet_size }} ) =
                      {{ props.item.extra_packet }}
                    </div>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </v-container>
        </td>
      </template>
    </v-data-table>

    <v-layout justify-center row fill-height align-center>
      <v-btn color="primary" large @click="submitScriptStm()" class="erBtn"
        >Submit</v-btn
      >
    </v-layout>
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  props: ["dialogStatus"],
  components: {},
  mixins: [commonGet, commonExamYear],

  data() {
    return {
      forceRerenderFlag: true,
      packetSize: 50,
      scriptLoose: 2,
      sl_count: -1,
      loading: false,
      componentStatus: false,
      details: [],
      rollGendialog: false,
      rollGendMode: true,
      examMode: true,
      paperMode: true,
      changeColor: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: -1,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }]
      },
      search: "",
      getStatus: [
        { name: "All", value: 0 },
        { name: "Only Teacher Approved", value: 1 },
        { name: "Only Paid", value: 2 }
      ],
      searchParam: {
        exam_initiate_id: 1,
        session: ["2015-16"]
      },
      t: null,
      v: 0
    };
  },

  created() {
    // this.$store.commit("UNSET_FORM_FILLUP_DATA");

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    // if (!this.$store.getters.getSessionItems.length) {
    this.$store.dispatch("fetchAllSessionData");

    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    // }
  },

  // mounted() { getScriptStatement
  // },
  computed: {
    //all data
    getScriptStmList() {
      return this.$store.getters.getScriptStmItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    specialHeaders() {
      return [
        {
          text: "Primary Statement",
          align: "center",
          value: "sl",
          width: "2%",
          sortable: false,
          class: "primaryStm"
        },
        {
          text: "Adjust",
          align: "center",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "adjustStm"
        },
        {
          text: "Distribute Statement",
          align: "center",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "distributeStm"
        }
      ];
    },

    adjustHeaders() {
      return [
        {
          text: "Adjust Main Script",
          align: "center",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "adjustStm"
        },
        {
          text: "Adjust Extra Script",
          align: "center",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "adjustStm"
        }
      ];
    },

    scriptStatementHeaders() {
      return [
        {
          text: "SL",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "primaryStm"
        },
        // { text: "Exam", value: "exam_code", width: "4%" },
        {
          text: "Center",
          value: "center_code",
          width: "1%",
          sortable: false,
          align: "center",
          class: "primaryStm"
        }, // 30
        {
          text: "No. Std",
          value: "student_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "primaryStm"
        },
        {
          text: "Main Script",
          value: "script_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "primaryStm"
        },
        // { text: "Loose %", value: "loose_percentage", width: "6%" },
        {
          text: "Extra Script",
          value: "loose_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "primaryStm"
        },
        // { text: "Total Scripts", value: "total_script_count", width: "15%" }, // 30
        {
          text: "Packet Size",
          value: "packet_size",
          width: "1%",
          align: "center",
          sortable: false,
          class: "primaryStm"
        },
        {
          text: "Main Script Packet",
          value: "main_packet",
          width: "1%",
          align: "center",
          sortable: false,
          class: "primaryStm"
        },
        {
          text: "Extra Script Packet",
          value: "extra_packet",
          width: "1%",
          align: "center",
          sortable: false,
          class: "primaryStm"
        } // 25
      ];
    },
    distributeStatementHeaders() {
      return [
        {
          text: "Main Script",
          value: "script_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "distributeStm"
        },

        {
          text: "Extra Script",
          value: "loose_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "distributeStm"
        },

        {
          text: "Main Script Packet",
          value: "main_packet",
          width: "1%",
          align: "center",
          sortable: false,
          class: "distributeStm"
        },
        {
          text: "Extra Script Packet",
          value: "extra_packet",
          width: "1%",
          align: "center",
          sortable: false,
          class: "distributeStm"
        } // 25
      ];
    },
    myClass() {
      return {
        highlight: this.changeColor,
        shrink: !this.changeColor
      };
    }
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchScriptStm() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("searchScriptStm", this.searchParam).then(data => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalItems = data.meta.total;
        this.updatePacketSize(false);
        this.updateLooseScript();
      });
    },

    submitScriptStm() {
      // console.log(JSON.stringify(this.getScriptStmList));
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("submitScriptStm", this.getScriptStmList)
              .then(() => {
                // console.log("in return then");
                self.searchScriptStm();
              });
          }
        });
    },

    downloadScriptStm() {
      console.log("->", this.searchParam);
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("getScriptStatementPdf", this.searchParam)
              .then(() => {
                console.log("in return then downloadScriptStm");
                // self.searchScriptStm();
              });
          }
        });
    },
    // extra
    updatePacketSize(val) {
      this.startEffect(val);
      let ps = parseInt(this.packetSize);

      this.getScriptStmList.forEach(function(obj) {
        obj.packet_size = ps;
        // console.log("˜˜>", obj.packet_size);
      });
      // console.log("->", this.getScriptStmList);
      this.updateLooseScript();
    },

    updateLooseScript() {
      let ep = parseFloat(this.scriptLoose);
      this.getScriptStmList.forEach(function(obj) {
        obj.loose_percentage = ep;
        obj.loose_count = Math.ceil(ep * parseInt(obj.script_count));
        // obj.total_script_count =
        //   parseInt(obj.script_count) + parseInt(obj.loose_count);
      });
      this.updateTotalPacket();
    },

    updateTotalPacket() {
      let ps = parseInt(this.packetSize);
      this.getScriptStmList.forEach(function(obj) {
        obj.main_packet = Math.ceil(parseInt(obj.script_count) / parseInt(ps));
        obj.extra_packet = Math.ceil(parseInt(obj.loose_count) / parseInt(ps));
      });
    },

    startEffect(val) {
      // this.v = 0;
      if (val) {
        this.t = setInterval(
          function() {
            this.changeColor = !this.changeColor;
            this.v = this.v + 1;
          }.bind(this),
          500
        );
      }
    }
  },
  watch: {
    pagination() {
      this.searchScriptStm();
    },
    v(val) {
      if (val % 2 == 0) {
        clearInterval(this.t);
      }
      // console.log(val);
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    }
    // packetSize(val) {
    //   if (isNaN(parseInt(val))) {
    //     console.log("in then ", parseInt(val));
    //     this.packetSize = 0;
    //   } else {
    //     this.packetSize = val;
    //     console.log("in else", parseInt(val));
    //   }
    // }
  }
};
</script>
<style>
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
.fcTable table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 10px;
}
/* .sp .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  padding-left: 10px;
} */
.sp .v-text-field__slot {
  padding-left: 10px;
}
.getWhite {
  background-color: rgb(233, 233, 233);
  font-size: 25px !important ;
}

.getHighlight {
  background-color: rgba(255, 255, 255, 0);
}

.primaryStm {
  background-color: #ffffff;
}

.adjustStm {
  background-color: #f3f3f3;
}

.distributeStm {
  background-color: #e6e6e6;
}

table.v-table thead tr {
  background-color: rgb(236, 236, 236);
}

/* .tfCSS {
  padding-top: 0px;
  margin-top: 0px;
} */
.tfCSS .v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
