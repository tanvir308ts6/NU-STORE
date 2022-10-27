<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>Confirmed Paper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-if="formFillUpData.student_confirm_status == 1"
          target="_blank"
          :href="`${getAssetUrl}/${formFillUpData.application_form_url}`"
        >
          Application Form
          <v-icon right dark>cloud_download</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="formFillUpData.papers"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.core_paper.paper_name }}</td>
        <td class="text-xs-left">{{ props.item.paper_code }}</td>
        <td class="text-xs-right">
          {{ props.item.core_paper.paper_types.paper_type }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: ["formFillUpData"],
  computed: {
    getAssetUrl() {
      return this.$store.getters.getAssetUrl;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Paper Name",
          align: "left",
          sortable: false,
          value: "core_paper.paper_name"
        },
        { text: "Paper Code", value: "paper_code" },
        {
          text: "Paper Type",
          align: "right",
          value: "core_paper.paper_types.paper_type"
        }
      ]
    };
  }
};
</script>
