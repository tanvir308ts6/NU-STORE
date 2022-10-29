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
              <td></td>
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
      dialog: false,
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
  },
};
</script>

<style>
#main_contaont {
  margin: 40px;
}
</style>
