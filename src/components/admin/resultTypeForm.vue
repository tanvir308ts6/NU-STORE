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
            <v-text-field
              name="result_type_name"
              label="Result Type Name"
              v-model="getResultTypeSchema.result_type_name"
              v-validate="'required'"
              :error-messages="errors.collect('result_type_name')"
              data-vv-name="result_type_name"
              required
              prepend-icon="edit"
            ></v-text-field>

            <v-text-field
              name="result_type"
              label="Result Type"
              v-model="getResultTypeSchema.result_type"
              v-validate="'required'"
              :error-messages="errors.collect('result_type')"
              data-vv-name="result_type"
              required
              prepend-icon="edit"
            ></v-text-field>

            <v-checkbox
              v-model="getResultTypeSchema.status"
              label="Status"
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
    "searchResultTypeList",
    "searchParam",
  ],
  data: () => ({
    loading: false,
    user_step: 1,
    errorStatus: false,
    errorMsg: "",
    dialog: false,
    editedStatus: false,
    dictionary: {
      custom: {
        status: {
          required: () => "Status field can not be empty",
        },
        result_type: {
          required: () => "Result Type field can not be empty",
        },
        result_type_name: {
          required: () => "Result Type Name field can not be empty",
        },
      },
    },
  }),
  created() {
    this.$store.commit("UNSET_FORMNOTIFY");
    console.log(this.dialogStatus);
    this.searchResultTypeList();
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.user_step = 1;
      this.setResultTypeSchema();
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
    getResultTypeSchema() {
      return this.$store.getters.getResultTypeSchema;
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
    setResultTypeSchema() {
      var item = Object.assign({}, this.editedData);
      this.$store.commit("SET_RESULT_TYPE_SCHEMA", item);
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
      var item = this.getResultTypeSchema;
      item.exam_year = this.searchParam.exam_year;
      item.exam_code = this.searchParam.exam_code;

      console.log(item);
      this.$store.dispatch("saveResultTypeData", item).then(function() {
        self.close();
        self.searchResultTypeList();
      });
    },
    edit() {
      var self = this;
      var item = this.getResultTypeSchema;

      this.$store
        .dispatch("editResultTypeData", item)
        .then(function() {
          self.close();
          self.searchResultTypeList();
        })
        .catch(function(error) {
          console.log(error);
          self.searchResultTypeList();
        });
    },
    clear() {
      this.errorStatus = false;
      this.errorMsg = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_RESULT_TYPE_SCHEMA");
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
