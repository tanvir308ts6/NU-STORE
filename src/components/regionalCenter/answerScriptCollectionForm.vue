<template>
  <div class="form">
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
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-text-field
                name="script_qty"
                label="Script quantity"
                v-model="getSchema.script_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('script_qty')"
                data-vv-name="script_qty"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-flex xs12>
                <v-select
                  label="Select Center"
                  item-text="center_name"
                  item-value="id"
                  v-model="getSchema.center_id"
                  :items="centerId"
                  v-validate="'required'"
                  :error-messages="errors.collect('center_id')"
                  data-vv-name="center_id"
                  required
                  prepend-icon="edit"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="menu1"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="getSchema.date"
                      label="Date"
                      hint="MM-DD-YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('date')"
                      data-vv-name="date"
                      required
                      @blur="date = formatDate(getSchema.date)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.date"
                    no-title
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Select Exam"
                  item-text="name"
                  item-value="id"
                  v-model="getSchema.exam_id"
                  :items="examId"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_id')"
                  data-vv-name="exam_id"
                  required
                  prepend-icon="edit"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Select Subject"
                  item-text="name"
                  item-value="id"
                  v-model="getSchema.subject_id"
                  :items="subjectId"
                  v-validate="'required'"
                  :error-messages="errors.collect('subject_id')"
                  data-vv-name="subject_id"
                  required
                  prepend-icon="edit"
                ></v-select>
              </v-flex>
            </v-form>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
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
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["dialogStatus", "editedData", "indexEdited"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    menu: false,
    examId: [],
    centerId: [],
    subjectId: [],
    dictionary: {
      custom: {
        script_qty: {
          required: () => "Script quantity field can not be empty",
          numeric: "Script quantity field may only contain numeric characters"
        },
        date: {
          required: () => "Date can not be empty"
        },
        exam_id: {
          required: () => "Select an Exam Id"
        },
        subject_id: {
          required: () => "Select a Subject Id "
        },
        center_id: {
          required: () => "Select a Center ID"
        }
      }
    }
  }),
  created() {
    console.log(this.dialogStatus);
    this.$store.dispatch("fetchExamData");
    this.$store.dispatch("fetchCenterData");
    this.$store.dispatch("fetchSubjectData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_ANSCOLLECTION_SCHEMA", this.editedData);
      this.examId = this.$store.getters.getExamItem;
      this.centerId = this.$store.getters.getCenterItems;
      this.subjectId = this.$store.getters.getCourseItems;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getAnsScriptCollectionSchema;
    },
    getItemList() {
      return this.$store.getters.getInvigilatorItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Answer Script Collection Form"
        : "Edit Answer Script Collection";
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
    formatDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
    },
    // parseDate (date) {
    //        if (!date) return null
    //        const [month, day, year] = date.split('/')
    //        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    //    },
    save() {
      var self = this;
      var item = {
        script_qty: this.getSchema.script_qty,
        center_id: this.getSchema.center_id,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
        subject_id: this.getSchema.subject_id
      };
      this.$store
        .dispatch("saveAnsScriptCollectionData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("callAnsScriptCollectionData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callAnsScriptCollectionData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        script_qty: this.getSchema.script_qty,
        center_id: this.getSchema.center_id,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
        subject_id: this.getSchema.subject_id,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by
      };
      /*var param = {
	        item: item,
	        indexEdited: this.indexEdited
	      };*/
      // console.log('param', param);
      // return 0;
      this.$store
        .dispatch("editAnsScriptCollectionData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("callAnsScriptCollectionData");
          self.$emit("update:snackbar", true);
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callAnsScriptCollectionData");
        });
    },
    clear() {
      this.getSchema.id = "";
      this.getSchema.script_qty = "";
      this.getSchema.center_id = "";
      this.getSchema.date = "";
      this.getSchema.exam_id = "";
      this.getSchema.subject_id = "";
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
