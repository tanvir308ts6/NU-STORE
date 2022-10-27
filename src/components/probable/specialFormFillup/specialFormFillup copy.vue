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
        <v-toolbar dark color="primary">
          <v-toolbar-title class="text-uppercase"
            >Special Form Fill Up
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- <v-flex xs12>
          <v-card>
            <v-container fluid grid-list-md>
              <v-toolbar flat lighten :height="35">
                <v-toolbar-title>{{ `Confirm Data Entry` }}</v-toolbar-title>
              </v-toolbar>
            </v-container>
          </v-card>
        </v-flex> -->
        <v-flex xs12>
          <v-card>
            <v-container fluid grid-list-md>
              <v-card color="white">
                {{ "19630002264" }}
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
                    v-model="reg_no"
                    ref="reg_no_search"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn color="info" dark @click="searchStudent"
                      >Search</v-btn
                    >
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs4 class="pr-1" v-if="formFillUpInfo.id">
          <v-card>
            <v-container fluid grid-list-md>
              <StudentInfo />
              <FormFillUpFee />
              <v-toolbar flat dark :height="35">
                <v-toolbar-title>Form Fillup Fee</v-toolbar-title>
              </v-toolbar>
              <table
                class="v-datatable v-table theme--light"
                v-if="formFillUpInfo.form_fill_up_fee.length"
              >
                <tbody>
                  <slot v-for="(fee, index) in formFillUpInfo.form_fill_up_fee">
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
                        {{ `${fee.iteration_no}x${fee.exm_master_fee.amount}=`
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
                      {{ convertFloat(formFillUpInfo.nu_fee) }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs8>
          <v-card>
            <v-container fluid grid-list-md v-if="formFillUpInfo.total_subject">
              <compulsorySubject
                v-if="formFillUpInfo.compulsory_subject.length > 0"
              />
              <electiveSubject
                v-if="Object.keys(formFillUpInfo.elective_subject).length"
              />
              <optionalSubject
                v-if="formFillUpInfo.optional_subject.length > 0"
              />
              <improvementSubject
                v-if="formFillUpInfo.improvement_subject.length"
              />
              <v-toolbar flat dark>
                <v-toolbar-title>Update Mobile No.</v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      name="mobile"
                      label="Mobile No."
                      v-model="profile.mobile"
                      v-validate="'required'"
                      :error-messages="errors.collect('mobile')"
                      data-vv-name="mobile"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
              </v-card>
              <div class="justify-center layout px-0 mt-2">
                <v-btn color="success" @click="save">Submit</v-btn>
              </div>
            </v-container>
          </v-card>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import StudentInfo from "@/components/probable/specialFormFillup/student_info";
import FormFillUpFee from "@/components/probable/specialFormFillup/FormFillUpFee";
import compulsorySubject from "@/components/probable/specialFormFillup/compulsory_subject";
import electiveSubject from "@/components/probable/specialFormFillup/elective_subject";
import improvementSubject from "@/components/probable/specialFormFillup/improvement_subject";
import optionalSubject from "@/components/probable/specialFormFillup/optional_subject";

export default {
  props: ["dialogStatus", "detailData"],
  components: {
    StudentInfo,
    FormFillUpFee,
    compulsorySubject,
    electiveSubject,
    improvementSubject,
    optionalSubject
  },
  computed: {
    formFillUpInfo() {
      return this.$store.getters.getPblStudentInfo;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getLoggedInYear() {
      return this.$store.getters.getLoggedInYear;
    }
  },
  data: () => ({
    dialog: false,
    reg_no: ""
  }),

  methods: {
    searchStudent() {
      let reg_no = this.reg_no;
      this.$store
        .dispatch("getPblStudentInfo", {
          reg_no: reg_no,
          exam_code: this.getLoggedInExam.code,
          exam_year: this.getLoggedInYear.year
        })
        .then(() => {
          //console.log(response);
        });
    },
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
      // if (val) {
      //   this.getDataFromApi();
      // }
    },
    dialog(val) {
      if (!val) this.close();
    }
  }
};
</script>
