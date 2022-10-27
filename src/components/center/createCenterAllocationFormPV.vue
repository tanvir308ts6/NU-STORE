<template>
  <v-container fluid>
    <v-btn
      style="z-index:10; margin-top:1.8em ; margin-right:2em"
      absolute
      right
      color="primary"
      @click="generateReport()"
      :disabled="!getCenterAllocationSchema.center.length"
    >
      <v-icon dark left>arrow_downward</v-icon>Export Center List
    </v-btn>
    <!-- {{publishState}} -->
    <v-card v-if="publishState == 1">
      <v-alert :value="true" type="success">
        <v-icon large left color="white">edit</v-icon>
        <snap class="display-1">Center List Published</snap>
      </v-alert>
    </v-card>
    <!-- <div :style="getPublishedStyle"> -->
    <div>
      <div class="mx-3 pa-5">
        <v-form v-if="!ifCenterUser">
          <v-layout row wrap align-center>
            <v-flex>
              <v-card class="px-3">
                <v-layout row wrap align-center class="py-3">
                  <v-autocomplete
                    class="ma-2"
                    v-model="getCenterAllocationSchema.exam_code"
                    :item-text="(item) => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getExamList"
                    menu-props="auto"
                    label="Select Exam"
                    hide-details
                    v-validate="'required'"
                    :error-messages="errors.collect('exam_code')"
                    data-vv-name="exam_code"
                    required
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="getCenterAllocationSchema.exam_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{ data.item.code + " - " + data.item.title }}
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
                            v-html="data.item.code + ' - ' + data.item.title"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <!-- {{getCenterAllocationSchema.division_id}} -->
                  <v-autocomplete
                    class="ma-2"
                    v-model="getCenterAllocationSchema.division_id"
                    item-text="division_name"
                    item-value="div_code"
                    :items="getDivisionList"
                    label="Select Division"
                    hide-details
                    prepend-icon="house"
                    v-validate="'required'"
                    :error-messages="errors.collect('division_id')"
                    data-vv-name="division_id"
                    required
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="getCenterAllocationSchema.division_id = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                        >{{ data.item.division_name }}</v-chip
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
                            v-html="data.item.division_name"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>

                  <v-select
                    class="ma-2"
                    v-model="getCenterAllocationSchema.year"
                    item-text="year"
                    item-value="year"
                    :items="getYearList"
                    menu-props="auto"
                    label="Select Year"
                    hide-details
                    prepend-icon="calendar_today"
                    v-validate="'required'"
                    :error-messages="errors.collect('year')"
                    data-vv-name="year"
                    required
                  ></v-select>
                  <v-text-field
                    class="mt-3 ml-2 mr-2"
                    name="sealNo"
                    label="Seal No"
                    v-model="getCenterAllocationSchema.seal_no"
                    v-validate="'required'"
                    :error-messages="errors.collect('seal_no')"
                    data-vv-name="seal_no"
                    required
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-menu
                    class="ma-2"
                    v-model="menu1"
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
                        class="ma-2"
                        v-model="getCenterAllocationSchema.date"
                        label="Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="getCenterAllocationSchema.date"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-form>
        <!-- <v-spacer class="ma-4"></v-spacer> -->
        <v-divider class="mx-3 pa-4" v-if="!ifCenterUser"></v-divider>

        <!-- add  -->
        <v-form data-vv-scope="form1" v-if="!ifCenterUser">
          <v-layout row wrap align-center>
            <v-flex>
              <v-card dark class="px-3 CSP_BoarderStyle">
                <v-layout row wrap align-center class="py-3">
                  <v-autocomplete
                    @change="centerChange($event)"
                    class="mt-3 ml-2 mr-2"
                    v-model="collegeCode"
                    :items="getCenterList"
                    color="blue-grey lighten-2"
                    label="Select Center"
                    :item-text="
                      (item) =>
                        item.college_code +
                        ' - ' +
                        item.center_name +
                        '( Student Capacity :' +
                        item.student_capacity +
                        ') '
                    "
                    item-value="college_code"
                    prepend-icon="subject"
                    v-validate="'required'"
                    :error-messages="errors.collect('form1.center_id')"
                    data-vv-name="collegeCode"
                    required
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="collegeCode = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.college_code +
                            " - " +
                            data.item.center_name +
                            " ( Student Capacity :" +
                            data.item.student_capacity +
                            ") "
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
                              data.item.college_code +
                                ' - ' +
                                data.item.center_name +
                                ' ( Student Capacity :' +
                                data.item.student_capacity +
                                ') '
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <!-- {{selectedCollege}} ---SEL-COLL -->
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="selectedCollege"
                    :items="getCollegeList"
                    color="blue-grey lighten-2"
                    label="Select College"
                    :item-text="
                      (item) =>
                        item.college_code +
                        ' - ' +
                        item.college_name +
                        ' (Total Student : ' +
                        item.student_count +
                        ')'
                    "
                    item-value="college_code"
                    return-object
                    multiple
                    prepend-icon="subject"
                    v-validate="'required'"
                    :error-messages="errors.collect('form1.selectedCollege')"
                    data-vv-name="selectedCollege"
                    required
                    :no-data-text="noDataText"
                    :loading="ifFetchingCollegeListDone"
                    @change="setDegreeData($event)"
                    @input="setDegreeData($event)"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="selectedCollege = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.college_code +
                            " - " +
                            data.item.college_name
                        }}
                        <v-btn color="success" class="ma-2" dark
                          >Student {{ data.item.student_count }}</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="ma-2"
                          dark
                          @click="data.item.selected = !data.item.selected"
                          >Custom..{{ data.item.selected }}</v-btn
                        >
                      </v-chip>

                      <div v-if="data.item.selected">
                        <!-- {{selectedCollege}} -->
                        <v-radio-group
                          v-model="data.item.year"
                          v-if="!editedMode"
                        >
                          <template v-for="i in data.item.degree_group">
                            <v-chip color="green">
                              <v-checkbox
                                v-model="i.selected"
                                @change="setAllSubject(data.item, i)"
                              ></v-checkbox>
                              {{ i.degree_group_name }}
                            </v-chip>
                            <v-card class="row">
                              <v-chip
                                color="secondary"
                                text-color="black"
                                v-for="j in i.subject"
                                :key="j.subject_name"
                              >
                                <v-checkbox
                                  v-model="j.selected"
                                  @change="setCollegeTotal(data.item, '')"
                                ></v-checkbox>
                                {{ j.subject_name }}
                              </v-chip>
                            </v-card>
                            <br />
                            <hr />
                          </template>
                        </v-radio-group>
                        <v-radio-group
                          v-model="data.item.year"
                          v-if="editedMode"
                        >
                          <template
                            v-for="i in getSelectedDegreeGroupData(data.item)"
                          >
                            <v-chip color="green">
                              <v-checkbox
                                v-model="i.selected"
                                @change="setAllSubject(data.item, i)"
                              ></v-checkbox>
                              {{ i.degree_group_name }}
                            </v-chip>
                            <v-card class="row">
                              <v-chip
                                color="secondary"
                                text-color="black"
                                v-for="j in i.subject"
                                :key="j.subject_name"
                              >
                                <v-checkbox
                                  v-model="j.selected"
                                  @change="setCollegeTotal(data.item, '')"
                                ></v-checkbox>
                                {{ j.subject_name }}
                              </v-chip>
                            </v-card>
                            <br />
                            <hr />
                          </template>
                        </v-radio-group>
                      </div>
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
                              data.item.college_code +
                                ' - ' +
                                data.item.college_name +
                                ' (Std count : ' +
                                data.item.student_count +
                                ')'
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>

                  <v-text-field
                    class="mt-3 ml-2 mr-2"
                    name="responsiblePrinciple "
                    label="Responsible Principle"
                    v-model="responsible_principle"
                    v-validate="'required'"
                    :error-messages="
                      errors.collect('form1.responsible_principle')
                    "
                    data-vv-name="responsible_principle"
                    required
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-autocomplete
                    class="ma-2"
                    v-model="district_id"
                    item-text="district_name"
                    item-value="dist_code"
                    :items="getDistrictList"
                    menu-props="auto"
                    label="Select District"
                    hide-details
                    v-validate="'required'"
                    :error-messages="errors.collect('form1.district_id')"
                    data-vv-name="district_id"
                    required
                    prepend-icon="house"
                    @change="changeDistrict($event)"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="district_id = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          data.item.dist_code + " - " + data.item.district_name
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
                              data.item.dist_code +
                                ' - ' +
                                data.item.district_name
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                  <v-flex xs12 sm12 md12>
                    <v-divider dark class="my-3"></v-divider>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-layout justify-center row fill-height align-center>
                      <v-btn
                        class="erBtn"
                        color="primary"
                        @click.stop.prevent="showCollDetails()"
                      >
                        <v-icon left large>view_list</v-icon>
                        UnAllocated Colleges({{ getUnAllocationSchema.count }})
                      </v-btn>
                      <v-btn
                        class="erBtn"
                        color="primary"
                        @click.stop.prevent="showCollSubDetails()"
                      >
                        <v-icon left large>view_list</v-icon>UnAllocated Student
                        by Coll-Sub
                      </v-btn>
                      <!-- ({{ getUnAllocationCollSubSchema.count }}) -->
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="publishState == 1"
                        class="erBtn"
                        color="success"
                        @click.stop.prevent="validationForm1()"
                        v-if="!editedMode"
                      >
                        <v-icon left large>add</v-icon>add
                      </v-btn>
                      <v-btn
                        :disabled="publishState == 1"
                        class="erBtn"
                        color="success"
                        @click="validationForm1()"
                        v-if="editedMode"
                      >
                        <v-icon left large>edit</v-icon>Edit...
                      </v-btn>
                      <v-btn
                        :disabled="publishState == 1"
                        class="erBtn"
                        color="red"
                        @click="clearData()"
                        dark
                      >
                        <v-icon left large>close</v-icon>Cancel
                      </v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-form>
        <!-- <v-divider class="mt-5 mb-3"></v-divider> -->
        <!-- {{getCenterAllocationSchema.center}} -->

        <!-- <v-divider class="mt-5 mb-4"></v-divider>
      <v-layout row wrap class="mt-3">


        </v-layout>-->
        <div style="margin-top:50;" v-if="!ifCenterUser">
          <v-btn
            :disabled="publishState == 1"
            color="primary"
            round
            @click="centerCodeDialog = true"
            dark
            >Set Starting Code</v-btn
          >
        </div>

        <v-data-table
          hide-actions
          :headers="headers"
          :items="getCenterAllocationSchema.center"
          class="elevation-4 mt-5 pa-4"
        >
          <template v-slot:items="props">
            <td class="text-xs-left CATCSS_l">{{ props.item.center_code }}</td>
            <td class="text-xs-left CATCSS">
              <h3>{{ props.item.center_name }}</h3>
              <br />
              <v-chip label color="indigo" text-color="white">
                <v-avatar>
                  <v-icon>account_circle</v-icon> </v-avatar
                >Capacity :
                <strong>{{ props.item.student_capacity }}</strong>
              </v-chip>
            </td>
            <td class="text-xs-center CATCSS" style="padding: 0 0px;">
              <v-data-table
                hide-actions
                :headers="colleges_header"
                :hide-headers="hideCollegesTableHeader(1)"
                :items="props.item.college"
                class="elevation-0"
              >
                <template v-slot:items="c_props">
                  <td class="text-xs-left CTCSS_l">
                    {{ c_props.item.college_code }}
                  </td>
                  <td class="text-xs-left CTCSS_r">
                    <h3>
                      {{ c_props.item.college_name }},{{
                        c_props.item.district_name
                      }}
                    </h3>
                    <div
                      v-for="cus in c_props.item.customDegree"
                      :key="cus.degree"
                    >
                      <h4>
                        [{{ cus.degree }} ]
                        {{
                          JSON.stringify(cus.subject)
                            .split('"')
                            .join(" ")
                        }}
                      </h4>
                    </div>
                  </td>
                  <!-- <td class="text-xs-center  CTCSS_r">
                  ...{{ c_props.item.college_name }}.....
                  </td>-->
                </template>
              </v-data-table>
              <!-- <v-data-table
              hide-actions
              :items="props.item.degrees"
              class="elevation-0"
            >
              <template v-slot :items="d_props">
                <td class="text-xs-center  CTCSS_r">
                  ...{{ d_props.item.college_name }}.....
                </td>
              </template>
              </v-data-table>-->
              <br />
              <!-- {{props.item.college_capacity}} < {{props.item.student_capacity}} -->
              <v-chip
                :color="
                  parseInt(props.item.college_capacity) <=
                  parseInt(props.item.student_capacity)
                    ? 'green darken-2'
                    : 'red'
                "
                text-color="white"
                label
              >
                <v-avatar>
                  <v-icon>people</v-icon> </v-avatar
                >Total Students :
                <strong>{{ props.item.college_capacity }}</strong>
              </v-chip>
            </td>
            <td class="text-xs-left CATCSS">
              {{ props.item.responsible_principle }}
            </td>
            <td class="text-xs-left CATCSS">{{ props.item.district_name }}</td>
            <td class="text-xs-center CATCSS_r">
              <v-layout align-center justify-center column fill-height>
                <v-btn
                  :disabled="publishState == 1 || ifCenterUser"
                  fab
                  depressed
                  small
                  dark
                  color="primary"
                  @click="editItem(props.item, props.index)"
                >
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn
                  :disabled="publishState == 1 || ifCenterUser"
                  fab
                  depressed
                  small
                  dark
                  color="red"
                  @click="deleteItem(props.item, props.index)"
                >
                  <v-icon dark>delete</v-icon>
                </v-btn>
              </v-layout>
            </td>
          </template>
        </v-data-table>
        <v-divider class="mt-5 mb-4"></v-divider>
        <v-layout row wrap class="mt-3">
          <!-- v-if="
            submitStatus || getCenterAllocationSchema.id > 0 || submitStatus1
          "-->
          <v-flex xs12 sm12 md12 v-if="!ifCenterUser">
            <v-layout justify-center row fill-height align-center>
              <v-btn
                :disabled="publishState == 1"
                color="primary"
                large
                @click.stop.prevent="validationFormAll()"
                class="erBtn"
                >Submit</v-btn
              >
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
      <centerAllocationPdf
        ref="html2Pdf"
        :headers.sync="headers"
        :getCenterAllocationSchema="getCenterAllocationSchema.center"
        :colleges_header="colleges_header"
      ></centerAllocationPdf>
      <v-dialog v-model="centerCodeDialog" persistent max-width="600px">
        <!-- <template v-slot:activator="{ on }"> -->
        <!-- <v-btn color="primary" dark v-on="on">Open ..Dialog</v-btn> -->
        <!-- </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">Set Center Starting Code</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    class="mt-3 ml-2 mr-2"
                    name="center_code_starting"
                    label="Starting Center Code"
                    v-model="start_center_code"
                    data-vv-name="center_code_starting"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="centerCodeDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" flat @click="setCenerCount()"
              >Update List</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="unAllocCenterDialog" width="900">
        <v-toolbar color="primary">
          <v-toolbar-title>
            <div class="title white--text">Unallocated College List</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn round outline flat @click="closeCenter()" color="white">
            <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-layout row wrap class="ml-4 py-4">
            <v-flex
              v-for="(college, i) in getUnAllocationCenterItem"
              :key="college.college_code"
              xs12
              class="ma-2"
            >
              <div class="title">
                <v-layout row class="ml-0">
                  <v-flex xs1>
                    <span>{{ i + 1 }}.</span>
                  </v-flex>
                  <v-flex xs11>
                    <span>{{ college.college_code }} -</span>
                    <strong style="margin-left:0.5em">{{
                      college.center_name
                    }}</strong>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <v-dialog v-model="unAllocCollSubDialog" width="900">
        <v-toolbar color="primary">
          <v-toolbar-title>
            <div class="title white--text">
              Unallocated Student Count By College-Subject
            </div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn round outline flat @click="closeCollSub()" color="white">
            <span class="mx-2 subheading">Close</span>( <v-icon>close</v-icon>)
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-layout row wrap class="ml-4 py-4">
            <v-flex xs12 class="ma-2">
              <div class="title">
                <v-layout row class="ml-0">
                  <v-flex xs1>
                    <span>Sl.</span>
                  </v-flex>
                  <v-flex xs5>
                    <strong style="margin-left:0.5em">College</strong>
                  </v-flex>
                  <v-flex xs3>
                    <strong style="margin-left:0.5em">Subject</strong>
                  </v-flex>
                  <v-flex xs3>
                    <strong style="margin-left:0.5em">Student Count</strong>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex
              v-for="(college, i) in getUnAllocationCollSubItem"
              :key="college.college_code"
              xs12
              class="ma-2"
            >
              <div class="title mb-2">
                <v-layout row class="ml-0">
                  <v-flex xs1>
                    <span>{{ i + 1 }}.</span>
                  </v-flex>
                  <v-flex xs5>
                    <span>{{ college.college_code }} -</span>
                    <span style="margin-left:0.5em">{{
                      college.college_name
                    }}</span>
                  </v-flex>
                  <!-- <v-divider vertical height="20px" color="black"></v-divider> -->
                  <v-flex xs4>
                    <span>{{ college.subject_code }} -</span>
                    <span style="margin-left:0.5em">{{
                      college.subject_name
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                    <span style="margin-left:0.5em">{{
                      college.student_count
                    }}</span>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
import centerAllocationPdf from "@/components/center/centerAllocationPdf.vue";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  components: { centerAllocationPdf },
  mixins: [commonGet, common_login_getters],
  props: ["centerAllocation", "submitStatus1", "searchParam"],
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      unAllocCollSubDialog: false,
      unAllocCenterDialog: false,
      centerCodeDialog: false,
      headers: [
        {
          text: "Center Code",
          align: "center",
          width: "50",
          value: "center_code",
          sortable: false,
        },
        {
          text: "Center Name",
          align: "center",
          width: "50",
          value: "center_name",
          sortable: false,
        },
        {
          text: "Colleges",
          width: "50",
          align: "center",
          value: "colleges",
          sortable: false,
        },
        {
          text: "Responsible principle",
          width: "50",
          align: "center",
          sortable: false,
          value: "responsible_principle",
        },
        {
          text: "District Name",
          width: "50",
          sortable: false,
          align: "center",
          value: "district_name",
        },
        {
          text: "Actions",
          sortable: false,
          width: "50",
          align: "center",
          value: "center_code",
        },
      ],
      colleges_header: [
        {
          text: "Code",
          align: "center",
          width: "50",
          value: "center_code",
          sortable: false,
          class: "CTH-CSS", // college table header - css
        },
        {
          text: "Name",
          align: "center",
          width: "50",
          value: "center_code",
          sortable: false,
          class: "", // college table header - css
        },
      ],
      centerText: "",
      selectedCollege: [],
      selectedDegree: [],
      selected_college_capacity: 0,
      items: [],
      editedMode: false,
      selectedItem: [],
      selectedIndex: -1,
      collegeCode: "",
      selected_center_name: "",
      selected_center_capacity: 0,
      selected_dist_name: "",
      college_id: [],
      responsible_principle: "",
      district_id: "",
      division_code_selected: "",
      dictionary: {
        custom: {
          exam_code: {
            required: () => "Select Exam ",
          },
          year: {
            required: () => "Select Year ",
          },
          division_id: {
            required: () => "Select Division ",
          },
          district_id: {
            required: () => "Select District ",
          },
          center_id: {
            required: () => "Select Center ",
          },
          selectedCollege: {
            required: () => "Select College ",
          },
          responsible_principle: {
            required: () => "Responsible Principle field can not be empty ",
          },
          seal_no: {
            required: () => "Seal no. field can not be empty ",
          },
        },
      },
      submitStatus: false,
      dataItem: {},
      menu1: false,
      dialog: false,
      dialog2: false,
      ifFetchingCollegeListDone: false,
      noDataText: "",
      degreeDataList: [],
      subjectDataList: [],
      fav: true,
      menu: false,
      message: false,
      hints: true,
      degDialog: false,
      customSelection: false,
      current_center_code: "",
      start_center_code: 101,
      publishState: 0,
    };
  },
  watch: {
    centerAllocation(val) {
      this.dialog = val;
    },
    dialog(val) {
      // unalloc center
      this.$store
        .dispatch("fetchUnAllocatedCenterData", this.searchParam)
        .then((data) => {
          console.log("unallo cen", data);
        });
      // unalloc coll sub
      this.$store
        .dispatch("fetchUnAllocatedCenterSubjectWiseData", this.searchParam)
        .then((data) => {
          console.log("unallo colll", data);
        });
      //college formfillup groupby college (exam&year wise college)
      if (
        this.getCenterAllocationSchema.exam_code &&
        this.getCenterAllocationSchema.year
      ) {
        this.noDataText = "Please wait, We are fetching the Paper data";
        //this.getCollgeCode();
      }
      if (!val) this.close();
    },
    submitStatus1(val) {
      console.log(val);
      this.dialog2 = val;
    },
    dialog2(val) {
      if (!val) this.close();
    },
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamCASchema = true;
    this.ifYearCASchema = true;
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.full = true;
    this.searchParam.admitcard = false;
    this.searchParam.final = true;
    this.noDataText = "No Data Available";
    this.$store.dispatch(
      "searchFormFillupCollegeWiseDetails",
      this.searchParam
    );
    //all  list
    // this.$store.dispatch("fetchCenterAllocationData");
    //exam
    // if (!this.$store.getters.getExamItem.length) {
    //   // console.log("----> ");
    //   this.$store.dispatch("fetchExamData");
    // }
    this.searchParam.limit = -1;

    //center
    if (!this.$store.getters.getCenterItem.length) {
      // console.log("----> ");
      this.$store.dispatch("callCenterData", this.searchParam).then((data) => {
        console.log("ten cen", data);
      });
    }
    let param = {
      limit: -1,
    };

    //college
    if (!this.$store.getters.getCollegeItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchCollegeWithStudentCount");
    }
    // //division
    // if (!this.$store.getters.getDivisionItems.length) {
    //   // console.log("----> ");
    //   this.$store.dispatch("fetchDivisionData");
    // }
    //district
    if (!this.$store.getters.getDistrictItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchDistrictData");
    }
    //year
    if (!this.$store.getters.getYearItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchYearData", param);
    }
    //degree

    this.$store.dispatch("fetchDegreeGroupList",param);

    this.publishActivityUpdating();
  },
  computed: {
    //all data
    getCenterAllocationList() {
      return this.$store.getters.getCenterAllocationItem;
    },
    //schema data
    getCenterAllocationSchema() {
      return this.$store.getters.getCenterAllocationSchema;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    //center
    getCenterList() {
      return this.$store.getters.getCenterItem;
    },
    //unalloc center
    getUnAllocationCenterItem() {
      return this.$store.getters.getUnAllocationCenterItem;
    },
    //unalloc center schema
    getUnAllocationSchema() {
      return this.$store.getters.getUnAllocationSchema;
    },
    //unalloc coll sub schema
    getUnAllocationCollSubSchema() {
      return this.$store.getters.getUnAllocationCollSubSchema;
    },
    //unalloc coll sub
    getUnAllocationCollSubItem() {
      return this.$store.getters.getUnAllocationCollSubItem;
    },
    // //college
    // getCollegeList() {
    //   return this.$store.getters.getCollegeItems;
    // },
    //form fill up groupby college (exam&year wise college)
    getCollegeList() {
      return this.$store.getters.getCollegeWiseStdCount;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },
    //degree
    getDegreeList() {
      return this.$store.getters.getDegreeGroupData;
    },
    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
  },
  methods: {
    showCollDetails() {
      this.unAllocCenterDialog = true;
    },
    closeCenter() {
      this.unAllocCenterDialog = false;
      //this.$store.commit("UNSET_UNALLOCATED_CENTER_SCHEMA");
    },
    closeCollSub() {
      this.unAllocCollSubDialog = false;
    },
    showCollSubDetails() {
      this.unAllocCollSubDialog = true;
    },
    publishActivityUpdating() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "CenterList";
      param.status = "1";
      this.$store.dispatch("publishActivity", param).then((data) => {
        this.publishState = data.publish_status;
      });
    },

    generateReport() {
      // console.log("..m clcik");
      // this.$store.commit("SET_LOADING", { color: "primary" });
      this.$refs.html2Pdf.generateReports();
      // setTimeout(() => {
      //   this.$store.commit("UNSET_LOADING"); // loading Closing
      // }, 5000);
    },
    setCenerCount() {
      try {
        let self = this;
        this.getCenterAllocationSchema.center.forEach((element) => {
          element.center_code = self.start_center_code++;
        });
        this.centerCodeDialog = false;
      } catch (ex) {
        console.log("ex ", ex);
      }
    },
    getCollgeCode() {
      var param = {
        exam_code: this.getCenterAllocationSchema.exam_code,
        year: this.getCenterAllocationSchema.year,
        exam_initiate_id: this.getExamInitiateId,
        division_id: this.division_code_selected,
        limit: -1,
      };
      console.log("pram ", param);
      var self = this;
      this.ifFetchingCollegeListDone = true;
      this.noDataText = "Please wait, We are fetching the Paper data";
      this.$store
        .dispatch("fetchFormFillupCollegeWiseSubjectWiseCount", param)
        .then((data) => {
          self.ifFetchingCollegeListDone = false;
          console.log("then e", data);
          if (data.length <= 0) {
            self.noDataText = "No Data Available";
          }
        });
      console.log("wtchif");
    },
    hideCollegesTableHeader(i) {
      console.log("----> i =", i);
      return true;
    },
    centerChange(val) {
      console.log(this.collegeCode + " CENTE RCHA", val);
      var self = this;
      var dat = this.getCenterList.forEach(function(item) {
        if (item.college_code == val) {
          self.selected_center_name = item.center_name;
          self.selected_center_capacity = item.student_capacity;
          self.responsible_principle = item.responsible_person;
          self.district_id = item.district_code;
          self.division_code_selected = item.division_code;
          self.selected_dist_name = item.district_name;
          console.log("ON center Changes item ", item);
          return item;
        }
      });
      // load college list
      this.getCollgeCode();
    },
    changeDistrict(val) {
      var self = this;
      var dat = this.getDistrictList.forEach(function(item) {
        if (item.dist_code == val) {
          self.selected_dist_name = item.district_name;
          return item;
        }
      });
    },
    validationForm1() {
      this.$validator.validateAll("form1").then((isValid) => {
        if (isValid) {
          this.selectedIndex >= 0 ? this.updateDetails() : this.addDetails();
        }
      });
    },
    validationFormAll() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.submitCenterAllocation();
        }
      });
    },
    addDetails() {
      //console.log("col", this.center_id);
      console.log("selectedCollege", this.selectedCollege);
      var self = this;
      let customData; //Object.assign([], this.selectedCollege);
      let selectedCollege = JSON.parse(JSON.stringify(this.selectedCollege));
      try {
        var some = selectedCollege.forEach(function(entry) {
          self.selected_college_capacity += entry.student_count;
          //Find and calculate total selected degree or subject
          customData = self.processSelectedDegree(entry);
          console.log("Returnd CD", customData);
          entry.customDegree = self.customSelection ? customData : "";
        });
      } catch (ex) {
        console.log(" EX ", ex);
      }

      //this.selectedCollege[0].total = 10;
      console.log("SEL AFTER ", selectedCollege);

      this.getCenterAllocationSchema.center.push({
        center_code: this.start_center_code++,
        college_code: this.collegeCode,
        center_name: this.selected_center_name,
        student_capacity: this.selected_center_capacity,
        college: selectedCollege,
        college_capacity: this.selected_college_capacity,
        responsible_principle: this.responsible_principle,
        district_id: this.district_id,
        district_name: this.selected_dist_name,
        degrees: this.selectedDegree,
        //customDegree: this.customSelection ? customData : ""
      });
      console.log("add", this.getCenterAllocationSchema);
      this.submitStatus = true;
      this.clearData();
    },
    processSelectedDegree(college) {
      let data = [];
      let temp = {
        degree: "",
        subject: [],
      };
      try {
        let i = 0;
        console.log("College ", college);
        this.customSelection = false;
        college.degree_group.forEach((element) => {
          temp = {
            degree: "",
            subject: [],
          };
          //console.log("ELE ", element)
          if (element.selected) {
            temp.degree = element.degree_group_name;
            //console.log(element.subject.length+"  inside gropu ", element)

            for (let j = 0; j < element.subject.length; j++) {
              //console.log("inside sub ", element.subject[j])
              if (element.subject[j].selected) {
                //console.log("sub condition true GTP ",element.subject[j].subject_name)
                temp.subject.push(element.subject[j].subject_name);

                //console.log("sub condition true after psh ",temp)
              } else this.customSelection = true;
              //console.log("J ", j)
            }

            data.push(temp);
            temp = {};
          } else this.customSelection = true;
          i++;
        });
        console.log("FINAL ", data);
      } catch (ex) {
        console.log("ex ", ex);
      }
      return data;
      //console.log(this.customSelection+" after customSelection ", data);
    },

    submitCenterAllocation() {
      // console.log("save e", this.getCenterAllocationSchema);

      this.dataItem = this.getCenterAllocationSchema;
      //SET EXAM INITIATE ID
      this.dataItem.exam_initiate_id = this.getExamInitiateId;
      console.log("ROUT ...", JSON.stringify(this.dataItem));
      //return;
      var self = this;
      try {
        if (this.getCenterAllocationSchema.id > 0) this.editCenterAllocation();
        else {
          this.$store
            .dispatch("saveCenterAllocationData", this.dataItem)
            .then(() => {
              //this.$router.push("/center-allocation");
              let param = self.searchParam;
              self.close();
              self.$store.dispatch("searchCenterAllocationData", param);
              // self.searchCenterAllocationList();
              // self.$store.dispatch("fetchCenterAllocationData");
              //this.centerAllocation = false;
            });
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    editCenterAllocation() {
      var self = this;
      this.$store
        .dispatch("editCenterAllocationData", this.dataItem)
        .then(() => {
          let param = self.searchParam;
          self.close();
          self.$store.dispatch("searchCenterAllocationData", param);
          //this.$router.push("/center-allocation");
        });
    },
    editItem(item, index) {
      console.log("Edit item editItem(): ", item);
      this.editedMode = true;
      this.selectedIndex = index;
      this.selectedItem = item;
      this.selectedCollege = item.college;
      this.selectedDegree = item.degrees;
      this.center_id = item.center_code;
      this.responsible_principle = item.responsible_principle;
      this.district_id = item.district_id;
      this.selected_dist_name = item.district_name;
      this.selected_center_name = item.center_name;
      this.selected_center_capacity = item.student_capacity;
      this.collegeCode = item.college_code;
      this.division_code_selected = item.division_id;
      // this.selected_college_capacity = item.college_capacity;

      // load college list
      this.getCollgeCode();
    },
    updateDetails() {
      console.log("In update ", this.selectedCollege);
      //this.selected_college_capacity = 0;
      var self = this;
      let customData;
      var some = this.selectedCollege.forEach(function(entry) {
        self.selected_college_capacity =
          self.selected_college_capacity + entry.student_count;
        console.log(".entry.total  CD", entry.student_count);
        //Find and calculate total selected degree or subject
        customData = self.processSelectedDegree(entry);

        entry.customDegree = self.customSelection
          ? customData
          : entry.customDegree;
      });
      //Find and calculate total selected degree or subject
      //let customData = this.processSelectedDegree(this.selectedCollege);

      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].center_code = this.center_id;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].center_name = this.selected_center_name;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].college = this.selectedCollege;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].degrees = this.selectedDegree;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].responsible_principle = this.responsible_principle;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].district_id = this.district_id;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].district_name = this.selected_dist_name;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].student_capacity = this.selected_center_capacity;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].college_capacity = this.selected_college_capacity;
      this.submitStatus = true;
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].customDegree = this.customSelection ? customData : "";
      this.getCenterAllocationSchema.center[
        this.selectedIndex
      ].college_code = this.collegeCode;

      console.log(
        "AFTER EDIT ",
        this.getCenterAllocationSchema.center[this.selectedIndex]
      );
      this.clearData();
    },
    deleteItem(item, index) {
      this.getCenterAllocationSchema.center.splice(index, 1);
    },
    clearData() {
      this.selectedIndex = -1;
      this.editedMode = false;
      this.center_id = "";
      this.selectedCollege = [];
      this.selectedDegree = [];
      this.responsible_principle = "";
      this.district_id = "";
      this.selected_college_capacity = 0;
      this.selected_center_capacity = 0;
      this.collegeCode = "";
      this.$validator.reset();
    },
    searchCenterAllocationList() {
      this.$store.dispatch("searchCenterAllocationData", this.searchParam);
    },
    close() {
      this.$emit("update:centerAllocation", false);
      this.$emit("update:submitStatus1", false);
      this.submitStatus = false;
    },
    setDegreeData(item) {
      //console.log("selectedCollege :- ", JSON.stringify(this.selectedCollege));
      this.degreeDataList = item[0].degree_group;
      //console.log("this.degree ", this.degreeDataList);
    },
    setSubjectData(item) {
      //console.log("subject", item);
      this.subjectDataList = item[0].subject;
    },
    setCollegeTotal(item, chk = "") {
      //console.log("collge total", item);
      let total = 0;
      item.degree_group.forEach((element) => {
        element.subject.forEach((sub) => {
          if (sub.selected) {
            total = parseInt(total) + parseInt(sub.student_count);
          }
        });
      });
      item.student_count = total;
      this.selectedCollege.forEach((element) => {
        if (element.college_code == item.college_code) {
          element.student_count = total;
          console.log("Coll total ", element);
        }
      });
    },
    setAllSubject(item, i) {
      //console.log("I", i);
      console.log("item", item);
      i.subject.forEach((element) => {
        element.selected = i.selected;
      });
      this.setCollegeTotal(item);
    },
    getSelectedDegreeGroupData(item) {
      console.log("getSelectedDegreeGroupData : ", item);
      console.log("selected Coll Data  : ", this.selectedCollege);
      let degree_group;

      this.selectedCollege.forEach((element) => {
        console.log(element.college_code + "==", item.college_code);
        if (element.college_code == item.college_code)
          item.degree_group = element.degree_group;
      });
      console.log("DEG", degree_group);
      return item.degree_group;
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
.CATCSS {
  border-style: solid !important;
  border-width: thin;
}
.CATCSS_r {
  border-top-style: solid !important;
  border-bottom-style: solid !important;
  border-width: thin;
}
.CATCSS_l {
  border-top-style: solid !important;
  border-bottom-style: solid !important;
  border-width: thin;
}
.CTCSS_r {
  border-top-style: solid !important;
  border-bottom-style: solid !important;
  border-width: thin;
}
.CTCSS_l {
  border-top-style: solid !important;
  border-bottom-style: solid !important;
  border-right-style: solid !important;
  border-width: thin;
}
.CTH-CSS {
  /* border-top-style: solid !important;
  border-bottom-style: solid !important; */
  border-right-style: solid !important;
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
