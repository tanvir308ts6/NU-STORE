<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="mt-5">
          <v-data-table
            hide-actions
            :headers="headers"
            :items="currentItem"
            class="elevation-1"
            :loading="loading"
            :total-items="pagination.totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ sl_count + props.index }}</td>
              <td class="text-xs-left">
                {{ props.item.college_code }} - {{ props.item.college_name }}
              </td>
              <td class="text-xs-center">{{ props.item.total_student }}</td>
              <td class="text-xs-center">{{ props.item.completed_student }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
export default {
  mixins: [commonGet, common_login_getters],
  props: ["currentItem", "detailsDialog"],
  data() {
    return {
      dialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      search: "",
      searchParam: {},
      loading: false,
      sl_count: 1,
      headers: [
        {
          text: "SL.",
          value: "sl",
          width: "1%",
          sortable: false,
          align: "left"
        },
        {
          text: "College",
          value: "college_code",
          align: "left",
          sortable: false,
          width: "30%"
        },
        {
          text: "Total Examinee",
          value: "total_student",
          align: "center",
          sortable: false,
          width: "10%"
        },
        {
          text: "Completed Examinee",
          value: "completed_student",
          align: "center",
          sortable: false,
          width: "10%"
        }
      ]
    };
  },
  watch: {
    detailsDialog(val) {
      console.log("wtch", val);
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    // getPaidOrganizationDetailsList() {
    //   return this.$store.getters.getPaidOrganizationDetailsList;
    // },
  },
  methods: {
    close() {
      this.$emit("update:detailsDialog", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
