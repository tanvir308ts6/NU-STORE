<template>
  <v-container fluid>
    <v-card flat
      ><v-flex>
        <v-btn style="margin-right: 2em" absolute right color="primary" @click="generateReport()" :disabled="!getRoutineSchema.routine.length" class="mb-4">
          <v-icon dark left>arrow_downward</v-icon>Export routine
        </v-btn>
      </v-flex></v-card
    >
    <br />
    <!-- {{routine}} -->
    <v-layout row class="ma-0 px-3 pb-5 mt-4">
      <v-flex xs12 sm12>
        <v-card>
          <v-form v-model="valid">
            <v-container fluid>
              <v-card flat>
                <v-layout row wrap>
                  <v-autocomplete
                    v-model="getRoutineSchema.exam_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getExamList"
                    menu-props="auto"
                    label="Select Exam"
                    hide-details
                    v-validate="'required'"
                    :error-messages="errors.collect('exam_code')"
                    data-vv-name="exam_code"
                    name="exam_code"
                    required
                    prepend-icon="subject"
                    @change="getExamCode($event)"
                    no-data-text="Please wait, We are fetching the Exam data"
                    :cache-items="true"
                    :loading="ifFetchingExamListDone"
                    :disabled="publishState == 1 || timeOut"
                  >
                    <template v-slot:selection="data">
                      <v-chip close @input="getRoutineSchema.exam_code = ''" :selected="data.selected" class="chip--select-multi">{{
                        data.item.code + " - " + data.item.title
                      }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-autocomplete
                    name="year"
                    class="ma-2"
                    v-model="getRoutineSchema.year"
                    item-text="year"
                    item-value="year"
                    :items="getYearList"
                    menu-props="auto"
                    label="Select Year"
                    hide-details
                    v-validate="'required'"
                    :error-messages="errors.collect('year')"
                    data-vv-name="year"
                    required
                    prepend-icon="calendar_today"
                    :disabled="publishState == 1 || timeOut"
                  >
                    <template v-slot:selection="data">
                      <v-chip :selected="data.selected" class="chip--select-multi">{{ data.item.year }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item.year"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.year"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>

                  <v-flex xs12 md4>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                      :disabled="publishState == 1 || timeOut"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="getRoutineSchema.date" label="Date" prepend-icon="event" readonly v-on="on" :disabled="publishState == 1 || timeOut"></v-text-field>
                      </template>
                      <v-date-picker v-model="getRoutineSchema.date" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-menu
                      v-model="manu_end"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                      :disabled="publishState == 1 || timeOut"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="getRoutineSchema.end_date"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :disabled="publishState == 1 || timeOut"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="getRoutineSchema.end_date" @input="manu_end = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-text-field
                      name="sealNo"
                      label="Seal No"
                      v-model="getRoutineSchema.seal_no"
                      v-validate="'required'"
                      :error-messages="errors.collect('seal_no')"
                      data-vv-name="seal_no"
                      required
                      prepend-icon="edit"
                      :disabled="publishState == 1 || timeOut"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      name="duration"
                      label="Duration of Exam"
                      v-model="getRoutineSchema.duration"
                      v-validate="'required'"
                      :error-messages="errors.collect('duration')"
                      data-vv-name="duration"
                      required
                      prepend-icon="timelapse"
                      :disabled="publishState == 1 || timeOut"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-menu
                      ref="tmenu"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="getRoutineSchema.start_time"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      :disabled="publishState == 1 || timeOut"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          name="start_time"
                          label="Start Time of Exam"
                          v-model="getRoutineSchema.start_time"
                          v-validate="'required'"
                          :error-messages="errors.collect('start_time')"
                          data-vv-name="start_time"
                          required
                          prepend-icon="access_time"
                          v-on="on"
                          :disabled="publishState == 1 || timeOut"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="menu3" v-model="getRoutineSchema.start_time" full-width @click:minute="$refs.tmenu.save(getRoutineSchema.start_time)"></v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-card>
              <!-- <v-divider class="ma-4"></v-divider> -->
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- schedule change -->
    <v-dialog v-model="scheduleChangeDialog">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Schedule Change</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" @click="closeSchedule()">Close</v-btn>
      </v-toolbar>
      <v-form data-vv-scope="form1">
        <v-layout column>
          <v-flex xs12 sm12>
            <v-card class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 md3 v-if="!confirmStatus">
                  {{ selectedDate }}
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
                      <v-chip close @input="selectedDate = ''" :selected="data.selected" class="chip--select-multi">
                        {{ data.item }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 md3 v-if="confirmStatus">
                  <v-autocomplete
                    class="ma-2"
                    v-model="selectedDate"
                    :items="selectedDate"
                    :item-text="(item) => item"
                    item-value="code"
                    label="Select Exam Date"
                    hide-details
                    prepend-icon="calendar_today"
                    @change="getExamDate($event)"
                  >
                    <template v-slot:selection="data">
                      <v-chip close @input="selectedDate = ''" :selected="data.selected" class="chip--select-multi">
                        {{ data.item }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 md9>
                  <v-autocomplete
                    v-model="datewisePaperList"
                    :items="getPaperList"
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
                      <v-chip close @input="removeDatewisePaperList(data.item)" :selected="data.selected" class="chip--select-multi">
                        {{ data.item.subject_name + "( " + data.item.paper_code + " - " + data.item.paper_name + " )" }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.subject_name + '( ' + data.item.paper_code + ' - ' + data.item.paper_name + ' )'"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 md6>
                  <v-menu v-model="datemenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="newDate" label="Changed Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="newDate" @input="datemenu = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                  <v-textarea
                    v-model="change_reason"
                    auto-grow
                    label="Schedule Change Notice"
                    name="change_reason"
                    rows="1"
                    prepend-icon="edit"
                    v-validate="'required'"
                    :error-messages="errors.collect('form1.change_reason')"
                    data-vv-name="change_reason"
                    required
                  ></v-textarea>
                </v-flex>
                <!-- <v-flex xs12 md6>
                  <v-textarea
                    v-model="change_notice"
                    auto-grow
                    label="Schedule Change Notice"
                    name="change_notice"
                    rows="1"
                    prepend-icon="edit"
                    v-validate="'required'"
                    :error-messages="errors.collect('form1.change_notice')"
                    data-vv-name="change_notice"
                    required
                  ></v-textarea>
                </v-flex> -->
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-alert :value="true" color="error" icon="warning" outline v-if="errorChangeStatus">{{ errorChangeMsg }}</v-alert>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="validationChangeForm()" large v-if="!confirmStatus"> <v-icon left large>shuffle</v-icon>Change </v-btn>
                <v-btn v-if="confirmStatus" color="success" @click="validationChangeForm()" large> <v-icon left large>lock</v-icon>Confirm </v-btn>
                <v-btn large color="red" @click="clearSchedule()" dark> <v-icon left>close</v-icon>Cancel </v-btn>
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
                        >All the exams on this day - {{ viewExamsDate }} ({{ getdateWiseRoutineData.length }}
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
                        <v-flex xs4 v-for="(item, i) in getdateWiseRoutineData" :key="i">
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
                      <snap class="display-1">No Exam on this day - date: {{ viewExamsDate }}</snap>
                    </v-alert>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card>
          </v-flex>
        </v-layout>
      </v-form>
    </v-dialog>
    <!-- routine add/edit -->
    <v-dialog v-model="routineInputDialog">
      <v-toolbar dark color="primary" class="mt-0">
        <v-toolbar-title>Add / Edit</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="light-blue lighten-1" @click="routineInputDialog = false">Close</v-btn>
      </v-toolbar>
      <v-layout column>
        <v-flex xs12 sm12>
          <v-card class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <!-- {{date}} -->
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" label="Exam date" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="onDatePickAtModal(date)"></v-date-picker>
                </v-menu>
                <!-- <v-btn
                  v-if="date"
                  small
                  @click="fetchRoutineDataDateWise(date)"
                >
                  view Exams</v-btn
                > -->
              </v-flex>
              <!-- {{selectedPapers}} -->
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
                  <v-chip close @input="removeSelectedpapers(data.item)" :selected="data.selected" class="chip--select-multi">
                    {{ data.item.paper_code + " - " + data.item.paper_name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.paper_code + ' - ' + data.item.paper_name"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn :disabled="publishState == 1 || timeOut" color="success" @click="addPapers()" v-if="!editedMode" large> <v-icon left large>add</v-icon>add </v-btn>
              <v-btn large color="success" @click="updatPapers()" v-if="editedMode"> <v-icon left>edit</v-icon>Edit </v-btn>
              <v-btn large color="red" @click="clearData()" dark> <v-icon left>close</v-icon>Cancel </v-btn>
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
                      >All the exams on this day - {{ viewExamsDate }} ({{ getdateWiseRoutineData.length }}
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
                      <v-flex xs4 v-for="(item, i) in getdateWiseRoutineData" :key="i">
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
                    <snap class="display-1">No Exam on this day - date: {{ viewExamsDate }}</snap>
                  </v-alert>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>

    <v-alert :value="true" color="error" icon="warning" outline v-if="errorStatus">{{ errorMsg }}</v-alert>
    <routinePdf ref="html2Pdf" :getCenterAllocationSchema="getRoutineSchema.routine" :getRoutineSchema="getRoutineSchema"></routinePdf>

    <v-flex v-if="editDataMode">
      <v-card class="ma-2 " flat v-for="item in getRoutineChangeNoticeList" :key="item.notice">
        <v-card-text :class="[changeColor ? 'getWhite' : 'getHighlight']"> "{{ item.notice }}" </v-card-text>
      </v-card>
    </v-flex>

    <v-toolbar dense dark color="light-blue lighten-1" class="mt-0">
      <v-toolbar-title>Exam Routine</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="editDataMode && ifControllerUser" color="red" @click="schedulechangeDialogOpen($event)" :disabled="publishState == 1 || timeOut">Change Schedule</v-btn>
      <v-btn color="primary" @click="routineInputDialogOpen" :disabled="publishState == 1 || timeOut">ADD NEW</v-btn>
    </v-toolbar>

    <v-layout align-center justify-center row fill-height class="col-md-7 erLayoutCSS" v-for="(item, index) in getRoutineSchema.routine" :key="item.date">
      <v-flex>
        <!-- {{ getClass(item) }} -->
        <v-layout :class="getClass(item)" align-center justify-center row fill-height>
          <v-divider></v-divider>
          <v-flex xs2 class="text-xs-center" v-if="item.date != 'postponed'">
            <div class="title">{{ getFormatedDate(item.date) }}</div>
            <div class="subheading">{{ showDayName(item.date) }}</div>
            <div class="subheading">{{ getRoutineSchema.start_time }} am</div>
          </v-flex>
          <v-flex xs2 class="text-xs-center" v-else>
            <div class="title red--text">PostPoned</div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-if="mastersFinal">
            <div class="ma-2" v-for="(elm, i) in getFormatedPaperCodeBySub(item.papers)" :key="i">
              {{ showData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="honoursExam">
            <div class="ma-2" v-for="(elm, i) in getFormatedPaperCodeBySub(item.papers)" :key="i">
              {{ showHonoursSubData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="bachelorProfessional">
            <div class="ma-2" v-for="(elm, j) in item.papers" :key="j">
              {{ showBachelorProfData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <!-- <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="mastersProfessional">
            <div class="ma-2" v-for="(elm, j) in getFormatedPaperCodeBySub(item.papers)" :key="j">
              {{ showData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex> -->
          <!-- <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else-if="oneYearProfessionalDegree">
            <div class="ma-2" v-for="(elm, j) in item.papers" :key="j">
              {{ showOneProData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex> -->
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-else>
            <div class="ma-2" v-for="(elm, j) in item.papers" :key="j">
              {{ showOneProData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>
          <v-flex xs8 style="font-size: 16px !important" class="erMidBoxCSS" v-if="honoursExam">
            <div class="ma-2" v-for="(elm, j) in getFormatedPaperCodeBySub(item.papers)" :key="j">
              {{ showHonoursPapData(elm) }}
              <v-divider style="background: black" />
            </div>
          </v-flex>

          <v-flex xs2 row class="text-xs-center">
            <v-layout align-center justify-center row fill-height>
              <v-btn v-if="item.date == 'postponed' && ifControllerUser" fab dark color="orange darken-3" @click="schedulechangeItemOpen(item, index)" small>
                <v-icon dark>announcement</v-icon>
              </v-btn>
              <v-btn
                :disabled="publishState == 1 || item.date == 'postponed' || timeOut"
                fab
                :dark="publishState == 0"
                :color="publishState == 1 ? 'red' : 'green'"
                @click="editItem(item, index)"
                small
              >
                <v-icon dark>edit</v-icon>
              </v-btn>
              <!-- {{publishState}} -->
              <v-btn
                fab
                small
                :dark="publishState == 0"
                :disabled="publishState == 1 || item.date == 'postponed' || timeOut"
                :color="publishState == 1 ? 'green' : 'red'"
                @click="deleteItem(item, index)"
              >
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-layout>
            <!-- </v-card> -->
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- </v-layout> -->
    </v-layout>

    <!-- <v-spacer class="ma-5"></v-spacer> -->

    <v-layout row wrap>
      <v-flex xs12 sm12 md12 v-if="submitStatus || getRoutineSchema.id > 0 || submitStatus1">
        <v-layout justify-center row fill-height align-center>
          <v-btn :disabled="publishState == 1 || timeOut" color="primary" large @click.stop.prevent="validationForm()" class="erBtn">Submit</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import composeMail from "@/components/utils/composeMail.vue";
import commonGet from "@/mixin/common_getters_mixin";
import routinePdf from "@/components/admin/routinePdf.vue";
import common_login_getters from "../../mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import Vue from "vue";
import draggable from "vuedraggable";
import * as moment from "moment";
import _ from "lodash";
export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  props: ["examRoutine", "submitStatus1", "searchExamRoutineList", "searchParam", "editDataMode", "publishState", "timeOut"],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    composeMail,
    draggable,
    routinePdf,
  },
  data() {
    return {
      initiateParam: {},
      noDataText: "",
      confirmStatus: false,
      change_reason: "",
      errorChangeStatus: false,
      errorChangeMsg: "",
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
      menu1: false,
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
      dictionary: {
        custom: {
          exam: {
            required: () => "Select Exam ",
          },
          year: {
            required: () => "Select Year ",
          },
          seal_no: {
            required: () => "Seal no. field can not be empty ",
          },
          duration: {
            required: () => "Duration of Exam field can not be empty ",
          },
          start_time: {
            required: () => "Start Time of Exam field can not be empty ",
          },
          // change_notice: {
          //   required: () =>
          //     " Exam Schedule Change Notice field can not be empty ",
          // },
          change_reason: {
            required: () => " Exam Schedule Change Reason field can not be empty ",
          },
        },
      },
      publishState: 0,
      routineInputDialog: false,
      scheduleChangeDialog: false,
      t: null,
      changeColor: false,
      shanitaArr: [
        {
          paper_code: 1234,
          paper_name: "BGFGFG",
        },
        {
          paper_code: 1234,
          paper_name: "sddsd",
        },

        {
          paper_code: 1234,
          paper_name: "sddsd",
        },
      ],
    };
  },
  created() {
    this.degreeIdentify();
    this.getExamCode();
    this.$store.dispatch("searchRoutineChangeNoticeData", this.searchParam);
    this.blink(event);
    this.$store.dispatch("fetchRoutineDateData", this.searchParam);
    this.noDataText = "No Data Available";
    let param = {
      limit: -1,
    };
    //year
    if (!this.$store.getters.getYearItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchYearData", param);
    }
    //exam
    if (!this.$store.getters.getExamItem.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
    // this.getRoutineSchema.id > 0
    //   ? (this.submitStatus = true)
    //   : (this.submitStatus = false);
    this.getRoutineSchema.id > 0 ? (this.addDatePaperStatus = true) : (this.addDatePaperStatus = false);
    //this.routine = this.getRoutineSchema;

    //offdya
    if (this.getOffDayList.length < 1) this.fetchOffDayData();
    this.publishActivity("RoutineGeneration");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    getRoutineSchema(val) {
      console.log("val", val.routine);
      this.getRoutineSchema.routine = val.routine;
    },
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
    examRoutine(val) {
      this.dialog = val;
    },
    dialog(val) {
      console.log("aswasasasa", this.$store.getters.getLoggedInExam.code);
      this.getExamCode(this.$store.getters.getLoggedInExam.code);
      if (!val) this.close();
      // if (this.getRoutineSchema.exam_code) {
      //   console.log('hi bvab');
      //   this.noDataText = "Please wait, We are fetching the Paper data";
      //   this.getExamCode(this.getRoutineSchema.exam_code);
      // }
      if (!this.editDataMode) {
        this.getRoutineSchema.exam_code = this.searchParam.exam_code;
        this.getRoutineSchema.year = this.searchParam.year;
      }
    },
    submitStatus1(val) {
      // console.log(val);
    },
    date(val) {
      // console.log("val:", val);
      if (!this.checkValidDate()) {
        this.errorStatus = true;
      } else this.errorStatus = false;
    },
  },
  computed: {
    getRoutineChangeNoticeList() {
      return this.$store.getters.getRoutineChangeNoticeList;
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
    getPaperList() {
      return this.$store.getters.getExamWisePaperItems;
    },
    getRoutineData() {
      return this.$store.getters.getRoutineDataList;
    },
    //routine schema
    getRoutineSchema() {
      return this.$store.getters.getRoutineSchema;
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost",
      };
    },
    listString() {
      return JSON.stringify(this.routine, null, 2);
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
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
    confirmSchedule() {
      this.$root.$confirm("Are you sure that you want to Confirm changed routine schedule?").then((confirm) => {
        if (confirm) {
          if (!this.checkValidChangedDate()) {
            this.errorChangeStatus = true;
            console.log("error ");
            return;
          }
          //this.change_notice.length < 1 ||
          if (this.change_reason.length < 1 || this.datewisePaperList.length < 1 || this.newDate.length < 1) {
            this.errorChangeStatus = true;
            this.errorChangeMsg = "Please provide schedule change Notice,  new date and exam papers.";
          } else if (this.cehckDuplicate(this.newDate)) {
            var param = {
              is_changed: 1,
              is_confirmed: 1,
              reason: this.change_reason,
              //notice: this.change_notice,
              date: this.newDate,
              changed_from: this.selectedDate,
              changed_to: this.newDate,
              day: moment(this.newDate).format("dddd"),
              papers: this.datewisePaperList,
            };

            this.submitStatus = true;
            let postParam = {
              data: param,
              searchParam: this.searchParam,
            };
            this.$store.dispatch("changeRoutineDateData", postParam).then((res) => {
              this.searchExamRoutineList(); // to update schema to see changes
              this.clearSchedule();
              this.scheduleChangeDialog = false;
            });
          }
        }
      });
    },
    schedulechangeItemOpen(item, index) {
      this.scheduleChangeDialog = true;
      this.showRoutineDataDateWise = false;
      this.confirmStatus = true;
      //this.selectedIndex = index;
      //this.selectedItem = item;
      console.log("item.date on confirm click", item.changed_from);
      this.selectedDate = item.changed_from;
      this.newDate = item.new_date;
      this.change_reason = item.reason;
      //this.change_notice = item.notice;
      this.datewisePaperList = JSON.parse(JSON.stringify(item.papers));
    },
    validationChangeForm() {
      this.$validator.validateAll("form1").then((isValid) => {
        if (isValid) {
          if (this.confirmStatus) {
            this.confirmSchedule();
          } else {
            this.changeSchedule();
          }
        }
      });
    },
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
      if (!this.checkValidChangedDate()) {
        this.errorChangeStatus = true;
        console.log("error ");
        return;
      }
      //var selectedDate = moment(this.date, "YYYY-MM-DD").format("DD-MM-YYYY");
      if (this.change_reason.length < 1 || this.datewisePaperList.length < 1) {
        this.errorChangeStatus = true;
        this.errorChangeMsg = "Please provide schedule change reason and exam papers.";
      } else if (this.cehckDuplicate(this.newDate)) {
        if (this.newDate.length > 1) {
          console.log("if e");
          var param = {
            is_changed: 1,
            is_confirmed: 0,
            reason: this.change_reason,
            date: this.newDate,
            changed_from: this.selectedDate,
            changed_to: this.newDate,
            day: moment(this.newDate).format("dddd"),
            papers: this.datewisePaperList,
          };
        } else {
          var param = {
            is_changed: 1,
            is_confirmed: 0,
            reason: this.change_reason,
            date: "postponed",
            day: "postponed",
            changed_to: "postponed",
            changed_from: this.selectedDate,
            papers: this.datewisePaperList,
          };
        }
        this.submitStatus = true;
        //console.log("chnage ", param);
        let postParam = {
          data: param,
          searchParam: this.searchParam,
        };
        this.$store.dispatch("changeRoutineDateData", postParam).then((res) => {
          this.searchExamRoutineList(); // to update schema to see changes
          this.clearSchedule();
          this.scheduleChangeDialog = false;
        });
      }
    },
    blink(event) {
      this.t = setInterval(
        function() {
          this.changeColor = !this.changeColor;
          this.v = this.v + 1;
        }.bind(this),
        1500
      );
    },
    checkValidChangedDate() {
      try {
        var currDay = moment(this.newDate).format("YYYY-MM-DD");
        var validStatus = true;
        this.getOffDayList.forEach((element) => {
          var offDay = moment(element.date).format("YYYY-MM-DD");
          if (offDay == currDay) {
            validStatus = false;
            this.errorChangeMsg = "This is a off Day ( " + element.description + " ). Please select another date.";
          }
        });
        return validStatus;
      } catch (ex) {
        console.log("check valid date error", ex);
      }
    },
    closeSchedule() {
      this.scheduleChangeDialog = false;
      this.selectedDate = "";
      this.datewisePaperList = [];
      this.newDate = "";
      this.change_reason = "";
      this.showRoutineDataDateWise = false;
      this.confirmStatus = false;
    },
    clearSchedule() {
      this.selectedDate = "";
      this.datewisePaperList = [];
      this.newDate = "";
      this.showRoutineDataDateWise = false;
      this.errorChangeMsg = "";
      this.errorChangeStatus = false;
      this.change_reason = "";
    },
    getExamDate(date) {
      console.log("chnge date", date);
      var secArr = [];
      this.getRoutineSchema.routine.forEach((rou) => {
        if (rou.date === date) {
          console.log("pap:", date);
          secArr.push(rou.papers);
        }
      });
      console.log("....rou", secArr);
      return (this.datewisePaperList = secArr[0]);
    },
    schedulechangeDialogOpen(event) {
      this.clearSchedule();
      this.scheduleChangeDialog = true;
      this.showRoutineDataDateWise = false; // if date wise exam exist/not
      this.blink(event);
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
      // if (moment(item.date, "YYYY-MM-DD").isSame(moment(), "day")) {
      //   return " green lighten-4";
      // } else if (moment(item.date, "YYYY-MM-DD").diff(moment(), "days")) {
      //   return " red lighten-4";
      // }
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
      this.$store.dispatch("fetchRoutineDataDateWise", { exam_date: val }).then((res) => {
        this.showRoutineDataDateWise = true;
      });
      // console.log("fetchRoutineDataDateWise", val);
    },
    getFormatedPaper(papers) {},
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
    // ifFetchingPaperListDone() {
    //   return this.$store.getters.getExamWisePaperItems.length > 0
    //     ? false
    //     : true;
    // },
    publishActivity(tag) {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = tag;
      param.status = "1";
      this.$store.dispatch("publishActivity", param).then((data) => {
        this.publishState = data.publish_status;
      });
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
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      try {
        //console.log("drag ", draggedElement);
        //console.log("rela ", relatedElement);
        for (var p in relatedElement) {
          if (relatedElement.hasOwnProperty(p) !== draggedElement.hasOwnProperty(p)) {
            return false; //console.log("exx false");
          } else if (typeof relatedElement[p] !== typeof draggedElement[p]) {
            return false; //console.log("exx false");
          }
        }

        if (draggedElement.hasOwnProperty("papers") && relatedElement.hasOwnProperty("papers")) return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
        else if (draggedElement.hasOwnProperty("title") && relatedElement.hasOwnProperty("title") && !draggedElement.date.localeCompare(relatedElement.date))
          return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;

        return false;
      } catch (ex) {
        // console.log(ex);
      }
    },
    checkValidDate() {
      try {
        var currDay = moment(this.date).format("YYYY-MM-DD");
        var validStatus = true;

        this.getOffDayList.forEach((element) => {
          var offDay = moment(element.date).format("YYYY-MM-DD");
          if (offDay == currDay) {
            validStatus = false;
            this.errorMsg = "This is a off Day ( " + element.description + " ). Please select another date.";
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
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.submitRoutine();
        }
      });
    },
    submitRoutine() {
      this.dataItem = this.getRoutineSchema;
      var self = this;
      // for clone exam initiate change based on exam and year change
      if (this.submitStatus1) {
        console.log("here");
        this.initiateParam.exam_code = this.getRoutineSchema.exam_code;
        this.initiateParam.exam_year = this.getRoutineSchema.year;
        this.$store.dispatch("callExamInitiateData", this.initiateParam).then((data) => {
          console.log("here...");
          self.dataItem.exam_initiate_id = data.data[0].id;
          self.finalSubmit();
        });
      } else {
        console.log("else here...");
        //SET EXAM INITIATE ID
        this.dataItem.exam_initiate_id = this.getExamInitiateId;
        this.finalSubmit();
      }
    },
    finalSubmit() {
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
      console.log("hiiiiiiiii");
      this.editedMode = true;
      this.selectedIndex = index;
      this.selectedItem = item;
      console.log("item.date on edit click", item.date);
      this.date = item.date;
      this.selectedPapers = JSON.parse(JSON.stringify(item.papers));
      console.log(" this.selectedPapers", this.selectedPapers);
      console.log(" this.selectedPapers", this.getPaperList);
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
      this.showRoutineDataDateWise = false;
      this.$validator.reset();
    },
    close() {
      this.$emit("update:examRoutine", false);
      this.$emit("update:submitStatus1", false);
      this.submitStatus = false;
      this.clearData();
      console.log("status ", this.updateStatus);
      if (this.updateStatus) {
        //this.$store.dispatch("fetchRoutineData");
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
    showHonoursSubData(param) {
      let data = param.data;
      // console.log("data:", data);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        string = string + item.subject_code;
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },
    showBachelorPapData(param) {
      console.log("shanita", param);
      let data = param.data;
      console.log("data:", param);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        for (var i = 0; i < item.paper_code.length; i++) {
          string = string + item.paper_code[i];
          if (i != item.paper_code.length - 1) {
            string = string + ", ";
          }
        }
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },

    showBachelorProfData(param) {
      console.log("showBachelorProfData", param);
      let data = param;
      console.log("data:......", param);
      let string = "";
      string = data.paper_name + " ( " + data.paper_code + " ) ";
      return string;
    },
    showHonoursPapData(param) {
      console.log("shanita hns", param);
      let data = param.data;
      console.log("data:", param);
      let string = "";
      for (var j = 0; j < data.length; j++) {
        let item = data[j];
        for (var i = 0; i < item.paper_code.length; i++) {
          string = string + item.paper_code[i];
          if (i != item.paper_code.length - 1) {
            string = string + ", ";
          }
        }
        if (j != data.length - 1) {
          string = string + " , ";
        }
      }
      return string;
    },
    showOneProData(param) {
      console.log("shanita 1 yr", param);
      let data = param;
      console.log("data:......", param);
      let string = "";
      string = data.paper_name + " ( " + data.paper_code + " ) ";
      return string;
    },
    showData(param) {
      let data = param.data;
      console.log("data:......", data);
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
.getWhite {
  /* background-color: rgb(228, 217, 73) !important ; */
  background-color: white !important ;
  color: rgb(37, 37, 28) !important ;
  font-size: 20px !important ;
}
.getHighlight {
  /* background-color: rgb(236, 120, 120) !important ;  */
  color: red !important ;
  font-size: 22px !important ;
}
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
