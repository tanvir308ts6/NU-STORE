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
                      <v-flex xs5>
                        <v-text-field
                          v-model="searchParam.title"
                          class="ma-2"
                          name="title"
                          label="Notice Title"
                          prepend-icon="edit"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-menu
                          v-model="from_date"
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
                              v-model="searchParam.from_date"
                              label="From Date"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="searchParam.from_date"
                            @input="from_date = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs2>
                        <v-menu
                          v-model="to_date"
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
                              v-model="searchParam.to_date"
                              label="To Date"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="searchParam.to_date"
                            @input="to_date = false"
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
              <v-card-text class="title">Notice List</v-card-text>
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
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">
              {{ props.item.from_date | dateFormat }}
            </td>
            <td class="text-xs-left">{{ props.item.to_date | dateFormat }}</td>
            <td class="text-xs-left">
              <v-btn
                v-if="props.item.attachment != null"
                dark
                color="purple"
                :href="getBaseUrl + '/' + props.item.attachment"
                target="_blank"
                small
              >
                <v-icon dark>picture_as_pdf</v-icon>
              </v-btn>
              <v-btn v-else dark color="red">Not Found</v-btn>
            </td>
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
          </template>
          <template v-slot:no-data> </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import formDialog from "@/components/instruction/noticeForm.vue";
export default {
  components: {
    formDialog
  },
  data() {
    return {
      formDialogStatus: false,
      headers: [
        { text: "SL", align: "left", sortable: false, value: "index" },
        { text: "Title", align: "left", value: "title" },
        { text: "From Date", align: "left", value: "expire_date" },
        { text: "To Date", align: "left", value: "expire_date" },
        { text: "Notice", align: "left", value: "attachment" },
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
      from_date: false,
      to_date: false,
      searchParam: {
        title: "",
        from_date: "",
        to_date: ""
      }
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.getInstNoticeList;
    },
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
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
        title: "",
        attachment: "",
        expire_date: "",
        student_panel: "",
        college_panel: "",
        college_user_panel: "",
        center_panel: "",
        examineer_panel: "",
        status: ""
      };
    },
    newItem() {
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
              .dispatch("deleteNotice", { id: id })
              .then(function() {
                self.$store.dispatch("getInstNoticeList");
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(() => {
                self.$store.dispatch("getInstNoticeList");
              });
          }
        });
    },
    search() {
      this.$store.dispatch("getInstNoticeList", {
        title: this.searchParam.title,
        from_date: this.searchParam.from_date,
        to_date: this.searchParam.to_date,
        display_at: this.searchParam.display_at
      });
    }
  },

  mounted() {
    this.$store.dispatch("getInstNoticeList");
  }
};
</script>

<style></style>
