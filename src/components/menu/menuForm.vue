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
                name="menu_name"
                label="Menu Name"
                v-model="getSchema.menu_name"
                v-validate="'required'"
                :error-messages="errors.collect('menu_name')"
                data-vv-name="menu_name"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="tag_name"
                label="Tag Name"
                v-model="getSchema.tag_name"
                prepend-icon="edit"
              ></v-text-field>
              <!-- v-validate="'required'"
                :error-messages="errors.collect('tag_name')"
                data-vv-name="tag_name"
              required-->
              <v-text-field
                name="sl_no"
                label="SL. No"
                type="number"
                v-model="getSchema.sl_no"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('sl_no')"
                data-vv-name="sl_no"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                v-model="getSchema.menu_url"
                auto-grow
                label="Menu Url"
                name="menu_url"
                rows="1"
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                v-model="getSchema.icon"
                auto-grow
                label="Icon"
                name="icon"
                rows="1"
                prepend-icon="edit"
              ></v-text-field>
              <v-checkbox
                v-model="getSchema.status"
                label="Active"
                type="checkbox"
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
  props: ["dialogStatus", "editedData", "indexEdited"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    dictionary: {
      custom: {
        menu_name: {
          required: () => "Menu Name field can not be empty."
        },
        sl_no: {
          required: () => "SL. No field can not be empty.",
          numeric: "SL. No field may only contain numeric characters."
        },
        tag_name: {
          required: () => "Tag Name field can not be empty."
        }
        // menu_url: {
        //   required: () => "Select Menu url."
        // }
      }
    }
  }),
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_MENU_SCHEMA_DATA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getMenuSchema;
    },
    getItemList() {
      return this.$store.getters.getMenuDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Create New Menu" : "Edit Menu";
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
      console.log("Save ", item);
      this.$store
        .dispatch("saveMenuData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("fetchMenuData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchMenuData");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editMenuData", item)
        .then(function(data) {
          self.close();
          self.$store.dispatch("fetchMenuData");
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("fetchMenuData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_MENU_SCHEMA_DATA");
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
