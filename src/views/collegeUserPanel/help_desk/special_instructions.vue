<template>
  <v-container fluid>
    <div>
      <!-- Search Panel -->
      <v-container fluid>
      <v-layout row>
          <v-expansion-panel focusable>
            <v-expansion-panel-content class="mycustomExpansionPanel">
              <template v-slot:actions>
                <v-icon large color="primary">$vuetify.icons.expand</v-icon>
              </template>
              <template v-slot:header>
                <div>
                  <v-icon color="primary">search</v-icon>
                  <span class="pl-2 subheading">Custom Search Panel</span>
                </div>
              </template>
              <v-layout row wrap align-center>
                <v-flex>
                  <v-card class="px-3">
                    <v-layout row wrap align-center class="py-3">
                      <v-flex xs12>
                        <v-text-field
                          v-model="searchParam.instruction"
                          class="ma-2"
                          name="title"
                          label="Instruction"
                          prepend-icon="edit"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12 style="margin-top: 40px">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="search">
                            Search
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
        <br />
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Special Instructions</v-card-text>
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
            <td class="text-xs-left">{{ props.item.instruction }}</td>
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
      },
      searchParam: {}
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.cuInstructions;
    }
  },
  methods: {
    search() {
      this.$store.dispatch("cuInstructions", {
        instruction_type: 2,
        instruction: this.searchParam.instruction
      });
    }
  },
  created() {
    this.$store.dispatch("cuInstructions", {
      instruction_type: 2
    });
  }
};
</script>

<style></style>
