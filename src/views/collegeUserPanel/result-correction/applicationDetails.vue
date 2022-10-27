<template>
  <v-container fluid>
    <template>
        <v-flex xs12 md12>
          <v-toolbar color="blue" dark>
            <v-toolbar-title>
              Result Correction Application Details
            </v-toolbar-title>
          </v-toolbar>

          <v-card>
            <v-container fluid>
              <v-layout>
                <!-- Applicaiton Seciton -->
                <v-flex md8>
                  
                    <v-data-table 
                      disable-initial-sort
                      :headers="headers"
                      :items="getSchema.application_details"
                      class="elevation-1"
                      hide-actions
                    >
                      <template v-slot:items="props">
                          <td style="padding-left:15px;">
                            {{ props.item.course_code }}
                          </td>

                          <td style="padding-left:15px;">
                            <span
                              v-for="(category, cat) in props.item.categories"
                              :key="cat"
                            >
                              <span
                                v-for="(cat_name, cname) in category.category_name"
                                class="btn btn-secondary"
                                :key="cname"
                              >
                                <span
                                  style="color: red;font-weight:bold;background-color: white;padding: 5px;border-radius: 50px;"
                                >
                                  {{ cat_name.application_category_name }}
                                </span>
                              </span>
                            </span>
                          </td>
                          <td style="padding-left:15px;">{{ props.item.note }}</td>
                          <td>
                            <v-text-field
                              v-if="props.item.paper.paper_type == 1"
                              name="incourse_mark"
                              label="Incourse Mark"
                              type="text"
                              v-model="props.item.incourse_mark"
                              data-vv-name="incourse_mark"
                              prepend-icon="edit"
                            ></v-text-field>
                            <v-text-field
                              v-if="props.item.paper.paper_type == 2"
                              name="pv_mark"
                              label="P/V Mark"
                              type="text"
                              v-model="props.item.pv_mark"
                              data-vv-name="pv_mark"
                              prepend-icon="edit"
                            ></v-text-field>
                            <v-text-field
                              disabled
                            ></v-text-field>
                          </td>
                          <td>{{ props.item.remarks }}</td>
                      </template>
                      <template  v-slot:footer>
                        <td>
                          <v-text-field
                            label="Incourse Mark Sheet"
                            prepend-icon="attach_file"
                            disabled="disabled"
                          ></v-text-field>
                          <input type="file" name="incourse_mark_sheet" @change="setFile($event,'incourse_mark_sheet')"/>
                        </td>
                        <td>
                          <v-text-field
                            label="P/V Mark Sheet"
                            prepend-icon="attach_file"
                            disabled="disabled"
                          ></v-text-field>
                          <input type="file" name="pv_mark_sheet" @change="setFile($event,'pv_mark_sheet')"/>
                        </td>
                      </template>
                    </v-data-table>
                    <v-layout row wrap>
                    <v-flex xs12 sm12 md12 style="margin-top: 40px">
                      <v-layout justify-center row fill-height align-center>
                        <v-btn color="primary" large @click="submit">Submit</v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <br />
                  <v-toolbar
                    color="cyan darken-3"
                    class="white--text text-center"
                    dense
                    width="100%"
                  >
                  <v-toolbar-title>Attachment Details</v-toolbar-title>
                  </v-toolbar>
                  <table width="100%" border="1" style="text-align: center;">
                    <template>
                      <tr>
                        <td>Admit Card</td>
                        <td>
                          <v-btn
                            v-if="getSchema.admit_card"
                            dark
                            color="purple"
                            :href="getBaseUrl + '/' + getSchema.admit_card"
                            target="_blank"
                          >
                            <v-icon dark>attach_file</v-icon>
                            </v-btn>
                            <v-btn v-else dark color="red">
                              <v-icon error>attach_file</v-icon>
                            </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>Registration Card</td>
                        <td>
                          <v-btn
                            v-if="getSchema.reg_card"
                            dark
                            color="purple"
                            :href="getBaseUrl + '/' + getSchema.reg_card"
                            target="_blank"
                          >
                            <v-icon dark>attach_file</v-icon>
                            </v-btn>
                            <v-btn v-else dark color="red">
                              <v-icon error>attach_file</v-icon>
                            </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>Attendance Sheet</td>
                        <td>
                          <v-btn
                            v-if="getSchema.exam_attendance_sheet"
                            dark
                            color="purple"
                            :href="
                              getBaseUrl + '/' + getSchema.exam_attendance_sheet
                            "
                            target="_blank"
                          >
                            <v-icon dark>attach_file</v-icon>
                            </v-btn>
                            <v-btn v-else dark color="red">
                              <v-icon error>attach_file</v-icon>
                            </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>Exam Result Sheet</td>
                        <td>
                          <v-btn
                            v-if="getSchema.exam_result_sheet"
                            dark
                            color="purple"
                            :href="getBaseUrl + '/' + getSchema.exam_result_sheet"
                            target="_blank"
                          >
                            <v-icon dark>attach_file</v-icon>
                            </v-btn>
                            <v-btn v-else dark color="red">
                              <v-icon error>attach_file</v-icon>
                            </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>Exam Incourse Mark Sheet</td>
                        <td>
                          <v-btn
                            v-if="getSchema.exam_incourse_mark_sheet"
                            dark
                            color="purple"
                            :href="
                              getBaseUrl + '/' + getSchema.exam_incourse_mark_sheet
                            "
                            target="_blank"
                          >
                            <v-icon dark>attach_file</v-icon>
                              </v-btn>
                              <v-btn v-else dark color="red">
                                <v-icon error>attach_file</v-icon>
                              </v-btn>
                        </td>
                        <tr>
                        <td>Exam P/V Mark Sheet</td>
                        <td>
                          <v-btn
                            v-if="getSchema.exam_pv_mark_sheet"
                            dark
                            color="purple"
                            :href="
                              getBaseUrl + '/' + getSchema.exam_pv_mark_sheet
                            "
                            target="_blank"
                          >
                            <v-icon dark>attach_file</v-icon>
                              </v-btn>
                              <v-btn v-else dark color="red">
                                <v-icon error>attach_file</v-icon>
                              </v-btn>
                        </td>
                      </tr>
                    </template>
                  </table>
                </v-flex>

                <!-- Result Seciton -->
                <v-flex md4 >
                  <h2 style="text-align: center">Current Result</h2>
                  <table id="applicationDetails">
                    <thead>
                      <th style="text-align: center;">PaerCode</th>
                      <th style="text-align: center;">Attendance</th>
                      <th style="text-align: center;">Result</th>
                    </thead>
                    <tbody>
                      <tr v-for="(result, index) in getStudentResult.details">
                        <td>{{ result.paper_code }}({{ result.paper.paper_types.paper_type.substring(0,2) }})</td>
                        <td>{{ result.attendance_status == 1 ? 'P': 'A' }}</td>
                        <td>{{ result.letter_grade }}</td>
                      </tr>
                    </tbody>
                  </table>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
    </template>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: "Course Code", align: "left", sortable: false, value: "course_code" , width: "1%"},
        { text: "Application Category", align: "left", sortable: false, value: "sl" },
        { text: "Details", align: "left", sortable: false, value: "sl" },
        { text: "Action", align: "left", sortable: false, value: "sl", width: "1%" },
        { text: "Remarks", align: "left", sortable: false, value: "remarks" }
      ]
    };
  },
  
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    getSchema() {
      return this.$store.getters.getApplicationDetails;
    },
    getStudentResult() {
      return this.$store.getters.getStudentResult;
    },
    getCategories(){

    }
  },
  created() {
    this.$store.dispatch(
      "getApplicationDetails",
      this.$route.params.application_id
    );
    this.$store.dispatch(
      "getStudentResult",
      this.$route.params.application_id
    );
  },
  methods: {
    setFile(event,name){
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = event => {
        if(name == 'incourse_mark_sheet'){
            //this.form.data.incourse_mark_sheet = event.target.result;
            this.getSchema.exam_incourse_mark_sheet = event.target.result;
        }
        if(name == 'pv_mark_sheet'){
            //this.form.data.pv_mark_sheet = event.target.result;
            this.getSchema.exam_pv_mark_sheet = event.target.result;
        } 
      };
      reader.readAsDataURL(file);
      console.log(event.target.result);
    },
    submit() {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to approve?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("approveApplication", this.getSchema)
              .then(function(data) {
                 self.$store.dispatch("getApplicationDetails",this.$route.params.application_id);
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        });
    }
  }
};
</script>

<style>
.v-text-field{
  width: 150px;
}

table.v-table tbody td,
table.v-table tbody th {
  height: 0px;
  white-space: pre;
}

#applicationDetails {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-left: 10px;
}

#applicationDetails td,
#applicationDetails th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

#applicationDetails tr:nth-child(even) {
  background-color: #f2f2f2;
}

#applicationDetails tr:hover {
  background-color: #ddd;
}

#applicationDetails th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: white;
  color: black;
}
</style>
