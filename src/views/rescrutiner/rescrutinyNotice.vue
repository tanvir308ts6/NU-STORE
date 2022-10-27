<template>
  <v-container fluid>
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :searchRescrutinyNotice="searchRescrutinyNotice"
    ></formDialog>
    <v-expansion-panel class="mb-3" inset v-model="open">
      <v-expansion-panel-content class="CSP_BoarderStyle">
        <template v-slot:actions>
          <v-icon large color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>
            <v-icon color="primary">search</v-icon>
            <span class="pl-2 subheading">Custom Search Panel</span>
          </div>
        </template>
        <v-layout row wrap align-center>
          <v-flex class="mx-5">
            <v-layout
              class="mx-5"
              row
              wrap
              align-center
              v-if="forceRerenderFlag"
            >
              <v-flex xs9>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.exam_code"
                  :items="getExamList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Exam"
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  class="mx-3"
                  disabled
                  v-model="searchParam.year"
                  :items="getYearList"
                  :item-text="(item) => '' + item.year + ''"
                  item-value="year"
                  label="Year"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>
          <!-- <v-flex xs12>
            <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
              <v-layout row wrap align-center class="py-3">
                <v-flex xs12>
                  <v-autocomplete
                    outline
                    class="ma-3"
                    v-model="searchParam.paper_code"
                    :item-text="item => item.code + ' - ' + item.title"
                    item-value="code"
                    :items="getPaperList"
                    menu-props="auto"
                    label="Select Paper"
                    hide-details
                    prepend-inner-icon="library_books"
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        close
                        @input="remove(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                      >
                        {{
                        '(' + data.item.code + ') ' + data.item.title
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
                              '(' + data.item.code + ') ' + data.item.title
                            "
                          ></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>-->
          <v-flex xs12 sm12 md12 class="mb-3 mt-2">
            <v-layout justify-center row fill-height align-center>
              <v-btn outline round large @click="searchRescrutinyNotice()">
                <v-icon left dark>search</v-icon>Search
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Rescrutiny Notice List</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-card-actions>
            <v-btn @click="newItem" color="primary" dark>Create Notice</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getRescrutinyNoticeDataList"
        class="elevation-1"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
      >
        <template v-slot:items="props">
          <td>{{ sl_count + props.index }}</td>
          <td class="text-xs-center">{{ props.item.activity_name }}</td>
          <td class="text-xs-center">{{ props.item.notice }}</td>
          <td class="text-xs-center">
            {{ dateFormatted(props.item.from_date) }}
          </td>
          <td class="text-xs-center">
            {{ dateFormatted(props.item.to_date) }}
          </td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{on}">
                  <v-btn fab small color="primary" v-on="on">
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
              <v-tooltip right color="red">
                <template v-slot:activator="{on}">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white"
                      >delete</v-icon
                    >
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formDialog from '@/components/rescrutiner/rescrutinyNoticeForm.vue';
import commonGet from '../../mixin/common_getters_mixin';
import commonExamYear from '../../mixin/exam_year_watch_mixin';
import moment from 'moment';

export default {
  components: {
    formDialog,
  },
  mixins: [commonGet, commonExamYear],
  data() {
    return {
      forceRerenderFlag: true,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [5, 10, 25, {text: 'All', value: -1}],
      },
      sl_count: 1,
      loading: true,
      dialog: false,
      loadData: false,
      totalDataItems: 0,
      formDialogStatus: false,
      search: '',
      searchParam: {},
      limit: {},
      headers: [
        {text: 'SL.', align: 'left', value: 'id', width: '10'},
        {text: 'Exam Activity', align: 'center', value: 'activity_name'},
        {text: 'Notice', align: 'center', value: 'notice'},
        {text: 'Start Date', align: 'center', value: 'from_date'},
        {text: 'End Date', align: 'center', value: 'to_date'},
        {text: 'Action', align: 'center', value: 'id', sortable: false},
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.$store.dispatch('fetchPaperData');
    this.searchParam.tag = 'RescrutinyResultPublished';
  },
  mounted() {
    //this.getDataFromApi();
  },
  watch: {
    pagination() {
      this.searchRescrutinyNotice();
    },
  },
  computed: {
    getRescrutinyNoticeDataList() {
      return this.$store.getters.getRescrutinyNoticeDataList;
    },
  },
  methods: {
    dateFormatted(date) {
      return moment(date).format('Do MMMM, YYYY (dddd)');
    },
    unSetEditedData() {
      this.editedItem = {
        id: '',
        exam_code: '',
        year: '',
        activity_id: '',
        notice: '',
        from_date: '',
        to_date: '',
        name: '',
        file: '',
      };
    },
    setLimit() {
      const {sortBy, descending, page, rowsPerPage} = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    searchRescrutinyNotice() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch('searchRescrutinyNotice', this.searchParam)
        .then((data) => {
          console.log('data---', data);
          this.loading = false;
          this.sl_count = data.meta.from;
          this.pagination.totalItems = data.meta.total;
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
      this.editedIndex = this.getRescrutinyNoticeDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    remove(item) {
      const index = this.searchParam.paper_code.indexOf(item.code);
      if (index >= 0) this.searchParam.paper_code.splice(index, 1);
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;

      this.$root
        .$confirm('Are you sure that you want to delete?')
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch('deleteRescrutinyNoticeItem', id)
              .then(function() {
                self.setLimit();
                self.searchRescrutinyNotice();
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.searchRescrutinyNotice();
              });
          }
        });
    },
  },
};
</script>

<style scoped></style>
