<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="mt-5">
          <v-data-table
            :headers="headers"
            :items="getGracePassstdList"
            class="elevation-1"
            :loading="loading"
            :total-items="pagination.totalItems"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ sl_count + props.index }}</td>
              <td class="text-xs-center">{{ props.item.exam_roll }}</td>
              <td class="text-xs-center">{{ props.item.reg_no }}</td>
              <td class="text-xs-center" nowrap="true">{{ props.item.name }}</td>
              <td class="text-xs-left" nowrap="true">
                {{ props.item.college_code }} - {{ props.item.college_name }}
              </td>
              <td class="text-xs-center">{{ props.item.total_mark }}</td>
              <td class="text-xs-center">
                {{ getGraceMark(props.item.total_mark) }}
              </td>
              <td class="text-xs-center">
                {{ getGracePassstdSchema.pass_mark }}
              </td>
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
  props: ["detailsParam", "detailsDialog"],
  data() {
    return {
      dialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      search: "",
      loading: false,
      sl_count: 1,
      headers: [
        {
          text: "SL.",
          value: "sl",
          width: "1%",
          sortable: false,
          align: "left",
        },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Reg No",
          value: "reg_no",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Examinee Name",
          value: "name",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "College",
          value: "college_code",
          align: "center",
          sortable: false,
          width: "30%",
        },
        {
          text: "Before Grace Mark",
          value: "total_mark",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "Proposed Grace Mark ",
          value: "total_mark",
          align: "center",
          sortable: false,
          width: "10%",
        },
        {
          text: "After Grace Mark ",
          value: "total_mark",
          align: "center",
          sortable: false,
          width: "10%",
        },
      ],
    };
  },
  watch: {
    detailsDialog(val) {
      this.dialog = val;
      if (val) {
        this.getGracePassStdDetails();
      }
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      if (this.dialog) {
        this.getGracePassStdDetails();
      }
    },
  },
  computed: {
    getGracePassstdList() {
      return this.$store.getters.getGracePassstdList;
    },
    getGracePassstdSchema() {
      return this.$store.getters.getGracePassstdSchema;
    },
  },
  methods: {
    getGraceMark(item) {
      return this.getGracePassstdSchema.pass_mark - item;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.detailsParam.page = page;
      this.detailsParam.limit = rowsPerPage;
      this.detailsParam.sort = sortBy;
      this.detailsParam.search = this.search;
    },
    getGracePassStdDetails() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchGracePassStdDetails", this.detailsParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    close() {
      this.$emit("update:detailsDialog", false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
