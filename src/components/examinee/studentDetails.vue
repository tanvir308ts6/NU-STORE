<template>
  <v-card>
    <!-- {{currentItem}} -->
    <v-layout row>
      <v-flex xs12 sm12 offset-sm0>
        <v-card class="pl-3">
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">format_list_numbered</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title
                  >REG NO: {{ currentItem.reg_no }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">fiber_manual_record</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >ADMISSION ROLL:
                  {{ currentItem.exam_roll }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  NAME:
                  <strong>{{ currentItem.examinee_name }}</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  FATHER NAME:
                  <strong>{{ currentItem.father_name }}</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">face</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  MOTHER NAME:
                  <strong>{{ currentItem.mother_name }}</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">account_balance</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >SESSION YEAR:
                  {{ currentItem.session_year }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>

            <!-- ...  -->
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">account_balance</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >DEGREE CODE: {{ currentItem.degree_code }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">account_balance</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >COLLEGE CODE:
                  {{ currentItem.college_code }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">account_balance</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >SUBJECT CODE:
                  {{ currentItem.subject_code }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">list_alt</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >MERIT POSITION:
                  {{ currentItem.merit_position }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >MAIL: {{ currentItem.email }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >PHONE: {{ currentItem.mobile }}</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>

            <!-- <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">swap_horiz</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{currentItem.active}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>-->

            <!-- <v-divider inset></v-divider> -->
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: ["currentItem"]
};
</script>
