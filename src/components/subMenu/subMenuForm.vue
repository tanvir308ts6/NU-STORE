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
                  name="menu_id"
                  label="Select Menu"
                  item-text="menu_name"
                  item-value="id"
                  v-model="getSchema.menu_id"
                  :items="getMenuDataList"
                  v-validate="'required'"
                  :error-messages="errors.collect('menu_id')"
                  data-vv-name="menu_id"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.menu_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.menu_name }}</v-chip
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
                          v-html="data.item.menu_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
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
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :disabled="disabledForDivider"
                  name="Sub_menu_name"
                  label="SubMenu Name"
                  v-model="getSchema.sub_menu_name"
                  v-validate="'required'"
                  :error-messages="errors.collect('sub_menu_name')"
                  data-vv-name="sub_menu_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
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
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :disabled="disabledForDivider"
                  v-model="getSchema.menu_url"
                  auto-grow
                  label="SubMenu Url"
                  name="menu_url"
                  rows="1"
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-layout>
                  <v-flex xs10>
                    <v-text-field
                      :disabled="disabledForDivider"
                      v-model="getSchema.icon"
                      auto-grow
                      label="Icon"
                      name="icon"
                      rows="1"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 class="mx-auto" v-if="getSchema.icon">
                    <v-icon large>{{ getSchema.icon }}</v-icon>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  :disabled="disabledForDivider"
                  v-model="getSchema.status"
                  label="Active"
                  type="checkbox"
                  color="indigo darken-3"
                ></v-checkbox>
              </v-flex>
              <!-- <v-flex xs12> -->
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
  props: ["dialogStatus", "editedData", "indexEdited", "searchParam"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    disabledForDivider: false,
    menus: [],
    dictionary: {
      custom: {
        menu_name: {
          required: () => "Select Menu"
        },
        sub_menu_name: {
          required: () => "SubMenu Name field can not be empty."
        },
        sl_no: {
          required: () => "SL. No field can not be empty.",
          numeric: "SL. No field may only contain numeric characters."
        },
        tag_name: { required: () => "Tag Name field can not be empty." }

        // active: {
        //   required: () => "check active."
        // },
        // menu_url: {
        //   required: () => "Select Menu url."
        // }
      }
    }
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.$store.dispatch("fetchMenuData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.disabledForDivider = false;
      this.dialog = val;
      this.$store.commit("SET_SUBMENU_SCHEMA_DATA", this.editedData);
      // this.menus = this.$store.getters.getMenuDataList;

      // if user is adding a new submenu and menu is selected in the search param then the below code will pre select menu
      if (this.editedData.menu_id == -1) {
        if (this.searchParam.menu_id) {
          this.getSchema.menu_id = this.searchParam.menu_id;
        }
      }
      if (this.editedData.menu_url == "divider") {
        if (this.searchParam.menu_id) {
          this.getSchema.menu_id = this.searchParam.menu_id;
        }
        this.disabledForDivider = true;
      }
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getSubMenuSchema;
    },
    getItemList() {
      return this.$store.getters.getSubMenuDataList;
    },
    getMenuDataList() {
      return this.$store.getters.getMenuDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Edit";
    },
    formTitle() {
      let title = this.indexEdited === -1 ? "Create New " : "Edit ";
      let sub = this.editedData.menu_url == "divider" ? " Divider" : " SubMenu";
      return title + sub;
    }
  },
  methods: {
    validationForm() {
      // console.log("am i in validation ??");
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
        .dispatch("saveSubMenuData", item)
        .then(function(data) {
          self.$store.dispatch("searchSubmenuData", self.searchParam);
        })
        .catch(function(error) {
          self.$store.dispatch("searchSubmenuData", self.searchParam);
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editSubMenuData", item)
        .then(function(data) {
          self.$store.dispatch("searchSubmenuData", self.searchParam);
        })
        .catch(function(error) {
          self.$store.dispatch("searchSubmenuData", self.searchParam);
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_SUBMENU_SCHEMA_DATA");
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
