<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs7>
        <v-container fluid>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title"
                  >Exam Wise Delivery Options</v-card-text
                >
              </v-card>
              <v-divider class="my-2" vertical></v-divider>

              <v-spacer />

              <v-dialog v-model="dialogEW" max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-on="on"
                    @click="newItemEW()"
                    >New Item</v-btn
                  >
                </template>
                <v-card style="padding: 0px">
                  <v-toolbar color="primary white--text" flat>
                    <v-card-title>
                      <span class="headline">{{ formTitleEW }}</span>
                    </v-card-title>
                  </v-toolbar>
                  <formNotification />

                  <v-card-text>
                    <v-container style="padding: 0px">
                      <v-layout wrap>
                        <!-- {{getDeliveryOptionsData}} -->
                        <v-flex xs8>
                          <v-autocomplete
                            class="ma-2"
                            v-model="editedItemEW.delivery_option_id"
                            :item-text="(item) => item.delivery_name"
                            item-value="id"
                            :items="filteredDeliveryOptionsData"
                            menu-props="auto"
                            label="Select An Option"
                            prepend-icon="subject"
                            outline
                            hide-details
                          >
                            <template v-slot:selection="data">
                              <v-chip
                                close
                                @input="editedItemEW.delivery_option_id = ''"
                                :selected="data.selected"
                                class="chip--select-multi title"
                                color="#FAFAFA"
                                >{{ data.item.delivery_name }}</v-chip
                              >
                            </template>
                            <template v-slot:item="data">
                              <template v-if="typeof data.item !== 'object'">
                                <v-list-tile-content
                                  v-text="data.item.delivery_name"
                                ></v-list-tile-content>
                              </template>
                              <template v-else>
                                <v-list-tile-content>
                                  <v-list-tile-title
                                    v-html="data.item.delivery_name"
                                  ></v-list-tile-title>
                                </v-list-tile-content>
                              </template>
                            </template>
                          </v-autocomplete>
                          <!-- <v-text-field
                            v-model="editedItemEW.delivery_name"
                            label="Delivery Name"
                            outline
                            prepend-icon="edit"
                            hide-details
                          ></v-text-field>-->
                        </v-flex>
                        <v-flex xs1></v-flex>

                        <v-flex xs3 style="margin-top: -20px">
                          <v-radio-group
                            v-model="editedItemEW.status"
                            :mandatory="false"
                          >
                            <v-radio label="ON" value="1"></v-radio>
                            <v-radio label="OFF" value="0"></v-radio>
                          </v-radio-group>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-divider class="pb-3" />
                  <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>
                    <v-btn large v-if="newBtnEW" color="primary" @click="saveEW"
                      >Save</v-btn
                    >
                    <v-btn
                      large
                      v-if="editBtnEW"
                      color="primary"
                      @click="editEW"
                      >Edit</v-btn
                    >
                    <v-btn color="blue darken-1" flat @click="closeEW"
                      >Cancel</v-btn
                    >
                  </v-card-actions>
                  <!-- {{editedItemEW}} -->
                </v-card>
              </v-dialog>
            </v-layout>
          </v-card>
          <v-data-table
            :headers="headersEW"
            :items="getDeliveryOptionsDataEW"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.index + 1 }}</td>
              <!-- <td class="text-xs-left">C({{ props.item.exam_code }})-Y({{ props.item.exam_year }})</td> -->
              <td class="text-xs-left">
                {{ props.item.options.delivery_name }}
              </td>
              <td class="text-xs-left">
                <v-chip
                  color="green white--text"
                  class
                  v-if="parseInt(props.item.status) == 1"
                >
                  <b>ON</b>
                </v-chip>
                <v-chip
                  color="red white--text"
                  class
                  v-if="parseInt(props.item.status) != 1"
                >
                  <b>OFF</b>
                </v-chip>
              </td>

              <td class="text-xs-left">
                <v-item-group>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn fab small color="primary" v-on="on">
                        <v-icon
                          @click="editItemEW(props.item)"
                          class="mr-0"
                          color="white"
                          >edit</v-icon
                        >
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                </v-item-group>
              </td>
            </template>
          </v-data-table>
        </v-container>
      </v-flex>
      <v-flex xs5>
        <v-container fluid>
          <v-card color="white">
            <v-layout row>
              <v-card flat>
                <v-card-text class="title">Delivery Options</v-card-text>
              </v-card>
              <v-divider class="my-2" vertical></v-divider>

              <v-spacer />

              <v-dialog v-model="dialog" max-width="300px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="false"
                    color="primary"
                    dark
                    class="mb-2"
                    v-on="on"
                    @click="newItem()"
                    >New Item</v-btn
                  >
                </template>
                <v-card style="padding: 0px">
                  <v-toolbar color="primary white--text" flat>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                  </v-toolbar>
                  <formNotification />

                  <v-card-text>
                    <v-container style="padding: 10px">
                      <v-layout wrap>
                        <!-- <v-flex xs8>
                          <v-text-field
                            v-if="false"
                            v-model="editedItem.delivery_name"
                            label="Delivery Name"
                            outline
                            prepend-icon="edit"
                            hide-details
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs1></v-flex> -->

                        <v-flex xs12 style="margin-top: -20px">
                          <v-radio-group
                            v-model="editedItem.status"
                            :mandatory="false"
                          >
                            <v-radio label="ON" value="1"></v-radio>
                            <v-radio label="OFF" value="0"></v-radio>
                          </v-radio-group>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn large v-if="newBtn" color="primary" @click="save"
                      >Save</v-btn
                    >
                    <v-btn large v-if="editBtn" color="primary" @click="edit"
                      >Edit</v-btn
                    >
                    <v-btn color="blue darken-1" flat @click="close"
                      >Cancel</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-card>
          <v-data-table
            :headers="headers"
            :items="getDeliveryOptionsData"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.index + 1 }}</td>
              <td class="text-xs-left">{{ props.item.delivery_name }}</td>
              <td class="text-xs-left">
                <v-chip
                  color="green white--text"
                  class
                  v-if="parseInt(props.item.status) == 1"
                >
                  <b>ON</b>
                </v-chip>
                <v-chip
                  color="red white--text"
                  class
                  v-if="parseInt(props.item.status) != 1"
                >
                  <b>OFF</b>
                </v-chip>
              </td>

              <td class="text-xs-left">
                <v-item-group>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
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
                </v-item-group>
              </td>
              <!-- <td class="text-xs-left">
            <v-item-group>
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white">delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-item-group>
              </td>-->
            </template>
          </v-data-table>
        </v-container>
      </v-flex>
    </v-layout>
    <!-- <pre> {{getExamInitiateItem}} </pre> -->
    <!-- <pre> {{ getDeliveryOptionsDataEW }}</pre> -->
  </v-container>
</template>


<script>
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "@/mixin/common_getters_mixin";
import formNotification from "@/components/utils/formNotification";
export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  data: () => ({
    editBtn: true,
    newBtn: true,
    dialog: false,
    pagination: { rowsPerPage: -1 },

    headers: [
      {
        text: "Sl",
        align: "left",
        sortable: false,
        value: "activity_name",
      },
      {
        text: "Delivery Name",
        align: "left",
        sortable: false,
        value: "delivery_name",
      },
      {
        text: "Status",
        align: "left",
        value: "status",
        sortable: false,
      },

      {
        text: "Edit",
        align: "left",
        value: "name",
        sortable: false,
      },
    ],

    editedIndex: -1,
    editedItem: {
      delivery_name: "",
      status: "",
    },
    defaultItem: {
      delivery_name: "",
      status: "",
    },

    editBtnEW: true,
    newBtnEW: true,
    dialogEW: false,

    headersEW: [
      {
        text: "Sl",
        align: "left",
        sortable: false,
        value: "activity_name",
      },
      // {
      //   text: "Exam",
      //   align: "left",
      //   sortable: false,
      //   value: "exam_code",
      // },
      {
        text: "Option",
        align: "left",
        sortable: false,
        value: "option",
      },
      {
        text: "Status",
        align: "left",
        value: "status",
        sortable: false,
      },

      {
        text: "Edit",
        align: "left",
        value: "name",
        sortable: false,
      },
    ],

    editedIndexEW: -1,
    editedItemEW: {
      exam: "",
      status: "",
    },
    defaultItemEW: {
      delivery_name: "",
      status: "",
    },
  }),

  created() {
    this.$store.dispatch("fetchDeliveryOptionsData");
    this.$store.dispatch("fetchDeliveryOptionsDataEW");

    this.initialize();
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.getExamInitiateData();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    formTitleEW() {
      return this.editedIndexEW === -1
        ? "Add New Option For A Exam"
        : "Edit Option For A Exam";
    },
    getDeliveryOptionsData() {
      return this.$store.getters.getDeliveryOptionsData;
    },
    filteredDeliveryOptionsData() {
      return this.getDeliveryOptionsData.filter((obj) => {
        return parseInt(obj.status) == 1;
      });
    },
    getDeliveryOptionsDataEW() {
      return this.$store.getters.getDeliveryOptionsDataEW;
    },
    getExamInitiateItem() {
      return this.$store.getters.getExamInitiateList;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogEW(val) {
      val || this.closeEW();
    },
  },

  methods: {
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
        }
      });
    },
    initialize() {
      this.desserts = [
        {
          activity_name: "Frozen Yogurt",
          tag: "t1",
          sl: 0,
          description: "des 1",
        },
        {
          activity_name: "Ice cream sandwich",
          tag: "t2",
          sl: 0,
          description: "des 2",
        },
        {
          activity_name: "Eclair",
          tag: "t3",
          sl: 0,
          description: "des 2",
        },
      ];
    },
    newItem() {
      this.editBtn = false;
      this.newBtn = true;
    },
    newItemEW() {
      this.editBtnEW = false;
      this.newBtnEW = true;
    },

    editItem(item) {
      this.editedIndex = 1;
      this.editBtn = true;
      this.newBtn = false;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    editItemEW(item) {
      this.editedIndexEW = 1;
      this.editBtnEW = true;
      this.newBtnEW = false;
      this.editedItemEW = Object.assign({}, item);
      this.editedItemEW.delivery_option_id = parseInt(
        this.editedItemEW.delivery_option_id
      );
      this.dialogEW = true;
    },

    deleteItem(item) {
      this.delete(item);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    closeEW() {
      this.dialogEW = false;
      setTimeout(() => {
        this.editedItemEW = Object.assign({}, this.defaultItemEW);
        this.editedIndexEW = -1;
      }, 300);
    },

    save() {
      this.$store
        .dispatch("addDeliveryOptionsData", this.editedItem)
        .then(() => {
          this.$store.dispatch("fetchDeliveryOptionsData");
          this.close();
        })
        .catch(function (error) {
          this.$store.dispatch("fetchDeliveryOptionsData");
        });
    },

    saveEW() {
      this.editedItemEW.exam_initiate_id = this.getExamInitiateId;
      this.editedItemEW.exam_year = this.getLoggedInYear.year;
      this.editedItemEW.exam_code = this.getLoggedInExam.code;
      this.$store
        .dispatch("addDeliveryOptionsDataEW", this.editedItemEW)
        .then(() => {
          this.$store.dispatch("fetchDeliveryOptionsDataEW");
          this.close();
        })
        .catch(function (error) {
          this.$store.dispatch("fetchDeliveryOptionsDataEW");
        });
    },

    edit() {
      this.editBtn = true;
      this.newBtn = false;
      let self = this;
      this.$store
        .dispatch("editDeliveryOptionsData", this.editedItem)
        .then((status) => {
          self.$store.dispatch("fetchDeliveryOptionsData").then(() => {
            self.dialog = false;
          });
        })
        .catch(function (error) {
          console.log("ERR ", error);
          self.$store.dispatch("fetchDeliveryOptionsData");
        });
    },

    editEW() {
      console.log("here ");
      this.editBtnEW = true;
      this.newBtnEW = false;
      let self = this;

      this.editedItemEW.exam_initiate_id = this.getExamInitiateId;
      this.editedItemEW.exam_year = this.getLoggedInYear.year;
      this.editedItemEW.exam_code = this.getLoggedInExam.code;
      this.$store
        .dispatch("editDeliveryOptionsDataEW", this.editedItemEW)
        .then((status) => {
          self.$store.dispatch("fetchDeliveryOptionsDataEW").then(() => {
            self.dialogEW = false;
          });
        })
        .catch(function (error) {
          self.$store.dispatch("fetchDeliveryOptionsDataEW");
        });
    },

    delete(item) {
      let that = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then((confirm) => {
          if (confirm) {
            that.$store
              .dispatch("deleteDeliveryOptionsData", item)
              .then(() => {
                that.$store.dispatch("fetchDeliveryOptionsData");
              })
              .catch(function (error) {
                that.$store.dispatch("fetchDeliveryOptionsData");
              });
            that.close();
          }
        });
    },

    getExamInitiateData() {
      let param = {};
      param.page = 1;
      param.limit = -1;
      this.$store.dispatch("callExamInitiateData", param).then((data) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>