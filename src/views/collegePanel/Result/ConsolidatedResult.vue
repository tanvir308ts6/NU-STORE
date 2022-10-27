<template>
  <div id="ConsolidatedResult">
    <v-container>
      <v-card color="white">
        <v-card-text class="title">Consolidate Result</v-card-text>
      </v-card>
      <v-layout row wrap align-center>
        <v-flex>
          <v-card class="px-3">
            <CustomSearchForm :form="search"></CustomSearchForm>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex>
          <v-card class="px-3">
            <ConsolidateResult
              v-if="resultStatus"
              :data="ConsolidateResult"
            ></ConsolidateResult>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <pre>{{search.data}}</pre> -->
  </div>
</template>
<script>
import CustomSearchForm from "@/components/collegePanel/CustomSearchForm.vue";
import ConsolidateResult from "@/components/collegePanel/Result/ConsolidateResult.vue";
export default {
  components: {
    CustomSearchForm,
    ConsolidateResult
  },
  computed: {
    ConsolidateResult() {
      return this.$store.getters.getConsolidateResult;
    }
  },
  data() {
    return {
      resultStatus: false,
      search: {
        data: {},
        show: {
          exam_code: false,
          degree_code: true,
          exam_year: true,
          degree_group: true,
          subject: false,
          reg_no: true
        },
        validation: {
          exam_code: {
            required: true
          },
          degree_code: {
            required: true
          },
          degree_group: {
            required: true
          },
          fee_title: {
            required: true,
            numeric: true,
            min: 6,
            max: 10
          },
          exam_year: {
            required: true
          },
          subject: {
            required: true
          }
        }
      }
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("getConsolidateResult", {
          params: this.search.data
        })
        .then(success => {
          this.resultStatus = true;
        });
      console.log("submit call >>>>");
    },
    downloadPdf() {
      this.$store.dispatch("getConsolidateResultDownloadPdf", {
        params: this.search.data,
        responseType: "blob"
      });

      // console.log("collegeProbableListDownloadPdf");
    }
  }
};
</script>
