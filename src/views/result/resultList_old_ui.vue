<template>
  <div>
    <v-container fluid grid-list-md v-if="true">
      {{ getResultData[0] }}
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
          <v-card class="white--text">
            <v-card-title primary-title>
              <v-layout
                row
                wrap
                class="mt-auto"
                align-center
                justify-center
                fill-height
              >
                <div class="text-xs-center">
                  <v-expansion-panel expand inset>
                    <v-expansion-panel-content
                      v-for="result in getResultData"
                      :key="result.id"
                    >
                      <template v-slot:header>
                        <v-layout row wrap>
                          <v-flex xs3>
                            <v-card flat class="text-xs-center">
                              <v-avatar color="primary" size="150">
                                <span
                                  class="white--text display-3 font-weight-bold"
                                  >{{ result.letter_grade }}</span
                                >
                              </v-avatar>
                            </v-card>
                          </v-flex>
                          <v-flex xs8 class="ml-2 pl-2">
                            <div class="title">{{ result.student_name }}</div>
                            <div>{{ result.reg_no }}</div>
                            <div class="text-xs-left">{{ result.session }}</div>
                            <div class="ml-4 pt-2">
                              <!-- <span class="subheading">Degree Group :</span> -->
                              <div>
                                Degree Group : ({{ result.degree_group_code }})
                                _ {{ result.degree_group_name }} _
                                {{ result.degree_name }}
                              </div>
                              <!-- <span class="subheading">College Group :</span> -->
                              <div>
                                College Group : ({{ result.college_code }}) _
                                {{ result.college_name }}
                              </div>
                              <!-- <span class="subheading">Exam Group :</span> -->
                              <div>
                                Exam Group : ({{ result.exam_code }}) _
                                {{ result.exam_name }}
                              </div>
                              <div>CGPA : ({{ result.cgpa }})</div>
                              <!-- <span class="subheading">Subject Group :</span> -->
                              <div v-if="result.subject_code">
                                Subject Group : ({{ result.subject_code }}) _
                                {{ result.subject_name }}
                              </div>
                            </div>
                          </v-flex>
                        </v-layout>
                      </template>
                      <v-divider></v-divider>
                      <v-card>
                        <div>
                          <!-- <div class="text-xs-left">{{ result.degree_group_name }}</div> -->
                          <v-divider></v-divider>

                          <v-layout
                            row
                            wrap
                            v-for="resultDetails in result.details"
                            :key="resultDetails.id"
                            align-content-center
                          >
                            <v-flex xs2></v-flex>
                            <!-- <v-flex xs3>
                              <v-card flat class="text-xs-center">
                                <v-avatar size="180">
                                  <span
                                    class="display-2 font-weight-bold"
                                  >{{resultDetails.letter_grade}}</span>
                                </v-avatar>
                              </v-card>
                            </v-flex>-->
                            <v-flex xs8>
                              <v-card size="156" class="pa-3">
                                <v-layout column wrap class="ml-2">
                                  <!-- ............. -->
                                  <v-layout row wrap>
                                    <!-- <v-flex xs2>
                                      <span class="subheading">Paper :</span>
                                    </v-flex>-->
                                    <v-flex xs12>
                                      <span class="subheading"
                                        >Paper : (
                                        {{ resultDetails.paper_code }} )
                                        {{ resultDetails.paper_name }}</span
                                      >
                                    </v-flex>
                                  </v-layout>
                                  <!-- ................... -->
                                  <!-- ............. -->
                                  <v-layout row wrap>
                                    <!-- <v-flex xs2>
                                      <span class="subheading">Result :</span>
                                    </v-flex>-->
                                    <v-flex xs12>
                                      <span class="subheading"
                                        >Result : (
                                        {{ resultDetails.total_mark }} )
                                        {{ resultDetails.letter_grade }}</span
                                      >
                                    </v-flex>
                                  </v-layout>
                                  <v-divider class="mt-1"></v-divider>
                                  <v-layout row wrap>
                                    <!-- <v-flex xs2>
                                      <span class="subheading">Center :</span>
                                    </v-flex>-->
                                    <v-flex xs12>
                                      <span class
                                        >Center : (
                                        {{ resultDetails.center_code }} )
                                        {{ resultDetails.center_name }}</span
                                      >
                                    </v-flex>
                                  </v-layout>
                                  <!-- ................... -->
                                  <!-- <span class="white--text subheading">{{resultDetails.center_name}}</span> -->
                                </v-layout>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </div>
              </v-layout>
            </v-card-title>
          </v-card>
          <div class="text-xs-center">
            <v-spacer class="mb-4"></v-spacer>
            <v-btn
              ripple
              large
              round
              color="primary"
              @click="submitRole"
              v-show="visible"
              >submit</v-btn
            >
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- {{getResultData}} -->
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    visible: false
  }),
  created() {
    this.$store.dispatch("fetchResultData");
  },
  computed: {
    getResultData() {
      return this.$store.getters.getResultData;
    }
  },
  methods: {
    submitRole() {
      var roleItem = this.getSchema;
      this.$store.dispatch("saveRoleDetailsData", roleItem);
    },
    showRoleName(role) {
      this.$store.dispatch("fetchRoleDetailsData", role).then(() => {
        this.visible = true;
      });
    },
    setSubmenu(menu) {
      var i;
      console.log("menu enter ", menu.menu);
      menu.menu = menu.menu ? false : true;
      for (i = 0; i < menu.children.length; i++) {
        menu.children[i].submenu = menu.menu;
        menu.children[i].read = menu.menu;
        menu.children[i].write = menu.menu;
      }
      console.log("menu json", menu.menu);
    }
  }
};
</script>

<style lang="scss" scoped></style>
