<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">{{ formsTitle }}</span>
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
                name="district_name"
                label="District Name"
                v-model="getSchema.district_name"
                v-validate="'required'"
                :error-messages="errors.collect('district_name')"
                data-vv-name="district_name"
                required
                prepend-icon="edit"
              ></v-text-field>

              <v-text-field
                name="dist_code"
                label="District Code"
                v-model="getSchema.dist_code"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('dist_code')"
                data-vv-name="dist_code"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="old_dist_code"
                label="Old District Code"
                v-model="getSchema.old_dist_code"
                :error-messages="errors.collect('old_dist_code')"
                data-vv-name="old_dist_code"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="div_code"
                label="Division Code"
                v-model="getSchema.div_code"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('div_code')"
                data-vv-name="div_code"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="old_div_code"
                label="Old Division Code"
                v-model="getSchema.old_div_code"
                :error-messages="errors.collect('old_div_code')"
                data-vv-name="old_div_code"
                required
                prepend-icon="edit"
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
  </div>
</template>

<script>
import commonFun from "../../mixin/common_function";
import formNotification from "@/components/utils/formNotification";
import commonGet from "@/mixin/common_getters_mixin";

export default {
  $_veeValidate: {
    validator: "new"
  },
  mixins: [commonGet],
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
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
  created() {},
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifFormSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_DISTRICT_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getDistrictSchema;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formsTitle() {
      return this.indexEdited === -1
        ? "Create New District "
        : "Edit District ";
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

    save() {
      let self = this;

      let item = this.getSchema;
      this.$store
        .dispatch("saveDistrictData", item)
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
        .dispatch("editDistrictData", item)
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
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_DISTRICT_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
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
