<template>
  <div>
    <v-container fluid>
      <span class>
        <div class="display-1 mb-4">
          <v-icon size="80" style="margin-bottom:-.15em">dashboard</v-icon>
          <span class="ml-2 pb-4">Store Dashboard</span>
        </div>
      </span>
      <v-card class="pa-2" v-if="false">
        <v-layout row>
          <v-flex xs4>
            <v-autocomplete
              class="mx-2"
              hide-details
              label="Select Regional Center"
              item-text="center_name"
              item-value="regional_center_code"
              v-model="searchParam.reg_center_code"
              :items="getRegCenList"
              v-validate="'required'"
              :error-messages="errors.collect('reg_center_code')"
              data-vv-name="reg_center_code"
              required
              prepend-inner-icon="edit"
              outline
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="searchParam.reg_center_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{ data.item.center_name }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="data.item.center_name"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs3>
            <v-autocomplete
              class="mx-2"
              hide-details
              v-model="searchParam.division_id"
              :item-text="
                item => '(' + item.div_code + ') ' + item.division_name
              "
              item-value="div_code"
              :items="getDivisionList"
              menu-props="auto"
              label="Select Division"
              name="division"
              prepend-inner-icon="subject"
              outline
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="searchParam.div_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{
                    "(" + data.item.div_code + ") " + data.item.division_name
                  }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content
                    v-text="
                      '(' + data.item.div_code + ') ' + data.item.division_name
                    "
                  ></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        '(' +
                          data.item.div_code +
                          ') ' +
                          data.item.division_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs3>
            <v-autocomplete
              name="Exam"
              class="mx-2"
              hide-details
              v-model="searchParam.district_id"
              :item-text="item => '(' + item.id + ') ' + item.district_name"
              item-value="dist_code"
              :items="getDistrictList"
              menu-props="auto"
              label="Select District"
              prepend-inner-icon="subject"
              outline
            >
              <template v-slot:selection="data">
                <v-chip :selected="data.selected" class="chip--select-multi">{{
                  data.item.district_name
                }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="data.item.district_name"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs2>
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchScriptStm">Search</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      <!-- </v-container> -->

      <!-- <v-divider /> -->
      <v-container fluid style=" padding: 0px;">
        <v-container fluid style=" padding: 0px;">
          <v-card color="white" v-if="true">
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
                  <v-card-text class="title"
                    >Center List - ( Minimum Required Script )</v-card-text
                  >
                </v-badge>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>
              <v-spacer />
              <!-- <v-card> -->
              <v-dialog v-model="reportDialog" width="500">
                <v-card>
                  <v-select
                    class="pa-5"
                    outline
                    :items="['Division', 'District', 'All']"
                    label="Order By"
                    hide-details
                    v-model="downloadScriptStmSelection"
                  ></v-select>
                  <v-divider />
                  <div class="text-xs-center py-3">
                    <v-btn
                      outline
                      color="primary"
                      @click.stop.prevent="downloadScriptStm()"
                      class="erBtn"
                    >
                      <v-icon left>cloud_download</v-icon>Download Estimation
                      Report
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
              <v-btn color="primary" @click="openRD()">Estimation Report</v-btn>

              <!-- </v-card> -->
            </v-layout>
          </v-card>
        </v-container>

        <v-card class="pa-3 mt-2">
          <v-data-table
            :headers="specialHeaders"
            :items="[{}]"
            class="elevation-1 mt-2"
            hide-actions
          >
            <template v-slot:items="props">
              <div v-if="false">{{ props.item }}</div>
              <td style="padding:0px">
                <v-container style="padding:0px">
                  <v-data-table
                    hide-actions
                    :loading="loading"
                    :headers="firstSectionHeaders"
                    :items="getScriptStmList"
                    class="elevation-0"
                    :total-items="pagination.totalItems"
                    :pagination.sync="pagination"
                    :rows-per-page-items="pagination.rowsPerPageItems"
                  >
                    <template v-slot:items="props">
                      <td
                        class="text-xs primaryStm"
                        style=" padding-left: 20px;"
                      >
                        {{ sl_count + props.index }}
                      </td>
                      <td class="text-xs primaryStm">
                        <v-chip
                          label
                          text-color="black"
                          color="#e0f7fa"
                          style="padding: 0 0px !important;"
                          >({{ props.item.center_code }})
                          {{ props.item.center_name }}</v-chip
                        >
                      </td>
                      <td class="text-xs-center primaryStm">
                        {{ props.item.student_count }}
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
                    :headers="headersMS"
                    :items="getScriptStmList"
                    class="elevation-0"
                    :total-items="pagination.totalItems"
                    :pagination.sync="pagination"
                    :rows-per-page-items="pagination.rowsPerPageItems"
                  >
                    <template v-slot:items="props">
                      <td class="text-xs-center mainScriptCss">
                        {{ props.item.main_script_count }}
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
                    :headers="headersES"
                    :items="getScriptStmList"
                    class="elevation-0"
                    :total-items="pagination.totalItems"
                    :pagination.sync="pagination"
                    :rows-per-page-items="pagination.rowsPerPageItems"
                  >
                    <template v-slot:items="props">
                      <td class="text-xs-center extraScriptCss">
                        {{ props.item.extra_script_count }}
                      </td>
                    </template>
                  </v-data-table>
                </v-container>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-container>
  </div>
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
      downloadScriptStmSelection: "",
      reportDialog: false,
      // main script
      ms_packetSize: 25,
      ms_multiplier: 1,
      // extra script
      es_packetSize: 50,
      es_multiplier: 1,
      // hudai
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
        exam_initiate_id: 1
      },
      t: null,
      v: 0
    };
  },

  created() {
    this.initialize();
    this.$store.dispatch("fetchRegCenterData");
    this.$store.dispatch("fetchDivisionData");
    this.$store.dispatch("fetchDistrictData");
  },

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
          text: "",
          align: "center",
          value: "sl",
          width: "2%",
          sortable: false,
          class: "primaryStm"
        },
        {
          text: "Main Script",
          align: "center",
          value: "sl",
          width: "2%",
          sortable: false,
          class: "mainScriptCss font-weight-bold title font-weight-black"
        },
        {
          text: "Extra Script",
          align: "center",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "extraScriptCss font-weight-bold title font-weight-black"
        }
        // {
        //   text: "Distribute Statement",
        //   align: "center",
        //   value: "sl",
        //   width: "1%",
        //   sortable: false,
        //   class: "extraScriptCss"
        // }
      ];
    },

    firstSectionHeaders() {
      return [
        {
          text: "Sl",
          value: "id",
          sortable: false,
          align: "center",
          class: "primaryStm"
        },
        {
          text: "Center",
          value: "center_code",
          sortable: false,
          align: "center",
          class: "primaryStm"
        },
        {
          text: "No. Std",
          value: "student_count",
          align: "center",
          sortable: false,
          class: "primaryStm"
        }
      ];
    },

    adjustHeaders() {
      return [
        {
          text: "Adjust Extra Script",
          align: "center",
          value: "sl",
          width: "1%",
          sortable: false,
          class: "extraScriptCss"
        }
      ];
    },

    headersMS() {
      return [
        {
          text: "REQUIRED",
          value: "main_script_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "mainScriptCss"
        }
      ];
    },
    headersES() {
      return [
        {
          text: "REQUIRED",
          value: "extra_script_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "extraScriptCss"
        }
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
          class: "extraScriptCss"
        },

        {
          text: "Extra Script",
          value: "loose_count",
          width: "1%",
          align: "center",
          sortable: false,
          class: "extraScriptCss"
        },

        {
          text: "Main Script Packet",
          value: "main_packet",
          width: "1%",
          align: "center",
          sortable: false,
          class: "extraScriptCss"
        },
        {
          text: "Extra Script Packet",
          value: "extra_packet",
          width: "1%",
          align: "center",
          sortable: false,
          class: "extraScriptCss"
        } // 25
      ];
    },
    myClass() {
      return {
        highlight: this.changeColor,
        shrink: !this.changeColor
      };
    },
    getCenterList() {
      return this.$store.getters.getCenterItem;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    }
  },
  methods: {
    initialize() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.year = this.getLoggedInYear.year;
    },
    // main script
    func_ms_packetSize() {
      console.log("func_ms_packetSize", this.ms_packetSize);
      this.getScriptStmList.forEach((obj, i) => {
        obj.main_script_packet_size = parseInt(this.ms_packetSize);
        obj.main_script_issued_rounded =
          Math.ceil(
            obj.main_script_issued_rounded /
              parseInt(obj.main_script_packet_size)
          ) * parseInt(obj.main_script_packet_size);
        obj.main_script_total_packet = Math.ceil(
          parseInt(obj.main_script_issued_rounded) /
            parseInt(obj.main_script_packet_size)
        );
      });
    },
    func_ms_multiplier() {
      console.log("func_ms_multiplier", this.ms_multiplier);
      this.getScriptStmList.forEach((obj, i) => {
        obj.main_script_multiplier = parseFloat(this.ms_multiplier);
      });
    },
    func_ms_multiplier_calculated(item) {
      return (item.main_script_multiplier_calculated = Math.ceil(
        parseFloat(item.main_script_multiplier) *
          parseInt(item.main_script_count)
      ));
    },
    func_ms_adjustment_count(item) {
      let temp =
        parseInt(item.main_script_multiplier_calculated) -
        parseInt(item.main_script_adjustment_count);
      // console.log("-->", parseInt(item.main_script_adjustment_count));
      item.main_script_issued_rounded =
        Math.ceil(temp / parseInt(item.main_script_packet_size)) *
        parseInt(item.main_script_packet_size);

      item.main_script_total_packet = Math.ceil(
        parseInt(item.main_script_issued_rounded) /
          parseInt(item.main_script_packet_size)
      );

      console.log(item.main_script_issued_rounded);
      return parseInt(item.main_script_adjustment_count);
    },
    // add remove functions
    removeMS(item) {
      let temp =
        parseInt(item.main_script_issued_rounded) -
        parseInt(item.main_script_packet_size);
      if (temp <= 0) {
        item.main_script_issued_rounded = 0;
      } else {
        item.main_script_issued_rounded =
          parseInt(item.main_script_issued_rounded) -
          parseInt(item.main_script_packet_size);
      }
      item.main_script_total_packet =
        parseInt(item.main_script_issued_rounded) /
        parseInt(item.main_script_packet_size);
    },
    addMS(item) {
      item.main_script_issued_rounded =
        parseInt(item.main_script_issued_rounded) +
        parseInt(item.main_script_packet_size);
      item.main_script_total_packet =
        parseInt(item.main_script_issued_rounded) /
        parseInt(item.main_script_packet_size);
      item.remove_status = true;
    },
    // extra script
    func_es_packetSize() {
      console.log("func_es_packetSize", this.es_packetSize);
      this.getScriptStmList.forEach((obj, i) => {
        obj.extra_script_packet_size = parseInt(this.es_packetSize);
        obj.extra_script_issued_rounded =
          Math.ceil(
            obj.extra_script_issued_rounded /
              parseInt(obj.extra_script_packet_size)
          ) * parseInt(obj.extra_script_packet_size);
        obj.extra_script_total_packet = Math.ceil(
          parseInt(obj.extra_script_issued_rounded) /
            parseInt(obj.extra_script_packet_size)
        );
      });
    },
    func_es_multiplier() {
      console.log("func_es_multiplier", this.es_multiplier);
      this.getScriptStmList.forEach((obj, i) => {
        obj.extra_script_multiplier = parseFloat(this.es_multiplier);
      });
    },
    func_es_multiplier_calculated(item) {
      return (item.extra_script_multiplier_calculated = Math.ceil(
        parseFloat(item.extra_script_multiplier) *
          parseInt(item.extra_script_count)
      ));
    },
    func_es_adjustment_count(item) {
      let temp =
        parseInt(item.extra_script_multiplier_calculated) -
        parseInt(item.extra_script_adjustment_count);

      item.extra_script_issued_rounded =
        Math.ceil(temp / parseInt(item.extra_script_packet_size)) *
        parseInt(item.extra_script_packet_size);

      item.extra_script_total_packet = Math.ceil(
        parseInt(item.extra_script_issued_rounded) /
          parseInt(item.extra_script_packet_size)
      );
      return parseInt(item.extra_script_adjustment_count);
    },
    // add remove functions
    removeES(item) {
      let temp =
        parseInt(item.extra_script_issued_rounded) -
        parseInt(item.extra_script_packet_size);
      if (temp <= 0) {
        item.extra_script_issued_rounded = 0;
      } else {
        item.extra_script_issued_rounded =
          parseInt(item.extra_script_issued_rounded) -
          parseInt(item.extra_script_packet_size);
      }
      item.extra_script_total_packet =
        parseInt(item.extra_script_issued_rounded) /
        parseInt(item.extra_script_packet_size);
    },
    addES(item) {
      item.extra_script_issued_rounded =
        parseInt(item.extra_script_issued_rounded) +
        parseInt(item.extra_script_packet_size);
      item.extra_script_total_packet =
        parseInt(item.extra_script_issued_rounded) /
        parseInt(item.extra_script_packet_size);
      item.remove_status = true;
    },
    // hudai
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchScriptStm() {
      if (true) {
        this.loading = true;
        this.setLimit();
        this.$store.dispatch("searchScriptStm", this.searchParam).then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
      }
    },

    updateData() {
      console.log("˜˜", this.getScriptStmList);
      this.getScriptStmList.forEach(function(item) {
        console.log("--->", item);
        // item.main_script_packet_size =
        let main =
          parseInt(item.main_script_multiplier_calculated) -
          parseInt(item.main_script_adjustment_count);

        console.log("main->", main);
        item.main_script_issued_rounded =
          Math.ceil(main / parseInt(item.main_script_packet_size)) *
          parseInt(item.main_script_packet_size);

        item.main_script_total_packet = Math.ceil(
          parseInt(item.main_script_issued_rounded) /
            parseInt(item.main_script_packet_size)
        );

        let extra =
          parseInt(item.extra_script_multiplier_calculated) -
          parseInt(item.extra_script_adjustment_count);

        item.extra_script_issued_rounded =
          Math.ceil(extra / parseInt(item.extra_script_packet_size)) *
          parseInt(item.extra_script_packet_size);

        item.extra_script_total_packet = Math.ceil(
          parseInt(item.extra_script_issued_rounded) /
            parseInt(item.extra_script_packet_size)
        );
      });
    },

    // done upto this point

    submitScriptStm(flag) {
      // console.log(JSON.stringify(this.getScriptStmList));
      let self = this;
      let payLoad = {
        final_submit: flag,
        exam_initiate_id: this.getExamInitiateId,
        exam_code: this.getLoggedInExam.code,
        year: this.getLoggedInYear.year,
        data: this.getScriptStmList
      };
      this.$root
        .$confirm("Are you sure that you want to Submit?")
        .then(confirm => {
          if (confirm) {
            this.$store.dispatch("submitScriptStm", payLoad).then(() => {
              self.searchScriptStm();
            });
          }
        });
    },

    downloadScriptStm() {
      let param = { ...this.searchParam };
      if (this.downloadScriptStmSelection == "Division") {
        param.div = 1;
      }
      if (this.downloadScriptStmSelection == "District") {
        param.dist = 1;
      }

      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then(confirm => {
          if (confirm) {
            this.$store.dispatch("download_BS_Statement", param).then(() => {
              // console.log("in return then downloadScriptStm");
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
    },
    openRD() {
      this.reportDialog = !false;
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
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
    getScriptStmList(val) {
      this.ms_packetSize = val[0].main_script_packet_size;
      this.ms_multiplier = val[0].main_script_multiplier;
      this.es_packetSize = val[0].extra_script_packet_size;
      this.es_multiplier = val[0].extra_script_multiplier;
    }
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
  background-color: #e0f7fa;
}

.mainScriptCss {
  background-color: #b2ebf2;
  /* background-color: #00bfd8; */
}

.extraScriptCss {
  background-color: #4dd0e1;
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

/* .v-chip .v-chip__content {
  padding: 0 0px;
} */
</style>
