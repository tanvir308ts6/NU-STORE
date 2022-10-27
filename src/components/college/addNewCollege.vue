<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New College</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-flex xs12 md10 offset-md1>
            <v-card>
              <v-form ref="form">
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-select
                        v-model="getSchema.division"
                        v-validate="'required'"
                        item-text="division_name"
                        item-value="division_id"
                        :items="getDivisions"
                        :error-messages="errors.collect('division')"
                        label="Division *"
                        data-vv-name="division"
                        @change="getDistrictData"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-select
                        v-model="getSchema.district"
                        v-validate="'required'"
                        item-text="district_name"
                        item-value="district_id"
                        :items="getDistricts"
                        :error-messages="errors.collect('district')"
                        label="District *"
                        data-vv-name="district"
                        @change="getThanaData"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-select
                        v-model="getSchema.thana"
                        v-validate="'required'"
                        item-text="thana_name"
                        item-value="thana_id"
                        :items="getThanas"
                        :error-messages="errors.collect('thana')"
                        label="Thana *"
                        data-vv-name="thana"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.college_code"
                        v-validate="'required|min:4|max:4'"
                        :error-messages="errors.collect('code')"
                        label="College Code *"
                        data-vv-name="code"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.college_eiin"
                        v-validate="'required|min:6|max:6'"
                        :error-messages="errors.collect('eiin')"
                        label="EIIN NO *"
                        data-vv-name="eiin"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.ac_session"
                        v-validate="'required|max:9'"
                        :error-messages="errors.collect('session')"
                        label="Academic Session *"
                        data-vv-name="session"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-text-field
                        v-model="getSchema.college_name"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        label="College Name *"
                        data-vv-name="name"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-text-field
                        v-model="getSchema.email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        label="Email *"
                        data-vv-name="email"
                        type="email"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.mobile"
                        v-validate="'required|min:11|max:11'"
                        :error-messages="errors.collect('mobile')"
                        label="Mobile *"
                        data-vv-name="mobile"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.phone"
                        v-validate="'max:30'"
                        :error-messages="errors.collect('phone')"
                        label="Phone"
                        data-vv-name="phone"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.fax"
                        v-validate="'max:30'"
                        :error-messages="errors.collect('fax')"
                        label="FAX"
                        data-vv-name="fax"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-text-field
                        v-model="getSchema.password"
                        v-validate="'required'"
                        :error-messages="errors.collect('password')"
                        label="Password *"
                        data-vv-name="password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-text-field
                        v-model="getSchema.web"
                        label="Website"
                        data-vv-name="web"
                        type="url"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-select
                        v-model="getSchema.college_type"
                        v-validate="'required'"
                        item-text="college_type"
                        item-value="id"
                        :items="getCollegeType"
                        :error-messages="errors.collect('type')"
                        label="College Type *"
                        data-vv-name="type"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-select
                        v-model="getSchema.mgt_type"
                        v-validate="'required'"
                        item-text="mgt_type"
                        item-value="id"
                        :items="getMgtType"
                        :error-messages="errors.collect('management')"
                        label="Management Type *"
                        data-vv-name="management"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm12>
                      <v-text-field
                        v-model="getSchema.address"
                        v-validate="'required'"
                        :error-messages="errors.collect('address')"
                        label="Address *"
                        data-vv-name="address"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.post_code"
                        v-validate="'required'"
                        :error-messages="errors.collect('postCode')"
                        label="Post Code *"
                        data-vv-name="postCode"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.latitude"
                        label="Latitude"
                        data-vv-name="latitude"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4>
                      <v-text-field
                        v-model="getSchema.longitude"
                        label="Longitude"
                        data-vv-name="longitude"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <div class="justify-center layout px-0">
                    <v-btn color="success" @click="submit">Save</v-btn>
                    <v-btn color="error" @click="close">Close</v-btn>
                  </div>
                </v-container>
              </v-form>
            </v-card>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

export default {
  props: ["dialogStatus", "snackbar"],

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false
  }),

  computed: {
    getSchema() {
      return this.$store.getters.setFormData;
    },

    getDivisions() {
      return this.$store.getters.getDivision;
    },
    getDistricts() {
      return this.$store.getters.getDistrict;
    },
    getThanas() {
      return this.$store.getters.getThana;
    },
    getCollegeType() {
      return this.$store.getters.getCollegeTypes;
    },
    getMgtType() {
      return this.$store.getters.getMgtTypes;
    }
  },

  methods: {
    // get district data by division id
    getDistrictData(division_id) {
      if (division_id) {
        this.$store.dispatch("fetchDistricts", division_id);
      }
    },
    // get thana data by district id
    getThanaData(district_id) {
      if (district_id) {
        this.$store.dispatch("fetchThanas", district_id);
      }
    },

    submit() {
      let self = this;
      let item = this.getSchema;

      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$store
            .dispatch("submitCollege", item)
            .then(function(data) {
              try {
                self.close();
                self.$store.dispatch("fetchCollegeList");
                Object.keys(item).forEach(function(key, index) {
                  item[key] = "";
                });
                self.$validator.reset();
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function(error) {
              console.log(error);
              self.$store.dispatch("fetchCollegeList");
            });
        }
      });
    },

    close() {
      this.$emit("update:dialogStatus", false);
    }
  },

  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },

  created() {
    this.$store.dispatch("fetchDivisions");
    this.$store.dispatch("fetchDistricts");
    this.$store.dispatch("fetchThanas");
    this.$store.dispatch("fetchCollegeType");
    this.$store.dispatch("fetchMgtType");
  }
};
</script>

<style scoped></style>
