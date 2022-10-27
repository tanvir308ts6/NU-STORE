<template>
  <v-container>
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="50" color="primary">accessibility</v-icon>
        <span class="ml-2">Examiner Access</span>
      </div>
    </span>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex xs12 sm12 md12 lg6>
            <v-card
              class="text-xs-center ma-3 headline"
              style="height: 50px"
              color="cyan darken3"
            >
              <v-icon class="mt-2" medium>arrow_forward</v-icon>
              <span class="ml-2"
                >{{ getSchema.exam_code }} - {{ getSchema.exam_name }}</span
              >
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-spacer class="mb-5"></v-spacer>

    <v-card>
      <v-container fluid grid-list-md>
        <!-- mother -->
        <v-layout
          row
          wrap
          class="mt-auto"
          align-center
          justify-center
          fill-height
        >
          <v-flex md12 lg11>
            <v-card class="white--text" flat>
              <v-card-title primary-title>
                <v-layout
                  row
                  wrap
                  class="mt-auto"
                  align-center
                  justify-center
                  fill-height
                >
                  <div class="text-xs-center" style="width: 1500px">
                    <v-expansion-panel expand popout>
                      <v-expansion-panel-content
                        v-for="hex in examiners"
                        :key="hex.tims_id"
                      >
                        <template v-slot:header>
                          <div class="headline subheading">
                            <b>Head Examiner : &nbsp;</b>{{ hex.tims_id }} -
                            {{ hex.examiner_name }}
                            <p>
                              <b>Papers: &nbsp;</b>
                              {{ getpaper(hex.papers) }}
                            </p>
                            <p>
                              <b>Subjects: &nbsp;</b>
                              {{ getsubjects(hex.subjects) }}
                            </p>
                          </div>
                        </template>
                        <v-divider></v-divider>
                        <v-card color="grey lighten-2" v-show="statuschange">
                          <div>
                            <div
                              class="text-xs-right"
                              style="margin-right: 25px"
                            >
                              <v-btn
                                flat
                                color="primary"
                                @click.native="setSubmenu(hex)"
                                >select//unselect all</v-btn
                              >
                            </div>
                            <v-divider color="primary"></v-divider>
                            <v-layout
                              row
                              wrap
                              align-content-center
                              style="padding-left: 20px"
                            >
                              <v-flex
                                xs8
                                style="margin-top: 20px"
                                class="subheading"
                              >
                                <v-icon color="primary">person</v-icon>
                                <span class="ml-2">{{
                                  hex.examiner_name
                                }}</span>
                              </v-flex>
                              <v-flex xs4 style="margin-left: -50px">
                                <v-checkbox
                                  v-model="hex.access"
                                  label="App Access"
                                  type="checkbox"
                                  color="indigo darken-3"
                                ></v-checkbox>
                              </v-flex>
                            </v-layout>
                            <v-divider color="primary"></v-divider>
                            <v-layout
                              row
                              wrap
                              v-for="examiner in hex.examiners"
                              :key="examiner.tims_id"
                              align-content-center
                              style="padding-left: 50px"
                            >
                              <v-flex
                                xs8
                                style="margin-top: 20px; font-size: 1.1em"
                              >
                                <div class="ml-2">
                                  <v-icon color="primary">arrow_forward</v-icon>
                                  {{ examiner.tims_id }} -
                                  {{ examiner.examiner_name }}
                                  <p></p>
                                  <p>
                                    <b>Email: &nbsp;</b>
                                    {{ examiner.examiner_email }}
                                    <!-- {{ getpapernested(examiner.papers) }} -->
                                  </p>
                                </div>
                              </v-flex>
                              <v-flex xs4>
                                <v-checkbox
                                  v-model="examiner.access"
                                  label="App Access"
                                  type="checkbox"
                                  color="indigo darken-3"
                                ></v-checkbox>
                              </v-flex>
                            </v-layout>
                            <v-divider color="primary"></v-divider>
                          </div>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
            <div class="text-xs-center">
              <v-pagination
                v-model="pagination.current"
                :length="pagination.total"
                @input="onPageChange($event)"
                circle
                :total-visible="7"
              ></v-pagination>
              <v-spacer class="mb-4"></v-spacer>
              <v-btn color="primary" @click="submit()">submit</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import common_login_getters from "../../mixin/common_login_getters";
export default {
  mixins: [common_login_getters],
  props: ["examineraccess", "searchExaminerGroupList"],
  components: {},
  data: () => ({
    visible: false,
    date: {},
    dialog: false,
    callStatus: false,
    statuschange: true,
    pagination: {
      current: 1,
      total: 0,
    },
    examiners : []
  }),
  watch: {
    examineraccess(val) {
      this.dialog = val;
      if (this.getSchema.exam_code && this.getSchema.year) {
        this.callStatus = true;
    //     setLimit() {
    //   const { sortBy, descending, page, rowsPerPage } = this.pagination;
    //   this.searchParam.page = page;
    //   this.searchParam.limit = rowsPerPage;
    //   this.searchParam.sort = sortBy;
    //   this.searchParam.search = this.search;
    // },
        this.data = {
          exam_code: this.getSchema.exam_code,
          year: this.getSchema.year,
          exam_initiate_id: this.getSchema.exam_initiate_id,
          limit : 5,
          page :1,
          //page : this.pagination.current,
        };
      }
      if (this.callStatus) {
        this.callData(this.data);
      }
    },
    dialog(val) {
      if (!val) this.close();
    },
  },
  // created() {
  //   //this.$store.commit("UNSET_EXAMINER_ACCESS_DATA_SCHEMA");
  //   console.log("schema ", this.getSchema);
  //   this.data = {
  //     exam_code: this.getSchema.exam_code,
  //     year: this.getSchema.year
  //   };
  //   this.$store.dispatch("fetchExaminerAccessData", this.data).then(() => {
  //     this.getSchema.exam_code = this.getSchema.exam_code.toString();
  //     console.log("yes", this.getSchema);
  //     console.log("data exlist", this.$store.getters.getExaminerAccessItems);
  //   });
  // },
  computed: {
    getSchema() {
      console.log("...gtttt");
      return this.$store.getters.getExaminerAccessSchema;
    },
    // getAllExaminerData() {
    //   return this.$store.getters.getExaminerAccessItems;
    // }
  },
  methods: {
    onPageChange(current) {
      this.data.page = current;
      this.callData(this.data);
    },
    callData(data) {
      var self = this;
      this.$store.dispatch("fetchExaminerAccessData", data).then((data) => {
        console.log("....");
        self.examiners = data.data;
        self.getSchema.exam_code = self.getSchema.exam_code.toString();
        self.pagination.current = data.meta.current_page;
        self.pagination.total = data.meta.last_page;
      });
    },
    getpaper(details) {
      var arr = [];
      details.forEach(function(item) {
        arr.push(item.code + " - " + item.title);
        //arr.push(item.code);
        // arr.push("(" + + item.paper_name+ ")");
      });
      //return arr;
      return arr.join();
    },
    getsubjects(details) {
      var arr = [];
      details.forEach(function(item) {
        arr.push(item.code + " - " + item.title);
        //arr.push(item.code);
        // arr.push("(" + + item.paper_name+ ")");
      });
      //return arr;
      return arr.join();
    },
    getpapernested(papers) {
      var arr = [];
      papers.forEach(function(item) {
        //arr.push(item.code);
        arr.push(item.code + " - " + item.title);
      });
      //return arr;
      return arr.join();
    },
    submit() {
      var accessItem = {};
      // accessItem.data = this.getSchema.examinerList;
      // accessItem.searchParam = {
      //   exam_code: this.getSchema.exam_code,
      //   year: this.getSchema.year,
      //   exam_initiate_id: this.getSchema.exam_initiate_id
      // };
      accessItem.data = this.getSchema.examinerList;
      accessItem.exam_code = this.getSchema.exam_code;
      accessItem.year = this.getSchema.year;
      accessItem.exam_initiate_id = this.getSchema.exam_initiate_id;

      console.log(accessItem);
      var self = this;
      this.$store.dispatch("saveExaminerAccessData", accessItem);
      self.searchExaminerGroupList();
      self.close();
    },
    showExamCode(exam_code) {
      this.$store.dispatch("fetchExaminerAccessData", this.data);
      this.visible = true;
      console.log(exam_code);
    },
    setSubmenu(hex) {
      console.log("sp:: ", hex);
      var i;
      console.log("menu enter ", hex.examiners);
      this.statuschange = !this.statuschange;
      hex.access = !hex.access;
      console.log("..", hex.access);
      for (i = 0; i < hex.examiners.length; i++) {
        hex.examiners[i].access = hex.access;
        console.log("..", hex.examiners[i].access);
      }
      this.statuschange = !this.statuschange;
    },
    close() {
      this.$store.commit("UNSET_EXAMINER_ACCESS_DATA_SCHEMA");
      this.$emit("update:examineraccess", false);
      this.data = {};
      this.callStatus = false;
    },
  },
};
</script>
