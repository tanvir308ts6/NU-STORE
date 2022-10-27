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
                          v-model="searchParam.instruction"
                          class="ma-2"
                          name="instruction"
                          label="Instruction"
                          prepend-icon="edit"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-select
                          v-model="searchParam.display_type"
                          :items="getDisplayTypes"
                          item-text="type_name"
                          item-value="type_id"
                          label="Display Type"
                          clearable
                        ></v-select>
                      </v-flex>
                      <v-flex xs2>
                        <v-menu
                          v-model="expire_date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="searchParam.expire_date"
                              label="Expire Date"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="searchParam.expire_date"
                            @input="expire_date = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs2>
                        <v-select
                          v-model="searchParam.display_at"
                          :items="getDisplay"
                          item-text="type_name"
                          item-value="type_id"
                          label="Display At"
                          clearable
                        ></v-select>
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
              <v-card-text class="title">Specail Instruction</v-card-text>
            </v-card>
            <v-divider class="my-2" vertical></v-divider>

            <v-spacer />
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="addSpecialInstruction"
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
            <td class="text-xs-left">{{ props.item.instruction }}</td>
            <td class="text-xs-left">
              <v-chip v-if="props.item.display_type == 1">
                Yes
              </v-chip>
              <v-chip v-if="props.item.display_type == 0">
                No
              </v-chip>
            </td>
            <!--
            <td class="text-xs-left">
              <v-chip v-if="props.item.instruction_type == 1">
                General Instruction
              </v-chip>
              <v-chip v-else-if="props.item.instruction_type == 2">
                Special Instruction
              </v-chip>
            </td>
            -->
            <td class="text-xs-left">{{ props.item.expire_date }}</td>
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
            <!--
            <td class="text-xs-left">
              <v-chip v-if="props.item.degree">
                ({{ props.item.degree.degree_code }})
                {{ props.item.degree.degree_name }}
              </v-chip>
            </td>
            <td class="text-xs-left">
              <v-chip v-if="props.item.degree_group">
                ({{ props.item.degree_group.degree_group_code }})
                {{ props.item.degree_group.degree_group_name }}
              </v-chip>
            </td>
            <td class="text-xs-left">
              <v-chip v-if="props.item.subject">
                ({{ props.item.subject.subject_code }})
                {{ props.item.subject.subject_name }}
              </v-chip>
            </td>
            -->
            <td class="text-xs-left">
              {{ props.item.status == 1 ? "Published" : "Unpublished" }}
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
import formDialog from "@/components/instruction/specailInsForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      formDialogStatus: false,
      headers: [
        { text: "SL", align: "left", sortable: false, value: "index" },
        { text: "Instruction", align: "left", value: "instruction" },
        { text: "Highlight", align: "left", value: "display_type" },
        // { text: "Instruction Type", align: "left", value: "instruction_type" },
        { text: "Expire Date", align: "left", value: "expire_date" },
        { text: "Student Panel", align: "left", value: "student_panel" },
        { text: "College Panel", align: "left", value: "college_panel" },
        {
          text: "College User Panel",
          align: "left",
          value: "college_user_panel"
        },
        { text: "Center Panel", align: "left", value: "center_panel" },
        // { text: "Degree", align: "left", value: "degree_code" },
        // { text: "Degree Goup", align: "left", value: "degree_group_code" },
        // { text: "Subject", align: "left", value: "degree_group_code" },
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
      searchParam: {}
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.getInstructionList;
    },
    getDisplay() {
      return [
        { type_id: "1", type_name: "Student Panel" },
        { type_id: "2", type_name: "College Panel" },
        { type_id: "3", type_name: "College User Panel" },
        { type_id: "4", type_name: "Center Panel" },
        { type_id: "5", type_name: "Examineer Panel" }
      ];
    },
    getDisplayTypes() {
      return [
        { type_id: "1", type_name: "Scroll" },
        // { type_id: "2", type_name: "Highlight" },
        { type_id: "3", type_name: "Slide" }
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
        instruction: "",
        display_type: "",
        expire_date: "",
        display_to: "",
        student_panel: "",
        college_panel: "",
        college_user_panel: "",
        center_panel: "",
        examineer_panel: "",
        status: ""
      };
    },
    addSpecialInstruction() {
      this.editedIndex = 0;
      this.unSetEditedData();
      this.dialogOpen();
    },
    editItem(item) {
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
              .dispatch("deleteRule", { id: id })
              .then(function() {
                self.$store.dispatch("getInstructionList", {
                  instruction_type: 2
                });
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(() => {
                self.$store.dispatch("getInstructionList", {
                  instruction_type: 2
                });
              });
          }
        });
    },
    search() {
      this.$store.dispatch("getInstructionList", {
        search: "yes",
        instruction_type: 2,
        instruction: this.searchParam.instruction,
        expire_date: this.searchParam.expire_date,
        display_at: this.searchParam.display_at,
        display_type: this.searchParam.display_type
      });
    }
  },

  mounted() {
    this.$store.dispatch("getInstructionList", {
      instruction_type: 2
    });
  }
};
</script>

<style></style>
