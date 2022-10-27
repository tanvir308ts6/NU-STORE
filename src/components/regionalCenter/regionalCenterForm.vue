<template>
  <div class="form">
    <!-- <v-dialog v-model="dialog" max-width="500px" persistent> -->
    <v-card>
      <!-- {{getSchema.regional_center_code}} -->
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
        <formNotification />
      </v-card>
      <v-card-text>
        <v-card flat>
          <v-form>
            <v-text-field
              name="center_name"
              label="Regional Center Name"
              v-model="getSchema.center_name"
              v-validate="'required'"
              :error-messages="errors.collect('center_name')"
              data-vv-name="center_name"
              required
              prepend-icon="edit"
            ></v-text-field>

            <v-text-field
              name="address"
              label="Address"
              v-model="getSchema.address"
              v-validate="'required'"
              :error-messages="errors.collect('address')"
              data-vv-name="address"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="email"
              label="Email"
              v-model="getSchema.email"
              v-validate="'required'"
              :error-messages="errors.collect('email')"
              data-vv-name="email"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="mobile"
              label="Mobile"
              v-model="getSchema.mobile"
              v-validate="'required|numeric'"
              :error-messages="errors.collect('mobile')"
              data-vv-name="mobile"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="phone"
              label="Phone"
              v-model="getSchema.phone"
              v-validate="'required|numeric'"
              :error-messages="errors.collect('phone')"
              data-vv-name="phone"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="code"
              label="Code"
              v-model="getSchema.regional_center_code"
              data-vv-name="code"
              required
              prepend-icon="edit"
            ></v-text-field>

            <v-autocomplete
              class="mx-0"
              hide-details
              :disabled = "ifRegionalUser"
              v-model="getSchema.division_id"
              :item-text="item => item.div_code + ' - ' + item.division_name"
              item-value="div_code"
              :items="getDivisionList"
              menu-props="auto"
              label="Select Division"
              name="division"
              prepend-icon="edit"
              data-vv-name="division"
              required
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="searchParam.div_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                >{{ data.item.div_code + ' - ' + data.item.division_name }}</v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content
                    v-text=" data.item.div_code + ' - ' + data.item.division_name"
                  ></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html=" data.item.div_code + ' - ' + data.item.division_name"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>

            <!-- <v-text-field
              name="center_list_id"
              label="Center list Id"
              v-model="getSchema.center_list_id"
              :error-messages="errors.collect('center_list_id')"
              data-vv-name="center_list_id"
              required
              prepend-icon="edit"
            ></v-text-field>-->

            <!--  <span color="primary" flat dark >{{ userCrediential }}</span> -->
            <!-- <v-card-actions>
              <v-btn color="primary" @click="userCrediential">{{ userButton }}</v-btn>
            </v-card-actions>-->

            <!-- <div v-if="crediential">
              <v-text-field
                name="username"
                label="User Name"
                v-model="getSchema.username"
                :error-messages="errors.collect('username')"
                data-vv-name="username"
                required
                prepend-icon="edit"
            ></v-text-field>-->

            <!-- <v-text-field
            v-validate="'required'"
            v-model="getSchema.password"
            name="password"
            type="password"
            placeholder="Password"
            ref="password"
            prepend-icon="edit">
            </v-text-field>-->

            <!-- <v-text-field
                v-validate="'required'"
                v-model="getSchema.password"
                name="password"
                type="password"
                placeholder="Password"
                ref="password"
                prepend-icon="edit"
              ></v-text-field>

              <v-text-field
                v-validate="'required|confirmed:password'"
                v-model="getSchema.confirmedPassword"
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                data-vv-as="password"
                prepend-icon="edit"
            ></v-text-field>-->

            <!-- <div class="alert alert-danger" v-show="errors.any()">
                <div v-if="errors.has('password')">{{ errors.first("password") }}</div>
                <div
                  v-if="errors.has('password_confirmation')"
                >{{ errors.first("password_confirmation") }}</div>
            </div>-->
            <!-- </div> -->
          </v-form>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
          >{{ buttonTitle }}</v-btn>
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
    <!-- </v-dialog> -->
  </div>
</template>
<script>
import formNotification from "@/components/utils/formNotification";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  mixins: [common_login_getters],
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "profileMode",
    "loadData",
  ],
  data: () => ({
    dialog: false,

    editedStatus: false,
    examId: [],
    crediential: true,
    menu1: false,
    dictionary: {
      custom: {
        center_name: {
          required: () => "Regional Center Name field can not be empty",
        },
        // college_code: {
        //   required: () => "College code field can not be empty"
        // },

        address: {
          required: () => "Address field can not be empty",
        },

        phone: {
          required: () => "Phone field can not be empty",
        },
        email: {
          required: () => "Email field can not be empty",
        },
        mobile: {
          required: () => "Mobile field can not be empty",
        },
        code: {
          required: () => "Code field can not be empty",
        },
      },
    },
  }),
  created() {
    var limit = {
      limit: -1,
    };

    this.$store.commit("UNSET_FORMNOTIFY");
    console.log(this.dialogStatus);

    //division
    if (!this.$store.getters.getDivisionItems.length) {
      this.$store.dispatch("fetchDivisionData", limit);
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_REGIONAL_CENTER_SCHEMA", this.editedData);
      if (this.editedData.id > 0) this.crediential = false;
      else this.crediential = true;
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    getSchema() {
      return this.$store.getters.getRegionalCenterSchema;
    },
    getItemList() {
      return this.$store.getters.getRegionalCentertItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Regional Center"
        : "Edit Regional Center";
    },

    // userButton() {
    //   return this.indexEdited === -1 ? "User Info" : "Edit Info";
    // }
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },

    // editInfo() {
    //   this.crediential = !this.crediential;
    // },
    // newInfo() {
    //   this.crediential = true;
    // },

    save() {
      var self = this;
      var item = {
        center_name: this.getSchema.center_name,
        //college_code: this.getSchema.college_code,
        address: this.getSchema.address,
        phone: this.getSchema.phone,
        email: this.getSchema.email,
        mobile: this.getSchema.mobile,
        regional_center_code: this.getSchema.regional_center_code,
        division_id: this.getSchema.division_id,
        // center_list_id: this.getSchema.center_list_id
        // username: this.getSchema.username,
        // password: this.getSchema.password
      };

      console.log("...");
      console.log(JSON.stringify(item));
      console.log("...");
      this.$store
        .dispatch("saveRegionalCenterData", item)
        .then(function (data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            // self.$emit("update:snackbar", true);
            self.$store.dispatch("callRegionalCenterData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          self.$store.dispatch("callRegionalCenterData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        center_name: this.getSchema.center_name,
        // college_code: this.getSchema.college_code,
        address: this.getSchema.address,
        phone: this.getSchema.phone,
        email: this.getSchema.email,
        mobile: this.getSchema.mobile,
        regional_center_code: this.getSchema.regional_center_code,
        // center_list_id: this.getSchema.center_list_id,
        // username: this.getSchema.username,
        // password: this.getSchema.password,
        division_id: this.getSchema.division_id,
        // created_at: this.getSchema.created_at,
        // updated_at: this.getSchema.updated_at,
        // deleted_at: this.getSchema.deleted_at,
        // created_by: this.getSchema.created_by,
        // updated_by: this.getSchema.updated_by,
        // deleted_by: this.getSchema.deleted_by
      };
      console.log(param);
      var param = {
        item: item,
        indexEdited: this.indexEdited,
      };

      this.$store
        .dispatch("editRegionalCentertData", param)
        .then(function (data) {
          if (!self.profileMode) self.close();
          self.$emit("update:loadData", true);
          self.$store.dispatch("callRegionalCenterData");
          //self.$emit("update:snackbar", true);
        })
        .catch(function (error) {
          console.log(error);
          self.$store.dispatch("callRegionalCenterData");
        });
    },
    // userCrediential() {
    //   return this.indexEdited === -1 ? this.newInfo() : this.editInfo();
    // },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$store.commit("UNSET_REGIONAL_CENTER_SCHEMA");
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
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
