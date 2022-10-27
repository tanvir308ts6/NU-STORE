<template>
  <v-container fluid>
    <admitCardCountByCenter />
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import admitCardCountByCenter from "@/components/admitCard/admitCardCountByCenter.vue";

export default {
  mixins: [commonGet, commonExamYear],
  components: {
    admitCardCountByCenter,
  },
  data() {
    return {
      admitCardDialogStatus: false,
      currentItem: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [1, 5, 10, 25, { text: "All", value: -1 }],
      },
      search: "",
      sl_count: 0,
      loading: false,
      searchParam: {},
      expand: false,
      headers: [
        { text: "SL.", align: "left", value: "id" },
        { text: "Exam", value: "exam_code" },
        { text: "College ", value: "college_code" },
        // { text: "Session", value: "session" },
        { text: "Year", value: "year" },
        { text: "Student Count", align: "center", value: "student_count" },
        { text: "Download", align: "center", value: "view", sortable: false },
        {
          text: "Show Details",
          align: "center",
          value: "view",
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.searchParam.type = "college";
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");

    //exam
    if (!this.$store.getters.getExamItem.length) {
      this.$store.dispatch("fetchExamData");
    }
    //center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
  },
  computed: {
    // center
    getCenterItems() {
      return this.$store.getters.getCenterItems;
    },

    //all data
    getAdmitCardGroupByCollegeList() {
      return this.$store.getters.getAdmitCardGroupByCollegeList;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
  },
  methods: {
    processAdmitCardGenColWise() {
      // console.log("--->", this.searchParam.exam_code);

      if (this.searchParam.exam_code == null || this.searchParam.year == null) {
        console.log("in if --> Null");
        this.$store.commit("SET_SNACKBAR", {
          msg: "Exam or Year not selected ",
          color: "red",
        });
      } else {
        console.log("in else --> Not Null");
        this.$root
          .$confirm("Are you sure that you want to Generate?")
          .then((confirm) => {
            if (confirm) {
              this.$store
                .dispatch("generateAdmitCardColwise", this.searchParam)
                .then(() => {
                  console.log("success");
                });
            }
          });
      }
    },
    onStartedDownload(id) {
      console.log(`Started downloading: ${id}`);
    },

    onFailed(error) {
      console.log(`Download failed: ${error}`);
    },
    downloadAdmit(item) {
      console.log("down method", item);
      var param = {
        exam_code: item.exam_code,
        exam_year: item.year,
        college_code: item.college_code,
        module_name: "College",
      };

      this.$store.dispatch("downloadAdmitCollegewise", param).then((result) => {
        console.log("in then", result);
        result.forEach((url) => {
          setTimeout(function() {
            var fileLink = document.createElement("a");
            fileLink.href = url;
            fileLink.setAttribute("download", "file.pdf");
            fileLink.setAttribute("target", "_blank");
            document.body.appendChild(fileLink);
            fileLink.click();
          }, 1000);
        });
      });
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    // resolve(response.data.meta);
    searchAdmitCardCollegewiseList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchAdmitCardCollegewiseData", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },
    viewAdmitCard(item) {
      this.$refs.refAdmitCard.searchParam.exam_code = item.exam_code;
      this.$refs.refAdmitCard.searchParam.college_code = item.college_code;
      this.$refs.refAdmitCard.searchParam.year = item.year;
      this.$refs.refAdmitCard.searchParam.session_year = item.session;
      this.$refs.refAdmitCard.admitGenMode = false;
      this.$refs.refAdmitCard.centerMode = false;
      this.$refs.refAdmitCard.collegeMode = false;
      this.$refs.refAdmitCard.paperMode = false;
      this.$refs.refAdmitCard.regMode = true;
      this.$refs.refAdmitCard.searchAdmitCardList();
      this.admitCardDialogStatus = !this.admitCardDialogStatus;
    },
    viewAdmitCardColDetails(item) {
      this.$store.commit("SET_ADMIT_CARD_CURRENT_ITEM_DETAILS", item);
      this.admitCardDialogStatus = true;
    },
    close() {
      this.admitCardDialogStatus = false;
      this.$store.commit("UNSET_ADMIT_CARD_LIST_DATA");
      this.$store.commit("UNSET_LOADING");
    },
  },
  watch: {
    pagination() {
      this.searchAdmitCardCollegewiseList();
    },
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}

.Male {
  background-color: #386c8e;
  color: white;
}
.Female {
  background-color: #ad2da3;
  color: white;
}
</style>
