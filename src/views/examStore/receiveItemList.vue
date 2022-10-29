<template>
  <v-containe fluid>
    <v-containe fluid>
      <div id="main_contaont">
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
              <v-btn color="primary">Receive</v-btn>
            </v-card-actions>
          </v-layout>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="getExaMRexeivedItemsList"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <tr>
              <td>{{ props.index + 1 }}</td>
              <td>{{ props.item.received_by }}</td>
              <td>{{ props.item.mrr_no }}</td>
              <td>{{ props.item.received_no }}</td>
              <td>{{ props.item.received_date }}</td>
              <td>{{ props.item.remarks }}</td>
              <td>
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
                          @click="getreceiveditem(props.item.item_details)"
                        >
                          <v-icon dark>visibility</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-toolbar>
                          <v-badge left overlap>
                            <v-card-text class="title"
                              >Item Received</v-card-text
                            >
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
                            {{ updateItemListtada}}
                            <v-data-table
                              :headers="headerstada"
                              :items="updateItemListtada"
                              :items-per-page="5"
                              class="elevation-1"
                            ></v-data-table>
                            <template v-slot:items="props">
                              <tr>
                                <td>{{ props.index + 1 }}</td>
                                <td>{{ props.item.item}}</td>
                                <td></td>
                              </tr>
                              </template>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <!-- <v-btn color="indigo white--text" text>
                            UPDATE
                          </v-btn> -->
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>

                <!-- <v-btn fab class="ma-1 pa-0" small color="red white--text">
                  <v-icon dark>delete</v-icon>
                </v-btn> -->
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </v-containe>
    <template> </template>
  </v-containe>
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
          text: "Received By",
          value: "received_by",
        },
        {
          text: "MRR No",
          value: "mrr_no",
        },
        {
          text: "Receive No",
          value: "received_no",
        },
        {
          text: "Received Date",
          value: "received_date",
        },
        {
          text: "Remarks",
          value: "remarks",
        },
        {
          text: "Action",
          value: "",
        },
      ],

      headerstada: [
        {
          text: "SL",
          value: "",
        },
        {
          text: "Item Name",
          value: "received_by",
        },
        {
          text: "Received Quantity",
          value: "received_quantity",
        },
        {
          text: "Remarks",
          value: "remarks",
        },
      ],
      dialog: false,
      updateItemListtada: [],
    };
  },

  created() {
    this.getExamStoreReceivedItemList();
  },

  computed: {
    getExaMRexeivedItemsList() {
      return this.$store.getters.getExaMRexeivedItemsList
        ? this.$store.getters.getExaMRexeivedItemsList
        : [];
    },
  },

  watch: {
    getExaMRexeivedItemsList(cv) {
      console.log("Item Received List", cv);
    },
  },

  methods: {
    getExamStoreReceivedItemList() {
      this.$store.dispatch("fetchExamStoreReceivedItemList");
    },

    getreceiveditem(tada) {
      this.updateItemListtada = tada;
      console.log(tada);
    },
  },
};
</script>

<style>
#main_contaont {
  margin: 40px;
}
</style>
