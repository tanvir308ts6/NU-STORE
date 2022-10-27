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
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-flex xs12>
                <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
                  :close-on-content-click="true"
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
              <v-text-field
                name="description"
                label="Off Day Description"
                v-model="getSchema.description"
                v-validate="'required'"
                :error-messages="errors.collect('description')"
                data-vv-name="description"
                required
                prepend-icon="edit"
              ></v-text-field>
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
import commonFun from "../../mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "../../mixin/exam_year_watch_mixin";

export default {
  $_veeValidate: {
    validator: "new"
  },
  mixins: [commonFun, commonGet, watchMixin],
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    dictionary: {
      custom: {
        division_name: {
          required: () => "Division  Name is required"
        },
        div_code: {
          required: () => "Division Code can not be empty."
        }
      }
    }
  }),
  created() {},
  mounted() {
    this.$validator.localize("en", this.dictionary);

    this.ifExamSchema = true;
    this.ifYearSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_OFFDAY_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getOffDaySchema;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Add Off Day " : "Edit Off Day ";
    },
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
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
      item.exam_initiate_id = this.getExamInitiateId;
      item.exam_code = this.$store.getters.getLoggedInExam.code;
      item.year = this.$store.getters.getLoggedInYear.year;
      this.$store
        .dispatch("saveOffDayData", item)
        .then(function(data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            //self.$store.dispatch("fetchCenLsDistToRegData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editOffDayData", item)
        .then(function(data) {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        })
        .catch(function(error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_OFFDAY_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
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
