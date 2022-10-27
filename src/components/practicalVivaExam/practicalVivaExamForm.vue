<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-btn
              fab
              class="ma-0 pa-0 "
              small
              color="white black--text "
              @click="close"
            >
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-card-text>
          <v-card flat class="pr-3 scroll" height="350">
            <v-form>
              <v-flex xs12>
                <v-combobox
                  v-model="getSchema.exam_name"
                  :items="exam_name"
                  label="Select a Exam Name from list"
                  item-color="primary"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="exam_name"
                  required
                  :error-messages="errors.collect('exam_name')"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="getSchema.exam_date"
                  :items="exam_date"
                  label="Select a Exam Date from list"
                  item-color="primary"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="exam_date"
                  required
                  :error-messages="errors.collect('exam_date')"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="getSchema.center_id"
                  :items="center_id"
                  label="Select a Center ID from list"
                  item-color="primary"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="center_id"
                  required
                  :error-messages="errors.collect('center_id')"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="getSchema.center_name"
                  :items="center_name"
                  label="Select a Center Name from list"
                  item-color="primary"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="center_name"
                  required
                  :error-messages="errors.collect('center_name')"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="getSchema.college_code"
                  :items="college_code"
                  label="Select a College Code from list"
                  item-color="primary"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="college_code"
                  required
                  :error-messages="errors.collect('college_code')"
                ></v-combobox>
              </v-flex>
            </v-form>
          </v-card>
        </v-card-text>
        <v-divider> </v-divider>
        <pvMarks> </pvMarks>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary  white--text"
              @click.stop.prevent="validationForm()"
              >{{ buttonTitle }}</v-btn
            >
            <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import pvMarks from "@/components/practicalVivaExam/pvExamMarksForm.vue";
export default {
  components: {
    pvMarks
  },
  $_veeValidate: {
    validator: "new"
  },
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    exam_name: ["x", "y", "z"],
    exam_date: ["1", "2", "3"],
    center_id: ["001", "002", "003"],
    center_name: ["m", "n", "o"],
    college_code: ["100", "200", "300"],
    dictionary: {
      custom: {
        exam_name: {
          required: () => "Exam Name field can not be empty"
        },
        exam_date: {
          required: () => " Exam date can not be empty"
        },
        center_id: {
          required: () => "Select a Center Id"
        },
        center_name: {
          required: () => "Select a Center Name "
        },
        college_code: {
          required: () => "Select a type"
        }
      }
    }
  }),
  created() {
    console.log(this.dialogStatus);
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_PRACTICALVIVAEXAM_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getPracticalVivaExamSchema;
    },
    getItemList() {
      return this.$store.getters.getPracticalVivaExam;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Practical Viva Exam Form"
        : "Edit Practical Viva Exam Form";
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
      var self = this;
      var item = {
        exam_name: this.getSchema.exam_name,
        exam_date: this.getSchema.exam_date,
        center_id: this.getSchema.center_id,
        center_name: this.getSchema.center_name,
        college_code: this.getSchema.college_code
      };
      this.$store
        .dispatch("savePracticalVivaExamData", item)
        .then(function(data) {
          try {
            self.close();
            self.$emit("update:snackbar", true);
            self.$store.dispatch("callPracticalVivaExamData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callPracticalVivaExamData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        exam_name: this.getSchema.exam_name,
        exam_date: this.getSchema.exam_date,
        center_id: this.getSchema.center_id,
        center_name: this.getSchema.center_name,
        college_code: this.getSchema.college_code,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by
      };
      this.$store
        .dispatch("editPracticalVivaExamData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("callPracticalVivaExamData");
          self.$emit("update:snackbar", true);
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callPracticalVivaExamData");
        });
    },
    clear() {
      this.getSchema.id = "";
      this.getSchema.exam_name = "";
      this.getSchema.exam_date = "";
      this.getSchema.center_id = "";
      this.getSchema.center_name = "";
      this.getSchema.college_code = "";
      this.getSchema.created_at = "";
      this.getSchema.updated_at = "";
      this.getSchema.deleted_at = "";
      this.getSchema.created_by = "";
      this.getSchema.updated_by = "";
      this.getSchema.deleted_by = "";
      this.$validator.reset();
    },
    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      setTimeout(() => {
        this.$emit("update:snackbar", false);
      }, 5000);
      this.clear();
    }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
