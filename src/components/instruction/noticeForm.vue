<template>
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
        <v-form>
          <v-flex xs12 class="ma-2">
            <div class="subtitle-1 mb-2 mt-3">Notice Title:</div>
            <v-textarea
              outline
              class="ma-3"
              color="primary"
              auto-grow
              single-line
              v-model="getSchema.title"
              name="title"
              label="Write here........"
              value
              required
              v-validate="'required'"
              :error-messages="errors.collect('title')"
              data-vv-name="title"
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
            <p style="margin-left: 30px;color: #3f51b5;">
              File type pdf, max size 5MB
            </p>
          </v-flex>

          <v-flex xs12>
            <v-menu
              v-model="from_date"
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
                @input="from_date = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12>
            <v-menu
              v-model="to_date"
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
                @input="to_date = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex md12>
            <fieldset>
              <legend>Published To</legend>
              <v-checkbox
                v-model="getSchema.student_panel"
                value="1"
                label="Student Panel"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>
              <v-checkbox
                v-model="getSchema.college_panel"
                value="1"
                label="College Panel"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>
              <v-checkbox
                v-model="getSchema.college_user_panel"
                value="1"
                label="College User Panel"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>

              <v-checkbox
                v-model="getSchema.center_panel"
                value="1"
                label="Center Panel"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>

              <v-checkbox
                v-model="getSchema.examineer_panel"
                value="1"
                label="Examineer Panel"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>
            </fieldset>
            <fieldset>
              <legend>Status</legend>
              <v-checkbox
                v-model="getSchema.status"
                value="1"
                label="Published"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>
            </fieldset>
          </v-flex>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}</v-btn
          >
          <!--
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
          -->
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogStatus", "editedItem", "editedIndex"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    landscape: false,
    reactive: false,
    dialog: false,
    editedStatus: false,
    filechaged: false,
    showCancel: false,
    from_date: false,
    to_date: false,
    attachment: "",
    file: "",
    file_name: "",
    file_file: "",
    dictionary: {
      custom: {
        title: {
          required: () => "Title Field Is Required"
        },
        attachment: {
          required: () => "Attachment Is Required"
        },
        from_date: {
          required: () => "From Date Field Is Required"
        },
        to_date: {
          required: () => "To Date Field Is Required"
        }
      }
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getSingleNotice;
    },
    buttonTitle() {
      return this.editedIndex == 0 ? "Submit" : "Update";
    },
    formTitle() {
      return this.editedIndex == 0 ? "Add New Notice" : "Edit Notice";
    }
  },
  methods: {
    onFocus() {
      document.getElementById("file-upload").click();
    },
    onFileChange(e) {
      console.log("file", e.target.files[0]);
      let file = e.target.files[0];
      var files = e.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        this.attachment = event.target.result;
      };
      reader.readAsDataURL(file);
      if (files !== undefined) {
        this.file_name = files.name;
        if (this.file_name.lastIndexOf(".") <= 0) {
          return alert("Please add a valid file!");
        }
        //this.file = files;
        this.filechaged = true;
        this.showCancel = true;
      } else {
        this.cancel();
      }
    },

    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.editedIndex == -0 ? this.save() : this.edit();
        }
      });
    },
    save() {
      let formData = new FormData();
      formData.append("title", this.getSchema.title);
      formData.append("attachment", this.attachment);
      formData.append("from_date", this.getSchema.from_date);
      formData.append("to_date", this.getSchema.to_date);
      formData.append("student_panel", this.getSchema.student_panel);
      formData.append("college_panel", this.getSchema.college_panel);
      formData.append("college_user_panel", this.getSchema.college_user_panel);
      formData.append("center_panel", this.getSchema.center_panel);
      formData.append("examineer_panel", this.getSchema.examineer_panel);
      formData.append("status", this.getSchema.status);

      let self = this;
      this.$store
        .dispatch("submitNotice", formData)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInstNoticeList");
        })
        .catch(function(error) {
          //self.close();
          self.$store.dispatch("getInstNoticeList");
        });
    },
    edit() {
      let self = this;
      if (self.filechaged) {
        self.getSchema.attachment = self.attachment;
      }

      let item = _.pick(self.getSchema, [
        "id",
        "title",
        "attachment",
        "from_date",
        "to_date",
        "student_panel",
        "college_panel",
        "college_user_panel",
        "center_panel",
        "examineer_panel",
        "status"
      ]);
      self.$store
        .dispatch("updateNotice", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInstNoticeList");
        })
        .catch(function(error) {
          self.$store.dispatch("getInstNoticeList");
        });
    },
    clear() {
      this.$validator.reset();
    },
    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 100);
      this.clear();
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
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("GET_SINGLE_NOTICE", this.editedItem);
      this.file_name = this.getSchema.attachment;
      this.file = this.getSchema.attachment;
      this.file_file = this.getSchema.attachment;
      this.indexEdited === -1
        ? (this.showCancel = false)
        : (this.showCancel = true);
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}

fieldset {
  border: 1px solid #ddd !important;
  margin-top: 25px;
  xmin-width: 0;
  padding: 0px;
  position: relative;
  border-radius: 4px;
  padding-left: 10px !important;
}

legend {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0px;
  width: 35%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 5px 5px 10px;
  background-color: #ffffff;
}
</style>
