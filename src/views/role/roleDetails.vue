<template>
  <v-container>
    <!-- {{getSchema}} -->
    <span class>
      <div class="display-1 mb-4">
        <v-icon size="40">details</v-icon>
        <span class="ml-2">Role Configure</span>
        <span class="subheading ml-2">( Role Details )</span>
      </div>
    </span>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex xs12 sm12 md12 lg4>
            <v-autocomplete
              outline
              class="ma-3"
              v-model="getSchema.role"
              item-text="role_name"
              item-value="id"
              :items="getRoleNumbers"
              menu-props="auto"
              label="  Select Role "
              hide-details
              prepend-inner-icon="done_all"
              single-line
              v-on:change="showRoleName"
            >
              <template v-slot:selection="data">
                <v-chip
                  color="white"
                  close
                  @input="getSchema.role = ''"
                  :selected="data.selected"
                  class="chip--select-multi"
                >
                  <span class="title">{{ data.item.role_name }}</span>
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="data.item.role_name"
                    ></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-spacer class="mb-5"></v-spacer>
    <v-card flat v-show="visible">
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
                    <v-expansion-panel expand popout>
                      <v-expansion-panel-content
                        v-for="menu in getSchema.menuData"
                        :key="menu.menu_id"
                      >
                        <template v-slot:header>
                          <div class="title">{{ menu.name }}</div>
                        </template>
                        <v-divider></v-divider>
                        <v-card>
                          <div>
                            <div class="text-xs-left">
                              <v-btn
                                flat
                                color="primary"
                                @click.native="setSubmenu(menu)"
                                >select/unselect all</v-btn
                              >
                              <!-- <v-checkbox
                                @click.native="setSubmenu(menu)"
                                color="indigo "
                                small
                                right
                                label="Select All"
                                v-model="menu.menu"
                              ></v-checkbox>-->
                            </div>

                            <v-layout
                              row
                              wrap
                              v-for="submenu in menu.children"
                              :key="submenu.id"
                              align-content-center
                              style="padding-left:30px"
                            >
                              <v-flex xs6>
                                <v-checkbox
                                  v-model="submenu.submenu"
                                  :label="submenu.name"
                                  type="checkbox"
                                  color="indigo darken-3"
                                ></v-checkbox>
                              </v-flex>
                              <v-flex xs3>
                                <v-checkbox
                                  v-model="submenu.read"
                                  label="Read"
                                  type="checkbox"
                                  color="indigo darken-3"
                                ></v-checkbox>
                              </v-flex>
                              <v-flex xs3>
                                <v-checkbox
                                  v-model="submenu.write"
                                  label="Write"
                                  type="checkbox"
                                  color="indigo darken-3"
                                ></v-checkbox>
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
                absolute
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
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "dashboard",
  components: {},
  data: () => ({
    visible: false,
    searchParram: {
      page: 1,
      limit: -1
    }
  }),
  created() {
    this.$store.commit("UNSET_ROLE_DETAILS_DATA_SCHEMA");
    this.$store.dispatch("callRoleData", this.searchParram);
  },
  computed: {
    getRoleNumbers() {
      return this.$store.getters.getRoleList;
    },
    getSchema() {
      return this.$store.getters.getRoleDetailsSchema;
    }
  },
  methods: {
    submitRole() {
      var roleItem = this.getSchema;
      // console.log("roleItem:", roleItem);
      roleItem.menuData.forEach(obj => {
        obj.children.forEach(sub => {
          // console.log("sub:", sub.submenu);
          if (sub.submenu == true) {
            sub.submenu = 1;
          }
          if (sub.submenu == false) {
            sub.submenu = 0;
          }
        });
      });
      // console.log("roleItem:", roleItem);
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
      console.log("menu:", menu);
    }
  }
};
</script>
