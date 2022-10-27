<template>
  <v-container fluid>
    <v-expansion-panel v-if="false" class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout column class="mx-5">
          <v-flex class="mx-3">
            <v-layout row wrap align-center>
              <!-- {{getLoggedInExam}} -->
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                  prepend-icon="store_mall_directory"
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
                  prepend-icon="calendar_today"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- <v-flex xs12 sm6 md6>
                  <v-text-field
                    outline
                    v-model="searchParam.reg_no"
                    class="ma-3"
                    name="rg_no"
                    menu-props="auto"
                    label="Registration Number"
                    prepend-icon="edit"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    outline
                    class="ma-2"
                    name="code"
                    label="College Code"
                    v-model="searchParam.college_code"
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>-->
                <!-- <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    hide-details
                    v-model="searchParam.session_year"
                    :item-text="item => item.session"
                    item-value="session_year"
                    :items="getSessionList"
                    menu-props="auto"
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
                </v-flex>-->

                <!-- <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.paper_code"
                    :items="getPaperList"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    label="Select paper"
                    persistent-hint
                    prepend-icon="library_books"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removePaper(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        '(' + data.item.code + ') ' + data.item.title
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
                </v-flex>-->
                <!-- <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-2"
                    v-model="searchParam.subject_code"
                    :items="getSubjectList"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    label="Select Subject"
                    persistent-hint
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
                        '(' + data.item.code + ') ' + data.item.title
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
                </v-flex>-->
                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    :disabled="ifCenterUser"
                    class="ma-2"
                    v-model="searchParam.center_code"
                    :item-text="
                      item => item.center_code + '- ' + item.center_name
                    "
                    item-value="center_code"
                    :items="getPracticalCenterList"
                    menu-props="auto"
                    label="Select Center"
                    prepend-icon="list"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="removeCenter(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                          "(" +
                            data.item.center_code +
                            ") " +
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
                </v-flex>
                <!-- <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-3"
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
                      >{{ '(' + data.item.code + ') ' + data.item.title }}</v-chip>
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
                <!-- <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    outline
                    class="ma-3"
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
                        '(' +
                        data.item.degree_group_code +
                        ') ' +
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
                <!-- <v-flex xs12 sm6 md6>
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
                        outline
                        class="ma-2"
                        v-model="searchParam.attendance_date"
                        label="Exam date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="searchParam.attendance_date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>-->
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 class="my-3">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchPracticalWantList">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <practicalWantingListByCenter />
  </v-container>
</template>

<script>
import practicalWantingListByCenter from "@/components/practicalVivaExam/practicalWantingList/practicalWantingListByCenter.vue";
export default {
  components: {
    practicalWantingListByCenter
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  watch: {}
};
</script>
<style scoped></style>
