<template>
  <v-container fluid>
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
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
                          @click="dialog = false"
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
                            :items="['KG', 'PIC']"
                            label="Unit In*"
                            v-model="unit_id"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['Active', 'Inactive']"
                            label="Status*"
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
                              unit_id,
                              item_status
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
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        class="ma-1 pa-0"
                        small
                        color="indigo white--text"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        @click="updateItem(props.item.id,props.item.item_name,props.item.item_code,props.item.unit_id,props.item.item_status)"
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
                            @click="dialog = false"
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
                              v-model="updateItemList.item_name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Item Code*"
                              type="number"
                              v-model="updateItemList.item_code"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="['KG', 'PIC']"
                              label="Unit In*"
                              v-model="updateItemList.unit_id"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="['Active', 'Inactive']"
                              label="Status*"
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
                                item_name,
                                item_code,
                                unit_id,
                                item_status
                              )
                          "
                        >
                          UPDATE
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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

      dialog: false,
      updateItemList:[],
    };
  },
  created() {
    this.fatchExamStoreItemList();
    this.edititemlist();
  },
  computed: {
    getExamStoreItemListData() {
      return this.$store.getters.getExamStoreItemListData
        ? this.$store.getters.getExamStoreItemListData
        : [];
    },
  },
  watch: {
    getExamStoreItemListData(cv) {
      console.log("Item List", cv);
    },
  },
  methods: {
    fatchExamStoreItemList() {
      this.$store.dispatch("fetchExamStoreItemList");
    },

    additemlist(item_name, item_code, unit_id, item_status) {
      console.log(item_name, item_code, unit_id, item_status);
    },

    updateItem(id,item_name, item_code, unit_id, item_status){
        //  console.log(A,B,C,D,E);
         this.updateItemList = ([id,item_name, item_code, unit_id, item_status])
          console.log(updateItemList);
    },
  },
};
</script>

<style></style>
