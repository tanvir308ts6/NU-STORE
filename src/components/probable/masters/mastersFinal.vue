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
          <v-toolbar-title>Generate Probable For Masters Final</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap class="mt-auto">
              <v-flex xs12 sm12 md10 offset-md1>
                <v-toolbar color="cyan darken-4" class="white--text" dense>
                  <v-toolbar-title class="text-uppercase"
                    >Generate Probable
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step editable :complete="e1 > 1" step="1"
                      >Regular</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step editable :complete="e1 > 2" step="2"
                      >Irregular</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step editable :complete="e1 > 3" step="3">
                      Improvement
                      <small class="red--text font-weight-medium"
                        >(Session Wise)</small
                      >
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable :complete="e1 > 4" step="4">
                      Improvement
                      <small class="red--text font-weight-medium"
                        >(Exam Wise)</small
                      >
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step editable step="5">
                      Improvement Pass
                      <small class="red--text font-weight-medium"
                        >(Based On CGPA)</small
                      >
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <template>
                        <!-- <div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Regular Student</span>
                                                </div>-->
                        <v-container fluid grid-list-xl>
                          <v-layout row wrap>
                            <v-flex md12>
                              <v-select
                                v-model="getSchema.regular_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex md12>
                              <v-textarea
                                v-model="getSchema.reg_std_remarks"
                                name="input-7-4"
                                label="Remarks"
                                auto-grow
                                rows="1"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <!-- <v-spacer></v-spacer>-->
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Draft</v-btn>
                        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <template>
                        <!--<div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Irregular Student</span>
                                                </div>-->
                        <v-container fluid grid-list-xl>
                          <v-layout row wrap>
                            <v-flex md6>
                              <v-select
                                v-model="getSchema.irregular_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md6>
                              <v-select
                                v-model="getSchema.irregular_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex md12>
                              <v-textarea
                                v-model="getSchema.irr_std_remarks"
                                name="input-7-4"
                                label="Remarks"
                                auto-grow
                                rows="1"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Draft</v-btn>
                        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <template>
                        <!--<div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Improvement and Failed Student (Session Wise)</span>
                                                </div>-->

                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_fail_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_fail_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_fail_grade"
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md12>
                              <v-textarea
                                v-model="getSchema.improve_fail_remarks"
                                name="input-7-4"
                                label="Remarks"
                                auto-grow
                                rows="1"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Draft</v-btn>
                        <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <template>
                        <!-- <div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Improvement and Failed Student (Exam Wise)</span>
                                                </div>-->

                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex md6>
                              <v-select
                                v-model="getSchema.improve_fail_fixed_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex md6>
                              <v-select
                                v-model="getSchema.improve_fail_fixed_grade"
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex md12>
                              <v-textarea
                                v-model="getSchema.improve_fail_fixed_remarks"
                                name="input-7-4"
                                label="Remarks"
                                auto-grow
                                rows="1"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Draft</v-btn>
                        <v-btn color="primary" @click="e1 = 5">Continue</v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="5">
                      <template>
                        <!--<div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Improvement Student (Already Passed)</span>
                                                </div>-->

                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex md3>
                              <v-select
                                v-model="getSchema.improve_pass_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md3>
                              <v-text-field
                                v-model="getSchema.improve_pass_cgpa"
                                label="CGPA"
                                data-vv-name="improvement_pass_cgpa"
                              ></v-text-field>
                            </v-flex>

                            <v-flex md3>
                              <v-select
                                v-model="getSchema.improve_pass_grade"
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md3>
                              <v-text-field
                                v-model="getSchema.improve_pass_paper"
                                label="Maximum No. Papers"
                              ></v-text-field>
                            </v-flex>
                            <v-flex md12>
                              <v-textarea
                                v-model="getSchema.improve_pass_remarks"
                                name="input-7-4"
                                label="Remarks"
                                auto-grow
                                rows="1"
                              ></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Draft</v-btn>
                        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
                      </div>
                    </v-stepper-content>
                    <!--<div class="justify-center layout px-0">
                                            <v-btn color="success" @click="save">Draft</v-btn>
                                        </div>
                                        <br/>-->
                  </v-stepper-items>
                </v-stepper>
                <v-spacer class="pa-3"></v-spacer>
              </v-flex>

              <v-flex md12>
                <probableSlotList></probableSlotList>
                <studentList></studentList>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>// @ts-nocheck

import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
import commonGet from "../../../mixin/common_getters_mixin";
import probableSlotList from "@/components/probable/slotWiseProbableList.vue";
import studentList from "@/components/probable/studentList.vue";

export default {
  props: ["dialogStatus", "studentData"],
  mixins: [commonGet],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    probableSlotList,
    studentList
  },

  data: () => ({
    dialog: false,
    searchParam: {},
    e1: 0,
    grades: ["A+", "A", "A-", "B+", "B", "B-", "C", "D", "F"]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.initFromData;
    },
    getSchemaSession() {
      return this.$store.getters.getAcSession;
    },
    getSchemaExamYear() {
      return this.$store.getters.getExamYear;
    }
  },

  methods: {
    save() {
      let self = this;
      let item = this.getSchema;
      this.searchParam.exam_id = this.getExamInitiateId;

      const formData = Object.assign(this.getSchema, {
        exam_id: `${this.studentData.id}`
      });
      const isEmpty = !Object.values(item).some(x => x !== null && x !== "");

      if (!isEmpty) {
        this.$store
          .dispatch("generateProbableMasters", formData)
          .then(function(data) {
            try {
              //self.close();
              self.$store.dispatch("fetchAllExamsnData", self.searchParam);
              self.$store.dispatch("fetchProbableDetails", self.searchParam);
              self.$store.dispatch(
                "fetchProbableStudentDetailData",
                self.searchParam
              );
              Object.keys(item).forEach(function(key, index) {
                item[key] = "";
              });
            } catch (ex) {
              console.log(ex);
            }
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchAllExamsnData", self.searchParam);
          });
      } else {
        console.log("empty");
      }
    },

    close() {
      this.$emit("update:dialogStatus", false);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    this.$store.dispatch("fetchAcSessionData");
    this.$store.dispatch("fetchExamYearData");
  }
};
</script>

<style scoped>
.theme--light.v-stepper {
  border: 1px solid #7bc7cb;
}
</style>
