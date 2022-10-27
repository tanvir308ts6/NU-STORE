<template>
  <div class="form">
    <!--     <v-dialog v-model="dialog" max-width="600px" persistent> -->
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
            <!-- {{getCenManualAbsentEntrySchema.manual_reported}} -->
            <v-text-field
              name="manual_absent"
              label="Manual Absent"
              v-model="getCenManualAbsentEntrySchema.manual_absent"
              v-validate="'required'"
              :error-messages="errors.collect('manual_absent')"
              data-vv-name="manual_absent"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="manual_reported"
              label="Manual Reported"
              v-model="getCenManualAbsentEntrySchema.manual_reported"
              v-validate="'required'"
              :error-messages="errors.collect('manual_reported')"
              data-vv-name="manual_reported"
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
    "searchCenManualAbsEntryList",
    "searchParam",
  ],
  data: () => ({
    loading: false,
    errorStatus: false,
    errorMsg: "",
    dialog: false,
    editedStatus: false,
    dictionary: {
      custom: {
        manual_absent: {
          required: () => "Manual Absent field can not be empty",
        },
        manual_reported: {
          required: () => "Manual Reported field can not be empty",
        },
      },
    },
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    console.log(this.dialogStatus);
    this.searchCenManualAbsEntryList();
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.setCenManualAbsEntrySchema();
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getCenManualAbsentEntrySchema() {
      return this.$store.getters.getCenManualAbsentEntrySchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Result Type"
        : "Edit Result Type ";
    },
  },
  methods: {
    setCenManualAbsEntrySchema() {
      var item = Object.assign({}, this.editedData);
      this.$store.commit("SET_MANUAL_ABSENT_ENTRY_SCHEMA", item);
    },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.getCenManualAbsentEntrySchema.id == null ? this.save() : this.edit();
        }
      });
    },
    save() {
      var self = this;
      var item = this.getCenManualAbsentEntrySchema;
      console.log(item);
      this.$store
        .dispatch("saveCenManualAbsentEntryData", item)
        .then(function() {
          self.close();
          self.searchCenManualAbsEntryList();
        });
    },
    edit() {
      var self = this;
      var item = this.getCenManualAbsentEntrySchema;
      this.$store
        .dispatch("editCenManualAbsentEntryData", item)
        .then(function() {
          self.close();
          self.searchCenManualAbsEntryList();
        })
        .catch(function(error) {
          console.log(error);
          self.searchCenManualAbsEntryList();
        });
    },
    clear() {
      this.errorStatus = false;
      this.errorMsg = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_MANUAL_ABSENT_ENTRY_SCHEMA");
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
