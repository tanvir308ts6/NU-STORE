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
              <v-flex xs12>
                <v-autocomplete
                  v-model="getSchema.exam_code"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_code')"
                  data-vv-name="exam_code"
                  name="exam_code"
                  required
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_code = ''"
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
                <v-select
                  class="ma-2"
                  v-model="getSchema.year"
                  item-text="year"
                  item-value="year"
                  :items="getYearList"
                  menu-props="auto"
                  label="Select Year"
                  hide-details
                  prepend-icon="calendar_today"
                  v-validate="'required'"
                  :error-messages="errors.collect('year')"
                  data-vv-name="year"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="getSchema.reg_no"
                  name="rg_no"
                  label="Registration Number"
                  prepend-icon="edit"
                  v-validate="'required'"
                  :error-messages="errors.collect('reg_no')"
                  data-vv-name="reg_no"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="getSchema.paper_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getPaperList"
                  label="Select Course"
                  prepend-icon="list"
                  v-validate="'required'"
                  :error-messages="errors.collect('paper_code')"
                  data-vv-name="paper_code"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="script_sl"
                  label="Script SL."
                  v-validate="'required'"
                  v-model="getSchema.script_sl"
                  :error-messages="errors.collect('script_sl')"
                  data-vv-name="script_sl"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  name="college_code"
                  label="College Code"
                  v-model="getSchema.college_code"
                  prepend-icon="edit"
                  v-validate="'required'"
                  :error-messages="errors.collect('college_code')"
                  data-vv-name="college_code"
                  required
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12>
                <v-select
                  v-model="getSchema.type"
                  item-text="title"
                  item-value="value"
                  :items="getType"
                  label="Select Script Type"
                  prepend-icon="list"
                  v-validate="'required'"
                  :error-messages="errors.collect('type')"
                  data-vv-name="type"
                  required
                ></v-select>
              </v-flex>-->
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
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear],
  $_veeValidate: {
    validator: "new"
  },

  props: ["dialogStatus", "editedData", "indexEdited"],
  data: () => ({
    dialog: false,
    dictionary: {
      custom: {
        script_sl: {
          required: () => "Script SL. field can to be empty."
        },
        paper_code: {
          required: () => "Select Paper."
        },
        reg_no: {
          required: () => "Registration Number field can not be empty."
        },
        exam_code: {
          required: () => "Select Exam."
        },
        year: {
          required: () => "Select Year."
        },
        college_code: {
          required: () => "Select Center."
        }
      }
    }
  }),
  created() {
    this.ifExamSchema = true;
    this.ifYearSchema = true;

    //year
    if (!this.$store.getters.getYearItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchYearData");
    }
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    // dispatch fetchCenterData
    this.$store.dispatch("fetchCenterData");

    //exam
    if (!this.$store.getters.getExamItem.length) {
      console.log("----> ");
      this.$store.dispatch("fetchExamData");
    }
    this.$store.commit("UNSET_FORMNOTIFY");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_MISSING_SCRIPT_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    // getType() {
    //   return [
    //     { title: "E-type", value: "0" },
    //     { title: "H-type", value: "1" }
    //   ];
    // },
    getSchema() {
      return this.$store.getters.getMissingScriptSchema;
    },
    getItemList() {
      return this.$store.getters.getMissingScriptList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? " Missing E-type Script Entry"
        : "Edit Missing E-type Script";
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
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.type = "0";
      let item = this.getSchema;
      console.log("Save ", item);
      this.$store
        .dispatch("saveMissingScriptData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchMissingScriptData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchMissingScriptData");
        });
    },
    edit() {
      let self = this;
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.type = "0";
      let item = this.getSchema;
      this.$store
        .dispatch("editMissingScriptData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchMissingScriptData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchMissingScriptData");
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_MISSING_SCRIPT_SCHEMA");
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
