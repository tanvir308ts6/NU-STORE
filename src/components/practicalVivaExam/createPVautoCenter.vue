<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card color="white" class="mt-4">
          <v-layout row>
            <v-card flat>
              <v-badge left overlap>
                <template v-slot:badge>
                  <v-btn
                    round
                    color="primary"
                    fab
                    small
                    style="margin-top: -1.5em; font-size: 1.3em"
                    class="elevation-0"
                    v-if="pagination.totalDataItems"
                    >{{ pagination.totalDataItems }}</v-btn
                  >
                </template>
                <v-card-text class="title">Subject List</v-card-text>
              </v-badge>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSubByVivaPrac"
          :loading="loading"
          class="elevation-4 mytable"
          hide-actions
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left">
              {{ props.item.subject_code }} - {{ props.item.subject_name }}
            </td>
            <td class="text-xs-left my--style" width="250">
              <v-form
                ><v-layout
                  ><v-text-field
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('student_count')"
                    data-vv-name="student_count"
                    required
                    v-model="props.item.student_count"
                    label="Input Student Count"
                    single-line
                    autofocus
                    hide-details
                    class="mb-3"
                    :ref="'text' + props.index"
                    @keyup.enter="callRef(props.index + 1)"
                    @keyup.up="callRef(props.index - 1)"
                    @keyup.down="callRef(props.index + 1)"
                    :error="getErrorStatus(props.item)"
                    :prepend-icon="getIconForMarkEntry(props.item)"
                    @click="marksEntryValidation(props.item)"
                  ></v-text-field> </v-layout
              ></v-form>
            </td>
          </template>
        </v-data-table>
        <!-- submit button  -->
        <v-flex xs12 mt-4>
          <v-layout align-center justify-center row fill-height>
            <div v-if="editButton">
              <v-btn large round color="primary" @click="validationForm()">
                Submit
                <v-icon right dark>send</v-icon>
              </v-btn>
            </div>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import commonGet from "../../mixin/common_getters_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import commonFun from "../../mixin/common_function";
import studentDetail from "@/components/examinee/studentDetails.vue";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [
    commonFun,
    commonGet,
    common_login_getters,
    commonExamYear,
  ],
  components: {
    studentDetail,
  },
  props: ["centerAllocationAuto", "searchPVCenterAllocationList"],
  $_veeValidate: {
    validator: "new",
  },
  data: () => ({
    finally_submited_status: false,
    loading: false,
    dialog: false,
    centerIdStatus: false,
    startModel: false,
    centerDetailDialog: false,
    searchParam: {},
    dictionary: {
      custom: {
        student_count: {
          required: () => " Student Count field can not be empty ",
          numeric: "Student Count field may only contain numeric characters.",
        },
      },
    },
    headers: [
      {
        text: "SL.",
        align: "left",
        value: "sl",
        sortable: false,
        width: "5%",
      },
      {
        text: "Subjects ",
        align: "left",
        value: "subject_code",
        sortable: false,
        width: "25%",
      },
      {
        text: "Input Minimum Examinee Count",
        align: "center",
        value: "id",
        sortable: false,
        width: "10%",
      },
    ],
    pagination: {
      rowsPerPage: -1,
      rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
    },
    search: "",
    sl_count: 1,
    studentList: true,
    marks: [],
    editButton: true,
    currentItem: {},
    pvMarks: [{}],
    getData: [],
  }),
  watch: {
    centerAllocationAuto(val) {
      this.dialog = val;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchParam.center= 1;
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.center_code;
      }
      this.searchStudentList();
      console.log("created", this.searchParam);
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    //return this.up();
  },
  methods: {
    getErrorStatus(item) {
      let flg1 = this.isPositiveInteger(item.student_count);
      if (flg1) return false;
      else return true;
    },
    getIconForMarkEntry(item) {
      let flg1 = this.isPositiveInteger(item.student_count);
      if (flg1) return "done";
      else return "edit";
    },
    marksEntryValidation(mark) {
      this.tab = "tab-2";
      console.log("mark.count", mark.student_count);
    },
    isPositiveInteger(n) {
      return n >>> 0 === parseFloat(n);
    },
    close() {
      this.$emit("update:centerAllocationAuto", false);
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchStudentList() {
      this.setLimit();
      var self = this;
      this.loading = true;
      this.$store
        .dispatch("fetchSubDataByPV", this.searchParam)
        .then((data) => {
          self.loading = false;
          console.log("...", data);
        });
    },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.submit();
        } else {
          this.$store.commit("SET_SNACKBAR", {
            msg: "Please give all subjects valid student count ",
            color: "red",
          });
        }
      });
    },
    submit() {
      var self = this;
      console.log("gggg", this.getSubByVivaPrac);
      let param = {
        exam_initiate_id: this.searchParam.exam_initiate_id,
        exam_code: this.searchParam.exam_code,
        exam_year: this.searchParam.year,
        subjects: this.getSubByVivaPrac,
        type : 2,
      };
      // this.getSubByVivaPrac.forEach((obj) => {
      //   if (obj.student_count > 0) {
      this.$store.dispatch("saveAutoPVCenterAlloc", param).then(() => {
        self.close();
        self.searchPVCenterAllocationList();
      });

      // });
    },
    callRef(i) {
      try {
        this.$refs["text" + i].focus();
      } catch (er) {
        this.$refs["text" + 0].focus();
      }
    },
  },
  created() {
    //prac viva center list
    var type = {
      type: 1,
    };
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
  },
  computed: {
    getSubByVivaPrac() {
      return this.$store.getters.getSubByVivaPrac;
    },
  },
};
</script>

<style lang="scss">
.v-text-field input {
  font-size: 1.5em;
}

.pvMarksEntry-v-select {
  .v-input__prepend-outer {
    margin-right: 20px;
    margin-left: 10px;
  }
}
.mytable {
  .v-table thead tr:not(:last-child) {
    background-color: #555555;
  }
  .theme--light.v-datatable thead th.column.sortable.active {
    color: white;
    font-size: 130%;
  }
  .theme--light.v-table thead th {
    color: white;
    font-size: 130%;
  }
  .theme--light.v-datatable thead th.column.sortable.active .v-icon {
    color: white;
    padding-right: 5px;
  }
  .my-style {
    border-style: solid;
    border-width: 1px;
    // border-top-width: 1px;
    // border-right-width: 2px;
    // border-bottom-width: 1px;
    // border-left-width: 2px;
  }
}
</style>
