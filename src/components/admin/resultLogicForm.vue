<template>
  <div class="form">
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
      <v-progress-linear
        :indeterminate="true"
        v-if="loading"
      ></v-progress-linear>
      <formNotification />
      <v-card-text>
        <v-card flat class="pr-3 scroll">
          <v-alert
            :value="true"
            color="error"
            icon="warning"
            outline
            v-if="errorStatus"
            >{{ errorMsg }}</v-alert
          >
          <v-form>
            <v-autocomplete
              v-model="getResultLogicSchema.result_type_name"
              :item-text="
                (item) => item.result_type + ' - ' + item.result_type_name
              "
              item-value="result_type_name"
              :items="getResultTypeData"
              menu-props="auto"
              label="Select Result Type"
              hide-details
              prepend-icon="star"
              return-object
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="getResultLogicSchema.result_type_name = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                >
                  {{
                    data.item.result_type + " - " + data.item.result_type_name
                  }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        data.item.result_type +
                          ' - ' +
                          data.item.result_type_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="getResultLogicSchema.all_passed"
              :item-text="(item) => item.all_passed"
              item-value="value"
              :items="getPassedType"
              menu-props="auto"
              label="Pass Status"
              hide-details
              prepend-icon="check"
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="getResultLogicSchema.all_passed = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                >
                  {{ data.item.all_passed }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="data.item.all_passed"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;">Theory Passed Count status</strong>
              </p>
              <v-layout>
                <v-flex xs6 md6 lg6 sm6>
                  <v-select
                    label="Select applicable/Not applicable"
                    item-text="name"
                    item-value="value"
                    v-model="passed_count_st"
                    :items="getpassStatus"
                    v-validate="'required'"
                    :error-messages="errors.collect('passed_count')"
                    data-vv-name="passed_count"
                    prepend-icon="edit"
                    name="passed_count"
                  ></v-select>
                </v-flex>
                <v-flex xs6 md6 lg6 sm6>
                  <v-text-field
                    v-if="passed_count_st"
                    name="passed_count"
                    label="Theory Passed Count"
                    v-model="getResultLogicSchema.passed_count"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('passed_count')"
                    data-vv-name="passed_count"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;">Failed Count status</strong>
              </p>
              <v-layout>
                <v-flex xs6 md6 lg6 sm6>
                  <v-select
                    label="Select applicable/Not applicable"
                    item-text="name"
                    item-value="value"
                    v-model="failed_count_st"
                    :items="getfailStatus"
                    v-validate="'required'"
                    :error-messages="errors.collect('failed_count')"
                    data-vv-name="failed_count"
                    prepend-icon="edit"
                    name="failed_count"
                  ></v-select>
                </v-flex>
                <v-flex xs6 md6 lg6 sm6>
                  <v-text-field
                    v-if="failed_count_st"
                    name="failed_count"
                    label="Failed Count"
                    v-model="getResultLogicSchema.failed_count"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('failed_count')"
                    data-vv-name="failed_count"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;">Absent Count status</strong>
              </p>
              <v-layout>
                <v-flex xs6 md6 lg6 sm6>
                  <v-select
                    label="Select applicable/Not applicable"
                    item-text="name"
                    item-value="value"
                    v-model="absent_count_st"
                    :items="getabsentStatus"
                    v-validate="'required'"
                    :error-messages="errors.collect('absent_count')"
                    data-vv-name="absent_count"
                    prepend-icon="edit"
                    name="absent_count"
                  ></v-select>
                </v-flex>
                <v-flex xs6 md6 lg6 sm6>
                  <v-text-field
                    v-if="absent_count_st"
                    name="absent_count"
                    label="Absent Count"
                    v-model="getResultLogicSchema.absent_count"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('absent_count')"
                    data-vv-name="absent_count"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;">Reported status</strong>
              </p>
              <v-select
                label="Select applicable/Not applicable"
                item-text="name"
                item-value="value"
                v-model="is_reported_st"
                :items="getisReportedStatus"
                v-validate="'required'"
                :error-messages="errors.collect('is_reported')"
                data-vv-name="is_reported"
                prepend-icon="edit"
                name="is_reported"
              ></v-select>
              <!-- <v-text-field
                v-if="is_reported_st"
                name="is_reported"
                label="Is Reported"
                v-model="getResultLogicSchema.is_reported"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('is_reported')"
                data-vv-name="is_reported"
                required
                prepend-icon="edit"
              ></v-text-field> -->
            </v-flex>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;">Withheld status</strong>
              </p>
              <v-select
                label="Select applicable/Not applicable"
                item-text="name"
                item-value="value"
                v-model="is_withheld_st"
                :items="getisReportedStatus"
                v-validate="'required'"
                :error-messages="errors.collect('is_withheld')"
                data-vv-name="is_withheld"
                prepend-icon="edit"
                name="is_withheld"
              ></v-select>
              <!-- <v-text-field
                v-if="is_withheld_st"
                name="is_withheld"
                label="Is Withheld"
                v-model="getResultLogicSchema.is_withheld"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('is_withheld')"
                data-vv-name="is_withheld"
                required
                prepend-icon="edit"
              ></v-text-field> -->
            </v-flex>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;"
                  >Incourse withheld status</strong
                >
              </p>
              <v-select
                label="Select applicable/Not applicable"
                item-text="name"
                item-value="value"
                v-model="is_incourse_withheld_st"
                :items="getisReportedStatus"
                v-validate="'required'"
                :error-messages="errors.collect('is_incourse_withheld')"
                data-vv-name="is_incourse_withheld"
                prepend-icon="edit"
                name="is_incourse_withheld"
              ></v-select>
              <!-- <v-text-field
                v-if="is_incourse_withheld_st"
                name="is_incourse_withheld"
                label="Is Incourse Withheld"
                v-model="getResultLogicSchema.is_incourse_withheld"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('is_incourse_withheld')"
                data-vv-name="is_incourse_withheld"
                required
                prepend-icon="edit"
              ></v-text-field> -->
            </v-flex>
            <v-flex xs12 md12 lg12 sm12>
              <p class="mt-4">
                <strong style="font-size:18px;">Cancel status</strong>
              </p>
              <v-select
                label="Select applicable/Not applicable"
                item-text="name"
                item-value="value"
                v-model="is_cancel_st"
                :items="getisCancelledStatus"
                v-validate="'required'"
                :error-messages="errors.collect('is_cancelled')"
                data-vv-name="is_cancelled"
                prepend-icon="edit"
                name="is_cancelled"
              ></v-select>
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
            >{{ buttonTitle }}</v-btn
          >
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import formNotification from "@/components/utils/formNotification";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
export default {
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
    commonGet,
    commonExamYear,
    common_login_getters,
  },
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "searchResultLogicList",
    "searchParam",
  ],
  data: () => ({
    is_cancel_st: "",
    is_incourse_withheld_st: "",
    is_withheld_st: "",
    is_reported_st: "",
    absent_count_st: "",
    passed_count_st: "",
    failed_count_st: "",
    loading: false,
    user_step: 1,
    errorStatus: false,
    errorMsg: "",
    dialog: false,
    editedStatus: false,
    dictionary: {
      custom: {
        is_cancelled: {
          required: () => "Cancelled status field can not be empty",
        },
        is_incourse_withheld: {
          required: () => "Incourse withheld status field can not be empty",
        },
        is_withheld: {
          required: () => "Withheld status field can not be empty",
        },
        is_reported: {
          max: () =>
            "Reported status field may not be greater than 30 characters",
        },
        absent_count: {
          required: () => "Absent count field can not be empty",
          numeric: () =>
            "Absent count field may only contain numeric characters",
        },
        failed_count: {
          required: () => "Failed count field can not be empty",
          numeric: "Failed count field may only contain numeric characters",
        },
        passed_count: {
          required: () => "Passed count field can not be empty",
          numeric: "Passed count field may only contain numeric characters",
        },
        all_passed: {
          required: () => "Passed status field can not be empty",
        },
        result_type_name: {
          required: () => "Result Type field can not be empty",
        },
      },
    },
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    console.log(this.dialogStatus);
    //district
    if (!this.$store.getters.getResultTypeData.length) {
      // console.log("----> ");
      this.$store.dispatch("searchResultTypeData");
    }
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.user_step = 1;
      this.setResultLogicSchema();
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getResultLogicSchema() {
      return this.$store.getters.getResultLogicSchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Result Logic"
        : "Edit Result Logic ";
    },
    //district
    getResultTypeData() {
      return this.$store.getters.getResultTypeData;
    },
    getPassedType() {
      return [
        { all_passed: "All", value: "1" },
        { all_passed: "Not All", value: "0" },
      ];
    },
    getpassStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
    getfailStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
    getabsentStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
    getisReportedStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
    getisWithheldStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
    getisIncourseWithheldStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
    getisCancelledStatus() {
      return [
        { name: "Applicable", value: true },
        { name: "Not Applicable", value: false },
      ];
    },
  },
  methods: {
    setResultLogicSchema() {
      var item = Object.assign({}, this.editedData);
      this.$store.commit("SET_RESULT_LOGIC_SCHEMA", item);

      if (this.indexEdited > -1) {
        console.log("this.indexEdited", this.indexEdited);
        if (item.is_incourse_withheld == null) {
          this.is_incourse_withheld_st = false;
        } else {
          this.is_incourse_withheld_st = true;
        }

        if (item.is_withheld == null) {
          this.is_withheld_st = false;
        } else {
          this.is_withheld_st = true;
        }

        if (item.is_reported == null) {
          this.is_reported_st = false;
        } else {
          this.is_reported_st = true;
        }

        if (item.is_cancelled == null) {
          this.is_cancel_st = false;
        } else {
          this.is_cancel_st = true;
        }

        if (item.absent_count == null) {
          this.absent_count_st = false;
        } else {
          this.absent_count_st = true;
        }
        if (item.passed_count == null) {
         // console.log("here", item.passed_count);
          this.passed_count_st = false;
        } else {
          this.passed_count_st = true;
        }

        if (item.failed_count == null) {
          this.failed_count_st = false;
        } else {
          this.failed_count_st = true;
        }
      }
    },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    save() {
      var self = this;
      var item = this.getResultLogicSchema;
      item.exam_year = this.searchParam.exam_year;
      item.exam_code = this.searchParam.exam_code;
      item.exam_initiate_id = this.searchParam.exam_initiate_id;
      item.result_type = this.getResultLogicSchema.result_type_name.result_type;
      item.result_type_name = this.getResultLogicSchema.result_type_name.result_type_name;

      if (!this.is_incourse_withheld_st) {
        item.is_incourse_withheld = null;
      } else {
        item.is_incourse_withheld = 1;
      }
      if (!this.is_withheld_st) {
        item.is_withheld = null;
      } else {
        item.is_withheld = 1;
      }
      if (!this.is_reported_st) {
        item.is_reported = null;
      } else {
        item.is_reported = 1;
      }
      if (!this.is_cancel_st) {
        item.is_cancelled = null;
      } else {
        item.is_cancelled = 1;
      }
      if (!this.absent_count_st) {
        item.absent_count = null;
      }
      if (!this.passed_count_st) {
        item.passed_count = null;
      }
      if (!this.failed_count_st) {
        item.failed_count = null;
      }
      console.log(item);
      this.$store.dispatch("saveResultLogicData", item).then(function() {
        self.close();
        self.searchResultLogicList();
      });
    },
    edit() {
      var self = this;
      var item = this.getResultLogicSchema;
      item.result_type = this.getResultLogicSchema.result_type_name.result_type;
      item.result_type_name = this.getResultLogicSchema.result_type_name.result_type_name;

      if (!this.is_incourse_withheld_st) {
        item.is_incourse_withheld = null;
      } else {
        item.is_incourse_withheld = 1;
      }
      if (!this.is_withheld_st) {
        item.is_withheld = null;
      } else {
        item.is_withheld = 1;
      }
      if (!this.is_reported_st) {
        item.is_reported = null;
      } else {
        item.is_reported = 1;
      }
      if (!this.is_cancel_st) {
        item.is_cancelled = null;
      } else {
        item.is_cancelled = 1;
      }
      if (!this.absent_count_st) {
        item.absent_count = null;
      }
       if(!this.passed_count_st){
         item.passed_count = null;
       }
      if (!this.failed_count_st) {
        item.failed_count = null;
      }

      this.$store
        .dispatch("editResultLogicData", item)
        .then(function() {
          self.close();
          self.searchResultLogicList();
        })
        .catch(function(error) {
          console.log(error);
          self.searchResultLogicList();
        });
    },
    clear() {
      this.errorStatus = false;
      this.errorMsg = "";
      this.is_incourse_withheld_st = "";
      this.is_withheld_st = "";
      this.is_reported_st = "";
      this.passed_count_st = "";
      this.failed_count_st = "";
      this.absent_count_st = "";
      this.is_cancel_st = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_RESULT_LOGIC_SCHEMA");
      this.$validator.reset();
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
@media (min-width: 576px) {
  .form-card-size {
    max-width: 5px;
    /* width: 500px; */
  }
}
@media (min-width: 768px) {
  .form-card-size {
    max-width: 60px;
  }
}

@media (min-width: 992px) {
  .form-card-size {
    max-width: 120px;
  }
}

@media (min-width: 1200px) {
  .form-card-size {
    max-width: 300px;
  }
}
</style>
