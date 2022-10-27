<template>
  <div>
    <v-layout row justify-center>
      <v-card class="mt-5">
        <v-data-table
          :headers="headers"
          :items="getPaidOrganizationDetailsList"
          class="elevation-1"
          :loading="loading"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs">{{ sl_count + props.index }}</td>
            <td class="text-xs-left">{{ props.item.exam_roll }}</td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>
            <td class="text-xs-center">{{ props.item.session_year }}</td>
            <td class="text-xs-center">{{ props.item.student_name }}</td>
            <td class="text-xs-center">{{props.item.college_code}} - {{ props.item.college_name }}</td>
            <td class="text-xs-center">{{ props.item.cgpa }}</td>
            <td class="text-xs-center">{{ props.item.paid_amount }}</td>
            <td class="justify-center text-xs-center">
              <v-chip
                color="#FB8C00"
                text-color="white"
                v-if="props.item.verify_status == 0"
              >Verification Failed</v-chip>
              <v-chip
                color="#388E3C"
                text-color="white"
                v-if="props.item.verify_status == 1"
              >Verified</v-chip>
            </td>

            <td class="justify-center text-xs-center">
              <v-chip
                color="#FB8C00"
                text-color="white"
                v-if="props.item.payment_status == 0"
              >Unpaid</v-chip>
              <v-chip color="#388E3C" text-color="white" v-if="props.item.payment_status == 1">Paid</v-chip>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
export default {
  mixins: [commonGet, common_login_getters],
  props: ["currentItem", "studentDetailDialog"],
  data() {
    return {
      dialog: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      searchParam: {},
      loading: false,
      sl_count: 1,
      headers: [
        { text: "SL", value: "sl", width: "1%", sortable: false },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          sortable: false,
        },
        {
          text: "Registration Number",
          value: "reg_no",
          align: "center",
          sortable: false,
        },
        {
          text: "Session",
          value: "session_year",
          align: "center",
          sortable: false,
        },
        {
          text: "Examinee Name",
          value: "student_name",
          align: "center",
          sortable: false,
        },
        {
          text: "College",
          value: "college_code",
          align: "center",
          sortable: false,
        },
        { text: "CGPA", value: "cgpa", align: "center", sortable: false },
        {
          text: "Paid Amount",
          value: "paid_amount",
          align: "center",
          sortable: false,
        },
        {
          text: "Verified Status",
          value: "verified_status",
          align: "center",
          sortable: false,
        },

        {
          text: " Payment Status",
          value: "status",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  watch: {
    studentDetailDialog(val) {
      console.log("wtch", val);
      this.dialog = val;
      this.searchParam.exam_code = this.currentItem.exam_code;
      this.searchParam.year = this.currentItem.year;
      this.searchParam.exam_initiate_id = this.currentItem.exam_initiate_id;
      this.searchParam.applicant_id = this.currentItem.id;
      //   this.$store
      //     .dispatch("searchPaidOrganizationDetailsData", this.searchParam)
      //     .then(data => {
      //       console.log("m..", data);
      //     });
      this.searchApplicantDetailsList();
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      this.searchApplicantDetailsList();
    },
  },
  computed: {
    getPaidOrganizationDetailsList() {
      return this.$store.getters.getPaidOrganizationDetailsList;
    },
  },
  methods: {
    close() {
      this.$emit("update:studentDetailDialog", false);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchApplicantDetailsList() {
      this.setLimit();
      console.log("search action ", this.searchParam);
      var self = this;
      this.loading = true;
      this.$store
        .dispatch("searchPaidOrganizationDetailsData", this.searchParam)
        .then((data) => {
          self.loading = false;
          self.pagination.sl_count = data.meta.from;
          self.pagination.totalDataItems = data.meta.total;
          console.log("...", data);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
