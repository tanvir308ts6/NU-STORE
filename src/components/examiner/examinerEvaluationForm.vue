<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">Examiner Stadard Evaluation</span>
            <v-spacer></v-spacer>
            <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>          
              <v-text-field
                name="code"
                label="Number Of Error"
                v-model="getSchema.number_of_error"
                v-validate="'required'"
                :error-messages="errors.collect('code')"
                data-vv-name="code"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="title"
                label="Statement of Error"
                v-model="getSchema.statement_of_error"
                v-validate="'required'"
                :error-messages="errors.collect('statement_of_error')"
                data-vv-name="statement_of_error"
                required
                prepend-icon="edit"
              ></v-text-field>
                <v-flex xs12>
                <v-select
                  label="Select Standard"
                  item-text="title"
                  item-value="id"
                  v-model="getSchema.examiner_standard"
                  :items="standards"
                  v-validate="'required'"
                  :error-messages="errors.collect('degree_code')"
                  data-vv-name="degree_code"
                  prepend-icon="edit"
                  name="degreeCode"
                ></v-select>
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
            >{{ buttonTitle }}</v-btn>
            <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import formNotification from "@/components/utils/formNotification";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "getDataFromApi"],
  data: () => ({
    degree_code: "",
    course_code: "",
    dialog: false,
    standards: ["Best","Satisfactory","Below Standard"],
    editedStatus: false,
    dateMenu: false,
    degrees: [],
    courses: [],
    dictionary: {
      custom: {
        degree_code: {
          required: () => "Select Degree"
        },
        course_code: {
          required: () => "Select Course"
        },
        code: {
          required: () => "Exam Code field can not be empty"
        },
        title: {
          required: () => "Exam Title field can not be empty"
        },
        short_title: {
          required: () => "Short Title field can not be empty"
        }
        // active: {
        //   required: () => "check active."
        // },
      }
    }
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.$store.dispatch("fetchDegreeData");
    this.$store.dispatch("fetchCourseData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_EXAMINER_EVALUATION_SCHEMA_DATA", this.editedData);
      this.courses = this.$store.getters.getCourseItems;
      this.degrees = this.$store.getters.getDegreeItems;
      this.degree_code = this.editedData.degree_code;
      // this.course_code = this.editedData.course_code;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getExaminerEvaluationSchema;
    },
    getItemList() {
      return this.$store.getters.getExamDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Exam" : "Edit Exam";
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
    // save() {
    //   let self = this;
    //   // this.getSchema.course_code = this.course_code;
    //   this.getSchema.degree_code = this.degree_code;

    //   let item = this.getSchema;
    //   console.log("Save ", item);
    //   this.$store
    //     .dispatch("saveExamCreateData", item)
    //     .then(function(data) {
    //       try {
    //         self.close();
    //         //self.$emit("update:loadData", true);
    //         self.getDataFromApi();
    //       } catch (ex) {
    //         console.log(ex);
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //       self.getDataFromApi();
    //     });
    // },
    edit() {
      let self = this;
      // this.getSchema.course_code = this.course_code;
      
      let item = this.getSchema;
      console.log("before edit action", item);
      this.$store
        .dispatch("saveExaminerStandardData", item)
        .then(function() {
          console.log("After edit success");
          self.close();
          self.getExamninationStandurdData();
        })
        .catch(function(error) {
          console.log(error);
          self.getExamninationStandurdData();
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_EXAMINER_EVALUATION_SCHEMA_DATA");
      //this.course_code = "";
      this.degree_code = "";
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
