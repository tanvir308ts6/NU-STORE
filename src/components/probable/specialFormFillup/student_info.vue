<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>Student Info</v-toolbar-title>
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
          <td class="text-xs-left">{{ formFillUpInfo.student.name }}</td>
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
          <td class="text-xs-left">{{ formFillUpInfo.student.mobile }}</td>
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
          <td class="text-xs-left">
            {{ formFillUpInfo.student.father_name }}
          </td>
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
          <td class="text-xs-left">{{ formFillUpInfo.student.std_id }}</td>
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
          <td class="text-xs-left">{{ formFillUpInfo.student.reg_no }}</td>
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
          <td class="text-xs-left">{{ formFillUpInfo.student.ac_session }}</td>
        </tr>

        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            College
          </th>
          <td class="text-xs-left">
            {{
              formFillUpInfo.student.college.college_code +
                "-" +
                formFillUpInfo.student.college.college_name
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "StudentInfo",
  computed: {
    formFillUpInfo() {
      return this.$store.getters.getPblStudentInfo;
    }
  }
};
</script>
