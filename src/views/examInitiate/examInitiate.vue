<template>
  <v-container fluid>
    <v-card>
      <v-card color="primary" flat></v-card>
      <formNotification />
      <v-card-text>
        <v-card flat class="pr-3 scroll">
          <v-form>
            <v-layout row wrap>
              <v-flex xs6>
                <v-autocomplete
                  label="Select Exam"
                  :item-text="item => '(' + item.code + ') ' + item.title"
                  item-value="code"
                  v-model="getSchema.exam_code"
                  :items="getExamList"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam')"
                  data-vv-name="exam"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_code = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      {{ "(" + data.item.code + ") " + data.item.title }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="'(' + data.item.code + ') ' + data.item.title"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                  label="Select Exam Type"
                  item-text="exam_type_name"
                  item-value="exam_type"
                  v-model="getSchema.exam_type"
                  :items="getExamInitiateItem"
                  v-validate="'required'"
                  :error-messages="errors.collect('exam_type')"
                  data-vv-name="exam_type"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      close
                      @input="getSchema.exam_type = ''"
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ data.item.exam_type_name }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="data.item.exam_type_name"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                  label="Select Year"
                  item-text="year"
                  item-value="id"
                  v-model="getSchema.year"
                  :items="years"
                  v-validate="'required'"
                  :error-messages="errors.collect('year')"
                  data-vv-name="year"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ getSchema.year }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="getSchema.year"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                  label="Select Session"
                  item-text="session"
                  item-value="session"
                  v-model="getSchema.session"
                  :items="sessions"
                  v-validate="'required'"
                  :error-messages="errors.collect('session')"
                  data-vv-name="session"
                  required
                  prepend-icon="edit"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                      >{{ getSchema.session }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content
                        v-text="data.item"
                      ></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="getSchema.session"
                        ></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}</v-btn
          >
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Exam Initiate</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>
          <v-text-field
            class="mt-0"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="search"
            single-line
            solo
            v-model="search"
          ></v-text-field>
          <!-- <v-btn @click="getDataFromApi()" fab small color="primary" dark>

          </v-btn>-->
          <v-spacer />
        </v-layout>
      </v-card>
      <!-- :rows-per-page-items="[
          25,
          50,
          100,
          { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]"-->

      <v-data-table
        :headers="headers"
        :items="getExamInitiateItem"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs">{{ props.item.exam_name }}</td>
          <td class="text-xs">{{ props.item.exam_type }}</td>
          <td class="text-xs">{{ props.item.year }}</td>
          <td class="text-xs">{{ props.item.session }}</td>

          <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="primary" v-on="on">
                    <v-icon
                      @click="editItem(props.item)"
                      class="mr-0"
                      color="white"
                      >edit</v-icon
                    >
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white"
                      >delete</v-icon
                    >
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-item-group>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import formNotification from "@/components/utils/formNotification";
export default {
  components: {
    formNotification
  },
  data() {
    return {
      pagination: {},

      dataItems: [],
      sessions: [2011, 2012, 2013, 2014],
      getExamTypeList: ["Normal", "Special"],
      years: [2011, 2012, 2013, 2014],
      totalDataItems: 0,
      loading: true,
      dialog: false,
      editStatus: false,
      search: "",
      headers: [
        { text: "SL.", align: "left", value: "id", width: "10" },
        { text: "Exam Name", value: "exam_name" },
        { text: "Exam Type", value: "exam_type" },
        { text: "Year", value: "year" },
        { text: "Session", value: "session" },
        { text: "Actions", align: "center", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: this.unSetEditedData,
      limit: {}
    };
  },
  created() {
    this.$store.dispatch("callExamInitiateData");
    this.$store.dispatch("fetchExamData");
  },
  // mounted() {
  //   this.getDataFromApi().then(data => {
  //     this.dataItems = data.items;
  //     this.totalDataItems = data.total;
  //   });
  // },
  computed: {
    getExamInitiateItem() {
      return this.$store.getters.getExamInitiateList;
    },
    getExamList() {
      return this.$store.getters.getExamItem;
    },
    getSchema() {
      return this.$store.getters.getExamInitiateSchema;
    },
    buttonTitle() {
      return this.editedIndex === -1 ? "Save" : "Edit";
    }
  },
  watch: {
    // editStatus(item){
    //   this.$store.commit("SET_EXAM_INITIATE_SCHEMA", this.editedItem);
    // }
    // pagination: {
    //   handler() {
    //     this.getDataFromApi().then(data => {
    //       this.dataItems = data.items;
    //       this.totalDataItems = data.total;
    //     });
    //   },
    //   deep: true
    // }
  },
  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.editedIndex === -1 ? this.save() : this.edit();
        }
      });
    },

    save() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("saveExamInitiateData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("callExamInitiateData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callExamInitiateData");
        });
    },

    edit() {
      let self = this;
      let item = this.getSchema;
      this.$store
        .dispatch("editExamInitiateData", item)
        .then(function(data) {
          try {
            self.close();
            self.$store.dispatch("callExamInitiateData");
          } catch (ex) {
            console.log(ex);
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$store.dispatch("callExamInitiateData");
        });
    },

    clear() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$store.commit("UNSET_EXAM_INITIATE_SCHEMA");
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
    unSetEditedData() {
      this.editedItem = {
        id: "",
        exam_code: "",
        exam_name: "",
        year: "",
        exam_type: 1,
        exam_type_name: "",
        created_at: "",
        updated_at: "",
        deleted_at: ""
      };
    },
    // dialogOpen() {
    //   this.formDialogStatus = true;
    // },
    // newItem() {
    //   this.unSetEditedData();
    //   this.dialogOpen();
    // },
    editItem(item) {
      console.log("item", item);
      this.editedIndex = this.getExamInitiateItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$store.commit("SET_EXAM_INITIATE_SCHEMA", item);
    },
    deleteItem(item) {
      const id = item.id;
      let self = this;

      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            this.$store
              .dispatch("deleteExamInitiateItem", id)
              .then(function() {
                self.$store.dispatch("callExamInitiateData");
              })
              .catch(function(error) {
                console.log(error);

                self.$store.dispatch("callExamInitiateData");
              });
          }
        });
    }
  }
};
</script>

<style scoped></style>
