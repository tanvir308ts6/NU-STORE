<template>
  <v-container fluid>
    <v-form
      v-model="valid"
      ref="form"
      v-on:submit.prevent="getDataEntryDetails"
    >
      <v-layout row wrap>
        <slot v-if="getExamActivityStatus.CollegeConfirmation">
          <v-flex xs12>
            <v-card>
              <v-container fluid grid-list-md>
                <v-toolbar flat dark :height="35">
                  <v-toolbar-title>{{ `Confirm Data Entry` }}</v-toolbar-title>
                </v-toolbar>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-container fluid grid-list-md>
                <v-card color="white">
                  <v-layout row>
                    <v-text-field
                      tabindex="1"
                      class="mt-0 fs-25px"
                      flat
                      hide-details
                      label="REG No."
                      prepend-inner-icon="search"
                      single-line
                      solo
                      v-model="getConfirmDataEntrySchema.reg_no"
                      ref="reg_no_search"
                    ></v-text-field>
                    <v-card-actions>
                      <v-btn @click="getDataEntryDetails" color="info" dark
                        >Search</v-btn
                      >
                    </v-card-actions>
                  </v-layout>
                </v-card>
              </v-container>
            </v-card>
          </v-flex>

          <v-flex
            xs5
            class="pr-1"
            v-if="getConfirmDataEntryDetails.hasOwnProperty('id')"
          >
            <v-card>
              <v-container fluid grid-list-md>
                <v-toolbar
                  flat
                  v-if="
                    Number(getConfirmDataEntryDetails.teacher_confirm_status) ==
                      1
                  "
                >
                  <v-toolbar-title
                    >Application Status : Confirmed by College</v-toolbar-title
                  >
                </v-toolbar>
                <v-toolbar
                  flat
                  v-else-if="
                    Number(getConfirmDataEntryDetails.student_confirm_status) ==
                      1
                  "
                >
                  <v-toolbar-title
                    >Application Status :Applied by Student</v-toolbar-title
                  >
                </v-toolbar>

                <v-toolbar flat dark :height="35">
                  <v-toolbar-title>Student Info</v-toolbar-title>
                </v-toolbar>
                <table class="v-datatable v-table theme--light h-nowrap">
                  <tbody>
                    <tr>
                      <th
                        scope="col"
                        aria-label="Dessert (100g serving): Not sorted."
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Student's Name
                      </th>
                      <td>:</td>
                      <td class="text-xs-left font-weight-bold fs-20px">
                        {{ getConfirmDataEntryDetails.student.name }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        aria-label="Registration No "
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Registration No
                      </th>
                      <td>:</td>
                      <td class="text-xs-left font-weight-bold fs-20px">
                        {{ getConfirmDataEntryDetails.student.reg_no }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        aria-label="Father's Name"
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Father's Name
                      </th>
                      <td>:</td>
                      <td class="text-xs-left">
                        {{ getConfirmDataEntryDetails.student.father_name }}
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="col"
                        aria-label="Session "
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Session
                      </th>
                      <td>:</td>
                      <td class="text-xs-left">
                        {{ getConfirmDataEntryDetails.student.ac_session }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        aria-label="Registration Type"
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Registration Type
                      </th>
                      <td>:</td>
                      <td class="text-xs-left">
                        {{
                          getConfirmDataEntryDetails.student.reg_type
                            .student_type
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        aria-label="College Code & Name"
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        College Code & Name
                      </th>
                      <td>:</td>
                      <td class="text-xs-left">
                        {{
                          `(${getConfirmDataEntryDetails.student.college.college_code}) ${getConfirmDataEntryDetails.student.college.college_name}`
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        aria-label="Paper Code"
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Paper Code
                      </th>
                      <td>:</td>
                      <td class="text-xs-left">
                        <slot
                          v-for="(paper,
                          index) in getConfirmDataEntryDetails.papers"
                        >
                          <span :key="index" v-if="index">{{
                            `, ${paper.paper_code}`
                          }}</span>
                          <span :key="index" v-else>{{
                            paper.paper_code
                          }}</span>
                        </slot>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-toolbar flat dark :height="35">
                  <v-toolbar-title>Form Fillup Fee</v-toolbar-title>
                </v-toolbar>
                <table class="v-datatable v-table theme--light">
                  <tbody>
                    <slot
                      v-for="(fee,
                      index) in getConfirmDataEntryDetails.form_fill_up_fee"
                    >
                      <tr :key="index" v-if="fee.exm_master_fee">
                        <th
                          scope="col"
                          :aria-label="fee.exm_master_fee.fee_title"
                          aria-sort="none"
                          class="column text-xs-left"
                        >
                          {{ fee.exm_master_fee.fee_title }}
                        </th>
                        <td>:</td>
                        <td class="text-xs-right">
                          {{
                            `${fee.iteration_no}x${fee.exm_master_fee.amount}=`
                          }}{{
                            convertFloat(
                              fee.iteration_no * fee.exm_master_fee.amount
                            )
                          }}
                        </td>
                      </tr>
                    </slot>

                    <tr>
                      <th
                        scope="col"
                        aria-label="Total"
                        aria-sort="none"
                        class="column text-xs-left"
                      >
                        Total
                      </th>
                      <td>:</td>
                      <th class="text-xs-right">
                        {{ convertFloat(getConfirmDataEntryDetails.nu_fee) }}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <v-toolbar flat dark :height="35">
                  <v-toolbar-title>Fee Summary</v-toolbar-title>
                </v-toolbar>
                <FeeStatement :getFeeStatement="getFeeStatement" />
                <v-card-actions>
                  <v-btn
                    v-if="
                      Number(
                        getConfirmDataEntryDetails.teacher_confirm_status
                      ) == 1
                    "
                    @click="cancelConfirmation"
                    color="red"
                    dark
                    >Cancel Confirmation</v-btn
                  >
                  <v-btn
                    v-else-if="
                      Number(
                        getConfirmDataEntryDetails.student_confirm_status
                      ) == 1
                    "
                    @click="cancelApplication"
                    color="red"
                    dark
                    >Cancel Application</v-btn
                  >
                </v-card-actions>
              </v-container>
            </v-card>
          </v-flex>
        </slot>
        <slot v-else>
          <v-flex md12>
            <v-alert :value="true" type="error">
              <h2>Not Started Yet</h2>
            </v-alert>
          </v-flex>
        </slot>
        <v-flex xs7 v-if="getConfirmDataEntryDetails.hasOwnProperty('id')">
          <v-card>
            <v-container fluid grid-list-md>
              <v-toolbar flat>
                <v-toolbar-title
                  >Application No :
                  {{
                    getConfirmDataEntryDetails.application_no
                  }}</v-toolbar-title
                >
              </v-toolbar>
              <v-toolbar flat dark :height="35">
                <v-toolbar-title>Marks Entry</v-toolbar-title>
              </v-toolbar>
              <!-- <v-form v-model="valid" ref="form" v-on:submit.prevent="submit"> -->
              <v-data-table
                hide-actions
                :headers="headers"
                :items="getConfirmDataEntryDetails.papers"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <slot v-if="Number(props.item.core_paper.incourse_marks) > 0">
                    <td>{{ props.item.core_paper.paper_name }}</td>
                    <td class="text-xs-center">
                      {{ props.item.core_paper.paper_code }}
                    </td>
                    <!-- <td>
                  <span
                    v-if="props.item.core_paper.incourse_marks"
                  >{{ props.item.core_paper.incourse_marks }}</span>
                    </td>-->
                    <td class="text-xs-center">
                      <v-text-field
                        :tabindex="props.index + 1"
                        class="fs-25px"
                        v-model="props.item.incourse_marks"
                        label="Incourse Marks"
                        prepend-icon="edit"
                        :rules="[
                          validationRules.min(
                            Number(props.item.incourse_marks),
                            Number(props.item.core_paper.minimum_incourse_marks)
                          ),
                          validationRules.max(
                            Number(props.item.incourse_marks),
                            Number(props.item.core_paper.incourse_marks)
                          )
                        ]"
                        v-if="
                          props.item.core_paper.incourse_marks &&
                            Number(
                              getConfirmDataEntryDetails.teacher_confirm_status
                            ) == 0
                        "
                      ></v-text-field>
                      <span v-else>{{ props.item.incourse_marks }}</span>
                    </td>
                    <!-- <td></td> -->
                  </slot>
                  <slot
                    v-else-if="
                      Number(props.item.core_paper.incourse_marks) == 0
                    "
                  >
                    <td>{{ props.item.core_paper.paper_name }}</td>
                    <td class="text-xs-center">
                      {{ props.item.core_paper.paper_code }}
                    </td>
                    <td class="text-xs-center"></td>
                  </slot>
                  <slot
                    v-else-if="Number(props.item.core_paper.paper_type) == 6"
                  >
                    <td class="green white--text">
                      <span>{{ props.item.core_paper.paper_name }}</span>
                    </td>
                    <td class="green white--text text-xs-center">
                      {{ props.item.core_paper.paper_code }}
                    </td>
                    <!-- <td>
                  <span
                    v-if="props.item.core_paper.incourse_marks"
                  >{{ props.item.core_paper.incourse_marks }}</span>
                    </td>-->
                    <!-- <td class="green"></td> -->
                    <td class="green white--text text-xs-center">
                      <v-text-field
                        v-on:blur="mouseleaveF('reg_no_search')"
                        :tabindex="props.index + 1"
                        class="white--text fs-25px"
                        v-model="props.item.incourse_marks"
                        label="Term Paper Marks"
                        prepend-icon="edit"
                        :rules="[
                          validationRules.min(
                            Number(props.item.incourse_marks),
                            0
                          ),
                          validationRules.max(
                            Number(props.item.incourse_marks),
                            Number(props.item.core_paper.practical_full_marks)
                          )
                        ]"
                        v-if="
                          Number(props.item.core_paper.paper_type) == 6 &&
                            Number(
                              getConfirmDataEntryDetails.teacher_confirm_status
                            ) == 0
                        "
                      ></v-text-field>
                      <span v-else>{{ props.item.incourse_marks }}</span>
                    </td>
                  </slot>
                  <!-- <slot v-else>
                    <td>{{ props.item.core_paper.paper_name }}</td>
                    <td>{{ props.item.core_paper.paper_code }}</td>
                    <td></td>
                  </slot>-->
                </template>
              </v-data-table>
              <!-- <pre>{{getConfirmDataEntryDetails.papers}}</pre> -->
              <v-text-field
                v-if="
                  Number(getConfirmDataEntryDetails.teacher_confirm_status) == 0
                "
                v-model="getConfirmDataEntryDetails.application_no"
                label="Application No."
                prepend-icon="edit"
                :rules="validationRules.application_no"
              ></v-text-field>
              <v-card-actions>
                <v-btn
                  v-if="
                    Number(getConfirmDataEntryDetails.teacher_confirm_status) ==
                      0
                  "
                  @click="submit"
                  color="info"
                  dark
                  ref="confirm_application"
                  >Confirm Application</v-btn
                >
              </v-card-actions>
              <!-- </v-form> -->
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12 v-else-if="getReturnMessage">
          <v-card>
            <v-container fluid grid-list-md>
              <v-toolbar flat>
                <v-toolbar-title>{{ getReturnMessage }}</v-toolbar-title>
              </v-toolbar>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- <pre>{{getMasterExam.form_fill_up}}</pre> -->
      <!-- <pre>{{getConfirmDataEntrySchema}}</pre> -->
      <!-- <pre>{{getConfirmDataEntryDetails}}</pre> -->
      <!-- <pre>{{getCollegeUserCurrentPrivilege}}</pre> -->
    </v-form>
  </v-container>
</template>

<script>
// import formDialog from "@/components/district/districtForm.vue";
import commonFun from "@/mixin/college_user_common_function.vue";
import FeeStatement from "@/components/collegeUserPanel/formFillUp/feeStatement";

import commonGet from "@/mixin/college_common_getters_mixin";

export default {
  mixins: [commonFun, commonGet],
  components: {
    FeeStatement
    // formDialog
  },

  data() {
    return {
      valid: true,
      // selected: [],
      // pagination: {},
      // loading: true,
      // dialog: false,
      // loadData: false,
      // totalDataItems: 0,
      // formDialogStatus: false,
      // search: "",
      // limit: {},
      headers: [
        {
          text: "Paper Name",
          align: "left",
          sortable: false,
          value: "core_paper.paper_name"
        },
        {
          text: "Paper Code",
          align: "left",

          value: "core_paper.paper_code"
        },
        // {
        //   text: "Incourse Marks",
        //   align: "left",
        //   value: "core_paper.incourse_marks"
        // },
        {
          text: "Incourse/Term Paper Marks",
          align: "left",
          value: "incourse_marks"
        }
        // {
        //   text: "Term Paper Marks",
        //   align: "left",
        //   value: "incourse_marks"
        // }
      ],
      validationRules: {
        required(value) {
          return (value || "") >= !!value || `Minimum mark ${min} `;
        },
        min(value, min) {
          return (value || "") >= min || `Minimum mark ${min} `;
        },
        max(value, max) {
          return (value || "") <= max || `Maximum mark ${max} `;
        },
        application_no: [v => !!v || "Application No is required"],
        incourse_marks: [
          v => !!v || "Incourse Marks is required",
          v => v <= 20 || "Maximum 20",
          v => v >= 7 || "Minimum 7"
        ],
        term_paper_marks: [v => !!v || "Trem Paper Marks is required"]
      }
      // editedIndex: -1,
      // editedItem: this.unSetEditedData
    };
  },

  watch: {
    // pagination: {
    //   handler() {
    //     this.getDataFromApi();
    //   },
    //   deep: true
    // },
    // loadData: {
    //   handler(status) {
    //     if (status) this.getDataFromApi();
    //     this.loadData = false;
    //   }
    // }
  },
  computed: {
    getFeeStatement() {
      return this.$store.getters.getFeeStatement;
    },
    getReturnMessage() {
      return this.$store.getters.getReturnMessage;
    },
    getConfirmDataEntrySchema() {
      return this.$store.getters.getConfirmDataEntrySchema;
    },
    getConfirmDataEntryDetails() {
      return this.$store.getters.getConfirmDataEntryDetails;
    },
    // profile() {
    //   // return this.$store.getters.getCollegeUserProfile;
    // },
    // getMasterExam() {
    //   // return this.$store.getters.getMasterExam;
    // },
    // getDistrictList() {
    //   // return this.$store.getters.getDistrictDataList;
    // }
    getExamActivityStatus() {
      return this.$store.getters.getExamActivityStatus;
    }
  },
  methods: {
    mouseleaveF(ref = "reg_no_search") {
      this.$nextTick(() => this.$refs[ref].focus());
      console.log("mouseleaveF called");
    },
    getDataEntryDetails() {
      let current_privilege = JSON.parse(
        localStorage.getItem("current-privilege")
      );
      this.$store
        .dispatch("fetchDataEntryDetails")
        .then(response => {
          this.$store.dispatch("fetchFeeStatement", {
            params: {
              current_privilege: current_privilege
            }
          });
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.logout(this.college_user_login_form_url);
          }
        });
      this.mouseleaveF("reg_no_search");
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log("test");
        let current_privilege = JSON.parse(
          localStorage.getItem("current-privilege")
        );

        this.$store
          .dispatch("ffConfirmByCollegeUser")
          .then(response => {
            this.$store.dispatch("fetchDataEntryDetails");
            this.$store.dispatch("fetchFeeStatement", {
              params: {
                current_privilege: current_privilege
              }
            });
          })
          .catch(error => {
            if (error.response.status == 401) {
              this.logout(this.college_user_login_form_url);
            }
          });
      }
    },
    cancelApplication() {
      let current_privilege = JSON.parse(
        localStorage.getItem("current-privilege")
      );
      this.$store
        .dispatch("cancelApplication")
        .then(response => {
          this.$store.dispatch("fetchDataEntryDetails");
          this.$store.dispatch("fetchFeeStatement", {
            params: {
              current_privilege: current_privilege
            }
          });
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.logout(this.college_user_login_form_url);
          }
        });
    },
    cancelConfirmation() {
      let current_privilege = JSON.parse(
        localStorage.getItem("current-privilege")
      );
      this.$store
        .dispatch("cancelConfirmation")
        .then(response => {
          this.$store.dispatch("fetchDataEntryDetails");
          this.$store.dispatch("fetchFeeStatement", {
            params: {
              current_privilege: current_privilege
            }
          });
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.logout(this.college_user_login_form_url);
          }
        });
    }
    // toggleAll() {
    //   if (this.selected.length) this.selected = [];
    //   else this.selected = this.getMasterExam.form_fill_up.slice();
    // },
    // changeSort(column) {
    //   if (this.pagination.sortBy === column) {
    //     this.pagination.descending = !this.pagination.descending;
    //   } else {
    //     this.pagination.sortBy = column;
    //     this.pagination.descending = false;
    //   }
    // },
    // unSetEditedData() {
    //   this.editedItem = {
    //     id: "",
    //     district_name: "",
    //     dist_code: "",
    //     old_dist_code: "",
    //     div_code: "",
    //     old_div_code: "",
    //     created_at: "",
    //     updated_at: "",
    //     deleted_at: ""
    //   };
    // },
    // setLimit() {
    //   const { sortBy, descending, page, rowsPerPage } = this.pagination;
    //   this.limit = {
    //     page: page,
    //     limit: rowsPerPage,
    //     sort: sortBy,
    //     search: this.search
    //   };
    // },
    // getDataFromApi() {
    //   this.loading = true;
    //   this.setLimit();
    //   this.$store.dispatch("fetchCollageUserStudent", this.limit).then(data => {
    //     this.loading = false;
    //     // this.totalDataItems = data.meta.total;
    //   });
    // },
    // dialogOpen() {
    //   this.formDialogStatus = true;
    // },
    // newItem() {
    //   this.unSetEditedData();
    //   this.dialogOpen();
    // },
    // editItem(item) {
    //   this.editedIndex = this.getDistrictList.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialogOpen();
    // },
    // deleteItem(item) {
    //   const id = item.id;
    //   let self = this;

    //   this.$root
    //     .$confirm("Are you sure that you want to delete?")
    //     .then(confirm => {
    //       if (confirm) {
    //         this.$store
    //           .dispatch("deleteDistrictItem", id)
    //           .then(function(data) {
    //             self.setLimit();
    //             self.$store.dispatch("fetchCollageUserStudent", self.limit);
    //           })
    //           .catch(function(error) {
    //             console.log(error);
    //             self.setLimit();
    //             self.$store.dispatch("fetchCollageUserStudent", self.limit);
    //           });
    //       }
    //     });
    // }
  },
  mounted() {
    this.$parent.navigation.shown = false;
    this.getConfirmDataEntrySchema.current_privilege = this.getCollegeUserCurrentPrivilege;
    this.mouseleaveF("reg_no_search");
  },
  created() {
    let current_privilege = JSON.parse(
      localStorage.getItem("current-privilege")
    );
    this.$store.commit("UNSET_RETURN_MESSAGE");
    this.$store.commit("UNSET_DATA_ENTRY_DETAILS");
    this.$store.dispatch("fetchFeeStatement", {
      params: {
        current_privilege: current_privilege
      }
    });
    // this.$store.dispatch("fetchDataEntryDetails");
    this.$store
      .dispatch("getExamActivityStatus", {
        exam_code: current_privilege.exam_master.exam_code,
        exam_year: current_privilege.exam_master.exam_year
      })
      .then(data => {
        console.log(data);
      });
  }
};
</script>

<style scoped>
table.v-table tbody td,
table.v-table tbody th {
  height: 0px;
  /* white-space: nowrap; */
}
table.h-nowrap tbody th {
  white-space: nowrap;
}
.fs-20px {
  font-size: 20px !important;
}
.fs-25px {
  font-size: 25px !important;
}
</style>
