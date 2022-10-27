<template>
  <v-container fluid>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary " class="mt-2">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Examinee Wise Mark Data</v-toolbar-title>
          <v-spacer></v-spacer>
          Examiner:
          {{ curentExaminerItem.tims_id }} -
          {{ curentExaminerItem.examiner_name }}
          <v-divider class="ml-4" inset vertical />
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <MarkCountByStd
          :curentExaminerItem="curentExaminerItem"
        ></MarkCountByStd>
      </v-card>
    </v-dialog>

    <v-card class="ma-4">
      <!-- {{markDetailsData}} -->
      <v-card-title>
        <h2>Examiner Wise Mark Data:</h2>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="downloadHeadExaminerMarkReport()"
          >Download Mark Details</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="getMarkCountListByExaminer"
        :loading="loading"
        hide-actions
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.index + 1 }}</td>
          <td class="text-xs-left">
            {{ props.item.subject_code }} - {{ props.item.subject_title }}
          </td>
          <td class="text-xs-left">
            {{ props.item.paper_code }} - {{ props.item.paper_name }}
          </td>

          <td class="text-xs-left">
            <v-btn color="#99D5FF" @click="showMarkCountByStd(props.item)">
              {{ props.item.tims_id }} -
              {{ props.item.examiner_name }}
            </v-btn>
          </td>
          <!-- <td class="text-xs-center">{{ props.item.tims_id }}</td> -->
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.phone }}</td>
          <!-- <td class="text-xs-center">{{ props.item.script_quantity }}</td> -->
          <td class="text-xs-center">{{ props.item.scan_quantity }}</td>

          <!-- <td class="text-xs-center">
            <v-btn @click="downloadExaminerMarkReport()">Download Mark Details</v-btn>
          </td>-->
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning" outline
            >Your search for "{{ search }}" found no results.</v-alert
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- {{getLoggedInExam}} -->
    <!-- <div style="opacity:.3;">
      <pre style=" font-size: 10px !important;"> {{searchParam}} </pre>

      <hr />
      <pre style=" font-size: 10px !important;"> {{curentHeadExaminerItem}} </pre>
      <hr />
      <pre style="font-size: 10px !important;"> {{getMarkCountListByExaminer}} </pre>
      <hr />
    </div>-->
  </v-container>
</template>

<script>
import MarkCountByStd from "@/components/examiner/MarkCountByStd";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    MarkCountByStd,
  },
  props: ["curentHeadExaminerItem"],
  data() {
    return {
      user_id: "",
      search: "",
      curentExaminerItem: [],
      markDetailsData: [],
      dialog: false,
      searchParam: {},
      loading: false,
      headers: [
        {
          text: "Sl",
          align: "center",
          value: "id",
          sortable: false,
          width: "1%",
        },
        {
          text: "Subject",
          align: "center",
          value: "Subject",
          sortable: false,
          width: "15%",
        },
        {
          text: "Paper",
          align: "center",
          value: "Paper",
          sortable: false,
          width: "15%",
        },
        {
          text: "Examiner",
          align: "left",
          value: "Examiner",
          sortable: false,
          width: "10%",
        },
        // { text: "TMIS ID", align: "center", value: "tmis_id", sortable: false },
        {
          text: "Email",
          align: "center",
          value: "E-mail",
          sortable: false,
          width: "8%",
        },
        {
          text: "Phone",
          align: "center",
          value: "Phone",
          sortable: false,
          width: "5%",
        },
        // {
        //   text: "Script Quantity",
        //   align: "center",
        //   value: "Script_Count",
        //   sortable: false,
        // },
        {
          text: " Scaned Script Quantity",
          align: "center",
          value: "Script_Scaned",
          sortable: false,
          width: "5%",
        },
        // {
        //   text: "Mark Details",
        //   align: "center",
        //   value: "Script_Scaned",
        //   sortable: false
        // }
      ],
    };
  },
  created() {
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  methods: {
    downloadHeadExaminerMarkReport() {
      this.searchParam.user_id = this.user_id;
      this.$store.dispatch("downloadHeadExaminerMarkReport", this.searchParam);
    },
    studentExpulsion() {
      this.$root
        .$confirm("Are you sure that you want to Expel?")
        .then((confirm) => {
          if (confirm) {
            console.log("studentExpulsion");
          }
        });
    },
    fetchMarkCountByExaminer() {
      this.$store.commit("UNSET_MARK_COUNT_BY_E");
      this.loading = true;
      this.$store
        .dispatch("fetchMarkCountByExaminer", this.searchParam)
        .then(() => {
          this.loading = false;
        });
    },
    showMarkCountByStd(item) {
      this.curentExaminerItem = item;
      this.dialog = true;
    },
  },
  computed: {
    getMarkCountListByExaminer() {
      let data = this.$store.getters.getMarkCountListByExaminer;
      return data;
    },
  },
  watch: {
    curentHeadExaminerItem(val) {
      console.log(val);
      try {
        this.user_id = val.user_id;
        this.searchParam.user_id = this.user_id;
        // if (this.ifAdminUserType) {
        //   this.searchParam.examiner_type = val.examiner_type;
        // } else {
        //   this.searchParam.examiner_type = this.getAuthUser.examiner.examiner_type;
        // }
      } catch (er) {}
      this.fetchMarkCountByExaminer();
    },
  },
};
</script>
