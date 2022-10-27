<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-flex xs12>
                <!-- <v-autocomplete
                label="Select User"
                :item-text="item => '(' + item.username + ') ' + item.email"
                item-value="id"
                v-model="getSchema.user_id"
                :items="users"
                v-validate="'required'"
                :error-messages="errors.collect('user_id')"
                data-vv-name="user_id"
                required
                prepend-icon="edit"
              >
                <template v-slot:selection="data">
                  <v-chip
                    close
                    @input="getSchema.user_id = ''"
                    :selected="data.selected"
                    class="chip--select-multi"
                  >{{ '(' + data.item.username + ') ' + data.item.email }}</v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="'(' + data.item.username + ') ' + data.item.email"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
                </v-autocomplete>-->
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  label="Select Role"
                  item-text="role_name"
                  item-value="id"
                  v-model="getSchema.role_id"
                  :items="getRoleList"
                  :change="getSelectedRole(getSchema.role_id)"
                  v-validate="'required'"
                  :error-messages="errors.collect('role_id')"
                  data-vv-name="role_id"
                  required
                  prepend-icon="edit"
                  chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.role_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.role_name }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.role_name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  class="ma-2"
                  v-model="getSchema.exam_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  item-value="code"
                  :items="getExamList"
                  menu-props="auto"
                  label="Select Exam"
                  hide-details
                  name="exam"
                  prepend-icon="edit"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html=" data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="dateMenu1"
                  v-model="dateMenu1"
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
                      v-model="getSchema.start_date"
                      label="Start Date"
                      hint="MM-DD-YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('start_date')"
                      data-vv-name="start_date"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker v-model="getSchema.start_date" no-title @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="dateMenu2"
                  v-model="dateMenu2"
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
                      v-model="getSchema.end_date"
                      label="End Date"
                      hint="MM-DD-YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      v-validate="'required'"
                      :error-messages="errors.collect('end_date')"
                      data-vv-name="end_date"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker v-model="getSchema.end_date" no-title @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-checkbox v-model="status" class="mx-2" label="Active" prepend-icon="edit"></v-checkbox>
              </v-flex>
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
    </v-dialog>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new",
  },
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu1: false,
    dateMenu2: false,

    status: true,
    users: [],
    roles: [],
    roleId: [],

    dictionary: {
      custom: {
        user_id: {
          required: () => "Users can not be empty.",
        },
        role_id: {
          required: () => "Role Name can not be empty.",
        },
        start_date: {
          required: () => "Start Date can not be empty.",
        },
        end_date: {
          required: () => "End Date can not be empty.",
        },
      },
    },
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };
    this.$store.dispatch("callRoleGrantData", limit);
    this.$store.dispatch("callRoleData", limit);
    //this.$store.dispatch("fetchUserData", limit);
    //exam
    if (this.$store.getters.getExamItem.length < 1) {
      console.log("----> ");
      this.$store.dispatch("fetchExamData", limit);
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_ROLE_GRANT_SCHEMA", this.editedData);
      //this.users = this.$store.getters.getUserDataList;
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getSchema() {
      return this.$store.getters.getRoleGrantSchema;
    },
    getRoleSchema() {
      return this.$store.getters.getRoleId;
    },
    getItemList() {
      return this.$store.getters.getRegBsCollFromNuDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1 ? "Role Grant" : "Edit Role Grant";
    },
    // error_msg() {
    //   return this.$store.getters.getMessage;
    // },

    // Exam
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    // role
    getRoleList() {
      return this.$store.getters.getRoleList;
    },
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    getSelectedRole(roles) {
      console.log("select", roles);
    },
    getUserRoleId(user) {
      console.log("user", user);
      this.$store.dispatch("getUserWiseRoleList", user);
    },
    onChange() {
      console.log("value");
    },
    // regCen(val) {
    //   console.log("val....>", val);
    //   return val;
    // },
    save() {
      let self = this;
      let item = this.getSchema;
      console.log(this.getSchema);
      this.$store
        .dispatch("saveRoleGrantData", item)
        .then(function (data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            // self.$emit("update:snackbar", true);
            //self.$store.dispatch("callRoleGrantData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("callRoleGrantData");
        });
    },

    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editRoleGrantData", item)
        .then(function (data) {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("callRoleGrantData");
          // self.$emit("update:snackbar", true);
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("callRoleGrantData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });

      this.$store.commit("UNSET_ROLE_GRANT_SCHEMA");
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
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
