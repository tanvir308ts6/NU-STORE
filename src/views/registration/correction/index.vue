<template>
  <v-container fluid>
    <div>
      <confirmDialog
        :dialogStatus.sync="dialogStatus"
        :confirmData="confirmData"
      ></confirmDialog>
    </div>

    <searchPanel :pagination="pagination"></searchPanel>

    <br />
    <v-card color="white">
      <v-layout row>
        <v-card flat>
          <v-card-text class="title"
            >Registration Card Correction List</v-card-text
          >
        </v-card>
        <v-divider></v-divider>
        <!--<v-text-field
                        v-model="search"
                        prepend-inner-icon="search"
                        label="Search"
                        class="mt-0"
                        hide-details
                        solo
                        flat
                        single-line
                ></v-text-field>-->
        <v-spacer />
      </v-layout>
    </v-card>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getSchema"
      item-key="id"
      select-all
      class="elevation-1"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
      :loading="loading"
      :rows-per-page-items="pagination.rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.reg_no }}</td>
        <td class="text-xs-center">{{ props.item.ac_session }}</td>
        <td class="text-xs-center">{{ props.item.prev_std_name }}</td>
        <td class="text-xs-center">
          {{
            props.item.degrees.degree_name
              ? props.item.degrees.degree_name
              : "N/A"
          }}
        </td>
        <td class="text-xs-center">{{ props.item.college_name }}</td>
        <td class="text-xs-center">
          {{ props.item.amount_pay ? props.item.amount_pay : "N/A" }}
        </td>
        <td class="text-xs-center">
          {{ formatDate(props.item.approved_date) }}
        </td>
        <td class="text-xs-center">
          <v-chip
            v-if="props.item.correction_type === '6'"
            small
            color="green"
            text-color="white"
          >
            Correction
          </v-chip>
          <v-chip v-else color="primary" small text-color="white">
            Duplicate</v-chip
          >
        </td>
        <td class="justify-center layout px-0">
          <v-btn color="warning" fab small dark @click="showItem(props.item)">
            <v-icon>list</v-icon>
          </v-btn>
          <v-btn
            v-if="props.item.reg_card"
            color="indigo"
            fab
            small
            dark
            @click="download(props.item)"
          >
            <v-icon>get_app</v-icon>
          </v-btn>
        </td>
      </template>

      <template v-slot:no-data> </template>
      <template v-slot:footer v-if="selected.length > 0">
        <td :colspan="headers.length + 1">
          <div class="justify-center layout px-0 mt-2">
            <v-btn color="primary" dark @click="confirm()">Download</v-btn>
          </div>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import confirmDialog from "@/components/registration/regCardCorrection.vue";
import searchPanel from "@/components/registration/regCorrectionSearch.vue";
import moment from "moment";

export default {
  components: {
    confirmDialog,
    searchPanel
  },

  data: () => ({
    dialogStatus: false,
    selected: [],
    confirmData: [],
    pagination: {
      rowsPerPage: 10
    },
    loading: true,
    searchParam: {},
    search: "",

    headers: [
      { text: "Reg. No.", align: "center", value: "reg_no" },
      { text: "Session", align: "center", value: "ac_session" },
      { text: "Name", align: "center", value: "prev_std_name" },
      { text: "Degree", align: "center", value: "degree", sortable: false },
      { text: "College", align: "center", value: "college_name" },
      { text: "Amount Paid", align: "center", value: "amount_pay" },
      { text: "Approve Data", align: "center", value: "approved_date" },
      { text: "Type", align: "center", value: "correction_type" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],

    correctionType: [
      { id: "6", type: "Correction" },
      { id: "7", type: "Duplicate" }
    ]
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getRegCorrectionData;
    },
    /*regCorrection() {
             const result = this.selected.find(item => item.correction_type === '6');
             return result.correction_type === '6' ? true : false;
             }*/

    startDateFormatted() {
      return this.searchParam.startDate
        ? moment(this.searchParam.startDate).format("Do MMMM, YYYY (dddd)")
        : "";
    },
    endDateFormatted() {
      return this.searchParam.endDate
        ? moment(this.searchParam.endDate).format("Do MMMM, YYYY (dddd)")
        : "";
    }
  },

  watch: {
    pagination() {
      this.getDataFromApi();
    }
  },

  created() {
    //this.$store.dispatch("fetchRegCorrectionList");
  },

  methods: {
    formatDate(dateconvart) {
      const current_datetime = new Date(dateconvart);
      const formatted_date =
        current_datetime.getDate() +
        "-" +
        ("0" + (current_datetime.getMonth() + 1)).slice(-2) +
        "-" +
        current_datetime.getFullYear();
      return formatted_date;
    },

    showItem(item) {
      this.confirmData = item;
      this.dialogStatus = true;
    },

    setLimit() {
      const { sortBy, page, rowsPerPage } = this.pagination;
      this.searchParam.page = page;
      this.searchParam.limit = rowsPerPage;
      // this.searchParam.sort = sortBy;
      this.searchParam.search = this.search;
    },

    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store
        .dispatch("fetchRegCorrectionList", this.searchParam)
        .then(data => {
          this.loading = false;
          this.pagination.totalItems = data.meta.total;
        });
    },

    confirm() {
      let self = this;

      if (this.selected.length > 0) {
        let correctionItem = [];
        let duplicateItem = [];

        for (let i in this.selected) {
          let item = this.selected[i];

          if (item.correction_type === "6") {
            correctionItem.push(item);
          } else {
            duplicateItem.push(item);
          }
        }

        const dataArr = {
          correction: correctionItem,
          duplicate: duplicateItem
        };

        let data = JSON.stringify(dataArr);

        this.$store
          .dispatch("studentRegCorrection", data)
          .then(function(data) {
            self.close();
            self.selected = [];
            self.$store.dispatch("fetchRegCorrectionList");
          })
          .catch(function(error) {
            console.log(error);
            self.$store.dispatch("fetchRegCorrectionList");
          });
      }
    },

    download(data) {
      let paramsData = {
        reg_no: data.reg_no
      };
      this.$store.dispatch("exportCorrectionRgCard", paramsData);
    }

    /* deleteItem(item) {
             const index = this.desserts.indexOf(item);
             confirm("Are you sure you want to delete this item?") &&
             this.desserts.splice(index, 1);
             },*/
  }
};
</script>

<style scoped></style>
