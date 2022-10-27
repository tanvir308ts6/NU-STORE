<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"
      filename="Invigilator List"
      :pdf-quality="2"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <!-- PDF Content Here -->
        <div class="row">
          <div class="col-12">
            <table
              style="width: 75%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
            >
              <tbody>
                <tr style="background-color:white;">
                  <td style="border: 1px solid black; padding: 8px; width: 50%">
                    <div style="float: left; width: 70px;">
                      <img
                        src="../../assets/nu_logos/nu_logo.png"
                        style="width: 100% !important;"
                      />
                    </div>
                    <div style="float: left; padding-left: 10px;">
                      <h1 style="margin: 0; padding: 0; line-height: 1.2;">
                        National University
                      </h1>
                      <h3 style="padding: 0; font-weight: 500; margin: 5px 0;">
                        Gazipur-1704, Bangladesh
                      </h3>

                      <h3
                        style="margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                      >
                        {{ exam_name }}- {{ exam_year }}
                      </h3>
                    </div>
                  </td>
                  <td style="border: 1px solid black;padding: 8px; width: 50%">
                    <div style="float: right; padding-left: 10px;">
                      <h1
                        style=" text-align: right; margin: 0; padding: 0; line-height: 1.2;"
                      >
                        Invigilator List
                      </h1>
                      <h3
                        style=" text-align: right; padding: 0; font-weight: 500; margin: 5px 0;"
                      >
                        Exam Name - {{ exam_name }}
                      </h3>
                      <h3
                        style=" text-align: right; margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                      ></h3>
                      <h3
                        style=" text-align: right;margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                      >
                        Exam Code -{{ ex_code }}
                      </h3>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table
          style="width: 75%;border-collapse:collapse;margin-left:1cm;margin-top:1cm;"
        >
          <thead>
            <tr>
              <td
                style="width: 132.4pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
              >
                <p
                  style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                >
                  <strong>Invigilator Name</strong>
                </p>
              </td>
              <td
                style="width: 60.9pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
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
            </tr>
          </thead>

          <tbody v-for="item in getSchema" :key="item.invigilator_id">
            <tr style="background-color:white;" v-if="item.app_access == 1">
              <td
                style="width: 132.4pt;border-top: none;border-left: 1pt solid black;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
              >
                <p
                  style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                >
                  {{ item.invigilator_name }}
                </p>
              </td>
              <td
                style="width: 60.9pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
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
            </tr>
          </tbody>
        </table>
      </section>
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
  props: ["getSchema", "param"],
  data: () => ({
    dataarray: [],
    exam_name: "",
    exam_year: "",
    ex_code: ""
  }),
  created() {
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
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
    }
  },
  methods: {
    generateReports() {
      this.getSchema.forEach(e => {
        if (e.app_access == 1) {
          this.dataarray.push(e);
        }
        console.log("..d", this.dataarray);
      });
      this.ex_code = this.param.exam_code;
      this.exam_year = this.param.year;
      this.$store.getters.getAuthUserExamInitiates.forEach(obj => {
        if (obj.exam_code == this.param.exam_code) {
          this.exam_name = obj.exam_name;
        }
      });
      this.$refs.html2Pdf.generatePdf();
      this.close();
    },
    close() {
      this.dataarray = [];
    }
  },

  components: {
    VueHtml2pdf
  }
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
