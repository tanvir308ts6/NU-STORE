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
          <v-toolbar-title
            >
            {{ getExamInfo[0].exam_name }}-{{ getExamInfo[0].exam_year }}
            </v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap class="mt-auto">
              <v-flex xs12 sm12 md10 offset-md1>
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
                    <v-stepper-step editable :complete="e1 > 3" step="3"
                      >Improvement
                      <small class="red--text font-weight-medium"
                        >(Session Wise)</small
                      >
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <template>
                        <!-- <div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                     <span class="ml-2">Regular Student</span>
                                                 </div>-->
                        <v-spacer class="pa-3"></v-spacer>
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
                          </v-layout>
                        </v-container>
                        <v-spacer class="pa-3"></v-spacer>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Submit</v-btn>
                        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <template>
                        <!--<div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Irregular Student</span>
                                                </div>-->
                        <v-spacer class="pa-3"></v-spacer>
                        <v-container fluid grid-list-xl>
                          <v-layout row wrap>
                            <v-flex md4>
                              <v-select
                                v-model="getSchema.irregular_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.irregular_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.irregular_grade"
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <v-spacer class="pa-3"></v-spacer>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Submit</v-btn>
                        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <template>
                        <!--<div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                    <span class="ml-2">Improvement Student (Session Wise)</span>
                                                </div>-->
                        <v-spacer class="pa-3"></v-spacer>
                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_grade"
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <v-spacer class="pa-3"></v-spacer>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Submit</v-btn>
                        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
                      </div>
                    </v-stepper-content>
                    <br />
                  </v-stepper-items>
                </v-stepper>
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

//import probableSlotList from "@/components/probable/slotWiseProbableList.vue";
import probableSlotList from "@/views/probableList/formFillupDetails";
import studentList from "@/components/probable/studentList.vue";

export default {
  name:"DP1ProbableForm",
  props: ["dialogStatus", "studentData"],

  $_veeValidate: {
    validator: "new"
  },
components: {
    probableSlotList,
    studentList
  },
  data: () => ({
    dialog: false,
    e1: 0,
    //collect from database -->
    grades: [
      "A+",
      "A",
      "A-",
      "B+",
      "B",
      "B-",
      "C",
      "D",
      "F",
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.honoursFirstYear;
    },
    getExamInfo() {
      return this.$store.getters.getAllExamMaster;
    },
    getSchemaSession() {
      return this.$store.getters.getAcSessionData;
    },
    getSchemaExamYear() {
      return this.$store.getters.getAllExamYear;
    }
  },

  methods: {
    save() {
      let self = this;
      let item = this.getSchema;
      const formData = Object.assign(this.getSchema, {
        exam_id: `${this.studentData.id}`,
        exam_code: `${this.$store.getters.getLoggedInExam.code}`,
        exam_year: `${this.$store.getters.getLoggedInYear.year}`
      });
      const data = Object.entries(formData).reduce( (a, [k, v]) => (v ? { ...a, [k]: v } : a), {} );
      const isEmpty = !Object.values(item).some(x => x !== null && x !== "");

      if (!isEmpty) {
        this.$store
          .dispatch("generateProbableCriteria", data)
          .then(function(data) {
            try {
              //self.$children.refresh();
              self.$refs.probableSlotList.refresh();
              //self.close();
              self.$store.dispatch("fetchAllExamsnData");
              Object.keys(item).forEach(function(key, index) {
                item[key] = "";
              });
              //self.$router.push('pbl-slot-wise');
            } catch (ex) {
              console.log(ex);
            }
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchAllExamsnData");
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
    this.$store.dispatch("fetchSessionData");
    this.$store.dispatch("fetchExamYearData");
  },
  // updated() {
  //   let self = this;
  //   //console.log(self.$children.refresh());
  // },
};
</script>

<style scoped></style>
