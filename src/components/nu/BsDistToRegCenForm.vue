<template>
  <div class="form">
    <!-- {{getSchema}} -->
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
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
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
                    @change="onFilePicked1($event)"
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
                    @change="onFilePicked2($event)"
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
                    @click="onFilePicked($event)"
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
import common_login_getters from "../../mixin/common_login_getters";
export default {
  mixins: [commonFun, commonGet, common_login_getters],
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "snackbar", "loadData"],
  data: () => ({
    main: 0,
    extra: 0,
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    BsDistToRegCenList: [],
    exams: [],
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
    this.$store.dispatch("callBsDistToRegCenData", limit);
    this.$store.dispatch("callRegionalCenterData", limit);
    this.$store.dispatch("fetchRegCenterData");

    if (this.$store.getters.getExamItem.length < 1) {
      console.log("ssdsdsd");
      this.$store.dispatch("fetchExamData");
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifFormSchema = true;
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_BS_DIST_TO_RC_SCHEMA", this.editedData);
      this.exams = this.$store.getters.getExamItem;
    },
    dialog(val) {
      if (!val) this.close();
    },
    onFilePicked1(e) {
      console.log("wtch", e);
      this.onFilePicked(e);
    },
    onFilePicked2(e) {
      this.onFilePicked(e);
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getBsDistToRCSchema;
    },
    getItemList() {
      return this.$store.getters.getRegBsCollFromNuDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Send" : "Send";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Blank Script Distribution to RC"
        : "Edit Blank Script Distribution to RC";
    },
    getRegCenData() {
      return this.$store.getters.getRegionalCentertItem;
    }
    // error_msg() {
    //   return this.$store.getters.getMessage;
    // },
  },
  methods: {
    onFilePicked1(e) {
      console.log("1", e);
      this.main = e;
    },
    onFilePicked2(e) {
      console.log("2", e);
      this.extra = e;
    },
    onFilePicked(e) {
      console.log("total", e);
      var total = +this.main + +this.extra;
      return (this.getSchema.total_packet = total);
    },
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
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.user_id = this.getAuthUserID;
      let item = this.getSchema;

      this.$store
        .dispatch("saveRegBsCollFromNuData", item)
        .then(function() {
          try {
            self.close();
            self.$emit("update:loadData", true);
            //self.$store.dispatch("callBsDistToRegCenData", limit);
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$emit("update:loadData", true);
          //self.$store.dispatch("callBsDistToRegCenData", limit);
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editBsDistToRegCenData", item)
        .then(function() {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("callBsDistToRegCenData");
          // self.$emit("update:snackbar", true);
        })
        .catch(function(error) {
          console.log(error);
          self.$emit("update:loadData", true);
          //self.$store.dispatch("callBsDistToRegCenData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$store.commit("UNSET_BS_DIST_TO_RC_SCHEMA");
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
