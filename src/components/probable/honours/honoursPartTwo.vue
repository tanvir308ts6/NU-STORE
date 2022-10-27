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
            >Generate Probable For Bachelor Degree Honours
            Part-2</v-toolbar-title
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
                      <!--<small
                                                class="red&#45;&#45;text font-weight-medium">(Session Wise)</small>-->
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
                            <v-flex md4>
                              <v-select
                                v-model="getSchema.regular_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="getSchema.regular_grade"
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-text-field
                                v-model="getSchema.first_year_exam_code"
                                label="First Year Exam Code"
                                disabled
                              ></v-text-field>
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
                                v-model="getSchema.irregular_exam_2ndyear"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex>

                            <v-flex md4>
                              <v-select
                                v-model="
                                  getSchema.second_year_irregular_promoted_grade
                                "
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
                                v-model="getSchema.improve_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex md4>
                              <v-select
                                v-model="getSchema.improve_year"
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

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import probableSlotList from "@/views/probableList/formFillupDetails";
import studentList from "@/components/probable/studentList.vue";

Vue.use(VeeValidate);

export default {
  components: {
    probableSlotList,
    studentList
  },
  props: ["dialogStatus", "studentData"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    e1: 0,
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
      "PROMOTED",
      "NOT PROMOTED"
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.honoursSecondYear;
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
        exam_id: `${this.studentData.id}`
      });
      const data = Object.entries(formData).reduce(
        (a, [k, v]) => (v ? { ...a, [k]: v } : a),
        {}
      );
      const isEmpty = !Object.values(item).some(x => x !== null && x !== "");
      if (!isEmpty) {
        this.$store
          .dispatch("generateProbableHonoursPartTwo", data)
          .then(function(data) {
            try {
              self.close();
              self.$store.dispatch("fetchAllExamsnData");
              Object.keys(item).forEach(function(key, index) {
                item[key] = "";
              });
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
  }
};
</script>

<style scoped></style>
