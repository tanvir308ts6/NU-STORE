<template>
  <v-container fluid style="padding-top:10px">
    <!-- {{getSubMenuDataList[65]}} -->
    <formDialog
      :dialogStatus.sync="formDialogStatus"
      :editedData="editedItem"
      :indexEdited.sync="editedIndex"
      :searchParam="searchParam"
    ></formDialog>

    <v-layout row wrap align-center>
      <v-flex xs2></v-flex>
      <v-flex xs8>
        <v-autocomplete
          label="Select Menu"
          :item-text="(item) => item.id + ' - ' + item.menu_name"
          item-value="id"
          v-model="searchParam.menu_id"
          :items="getMenuList"
          class="mx-5 my-2"
          hide-details
          prepend-inner-icon="edit"
        >
          <template v-slot:selection="data">
            <v-chip
              close
              @input="searchParam.menu_id = ''"
              :selected="data.selected"
              class="chip--select-multi"
              color="#EBEBEB"
            >
              <div class="title">{{ data.item.menu_name }}</div>
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title
                  v-html="data.item.menu_name"
                ></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>

      <v-flex xs2>
        <v-layout justify-center row fill-height align-center>
          <v-btn
            style="margin-left:-40em"
            outline
            round
            @click="searchSubmenuList"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <!-- <v-flex xs1></v-flex> -->
    </v-layout>

    <v-container fluid style="padding-top:10px">
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">SubMenu List</v-card-text>
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
          <v-card-actions>
            <v-btn outline small @click="addDivider" color="primary" dark
              >Add A Divider</v-btn
            >
            <v-btn @click="newItem" color="primary" dark
              >Create New SubMenu</v-btn
            >
          </v-card-actions>
        </v-layout>
      </v-card>

      <v-data-table
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        :rows-per-page-items="pagination.rowsPerPageItems"
        :loading="loading"
        v-if="true"
        :headers="headers"
        :items="getSubMenuDataList"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.index + sl_count }}</td>
          <!-- <td class="text-xs">{{ props.item.id }}</td> -->
          <td class="text-xs">{{ getMenuName(props.item.menu) }}</td>
          <td class="text-xs">{{ props.item.sub_menu_name }}</td>
          <td class="text-xs">{{ props.item.tag_name }}</td>
          <td class="text-xs">{{ props.item.sl_no }}</td>
          <td class="text-xs subheading">
            {{ props.item.menu_url }}
            <v-icon small @click="openANewTab(props.item.menu_url)"
              >link</v-icon
            >
          </td>
          <td class="text-xs">
            <v-icon>{{ props.item.icon }}</v-icon>
          </td>
          <td class="text-xs">{{ getStatus(props.item.status) }}</td>
          <!-- <td class="justify-center text-xs-center">
            <v-chip color="#FB8C00" text-color="white" v-if="props.item.status == 0">Pending</v-chip>
            <v-chip color="#388E3C" text-color="white" v-if="props.item.status == 1">Received</v-chip>
          </td>-->
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
import formDialog from '@/components/subMenu/subMenuForm.vue';
import commonGet from '../../mixin/common_getters_mixin';
export default {
  mixins: [commonGet],
  components: {
    formDialog,
  },
  data() {
    return {
      open: -1,
      pagination: {
        rowsPerPage: 10,
        rowsPerPageItems: [10, 25, {text: 'All', value: -1}],
      },
      dialog: false,
      sl_count: 1,
      searchParam: {},
      formDialogStatus: false,
      search: '',
      loading: false,
      headers: [
        {
          text: 'SL.',
          align: 'left',
          value: 'id',
          width: '10',
          sortable: false,
        },
        {text: 'Menu', value: 'menu.menu_name', sortable: false},
        {text: 'SubMenu', value: 'sub_menu_name', sortable: false},
        {text: 'Tag Name', value: 'tag_name', sortable: false},
        {text: 'SL. No', value: 'sl_no', sortable: false},
        {text: 'Submenu Url', value: 'menu_url', sortable: false},
        {text: 'Icon', value: 'icon', sortable: false},
        {text: 'Active', value: 'status', sortable: false},
        {text: 'Action', align: 'center', value: 'actions', sortable: false},
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
    };
  },
  created() {
    this.$store.commit('UNSET_FORMNOTIFY');
    this.$store.dispatch('fetchSubMenuData');
    this.$store.dispatch('fetchMenuData');
  },
  watch: {
    pagination() {
      this.searchSubmenuList();
    },
  },
  computed: {
    getSubMenuDataList() {
      return this.$store.getters.getSubMenuDataList;
    },
  },
  methods: {
    setLimit() {
      const {sortBy, descending, page, rowsPerPage} = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      this.searchParam.sortBy = sortBy;
      this.searchParam.search = this.search;
    },
    openANewTab(link) {
      this.$router.push(link);
      // window.open("https://www.codexworld.com", "_blank");
    },
    getMenuName(menu) {
      try {
        //console("menu", menu);
        return menu.menu_name;
      } catch (ex) {
        console.log(ex);
      }
    },
    getStatus(status) {
      var status = status == 1 ? 'Yes' : 'No';
      return status;
    },
    unSetEditedData() {
      this.editedItem = {
        id: '',
        menu_id: -1,
        sub_menu_name: '',
        sl_no: '',
        status: 1,
        menu_url: '',
        tag_name: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    addDivider() {
      this.editedItem = {
        id: '',
        menu_id: -1,
        sub_menu_name: '----------',
        sl_no: '',
        status: 1,
        tag_name: '',
        menu_url: 'divider',
        created_at: '',
        updated_at: '',
        deleted_at: '',
      };
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = this.getSubMenuDataList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.error(
        'sp: delete this line while working for tags, or else ask sp'
      );
      // this.editedItem.tag_name = "tag";
      // delete this line while working for tags
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
              .dispatch('deleteSubMenuItem', id)
              .then(function(data) {
                self.$store.dispatch('fetchSubMenuData');
              })
              .catch(function(error) {
                console.log(error);
                self.$store.dispatch('fetchSubMenuData');
              });
          }
        });
    },
    searchSubmenuList() {
      this.loading = true;
      this.setLimit();
      var self = this;
      this.$store
        .dispatch('searchSubmenuData', this.searchParam)
        .then((data) => {
          console.log('return data searchSubmenuData-<', data);
          self.loading = false;
          console.log('hi', data);
          self.sl_count = data.from;
          self.pagination.totalItems = data.total;
        });
    },
    // searchSubmenuList() {
    //   this.$store.dispatch("searchSubmenuData", this.searchParam).then(() => {
    //     //
    //   });
    // },
  },
};
</script>

<style scoped></style>
