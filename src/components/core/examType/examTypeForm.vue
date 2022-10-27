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
            name="exam_type"
            label="Exam Type"
            v-model="getSchema.exam_type"
            v-validate="'required'"
            :error-messages="errors.collect('exam_type')"
            data-vv-name="exam_type"
            required
            prepend-icon="edit"
          ></v-text-field>
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

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("EXAM_TYPES_FORM_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.setExamTypeData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Exam Type"
        : "Edit Exam Type";
    }
  },
  methods: {
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
        .dispatch("saveExamType", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchCExamTypeList");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchCExamTypeList");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("updateExamType", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchCExamTypeList");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchCExamTypeList");
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
  }
};
</script>

<style scoped></style>
