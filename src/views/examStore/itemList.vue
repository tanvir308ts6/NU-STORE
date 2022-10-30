<template>
  <v-container fluid>
    <v-expansion-panel class="mb-3" inset v-model="custP">
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
        <v-layout column wrap>
          <v-flex class="mx-3">
            <v-layout>
              <!-- {{getLoggedInExam}} -->
              <v-flex xs12>
                <v-row>
                  <template>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="firstname"
                              label="Item Name"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-select
                              :items="itemStatusList"
                              label="Find by status"
                              item-text="value"
                              item-value="id"
                              v-model="item_status"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </template>
                </v-row>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-flex xs12 sm12 md12 class="my-3">
              <v-layout justify-center row fill-height align-center>
                <v-btn outline round large @click="searchAdmitCardList">
                  <v-icon left dark>search</v-icon>Search
                </v-btn>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-badge left overlap>
              <v-card-text class="title">Item List</v-card-text>
            </v-badge>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-spacer />
          <v-card-actions>
            <!-- <v-btn color="primary">Create ~ Theory Center Allocation</v-btn> -->
            <template>
              <v-row justify="center">
                <v-dialog v-model="dialogDibba" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="dialogDibba = true"
                    >
                      Add New Item
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar>
                      <v-badge left overlap>
                        <v-card-text class="title">Add New Item</v-card-text>
                      </v-badge>
                      <v-spacer />
                      <v-card-actions>
                        <v-btn
                          fab
                          class="ma-1 pa-0"
                          small
                          color="indigo white--text"
                          @click="dialogDibba = false"
                        >
                          X
                        </v-btn>
                      </v-card-actions>
                    </v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Item Name*"
                            required
                            v-model="item_name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Item Code*"
                            type="number"
                            v-model="item_code"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="getExamStoreUnitList"
                            label="Unit In*"
                            item-text="unit_name"
                            item-value="id"
                            v-model="unit_id"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="itemStatusList"
                            label="Status*"
                            item-text="value"
                            item-value="id"
                            v-model="item_status"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="indigo white--text"
                        text
                        @click="
                          (dialog = true),
                            additemlist(
                              item_name,
                              item_code,
                              updateItemList.unit_id,
                              updateItemList.item_status
                            )
                        "
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
          </v-card-actions>
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getExamStoreItemListData"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <tr>
            <td>{{ props.index + 1 }}</td>
            <td>{{ props.item.item_name }}</td>
            <td>{{ props.item.item_code }}</td>
            <td v-if="props.item.unit_id == 2">PIS</td>
            <td v-if="props.item.unit_id == 1">KG</td>
            <td v-if="props.item.item_status == 1">Active</td>
            <td v-if="props.item.item_status == 0">Inactive</td>
            <td align="center" justify="space-around">
              <!-- ....................................................................................... -->
              <template>
                <v-row justify="center">
                  <v-badge left overlap>
                    <v-dialog
                      v-model="dialogUlzangh"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          fab
                          class="ma-1 pa-0"
                          small
                          color="indigo white--text"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          @click="
                            updateItem(props.item);
                            dialogUlzangh = true;
                          "
                        >
                          <v-icon dark>edit</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-toolbar>
                          <v-badge left overlap>
                            <v-card-text class="title">Edit Item</v-card-text>
                          </v-badge>
                          <v-spacer />
                          <v-card-actions>
                            <v-btn
                              fab
                              class="ma-1 pa-0"
                              small
                              color="indigo white--text"
                              @click="dialogUlzangh = false"
                            >
                              X
                            </v-btn>
                          </v-card-actions>
                        </v-toolbar>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Item Name*"
                                value="item_name"
                                required
                                v-model="updateItemList.item_name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Item Code*"
                                value="item_code"
                                type="number"
                                v-model="updateItemList.item_code"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                :items="getExamStoreUnitList"
                                label="Unit In*"
                                item-text="unit_name"
                                item-value="id"
                                v-model="updateItemList.unit_id"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                :items="itemStatusList"
                                label="Status*"
                                item-text="value"
                                item-value="id"
                                v-model="updateItemList.item_status"
                                required
                              ></v-select>
                            </v-col>
                          </v-row>

                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="indigo white--text"
                            text
                            @click="
                              (dialog = true),
                                additemlist(
                                  updateItemList.item_name,
                                  updateItemList.item_code,
                                  updateItemList.unit_id,
                                  updateItemList.item_status
                                )
                            "
                          >
                            UPDATE
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-badge>
                </v-row>
              </template>

              <v-btn fab class="ma-1 pa-0" small color="red white--text">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
    <template> </template>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "SL",
          value: "",
        },
        {
          text: "Item Name",
          value: "item_name",
        },
        {
          text: "Item Code",
          value: "item_code",
        },
        {
          text: "Unit in",
          value: "unit_id",
        },
        {
          text: "Item Status",
          value: "item_status",
        },
        {
          text: "Action",
          value: "",
        },
      ],
      itemStatusList: [
        {
          id: 1,
          value: "Active",
        },
        {
          id: 0,
          value: "Inactive",
        },
      ],
      dialogDibba: false,
      dialogUlzangh: false,
      updateItemList: {
        item_name: "",
        item_code: "",
        item_status: "",
        unit_id: "",
      },
    };
  },
  created() {
    this.fatchExamStoreItemList();
    this.fetchExamStoreUnitList();
  },
  computed: {
    getExamStoreItemListData() {
      return this.$store.getters.getExamStoreItemListData
        ? this.$store.getters.getExamStoreItemListData
        : [];
    },

    getEditExamItemList() {
      return this.$store.getters.getEditExamStoreItemListData
        ? this.$store.getters.getEditExamStoreItemListData
        : [];
    },

    getExamStoreUnitList() {
      return this.$store.getters.getExamStoreItemUnitList
        ? this.$store.getters.getExamStoreItemUnitList
        : [];
    },
  },
  watch: {
    getEditExamItemList(cv) {},
    getExamStoreUnitList(crvr) {
      console.log(crvr);
    },
  },
  methods: {
    //get Exam Store Item List
    fatchExamStoreItemList() {
      this.$store.dispatch("fetchExamStoreItemList");
    },
    //get Exam Store Item List by ID
    updateItem(item) {
      this.updateItemList = {
        ...item,
        unit_id: Number(item.unit_id),
        item_status: Number(item.item_status),
      };
      console.log("tobola", item);
      this.$store.dispatch("fetchEditExamStoreItem", item.id);
    },
    //get Exam Store Item unit list
    fetchExamStoreUnitList() {
      this.$store.dispatch("fetchEditExamStoreItemsUnit");
    },

    additemlist(item_name, item_code, unit_id, id) {
      console.log(item_name, item_code, unit_id, id);
    },
  },
};
</script>

<style></style>
