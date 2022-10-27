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
            name="degree_code"
            label="Degree Code"
            type="number"
            v-model="getSchema.degree_code"
            v-validate="'required'"
            :error-messages="errors.collect('degree_code')"
            data-vv-name="degree_code"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            name="degree_name"
            label="Degree Name"
            v-model="getSchema.degree_name"
            v-validate="'required'"
            :error-messages="errors.collect('degree_name')"
            data-vv-name="degree_name"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            v-model="getSchema.degree_title"
            auto-grow
            label="Degree Title"
            name="degree_title"
            rows="1"
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
      this.$store.commit("SET_DEGREE_FORM_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.degreeFormData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Degree" : "Edit Degree";
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
        .dispatch("saveDegreeData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchDegreeList");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchDegreeList");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("updateDegreeData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchDegreeList");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchDegreeList");
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
