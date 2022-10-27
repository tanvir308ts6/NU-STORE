<template>
  <v-container fluid>
    <div>
      <!-- Search Panel -->
      <v-container fluid>
        <br />
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">General Instructions</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
          style="white-space: nowrap;"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left" v-html="props.item.instruction"></td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formDialogStatus: false,
      headers: [
        { text: "SL", align: "left", sortable: false, value: "index" },
        { text: "Instruction", align: "left", value: "instruction" }
      ],
      loading: false,
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      }
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.stuGeneralInstruction;
    }
  },
  created() {
    this.$store.dispatch("stuGeneralInstruction", {
      instruction_type: 1
    });
  }
};
</script>

<style></style>
