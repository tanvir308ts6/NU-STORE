<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Exam Committee Meeting</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-flex xs12 md12>
            <v-card>
              <v-layout row wrap align-center>
                <v-flex xs12 sm12 offset-sm0>
                  <v-card class="pl-3">
                    <v-card-title class="headline"
                      >Exam Committee Meeting Information</v-card-title
                    >
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4 lg6>
                        <v-select
                          class="ml-2 mr-2"
                          name="exam_committee_id"
                          label="Select Exam Committee"
                          v-validate="'required'"
                          :error-messages="errors.collect('committee_name')"
                          :items="getExamCommittee"
                          item-text="committee_name"
                          item-value="id"
                          data-vv-name="committee_name"
                          v-model="formData.exam_committee_id"
                          @change="getMembers"
                          required
                          prepend-icon="edit"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md4 lg6>
                        <v-text-field
                          class="ml-2 mr-2"
                          name="meeting_name"
                          label="Meeting Title"
                          v-validate="'required'"
                          data-vv-name="name"
                          :error-messages="errors.collect('name')"
                          v-model="formData.meeting_name"
                          required
                          prepend-icon="edit"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4 lg6>
                        <v-text-field
                          class="ml-2 mr-2"
                          name="place"
                          label="Meeting Place"
                          v-validate="'required'"
                          data-vv-name="place"
                          :error-messages="errors.collect('place')"
                          v-model="formData.place"
                          required
                          prepend-icon="edit"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md3 lg3>
                        <v-menu
                          ref="dateMenu1"
                          v-model="dateMenu1"
                          :close-on-content-click="true"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="formData.meeting_date"
                              label="Meeting Date"
                              persistent-hint
                              prepend-icon="event"
                              v-validate="'required'"
                              :error-messages="errors.collect('date')"
                              data-vv-name="date"
                              required
                              name="date"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>

                          <v-date-picker
                            v-model="formData.meeting_date"
                            no-title
                            @input="dateMenu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs3 md3 lg3>
                        <v-menu
                          ref="menu"
                          v-model="dateMenu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="formData.meeting_time"
                              label="Meeting Time"
                              readonly
                              v-on="on"
                              prepend-icon="access_time"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-model="formData.meeting_time"
                            full-width
                            @input="dateMenu2 = true"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs12 md4 lg6>
                        <v-textarea
                          class="ml-2 mr-2"
                          name="agenda"
                          label="Meeting Agenda"
                          v-validate="'required'"
                          data-vv-name="agenda"
                          :error-messages="errors.collect('agenda')"
                          v-model="formData.agenda"
                          required
                          prepend-icon="edit"
                        ></v-textarea>
                      </v-flex>
                      <v-flex xs12 md4 lg6>
                        <v-textarea
                          class="ml-2 mr-2"
                          name="decision"
                          label="Meeting Decision"
                          v-validate="'required'"
                          data-vv-name="decision"
                          :error-messages="errors.collect('decision')"
                          v-model="formData.decision"
                          required
                          prepend-icon="edit"
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-spacer class="pb-4"></v-spacer>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>

            <v-spacer class="ma-4"></v-spacer>

            <v-card v-if="getSchema.length > 0">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex md12>
                    <v-toolbar color="cyan darken-4" class="white--text" dense>
                      <v-toolbar-title class="text-uppercase"
                        >Member Present/Attend
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <template>
                      <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="getSchema"
                        item-key="id"
                        select-all
                        class="elevation-1"
                        hide-actions
                        style="white-space: nowrap"
                      >
                        <template v-slot:items="props">
                          <td>
                            <v-checkbox
                              v-model="props.selected"
                              primary
                              hide-details
                              @change="getSelectedMember(props.item)"
                            ></v-checkbox>
                          </td>
                          <td>{{ props.item.index_no }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>
                            <slot v-if="props.item.reg_type == 1">
                              {{ designations(props.item.designation) }}
                            </slot>
                            <slot v-if="props.item.reg_type == 2">
                              {{
                                orgDesignations(props.item.teacher_designation)
                              }}
                            </slot>
                          </td>
                          <td>
                            <slot v-if="props.item.reg_type == 1">
                              {{
                                props.item.colleges
                                  ? `${props.item.colleges.college_code}-` +
                                    " " +
                                    props.item.colleges.college_name
                                  : ""
                              }}
                            </slot>
                            <slot v-if="props.item.reg_type == 2">
                              {{ orgName(props.item.teacher_organization) }}
                            </slot>
                          </td>
                          <td>
                            {{ props.item.email }}
                          </td>
                          <td>
                            {{ props.item.mobile }}
                          </td>
                          <td>
                            {{ orgType(props.item.organization_type) }}
                          </td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <div class="justify-center layout px-0 mt-2">
                  <v-btn
                    v-if="selected.length > 0"
                    color="primary"
                    dark
                    @click="memberAllocate()"
                    >Submit
                  </v-btn>
                </div>
              </v-card-actions>
              <v-spacer class="pb-4"></v-spacer>
            </v-card>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from "moment";
import commonGet from "../../../mixin/common_getters_mixin";
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  mixins: [commonGet],
  props: ["dialogStatus"],

  data: () => ({
    dialog: false,
    selected: [],
    selectedMember: [],
    searchParam: {},
    formData: {},
    dateMenu1: false,
    dateMenu2: false,

    headers: [
      { text: "Index No.", align: "left", value: "index_no" },
      { text: "Name", align: "left", value: "name" },
      { text: "Designation", align: "left", value: "designation" },
      { text: "College code & name", align: "left", value: "college_code" },
      { text: "Email", align: "left", value: "email" },
      { text: "Mobile", align: "left", value: "mobile" },
      { text: "Organization", align: "left", value: "organization_type" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getEcMemberList;
    },
    getExamCommittee() {
      return this.$store.getters.getExmCommitteeList;
    },
    designationArrData() {
      return this.$store.getters.getSchemaDesignation;
    },
    designationProfArrData() {
      return this.$store.getters.getSchemaProfDesignation;
    },
    orgTypeArrData() {
      return this.$store.getters.getSchemaOrgType;
    },
    orgArrData() {
      return this.$store.getters.getSchemaOrganization;
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      if (val) this.getEcDataFromApi();
    },
    dialog(val) {
      if (!val) this.close();
    },
    getLoggedInExam(val) {
      this.searchParam.exam_code = val.code;
    },
    getLoggedInYear(val) {
      this.searchParam.exam_year = val.year;
    }
  },

  created() {},

  methods: {
    getSelectedMember() {
      this.selectedMember = this.selected;
    },

    designations(item) {
      const result = this.designationArrData.find(({ id }) => id == item);
      return result ? result.name : "";
    },
    orgDesignations(item) {
      const result = this.designationProfArrData.find(({ id }) => id == item);
      return result ? result.name : "";
    },
    orgName(name) {
      const result = this.orgArrData.find(({ id }) => id == name);
      return result ? result.name : "";
    },

    orgType(org) {
      const result = this.orgTypeArrData.find(({ id }) => id == org);
      return result ? result.name : "";
    },

    getMembers(committee) {
      if (committee) {
        const committee_id = { committee_id: committee };
        this.$store.dispatch("fetchEcWiseMembers", committee_id).then(data => {
          this.selected = data;
        });
      }
    },

    getEcDataFromApi() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.$store
        .dispatch("fetchExmCommitteeList", this.searchParam)
        .then(data => {});
    },

    memberAllocate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let self = this;
          let arr =
            this.selectedMember.length > 0
              ? this.selectedMember
              : this.selected;
          let item = this.formData;
          this.searchParam.exam_code = this.getLoggedInExam.code;
          this.searchParam.exam_year = this.getLoggedInYear.year;

          let memberArr = [];
          arr.forEach(item => {
            memberArr.push({
              id: item.id,
              subject_code: item.subject_code
            });
          });
          const exMembers = JSON.stringify(memberArr);

          const fd = {
            committee: this.formData.exam_committee_id,
            meeting_name: this.formData.meeting_name,
            place: this.formData.place,
            agenda: this.formData.agenda,
            decision: this.formData.decision,
            meeting_date: this.formData.meeting_date,
            meeting_time: this.formData.meeting_time,
            exam_code: this.getLoggedInExam.code,
            exam_year: this.getLoggedInYear.year,
            members: exMembers
          };

          this.$store
            .dispatch("saveEcmMember", fd)
            .then(function(data) {
              try {
                self.close();
                self.$store.dispatch(
                  "fetchExmCommitteeMeetingList",
                  self.searchParam
                );
                self.$validator.reset();
                Object.keys(item).forEach(function(key, index) {
                  item[key] = "";
                });
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function(error) {
              console.log(error);
              self.$store.dispatch(
                "fetchExmCommitteeMeetingList",
                self.searchParam
              );
            });
        }
      });
    },

    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  }
};
</script>

<style scoped></style>
