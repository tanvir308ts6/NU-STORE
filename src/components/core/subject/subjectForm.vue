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
            name="subject_code"
            label="Subject Code"
            type="number"
            v-model="getSchema.subject_code"
            v-validate="'required'"
            :error-messages="errors.collect('subject_code')"
            data-vv-name="subject_code"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            name="subject_name"
            label="Subject Name"
            v-model="getSchema.subject_name"
            v-validate="'required'"
            :error-messages="errors.collect('subject_name')"
            data-vv-name="subject_name"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-select
            name="degree_code"
            label="Degree Code"
            v-model="getSchema.degree_code"
            :items="getDegrees"
            :item-text=" (item) => item.degree_code + '-' + item.degree_name "
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
            label="Degree Group Code"
            v-model="getSchema.degree_group_code"
            :items="getDegreeGroup"
            :item-text=" (item) => item.degree_group_code + '-' + item.degree_group_name "
            item-value="degree_group_code"
            v-validate="'required'"
            :error-messages="errors.collect('degree_group_code')"
            data-vv-name="degree_group_code"
            required
            prepend-icon="edit"
          ></v-select>
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
  props: ["dialogStatus", "editedData", "indexEdited"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    editedStatus: false
  }),

  computed: {
    getDegrees() {
      return this.$store.getters.getAllDegree;
    },
    getDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },

    getSchema() {
      return this.$store.getters.getSchemaData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Subject" : "Edit Subject";
    }
  },
  methods: {
    degreeGroupData(degree_code) {
      if (degree_code) {
        this.$store.dispatch("fetchAllDegreeGroupData",{
          params: { degree_code: degree_code }
        });
      }
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
        .dispatch("saveSubjectData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchSubjectList");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchSubjectList");
        });
    },
    edit() {
      let self = this;
      let item = _.pick(this.getSchema, [
        "id",
        "degree_code",
        "degree_group_code",
        "subject_code",
        "subject_name",
        "status"
      ]);
      this.$store
        .dispatch("updateSubjectData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchSubjectList");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchSubjectList");
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

  created() {
    this.$store.dispatch("fetchAllDegreeData");
    this.$store.dispatch("fetchAllDegreeGroupData");
  }
};
</script>

<style scoped></style>
