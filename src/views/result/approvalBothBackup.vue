<template>
  <v-container fluid>
    <v-card class="ma-4">
      <v-container fluid>
        <v-card v-if="publishState == 1">
          <v-alert :value="true" type="info">Result Published</v-alert>
        </v-card>
        <!-- <div :style="getPublishedStyle"> -->

        <div style="background-color: #dcedc8">
          <v-flex xs12>
            <div class="headline mb-3">
              <v-icon color="primary" size="37" class="ml-2 mt-2">mail</v-icon>
              <span
                class="ml-2 mt-2"
                style="font-size: 1.2em"
                v-if="getRouterParam == 'result'"
                >Result Published Note</span
              >
              <span
                class="ml-2 mt-2"
                style="font-size: 1.2em"
                v-if="getRouterParam == 'rescrutiny'"
                >Re-scrutiny Result Published Note</span
              >
              <!-- <v-toolbar flat color="white" v-if="vcStatus">
                <v-spacer />
                <v-btn
                  large
                  style="border-radius: 10px 0%;"
                  color="primary"
                  @click="publishResultList()"
                >
                  <div class="title">Result Publish</div>
                </v-btn>
              </v-toolbar>-->
            </div>
          </v-flex>
          <v-divider></v-divider>

          <examSummary v-if="getRouterParam == 'result'"></examSummary>
          <rescrutinyResultSummary v-if="getRouterParam == 'rescrutiny'"></rescrutinyResultSummary>

          <v-flex xs12 v-if="!hideCheck && app.is_approved != 1">
            <v-layout row wrap justify-center align-center class="ml-4">
              <v-checkbox
                v-model="checkbox"
                class="ml-4 mycheck"
                @click="checkBoxClicked"
                :disabled="checkDisable"
              >
                <template v-slot:label>
                  <div>
                    <span class="black--text" style="font-size: 1.4em"
                      >I have checked Result Summary</span
                    >
                  </div>
                </template>
              </v-checkbox>
            </v-layout>
          </v-flex>

          <v-card class="pa-4" v-if="checked">
            <v-layout row wrap>
              <!-- <v-flex xs12 v-show="!visible">
                <v-card style="height:50px;" flat class="title">
                  <v-flex
                    style="color:#1976D2; font-size:1.1em;"
                    class="ma-2"
                    v-if="app.is_approved != 1"
                    xs12
                    sm12
                    md12
                  >
                    Currently Note Status &nbsp; : &nbsp;
                    <v-chip style="font-size:1em;" label color="pink">
                      <strong>Yet Not initiated</strong>
                    </v-chip>
                  </v-flex>
                </v-card>
              </v-flex>-->
              <!-- {{visible}} -->
              <v-flex xs12>
                <v-card flat>
                  <v-container fluid>
                    <!-- mother -->
                    <!-- {{ current_user.name }} -->
                    <v-card style="height: 80px" flat>
                      <v-flex
                        style="color: #1976d2; font-size: 1.5em"
                        class="ma-2"
                        v-if="app.is_approved != 1"
                        xs12
                        sm12
                        md12
                      >
                        <strong>Currently Note Status &nbsp; : &nbsp;</strong>
                      </v-flex>
                      <v-flex
                        class="ma-2"
                        v-if="app.is_approved != 1"
                        xs12
                        sm12
                        md12
                      >
                        <v-chip
                          style="font-size: 1em"
                          label
                          color="primary"
                          :outline="
                            current_user.name != 'Programmer/Senior Programmer'
                          "
                        >
                          <strong :class="getclass(current_user.name === 'Programmer/Senior Programmer')">Programmer/Sr. Programmer</strong>
                        </v-chip>
                        <v-chip color="white" small>
                          <v-icon color="primary" large
                            >keyboard_arrow_right</v-icon
                          >
                        </v-chip>
                        <v-chip
                          style="font-size: 1em"
                          label
                          :outline="
                            current_user.name != 'Senior System Analyst'
                          "
                          color="primary"
                        >
                          <strong :class="getclass(current_user.name === 'Senior System Analyst')">System Analyst/Sr. System Analyst</strong>
                        </v-chip>
                        <v-chip color="white" small>
                          <v-icon color="primary" large
                            >keyboard_arrow_right</v-icon
                          >
                        </v-chip>
                        <v-chip
                          style="font-size: 1em"
                          label
                          :outline="current_user.name != 'ICT Director'"
                          color="primary"
                        >
                          <strong :class="getclass(current_user.name === 'ICT Director')">ICT Director</strong>
                        </v-chip>
                        <v-chip color="white" small>
                          <v-icon color="primary" large
                            >keyboard_arrow_right</v-icon
                          >
                        </v-chip>
                        <v-chip
                          style="font-size: 1em"
                          label
                          color="primary"
                          :outline="
                            current_user.name != 'Controller of Examination'
                          "
                        >
                          <strong :class="getclass(current_user.name === 'Controller of Examination')">Controller of Examination</strong>
                        </v-chip>
                        <v-chip color="white" small>
                          <v-icon color="primary" large
                            >keyboard_arrow_right</v-icon
                          >
                        </v-chip>
                        <v-chip
                          style="font-size: 1em"
                          label
                          :outline="current_user.name != 'Vice Chancellor'"
                          color="primary"
                        >
                          <strong :class="getclass(current_user.name === 'Vice Chancellor')">Vice Chancellor</strong>
                        </v-chip>
                      </v-flex>
                      <v-flex
                        style="font-size: 1.5em; color: #1976d2"
                        class="ma-2"
                        v-if="app.is_approved == 1"
                        xs12
                      >
                        Currently Note Status &nbsp; : &nbsp;
                        <v-chip
                          size="80"
                          color="green"
                          style="font-size: 1.1em"
                          text-color="white"
                        >
                          Published On
                          {{ dateFormatted(app.published_date) }}
                        </v-chip>
                      </v-flex>
                      <!-- {{this.app.length}}
                    <span
                      style="color:#1976D2;"
                      class="ma-2"
                      v-if="!this.app.length && !this.app.is_approved "
                    >
                      Currently Note Status &nbsp;
                      : &nbsp; Yet Not Initiated
                      </span>-->
                    </v-card>
                    <v-divider class="mt-5 mb-5"></v-divider>

                    <v-layout row wrap align-center justify-center fill-height>
                      <v-card-title class="title">
                        <span style="color: #1976d2; font-size: 1.2em"
                          >Previous Notes:</span
                        >
                      </v-card-title>
                      <v-card-actions>
                        <v-btn
                          color="blue-grey"
                          class="white--text"
                          @click="exportAllMarksList()"
                          :disabled="!visible"
                        >
                          <v-icon left dark>arrow_downward</v-icon>Export Notes
                        </v-btn>
                      </v-card-actions>
                      <v-flex md12 lg12 xs12>
                        <v-card class="white--text" flat>
                          <v-card-title primary-title>
                            <v-layout
                              row
                              wrap
                              align-center
                              justify-center
                              fill-height
                            >
                              <div class="text-xs-center" style="width: 1000px">
                                <v-expansion-panel
                                  expand
                                  popout
                                  v-model="panel"
                                >
                                  <v-expansion-panel-content
                                    class="mycustomExpansionPanel"
                                    v-for="menu in app.approval_details"
                                    :key="menu.id"
                                    @input="onInput($event, menu)"
                                  >
                                    <template v-slot:header>
                                      <!-- <div class="title" style="width:10%;">{{ getname(menu.user) }}</div> -->
                                      <div class="title" style="width: 45%">
                                        {{ menu.user.name }}
                                      </div>
                                      <div class="subtitle" style="width: 25%">
                                        {{ dateFormatted(menu.created_at) }}
                                      </div>
                                      <div class="attachButton">
                                        <v-btn
                                          medium
                                          color="primary"
                                          @click="
                                            downloadNotice(menu.attachment)
                                          "
                                          >View Attachment</v-btn
                                        >
                                      </div>
                                    </template>
                                    <v-divider></v-divider>
                                    <v-card>
                                      <!-- <v-flex xs12>
                                        <textEditor ref="textedit" :comment="menu.comment"></textEditor>
                                      </v-flex>-->
                                      <v-flex xs12>
                                        <div
                                          class="ma-3"
                                          style="font-size: 1.2em"
                                        >
                                          <span
                                            v-html="menu.comment.slice(0, 550)"
                                            v-if="menu.status == '0'"
                                          ></span>
                                          <v-btn
                                            flat
                                            color="primary"
                                            v-if="menu.status == '0'"
                                            @click="activateReadMore(menu)"
                                            >Read more...</v-btn
                                          >
                                          <span
                                            v-if="menu.status == 1"
                                            v-html="menu.comment"
                                          ></span>
                                        </div>
                                      </v-flex>
                                    </v-card>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </div>
                            </v-layout>
                          </v-card-title>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
              <v-flex xs12 v-if="!adminuser">
                <div class="subtitle-1 mb-2" style="font-size: 1.3em">To:</div>
                <!-- :disabled="vcStatus" -->
                <v-select
                  outline
                  single-line
                  v-model="forwarded_user_type"
                  item-text="name"
                  item-value="id"
                  :items="getType"
                  label="Select Reciever"
                  v-validate="'required'"
                  :error-messages="errors.collect('forwarded_user_type')"
                  data-vv-name="forwarded_user_type"
                  required
                  @change="quillFocus"
                ></v-select>
              </v-flex>

              <v-flex xs12 v-if="itstatus">
                <div class="subtitle-1 mb-2" style="font-size: 1.5em">
                   Programmer/Senior Programmer:
                </div>
                <textEditor
                  ref="texteditor"
                  :notevalue.sync="notevalue"
                ></textEditor>
              </v-flex>
              <v-flex xs12 v-if="analystStatus">
                <div class="subtitle-1 mb-2" style="font-size: 1.5em">
                  System Analyst/Senior System Analyst:
                </div>
                <textEditor
                  ref="texteditor"
                  :notevalue.sync="notevalue"
                ></textEditor>
              </v-flex>
              <v-flex xs12 v-if="depControllerStatus">
                <div class="subtitle-1 mb-2" style="font-size: 1.5em">
                  ICT Director:
                </div>
                <textEditor
                  ref="texteditor"
                  :notevalue.sync="notevalue"
                ></textEditor>
              </v-flex>
              <v-flex xs12 v-if="controllerStatus">
                <div class="subtitle-1 mb-2" style="font-size: 1.5em">
                  Controller Of Examination:
                </div>
                <textEditor
                  ref="texteditor"
                  :notevalue.sync="notevalue"
                ></textEditor>
              </v-flex>
              <v-flex xs12 v-if="vcStatus">
                <div class="subtitle-1 mb-2" style="font-size: 1.5em">
                  Vice Chancellor:
                </div>
                <textEditor
                  ref="texteditor"
                  :notevalue.sync="notevalue"
                ></textEditor>
              </v-flex>
              <v-flex xs12 v-if="!adminuser">
                <v-layout row wrap align-center>
                  <v-text-field
                    prepend-icon="attach_file"
                    single-line
                    v-model="file_name"
                    label="upload"
                    name="filename"
                    @click.native="onFocus"
                    ref="fileTextField"
                  ></v-text-field>
                  <input
                    type="file"
                    ref="inputUpload4"
                    style="display: none"
                    id="file-upload"
                    @change="onFileChange($event)"
                    @click="$refs.inputUpload4.value = null"
                  />
                  <!-- <v-btn fab small color="red white--text " @click="cancel()" v-if="showCancel">
                    <v-icon medium>close</v-icon>
                  </v-btn>-->
                </v-layout>
              </v-flex>

              <!-- send button -->
              <v-flex xs12>
                <v-layout align-center justify-center row fill-height>
                  <!-- v-if="!vcStatus" -->
                  <v-btn
                    round
                    large
                    color="primary"
                    :disabled="disable"
                    @click="validationForm"
                    v-if="buttonshow && !vcStatus"
                    >Send</v-btn
                  >
                  <v-btn
                    round
                    large
                    :disabled="disable"
                    color="primary"
                    @click="publishNote"
                    v-if="itstatus && buttonshow && approveButtonShow"
                    >Publish</v-btn
                  >
                  <v-btn
                    round
                    large
                    color="primary"
                    :disabled="disable"
                    @click="validationForm"
                    v-if="buttonshow && vcStatus"
                    >Approve & Send</v-btn
                  >
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
import textEditor from "@/components/pdf/textEditor.vue";
import moment from "moment";
import examSummary from "@/components/result/appExamSummary.vue";
import rescrutinyResultSummary from "@/components/rescrutiner/rescrutinyResultSummary.vue";

export default {
  mixins: [commonGet, commonExamYear, common_login_getters],
  components: { textEditor, examSummary, rescrutinyResultSummary },

  data: () => ({
    dictionary: {
      custom: {
        forwarded_user_type: {
          required: () => "Select Reciever.",
        },
      },
    },
    file: "",
    file_name: "",
    file_file: "",
    hideCheck: false,
    checkbox: false,
    checked: false,
    checkDisable: false,
    st: false,
    panel: 0,
    readMoreActivated: false,
    adminuser: false,
    visible: false,
    disable: false,
    searchParam: {},
    vcStatus: true,
    publishState: 0,
    depControllerStatus: true,
    analystStatus: true,
    controllerStatus: true,
    itstatus: true,
    // depConstatus: false,
    // constatus: false,
    // vcstatus: false,
    user_type: "",
    user_id: "",
    forwarded_user_type: "",
    approval_details: [],
    app: {},
    current_user: {},
    notevalue: "",
    buttonshow: false,
    approveButtonShow: false,
  }),
  watch: {
    //get editor value & wise send h/S
    notevalue(val) {
      console.log("notevalue", val);
      if (val) {
        this.buttonshow = true;
      } else {
        this.buttonshow = false;
      }
    },
    //from route type find on change submenu
    getRouterParam(val) {
      console.log("get route param...... ", val);
      if (val === "result") {
        this.searchParam.type = 1;
      } else if (val === "rescrutiny") {
        this.searchParam.type = 2;
      }
      this.$store.commit("UNSET_RESULT_PUBLISHED_NOTE_DATA");
      this.getApprovalData(); //get api call on change
    },
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  created() {
    this.$store.commit("UNSET_RESULT_PUBLISHED_NOTE_DATA");
    //this.$store.dispatch("searchResultDashboardData", this.searchParam);

    //on create all text editor off
    this.itstatus = false;
    this.depControllerStatus = false;
    this.analystStatus = false;
    this.controllerStatus = false;
    this.vcStatus = false;
    this.disable = true;
    this.adminuser = true; // on create hide to & attachmentsection
    this.hideCheck = true;

    console.log("param route", this.$route.params); //on create route param & set to searchparam
    if (this.getRouterParam === "result") {
      this.searchParam.type = 1;
    } else if (this.getRouterParam === "rescrutiny") {
      this.searchParam.type = 2;
    }

    this.getApprovalData(); //on create get api call

    //on create searchparam set
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.ifSearchExam = true;
    this.ifSearchYear = true;
    this.searchParam.user_type = this.getAuthUser.user_type;
    let param = {};
    param.exam_initiate_id = this.getExamInitiateId;
    param.tag = "RescrutinyResultPublished";
    param.status = "1";
    this.$store.dispatch("publishActivity", param).then((data) => {
      this.publishState = data.publish_status;
    });

    var self = this;
    this.$store.dispatch("getUserType", this.searchParam); //call send-user for TO

    //as admin only can see comments
    if (this.ifAdminUserType) {
      this.user_type = this.getAuthUser.user_type;
      this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
        if (data.length) {
          self.app = self.$store.getters.getResultNoteData;
          self.current_user = self.app.current_user_type;
        } else {
          self.visible = true;
        }
      });
      this.adminuser = true; // For TO & attachment section off
      this.disable = true; // button disable
      this.itstatus = false;
      this.depControllerStatus = false;
      this.analystStatus = false;
      this.controllerStatus = false;
      this.vcStatus = false;
      this.checked = true;
      this.hideCheck = true;
    }
  },

  computed: {
    getResultDashboardData() {
      return this.$store.getters.getResultDashboardData;
    },
    getType() {
      return this.$store.getters.getTypeData;
    },
    getRouterParam() {
      return this.$route.params.type;
    },
    // getPublishedStyle() {
    //   if (this.publishState == 1) {
    //     return "pointer-events: none;opacity: 0.5;";
    //   }
    // },
  },
  methods: {
    getclass(t){
      console.log("www", t);
      if (t){
        return 'white--text';
      }
    },
    downloadNotice(url) {
      console.log("ashfjkahsfd", url);
      if (url) {
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.setAttribute("download", "file.pdf");
        fileLink.setAttribute("target", "_blank");
        document.body.appendChild(fileLink);
        fileLink.click();
      } else {
        this.$store.commit("SET_SNACKBAR", {
          msg: "No notice to download",
          color: "red",
        });
      }
    },
    exportAllMarksList() {
      this.$store.dispatch("exportNotes", this.searchParam);
    },
    checkBoxClicked() {
      let that = this;
      this.$root
        .$confirm("Are you sure that you've checked Result Summary? ")
        .then((confirm) => {
          if (confirm) {
            that.checked = true;
            that.checkbox = true;
            that.checkDisable = true;
          }
        });
    },
    onInput(isOpen, n) {
      console.log("oninput", isOpen, n);
      //this.readMoreActivated = false;
      console.log("pn", this.panel);
      //to open readmore button of particaular opened expasion panel
      return (n.status = "0"); // for making dynamic used 'status="0"' field
    },
    activateReadMore(n) {
      console.log("n", n);
      //to open readmore button of particaular opened expasion panel
      n.status = 1; // for making dynamic used 'status="0"' field
      //this.readMoreActivated = true;
    },
    publishResultList() {
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.tag = "";
      this.$store.dispatch("publishActivity", param);
    },
    getApprovalData() {
      var self = this;
      this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
        if (data.length) {
          //if data found
          console.log("...if");
          self.app = self.$store.getters.getResultNoteData; //set schema data to app{}
          self.current_user = self.app.current_user_type; //set current user for note's current status
          self.approveButtonShow = false;
          self.approval_details = self.app.approval_details; // set app{} to an array
          if (self.approval_details.length > 0) {
            self.visible = true; //show current not status & prev notes
            self.approval_details.forEach((obj) => {
              if (obj.user.user_type == "11") {
                self.approveButtonShow = true;
              }
            });
          }
          if (self.app.is_approved == 1) {
            //is note published then no one can type/send
            self.disable = true; //disable button
            self.adminuser = true; //hide To & attachment Section
            self.itstatus = false;
            self.depControllerStatus = false;
            self.analystStatus = false;
            self.controllerStatus = false;
            self.vcStatus = false;
            self.checked = true;
            self.hideCheck = true;
          }
        }
      });
      this.getuser(); //then call loggedIn wise custom
    },
    dateFormatted(date) {
      return moment(date).format("Do MMMM, YYYY (dddd)");
    },
    quillFocus() {
      this.$refs.texteditor.focusQ();
    },
    getuser() {
      var self = this;
      if (this.ifITUser) {
        this.user_type = this.getAuthUser.user_type;
        this.user_id = this.getAuthUser.id;
        this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
          if (data.length) {
            self.app = self.$store.getters.getResultNoteData;
            self.current_user = self.app.current_user_type;
            console.log("..it current user", self.user_type);
            if (self.current_user.id == self.user_type) {
              //if both r same then can find texteditor
              self.hideCheck = false; // if current then show check box
              self.itstatus = true;
              self.disable = false; //enable button
              self.adminuser = false; //if result/rescrutiny published then it turn to true so for showing TO section
            } else {
              self.disable = true; //button disable
              self.itstatus = false;
              self.hideCheck = true; // not current then hide check box
              self.checked = true; //to show previous, status section
            }
            if (self.app.is_approved == 1) {
              self.adminuser = true; //hide To Section
              self.itstatus = false;
            }
          } else {
            //if no data
            self.itstatus = true; // then open initial note to start flow
            console.log("...else", self.itstatus);
            self.disable = false; //enable button
            self.visible = true;
            self.adminuser = false; //when data = [] to show to section
            self.checked = true; //to show previous, status section
          }
        });
        //self.forwarded_user_type = self.getType.value;
        self.vcStatus = false;
        self.controllerStatus = false;
        self.depControllerStatus = false;
        self.analystStatus = false;
        if (this.getRouterParam === "rescrutiny") {
          self.hideCheck = true;
          self.checked = false;
        }
      }
      if (this.ifSeniorAnalystUser) {
        //all r same as IT
        this.user_type = this.getAuthUser.user_type;
        this.user_id = this.getAuthUser.id;
        // this.forwarded_user_type = this.getType[2].value;
        this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
          if (data.length) {
            console.log("..dep");
            self.app = self.$store.getters.getResultNoteData;
            self.current_user = self.app.current_user_type;
            console.log("..dep", self.current_user);
            if (self.current_user.id == self.user_type) {
              self.analystStatus = true; //if match then deputy can send
              self.disable = false; // enable button
              self.adminuser = false; //To
              //console.log("adminuser", self.adminuser);
              self.hideCheck = false; // if current then show check box
            } else {
              self.disable = true; // disable button
              self.analystStatus = false;
              self.hideCheck = true; // not current then hide check box
              self.checked = true; //to show previous, status section
            }
          } else {
            self.disable = true; // disable button
            self.visible = false; // to show note not initiated
            self.analystStatus = false;
            self.hideCheck = true; // not current then hide check box
            self.checked = true; //to show previous, status section
          }
        });
        self.vcStatus = false;
        self.controllerStatus = false;
        self.itstatus = false;
        if (this.getRouterParam === "rescrutiny") {
          self.hideCheck = true;
          self.checked = false;
        }
      }
      if (this.ifDirectorICTUser) {
        //all r same as IT
        this.user_type = this.getAuthUser.user_type;
        this.user_id = this.getAuthUser.id;
        // this.forwarded_user_type = this.getType[2].value;
        this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
          if (data.length) {
            console.log("..dep");
            self.app = self.$store.getters.getResultNoteData;
            self.current_user = self.app.current_user_type;
            console.log("..dep", self.current_user);
            if (self.current_user.id == self.user_type) {
              self.depControllerStatus = true; //if match then deputy can send
              self.disable = false; // enable button
              self.adminuser = false; //To
              console.log("adminuser", self.adminuser);
              self.hideCheck = false; // if current then show check box
            } else {
              self.disable = true; // disable button
              self.depControllerStatus = false;
              self.hideCheck = true; // not current then hide check box
              self.checked = true; //to show previous, status section
            }
          } else {
            self.disable = true; // disable button
            self.visible = false; // to show note not initiated
            self.depControllerStatus = false;
            self.hideCheck = true; // not current then hide check box
            self.checked = true; //to show previous, status section
          }
        });
        self.vcStatus = false;
        self.controllerStatus = false;
        self.itstatus = false;
        if (this.getRouterParam === "rescrutiny") {
          self.hideCheck = true;
          self.checked = false;
        }
      }

      if (this.ifControllerUser) {
        //same as IT
        this.user_type = this.getAuthUser.user_type;
        this.user_id = this.getAuthUser.id;
        //this.forwarded_user_type = this.getType[3].value;
        this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
          if (data.length) {
            self.app = self.$store.getters.getResultNoteData;
            self.current_user = self.app.current_user_type;
            if (self.current_user.id == self.user_type) {
              self.controllerStatus = true; //matched ? then controller open
              self.disable = false; // enable button
              self.adminuser = false; //To on
              self.hideCheck = false; // if current then show check box
            } else {
              self.disable = true; // disable button
              self.controllerStatus = false;
              self.hideCheck = true; // not current then hide check box
              self.checked = true; //to show previous, status section
            }
          } else {
            self.disable = true; // disable button
            self.visible = false; // to show note not initiated
            self.controllerStatus = false;
            self.hideCheck = true; // not current then hide check box
            self.checked = true; //to show previous, status section
          }
        });
        self.vcStatus = false;
        self.depControllerStatus = false;
        self.analystStatus = false;
        self.itstatus = false;
        if (this.getRouterParam === "rescrutiny") {
          self.hideCheck = true;
          self.checked = false;
        }
      }
      if (this.ifProvcUser) {
        // same as IT
        this.user_type = this.getAuthUser.user_type;
        this.user_id = this.getAuthUser.id;
        this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
          if (data.length) {
            self.app = self.$store.getters.getResultNoteData;
            self.current_user = self.app.current_user_type;
            if (self.current_user.id == self.user_type) {
              self.vcStatus = true; //if provc then also find as same as vc
              self.disable = false; // enable button
              self.adminuser = false; // To on
              self.hideCheck = false; // if current then show check box
            } else {
              self.disable = true; // disable button
              self.vcStatus = false;
            }
            if (self.app.is_approved == 1) {
              self.adminuser = true; //hide To Section
              self.vcStatus = false;
            }
          } else {
            self.disable = true; // disable button
            self.visible = false; // to show note not initiated
            self.vcStatus = false;
          }
        });
        // self.forwarded_user_type = 12; //forward type set to Provc
        self.controllerStatus = false;
        self.depControllerStatus = false;
        self.analystStatus = false;
        self.itstatus = false;
      }
      if (this.ifVcUser) {
        console.log("..vc", this.adminuser);
        //same as IT
        this.user_type = this.getAuthUser.user_type;
        this.user_id = this.getAuthUser.id;
        this.$store.dispatch("getNoteData", this.searchParam).then((data) => {
          if (data.length) {
            self.app = self.$store.getters.getResultNoteData;
            self.current_user = self.app.current_user_type;
            if (self.current_user.id == self.user_type) {
              self.vcStatus = true; // vc can send or publish
              self.disable = false; // enable button
              self.adminuser = false; // To on
              self.hideCheck = false; // if current then show check box
            } else {
              self.disable = true; // disable button
              self.vcStatus = false;
            }
            if (self.app.is_approved == 1) {
              self.adminuser = true; //hide To Section
              self.vcStatus = false;
            }
          } else {
            self.disable = true; // disable button
            self.visible = false; // to show note not initiated
            self.vcStatus = false;
          }
        });
        self.checked = true;
        self.checkDisable = true;
        self.checkbox = true;
        //self.forwarded_user_type = 11; //if publish then TO set to vc
        self.controllerStatus = false;
        self.depControllerStatus = false;
        self.analystStatus = false;
        self.itstatus = false;
        console.log("..vc...", this.adminuser);
        if (this.getRouterParam === "rescrutiny") {
          self.hideCheck = true;
          self.checked = true;
        }
      }
    },
    getcolor(val) {
      console.log("colorrrr", val);
      if (this.current_user.name != this.app.current_user_type.name) {
        return "white";
      } else {
        return "red";
      }
    },
    validationForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          console.log("here");
          // if (this.ifVcUser || this.ifProvcUser) {
          //   this.publishNote();
          // } else {
          this.sendNote(); // TO section validation need for send (if click send button)
          //}
        } else {
          this.$store.commit("SET_SNACKBAR", {
            msg: "Please Select Receiver & write a note ",
            color: "red",
          });
        }
      });
    },
    // getname(item) {
    //   try {
    //     return item.name;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    publishNote() {
      // To section without validation if vc click publish button
      // var item = {
      //   user_type: this.user_type,
      //   user_id: this.user_id,
      //   //forwarded_user_type: this.forwarded_user_type
      // };
      // //set type for publish
      // if (this.getRouterParam === "result") {
      //   item.type = 1;
      // } else if (this.getRouterParam === "rescrutiny") {
      //   item.type = 2;
      // }
      // item.exam_initiate_id = this.getExamInitiateId;
      // item.exam_code = this.getLoggedInExam.code;
      // item.year = this.getLoggedInYear.year;
      // item.comment = this.$refs.texteditor.delta; // get text editor's texts

      let formData = new FormData();
      formData.append("exam_code", this.$store.getters.getLoggedInExam.code);
      formData.append("year", this.$store.getters.getLoggedInYear.year);
      formData.append("file", this.file_file);
      formData.append("exam_initiate_id", this.getExamInitiateId);
      formData.append("comment", this.$refs.texteditor.delta);
      if (this.getRouterParam === "result") {
        formData.append("type", 1);
      } else if (this.getRouterParam === "rescrutiny") {
        formData.append("type", 2);
      }
      formData.append("user_type", this.user_type);
      formData.append("user_id", this.user_id);
      //formData.append("forwarded_user_type", this.forwarded_user_type);

      var self = this;
      this.$root
        .$confirm(
          "Are you sure that you've checked the result & want to Publish?"
        )
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("publishedNote", formData)
              .then((msg) => {
                console.log(msg);
                //publish api then get api to see instant change
                self.$store
                  .dispatch("getNoteData", this.searchParam)
                  .then((data) => {
                    console.log("then", data);
                    self.app = self.$store.getters.getResultNoteData;
                    self.current_user = self.app.current_user_type;
                    self.approval_details = self.app.approval_details;
                    if (self.approval_details.length > 0) {
                      self.visible = true;
                    }
                  });
                self.disable = true; // button disable
                self.itstatus = false; // it programmer should not find type area
                self.adminuser = true; // to off attachment & To section
              })
              .catch((msg) => {
                console.log(msg);
              });
          }
        });
    },
    sendNote() {
      // var item = {
      //   user_type: this.user_type,
      //   user_id: this.user_id,
      //   forwarded_user_type: this.forwarded_user_type, // to send need this field
      // };
      //type send
      // if (this.getRouterParam === "result") {
      //   item.type = 1;
      // } else if (this.getRouterParam === "rescrutiny") {
      //   item.type = 2;
      // }
      // item.exam_initiate_id = this.getExamInitiateId;
      // item.exam_code = this.getLoggedInExam.code;
      // item.year = this.getLoggedInYear.year;
      // item.comment = this.$refs.texteditor.delta; //get note from texteditor

      let formData = new FormData();
      formData.append("exam_code", this.$store.getters.getLoggedInExam.code);
      formData.append("year", this.$store.getters.getLoggedInYear.year);
      formData.append("file", this.file_file);
      formData.append("exam_initiate_id", this.getExamInitiateId);
      formData.append("comment", this.$refs.texteditor.delta);
      if (this.getRouterParam === "result") {
        formData.append("type", 1);
      } else if (this.getRouterParam === "rescrutiny") {
        formData.append("type", 2);
      }
      formData.append("user_type", this.user_type);
      formData.append("user_id", this.user_id);
      formData.append("forwarded_user_type", this.forwarded_user_type);

      var self = this;
      this.$root
        .$confirm(
          "Are you sure that you've checked the result & want to send Note?"
        )
        .then((confirm) => {
          if (confirm) {
            this.$store
              .dispatch("sendNote", formData)
              .then((msg) => {
                console.log(msg);
                //send api then get api to see instant change
                self.$store
                  .dispatch("getNoteData", this.searchParam)
                  .then((data) => {
                    console.log("then", data);
                    self.app = self.$store.getters.getResultNoteData;
                    self.current_user = self.app.current_user_type;
                    self.approval_details = self.app.approval_details;
                    if (self.approval_details.length > 0) {
                      self.visible = true; // show current status & previous note
                    }
                  });
                self.disable = true; // disable button
                self.itstatus = false;
                self.depControllerStatus = false;
                self.controllerStatus = false;
                self.analystStatus = false;
                self.vcStatus = false;
                self.adminuser = true; // to off attachment & To section
              })
              .catch((msg) => {
                console.log(msg);
              });
          }
        });
    },
    onFocus() {
      document.getElementById("file-upload").click();
    },
    onFileChange(e) {
      console.log("...m up", e.target.files[0]);
      //var self = this;
      var files = e.target.files[0];
      // if (files.length > 0) {
      if (files !== undefined) {
        this.file_name = files.name;
        if (this.file_name.lastIndexOf(".") <= 0) {
          return alert("Please add a valid file!");
        }
        // for (var i = 0; i < files.length; i++) {
        // self.form.append("name", files.name);
        // self.form.append("file", files);

        // self.file_name = files.name;
        this.file_file = files;

        // self.formData.append("file", files[i], files[i].name);
        this.showCancel = true;
        this.filechaged = true;
      } else {
        this.cancel();
      }
    },
  },
};
</script>

<style lang="scss">
.mycustomExpansionPanel .v-expansion-panel__header {
  border: 1px solid blue !important;
}
.attachButton {
  float: right !important;
}
// .mycustomExpansionPanel
//   .v-expansion-panel__header
//   .v-expansion-panel__header__icon {
//   display: none;
// }
</style>
