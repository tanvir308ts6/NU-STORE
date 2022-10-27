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
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    :disabled="true"
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
                <!-- <v-text-field
                :disabled="true"
                name="script_qty"
                label="Script quantity"
                v-model="getSchema.script_qty"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('script_qty')"
                data-vv-name="script_qty"
                required
                prepend-icon="edit"
                ></v-text-field>-->
                <v-flex xs6>
                  <v-text-field
                    :disabled="true"
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
                <!-- <v-flex xs6>
                  <v-text-field
                    :disabled="true"
                    name="extra_quantity"
                    label="Extra Quantity"
                    v-model="getSchema.extra_quantity"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('extra_quantity')"
                    data-vv-name="extra_quantity"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>-->
                <!-- <v-flex xs6>
                  <v-text-field
                    :disabled="true"
                    name="extra_packet_size"
                    label="Extra Packet Size"
                    v-model="getSchema.extra_packet_size"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('extra_packet_size')"
                    data-vv-name="extra_packet_size"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>-->
                <v-flex xs12>
                  <v-text-field
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                  <v-menu
                    :disabled="true"
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
                        :disabled="true"
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
                      :disabled="true"
                      v-model="getSchema.date"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="getSchema.comment"
                    auto-grow
                    label="Comments"
                    name="comments"
                    rows="1"
                    prepend-icon="edit"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              :disabled="editedData.status == 2 ? false : true"
              color="primary  white--text"
              @click.stop.prevent="validationForm()"
              >{{ buttonTitle }}</v-btn
            >
            <!-- <v-btn color="primary  white--text" @click="clear">Reset</v-btn> -->
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
export default {
  mixins: [commonGet],
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
    "searchAnswerScriptList"
  ],
  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    // exams: [],
    // regionalCenters: [],
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
        // script_qty: {
        //   required: () => "Script quantity field can not be empty.",
        //   numeric: "Script quantity field may only contain numeric characters."
        // },
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
    this.$store.dispatch("fetchRegCenterData");
    this.$store.dispatch("fetchExamData");
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_NU_AS_COLL_FROM_REG_SCHEMA", this.editedData);
      //this.regionalCenters = this.$store.getters.getRegCenterItems;
      //this.exams = this.$store.getters.getExamItem;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getNuAsCollFromRCSchema;
    },
    getItemList() {
      return this.$store.getters.getNuAsDistToRCDataList;
    },
    buttonTitle() {
      return this.editedData.status == 2 ? "Receive" : "Received";
      //return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Ans Collection From RC"
        : "Receive Ans Collection From RC";
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
        .dispatch("saveNuAsCollFromRCData", item)
        .then(function() {
          try {
            self.close();
            self.searchAnswerScriptList();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.searchAnswerScriptList();
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editNuAsCollFromRCData", item)
        .then(function() {
          self.close();
          self.searchAnswerScriptList();
        })
        .catch(function(error) {
          console.log(error);
          self.searchAnswerScriptList();
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_NU_AS_COLL_FROM_REG_SCHEMA");
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
