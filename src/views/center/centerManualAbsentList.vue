<template>
  <v-container fluid>
    <v-card style="border-radius: 25px">
      <v-layout row wrap class="mx-5">
        <v-flex class="mx-3" xs12 sm12 md12>
          <!-- <v-card color="grey darken-3" height="65px"> -->
          <v-flex xs12 class="ma-3">
            <v-menu
              v-model="datePickerModel"
              :close-on-content-click="false"
              full-width
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="cyan"
                  class="ma-2 title"
                  :value="getFormatedDate(searchParam.exam_date)"
                  label="Pick a date"
                  readonly
                  v-on="on"
                  outline
                  hide-details
                  prepend-icon="calendar_today"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="searchParam.exam_date"
                @change="searchdata()"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex>
            <v-autocomplete
              :disabled="ifCenterUser"
              class="ma-2"
              v-model="searchParam.center_code"
              :item-text="(item) => item.center_code + ' - ' + item.center_name"
              item-value="center_code"
              :items="getTheoryCenterList"
              menu-props="auto"
              label="Select Center"
              prepend-icon="list"
              outline
              @change="searchdata()"
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="clearCenter()"
                  :selected="data.selected"
                  class="chip--select-multi"
                >
                  {{ data.item.center_code + " - " + data.item.center_name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="
                        data.item.center_code + ' - ' + data.item.center_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <!-- </v-card> -->
        </v-flex>
      </v-layout>
    </v-card>
    <v-dialog v-model="formDialogStatus" max-width="600px" persistent>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :searchCenManualAbsEntryList.sync="searchCenManualAbsEntryList"
        :searchParam="searchParam"
      ></formDialog>
    </v-dialog>
    <div>
      <v-container fluid>
        <!-- <v-layout> -->
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Center Manual Absent List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <v-spacer />
            <v-card flat>
              <!-- <v-card-actions>
                <v-spacer />
                <v-btn color="primary" dark @click="newItem"
                  >Add New Manual Entry</v-btn
                >
              </v-card-actions> -->
            </v-card>
          </v-layout>
        </v-card>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="getCenManualAbsentEntryData"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <tr :style="getStyle(props.item)">
              <td class="text-xs-left">{{ sl_count + props.index }}</td>
              <td class="text-xs-left">
                {{ props.item.center_code }} - {{ props.item.center_name }}
              </td>
              <td class="text-xs-center">{{ props.item.total_examinee }}</td>
              <td class="text-xs-center">{{ props.item.total_present }}</td>
              <td class="text-xs-center">{{ props.item.total_absent }}</td>
              <td class="text-xs-center">{{ props.item.manual_absent }}</td>
              <td class="text-xs-center">{{ props.item.manual_reported }}</td>
              <td class="justify-center text-xs-center">
                <v-item-group>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        small
                        color="primary"
                        v-on="on"
                        :disabled="!ifCenterUser"
                      >
                        <v-icon
                          @click="editItem(props.item)"
                          class="mr-0"
                          color="white"
                          >edit</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                  <!-- <v-tooltip right color="red">
                    <template v-slot:activator="{ on }">
                      <v-btn fab small color="red" v-on="on">
                        <v-icon @click="deleteItem(props.item)" color="white"
                          >delete</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip> -->
                </v-item-group>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/center/centerManualAbsentEntryForm.vue";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import * as moment from "moment";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    formDialog,
  },
  data() {
    return {
      datePickerModel: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, { text: "All", value: -1 }],
      },
      loading: false,
      dialog: false,
      formDialogStatus: false,
      currentItem: {},
      search: "",
      sl_count: -1,
      smsList: [],
      emailList: [],
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "rn",
        },
        {
          text: "Center",
          value: "center_code",
          sortable: false,
          align: "center",
        },
        {
          text: "Total Examinee",
          value: "total_examinee",
          align: "center",
          sortable: false,
        },
        {
          text: "Total Present",
          value: "total_present",
          align: "center",
          sortable: false,
        },
        {
          text: "Total Absent",
          value: "total_absent",
          align: "center",
          sortable: false,
        },
        {
          text: "Manual Absent",
          value: "manual_absent",
          align: "center",
          sortable: false,
        },
        {
          text: "Manual Reported",
          value: "manual_reported",
          align: "center",
          sortable: false,
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    if (this.ifCenterUser) {
      console.log("center code ????");
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
    this.searchParam.exam_date = new Date().toISOString().substr(0, 10);
    this.searchParam.exam_code = this.getLoggedInExam.code;
    this.searchParam.exam_year = this.getLoggedInYear.year;
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.searchCenManualAbsEntryList();

    this.$store.commit("UNSET_FORMNOTIFY");

    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.exam_code = this.getLoggedInExam.code;
    param.year = this.getLoggedInYear.year;
    this.$store.dispatch("fetchTheoryWiseCenterData", param);
  },
  computed: {
    getCenManualAbsentEntryData() {
      return this.$store.getters.getCenManualAbsentEntryData;
    },
    getTheoryCenterList() {
      return this.$store.getters.getTheoryCenterList;
    },
  },
  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.searchCenManualAbsEntryList();
    },
  },
  methods: {
    getStyle(item) {
      if (item.total_present == 0) {
        if (item.total_examinee != this.sum(item)) {
          return "background-color: #FF8A80;";
        } else {
          return "background-color: white; ";
        }
      } else {
        if (item.total_examinee != this.sum(item)) {
          return "background-color: #FFF59D; ";
        } else {
          return "background-color: white; ";
        }
      }
    },
    sum(item) {
      let sum =
        parseInt(item.total_present) +
        parseInt(item.manual_absent) +
        parseInt(item.manual_reported);
      console.log("else sum", sum);
      return sum;
    },
    unSetEditedData() {
      this.editedItem = {
        rn: "1",
        exam_initiate_id: "",
        exam_code: "",
        exam_name: "",
        exam_year: "",
        exam_date: "",
        center_code: "",
        center_name: "",
        total_examinee: "",
        total_present: "",
        total_absent: "",
        manual_absent: 0,
        manual_reported: 0,
      };
    },
    editItem(item) {
      this.editedIndex = this.getCenManualAbsentEntryData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
      console.log(" editItem ", this.editedItem);
    },
    deleteItem(item) {
      const index = item.rn;
      var self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteCenManualAbsentEntryItem", index)
              .then(function(data) {
                self.searchCenManualAbsEntryList();
              })
              .catch(function(error) {
                console.log(error);
                self.searchCenManualAbsEntryList();
              });
          }
        });
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    searchdata() {
      this.datePickerModel = false;
      this.searchCenManualAbsEntryList();
    },
    clearCenter() {
      this.searchParam.center_code = "";
      this.searchCenManualAbsEntryList();
    },
    getFormatedDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    searchCenManualAbsEntryList() {
      this.loading = true;
      var that = this;
      this.$store
        .dispatch("searchCenManualAbsentEntryData", this.searchParam)
        .then((data) => {
          that.loading = false;
          that.sl_count = 1;
          //that.pagination.totalItems = data.meta.total;
        });
    },
  },
};
</script>
<style>
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
</style>
