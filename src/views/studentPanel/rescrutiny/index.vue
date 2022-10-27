<template>
  <v-container fluid>
    <template>
      <v-layout justify-center>
        <v-flex xs12 md12>
          <v-toolbar color="black" dark>
            <v-toolbar-title class="text-uppercase"
              >Apply Re-scrutiny</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 md12 v-for="(item,index) in getSchema" :key="item.id">
                  <v-divider height="5" v-if="index" light></v-divider>
                  <v-card flat >
                    <v-card-title primary-title class="justify-center">
                      <div>
                        <div class="headline mb-0">
                          Re-scrutiny For
                          {{
                            item.exam_info
                              ? item.exam_info.exam_name +
                                " " +
                                `(${item.exam_info.exam_year})`
                              : ""
                          }}
                        </div>
                        <!--<div class="text-md-center">
                                                    <v-chip color="pink" text-color="white">
                                                        Start Date : {{ formatted_date(item.rescrutiny_start_date) }}
                                                    </v-chip>
                                                    <v-chip color="pink" text-color="white">
                                                        End Date : {{ formatted_date(item.rescrutiny_end_date) }}
                                                    </v-chip>
                        </div>-->
                        <div class="text-md-center">
                          <v-chip color="pink" text-color="white"
                            >Last Date :
                            {{ formatted_date(item.end_date) }}</v-chip
                          >
                        </div>
                      </div>
                    </v-card-title>
                    <!-- <v-divider light></v-divider> -->
                    <v-card-actions v-if="item.rescrutiny_status == 1">
                      <v-container fluid>
                        <h3 class="text-md-center red--text pl-3">
                          Progress of applied Re-scrutiny
                        </h3>
                        <v-layout row wrap>
                          <v-flex md3>
                            <v-checkbox
                              label="Applied"
                              color="indigo"
                              :input-value="
                                item.rescrutiny_status == 1 ? true : false
                              "
                              value
                              disabled
                              hide-details
                            ></v-checkbox>
                          </v-flex>
                          <v-flex md3>
                            <v-checkbox
                              label="Payment Status"
                              color="indigo"
                              :input-value="true"
                              value
                              hide-details
                              disabled
                            ></v-checkbox>
                          </v-flex>
                          <v-flex md3>
                            <v-checkbox
                              label="Result Process"
                              color="indigo"
                              value
                              :input-value="item.res_result_process"
                              hide-details
                              disabled
                            ></v-checkbox>
                          </v-flex>
                          <v-flex md3>
                            <v-checkbox
                              label="Result Published"
                              color="indigo"
                              :input-value="item.res_result_publish"
                              hide-details
                              disabled
                            ></v-checkbox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                    
                    <v-card-actions class="pa-3">
                      <v-btn color="primary">Notice</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="item.rescrutiny_status == 1"
                        color="success"
                        @click="detailsResCrutiny(item)"
                        >Re-scrutiny Details</v-btn
                      >
                      <v-btn v-if="item.rescrutiny_status == 1" color="primary">
                        Download Pay Sleep
                        <v-icon right dark>cloud_download</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="item.rescrutiny_status == 0"
                        color="success"
                        @click="applyResCrutiny(item)"
                        >Apply Now</v-btn
                      >
                    </v-card-actions>
                    
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    studentData: "",
    applyRescrutinyDialog: false,
    detailsDialog: false,
    selected: ["red"]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRescrunityExamList;
    }

    /*getStudentData() {
             return this.$store.getters.getStudentProfile;
             }*/
  },

  methods: {
    PaperDetails(item) {
      this.studentData = item;
      this.applyRescrutinyDialog = true;
    },

    showDetails(item) {
      this.studentData = item;
      this.detailsDialog = true;
    },

    applyResCrutiny(item) {
      this.$router.push({
        name: "re-scrutiny-apply",
        params: { result_id: item.id },
        query: { result_id: item.id,exam_code:item.exam_code,exam_year:item.exam_year }
      });
    },
    detailsResCrutiny(item) {
      this.$router.push({ path: "/student/re-scrutiny-details",query: {exam_code:item.exam_code,exam_year:item.exam_year} });
    },

    formatted_date(date) {
      return moment(date).format("DD-MM-YYYY");
    }
  },

  created() {
    this.$store.dispatch("fetchRescrunityExamList");
  }
};
</script>

<style scoped>
.v-card__title--primary {
  padding-top: 0;
}

.v-card__title {
  padding-bottom: 16px;
}
</style>
