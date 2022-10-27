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
                      <v-flex xs9>
                        <v-text-field
                          v-model="searchParam.title"
                          class="ma-2"
                          name="title"
                          label="Notice Title"
                          prepend-icon="edit"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-menu
                          v-model="from_date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="searchParam.from_date"
                              label="Published Date"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="searchParam.from_date"
                            @input="from_date = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
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
              <v-card-text class="title">All Notice</v-card-text>
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
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">
              {{ props.item.from_date | dateFormat }}
            </td>
            <td class="text-xs-left">
              <v-btn
                v-if="props.item.attachment != null"
                dark
                color="purple"
                :href="getBaseUrl + '/' + props.item.attachment"
                target="_blank"
                small
                round
              >
                <v-icon dark>picture_as_pdf</v-icon>
              </v-btn>
              <v-btn v-else dark color="red">Not Found</v-btn>
            </td>
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
        { text: "Title", align: "left", value: "title" },
        { text: "Published Date", align: "left", value: "title" },
        { text: "Notice", align: "left", value: "attachment" }
      ],
      loading: false,
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      },
      from_date: false,
      searchParam: {}
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.collegeNotice;
    },
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    }
  },

  methods: {
    search() {
      this.$store.dispatch("collegeNotice", {
        title: this.searchParam.title,
        from_date: this.searchParam.from_date
      });
    }
  },

  created() {
    this.$store.dispatch("collegeNotice");
  }
};
</script>

<style></style>
