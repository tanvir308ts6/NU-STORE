<template>
  <v-container fluid>
    <div>
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
                  <v-select
                    name="degree_group_code"
                    label="Degree Group"
                    v-model="searchParam.degree_group_code"
                    :items="getAllDegreeGroup"
                    :item-text="
                      item =>
                        item.degree_group_code + '-' + item.degree_group_name
                    "
                    item-value="degree_group_code"
                    v-validate="'required'"
                    data-vv-name="degree_group_code"
                    prepend-icon="edit"
                    @change="getSubjectData"
                    clearable
                  ></v-select>
                  <v-select
                    name="subject_code"
                    label="Subject"
                    v-model="searchParam.subject_code"
                    :items="getSubject"
                    :item-text="
                      item => item.subject_code + '-' + item.subject_name
                    "
                    item-value="subject_code"
                    v-validate="'required'"
                    data-vv-name="subject_code"
                    required
                    prepend-icon="edit"
                    clearable
                  ></v-select>
                  <v-flex xs12 sm12 md12 style="margin-top: 40px">
                    <v-layout justify-center row fill-height align-center>
                      <v-btn color="primary" large @click="searchPaperGroup">
                        Search
                      </v-btn>
                      <v-btn color="error  white--text" large @click="reset"
                        >Reset</v-btn
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-container fluid>
        <v-card color="white">
          <formDialog
            :dialogStatus.sync="formDialogStatus"
            :editedData="editedItem"
            :indexEdited.sync="editedIndex"
          ></formDialog>
          <v-layout row>
            <v-card flat>
              <v-card-text class="title">Paper Group List</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Item</v-btn
            >
          </v-layout>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="getSchema"
          class="elevation-1"
          style="white-space: nowrap;"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left">{{ props.item.exam.exam_name }}</td>
            <td
              class="text-xs-left"
              v-if="props.item.degree_group_code != null"
            >
              {{ props.item.degree_group_code }}-
              {{ props.item.degree_group.degree_group_name }}
            </td>
            <td class="text-xs-left" v-else>
              None
            </td>
            <td class="text-xs-left">
              {{
                props.item.subject_code != null
                  ? props.item.subject.subject_name
                  : "N/A"
              }}
            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.short_name }}</td>
            <td class="text-xs-left">{{ props.item.number_of_paper }}</td>
            <td class="text-xs-left">{{ props.item.paper_group_set }}</td>
            <td class="text-xs-left">
              {{ props.item.show_name === "1" ? "Yes" : "No" }}
            </td>
            <td class="text-xs-left">
              {{ props.item.status === "1" ? "Active" : "In Active" }}
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
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
// @ts-nocheck

import formDialog from "@/components/core/paperGroup/paperGroupForm.vue";
export default {
  components: {
    formDialog
  },
  data: () => ({
    formDialogStatus: false,
    headers: [
      { text: "SL", align: "left", sortable: false, value: "index" },
      { text: "Exam", align: "left", value: "exam_name" },
      { text: "Degree Group", align: "left", value: "degree_group_code" },
      { text: "Subject", align: "left", value: "subject_name" },
      { text: "Name", align: "left", value: "name" },
      { text: "Short Name", align: "left", value: "name" },
      { text: "Selectable Paper", align: "left", value: "number_of_paper" },
      { text: "Group Set", align: "left", value: "paper_group_code" },
      { text: "Show Name", align: "left", value: "show_name" },
      { text: "Status", align: "left", value: "status" },
      { text: "Actions", align: "left", value: "name", sortable: false }
    ],
    editedIndex: -1,
    editedItem: "",
    searchParam: {
      degree_group_code: "",
      subject_code: ""
    }
  }),

  computed: {
    getSchema() {
      return this.$store.getters.getPaperGroupData;
    },
    getLoggedInExam() {
      return this.$store.getters.getLoggedInExam;
    },
    getSubject() {
      return this.$store.getters.getAllSubject;
    },
    getLoggedInDegree() {
      return this.$store.getters.getLoggedInDegree;
    },
    getAllDegreeGroup() {
      return this.$store.getters.getAllDegreeGroup;
    }
  },

  created() {
    //this.$store.dispatch("fetchCPaperGroupList",this.getLoggedInExam.code);
    this.$store.dispatch("subjectByDegree", {
      degree_code: this.getLoggedInDegree.code
    });
    this.$store.dispatch(
      "fetchAllDegreeGroupData",
      this.getLoggedInDegree.code
    );
  },

  methods: {
    getSubjectData(degree_group_code) {
      this.$store.dispatch("fetchAllSubjectData", {
        params: { degree_group_code: degree_group_code }
      });
    },
    reset() {
      this.searchParam = {};
    },
    searchPaperGroup() {
      this.$store.dispatch("fetchCPaperGroupList", {
        degree_group_code: this.searchParam.degree_group_code,
        subject_code: this.searchParam.subject_code,
        exam_code: this.getLoggedInExam.code
      });
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        subject_code: "",
        exam_code: "",
        name: "",
        number_of_paper: "",
        status: 1
      };
    },
    dialogOpen() {
      this.formDialogStatus = true;
    },
    newItem() {
      this.unSetEditedData();
      this.dialogOpen();
    },

    editItem(item) {
      this.editedIndex = this.getSchema.indexOf(item);
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
              .dispatch("deletePaperGroup", { id: id })
              .then(function() {
                self.$store.dispatch("fetchCPaperGroupList", {
                  exam_code: this.getLoggedInExam.code
                });
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(() => {
                self.$store.dispatch("fetchCPaperGroupList", {
                  exam_code: this.getLoggedInExam.code
                });
              });
          }
        });
    }
  },
  mounted() {
    this.$store.dispatch("fetchCPaperGroupList", {
      exam_code: this.getLoggedInExam.code
    });
  }
};
</script>

<style scoped></style>
