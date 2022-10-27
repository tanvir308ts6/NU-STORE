<template>
  <v-container fluid>
    <v-expansion-panel focusable v-if="forceRerenderFlag">
      <v-expansion-panel-content class="mycustomExpansionPanel">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3">
              <v-layout row wrap align-center class="py-3">
                <v-autocomplete
                  disabled
                  name="Exam"
                  class="ma-2"
                  v-model="searchParam.exam_code"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
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
                <!-- {{searchParam.rescrutiner_id}} -->
                <v-autocomplete
                  :disabled="ifRescrutinerUser"
                  class="ma-2"
                  v-model="searchParam.rescrutiner_id"
                  :item-text="(item) => item.name"
                  item-value="id"
                  :items="getRescrutinerList"
                  menu-props="auto"
                  label="Select Re-scrutiner"
                  hide-details
                  prepend-icon="face"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.rescrutiner_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.name }}</v-chip
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
                          v-html="data.item.name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.subject_code = ''"
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

                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="
                    (item) => item.paper_code + ' - ' + item.paper_name
                  "
                  item-value="paper_code"
                  :items="getPaperByRescrutinerList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="remove(data.item)"
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

                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchRescrutinyStd"
                      >Search</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
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
              <v-card-text class="title">Re-scrutiny Examinee List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-btn
            @click="searchRescrutinyStd()"
            class="ml-3"
            fab
            small
            flat
            dark
            color="primary"
          >
            <v-icon dark large>search</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            label="Search"
            class="mt-1"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>

          <v-spacer />
          <!-- <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Create New Missing Script</v-btn>
          </v-card-actions>-->
        </v-layout>
      </v-card>
      <v-data-table
        expand
        item-key="subject_code"
        :loading="loading"
        :headers="mainheaders"
        :items="getRescrutinyStdList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.index + 1 }}</td>
            <td class="text-xs-left">
              <v-chip
                label
                color="indigo lighten-4"
                text-color="black"
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
              >
                {{ props.item.subject_code }} -
                {{ props.item.subject_name }}
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip
                label
                color="indigo lighten-4"
                text-color="black"
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
                >{{ props.item.students.length }}</v-chip
              >
            </td>

            <td class="text-xs-left">
              <v-chip
                label
                color="indigo lighten-4"
                text-color="black"
                class="subheading"
                style=" border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
                >{{ props.item.rescrutiner_name }}</v-chip
              >
            </td>
            <td class="text-xs-right">
              <v-icon color="primary" large>keyboard_arrow_down</v-icon>
            </td>
          </tr>
        </template>
        <!-- v-if="!(props.item.data.length == 0)" -->

        <template v-slot:expand="props">
          <v-card
            :color="` ${props.index % 2 == 0 ? 'cyan' : 'green'} lighten-4`"
            class="pa-2 pt-3 px-3 ma-0"
          >
            <template>
              <v-data-table
                :headers="subheaders"
                :items="props.item.students"
                class="elevation-1"
                hide-actions
              >
                <template v-slot:items="prop">
                  <tr>
                    <td>{{ prop.index + 1 }}</td>
                    <!-- <td class="text-xs-left" v-if="ifadminuser">{{ prop.item.reg_no }}</td> -->
                    <!-- <td class="text-xs-center" v-if="ifadminuser">{{ prop.item.session }}</td> -->
                    <!-- <td class="text-xs-center" v-if="ifadminuser">{{ prop.item.student_name }}</td> -->
                    <!-- <td
                      class="text-xs-center"
                      v-if="ifadminuser"
                    >({{ prop.item.exam_code }}) {{ prop.item.exam_name }}</td>-->
                    <td class="text-xs-left">
                      {{ prop.item.head_examiner_code }} -
                      {{ prop.item.head_examiner_name }}
                    </td>
                    <td class="text-xs-left">
                      {{ prop.item.examiner_code }} -
                      {{ prop.item.examiner_name }}
                    </td>
                    <!-- <td class="justify-center text-xs-center" v-if="ifadminuser">
                      <v-chip
                        color="#FB8C00"
                        text-color="white"
                        v-if="prop.item.payment_status == 0"
                      >Pending</v-chip>
                      <v-chip
                        color="#388E3C"
                        text-color="white"
                        v-if="prop.item.payment_status == 1"
                      >Complete</v-chip>
                    </td>-->
                    <!-- <td class="text-xs-center">{{ prop.item.old_mark }}</td> -->
                    <td class="text-xs-left">
                      {{ prop.item.paper_code }} - {{ prop.item.paper_name }}
                    </td>
                    <td class="text-xs-center">{{ prop.item.script_sl }}</td>
                    <td class="text-xs-center">
                      <v-text-field
                        :disabled="timeOut"
                        label="Enter Mark"
                        v-model="prop.item.new_mark"
                        single-line
                        hide-details
                        solo
                        autofocus
                        @change="checkValidation(prop.item)"
                        :error="getErrorStatus(prop.item)"
                        :prepend-inner-icon="getIconForMarkEntry(prop.item)"
                      ></v-text-field>
                    </td>
                    <!-- <td class="text-xs-center">
                      <v-text-field
                        label="Enter Script Code"
                        v-model="prop.item.script_qr"
                        single-line
                        hide-details
                        solo
                        :disabled="timeOut"
                      ></v-text-field>
                    </td> -->
                    <!-- <td
                      class="text-xs-center"
                    >({{ prop.item.college_code }}){{ prop.item.college_name }}</td>
                    <td
                      class="text-xs-center"
                    >({{ prop.item.subject_code }}){{ prop.item.subject_name }}</td>-->
                    <!-- <td class="text-xs-center">{{ prop.item.datetime }}</td>
                    <td class="text-xs-center">{{ prop.item.payment_amount }}</td>
                    <td class="text-xs-center">{{ prop.item.payment_date }}</td>-->
                    <!-- <td class="justify-center text-xs-center" v-if="ifadminuser">
                      <v-item-group>
                        <v-tooltip left>
                          <template v-slot:activator="{ on }">
                            <v-btn fab small color="primary" v-on="on">
                              <v-icon
                                class="mr-0"
                                color="white"
                                dark
                                @click="mailDialogStatus = !mailDialogStatus"
                              >mail</v-icon>
                            </v-btn>
                          </template>
                          <span>Mail</span>
                        </v-tooltip>
                      </v-item-group>
                    </td>-->
                  </tr>
                </template>
              </v-data-table>
            </template>
            <v-flex xs12 mt-4>
              <v-layout align-center justify-center row fill-height>
                <v-btn
                  large
                  round
                  color="primary"
                  @click="submit(props.item)"
                  :disabled="timeOut"
                >
                  Submit
                  <v-icon right dark>send</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-card>
        </template>
      </v-data-table>
      <composeMail :dialogStatus.sync="mailDialogStatus"></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import common_activities_get from "@/mixin/get_activities_time_publish";
export default {
  components: { composeMail },
  mixins: [commonGet, watchMixin, common_login_getters, common_activities_get],
  data() {
    return {
      ifadminuser: true,
      mailDialogStatus: false,
      loading: false,
      sl_count: 0,
      search: "",
      searchParam: {},
      mainheaders: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        { text: "Subject", value: "paper_code", width: "20%", sortable: false },
        {
          text: "Student Count",
          value: "count",
          width: "5%",
          align: "center",
          sortable: false,
        },
        {
          text: "Rescrutiner",
          value: "rescrutiner_name",
          width: "15%",
          sortable: false,
        },

        {
          text: "Action",
          value: "action",
          width: "2%",
          align: "right",
          sortable: false,
        },
      ],
      mark: "",
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
    };
  },
  watch: {
    pagination() {
      this.searchRescrutinyStd();
    },
  },
  created() {
    this.$store.commit("UNSET_RESCRUTINY_STD_DATA");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;

    //get activities time
    this.paramGetTime.exam_initiate_id = this.getExamInitiateId;
    this.paramGetTime.exam_code = this.getLoggedInExam.code;
    this.paramGetTime.year = this.getLoggedInYear.year;
    this.paramGetTime.activity_tag = "Re-scrutinyMarkSubmission";
    this.paramGetTime.limit = -1;
    this.getActivitiesTime();

    this.searchParam.type = "Recrutiner";
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData", this.searchParam);
    }
    //paper
    if (!this.$store.getters.getPaperByResItems.length) {
      this.$store.dispatch("fetchPaperByRescrutinerData", this.searchParam);
    }
    this.$store.dispatch("searchRescrutiner", this.searchParam);

    if (this.ifRescrutinerUser) {
      console.log("....", this.getAuthUser.id);
      this.searchParam.rescrutiner_id = this.getAuthUser.rescrutiner.id;
      this.ifadminuser = false;
    }
    this.searchParam.payment_status = 1;

    // this.$store.commit("UNSET_FORMNOTIFY");
    //this.$store.dispatch("fetchRescrutinyStdData");
  },
  computed: {
    subheaders() {
      let subheaders = [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "1%",
          sortable: false,
        },
      ];
      // if (this.ifadminuser) {
      //   subheaders.push({
      //     text: "Registration No.",
      //     value: "reg_no",
      //     width: "3%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Session",
      //     value: "session",
      //     width: "1%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Student Name",
      //     value: "student_name",
      //     width: "4%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Exam",
      //     value: "exam_code",
      //     width: "3%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: " Head Examiner",
      //     value: "head_examiner_code",
      //     width: "4%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Examiner",
      //     value: "examiner_code",
      //     width: "4%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Payment Status",
      //     align: "center",
      //     value: "payment_status",
      //     sortable: false,
      //     width: "1%"
      //   });
      //   subheaders.push({
      //     text: "Old Marks",
      //     value: "old_mark",
      //     width: "1%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Script SL.",
      //     value: "script_sl",
      //     width: "3%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Marks Entry",
      //     value: "mark",
      //     width: "3%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Script QR Code",
      //     value: "script_qr",
      //     width: "5%",
      //     align: "center",
      //     sortable: false
      //   });
      //   subheaders.push({
      //     text: "Action",
      //     align: "center",
      //     value: "action",
      //     sortable: false,
      //     width: "1%"
      //   });
      // }
      // {
      //   text: "College",
      //   value: "college_code",
      //   width: "4%",
      //   align: "center",
      //   sortable: false
      // },
      // {
      //   text: "Subject",
      //   value: "subject_code",
      //   width: "3%",
      //   align: "center",
      //   sortable: false
      // },
      // {
      //   text: "Date",
      //   value: "datetime",
      //   align: "center",
      //   sortable: false,
      //   width: "2%"
      // },
      // {
      //   text: "Payment Amount",
      //   align: "center",
      //   value: "payment_amount",
      //   sortable: false,
      //   width: "1%"
      // },
      // {
      //   text: "Payment Date",
      //   align: "center",
      //   value: "payment_date",
      //   sortable: false,
      //   width: "1%"
      // },
      // if (this.ifRescrutinerUser) {
      subheaders.push({
        text: " Head Examiner",
        value: "head_examiner_code",
        width: "4%",
        align: "left",
        sortable: false,
      });
      subheaders.push({
        text: "Examiner",
        value: "examiner_code",
        width: "4%",
        align: "left",
        sortable: false,
      });
      // subheaders.push({
      //   text: "Payment Status",
      //   align: "center",
      //   value: "payment_status",
      //   sortable: false,
      //   width: "1%"
      // });
      // subheaders.push({
      //   text: "Old Marks",
      //   value: "old_mark",
      //   width: "1%",
      //   align: "center",
      //   sortable: false
      // });
      subheaders.push({
        text: "Course",
        value: "paper_code",
        width: "5%",
        align: "left",
        sortable: false,
      });
      subheaders.push({
        text: "Script SL.",
        value: "script_sl",
        width: "3%",
        align: "center",
        sortable: false,
      });
      subheaders.push({
        text: "Marks Entry",
        value: "mark",
        width: "8%",
        align: "center",
        sortable: false,
      });
      // subheaders.push({
      //   text: "Script QR Code",
      //   value: "script_qr",
      //   width: "8%",
      //   align: "center",
      //   sortable: false,
      // });
      // }

      return subheaders;
    },
    getRescrutinyStdList() {
      return this.$store.getters.getRescrutinyStdList;
    },
    getSchema() {
      return this.$store.getters.getRescrutinyStdSchema;
    },
    getRescrutinerList() {
      return this.$store.getters.getRescrutinerDataList;
    },
  },
  methods: {
    checkValidation(item) {
      if (this.isPositiveInteger(item.new_mark)) {
        console.log("ok");
      }
    },
    isPositiveInteger(n) {
      return n >>> 0 === parseFloat(n);
    },
    getErrorStatus(item) {
      console.log("item error", item);
      //let high = 80;
      let flg1 = this.isPositiveInteger(item.new_mark);
      let flg2 = parseInt(item.new_mark) <= parseInt(item.full_marks);
      if (flg1 & flg2) return false;
      else return true;
    },
    getIconForMarkEntry(item) {
      //let high = 80;
      let flg1 = this.isPositiveInteger(item.new_mark);
      let flg2 = parseInt(item.new_mark) <= parseInt(item.full_marks);
      if (flg1 & flg2) return "done";
      else return "close";
    },
    submit(item) {
      console.log("submit item", item.students);
      let that = this;
      let arr = [];
      item.students.forEach((element) => {
        if (element.new_mark > 0) {
          arr.push(element);
        }
      });
      if (item.students.length == arr.length) {
        console.log("submit item", item.students.length, arr.length);
        var finalItem = item.students;
        this.$store
          .dispatch("saveRescrutinyStdData", finalItem)
          .then((data) => {
            console.log("then data", data);
            that.searchRescrutinyStd();
          });
        console.log("try", that.getRescrutinyStdList);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "Please Input All Students Number ",
          color: "red",
        });
      }
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },

    searchRescrutinyStd() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchRescrutinyStdData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>

<style scoped></style>
