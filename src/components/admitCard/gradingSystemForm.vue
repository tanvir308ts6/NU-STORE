<template>
  <div class="form">
    <!-- <v-dialog v-model="dialog" max-width="500px" persistent> -->
    <v-card>
      <!-- {{getSchema.regional_center_code}} -->
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
            v-if="!profileMode"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
        </v-card-title>
        <formNotification />
      </v-card>
      <v-card-text>
        <v-card flat>
          <v-form>
            <v-text-field
              name="mark_from"
              label="Mark From(>=)"
              v-model="getSchema.mark_from"
              v-validate="'required'"
              :error-messages="errors.collect('mark_from')"
              data-vv-name="mark_from"
              required
              prepend-icon="edit"
            ></v-text-field>

            <v-text-field
              name="mark_to"
              label="Mark To(<)"
              v-model="getSchema.mark_to"
              v-validate="'required'"
              :error-messages="errors.collect('mark_to')"
              data-vv-name="mark_to"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="grade_point_from"
              label="Grade Point From"
              v-model="getSchema.grade_point_from"
              v-validate="'required'"
              :error-messages="errors.collect('grade_point_from')"
              data-vv-name="grade_point_from"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="grade_point_to"
              label="Grade point To"
              v-model="getSchema.grade_point_to"
              v-validate="'required'"
              :error-messages="errors.collect('grade_point_to')"
              data-vv-name="grade_point_to"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="letter_grade"
              label="Letter Grade"
              v-model="getSchema.letter_grade"
              v-validate="'required'"
              :error-messages="errors.collect('letter_grade')"
              data-vv-name="letter_grade"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="grade_point"
              label="Grade Point"
              v-model="getSchema.grade_point"
              data-vv-name="grade_point"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="fail_letter_grade"
              label="Fail Letter Grade"
              v-model="getSchema.fail_letter_grade"
              data-vv-name="fail_letter_grade"
              required
              prepend-icon="edit"
            ></v-text-field>
            <v-text-field
              name="fail_grade_point"
              label="Fail Grade Point"
              v-model="getSchema.fail_grade_point"
              data-vv-name="fail_grade_point"
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
          >{{ buttonTitle }}</v-btn>
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
    <!-- </v-dialog> -->
  </div>
</template>
<script>
import formNotification from "@/components/utils/formNotification";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  mixins: [common_login_getters],
  props: [
    "dialogStatus",
    "editedData",
    "indexEdited",
    "profileMode",
    "loadData",
  ],
  data: () => ({
    dialog: false,

    editedStatus: false,
    examId: [],
    crediential: true,
    menu1: false,
    dictionary: {
      custom: {
        mark_from: {
          required: () => "Regional Center Name field can not be empty",
        },
        // college_code: {
        //   required: () => "College code field can not be empty"
        // },

        mark_to: {
          required: () => "Address field can not be empty",
        },

        grade_point_from: {
          required: () => "Phone field can not be empty",
        },
        grade_point_to: {
          required: () => "Email field can not be empty",
        },
        letter_grade: {
          required: () => "Mobile field can not be empty",
        },
        grade_point: {
          required: () => "Code field can not be empty",
        },
      },
    },
  }),

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_GRADINMG_SYSTEM_SCHEMA", this.editedData);
      
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  computed: {
   
    getSchema() {
      return this.$store.getters.getGradingSystemSchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New Grading System"
        : "Edit Grading System";
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
    save() {
      var self = this;
      var item = {
        mark_from: this.getSchema.mark_from,
        //college_code: this.getSchema.college_code,
        mark_to: this.getSchema.mark_to,
        grade_point_from: this.getSchema.grade_point_from,
        grade_point_to: this.getSchema.grade_point_to,
        letter_grade: this.getSchema.letter_grade,
        grade_point: this.getSchema.grade_point,
        fail_letter_grade: this.getSchema.fail_letter_grade,
        fail_grade_point: this.getSchema.fail_grade_point,
      };

      console.log("...");
      console.log(JSON.stringify(item));
      console.log("...");
      this.$store
        .dispatch("saveGradingSystemData", item)
        .then(function (data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            // self.$emit("update:snackbar", true);
            self.$store.dispatch("callGradingSystemData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          self.$store.dispatch("callGradingSystemData");
        });
    },
    edit() {
      var self = this;
      var item = {
        id: this.getSchema.id,
        mark_from: this.getSchema.mark_from,
        mark_to: this.getSchema.mark_to,
        grade_point_from: this.getSchema.grade_point_from,
        grade_point_to: this.getSchema.grade_point_to,
        letter_grade: this.getSchema.letter_grade,
        grade_point: this.getSchema.grade_point,
        fail_letter_grade: this.getSchema.fail_letter_grade,
        fail_grade_point: this.getSchema.fail_grade_point,
      };
      console.log(param);
      var param = {
        item: item,
        indexEdited: this.indexEdited,
      };

      this.$store
        .dispatch("editGradingSystemData", param)
        .then(function (data) {
          self.close();
          
          self.$store.dispatch("callGradingSystemData");
          //self.$emit("update:snackbar", true);
        })
        .catch(function (error) {
          console.log(error);
          self.$store.dispatch("callGradingSystemData");
        });
    },
 
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$store.commit("UNSET_GRADINMG_SYSTEM_SCHEMA");
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
</style>
