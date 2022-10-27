<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title v-if="getExamInfo[0]">
            {{ getSchemaExamCode }}-{{ getExamInfo[0].exam_name }}-{{
              getExamInfo[0].exam_year
            }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap class="mt-auto">
              <v-flex xs12 sm12 md12>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step editable :complete="e1 > 1" step="1"
                      >Regular</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step editable :complete="e1 > 2" step="2"
                      >Irregular (Not Promoted/Absent)</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step editable :complete="e1 > 3" step="3"
                      >Improvement (Promoted/C Promoted)
                      <!-- <small class="red--text font-weight-medium" >(Session Wise)</small > -->
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <template>
                        <!-- <div class="title font-weight-medium indigo&#45;&#45;text mb-4">
                                                     <span class="ml-2">Regular Student</span>
                                                 </div>-->
                        <!-- <v-spacer class="pa-3"></v-spacer> -->
                        <v-container fluid grid-list-xl>
                          <v-layout row wrap>
                            <v-flex md12>
                              <!-- :clearable="true" -->
                              <v-select
                                required
                                v-model="getSchema.regular_ac_session"
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
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
                          <!-- <v-flex md4>
                              <v-select
                                :clearable="true"
                                v-model="getSchema.irregular_exam_year"
                                :items="getSchemaExamYear"
                                item-text="exam_year"
                                item-value="exam_year"
                                label="Select Exam Year"
                                multiple
                              ></v-select>
                            </v-flex> -->
                          <v-layout
                            row
                            wrap
                            v-for="(slot, ir_index) in getSchema.irregular"
                            :key="ir_index"
                          >
                            <v-flex md4>
                              <!-- :clearable="true" -->
                              <v-select
                              required
                                v-model="
                                  getSchema.irregular[ir_index]
                                    .irregular_ac_session
                                "
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                item-status="result_type"
                                label="Select Academic Session"
                                @change="
                                  getResultType($event, ir_index, 'irregular')
                                "
                              ></v-select>
                            </v-flex>
                            <v-flex
                              md4
                              v-if="
                                getSchema.irregular[ir_index]
                                  .irregular_result_type == 1
                              "
                            >
                              <v-select
                                :clearable="true"
                                v-model="
                                  getSchema.irregular[ir_index].irregular_grade
                                "
                                :items="grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex
                              md4
                              v-if="
                                getSchema.irregular[ir_index]
                                  .irregular_result_type == 2
                              "
                            >
                              <v-text-field
                                :clearable="true"
                                v-model="
                                  getSchema.irregular[ir_index].irregular_mark
                                "
                                label="Bellow Mark"
                                multiple
                              ></v-text-field>
                            </v-flex>
                            <v-flex md1>
                              <!-- v-if="ir_index" -->
                              <v-btn
                                fab
                                dark
                                small
                                color="red"
                                @click="getSchema.irregular.splice(ir_index, 1)"
                              >
                                <v-icon dark align="right">clear </v-icon>
                              </v-btn>
                            </v-flex>
                          </v-layout>
                          <v-flex md2>
                            <v-btn
                              fab
                              dark
                              small
                              color="info"
                              @click="addMore('irregular')"
                            >
                              <v-icon dark>add</v-icon>
                            </v-btn>
                          </v-flex>
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
                        <v-spacer class="pa-3"></v-spacer>
                        <v-container fluid grid-list-xl>
                          <v-layout
                            row
                            wrap
                            v-for="(improvement,
                            im_index) in getSchema.improvement"
                            :key="im_index"
                          >
                            <v-flex md4>
                              <v-select
                                :clearable="true"
                                v-model="
                                  getSchema.improvement[im_index]
                                    .improve_session
                                "
                                :items="getSchemaSession"
                                item-text="ac_session"
                                item-value="ac_session"
                                label="Select Academic Session"
                                @change="
                                  getResultType($event, im_index, 'improvement')
                                "
                              ></v-select>
                            </v-flex>
                            <slot v-if="getSchemaExamCode == 3302">
                              <v-flex md2>
                                <v-text-field
                                  v-model="
                                    getSchema.improvement[im_index]
                                      .improve_pass_cgpa
                                  "
                                  label="Max CGPA"
                                  data-vv-name="improvement_pass_cgpa"
                                ></v-text-field>
                              </v-flex>
                            </slot>

                            <v-flex
                              md4
                              v-if="
                                getSchema.improvement[im_index]
                                  .improve_result_type == 1
                              "
                            >
                              <v-select
                                :clearable="true"
                                v-model="
                                  getSchema.improvement[im_index].improve_grade
                                "
                                :items="imp_grades"
                                label="Select Grade"
                                multiple
                              ></v-select>
                            </v-flex>
                            <v-flex
                              md4
                              v-if="
                                getSchema.improvement[im_index]
                                  .improve_result_type == 2
                              "
                            >
                              <v-text-field
                                :clearable="true"
                                v-model="
                                  getSchema.improvement[im_index].improve_mark
                                "
                                label="Bellow Mark"
                                multiple
                              ></v-text-field>
                            </v-flex>
                            <v-flex md1>
                              <!-- v-if="im_index" -->
                              <v-btn
                                fab
                                dark
                                small
                                color="red"
                                @click="
                                  getSchema.improvement.splice(im_index, 1)
                                "
                              >
                                <v-icon dark align="right">clear </v-icon>
                              </v-btn>
                            </v-flex>
                          </v-layout>
                          <v-flex md2>
                            <v-btn
                              fab
                              dark
                              small
                              color="info"
                              @click="addMore('improvement')"
                            >
                              <v-icon dark align="left">add</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-container>
                        <v-spacer class="pa-3"></v-spacer>
                      </template>
                      <div class="justify-center layout px-0">
                        <v-btn color="success" @click="save">Submit</v-btn>
                        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
                      </div>
                    </v-stepper-content>
                    <!-- <br /> -->
                  </v-stepper-items>
                </v-stepper>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <probableSlotList ref="probableSlotList"></probableSlotList>
        <studentList></studentList>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// @ts-nocheck

import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

//import probableSlotList from "@/components/probable/slotWiseProbableList.vue";
import probableSlotList from "@/views/probableList/formFillupDetails";
import studentList from "@/components/probable/studentList.vue";

export default {
  name: "DefaultProbableForm",
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
    // grades: ["A+", "A", "A-", "B+", "B", "B-", "C", "D", "F"],
    grades: ["C", "D", "F"],
    // imp_grades: ["C", "D"]
    imp_grades: ["C", "D", "F"]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.probableSlotSchema;
    },
    getExamInfo() {
      return this.$store.getters.getAllExamMaster;
    },
    getSchemaSession() {
      //return this.$store.getters.getAcSessionData;
      return this.$store.getters.getSlotAcSession;
    },
    getSchemaExamYear() {
      return this.$store.getters.getAllExamYear;
    },
    getSchemaExamCode() {
      return this.$store.getters.getLoggedInExam.code;
    }
  },

  mounted() {
    this.setResultType();
  },

  methods: {
    addMore(slot) {
      var obj = {};
      if (slot === "irregular") {
        //this.getSchema.irregular.push({});
        obj["irregular_result_type"] = "";
        this.getSchema.irregular.push(obj);
      } else if (slot === "improvement") {
        // var obj = {};
        obj["improve_result_type"] = "";
        this.getSchema.improvement.push({});
      }
    },
    getResultType(event, index, slot) {
      console.log("sessions", this.getSchemaSession);
      const session = this.getSchemaSession;
      const result_type = session.find(element => element.ac_session === event)
        .result_type;

      let targetArray = "";

      if (slot === "irregular") {
        targetArray = this.$store.getters.probableSlotSchema.irregular;
        targetArray[index].irregular_result_type = result_type;
      } else if (slot === "improvement") {
        targetArray = this.$store.getters.probableSlotSchema.improvement;
        targetArray[index].improve_result_type = result_type;
      }

      // Get result type from backend

      // const conditions = {
      //   exam_code: this.$store.getters.getLoggedInExam.code,
      //   ac_session: event
      // };

      // this.$store
      //   .dispatch("getResultType", conditions)
      //   .then(function(response) {
      //     try {
      //       let result_type = response;
      //       if (index !== -1) {
      //         if (slot === "irregular") {
      //           targetArray[index].irregular_result_type = result_type;
      //         } else if (slot === "improvement") {
      //           targetArray[index].improve_result_type = result_type;
      //         }
      //       }
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   });
    },
    setResultType() {
      this.$store.getters.probableSlotSchema.irregular = [];
      var obj = {};
      //obj["irregular_result_type"] = "";
      this.$store.getters.probableSlotSchema.irregular.push(obj);

      // Improvement
      this.$store.getters.probableSlotSchema.improvement = [];
      var obj2 = {};
      //obj2["improve_result_type"] = "";
      this.$store.getters.probableSlotSchema.improvement.push(obj2);
    },
    save() {
      let self = this;
      let item = this.getSchema;
      const formData = Object.assign(this.getSchema, {
        exam_id: `${this.studentData.id}`,
        exam_code: `${this.$store.getters.getLoggedInExam.code}`,
        exam_year: `${this.$store.getters.getLoggedInYear.year}`
      });
      const data = Object.entries(formData).reduce(
        (a, [k, v]) => (v ? { ...a, [k]: v } : a),
        {}
      );
      const isEmpty = !Object.values(item).some(x => x !== null && x !== "");

      if (!isEmpty) {
        this.$store
          .dispatch("generateProbableCriteria", data)
          .then(function(data) {
            try {
              //self.$children.refresh();
              self.$refs.probableSlotList.refresh();
              self.setResultType();
              //self.close();
              // self.$store.dispatch("fetchAllExamsnData");
              // Object.keys(item).forEach(function(key, index) {
              //   item[key] = "";
              // });
              //self.$router.push('pbl-slot-wise');
            } catch (ex) {
              console.log(ex);
            }
          })
          .catch(function(error) {
            console.log(error);
            // self.$store.dispatch("fetchAllExamsnData");
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
    // this.$store.dispatch("fetchSessionData");
    // this.$store.dispatch("fetchExamYearData");
  }
  // updated() {
  //   let self = this;
  //   //console.log(self.$children.refresh());
  // },
};
</script>

<style scoped></style>
