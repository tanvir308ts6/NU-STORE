<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
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
                <!-- {{JSON.stringify(centerId)}} -->
                <v-select
                  label="Select Center"
                  item-text="center_name"
                  item-value="id"
                  v-model="getSchema.center_id"
                  :items="centerId"
                  prepend-icon="edit"
                ></v-select>
              </v-flex>

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
                  <v-date-picker v-model="getSchema.date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>

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
            >{{ buttonTitle }}</v-btn>
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
    validator: "new",
  },
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar"],
  data: () => ({
    pagination: {
      rowsPerPage: 25,
    },
    dialog: false,
    editedStatus: false,
    centerId: [],
    menu1: false,
    //examId: ["1", "2", "3", "4"],
    examId: [],
    dictionary: {
      custom: {
        main_qty: {
          required: () => "Main Qunantity field can not be empty",
        },
        loose_qty: {
          required: () => "Loose Quantity field can not be empty",
        },
        center_id: {
          required: () => "Center Id field can not be empty",
        },

        date: {
          required: () => "date field can not be empty",
        },

        exam_id: {
          required: () => "Select a exam id",
        },
      },
    },
  }),
  created() {
    console.log(this.dialogStatus);
    this.$store.dispatch("fetchExamData");
    this.$store.dispatch("fetchCenterData");
  },
  /*mounted() {
    this.$validator.localize("en", this.dictionary);
  },*/
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_BLANK_SCRIPT_DISTRIBUTE_SCHEMA", this.editedData);
      this.examId = this.$store.getters.getExamItem;
      this.centerId = this.$store.getters.getCenterItems;
    },

    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getSchema() {
      return this.$store.getters.getBlankScriptDistributeSchema;
    },
    getItemList() {
      return this.$store.getters.getBlankScriptCollectItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Blank Script Distribution"
        : "Edit Item";
    },
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    save() {
      var self = this;
      var item = {
        main_qty: this.getSchema.main_qty,
        loose_qty: this.getSchema.loose_qty,
        center_id: this.getSchema.center_id,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
      };
      this.$store
        .dispatch("saveBlankScriptDistributetData", item)
        .then(function (data) {
          try {
            //console.log("cLOSE FUN CALLING  ")
            self.close();
            self.$emit("update:snackbar", true);
            self.$store.dispatch("callBlankScriptDistributeData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          self.$store.dispatch("callBlankScriptDistributeData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        main_qty: this.getSchema.main_qty,
        loose_qty: this.getSchema.loose_qty,
        center_id: this.getSchema.center_id,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by,
      };
      var param = {
        item: item,
        indexEdited: this.indexEdited,
      };

      this.$store
        .dispatch("editBlankScriptDistributeData", param)
        .then(function (data) {
          self.close();
          self.$store.dispatch("callBlankScriptDistributeData");
          self.$emit("update:snackbar", true);
        })
        .catch(function (error) {
          console.log(error);
          self.$store.dispatch("callBlankScriptDistributeData");
        });
    },
    clear() {
      this.getSchema.main_qty = "";
      this.getSchema.loose_qty = "";
      this.getSchema.center_id = "";
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
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
