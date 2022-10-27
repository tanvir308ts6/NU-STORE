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
              <!-- <v-text-field
                name="script_qty"
                label="Script quantity"
                v-model="getSchema.script_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('script_qty')"
                data-vv-name="script_qty"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-text-field
                name="loose_qty"
                label="Loose quantity"
                v-model="getSchema.loose_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('loose_qty')"
                data-vv-name="loose_qty"
                required
                prepend-icon="edit"
              ></v-text-field>
              <v-flex xs12>
                     <v-autocomplete
                  :disabled="this.indexEdited === -1 ? true : false"
                  label="Select Exam Name"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  v-model="getSchema.exam_id"
                  :items="getExamList"
                  prepend-icon="edit"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_id')"
                  data-vv-name="exam_id"
                  required
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_id = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{
                        "(" + data.item.code + ") " + data.item.title
                      }}</v-chip
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

              </v-flex>
              <v-flex xs12>
                <div v-if="adminStatus">
                  <v-autocomplete
                    label="Select Center"
                    item-text="center_name"
                    item-value="center_code"
                    v-model="getSchema.center_id"
                    :items="getCenterList"
                    v-validate="'required'"
                    :error-messages="errors.collect('center_id')"
                    data-vv-name="center_id"
                    required
                    prepend-icon="edit"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="getSchema.center_id = ''"
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
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  label="Select Regional Center"
                  item-text="center_name"
                  item-value="regional_center_code"
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
              </v-flex>

              <v-flex xs12>
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

                  <v-date-picker
                    v-model="getSchema.date"
                    no-title
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-textarea
                v-model="getSchema.comments"
                auto-grow
                label="Comments"
                name="comments"
                rows="1"
                prepend-icon="edit"
              ></v-textarea>-->

              <!-- new requirement after api -->
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    name="main_quantity"
                    label="Main Quantity"
                    v-model="getSchema.main_quantity"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('main_quantity')"
                    data-vv-name="main_quantity"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="main_packet_size"
                    label="Main Packet Size"
                    v-model="getSchema.main_packet_size"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('main_packet_size')"
                    data-vv-name="main_packet_size"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="extra_quantity"
                    label="Extra Quantity"
                    v-model="getSchema.extra_quantity"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('extra_quantity')"
                    data-vv-name="extra_quantity"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="extra_packet_size"
                    label="Extra Packet Size"
                    v-model="getSchema.extra_packet_size"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('extra_packet_size')"
                    data-vv-name="extra_packet_size"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    name="total_packet"
                    label="Total Packet"
                    v-model="getSchema.total_packet"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('total_packet')"
                    data-vv-name="total_packet"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-autocomplete
                    label="Select Regional Center"
                    item-text="center_name"
                    item-value="regional_center_code"
                    v-model="getSchema.reg_center_code"
                    :items="getRegCenList"
                    v-validate="'required'"
                    :error-messages="errors.collect('reg_center_code')"
                    data-vv-name="reg_center_code"
                    required
                    prepend-icon="edit"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="getSchema.reg_center_code = ''"
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
                </v-flex>

                <v-flex xs12>
                  <v-autocomplete
                    disabled
                    v-model="getSchema.exam_code"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    :items="getExamList"
                    menu-props="auto"
                    label="Select Exam"
                    hide-details
                    v-validate="'required'"
                    :error-messages="errors.collect('exam')"
                    data-vv-name="exam"
                    name="exam"
                    required
                    prepend-icon="subject"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="getSchema.exam_code = ''"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{ "(" + data.item.code + ") " + data.item.title }}
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
                            v-html="
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    class="mt-3 ml-2 mr-2"
                    v-model="getSchema.year"
                    :items="getYearList"
                    color="primary"
                    label="Select Year"
                    :item-text="item => item.year"
                    item-value="code"
                    prepend-icon="calendar_today"
                    disabled
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        color="grey lighten-4"
                        close
                        @input="getSchema.year = ''"
                        :selected="data.selected"
                      >
                        <span class="subheading">{{ data.item.year }}</span>
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
                            v-html="data.item.year"
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>

                <v-flex xs12>
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
                    <v-date-picker
                      v-model="getSchema.date"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-text-field
                  name="comment"
                  label="Comments"
                  v-model="getSchema.comment"
                  :error-messages="errors.collect('comment')"
                  data-vv-name="comment"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-layout>
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
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";
export default {
  mixins: [commonFun, commonGet, watchMixin],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    adminStatus: false,

    dictionary: {
      custom: {
        extra_quantity: {
          required: () => "Extra quantity field can not be empty.",
          numeric: "Extra quantity field may only contain numeric characters."
        },
        main_packet_size: {
          required: () => "Main packet size field can not be empty.",
          numeric: "Main packet size field may only contain numeric characters."
        },
        main_quantity: {
          required: () => "Main quantity field can not be empty.",
          numeric: "Main quantity field may only contain numeric characters."
        },
        extra_packet_size: {
          required: () => "Extra packet size field can not be empty.",
          numeric:
            "Extra packet size field may only contain numeric characters."
        },
        total_packet: {
          required: () => "Total packet field can not be empty.",
          numeric: "Total packet field may only contain numeric characters."
        },
        date: {
          required: () => "Date can not be empty."
        },
        reg_center_code: {
          required: () => "Select Regional Center."
        },

        exam_code: {
          required: () => "Select Exam."
        }
      }
    }
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000
    };
    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData", limit);
    }

    this.$store.dispatch("fetchRegCenterData", limit);
    this.$store.dispatch("fetchCenterData", limit);
    this.checkAdminStatus(this.getUserType());
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifFormSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_LS_DIST_TO_REG_SCHEMA", this.editedData);
      console.log("dialog edit itrm", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getCenLsDistToRegSchema;
    },
    getItemList() {
      return this.$store.getters.getCenLsDistToRegDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Loose Script Distribution To Reg ..."
        : "Edit Loose Script Distribution To Reg ";
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
      let self = this;

      var user_type = this.getUserType();
      console.log("type found ", user_type);
      if (user_type == "Center") {
        console.log("type get ", user_type);
        this.getSchema.center_id = this.getCenterCode();
        console.log("center id  ", this.getCenterCode());
      }
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.user_id = this.getAuthUserID;
      let item = this.getSchema;
      this.$store
        .dispatch("saveCenLsDistToRegData", item)
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
        .dispatch("editCenLsDistToRegData", item)
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
      this.$store.commit("UNSET_LS_DIST_TO_REG_SCHEMA");
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
