<template>
  <v-container fluid>
    <div>
      <v-container fluid>
        <v-layout column class="mx-0">
          <!-- College-info-wise search options -->
          <v-flex xs12>
            <span class="subheading ma-5">
              <v-icon left color="primary" medium>touch_app</v-icon
              >College-info-wise search options
            </span>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <!-- College -->
                <v-autocomplete
                  class="ma-2"
                  v-model="searchParam.college_code"
                  :item-text="
                    item => '(' + item.college_code + ') ' + item.college_name
                  "
                  item-value="college_code"
                  :items="getCollegeSchema"
                  menu-props="auto"
                  label="Select College"
                  prepend-icon="subject"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.college_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" +
                          data.item.college_code +
                          ") " +
                          data.item.college_name
                      }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="
                            '(' +
                              data.item.college_code +
                              ') ' +
                              data.item.college_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-text-field
                  v-model="searchParam.college_eiin"
                  class="mt-3 ml-2"
                  name="college_code"
                  label="College Eiin"
                  prepend-icon="edit"
                ></v-text-field>

                <v-select
                  v-model="searchParam.division"
                  :items="getDivisions"
                  item-text="division_name"
                  item-value="division_id"
                  label="Select Division"
                  name="division"
                  @change="getDistrictData"
                  class="mt-3 ml-2"
                  prepend-icon="edit"
                ></v-select>

                <v-select
                  v-model="searchParam.district"
                  :items="getDistricts"
                  item-text="district_name"
                  item-value="district_id"
                  label="Select District"
                  name="district"
                  @change="getThanaData"
                  class="mt-3 ml-2"
                  prepend-icon="edit"
                ></v-select>

                <v-select
                  v-model="searchParam.thana"
                  :items="getThanas"
                  item-text="thana_name"
                  item-value="thana_id"
                  class="mt-3 ml-2"
                  label="Select Thana"
                  name="thana"
                  prepend-icon="edit"
                ></v-select>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- Search Button -->
          <v-flex xs12 sm12 md12 class="my-0">
            <v-layout justify-center row fill-height align-center>
              <v-btn
                outline
                round
                large
                @click="getDataFromApi"
                color="primary"
              >
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider class="mt-2 mb-3"></v-divider>
      </v-container>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">College List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-card flat>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  medium
                  color="primary"
                  class="white--text"
                  @click="generateReport()"
                >
                  <v-icon dark>arrow_downward</v-icon>Export
                </v-btn>
              </v-card-actions>
            </v-card>
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
            <td class="text-xs-center">{{ props.item.college_code }}</td>
            <td class="text-xs-center">{{ props.item.college_eiin }}</td>
            <td class="text-xs-center">{{ props.item.college_name }}</td>
            <td class="text-xs-center">
              {{
                props.item.college_type
                  ? props.item.college_type.college_type
                  : ""
              }}
            </td>
            <td class="text-xs-center">
              {{ props.item.email ? props.item.email : "N/A" }}
            </td>
            <td class="text-xs-center">
              {{ props.item.mobile ? props.item.mobile : "N/A" }}
            </td>
            <td class="text-xs-center">
              {{
                props.item.districts
                  ? props.item.districts.district_name
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
            filename="College List"
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
                    style="font-family:Calibri,sans-serif;border: 1px solid red;width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
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
                            <h1
                              style="margin: 0; padding: 0; line-height: 1.2;"
                            >
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
                              Mismatch List
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
                              College List
                            </h1>

                            <h3
                              style=" text-align: right; margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                            >
                              Exam Name-{{ exam_name }}
                            </h3>
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
                style="font-family:Calibri,sans-serif;width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1cm;"
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
                      style="width: 72.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>College Code</strong>
                      </p>
                    </td>
                    <td
                      style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>EIIN</strong>
                      </p>
                    </td>
                    <td
                      style="width: 58.95pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>Name</strong>
                      </p>
                    </td>
                    <td
                      style="width: 60.9pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>College Type</strong>
                      </p>
                    </td>
                    <td
                      style="width: 132.4pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>Email</strong>
                      </p>
                    </td>
                    <td
                      style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>Mobile</strong>
                      </p>
                    </td>
                    <td
                      style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                      >
                        <strong>District</strong>
                      </p>
                    </td>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in getSchema" :key="item.rn">
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
                      style="width: 72.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{ item.college_code }}
                      </p>
                    </td>
                    <td
                      style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{ item.college_eiin }}
                      </p>
                    </td>
                    <td
                      style="width: 58.95pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{ item.college_name }}
                      </p>
                    </td>
                    <td
                      style="width: 60.9pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{ item.college_type.college_type }}
                      </p>
                    </td>
                    <td
                      style="width: 132.4pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{ item.email }}
                      </p>
                    </td>
                    <td
                      style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{ item.mobile }}
                      </p>
                    </td>
                    <td
                      style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                    >
                      <p
                        style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                      >
                        {{
                          item.districts ? item.districts.district_name : "N/A"
                        }}
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
    </div>
  </v-container>
</template>

<script>
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import VueHtml2pdf from "vue-html2pdf";
import common_login_getters from "@/mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { VueHtml2pdf },

  data: () => ({
    pagination: {
      rowsPerPage: 10,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }]
    },
    loading: true,
    searchParam: {},
    search: "",
    dialog: false,

    headers: [
      { text: "Code", align: "center", value: "college_code" },
      { text: "EIIN", align: "center", value: "college_eiin" },
      { text: "Name", align: "center", sortable: false, value: "college_name" },
      { text: "College Type", align: "center", value: "college_type" },
      { text: "Email", align: "center", value: "email" },
      { text: "Mobile", align: "center", value: "mobile" },
      { text: "District", align: "center", value: "district_name" }
    ],

    detailsData: "",
    detailsDialogStatus: false,
    formDialogStatus: false,
    editFormDialogStatus: false,
    editedItem: "",
    editedIndex: -1,
    exam_name: "",
    exam_year: "",
    ex_code: ""
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getCollegeData;
    },
    getCollegeSchema() {
      return this.$store.getters.getAllCollege;
    },
    getDivisions() {
      return this.$store.getters.getDivision;
    },
    getDistricts() {
      return this.$store.getters.getDistrict;
    },
    getThanas() {
      return this.$store.getters.getThana;
    }
  },

  created() {
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
    this.$store.dispatch("fetchAllCollegeData");
    this.$store.dispatch("fetchDivisions");
    this.$store.dispatch("fetchDistricts");
    this.$store.dispatch("fetchThanas");
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
    // get district data by division id
    getDistrictData(division_id) {
      if (division_id) {
        this.$store.dispatch("fetchDistricts", division_id);
      }
    },
    // get thana data by district id
    getThanaData(district_id) {
      if (district_id) {
        this.$store.dispatch("fetchThanas", district_id);
      }
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      var that = this;
      this.$store.dispatch("fetchCollegeList", this.searchParam).then(data => {
        that.loading = false;
        that.pagination.totalItems = data.meta.total;
      });
    },

    showItem(item) {
      item ? (this.detailsData = item) : "";
      this.detailsDialogStatus = true;
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editFormDialogStatus = true;
    },

    deleteItem(item) {},
    newItem() {
      this.formDialogStatus = true;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  margin-left: 5px;
}
</style>
