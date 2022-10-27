<template>
  <v-container>
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50" color="primary">accessibility</v-icon>
        <span class="ml-2">Invigilator Access</span>
      </div>
    </span>
    <v-card v-if="searchParam.center_code == -1">
      <v-alert :value="true" type="error"
        >Center Not Allocated For This Exam</v-alert
      >
    </v-card>
    <!-- {{getExamInitiateId}}
    {{searchParam.center_code}}
    {{getTheoryCenterList}}-->
    <v-card v-if="forceRerenderFlag">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 lg6>
            <v-autocomplete
              hide-details
              outline
              class="ma-2"
              :disabled="ifCenterUser"
              v-model="searchParam.center_code"
              :items="getTheoryCenterList"
              :item-text="(item) => item.center_code + ' - ' + item.center_name"
              item-value="center_code"
              label="Select Center"
              persistent-hint
              prepend-icon="library_books"
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="searchParam.center_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                >
                  {{ data.item.center_code + " - " + data.item.center_name }}
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
                        data.item.center_code + ' - ' + data.item.center_name
                      "
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
            <v-autocomplete
              disabled
              outline
              class="ma-2"
              v-model="searchParam.exam_code"
              :item-text="(item) => item.code + ' - ' + item.title"
              item-value="code"
              :items="getExamList"
              menu-props="auto"
              label="Select Exam"
              hide-details
              v-validate="'required'"
              :error-messages="errors.collect('exam_code')"
              data-vv-name="exam_code"
              name="exam_code"
              required
              prepend-icon="subject"
              @change="getExamCode($event)"
              no-data-text="Please wait, We are fetching the Exam data"
            >
              <template v-slot:selection="data">
                <v-chip
                  close
                  @input="getSchema.exam_code = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                  >{{ data.item.code + " - " + data.item.title }}</v-chip
                >
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="data.item.code + ' - ' + data.item.title"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12 sm12 md12 lg6>
            <v-autocomplete
              disabled
              outline
              name="year"
              class="ma-2"
              v-model="searchParam.year"
              item-text="year"
              item-value="year"
              :items="getYearList"
              menu-props="auto"
              label="Select Year"
              hide-details
              v-validate="'required'"
              :error-messages="errors.collect('year')"
              data-vv-name="year"
              required
              prepend-icon="calendar_today"
            >
              <template v-slot:selection="data">
                <v-chip :selected="data.selected" class="chip--select-multi">
                  {{ data.item.year }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content
                    v-text="data.item.year"
                  ></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="data.item.year"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-layout justify-center row fill-height align-center>
              <v-btn color="primary" large @click="searchInvigilator"
                >Search</v-btn
              >
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-spacer class="mb-5"></v-spacer>

    <v-card>
      <v-card-title primary-title>
        <div class="title">Invigilator List For App Access</div>
        <v-spacer />
        <v-btn @click="sendMail()" color="primary" dark>Mail to All</v-btn>
        <!-- <v-btn medium color="primary" class="white--text" @click="generateReport()">
          <v-icon dark>arrow_downward</v-icon>Export
        </v-btn>-->
      </v-card-title>
      <!-- {{testModel}}
      <v-checkbox
        class="ml-3"
        v-model="testModel"
        label="App Access"
        type="checkbox"
        color="indigo darken-3"
      ></v-checkbox>-->
      <v-container fluid grid-list-md>
        <pre></pre>

        <v-data-table
          :items="getSchema.invigilators"
          class="elevation-1"
          :headers="headers"
          hide-actions
        >
          <template v-slot:items="props">
            <td>{{ props.item.invigilator_name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.mobile }}</td>
            <td class="text-xs-center">
              <!-- --- {{checkAccessType(props.item)}} -->
              <v-checkbox
                class="ml-3"
                v-model="props.item.app_access"
                label="App Access"
                type="checkbox"
                color="indigo darken-3"
              ></v-checkbox>
              <!-- !!! {{props.item.app_access}} -->
            </td>
          </template>
        </v-data-table>

        <v-flex xs12 sm12 md12 style="margin-top: 40px">
          <v-layout justify-center row fill-height align-center>
            <v-btn color="primary" @click="submit()">submit</v-btn>
          </v-layout>
        </v-flex>
      </v-container>
    </v-card>

    <invigilatorPdf
      ref="html2Pdf"
      :param.sync="param"
      :getSchema="getSchema.invigilators"
    ></invigilatorPdf>

    <composeMail
      :toMail.sync="emailList"
      :toSms.sync="smsList"
      :dialogStatus.sync="mailDialogStatus"
    ></composeMail>
    <!-- <v-btn @click="searchInvigilator()">sp</v-btn> -->
  </v-container>
</template>
<script>
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import common_login_getters from "@/mixin/common_login_getters";
import composeMail from "@/components/utils/composeMail.vue";
import invigilatorPdf from "@/components/invigilator/invigilatorPdf.vue";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { composeMail, invigilatorPdf },
  data: () => ({
    visible: false,
    data: {},
    searchParam: {
      exam_code: "",
      year: "",
      center_code: "",
      exam_initiate_id: "",
    },
    headers: [
      {
        text: "Invigilator Name",
        align: "left",
        sortable: false,
        value: "invigilator_name",
      },
      { text: "Email", align: "left", sortable: false, value: "email" },
      { text: "Mobile", align: "left", sortable: false, value: "mobile" },
      {
        text: "App Access",
        align: "center",
        sortable: false,
        value: "app_access",
      },
    ],
    smsList: [],
    emailList: [],
    mailDialogStatus: false,
    exam_name: "",
    exam_year: "",
    param: {},
    examYearWiseInvList: [],
    invList: [],
    testModel: true,
  }),

  created() {
    this.$store.commit("UNSET_INVIGILATOR_ACCESS_DATA_SCHEMA");
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    if (this.ifCenterUser) {
      this.searchParam.center_code = this.getAuthUser.center.center_code;
    }
  },

  mounted() {
    // setTimeout(() => {
    if (this.ifCenterUser) {
      console.log("lal la ...");
      this.searchParam.center_code = this.getAuthUser.center.center_code;
      this.searchParam.college_code = this.getAuthUser.center.college_code;
      this.searchParam.exam_initiate_id = this.getExamInitiateId;
      this.searchInvigilator();
    }
    let self = this;
    setTimeout(function () {
      self.getCenter();
    }, 1000);
    // }, 800);
  },
  computed: {
    getSchema() {
      return this.$store.getters.getInvigilatorAccessSchema;
    },
    getInvigilatorList() {
      return this.$store.getters.getInvigilatorItem;
    },
    //Exam Initiate Id
    getExamInitiateId() {
      return this.$store.getters.getExamInitiateId;
    },
  },
  methods: {
    generateReport() {
      console.log("..m clcik");
      this.$store.commit("SET_LOADING", { color: "primary" });
      this.$refs.html2Pdf.generateReports();
      setTimeout(() => {
        this.$store.commit("UNSET_LOADING"); // loading Closing
      }, 5000);
    },
    //on year change get center
    getCenter() {
      this.param = {};
      console.log("˜˜˜˜˜˜˜˜˜", this.param);
      try {
        this.param.exam_initiate_id = this.getExamInitiateId;
        this.param.exam_code = this.getLoggedInExam.code;
        this.param.year = this.getLoggedInYear.year;
        console.log("˜˜˜˜˜˜˜˜˜", this.param);
        this.$store.dispatch("fetchTheoryWiseCenterData", this.param);
      } catch (er) {
        console.log("ssssssssssssssssssssssssssssss got an error");
      }
    },

    sendMail(item = false) {
      this.smsList = [];
      this.emailList = [];
      if (item) {
        this.smsList.push(item.mobile);
        this.emailList.push(item.email);
      } else {
        this.getSchema.invigilators.forEach((item) => {
          this.smsList.push(item.mobile);
          this.emailList.push(item.email);
        });
      }
      console.log("tosms ", this.smsList);
      this.mailDialogStatus = !this.mailDialogStatus;
    },
    submit() {
      this.getSchema.center_code = this.searchParam.center_code;
      this.getSchema.exam_code = this.searchParam.exam_code;
      this.getSchema.exam_initiate_id = this.searchParam.exam_initiate_id;
      this.getSchema.year = this.searchParam.year;
      //this.getSchema.invigilators = this.invList;
      console.log("this.invList ", this.invList);
      var accessItem = this.getSchema;
      var self = this;
      this.$store
        .dispatch("saveInvigilatorAccessData", accessItem)
        .then(function () {
          // self.visible = false;
          // self.$store.dispatch("fetchInvigilatorAccessData");
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchInvigilatorAccessData");
        });
      //   this.$router.push("/invigilator-list");
    },
    checkAccessType(item) {
      try {
        console.log("INV ITEM = ", item);
        console.log("INV this.getSchema = ", this.getSchema);
        let access = false;
        this.getSchema.invigilators.forEach((i) => {
          console.log(i);
          try {
            if (parseInt(i.invigilator_id) == parseInt(item.invigilator_id)) {
              console.log(" MILLA gese ");
              access = !!i.app_access;
            }
          } catch (ex) {
            console.log(" EXX ", ex);
          }
        });
        item.app_access = access;
        return access;
      } catch (ex) {}
    },
    getAccess(id) {
      let access = false;
      console.log("INV invigilators", this.examYearWiseInvList.invigilators);
      // for ( i=0; i <data.invigilators.length ; i++){
      //   console.log(data.invigilators[i].invigilator_id)
      // }examYearWiseInvList
      this.examYearWiseInvList.invigilators.forEach((i) => {
        console.log(parseInt(i.invigilator_id) + "==" + id);
        try {
          if (parseInt(i.invigilator_id) == parseInt(id)) {
            console.log(" MILLA gese ");
            access = !!i.app_access;
          }
        } catch (ex) {
          console.log(" EXX ", ex);
        }
      });
      return access;
    },
    searchInvigilator() {
      console.log("searach BF ", this.searchParam);
      var self = this;
      this.searchParam.exam_type = 1;

      //let examYearWiseInvList = [];   searchInvigilator
      this.$store
        .dispatch("fetchInvigilatorAccessData", this.searchParam)
        .then((examYearWiseInv) => {
          console.log("1..................sp::@sujan------", examYearWiseInv);
          //self.examYearWiseInvList = examYearWiseInv
          //this.getAllInvigilator();
        });
      console.log("Getter sCHMA", this.getSchema);
    },
    getAllInvigilator() {
      try {
        let self = this;
        console.log("Exam wise NOGOT", this.examYearWiseInvList);
        if (this.searchParam.center_code) {
          this.$store
            .dispatch("callInvigilatorData", {
              page: 1,
              limit: 1000,
              center_code: this.searchParam.center_code,
              college_code: this.searchParam.college_code,
            })
            .then((inv) => {
              console.log("2.................sp::@sujan------", inv);
              inv.forEach((e) => {
                var item = {};
                item.app_access = false;
                item.exam_initiate_id = this.searchParam.exam_initiate_id;
                item.invigilator_id = e.id;
                item.invigilator_name = e.name;
                item.mobile = e.mobile;
                item.email = e.email;
                console.log("DATA.. ", item.app_access);
                self.invList.push(item);
              });
              console.log("all", self.invList);
            });
        }
        //this.getSchema.invigilators = zinvigilators;
      } catch (ex) {
        console.log("ex ", ex);
      }
    },
  },
  watch: {
    getCorrectCenterStatus(val) {
      if (val) {
        if (this.ifCenterUser) {
          this.searchParam.center_code = this.getAuthUser.center.center_code;
          console.log("bro bro bro", this.getAuthUser.center.center_code);
        } else {
          this.getCenter();
        }
      }
    },
    // getExamInitiateId(val) { //another way
    //   console.log('...mm', val);
    //   this.searchParam.exam_initiate_id = val;
    //   setTimeout(() => {
    //     this.searchParam.center_code = this.getAuthUser.center.center_code;
    //   }, 800);
    // },

    //on chnge of year center code get
    cload(val) {
      console.log("lets see mitu", val);
      if (this.ifCenterUser) {
        this.searchParam.center_code = this.getAuthUser.center.center_code;
        console.log("lets see mitu", this.getAuthUser.center.center_code);
      } else {
        this.getCenter();
      }
    },
  },
};
</script>
<style scoped>
.tile {
  width: 820px;
  margin: 5px;
  border-radius: 4px;
  background: rgb(232, 233, 243);
}
.tile:hover {
  background: rgb(171, 173, 171);
}
/* .tile:active {
  background: yellow;
} */
</style>
