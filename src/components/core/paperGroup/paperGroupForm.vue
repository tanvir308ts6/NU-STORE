<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
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
        <v-select
            name="degree_code"
            label="Degree Group"
            v-model="getSchema.degree_group_code"
            :items="getDegreeGroup"
            :item-text=" (item) => item.degree_group_code + '-' + item.degree_group_name "
            item-value="degree_group_code"
            v-validate="'required'"
            :error-messages="errors.collect('degree_group_code')"
            data-vv-name="degree_group_code"
            @change="getSubjectData"
            required
            prepend-icon="edit"
          ></v-select>
          <v-select
          v-if="getSubject.length"
            name="subject_code"
            label="Subject"
            v-model="getSchema.subject_code"
            :items="getSubject"
            item-text="subject_name"
            item-value="subject_code"
            v-validate="'required'"
            data-vv-name="subject_code"
            required
            prepend-icon="edit"
          ></v-select>
          <v-text-field
            name="name"
            label="Group Name"
            v-model="getSchema.name"
            v-validate="'required'"
            :error-messages="errors.collect('name')"
            data-vv-name="name"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            name="short_name"
            label="Short Name"
            v-model="getSchema.short_name"
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            name="number_of_paper"
            label="number Of Paper"
            v-model="getSchema.number_of_paper"
            v-validate="'required'"
            :error-messages="errors.collect('number_of_paper')"
            data-vv-name="number_of_paper"
            required
            prepend-icon="edit"
          ></v-text-field>

          <v-text-field
            name="paper_group_set"
            label="Group Set"
            v-model="getSchema.paper_group_set"
            v-validate="'required'"
            :error-messages="errors.collect('paper_group_set')"
            data-vv-name="paper_group_set"
            required
            prepend-icon="edit"
          ></v-text-field>

          <v-checkbox
            v-model="getSchema.show_name"
            value="1"
            label="Show Name"
            type="checkbox"
            color="indigo darken-3"
          ></v-checkbox>

          <v-checkbox
            v-model="getSchema.status"
            value="1"
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
            >{{ buttonTitle }}</v-btn
          >
          <v-btn color="error  white--text" @click="clear">Reset</v-btn>
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

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("PAPER_GROUP_FORM_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.setPaperGroupData;
    },
    getDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    // getSubject() {
    //   return this.$store.getters.getSubjectData;
    // },
    getSubject() {
      return this.$store.getters.getAllSubject;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create Paper Group"
        : "Edit Paper Group";
    }
  },
  methods: {
    validationForm() {
      this.indexEdited === -1 ? this.save() : this.edit();
    },
    getSubjectData(degree_group_code) {
      this.$store.dispatch("fetchAllSubjectData", {
        params: { degree_group_code: degree_group_code }
      });
    },
    save() {
      let self = this;
      let exam_code = self.getLoggedInExam.code;
      self.getSchema.exam_code = exam_code;
      let item = this.getSchema;
      this.$store
        .dispatch("savePaperGroup", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchCPaperGroupList", {
              exam_code: exam_code
            });
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchCPaperGroupList", {
            exam_code: exam_code
          });
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      let exam_code = self.getLoggedInExam.code;
      this.$store
        .dispatch("updatePaperGroup", item)
        .then(function() {
          self.$store.dispatch("fetchCPaperGroupList", {
            exam_code: exam_code
          });
          self.close();
        })
        .catch(function() {
          self.$store.dispatch("fetchCPaperGroupList", {
            exam_code: exam_code
          });
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
  mounted() {
    this.$store.dispatch("subjectByDegree", {
      degree_code: this.getLoggedInDegree.code
    });
    this.$store.dispatch("fetchCPaperGroupList", {
      exam_code: this.getLoggedInExam.code
    });

     this.$store.dispatch("fetchAllDegreeGroupData", this.getLoggedInDegree.code);
    // this.$store.dispatch("fetchAllSubjectData");
  }
};
</script>

<style scoped></style>
