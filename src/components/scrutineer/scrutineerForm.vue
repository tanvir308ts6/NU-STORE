<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card color="primary" flat>
          <v-card-title>
            <span class="headline white--text">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <formNotification />
        <v-card-text>
          <v-card flat class="pr-3 scroll">
            <v-form>
            
        
             
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="tmis_id"
                  label="TMIS ID"
                  v-model="getSchema.tmis_id"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('tmis_id')"
                  
                  data-vv-name="tmis_id"
                  required
                  prepend-icon="edit"
                 
                ></v-text-field>
              </v-flex>
               <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="h_ex_tmis_id"
                  label="Head Examiner TMIS ID"
                  @click="getTmisData(getSchema.tmis_id)"
                  v-model="getSchema.h_ex_tmis_id"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('h_ex_tmis_id')"
                  data-vv-name="h_ex_tmis_id"
                  required
                  prepend-icon="edit"
                 
                ></v-text-field>
              </v-flex>
                <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="h_examiner_code"
                  label="Head Examiner Code"
                  v-model="getSchema.h_examiner_code"
                  v-validate="'required|numeric'"
                  :error-messages="errors.collect('h_examiner_code')"
                  data-vv-name="h_examiner_code"
                  required
                  prepend-icon="edit"
                 
                ></v-text-field>
              </v-flex>
                    <v-flex xs12>
                <!-- @change="subjectChange()" -->

                <v-autocomplete
                  class="ma-2"
                  v-model="getSchema.subject_code"
                  @input = "subName(getSchema)"
                  :items="getSubjectList"
                  :item-text="(item) => item.code + ' - ' + item.title"
                  item-value="code"
                  label="Select Subject"
                  hide-details
                  prepend-icon="library_books"
                  
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeSubject(getSchema.subject_code, data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.code + ' - ' + data.item.title }}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.code + ' - ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="name"
                  label="Name"
                  v-model="getSchema.name"
                  v-validate="'required'"
                  :error-messages="errors.collect('name')"
                  data-vv-name="name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
            
                  <v-autocomplete
                  ref="input"
                  class="ma-2"
                  name="designation"
                  item-value="designation_id"
                  v-model="getSchema.designation_id"
                  :item-text="(item) => item.designation"
                  :items="designantionList"
                  label="Designation"
                  :error-messages="errors.collect('designation')"
                  data-vv-name="designation"
                  prepend-icon="library_books"
                  
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="removeDesignation()"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >{{ data.item.designation}}</v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.designation"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              
              
                 <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="total_scrutinize_script"
                  label="Total Scrutinize Script"
                  v-model="getSchema.total_scrutinize_script"                  
                  :error-messages="errors.collect('total_scrutinize_script')"
                  data-vv-name="total_scrutinize_script"
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <!-- v-validate="'required'"
                  :error-messages="errors.collect('nid_no')"
              data-vv-name="nid_no"-->
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="bank_name"
                  label="Bank Name"
                  v-model="getSchema.bank_name"
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="branch_name"
                  label="Branch"
                  v-model="getSchema.branch_name"
                  
                  :error-messages="errors.collect('branch_name')"
                  data-vv-name="branch_name"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
              
             <v-flex xs12>
                <v-text-field
                  class="ma-2"
                  name="account_no"
                  label="Account No"
                  v-model="getSchema.account_no"
                  
                  :error-messages="errors.collect('account_no')"
                  data-vv-name="account_no"
                  required
                  prepend-icon="edit"
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              color="primary  white--text"
              @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}</v-btn>
            <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import commonFun from "../../mixin/common_function";
import formNotification from "@/components/utils/formNotification";
import commonGet from "../../mixin/common_getters_mixin";
import watchMixin from "../../mixin/exam_year_watch_mixin";

export default {
  mixins: [commonFun, commonGet, watchMixin],
  $_veeValidate: {
    validator: "new",
  },
  components: {
    formNotification,
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData","searchScrutineerList"],
  data: () => ({
    searchParam: {},
    subParam:{
      subject_code : "66"
    },     
    designantionList:[ 
          {
            "designation_id": "0",
            "designation": "Others"
          },
          {
            "designation_id": "1",
            "designation": "Lecturer"
          },
          {
            "designation_id": "2",
            "designation": "Asst Professor"
          },
          {
            "designation_id": "3",
            "designation": "Associate Professor"
          },
          {
            "designation_id": "4",
            "designation": "Professor "
          }
    ],
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    email: "",
    tmis_id: "",
    subPap: {
      paper_loading: false,
    },
    dictionary: {
      custom: {
        division_name: {
          required: () => "Division  Name is required",
        },
        div_code: {
          required: () => "Division Code can not be empty.",
        },
        username: {
          equired: () => "User Login mail can not be empty.",
        },
      },
    },
  }),
  created() {
    var limit = {
      page: 1,
      limit: 1000,
    };

    if (this.$store.getters.getExamItem.length < 1) {
      this.$store.dispatch("fetchExamData", limit);
    }
    if (!this.$store.getters.getSubjectItems.length) {
      this.$store.dispatch("fetchSubjectData");
    }
    this.$store.dispatch("fetchYearData", limit);
    this.$store.dispatch("fetchSubjectData");
   //this.getSchema.h_examiner_code = this.getAuthUser.examiner.examiner_code;
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.ifExamSchema = true;
    this.ifYearSchema = true;

    console.log("schema", this.getSchema);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.editedData.exam_code = this.$store.getters.getLoggedInExam.code;
      this.editedData.exam_year = this.$store.getters.getLoggedInYear.year;
      this.$store.commit("SET_SCRUTINER_SCHEMA", this.editedData);
      this.email = this.editedData.email;
      this.tmis_id = this.editedData.tmis_id;
      this.getSchema.username = this.editedData.email; // seting email to username as usernm is missing in db
      // this.getSchema.username = this.editedData.tmis_id; // seting tmis_id to username as usernm is missing in db
    },
    dialog(val) {
      if (!val) this.close();
    },
    //email set to username
    email(val) {
      this.getSchema.username = val;
    },
    //tmis id set to username
    // tmis_id(val) {
    //   this.getSchema.username = val;
    // },
  },
  computed: {
    // email: {
    //   get() {
    //     return this.$refs.input.value;
    //   },
    //   set(value) {
    //     console.log(value);
    //     this.$emit("update:email", value); //emit kore dite
    //     this.$refs.input2.value = value;
    //     // Do other stuff here
    //   }
    // },
    getSchema() {
      return this.$store.getters.getScrutinerSchema;
    },

    buttonTitle() {
      return this.indexEdited === -1 ? "Save" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
        ? "Create New scrutinizer"
        : "Edit scrutinizer ";
    },
  },
  methods: {
    subName(item){      
      this.subParam.subject_code = item.subject_code;
      this.$store.dispatch("fetchSubjectData",this.subParam)
      .then(data => {
          console.log("---->show",data.data[0].title);
          item.subject_name = data.data[0].title;
        
        });;
    },
    getTmisData(val){
      this.tab='tab-2'

      var self = this;
      //this.getSchema.paper_code = [];
      // this.subPap.paper_loading = true;
      let param = {};
      param.exam_initiate_id = this.getExamInitiateId;
      param.exam_code = this.$store.getters.getLoggedInExam.code;
      param.year = this.$store.getters.getLoggedInYear.year;
      param.tmis_id = val;
      param.nested = false;

      if (val != 0) {
        this.$store
          .dispatch("fetchExaminerMonitoringData", param)
          .then((data) => {
            console.log("...m", data);
            //self.subPap.paper_loading = false;
            self.getSchema.name = data[0].examiner_name;
            self.getSchema.subject_code = data[0].subjects[0].code;
            self.getSchema.subject_name = data[0].subjects[0].title;
            self.getSchema.h_examiner_code = data[0].head_examiners[0].examiner_code;
            self.getSchema.h_ex_tmis_id = data[0].head_examiners[0].tims_id;
            self.getSchema.designation_id = data[0].details.designation_code;  
            self.getSchema.dist_code = data[0].details.district_code;  
            self.getSchema.college_code = data[0].details.college_code;   
            self.getSchema.no_of_script = data[0].details.no_of_script;     
          });
      }
        
    },

    validationForm() {
      console.log("schemssssss ", this.getSchema);
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.edit();
        }
      });
    },
    remove(arr, item) {
      const index = arr.indexOf(item);
      if (index >= 0) arr.splice(index, 1);
    },
    removeSubject(arr, item) {
      const index = arr.indexOf(item.code);
      if (index >= 0) arr.splice(index, 1);

      // this.subjectChange(); //on subject change paper call
    },
     removeDesignation() {
      this.getSchema.designation_id = "";      
    },


    save() {
      let self = this;
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
     
      let item = this.getSchema;
      item.exam_year = this.getLoggedInYear.year;
      console.log("///m", item);
      this.$store
        .dispatch("saveScrutinerData", item)
        .then(function (data) {
          try {
            self.searchScrutineerList();
            self.close();
           
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    edit() {
      let self = this;
      
      // this.getSchema.username = this.tmis_id; //tmis to username
      let item = this.getSchema;
      this.$store
        .dispatch("editScrutinerData", item)
        .then(function (data) {
          self.searchScrutineerList();
          self.close();
          
          //self.$store.dispatch("fetchCenLsDistToRegData");
        })
        .catch(function (error) {
          console.log(error);
          //self.$store.dispatch("fetchCenLsDistToRegData");
        });
    },
    clear() {
      // Object.keys(this.getSchema).forEach(param => {
      //   this.getSchema[param] = "";
      // });
      this.email = "";
      this.tmis_id = "";
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$store.commit("UNSET_SCRUTINER_SCHEMA");
      this.$validator.reset();
    },
    close() {
      
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
