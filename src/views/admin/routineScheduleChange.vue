<template>
  <v-container fluid>
    <!-- schedule change -->
    <v-dialog v-model="scheduleChangeDialog">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Schedule Change</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" @click="closeSchedule()">Close</v-btn>
      </v-toolbar>
      <v-layout column>
        <v-flex xs12 sm12>
          <v-card class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 md3>
                <v-autocomplete
                  class="ma-2"
                  v-model="selectedDate"
                  :items="getRoutineDateDataList"
                  :item-text="(item) => item"
                  item-value="code"
                  label="Select Exam Date"
                  hide-details
                  prepend-icon="calendar_today"
                  @change="getExamDate($event)"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="selectedDate = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{ data.item }}
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
                          v-html="data.item"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 md9>
                <v-autocomplete
                  v-model="datewisePaperList"
                  :items="datewisePaperList"
                  :item-text="(item) => item"
                  item-value="paper_code"
                  label="Select Course"
                  persistent-hint
                  return-object
                  multiple
                  prepend-icon="library_books"
                  :no-data-text="noDataText"
                >
                  <!-- @input="removeSelectedpapers(data.item)" -->
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeDatewisePaperList(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{
                        data.item.subject_name +
                          "( " +
                          data.item.paper_code +
                          " - " +
                          data.item.paper_name +
                          " )"
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
                            data.item.subject_name +
                              '( ' +
                              data.item.paper_code +
                              ' - ' +
                              data.item.paper_name +
                              ' )'
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 md8>
                <v-menu
                  v-model="datemenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newDate"
                      label="Changed Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newDate"
                    @input="datemenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="publishState == 1"
                color="success"
                @click="changeSchedule()"
                large
              >
                <v-icon left large>shuffle</v-icon>Change
              </v-btn>
              <v-btn large color="red" @click="clearSchedule()" dark>
                <v-icon left>close</v-icon>Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 v-if="showRoutineDataDateWise">
          <v-card color="red darken-3" class="pa-2">
            <v-expansion-panel inset v-model="exp_">
              <v-expansion-panel-content class="CSP_BoarderStyle_">
                <template v-slot:header>
                  <v-toolbar color="white" flat>
                    <v-toolbar-title
                      >All the exams on this day - {{ viewExamsDate }} ({{
                        getdateWiseRoutineData.length
                      }}
                      Exams)

                      <span v-if="exp_ != 0">
                        (Please click to expand)
                      </span></v-toolbar-title
                    >
                  </v-toolbar>
                </template>
                <v-card v-if="getdateWiseRoutineData.length > 0">
                  <v-card>
                    <v-layout wrap>
                      <v-flex
                        xs4
                        v-for="(item, i) in getdateWiseRoutineData"
                        :key="i"
                      >
                        <v-card class="ma-2 pa-2">
                          <v-card flat class="ma-0 pa-0 title">
                            <span class="pa-0 ma-1"
                              >Degree Group: {{ item.degree_group_code }} -
                              {{ item.degree_group_name }}
                            </span>
                          </v-card>
                          <v-card flat class="ma-0 pa-0 title">
                            <span class="pa-1">
                              Subject: {{ item.subject_code }} -
                              {{ item.subject_name }}
                            </span>
                          </v-card>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-card>
                <v-card v-else>
                  <v-alert :value="true" type="success">
                    <snap class="display-1"
                      >No Exam on this day - date: {{ viewExamsDate }}</snap
                    >
                  </v-alert>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
    <!-- routine add/edit -->
    <v-dialog v-model="routineInputDialog">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Add / Edit</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="light-blue lighten-1" @click="routineInputDialog = false"
          >Close</v-btn
        >
      </v-toolbar>
      <v-layout column>
        <v-flex xs12 sm12>
          <v-card class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <!-- {{date}} -->
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Exam date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="onDatePickAtModal(date)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-autocomplete
                :item-disabled="disabledItems"
                v-model="selectedPapers"
                :items="getPaperList"
                :item-text="(item) => item.paper_code + ' - ' + item.paper_name"
                item-value="paper_code"
                label="Select Course"
                persistent-hint
                return-object
                multiple
                prepend-icon="library_books"
                :no-data-text="noDataText"
                :loading="ifFetchingPaperListDone"
              >
                <!-- @input="removeSelectedpapers(data.item)" -->
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="removeSelectedpapers(data.item)"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >
                    {{ data.item.paper_code + " - " + data.item.paper_name }}
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
                          data.item.paper_code + ' - ' + data.item.paper_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="publishState == 1"
                color="success"
                @click="addPapers()"
                v-if="!editedMode"
                large
              >
                <v-icon left large>add</v-icon>add
              </v-btn>
              <v-btn
                large
                color="success"
                @click="updatPapers()"
                v-if="editedMode"
              >
                <v-icon left>edit</v-icon>Edit
              </v-btn>
              <v-btn large color="red" @click="clearData()" dark>
                <v-icon left>close</v-icon>Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 v-if="showRoutineDataDateWise">
          <v-card color="red darken-3" class="pa-2">
            <v-expansion-panel inset v-model="exp_">
              <v-expansion-panel-content class="CSP_BoarderStyle_">
                <template v-slot:header>
                  <v-toolbar color="white" flat>
                    <v-toolbar-title
                      >All the exams on this day - {{ viewExamsDate }} ({{
                        getdateWiseRoutineData.length
                      }}
                      Exams)

                      <span v-if="exp_ != 0">
                        (Please click to expand)
                      </span></v-toolbar-title
                    >
                  </v-toolbar>
                </template>
                <v-card v-if="getdateWiseRoutineData.length > 0">
                  <v-card>
                    <v-layout wrap>
                      <v-flex
                        xs4
                        v-for="(item, i) in getdateWiseRoutineData"
                        :key="i"
                      >
                        <v-card class="ma-2 pa-2">
                          <v-card flat class="ma-0 pa-0 title">
                            <span class="pa-0 ma-1"
                              >Degree Group: {{ item.degree_group_code }} -
                              {{ item.degree_group_name }}
                            </span>
                          </v-card>
                          <v-card flat class="ma-0 pa-0 title">
                            <span class="pa-1">
                              Subject: {{ item.subject_code }} -
                              {{ item.subject_name }}
                            </span>
                          </v-card>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-card>
                <v-card v-else>
                  <v-alert :value="true" type="success">
                    <snap class="display-1"
                      >No Exam on this day - date: {{ viewExamsDate }}</snap
                    >
                  </v-alert>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>

    <v-alert
      :value="true"
      color="error"
      icon="warning"
      outline
      v-if="errorStatus"
      >{{ errorMsg }}</v-alert
    >
    <v-toolbar dense dark color="light-blue lighten-1" class="mt-0">
      <v-toolbar-title>Exam Routine Schedule Change</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="schedulechangeDialogOpen"
        >Change Schedule</v-btn
      >
    </v-toolbar>

    <v-layout
      align-center
      justify-center
      row
      fill-height
      class="col-md-7 erLayoutCSS"
      v-for="(item, index) in getRoutineSchema.routine"
      :key="item.date"
    >
      <v-flex>
        <v-layout
          :class="getClass(item)"
          align-center
          justify-center
          row
          fill-height
        >
          <v-divider></v-divider>
          <v-flex xs2 class="text-xs-center">
            <div class="title">{{ getFormatedDate(item.date) }}</div>
            <div class="subheading">{{ showDayName(item.date) }}</div>
            <div class="subheading">{{ getRoutineSchema.start_time }} am</div>
          </v-flex>
          <!-- showData( -->
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS">
            <div
              class="ma-2"
              v-for="(elm, i) in getFormatedPaperCodeBySub(item.papers)"
              :key="i"
            >
              {{ showData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>

          <v-flex xs2 row class="text-xs-center">
            <v-layout align-center justify-center row fill-height>
              <v-btn fab color="green" @click="editItem(item, index)" small>
                <v-icon dark>edit</v-icon>
              </v-btn>
              <!-- {{publishState}} -->
              <v-btn fab small color="red" @click="deleteItem(item, index)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-layout>
            <!-- </v-card> -->
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- </v-layout> -->
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 v-if="submitStatus || getRoutineSchema.id > 0">
        <v-layout justify-center row fill-height align-center>
          <v-btn
            color="primary"
            large
            @click.stop.prevent="submitRoutine()"
            class="erBtn"
            >Submit</v-btn
          >
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "@/mixin/common_getters_mixin";
import Vue from "vue";
import draggable from "vuedraggable";
import * as moment from "moment";
import _ from "lodash";
export default {
  mixins: [commonGet],
  components: {
    composeMail,
    draggable,
  },
  data() {
    return {
      selectedDatewisePapers: [],
      datewisePaperList: [],
      selectedDate: "",
      menu3: false,
      exp_: 0,
      fatherArray: [],
      viewExamsDate: "",
      showRoutineDataDateWise: false,
      ifFetchingPaperListDone: false,
      updateStatus: false,
      dialog: false,
      addDatePaperStatus: false,
      submitStatus: false,
      errorStatus: false,
      errorMsg: "",
      editedMode: false,
      selectedItem: [],
      selectedIndex: "",
      editable: true,
      isDragging: false,
      delayedDragging: false,
      selectedPapers: [],
      valid: false,
      menu: false,
      datemenu: false,
      newDate: "",
      manu_end: false,
      disabledItems: ["412403"],
      date1: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
      e6: [],
      e7: [],
      date: new Date().toISOString().substr(0, 10),
      routine: [],
      dataItem: {},
      seal_no: "",
      publishState: 0,
      routineInputDialog: false,
      scheduleChangeDialog: false,
      searchParam: {},
     // getRoutineSchema: {},
    };
  },
  created() {
    this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
    this.searchParam.year = this.$store.getters.getLoggedInYear.year;
    this.searchParam.exam_year = this.$store.getters.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.type = 1;
    this.$store.dispatch("routineChangeSchemaData", this.searchParam);
    this.noDataText = "No Data Available";
    // this.getRoutineSchema.id > 0
    //   ? (this.submitStatus = true)
    //   : (this.submitStatus = false);
    this.getRoutineSchema.id > 0
      ? (this.addDatePaperStatus = true)
      : (this.addDatePaperStatus = false);
    //this.routine = this.getRoutineSchema;
    this.$store.dispatch("fetchRoutineDateData", this.searchParam);
    //offdya
    if (this.getOffDayList.length < 1) this.fetchOffDayData();
  },
  mounted() {},
  watch: {
    date(val) {
      // console.log("val:", val);
      if (!this.checkValidDate()) {
        this.errorStatus = true;
      } else this.errorStatus = false;
    },
  },
  computed: {
      //routine schema
    getRoutineSchema() {
      return this.$store.getters.getRoutineSchema;
    },
    getRoutineDateDataList() {
      return this.$store.getters.getRoutineDateDataList;
    },
    getdateWiseRoutineData() {
      return this.$store.getters.getdateWiseRoutineData;
    },
    ifFetchingExamListDone() {
      return this.$store.getters.getExamItem.length > 0 ? false : true;
    },
    listString() {
      return JSON.stringify(this.routine, null, 2);
    },
    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
    //off day list
    getOffDayList() {
      return this.$store.getters.getOffDayDataList;
    },
  },

  methods: {
    removeDatewisePaperList(item) {
      var position = -1;
      console.log("..", item);
      this.datewisePaperList.forEach(function(e, index) {
        // console.log(e.paper_code);
        if (item.code == e.paper_code) position = index;
      });
      if (position > -1) this.datewisePaperList.splice(position, 1);
    },
    changeSchedule() {
      if (!this.checkValidDate()) {
        this.errorStatus = true;
        console.log("error ");
        return;
      }
      //var selectedDate = moment(this.date, "YYYY-MM-DD").format("DD-MM-YYYY");
      if (this.newDate.length < 1 || this.datewisePaperList.length < 1) {
        this.errorStatus = true;
        this.errorMsg = "Please select exam new date and exam papers.";
      } else if (this.cehckDuplicate(this.newDate)) {
        this.getRoutineSchema.routine.push({
          date: this.newDate,
          day: moment(this.newDate).format("dddd"),
          papers: this.datewisePaperList,
        });
        this.submitStatus = true;
        console.log("add ", this.getRoutineSchema.routine);
        //moment(this.date, "DD-MM-YYYY").format('DD-MM-YYYY')
        this.clearSchedule();
        this.scheduleChangeDialog = false;
      }
    },
    closeSchedule() {
      this.scheduleChangeDialog = false;
      this.selectedDate = "";
      this.datewisePaperList = [];
      this.newDate = "";
      this.showRoutineDataDateWise = false;
    },
    clearSchedule() {
      this.selectedDate = "";
      this.datewisePaperList = [];
      this.newDate = "";
      this.showRoutineDataDateWise = false;
      this.errorMsg = "";
      this.errorStatus = false;
    },
    getExamDate(date) {
      console.log("chnge date", date);
      var secArr = [];
      console.log("chnge date", this.getRoutineSchema.routine);
      this.getRoutineSchema.routine.forEach((rou) => {
        if (rou.date === date) {
          console.log("pap:", date);
          secArr.push(rou.papers);
        }
      });
      console.log("....rou", secArr);
      return (this.datewisePaperList = secArr[0]);
    },
    schedulechangeDialogOpen() {
      this.clearData();
      this.scheduleChangeDialog = true;
      this.showRoutineDataDateWise = false;
    },
    onDatePickAtModal(date) {
      this.menu2 = false;
      this.fetchRoutineDataDateWise(date);
    },

    getClass(item) {
      if (moment(item.date, "YYYY-MM-DD").isSame(moment(), "day")) {
        return " green lighten-4";
      } else if (moment(item.date, "YYYY-MM-DD").isAfter(moment(), "days")) {
        return " white";
      } else {
        return "red lighten-4";
      }
      
     // else if (moment(item.date, "YYYY-MM-DD").diff(moment(), "days")) {
      //  return " red lighten-4";
      //}
    },
    generateReport() {
      // console.log("..m clcik");
      // this.$store.commit("SET_LOADING", { color: "primary" });
      this.$refs.html2Pdf.generateReports();
      // setTimeout(() => {
      //   this.$store.commit("UNSET_LOADING"); // loading Closing
      // }, 5000);
    },
    routineInputDialogOpen() {
      this.clearData();
      this.routineInputDialog = true;
    },
    fetchRoutineDataDateWise(val) {
      this.viewExamsDate = val;
      this.$store
        .dispatch("fetchRoutineDataDateWise", { exam_date: val })
        .then((res) => {
          this.showRoutineDataDateWise = true;
        });
      // console.log("fetchRoutineDataDateWise", val);
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

      // console.log("fatherArr:", fatherArr);
      // this.fatherArray = fatherArr;
      return fatherArr;
    },
    getExamCode(exam_code) {
      // console.log("method", exam_code);
      var examCode = exam_code;
      var self = this;
      this.ifFetchingPaperListDone = true;
      this.noDataText = "Please wait, We are fetching the Paper data";
      this.$store.dispatch("fetchExamWiseData", examCode).then((data) => {
        self.ifFetchingPaperListDone = false;
        // console.log("then e", data);
        if (data.length <= 0) {
          self.noDataText = "No Data Available";
        }
      });
      // if (examCode > 0) {
      this.addDatePaperStatus = true;
      //}
      // this.addDatePaperStatus = false;
    },
    checkValidDate() {
      try {
        var currDay = moment(this.date).format("YYYY-MM-DD");
        var validStatus = true;

        this.getOffDayList.forEach((element) => {
          var offDay = moment(element.date).format("YYYY-MM-DD");
          if (offDay == currDay) {
            validStatus = false;
            this.errorMsg =
              "This is a off Day ( " +
              element.description +
              " ). Please select another date.";
          }
        });

        return validStatus;
      } catch (ex) {
        console.log("check valid date error", ex);
      }
    },

    addPapers() {
      if (!this.checkValidDate()) {
        this.errorStatus = true;
        console.log("error ");
        return;
      }
      //var selectedDate = moment(this.date, "YYYY-MM-DD").format("DD-MM-YYYY");
      if (this.date.length < 1 || this.selectedPapers.length < 1) {
        this.errorStatus = true;
        this.errorMsg = "Please select exam date and exam papers.";
      } else if (this.cehckDuplicate(this.date)) {
        this.getRoutineSchema.routine.push({
          date: this.date,
          day: moment(this.date).format("dddd"),
          papers: this.selectedPapers,
        });
        this.submitStatus = true;
        console.log("add ", this.getRoutineSchema.routine);
        //moment(this.date, "DD-MM-YYYY").format('DD-MM-YYYY')
        this.clearData();
      }
    },
    submitRoutine() {
      this.dataItem = this.getRoutineSchema;
      //SET EXAM INITIATE ID
      this.dataItem.exam_initiate_id = this.getExamInitiateId;

      console.log(this.getRoutineSchema);
      var self = this;

      try {
        if (this.getRoutineSchema.id > 0) this.editRoutine();
        else {
          this.$store.dispatch("saveROUTINEData", this.dataItem).then(() => {
            // this.$router.push("/exam-routine-list");
            self.updateStatus = false;
            self.close();
            //self.loadData = true;
            // self.$emit("update:loadData", true);
            //self.$store.dispatch("fetchRoutineData");
            self.searchExamRoutineList();
          });
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    editRoutine() {
      var self = this;
      this.$store.dispatch("editROUTINEData", this.dataItem).then(() => {
        //this.$router.push("/exam-routine-list");
        self.close();
        //self.$emit("update:loadData", true);
        //self.$store.dispatch("fetchRoutineData");
        self.searchExamRoutineList();
        //
      });
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    showDayName(date) {
      return moment(date, "YYYY-MM-DD").format("dddd");
    },
    editItem(item, index) {
      this.editedMode = true;
      this.selectedIndex = index;
      this.selectedItem = item;
      console.log("item.date on edit click", item.date);
      this.date = item.date; // moment(item.date, "YYYY-MM-DD").format("YYYY-MM-DD");
      //moment(this.date).format("dddd")
      this.selectedPapers = JSON.parse(JSON.stringify(item.papers));
      this.routineInputDialog = true;
    },
    updatPapers() {
      this.updateStatus = true;
      var self = this;
      var index = 0;
      this.getRoutineSchema.routine.forEach(function(item) {
        console.log("sp: sp: item", item);
        console.log(item.date + "-compare -", self.date);
        //if(item.date == self.date )
        if (self.selectedIndex == index) {
          item.date = self.date; //moment(self.date).format("DD-MM-YYYY")
          // moment(this.date).format("dddd")
          console.log("----> --->", item.date);
          item.day = moment(item.date, "YYYY-MM-DD").format("dddd");
          console.log("----> --->", item.day);
          item.papers = self.selectedPapers;
        }
        index++;
      });
      this.selectedItem = this.selectedPapers;
      this.clearData();
    },
    deleteItem(item, index) {
      this.getRoutineSchema.routine.splice(index, 1);
    },
    cehckDuplicate(date) {
      try {
        console.log("date ", this.getRoutineSchema);
        var found = false;
        var self = this;
        this.getRoutineSchema.routine.forEach(function(item) {
          console.log(item.date + ":date:", date);
          if (date == item.date) {
            found = true;
            self.errorStatus = true;
            self.errorMsg = "Date already exist.Please pick a new date.";
          }
        });
        if (found == true) return false;
        else return true;
      } catch (ex) {
        console.log("ex", ex);
      }
    },

    clearData() {
      this.selectedPapers = [];
      this.date = "";
      this.editedMode = false;
      this.errorMsg = "";
      this.errorStatus = false;
      // this.year = "";
      // this.exam = "";
      // this.seal_no = "";
      // this.date1 = "";
      //this.submitStatus = false;
      this.$validator.reset();
    },
    close() {
      this.submitStatus = false;
      this.clearData();
      console.log("status ", this.updateStatus);
      if (this.updateStatus) {
        this.$store.dispatch("fetchRoutineData");
        this.updateStatus = false;
      }
    },
    removeSelectedpapers(item) {
      var position = -1;
      console.log("..", item);
      this.selectedPapers.forEach(function(e, index) {
        // console.log(e.paper_code);
        if (item.code == e.paper_code) position = index;
      });
      if (position > -1) this.selectedPapers.splice(position, 1);
    },
    //off day data fetch
    fetchOffDayData() {
      this.limit = {
        page: 1,
        limit: -1,
      };
      this.$store.dispatch("fetchOffDayData", this.limit).then((data) => {
        this.loading = false;
        this.totalDataItems = data.meta.total;
      });
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
  },
};
</script>

<style>
.examRoutineDraggable {
  margin-top: 24px !important;
  padding-left: 0px !important;
}
.selectedPaperDraggable {
  padding-left: 0px !important;
}
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
.erMidBoxTextCSS {
  font-size: 18px !important;
  font-weight: 400;
}
.erBtn {
  border-radius: 15px;
}
</style>
