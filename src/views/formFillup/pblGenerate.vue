<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <v-flex xs12 md10 offset-md1>
          <v-card>
            <v-card-title class="cyan">
              <span class="white--text text-md-center">
                Probable List Generate
              </span>
            </v-card-title>

            <v-card-text>
              <form>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex md4>
                      <v-select
                        v-validate="'required'"
                        item-text="title"
                        item-value="code"
                        :items="getSchema"
                        :error-messages="errors.collect('degree')"
                        label="Select Degree"
                        data-vv-name="degree"
                        @change="getExam()"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex md4>
                      <v-select
                        v-validate="'required'"
                        item-text="title"
                        item-value="code"
                        :items="getExamSchema"
                        :error-messages="errors.collect('exams')"
                        label="Select Exam"
                        data-vv-name="exams"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex md4>
                      <v-select
                        v-validate="'required'"
                        :items="years"
                        :error-messages="errors.collect('years')"
                        label="Select Exam Year"
                        data-vv-name="years"
                        required
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>

                <div>
                  <v-subheader>
                    Regular Student
                  </v-subheader>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex md12>
                        <v-select
                          v-validate="'required'"
                          :items="sessions"
                          :error-messages="errors.collect('session')"
                          label="Select Session"
                          data-vv-name="session"
                          required
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>

                <div>
                  <v-subheader>
                    Irregular Student
                  </v-subheader>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex md6>
                        <v-select
                          v-validate="'required'"
                          :items="sessions"
                          :error-messages="errors.collect('session')"
                          label="Select Session"
                          data-vv-name="session"
                          required
                          multiple
                        ></v-select>
                      </v-flex>

                      <v-flex md6>
                        <v-select
                          v-validate="'required'"
                          :items="years"
                          :error-messages="errors.collect('examYear')"
                          label="Select Exam Year"
                          data-vv-name="examYear"
                          required
                          multiple
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>

                <div>
                  <v-subheader>
                    Improvement Failed Student (Session Wise)
                  </v-subheader>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex md4>
                        <v-select
                          v-validate="'required'"
                          :items="sessions"
                          :error-messages="errors.collect('session')"
                          label="Select Session"
                          data-vv-name="session"
                          required
                          multiple
                        ></v-select>
                      </v-flex>

                      <v-flex md4>
                        <v-select
                          v-validate="'required'"
                          :items="years"
                          :error-messages="errors.collect('examYear')"
                          label="Select Exam Year"
                          data-vv-name="examYear"
                          required
                          multiple
                        ></v-select>
                      </v-flex>

                      <v-flex md4>
                        <v-select
                          v-validate="'required'"
                          :items="grades"
                          :error-messages="errors.collect('grade')"
                          label="Select Grade"
                          data-vv-name="grade"
                          required
                          multiple
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>

                <div>
                  <v-subheader>
                    Improvement Failed Student (Exam Wise)
                  </v-subheader>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex md6>
                        <v-select
                          v-validate="'required'"
                          :items="years"
                          :error-messages="errors.collect('examYear')"
                          label="Select Exam Year"
                          data-vv-name="examYear"
                          required
                          multiple
                        ></v-select>
                      </v-flex>

                      <v-flex md6>
                        <v-select
                          v-validate="'required'"
                          :items="grades"
                          :error-messages="errors.collect('grade')"
                          label="Select Grade"
                          data-vv-name="grade"
                          required
                          multiple
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>

                <div>
                  <v-subheader>
                    Improvement Student (Already Passed)
                  </v-subheader>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex md3>
                        <v-select
                          v-validate="'required'"
                          :items="years"
                          :error-messages="errors.collect('examYear')"
                          label="Select Exam Year"
                          data-vv-name="examYear"
                          required
                          multiple
                        ></v-select>
                      </v-flex>

                      <v-flex md3>
                        <v-text-field
                          v-validate="'required|max:10'"
                          :error-messages="errors.collect('cgpa')"
                          label="CGPA"
                          data-vv-name="cgpa"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex md3>
                        <v-select
                          v-validate="'required'"
                          :items="grades"
                          :error-messages="errors.collect('grade')"
                          label="Select Grade"
                          data-vv-name="grade"
                          required
                        ></v-select>
                      </v-flex>

                      <v-flex md3>
                        <v-text-field
                          :error-messages="errors.collect('papers')"
                          label="Maximum No. Papers"
                          data-vv-name="papers"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>

                <v-btn color="success" @click="submit">submit</v-btn>
                <v-btn color="error" @click="clear">clear</v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    degree: null,
    exams: null,
    examYear: null,
    session: null,
    grade: null,
    papers: "",
    cgpa: "",

    years: [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020"
    ],

    sessions: [
      "2014-15",
      "2015-16",
      "2016-17",
      "2017-18",
      "2018-19",
      "2019-20"
    ],

    grades: ["A+", "A", "A-", "B+", "B", "B-", "C", "D", "F"],

    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        degree: {
          required: "Degree field is required"
        },
        select: {
          required: "Select field is required"
        }
      }
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getDegreeData;
    },

    getExamSchema() {
      return this.$store.getters.getExamDatas;
    }
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    submit() {
      this.$validator.validateAll();

      /*if (!this.errors.any()) {
                    alert('submit')
                }*/
    },

    getExam() {
      this.$store.dispatch("fetchExamData", this.degree);
    },

    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.$validator.reset();
    }
  },

  created() {
    this.$store.dispatch("fetchDegreeData");
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
