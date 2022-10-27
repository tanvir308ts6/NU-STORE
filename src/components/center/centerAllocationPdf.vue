<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :enable-download="false"
      :preview-modal="true"
      filename="Center Allocation"
      :pdf-quality="2"
      :paginateElementsByHeight="0"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      :manual-pagination="true"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <!-- :paginate-elements-by-height="20000" -->

      <div slot="pdf-content" style="margin-top: 00px; border: 5px solid white">
        <div
          class="pa-0 mt-3 pt-3 mr-3 ml-3"
          style="margin-top: 0px; border: 5px solid white"
        >
          <v-data-table
            hide-actions
            :headers="headers"
            :items="getCenterAllocationSchema"
            class="elevation-0 mt-0 pa-0"
          >
            <template v-slot:items="props">
              <v-card
                v-if="getIfShowHeader(props.index)"
                height="100px"
              ></v-card>
              <tr
                :class="getClassForTR(props.index + 1)"
                :style="getStyleForTR(props.index + 1)"
              >
                <td class="text-xs-center CATCSS_l caption">
                  <div class="caption">
                    {{ props.item.center_code }} - {{ props.item.center_name }}
                    <v-chip color="green" text-color="white"
                      >Capacity :{{ props.item.student_capacity }}</v-chip
                    >
                  </div>
                </td>

                <td class="text-xs-center CATCSS" style="padding: 0 0px">
                  <v-data-table
                    hide-actions
                    hide-headers
                    :headers="colleges_header"
                    :items="props.item.college"
                    class="elevation-0"
                  >
                    <template v-slot:items="c_props">
                      <td class="text-xs-center CTCSS_l caption">
                        <div class="caption">
                          {{ c_props.item.college_code }}
                        </div>
                      </td>
                      <td class="text-xs-center CTCSS_r caption">
                        <div class="caption">
                          {{ c_props.item.college_name }}
                        </div>
                        <div
                          class="caption"
                          v-for="cus in c_props.item.customDegree"
                          :key="cus.degree"
                        >
                          [{{ cus.degree }} ]
                          {{ cus.subject }}
                          <!-- {{
                          JSON.stringify(cus.subject)
                          .split('"')
                          .join(" ")
                          }}-->
                        </div>
                      </td>
                    </template>
                  </v-data-table>

                  <v-chip
                    :color="
                      parseInt(props.item.college_capacity) <
                      parseInt(props.item.student_capacity)
                        ? 'green'
                        : 'red'
                    "
                    text-color="white"
                  >
                    <div class="caption">Total Students :</div>
                    <v-btn class="caption" small fab outline color="white">
                      <div class="caption">
                        {{ props.item.college_capacity }}
                      </div>
                    </v-btn>
                  </v-chip>
                </td>
                <td class="text-xs-center CATCSS caption">
                  <div class="caption">
                    {{ props.item.responsible_principle }}
                  </div>
                </td>
                <td class="text-xs-center CATCSS caption">
                  <div class="caption">{{ props.item.district_name }}</div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </div>
    </vue-html2pdf>
  </div>
</template>
<script>
import commonGet from "@/mixin/common_getters_mixin";
import VueHtml2pdf from "vue-html2pdf";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  props: ["getCenterAllocationSchema", "colleges_header"],
  data: () => ({
    exam_name: "",
    exam_year: "",
    ex_code: "",
    headers: [
      {
        text: "Center ",
        align: "center",
        width: "1",
        value: "center_code",
        sortable: false,
      },

      {
        text: "Colleges",
        width: "200",
        align: "center",
        value: "colleges",
        sortable: false,
      },
      {
        text: "Responsible",
        width: "1",
        align: "center",
        sortable: false,
        value: "responsible_principle",
      },
      {
        text: "District",
        width: "1",
        sortable: false,
        align: "center",
        value: "district_name",
      },
    ],
    tdPerPage: 7,
  }),
  created() {
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
  },
  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.$store.getters.getAuthUserExamInitiates.forEach((obj) => {
        if (obj.id == val) {
          this.exam_name = obj.exam_name;
          this.ex_code = obj.exam_code;
          this.exam_year = obj.year;
        }
      });
    },
  },
  methods: {
    onProgress(e) {
      console.log("onProgress", e);
    },
    hasGenerated(e) {
      console.log("hasGenerated", e);
    },
    hasStartedGeneration() {
      console.log("hasStartedGeneration");
    },
    generateReports() {
      this.$refs.html2Pdf.generatePdf();
    },
    hideCollegesTableHeader(i) {
      return true;
    },
    getClassForTR(i) {
      if (i % this.tdPerPage == 0) {
        console.log(i);
        return "html2pdf__page-break ";
      }
    },
    getStyleForTR(i) {
      // if (i % 7 == 0) {
      //   console.log(i);
      //   return "margin-top:5px";
      // }
      return "";
    },
    getIfShowHeader(i) {
      if (i != 0) {
        if (i % this.tdPerPage == 0) {
          return true;
        } else {
          return false;
        }
      }
    },
  },

  components: {
    VueHtml2pdf,
  },
};
</script>
<style scoped>
table,
th,
td {
  border: 0.3px solid black;
  border-collapse: collapse;
}
</style>
