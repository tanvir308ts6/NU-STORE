<template>
  <div class="form">
    <v-dialog v-model="dialog" max-width="800px" persistent>
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
              	<!-- {{getLoggedInExamType}} -->
                  <v-autocomplete
                  outline
                  class="ma-2"
                  v-model="getSchema.paper_code"
                  item-value="paper_code"
                  :item-text="item => item.code + ' - ' + item.title"
                  :items="getPaperList"
                  menu-props="auto"
                  label="Select Course"
                  hide-details
                  prepend-icon="library_books"
                  
                  required
                  v-validate="'required'"
                  :error-messages="errors.collect('paper_code')"
                  data-vv-name="paper_code"
                >
                  <!-- :loading="subPap.paper_loading" -->
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.paper_code=''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{
                      "(" + data.item.code + ") " + data.item.title
                      }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="'(' + data.item.code + ') ' + data.item.title"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
             
            <br>
              
              <v-text-field
                name="grace_mark"
                label="Grace Mark"
                v-model="getSchema.grace_mark"
                v-validate="'required'"
                :error-messages="errors.collect('grace_mark')"
                data-vv-name="grace_mark"
                required
                prepend-icon="edit"
              ></v-text-field>
             
            
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
import formNotification from "@/components/utils/formNotification";
import common_login_getters from "../../mixin/common_login_getters";
import commonGet from "../../mixin/common_getters_mixin";
import commonExamYear from "../../mixin/exam_year_watch_mixin";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  mixins: [commonGet, commonExamYear, common_login_getters],
  props: ["dialogStatus", "editedData", "indexEdited", "getDataFromApi"],
  data: () => ({
    degree_code: "",
    course_code: "",
    dialog: false,
    editedStatus: false,
    dateMenu: false,
    degrees: [],
    courses: [],
    dictionary: {
      custom: {
        paper_code: {
          required: () => "Select Paper"
        }
      
      }
    }
  }),
  created() {
    
    this.$store.commit("UNSET_FORMNOTIFY");
     if (!this.$store.getters.getPaperItems.length) {
      this.$store.dispatch("fetchPaperData");
    }
    this.getSchema.exam_code = this.getLoggedInExam.code;
   console.log("code fined",this.getSchema.exam_code) 
    
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  watch: {
    dialogStatus(val) {
      this.dialog = val;
      this.$store.commit("SET_GRACE_SUMMARY_SCHEMA_DATA", this.editedData);
      this.courses = this.$store.getters.getCourseItems;
      this.degrees = this.$store.getters.getDegreeItems;
      this.degree_code = this.editedData.degree_code;
      // this.course_code = this.editedData.course_code;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  computed: {
    getSchema() {
      return this.$store.getters.getGraceMarkSchema;
    },
    getItemList() {
      return this.$store.getters.getExamDataList;
    },
    buttonTitle() {
      return this.indexEdited === -1 ? "Submit" :this.indexEdited === -2 ? "Approve" : "Edit";
    },
    formTitle() {
      console.log("this.indexEdited", this.indexEdited);
      return this.indexEdited === -1 ? "Add Grace Mark Proposal" : this.indexEdited === -2 ? "Approve Grace Mark Proposal" :"Edit Grace Mark Proposal";
    }
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.indexEdited === -1 ? this.save() : this.indexEdited === -2 ? this.approve() : this.edit();
        }
      });
    },
     removePaper(item) {
      const index = this.getSchema.paper_code.indexOf(item.code);
      console.log("paper in", index);
      if (index >= 0) this.getSchema.paper_code.splice(index, 1);
    },
    save() {
      let self = this;
      // this.getSchema.course_code = this.course_code;
      this.getSchema.exam_initiate_id = this.getExamInitiateId;
      this.getSchema.exam_code = this.getLoggedInExam.code;
      this.getSchema.exam_year = this.getLoggedInYear.year;
      //this.getSchema.exam_type = this.getLoggedInExamType;

      let item = this.getSchema;
      console.log("Save ", item);
      this.$store
        .dispatch("saveGraceMarkData", item)
        .then(function(data) {
          try {
            self.close();
            //self.$emit("update:loadData", true);
            self.getDataFromApi();
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editGraceSummaryData", item)
        .then(function() {          
          self.close();
          self.getDataFromApi();
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    approve() {
      let self = this; 
      this.getSchema.status = 1;   
      let item = this.getSchema;
      this.$store
        .dispatch("approveGraceSummaryData", item)
        .then(function() {
          self.close();
          self.getDataFromApi();
        })
        .catch(function(error) {
          console.log(error);
          self.getDataFromApi();
        });
    },
    clear() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.getSchema.paper_code = "";
      this.getSchema.grace_mark = "";
 
    },
    close() {
      this.$store.commit("UNSET_FORMNOTIFY"); // unsetting "formNotify"
      this.$emit("update:dialogStatus", false);
      setTimeout(() => {
        this.$emit("update:indexEdited", -1);
      }, 300);
      this.clear();
    }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
