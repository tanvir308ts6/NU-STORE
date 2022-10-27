<template>
  <div id="CreateCollegeUserForm" class="form">
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
              <v-text-field
                name="name"
                label="Name"
                v-model="getSchema.name"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                v-model="getSchema.email"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="mobile"
                label="Mobile"
                v-model="getSchema.mobile"
                :error-messages="errors.collect('mobile')"
                data-vv-name="mobile"
                prepend-icon="edit"
              ></v-text-field>
              <v-autocomplete
                v-model="getSchema.exam_initiate_id"
                :items="getAllExmMaster"
                item-text="exam_display_name"
                item-value="id"
                label="Select Exam"
                @change="changeExamMaster"
                data-vv-name="exam_display_name"
                :error-messages="errors.collect('id')"
                required
                prepend-icon="edit"
              ></v-autocomplete>
              <v-autocomplete
                v-model="getSchema.degree_group_code"
                :items="getDegreeGroup"
                item-text="degree_group_display_name"
                item-value="degree_group_code"
                label="Select Degree Group"
                data-vv-name="degree_group_name"
                @change="changeDegreeGroup"
                :error-messages="errors.collect('degree_group_code')"
                required
                prepend-icon="edit"
              ></v-autocomplete>
              <v-autocomplete
                v-model="getSchema.subject_code"
                :items="getSubject"
                item-text="display_name"
                item-value="subject_code"
                label="Select Subject"
                data-vv-name="subject_name"
                :error-messages="errors.collect('subject_code')"
                required
                prepend-icon="edit"
              ></v-autocomplete>
              <v-text-field
                name="username"
                label="User  Name"
                v-model="getSchema.username"
                v-validate="'required'"
                :error-messages="errors.collect('username')"
                data-vv-name="username"
                required
                prepend-icon="edit"
              ></v-text-field>

              <v-text-field
                name="password"
                label="Password"
                v-model="getSchema.password"
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                required
                prepend-icon="edit"
                type="password"
              ></v-text-field>
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
            <v-btn color="error  white--text" @click="clear">Reset</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <pre>{{getAllExmMaster}}</pre> -->
  </div>
</template>

<script>
import commonFun from "../../../mixin/common_function";
import formNotification from "@/components/utils/formNotification";
import commonGet from "@/mixin/common_getters_mixin";

export default {
  name: "CreateCollegeUserForm",
  $_veeValidate: {
    validator: "new"
  },
  mixins: [commonGet],
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],

  created() {
    this.$store.dispatch("getExmMaster");
  },
  computed: {
    getAllExmMaster() {
      return this.$store.getters.getAllExmMaster;
    },
    getDegreeGroup() {
      return this.$store.getters.getDegreeGroup;
    },
    getSubject() {
      return this.$store.getters.getSubject;
    },
    getSchema() {
      return this.$store.getters.getCollegeUserSchema;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New User " : "Edit User ";
    }
  },
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    dictionary: {
      custom: {
        district_name: {
          required: () => "District  Name is required"
        },
        dist_code: {
          required: () => "District Code can not be empty."
        }
      }
    }
  }),
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_COLLEGE_USER_SCHEMA", this.editedData);
      if (val && this.indexEdited !== -1) {
        this.$store.dispatch("getDegreeWiseDegreeGroup");
        this.$store.dispatch("getSubject");
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    changeExamMaster() {
      this.getAllExmMaster.forEach(element => {
        if (element.id == this.getSchema.exam_initiate_id) {
          this.getSchema.degree_code = element.core_exam.degree_code;
          this.getSchema.degree_group_code =
            element.core_exam.degree_group_code;
          this.getSchema.exam_code = element.exam_code;
          this.$store.dispatch("getDegreeWiseDegreeGroup").then(response => {
            console.log(response.data);
            if (Object.keys(response.data).length == 1) {
              this.$store.dispatch("getSubject");
            }
          });
        }
      });
    },
    changeDegreeGroup() {
      this.$store.dispatch("getSubject");
    },

    save() {
      let self = this;
      this.$store
        .dispatch("createCollegeUser")
        .then(function(data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            //self.$store.dispatch("fetchCenLsDistToRegData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editCollegeUser", item)
        .then(function(data) {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        })
        .catch(function(error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      // this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_COLLEGE_USER_SCHEMA");
      this.$store.commit("UNSET_DEGREE_WISE_DEGREE_GROUP");
      this.$store.commit("UNSET_SUBJECT");
      this.$validator.reset();
    },
    close() {
      // this.$store.commit("UNSET_COLLEGE_USER_SCHEMA");
      // this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifFormSchema = true;
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
