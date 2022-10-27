<template>
  <div>
    <v-container fluid style="padding:10px">
      <v-layout row class="mb-2">
        <v-flex xs5>
          <v-autocomplete
            class="mx-2"
            hide-details
            v-model="searchParam.div_code"
            :item-text="item => '(' + item.div_code + ') ' + item.division_name"
            item-value="div_code"
            :items="getDivisionList"
            menu-props="auto"
            label="Select Division"
            name="division"
            prepend-inner-icon="subject"
            outline
            return-object
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @input="searchParam.div_code = ''"
                :selected="data.selected"
                class="chip--select-multi"
                >{{
                  "(" + data.item.div_code + ") " + data.item.division_name
                }}</v-chip
              >
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content
                  v-text="
                    '(' + data.item.div_code + ') ' + data.item.division_name
                  "
                ></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="
                      '(' + data.item.div_code + ') ' + data.item.division_name
                    "
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs5>
          <v-autocomplete
            name="Exam"
            class="mx-2"
            hide-details
            v-model="searchParam.district_code"
            :item-text="item => '(' + item.id + ') ' + item.district_name"
            item-value="id"
            :items="getDistrictList"
            menu-props="auto"
            label="Select District"
            prepend-inner-icon="subject"
            outline
            return-object
          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" class="chip--select-multi">{{
                data.item.district_name
              }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.district_name"
                  ></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-btn class="primary"> <v-icon left>search</v-icon>search </v-btn>
        </v-flex>
      </v-layout>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Regional Center Wise Distribution</v-card-text
            >
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />
          <div>
            <v-dialog v-model="reportDialog" width="500">
              <v-card>
                <v-select
                  class="pa-5"
                  outline
                  :items="['Division', 'District', 'All']"
                  label="Order By"
                  hide-details
                ></v-select>
                <v-divider />
                <div class="text-xs-center py-3">
                  <v-btn
                    outline
                    color="primary"
                    @click.stop.prevent="downloadScriptStm()"
                    class="erBtn"
                  >
                    <v-icon left>cloud_download</v-icon>Download allotment
                    Report
                  </v-btn>
                </div>
              </v-card>
            </v-dialog>
            <v-btn color="primary" @click="reportDialog = !false"
              >allotment Report</v-btn
            >
          </div>
        </v-layout>
      </v-card>
      <v-data-table
        v-if="force"
        v-model="selected"
        item-key="id"
        select-all
        :loading="loading"
        :headers="headers"
        :items="getRegionalCenterList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td class="text-xs" style="padding: 0 10px;">
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs">{{ props.item.center_name }}</td>
          <td class="text-xs">{{ props.item.district_name }}</td>

          <td class="text-xs">{{ props.item.ms_total_script_count }}</td>
          <td class="text-xs">{{ props.item.ms_total_packet_count }}</td>

          <td class="text-xs">{{ props.item.es_total_script_count }}</td>
          <td class="text-xs">{{ props.item.es_total_packet_count }}</td>
          <td class="text-xs-center" style="padding:0px 0px">
            <v-layout align-center justify-center row fill-height>
              <v-btn small>
                <span class="caption">Chalan</span>
              </v-btn>
              <v-btn small>
                <span class="caption">allotment Details</span>
              </v-btn>
              <v-btn small>
                <span class="caption">Gate Pass</span>
              </v-btn>
            </v-layout>
          </td>
          <!-- <td class="text-xs"></td> -->

          <td class="text-xs-center cyan lighten-3">
            <v-chip v-if="props.item.status == 3" color="white green--text">
              <b>Distributed</b>
            </v-chip>
            <v-chip v-if="props.item.status == 2" color="white orange--text">
              <b>Pending</b>
            </v-chip>
            <v-chip v-if="props.item.status == 1" color="white pink--text">
              <b>Allocated</b>
            </v-chip>
            <v-chip v-if="!props.item.status" color="cyan darken-1 white--text">
              <b>status</b>
            </v-chip>
          </td>
          <td class="justify-center text-xs-center cyan lighten-3">
            <v-btn
              small
              color="primary lighten-2"
              @click="addReceiverInfo(props.item)"
              >Add Receiver</v-btn
            >
          </td>

          <td class="justify-center text-xs-center cyan lighten-3">
            <v-btn
              :disabled="!props.item.receiver"
              small
              color="primary"
              @click="showDetailItem(props.item)"
              >Distribute</v-btn
            >
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center" v-if="selected.length">
        <v-btn
          color="primary"
          @click="showDetailItem(props.item)"
          class="mt-3"
          large
          >Distribute To Multiple Regional Center</v-btn
        >
      </div>
    </v-container>
    <v-dialog v-model="receiverDialog" width="500" persistent>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="title">Receiver's Info</v-toolbar-title>
      </v-toolbar>
      <v-card class="pa-2">
        <div class="pb-3">
          <v-text-field
            class="pa-2"
            label="Name"
            outline
            hide-details
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            class="pa-2"
            label="Title"
            outline
            hide-details
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            class="pa-2"
            label="Inistitution Name"
            outline
            hide-details
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            class="pa-2"
            label="Phone"
            outline
            hide-details
            prepend-icon="edit"
          ></v-text-field>
          <v-text-field
            class="pa-2"
            label="Email"
            outline
            hide-details
            prepend-icon="edit"
          ></v-text-field>
        </div>
        <v-divider />
        <div class="text-xs-center py-3">
          <v-btn outline color="primary" @click="receiverDialog = false"
            >Save</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <!-- <v-layout row style="opacity:.6">
      <v-flex xs6>
        <pre> {{getRegionalCenterList}} </pre>
      </v-flex>
      <v-flex xs6>
        <pre> {{getRegCenList}} </pre>
      </v-flex>
    </v-layout>-->
  </div>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
import watchMixin from "@/mixin/exam_year_watch_mixin";

export default {
  mixins: [commonFun, commonGet, watchMixin],
  components: {
    formNotification
  },
  props: ["test"],
  data() {
    return {
      force: true,
      receiverDialog: false,
      reportDialog: false,
      selected: [],
      distFlag: false,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }]
      },
      loading: false,

      sl_count: -1,
      searchParam: {},
      headers: [
        {
          text: "SL.",
          align: "left",
          sortable: true,
          value: "id"
        },
        { text: " Name", value: "center_name", sortable: false },

        { text: "Division", value: "division_name", sortable: false },
        { text: "Total MS Count", value: "script_count", sortable: false },

        {
          text: "Total MS Packet Count",
          value: "division_name",
          sortable: false
        },

        { text: "Total ES Count", value: "script_count", sortable: false },

        {
          text: "Total ES Packet Count",
          value: "division_name",
          sortable: false
        },
        {
          text: "Download",
          align: "center",
          value: "district_code",
          sortable: false
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          class: "cyan lighten-2 white--text subheading"
        },
        {
          text: "Receiver Info",
          align: "center",
          value: "actions",
          sortable: false,
          class: "cyan lighten-2 white--text subheading"
        },
        {
          text: "Distribute",
          align: "center",
          value: "actions",
          sortable: false,
          class: "cyan lighten-2 white--text subheading"
        }
      ]
    };
  },
  created() {
    var limit = {
      page: 1,
      limit: 1000
    };

    // this.$store.dispatch("callCenterData");
    // this.$store.dispatch("fetchDistrictData", limit);
    //division
    // if (!this.$store.getters.getDivisionItems.length) {
    //   this.$store.dispatch("fetchDivisionData", limit);
    // }
    //district
    // if (!this.$store.getters.getDistrictItems.length) {
    //   this.$store.dispatch("fetchDistrictData", limit);
    // }
    this.$store.dispatch("fetchRegCenterData");
  },
  computed: {
    getRegionalCenterList() {
      return this.$store.getters.getRegionalCentertItem;
    },
    //division
    getDivisionList() {
      return this.$store.getters.getDivisionItems;
    },
    //district
    getDistrictList() {
      return this.$store.getters.getDistrictItems;
    }
  },

  methods: {
    addReceiverInfo(item) {
      item.receiver = {};
      item.receiver.name = "";
      item.receiver.title = "";
      item.receiver.phone = "";
      item.receiver.email = "";
      this.receiverDialog = true;
      this.force = false;
      this.force = true;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },
    searchRegCenterList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("callRegionalCenterData", this.searchParam)
        .then(data => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    }
  },
  watch: {
    pagination() {
      this.searchRegCenterList();
    }
  }
};
</script>
<style scoped></style>
