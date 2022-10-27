<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="1400px" persistent>
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
          <v-card flat class="pr-3 scroll">
            <v-form>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    name="name"
                    label="Exam Committee Name"
                    v-model="getSchema.name"
                    v-validate="'required'"
                    :error-messages="errors.collect('name')"
                    data-vv-name="name"
                    required
                    prepend-icon="edit"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <!-- {{getYearList}} -->
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
                  <v-autocomplete
                    label="Select Exam"
                    :item-text="item => '(' + item.code + ') ' + item.title"
                    item-value="code"
                    v-model="getSchema.exam_code"
                    :items="getExamList"
                    v-validate="'required'"
                    :error-messages="errors.collect('exam')"
                    data-vv-name="exam"
                    required
                    prepend-icon="edit"
                    disabled
                  >
                    <template v-slot:selection="data">
                      <v-chip
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
                            v-html="
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
              <!-- <br /> -->
              <!-- <h2> -->

              <v-btn color="primary" dark @click="addMore">
                Add Members
                <v-icon right dark>add</v-icon>
              </v-btn>

              <!-- </h2> -->
              <!-- <br /> -->

              <v-container fluid>
                <v-layout
                  row
                  v-for="(member, index) in getSchema.members"
                  :key="index"
                >
                  <v-flex xs2>
                    <div v-if="adminStatus">
                      <v-select
                        label="Select Center"
                        item-text="center_name"
                        item-value="id"
                        v-model="getSchema.center_id"
                        :items="getCenterList"
                        v-validate="'required'"
                        :error-messages="errors.collect('center_id')"
                        data-vv-name="center_id"
                        required
                        prepend-icon="edit"
                      ></v-select>
                    </div>
                  </v-flex>

                  <v-flex xs2>
                    <v-text-field
                      name="name"
                      label="Name"
                      v-model="member.name"
                      v-validate="'required'"
                      :error-messages="errors.collect('name')"
                      data-vv-name="name"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field
                      name="designation"
                      label="Designation"
                      v-model="member.designation"
                      v-validate="'required'"
                      :error-messages="errors.collect('designation')"
                      data-vv-name="designation"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs2>
                    <v-text-field
                      name="code"
                      label="Code"
                      v-model="member.code"
                      v-validate="'required'"
                      :error-messages="errors.collect('code')"
                      data-vv-name="code"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field
                      name="mobile"
                      label="Mobile"
                      v-model="member.mobile"
                      v-validate="'required|numeric|max:11|min:11'"
                      :error-messages="errors.collect('mobile')"
                      data-vv-name="mobile"
                      required
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field
                      name="nid_no"
                      label="NID No"
                      v-model="getSchema.nid_no"
                      v-validate="'required'"
                      :error-messages="errors.collect('nid_no')"
                      data-vv-name="nid_no"
                      prepend-icon="edit"
                    ></v-text-field>
                  </v-flex>
                  <v-btn
                    color="red"
                    dark
                    small
                    bottom
                    left
                    fab
                    @click="deleteRow(index, member)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-layout>
              </v-container>
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
            <!-- <v-btn color="primary  white--text" @click="clear">Reset</v-btn> -->
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";

export default {
  mixins: [commonFun, commonGet],
  $_veeValidate: {
    validator: "new"
  },

  props: ["dialogStatus", "editedData", "indexEdited", "snackbar", "loadData"],

  data: () => ({
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    active: true,
    centers: [],
    examList: [],
    adminStatus: false,
    years: [2011, 2012, 2013, 2014],

    dictionary: {
      custom: {
        name: {
          required: () => "Name field can not be empty."
        },
        year: {
          required: () => "Year field can not be empty."
        },
        designation: {
          required: () => "Designation can not be empty."
        },
        mobile: {
          required: () => "Mobile field can not be empty",
          numeric: "Mobile field may only contain numeric characters",
          max: "The Mobile field may not be greater than 11 characters",
          min: "The Mobile field may not be lesser than 11 characters"
        },
        code: {
          required: () => "Select a Code"
        }
      }
    }
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000
    };
    if (this.$store.getters.getExamItem < 1) {
      this.$store.dispatch("fetchExamData", limit);
    }

    this.$store.dispatch("callExamCommitteeData", limit);

    this.$store.dispatch("fetchCenterData");
    this.$store.dispatch("fetchYearData", limit);
    this.checkAdminStatus(this.getUserType());
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;
  },
  watch: {
    dialogStatus(val) {
      console.log("WATCH ..", val);
      this.dialog = val;
      this.$store.commit("SET_EXAM_COMMITTEE_SCHEMA", this.editedData);

      // console.log("watch edit ", this.editedData)
      // console.log("watch edit ", this.getSchema)
      //this.getSchema.exam_code = this.editedData.exam.code;

      //this.examList = this.$store.getters.getExamItem;
      //this.centers = this.$store.getters.getCenterItem;
      this.centers = this.$store.getters.getCenterItem;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getCenterList() {
      return this.$store.getters.getCenterItem;
    },
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    getSchema() {
      return this.$store.getters.getExamCommitteeSchema;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Exam Committee"
        : "Edit Exam Committee ";
    }

    // error_msg() {
    //   return this.$store.getters.getMessage;
    // },
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    addMore: function() {
      console.log("members ", this.getSchema);
      this.getSchema.members.push({
        id: "",
        name: "",
        designation: "",
        code: "",
        mobile: ""
      });
    },
    checkAdminStatus(user_type) {
      if (user_type == "Admin") {
        this.adminStatus = true;
      }
    },

    deleteRow: function(index, id) {
      this.getSchema.members.splice(index, 1);
    },
    save() {
      let self = this;
      if (!this.adminStatus) {
        var user_type = this.getUserType();
        this.getSchema.user_type = this.getUserTypeId();

        console.log(" type found", this.getSchema);

        if (user_type == "Center") {
          this.getSchema.center_id = this.getCenterId();
        }
      }
      let item = this.getSchema;
      this.$store
        .dispatch("saveExamCommitteeData", item)
        .then(function(data) {
          try {
            self.close();
            self.$emit("update:loadData", true);
            // self.$emit("update:snackbar", true);
            //self.$store.dispatch("callExamCommitteeData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          //self.$store.dispatch("callExamCommitteeData");
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editExamCommitteeData", item)
        .then(function(data) {
          self.close();
          self.$emit("update:loadData", true);
          //self.$store.dispatch("callExamCommitteeData");
          // self.$emit("update:snackbar", true);
        })
        .catch(function(error) {
          console.log(error);
          //self.$store.dispatch("callExamCommitteeData");
        });
    },
    clear() {
      this.$store.commit("UNSET_EXAM_COMMITTEE_SCHEMA");
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
    }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
