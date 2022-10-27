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
                  name="reg_no"
                  label="Registration Number"
                  v-model="getSchema.reg_no"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('reg_no')"
                  data-vv-name="reg_no"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <!-- exam  -->
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
                  :error-messages="errors.collect('exam')"
                  data-vv-name="exam"
                  name="exam"
                  required
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{ "(" + data.item.code + ") " + data.item.title }}
                    </v-chip>
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
          <!--     {{getPaperList}} -->
              <v-flex xs12>
                <v-autocomplete
                  v-model="getSchema.paper_code"
                  :items="getPaperList"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  label="Select Course"
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
                    >
                      {{ "(" + data.item.code + ") " + data.item.title }}
                    </v-chip>
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
                  v-model="getSchema.year"
                  :items="getYearList"
                  :item-text="item => '' + item.year + ''"
                  item-value="year"
                  label="Select Year"
                  prepend-icon="calendar_today"
                  class="ml-0"
                  hide-selected
                  single-line
                  flat
                  background-color="#FAFAFA"
                  :hint="getSchema.year ? 'Selected Year' : ''"
                  :persistent-hint="getSchema.year ? true : false"
                  style="padding-left: 0px; padding-right: 0px;"
                  no-data-text="Please wait, We are fetching the year data"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="#FAFAFA"
                      close
                      @input="year = {}"
                      :selected="data.selected"
                    >
                      <span class="subheading">{{ data.item.year }}</span>
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.year"
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
                  v-model="expel_date_menu"
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
                      :value="computedDateFormattedMomentjs"
                      prepend-icon="event"
                      clearable
                      label="Expel Date"
                      hide-details
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.expel_date"
                    @change="expel_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-menu
                  v-model="punishment_start_menu"
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
                      :value="computedDateFormattedMomentjs2"
                      prepend-icon="event"
                      clearable
                      label="Punishment Start Date"
                      hide-details
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.punishment_start"
                    @change="punishment_start_menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-menu
                  v-model="punishment_end_menu"
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
                      :value="computedDateFormattedMomentjs3"
                      prepend-icon="event"
                      clearable
                      label="punishment End Date"
                      hide-details
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.punishment_end"
                    @change="punishment_end_menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  v-model="getSchema.remarks"
                  auto-grow
                  label="Remarks"
                  name="remarks"
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
import moment from "moment";
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
  props: ["dialogStatus", "editedData","indexEdited"],
  data: () => ({
    expel_date_menu: false,
    punishment_end_menu: false,
    punishment_start_menu: false,
    dialog: false,
    dateMenu: false,
    dictionary: {
      custom: {
        reg_no: {
          required: () => "Registration No. field can not be empty.",
          numeric: "Registration No.field may only contain numeric characters"
        },
        exam_code: {
          required: () => "Select Exam"
        },
        paper_code: {
          required: () => "Select Paper"
        },
        year: {
          required: () => "Select Year"
        }
      }
    }
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.ifExamSchema = true;
    this.ifYearSchema = true;
    this.$store.dispatch("fetchPaperData");
    // if (this.$store.getters.getExamItem.length < 1) {
    //   this.$store.dispatch("fetchExamData");
    // }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_EXPEL_DATA_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getExpelDataSchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.editedData.id === -1
        ? "Add New Student To Expulsion List"
        : "Edit Expelled Student Details";
    },
    computedDateFormattedMomentjs() {
      return this.getSchema.expel_date
        ? moment(this.getSchema.expel_date).format("dddd, MMMM Do YYYY")
        : "";
    },
    computedDateFormattedMomentjs2() {
      return this.getSchema.punishment_start
        ? moment(this.getSchema.punishment_start).format("dddd, MMMM Do YYYY")
        : "";
    },
    computedDateFormattedMomentjs3() {
      return this.getSchema.punishment_end
        ? moment(this.getSchema.punishment_end).format("dddd, MMMM Do YYYY")
        : "";
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
      console.log("schema item dddd   ", item);
      this.$store
        .dispatch("saveExpelItem", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchExpelDataList");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchExpelDataList");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editExpelItem", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchExpelDataList");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchExpelDataList");
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_EXPEL_DATA_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
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
