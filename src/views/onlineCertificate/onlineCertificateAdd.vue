<template>
  <v-container fluid>
    <v-card class="mt-2">
      <v-card color="primary" flat>
        <v-card-title>
          <span class="headline white--text"
            >Online Certificate Verification</span
          >
          <v-spacer></v-spacer>
          <!-- <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
            <v-icon medium>close</v-icon>
          </v-btn>-->
        </v-card-title>
      </v-card>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"
            >Certificate Add</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Payment</v-stepper-step>

          <v-divider></v-divider>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-5" color="grey lighten-1">
              <v-container>
                <v-card-text>
                  <v-card flat class="pr-3 scroll">
                    <v-form>
                      <v-layout row wrap align-center>
                        <v-flex xs12>
                          <v-card
                            class="px-3 ma-3 CSP_BoarderStyle"
                            color="#FAFAFA"
                          >
                            <v-layout row wrap align-center class="py-3">
                              <v-text-field
                                class="ma-2"
                                name="exam_roll"
                                label="Roll Number"
                                v-model="searchParam.exam_roll"
                                v-validate="'required'"
                                :error-messages="errors.collect('exam_roll')"
                                data-vv-name="exam_roll"
                                required
                                prepend-icon="edit"
                              ></v-text-field>

                              <v-text-field
                                class="ma-2"
                                name="reg_no"
                                v-validate="'required'"
                                label="Registration Number"
                                v-model="searchParam.reg_no"
                                :error-messages="errors.collect('reg_no')"
                                data-vv-name="reg_no"
                                required
                                prepend-icon="edit"
                              ></v-text-field>
                              <v-flex xs12>
                                <v-autocomplete
                                  class="ma-2"
                                  hide-details
                                  v-validate="'required'"
                                  :error-messages="
                                    errors.collect('session_year')
                                  "
                                  required
                                  data-vv-name="session_year"
                                  v-model="searchParam.session_year"
                                  :item-text="item => item.session"
                                  item-value="session_year"
                                  :items="getSessionList"
                                  menu-props="auto"
                                  label="Session Year"
                                  prepend-icon="list"
                                >
                                  <template v-slot:selection="data">
                                    <v-chip
                                      close
                                      @input="searchParam.session_year = ''"
                                      :selected="data.selected"
                                      class="chip--select-multi"
                                      >{{ data.item.session }}</v-chip
                                    >
                                  </template>
                                  <template v-slot:item="data">
                                    <template
                                      v-if="typeof data.item !== 'object'"
                                    >
                                      <v-list-tile-content
                                        v-text="data.item"
                                      ></v-list-tile-content>
                                    </template>
                                    <template v-else>
                                      <v-list-tile-content>
                                        <v-list-tile-title
                                          v-html="data.item.session"
                                        ></v-list-tile-title>
                                      </v-list-tile-content>
                                    </template>
                                  </template>
                                </v-autocomplete>
                              </v-flex>
                              <v-text-field
                                class="ma-2"
                                name="name"
                                label="Name"
                                v-model="searchParam.name"
                                prepend-icon="edit"
                                v-validate="'required'"
                                :error-messages="errors.collect('name')"
                                data-vv-name="name"
                                required
                              ></v-text-field>
                            </v-layout>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm12 md12 class="mb-3">
                          <v-layout justify-center row fill-height align-center>
                            <v-btn outline round large @click="addStudentList()"
                              >Add Student</v-btn
                            >
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card>
                </v-card-text>
              </v-container>
              <v-container>
                <v-data-table
                  :loading="loading"
                  :headers="headers"
                  :items="getOnlineCertificateAddList"
                  hide-actions
                  class="elevation-1"
                  item-key="exam_roll"
                >
                  <template v-slot:items="props">
                    <td class="text-xs">{{ props.index + 1 }}</td>
                    <td class="text-xs">{{ props.item.exam_roll }}</td>
                    <td class="text-xs">{{ props.item.reg_no }}</td>
                    <td class="text-xs">{{ props.item.student_name }}</td>
                    <!-- <td class="text-xs">{{ props.item.degree }}</td> -->
                    <td class="text-xs">
                      ({{ props.item.college_code }}){{
                        props.item.college_name
                      }}
                    </td>
                    <td class="text-xs">100</td>
                  </template>
                </v-data-table>
              </v-container>
              <!-- <v-flex xs12 sm12 md12 class="mb-3">
                <v-layout justify-center row fill-height align-center>
                  <v-btn outline round large @click="validationForm()">Generate Certificate</v-btn>
                </v-layout>
              </v-flex>-->
            </v-card>
            <v-btn color="primary" :disabled="value" @click="payment"
              >Payment</v-btn
            >
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-5" color="grey lighten-1">
              <v-container>
                <v-card color="primary" flat class="text-xs-center">
                  <v-card-text class="text-center">
                    <span class="headline white--text"
                      >Total Certificate &nbsp; : &nbsp;
                      {{ this.certificate }}</span
                    >
                    <v-spacer class="ma-2"></v-spacer>
                    <span class="headline white--text">
                      Total Payment &nbsp; : &nbsp;{{ this.paymentcount }}
                    </span>
                    <v-spacer class="ma-2"></v-spacer>
                  </v-card-text>
                </v-card>
                <v-spacer class="ma-3"></v-spacer>
                <v-img
                  justify-end
                  wrap
                  :src="require('@/assets/payment/payment.jpg')"
                  contain
                  height="150"
                ></v-img>
              </v-container>
            </v-card>
            <v-btn color="primary" @click="e1 = 1">Back</v-btn>
            <v-btn color="primary" @click="submit">Submit</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonFun from "../../mixin/common_function";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";

export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    e1: 1,
    searchParam: {},
    loading: false,
    certificate: 0,
    paymentcount: 0,
    value: true,
    headers: [
      { text: "SL.", align: "left", value: "id", width: "10" },
      { text: "Roll Number", value: "exam_roll" },
      { text: "Registration No", value: "reg_no" },
      { text: "Name", value: "name" },
      { text: "College", value: "degree" },
      { text: "Payment", value: "payment" }
    ],
    dictionary: {
      custom: {
        reg_no: {
          required: () => "registration No required"
        },
        name: {
          required: () => "Name can not be empty."
        },
        session_year: {
          equired: () => "Session can not be empty."
        },
        exam_roll: {
          required: () => "Father's name is required"
        }
      }
    }
  }),
  created() {
    this.$store.commit("UNSET_ONLINE_CERTIFICATE_ADD_DATA");
    var limit = {
      page: 1,
      limit: 1000
    };
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.dispatch("fetchAllSessionData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;
  },
  watch: {
    getOnlineCertificateAddList(val) {
      console.log("..", val);
      if (val.length <= 0) {
        return (this.value = true);
      } else {
        return (this.value = false);
      }
    }
  },
  computed: {
    getOnlineCertificateAddList() {
      return this.$store.getters.getOnlineCertificateAddList;
    }
  },
  methods: {
    payment() {
      this.e1 = 2;
      this.certificate = this.getOnlineCertificateAddList.length;
      this.paymentcount = this.certificate * 100;
    },
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.addStudentList();
        }
      });
    },

    addStudentList() {
      this.loading = true;
      var that = this;
      this.$store
        .dispatch("searchOnlineCertificateAddData", this.searchParam)
        .then(data => {
          console.log("data---", data);
          that.loading = false;
          that.searchParam = {};
        });
    },

    submit() {
      let self = this;
      let items = [];
      this.getOnlineCertificateAddList.forEach(element => {
        let item = {
          exam_roll: element.exam_roll,
          reg_no: element.reg_no,
          student_name: element.student_name,
          session_year: element.session_year,
          college_code: element.college_code,
          college_name: element.college_name,
          paid_amount: 100,
          user_id: this.getAuthUser.id
        };
        items.push(item);
      });
      console.log("///m", items);
      this.$store
        .dispatch("submitOnlineData", items)
        .then(function() {
          try {
            // self.close();
            // setTimeout(() => {
            self.$router.push("/online/online-certificate-list");
            // }, 100);
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // close() {
    //   this.clear();
    // }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
