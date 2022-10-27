<template>
  <div class="form">
    <!-- getSchema:{{getSchema}} -->
    <!-- <br /> -->
    <!-- regionalCenters: {{regionalCenters}} -->
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
          <v-card flat class="pr-3 scroll" height="400">
            <v-form>
              <!-- <p class="title font-weight-regular">Center Info</p> -->

              <div v-if="adminStatus">
                <v-autocomplete
                  label="Select Regional Center"
                  item-text="center_name"
                  item-value="id"
                  v-model="getSchema.regional_center_id"
                  :items="getRegCenList"
                  v-validate="'required'"
                  :error-messages="errors.collect('regional_center_id')"
                  data-vv-name="regional_center_id"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.regional_center_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.center_name }}</v-chip
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
                          v-html="data.item.center_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </div>
              <v-text-field
                name="username"
                label="User's Username"
                v-model="getSchema.username"
                v-validate="'required'"
                :error-messages="errors.collect('username')"
                data-vv-name="username"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="name"
                label="User's name"
                v-model="getSchema.name"
                v-validate="'required'"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="email"
                label="User's email"
                v-model="getSchema.email"
                v-validate="'required'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                required
                prepend-icon="edit"
              ></v-text-field>
              <!-- <v-text-field
                name="user_type"
                label="User Type"
                v-model="getSchema.user_type"
                v-validate="'required'"
                :error-messages="errors.collect('user_type')"
                data-vv-name="user_type"
                required
                prepend-icon="user_type"
              ></v-text-field>-->

              <!--   <v-flex xs12>
                <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
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
                      v-model="getSchema.date"
                      label="Date"
                      hint="MM-DD-YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('date')"
                      data-vv-name="date"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker v-model="getSchema.date" no-title @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>-->
              <!--  <span color="primary" flat dark >{{ userCrediential }}</span> -->
              <!-- v-validate="'required'" -->

              <v-switch
                v-model="changePasswordStatus"
                label="Do you want to change password ?"
                v-show="indexEdited > -1"
              ></v-switch>
              <div v-show="changePasswordStatus || indexEdited == -1">
                <v-text-field
                  v-model="getSchema.password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref="password"
                  prepend-icon="edit"
                ></v-text-field>
                <!-- v-validate="'required|confirmed:password'" -->
                <v-text-field
                  v-model="getSchema.confirmedPassword"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  data-vv-as="password"
                  prepend-icon="edit"
                ></v-text-field>
              </div>
              <div class="alert alert-danger" v-show="errors.any()">
                <div v-if="errors.has('password')">
                  {{ errors.first("password") }}
                </div>
                <div v-if="errors.has('password_confirmation')">
                  {{ errors.first("password_confirmation") }}
                </div>
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
import commonGet from "../../mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
export default {
  mixins: [commonFun, commonGet],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar"],
  data: () => ({
    changePasswordStatus: false,
    dialog: false,
    adminStatus: false,
    editedStatus: false,

    dateMenu: false,
    crediential: true,
    menu1: false,
    dictionary: {
      custom: {
        center_name: {
          required: () => "Center Name field can not be empty"
        },
        user_name: {
          required: () => "User Name field can not be empty"
        },
        date: {
          required: () => "Date can not be empty."
        }
      }
    }
  }),
  created() {
    console.log(this.dialogStatus);
    this.checkAdminStatus(this.getUserType());
    this.$store.dispatch("fetchRegCenterData");
  },

  watch: {
    dialogStatus(val) {
      console.log("item ", this.editedData);
      this.dialog = val;
      this.$store.commit("SET_REGIONAL_CENTER_USER_SCHEMA", this.editedData);

      //this.getSchema.regional_center_id = this.editedData.type.id;
      if (this.editedData.id > 0) this.crediential = false;
      else this.crediential = true;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getRegionalCenterUserSchema;
    },
    getItemList() {
      return this.$store.getters.getRegionalCentertUserItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "New Regional Center User"
        : "Edit Regional Center Item";
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
    checkAdminStatus(user_type) {
      if (user_type == "Admin") {
        this.adminStatus = true;
      }
    },

    save() {
      var self = this;
      var user_type = this.getUserType();

      if (this.adminStatus) {
        this.getSchema.user_type = this.getRegCenterUserType();
      } else if (user_type == "Regional Center") {
        this.getSchema.user_type = this.getUserTypeId();
        this.getSchema.regional_center_id = this.getRegionalCenterId();
      }

      // if (!this.adminStatus) {
      //   var user_type = this.getUserType();
      //   this.getSchema.user_type = this.getUserTypeId();

      //   console.log(" type found", this.getSchema);

      //   if (user_type == "Regional Center") {

      //     this.getSchema.regional_center_id = this.getRegionalCenterId();
      //   }
      // }
      var item = {
        name: this.getSchema.name,
        email: this.getSchema.email,
        password: this.getSchema.password,
        username: this.getSchema.username,
        user_type: this.getSchema.user_type,
        regional_center_id: this.getSchema.regional_center_id
      };
      //set when current user type is  regional
      // if ( !this.adminStatus ){
      //   var user_type = this.getUserType();
      //   if (user_type == "regional_center") {
      //     this.getSchema.regional_center_id = this.getRegionalCenterId();
      //   }
      // }

      this.$store
        .dispatch("saveRegionalCenterUserData", item)
        .then(function(data) {
          try {
            self.close();
            // self.$emit("update:snackbar", true);
            self.$store.dispatch("callRegionalCenterUserData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          self.$store.dispatch("callRegionalCenterUserData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        name: this.getSchema.name,
        email: this.getSchema.email,
        password: this.getSchema.password,
        username: this.getSchema.username,
        user_type: this.getSchema.user_type,
        regional_center_id: this.getSchema.regional_center_id,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by
      };
      console.log(param);
      var param = {
        item: item,
        indexEdited: this.indexEdited
      };

      this.$store
        .dispatch("editRegionalCenterUsertData", param)
        .then(function(data) {
          self.close();
          self.$store.dispatch("callRegionalCenterUserData");
          //self.$emit("update:snackbar", true);
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callRegionalCenterUserData");
        });
    },

    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$store.commit("UNSET_REGIONAL_CENTER_USER_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      setTimeout(() => {
        this.$emit("update:snackbar", false);
      }, 5000);
      this.clear();
    }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
