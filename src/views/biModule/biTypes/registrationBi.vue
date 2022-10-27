<template>
  <v-container fluid>
    <v-layout column class="mx-0">
      <!-- Result-wise search options -->
      <v-flex xs12>
        <span class="subheading ma-5">
          <v-icon left color="primary" medium>touch_app</v-icon
          >Registration-wise search options
        </span>
        <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
          <v-layout row wrap align-center class="py-3">
            <!-- Registration  -->
            <v-flex>
              <v-card class="px-3">
                <v-layout row wrap align-center class="py-3">
                  <v-text-field
                    v-model="searchParam.std_id"
                    class="mt-3 ml-2"
                    name="std_id"
                    label="Student ID"
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-text-field
                    v-model="searchParam.reg_no"
                    class="mt-3 ml-2"
                    name="reg_no"
                    label="Reg. No."
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-text-field
                    v-model="searchParam.name"
                    class="mt-3 ml-2"
                    name="name"
                    label="Name"
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-text-field
                    v-model="searchParam.college_code"
                    class="mt-3 ml-2"
                    name="college_code"
                    label="College Code"
                    prepend-icon="edit"
                  ></v-text-field>

                  <v-select
                    v-model="searchParam.ac_session"
                    :items="getDegSession"
                    item-text="ac_session"
                    item-value="ac_session"
                    class="mt-3 ml-2"
                    name="rg_no"
                    label="Ac. Session"
                    prepend-icon="edit"
                  ></v-select>

                  <v-select
                    v-model="searchParam.degree_code"
                    :items="getDegree"
                    item-text="degree_name"
                    item-value="degree_code"
                    class="mt-3 ml-2"
                    name="degree_code"
                    label="Degree"
                    prepend-icon="edit"
                  ></v-select>
                  <v-select
                    v-model="searchParam.degree_group_code"
                    :items="getDegGroup"
                    item-text="degree_group_name"
                    item-value="degree_group_code"
                    class="mt-3 ml-2"
                    name="degree_group_code"
                    label="Degree Group"
                    prepend-icon="edit"
                  ></v-select>
                  <v-select
                    v-model="searchParam.subject_code"
                    :items="getDegSubject"
                    item-text="subject_name"
                    item-value="subject_code"
                    class="mt-3 ml-2"
                    name="subject_code"
                    label="Subject"
                    prepend-icon="edit"
                  ></v-select>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- Search Button -->
      <v-flex xs12 sm12 md12 class="my-0">
        <v-layout justify-center row fill-height align-center>
          <v-btn outline round large @click="getDataFromApi()" color="primary">
            <v-icon left dark>search</v-icon>Search
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mt-2 mb-3"></v-divider>
    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-card-text class="title">Registered Student List</v-card-text>
        </v-card>
        <v-divider class="my-2" vertical></v-divider>
        <v-btn
          medium
          color="primary"
          class="white--text"
          @click="generateReport()"
        >
          <v-icon dark>arrow_downward</v-icon>Export
        </v-btn>
      </v-layout>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="getSchema"
      class="elevation-1"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
      :loading="loading"
      :rows-per-page-items="pagination.rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">
          {{
            props.item.subject
              ? `(${props.item.subject.subject_code})` +
                " " +
                props.item.subject.subject_name
              : props.item.subject_code
          }}
        </td>
        <td class="text-xs-center">{{ props.item.reg_no }}</td>
        <td class="text-xs-center">{{ props.item.ac_session }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">
          {{ props.item.college ? props.item.college.college_name : "" }}
        </td>
        <td class="text-xs-center">
          {{
            props.item.degree
              ? `(${props.item.degree.degree_code})` +
                props.item.degree.degree_name
              : ""
          }}
        </td>
        <td class="text-xs-center">
          {{
            props.item.degree_group
              ? props.item.degree_group.degree_group_name
              : ""
          }}
        </td>
        <td class="text-xs-center">
          {{
            props.item.student_types
              ? props.item.student_types.student_type
              : "N/A"
          }}
        </td>
      </template>
      <template v-slot:no-data></template>
    </v-data-table>
    <div>
      <vue-html2pdf
        :show-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="Registered Student List"
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
                style="font-family:Calibri,sans-serif;border: 1px solid red;width: 75%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
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
                          Registered Student List
                        </h1>
                        <h3
                          style="margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                        >
                          Exam Name-{{ exam_name }}
                        </h3>
                        <h3
                          style=" text-align: right; margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                        ></h3>
                        <h3
                          style=" text-align: right;margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                        >
                          Exam Code- {{ ex_code }}
                        </h3>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <table
            style="font-size:15px;font-family:Calibri,sans-serif;border-color: black; background-color: white; margin-top: 0.5cm;margin-left: 1cm; margin-right: 0.5cm; width: 100%px;"
            border="1"
            cellspacing="0"
            cellpadding="0"
          >
            <thead>
              <tr style="background-color:white;">
                <td style=" text-align:center;">
                  <p>
                    <strong>Subject</strong>
                  </p>
                </td>
                <td style=" text-align:center;">
                  <p>
                    <strong>Reg No.</strong>
                  </p>
                </td>
                <td style="text-align:center;">
                  <p>
                    <strong>Session</strong>
                  </p>
                </td>
                <td style="text-align:center;">
                  <p>
                    <strong>Name</strong>
                  </p>
                </td>
                <td style="text-align:center;">
                  <p>
                    <strong>College</strong>
                  </p>
                </td>
                <td style="text-align:center;">
                  <p>
                    <strong>Degree</strong>
                  </p>
                </td>
                <td style="text-align:center;">
                  <p>
                    <strong>Degree Group</strong>
                  </p>
                </td>
                <td style=" text-align:center;">
                  <p>
                    <strong>Type</strong>
                  </p>
                </td>
              </tr>
            </thead>
            <tbody v-for="(item, index) in getSchema" :key="item.rn">
              <tr style="background-color:white;">
                <td style=" text-align:center;">
                  <p>{{ item.subject.subject_code }}</p>
                </td>
                <td style="text-align:center;">
                  <p>{{ item.reg_no }}</p>
                </td>
                <td style="text-align:center;">
                  <p>{{ item.ac_session }}</p>
                </td>
                <td style="text-align:center;">
                  <p>{{ item.name }}</p>
                </td>
                <td style="text-align:center;">
                  <p>{{ item.college.college_name }}</p>
                </td>
                <td style="text-align:center;">
                  <p>{{ item.degree.degree_code }}</p>
                </td>
                <td style="text-align:center;">
                  <p>{{ item.degree_group.degree_group_name }}</p>
                </td>
                <td style=" text-align:center;">
                  <p>{{ item.student_types.student_type }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </vue-html2pdf>
    </div>
  </v-container>
</template>

<script>
import searchPanel from "@/components/registration/regStudentSearch.vue";
import commonGet from "@/mixin/common_getters_mixin";
import VueHtml2pdf from "vue-html2pdf";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { searchPanel, VueHtml2pdf },

  data: () => ({
    detailDialog: false,
    studentDetail: "",
    pagination: {
      rowsPerPage: 10
    },
    loading: true,
    searchParam: {},
    search: "",

    headers: [
      { text: "Subject", align: "center", value: "subject_code" },
      { text: "Reg No", align: "center", value: "reg_no" },
      { text: "Session", align: "center", value: "ac_session" },
      { text: "Name", align: "center", value: "name" },
      { text: "College", align: "center", value: "college_code" },
      { text: "Degree", align: "center", value: "degree" },
      { text: "Degree Group", align: "center", value: "degree_group_name" },
      { text: "Reg Type", align: "center", value: "degree" }
    ],
    exam_name: "",
    exam_year: "",
    ex_code: ""
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRegStudentData;
    },
    getDegree() {
      return this.$store.getters.getAllDegree;
    },
    getDegGroup() {
      return this.$store.getters.getAllDegreeGroup;
    },
    getDegSubject() {
      return this.$store.getters.getAllSubject;
    },
    getDegSession() {
      return this.$store.getters.getAcSessionData;
    }
  },

  created() {
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
    // this.$store.dispatch("fetchRegStudentList");
    this.$store.dispatch("fetchAllDegreeData");
    this.$store.dispatch("fetchAllDegreeGroupData");
    this.$store.dispatch("fetchAllSubjectData");
    this.$store.dispatch("fetchSessionData");
  },

  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.$store.getters.getAuthUserExamInitiates.forEach(obj => {
        if (obj.id == val) {
          this.exam_name = obj.exam_name;
          this.ex_code = obj.exam_code;
          this.exam_year = obj.year;
        }
      });
    },
    pagination() {
      this.getDataFromApi();
    }
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
    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.setLimit();
      // let item = this.searchParam;
      this.loading = true;
      this.$store
        .dispatch("fetchRegStudentList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
          // Object.keys(this.searchParam).forEach(function(key, index) {
          //   item[key] = "";
          // });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
