/* eslint-disable no-unused-vars */
<template>
  <v-dialog v-model="dialog" max-width="500px">
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
      <v-card-text>
        <v-form>
          <v-text-field
            name="fee_title"
            label="Fee Title"
            v-model="getSchema.fee_title"
            v-validate="'required'"
            :error-messages="errors.collect('fee_title')"
            data-vv-name="fee_title"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-select
            v-model="getSchema.fee_type"
            :items="getExamFeeType"
            item-text="text"
            item-value="text"
            label="Select Fee Type"
            prepend-icon="subject"
          ></v-select>
          <v-text-field
            name="credit"
            label="Paper Credit"
            v-model="getSchema.credit"
            :error-messages="errors.collect('credit')"
            data-vv-name="credit"
            required
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            name="amount"
            label="Fee Amount"
            v-model="getSchema.amount"
            v-validate="'required'"
            :error-messages="errors.collect('amount')"
            data-vv-name="amount"
            required
            prepend-icon="edit"
          ></v-text-field>

          <v-checkbox
            v-model="getSchema.status"
            label="Active"
            type="checkbox"
            color="indigo darken-3"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}</v-btn
          >
          <!-- <v-btn color="error  white--text" @click="clear">Reset</v-btn> -->
        </v-layout>
      </v-card-actions>
      <!-- <pre>{{getSchema}}</pre> -->
      <!-- <pre>{{editedData}}</pre> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogStatus", "editedData", "indexEdited"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    editedStatus: false
  }),

  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_EXAM_FEE_HEAD_SCHEMA", this.editedData);
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getExamFeeType() {
      return this.$store.getters.getExamFeeType;
    },
    getSchema() {
      return this.$store.getters.setExamFeeHeadData;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" : "Update";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create Exam Fee Head"
        : "Edit Exam Fee Head";
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
      this.$store
        .dispatch("saveCoreExamFeeHead", item)
        .then(function() {
          try {
            self.close();
            // self.$store.dispatch("fetchCPaperTypeList");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          //   self.$store.dispatch("fetchCPaperTypeList");
        })
        .then(() => {
          self.$store.dispatch("fetchCoreExamFeeHeadList");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("updateCoreExamFeeHead", item)
        .then(function() {
          self.close();
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(() => {
          self.$store.dispatch("fetchCoreExamFeeHeadList");
        });
    },
    clear() {
      this.$validator.reset();
    },
    close() {
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    }
  }
};
</script>

<style scoped></style>
