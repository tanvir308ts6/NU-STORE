<template>
  <div class="form">

    <v-dialog v-model="dialog" fullscreen>

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
        <v-container >
          <v-card-text>
            <v-card flat class="pr-3 scroll">
              <v-layout row wrap align-center>

                <v-flex xs12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12>
                  <v-card class="px-3 ma-3 CSP_BoarderStyle" color="#FAFAFA">
                    <v-layout row wrap align-center class="py-3">
                     
                      <v-text-field
                      class="ma-2"
                      name="reg_no"
                      label="Registration Number"
                      v-model="searchParam.reg_no"

                      :error-messages="errors.collect('reg_no')"
                      data-vv-name="reg_no"
                      required
                      prepend-icon="edit"
                      ></v-text-field>
                      <v-flex xs12>
                        <v-autocomplete
                        class="ma-2"
                        hide-details
                        v-model="searchParam.session_year"
                        :item-text="item => item.session"
                        item-value="session_year"
                        :items="getSessionList"
                        menu-props="auto"
                        label="Session Year"
                        prepend-icon="list"
                        multiple
                        >
                        <template v-slot:selection="data">
                          <v-chip
                          close
                          @input="removeSession(data.item)"
                          :selected="data.selected"
                          class="chip--select-multi"
                          >{{ data.item.session }}</v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                          </template>
                          <template v-else>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.session"></v-list-tile-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-text-field
                    class="ma-2"
                    name="name"
                    label="Name"
                    v-model="searchParam.name"

                    :error-messages="errors.collect('name')"
                    data-vv-name="name"
                    required
                    prepend-icon="edit"
                    ></v-text-field>
                    <v-text-field
                    class="ma-2"
                    name="father_name"
                    label="Father's Name"
                    v-model="searchParam.father_name"

                    :error-messages="errors.collect('father_name')"
                    data-vv-name="father_name"
                    required
                    prepend-icon="edit"
                    ></v-text-field>

                    <v-text-field
                    class="ma-2"
                    name="mother_name"
                    label="Mother's Name"
                    v-model="searchParam.mother_name"

                    :error-messages="errors.collect('mother_name')"
                    data-vv-name="mother_name"
                    required
                    prepend-icon="edit"
                    ></v-text-field>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mb-3">
                <v-layout justify-center row fill-height align-center>
                  <v-btn 
                  :disabled="!searchParam.reg_no"
                  outline round large @click="addStudentList()">
                    Add Student
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>

          </v-card>
        </v-card-text>
      </v-container>
      <v-container > 
        <v-data-table
        :loading="loading"
        :headers="headers"
        :items="getTransGenStudentDataList"
        hide-actions
        class="elevation-1"      
        >
        <template v-slot:items="props">          
          <td class="text-xs">{{ props.item.reg_no }}</td>
          <td class="text-xs">{{ props.item.name }}</td>         
          <td class="text-xs">{{ props.item.degree }}</td>



        </template>
      </v-data-table>
    </v-container>
    <v-flex xs12 sm12 md12 class="mb-3">
      <v-layout justify-center row fill-height align-center>
        <v-btn outline round large @click="submit()">
          Generate Transcript
        </v-btn>
      </v-layout>
    </v-flex>

  </v-card>

</v-dialog>
</v-container>
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
    validator: "new"
  },
  components: {
    formNotification
  },
  props: ["dialogStatus", "editedData", "indexEdited", "loadData"],
  data: () => ({
    modelValidations: {
      password: { required: false, min: 6 },
      confirmedPassword: {
        required: false,
        confirmed: "password"
      }
    },
    changePasswordStatus: false,
    sessions: ["2011-2012", "2012-2013", "2013-2014", "2015-2016"],
    dialog: false,
    editedStatus: false,
    dateMenu: false,

    email: "",
    searchParam: {

    },
    param: {

    },
    loading: false,
    headers: [


    { text: "Registration No", value: "reg_no"},
    { text: "Name", value: "name" },

    { text: "Degree", value: "degree" },


    ],
    dictionary: {
      custom: {
        reg_no: {
          required: () => "registration No required"
        },
        student_name: {
          required: () => "Name can not be empty."
        },
        session: {
          equired: () => "Session can not be empty."
        },
        father_name: {
          required: () => "Father's name is required"
        },
        mother_name: {
          required: () => "Mother's name is required"
        }
      }
    }
  }),
  created() {
    this.searchParam.exam_initiate_id = this.getExamInitiateId;
    this.param.exam_initiate_id = this.getExamInitiateId;
    this.$store.dispatch("fetchAllSessionData");
  },
  mounted() {
    
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
       
    },
    dialog(val) {
      if (!val) this.close();
    }
    
  },
  computed: {


    getTransGenStudentDataList() {
      return this.$store.getters.getTransGenStudentDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Add Student" : "Edit";
    },
    formTitle() {
      return this.indexEdited === -1
      ? "Create Transcript "
      : "Edit Transcript ";
    }
  },
  methods: {
 
  


    addStudentList() {
      this.loading = true;
      
      this.$store.dispatch("searchTranscriptGenerateStudentData", this.searchParam).then(data => {
        // console.log("data---", data);
        this.loading = false;
        
      });
    },
    setParam() {
      this.param.exam_code = this.searchParam.exam_code;
      this.param.year = this.searchParam.year;
      this.param.reg_no = this.getTransGenStudentDataList[0].reg_no;
      this.param.name = this.getTransGenStudentDataList[0].name;
    },
    submit() {
      this.loading = true;
      this.setParam();
      this.$store.dispatch("submitGenerateTranscriptData", this.param).then(data => {
        // console.log("data---", data);
        this.loading = false;
      });
    },
  


    close() {
      
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
    }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
