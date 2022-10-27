<template>
  <v-container fluid>
    <v-card class="ma-4" color="grey lighten-2">
      <v-container fluid>
        <span class>
          <div class="headline mb-4">
            <v-icon color="primary" size="35">account_balance</v-icon>
            <span class="ml-2">Grace Marks Calculator</span>
          </div>
        </span>
        <v-card class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <div class="subtitle-1 mb-2">Course &nbsp; : &nbsp;</div>
              <v-flex xs12>
                <v-autocomplete
                  outline
                  class="ma-2"
                  v-model="searchParam.paper_code"
                  item-value="code"
                  :item-text="item => item.code + ' - ' + item.title"
                  :items="getPaperList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                  @change="paperChange()"
                  required
                  v-validate="'required'"
                  :error-messages="errors.collect('paper_code')"
                  data-vv-name="paper_code"
                >
                  <!-- :loading="subPap.paper_loading" -->
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="searchParam.paper_code = ''"
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
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-flex>
            <v-flex xs12 v-if="paptatus">
              <v-card class="ma-4 pa-2">
                <div class="subtitle-1 mb-2 mt-2">
                  Grace Mark &nbsp; : &nbsp;
                </div>
                <v-text-field
                  class="ma-4"
                  outline
                  color="primary"
                  v-model="searchParam.grace_mark"
                  name="grace_mark"
                  required
                  v-validate="'required'"
                  :error-messages="errors.collect('grace_mark')"
                  data-vv-name="grace_mark"
                ></v-text-field>
              </v-card>
            </v-flex>
            <!-- send button -->
            <v-flex xs12 class="mt-2">
              <v-layout align-center justify-center row fill-height>
                <!-- :disabled="disable" -->
                <v-btn
                  round
                  large
                  color="primary"
                  @click="validationForm"
                  v-if="paptatus"
                  >Search</v-btn
                >
              </v-layout>
            </v-flex>

            <v-flex xs12 v-if="dataStatus" class="mt-1">
              <v-card color="cyan darken-3" class="px-3 ma-3 CSP_BoarderStyle">
                <v-layout row wrap align-center class="py-3">
                  <v-flex xs6 class="pt-3">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Total Students &nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.total_student }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 class="pt-3">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Current Pass Rate &nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.current_pass_rate }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 class="pt-2">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Grace Mark&nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.grace_mark }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 class="pt-2">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Overall Pass Rate &nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.overall_pass_rate }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 class="pt-2">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Target Students &nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.target_student }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 class="pt-2">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Total Passed &nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.total_passed }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs6 class="pt-2">
                    <v-card
                      height="100px"
                      floating
                      color="grey darken-2"
                      class="white--text headline ma-3"
                    >
                      <v-layout
                        row
                        wrap
                        align-center
                        fill-height
                        justify-center
                      >
                        <div class="subtitle-1 mb-2">
                          Total Failed &nbsp; : &nbsp;
                        </div>
                        <v-divider vertical class="mr-4 ml-3 pa-2"></v-divider>
                        <div class="subtitle-1 mb-2">
                          {{ getSchema.total_failed }}
                        </div>
                      </v-layout>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],

  data: () => ({
    dictionary: {
      custom: {
        grace_mark: {
          required: () => "Write Target pass rate"
        },
        paper_code: { required: () => "Select Paper" }
      }
    },
    disable: false,
    searchParam: {},
    paptatus: false,
    role_id: "",
    user_id: "",
    grace_mark: "",
    dep_controller_note: "",
    controller_note: "",
    vc_note: "",
    subPap: { paper_loading: false },
    dataStatus: false
  }),
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    //paper
    if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    // this.searchParam.user_type = this.getAuthUser.user_type;
  },

  computed: {
    getSchema() {
      return this.$store.getters.getGraceSchema;
    },
    getGraceData() {
      return this.$store.getters.getGraceData;
    }
  },
  // watch: {
  //   approval_details(val) {
  //     console.log("approval_details watch", val);
  //   }
  // },
  methods: {
    paperChange() {
      var self = this;
      //this.searchParam.paper_code = [];
      this.subPap.paper_loading = true;
      self.paptatus = true;
      //console.log("print", this.searchParam.paper_code);
    },
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.searchgrace();
        }
      });
    },

    searchgrace() {
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.exam_code = this.$store.getters.getLoggedInExam.code;
      this.searchParam.year = this.$store.getters.getLoggedInYear.year;
      this.searchParam.paper_code = this.searchParam.paper_code;
      var self = this;
      if (this.searchParam.paper_code.length != 0) {
        this.$store.dispatch("getGraceData", this.searchParam).then(data => {
          if (data) {
            console.log("...m");
            self.dataStatus = true;
            self.disable = true;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
