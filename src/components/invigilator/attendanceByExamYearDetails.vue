<template>
  <v-container fluid>
    <!-- {{searchParam}} -->
    <v-dialog v-model="paperDialog" width="900">
      <v-toolbar>
        <v-toolbar-title>
          <div class="title">Paper Details</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn round outline flat @click="paperDialog = false">
          <span class="mx-2 subheading">Close</span>(
          <v-icon>close</v-icon>)
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-layout row wrap class="ml-4 py-4">
          <v-flex v-for="(paper, i) in details" :key="paper.code" xs12 class="ma-2">
            <div class="title">
              <v-layout row class="ml-0">
                <v-flex xs1>
                  <span>({{ i + 1 }})</span>
                </v-flex>
                <v-flex xs1>
                  <span>{{ paper.paper_code }} -</span>
                </v-flex>
                <v-flex xs10>
                  <strong style="margin-left:1em">
                    {{
                    paper.paper_name
                    }}
                  </strong>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <!-- <v-expansion-panel focusable v-if="true">
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
                <v-flex xs6>
                  <v-autocomplete
                    disabled
                    class="ma-2"
                    menu-props="auto"
                    v-model="searchParam.exam_code"
                    :items="getExamList"
                    color="blue-grey lighten-2"
                    label="Select Exam"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    prepend-icon="subject"
                    hide-details
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.exam_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        "(" + data.item.code + ") " + data.item.title
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
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs6>
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
                <v-flex xs12>
                  <v-divider class="mt-3 mb-3"></v-divider>
                </v-flex>
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
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getPaperList"
                  menu-props="auto"
                  label="Select Paper"
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
                      {{
                      "(" + data.item.code + ") " + data.item.title
                      }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
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

                <v-text-field
                  v-model="searchParam.reg_code"
                  class="ma-2"
                  name="rg_no"
                  menu-props="auto"
                  label="Registration Number"
                  prepend-icon="edit"
                  hide-details
                ></v-text-field>
                <v-autocomplete
                  class="mt-3 ml-2 mr-2"
                  v-model="searchParam.center_code"
                  :items="getCenterList"
                  color="blue-grey lighten-2"
                  label="Select Center"
                  :item-text="
                    item => item.center_code + ' - ' + item.center_name
                  "
                  item-value="center_code"
                  prepend-icon="face"
                  multiple
                  :disabled="ifCenterUser"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeCenter(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.center_name }}</v-chip>
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
                              data.item.center_code +
                              ') ' +
                              data.item.center_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.subject_code"
                  :items="getSubjectList"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.subject_code = ''"
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
                        <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
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
                    >
                      {{
                      "(" + data.item.code + ") " + data.item.title
                      }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
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

                <v-text-field
                  class="ma-2"
                  hide-details
                  name="code"
                  label="College Code"
                  v-model="searchParam.college_code"
                  prepend-icon="edit"
                ></v-text-field>

                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.course_code"
                  :items="getDegreeGroupList"
                  label="Select Course"
                  hide-details
                  :item-text="
                    item =>
                      '(' +
                      item.degree_group_code +
                      ') ' +
                      item.degree_group_name
                  "
                  item-value="degree_group_code"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.course_code = ''"
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
                <v-flex xs12 sm12 md12 style="margin-top:40px;">
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchAttendanceBYExamYearDetails()">Search</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>-->

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
                    :item-text="item =>  item.code + ' - ' + item.title"
                    item-value="code"
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="searchParam.exam_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        data.item.code + " - " + data.item.title
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
                               data.item.code + ' - ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
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
                <v-flex xs4 v-if="!ifInvigilatorUser">
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="searchParam.paper_code"
                    :item-text="item => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getPaperList"
                    menu-props="auto"
                    label="Select Paper"
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
                        {{
                        data.item.code + " - " + data.item.title
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
                               data.item.code + ' - ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="searchParam.center_code"
                    :items="getCenterList"
                    color="blue-grey lighten-2"
                    label="Select Center"
                    :item-text="
                      item => item.center_code + ' - ' + item.center_name
                    "
                    item-value="center_code"
                    prepend-icon="face"
                    multiple
                    :disabled="ifCenterUser || ifInvigilatorUser"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeCenter(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >{{ data.item.center_name }}</v-chip>
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
                <v-flex xs4 v-if="!ifInvigilatorUser">
                  <v-text-field
                    class="ma-2"
                    hide-details
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 v-if="!ifInvigilatorUser">
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
                      <v-chip
                        close
                        @input="removeInvigilator(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >{{ data.item.name }}</v-chip>
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
                <v-flex xs4 v-if="!ifInvigilatorUser">
                  <v-autocomplete
                    class="ma-2"
                    hide-details
                    v-model="searchParam.session_year"
                    :item-text="item => item.session"
                    item-value="session_year"
                    :items="getSessionList"
                    label="Session Year"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSession(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >{{ data.item.session }}</v-chip>
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
                    :item-text="item => item.code + ' - ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    hide-details
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeSubject(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        data.item.code + " - " + data.item.title
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
                               data.item.code + ' - ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs4 v-if="!ifInvigilatorUser">
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
                      >{{ data.item.code + " - " + data.item.title }}</v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title
                            v-html="
                              data.item.code + ' - ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
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
                  <v-menu
                    class="ma-2"
                    v-model="menu2"
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
                        class="mt-4"
                        v-model="searchParam.attendance_date"
                        label="Exam date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="searchParam.attendance_date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-layout justify-center row fill-height align-center>
                    <v-btn color="primary" large @click="searchAttendanceBYExamYearDetails">Search</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- <div class="subheading">
      EXAM: ({{ getCurrentDetailItem.exam_code }})
      {{ getCurrentDetailItem.exam_name }} | YEAR: ({{
      getCurrentDetailItem.year
      }}) | COLLEGE: ({{ getCurrentDetailItem.college_code }})
      {{ getCurrentDetailItem.college_name }}
    </div>-->
    <!-- <v-divider class="mt-5 mb-3"></v-divider> -->
    <!-- <br />
    {{ searchParam }}
    <br />
    {{ pagination }}-->
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
                >{{ pagination.totalItems }}</v-btn>
              </template>
              <v-card-text class="title">Attendance Details ByExamYear</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-btn
            @click="searchFormFillupList()"
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
          ></v-text-field>-->
        </v-layout>
      </v-card>
      <!-- {{getAttendanceByEYDetailsItem[0]}} -->
      <v-data-table
        :loading="loading"
        :headers="getHeader"
        :items="getAttendanceByEYDetailsItem"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ FormatDate(props.item.attendance_date) }}</td>
          <td class="text-xs" v-if="!ifInvigilatorUser">{{ props.item.invigilator_name }}</td>
          <td class="text-xs">{{ props.item.room_no }}</td>
          <td class="text-xs" v-if="!ifInvigilatorUser">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs" v-if="!ifInvigilatorUser">{{ props.item.session_year }}</td>

          <td class="justify-center text-xs-center">
            <v-chip
              color="green"
              text-color="white"
              v-if="checkAbsentPresent(props.item.attendance_status)"
            >P</v-chip>
            <v-chip color="red" text-color="white" v-else>A</v-chip>
          </td>
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
          <td class="text-xs" v-if="!ifInvigilatorUser">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.college_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.college_code }}</span>
            </v-tooltip>
          </td>
          <!-- <td class="text-xs">{{ FormatDate(props.item.attendance_date) }}</td> -->
          <!-- <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.student_name }}</span>
              </template>
              <span class="title">Father's Name: {{ props.item.father_name }}</span>
            </v-tooltip>
          </td>-->

          <!-- father_name -->

          <!-- <td class="text-xs" v-if="!ifInvigilatorUser">{{ props.item.exam_code }}</td> -->
          <!-- <td class="text-xs" v-if="!ifInvigilatorUser">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.exam_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.exam_code }}</span>
            </v-tooltip>
          </td>-->
          <!-- <td class="text-xs" v-if="!ifInvigilatorUser">{{ props.item.year }}</td>

          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.subject_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.subject_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.course_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.course_code }}</span>
            </v-tooltip>
          </td>
          <td class="text-xs">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ props.item.center_name }}</span>
              </template>
              <span class="title">Code: {{ props.item.center_code }}</span>
            </v-tooltip>
          </td>
          -->

          <!-- <td class="text-xs">
          <v-btn outline color="info" @click="showPaperDetails(props.item.details)">-->
          <!-- <b class="mr-2">{{ props.item.details.length }}</b>
          <span v-if="props.item.details.length - 1">Papers</span>-->
          <!-- <span v-else class="mr-2">Paper</span> -->
          <!-- <span class="mr-2">Paper Details</span>
            </v-btn>
          </td>-->
          <!-- <td class="text-xs">{{ props.item.id }}</td> -->
          <!-- <td class="text-xs">
            <v-layout row wrap>
              <v-flex v-for="(paper,i) in props.item.details" :key="paper.code" xs12>
                <span>({{i+1}})</span>
                <strong>{{paper.paper_name}}</strong>
                <span>&nbsp;({{paper.paper_code}})</span>
              </v-flex>
            </v-layout>
          </td>-->
          <!-- {{ getMandatoryPaperName(props.item.details) }} -->
          <!-- <td class="text-xs">{{ getOptionalPaperName(props.item.details) }}</td>
          <td class="text-xs">{{ getImprovementPaperName(props.item.details) }}</td>-->
          <!-- <td
            class="text-xs"
          >{{ getStatusName(props.item.student_confirm_status, props.item.teacher_confirm_status) }}</td>-->
          <!-- <td class="text-xs-center">
            <v-btn color="info" @click="showDetails(props.item)">Info</v-btn>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>
<script>
import moment from "moment";
import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  props: ["dialogStatus"],
  components: {},
  mixins: [commonGet, common_login_getters, commonExamYear],
  data() {
    return {
      sl_count: -1,
      loading: false,
      componentStatus: false,
      details: [],
      rollGendialog: false,
      rollGendMode: true,
      dialog: false,
      paperDialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      getStatus: [
        { name: "All", value: 0 },
        { name: "Only Teacher Approved", value: 1 },
        { name: "Only Paid", value: 2 },
      ],
      searchParam: {
        full: true,
        admitcard: false,
        final: true,
        attendance_status: "1",
      },
      forceRerenderFlag: true,
      menu2: false,
    };
  },

  created() {
    if (this.ifCenterUser) {
      this.searchParam.center_code = [this.getAuthUser.center.center_code];
    }
    if (this.ifInvigilatorUser) {
      this.searchParam.invigilator_id = [this.getAuthUser.invigilator.id];
      this.searchParam.center_code = [
        this.getAuthUser.invigilator.center.center_code,
      ];
    }

    this.$store.commit("UNSET_FORM_FILLUP_DATA");

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    //subject
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    // Degree Data
    if (this.$store.getters.getDegreeItems.length < 1) {
      this.$store.dispatch("fetchDegreeData");
    }
    //degree group
    this.$store.dispatch("fetchDegreeGroupList");

    // dispatch fetchCenterData
    this.$store.dispatch("fetchCenterData");
    if (!this.$store.getters.getInvigilatorItem.length) {
      let param = { ...this.searchParam };
      param.limit = -1;
      this.$store.dispatch("callInvigilatorData", param);
    }
  },
  computed: {
    //all data
    getHeader() {
      if (this.ifInvigilatorUser) {
        return this.getAttendanceByEYDetailsHeaders_forInvigilatorUser;
      } else {
        return this.getAttendanceByEYDetailsHeaders;
      }
    },

    getAttendanceByEYDetailsItem() {
      return this.$store.getters.getAttendanceByEYDetailsItem;
    },
    getAttendanceByEYCurrentDetailItem() {
      return this.$store.getters.getAttendanceByEYCurrentDetailItem;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    ifLoadingListDone() {
      return this.$store.getters.getFormFillupItem.length > 0 ? false : true;
    },
    getAttendanceByEYDetailsHeaders() {
      return [
        { text: "SL", value: "sl", sortable: false },
        { text: "Date", value: "attendance_date", sortable: false },
        {
          text: "Invigilator Name",
          value: "invigilator_name",
          sortable: false,
        },
        { text: "Room No", value: "room_no", sortable: false },
        { text: "Exam Roll", value: "exam_roll", sortable: false },
        { text: "Registration No", value: "reg_no", sortable: false },
        { text: "Session Year", value: "session_year", sortable: false },

        { text: "Status", value: "attendance_status", sortable: false },
        { text: "Name", value: "student_name", sortable: false },
        { text: "Subject", value: "subject_code", sortable: false },
        { text: "Paper", value: "paper_code", sortable: false },
        { text: "College", value: "college_name", sortable: false },
        // { text: "Exam Code", value: "exam_code" },
        // { text: "Exam", value: "exam_name" },
        // { text: "Year", value: "year" },

        // { text: "Course", value: "course_code" },
        // { text: "Center", value: "center_code" }

        // { text: "Paper Details", value: "mandatory_papers" }
      ];
    },
    getAttendanceByEYDetailsHeaders_forInvigilatorUser() {
      return [
        { text: "SL", value: "sl" },
        { text: "Date", value: "attendance_date" },
        // { text: "Invigilator Name", value: "invigilator_name" },
        { text: "Room No", value: "room_no" },
        { text: "Status", value: "attendance_status" },
        { text: "Name", value: "student_name" },
        { text: "Registration No", value: "reg_no" },
        // { text: "Exam Code", value: "exam_code" },
        // { text: "Exam", value: "exam_name" },
        // { text: "Year", value: "year" },
        // { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_code" },
        { text: "Paper", value: "paper_code" },
        { text: "Course", value: "course_code" },
        { text: "Center", value: "center_code" },
        // { text: "Session Year", value: "session_year" },
        // { text: "Exam Roll", value: "exam_roll" }
      ];
    },
    getAbsentPresentList() {
      return [
        { title: "Absent", value: "0" },
        { title: "Present", value: "1" },
        { title: "All", value: "" },
      ];
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchAttendanceBYExamYearDetails() {
      console.log("--->", this.searchParam);
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch("searchAttendanceBYExamYearDetails", this.searchParam)
        .then((data) => {
          console.log("searchAttendanceBYExamYearDetails->", data);
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },

    getMandatoryPaperName(details) {
      var arr = [];
      details.forEach(function (item) {
        arr.push(item.paper_name + " (" + item.paper_code + ")");
        // arr.push("" + item.paper_name);
      });
      return arr;
      // return arr.join();
    },
    getOptionalPaperName(details) {
      var arr = [];
      details.forEach(function (item) {
        arr.push(item.paper_name + " (" + item.paper_code + ")");
      });
      return arr.join();
    },
    getImprovementPaperName(details) {
      var arr = [];
      details.forEach(function (item) {
        arr.push(item.paper_name + " (" + item.paper_code + ")");
      });
      return arr.join();
    },
    getStatusName(stdStatus, tchStatus) {
      var statusName = stdStatus == 0 ? "Std : No " : "Std : Yes ";
      statusName += tchStatus == 0 ? "Tch : No " : "Tch : Yes ";
      return statusName;
    },

    showPaperDetails(details) {
      this.paperDialog = true;
      this.details = details;
      // console.log(details);
    },

    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    close() {
      this.$emit("update:dialogStatus", false);
      this.searchParam = {
        reg_no: "",
        exam_code: "",
        paper_code: "",
      };
    },
    checkAbsentPresent(status) {
      if (parseInt(status)) {
        return true;
      } else {
        return false;
      }
    },
    removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
    FormatDate(date) {
      return date ? moment(date).format("Do MMMM YYYY") : "No date";
    },
  },
  watch: {
    getAttendanceByEYCurrentDetailItem(val) {
      this.searchParam.exam_code = val.exam_code;
      this.searchParam.year = val.year;
      // this.searchParam.college_code = val.college_code;
      this.searchParam.exam_initiate_id = val.exam_initiate_id;
      this.searchAttendanceBYExamYearDetails();
    },
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      let obj = this.getAttendanceByEYCurrentDetailItem;
      if (!(Object.keys(obj).length === 0 && obj.constructor === Object)) {
        this.searchAttendanceBYExamYearDetails();
      }
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
</style>
