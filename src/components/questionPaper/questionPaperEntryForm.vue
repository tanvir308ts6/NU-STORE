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
                  v-model="getSchema.exam_year"
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
                <v-autocomplete
                  v-model="getSchema.center_code"
                  :items="getCenterList"
                  color="blue-grey lighten-2"
                  label="Select Center"
                  :item-text="
                    item => '(' + item.center_code + ') ' + item.center_name
                  "
                  item-value="center_code"
                  prepend-icon="subject"
                  v-validate="'required'"
                  :error-messages="errors.collect('form1.center_id')"
                  data-vv-name="center_id"
                  required
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.center_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" +
                          data.item.center_code +
                          ") " +
                          data.item.center_name
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
                          v-html="
                            '(' +
                              data.item.center_code +
                              ') ' +
                              data.item.center_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="college_code"
                  label="College Code"
                  v-validate="'required'"
                  v-model="getSchema.college_code"
                  :error-messages="errors.collect('college_code')"
                  data-vv-name="college_code"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  v-model="getSchema.subject_code"
                  :items="getSubjectList"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  persistent-hint
                  v-validate="'required'"
                  :error-messages="errors.collect('subject_code')"
                  data-vv-name="subject_code"
                  name="subject_code"
                  required
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.subject_code = ''"
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
                  v-model="getSchema.paper_code"
                  :items="getPaperList"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  label="Select paper"
                  persistent-hint
                  v-validate="'required'"
                  :error-messages="errors.collect('paper_code')"
                  data-vv-name="paper_code"
                  name="paper_code"
                  required
                  prepend-icon="library_books"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.paper_code = ''"
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
                <v-text-field
                  name="qty"
                  label="Quantity"
                  v-model="getSchema.qty"
                  v-validate="'required'"
                  :error-messages="errors.collect('qty')"
                  data-vv-name="qty"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="size"
                  label="Packet Size"
                  v-model="getSchema.size"
                  v-validate="'required'"
                  :error-messages="errors.collect('size')"
                  data-vv-name="size"
                  required
                  prepend-icon="edit"
                ></v-text-field>
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
import formNotification from "@/components/utils/formNotification";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    regionalCenters: [],
    exams: [],
    dictionary: {
      custom: {
        college_code: {
          required: () => "College Code field can not be empty."
        },
        subject_code: {
          required: () => "Select Subject."
        },
        paper_code: {
          required: () => "Select Paper."
        },
        qty: {
          required: () => "Quantity can not be empty."
        },
        exam_code: {
          required: () => "Select Exam."
        },
        size: {
          required: () => "Packet Size can not be empty."
        },
        exam_year: {
          required: () => "Select Year."
        }
      }
    }
  }),
  created() {
    this.ifExamSchema = true;
    this.ifExamYearSchema = true;
    this.$store.dispatch("fetchPaperData");
    this.$store.dispatch("fetchSubjectData");
    this.$store.dispatch("fetchCenterData");
    //year
    if (!this.$store.getters.getYearItems.length) {
      console.log("----> ");
      this.$store.dispatch("fetchYearData");
    }
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
      this.$store.commit("SET_QUES_ENTRY_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getQuesEntrySchema;
    },
    getItemList() {
      return this.$store.getters.getQuesEntryDataList;
    },
    buttonTitle() {
      //return this.editedData.status == 0 ? "Receive" : "Received";
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Question Entry"
        : "Edit Question Entry";
    },
    getPaperList() {
      return this.$store.getters.getPaperItems;
    },
    getSubjectList() {
      return this.$store.getters.getSubjectItems;
    },
    getCenterList() {
      return this.$store.getters.getCenterItems;
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
      console.log("Save ", item);
      this.$store
        .dispatch("saveQuesEntryData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchQuesEntryData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchQuesEntryData");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editQuesEntryData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchQuesEntryData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchQuesEntryData");
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_QUES_ENTRY_SCHEMA");
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
