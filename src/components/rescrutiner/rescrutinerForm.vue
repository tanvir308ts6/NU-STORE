<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
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
            >
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-flex xs12>
                <v-autocomplete
                  class="ma-2"
                  disabled
                  label="Select Exam "
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  v-model="getSchema.exam_code"
                  :items="getExamList"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_code')"
                  data-vv-name="exam_code"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.code + " - " + data.item.title }}</v-chip
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
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  disabled
                  name="year"
                  class="ma-2"
                  v-model="getSchema.year"
                  item-text="year"
                  item-value="year"
                  :items="getYearList"
                  menu-props="auto"
                  label="Select Year"
                  hide-details
                  v-validate="'required'"
                  :error-messages="errors.collect('year')"
                  data-vv-name="year"
                  required
                  prepend-icon="calendar_today"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.year = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.year }}</v-chip
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
                          v-html="data.item.year"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <!-- {{subjs}} -->
                <!-- @change="subjectChange()" -->
                <v-autocomplete
                  class="ma-2"
                  v-model="subjs"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  prepend-icon="library_books"
                  multiple
                >
                  <template v-slot:selection="data">
                    <!-- @input="removeSubject(getSchema.subject_code, data.item)" -->
                    <v-chip
                      close
                      @input="subjs = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.code + " - " + data.item.title }}</v-chip
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
                          v-html="data.item.code + ' - ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <!-- {{getSchema.paper_code}} -->
              <!-- <v-flex xs12>
                <v-autocomplete
                  class="ma-2"
                  v-model="getSchema.paper_code"
                  item-value="paper_code"
                  :item-text="
                    (item) => item.paper_code + ' - ' + item.paper_name
                  "
                  :items="getPaperByRescrutinerList"
                  menu-props="auto"
                  label="Select Paper"
                  hide-details
                  prepend-icon="library_books"
                  :loading="subPap.paper_loading"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="remove(subPap.paper_paper_code, data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.paper_code + ' - ' + data.item.paper_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="
                            data.item.paper_code + ' - ' + data.item.paper_name
                          "
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>-->
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="tmis_id"
                  label="TMIS ID"
                  v-model="tmis_id"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('tmis_id')"
                  data-vv-name="tmis_id"
                  required
                  prepend-icon="edit"
                  @change="tmisId($event)"
                  @keyup.native.down="tmisId($event)"
                  @keyup.native.enter="tmisId($event)"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="name"
                  label="Name"
                  v-model="getSchema.name"
                  v-validate="'required'"
                  :error-messages="errors.collect('name')"
                  data-vv-name="name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <!-- @change="value($event)" -->

              <v-flex xs12>
                <v-text-field
                  ref="input"
                  class="ma-2"
                  name="email"
                  label="Email"
                  v-model="email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  data-vv-name="email"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="mobile"
                  label="Mobile *"
                  v-model="getSchema.mobile"
                  v-validate="{
                    required: true, max: 13, min: 11, regex: /^([+]88)?(01)(?!2)(?!1)\d{9}/ }"
                  :error-messages="errors.collect('mobile')"
                  data-vv-name="mobile"
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <!-- v-validate="'required'"
                  :error-messages="errors.collect('nid_no')"
              data-vv-name="nid_no"-->
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="nid_no"
                  label="NID No"
                  v-model="getSchema.nid_no"
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="designation"
                  label="Designation"
                  v-model="getSchema.designation"
                  v-validate="'required'"
                  :error-messages="errors.collect('designation')"
                  data-vv-name="designation"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-switch
                v-model="changePasswordStatus"
                label="Do you want to change Login Email & password ?"
                v-show="indexEdited > -1"
              ></v-switch>
              <div v-show="changePasswordStatus || indexEdited == -1">
                <v-text-field
                  ref="input2"
                  name="username"
                  label="Login Email"
                  v-model="getSchema.username"
                  v-validate="'required'"
                  :error-messages="errors.collect('username')"
                  data-vv-name="username"
                  required
                  prepend-icon="edit"
                ></v-text-field>

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
    </v-dialog>
  </div>
</template>

<script>
import commonFun from "../../mixin/common_function";
import formNotification from "@/components/utils/formNotification";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";

export default {
  mixins: [commonFun, commonGet, watchMixin],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  props: ["dialogStatus", "editedData", "indexEdited", "searchRescrutinerList"],
  data: () => ({
    subjs:[],
    searchParam: {},
    modelValidations: {
      password: { required: false, min: 6 },
      confirmedPassword: {
        required: false,
        confirmed: "password",
      },
    },
    changePasswordStatus: false,
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    email: "",
    tmis_id: "",
    subPap: {
      paper_loading: false,
    },
    dictionary: {
      custom: {
        division_name: {
          required: () => "Division  Name is required",
        },
        div_code: {
          required: () => "Division Code can not be empty.",
        },
        username: {
          equired: () => "User Login mail can not be empty.",
        },
        mobile: {
          required: () => "Mobile field can not be empty",
          numeric: "Mobile field may only contain numeric characters",
          max: "The Mobile field may not be greater than 13 characters",
          min: "The Mobile field may not be lesser than 11 characters",
          regex:
            "Enter Valid Mobile Number,Mobile number will start with 01 or +880 ",
        },
      },
    },
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData", limit);
    }
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    this.$store.dispatch("fetchYearData", limit);
    // //paper
    // if (!this.$store.getters.getPaperByResItems.length) {
    //   this.$store.dispatch("fetchPaperByRescrutinerData", this.searchParam);
    // }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;

    console.log("schema", this.getSchema);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.editedData.exam_code = this.$store.getters.getLoggedInExam.code;
      this.editedData.year = this.$store.getters.getLoggedInYear.year;
      this.$store.commit("SET_RESCRUTINER_SCHEMA", this.editedData);
      this.email = this.editedData.email;
      this.tmis_id = this.editedData.tmis_id;
      this.subjs = this.editedData.subject_code;
      //this.getSchema.subject_code = this.editedData.subject_code[0].subject_code;
      this.getSchema.username = this.editedData.email; // seting email to username as usernm is missing in db
      // this.getSchema.username = this.editedData.tmis_id; // seting tmis_id to username as usernm is missing in db
    },
    dialog(val) {
      if (!val) this.close();
    },
    //email set to username
    email(val) {
      this.getSchema.username = val;
    },
    //tmis id set to username
    // tmis_id(val) {
    //   this.getSchema.username = val;
    // },
  },
  computed: {
    // email: {
    //   get() {
    //     return this.$refs.input.value;
    //   },
    //   set(value) {
    //     console.log(value);
    //     this.$emit("update:email", value); //emit kore dite
    //     this.$refs.input2.value = value;
    //     // Do other stuff here
    //   }
    // },
    getSchema() {
      return this.$store.getters.getRescrutinerSchema;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Re-scrutinizer "
        : "Edit Re-scrutinizer ";
    },
  },
  methods: {
    tmisId(val) {
      console.log("print", val);
      var self = this;
      //this.getSchema.paper_code = [];
      // this.subPap.paper_loading = true;
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.$store.getters.getLoggedInExam.code;
      param.year = this.$store.getters.getLoggedInYear.year;
      param.tmis_id = val;
      param.nested = false;

      if (val != 0) {
        this.$store
          .dispatch("fetchExaminerMonitoringData", param)
          .then((data) => {
            console.log("...m", data);
            //self.subPap.paper_loading = false;
            self.getSchema.name = data[0].examiner_name;
            self.email = data[0].examiner_email;
            self.getSchema.designation = data[0].details.designation_name;
            self.getSchema.mobile = data[0].details.mobile;
            self.getSchema.nid_no = data[0].details.nid;
          });
      }
    },
    // value(val) {
    //   console.log("val", val);
    //   this.email = val;
    //   // return (this.getSchema.username = val);
    // },
    validationForm() {
      console.log("schemssssss ", this.getSchema);
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    remove(arr, item) {
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },
    removeSubject(arr, item) {
      console.log("...",arr)
      const index = arr.indexOf(item.code);
      if (index >= 0) arr.splice(index, 1);

      // this.subjectChange(); //on subject change paper call
    },
    subjectChange() {
      var self = this;
      //this.getSchema.paper_code = [];
      this.subPap.paper_loading = true;
      console.log("print", this.getSchema.subject_code);
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.subject_code = this.getSchema.subject_code;

      if (this.getSchema.subject_code.length != 0) {
        this.$store
          .dispatch("fetchPaperByRescrutinerData", this.searchParam)
          .then((data) => {
            console.log("...m");
            self.subPap.paper_loading = false;
          });
      }
    },

    save() {
      let self = this;
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.email = this.email;
      this.getSchema.username = this.email; //email to username
      this.getSchema.tmis_id = this.tmis_id;
      this.getSchema.subject_code = this.subjs;
      // this.getSchema.username = this.tmis_id; //tmis to username
      let item = this.getSchema;
      console.log("///m", item);
      this.$store
        .dispatch("saveRescrutinerData", item)
        .then(function (data) {
          try {
            self.close();
            //self.$emit("update:loadData", true);
            self.searchRescrutinerList();
            //self.$store.dispatch("fetchCenLsDistToRegData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    edit() {
      let self = this;
      this.getSchema.email = this.email;
      this.getSchema.username = this.email; //email to username
      this.getSchema.tmis_id = this.tmis_id;
      this.getSchema.subject_code = this.subjs;
      // this.getSchema.username = this.tmis_id; //tmis to username
      let item = this.getSchema;
      this.$store
        .dispatch("editRescrutinerData", item)
        .then(function (data) {
          self.close();
          self.searchRescrutinerList();
          //self.$emit("update:loadData", true);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.subjs="",
      this.email = "";
      this.tmis_id = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_RESCRUTINER_SCHEMA");
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
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
