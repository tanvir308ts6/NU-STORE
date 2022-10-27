<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-autocomplete
          :disabled="ifCenterUser"
          label="Select Center"
          :item-text="
            (item) => '(' + item.center_code + ') ' + item.center_name
          "
          item-value="center_code"
          v-model="searchParam.center_code"
          :items="getCenterList"
          menu-props="auto"
          prepend-icon="edit"
          outline
          hide-details
          @change="getDataFromApi()"
        >
          <template v-slot:selection="data">
            <v-chip
              close
              @input="getSchema.center_code = ''"
              :selected="data.selected"
              class="chip--select-multi"
              >({{ data.item.center_code }}) {{ data.item.center_name }}</v-chip
            >
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title
                  >({{ data.item.center_code }})
                  {{ data.item.center_name }}</v-list-tile-title
                >
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex xs2 v-if="!ifCenterUser">
        <v-btn @click="getDataFromApi()">search</v-btn>
      </v-flex>
    </v-layout>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :loadData.sync="loadData"
    ></formDialog>
    <!-- {{getCenBsCollFromRegDataList}} -->
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title"
              >Blank Script Receive From RC</v-card-text
            >
          </v-card>
          <v-card flat>
            <v-card-text class="title"></v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <!-- <v-text-field
            v-model="search"
            prepend-inner-icon="search"
            label="Search"
            class="mt-0"
            hide-details
            solo
            flat
            single-line
            v-on:keyup.native.enter="getDataFromApi()"
          ></v-text-field>-->
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />
          <!-- <v-card-actions>
            <v-btn @click="newItem" color="primary" dark
              >New Black Script Collection From RC</v-btn
            >
          </v-card-actions>-->
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getCenBsCollFromRegDataList"
        class="elevation-1"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <!-- <td class="text-xs">{{ props.item.id }}</td> -->
          <!-- <td class="text-xs">{{ props.item.regional_center_id }}</td> -->
          <!-- <td class="text-xs">{{ props.item.center_id }}</td> -->
          <td v-if="props.item.reg_center_code != 0" class="text-xs">
            ({{ props.item.reg_center_code }})
            {{ props.item.regional_center_name }}
          </td>
          <td v-else class="text-xs">National University</td>

          <!-- <td class="text-xs">({{ props.item.center_code }}) {{ props.item.center_name }}</td> -->
          <!-- <td class="text-xs">{{ props.item.exam_id }}</td> -->
          <!-- <td class="text-xs">{{ props.item.exam_name }}</td> -->
          <td class="text-xs">{{ props.item.main_quantity }}</td>
          <td class="text-xs">{{ props.item.main_packet_size }}</td>
          <td class="text-xs">{{ props.item.extra_quantity }}</td>
          <td class="text-xs">{{ props.item.extra_packet_size }}</td>
          <td class="text-xs">{{ props.item.total_packet }}</td>

          <!-- <td class="text-xs">{{ props.item.distribution_type }}</td> -->

          <td class="text-xs-center">
            <v-chip
              v-if="props.item.distribute_status == 0"
              color="white orange--text"
            >
              <b>Allocated</b>
            </v-chip>
            <v-chip v-else color="white green--text">
              <b>Distributed</b>
            </v-chip>
          </td>
          <!-- <td class="text-xs-center">
            <v-chip v-if="props.item.status==3" color="white green--text">
              <b>Distributed</b>
            </v-chip>
            <v-chip v-if="props.item.status==2" color="white orange--text">
              <b>Pending</b>
            </v-chip>
            <v-chip v-if="props.item.status==1" color="white pink--text">
              <b>Allocated</b>
            </v-chip>
          </td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon @click="editItem(props.item)" class="mr-0" color="white">memory</v-icon>
                  </v-btn>
                </template>
                <span>Approve</span>
              </v-tooltip>
            </v-item-group>
          </td>-->
        </template>
      </v-data-table>
    </v-container>
    <!-- <pre>{{ getCenBsCollFromRegDataList }} </pre> -->
  </v-container>
</template>

<script>
import commonFun from "@/mixin/common_function";
import commonGet from "@/mixin/common_getters_mixin";
import watchMixin from "@/mixin/exam_year_watch_mixin";
import formDialog from "@/components/center/CenBsCollFromRegForm.vue";
import common_login_getters from "@/mixin/common_login_getters";
export default {
  mixins: [commonFun, commonGet, watchMixin, common_login_getters],
  components: {
    formDialog,
  },
  data() {
    return {
      searchParam: {},
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, { text: "All", value: -1 }],
      },
      totalDataItems: 0,
      sl_count: 1,
      loading: true,
      loadData: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      headers: [
        {
          text: "SL.",
          align: "left",
          value: "id",
          width: "10",
          sortable: false,
        },
        // { text: "ID", value: "id" },
        // { text: "Regional Center ID", value: "regional_center_id" },
        { text: "Deliverd From", value: "reg_center_code", sortable: false },
        // { text: "Regional Center Code", value: "reg_center_code" },
        // { text: "Center Id", value: "center_id" },
        // { text: "Center Name", value: "center_name" },
        // { text: "Exam ID", value: "exam_id" },
        // { text: "Exam", value: "exam_name", sortable: false },
        { text: "Main Quantity", value: "main_quantity", sortable: false },
        { text: "Packet Size", value: "main_packet_size", sortable: false },
        { text: "Extra Quantity", value: "extra_quantity", sortable: false },
        {
          text: "Extra Packet Size",
          value: "extra_packet_size",
          sortable: false,
        },
        { text: "Total Packet", value: "total_packet", sortable: false },

        // { text: "Date", value: "date" },

        { text: "Status", align: "center", value: "status", sortable: false },
        // { text: "Action", align: "center", value: "id", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        main_qty: "",
        loose_qty: "",
        date: "",
        regional_center_id: "",
        center_id: "",
        exam_id: "",
        reg_center_code: "",
        center_code: "",
        main_packet_size: "",
        main_quantity: "",
        extra_packet_size: "",
        extra_quantity: "",
        total_packet: "",
        comment: "",
        sender_id: "",
        exam_initiate_id: "",
        exam_code: "",
        year: "",
        user_id: "",
        status: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      },
      limit: {},
    };
  },
  created() {
    this.limit.exam_code = this.getLoggedInExam.code;
    this.limit.exam_initiate_id = this.getExamInitiateId;
    this.limit.year = this.getLoggedInYear.year;
    // center
    if (!this.$store.getters.getCenterItems.length) {
      this.$store.dispatch("fetchCenterData");
    }
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
  },
  mounted() {
    this.getDataFromApi();
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      },
    },
  },
  computed: {
    getCenBsCollFromRegDataList() {
      return this.$store.getters.getCenBsCollFromRegDataList;
    },
    getMsg() {
      return this.$store.getters.getCenBsCollFromRegMessage;
    },
  },
  methods: {
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search,
      };
      if (this.ifCenterUser) {
        this.limit.center_code = this.getAuthUser.center.center_code;
      }
      this.limit.exam_code = this.getLoggedInExam.code;
      this.limit.exam_initiate_id = this.getExamInitiateId;
      this.limit.year = this.getLoggedInYear.year;
      try {
        this.limit.center_code = this.searchParam.center_code;
      } catch (er) {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No Selected Center ",
          color: "red",
        });
      }
    },
    getDataFromApi() {
      this.loading = true;
      let self = this;
      this.setLimit();
      this.$store
        .dispatch("callCenBsCollFromRegData", this.limit)
        .then((data) => {
          console.log("srp", data);
          this.loading = false;
          this.sl_count = data.links.from;
          this.totalDataItems = data.links.total;
        })
        .catch(function(error) {
          self.loading = false;
        });
    },
    statusColor(status) {
      return status == 0 ? "Pending" : "Received";
    },
    newItem() {
      this.formDialogStatus = true;
    },
    editItem(item) {
      this.editedIndex = this.getCenBsCollFromRegDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.newItem();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("deleteCenBsCollFromRegItem", id)
              .then(function(data) {
                self.setLimit();
                self.$store.dispatch("callCenBsCollFromRegData", self.limit);
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("callCenBsCollFromRegData", self.limit);
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.Pending {
  background-color: #fb8c00;
  color: white;
}
.Received {
  background-color: #388e3c;
  color: white;
}
</style>
