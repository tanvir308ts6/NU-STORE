<template>
  <v-container fluid>
    <template>
      <v-layout>
        <v-flex xs12 md12>
          <v-toolbar
            color="cyan darken-3"
            class="white--text text-left"
            dense
            width="100%"
          >
            <v-toolbar-title
              >Result Correction/Revised</v-toolbar-title>
              <v-spacer></v-spacer>
            <v-btn
              round
              color="white"
              text-color="white"
              @click="applyCorrection"
              >Apply</v-btn
            ></v-btn>
            
          </v-toolbar>
          <v-card>
            <v-container>
              <v-data-table
                :headers="headers"
                :items="getSchema"
                class="elevation-1"
                style="white-space: nowrap;"
              >
                <template v-slot:items="props">
                  <td align="left">{{ props.index + 1 }}</td>
                  <td align="left">{{ props.item.exam.exam_name }}</td>
                  <td align="left">{{ props.item.exam_year }}</td>
                  <td align="left">
                    <v-chip
                      class="ma-2"
                      color="orange"
                      text-color="default"
                      v-if="props.item.application_status == 0"
                    >
                      Pending
                    </v-chip>
                    <v-chip
                      class="ma-2"
                      color="primary"
                      text-color="white"
                      v-if="props.item.application_status == 1"
                    >
                      Approved By College
                    </v-chip>
                    <v-chip
                      class="ma-2"
                      color="Secondary"
                      text-color="white"
                      v-if="props.item.application_status == 2"
                    >
                      Accept By Admin
                    </v-chip>
                    <v-chip
                      class="ma-2"
                      color="green"
                      text-color="white"
                      v-if="props.item.application_status == 3"
                    >
                      Accept By Admin
                    </v-chip>
                  </td>
                  <td align="left">
                    <v-btn small color="primary" 
                      v-if="props.item.application_status == 0"
                      @click="edit(props.item.id)">
                      Edit
                    </v-btn>
                    <v-btn
                      small
                      color="info"
                      @click="showDetails(props.item.id)"
                    >
                      View Details
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
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
  data() {
    return {
      headers: [
        { text: "SL", align: "left", sortable: false, value: "sl" },
        { text: "Exam", align: "left", sortable: false, value: "sl" },
        { text: "Exam Year", align: "left", sortable: false, value: "sl" },
        {
          text: "Application Status",
          align: "left",
          sortable: false,
          value: "sl"
        },
        { text: "Action", align: "left", sortable: false, value: "sl" }
      ]
    };
  },

  computed: {
    // student() {
    //   return this.$store.getters.getStudentProfile;
    // },
    getSchema() {
      return this.$store.getters.getCorrectionAppliedList;
    }
  },

  methods: {
    applyCorrection() {
      this.$router.push("/student/result-correction-apply");
    },
    showDetails(application_id) {
      this.$router.push({
        path: `/student/correction-application-details/${application_id}`
      });
    },
    edit(application_id){
      this.$router.push({
        path: `/student/edit-applicaiton/${application_id}`
      });
    }

  },

  created() {
    //this.$store.dispatch("getStudentProfile");
    this.$store.dispatch("getCorrectionAppliedList");
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
