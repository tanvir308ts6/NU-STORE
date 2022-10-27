<template>
  <v-container fluid>
    <v-container fluid>
      <v-card color="white">
        <v-layout row>
          <v-card flat>
            <v-card-text class="title">Exam Result Activities</v-card-text>
          </v-card>
          <v-divider class="my-2" vertical></v-divider>

          <v-spacer />

          <v-dialog v-model="dialog" max-width="500px" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="newItem()"
                >New Item</v-btn
              >

            </template>
            <v-card>
              <v-toolbar color="primary white--text" flat>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                 <v-spacer></v-spacer>
                <v-btn
                fab
                class="ma-0 pa-0"
                small
                color="white black--text "
                @click="close"
                >
                <v-icon medium>close</v-icon>
              </v-btn>
              </v-toolbar>
              <formNotification />

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-validate="'required'"
                        data-vv-name="Title"
                        v-model="editedItem.title"
                        label="Title"
                        outline
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        outline
                        v-model="editedItem.description"
                        label="Description"
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-validate="'required'"
                        data-vv-name="Tag"
                        :error-messages="errors.collect('tag')"
                        v-model="editedItem.tag"
                        label="tag"
                        outline
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        required
                        v-validate="'required|numeric'"
                        data-vv-name="SL"
                        :error-messages="errors.collect('sl')"
                        v-model="editedItem.sl"
                        label="sl "
                        outline
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <!-- v-validate="'required'"
                        data-vv-name="Tag"
                        :error-messages="errors.collect('tag')" -->
                      <v-text-field
                        v-model="editedItem.url"
                        label="URL"
                        outline
                        prepend-icon="edit"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions >
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
        </v-layout>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="getResultActivitiesData"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.index + 1 }}</td>
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-left">{{ props.item.url }}</td>
          <td class="text-xs-left">{{ props.item.sl }}</td>
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
            </v-item-group>
          </td>
          <!-- <td class="justify-center text-xs-center">
            <v-item-group>
              <v-tooltip right color="red">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="red" v-on="on">
                    <v-icon @click="deleteItem(props.item)" color="white">delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-item-group>
          </td>-->
        </template>
      </v-data-table>
    </v-container>

    <!-- <pre> {{getResultActivitiesData}}</pre> -->
  </v-container>
</template>

<script>
import formNotification from "@/components/utils/formNotification";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    formNotification
  },
  data: () => ({
    editBtn: true,
    newBtn: true,
    dialog: false,
    pagination: { rowsPerPage: -1 },
    rules: {
      required: value => !!value || "Required."
    },
    headers: [
      {
        text: "Sl",
        align: "left",
        sortable: false,
        value: "activity_name"
      },
      {
        text: "Title",
        align: "left",
        sortable: false,
        value: "title"
      },
      {
        text: "Description",
        align: "left",
        value: "description",
        sortable: false
      },

      { text: "Link", align: "left", value: "tag", sortable: false },
      { text: "No.", align: "left", value: "sl", sortable: false },

      {
        text: "Edit",
        align: "left",
        value: "name",
        sortable: false
      }
      // {
      //   text: "Delete",
      //   align: "left",
      //   value: "name",
      //   sortable: false,
      // },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      tag: "",
      sl: 0,
      description: ""
    },
    defaultItem: {
      title: "",
      tag: "",
      sl: 0,
      description: ""
    },
    dictionary: {
      custom: {
        sl: {
          required: () => "Must be numeric",
          numeric: "Must be numeric"
        },
        title: {
          required: () => "Activity name is needed."
        },
        tag: {
          required: () => "Tag is needed."
        }
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    buttonTitle() {
      return this.editedIndex === -1 ? "Save" : "Edit";
    },
    getResultActivitiesData() {
      return this.$store.getters.getResultActivitiesData;
    }
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch("fetchExamResultActivitiesData");
    this.initialize();
  },

  methods: {
    validationForm() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          console.log("......")
          if(this.editBtn){
            this.edit();
          }else{
            this.save();
          }
        }
      });
    },
    clear() {     
      
      this.editedItem.title = "";
      this.editedItem.description = "";
      this.editedItem.tag = "";
      this.editedItem.sl = "";
      this.editedItem.url = "";
      
    },
    initialize() {
      this.desserts = [
        {
          activity_name: "Frozen Yogurt",
          tag: "t1",
          sl: 0,
          description: "des 1"
        },
        {
          activity_name: "Ice cream sandwich",
          tag: "t2",
          sl: 0,
          description: "des 2"
        },
        {
          activity_name: "Eclair",
          tag: "t3",
          sl: 0,
          description: "des 2"
        }
      ];
    },
    newItem() {
      this.editBtn = false;
      this.newBtn = true;
    },

    editItem(item) {
      this.editedIndex = 1;
      this.editBtn = true;
      this.newBtn = false;
      // this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      // const index = this.desserts.indexOf(item);
      // confirm("Are you sure you want to delete this item?") &&
      //   this.desserts.splice(index, 1);
      this.delete(item);
    },

    close() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.$store.commit("UNSET_FORMNOTIFY");
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$store
            .dispatch("addExamResultActivitiesData", this.editedItem)
            .then(data => {
              console.log("data:", data);
              this.$store.dispatch("fetchExamResultActivitiesData");
              this.close();
            })
            .catch(function(error) {
              this.$store.dispatch("fetchExamResultActivitiesData");
            });
        }
      });
    },

    edit() {
      console.log("edit called");
      this.$store.commit("UNSET_FORMNOTIFY");
      this.editBtn = true;
      this.newBtn = false;
      let self = this;
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$store
            .dispatch("updateExamResultActivitiesData", this.editedItem)
            .then(status => {
              if (status == "success") {
                self.close();
                self.$store.dispatch("fetchExamResultActivitiesData");
              }
            })
            .catch(function(error) {
              console.log("ERR ", error);
              self.$store.dispatch("fetchExamResultActivitiesData");
            });
        }
      });
    },

    delete(item) {
      let that = this;
      this.$root
        .$confirm("Are you sure that you want to delete?")
        .then(confirm => {
          if (confirm) {
            that.$store
              .dispatch("deleteExamActivitiesData", item)
              .then(() => {
                that.$store.dispatch("fetchExamResultActivitiesData");
              })
              .catch(function(error) {
                that.$store.dispatch("fetchExamResultActivitiesData");
              });
            that.close();
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
