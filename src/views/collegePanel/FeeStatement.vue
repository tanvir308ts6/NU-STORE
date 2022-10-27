<template>
  <div id="FeeSummary">
    <v-container fluid>
      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content class="mycustomExpansionPanel">
          <template v-slot:actions>
            <v-icon large color="primary">$vuetify.icons.expand</v-icon>
          </template>
          <template v-slot:header>
            <div>
              <v-icon color="primary">search</v-icon>
              <span class="pl-2 subheading">Custom Search Panel</span>
            </div>
          </template>
          <v-layout row wrap align-center>
            <v-flex>
              <v-card class="px-3">
                <v-layout row wrap align-center class="py-3">
                  <v-flex md6>
                    <v-autocomplete
                      v-model="getSchema.exam_initiate_id"
                      :items="getExamMasterList"
                      item-text="exam_display_name"
                      item-value="id"
                      label="Select Exam"
                      data-vv-name="exam_name"
                      :error-messages="errors.collect('id')"
                      required
                      prepend-icon="subject"
                    ></v-autocomplete>
                  </v-flex>
                  <!-- <v-flex md3>
                    <v-select
                      v-model="getProbableSchema.degree_group_code"
                      :items="getCollegeDegreeWiseDegreeGroup"
                      item-text="degree_group_name"
                      item-value="degree_group_code"
                      label="Select Degree Group"
                      data-vv-name="degree_group_code"
                      :error-messages="errors.collect('degree_group_code')"
                      required
                      prepend-icon="subject"
                    ></v-select>
                  </v-flex>
                  <v-flex md3 v-if="getProbableSchema.degree_code!=1">
                    <v-select
                      v-model="getProbableSchema.subject_code"
                      :items="getCollegeDegreeGroupWiseSubject"
                      item-text="subject_name"
                      item-value="subject_code"
                      label="Select Subject"
                      data-vv-name="subject_code"
                      :error-messages="errors.collect('subject_code')"
                      required
                      prepend-icon="subject"
                    ></v-select>
                  </v-flex>-->

                  <v-flex xs12 sm12 md12 style="margin-top:40px;">
                    <v-layout justify-center row fill-height align-center>
                      <v-btn color="primary" large @click="search()"
                        >Search</v-btn
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
    <v-container fluid v-if="getFeeSummary.hasOwnProperty('all_subject_fee')">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Fee Summary</v-card-text>
          </v-card>
          <!-- <v-divider class="my-2" vertical></v-divider> -->
          <!-- <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
          ></v-text-field>-->
          <v-spacer />
          <v-btn @click="downloadPdf" color="primary" dark>
            Export As PDF
            <v-icon right dark>cloud_download</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        hide-actions
        :headers="headers"
        :items="getFeeSummary.all_subject_fee"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs-left">{{ props.item.subject_name }}</td>
          <td class="text-xs-center">{{ props.item.total_student }}</td>
          <td class="text-xs-right">{{ props.item.fee }}</td>
        </template>
        <template v-slot:footer>
          <tr>
            <td colspan="2" class="font-weight-bold">Total</td>
            <td class="text-xs-center font-weight-bold">
              {{ getFeeSummary.total_fee.total_student }}
            </td>
            <td class="text-xs-right font-weight-bold">
              {{ getFeeSummary.total_fee.total_fee }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import commonGet from "@/mixin/college_common_getters_mixin";
export default {
  mixins: [commonGet],
  components: {},
  computed: {
    getSchema() {
      return this.$store.getters.collegeFeeSummarySchema;
    },
    getFeeSummary() {
      return this.$store.getters.getCollegeFeeSummary;
    }
  },
  data() {
    return {
      panel: [true],
      headers: [
        {
          text: "SL.",
          sortable: false,
          align: "left",
          value: "id",
          width: "10"
        },

        { text: "Subject", value: "subject_name" },
        { text: "NO. of Student", align: "center", value: "total_student" },
        { text: "Total", align: "right", value: "fee" }
      ]
    };
  },
  created() {
    this.$store.commit("UNSET_FEE_SUMMARY");
    this.$store.dispatch("getCollegeExamMasterList");
    // this.$store.dispatch("getCollegeFeeSummary");
  },
  methods: {
    search() {
      this.$store.dispatch("getCollegeFeeSummery");
    },
    downloadPdf() {
      this.$store.dispatch("collegeFeeSummeryDownloadPdf", {
        params: this.getSchema,
        responseType: "blob"
      });
    }
  },
  mounted() {
    if (!this.getSchema.exam_initiate_id && this.getExamMasterList.length > 0) {
      this.getSchema.exam_initiate_id = this.getExamMasterList["0"].id;
    }
  }
};
</script>
