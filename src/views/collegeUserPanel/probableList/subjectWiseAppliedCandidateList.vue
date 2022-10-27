<template>
  <v-container fluid>
    <!-- <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
    ></formDialog>-->

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  fab
                  small
                  style="margin-top: -1.3em;"
                  class="elevation-0"
                  v-if="getProbableData.length"
                  >{{ getProbableData.length }}</v-btn
                >
              </template>
              <v-card-text class="title">Applied Candidate List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>
          <v-spacer />
          <v-btn @click="downloadPdf" color="primary" dark>
            Export As PDF
            <v-icon right dark>cloud_download</v-icon>
          </v-btn>
        </v-layout>
      </v-card>

      <v-data-table
        :disable-initial-sort="true"
        :headers="headers"
        :items="getProbableData"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[
          25,
          50,
          100,
          { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
        ]"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <!-- <td class="text-xs">{{ props.item.std_id }}</td> -->
          <td class="text-xs">{{ props.item.student.reg_no }}</td>
          <td class="text-xs">{{ props.item.student.ac_session }}</td>
          <td class="text-xs">{{ props.item.student.name }}</td>
          <td class="text-xs">{{ props.item.student.father_name }}</td>
          <!-- <td class="text-xs">{{ props.item.candi_date_type.candidate_type }}</td> -->
          <td class="text-xs">
            {{ getPaperCodes(props.item.papers) }}
          </td>
          <td class="text-xs">{{ props.item.student.mobile }}</td>
          <td class="text-xs">{{ props.item.nu_fee }}</td>
          <td class="text-xs">
            <v-chip
              v-if="Number(props.item.teacher_confirm_status) == 1"
              small
              color="green"
              text-color="white"
              >Confirmed</v-chip
            >
            <v-chip v-else small color="red" text-color="white"
              >Not Confirm</v-chip
            >
          </td>
        </template>
      </v-data-table>
      <!-- <pre>{{getProbableData}}</pre> -->
    </v-container>
  </v-container>
</template>

<script>
// import formDialog from "@/components/examInitiate/examInitiateForm.vue";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, watchMixin],
  components: {
    // formDialog
  },
  data() {
    return {
      pagination: {},

      dialog: false,
      loadData: false,
      totalDataItems: 10,
      formDialogStatus: false,
      search: "",
      limit: {},
      headers: [
        {
          text: "SL.",
          sortable: false,
          align: "left",
          value: "id",
          width: "10"
        },
        // { text: "Student ID", value: "std_id" },
        { text: "REG. No.", value: "student.reg_no" },
        { text: "Session", value: "student.ac_session" },
        { text: "Student Name", value: "student.name" },
        { text: "Father Name", value: "student.father_name" },
        // { text: "Candidate Type", value: "candi_date_type.candidate_type" },
        { text: "Paper Code", value: "papers.paper_code" },
        { text: "Mobile No.", value: "student.mobile" },
        { text: "NU Fee", value: "nu_fee" },
        { text: "Confirm Status", value: "teacher_confirm_status" }
        // { text: "Actions", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      probableDataType: "student_confirm"
    };
  },
  created() {
    let current_privilege = JSON.parse(
      localStorage.getItem("current-privilege")
    );
    this.$store.dispatch("getProbableData", {
      params: {
        type: this.probableDataType,
        current_privilege: current_privilege
      }
    });
  },
  // mounted() {
  // 	this.getDataFromApi();
  // },
  // watch: {
  // 	pagination: {
  // 		handler() {
  // 			this.getDataFromApi();
  // 		},
  // 		deep: true
  // 	},
  // 	loadData: {
  // 		handler(status) {
  // 			if (status) this.getDataFromApi();
  // 			this.loadData = false;
  // 		}
  // 	}
  // },
  computed: {
    getProbableData() {
      return this.$store.getters.getProbableData;
    }
    // getExamInitiateItem() {
    //   return this.$store.getters.getExamInitiateList;
    // }
  },
  methods: {
    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_code: "",
        exam_name: "",
        exam_type: "",
        session: "",
        exam_type_name: "",
        year: "",
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
    },
    // setLimit() {
    // 	const { sortBy, descending, page, rowsPerPage } = this.pagination;
    // 	this.limit = {
    // 		page: page,
    // 		limit: rowsPerPage,
    // 		sort: sortBy,
    // 		search: this.search
    // 	};
    // },
    // getDataFromApi() {
    // 	this.loading = true;
    // 	this.setLimit();
    // 	this.$store.dispatch("fetchCenLsDistToRegData", this.limit).then(data => {
    // 		this.loading = false;
    // 		this.totalDataItems = data.meta.total;
    // 	});
    // },
    // dialogOpen() {
    //   this.formDialogStatus = true;
    // },
    // newItem() {
    //   this.unSetEditedData();
    //   //this.editedItem.exam_id = this.getLoggedInExam.code;
    //   this.dialogOpen();
    // },
    // editItem(item) {
    //   this.editedIndex = this.getExamInitiateItem.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogOpen();
    // },
    // deleteItem(item) {
    //   const id = item.id;
    //   let self = this;

    //   this.$root
    //     .$confirm("Are you sure that you want to delete?")
    //     .then(confirm => {
    //       if (confirm) {
    //         this.$store
    //           .dispatch("deleteExamInitiateItem", id)
    //           .then(function(data) {
    //             self.$store.dispatch("callExamInitiateData");
    //           })
    //           .catch(function(error) {
    //             console.log(error);

    //             self.$store.dispatch("callExamInitiateData");
    //           });
    //       }
    //     });
    // },
    downloadPdf() {
      let current_privilege = JSON.parse(
        localStorage.getItem("current-privilege")
      );
      this.$store.dispatch("ProbableDataDownloadPdf", {
        params: {
          type: this.probableDataType,
          current_privilege: current_privilege
        },
        responseType: "blob"
      });
    },
    getPaperCodes(papers) {
      let paperCode = [];
      papers.forEach((paper, index) => {
        if (paper.confirm_paper) {
          paperCode.push(paper.paper_code);
        }
      });
      return paperCode.join();
    }
  }
};
</script>

<style scoped>
table.v-table tbody td,
table.v-table tbody th {
  height: 0px;
  white-space: nowrap;
}
</style>
