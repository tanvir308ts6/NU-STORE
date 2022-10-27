<template>
  <v-container fluid>
    <div>
      <!-- Search Panel -->
      <v-container fluid>
        <v-layout row>
          <v-expansion-panel focusable>
            <v-expansion-panel-content class="mycustomExpansionPanel">
              <template v-slot:actions>
                <v-icon large color="primary">$vuetify.icons.expand</v-icon>
              </template>
              <template v-slot:header>
                <div>
                  <v-icon color="primary">search</v-icon>
                  <span class="pl-2 subheading">Custom Search Panel</span>
                </div>
              </template>
              <v-layout row wrap align-center>
                <v-flex>
                  <v-card class="px-3">
                    <v-layout row wrap align-center class="py-3">
                      <v-flex xs6>
                        <v-select
                          v-model="searchParam.exam_initiate_id"
                          :items="getExamList"
                          item-text="exam_display_name"
                          item-value="id"
                          label="Select Exam"
                          data-vv-name="exam_display_name"
                          :error-messages="errors.collect('exam_initiate_id')"
                          prepend-icon="edit"
                          clearable
                        ></v-select>
                      </v-flex>
                      <v-flex xs3>
                        <v-menu
                          v-model="expire_date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="searchParam.expire_date"
                              label="Expire Date"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              data-vv-name="expire_date"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="searchParam.expire_date"
                            @input="expire_date = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs3>
                        <v-select
                          v-model="searchParam.display_at"
                          :items="getDisplay"
                          item-text="type_name"
                          item-value="type_id"
                          label="Display At"
                          clearable
                        ></v-select>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          v-model="searchParam.question"
                          class="ma-2"
                          name="title"
                          label="Question"
                          prepend-icon="edit"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          v-model="searchParam.answer"
                          class="ma-2"
                          name="title"
                          label="Answer"
                          prepend-icon="edit"
                          clearable
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm12 md12 style="margin-top: 40px">
                        <v-layout justify-center row fill-height align-center>
                          <v-btn color="primary" large @click="search">
                            Search
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
        <br />
        <v-card color="white">
          <formDialog
            :dialogStatus.sync="formDialogStatus"
            :editedItem="editedItem"
            :editedIndex.sync="editedIndex"
          ></formDialog>
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">FAQ List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem">
              Add New
            </v-btn>
          </v-layout>
        </v-card>
        <!--
            :expand="expand"
            item-key="question"
            -->
        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="pagination.rowsPerPageItems"
          style="white-space: nowrap;"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-xs-left">{{ props.index + 1 }}</td>
              <td class="text-xs-left">
                {{ props.item.exam_master.exam_display_name }}
              </td>
              <td class="text-xs-left">{{ props.item.question }}</td>
              <td class="text-xs-left">
                <v-chip v-if="props.item.user_type == 1">
                  Admin
                </v-chip>
                <v-chip v-else-if="props.item.user_type == 2">
                  College
                </v-chip>
                <v-chip v-else-if="props.item.user_type == 3">
                  {{ props.item.college_user.name }}
                </v-chip>
                <v-chip v-else-if="props.item.user_type == 4">
                  Student
                </v-chip>
                <v-chip v-else-if="props.item.user_type == 5">
                  Center
                </v-chip>
              </td>
              <td>
                {{ props.item.answer }}
              </td>
              <td>{{ props.item.expire_date | dateFormat }}</td>
              <!--
                    <td class="text-xs-left">
                        {{ props.item.date | dateFormat }}
                    </td>
                    <td class="text-xs-left">
                        {{ props.item.expire_date | dateFormat }}
                    </td>
                    <td class="text-xs-left">
                        {{ props.item.student_panel === "1" ? "Yes" : "No" }}
                    </td>
                    <td class="text-xs-left">
                        {{ props.item.college_panel === "1" ? "Yes" : "No" }}
                    </td>
                    <td class="text-xs-left">
                        {{ props.item.college_user_panel=== "1" ? "Yes" : "No" }}
                    </td>
                    <td class="text-xs-left">{{ props.item.center_panel === "1" ? "Yes" : "No" }}</td>
                    -->
              <td class="text-xs-left">
                {{ props.item.student_panel === "1" ? "Yes" : "No" }}
              </td>
              <td class="text-xs-left">
                {{ props.item.college_panel === "1" ? "Yes" : "No" }}
              </td>
              <td class="text-xs-left">
                {{ props.item.college_user_panel === "1" ? "Yes" : "No" }}
              </td>
              <td class="text-xs-left">
                {{ props.item.center_panel === "1" ? "Yes" : "No" }}
              </td>
              <td class="text-xs-left">
                {{ props.item.examineer_panel === "1" ? "Yes" : "No" }}
              </td>
              <td class="text-xs-left">
                {{ props.item.status == 1 ? "Published" : "Un Published" }}
              </td>
              <td class="justify-left layout px-0">
                <v-btn
                  color="primary"
                  fab
                  small
                  dark
                  @click="editItem(props.item)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  fab
                  small
                  dark
                  @click="deleteItem(props.item.id)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
          <!--
            <template v-slot:expand="props">
                <v-card flat>
                <v-card-text>
                    {{ props.item.answer }}
                </v-card-text>
                
                </v-card>
            </template>
            -->
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
    <!--<pre>{{ getSchema }}</pre>-->
  </v-container>
</template>

<script>
import formDialog from "@/components/instruction/faqForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      expand: false,
      formDialogStatus: false,
      headers: [
        { text: "SL", align: "left", sortable: false, value: "index" },
        { text: "Exam", align: "left", value: "exam_initiated_id" },
        { text: "Question", align: "left", value: "question" },
        { text: "From", align: "left", value: "user_id" },
        { text: "Answer", align: "left", value: "answer" },
        { text: "Expire Date", align: "left", value: "expire_date" },
        { text: "Student Panel", align: "left", value: "student_panel" },
        { text: "College Panel", align: "left", value: "college_panel" },
        {
          text: "College User Panel",
          align: "left",
          value: "college_user_panel"
        },
        { text: "Center Panel", align: "left", value: "center_panel" },
        { text: "Examineer Panel", align: "left", value: "examineer_panel" },
        { text: "Status", align: "left", value: "status" },
        { text: "Actions", align: "left", value: "name", sortable: false }
      ],
      editedIndex: "",
      editedItem: this.unSetEditedData(),
      pagination: {
        ascending: true,
        rowsPerPage: 10,
        page: 1
      },
      loading: false,
      expire_date: false,
      searchParam: {}
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.getInsFaqList;
    },
    getExamList() {
      return this.$store.getters.getInsFaqExamList;
    },
    getDisplay() {
      return [
        { type_id: "1", type_name: "Student Panel" },
        { type_id: "2", type_name: "College Panel" },
        { type_id: "3", type_name: "College User Panel" },
        { type_id: "4", type_name: "Center Panel" },
        { type_id: "5", type_name: "Examineer Panel" }
      ];
    }
  },

  methods: {
    dialogOpen() {
      this.formDialogStatus = true;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        question: "",
        answer: "",
        date: "",
        expire_date: "",
        student_panel: "",
        degree_code: "",
        degree_group_code: "",
        subject_code: "",
        college_panel: "",
        college_user_panel: "",
        center_panel: "",
        status: ""
      };
    },
    newItem() {
      //this.apiData();
      this.editedIndex = 0;
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      // this.apiData();
      this.editedIndex = 1;
      //this.editedIndex = this.getSchema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formDialogStatus = true;
    },
    deleteItem(id) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteFaq", { id: id })
              .then(function() {
                self.$store.dispatch("getInsFaqList");
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(() => {
                self.$store.dispatch("getInsFaqList");
              });
          }
        });
    },

    search() {
      console.log(this.searchParam);
      this.$store.dispatch("getInsFaqList", {
        search: "yes",
        exam_initiate_id: this.searchParam.exam_initiate_id,
        expire_date: this.searchParam.expire_date,
        display_at: this.searchParam.display_at,
        question: this.searchParam.question,
        answer: this.searchParam.answer
      });
    },

    apiData() {
      this.$store.dispatch("fetchAllDegreeData");
      this.$store.dispatch("fetchAllDegreeGroupData");
      this.$store.dispatch("fetchAllSubjectData");
    }
  },

  mounted() {
    this.$store.dispatch("getInsFaqList");
  },
  created() {
    this.$store.dispatch("getInsFaqExamList");
  }
};
</script>

<style></style>
