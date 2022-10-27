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
                <v-text-field
                  name="seal_no"
                  label="Seal No"
                  v-model="getSchema.seal_no"
                  data-vv-name="seal_no"
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  disabled
                  label="Select Exam Name"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  v-model="getSchema.exam_code"
                  :items="getExamList"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_code')"
                  data-vv-name="exam_code"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" + data.item.code + ") " + data.item.title
                      }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  disabled
                  name="year"
                  class="ma-2"
                  v-model="getSchema.year"
                  item-text="year"
                  item-value="year"
                  :items="getYearList"
                  menu-props="auto"
                  label="Select Year"
                  hide-details
                  v-validate="'required'"
                  :error-messages="errors.collect('year')"
                  data-vv-name="year"
                  required
                  prepend-icon="calendar_today"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.year = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.year }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.year"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="dateMenu1"
                  v-model="dateMenu1"
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
                      label="Start Date"
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
              <v-flex xs12>
                <v-menu
                  ref="dateMenu2"
                  v-model="dateMenu2"
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
                      v-model="getSchema.end_date"
                      label="End Date"
                      hint="MM-DD-YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('end_date')"
                      data-vv-name="end_date"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="getSchema.end_date"
                    no-title
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
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
import commonFun from "../../mixin/common_function";
import formNotification from "@/components/utils/formNotification";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonFun, commonGet, watchMixin],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,

    dateMenu1: false,
    dateMenu2: false,

    dictionary: {
      custom: {
        year: {
          required: () => "Select Exam Year."
        },
        exam_code: {
          required: () => "Select Exam."
        }
      }
    }
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000
    };
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData", limit);
    }
    this.$store.dispatch("fetchYearData", limit);
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_PV_ROUTINE_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getPVRoutineSchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Add Practical/Viva Routine "
        : "Edit Practical/Viva Routine ";
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
      this.$store
        .dispatch("savePVRoutineData", item)
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
        .dispatch("editPVRoutineData", item)
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
      this.$store.commit("UNSET_PV_ROUTINE_SCHEMA");
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
