<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar dark color="cyan darken-4">
          <v-toolbar-title class="text-uppercase"
            >Paper Details
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md6>
              <table class="detail-info">
                <tr>
                  <th>Paper Code</th>
                  <td>{{ detailData ? detailData.paper_code : "" }}</td>
                </tr>
                <tr>
                  <th>Paper Type</th>
                  <td>
                    {{
                      detailData.paper_types
                        ? detailData.paper_types.paper_type
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Degree Group</th>
                  <td>
                    {{
                      detailData.degree_group
                        ? detailData.degree_group.degree_group_display_name
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Exam</th>
                  <td>
                    {{
                      detailData.exam
                        ? detailData.exam.exam_code +
                          " - " +
                          detailData.exam.exam_name
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Pair Paper Code</th>
                  <td>{{ detailData ? detailData.pair_paper_code : 0 }}</td>
                </tr>
                <tr>
                  <th>Credit</th>
                  <td>{{ detailData ? detailData.credit : 0 }}</td>
                </tr>
                <tr>
                  <th>Theory Full Marks</th>
                  <td>{{ detailData ? detailData.theory_full_marks : 0 }}</td>
                </tr>
                <tr>
                  <th>Non Theory Full Marks</th>
                  <td>
                    {{ detailData ? detailData.non_theory_full_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Incourse Marks</th>
                  <td>{{ detailData ? detailData.incourse_marks : 0 }}</td>
                </tr>
                <tr>
                  <th>Practical Full Marks</th>
                  <td>
                    {{ detailData ? detailData.practical_full_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Viva Full Marks</th>
                  <td>
                    {{ detailData ? detailData.viva_full_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Regulation Session Start</th>
                  <td>
                    {{ detailData ? detailData.regulation_session_start : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Is Incourse PV</th>
                  <td>
                    {{ detailData.is_incourse_pv == 1 ? "Yes" : 'No' }}
                  </td>
                </tr>
              </table>
            </v-flex>
            <v-flex md6>
              <table class="detail-info">
                <tr>
                  <th>Paper Name</th>
                  <td>{{ detailData ? detailData.paper_name : 0 }}</td>
                </tr>
                <tr>
                  <th>Degree</th>
                  <td>
                    {{
                      detailData.degree
                        ? detailData.degree.degree_display_name
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Subject</th>
                  <td>
                    {{
                      detailData.subject ? detailData.subject.display_name : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Sif Type</th>
                  <td>
                    {{
                      detailData.paper_type_info
                        ? detailData.paper_type_info.name
                        : "" | capitalize
                    }}
                  </td>
                </tr>
                <tr>
                  <th>Alternative Paper Code</th>
                  <td>{{ detailData ? detailData.alt_paper_code : 0 }}</td>
                </tr>
                <tr>
                  <th>Full Marks</th>
                  <td>{{ detailData ? detailData.full_marks : 0 }}</td>
                </tr>
                <tr>
                  <th>Theory Full Marks</th>
                  <td>{{ detailData ? detailData.theory_full_marks : 0 }}</td>
                </tr>
                <tr>
                  <th>Non Theory Pass Marks</th>
                  <td>
                    {{ detailData ? detailData.non_theory_pass_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Minimum Incourse Marks</th>
                  <td>
                    {{ detailData ? detailData.minimum_incourse_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Practical Pass Marks</th>
                  <td>
                    {{ detailData ? detailData.practical_pass_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Viva Pass Marks</th>
                  <td>
                    {{ detailData ? detailData.viva_pass_marks : 0 }}
                  </td>
                </tr>
                <tr>
                  <th>Regulation Session End</th>
                  <td>
                    {{ detailData ? detailData.regulation_session_end : "" }}
                  </td>
                </tr>
                <tr>
                  <th>Active</th>
                  <td>
                    {{ detailData.status == 1 ? "Yes" : 'No' }}
                  </td>
                </tr>
              </table>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import common_login_getters from "@/mixin/common_login_getters";

export default {
  mixins: [common_login_getters],
  props: ["dialogStatus", "detailData"],

  data: () => ({
    dialog: false,

    expand: false,
    loading: true
  }),

  methods: {
    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      if (val) {
        // this.getDataFromApi();
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>

<style scoped>
.attach {
  border-collapse: collapse;
  width: 50%;
  margin: 0 auto;
}

.attach th,
.attach td {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

caption {
  display: table-caption;
  text-align: center;
  font-weight: bold;
}

table.detail-info {
  border-collapse: collapse;
  width: 100%;
}

.detail-info th,
.detail-info td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
