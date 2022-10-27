<template>
  <div class="form">
    <!--     <v-dialog v-model="dialog" max-width="600px" persistent> -->
    <v-card>
      <v-card color="primary" flat>
        <v-card-title>
          <span class="headline white--text">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn
            fab
            class="ma-0 pa-0"
            small
            color="white black--text "
            @click="close"
            v-if="!profileMode"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
      <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
      <formNotification />
      <v-card-text>
        <v-card flat class="pr-3 scroll">
          <v-alert
            :value="true"
            color="error"
            icon="warning"
            outline
            v-if="errorStatus"
          >{{ errorMsg }}</v-alert>
          <v-form>
            <v-stepper v-model="user_step" vertical>
              <v-stepper-step step="1" :complete="user_step > 1">College Code</v-stepper-step>
              <v-stepper-content step="1">
                <v-form data-vv-scope="form1">
                  <!-- clearable
                  :clear-icon-cb="onClearClicked"-->
                  <v-text-field
                    :disabled="profileMode"
                    name="college_code"
                    label="College Code"
                    v-validate="'required'"
                    v-model="getCenterSchema.college_code"
                    :error-messages="errors.collect('form1.college_code')"
                    data-vv-name="college_code"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-btn color="primary" @click="checkCenterSelection()">Next</v-btn>
                  <v-btn color="green" @click="skipstep()" v-if="!profileMode">Skip</v-btn>
                </v-form>
              </v-stepper-content>
              <v-stepper-step step="2" :complete="user_step > 2">Center Information</v-stepper-step>
              <v-stepper-content step="2">
                <v-text-field
                  name="studentCapacity"
                  label="Examinee Capacity"
                  v-model="getCenterSchema.student_capacity"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('student_capacity')"
                  data-vv-name="student_capacity"
                  required
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  name="responsiblePerson "
                  label="Responsible Person"
                  v-model="getCenterSchema.responsible_person"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  name="name"
                  label="Center Name"
                  v-model="getCenterSchema.center_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('center_name')"
                  data-vv-name="center_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>

                <v-text-field
                  name="center_code"
                  label="Center Code"
                  v-model="getCenterSchema.center_code"
                  v-validate="'required'"
                  :error-messages="errors.collect('center_code')"
                  data-vv-name="center_code"
                  required
                  prepend-icon="edit"
                ></v-text-field>
                <!-- <v-flex xs12>
              <v-select
                :items="collegeList"
                item-text="name"
                item-value="code"
                name="collegeCode"
                label="Select College from the list"
                v-model="getCenterSchema.college_code"
                prepend-icon="edit"
                v-validate="'required'"
                required
                data-vv-name="college_code"
                :error-messages="errors.collect('college_code')"
              ></v-select>
                </v-flex>-->
                <v-textarea
                  name="address"
                  label="Address"
                  auto-grow
                  rows="1"
                  :error-messages="errors.collect('address')"
                  data-vv-name="address"
                  v-validate="'required'"
                  v-model="getCenterSchema.address"
                  prepend-icon="edit"
                ></v-textarea>
                <v-text-field
                  name="phone"
                  label="Phone"
                  v-validate="{ required: false }"
                  :error-messages="errors.collect('phone')"
                  data-vv-name="phone"
                  v-model="getCenterSchema.phone"
                  prepend-icon="edit"
                ></v-text-field>
                <v-text-field
                  name="email"
                  label="Email"
                  v-model="getCenterSchema.email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  data-vv-name="email"
                  required
                  prepend-icon="edit"
                ></v-text-field>
                <!-- v-validate="'required|numeric|max:11|min:11'"
              :error-messages="errors.collect('mobile')"
              data-vv-name="mobile"
                required-->
                <v-text-field
                  name="mobile"
                  label="Mobile"
                  v-model="getCenterSchema.mobile"
                  prepend-icon="edit"
                ></v-text-field>

                <v-autocomplete
                  v-model="getCenterSchema.district_code"
                  :item-text="
                    item => item.dist_code + ' - ' + item.district_name
                  "
                  item-value="dist_code"
                  :items="getDistrictList"
                  menu-props="auto"
                  label="Select District"
                  hide-details
                  prepend-icon="house"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getCenterSchema.district_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{
                      data.item.dist_code +
                      " - " +
                      data.item.district_name
                      }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="
                              data.item.dist_code +
                              ' - ' +
                              data.item.district_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-checkbox
                  v-model="getCenterSchema.active"
                  label="Active"
                  type="checkbox"
                  color="indigo darken-3"
                ></v-checkbox>
                <v-btn color="primary" @click="user_step = 1">Back</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-form>
        </v-card>
      </v-card-text>
      <!--     <v-dialog v-model="dialog" max-width="600px" persistent> -->
      <v-divider></v-divider>
      <v-card-actions v-if="user_step == 2">
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
          >{{ buttonTitle }}</v-btn>
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
    <!--     </v-dialog> -->
  </div>
</template>

<script>
import formNotification from "@/components/utils/formNotification";
export default {
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "profileMode",
    "type",
    "searchCenterList",
  ],
  data: () => ({
    loading: false,
    user_step: 1,
    errorStatus: false,
    errorMsg: "",
    searchParam:{},
    dialog: false,
    editedStatus: false,
    dictionary: {
      custom: {
        center_name: {
          required: () => "Center Name field can not be empty",
        },
        center_code: {
          required: () => "Center Code field can not be empty",
        },
        address: {
          max: () => "The Address field may not be greater than 30 characters",
        },
        phone: {
          numeric: () => "Phone field may only contain numeric characters",
        },
        email: {
          required: () => "Email field can not be empty",
          email: "Type a correct email address",
        },
        college_code: { required: () => "College Code field can not be empty" },
        // mobile: {
        //   required: () => "Mobile field can not be empty",
        //   numeric: "Mobile field may only contain numeric characters",
        //   max: "The Mobile field may not be greater than 11 characters",
        //   min: "The Mobile field may not be lesser than 11 characters"
        // },
        student_capacity: {
          required: () => "Student Capacity field can not be empty",
          numeric: "Student Capacity field may only contain numeric characters",
        },
      },
    },
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    console.log(this.dialogStatus);
    // //district
    // if (!this.$store.getters.getDistrictItems.length) {
    //   // console.log("----> ");
    //   this.$store.dispatch("fetchDistrictData");
    // }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.user_step = 1;
      this.setCenterSchema();
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getCenterSchema() {
      return this.$store.getters.getCenterSchema;
    },
    getCenterItemList() {
      return this.$store.getters.getCenterItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Center" : "Edit Center ";
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    },
    //college code wise
    getCollegeList() {
      return this.$store.getters.getCollegeItems;
    },
  },
  methods: {
    skipstep() {
      this.getCenterSchema.college_code = "000";
      this.user_step = 2;
    },
    setCenterSchema() {
      var item = Object.assign({}, this.editedData);
      this.$store.commit("SET_CENTER_SCHEMA_DATA", item);
    },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    save() {
      var self = this;
      var item = {
        center_name: this.getCenterSchema.center_name,
        college_code: this.getCenterSchema.college_code,
        center_code: this.getCenterSchema.center_code,
        address: this.getCenterSchema.address,
        phone: this.getCenterSchema.phone,
        email: this.getCenterSchema.email,
        mobile: this.getCenterSchema.mobile,
        student_capacity: this.getCenterSchema.student_capacity,
        responsible_person: this.getCenterSchema.responsible_person,
        district_code: this.getCenterSchema.district_code,
        active: this.getCenterSchema.active,
      };
      if (this.type == 3) {
        item.type = 3;
      }
      console.log(item);
      this.$store.dispatch("saveCenterData", item).then(function () {
        //console.log(" In action ", self.data);
        self.close();
        self.searchCenterList();
      });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getCenterSchema.id,
        center_name: this.getCenterSchema.center_name,
        college_code: this.getCenterSchema.college_code,
        center_code: this.getCenterSchema.center_code,
        address: this.getCenterSchema.address,
        phone: this.getCenterSchema.phone,
        email: this.getCenterSchema.email,
        mobile: this.getCenterSchema.mobile,
        student_capacity: this.getCenterSchema.student_capacity,
        responsible_person: this.getCenterSchema.responsible_person,
        district_code: this.getCenterSchema.district_code,
        active: this.getCenterSchema.active,
        type: this.getCenterSchema.type,
      };
      // if (this.editedData.type == "3") {
      //   item.type = 3;
      // }
      var param = {
        item: item,
        indexEdited: this.indexEdited,
      };
      this.$store
        .dispatch("editCenterData", param)
        .then(function () {
          if (!self.profileMode) self.close();
          self.searchCenterList();
        })
        .catch(function (error) {
          console.log(error);
          self.searchCenterList();
        });
    },
    clear() {
      // this.getCenterSchema.id = "";
      // this.getCenterSchema.center_name = "";
      // this.getCenterSchema.college_code = "";
      // this.getCenterSchema.address = "";
      // this.getCenterSchema.phone = "";
      // this.getCenterSchema.email = "";
      // this.getCenterSchema.mobile = "";
      // this.getCenterSchema.active = "1";
      // this.getCenterSchema.created_at = "";
      // this.getCenterSchema.updated_at = "";
      // this.getCenterSchema.deleted_at = "";
      // this.getCenterSchema.created_by = "";
      // this.getCenterSchema.updated_by = "";
      // this.getCenterSchema.deleted_by = "";
      this.errorStatus = false;
      this.errorMsg = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_CENTER_SCHEMA_DATA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    },
    checkCenterSelection() {
      this.$validator.validateAll("form1").then((isValid) => {
        if (isValid) {
          this.errorStatus = false;
          this.errorMsg = "";
          var that = this;
          var callDispatch = true;
          if (this.editedData.id > 0) {
            if (
              this.editedData.college_code == this.getCenterSchema.college_code
            ) {
              this.loading = true;
              callDispatch = false;
              this.user_step = 2;
              this.errorStatus = false;
              this.errorMsg = "";
              this.loading = false;
              this.setCenterSchema();
            }
          }
          if (callDispatch) {
            this.loading = true;
            this.$store
              .dispatch(
                "fetchCollegeCodewiseData",
                this.getCenterSchema.college_code
              )
              .then(function () {
                console.log("in stepper", that.getCollegeList.length);
                if (that.getCollegeList.length < 1) {
                  that.errorStatus = true;
                  that.errorMsg = "This college code is not exist";
                  that.loading = false;
                } else {
                  that.errorStatus = false;
                  that.errorMsg = "";
                  that.getCenterSchema.center_name =
                    that.getCollegeList[0].college_name;
                  that.getCenterSchema.college_code =
                    that.getCollegeList[0].college_code;
                  that.getCenterSchema.center_code =
                    that.getCollegeList[0].college_code;
                  that.getCenterSchema.address =
                    that.getCollegeList[0].upazila_name;
                  that.getCenterSchema.phone = that.getCollegeList[0].phone;
                  that.getCenterSchema.email = that.getCollegeList[0].email;
                  that.getCenterSchema.mobile = that.getCollegeList[0].mobile;
                  that.getCenterSchema.district_code =
                    that.getCollegeList[0].district_id;

                  if (that.getCenterSchema.college_code.length > 0) {
                    that.user_step = 2;
                    that.loading = false;
                  } else that.user_step = 1;
                }
              });
          }
        }
      });
    },
    // onClearClicked() {
    //   this.errorStatus = false;
    //   this.errorMsg = "";
    //   this.loading = false;
    // }
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
@media (min-width: 576px) {
  .form-card-size {
    max-width: 5px;
    /* width: 500px; */
  }
}
@media (min-width: 768px) {
  .form-card-size {
    max-width: 60px;
  }
}

@media (min-width: 992px) {
  .form-card-size {
    max-width: 120px;
  }
}

@media (min-width: 1200px) {
  .form-card-size {
    max-width: 300px;
  }
}
</style>
