<template>
  <v-container fluid>
    <v-container fluid style="padding-top:10px">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Unallocated Colleges List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
          ></v-text-field>
          <v-spacer />
        </v-layout>
      </v-card>
      <!-- :total-items="pagination.totalItems"
:rows-per-page-items="pagination.rowsPerPageItems" -->
      <v-data-table
        :pagination.sync="pagination"
        :loading="loading"
        :search="search"
        :headers="headers"
        :items="getPVUnAllocCollSubList"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1 }}</td>
          <td class="text-xs">
            {{ props.item.college_code }} - {{ props.item.college_name }}
          </td>
          <td class="text-xs">
            {{ props.item.subject_code }} - {{ props.item.subject_name }}
          </td>
          <td class="text-xs">{{ props.item.student_count }}</td>
          <td class="text-xs">{{ props.item.district_name }}</td>
          <td class="justify-center text-xs-center">
            <v-autocomplete
              :items="getPVCollList"
              :item-text="
                (item) =>
                  item.college_code +
                  ' - ' +
                  item.college_name +
                  '( Student Count :' +
                  item.student_count +
                  ') '
              "
              item-value="college_code"
              v-model="props.item.center_college_code"
              class="mt-3 ml-2 mr-2"
              color="blue-grey "
              label="Select Center"
              prepend-icon="account_balance"
              :disabled="ifCenterUser || publishState == 1"
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="addedCenter = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                >
                  {{
                    data.item.college_code +
                      " - " +
                      data.item.college_name +
                      " ( Student Count :" +
                      data.item.student_count +
                      ") "
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
                        data.item.college_code +
                          ' - ' +
                          data.item.college_name +
                          ' ( Student Count :' +
                          data.item.student_count +
                          ') '
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <!-- submit button  -->
    <v-flex xs12 mt-4>
      <v-layout align-center justify-center row fill-height>
        <v-btn
          large
          round
          color="primary"
          @click="addCollToCenter()"
          :dark="publishState == 1 && publishState != 1"
          :disabled="ifCenterUser || publishState == 1"
        >
          ADD
          <v-icon right dark>send</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
import common_login_getters from "@/mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import commonExamYear from "@/mixin/exam_year_watch_mixin";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  props: [
    "unAllocCollSubDialog",
    "getPVCollList",
    "searchPVCenterAllocationList",
    "publishState",
  ],
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        // rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      sl_count: 0,
      search: "",
      searchParam: {},
      headers: [
        { text: "SL", value: "sl" },
        { text: "College", value: "college_code" },
        { text: "Subject", value: "subject_code" },
        { text: "Student Count", value: "student_count" },
        { text: "District ", value: "district_name" },
        { text: "Action ", value: "" },
      ],
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    if (this.ifCenterUser) {
      this.searchParam.center_code = [
        this.getAuthUser.center.practical_center_code,
      ];
    }
    this.searchParam.type = 2;
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
  },
  computed: {
    //all data
    getPVUnAllocCollSubList() {
      return this.$store.getters.getPVUnAllocCollSubList;
    },
  },
  methods: {
    closeDialogueByCollege() {
      this.unAllocCollSubDialog = false;
    },
    addCollToCenter() {
      var that = this;
      let data = [];
      //var newArrayDataOfOjbect = Object.values(data)
      this.getPVUnAllocCollSubList.forEach((obj) => {
        if (obj.center_college_code != null) {
          data.push(obj);
        }
      });
      console.log("see", data);
      let param = {
        exam_code: this.searchParam.exam_code,
        exam_year: this.searchParam.exam_year,
        exam_initiate_id: this.searchParam.exam_initiate_id,
        centers: data,
        type:2,
      };
      if (data.length < 1) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Data To Submit",
          color: "red",
        });
      } else {
        this.$store.dispatch("addPVCenterAlloc", param).then((data) => {
          that.$emit("update:unAllocCollSubDialog", false);
          that.searchPVCenterAllocationList();
        });
      }
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    unAllocPVCollList() {
      this.loading = true;
      //this.setLimit();
      this.$store
        .dispatch("ShowPVUnallocatedCollListData", this.searchParam)
        .then((data) => {
          this.loading = false;
          //   this.sl_count = data.from;
          //   this.pagination.totalItems = data.total;
        });
    },
  },
  watch: {
    getExamInitiateId(val) {
      this.searchParam.exam_initiate_id = val;
    },
    unAllocCollSubDialog(val) {
      if (val) this.unAllocPVCollList();
    },
    // pagination() {
    //   this.unAllocPVCollList();
    // },
  },
};
</script>
<style scoped>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid rgb(255, 255, 255) !important;
}
</style>
