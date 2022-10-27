<template>
  <v-container fluid style=" padding-right: 0px; padding-left: 0px;">
    <!-- {{getQuesStmList[0]}}{{dataTableForceRender}} -->
    <!-- {{removed_paper_code}} -->
    <v-dialog v-model="subjectWisePacket" width="800" persistent>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <div class="title white--text">Select Packet Size by subject</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn fab small dark color="white black--text" @click="subjectWisePacket = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="pa-3">
        <!-- {{packerSizeBySub}} -->
        <v-layout row wrap class="px-3 mx-3" v-for="(item, i) in packerSizeBySub" :key="i">
          <v-flex xs12>
            <v-autocomplete
              outline
              class="ma-2"
              v-model="item.subject_code"
              :items="getSubjectList"
              :item-text="(item) =>  item.code + ' - ' + item.title"
              item-value="code"
              label="Select Subject"
              hide-details
              multiple
              prepend-icon="library_books"
            >
              <template v-slot:selection="data">
                <!-- {{ "(" + data.item.code + ") " + data.item.title }} -->
                <v-chip
                  close
                  @input="removeArrayItem(item.subject_code, data.item.code)"
                  :selected="data.selected"
                  class="chip--select-multi"
                >{{ data.item.code + " - " + data.item.title }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              outline
              class="ma-2"
              v-model="item.paper_code"
              :items="getExamWisePaperItems"
              :item-text="(item) =>  item.code + ' - ' + item.title"
              item-value="code"
              label="Select Course"
              persistent-hint
              prepend-icon="library_books"
              multiple
              hide-details
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="removeArrayItem(removed_paper_code, data.item.code)"
                  :selected="data.selected"
                  class="chip--select-multi"
                >{{ data.item.code + " - " + data.item.title }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              class="ma-2"
              v-model="item.packet_size"
              label="Packet Size"
              prepend-icon="edit"
              outline
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card>
      <v-toolbar>
        <v-layout align-center justify-center row fill-height>
          <v-btn
            class="mb-2"
            round
            large
            dark
            color="white black--text"
            @click="executePacketSizeUpdateBySub()"
          >
            <v-icon>thumb_up</v-icon>
            <span class="mx-2 subheading">Done</span>
          </v-btn>
        </v-layout>
      </v-toolbar>
    </v-dialog>

    <v-dialog v-model="subjectWiseExtra" width="500" persistent>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <div class="title white--text">Select Extra Course Multiplier By Subject</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn fab small dark color="white black--text" @click="subjectWiseExtra = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="pa-3">
        <!-- {{extraPaperBySub}} -->
        <v-layout row wrap class="px-3 mx-3" v-for="(item, i) in extraPaperBySub" :key="i">
          <v-flex xs12>
            <v-autocomplete
              outline
              class="ma-2"
              v-model="item.subject_code"
              :items="getSubjectList"
              :item-text="(item) =>  item.code + ' - ' + item.title"
              item-value="code"
              label="Select Subject"
              multiple
              hide-details
              prepend-icon="library_books"
            >
              <template v-slot:selection="data">
                <!-- {{ "(" + data.item.code + ") " + data.item.title }} -->
                <v-chip
                  close
                  :selected="data.selected"
                  @input="removeArrayItem(item.subject_code, data.item.code)"
                  class="chip--select-multi"
                >{{ data.item.code + " - " + data.item.title }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              class="ma-2"
              v-model="item.extraPaper"
              label="Extra Course in Multiplier"
              prepend-icon="edit"
              outline
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card>
      <v-toolbar>
        <v-layout align-center justify-center row fill-height>
          <v-btn
            class="mb-2"
            round
            large
            dark
            color="white black--text"
            @click="executeExtraPaperUpdateBySub()"
          >
            <v-icon>thumb_up</v-icon>
            <span class="mx-2 subheading">Done</span>
          </v-btn>
        </v-layout>
      </v-toolbar>
    </v-dialog>

    <v-dialog v-model="removePaperDialog" width="800" persistent>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <div class="title white--text">Remove Course from Question Order</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn fab small dark color="white black--text" @click="removePaperDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="pa-3">
        <!-- {{extraPaperBySub}} -->
        <!-- <v-layout row wrap class="px-3 mx-3" v-for="(item,i) in extraPaperBySub" :key="i"> -->
        <v-flex xs12>
          <v-autocomplete
            outline
            class="ma-2"
            v-model="removed_paper_code"
            :items="getExamWisePaperItems"
            :item-text="(item) =>  item.code + ' - ' + item.title"
            item-value="code"
            label="Select Course"
            persistent-hint
            prepend-icon="library_books"
            multiple
            hide-details
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="removeArrayItem(removed_paper_code, data.item.code)"
                :selected="data.selected"
                class="chip--select-multi"
              >{{ data.item.code + " - " + data.item.title }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <!-- </v-layout> -->
      </v-card>
      <v-toolbar>
        <v-layout align-center justify-center row fill-height>
          <v-btn
            class="mb-2"
            round
            large
            dark
            color="white black--text"
            @click="removePaperFromQuestionOrder()"
          >
            <v-icon>thumb_up</v-icon>
            <span class="mx-2 subheading">Done</span>
          </v-btn>
        </v-layout>
      </v-toolbar>
    </v-dialog>

    <v-expansion-panel v-if="false" class="mb-3" inset v-model="open">
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
                    (item) => item.code + ' - ' + item.title
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
                        <span class="subheading">{{ data.item.session }}</span>
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.session"></v-list-tile-title>
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

    <v-container fluid style="padding-top: 10px; padding-bottom: 5px;">
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
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">{{ customTitle }}</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-0" vertical></v-divider>
          <v-spacer />

          <v-btn
            v-if="finalStatus"
            color="primary"
            @click="changeSrcStatus(false)"
            class="erBtn"
          >from probable data</v-btn>
          <v-btn
            v-else
            color="primary"
            @click="changeSrcStatus(true)"
            class="erBtn"
          >from form-fillup data</v-btn>
          <v-btn outline color="primary" @click.stop.prevent="downloadQuesStm()" class="erBtn">
            <v-icon left>cloud_download</v-icon>Download Statement
          </v-btn>
        </v-layout>
      </v-card>
    </v-container>

    <!-- <span class="mx-2 subheading">Close</span> -->
    <!-- <v-flex xs1>
            <v-btn flat color="red" fab @click="packerSizeBySub.splice(i, 1);">
              <v-icon large>delete</v-icon>
            </v-btn>
    </v-flex>-->
    <!-- <v-layout align-center justify-end row fill-height>
          <v-btn class="mr-3" small flat color="primary" fab @click="packerSizeBySub.push({})">
            <v-icon large>add</v-icon>
          </v-btn>
    </v-layout>-->
    <!-- <v-btn color="pink" dark small absolute bottom right fab>
          <v-icon>add</v-icon>
    </v-btn>-->
    <v-layout row wrap class="mx-4 mt-0">
      <v-flex xs5>
        <v-hover>
          <v-card
            color="#fafafa"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 0 : 3}`"
            height="100"
            class="pa-0 ma-2"
            style=" border-radius: 5px;"
          >
            <v-layout align-center justify-center row fill-height class="mx-2">
              <v-flex class="my-2">
                <v-layout column wrap class="mx-2 mt-0">
                  <v-flex xs12 class="mx-4 mt-1">
                    <v-layout align-center justify-center row fill-height>
                      <v-text-field
                        class="ma-0"
                        v-model="packetSize"
                        label="Default Packet Size"
                        prepend-inner-icon="edit"
                        outline
                        hide-details
                        v-on:keyup.enter="updatePacketSize"
                      ></v-text-field>
                      <v-btn style="margin-left: -7.5em " @click="updatePacketSize">set data</v-btn>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-alert
                      v-model="packetSizeAlert"
                      type="error"
                      transition="scale-transition"
                      dismissible
                    >Packet Size Can't be less then 1.</v-alert>
                  </v-flex>
                  <v-flex xs12 class="mx-1 mr-2">
                    <v-layout align-center justify-center row fill-height>
                      <v-btn
                        small
                        class="px-3 ml-0"
                        style=" border-radius: 5px;"
                        dark
                        color="primary"
                        @click="openSubjectWisePacketForm()"
                      >Add packet Size by subject-Course</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-hover>
      </v-flex>
      <!-- <v-flex xs1></v-flex> -->
      <v-flex xs5>
        <v-hover>
          <v-card
            color="#fafafa"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 0 : 3}`"
            height="100"
            class="pa-2 ma-2"
            style=" border-radius: 5px;"
          >
            <v-layout align-center justify-center row fill-height class="mx-2">
              <v-flex class="my-2">
                <v-layout column wrap class="mx-2 mt-0">
                  <v-flex xs12 class="mx-4 mt-1">
                    <v-layout align-center justify-center row fill-height>
                      <v-text-field
                        class="mt-0"
                        v-model="extraPaper"
                        label="Default Extra Course in %"
                        prepend-inner-icon="edit"
                        outline
                        hide-details
                        v-on:keyup.enter="updateExtraPaper"
                      ></v-text-field>
                      <v-btn style="margin-left: -7.5em " @click="updateExtraPaper">set data</v-btn>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="mx-1 ml-0">
                    <v-layout align-center justify-center row fill-height>
                      <v-btn
                        small
                        class="px-3 ml-0"
                        style=" border-radius: 5px;"
                        dark
                        color="primary"
                        @click="openSubjectWiseExtraForm()"
                      >Add Extra Course Multiplier by subject</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2>
        <v-layout column>
          <v-flex>
            <v-hover>
              <v-card
                color="red white--text"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 0 : 6}`"
                class="pa-2 ma-2"
                height="4.5em"
                style="cursor: pointer;  border-radius: 5px;"
                @click="executeRemovePaperFromQuestionOrder()"
              >
                <v-layout align-center justify-center row fill-height class="mx-2">
                  <v-icon class="mr-1">delete</v-icon>
                  <span class="subheading text-black pa-1 white--text">Remove Course</span>
                </v-layout>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex>
            <v-card flat class="pa-0 mx-2 mt-0" style="cursor: pointer;  border-radius: 5px;">
              <v-layout align-center justify-center row fill-height class="mx-0">
                <v-chip small color="red lighten-3"></v-chip>
                <span class="subheading text-black pa-0 black--text">= Not Printable</span>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- {{getQuesStmList[0]}} -->
    <v-container fluid style="padding-top: 5px !important;" v-if="dataTableForceRender">
      <v-data-table
        hide-actions
        :loading="loading"
        :headers="quesStatementHeaders"
        :items="getQuesStmList"
        class="elevation-1 inputTable"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <!-- v-if="getStyle(props.item.remove_status)"  -->
        <template v-slot:items="props">
          <tr :style="getStyle(props.item.remove_status)">
            <!-- <td>{{ props.item.remove_status }}</td> -->
            <td class="text-xs-left" style=" padding-left: 20px;">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">
              <v-chip color="transparent" style="margin-left:-.7em" class="subheading">
                {{ props.item.question_set }}
                <v-btn
                  absolute
                  fab
                  small
                  @click="props.item.remove_status = false"
                  v-if="props.item.remove_status"
                  class="elevation-0"
                  style="margin-left:-4.5em"
                >
                  <v-icon large>add</v-icon>
                </v-btn>
              </v-chip>
            </td>
            <!-- <v-text-field  name="sealNo" single-line v-model="props.item.question_set"></v-text-field> -->
            <td class="text-xs-left">{{ props.item.subject_code }} - {{ props.item.subject_name }}</td>
            <td class="text-xs-left">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
            <td class="text-xs-center">{{ props.item.student_count }}</td>
            <!-- <td class="text-xs-center">{{ props.item.main_paper }}</td> -->
            <!-- <td class="text-xs-center">{{ props.item.extra_paper }}</td> -->
            <!-- <td class="text-xs-center">{{ props.item.total_paper }}</td> -->
            <td class="text-xs-center">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <v-chip label outline text-color="black">
                      <span :style="getStyle(props.item.remove_status)">
                        {{
                        props.item.total_paper
                        }}
                      </span>
                    </v-chip>
                  </span>
                </template>
                <div class>Student Count x Multiplier = Total Question Count</div>

                <div class="title">
                  {{ props.item.student_count }} x
                  {{ props.item.extra_multiplier }}% =
                  {{ props.item.total_paper }}
                </div>
              </v-tooltip>
            </td>
            <!-- this one  -->
            <td class="text-xs-center">
              <!-- {{ props.item.printable_paper }} -->
              <v-layout align-center justify-center row fill-height>
                <v-flex>
                  <v-icon color="pink lighten-1" @click="removePQ(props.item)">remove_circle</v-icon>
                </v-flex>
                <v-flex>{{ props.item.printable_paper }}</v-flex>
                <v-flex>
                  <v-icon color="green lighten-1" @click="addPQ(props.item)">add_circle</v-icon>
                </v-flex>
              </v-layout>
              <!-- <v-btn class="custFavSm" small fab>
                <v-icon large>add</v-icon>
              </v-btn>
              <v-text-field
                :style="getStyle(props.item.remove_status)"
                name="sealNo"
                single-line
                v-model="props.item.printable_paper"
              ></v-text-field>-->
            </td>
            <td
              class="text-xs-center"
              :class="[changeColor ? 'getWhite' : 'getHighlight']"
            >{{ props.item.packet_size }}</td>
            <td class="text-xs-center">{{ props.item.total_packet }}</td>
          </tr>
          <!-- <td class="text-xs">{{ props.item.exam_code }}</td>
          <td class="text-xs">{{ props.item.year }}</td>-->
        </template>
      </v-data-table>
    </v-container>
    <v-layout justify-center row fill-height align-center>
      <v-btn color="primary" large @click.stop.prevent="submitQuesStm()" class="erBtn">Submit</v-btn>
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
      dataTableForceRender: true,
      removePaperDialog: false,
      subjectWiseExtra: false,
      subjectWisePacket: false,
      forceRerenderFlag: true,
      packetSize: 25,
      extraPaper: 5,
      packerSizeBySub: [{}],
      extraPaperBySub: [{}],
      removed_paper_code: [],
      sl_count: 1,
      loading: false,
      packetSizeAlert: false,
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
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      getStatus: [
        { name: "All", value: 0 },
        { name: "Only Teacher Approved", value: 1 },
        { name: "Only Paid", value: 2 },
      ],
      searchParam: {
        session: ["2015-16"],
      },
      t: null,
      v: 0,
      finalStatus: false,
      customTitle: "Question Order - Probable Data",
    };
  },

  created() {
    // this.$store.commit("UNSET_FORM_FILLUP_DATA");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getExamWisePaperItems.length) {
      this.$store.dispatch("fetchExamWiseData", this.searchParam.exam_code);
    }

    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }

    // if (!this.$store.getters.getSessionItems.length) {
    this.$store.dispatch("fetchAllSessionData");

    // }
  },

  // mounted() {
  // },
  computed: {
    getExamWisePaperItems(){
      return this.$store.getters.getExamWisePaperItems;
    },
    //all data
    getQuesStmList() {
      return this.$store.getters.getQuesStmItem;
    },
    // Exama
    getExamList() {
      return this.$store.getters.getExamItem;
    },

    quesStatementHeaders() {
      return [
        // { text: "Status", value: "remove_status", width: "1%" },
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Question Set",
          value: "question_set",
          width: "1%",
          sortable: false,
        },
        {
          text: "Subject Name",
          value: "subject_name",
          width: "1%",
          sortable: false,
        },
        {
          text: "Course Name",
          value: "paper_name",
          width: "30%",
          sortable: false,
        },
        {
          text: "No. of Candidate",
          value: "student_count",
          width: "1%",
          sortable: false,
        },
        // { text: "Main Paper", value: "main_paper", width: "6%" },
        // { text: "Extra Paper", value: "extra_paper", width: "6%" },
        {
          text: "No. of Questions",
          value: "total_paper",
          width: "1%",
          sortable: false,
        },
        {
          text: "Printable Questions",
          value: "printable_paper",
          width: "1%",
          sortable: false,
        },
        {
          text: "Packet Size",
          value: "packet_size",
          width: "1%",
          sortable: false,
        },
        {
          text: "Total Packet",
          value: "total_packet",
          width: "1%",
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
    changeSrcStatus(flg) {
      this.finalStatus = flg;
      this.customTitle = flg
        ? "Question Order - Form-Fillup"
        : "Question Order - Probable Data";
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchQuesStm() {
      this.loading = true;
      this.setLimit();
      this.searchParam.final = this.finalStatus;
      this.$store.dispatch("searchQuesStm", this.searchParam).then((data) => {
        this.loading = false;
        this.sl_count = data.meta.from;
        this.pagination.totalItems = data.meta.total;
        this.updatePacketSize(false);
        this.updateExtraPaper();
      });
    },
    getParam() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.getLoggedInExam.code;
      param.year = this.getLoggedInYear.year;
      param.final = this.finalStatus;
      return param;
    },
    downloadQuesStm() {
      let param = this.getParam();
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to Download?")
        .then((confirm) => {
          if (confirm) {
            this.$store.dispatch("quesStatementPdfDownload", param).then(() => {
              console.log("in return then downloadScriptStm");
              // self.searchScriptStm();
            });
          }
        });
    },

    submitQuesStm() {
      // console.log(JSON.stringify(this.getQuesStmList));
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

    openSubjectWisePacketForm() {
      this.subjectWisePacket = true;
      this.packerSizeBySub = [{}];
    },
    openSubjectWiseExtraForm() {
      this.subjectWiseExtra = true;
      this.extraPaperBySub = [{}];
    },
    // extra
    updatePacketSize(val) {
      console.log("val",this.getQuesStmList[0])
      let ps = this.packetSize;
      if (!ps || ps.toString() == "0") {
        this.packetSize = 1;
        ps = 1;
        this.packetSizeAlert = true;
      }
      // this.startEffect(val);
      this.getQuesStmList.forEach(function (obj) {
       // if (parseInt(obj.packet_size) == 0) {
          obj.main_paper = obj.student_count;
          obj.packet_size = ps;
        //}
      });
       console.log("val...",this.getQuesStmList[0])
      this.updateTotalPacket();
    },

    updateExtraPaper() {
      let ep = parseFloat(this.extraPaper);

      this.getQuesStmList.forEach(function (obj) {
        // obj.extra_paper = Math.ceil((ep / 100) * parseInt(obj.student_count));
      //  if (parseInt(obj.total_paper) == 0) {
          obj.extra_multiplier = ep;
          obj.total_paper =
            Math.ceil((ep / 100) * parseInt(obj.student_count)) +
            parseInt(obj.student_count);
       // }

        // obj.total_paper = parseInt(obj.main_paper) + parseInt(obj.extra_paper);
      });          
      this.updateTotalPacket();
    },

    updateTotalPacket() {
      console.log("here", this.packetSize)
      let ps = this.packetSize;
      this.getQuesStmList.forEach(function (obj) {
       // if (parseInt(obj.total_paper) == 0) {
          obj.total_packet = Math.ceil(
            parseInt(obj.total_paper) / parseInt(ps)
          );
          obj.printable_paper = obj.total_packet * obj.packet_size;
       // }
      });
    },

    startEffect(val) {
      // this.v = 0;
      if (val) {
        this.t = setInterval(
          function () {
            this.changeColor = !this.changeColor;
            this.v = this.v + 1;
          }.bind(this),
          500
        );
      }
    },
    stopSetInterVal() {
      clearInterval(this.t);
    },
    remove(item, prop) {
      const index = this.searchParam[prop].indexOf(item[prop]);
      if (index >= 0) this.searchParam.session.splice(index, 1);
    },
    removeArrayItem(arr, item) {
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },
    executePacketSizeUpdateBySub() {
      // console.log(" this.getQuesStmList = ", this.getQuesStmList);
      let ps = this.packetSize;
      let self = this;
      this.getQuesStmList.forEach(function (obj) {
        self.packerSizeBySub.forEach((ele) => {
          if (ele.subject_code) {
            ele.subject_code.forEach((subCode) => {
              if (subCode == obj.subject_code) {
                // console.log(obj.subject_code);
                obj.packet_size = ele.packet_size;
                obj.total_packet = Math.ceil(
                  parseInt(obj.total_paper) / parseInt(obj.packet_size)
                );

                obj.printable_paper = obj.total_packet * obj.packet_size;
                // console.log("obj.total_paper =", obj.total_paper);
                // console.log("obj.total_paper =", obj.total_paper);
              }
            });
          }
          if (ele.paper_code) {
            ele.paper_code.forEach((papCode) => {
              if (papCode == obj.paper_code) {
                obj.packet_size = ele.packet_size;
                obj.total_packet = Math.ceil(
                  parseInt(obj.total_paper) / parseInt(obj.packet_size)
                );
                obj.printable_paper = obj.total_packet * obj.packet_size;
              }
            });
          }
        });
        // console.log(obj.subject_code);
        // obj.packet_size = ps;
      });

      this.subjectWisePacket = false;
      // console.log(" this.getQuesStmList = ", this.getQuesStmList);
    },
    executeExtraPaperUpdateBySub() {
      // console.log(" this.getQuesStmList = ", this.getQuesStmList);
      let self = this;
      this.getQuesStmList.forEach(function (obj) {
        self.extraPaperBySub.forEach((ele) => {
          ele.subject_code.forEach((subCode) => {
            if (subCode == obj.subject_code) {
              console.log(obj.subject_code);
              obj.extra_multiplier = parseFloat(ele.extraPaper);
              obj.total_paper = Math.ceil(
                (obj.extra_multiplier * parseInt(obj.student_count)) / 100
              );
              obj.total_packet = Math.ceil(
                parseInt(obj.total_paper) / parseInt(obj.packet_size)
              );

              obj.printable_paper = obj.total_packet * obj.packet_size;
            }
          });
        });
        // console.log(obj.subject_code);
        // obj.packet_size = ps;
      });

      this.subjectWiseExtra = false;
      // console.log(" this.getQuesStmList = ", this.getQuesStmList);
    },

    executeRemovePaperFromQuestionOrder() {
      this.removePaperDialog = true;
    },
    removePaperFromQuestionOrder() {
      let self = this;
      this.getQuesStmList.forEach(function (obj) {
        self.removed_paper_code.forEach((r_paper_code) => {
          if (r_paper_code == obj.paper_code) {
            console.log(r_paper_code);
            console.log(obj.paper_code);
            obj.remove_status = true;
          } else {
            // obj.remove_status = false;
            // if (obj.remove_status) obj.remove_status = false;
          }
        });
      });

      this.removePaperDialog = false;
    },
    getStyle(status) {
      // return status ? true : false;
      // background-color: red;
      if (status == undefined) {
        return "background-color: white;";
      } else {
        if (status) {
          return "background-color: #EF9A9A; ";
        }
        // if (status) {
        //   return "background-color: red; ";
        // }
        // if (!status) {
        //   return "background-color: white; ";
        // }
      }
    },
    addPQ(item) {
      item.printable_paper =
        parseInt(item.printable_paper) + parseInt(item.packet_size);
      item.total_packet =
        parseInt(item.printable_paper) / parseInt(item.packet_size);
      // item.remove_status = true;
    },
    removePQ(item) {
      let temp = parseInt(item.printable_paper) - parseInt(item.packet_size);
      if (temp <= 0) {
        item.printable_paper = 0;
        // item.remove_status = false;
      } else {
        item.printable_paper =
          parseInt(item.printable_paper) - parseInt(item.packet_size);
        // item.remove_status = true;
      }
      item.total_packet =
        parseInt(item.printable_paper) / parseInt(item.packet_size);
    },
  },
  watch: {
    pagination() {
      this.searchQuesStm();
    },
    v(val) {
      if (val % 2 == 0) {
        clearInterval(this.t);
      }
      console.log(val);
    },
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
      this.searchQuesStm();
    },
    finalStatus() {
      this.searchQuesStm();
    },
  },
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
