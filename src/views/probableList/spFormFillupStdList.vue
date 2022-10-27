<template>
  <v-container fluid>
    <div>
      <addSpFormFillup
        :dialogStatus.sync="dialogStatus"
        :detailData="detailData"
      ></addSpFormFillup>
      <v-container fluid>
        <v-divider class="mt-3 mb-3"></v-divider>
        <v-card color="white">
          <v-layout row>
            <v-badge left overlap color="transparent">
              <template v-slot:badge>
                <v-btn
                  round
                  color="primary"
                  small
                  style="margin-top: -0.8em;"
                  class="elevation-0"
                  v-if="total_candidate"
                  >{{ total_candidate }}
                </v-btn>
              </template>
              <v-card-text class="title">Probable Student List</v-card-text>
            </v-badge>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="addFormFillUp()"
              >New Item</v-btn
            >
          </v-layout>
        </v-card>

        <!-- <v-data-table
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
                `(${props.item.subject_code})` + " " + props.item.subject_name
              }}
            </td>
            <td class="text-xs-center">{{ props.item.reg_no }}</td>
            <td class="text-xs-center">{{ props.item.ac_session }}</td>
            <td class="text-xs-center">{{ props.item.std_name }}</td>
            <td class="text-xs-center">
              {{
                props.item.college
                  ? `(${props.item.college.college_code})` +
                    props.item.college.college_name
                  : ""
              }}
            </td>
            <td class="text-xs-center">{{ props.item.degree_group_name }}</td>
            <td class="text-xs-center">
              {{
                props.item.candi_date_type
                  ? props.item.candi_date_type.candidate_type
                  : ""
              }}
            </td>
            <td class="text-xs-center">{{ props.item.slot_no }}</td>
            <td class="text-xs-center">
              <v-chip v-if="props.item.ff_criteria === '1'" small>
                REGULAR
              </v-chip>
              <v-chip v-if="props.item.ff_criteria === '2'" small>
                IRREGULAR
              </v-chip>
              <v-chip v-if="props.item.ff_criteria > 2" small>
                IMPROVEMENT
              </v-chip>
            </td>

            <td class="text-xs-center">
              <v-chip v-if="props.item.student_confirm_status === '1'" small>
                Applied
              </v-chip>
              <v-chip v-else small>
                Not Apply
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip v-if="props.item.teacher_confirm_status === '1'" small>
                Confirmed
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip
                v-if="props.item.payment_status === '1'"
                color="primary"
                text-color="white"
                small
              >
                Paid
              </v-chip>
              <v-chip v-else color="red" text-color="white" small>
                Unpaid
              </v-chip>
            </td>

            <td class="text-xs-center">
              <span
                v-if="
                  props.item.mandatory_papers > 0 &&
                    props.item.papers.length > 0
                "
              >
                {{ splitPaperCode(props.item.papers) }}
              </span>
            </td>
            <td class="text-xs-center">
              <span
                v-if="
                  props.item.improvement_papers > 0 &&
                    props.item.papers.length > 0
                "
              >
                {{ splitPaperCode(props.item.papers) }}
              </span>
            </td>
            <td class="text-xs-center">
              <span
                v-if="
                  props.item.optional_papers > 0 && props.item.papers.length > 0
                "
              >
                {{ splitPaperCode(props.item.papers) }}
              </span>
            </td>
            <td class="text-xs-center">
              <v-btn
                outline
                color="info"
                @click="showPaperDetails(props.item.papers)"
              >
                <b class="mr-2">{{ props.item.papers.length }}</b>
                <span v-if="props.item.papers.length - 1">Papers</span>
                <span v-else class="mr-2">Paper</span>
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table> -->
      </v-container>
    </div>
  </v-container>
</template>
<script>
import addSpFormFillup from "@/components/probable/specialFormFillup/specialFormFillup.vue";
export default {
  components: {
    addSpFormFillup
  },
  data: () => ({
    total_candidate: 0,
    dialog: false,
    dialogStatus: false,
    detailData: {}
  }),

  computed: {},

  created() {
    //getCollegeFromApi();
  },

  methods: {
    addFormFillUp() {
      this.dialogStatus = true;
      this.detailData = {};
    }
  },

  watch: {}
};
</script>

<style scoped>
table.papers {
  border-collapse: collapse;
  width: 100%;
}

table.papers th,
table.papers td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
