<template>
  <v-container fluid>
    <v-layout
      row
      wrap
      v-if="getStudentFormFillUpSubject.hasOwnProperty('form_fill_up')"
    >
      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-md>
            <v-toolbar flat dark>
              <v-toolbar-title>
                {{
                  `Form Fill Up for
                ${getStudentFormFillUpSubject.form_fill_up.exam_master.exam_name}
                (${getStudentFormFillUpSubject.form_fill_up.exam_master.exam_year})`
                }}
              </v-toolbar-title>
            </v-toolbar>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs4 class="pr-1">
        <v-card>
          <v-container fluid grid-list-md>
            <StudentInfo />
            <FormFillUpFee />
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card>
          <v-container
            fluid
            grid-list-md
            v-if="getStudentFormFillUpSubject.total_subject"
          >
            <compulsorySubject
              v-if="getStudentFormFillUpSubject.compulsory_subject.length > 0"
            />
            <electiveSubject
              v-if="
                Object.keys(getStudentFormFillUpSubject.elective_subject).length
              "
            />
            <optionalSubject
              v-if="getStudentFormFillUpSubject.optional_subject.length > 0"
            />
            <improvementSubject
              v-if="getStudentFormFillUpSubject.improvement_subject.length"
            />
            <v-toolbar flat dark>
              <v-toolbar-title>Update Mobile No.</v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="mobile"
                    label="Mobile No."
                    v-model="profile.mobile"
                    v-validate="'required'"
                    :error-messages="errors.collect('mobile')"
                    data-vv-name="mobile"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
            <div class="justify-center layout px-0 mt-2">
              <v-btn color="success" @click="save">Submit</v-btn>
            </div>
          </v-container>
          <v-container v-else-if="!getLoading">
            <v-layout row wrap class="mt-auto">
              <span>No data found.</span>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{selected}}</pre> -->
    <!-- <pre>{{confirm_by_student}}</pre> -->
  </v-container>
</template>

<script>
// @ts-nocheck

import commonFun from "@/mixin/student_common_finction";
import compulsorySubject from "@/components/probable/student_form_fill_up_subject/compulsory_subject";
import electiveSubject from "@/components/probable/student_form_fill_up_subject/elective_subject";
import improvementSubject from "@/components/probable/student_form_fill_up_subject/improvement_subject";
import optionalSubject from "@/components/probable/student_form_fill_up_subject/optional_subject";
import StudentInfo from "@/components/probable/student_form_fill_up_subject/student_info";
import FormFillUpFee from "@/components/probable/student_form_fill_up_subject/FormFillUpFee";

export default {
  name: "FormFillUpSubject",
  mixins: [commonFun],
  components: {
    compulsorySubject,
    electiveSubject,
    improvementSubject,
    optionalSubject,
    StudentInfo,
    FormFillUpFee
  },
  computed: {
    getLoading() {
      return this.$store.getters.getLoading;
    },
    // getData() {
    //   return this.$store.getters.getStudentFormFillUpSubject;
    // },
    // getFillUpOptions() {
    //   return this.$store.getters.getStudentFormFillUpOptions;
    // },
    getStudentFormFillUpSubject() {
      return this.$store.getters.getStudentFormFillUpSubject;
    },
    getSchema() {
      return this.$store.getters.formFillUpConfirmByStudent;
    },
    profile() {
      return this.$store.getters.getStudentProfile;
    }
  },
  data: () => ({
    form_fill_up_id: null,
    selected: {
      compulsory_subject: [],
      elective_subject: [],
      improvement_subject: [],
      optional_subject: []
    },
    confirm_by_student: []
  }),
  watch: {
    "selected.compulsory_subject": function(val, oldval) {
      this.confirmSubject(this.selected);
    },
    "selected.elective_subject": function(val, oldval) {
      this.confirmSubject(this.selected);
    },
    "selected.improvement_subject": function(val, oldval) {
      this.confirmSubject(this.selected);
    },
    "selected.optional_subject": function(val, oldval) {
      this.confirmSubject(this.selected);
    },
    confirm_by_student: function(val, oldval) {}
  },
  created() {
    this.form_fill_up_id = this.$route.params.form_fill_up_id;
    this.$store.dispatch("getStudentFormFillUpSubject", this.form_fill_up_id);
    // this.$store.dispatch("setAcademicInfo");
    this.$store.dispatch("getStudentProfile");
  },
  methods: {
    calculateFeePerStudent(options) {
      this.$store.dispatch("calculateFeePerStudent", options);
      // console.log(options);
    },
    confirmSubject: function(selected) {
      this.confirm_by_student = [];
      let all_subjects = [];
      Object.keys(selected).forEach(element => {
        let subjects = this.selected[element];
        subjects.forEach(element => {
          all_subjects.push({
            paper_code: element.paper_code,
            form_fill_up_id: element.form_fill_up_id
          });
          // console.log(element);
        });
      });
      this.confirm_by_student = all_subjects;
      this.calculateFeePerStudent({
        form_fill_up_id: this.form_fill_up_id,
        paper_code: all_subjects
      });
      // console.log(all_subjects);
    },
    save() {
      let self = this;
      self.$root.$confirm("Are You Sure To Submit ?").then(confirm => {
        if (confirm) {
          let item = self.getSchema;
          let student_info = {
            id: self.profile.id,
            mobile: self.profile.mobile
          };

          const formData = Object.assign(self.getSchema, {
            confirm_subjects: self.confirm_by_student,
            form_fill_up_id: self.form_fill_up_id,
            student_info: student_info
          });
          const isEmpty = !Object.values(item).some(
            x => x !== null && x !== ""
          );
          if (!isEmpty) {
            self.$store
              .dispatch("formFillUpConfirmByStudent", formData)
              .then(function(data) {
                self.$router.push(
                  `/student/ff/form_fill_up_details/${self.form_fill_up_id}`
                );
              })
              .catch(function(error) {
                console.log(error);
                // self.$store.dispatch("fetchAllExamsnData");
              });
          } else {
            console.log("empty");
          }
        }
      });
    }
  },
  mounted() {}
};
</script>
