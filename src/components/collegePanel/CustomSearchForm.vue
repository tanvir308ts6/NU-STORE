<template>
  <div id="CustomSearchForm">
    <form @submit.prevent="OnSubmit">
      <v-layout class="justify-left" row wrap>
        <v-flex md8 v-if="form.show.exam_code">
          <v-select
            data-vv-name="Exam"
            v-model="form.data.exam_code"
            :items="getExamList"
            :item-text="item => item.code + '-' + item.title"
            item-value="code"
            label="Select Exam"
            prepend-icon="subject"
            v-validate="form.validation.exam_code"
            :error-messages="errors.collect('Exam')"
            clearable
            @input="handleInput"
            menu-props="auto"
          ></v-select>
        </v-flex>
        <v-flex md8 v-if="form.show.degree_code">
          <v-select
            data-vv-name="Degree"
            v-model="form.data.degree_code"
            :items="getDegreeData"
            :item-text="item => item.degree_code + '-' + item.degree_name"
            item-value="degree_code"
            label="Select Degree"
            prepend-icon="subject"
            v-validate="form.validation.degree_code"
            :error-messages="errors.collect('Degree')"
            clearable
            menu-props="auto"
          ></v-select>
        </v-flex>

        <v-flex md4 v-if="form.show.exam_year">
          <v-select
            data-vv-name="Year"
            v-model="form.data.exam_year"
            :items="getYearList"
            item-text="year"
            item-value="year"
            label="Select Exam Year"
            prepend-icon="subject"
            v-validate="form.validation.exam_year"
            :error-messages="errors.collect('Year')"
            clearable
          ></v-select>
        </v-flex>
        <v-flex md6 v-if="form.show.degree_group">
          <v-select
            data-vv-name="Degree group"
            v-model="form.data.degree_group_code"
            :items="getCollegeAllDegreeGroup[form.data.degree_code]"
            :item-text="
              item => item.degree_group_code + '-' + item.degree_group_name
            "
            item-value="degree_group_code"
            label="Select Degree Group"
            prepend-icon="subject"
            v-validate="form.validation.degree_group"
            :error-messages="errors.collect('Degree group')"
            clearable
            @input="ShowHideSubject"
          ></v-select>
        </v-flex>
        <v-flex md6 v-if="form.show.subject">
          <v-select
            data-vv-name="Subject"
            v-model="form.data.subject_code"
            :items="getCollegeAllSubject[form.data.degree_group_code]"
            :item-text="item => item.subject_code + '-' + item.subject_name"
            item-value="subject_code"
            label="Select Subject"
            prepend-icon="subject"
            v-validate="form.validation.subject"
            :error-messages="errors.collect('Subject')"
            clearable
          ></v-select>
        </v-flex>
        <v-flex md6 v-if="form.show.reg_no">
          <v-text-field
            data-vv-name="Reg No"
            label="Reg No"
            v-model="form.data.reg_no"
            v-validate="form.validation.reg_no"
            :error-messages="errors.collect('Reg No')"
            prepend-icon="edit"
            clearable
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12 md12 style="margin-top:40px;">
          <v-layout justify-center row fill-height align-center>
            <v-btn color="primary" large @click="OnSubmit">Search</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </form>
    <!-- <pre>{{getCollegeAllSubject[form.data.degree_group_code]}}</pre> -->
    <!-- <pre>{{form.data}}</pre> -->
    <!-- <pre>{{getDegreeData}}</pre> -->
  </div>
</template>
<script>
import commonGet from "@/mixin/college_common_getters_mixin";

export default {
  created() {},
  mixins: [commonGet],
  props: ["form"],
  computed: {},
  data() {
    return {
      // form: {
      //   data: {},
      //   show: {
      //     exam_code: true,
      //     fee_title: true,
      //     fee_type: true,
      //   },
      //   validation: {
      //     exam_code: {
      //       required: true,
      //     },
      //     fee_title: {
      //       required: true,
      //       numeric: true,
      //       min: 6,
      //       max: 10,
      //     },
      //     fee_type: {
      //       required: true,
      //     },
      //   },
      // },
    };
  },
  methods: {
    ShowHideSubject(value) {
      if (this.form.data.degree_group_code) {
        let subject = this.getCollegeAllSubject[
          this.form.data.degree_group_code
        ];
        if (subject.length > 0) {
          this.form.show.subject = true;
        } else {
          this.form.show.subject = false;
        }
      } else {
        this.form.show.subject = false;
      }
    },
    OnSubmit() {
      let self = this;
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          self.$parent.$parent.submit();
        }
        return;
      });
    },
    handleInput(exam_code) {
      if (exam_code) {
        this.getExamList.forEach(exam => {
          if (exam.code == exam_code) {
            this.form.data.degree_code = exam.degree_code;
            return;
          }
        });
      } else {
        delete this.form.data.degree_code;
        // this.form.data.exam_code = null;
        // this.form.data.degree_code = null;
      }
      // console.log(exam);
    }
  }
};
</script>
