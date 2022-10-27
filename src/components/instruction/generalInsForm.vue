<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="text-uppercase">
            {{ formTitle }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-spacer class="pb-4"></v-spacer>
          <v-card>
            <v-layout row wrap align-center>
              <v-flex xs12 sm12 offset-sm0>
                <v-form>
                  <table width="100%" class="elevation-1">
                    <thead>
                      <tr>
                        <th>Instruction</th>
                        <!--<th>Display Type</th>-->
                        <th>Expire Date</th>
                        <th>Display To</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- add part -->
                      <tr
                        v-if="editedIndex == 0"
                        v-for="(instruction, index) in instructions"
                        :key="index"
                      >
                        <td style="display: block">
                          <ckeditor
                            :editor="editor"
                            v-model="instruction.instruction"
                            :config="editorConfig"
                            style="min-height: 500px;"
                          ></ckeditor>
                          <!--
                        <v-textarea
                          name="instruction"
                          label="Instruction"
                          v-model="instruction.instruction"
                          v-validate="'required'"
                          data-vv-name="instruction"
                          prepend-icon="edit"
                          required
                        ></v-textarea>
                        --></td>
                        <!--
                        <td style="width: 154px;">
                          <v-select
                            v-model="instruction.display_type"
                            :items="getDisplayTypes"
                            item-text="type_name"
                            item-value="type_id"
                            label="Display Type"
                          ></v-select>
                        </td>
                        -->
                        <td style="width: 154px;">
                          <v-menu
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
                                v-model="instruction.expire_date"
                                label="Expire Date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                data-vv-name="expire_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="instruction.expire_date"
                              @input="expire_date = false"
                            ></v-date-picker>
                          </v-menu>
                        </td>

                        <td>
                          <v-checkbox style="padding-bottom: 0px;"
                            v-model="instruction.student_panel"
                            value="1"
                            label="Student Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="instruction.college_panel"
                            value="1"
                            label="College Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="instruction.college_user_panel"
                            value="1"
                            label="College User Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>

                          <v-checkbox
                            v-model="instruction.center_panel"
                            value="1"
                            label="Center Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>

                          <v-checkbox
                            v-model="instruction.examineer_panel"
                            value="1"
                            label="Examineer Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                        </td>
                        <td>
                          <v-checkbox
                            v-model="instruction.status"
                            value="1"
                            label="Published"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                        </td>
                        <td>
                          <v-btn
                            v-if="index"
                            fab
                            dark
                            small
                            color="red"
                            @click="remove(index)"
                          >
                            <v-icon dark>clear</v-icon>
                          </v-btn>
                        </td>
                      </tr>

                      <!-- update part -->
                      <tr v-if="editedIndex == 1">
                        <td style="display: block">
                          <ckeditor
                            class="myEditor"
                            :editor="editor"
                            v-model="instruction.instruction"
                            :config="editorConfig"
                          ></ckeditor>
                          <!--
                          <v-textarea
                            name="instruction"
                            label="Instruction"
                            v-model="instruction.instruction"
                            v-validate="'required'"
                            data-vv-name="instruction"
                            prepend-icon="edit"
                            required
                          ></v-textarea>
                          -->
                        </td>
                        <td style="width: 154px;">
                          <v-select
                            v-model="instruction.display_type"
                            :items="getDisplayTypes"
                            item-text="type_name"
                            item-value="type_id"
                            label="Display Type"
                          ></v-select>
                        </td>
                        <td style="width: 154px;">
                          <v-menu
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
                                v-model="instruction.expire_date"
                                label="Expire Date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                data-vv-name="expire_date"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="instruction.expire_date"
                              @input="expire_date = false"
                            ></v-date-picker>
                          </v-menu>
                        </td>

                        <td>
                          <v-checkbox
                            v-model="instruction.student_panel"
                            value="1"
                            label="Student Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="instruction.college_panel"
                            value="1"
                            label="College Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="instruction.college_user_panel"
                            value="1"
                            label="College User Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>

                          <v-checkbox
                            v-model="instruction.center_panel"
                            value="1"
                            label="Center Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>

                          <v-checkbox
                            v-model="instruction.examineer_panel"
                            value="1"
                            label="Examineer Panel"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                        </td>
                        <td>
                          <v-checkbox
                            v-model="instruction.status"
                            value="1"
                            label="Published"
                            type="checkbox"
                            color="indigo darken-3"
                          ></v-checkbox>
                        </td>
                        <td>
                          <v-btn
                            v-if="index"
                            fab
                            dark
                            small
                            color="red"
                            @click="remove(index)"
                          >
                            <v-icon dark>clear</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <v-layout v-if="editedIndex == 0">
                    <div class="justify-left layout px-0">
                      <v-btn fab dark small color="info" @click="addMore()">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </div>
                  </v-layout>
                  <v-layout>
                    <div class="justify-center layout px-0">
                      <v-btn color="success" @click="validate()">{{
                        buttonTitle
                      }}</v-btn>
                    </div>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

import CKEditor from "@ckeditor/ckeditor5-vue2";

Vue.use(CKEditor);

Vue.use(VeeValidate);
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["dialogStatus", "editedItem", "editedIndex"],

  data: () => ({
    editor: ClassicEditor,
    //editorData: '<p>Content of the editor.</p>',
    editorConfig: {
      // The configuration of the editor.
    },
    dialog: false,
    expire_date: false,
    instruction: {},
    instructions: [
      {
        instruction: "",
        display_type: "",
        expire_date: "",
        display_to: "",
        instruction_type: 1
      }
    ]
  }),

  computed: {
    getDisplayTypes() {
      return [
        { type_id: "1", type_name: "Scroll" },
        // { type_id: "2", type_name: "Highlight" },
        { type_id: "3", type_name: "Slide" }
      ];
    },
    getSchema() {
      return this.$store.getters.getSchemaCvStudentList;
    },
    buttonTitle() {
      return this.editedIndex == 0 ? "Submit" : "Update";
    },
    formTitle() {
      return this.editedIndex == 0
        ? "Add General Instruction"
        : "Edit General Instruction";
    }
  },

  methods: {
    addMore() {
      this.instructions.push({
        instruction: "",
        display_type: "",
        expire_date: "",
        display_to: "",
        instruction_type: 1
      });
    },
    remove(index) {
      this.instructions.splice(index, 1);
    },

    validate() {
      this.editedIndex == 0 ? this.save() : this.edit();
    },

    save() {
      console.log(this.instructions);
      let self = this;
      this.$store
        .dispatch("submitInstruction", self.instructions)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInstructionList", {
            instruction_type: 1
          });
        })
        .catch(function(error) {
          self.$store.dispatch("getInstructionList", {
            instruction_type: 1
          });
        });
    },

    edit() {
      let self = this;

      let item = _.pick(this.instruction, [
        "id",
        "instruction",
        "display_type",
        "expire_date",
        "student_panel",
        "degree_code",
        "degree_group_code",
        "subject_code",
        "college_panel",
        "college_user_panel",
        "center_panel",
        "examineer_panel",
        "status"
      ]);
      self.$store
        .dispatch("updateInstruction", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInstructionList", {
            instruction_type: 1
          });
        })
        .catch(function(error) {
          self.close();
          self.$store.dispatch("getInstructionList", {
            instruction_type: 1
          });
        });
    },

    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  },

  watch: {
    dialogStatus(val) {
      this.instruction = this.editedItem;
      this.dialog = val;
      if (val) {
        //this.getDataFromApi();
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
