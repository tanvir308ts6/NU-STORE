<template>
  <v-container fluid style="padding: 0px">
    <v-layout row>
      <v-flex class="text-xs-center ma-2" xs12>
        <v-layout align-center justify-center row fill-height>
          <v-btn
            :large="distFlag"
            block
            :color="getColor(distFlag)"
            @click="distFlag = true"
          >
            <v-icon left v-if="distFlag">done_outline</v-icon>Regional Center
            Distribution
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex class="text-xs-center ma-2" xs12>
        <v-layout align-center justify-center row fill-height>
          <v-btn
            :large="!distFlag"
            block
            :color="getColor(!distFlag)"
            @click="distFlag = false"
          >
            <v-icon left v-if="!distFlag">done_outline</v-icon>Center
            Distribution
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider class="mt-2" />
    <v-divider class="mb-0" />

    <v-container fluid style="padding: 10px">
      <!-- regional center  -->
      <bsDistToRegCenter v-if="distFlag" />
      <!-- center  -->
      <bsDistToCenter v-if="!distFlag" />
    </v-container>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";

import bsDistToCenter from "@/components/distribution/blankScript/toCenter.vue";
import bsDistToRegCenter from "@/components/distribution/blankScript/toRegCenter.vue";
export default {
  mixins: [commonGet],
  components: {
    bsDistToCenter,
    bsDistToRegCenter,
  },
  data() {
    return {
      selected: [],
      distFlag: true,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      mailDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      centerDetailDialog: false,
      currentItem: {},
      rowCount: 0,
      search: "",
      sl_count: -1,
      smsList: [],
      emailList: [],
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "Center Name", value: "center_name", sortable: false },

        { text: "District", value: "district_name", sortable: false },
        { text: "Division", value: "division_name", sortable: false },
        { text: "No Student", value: "student_count", sortable: false },
        { text: "No Script", value: "script_count", sortable: false },
        {
          text: "Download",
          align: "center",
          value: "district_code",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          class: "cyan lighten-2 white--text subheading",
        },
        {
          text: "Distribute",
          align: "center",
          value: "actions",
          sortable: false,
          class: "cyan lighten-2 white--text subheading",
        },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };

    //division
    if (!this.$store.getters.getDivisionItems.length) {
      this.$store.dispatch("fetchDivisionData", limit);
    }
    //district
    if (!this.$store.getters.getDistrictItems.length) {
      this.$store.dispatch("fetchDistrictData", limit);
    }
  },
  computed: {},
  watch: {},
  methods: {
    getColor(flg) {
      if (flg) return "cyan lighten-0";
      else return "cyan lighten-4";
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
