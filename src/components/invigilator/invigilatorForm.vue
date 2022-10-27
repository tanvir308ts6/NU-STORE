<template>
  <div class="form">
    <!--   <v-dialog v-model="dialogStatus" max-width="500px" persistent>  -->
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
      <formNotification />
      <v-card-text>
        <v-card flat class="pr-3 scroll">
          <v-form>
            <v-text-field
              name="name"
              label="Invigilator Name"
              v-model="getSchema.name"
              v-validate="'required'"
              :error-messages="errors.collect('name')"
              data-vv-name="name"
              required
              prepend-icon="edit"
            ></v-text-field>
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
              name="mobile"
              label="Mobile"
              v-model="getSchema.mobile"
              v-validate="{
                max: 13,
                min: 11,
                regex: /^([+]88)?(01)(?!2)(?!1)\d{9}/
              }"
              :error-messages="errors.collect('mobile')"
              data-vv-name="mobile"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="nid_no"
              label="NID No"
              v-model="getSchema.nid_no"
              prepend-icon="edit"
            ></v-text-field>
            <!-- <v-flex xs12>
                <v-combobox
                  v-model="getSchema.tmis_id"
                  :items="tmis"
                  label="Select a type accrding to you TMIS"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="tmis_id"
                  :error-messages="errors.collect('tmis_id')"
                ></v-combobox>
            </v-flex>-->
            <v-text-field
              name="teacher_code"
              label="Teacher TMIS ID"
              v-model="getSchema.teacher_code"
              prepend-icon="edit"
            ></v-text-field>
            <!-- <v-text-field
              name="college_code"
              label="College Code"
              v-model="getSchema.college_code"
              prepend-icon="edit"
            ></v-text-field>-->
            <!-- <v-flex xs12>
              <v-select
                v-model="getSchema.teacher_code"
                item-text="name"
                item-value="code"
                :items="teacherList"
                label="Select Teacher from the list"
                prepend-icon="edit"
                v-validate="'required'"
                data-vv-name="teacher_code"
                required
                :error-messages="errors.collect('teacher_code')"
              ></v-select>
            </v-flex>-->
            <!-- <v-flex xs12>
              <v-select
                :items="collegeList"
                item-text="name"
                item-value="code"
                name="collegeCode"
                label="Select College from the list"
                v-model="getSchema.college_code"
                prepend-icon="edit"
                v-validate="'required'"
                required
                data-vv-name="college_code"
                :error-messages="errors.collect('college_code')"
              ></v-select>
            </v-flex>-->
            <v-flex xs12 v-if="ifAdminUserType">
              <v-autocomplete
                class="ma-2"
                v-model="center_id"
                item-value="center_code"
                :item-text="
                  (item) => item.center_code + ' - ' + item.center_name
                "
                :items="getCenterList"
                menu-props="auto"
                label="Select Center"
                hide-details
                v-validate="'required'"
                :error-messages="errors.collect('center_id')"
                data-vv-name="center_id"
                name="center"
                required
                prepend-icon="edit"
                @input="getCen(item)"
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="center_id = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >
                    {{ data.item.center_code + " - " + data.item.center_name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="data.item"
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="
                          data.item.center_code + ' - ' + data.item.center_name
                        "
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 v-if="!profileMode">
              <v-autocomplete
                label="Select Role"
                item-text="role_name"
                item-value="id"
                v-model="getSchema.role_id"
                :items="getRoleList"
                v-validate="'required'"
                :error-messages="errors.collect('role_id')"
                data-vv-name="role_id"
                required
                prepend-icon="edit"
                chips
                disabled
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="getSchema.roleDetails.role_id = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                    >{{ data.item.role_name }}</v-chip
                  >
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content
                      v-text="data.item"
                    ></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.role_name"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <!-- <v-flex xs12>
                <v-combobox
                  v-model="getSchema.active"
                  :items="active"
                  label="Select a active status"
                  prepend-icon="edit"
                  v-validate="'required'"
                  data-vv-name="active"
                  required
                  :error-messages="errors.collect('active')"
                ></v-combobox>
            </v-flex>-->
            <!-- <v-divider></v-divider>
            <v-subheader>Files</v-subheader>-->
          </v-form>
          <v-divider color="black"></v-divider>
          <v-form data-vv-scope="form1">
            <v-card-text class="headline">User Info</v-card-text>
            <v-switch
              v-model="changePasswordStatus"
              label="Do you want to change username & password ?"
              v-show="indexEdited > -1"
            ></v-switch>
            <div v-show="changePasswordStatus || indexEdited == -1">
              <v-text-field
                name="userName"
                label="User Name"
                v-model="getSchema.username"
                v-validate="modelValidations.username"
                :error-messages="errors.collect('form1.username')"
                data-vv-name="username"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                v-validate="modelValidations.password"
                :error-messages="errors.collect('form1.password')"
                data-vv-name="password"
                v-model="getSchema.password"
                type="password"
                label="Password"
                placeholder="Password"
                ref="password"
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="Confirmpassword"
                label="Confirm Password"
                placeholder="Password confirmation"
                v-model="getSchema.confirmedPassword"
                type="password"
                v-validate="modelValidations.confirmedPassword"
                :error-messages="errors.collect('form1.confirmedPassword')"
                data-vv-name="confirmedPassword"
                required
                prepend-icon="edit"
              ></v-text-field>
            </div>
            <!-- <v-text-field
              label="Password"
              v-model="getSchema.password"
              name="password"
              type="password"
              placeholder="Password"
              ref="password"
              prepend-icon="edit"
            ></v-text-field>-->
          </v-form>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}</v-btn
          >
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import formNotification from "@/components/utils/formNotification";
import commonFun from "../../mixin/common_function";
import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonFun, commonGet, common_login_getters],
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
    "centercode",
    "searchInvigilatorList",
    "searchParam",
  ],

  data: () => ({
    modelValidations: {
      username: {
        required: true,
        min: 3,
        max: 10,
      },
      password: {
        required: true,
        min: 6,
      },
      confirmedPassword: {
        required: true,
        confirmed: "password",
      },
    },
    disablevalidate: false,
    center_id: "",
    centerIdStatus: false,
    teacherList: [],
    dialog: false,
    editedStatus: false,
    collegeList: [],
    changePasswordStatus: false,
    dictionary: {
      custom: {
        name: {
          required: () => "Invigilator Name field can not be empty",
        },
        email: {
          required: () => "Email field can not be empty",
          email: "Type a correct email address",
        },
        mobile: {
          required: () => "Mobile field can not be empty",
          numeric: "Mobile field may only contain numeric characters",
          max: "The Mobile field may not be greater than 13 characters",
          min: "The Mobile field may not be lesser than 11 characters",
          regex:
            "Enter Valid Mobile Number,Mobile number will start with 01 or +880 ",
        },
        /*tmis_id: {
          required: () => "Select a type"
        },*/
        nid_no: {
          required: () => "NID field can not be empty.",
        },
        // college_code: {
        //   required: () => "Select  College"
        // },
        center_id: {
          required: () => "Select Center",
        },
        username: {
          required: () => "User Name field can not be empty",
          max: "The User Name field may not be greater than 10 characters",
          min: "The User Name field may not be lesser than 3 characters",
        },
        password: {
          required: () => "Password field can not be empty",
          min: " The Password field may not be lesser than 6 characters",
        },
        confirmedPassword: {
          required: () => "Re-type your password",
          confirmed: "Password must match ",
        },
      },
    },
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    this.$store.dispatch("callRoleData", limit);
    this.$store.commit("UNSET_FORMNOTIFY");
    console.log(this.dialogStatus);
    this.$store.dispatch("fetchTeachertData");
    this.$store.dispatch("fetchTheoryWiseCenterData", this.searchParam);
    this.$store.dispatch("fetchCollegeData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    console.log("mounted");
  },
  watch: {
    dialogStatus(val) {
      // var userType = this.getUserTypeId();
      // if (userType == 1) {
      //   this.centerIdStatus = true;
      // }
      this.dialog = val;
      console.log("chk", this.editedData);
      this.$store.commit("SET_INVIGILATOR_SCHEMA", this.editedData);
      console.log("chk", this.editedData);
      this.teacherList = this.$store.getters.getTeacherItems;

      this.collegeList = this.$store.getters.getCollegeItems;
      this.center_id = this.editedData.center_id;
    },
    indexEdited(val) {
      console.log("indexEdited ", val);
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getTeacherList() {
      return this.$store.getters.getTeacherItems;
    },
    getCollegeList() {
      return this.$store.getters.getCollegeItems;
    },
    getCenterList() {
      return this.$store.getters.getTheoryCenterList;
    },
    getSchema() {
      return this.$store.getters.getInvigilatorSchema;
    },
    getItemList() {
      return this.$store.getters.getInvigilatorItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Invigilator"
        : "Edit Invigilator";
    },
    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
    // role
    getRoleList() {
      return this.$store.getters.getRoleList;
    },
  },
  methods: {
    getCen(item) {
      console.log("item ", item);
    },
    validationForm() {
      if (this.indexEdited === -1) {
        this.validationForm1();
      }
      console.log("inn", this.disablevalidate);
      if (!this.disablevalidate) {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.indexEdited === -1 ? this.save() : this.edit();
          }
        });
      }
    },
    validationForm1() {
      this.$validator.validateAll("form1").then((isValid) => {
        if (isValid) {
          this.disablevalidate = false;
          // this.selectedIndex >= 0 ? this.updateDetails() : this.addDetails();
        } else {
          this.disablevalidate = true;
        }
      });
    },
    save() {
      var self = this;
      console.log("self.--->getSchema", this.getSchema);
      var user_type = this.getUserType();
      console.log("found type ", user_type);
      if (user_type == "Center") {
        console.log("--.", self.getAuthCenterUser);
        this.getSchema.center_id = self.getAuthCenterUser.center_code;
        this.getSchema.college_code = self.getAuthCenterUser.college_code;
      } else if (user_type == "Admin") {
        this.getSchema.center_id = this.center_id;
        this.getSchema.college_code = this.center_id; // assigend college code with label center_id as it is used before
      }

      // default set to invigilator
      this.getSchema.user_type = 4;
      var item = this.getSchema;
      //SET EXAM INITIATE ID
      item.exam_initiate_id = this.getExamInitiateId;

      console.log("schema item   ", item);

      this.$store
        .dispatch("saveInvigilatorData", item)
        .then(function () {
          try {
            self.close();
            self.searchInvigilatorList();
            // self.$store.dispatch("callInvigilatorData", self.centercode);
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          self.searchInvigilatorList();
        });
    },
    edit() {
      console.log("..ed", this.getSchema);
      var self = this;
      // var item = {
      //   id: this.getSchema.id,
      //   name: this.getSchema.name,
      //   email: this.getSchema.email,
      //   mobile: this.getSchema.mobile,
      //   nid_no: this.getSchema.nid_no,
      //   //user_id: this.getSchema.user_id,
      //   //tmis_id: this.getSchema.tmis_id,
      //   teacher_code: this.getSchema.teacher_code,
      //   // college_code: this.getSchema.college_code,
      //   center_id: this.getSchema.center_id,
      //   username: this.getSchema.username,
      //   password: this.getSchema.password,
      //   active: this.getSchema.active
      // };

      var item = this.getSchema;
      console.log("..ed", item);

      var param = {
        item: item,
        indexEdited: this.indexEdited,
      };
      //console.log("param", param);
      // return 0;
      this.$store
        .dispatch("editInvigilatorData", param)
        .then(function (data) {
          console.log(data);
          if (!self.profileMode) {
            self.close();
            self.searchInvigilatorList();
          }
        })
        .catch(function (error) {
          console.log(error);
          //self.searchInvigilatorList();
        });
    },
    clear() {
      // this.getSchema.id = "";
      // this.getSchema.name = "";
      // this.getSchema.email = "";
      // this.getSchema.mobile = "";
      // //this.getSchema.user_id = "";
      // //this.getSchema.tmis_id = "";
      // this.getSchema.teacher_code = "";
      // this.getSchema.college_code = "";
      // this.getSchema.center_id = "";
      // this.getSchema.username = "";
      // this.getSchema.password = "";
      // this.getSchema.active = "";
      this.center_id = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_INVIGILATOR_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.changePasswordStatus = false;
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    },
  },
  // watch: {
  //   getSchema(val) {
  //     console.log("ok->", val);
  //     // this.dialog = val;
  //   }
  // }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
