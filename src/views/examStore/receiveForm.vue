<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="validet()">
          Receive Items
        </v-btn>
      </template>
      <!-- dialog header -->
      <v-card>
        <v-toolbar dark color="indigo">
          <v-toolbar-title>Receive Item Form</v-toolbar-title>
          <v-spacer />
          <v-btn
            fab
            class="ma-1 pa-0"
            small
            color="red darken-3 white--text"
            @click="(dialog = false), clearobj()"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- dialog body -->

        <!-- Item Receiver from -->
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <div class="dark--text">
                <div id="input_area">
                  <template>
                    <v-form v-model="valid">
                      <v-layout>
                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="itemListObject.rc_np"
                            :rules="RcRules"
                            label="Receive No"
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="itemListObject.mrr_no"
                            :rules="MrrRules"
                            label="MRR No"
                            type="number"
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="itemListObject.date"
                            :rules="DateRules"
                            label="Date"
                            type="date"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </template>
                  <template>
                    <v-form v-model="valid">
                      <v-layout>
                        <v-flex xs12 md6>
                          <v-text-field
                            v-model="itemListObject.rc_by"
                            :rules="RcByRules"
                            label="Received By"
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md6>
                          <v-text-field
                            v-model="itemListObject.remarks"
                            :rules="RemarkRules"
                            label="Remarks"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </template>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Item Receive from -->
        <div id="input_area">
          <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-toolbar card>
                <v-toolbar-title>Receive Items</v-toolbar-title>
              </v-toolbar>
              <v-card
                color="grey lighten-5"
                class="scroll dark--text"
                height="280px"
              >
                <template>
                  <v-form v-model="valid">
                    <v-container fluid>
                      <v-layout
                        row
                        v-for="(items, index) in itemListObject"
                        :key="index"
                      >
                        <v-flex>
                          <h3 id="sl_number">{{ index + 1 }}</h3>
                        </v-flex>
                        <v-flex xs12 md4>
                          <v-select
                            :items="getExamStoreItemListData"
                            label="Item Name*"
                            item-text="item_name"
                            item-value="item_id"
                            v-model="items.item_name"
                            :rules="itemRules"
                            required
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 md4>
                          <v-select
                            :items="getExamStoreUnitList"
                            label="Unit In*"
                            item-text="unit_name"
                            item-value="unit_id"
                            v-model="items.unit_name"
                            :rules="unitRules"
                            required
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="items.received_quantity"
                            :rules="quantityRules"
                            label="Quantity"
                            type="number"
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md4>
                          <v-text-field
                            v-model="items.remarks"
                            :rules="RemarkRules"
                            label="Remarks"
                            required
                          ></v-text-field>
                        </v-flex>

                        <v-flex id="delete_btn">
                          <v-btn
                            fab
                            class="ma-1 pa-0"
                            small
                            color="red darken-3 white--text"
                            v-if="index == 0"
                            disabled
                            @click="removeRow(index)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                          <v-btn
                            fab
                            class="ma-1 pa-0"
                            small
                            color="red darken-3 white--text"
                            v-if="index !== 0"
                            @click="removeRow(index)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </template>
                <v-card-actions>
                  <v-btn
                    fab
                    class="ma-1 pa-0"
                    small
                    color="indigo darken-3 white--text"
                    @click="addRow()"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>

              <v-card-actions>
                <v-spacer />
                <v-btn color="indigo white--text" text @click="dialog = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      firstname: "",
      lastname: "",
      RcRules: [(v) => !!v || "Receive No is is required"],
      MrrRules: [(v) => !!v || "MRR no is required"],
      DateRules: [(v) => !!v || "Receive Date no is required"],
      RcByRules: [(v) => !!v || "Receive person name is required"],
      RemarkRules: [(v) => !!v || "Remarks is required"],
      itemRules: [(v) => !!v || "Select a item is required"],
      unitRules: [(v) => !!v || "Select unit is required"],
      quantityRules: [(v) => !!v || "Item Quantity is required"],
      itemListObject: [],
    };
  },
  created() {
    this.addRow();
    this.fatchExamStoreItemList();
    this.fetchExamStoreUnitList();
  },
  computed: {
    getExamStoreItemListData() {
      return this.$store.getters.getExamStoreItemListData
        ? this.$store.getters.getExamStoreItemListData
        : [];
    },
    getExamStoreUnitList() {
      return this.$store.getters.getExamStoreItemUnitList
        ? this.$store.getters.getExamStoreItemUnitList
        : [];
    },
  },
  methods: {
    addRow() {
      this.itemListObject.push({
        item_name: "",
        item_id: "",
        unit_id: "",
        received_quantity: "",
        remarks: "",
      });
    },

    removeRow(index) {
      if (this.itemListObject.length > 1) {
        this.itemListObject.splice(index, 1);
      }
    },
    validet(){
      this.RcRules= [(v) => !!v || "Receive No is is required"];
      this.MrrRules= [(v) => !!v || "MRR no is required"];
      this.DateRules= [(v) => !!v || "Receive Date no is required"];
      this.RcByRules= [(v) => !!v || "Receive person name is required"];
      this.RemarkRules= [(v) => !!v || "Remarks is required"];
      this.itemRules= [(v) => !!v || "Select a item is required"];
      this.unitRules= [(v) => !!v || "Select unit is required"];
      this.quantityRules= [(v) => !!v || "Item Quantity is required"];
    },
    clearobj() {
      this.itemListObject = [{}];
      this.RcRules= [];
      this.MrrRules= [];
      this.DateRules= [];
      this.RcByRules= [];
      this.RemarkRules= [];
      this.itemRules= [];
      this.unitRules= [];
      this.quantityRules= [];
    },

    //get Exam Store Item List
    fatchExamStoreItemList() {
      this.$store.dispatch("fetchExamStoreItemList");
    },

    //get Exam Store Item unit list
    fetchExamStoreUnitList() {
      this.$store.dispatch("fetchEditExamStoreItemsUnit");
    },
  },
};
</script>

<style>
#input_area {
  padding-left: 50px;
  padding-right: 50px;
}
.scroll {
  overflow-y: scroll;
}
#sl_number {
  margin-top: 20px;
}
#delete_btn {
  margin-top: 5px;
}
</style>
