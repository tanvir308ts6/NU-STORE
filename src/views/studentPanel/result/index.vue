<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="black" class="white--text" dense>
        <v-toolbar-title>Course Results</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex md12>
            <v-card flat v-for="(data,index) in getSchema" :key="data.id">
              <!-- {{data}}-->
              <slot v-if="data.result_type < 6">
              <v-card-title primary-title class="justify-center">
                <div>
                  <div class="headline mb-0">
                    {{ data.core_exam ? data.core_exam.exam_name : "" }}, Examination - {{ data.exam_year }}
                  </div>
                  <div class="text-md-center">
                    <v-chip class="font-weight-bold title">
                      CGPA : {{ data.cgpa|toFixed}}
                    </v-chip>
                    <!--
                    <v-chip v-if=" data.result_type&&Object.keys(getSchema).length-index!=1" class="font-weight-bold title" >
                       {{ data.result_type.result_type_name }}
                    </v-chip>
                    -->
                    <v-chip v-if="data.type_of_result" class="font-weight-bold title" >
                       {{ data.type_of_result.result_type_name }}
                    </v-chip>
                  </div>
                </div>
              </v-card-title>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <span>
                  <v-chip
                    outline
                    color="blue-grey darken-4"
                    class="font-weight-bold"
                  >
                    Published : {{ formatted_date(data.created_at) }}
                  </v-chip>
                </span>
                <v-spacer></v-spacer>
                <v-btn round color="info" @click="showDetails(data.id)"
                  >Result Details</v-btn
                >
                
              </v-card-actions>
              </slot>
              <slot v-if="data.result_type >= 6">
              <v-card-title primary-title class="justify-center">
                <div>
                  <div class="headline mb-0">
                    {{ data.core_exam ? data.core_exam.exam_name : "" }}, Examination - {{ data.exam_year }}
                  </div>
                  <div class="text-md-center">
                    <v-chip v-if="data.type_of_result" class="font-weight-bold title" >
                       {{ data.type_of_result.result_type_name }}
                    </v-chip>
                  </div>
                </div>
              </v-card-title>
              <v-divider light></v-divider>
              </slot>
              
              <hr></hr>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({}),

  computed: {
    getSchema() {
      return this.$store.getters.getResultList;
    }
  },

  created() {
    this.$store.dispatch("fetchResultList");
  },
  methods: {
    showDetails(id) {
      this.$router.push({ path: `/student/results-details/${id}` });
    },
    formatted_date(date) {
      return moment(date).format("DD-MM-YYYY");
    }
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
