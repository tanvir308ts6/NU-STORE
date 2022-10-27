<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card>
      <v-card color="primary" flat>
        <v-card-title>
          <span class="headline white--text">{{ formTitle }}</span>

          <v-spacer></v-spacer>
          <v-btn
            fab
            class="ma-0 pa-0"
            small
            color="white black--text "
            @click="close"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-flex md6>
              <v-text-field
                name="paper_code"
                label="Paper Code"
                type="number"
                v-model="getSchema.paper_code"
                v-validate="'required'"
                :error-messages="errors.collect('paper_code')"
                data-vv-name="paper_code"
                required
                prepend-icon="edit"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="paper_name"
                label="Paper Name"
                v-model="getSchema.paper_name"
                v-validate="'required'"
                :error-messages="errors.collect('paper_name')"
                data-vv-name="paper_name"
                required
                prepend-icon="edit"
              ></v-text-field>
            </v-flex>

            <v-flex md6>
              <v-select
                name="paper_type"
                label="Paper Type"
                v-model="getSchema.paper_type"
                :items="getPaperType"
                item-text="paper_type"
                item-value="id"
                v-validate="'required'"
                :error-messages="errors.collect('paper_type')"
                data-vv-name="paper_type"
                required
                prepend-icon="edit"
              ></v-select>
            </v-flex>
            <v-flex md6>
              <v-select
                name="degree_code"
                label="Degree"
                v-model="getSchema.degree_code"
                :items="getDegrees"
                item-text="degree_display_name"
                item-value="degree_code"
                v-validate="'required'"
                :error-messages="errors.collect('degree_code')"
                data-vv-name="degree_code"
                @change="degreeGroupData"
                required
                prepend-icon="edit"
              ></v-select>
            </v-flex>

            <v-flex md6>
              <v-select
                name="degree_code"
                label="Degree Group"
                v-model="getSchema.degree_group_code"
                :items="getDegreeGroup"
                :item-text="
                  item => item.degree_group_code + '-' + item.degree_group_name
                "
                item-value="degree_group_code"
                v-validate="'required'"
                :error-messages="errors.collect('degree_group_code')"
                data-vv-name="degree_group_code"
                @change="getSubjectData"
                required
                prepend-icon="edit"
              ></v-select>
            </v-flex>
            <v-flex md6>
              <v-select
                name="subject_code"
                label="Subject"
                v-model="getSchema.subject_code"
                :items="getSubject"
                :item-text="item => item.subject_code + '-' + item.subject_name"
                item-value="subject_code"
                data-vv-name="subject_code"
                required
                prepend-icon="edit"
              ></v-select>
            </v-flex>

            <v-flex md6>
              <v-select
                name="exam_code"
                label="Exam"
                v-model="getSchema.exam_code"
                :items="getExams"
                :item-text="item => item.exam_code + '-' + item.exam_name"
                item-value="exam_code"
                v-validate="'required'"
                :error-messages="errors.collect('exam_code')"
                data-vv-name="exam_code"
                required
                prepend-icon="edit"
              ></v-select>
            </v-flex>
            <v-flex md6>
              <v-select
                name="paper_type_info_id"
                @change="
                  changeSifType(
                    getSchema.exam_code,
                    getSchema.subject_code,
                    getSchema.paper_type_info_id
                  )
                "
                label="Sif Type"
                v-model="getSchema.paper_type_info_id"
                :items="getAllPaperTypeInfo"
                item-text="name"
                item-value="id"
                v-validate="'required'"
                data-vv-name="paper_type_info_id"
                required
                prepend-icon="edit"
              ></v-select>
            </v-flex>
            <v-flex md6 v-if="getSchema.paper_type_info_id == 2">
              <v-select
                name="paper_group_id"
                label="Course Group"
                v-model="getSchema.paper_group_id"
                :items="getPaperGroup"
                item-text="name"
                item-value="id"
                v-validate="'required'"
                data-vv-name="paper_group_id"
                prepend-icon="edit"
              ></v-select>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="pair_paper_code"
                label="Pair Paper Code"
                type="number"
                v-model="getSchema.pair_paper_code"
                data-vv-name="pair_paper_code"
                prepend-icon="edit"
                hint="If select / deselect this course, the paired course will be automatically selected / deselected"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="alt_paper_code"
                label="Alternative Paper Code"
                type="number"
                v-model="getSchema.alt_paper_code"
                data-vv-name="alt_paper_code"
                prepend-icon="edit"
                hint="If select this course the alternative course automatically removed from the list"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>

            <v-flex md6 mt-2>
              <v-text-field
                name="credit"
                label="Credit"
                type="number"
                v-model="getSchema.credit"
                data-vv-name="credit"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6 mt-2>
              <v-text-field
                name="full_marks"
                label="Full Marks"
                type="number"
                v-model="getSchema.full_marks"
                data-vv-name="full_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="theory_full_marks"
                label="Theory Full Marks"
                type="number"
                v-model="getSchema.theory_full_marks"
                data-vv-name="theory_full_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="theory_pass_marks"
                label="Theory Pass Marks"
                type="number"
                v-model="getSchema.theory_pass_marks"
                data-vv-name="theory_pass_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="non_theory_full_marks"
                label="Non Theory Full Marks"
                type="number"
                v-model="getSchema.non_theory_full_marks"
                data-vv-name="non_theory_full_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="non_theory_pass_marks"
                label="Non Theory Pass Marks"
                type="number"
                v-model="getSchema.non_theory_pass_marks"
                data-vv-name="non_theory_pass_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="incourse_marks"
                label="Incourse Marks"
                type="number"
                v-model="getSchema.incourse_marks"
                data-vv-name="incourse_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="minimum_incourse_marks"
                label="Minimum Incourse Marks"
                type="number"
                v-model="getSchema.minimum_incourse_marks"
                data-vv-name="minimum_incourse_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="practical_full_marks"
                label="Practical Full Marks"
                type="number"
                v-model="getSchema.practical_full_marks"
                data-vv-name="practical_full_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="practical_pass_marks"
                label="Practical Pass Marks"
                type="number"
                v-model="getSchema.practical_pass_marks"
                data-vv-name="practical_pass_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="viva_full_marks"
                label="Viva Full Marks"
                type="number"
                v-model="getSchema.viva_full_marks"
                data-vv-name="viva_full_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-text-field
                name="viva_pass_marks"
                label="Viva Pass Marks"
                type="number"
                v-model="getSchema.viva_pass_marks"
                data-vv-name="viva_pass_marks"
                prepend-icon="edit"
                :persistent-hint="true"
              ></v-text-field>
            </v-flex>
            <v-flex md6>
              <v-autocomplete
                name="regulation_session_start"
                label="Regulation Session Start"
                v-model="getSchema.regulation_session_start"
                :items="getAcSessionData"
                item-text="ac_session"
                item-value="ac_session"
                v-validate="'required'"
                :error-messages="errors.collect('regulation_session_start')"
                data-vv-name="regulation_session_start"
                required
                prepend-icon="edit"
              ></v-autocomplete>
            </v-flex>
            <v-flex md6>
              <v-autocomplete
                name="regulation_session_end"
                label="Regulation Session End"
                v-model="getSchema.regulation_session_end"
                :items="getAcSessionData"
                item-text="ac_session"
                item-value="ac_session"
                prepend-icon="edit"
                clearable
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          <v-checkbox
            v-model="getSchema.is_incourse_pv"
            label="Is Incourse PV"
            value="1"
            type="checkbox"
            color="indigo darken-3"
          ></v-checkbox>

          <v-checkbox
            v-model="getSchema.status"
            label="Active"
            value="1"
            type="checkbox"
            color="indigo darken-3"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}
          </v-btn>
          <v-btn color="error  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  created() {},
  props: ["dialogStatus", "editedData", "indexEdited"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    editedStatus: false
  }),

  computed: {
    getPaperGroup() {
      return this.$store.getters.getSubjectWisePaperGroup;
    },
    getDegrees() {
      return this.$store.getters.getAllDegree;
    },
    getDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getPaperType() {
      return this.$store.getters.getAllPaperType;
    },
    getAllPaperTypeInfo() {
      return this.$store.getters.getAllPaperTypeInfo;
    },
    getSubject() {
      return this.$store.getters.getAllSubject;
    },
    getExams() {
      return this.$store.getters.getAllExams;
    },
    getSchema() {
      return this.$store.getters.getSchemaData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Update";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Paper" : "Edit Paper";
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getAcSessionData() {
      return this.$store.getters.getAcSessionData;
    }
  },
  methods: {
    degreeGroupData(degree_code) {
      if (degree_code) {
        this.$store.dispatch("fetchAllDegreeGroupData", {
          params: {
            degree_code: degree_code,
            degree_group_code: this.getLoggedInExam.degree_group_code
          }
        });
        this.$store.dispatch("fetchAllExamData", degree_code);
      }
    },

    changeSifType(exam_code, subject_code, info_id) {
      if (info_id == 2) {
        this.$store.dispatch("getPaperGroup", {
          exam_code: exam_code,
          subject_code: subject_code
        });
      }
    },

    getSubjectData(degree_group_code) {
      this.$store.dispatch("fetchAllSubjectData", {
        params: { degree_group_code: degree_group_code }
      });
    },

    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    save() {
      let self = this;
      let item = this.getSchema;
      if (item.paper_type_info_id != 2) {
        item["paper_group_id"] = 0;
      }
      this.$store
        .dispatch("savePaperData", item)
        .then(function() {
          try {
            self.close();
            self.$parent.$parent.getDataFromApi();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$parent.$parent.getDataFromApi();
        });
    },
    edit() {
      let self = this;
      let item = _.pick(this.getSchema, [
        "id",
        "paper_code",
        "paper_name",
        "paper_type",
        "degree_code",
        "degree_group_code",
        "subject_code",
        "exam_code",
        "paper_type_info_id",
        "paper_group_id",
        "credit",
        "full_marks",
        "theory_full_marks",
        "theory_pass_marks",
        "theory_pass_marks",
        "non_theory_full_marks",
        "non_theory_pass_marks",
        "incourse_marks",
        "minimum_incourse_marks",
        "practical_full_marks",
        "practical_pass_marks",
        "viva_full_marks",
        "viva_pass_marks",
        "is_incourse_pv",
        "regulation_session_start",
        "regulation_session_end",
        "status"
      ]);
      if (this.getSchema["paper_type_info_id"] != 2) {
        item["paper_group_id"] = 0;
      }
      //alert( this.getSchema['paper_group_id']);
      this.$store
        .dispatch("updatePaperData", item)
        .then(function() {
          self.close();
          self.$parent.$parent.getDataFromApi();
        })
        .catch(function() {
          self.$parent.$parent.getDataFromApi();
        });
    },
    clear() {
      this.$validator.reset();
    },
    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_SUBJECT_FORM_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  mounted() {
    // this.$store.dispatch("fetchAllDegreeData",{degree_code:this.getLoggedInExam.exam_code});
  }
};
</script>

<style scoped>
.v-messages__message {
  color: red !important;
}
.custom-placeholer-color input,
.custom-label-color input {
  color: red !important;
}
</style>
