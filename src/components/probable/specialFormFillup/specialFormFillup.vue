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
          <v-toolbar-title class="text-uppercase"
            >Special Form Fill Up
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- <v-flex xs12>
          <v-card>
            <v-container fluid grid-list-md>
              <v-toolbar flat lighten :height="35">
                <v-toolbar-title>{{ `Confirm Data Entry` }}</v-toolbar-title>
              </v-toolbar>
            </v-container>
          </v-card>
        </v-flex> -->
        <v-flex xs12>
          <v-card>
            <v-container fluid grid-list-md>
              <v-card color="white">
                {{ "19630002264" }}
                <v-layout row>
                  <v-text-field
                    tabindex="1"
                    class="mt-0 fs-25px"
                    flat
                    hide-details
                    label="REG No."
                    prepend-inner-icon="search"
                    single-line
                    solo
                    v-model="reg_no"
                    ref="reg_no_search"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn color="info" dark @click="searchStudent"
                      >Search</v-btn
                    >
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-container>
          </v-card>
        </v-flex>
        <v-layout row>
          <v-flex xs4 class="pr-1" v-if="formFillUpInfo.form_fill_up">
            <v-card>
              <v-container fluid grid-list-md>
                <StudentInfo />
                <!-- <FormFillUpFee /> -->
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <v-card>
              <v-container
                fluid
                grid-list-md
                v-if="formFillUpInfo.total_subject > 0"
              >
                <compulsorySubject
                  v-if="formFillUpInfo.compulsory_subject.length > 0"
                />
                <electiveSubject
                  v-if="formFillUpInfo.elective_subject.length > 0"
                />
                <optionalSubject
                  v-if="formFillUpInfo.optional_subject.length > 0"
                />
                <improvementSubject
                  v-if="formFillUpInfo.improvement_subject.length > 0"
                />
                <v-toolbar flat dark>
                  <v-toolbar-title>Update Mobile No.</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <!-- <v-card-text>
                  <v-form>
                    <v-text-field
                      name="mobile"
                      label="Mobile No."
                      v-validate="'required'"
                      :error-messages="errors.collect('mobile')"
                      data-vv-name="mobile"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-form>
                </v-card-text> -->
                </v-card>
                <div class="justify-center layout px-0 mt-2">
                  <v-btn color="success">Submit</v-btn>
                </div>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import StudentInfo from "@/components/probable/specialFormFillup/student_info";
import FormFillUpFee from "@/components/probable/specialFormFillup/FormFillUpFee";
import compulsorySubject from "@/components/probable/specialFormFillup/compulsory_subject";
import electiveSubject from "@/components/probable/specialFormFillup/elective_subject";
import improvementSubject from "@/components/probable/specialFormFillup/improvement_subject";
import optionalSubject from "@/components/probable/specialFormFillup/optional_subject";

export default {
  name: "SPFormFillup",
  props: ["dialogStatus", "detailData"],
  components: {
    StudentInfo,
    FormFillUpFee,
    compulsorySubject,
    electiveSubject,
    improvementSubject,
    optionalSubject
  },
  computed: {
    formFillUpInfo() {
      return this.$store.getters.getPblStudentInfo;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getLoggedInYear() {
      return this.$store.getters.getLoggedInYear;
    }
  },
  data: () => ({
    dialog: false,
    reg_no: "",
    form_fill_up_id: null,
    selected: {
      compulsory_subject: [],
      elective_subject: [],
      improvement_subject: [],
      optional_subject: []
    },
    confirm_by_student: []
  }),

  methods: {
    searchStudent() {
      let reg_no = this.reg_no;
      this.$store
        .dispatch("getPblStudentInfo", {
          reg_no: reg_no,
          exam_code: this.getLoggedInExam.code,
          exam_year: this.getLoggedInYear.year
        })
        .then(() => {
          //console.log(response);
        });
    },
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
    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  },
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
    confirm_by_student: function(val, oldval) {},
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>
