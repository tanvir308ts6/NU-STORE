<template>
  <div id="FeeStatementDataTable">
    <div class="elevation-1">
      <div class="v-table__overflow">
        <table class="v-datatable v-table theme--light">
          <thead>
            <tr>
              <th
                role="columnheader"
                scope="col"
                width="10"
                aria-label="SL.: Not sorted."
                aria-sort="none"
                class="column text-xs-left"
              >
                SL.
              </th>
              <th
                role="columnheader"
                scope="col"
                aria-label="Candidate Type: Not sorted."
                aria-sort="none"
                class="column text-xs-left"
              >
                Candidate Type
              </th>
              <th
                role="columnheader"
                scope="col"
                aria-label="Number of Candidate(s): Not sorted."
                aria-sort="none"
                class="column text-xs-left"
              >
                No. of Candidate(s)
              </th>
              <th
                role="columnheader"
                scope="col"
                aria-label="Total: Not sorted."
                aria-sort="none"
                class="column text-xs-left"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <slot v-if="getFeeStatement.hasOwnProperty('all_std_fee')">
              <tr
                v-for="(item, index) in getFeeStatement.all_std_fee"
                :key="index"
                @click="goTo('/cu/ff/confirm-data')"
              >
                <td>{{ index + 1 }}</td>
                <td class="text-xs-left">{{ item.candidate_type }}</td>
                <td class="text-xs-left">{{ item.total_student }}</td>
                <td class="text-xs-left">{{ item.fee }}</td>
              </tr>
            </slot>

            <tr
              v-if="getFeeStatement.hasOwnProperty('total_fee')"
              @click="goTo('/cu/ff/fee_statement')"
            >
              <td colspan="2" class="text-xs-left font-weight-bold">Total</td>
              <td class="font-weight-bold">
                {{ getFeeStatement.total_fee.total_student }}
              </td>
              <td class="font-weight-bold">
                {{ getFeeStatement.total_fee.fee }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <v-data-table
      :headers="headers"
      :items="getFeeStatement.all_std_fee"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.index + 1 }}</td>
        <td class="text-xs-left">{{ props.item.candidate_type }}</td>
        <td class="text-xs-left">{{ props.item.total_student }}</td>
        <td class="text-xs-left">{{ props.item.fee }}</td>
      </template>
    </v-data-table>-->
    <!-- <pre>{{getFeeStatement}}</pre> -->
  </div>
</template>
<script>
import commonFun from "@/mixin/college_user_common_function.vue";
export default {
  mixins: [commonFun],
  props: ["getFeeStatement"],
  data() {
    return {};
  }
};
</script>
<style scoped>
table.v-table tbody td,
table.v-table tbody th {
  height: 0px;
  /* white-space: nowrap; */
}
</style>
