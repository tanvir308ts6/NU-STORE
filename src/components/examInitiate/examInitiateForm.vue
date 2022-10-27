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
        <formNotification />
        <v-card-text>
          <v-card flat class="pa-3 pr-3 scroll">
            <v-form>
              <v-flex xs12>
                <v-autocomplete
                  label="Select Exam"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  v-model="getSchema.exam_code"
                  :items="getExamList"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam')"
                  data-vv-name="exam"
                  required
                  prepend-inner-icon="edit"
                  outline
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{ data.item.code + " - " + data.item.title }}
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
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <!-- {{ getSchema.exam_type }} -->
              <v-flex xs12>
                <v-autocomplete
                  label="Select Exam Type"
                  item-text="exam_type_name"
                  item-value="exam_type"
                  v-model="getSchema.exam_type"
                  :items="getExamType"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_type')"
                  data-vv-name="exam_type"
                  required
                  prepend-inner-icon="edit"
                  outline
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_type = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.exam_type_name }}</v-chip
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
                          v-html="data.item.exam_type_name"
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
                  color="primary"
                  label="Select Year"
                  item-text="year"
                  item-value="year"
                   prepend-inner-icon="calendar_today"
                  outline
                >
                  <template v-slot:selection="data">
                    <v-chip
                      color="grey lighten-4"
                      close
                      @input="getSchema.year = ''"
                      :selected="data.selected"
                    >
                      <span class="subheading">{{ data.item.year }}</span>
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
                          v-html="data.item.year"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12>
                <!-- {{getSchema}} -->
                <v-autocomplete
                  label="Select Session"
                  item-text="session"
                  item-value="session"
                  v-model="getSchema.session"
                  :items="getSessionList"
                  v-validate="'required'"
                  :error-messages="errors.collect('session')"
                  data-vv-name="session"
                  required
                  prepend-inner-icon="edit"
                  outline
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ getSchema.session }}</v-chip
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
                        <v-list-tile-title>{{
                          data.item.session
                        }}</v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <!-- <v-flex xs12>
                <v-layout row wrap align-center>
                  <v-text-field
                    prepend-inner-icon="attach_file"
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
                    flat
                    color="red white--text "
                    @click="cancel()"
                    v-if="showCancel"
                  >
                    <v-icon medium>close</v-icon>
                  </v-btn>
                </v-layout>
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
import formNotification from "@/components/utils/formNotification";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import commonFun from "@/mixin/common_function";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonFun, commonGet, commonExamYear, common_login_getters],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  props: ["dialogStatus", "editedData", "indexEdited", "getDataFromApi"],
  data: () => ({
    showCancel: false,
    file: "",
    file_name: "",
    file_file: "",
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    sessions: ["2011-2012", "2012-2013", "2013-2014", "2015-2016"],
    examTypeItems: [1, 2],
    dictionary: {
      custom: {
        loose_qty: {
          required: () => "Script quantity field can not be empty.",
          numeric: "Script quantity field may only contain numeric characters.",
        },
        date: {
          required: () => "Date can not be empty.",
        },
        regional_center_id: {
          required: () => "Select Regional Center.",
        },
        exam_id: {
          required: () => "Select Exam.",
        },
      },
    },
  }),
  created() {
    //session
    this.$store.dispatch("fetchAllSessionData");

    // getSchema.exam_type = 1;
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData");
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifFormSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_EXAM_INITIATE_SCHEMA", this.editedData);
      // this.file_name = this.getSchema.notice_url;
      // this.file = this.getSchema.notice_url;
      // this.file_file = this.getSchema.notice_url;
      // this.indexEdited === -1 ? (this.showCancel = false)
      //   : (this.showCancel = true);
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getExamInitiateItem() {
      return this.$store.getters.getExamInitiateList;
    },
    getSchema() {
      return this.$store.getters.getExamInitiateSchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "New Exam Initiate .. "
        : "Edit Exam Initiate ";
    },
    getExamType() {
      return [
        { exam_type_name: "General/Regular", exam_type: 1 },
        { exam_type_name: "Special", exam_type: 2 },
      ];
    },
  },
  methods: {
    onFocus() {
      document.getElementById("file-upload").click();
    },
    onFileChange(e) {
      console.log("...m up", e.target.files[0]);

      var files = e.target.files[0];
      if (files !== undefined) {
        this.file_name = files.name;
        if (this.file_name.lastIndexOf(".") <= 0) {
          return alert("Please add a valid file!");
        }
        this.file_file = files;
        this.showCancel = true;
      } else {
        this.cancel();
      }
    },
    cancel() {
      this.showCancel = false;
      if (this.file_file != this.file) {
        this.file_file = this.file;
        this.file_name = this.file;
      } else {
        this.file_name = "";
        this.file_file = "";
      }
    },
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
     // item.exam_type = 1; // this needs attention auto exam type general set 

      // let formData = new FormData();
      // formData.append("session", this.getSchema.session);
      // formData.append("exam_type", this.getSchema.exam_type);
      // formData.append("exam_code", this.getSchema.exam_code);
      // formData.append("year", this.getSchema.year);
      // formData.append("file", this.file_file);
      // // formData.append("exam_initiate_id", this.getExamInitiateId);

      // console.log(...formData);

      this.$store
        .dispatch("saveExamInitiateData", item)
        .then(function() {
          try {
            self.close();
            self.getDataFromApi();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editExamInitiateData", item)
        .then(function() {
          try {
            self.close();
            self.getDataFromApi();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_EXAM_INITIATE_SCHEMA");
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
