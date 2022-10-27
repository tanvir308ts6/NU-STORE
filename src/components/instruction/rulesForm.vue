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
            <div class="subtitle-1 mb-2 mt-3">Rule:</div>
            <v-textarea
              outline
              class="ma-3"
              color="primary"
              auto-grow
              single-line
              v-model="getSchema.rule"
              name="rule"
              label="Write here........"
              value
              required
              v-validate="'required'"
              :error-messages="errors.collect('rule')"
              data-vv-name="rule"
            ></v-textarea>
          </v-flex>

          <v-flex xs12>
            <v-menu
              v-model="expire_date"
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
                  v-model="getSchema.expire_date"
                  label="Expire Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  data-vv-name="expire_date"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="getSchema.expire_date"
                @input="expire_date = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-checkbox
            v-model="getSchema.student_panel"
            value="1"
            label="Student Panel"
            type="checkbox"
            color="indigo darken-3"
          ></v-checkbox>
          <!--
            <v-flex xs12 v-if="getSchema.student_panel">
                <v-select
                    name="degree_code"
                    label="Degree"
                    v-model="getSchema.degree_code"
                    :items="getDegrees"
                    :item-text=" (item) => item.degree_code + '-' + item.degree_name "
                    item-value="degree_code"
                    data-vv-name="degree_code"
                    @change="degreeGroupData"
                    prepend-icon="edit"
                    clearable
                ></v-select>
            </v-flex>
            <v-flex xs12 v-if="getSchema.student_panel && getSchema.degree_code">  
              <v-select
                  name="degree_group_code"
                  label="Degree Group"
                  v-model="getSchema.degree_group_code"
                  :items="getDegreeGroup"
                  :item-text=" (item) => item.degree_group_code + '-' + item.degree_group_name "
                  item-value="degree_group_code"
                  data-vv-name="degree_group_code"
                  @change="getSubjectData"
                  prepend-icon="edit"
                  clearable
              ></v-select>
            </v-flex>

            <v-flex xs12 v-if="getSchema.student_panel && getSchema.degree_group_code">
              <v-select
                  name="subject_code"
                  label="Subject"
                  v-model="getSchema.subject_code"
                  :items="getSubject"
                  :item-text=" (item) => item.subject_code + '-' + item.subject_name "
                  item-value="subject_code"
                  data-vv-name="subject_code"
                  prepend-icon="edit"
                  clearable
              ></v-select>
            </v-flex>
            -->
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
            v-model="getSchema.status"
            value="1"
            label="Active"
            type="checkbox"
            color="indigo darken-3"
          ></v-checkbox>
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
          <!--<v-btn color="primary  white--text" @click="clear">Reset</v-btn>-->
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
    expire_date: false,
    dictionary: {
      custom: {
        rule: {
          required: () => "Rules Field Is Required"
        }
      }
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getSingleRules;
    },
    getDegrees() {
      return this.$store.getters.getAllDegree;
    },
    getDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getSubject() {
      return this.$store.getters.getAllSubject;
    },
    buttonTitle() {
      return this.editedIndex == 0 ? "Submit" : "Update";
    },
    formTitle() {
      return this.editedIndex == 0 ? "Add New Rules" : "Edit Rules";
    }
  },
  methods: {
    onFocus() {
      document.getElementById("file-upload").click();
    },

    degreeGroupData(degree_code) {
      if (degree_code) {
        this.$store.dispatch("fetchAllDegreeGroupData", {
          params: { degree_code: degree_code }
        });
      }
    },

    getSubjectData(degree_group_code) {
      this.$store.dispatch("fetchAllSubjectData", {
        params: { degree_group_code: degree_group_code }
      });
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
      formData.append("rule", this.getSchema.rule);
      formData.append("expire_date", this.getSchema.expire_date);
      formData.append("student_panel", this.getSchema.student_panel);
      // formData.append("degree_code", this.getSchema.degree_code);
      // formData.append("degree_group_code", this.getSchema.degree_group_code);
      // formData.append("subject_code", this.getSchema.subject_code);
      formData.append("college_panel", this.getSchema.college_panel);
      formData.append("college_user_panel", this.getSchema.college_user_panel);
      formData.append("center_panel", this.getSchema.center_panel);
      formData.append("status", this.getSchema.status);

      let self = this;
      this.$store
        .dispatch("submitRule", formData)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInstRulesList");
        })
        .catch(function(error) {
          self.close();
          self.$store.dispatch("getInstRulesList");
        });
    },
    edit() {
      let self = this;

      let item = _.pick(self.getSchema, [
        "id",
        "rule",
        "expire_date",
        "student_panel",
        "degree_code",
        "degree_group_code",
        "subject_code",
        "college_panel",
        "college_user_panel",
        "center_panel",
        "status"
      ]);
      self.$store
        .dispatch("updateRule", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInstRulesList");
        })
        .catch(function(error) {
          self.close();
          self.$store.dispatch("getInstRulesList");
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
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("GET_SINGLE_RULES", this.editedItem);
      this.indexEdited === -0
        ? (this.showCancel = false)
        : (this.showCancel = true);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    this.$store.dispatch("fetchAllDegreeData");
    this.$store.dispatch("fetchAllDegreeGroupData");
    this.$store.dispatch("fetchAllSubjectData");
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
