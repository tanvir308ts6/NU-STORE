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
              <v-icon medium>close...</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-flex xs12>
                <v-autocomplete
                  name="activity_id"
                  class="ma-2"
                  v-model="getSchema.activity_id"
                  item-text="activity_name"
                  item-value="id"
                  :items="getExamActivityList"
                  menu-props="auto"
                  label="Select Exam Activity"
                  hide-details
                  v-validate="'required'"
                  :error-messages="errors.collect('activity_id')"
                  data-vv-name="activity_id"
                  required
                  prepend-icon="calendar_today"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.activity_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.activity_name }}</v-chip
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
                          v-html="data.item.activity_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 class="ma-2">
                <div class="subtitle-1 mb-2 mt-3">Notice:</div>
                <v-textarea
                  outline
                  class="ma-3"
                  color="primary"
                  auto-grow
                  single-line
                  v-model="getSchema.notice"
                  name="notice"
                  label="Write here........"
                  value
                  required
                  v-validate="'required'"
                  :error-messages="errors.collect('notice')"
                  data-vv-name="notice"
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap align-center>
                  <!-- <v-btn color="blue-grey" class="black--text" @click.native="openFileDialog">
                    Upload
                    <v-icon right dark>cloud_upload</v-icon>
                  </v-btn>
                  <input type="file" id="file-upload" style="display:none" @change="onFileChange" />-->

                  <v-text-field
                    prepend-icon="attach_file"
                    single-line
                    v-model="file"
                    label="upload"
                    required
                    @click.native="onFocus"
                    ref="fileTextField"
                  ></v-text-field>
                  <input
                    type="file"
                    style="display:none"
                    id="file-upload"
                    @change="onFileChange($event)"
                  />
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  v-model="manu_end"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="getSchema.from_date"
                      label="From Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      required
                      v-validate="'required'"
                      :error-messages="errors.collect('from_date')"
                      data-vv-name="from_date"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.from_date"
                    @input="manu_end = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  v-model="manu_end2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="getSchema.to_date"
                      label="To Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      required
                      v-validate="'required'"
                      :error-messages="errors.collect('to_date')"
                      data-vv-name="to_date"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.to_date"
                    @input="manu_end2 = false"
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
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "searchRescrutinyNotice"
  ],
  data: () => ({
    file: "",
    form: new FormData(),
    dialog: false,
    editedStatus: false,
    manu_end: false,
    manu_end2: false,
    subPap: {
      paper_loading: false
    },
    dictionary: {
      custom: {
        notice: {
          required: () => "Notice field can not be empty."
        },
        activity_id: {
          required: () => "select Exam Activity."
        },
        from_date: {
          required: () => "From Date field can not be empty."
        },
        to_date: { required: () => "To Date field can not be empty." }
      }
    }
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
    var limit = {
      page: 1,
      limit: 1000
    };
    this.$store.dispatch("fetchExamActivitiesData", limit);
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;

    console.log("schema", this.getSchema);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.editedData.exam_code = this.$store.getters.getLoggedInExam.code;
      this.editedData.year = this.$store.getters.getLoggedInYear.year;
      this.$store.commit("SET_RESCRUTINY_NOTICE_SCHEMA", this.editedData);
      this.file = this.getSchema.name;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getRescrutinyNoticeSchema;
    },
    getExamActivityList() {
      return this.$store.getters.getActivitiesData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Notice " : "Edit Notice ";
    }
  },
  methods: {
    onFocus() {
      document.getElementById("file-upload").click();
    },
    // onFocus () { this.$refs.fileInput.click() },
    onFileChange(e) {
      console.log("...m up", e.target.files[0]);
      var self = this;
      var files = e.target.files[0] || e.dataTransfer.files[0];
      // if (files.length > 0) {
      console.log("...m up", files);
      if (files !== undefined) {
        this.file = files.name;
        if (this.file.lastIndexOf(".") <= 0) {
          return alert("Please add a valid image file!");
        }
        // for (var i = 0; i < files.length; i++) {
        self.form.append("name", files.name);
        self.form.append("file", files);
        // self.formData.append("file", files[i], files[i].name);
        console.log(...this.form);
      }
    },
    validationForm() {
      console.log("schemssssss ", this.getSchema);
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    save() {
      this.form.append("activity_id", this.getSchema.activity_id);
      this.form.append("notice", this.getSchema.notice);
      this.form.append("from_date", this.getSchema.from_date);
      this.form.append("to_date", this.getSchema.to_date);
      this.form.append("exam_code", this.$store.getters.getLoggedInExam.code);
      this.form.append("year", this.$store.getters.getLoggedInYear.year);
      this.form.append("exam_initiate_id", this.getExamInitiateId);

      let self = this;
      // let item = this.getSchema;
      // item.exam_code =
      // item.year = ;
      // item.exam_initiate_id = ;
      // item.file = this.form;
      this.$store
        .dispatch("saveRescrutinyNoticeData", this.form)
        .then(function() {
          try {
            self.close();
            self.searchRescrutinyNotice();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.searchRescrutinyNotice();
        });
    },
    edit() {
      let self = this;
      let item = {
        item: this.getSchema,
        form: this.form
      };
      // this.form.append("id", this.getSchema.id);
      // this.form.append("activity_id", this.getSchema.activity_id);
      // this.form.append("notice", this.getSchema.notice);
      // this.form.append("from_date", this.getSchema.from_date);
      // this.form.append("to_date", this.getSchema.to_date);
      // this.form.append("exam_code", this.getSchema.exam_code);
      // this.form.append("year", this.getSchema.year);
      // this.form.append("exam_initiate_id", this.getSchema.exam_initiate_id);
      this.$store
        .dispatch("editRescrutinyNoticeData", item)
        .then(function() {
          self.close();
          self.searchRescrutinyNotice();
        })
        .catch(function(error) {
          console.log(error);
          self.searchRescrutinyNotice();
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_RESCRUTINY_NOTICE_SCHEMA");
      this.$validator.reset();
      this.file = "";
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
