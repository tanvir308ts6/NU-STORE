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
                name="main_qty"
                label="Main Quantity"
                v-model="getSchema.main_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('main_qty')"
                data-vv-name="main_qty"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="loose_qty"
                label="Loose Quantity"
                v-model="getSchema.loose_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('loose_qty')"
                data-vv-name="loose_qty"
                required
                prepend-icon="edit"
              ></v-text-field>

              <v-flex xs12>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
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
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(getSchema.date)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.date"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <!--   <v-text-field
          name="date"
          label="Date"
          v-model="getSchema.date"
          v-validate="'required|numeric'"
          :error-messages="errors.collect('date')"
          data-vv-name="date"
          required
          prepend-icon="edit"
              ></v-text-field>-->

              <v-flex xs12>
                <!-- {{JSON.stringify(examId)}} -->
                <v-select
                  label="Select Exam"
                  item-text="name"
                  item-value="id"
                  v-model="getSchema.exam_id"
                  :items="examId"
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
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    examId: [],
    menu1: false,
    dictionary: {
      custom: {
        main_qty: {
          required: () => "Name field can not be empty"
        },
        loose_qty: {
          required: () => "Name field can not be empty"
        },

        date: {
          required: () => "mobile field can not be empty",
          numeric: "mobile field may only contain numeric characters"
        },

        exam_id: {
          required: () => "Select a type"
        }
      }
    }
  }),
  created() {
    console.log(this.dialogStatus);
    this.$store.dispatch("fetchExamData");
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_BLANK_SCRIPT_COLLECT_SCHEMA", this.editedData);
      this.examId = this.$store.getters.getExamItem;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getBlankScriptCollectSchema;
    },
    getItemList() {
      return this.$store.getters.getBlankScriptCollectItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Blank Script Collection" : "Edit Item";
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

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    save() {
      var self = this;
      var item = {
        main_qty: this.getSchema.main_qty,
        loose_qty: this.getSchema.loose_qty,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id
      };

      this.$store
        .dispatch("saveBlankScriptCollectData", item)
        .then(function(data) {
          try {
            self.close();
            self.$emit("update:snackbar", true);
            self.$store.dispatch("callBlankScriptCollectData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          self.$store.dispatch("callBlankScriptCollectData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        main_qty: this.getSchema.main_qty,
        loose_qty: this.getSchema.loose_qty,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by
      };
      var param = {
        item: item,
        indexEdited: this.indexEdited
      };

      this.$store
        .dispatch("editBlankScriptCollectData", param)
        .then(function(data) {
          self.close();
          self.$store.dispatch("callBlankScriptCollectData");
          self.$emit("update:snackbar", true);
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callBlankScriptCollectData");
        });
    },
    clear() {
      this.getSchema.main_qty = "";
      this.getSchema.loose_qty = "";
      this.getSchema.date = "";
      this.getSchema.exam_id = "";
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
