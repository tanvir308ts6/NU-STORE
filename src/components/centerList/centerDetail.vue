<template>
  <v-card>
  <v-layout row>
    <v-flex xs12 sm12 offset-sm0>
      <v-card class="pl-3">
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">account_balance</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.center_name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">fiber_manual_record</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>College code:{{currentItem.college_code}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.address}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.phone}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">perm_phone_msg</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.mobile}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.email}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">swap_horiz</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.active}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-card>
</template>



</template>
<script>
export default {
  props: ["currentItem"]
};
</script>


