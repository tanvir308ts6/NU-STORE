<template>
  <div>
    <v-container fluid>
      <v-layout class="mx-4">
        <v-flex xs12 v-if="true">
          <v-text-field
            :disabled="ifExaminerUser"
            outline
            class="ma-0"
            hide-details
            name="code"
            label="Examiner Code"
            v-model="searchParam.examiner_code"
            prepend-inner-icon="edit"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 class="text-xs-center">
          <v-layout align-center justify-center row fill-height>
            <v-btn
              :disabled="ifExaminerUser"
              large
              class="primary"
              @click="fetchAsNuToRcToExaminerData()"
              >search</v-btn
            >
          </v-layout>
        </v-flex>
      </v-layout>
      <formDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :searchAnsScriptList="searchAnsScriptList"
      ></formDialog>
      <v-container fluid>
        <v-card color="white">
          <v-layout row>
            <v-card flat>
              <v-card-text class="title"
                >Ans Script Collection From RC</v-card-text
              >
            </v-card>
            <v-divider class="my-2" vertical></v-divider>
            <!-- <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
            ></v-text-field>-->
            <v-spacer />
            <!-- <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Create New A</v-btn>
            </v-card-actions>-->
          </v-layout>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="getAsNuToRcToExaminerData"
          :search="search"
          class="elevation-1"
          :loading="loading"
          :total-items="pagination.totalItems"
          :pagination.sync="pagination"
          :rows-per-page-items="pagination.rowsPerPageItems"
        >
          <template v-slot:items="props">
            <td>{{ sl_count + props.index }}</td>
            <td class="text-xs">
              <v-chip color="transparent"
                >{{ props.item.examiner_code }} -
                {{ props.item.examiner_name }}</v-chip
              >
            </td>
            <td class="text-xs">
              <v-chip color="transparent"
                >{{ props.item.paper_code }} -
                {{ props.item.paper_name }}</v-chip
              >
            </td>

            <td class="text-xs" v-if="props.item.nu_distribute_status != 1">
              <v-text-field
                class="ma-0"
                hide-details
                name="code"
                label="Total Script"
                v-model="props.item.total_script"
                @change="calculateTotalPacket(props.item)"
              ></v-text-field>
            </td>
            <td v-else>{{ props.item.total_script }}</td>
            <td class="text-xs" v-if="props.item.nu_distribute_status != 1">
              <v-text-field
                class="ma-0"
                hide-details
                name="code"
                label="Packet Size"
                v-model="props.item.packet_size"
                @change="calculateTotalPacket(props.item)"
              ></v-text-field>
            </td>
            <td v-else>{{ props.item.packet_size }}</td>

            <!-- <td class="text-xs-center" >{{calculateTotalPacket(props.item)}}</td> -->

            <td class="text-xs-center">{{ props.item.total_packet }}</td>

            <td class="distributeSectionCSS">
              <div v-if="props.item.nu_distribute_status == 1">
                <div v-if="props.item.rc_receive_status == 1">
                  <div v-if="props.item.rc_distribute_status == 1">
                    <v-chip disabled color="white blue--text">
                      <b>Distributed To Examiner</b>
                    </v-chip>
                  </div>
                  <div v-else class="text-xs-center">
                    <v-btn
                      color="amber lighten-4"
                      large
                      class="elevation-11"
                      @click="varifyExaminer(props.item)"
                      >Distribute</v-btn
                    >
                  </div>
                </div>
                <div v-else class="text-xs-center">
                  <v-chip disabled color="white orange--text">
                    <b>AT RC</b>
                  </v-chip>
                </div>
              </div>
              <div v-else class="text-xs-center">
                <v-chip disabled color="white cyan--text">
                  <b>SEND TO NU</b>
                </v-chip>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-container>
      <!-- <pre> {{ getAsNuToRcToExaminerData }} </pre> -->
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import formDialog from '@/components/examiner/ExamAsCollFromRegForm.vue';
import commonGet from '../../mixin/common_getters_mixin';
import watchMixin from '../../mixin/exam_year_watch_mixin';
import common_login_getters from '../../mixin/common_login_getters';

export default {
  mixins: [commonGet, watchMixin, common_login_getters],

  components: {
    formDialog,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, {text: 'All', value: -1}],
      },
      searchParam: {
        nu_distribute_status: 1,
        rc_receive_status: 1,
        rc_distribute_status: 1,
      },
      loading: false,
      sl_count: 1,
      dialog: false,
      formDialogStatus: false,
      search: '',
      headers: [
        {
          text: 'SL.',
          align: 'left',
          sortable: false,
          value: 'id',
          width: '5%',
        },

        {
          text: 'Examiner',
          value: 'center_name',
          sortable: false,
          width: '20%',
        },
        {text: 'Paper', value: 'center_name', sortable: false, width: '20%'},
        {
          text: 'Script Count',
          value: 'center_name',
          sortable: false,
          width: '20%',
        },
        {
          text: 'Packet Size',
          value: 'center_name',
          sortable: false,
          width: '20%',
        },
        {
          text: 'Total Packet',
          value: 'total_packet',
          sortable: false,
          width: '20%',
        },

        {
          text: 'Status',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '30%',
        },
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },

  created() {
    // this.$store.dispatch("fetchExaminerData");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifExaminerUser) {
      this.searchParam.examiner_code = this.getAuthUser.examiner.examiner_code;
    }
    //this.$store.dispatch("callExamAsCollFromRegData");
  },

  computed: {
    getAsNuToRcToExaminerData() {
      return this.$store.getters.getAsNuToRcToExaminerData;
    },
    getExamAsCollFromRegDataList() {
      return this.$store.getters.getExamAsCollFromRegDataList;
    },
  },
  methods: {
    getFormatedDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    },
    unSetEditedData() {
      this.editedItem = {
        iid: '',
        script_qty: '',
        date: '',
        reg_center_code: '',
        reg_center_name: '',
        examiner_code: '',
        exam_name: '',
        exam_code: '',
        status: 0,
        created_at: '',
        updated_at: '',
        deleted_at: '',
        examiner_name: '',
        comment: '',
        exam_initiate_id: '',
        extra_packet_size: '',
        extra_quantity: 0,
        main_packet_size: '',
        main_quantity: '',
        sender_id: '',
        total_packet: '',
        user_id: '',
        year: '',
      };
    },

    searchAnsScriptList() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch('callExamAsCollFromRegData', this.searchParam)
        .then((data) => {
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
        });
    },
    setLimit() {
      const {sortBy, descending, page, rowsPerPage} = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    fetchAsNuToRcToExaminerData() {
      console.log('fetchAsNuToRcToExaminerData -1');
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch('fetchAsNuToRcToExaminerData', this.searchParam)
        .then((data) => {
          console.log('fetchAsNuToRcToExaminerData -2', data);
          this.loading = false;
          this.sl_count = data.from;
          this.pagination.totalItems = data.from;

          this.tsDialog = false;
        });
    },

    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getExamAsCollFromRegDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm('Are you sure that you want to delete?')
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch('deleteExamAsCollFromRegItem', id)
              .then(function() {
                self.searchAnsScriptList();
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.searchAnsScriptList();
              });
          }
        });
    },
  },
  watch: {
    pagination() {
      this.fetchAsNuToRcToExaminerData();
    },
  },
};
</script>

<style scoped></style>
