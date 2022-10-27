<template>
  <v-container fluid>
    <!-- <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Student Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <attendanceDetails
          :studentDetailsData="details"
          :studentMasterDataForDetails="masterForDetails"
        ></attendanceDetails>
      </v-card>
    </v-dialog>-->

    <v-expansion-panel>
      <v-expansion-panel-content v-if="forceRerenderFlag">
        <template v-slot:header>
          <div>
            <v-icon>search</v-icon>
            <span class="pl-2 subheading">Custom search panel</span>
            <span class="pl-1 subheading"></span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="px-3">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs4></v-flex>
                <!-- exam  -->
                <v-flex xs3>
                  <v-autocomplete
                    disabled
                    class="mt-3 ml-2 mr-2"
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    color="blue-grey lighten-2"
                    label="Select Exam"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip close @input="searchParam.exam_code = ''" :selected="data.selected" class="chip--select-multi">
                        {{ data.item.code + " - " + data.item.title }}
                      </v-chip>
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
                </v-flex>
                <!-- <pre> {{getYearList}} </pre> -->
                <!-- year  -->
                <v-flex xs1>
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
                </v-flex>
                <v-flex xs3></v-flex>
                <v-flex xs12>
                  <v-divider />
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="searchParam.reg_code"
                    class="ma-2"
                    name="rg_no"
                    menu-props="auto"
                    label="Registration Number"
                    prepend-icon="edit"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
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
                      <v-chip close @input="remove(data.item)" :selected="data.selected" class="chip--select-multi">
                        {{ data.item.code + " - " + data.item.title }}
                      </v-chip>
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
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="searchParam.center_code"
                    :items="getTheoryCenterList"
                    color="blue-grey lighten-2"
                    label="Select Center"
                    :item-text="(item) => item.center_code + ' - ' + item.center_name"
                    item-value="center_code"
                    prepend-icon="face"
                    multiple
                    :disabled="ifCenterUser || ifInvigilatorUser"
                  >
                    <template v-slot:selection="data">
                      <v-chip close @input="removeCenter(data.item)" :selected="data.selected" class="chip--select-multi">{{
                        data.item.center_code + " - " + data.item.center_name
                      }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.center_code + ' - ' + data.item.center_name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <!-- college code multiple select -->
                <!-- <v-flex xs4>
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="searchParam.college_code"
                    :items="getCollegeListItem"
                    color="blue-grey lighten-2"
                    label="Select college"
                    item-text="college_name"
                    item-value="college_code"
                    prepend-icon="face"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeCollege(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.college_name }}</v-chip
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
                            v-html="data.item.college_name"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>-->
                <v-flex xs4>
                  <v-text-field class="ma-2" hide-details name="code" label="College Code" v-model="searchParam.college_code" prepend-icon="edit"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    name="year"
                    class="ma-2"
                    v-model="searchParam.attendance_status"
                    item-text="title"
                    item-value="value"
                    :items="getAbsentPresentList"
                    menu-props="auto"
                    label="Select Absent Present Status"
                    hide-details
                    prepend-icon="face"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    :disabled="ifInvigilatorUser"
                    class="ma-2"
                    v-model="searchParam.invigilator_id"
                    item-text="name"
                    item-value="id"
                    :items="getInvigilatorList"
                    menu-props="auto"
                    label="Select Invigilator"
                    hide-details
                    prepend-icon="face"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip close @input="removeInvigilator(data.item)" :selected="data.selected" class="chip--select-multi">{{ data.item.name }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    class="ma-2"
                    name="room_no"
                    label="Room Number"
                    v-validate="'numeric'"
                    v-model="searchParam.room_no"
                    :error-messages="errors.collect('room_no')"
                    data-vv-name="room_no"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <!-- <v-flex xs4>
                  <v-text-field
                    class="ma-2 mt-4"
                    name="session"
                    label="Session Year"
                    menu-props="auto"
                    v-model="searchParam.session_year"
                    prepend-icon="edit"
                    hint="example : 2014-15"
                    persistent-hint
                  ></v-text-field>
                </v-flex>-->
                <v-flex xs4>
                  <v-autocomplete
                    class="ma-2"
                    hide-details
                    v-model="searchParam.session_year"
                    :item-text="(item) => item.session"
                    item-value="session_year"
                    :items="getSessionList"
                    label="Session Year"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip close @input="removeSession(data.item)" :selected="data.selected" class="chip--select-multi">{{ data.item.session }}</v-chip>
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
                <v-flex xs4>
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
                      <v-chip close @input="removeSubject(data.item)" :selected="data.selected" class="chip--select-multi">
                        {{ data.item.code + " - " + data.item.title }}
                      </v-chip>
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
                </v-flex>
                <!-- <v-flex xs4>
            <v-autocomplete
            class="ma-2"
            v-model="searchParam.degree_code"
            :item-text="item => item.code + ' - ' + item.title"
            item-value="code"
            :items="getDegreeList"
            menu-props="auto"
            label="Select Degree"
            hide-details
            prepend-icon="list_alt"
            >
            <template v-slot:selection="data">
              <v-chip
              close
              @input="searchParam.degree_code = ''"
              :selected="data.selected"
              class="chip--select-multi"
              >{{ "(" + data.item.code + ") " + data.item.title }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                  v-html="
                  '(' + data.item.code + ') ' + data.item.title
                  "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
                </v-flex>-->
                <!-- <v-flex xs4>
                  <v-autocomplete
                    class="ma-2"
                    v-model="searchParam.degree_group_code"
                    :items="getDegreeGroupList"
                    color="primary"
                    label="Select Degree Group"
                    hide-details
                    :item-text="
                      item =>
                        '(' +
                        item.degree_group_code +
                        ') ' +
                        item.degree_group_name
                    "
                    item-value="degree_group_code"
                    prepend-icon="list_alt"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.degree_group_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        "(" +
                        data.item.degree_group_code +
                        ") " +
                        data.item.degree_group_name
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
                              '(' +
                                data.item.degree_group_code +
                                ') ' +
                                data.item.degree_group_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>-->
                <v-flex xs4>
                  <v-menu class="ma-2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field class="mt-4" v-model="searchParam.attendance_date" label="Exam date" prepend-icon="event" readonly v-on="on" clearable></v-text-field>
                    </template>
                    <v-date-picker v-model="searchParam.attendance_date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchStdAttendance">Search</v-btn>
                    <!--    <v-btn
                      color="blue-grey"
                      class="white--text"
                      large
                      @click="exportAttendanceBySearchparam()"
                    >
                      <v-icon left dark>arrow_downward</v-icon>Export By Search
                    </v-btn>-->
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container fluid v-if="showAttendanceTable">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn round color="primary" fab small style="margin-top: -1.5em" class="elevation-0" v-if="pagination.totalItems">{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Examinee Attendance List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
            v-on:keyup.native.enter="searchStdAttendance()"
          ></v-text-field>

          <v-btn @click="searchStdAttendance()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer></v-spacer>
          <v-btn color="primary" class="white--text" @click="generateReport()"> <v-icon outline left dark>arrow_downward</v-icon>Download Examinee Attendance </v-btn>
        </v-layout>
      </v-card>
      <!-- {{ getStudentAttendence[1] }} -->
      <!-- {{pagination}} -->
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getStudentAttendence"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr :style="getStyle(props.item.room_no, props.item.center_code)">
            <td class="text-xs">{{ sl_count + props.index }}</td>
            <td class="justify-center text-xs-center">
              <v-chip color="green" text-color="white" v-if="checkAbsentPresent(props.item.attendance_status)">P</v-chip>
              <v-chip color="red" text-color="white" v-else>A</v-chip>
            </td>
            <td class="text-xs">
              {{ FormatDate(props.item.attendance_date) }}
            </td>
            <td class="text-xs">
              {{ FormatDate1(props.item.attendance_collect_date) }}
            </td>
            <td class="text-xs">{{ props.item.invigilator_name }}</td>
            <td class="text-xs">{{ props.item.room_no }}</td>
            <td class="text-xs">{{ props.item.exam_roll }}</td>
            <td class="text-xs">{{ props.item.reg_no }}</td>
            <td class="text-xs">{{ props.item.session_year }}</td>

            <td class="text-xs">{{ props.item.student_name }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.subject_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.subject_code }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs">{{ props.item.paper_code }} - {{ props.item.paper_name }}</td>
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.college_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.college_code }}</span>
              </v-tooltip>
            </td>

            <!--
            <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.degree_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.degree_code }}</span>
              </v-tooltip>
            </td>-->

            <!-- <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.exam_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.exam_code }}</span>
              </v-tooltip>
            </td>-->
            <!-- <td class="text-xs">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ props.item.center_name }}</span>
                </template>
                <span class="title">Code: {{ props.item.center_code }}</span>
              </v-tooltip>
            </td>-->
          </tr>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
      <div>
        <vue-html2pdf
          :show-layout="false"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="attendenceList"
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
                  style="
                    border: 1px solid red;
                    width: 71%;
                    border-collapse: collapse;
                    border: none;
                    margin-left: 1cm;
                    margin-top: 1.5cm;
                  "
                >
                  <tbody>
                    <tr style="background-color: white">
                      <td
                        style="
                          border: 1px solid black;
                          padding: 8px;
                          width: 50%;
                        "
                      >
                        <div style="float: left; width: 70px">
                          <img src="../../assets/nu_logos/nu_logo.png" style="width: 100% !important" />
                        </div>
                        <div style="float: left; padding-left: 10px">
                          <h1 style="margin: 0; padding: 0; line-height: 1.2">
                            National University
                          </h1>
                          <h3 style="padding: 0; font-weight: 500; margin: 5px 0">
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style="
                              margin: 0;
                              padding: 0;
                              font-weight: 500;
                              line-height: 1.2;
                            "
                          >
                            Examinee Attendance List
                          </h3>
                          <h3
                            style="
                              margin: 0;
                              padding: 0;
                              font-weight: 500;
                              line-height: 1.2;
                              margin-top: 5px;
                            "
                          >
                            {{ exam_name }}- {{ exam_year }}
                          </h3>
                        </div>
                      </td>
                      <td
                        style="
                          border: 1px solid black;
                          padding: 8px;
                          width: 50%;
                        "
                      >
                        <div style="float: right; padding-left: 10px">
                          <h1
                            style="
                              text-align: right;
                              margin: 0;
                              padding: 0;
                              line-height: 1.2;
                            "
                          >
                            National University
                          </h1>
                          <h3
                            style="
                              text-align: right;
                              padding: 0;
                              font-weight: 500;
                              margin: 5px 0;
                            "
                          >
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style="
                              text-align: right;
                              margin: 0;
                              padding: 0;
                              font-weight: 500;
                              line-height: 1.2;
                            "
                          ></h3>
                          <h3
                            style="
                              text-align: right;
                              margin: 0;
                              padding: 0;
                              font-weight: 500;
                              line-height: 1.2;
                              margin-top: 5px;
                            "
                          >
                            Examinee Attendance List
                          </h3>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <table
              style="
                width: 71%;
                border-collapse: collapse;
                border: none;
                margin-left: 1cm;
                margin-top: 1.5cm;
              "
            >
              <thead>
                <tr>
                  <td
                    style="
                      width: 32.45pt;
                      border: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>SL.</strong>
                    </p>
                  </td>
                  <td
                    style="
                      width: 70pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Attendance Date</strong>
                    </p>
                  </td>
                  <!--    <td
                    style="width: 72.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Date</strong>
                    </p>
                  </td>-->
                  <td
                    style="
                      width: 132.4pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Invigilator Name</strong>
                    </p>
                  </td>
                  <td
                    style="
                      width: 58.95pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Room No</strong>
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
                    style="
                      width: 60.9pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Exam Roll</strong>
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Registration No</strong>
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Session</strong>
                    </p>
                  </td>
                  <!--  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Status</strong>
                    </p>
                  </td>-->
                  <td
                    style="
                      width: 65.2pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Subject</strong>
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>Course</strong>
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: 1pt solid black;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-image: initial;
                      border-left: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                        text-align: center;
                      "
                    >
                      <strong>College</strong>
                    </p>
                  </td>
                </tr>
              </thead>
              <tbody v-for="(item, index) in getStudentAttendence" :key="item.index">
                <tr style="background-color: white">
                  <td
                    style="
                      width: 32.45pt;
                      border-right: 1pt solid black;
                      border-bottom: 1pt solid black;
                      border-left: 1pt solid black;
                      border-image: initial;
                      border-top: none;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ index + 1 }}
                    </p>
                  </td>
                  <td
                    style="
                      width: 70pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.attendance_date }}
                    </p>
                  </td>
                  <!--  <td
                    style="width: 72.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >{{ item.attendance_date }}</p>
                  </td>-->
                  <td
                    style="
                      width: 132.4pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.invigilator_name }}
                    </p>
                  </td>
                  <td
                    style="
                      width: 58.95pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.room_no }}
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
                    style="
                      width: 60.9pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.exam_roll }}
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.reg_no }}
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.session_year }}
                    </p>
                  </td>
                  <!--   <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >{{ item.attendance_status }}</p>
                  </td>-->
                  <td
                    style="
                      width: 65.2pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.subject_name }}
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.paper_name }}
                    </p>
                  </td>
                  <td
                    style="
                      width: 65.2pt;
                      border-top: none;
                      border-left: none;
                      border-bottom: 1pt solid black;
                      border-right: 1pt solid black;
                      padding: 0cm 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-top: 0cm;
                        margin-right: 0cm;
                        margin-bottom: 0.0001pt;
                        margin-left: 0cm;
                        line-height: normal;
                        font-size: 15px;
                        font-family: Calibri, sans-serif;
                      "
                    >
                      {{ item.college_name }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="
                margin-top: 0cm;
                margin-right: 0cm;
                margin-bottom: 10pt;
                margin-left: 0cm;
                line-height: 115%;
                font-size: 15px;
                font-family: Calibri, sans-serif;
              "
            >
              &nbsp;
            </p>
          </section>
        </vue-html2pdf>
      </div>
      <span v-if="showIfPresent">* Showing only present data</span>
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment";
import common_login_getters from "../../mixin/common_login_getters";
//import attendanceDetails from "@/components/invigilator/attendanceByExamYearDetails";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import VueHtml2pdf from "vue-html2pdf";

export default {
  mixins: [commonGet, common_login_getters, commonExamYear],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      menu2: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      exam_name: "",
      exam_year: "",
      sl_count: 0,
      loading: false,
      searchParam: {
        full: true,
        admitcard: false,
        final: true,
        attendance_status: "1",
      },
      totalDataItems: 0,
      // loading: true,
      loadData: false,
      limit: {},
      details: [],
      masterForDetails: [],
      dialog: false,

      search: "",

      headers: [
        { text: "SL", value: "sl" },
        {
          text: "Attendance Status",
          value: "attendance_status",
          sortable: true,
        },
        { text: "Exam Date", value: "attendance_date", sortable: true },
        { text: "Att. Date", value: "attendance_collect_date", sortable: true },
        { text: "Invigilator Name", value: "invigilator_name", sortable: true },
        { text: "Room No", value: "room_no", sortable: true },
        { text: "Exam Roll", value: "exam_roll", sortable: true },
        { text: "Registration No", value: "reg_no", sortable: true },
        { text: "Session Year", value: "session_year", sortable: true },

        { text: "Examinee Name", value: "student_name", sortable: true },
        { text: "Subject", value: "subject_code", sortable: true },
        { text: "Course", value: "paper_code", sortable: true },
        { text: "College", value: "college_name", sortable: true },
      ],
      showAttendanceTable: true,
      forceRerenderFlag: true,
      dictionary: {
        custom: {
          room_no: {
            required: () => "Room.",
          },
        },
      },
    };
  },
  // mounted() {
  //   console.log("mounted");
  //   this.searchStdAttendance();
  // },

  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.order = "DESC";
      this.searchParam.search = this.search;
    },
    generateReport() {
     
      console.log("..m clcik");
      this.setLimit();
      this.searchParam.download = 1;
      this.$store.dispatch("downloadExamineeAttendance", this.searchParam);
      // this.$store.commit("SET_LOADING", { color: "primary" });
      // this.$refs.html2Pdf.generatePdf();
      // setTimeout(() => {
      //  this.$store.commit("UNSET_LOADING");
      // }, 5000);
    },
    searchStdAttendance() {
      console.log(">>>>>>.");
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("searchStdAttendance", this.searchParam).then((data) => {
        // console.log("+=data--->", data);
        this.loading = false;
        this.sl_count = data.from;
        this.pagination.totalItems = data.total;
      });
    },
    FormatDate(date) {
      return date ? moment(date).format("DD-MM-YYYY") : "No date";
    },
    FormatDate1(date) {
      return date ? moment(date).format("DD-MM-YYYY") : "No date";
    },

    checkAbsentPresent(status) {
      if (parseInt(status)) {
        return true;
      } else {
        return false;
      }
    },

    //     searchStdAttendance() {
    //       this.loading = true;
    //       this.setLimit();
    // },
    //       let searchParamWithLimit = { ...this.searchParam, ...this.limit };
    // console.log("limit data ", this.limit);
    // console.log("searchParamWithLimit--- >", searchParamWithLimit);
    // this.$store
    //   .dispatch("searchStdAttendance", searchParamWithLimit)
    //   .then(data => {
    //     this.loading = false;
    //     this.totalDataItems = data.meta.total;
    //   });
    exportAttendanceListOnClick() {
      this.$store.dispatch("exportAttendanceList");
    },
    exportAttendanceBySearchparam() {
      this.$store.dispatch("exportAttendanceBySearch", this.searchParam);
    },
    remove(item) {
      console.log("item ", item);
      const index = this.searchParam.paper_code.indexOf(item.code);
      console.log(index + " remove ", this.searchParam.paper_code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    removeCenter(item) {
      console.log("center item ", item);
      const index = this.searchParam.center_code.indexOf(item.center_code);
      console.log(index + " remove center", this.searchParam.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
    removeSubject(item) {
      const index = this.searchParam.subject_code.indexOf(item.code);
      console.log(index + "remove subject", this.searchParam.subject_code);
      if (index >= 0) this.searchParam.subject_code.splice(index, 1);
    },
    removeCollege(item) {
      console.log("College item ", item);
      const index = this.searchParam.college_code.indexOf(item.college_code);
      console.log(index + " remove college", this.searchParam.college_code);
      if (index >= 0) this.searchParam.college_code.splice(index, 1);
    },
    removeInvigilator(item) {
      console.log(" item inv", item);
      const index = this.searchParam.invigilator_id.indexOf(item.id);
      console.log(index + " remove invigilator", this.searchParam.id);
      if (index >= 0) this.searchParam.invigilator_id.splice(index, 1);
    },
    removeSession(item) {
      console.log("session item", item);
      const index = this.searchParam.session_year.indexOf(item.session);
      console.log("session in", index);
      if (index >= 0) this.searchParam.session_year.splice(index, 1);
    },
    getStyle(roll, center) {
      if (roll === null || center === null) {
      }
    },

    //  removeYear(item) {
    //   const index = this.searchParam.year.indexOf(item.id);
    //   if (index >= 0) this.searchParam.year.splice(index, 1);
    // }
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    if (this.ifInvigilatorUser) {
      this.searchParam.invigilator_id = this.getAuthUser.invigilator.id;
      this.searchParam.center_code = this.getAuthUser.invigilator.center.center_code;
    }

    // this.$store.dispatch("searchAttendance", this.searchParam).then(() => {
    //   this.showAttendanceTable = true;
    // });
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);

    if (!this.$store.getters.getInvigilatorItem.length) {
      let param = { ...this.searchParam };
      param.limit = -1;
      this.$store.dispatch("callInvigilatorData", param);
    } else {
      // console.log(" have data in invigilator getter");
    }
    if (!this.$store.getters.getCollegeListItem.length) {
      // console.log("don't have data in college  getter");
      this.$store.dispatch("fetchCollegeListData");
    }
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;

    //this.$store.dispatch("callStdAttendanceData");

    // dispatch fetchExamData
    if (!this.$store.getters.getExamItem.length) {
      console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }

    // // dispatch fetchCenterData
    // this.$store.dispatch("fetchCenterData");
    this.$store.dispatch("fetchPaperData");
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
    // //degree group
    // this.$store.dispatch("fetchDegreeGroupList");
    //session
    this.$store.dispatch("fetchAllSessionData");
  },
  watch: {
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
    },
    getLoggedInYear(val) {
      // this.customSearchPanel = false;
      this.searchParam.year = val.year;
      this.forceRerenderFlag = false;
      this.forceRerenderFlag = true;
      // this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      // console.log("---> in watch getLoggedInYear", val);
    },
    pagination() {
      this.searchStdAttendance();
    },
  },
  computed: {
    getStudentAttendence() {
      return this.$store.getters.getStdattendanceItem;
    },
    getCollegeListItem() {
      return this.$store.getters.getCollegeListItem;
    },
    getAbsentPresentList() {
      return [
        { title: "Absent", value: "0" },
        { title: "Present", value: "1" },
        { title: "All", value: "" },
      ];
    },
    showIfPresent() {
      // attendance_status: "1"
      return this.searchParam.attendance_status == 1 ? true : false;
    },
  },
};
</script>
