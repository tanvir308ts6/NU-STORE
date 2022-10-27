<template>
  <div>
    <v-tabs v-model="active" slider-color="black" v-if="authStudent">
      <v-tab ripple>Basic Info</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <!-- <table class="v-datatable v-table theme--light text-left">
              <tbody>
                <tr v-if="authStudent.hasOwnProperty('college')">
                  <th class="text-left">
                    <span>College :</span>
                    {{ authStudent.college.college_name }}({{
                      authStudent.college_code
                    }})
                    <span v-if="authStudent.college.districts.district_name">{{
                      ", " + authStudent.college.districts.district_name
                    }}</span>
                  </th>
                </tr>
                <tr v-if="authStudent.hasOwnProperty('degree')">
                  <th class="text-left">
                    <span>Degree :</span>
                    {{ authStudent.degree.degree_name }}({{
                      authStudent.degree.degree_code
                    }})
                  </th>
                </tr>
              </tbody>
            </table> -->

            <v-list>
              <v-list-tile-sub-title
                v-if="authStudent.hasOwnProperty('college')"
              >
                <span class="text--primary">College :</span>
                {{ authStudent.college.college_name }}({{
                  authStudent.college_code
                }})
                <span v-if="authStudent.college.districts.district_name">{{
                  ", " + authStudent.college.districts.district_name
                }}</span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title
                v-if="authStudent.hasOwnProperty('degree')"
              >
                <span class="text--primary">Degree :</span>
                {{ authStudent.degree.degree_name }}({{
                  authStudent.degree.degree_code
                }})
              </v-list-tile-sub-title>
              <v-list-tile-sub-title
                v-if="authStudent.hasOwnProperty('degree_group')"
              >
                <span class="text--primary">Degree Group :</span>
                {{ authStudent.degree_group.degree_group_name }}({{
                  authStudent.degree_group.degree_group_code
                }})
              </v-list-tile-sub-title>
              <v-list-tile-sub-title
                v-if="authStudent.hasOwnProperty('subjects')"
              >
                <span class="text--primary">Subject :</span>
                <slot v-if="authStudent.subject">
                  <span
                    >{{ authStudent.subject.subject_name }} ({{
                      authStudent.subject.subject_code
                    }})</span
                  >
                </slot>
                <slot v-else-if="authStudent.subjects">
                  <slot v-for="(subject, index) in authStudent.subjects">
                    <span v-if="!index" :key="index"
                      >{{ subject.subject_name }} ({{
                        subject.subject_code
                      }})</span
                    >
                    <span v-else :key="index"
                      >,{{ subject.subject_name }} ({{
                        subject.subject_code
                      }})</span
                    >
                  </slot>
                </slot>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="text--primary">Session :</span>
                <span>{{ authStudent.ac_session }}</span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="text--primary">Session Expire :</span>
                <span>{{ authStudent.ac_session_expire }}</span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="text--primary">Email :</span>
                <span>{{ authStudent.email }}</span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="text--primary">Mobile :</span>
                <span>{{ authStudent.mobile }}</span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="text--primary">Father Name :</span>
                <span>{{ authStudent.father_name }}</span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span v-if="authStudent.mother_name" class="text--primary"
                  >Mother Name :</span
                >
                <span>{{ authStudent.mother_name }}</span>
              </v-list-tile-sub-title>
            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab ripple>Academin Info</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :hide-actions="true"
            :headers="headers"
            :items="authStudent.student_academic_info"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.index + 1 }}</td>
              <td class="text-xs">{{ props.item.std_id }}</td>
              <td class="text-xs">{{ props.item.prev_degree_name }}</td>

              <td class="text-xs">{{ props.item.prev_reg_no }}</td>
              <td class="text-xs">{{ props.item.prev_roll_no }}</td>
              <td class="text-xs">{{ props.item.prev_passing_year }}</td>
              <td class="text-xs">{{ props.item.prev_board }}</td>
              <td class="text-xs">{{ props.item.prev_institute_name }}</td>
              <td class="text-xs">{{ props.item.prev_gpa }}</td>
              <td class="text-xs">{{ props.item.prev_total_mark }}</td>
              <td class="text-xs">{{ props.item.prev_result }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <!-- <pre>{{authStudent}}</pre> -->
  </div>
</template>
<script>
export default {
  computed: {
    authStudent() {
      return this.$store.getters.getStudentProfile;
    }
  },
  data() {
    return {
      active: null,
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "ID No", value: "std_id" },
        { text: "Degree Name", value: "prev_degree_name" },
        { text: "REG. No.", value: "prev_reg_no" },
        { text: "Roll No.", value: "prev_roll_no" },
        { text: "Passing Year", value: "prev_passing_year" },
        { text: "Board", value: "prev_board" },
        { text: "Institute Name", value: "prev_institute_name" },
        { text: "GPA", value: "prev_gpa" },
        { text: "Mark", value: "prev_total_mark" },
        { text: "Result", value: "prev_roll_no" }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.text-left {
  float: left;
}
</style>
