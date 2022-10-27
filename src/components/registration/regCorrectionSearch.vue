<template>
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
              <v-text-field
                v-model="searchParam.reg_no"
                class="mt-3 ml-2"
                name="rg_no"
                label="Registration Number"
                prepend-icon="edit"
              ></v-text-field>

              <v-autocomplete
                class="ma-2"
                v-model="searchParam.college_code"
                :item-text="
                  item => '(' + item.college_code + ') ' + item.college_name
                "
                item-value="college_code"
                :items="getCollegeSchema"
                menu-props="auto"
                label="Select College"
                prepend-icon="subject"
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="searchParam.college_code = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                    >{{
                      "(" +
                        data.item.college_code +
                        ") " +
                        data.item.college_name
                    }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="data.item"
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="
                          '(' +
                            data.item.college_code +
                            ') ' +
                            data.item.college_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-select
                v-model="searchParam.ac_session"
                :items="geSession"
                item-text="ac_session"
                item-value="ac_session"
                label="Select Session"
                name="ac_seccion"
                class="mt-3 ml-2"
                prepend-icon="edit"
              ></v-select>

              <v-flex xs4 class="pr-3">
                <v-menu
                  v-model="startModel"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <div class>
                      <v-text-field
                        v-model="startDateFormatted"
                        class="pvMarksEntry-v-select"
                        prepend-icon="event"
                        v-on="on"
                        label="Select Start Date"
                        hide-details
                        single-line
                      ></v-text-field>
                    </div>
                  </template>

                  <v-date-picker
                    v-model="searchParam.approved_date"
                    no-title
                    @input="startModel = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 sm12 md12 style="margin-top:40px;">
                <v-layout justify-center row fill-height align-center>
                  <v-btn color="primary" large @click="searchRegCorrectionList"
                    >Search</v-btn
                  >
                  <v-btn color="error" large @click="resetInputData"
                    >Reset</v-btn
                  >
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import moment from "moment";

export default {
  props: ["pagination"],
  data: () => ({
    searchParam: {},
    startModel: false
  }),

  computed: {
    geSession() {
      return this.$store.getters.getAcSessionData;
    },
    getCollegeSchema() {
      return this.$store.getters.getAllCollege;
    },

    startDateFormatted() {
      return this.searchParam.approved_date
        ? moment(this.searchParam.approved_date).format("DD-MM-YYY")
        : "";
    }
  },

  created() {
    this.$store.dispatch("fetchAllCollegeData");
    this.$store.dispatch("fetchSessionData");
  },

  methods: {
    formatDate(dateconvart) {
      const current_datetime = new Date(dateconvart);
      const formatted_date =
        current_datetime.getDate() +
        "-" +
        ("0" + (current_datetime.getMonth() + 1)).slice(-2) +
        "-" +
        current_datetime.getFullYear();
      return formatted_date;
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchRegCorrectionList() {
      this.loading = true;
      this.setLimit();
      let self = this;
      this.$store
        .dispatch("fetchRegCorrectionList", this.searchParam)
        .then(data => {
          self.loading = false;
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },

    resetInputData() {
      let self = this;
      self.$store.dispatch("fetchRegCorrectionList", this.searchParam);
    }
  }
};
</script>

<style scoped></style>
