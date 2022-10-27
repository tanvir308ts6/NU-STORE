<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>New Exam Committee</v-toolbar-title>
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
                      >Exam Committee Name & Subject</v-card-title
                    >
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4 lg6>
                        <v-text-field
                          class="ml-2 mr-2"
                          name="committee_name"
                          label="Exam Committee Name"
                          v-validate="'required'"
                          data-vv-name="name"
                          :error-messages="errors.collect('name')"
                          v-model="getEditFromData.committee_name"
                          required
                          prepend-icon="edit"
                        ></v-text-field>
                      </v-flex>
                      <!-- <v-flex xs12 md4 lg6>
                        <v-select
                          class="ml-2 mr-2"
                          name="subject_code"
                          label="Select Subject"
                          v-validate="'required'"
                          :error-messages="errors.collect('subject')"
                          :items="getSubjects"
                          item-text="subject_name"
                          item-value="subject_code"
                          data-vv-name="subject"
                          v-model="getEditFromData.subject_code"
                          @change="getMembers"
                          required
                          prepend-icon="edit"
                        ></v-select>
                      </v-flex> -->
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
                        >Exam Committee Members
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <template>
                      <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="getSchema"
                        item-key="name"
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
                          <td class="text-xs-left">{{ props.item.name }}</td>
                          <td class="text-xs-left">
                            <v-select
                              v-model="props.item.member_designation"
                              :items="getCommiteeRoles"
                              item-text="name"
                              item-value="id"
                              label="Select"
                              data-vv-name="designation"
                              @change="getSelectedDeg(props.item, $event)"
                            ></v-select>
                          </td>
                          <td class="text-xs-left">
                            <slot v-if="props.item.reg_type == 1">
                              {{ designations(props.item.designation) }}
                            </slot>
                            <slot v-if="props.item.reg_type == 2">
                              {{
                                orgDesignations(props.item.teacher_designation)
                              }}
                            </slot>
                          </td>
                          <td class="text-xs-left">
                            <slot v-if="props.item.teacher_organization">
                              {{ orgName(props.item.teacher_organization) }}
                            </slot>
                            <slot v-else>
                              {{
                                props.item.colleges
                                  ? `${props.item.colleges.college_code}-` +
                                    " " +
                                    props.item.colleges.college_name
                                  : ""
                              }}
                            </slot>
                          </td>
                          <td class="text-xs-left">
                            {{ props.item.email }}
                          </td>
                          <td class="text-xs-left">
                            {{ props.item.mobile }}
                          </td>
                          <td class="text-xs-left">
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
                    >Update
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
import commonGet from "../../mixin/common_getters_mixin";
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  props: ["dialogStatus", "editedData"],
  mixins: [commonGet],

  data: () => ({
    dialog: false,
    selected: [],
    searchParam: {},
    formData: {},

    headers: [
      { text: "Index No.", align: "left", value: "index_no" },
      { text: "Name", align: "left", value: "name" },
      { text: "Committe Role", align: "left", value: "name" },
      { text: "Designation", align: "left", value: "designation" },
      { text: "Institute", align: "left", value: "college_code" },
      { text: "Email", align: "left", value: "email" },
      { text: "Mobile", align: "left", value: "mobile" },
      { text: "Organization", align: "left", value: "organization_type" }
    ],
    selectedMember: [],
    selectDeg: ""
  }),

  computed: {
    getSchema() {
      let editArr = this.getEditFromData.selected;
      let stdArr = this.$store.getters.getSubjectWiseMemberList;
      let memberArr = [];
      if (editArr.length) {
        editArr.forEach(item => {
          stdArr.forEach(std => {
            if (item.member_details.id == std.id) {
              Object.assign(std, {
                member_designation: item.member_designation
              });
              memberArr.push(std);
            }
          });
        });
      }
      //console.log(memberArr);
      return this.$store.getters.getSubjectWiseMemberList;
      //return memberArr ? memberArr : this.$store.getters.getSubjectWiseMemberList;
    },
    getEditFromData() {
      return this.$store.getters.getExamCommitteeEditData;
    },
    getEditSelected() {
      let arr = this.getEditFromData.selected;
      let memberArr = [];
      arr.forEach(item => {
        memberArr.push(item.member_details);
      });
      return memberArr;
    },
    getSubjects() {
      return this.$store.getters.getAllSubjectGroup;
    },
    designationProfArrData() {
      return this.$store.getters.getSchemaProfDesignation;
    },
    designationArrData() {
      return this.$store.getters.getSchemaDesignation;
    },
    getCommiteeRoles() {
      return this.$store.getters.getCommiteeRoles;
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
      this.$store.commit("SET_EXM_COMMITTEE_EDIT_DATA", this.editedData);
      //this.getMembers(this.getEditFromData.subject_code);
      this.getMembers(this.getEditFromData.subject_code);
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

  created() {
    this.getSubjectDataFromApi();
  },

  methods: {
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

    /* memberDesignations(item) {
             let result = this.designationProfArrData.find(({id}) => id === item);
             return result;
             },*/

    // getMembers(subject_code) {
    //   if (subject_code) {
    //     const subject = { subject_code: subject_code };
    //     this.$store.dispatch("fetchSubjectWiseMember", subject).then(data => {
    //       this.selected =
    //         this.getEditSelected.length > 0 ? this.getEditSelected : data.data;
    //     });
    //   }
    // },
    getMembers() {
      const exam = { exam_code: this.getLoggedInExam.code };
      this.$store.dispatch("fetchSubjectWiseMember", exam).then(data => {
        this.selected =
          this.getEditSelected.length > 0 ? this.getEditSelected : data.data;
      });
    },

    getSubjectDataFromApi() {
      this.searchParam.exam_code = this.getLoggedInExam.code;
      this.searchParam.exam_year = this.getLoggedInYear.year;
      this.$store.dispatch("fetchAllDegreeBySubjects", this.searchParam);
    },

    getSelectedDeg(item, designation) {
      console.log(item);
      if (designation) {
        Object.assign(item, { prof_designation: designation });
      }
      console.log("item", item);
    },

    getSelectedMember() {
      this.selectedMember = this.selected;
    },

    memberAllocate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          let self = this;
          let item = this.getEditFromData;
          let arr =
            this.selectedMember.length > 0
              ? this.selectedMember
              : this.selected;
          this.searchParam.exam_code = this.getLoggedInExam.code;
          this.searchParam.exam_year = this.getLoggedInYear.year;
          let memberArr = [];
          console.log("arr", arr);
          arr.forEach((item, index) => {
            console.log("item", item, "index", index);
            memberArr.push({
              id: item.id,
              member_designation: this.getSchema[index].member_designation,
              subject_code: item.subject_code
            });
          });
          const exMembers = JSON.stringify(memberArr);
          console.log("members", exMembers);
          const fd = {
            id: this.getEditFromData.id,
            committee_name: this.getEditFromData.committee_name,
            subject_code: this.getEditFromData.subject_code,
            exam_code: this.getLoggedInExam.code,
            exam_year: this.getLoggedInYear.year,
            members: exMembers
          };

          console.log(fd);

          //console.log(myObjStr);
          this.$store
            .dispatch("updateExmCommitteeAllocatedMember", fd)
            .then(function(data) {
              try {
                self.close();
                self.$store.dispatch("fetchExmCommitteeList", self.searchParam);
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
              self.$store.dispatch("fetchExmCommitteeList", self.searchParam);
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
