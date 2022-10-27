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
          <v-card flat class="pr-3 scroll" height="350">
            <v-form>
              <div v-if="adminStatus">
                {{ getSchema.center_list_id }}
                <v-autocomplete
                  label="Select Center"
                  item-text="center_name"
                  item-value="center_code"
                  v-model="getSchema.center_list_id"
                  :items="getCenterList"
                  v-validate="'required'"
                  :error-messages="errors.collect('center_list_id')"
                  data-vv-name="center_list_id"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.center_list_id = ''"
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
                name="User Name"
                label="User Name"
                v-model="getSchema.username"
                v-validate="'required'"
                :error-messages="errors.collect('username')"
                data-vv-name="username"
                required
                prepend-icon="edit"
              ></v-text-field>
              <!--   <v-text-field
                name="name"
                label="Center Name"
                v-model="getSchema.name"
                v-validate="'required'"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                required
                prepend-icon="edit"
              ></v-text-field>-->
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
                name="password"
                label="Password"
                v-model="getSchema.password"
                v-validate="'required|min:6'"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                :required="this.indexEdited === -1 ? false : true"
                prepend-icon="edit"
              ></v-text-field>
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
import centerRegMixin from "../../mixin/center_reg_mixin";
import commonGet from "../../mixin/common_getters_mixin";
export default {
  mixins: [commonFun, centerRegMixin, commonGet],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    adminStatus: false,

    dictionary: {
      custom: {
        name: {
          required: () => "Name field is required"
        },
        password: {
          required: () => "Select a password"
        },
        email: {
          required: () => "Email is  required"
        },
        username: {
          required: () => "Select User Name"
        }
      }
    }
  }),
  created() {
    console.log(this.dialogStatus);
    this.$store.dispatch("fetchCenterData");
    this.checkAdminStatus(this.getUserType());
  },
  // mounted() {
  //   this.$validator.localize("en", this.dictionary);
  // },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_CENTER_USER_SCHEMA", this.editedData);
      console.log("edit data ", this.editedData);
      // this.getSchema.center_list_id = this.editedData.type.id;

      console.log("edit data ", this.getSchema);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getCenterUserSchema;
    },
    getItemList() {
      return this.$store.getters.getCenterUserItem;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Center User" : "Center User Edit";
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
      console.log("save fun", this.adminStatus);
      var user_type = this.getUserType();

      if (this.adminStatus) {
        this.getSchema.user_type = this.getCenterUserType();
      } else if (user_type == "Center") {
        this.getSchema.user_type = this.getUserTypeId();
        this.getSchema.center_list_id = this.getCenterId();
      }
      console.log(user_type + " type found", this.getSchema);

      var item = {
        name: this.getSchema.center_list_id,
        email: this.getSchema.email,
        password: this.getSchema.password,
        username: this.getSchema.username,
        user_type: this.getSchema.user_type,
        center_list_id: this.getSchema.center_list_id,
        active: this.getSchema.active
      };

      this.$store
        .dispatch("saveCenterUserData", item)
        .then(function(data) {
          try {
            //console.log("cLOSE FUN CALLING  ")
            self.close();
            self.$emit("update:loadData", true);
            self.loadCenterListData();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          self.$store.dispatch("callCenterUserData");
        });
    },
    edit() {
      console.log("in the eduit", this.getSchema);
      var self = this;
      var item = {
        id: this.getSchema.id,
        name: this.getSchema.name,
        email: this.getSchema.email,
        password: this.getSchema.password,
        username: this.getSchema.username,
        user_type: this.getSchema.user_type,
        center_list_id: this.getSchema.center_list_id,
        active: this.getSchema.active,
        created_at: this.getSchema.created_at,
        updated_at: this.getSchema.updated_at,
        deleted_at: this.getSchema.deleted_at,
        created_by: this.getSchema.created_by,
        updated_by: this.getSchema.updated_by,
        deleted_by: this.getSchema.deleted_by
      };
      var param = {
        item: item,
        indexEdited: this.indexEdited
      };
      this.$store
        .dispatch("editCenterUserData", param)
        .then(function(data) {
          self.close();
          self.$store.dispatch("callCenterUserData");
          self.$emit("update:loadData", true);
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callCenterUserData");
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$store.commit("UNSET_CENTER_USER_SCHEMA");
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
