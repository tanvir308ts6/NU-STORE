<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
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
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-flex xs12>
                <v-autocomplete
                  disabled
                  label="Select Exam Name"
                  :item-text="item => item.code + ' - ' + item.title"
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
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
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
                  v-model="getSchema.exam_year"
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
                      @input="getSchema.exam_year = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.year }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.year"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  label="Select Center"
                  item-text="center_name"
                  item-value="center_code"
                  v-model="getSchema.center_code"
                  :items="getCenterList"
                  v-validate="'required'"
                  :error-messages="errors.collect('center_code')"
                  data-vv-name="center_code"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.center_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.center_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.center_name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  label="Select College"
                  item-text="college_name"
                  item-value="college_code"
                  v-model="getSchema.college_code"
                  :items="getCollegeList"
                  v-validate="'required'"
                  :error-messages="errors.collect('college_code')"
                  data-vv-name="college_code"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.college_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.college_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.college_name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  class="ma-2"
                  v-validate="'required'"
                  v-model="getSchema.subject_code"
                  :items="getSubjectList"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  :error-messages="errors.collect('subject_code')"
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.subject_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  class="ma-2"
                  v-model="getSchema.paper_code"
                  v-validate="'required'"
                  :items="getPaperList"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select paper"
                  :error-messages="errors.collect('paper_code')"
                  persistent-hint
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.paper_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-validate="'required'"
                  v-model="getSchema.qty"
                  auto-grow
                  label="Quantity"
                  name="qty"
                  :error-messages="errors.collect('qty')"
                  rows="1"
                  prepend-icon="edit"
                ></v-textarea>
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
import commonFun from "../../mixin/common_function";
import formNotification from "@/components/utils/formNotification";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonFun, commonGet, watchMixin],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,

    dictionary: {
      custom: {
        center_code: {
          required: () => "Center Code field can not be empty.",
        },
        college_code: {
          required: () => "College can not be empty.",
        },
        subject_code: {
          required: () => "Select Subject.",
        },
        paper_code: {
          required: () => "Select Paper.",
        },
        qty: {
          required: () => "Quantity required.",
        },
        exam_year: {
          required: () => "Select Exam Year.",
        },
        exam_code: {
          required: () => "Select Exam.",
        },
      },
    },
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData", limit);
    }

    this.$store.dispatch("fetchRegCenterData", limit);
    this.$store.dispatch("fetchCenterData", limit);
    this.$store.dispatch("fetchPaperData", limit);
    this.$store.dispatch("fetchYearData", limit);
    if (!this.$store.getters.getSubjectItems.length) {
      // console.log("----> ");
      this.$store.dispatch("fetchSubjectData", limit);
      if (!this.$store.getters.getCollegeItems.length) {
        this.$store.dispatch("fetchCollegeWithStudentCount", limit);
      }
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_QUESTION_REQUISITION_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getSchema() {
      return this.$store.getters.getQustionRequistionSchema;
    },
    getItemList() {
      return this.$store.getters.getCenLsDistToRegDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Question Recognition Entry"
        : "Edit Question Recognition ";
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

    save() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("saveQuestionRequisitionData", item)
        .then(function (data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            //self.$store.dispatch("fetchCenLsDistToRegData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editQuestionRequisitionData", item)
        .then(function (data) {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_QUESTION_REQUISITION_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
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
