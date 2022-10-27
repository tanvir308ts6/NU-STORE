<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>Form Fillup Fee (University)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn>Total = {{ StudentFormFillUpFeeHistoryData.nu_fee }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="StudentFormFillUpFeeHistoryData.form_fill_up_fee"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.exm_master_fee.fee_title }}</td>
        <td class="text-xs-left">
          {{
            `(${props.item.iteration_no}x${
              props.item.exm_master_fee.amount
            })=${props.item.iteration_no * props.item.exm_master_fee.amount}`
          }}
        </td>
        <!-- <td class="text-xs-right">{{ props.item.core_paper.paper_types.paper_type }}</td> -->
      </template>
    </v-data-table>
    <v-toolbar flat dark>
      <v-toolbar-title
        >Total = {{ StudentFormFillUpFeeHistoryData.nu_fee }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-btn>Total = {{StudentFormFillUpFeeHistoryData.nu_fee}}</v-btn>
      </v-toolbar-items>-->
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: ["StudentFormFillUpFeeHistoryData"],
  computed: {
    getAssetUrl() {
      return this.$store.getters.getAssetUrl;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Fee Title",
          align: "left",
          sortable: false,
          value: "exm_master_fee.fee_title"
        },
        { text: "Amount", value: "exm_master_fee.amount" }
        // {
        //   text: "Paper Type",
        //   align: "right",
        //   value: "core_paper.paper_types.paper_type"
        // }
      ]
    };
  }
};
</script>
