<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="600px" persistent>
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
                name="scriptqty"
                label="Script quantity"
                v-model="getSchema.script_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('script_qty')"
                data-vv-name="script_qty"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-flex xs12>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
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
                      v-model="date"
                      label="Date"
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('date')"
                      data-vv-name="date"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="$refs.menu.save(date)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Select Regional Center"
                  item-text="center_name"
                  item-value="id"
                  v-model="getSchema.regional_center_id"
                  :items="regCenterList"
                  v-validate="'required'"
                  :error-messages="errors.collect('regional_center_id')"
                  data-vv-name="regional_center_id"
                  required
                  prepend-icon="edit"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Select Center"
                  item-text="center_name"
                  item-value="id"
                  v-model="getSchema.center_id"
                  :items="centerList"
                  v-validate="'required'"
                  :error-messages="errors.collect('center_id')"
                  data-vv-name="center_id"
                  required
                  prepend-icon="edit"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  label="Select Exam"
                  item-text="name"
                  item-value="id"
                  v-model="getSchema.exam_id"
                  :items="examList"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_id')"
                  data-vv-name="exam_id"
                  required
                  prepend-icon="edit"
                ></v-select>
              </v-flex>
              <v-textarea
                v-model="getSchema.comments"
                auto-grow
                label="Comments"
                name="comments"
                rows="1"
                prepend-icon="edit"
              ></v-textarea>
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
  data: vm => ({
    dialog: false,
    menu: false,
    editedStatus: false,

    dictionary: {
      custom: {
        script_qty: {
          required: () => "Script quantity field can not be empty",
          numeric: "Script quantity field may only contain numeric characters"
        },
        date: {
          required: () => "Date field can not be empty"
        },
        exam_id: {
          required: () => "Select an Exam"
        },
        regional_center_id: {
          required: () => "Select a Regional Center "
        },
        center_id: {
          required: () => "Select a Center"
        }
      }
    }
  }),
  created() {
    console.log(this.dialogStatus);
    this.$store.dispatch("fetchExamData");
    this.$store.dispatch("fetchRegCenterData");
    this.$store.dispatch("fetchCenterData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_ANS_DISTRIBUTION_TO_REG_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getAnsDistributionToRegSchema;
    },
    getItemList() {
      return this.$store.getters.getAnsDistributionToReg;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Ans Distribution to RegionalCenter Form"
        : "Edit Ans Distribution to RegionalCenter";
    },
    examList() {
      return this.$store.getters.getExamItem;
    },
    regCenterList() {
      return this.$store.getters.getRegCenterItems;
    },
    centerList() {
      return this.$store.getters.getCenterItems;
    }
  },
  methods: {
    date: {
      get: function() {
        //alert(this.$store.state.globalDate);
        return this.$store.getters.getBsCollectionFromRegSchema.date;
      },
      set: function(newValue) {
        if (!newValue) return null;
        else {
          const [year, month, day] = newValue.split("-");
          newValue = `${month}/${day}/${year}`;
        }
        const [month, day, year] = newValue.split("/");
        newValue = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

        return (this.$store.getters.getBsCollectionFromRegSchema.date = newValue);
        //alert('computed date,set function: ' + newValue);
        //this.$store.commit('saveGlobalDate',newValue);
        //alert('computed date,set function after commit: ' + this.$store.state.globalDate);
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
      var self = this;
      var item = {
        script_qty: this.getSchema.script_qty,
        regional_center_id: this.getSchema.regional_center_id,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
        center_id: this.getSchema.center_id
      };
      this.$store
        .dispatch("saveAnsDistributionToRegData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchAnsDistributionToRegData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchAnsDistributionToRegData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        script_qty: this.getSchema.script_qty,
        regional_center_id: this.getSchema.regional_center_id,
        date: this.getSchema.date,
        exam_id: this.getSchema.exam_id,
        center_id: this.getSchema.center_id
        /* status: this.getSchema.status,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by*/
      };
      this.$store
        .dispatch("editAnsDistributionToRegData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchAnsDistributionToRegData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchAnsDistributionToRegData");
        });
    },
    clear() {
      // this.getSchema.id = "";
      // this.getSchema.script_qty = "";
      // this.getSchema.center_id = "";
      // this.getSchema.date = "";
      // this.getSchema.exam_id = "";
      // this.getSchema.regional_center_id = "";
      // /*
      // this.getSchema.status = "";
      // this.getSchema.created_at = "";
      // this.getSchema.updated_at = "";
      // this.getSchema.deleted_at = "";
      // this.getSchema.created_by = "";
      // this.getSchema.updated_by = "";
      // this.getSchema.deleted_by = "";*/
      this.$store.commit("UNSET_ANS_DISTRIBUTION_TO_REG_SCHEMA");
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
