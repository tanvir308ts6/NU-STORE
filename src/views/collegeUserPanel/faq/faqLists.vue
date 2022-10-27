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
            <v-btn color="primary" dark class="mb-2" @click="newItem"
              >New Item</v-btn
            >
          </v-layout>
        </v-card>
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
            <td class="text-xs-left">{{ props.index + 1 }}</td>
            <td class="text-xs-left" style="vertical-align: top;">
              <p style="font-weight: bold;">Question</p>
              <hr />
              <p>Answer</p>
            </td>
            <td class="text-xs-left" style="vertical-align: top">
              <p style="font-weight: bold">{{ props.item.question }}</p>
              <hr />
              <p>
                <slot v-if="props.item.answer != null">
                  {{ props.item.answer }}
                </slot>
                <slot v-else></slot>
              </p>
            </td>
            <td class="text-xs-left" style="vertical-align: top">
              <p style="font-weight: bold">
                {{ props.item.question_date | dateFormat }}
              </p>
              <hr />
              <p>
                <slot v-if="props.item.answer_date != null">
                  {{ props.item.answer_date | dateFormat }}
                </slot>
                <slot v-else></slot>
              </p>
            </td>
            <td class="text-xs-left">
              {{ props.item.exam_master.exam_display_name }}
            </td>

            <td class="text-xs-left">
              <v-btn
                color="primary"
                fab
                small
                dark
                @click="editItem(props.item)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <hr />
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
import formDialog from "@/components/collegeUserPanel/faqForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      formDialogStatus: false,
      headers: [
        { text: "SL", align: "left", sortable: false, value: "index" },
        { text: "Q/A", align: "left", value: "rule" },
        { text: "Question/Answer", align: "left", value: "expire_date" },
        { text: "Date", align: "left", value: "student_panel" },
        { text: "Exam", align: "left", value: "exam_display_name" },
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
      searchParam: {}
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.cuFaqList;
    }
  },

  methods: {
    dialogOpen() {
      this.formDialogStatus = true;
    },
    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_initiate_id: "",
        question: ""
      };
    },
    newItem() {
      this.editedIndex = 0;
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
      this.editedIndex = 1;
      let newItem = {
        id: item.id,
        exam_initiate_id: item.exam_initiate_id,
        question: item.question
      }
      this.editedItem = Object.assign({}, newItem);
      this.formDialogStatus = true;
    },
    deleteItem(id) {
      let self = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("cuDeleteFaq", { id: id })
              .then(function() {
                self.$store.dispatch("cuFaqList");
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(() => {
                self.$store.dispatch("cuFaqList");
              });
          }
        });
    },
    search() {
      this.$store.dispatch("cuFaqList", {
        search: "yes",
        question: this.searchParam.question,
        answer: this.searchParam.answer
      });
    }
  },

  mounted() {
    this.$store.dispatch("cuFaqList");
  }
};
</script>

<style></style>
