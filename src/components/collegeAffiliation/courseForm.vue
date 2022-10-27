<template>
  <v-dialog v-model="dialog" max-width="500px">
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
          <v-text-field
            name="college_code"
            label="College Code"
            v-model="getSchema.college_code"
            v-validate="'required'"
            :error-messages="errors.collect('college_code')"
            data-vv-name="college_code"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-select
            name="degree_code"
            label="Degree"
            v-model="getSchema.degree_code"
            :items="getDegrees"
            item-text="degree_name"
            item-value="degree_code"
            v-validate="'required'"
            :error-messages="errors.collect('degree_code')"
            data-vv-name="degree_code"
            @change="degreeGroupData"
            required
            prepend-icon="edit"
          ></v-select>
          <v-select
            name="degree_code"
            label="Degree Group"
            v-model="getSchema.degree_group_code"
            :items="getDegreeGroup"
            item-text="degree_group_name"
            item-value="degree_group_code"
            v-validate="'required'"
            :error-messages="errors.collect('degree_group_code')"
            data-vv-name="degree_group_code"
            @change="getSubjectData"
            required
            prepend-icon="edit"
          ></v-select>
          <v-select
            name="course_subject_code"
            label="Subject/Course"
            v-model="getSchema.course_subject_code"
            :items="getSubject"
            item-text="subject_name"
            item-value="course_subject_code"
            v-validate="'required'"
            :error-messages="errors.collect('course_subject_code')"
            data-vv-name="course_subject_code"
            required
            prepend-icon="edit"
          ></v-select>
          <v-select
            v-if="indexEdited !== 0"
            name="ac_session_start"
            label="Academic Session"
            v-model="getSchema.ac_session_start"
            :items="getAcSession"
            item-text="ac_session"
            item-value="ac_session"
            v-validate="'required'"
            :error-messages="errors.collect('ac_session_start')"
            data-vv-name="ac_session_start"
            required
            prepend-icon="edit"
          ></v-select>

          <v-select
            v-if="indexEdited === 0"
            name="renew_up_to"
            label="Renew Up To"
            v-model="getSchema.renew_up_to"
            :items="getAcSession"
            item-text="ac_session"
            item-value="ac_session"
            v-validate="'required'"
            :error-messages="errors.collect('renew_up_to')"
            data-vv-name="renew_up_to"
            required
            prepend-icon="edit"
          ></v-select>
          <v-checkbox
            v-model="getSchema.status"
            label="Active"
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
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogStatus", "editedData", "indexEdited"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    editedStatus: false
  }),

  computed: {
    getSchema() {
      return this.$store.getters.setCourseData;
    },
    getDegrees() {
      return this.$store.getters.getAllDegree;
    },
    getDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getSubject() {
      return this.$store.getters.getAllSubject;
    },
    getAcSession() {
      return this.$store.getters.getAcSessionData;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New" : "Edit";
    }
  },
  methods: {
    degreeGroupData(degree_code) {
      if (degree_code) {
        this.$store.dispatch("fetchAllDegreeGroupData", { params: { degree_code: degree_code } });
        this.$store.dispatch("fetchAllExamData", degree_code);
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
      this.$store
        .dispatch("submitCollegeAffiliation", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchCourseList");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchCourseList");
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
        "status"
      ]);
      console.log(item);
      this.$store
        .dispatch("updatePaperData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchPaperList");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchPaperList");
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
      this.$store.commit("SET_COURSE_SCHEMA_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    this.$store.dispatch("fetchAllDegreeData");
    this.$store.dispatch("fetchAllDegreeGroupData");
    this.$store.dispatch("fetchAllSubjectData");
    this.$store.dispatch("fetchSessionData");
  }
};
</script>

<style scoped></style>
