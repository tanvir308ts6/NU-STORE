<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <span class>
          <!-- {{pvMarks}} -->
          <div class="display-1 mb-4">
            <v-icon size="50" color="primary" @click="press">dashboard</v-icon>
            <span class="ml-2">Marks / Entry</span>
          </div>
        </span>
        <v-card>
          <!--  select exam  -->
          <v-flex xs12 sm12 d-flex>
            <div class="ma-2">
              <v-select
                label="Select Exam"
                item-text="name"
                item-value="id"
                v-model="pvMarks.exam_id"
                class="pvMarksEntry-v-select"
                :items="getExamArray"
                prepend-icon="description"
                hide-details
                single-line
                solo
              ></v-select>
            </div>
          </v-flex>
          <!-- select subject -->
          <v-flex xs12 sm12 d-flex>
            <div class="ma-2">
              <v-select
                label="Select Course"
                item-text="name"
                item-value="id"
                v-model="pvMarks.course_id"
                class="pvMarksEntry-v-select"
                :items="getSubjectsArray"
                prepend-icon="chrome_reader_mode"
                hide-details
                single-line
                solo
              ></v-select>
            </div>
          </v-flex>
          <!-- select date -->
          <v-flex xs12 sm12 style="padding-bottom: 2px;">
            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <div class="ma-2">
                  <v-text-field
                    v-model="pvMarks.date"
                    class="pvMarksEntry-v-select"
                    prepend-icon="event"
                    v-on="on"
                    label="Select Date"
                    hide-details
                    single-line
                    solo
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="pvMarks.date"
                no-title
                @input="datePicker = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-card>
        <!-- divider  -->
        <v-divider class="mt-4 mb-3"></v-divider>
        <v-card>
          <!-- select center  -->
          <v-flex xs12 sm12 d-flex>
            <div class="ma-2">
              <v-select
                item-text="center_name"
                item-value="id"
                v-model="pvMarks.center_id"
                class="pvMarksEntry-v-select"
                :items="getCentersArray"
                prepend-icon="near_me"
                label="Select Center"
                hide-details
                single-line
                solo
              ></v-select>
            </div>
          </v-flex>
        </v-card>
        <!-- divider  -->
        <v-divider class="mt-4 mb-3"></v-divider>
        <!-- Header -->
        <div v-if="pvMarks.center_id">
          <v-card dark>
            <v-flex xs12 sm12 d-flex>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-text-field
                    flat
                    readonly
                    value="Student ID"
                    single-line
                    hide-details
                    solo
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    readonly
                    value="Student Name"
                    single-line
                    hide-details
                    solo
                  ></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    readonly
                    value="Mark Input"
                    single-line
                    hide-details
                    solo
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
          <!-- <transition :duration="{ enter: 500, leave: 800 }"> -->
          <v-form>
            <v-flex
              xs12
              sm12
              d-flex
              v-for="student in pvMarks.marks"
              :key="student.id"
            >
              <v-layout row wrap>
                <v-flex xs3 my-style-2>
                  <v-text-field
                    readonly
                    :value="student.code"
                    single-line
                    hide-details
                    solo
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 my-style-2>
                  <v-text-field
                    readonly
                    :value="student.name"
                    single-line
                    hide-details
                    solo
                  ></v-text-field>
                  <!-- :value="`Student ${i}`" -->
                </v-flex>
                <v-flex xs3 my-style>
                  <v-text-field
                    label="Enter Mark"
                    v-model="student.mark"
                    single-line
                    hide-details
                    solo
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- submit button  -->
            <v-flex xs12 mt-4>
              <v-layout align-center justify-center row fill-height>
                <v-btn large round color="primary" @click="submit">
                  Submit
                  <v-icon right dark>send</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-form>
          <!-- </transition> -->
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pvMarks: {
      course_id: "",
      exam_id: "",
      date: "",
      center_id: "",
      marks: []
    },
    // date: new Date().toISOString().substr(0, 10),
    marks: [],
    datePicker: false
  }),

  methods: {
    submit() {
      this.$store.dispatch("submitPVMarks", this.pvMarks);
      // console.log("ok", this.marks);
    },
    press() {
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          confirm ? console.log("yes") : console.log("no");
        });
    }
  },
  created() {
    this.$store.dispatch("fetchExamData"); // exam
    this.$store.dispatch("fetchSubjectData"); // subject
    this.$store.dispatch("fetchCenterData"); // center
    this.$store.dispatch("fetchStudentData").then(() => {
      this.pvMarks.marks = this.$store.getters.getStudentItems;
      let obj = this.$store.getters.getStudentItems;
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key].student_id = obj[key].id;
        }
      }
      this.pvMarks.marks = obj;
    }); // student
  },
  computed: {
    getExamArray() {
      return this.$store.getters.getExamItem;
    },
    getSubjectsArray() {
      return this.$store.getters.getCourseItems;
    },
    getCentersArray() {
      return this.$store.getters.getCenterItems;
    }
  }
};
</script>

<style lang="scss">
.pvMarksEntry-v-select {
  .v-input__prepend-outer {
    margin-right: 20px;
    margin-left: 10px;
  }
}
.my-style {
  border-style: solid;
  border-top-width: 1px;
  border-right-width: 2px;
  border-bottom-width: 1px;
  border-left-width: 2px;
}
.my-style-2 {
  border-color: white;
  border-style: solid;
  border-top-width: 1px;
  border-right-width: 2px;
  border-bottom-width: 1px;
  border-left-width: 2px;
}
</style>
