<template>
  <v-card>
    <!-- {{currentItem}} -->
    <v-layout row>
      <v-flex xs12 sm12 offset-sm0>
        <v-card>
          <v-card color="primary" flat>
            <v-card-title>
              <span class="headline white--text">In-course Marks</span>
              <v-spacer></v-spacer>
              <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
                <v-icon medium>close</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <v-card-text>
            <v-card flat class="pr-3 scroll">
              <v-list two-line>
                <v-list-tile v-for="item in currentItem" :key="item.title">
                  <v-list-tile-action>
                    <v-icon color="indigo">arrow_forward</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Course Name:
                      <strong>{{item.paper_name}}</strong>
                      <strong>= {{item.incourse_marks}}</strong>
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <!-- <v-divider></v-divider> -->
                </v-list-tile>
                <!--  <v-list-tile-content>
                    <v-list-tile-title v-text="item.paper_name">
                Paper NAME:-->
                <!-- <strong>{{currentItem.name}}</strong> 
                    </v-list-tile-title>
                    <strong>= {{item.incourse_marks}}</strong>
                </v-list-tile-content>-->
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: ["currentItem", "dialogStatus"],
  data: () => ({
    dialog: false
  }),
  watch: {
    dialogStatus(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.close();
    }
  },
  methods: {
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>


