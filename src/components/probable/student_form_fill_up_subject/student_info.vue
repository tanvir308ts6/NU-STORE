<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>Student Info</v-toolbar-title>
      <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
      <!-- <small v-if="$parent.$parent.confirm_by_student.length">Selected Paper Code -[</small> -->
      <!-- <slot v-for="(selected, index) in $parent.$parent.confirm_by_student">
              <small :key="index" v-if="index">,{{selected.paper_code}}</small>
              <small :key="index" v-else>{{selected.paper_code}}</small>
      </slot>-->
      <!-- <small v-if="$parent.$parent.confirm_by_student.length">]</small> -->
      <!-- <v-spacer></v-spacer> -->
    </v-toolbar>
    <table class="v-datatable v-table theme--light">
      <tbody>
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Name
          </th>
          <td class="text-xs-right">{{ profile.name }}</td>
        </tr>
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Mobile
          </th>
          <td class="text-xs-right">{{ profile.mobile }}</td>
        </tr>
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Father Name
          </th>
          <td class="text-xs-right">{{ profile.father_name }}</td>
        </tr>
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Student ID
          </th>
          <td class="text-xs-right">{{ profile.std_id }}</td>
        </tr>
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            REG. No
          </th>
          <td class="text-xs-right">{{ profile.reg_no }}</td>
        </tr>
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Session
          </th>
          <td class="text-xs-right">{{ profile.ac_session }}</td>
        </tr>

        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            College Code
          </th>
          <td class="text-xs-right">{{ profile.college_code }}</td>
        </tr>
        <tr v-if="profile.hasOwnProperty('college')">
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            College
          </th>
          <td class="text-xs-right">
            {{ profile.college.college_name }}
            <span v-if="profile.college.districts.district_name">{{
              ", " + profile.college.districts.district_name
            }}</span>
          </td>
        </tr>
        <tr v-if="profile.hasOwnProperty('degree')">
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Degree
          </th>
          <td class="text-xs-right">
            {{ profile.degree.degree_display_name }}
          </td>
        </tr>
        <!-- <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >Degree Group</th>
          <td class="text-xs-right">{{profile.degree_group.degree_group_display_name}}</td>
        </tr>-->
      </tbody>
    </table>
    <!-- <pre>{{profile}}</pre> -->
  </div>
</template>
<script>
export default {
  name: "StudentInfo",
  computed: {
    profile() {
      return this.$store.getters.getStudentProfile;
    }
  }
};
</script>
