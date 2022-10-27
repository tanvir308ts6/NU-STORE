<template>
  <div>
    <!-- {{currentItem.marks}} -->
    <v-layout row justify-center>
      <v-card>
        <v-data-table
          :headers="mark_headers"
          :items="getVMarkList"
          class="elevation-1"
          :loading="loading"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.student_name }}</td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>
            <td class="text-xs-center">{{ props.item.mark }}</td>
            <td class="text-xs-center">{{ props.item.exam_roll }}</td>
            <td class="text-xs-center">
              ({{ props.item.subject_code }}){{ props.item.subject_name }}
            </td>
            <!-- <td class="text-xs-center">{{ props.item.mark }}</td> -->
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
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      search: "",
      searchParam: {},
      loading: false,
      sl_count: 1,
      mark_headers: [
        {
          text: "Student Name",
          value: "student_name",
          align: "right",
          width: "100"
        },
        {
          text: "Student Reg No",
          value: "reg_no",
          align: "right",
          width: "100"
        },
        {
          text: "Mark",
          value: "mark",
          align: "center",
          width: "200"
        },
        {
          text: "Exam Roll",
          value: "exam_roll",
          align: "center",
          width: "200"
        },
        {
          text: "Subject",
          value: "subject_code",
          align: "center",
          width: "200"
        }
      ]
    };
  },
  watch: {
    studentDetailDialog(val) {
      console.log("wtch", val);
      this.dialog = val;
      this.searchParam.paper_code = this.currentItem.paper_code;
      this.searchParam.exam_code = this.currentItem.exam_code;
      this.searchParam.year = this.currentItem.year;
      this.searchParam.exam_initiate_id = this.currentItem.exam_initiate_id;
      // this.searchParam.exam_initiate_id = this.getExamInitiateId;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.center_code;
      }
      console.log("created", this.searchParam);
      this.$store.dispatch("searchVivaMarks", this.searchParam).then(data => {
        console.log("mark show viva", data);
      });
    },
    dialog(val) {
      if (!val) this.close();
    },
    pagination() {
      this.searchStudentList();
    }
  },
  computed: {
    getVMarkList() {
      return this.$store.getters.getVMarkList;
    }
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
    searchStudentList() {
      this.setLimit();
      console.log("search action ", this.searchParam);
      var self = this;
      this.loading = true;
      this.$store.dispatch("searchVivaMarks", this.searchParam).then(data => {
        self.loading = false;
        self.pagination.sl_count = data.meta.from;
        self.pagination.totalDataItems = data.meta.total;
        console.log("...", data);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
