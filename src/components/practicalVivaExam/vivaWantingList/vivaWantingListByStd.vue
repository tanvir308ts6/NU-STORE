<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <!-- {{getLoggedInExam}} -->
      <v-flex xs9>
        <v-select
          class="mx-3"
          disabled
          v-model="searchParam.exam_code"
          :items="getExamList"
          :item-text="item => item.code + ' -' + item.title"
          item-value="code"
          label="Exam"
          prepend-icon="store_mall_directory"
        ></v-select>
      </v-flex>
      <!-- {{getLoggedInYear}} -->
      <v-flex xs3>
        <v-select
          class="mx-3"
          disabled
          v-model="searchParam.year"
          :items="getYearList"
          :item-text="item => '' + item.year + ''"
          item-value="year"
          label="Year"
          prepend-icon="calendar_today"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-divider class="my-3"></v-divider>

    <v-divider class="my-3"></v-divider>

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
                  style="margin-top: -1.5em;"
                  class="elevation-0"
                  v-if="pagination.totalItems"
                  >{{ pagination.totalItems }}</v-btn
                >
              </template>
              <v-card-text class="title">Viva Wanting List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-layout justify-center row fill-height align-center>
            <v-btn flat round large>
              Flow: (
              {{ getVivaWantListByStd_current.center_name }}
              <v-icon dark class="mx-2">arrow_right_alt</v-icon>
              {{ getVivaWantListByStd_current.college_name }}
              <v-icon dark class="mx-2">arrow_right_alt</v-icon>
              {{ getVivaWantListByStd_current.subject_name }}
              <v-icon dark class="mx-2">arrow_right_alt</v-icon>
              {{ getVivaWantListByStd_current.paper_name }} )
            </v-btn>
            <v-btn
              medium
              color="primary"
              class="white--text"
              @click="generateReport()"
            >
              <v-icon dark>arrow_downward</v-icon>Download Viva Wanting List
            </v-btn>
          </v-layout>
        </v-layout>
      </v-card>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="getVivaWantListByStd"
        :loading="loading"
        :pagination.sync="pagination"
        :total-items="pagination.totalItems"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs">{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.exam_roll }}</td>
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.student_name }}</td>
          <td class="text-xs">
            <span
              >{{ props.item.center_code }} - {{ props.item.center_name }}</span
            >
          </td>
          <td class="text-xs">
            <span
              >{{ props.item.college_code }} -
              {{ props.item.college_name }}</span
            >
          </td>
          <td class="text-xs">
            <span
              >{{ props.item.subject_code }} -
              {{ props.item.subject_name }}</span
            >
          </td>
          <td class="text-xs">
            <span
              >{{ props.item.paper_code }} - {{ props.item.paper_name }}</span
            >
          </td>
          <!-- <td class="text-xs">{{ props.item.total_students }}</td>
          <td class="text-xs">{{ props.item.total_wanting_numbers }}</td>-->
        </template>
      </v-data-table>
      <div>
        <vue-html2pdf
          :show-layout="false"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="vivaWantingList"
          :pdf-quality="2"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="1000px"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div class="row">
              <div class="col-12">
                <table
                  style="border: 1px solid red;width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
                >
                  <tbody>
                    <tr style="background-color:white;">
                      <td
                        style="border: 1px solid black; padding: 8px; width: 50%"
                      >
                        <div style="float: left; width: 70px;">
                          <img
                            src="@/assets/nu_logos/nu_logo.png"
                            style="width: 100% !important;"
                          />
                        </div>
                        <div style="float: left; padding-left: 10px;">
                          <h1 style="margin: 0; padding: 0; line-height: 1.2;">
                            National University
                          </h1>
                          <h3
                            style="padding: 0; font-weight: 500; margin: 5px 0;"
                          >
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style="margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                          >
                            Viva Wanting List
                          </h3>
                          <h3
                            style="margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            {{ exam_name }}- {{ exam_year }}
                          </h3>
                        </div>
                      </td>
                      <td
                        style="border: 1px solid black;padding: 8px; width: 50%"
                      >
                        <div style="float: right; padding-left: 10px;">
                          <h1
                            style=" text-align: right; margin: 0; padding: 0; line-height: 1.2;"
                          >
                            National University
                          </h1>
                          <h3
                            style=" text-align: right; padding: 0; font-weight: 500; margin: 5px 0;"
                          >
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style=" text-align: right; margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                          ></h3>
                          <h3
                            style=" text-align: right;margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            Viva Wanting List
                          </h3>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <table
              style="width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
            >
              <thead>
                <tr>
                  <td
                    style="width: 32.45pt;border: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>SL.</strong>
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Exam Roll</strong>
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Regitration No</strong>
                    </p>
                  </td>
                  <td
                    style="width: 58.95pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Examinee Name</strong>
                    </p>
                  </td>
                  <!-- <td
                    style="width: 2cm;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style='margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;'
                    >
                      <strong>Phone</strong>
                    </p>
                  </td>-->
                  <td
                    style="width: 60.9pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Center</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>College</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Course</strong>
                    </p>
                  </td>
                </tr>
              </thead>
              <tbody
                v-for="(item, index) in getVivaWantListByStd"
                :key="item.index"
              >
                <tr style="background-color:white;">
                  <td
                    style="width: 32.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ index + 1 }}
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.exam_roll }}
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.reg_no }}
                    </p>
                  </td>
                  <td
                    style="width: 58.95pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.student_name }}
                    </p>
                  </td>
                  <!-- <td
                    style="width: 2cm;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style='margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;'
                    >
                      {{ item.phone }}
                    </p>
                  </td>-->
                  <td
                    style="width: 60.9pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.center_code }} - {{ item.center_name }}
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.college_code }} - {{ item.college_name }}
                    </p>
                  </td>

                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.paper_code }} - {{ item.paper_name }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:Calibri,sans-serif;"
            >
              &nbsp;
            </p>
          </section>
        </vue-html2pdf>
      </div>
    </v-container>
    <!-- <pre> {{getVivaWantListByStd}} </pre>
    <pre>{{searchParam}} </pre>
    <pre>::::{{getVivaWantListByStd_current}} </pre>-->

    <!--  -->
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import VueHtml2pdf from "vue-html2pdf";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { VueHtml2pdf },
  props: ["vivaDialogByCol"],
  data() {
    return {
      vivaDialogByStd: false,

      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },

      loading: false,
      sl_count: 0,
      exam_name: "",
      exam_year: "",

      searchParam: {
        full: true,
        admitcard: false,
        final: true,
        paper_type: 2,
      },

      headers: [
        { text: "SL", value: "sl" },
        { text: "Exam Roll", value: "exam_roll" },
        { text: "Reg No.", value: "reg_no" },
        { text: "Std Name", value: "year" },
        { text: "Center", value: "college_name" },
        { text: "College", value: "college_name" },
        { text: "Subject", value: "subject_name" },
        { text: "Course", value: "college_name" },
      ],
      forceRander: true,
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
  },
  computed: {
    //all data
    getVivaWantListByStd() {
      return this.$store.getters.getVivaWantListByStd;
    },

    // center
    getCenterItems() {
      return this.$store.getters.getCenterItems;
    },

    getVivaWantListByStd_current() {
      return this.$store.getters.getVivaWantListByStd_current;
    },
  },
  methods: {
    generateReport() {
      console.log("..m clcik");
      this.$store.commit("SET_LOADING", { color: "primary" });
      this.$refs.html2Pdf.generatePdf();
      setTimeout(() => {
        this.$store.commit("UNSET_LOADING"); // loading Closing
      }, 5000);
    },
    openDialogueByStd() {
      this.vivaDialogByStd = true;
    },
    closeDialogueByStd() {
      this.vivaDialogByStd = false;
    },

    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },

    searchVivaWantList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("searchVivaWantDataByStd", this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.total;
        });
    },

    removeCenter(item) {
      const index = this.searchParam.center_code.indexOf(item.center_code);
      if (index >= 0) this.searchParam.center_code.splice(index, 1);
    },
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
    pagination() {
      this.searchVivaWantList();
    },
    // vivaDialogByCol(val) {
    //   if (val) this.searchVivaWantList();
    // },
    getVivaWantListByStd_current(val) {
      if (Object.keys(val).length > 0) {
        this.searchParam.subject_code = [val.subject_code];
        this.searchParam.center_code = [val.center_code];
        this.searchParam.college_code = [val.college_code];
        this.searchParam.paper_code = [val.paper_code];
        this.searchVivaWantList();
      }
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
