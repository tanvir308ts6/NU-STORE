<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>Form Fill Up Fee (University)</v-toolbar-title>
    </v-toolbar>
    <table
      class="v-datatable v-table theme--light"
      v-if="getStudentFormFillUpFees.hasOwnProperty('fees')"
    >
      <tbody>
        <slot v-for="(item, index) in getStudentFormFillUpFees.fees">
          <tr :key="index" v-if="item.iteration">
            <th
              role="columnheader"
              scope="col"
              aria-label="Dessert (100g serving): Not sorted."
              aria-sort="none"
              class="column text-xs-left"
            >
              {{ item.fee_title }}
            </th>
            <td class="text-xs-right">
              {{
                `${item.amount}x${item.iteration}=${convertFloat(
                  item.iteration * item.amount
                )}`
              }}
            </td>
          </tr>
        </slot>

        <tr v-if="getStudentFormFillUpFees.total > 0">
          <th
            role="columnheader"
            scope="col"
            aria-label="Dessert (100g serving): Not sorted."
            aria-sort="none"
            class="column text-xs-left"
          >
            Total
          </th>
          <td class="text-xs-right">
            {{ convertFloat(getStudentFormFillUpFees.total) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!--<pre>{{getStudentFormFillUpFees}}</pre> -->
    <!-- <pre>{{getStudentFormFillUpSubject}}</pre> -->
  </div>
</template>
<script>
export default {
  name: "FormFillUpFee",
  created() {
    // this.calculateFee();
  },
  computed: {
    profile() {
      let profile = JSON.parse(localStorage.getItem("student"));
      return profile;
    },
    getStudentFormFillUpFees() {
      return this.$store.getters.getStudentFormFillUpFees;
    }
  },
  data() {
    return {
      //   form_fill_up_fee: {}
    };
  },
  methods: {
    convertFloat(val) {
      let value = Number(val);
      return value.toFixed(2);
    }
  }
};
</script>
