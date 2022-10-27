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
          <v-flex md12 v-if="editedIndex == 0">
            <v-select
              v-model="getSchema.exam_initiate_id"
              :items="getExamList"
              item-text="exam_display_name"
              item-value="id"
              label="Select Exam"
              data-vv-name="exam_display_name"
              :error-messages="errors.collect('exam_initiate_id')"
              required
              prepend-icon="edit"
            ></v-select>
            <v-text-field
              v-model="getSchema.question"
              name="question"
              label="Question"
              type="text"
              data-vv-name="question"
              prepend-icon="edit"
              required
              v-validate="'required'"
              :error-messages="errors.collect('question')"
            ></v-text-field>
          </v-flex>

          <v-flex md12 class="ma-2" v-if="editedIndex == 1">
            <p>
              Exam :
              <slot
                ><v-chip>{{
                  getSchema.exam_master.exam_display_name
                }}</v-chip></slot
              >
            </p>
            <p v-if="getSchema.user_type == 3">
              Sender :
              <slot
                ><v-chip>{{ getSchema.college_user.name }}</v-chip></slot
              >
            </p>
            <p>
              Question :
              <slot
                ><v-chip>{{ getSchema.question }}</v-chip></slot
              >
            </p>
          </v-flex>
          <v-flex xs12 class="ma-2">
            <div class="subtitle-1 mb-2 mt-3">Answer:</div>
            <v-textarea
              v-model="getSchema.answer"
              outline
              class="ma-3"
              color="primary"
              auto-grow
              single-line
              name="answer"
              label="Write here........"
              value
              required
              v-validate="'required'"
              :error-messages="errors.collect('answer')"
              data-vv-name="answer"
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
        question: {
          required: () => "Question Field Is Required"
        },
        answer: {
          required: () => "Answer Field Is Required"
        }
      }
    }
  }),

  computed: {
    getExamList() {
      return this.$store.getters.getInsFaqExamList;
    },
    getSchema() {
      return this.$store.getters.getSingleFaq;
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
      return this.editedIndex == 0 ? "New FAQ" : "Edit FAQ";
    }
  },
  methods: {
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
          this.editedIndex == 0 ? this.save() : this.edit();
        }
      });
    },
    save() {
      let formData = new FormData();
      formData.append("exam_initiate_id", this.getSchema.exam_initiate_id);
      formData.append("question", this.getSchema.question);
      formData.append("answer", this.getSchema.answer);
      formData.append("question_date", this.getSchema.question_date);
      formData.append("answer_date", this.getSchema.answer_date);
      formData.append("expire_date", this.getSchema.expire_date);
      formData.append("student_panel", this.getSchema.student_panel);
      formData.append("college_panel", this.getSchema.college_panel);
      formData.append("college_user_panel", this.getSchema.college_user_panel);
      formData.append("center_panel", this.getSchema.center_panel);
      formData.append("examineer_panel", this.getSchema.examineer_panel);
      formData.append("status", this.getSchema.status);

      let self = this;
      this.$store
        .dispatch("submitFaq", formData)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInsFaqList");
        })
        .catch(function(error) {
          self.$store.dispatch("getInsFaqList");
        });
    },
    edit() {
      let self = this;

      let item = _.pick(self.getSchema, [
        "id",
        "exam_initiate_id",
        "question",
        "answer",
        "question_date",
        "answer_date",
        "expire_date",
        "student_panel",
        "college_panel",
        "college_user_panel",
        "center_panel",
        "examineer_panel",
        "status"
      ]);
      self.$store
        .dispatch("updateFaq", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("getInsFaqList");
        })
        .catch(function(error) {
          self.$store.dispatch("getInsFaqList");
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
      this.$store.commit("GET_SINGLE_FAQ", this.editedItem);
      this.indexEdited === -0
        ? (this.showCancel = false)
        : (this.showCancel = true);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    //this.$store.dispatch("getInsFaqExamList");
    // this.$store.dispatch("fetchAllDegreeData");
    // this.$store.dispatch("fetchAllDegreeGroupData");
    // this.$store.dispatch("fetchAllSubjectData");
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
