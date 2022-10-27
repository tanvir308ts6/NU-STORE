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
              <v-text-field
                name="dc_name"
                label="District Controller Name"
                v-model="getSchema.dc_name"
                v-validate="'required'"
                :error-messages="errors.collect('dc_name')"
                data-vv-name="dc_name"
                required
                prepend-icon="edit"
              ></v-text-field>
              
              <!-- {{getSchema.district_name}} -->
              <v-autocomplete
                class="mt-3 ml-2 mr-2"
                v-model="getSchema.district_code"
                :items="getDistrictList"
                color="primary"
                label="Select District"
                :item-text="item => item.district_name"
                item-value="dist_code"
                prepend-icon="calendar_today"
              >
                <template v-slot:selection="data">
                  <v-chip
                    color="grey lighten-4"
                    close
                    @input="getSchema.district_name = ''"
                    :selected="data.selected"
                  >
                    <span class="subheading">{{
                      data.item.district_name
                    }}</span>
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
                        v-html="data.item.district_name"
                      ></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
              <v-text-field
                name="mobile"
                label="Mobile"
                v-model="getSchema.mobile"
                :error-messages="errors.collect('mobile')"
                data-vv-name="mobile"
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
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";

export default {
  $_veeValidate: {
    validator: "new"
  },
  mixins: [commonFun, commonGet],
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    limit: {},
    dictionary: {
      custom: {
        dc_name: {
          required: () => "District Controller Name is required"
        },
        district_name: {
          required: () => "District Name can not be empty."
        }
      }
    }
  }),
  created() {
    var limit = {
      page: 1,
      limit: -1
    };
    this.$store.dispatch("fetchDistrictData", limit);
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    //this.getSchema.district_code = this.$store.getters.getDistrictList.dist_code;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_DISTRICT_CONTROLLER_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getDistrictControllerSchema;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Add" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Add New District Controller "
        : "Edit District Controller Information";
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
        .dispatch("saveDistrictControllerData", item)
        .then(function(data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editDistrictControllerData", item)
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
      this.$store.commit("UNSET_DISTRICT_CONTROLLER_SCHEMA");
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
