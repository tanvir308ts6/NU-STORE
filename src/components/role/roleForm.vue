<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <!-- <v-alert :value="error_msg.length > 1" dismissible type="success">{{snackbar_msg}}</v-alert> -->

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
        <v-card-text>
          <formNotification />
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-text-field
                name="role_name"
                label="Role Name"
                v-model="getSchema.role_name"
                v-validate="'required'"
                :error-messages="errors.collect('role_name')"
                data-vv-name="role_name"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-textarea
                solo
                name="description"
                label="Description"
                v-model="getSchema.description"
                :error-messages="errors.collect('description')"
                data-vv-name="description"
                required
                prepend-icon="edit"
              ></v-textarea>
              <!-- {{getSchema.status}} -->
              <v-checkbox
                v-model="getSchema.status"
                label="Active"
                color="indigo darken-3"
              ></v-checkbox>
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
import formNotification from "@/components/utils/formNotification";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "snackbar",
    "getDataFromApi"
  ],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    status: true,

    dictionary: {
      custom: {
        role_name: {
          required: () => "Role Name can not be empty."
        },
        description: {
          required: () => "Description field can not be empty."
        }
      }
    }
  }),
  created() {
    //this.$store.dispatch("callRoleData");
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_ROLE_SCHEMA", this.editedData);
      if (this.editedData.id > 0) {
        this.getSchema.status = this.editedData.status;
        console.log("..m", this.getSchema.status);
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getRoleSchema;
    },
    getItemList() {
      return this.$store.getters.getRegBsCollFromNuDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create Role" : "Edit Role";
    }
    // error_msg() {
    //   return this.$store.getters.getMessage;
    // },
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    regCen(val) {
      console.log("val....>", val);
      return val;
    },
    save() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("saveRoleData", item)
        .then(function() {
          try {
            self.close();
            //self.$emit("update:loadData", true);
            self.getDataFromApi();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editRoleData", item)
        .then(function() {
          self.close();
          // self.$emit("update:loadData", true);
          self.getDataFromApi();
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    clear() {
      this.$store.commit("UNSET_ROLE_DATA_SCHEMA");
      this.$validator.reset();
    },
    close() {
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
