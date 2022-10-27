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
                    v-model="file_name"
                    label="upload"
                    name="filename"
                    @click.native="onFocus"
                    ref="fileTextField"
                  ></v-text-field>
                  <input
                    type="file"
                    ref="inputUpload4"
                    style="display:none"
                    id="file-upload"
                    @change="onFileChange($event)"
                    @click="$refs.inputUpload4.value = null"
                  />
                  <v-btn
                    fab
                    small
                    color="red white--text "
                    @click="cancel()"
                    v-if="showCancel"
                  >
                    <v-icon medium>close</v-icon>
                  </v-btn>
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
                      v-model="getSchema.start_date"
                      label="From Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      required
                      v-validate="'required'"
                      :error-messages="errors.collect('start_date')"
                      data-vv-name="start_date"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.start_date"
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
                      v-model="getSchema.end_date"
                      label="To Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      required
                      v-validate="'required'"
                      :error-messages="errors.collect('end_date')"
                      data-vv-name="end_date"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getSchema.end_date"
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
    validator: "new",
  },
  components: {
    formNotification,
  },
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "searchTimelineSetupData",
  ],
  data: () => ({
    filechaged: false,
    showCancel: false,
    file: "",
    file_name: "",
    file_file: "",
    dialog: false,
    editedStatus: false,
    manu_end: false,
    manu_end2: false,
    subPap: {
      paper_loading: false,
    },
    dictionary: {
      custom: {
        notice: {
          required: () => "Notice field can not be empty.",
        },
        activity_id: {
          required: () => "select Exam Activity.",
        },
        start_date: {
          required: () => "From Date field can not be empty.",
        },
        end_date: { required: () => "To Date field can not be empty." },
      },
    },
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
    var limit = {
      page: 1,
      limit: 1000,
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
      // this.editedData.exam_code = this.$store.getters.getLoggedInExam.code;
      // this.editedData.year = this.$store.getters.getLoggedInYear.year;
      this.$store.commit("SET_TIMELINE_SETUP_SCHEMA", this.editedData);
      this.file_name = this.getSchema.notice_url;
      this.file = this.getSchema.notice_url;
      this.file_file = this.getSchema.notice_url;
      this.indexEdited === -1
        ? (this.showCancel = false)
        : (this.showCancel = true);
      // if (this.getSchema.notice_url != null) {
      //   this.showCancel = true;
      // } else {
      //   this.showCancel = false;
      // }
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getSchema() {
      return this.$store.getters.getTimelineSetupSchema;
    },
    getExamActivityList() {
      return this.$store.getters.getActivitiesData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Notice " : "Edit Notice ";
    },
  },
  methods: {
    onFocus() {
      document.getElementById("file-upload").click();
    },
    // onFocus () { this.$refs.fileInput.click() },
    onFileChange(e) {
      console.log("...m up", e.target.files[0]);
      //var self = this;
      var files = e.target.files[0];
      // if (files.length > 0) {
      if (files !== undefined) {
        this.file_name = files.name;
        if (this.file_name.lastIndexOf(".") <= 0) {
          return alert("Please add a valid file!");
        }
        // for (var i = 0; i < files.length; i++) {
        // self.form.append("name", files.name);
        // self.form.append("file", files);

        // self.file_name = files.name;
        this.file_file = files;

        // self.formData.append("file", files[i], files[i].name);
        this.showCancel = true;
        this.filechaged = true;
      } else {
        this.cancel();
      }
    },
    cancel() {
      this.showCancel = false;
      this.filechaged = false;
      if (this.file_file != this.file) {
        this.file_file = this.file;
        this.file_name = this.file;
        this.showCancel = true;
      } else {
        this.file_name = "";
        this.file_file = "";
      }
    },
    validationForm() {
      console.log("schemssssss ", this.getSchema);
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    save() {
      let formData = new FormData();
      formData.append("activity_id", this.getSchema.activity_id);
      formData.append("notice", this.getSchema.notice);
      formData.append("start_date", this.getSchema.start_date);
      formData.append("end_date", this.getSchema.end_date);
      // formData.append("exam_code", this.$store.getters.getLoggedInExam.code);
      // formData.append("year", this.$store.getters.getLoggedInYear.year);
      formData.append("file", this.file_file);
      formData.append("exam_initiate_id", this.getExamInitiateId);

      console.log(...formData);

      let self = this;
      this.$store
        .dispatch("saveTimelineSetUpData", formData)
        .then(function () {
          try {
            self.close();
            self.searchTimelineSetupData();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          self.searchTimelineSetupData();
        });
    },
    edit() {
      let form = new FormData();
      form.append("activity_id", this.getSchema.activity_id);
      form.append("notice", this.getSchema.notice);
      form.append("start_date", this.getSchema.start_date);
      form.append("end_date", this.getSchema.end_date);
      // form.append("exam_code", this.$store.getters.getLoggedInExam.code);
      // form.append("year", this.$store.getters.getLoggedInYear.year);
      form.append("exam_initiate_id", this.getSchema.exam_initiate_id);
      if (this.filechaged) {
        form.append("file", this.file_file);
      } else {
        form.append("file", "");
      }

      console.log(...form);

      let self = this;
      // let form = new FormData();
      // form.append("notice_url", this.file_file);
      // let item = {
      //   item: this.getSchema,
      //   form: form
      // };
      this.$store
        .dispatch("editTimelineSetUpData", form)
        .then(function () {
          self.close();
          self.searchTimelineSetupData();
        })
        .catch(function (error) {
          console.log(error);
          self.searchTimelineSetupData();
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_TIMELINE_SETUP_SCHEMA");
      this.$validator.reset();
      this.file = "";
      this.showCancel = false;
      this.filechaged = false;
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
