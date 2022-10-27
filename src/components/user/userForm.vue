<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <!-- {{ignoreStep}} -->
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-stepper v-model="user_step" vertical>
                <v-stepper-step
                  editable
                  step="1"
                  :complete="user_step > 1"
                  v-if="!ignoreStep"
                >User Type</v-stepper-step>
                <v-stepper-content step="1" v-if="!ignoreStep">
                  <v-form data-vv-scope="form1">
                    <v-flex xs12>
                      <v-autocomplete
                        item-text="name"
                        item-value="id"
                        :items="userTypes"
                        v-validate="'required'"
                        v-model="getSchema.user_type"
                        :error-messages="errors.collect('form1.user_type')"
                        data-vv-name="user_type"
                        required
                        v-on:change="setStepper($event)"
                        label="Select User Type"
                        name="UserType"
                        prepend-icon="edit"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="getSchema.user_type = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                          >{{ data.item.name }}</v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item.name"></v-list-tile-content>
                          </template>
                          <template v-else>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                  </v-form>
                  <v-btn color="primary" @click="checkUserSelection()">Next</v-btn>
                </v-stepper-content>

                <v-stepper-step
                  :editable="getSchema.id > 0"
                  step="2"
                  :complete="user_step > 2"
                >User Information</v-stepper-step>
                <v-stepper-content step="2">
                  <v-flex xs12 v-if="regionalCenterStatus">
                    <v-select
                      label="Select Regional Center"
                      item-text="center_name"
                      item-value="id"
                      v-model="getSchema.regional_center_id"
                      :items="getRegionalCenterList"
                      v-validate="'required'"
                      :error-messages="errors.collect('regional_center_id')"
                      data-vv-name="regional_center_id"
                      name=" regionalCenterId"
                      prepend-icon="edit"
                      :disabled="ifRegionalUser"
                    ></v-select>
                  </v-flex>
                  <!-- {{centerStatus}} -->
                  <v-flex xs12 v-if="centerStatus">
                    <v-select
                      label="Select Center"
                      :item-text="
                        item => '(' + item.college_code + ') ' + item.center_name
                      "
                      item-value="id"
                      v-model="getSchema.center_list_id"
                      :items="getCenterList"
                      :loading="getCenterListLoading"
                      v-validate="'required'"
                      :error-messages="errors.collect('center_list_id')"
                      data-vv-name="center_list_id"
                      required
                      prepend-icon="edit"
                      :disabled="ifCenterUser"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 v-if="ifAdminUser">
                    <v-select
                      label="Select Center"
                      :item-text="
                        item =>
                          '(' + item.college_code + ') ' + item.center_name
                      "
                      item-value="id"
                      v-model="getSchema.center_list_id"
                      :items="getCenterList"
                      :loading="getCenterListLoading"
                      v-validate="'required'"
                      :error-messages="errors.collect('center_list_id')"
                      data-vv-name="center_list_id"
                      required
                      prepend-icon="edit"
                      :disabled="ifCenterUser"
                    ></v-select>
                  </v-flex>
                  <v-text-field
                    name="email"
                    label="Email"
                    v-model="getSchema.email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    name="name"
                    label="Name"
                    v-model="getSchema.name"
                    v-validate="'required'"
                    :error-messages="errors.collect('name')"
                    data-vv-name="name"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-text-field
                    name="username"
                    label="User Name"
                    v-model="getSchema.username"
                    v-validate="'required'"
                    :error-messages="errors.collect('username')"
                    data-vv-name="username"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                  <v-switch
                    v-model="changePasswordStatus"
                    label="Do you want to change password ?"
                    v-show="indexEdited > -1"
                  ></v-switch>
                  <div v-show="changePasswordStatus || indexEdited == -1">
                    <v-text-field
                      v-validate="modelValidations.password"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      v-model="getSchema.password"
                      type="password"
                      label="Password"
                      placeholder="Password"
                      ref="password"
                      prepend-icon="edit"
                    ></v-text-field>
                    <!-- <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message">Select Regional Center</div>
                      </div>
                    </div>-->
                    <v-text-field
                      name="Confirmpassword"
                      label="Confirm Password"
                      placeholder="Password confirmation"
                      v-model="getSchema.confirmedPassword"
                      type="password"
                      v-validate="modelValidations.confirmedPassword"
                      :error-messages="errors.collect('confirmedPassword')"
                      data-vv-name="confirmedPassword"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </div>
                  <v-btn color="primary" @click="user_step = 3" v-if="!ignoreStep">Next</v-btn>
                </v-stepper-content>

                <v-stepper-step
                  :editable="getSchema.id > 0"
                  step="3"
                  :complete="user_step > 3"
                  v-if="!ignoreStep"
                >User Role</v-stepper-step>
                <v-stepper-content step="3">
                  <v-form>
                    <!-- :change="getSelectedRole(getSchema.roleDetails.role_id)" -->
                    <v-flex xs12>
                      <v-autocomplete
                        label="Select Role"
                        item-text="role_name"
                        item-value="id"
                        v-model="getSchema.roleDetails.role_id"
                        :items="getRoleList"
                        v-validate="'required'"
                        :error-messages="errors.collect('role_id')"
                        data-vv-name="role_id"
                        required
                        prepend-icon="edit"
                        chips
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="getSchema.roleDetails.role_id = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                          >{{ data.item.role_name }}</v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                          </template>
                          <template v-else>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.role_name"></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        class="ma-2"
                        v-model="getSchema.roleDetails.exam_code"
                        :item-text="item => item.code + ' - ' + item.title"
                        item-value="code"
                        :items="getExamList"
                        menu-props="auto"
                        label="Select Exam"
                        name="exam"
                        prepend-icon="edit"
                        multiple
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            close
                            @input="getSchema.roleDetails.exam_code = ''"
                            :selected="data.selected"
                            class="chip--select-multi"
                          >
                            {{
                            data.item.code + " - " + data.item.title
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
                                   data.item.code + ' - ' + data.item.title
                                "
                              ></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-menu
                        ref="dateMenu1"
                        v-model="dateMenu1"
                        :close-on-content-click="true"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="getSchema.roleDetails.start_date"
                            label="Start Date"
                            hint="MM-DD-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            data-vv-name="start_date"
                            required
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          v-model="getSchema.roleDetails.start_date"
                          no-title
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-menu
                        ref="dateMenu2"
                        v-model="dateMenu2"
                        :close-on-content-click="true"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="getSchema.roleDetails.end_date"
                            label="End Date"
                            hint="MM-DD-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            data-vv-name="end_date"
                            required
                            v-on="on"
                          ></v-text-field>
                        </template>

                        <v-date-picker
                          v-model="getSchema.roleDetails.end_date"
                          no-title
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox
                        v-model="getSchema.roleDetails.status"
                        class="mx-2"
                        label="Active"
                      ></v-checkbox>
                    </v-flex>
                  </v-form>
                  <v-btn color="primary" @click="user_step = 1">Back</v-btn>
                </v-stepper-content>
              </v-stepper>
            </v-form>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="user_step == 3 || ignoreStep">
          <v-layout justify-center>
            <v-btn
              color="primary  white--text"
              @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}</v-btn>
            <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import formNotification from "@/components/utils/formNotification";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";

export default {
  $_veeValidate: {
    validator: "new",
  },
  mixins: [common_login_getters, commonGet],
  components: {
    formNotification,
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    ignoreStep: false, // used for center , regional and invigilator user create
    modelValidations: {
      password: {
        required: false,
        min: 6,
      },
      confirmedPassword: {
        required: false,
        confirmed: "password",
      },
    },
    // user_type: "",
    changePasswordStatus: false,
    user_step: 1,
    ifAdminUser: false,
    centerStatus: false,
    regionalCenterStatus: false,
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    // regionalCenters: [],
    // userTypes: [],
    // centers: [],
    dateMenu1: false,
    dateMenu2: false,

    status: true,
    dictionary: {
      custom: {
        user_type: {
          required: () => "Select User Type",
        },
        center_list_id: {
          required: () => "Select Center",
        },
        regional_center_id: {
          required: () => "Select Regional Center",
        },
        name: {
          required: () => "Name field can not be empty",
        },
        username: {
          required: () => "Username field can not be empty",
        },
        password: {
          required: () => "Password field can not be empty",
          min: " The Password field may not be lesser than 6 characters",
        },
        confirmedPassword: {
          required: () => "Re-type your password",
          confirmed: "Password must match ",
        },
        role_id: {
          required: () => "Role Name can not be empty.",
        },
        start_date: {
          required: () => "Start Date can not be empty.",
        },
        end_date: {
          required: () => "End Date can not be empty.",
        },
      },
    },
  }),
  created() {
    var limit = {
      page: 1,
      limit: -1,
    };
    this.$store.dispatch("callCenterData", limit);
    this.$store.dispatch("fetchRegCenterData", limit);
    this.$store.dispatch("fetchUSerTypeData");
    this.$store.dispatch("callRoleData", limit);

    //exam
    if (this.$store.getters.getExamItem.length < 1) {
      console.log("----> ");
      this.$store.dispatch("fetchExamData", limit);
    }
    this.$store.commit("UNSET_FORMNOTIFY");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.user_step = 1;
      // this.centerStatus = false;
      // this.regionalCenterStatus = false;
      console.log("loaddata ", this.loadData);
      this.$store.commit("SET_USER_SCHEMA", this.editedData);
      // this.regionalCenters = this.$store.getters.getRegCenterItems;
      //this.centers = this.$store.getters.getCenterItem;

      //this.editedData.user_type > 0
      if (!this.ifAdminUserType) {
        console.log("...mmm", !this.ifAdminUserType);
        this.ifAdminUser = true;
        this.setStepper(this.editedData.user_type);
        this.ignoreStep = true;
      }

      console.log("watch done ", this.editedData);
      //this.user_type = this.editedData.user_type;
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getSchema() {
      return this.$store.getters.getUserSchema;
    },
    getItemList() {
      return this.$store.getters.getUserDataList;
    },
    buttonTitle() {
      return this.getSchema.id > 0 ? "Edit" : "Save";
    },
    formTitle() {
      return this.getSchema.id > 0 ? " Edit User " : "Create New User ";
    },
    // role
    getRoleList() {
      return this.$store.getters.getRoleList;
    },
    userTypes() {
      return this.$store.getters.getUserTypeItems;
    },
    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    getCenterList() {
      return this.$store.getters.getCenterItem;
    },
    getCenterListLoading() {
      return this.$store.getters.getCenterItem.length > 0 ? false : true;
    },
    getRegionalCenterList() {
      return this.$store.getters.getRegCenterItems;
    },
  },
  methods: {
    // getSelectedRole(roles) {
    //   console.log("select", roles);
    // },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.getSchema.id > 0 ? this.edit() : this.save();
        }
      });
    },
    save() {
      console.log("save");
      let self = this;
      // if (this.getSchema.password < 1) {
      //   this.modelValidations.password = {
      //     required: true
      //   };
      //   this.modelValidations.confirmedPassword = {
      //     required: true
      //   };
      //   return;
      // }
      // if (this.getSchema.password > 0) {
      //   this.modelValidations.confirmedPassword = {
      //     required: true
      //   };
      //   return;
      // }
      //this.validationForm();
      //var name = this.getSchema.name;
      // this.getSchema.username = name;
      //this.getSchema.user_type = this.user_type;
      let item = this.getSchema;
      console.log("save e", item);
      this.$store
        .dispatch("saveUserData", item)
        .then(function () {
          try {
            self.close();
            self.$emit("update:loadData", true);
            //self.$store.dispatch("fetchUserData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchUserData");
        });
    },
    edit() {
      let self = this;
      //this.getSchema.user_type = this.user_type;
      let item = this.getSchema;
      this.$store
        .dispatch("editUserData", item)
        .then(function () {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("fetchUserData");
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchUserData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      //this.user_type = "";
      this.$store.commit("UNSET_USER_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.changePasswordStatus = false;
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    },
    setStepper(value) {
      console.log("value ", value);
      if (value > 0) {
        this.user_step = 2;
        if (value == 2) {
          this.centerStatus = true;
          this.ifAdminUser = false;
          this.regionalCenterStatus = false;
        } else if (value == 3) {
          console.log("ac enter", this.regionalCenterStatus);
          this.centerStatus = false;
          this.ifAdminUser = false;
          this.regionalCenterStatus = true;
        } else {
          this.centerStatus = false;
          this.regionalCenterStatus = false;
        }
      }
      console.log("ac ", this.regionalCenterStatus);
    },
    checkUserSelection() {
      this.$validator.validateAll("form1").then((isValid) => {
        if (isValid) {
          console.log("clicked");
          if (this.getSchema.user_type > 0) this.user_step = 2;
          else this.user_step = 1;
          this.setStepper(this.getSchema.user_type);
        }
      });
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
