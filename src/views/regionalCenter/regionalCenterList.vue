<template>
  <v-container fluid>
    <v-dialog v-model="formDialogStatus" max-width="500px" persistent>
      <regCenterDialog
        :dialogStatus.sync="formDialogStatus"
        :editedData="editedItem"
        :indexEdited.sync="editedIndex"
        :loadData.sync="loadData"
      ></regCenterDialog>
    </v-dialog>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Regional Center List</v-card-text>
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
            v-on:keyup.native.enter="getDataFromApi()"
          ></v-text-field>-->
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>
            <v-icon dark>search</v-icon>
          </v-btn>-->
          <v-spacer />

          <v-card-actions>
            <v-spacer />
            <v-btn @click="sendMail()" color="primary" dark>Mail to All</v-btn>
            <v-btn color="primary" dark @click="newItem"
              >Create New Regional Center</v-btn
            >
          </v-card-actions>
          <!-- <v-btn fab small color="primary" class="white--text" @click="exportRegCenterListClick()">
            <v-icon dark>arrow_downward</v-icon>
          </v-btn>-->
          <v-btn
            medium
            color="primary"
            class="white--text"
            @click="generateReport()"
          >
            <v-icon dark>arrow_downward</v-icon>Export
          </v-btn>
        </v-layout>
      </v-card>
      <v-data-table
        :total-items="totalDataItems"
        :loading="loading"
        :headers="headers"
        :items="getRegionalCenterList"
        class="elevation-1 mytable"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.index + 1 }}</td>
          <td class="text-xs-center">{{ props.item.regional_center_code }}</td>
          <td class="text-xs-center">{{ props.item.center_name }}</td>
          <td class="text-xs-center">{{ props.item.address }}</td>
          <td class="text-xs-center">{{ props.item.phone }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.mobile }}</td>
          <td class="text-xs-center">{{ getActive(props.item.active) }}</td>
          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      class="mr-0"
                      color="white"
                      dark
                      @click="sendMail(props.item)"
                      >mail</v-icon
                    >
                  </v-btn>
                </template>
                <span>Mail</span>
              </v-tooltip>
              <v-tooltip top>
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
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
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
      <div>
        <vue-html2pdf
          :show-layout="false"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="Regional Center List"
          :pdf-quality="2"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="1000px"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <!-- PDF Content Here -->
            <div class="row">
              <div class="col-12">
                <table
                  style="font-family:Calibri,sans-serif;border: 1px solid red;width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1.5cm;"
                >
                  <tbody>
                    <tr style="background-color:white;">
                      <td
                        style="border: 1px solid black; padding: 8px; width: 50%"
                      >
                        <div style="float: left; width: 70px;">
                          <img
                            src="../../assets/nu_logos/nu_logo.png"
                            style="width: 100% !important;"
                          />
                        </div>
                        <div style="float: left; padding-left: 10px;">
                          <h1 style="margin: 0; padding: 0; line-height: 1.2;">
                            National University
                          </h1>
                          <h3
                            style="padding: 0; font-weight: 500; margin: 5px 0;"
                          >
                            Gazipur-1704, Bangladesh
                          </h3>
                          <h3
                            style="margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            {{ exam_name }}- {{ exam_year }}
                          </h3>
                        </div>
                      </td>
                      <td
                        style="border: 1px solid black;padding: 8px; width: 50%"
                      >
                        <div style="float: right; padding-left: 10px;">
                          <h1
                            style=" text-align: right; margin: 0; padding: 0; line-height: 1.2;"
                          >
                            Regional Center List
                          </h1>
                          <h3
                            style="margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            Exam Name-{{ exam_name }}
                          </h3>
                          <h3
                            style=" text-align: right; margin: 0; padding: 0; font-weight: 500; line-height: 1.2;"
                          ></h3>
                          <h3
                            style=" text-align: right;margin: 0; padding: 0; font-weight: 500;  line-height: 1.2; margin-top: 5px;"
                          >
                            Exam Code- {{ ex_code }}
                          </h3>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <table
              style="width: 71%;border-collapse:collapse;border:none;margin-left:1cm;margin-top:1cm;"
            >
              <thead>
                <tr>
                  <td
                    style="width: 32.45pt;border: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>SL.</strong>
                    </p>
                  </td>
                  <td
                    style="width: 72.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Code</strong>
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Regional Center Name</strong>
                    </p>
                  </td>
                  <td
                    style="width: 58.95pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Address</strong>
                    </p>
                  </td>
                  <!-- <td
                    style="width: 2cm;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style='margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;'
                    >
                      <strong>Phone</strong>
                    </p>
                  </td>-->
                  <td
                    style="width: 60.9pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Email</strong>
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:normal;font-size:15px;font-family:Calibri,sans-serif;text-align:center;"
                    >
                      <strong>Mobile</strong>
                    </p>
                  </td>
                </tr>
              </thead>
              <tbody
                v-for="(item, index) in getRegionalCenterList"
                :key="item.regional_center_code"
              >
                <tr style="background-color:white;">
                  <td
                    style="width: 32.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ index + 1 }}
                    </p>
                  </td>
                  <td
                    style="width: 72.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.regional_center_code }}
                    </p>
                  </td>
                  <td
                    style="width: 132.4pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.center_name }}
                    </p>
                  </td>
                  <td
                    style="width: 58.95pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.address }}
                    </p>
                  </td>
                  <!-- <td
                    style="width: 2cm;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style='margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;'
                    >
                      {{ item.phone }}
                    </p>
                  </td>-->
                  <td
                    style="width: 60.9pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.email }}
                    </p>
                  </td>
                  <td
                    style="width: 65.2pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 0cm 5.4pt;vertical-align: top;"
                  >
                    <p
                      style="margin-top:0cm;margin-right:0cm;margin-bottom:.0001pt;margin-left:0cm;line-height:  normal;font-size:15px;font-family:Calibri,sans-serif;"
                    >
                      {{ item.mobile }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="margin-top:0cm;margin-right:0cm;margin-bottom:10.0pt;margin-left:0cm;line-height:115%;font-size:15px;font-family:Calibri,sans-serif;"
            >
              &nbsp;
            </p>
          </section>
        </vue-html2pdf>
      </div>
      <composeMail
        :toMail.sync="emailList"
        :toSms.sync="smsList"
        :dialogStatus.sync="mailDialogStatus"
      ></composeMail>
    </v-container>
  </v-container>
</template>

<script>
import regCenterDialog from "@/components/regionalCenter/regionalCenterForm.vue";
import composeMail from "@/components/utils/composeMail.vue";
import VueHtml2pdf from "vue-html2pdf";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "../../mixin/common_login_getters";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: {
    regCenterDialog,
    composeMail,
    VueHtml2pdf
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 25,
        rowsPerPageItems: [25]
      },
      limit: {},
      searchParam: {},
      toggle_exclusive: 0,
      totalDataItems: 0,
      loading: true,
      mailDialogStatus: false,
      dialog: false,
      formDialogStatus: false,
      search: "",
      loadData: false,
      headers: [
        {
          text: "SL.",
          align: "center",
          value: "id",
          width: "10",
          sortable: false
        },
        {
          text: "Code",
          value: "regional_center_code",
          align: "center",
          sortable: false
        },
        {
          text: "Regional Center Name",
          value: "center_name",
          align: "center",
          sortable: false
        },
        { text: "Address", value: "address", align: "center", sortable: false },
        { text: "Phone", value: "phone", align: "center", sortable: false },
        { text: "Email", value: "email", align: "center", sortable: false },
        { text: "Mobile", value: "mobile", align: "center", sortable: false },
        { text: "Active", value: "active", align: "center", sortable: false },
        { text: "Action", align: "center", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      smsList: [],
      emailList: [],
      exam_name: "",
      exam_year: "",
      ex_code: ""
    };
  },
  created() {
    this.exam_name = this.getAuthUser.exam_initiates[0].exam_name;
    this.ex_code = this.getAuthUser.exam_initiates[0].exam_code;
    this.exam_year = this.getAuthUser.exam_initiates[0].year;
  },
  watch: {
    getExamInitiateId(val) {
      console.log("...mm", val);
      this.$store.getters.getAuthUserExamInitiates.forEach(obj => {
        if (obj.id == val) {
          this.exam_name = obj.exam_name;
          this.ex_code = obj.exam_code;
          this.exam_year = obj.year;
        }
      });
    },
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    },
    loadData: {
      handler(status) {
        if (status) this.getDataFromApi();
        this.loadData = false;
      }
    }
  },
  computed: {
    getRegionalCenterList() {
      return this.$store.getters.getRegionalCentertItem;
    }
  },
  mounted() {
    this.$store.commit("UNSET_FORMNOTIFY");
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.getDataFromApi();
  },
  methods: {
    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.mobile);
        this.emailList.push(item.email);
      } else {
        this.getRegionalCenterList.forEach(item => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      console.log("tosms ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    getActive(active) {
      var status = active == 1 ? "Yes" : "No";
      return status;
    },
    setLimit() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      this.limit = {
        page: page,
        limit: rowsPerPage,
        sort: sortBy,
        search: this.search
      };
    },
    getDataFromApi() {
      this.loading = true;
      this.setLimit();
      this.$store.dispatch("callRegionalCenterData", this.limit).then(data => {
        this.loading = false;
        this.totalDataItems = data.meta.total;
      });
    },

    exportRegCenterListClick() {
      this.$store.dispatch("exportRegCenterList");
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        center_name: "",
        //college_code: "",
        address: "",
        phone: "",
        email: "",
        mobile: "",
        status: "",
        center_list_id: "",
        // username: "",
        // password: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        created_by: "",
        updated_by: "",
        deleted_by: ""
      };
    },
    editItem(item) {
      this.editedIndex = this.getRegionalCenterList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogOpen();
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },
    generateReport() {
      let param = this.searchParam;
      param.pdf = true;
      this.$store.dispatch("downloadRegionalCenterNew",param);
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteRegionalCenterItem", id)
              .then(function() {
                self.setLimit();
                self.$store.dispatch("callRegionalCenterData", self.limit);
                // self.snackbar = true;
              })
              .catch(function(error) {
                console.log(error);
                self.setLimit();
                self.$store.dispatch("callRegionalCenterData", self.limit);
              });
          }
        });
    }
  }
};
</script>

<style lang="scss">
.mytable .theme--light.v-table tbody tr:not(:last-child) {
  // border-bottom: none;
  padding: 0%;
}

.mytable table.v-table tbody td:not(:nth-child(1)) {
  padding: 0 5px;
}
.mytable table.v-table tbody td:first-child {
  padding: 0%;
}

// .myborder {
//   // border-width: 1px;
//   // border-right-style: solid;
//   // border-left-style: solid;
//   // padding: 5px;
// }
</style>
