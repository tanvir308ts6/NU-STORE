<template>
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
  </div>
</template>

<script>
export default {
  name: "degOne",

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
  })
};
</script>

<style scoped></style>
