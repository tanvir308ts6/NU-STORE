<template>
  <v-dialog v-model="dialog" max-width="500px">
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
          <v-flex md12>
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
          </v-flex>
          <v-flex xs12 class="ma-2">
            <div class="subtitle-1 mb-2 mt-3">Question:</div>
            <v-textarea
              v-model="getSchema.question"
              outline
              class="ma-3"
              color="primary"
              auto-grow
              single-line
              name="question"
              label="Write here........"
              value
              required
              v-validate="'required'"
              :error-messages="errors.collect('anquestionsquestionwer')"
              data-vv-name="question"
            ></v-textarea>
          </v-flex>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary large white--text"
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
    dictionary: {
      custom: {
        exam_initiate_id: {
          required: () => "Exam Field Is Required"
        },
        answer: {
          required: () => "Answer Field Is Required"
        }
      }
    }
  }),

  computed: {
    getExamList() {
      return this.$store.getters.cuFaqExamList;
    },
    getSchema() {
      return this.$store.getters.cuSingleFaq;
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
        this.$store.dispatch("fetchAllDegreeGroupData",{
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

      let self = this;
      this.$store
        .dispatch("cuSubmitQuestion", formData)
        .then(function(data) {
          self.close();
          self.$store.dispatch("cuFaqList");
        })
        .catch(function(error) {
          self.$store.dispatch("cuFaqList");
        });
    },
    edit() {
      let self = this;
      let item = _.pick(self.getSchema, ["id", "exam_initiate_id", "question"]);
      self.$store
        .dispatch("cuUpdateQuestion", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("cuFaqList");
        })
        .catch(function(error) {
          self.$store.dispatch("cuFaqList");
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
      this.$store.commit("CU_SINGLE_FAQ", this.editedItem);
      this.indexEdited == 1
        ? (this.showCancel = false)
        : (this.showCancel = true);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    this.$store.dispatch("cuFaqExamList");
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
</style>
