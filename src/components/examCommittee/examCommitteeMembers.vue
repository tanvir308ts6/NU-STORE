<template>
  <v-card>
    <!-- {{currentItem}} -->
    <!-- <v-layout row>
      <v-flex xs12 sm12 offset-sm0>
        <v-card class="pl-3">
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">account_balance</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{currentItem.id}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">fiber_manual_record</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>College code:{{currentItem.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{currentItem.designation}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{currentItem.code}}</v-list-tile-title>
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
                <v-list-tile-title>{{currentItem.status}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">swap_horiz</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{currentItem.exam_committee_id}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>-->

    <v-data-table
      :headers="headers"
      :items="getExamCommitteeMembers"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <!-- <td>{{ props.item.name }}</td> -->
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.designation }}</td>
        <td class="text-xs-center">{{ props.item.nid_no }}</td>
        <td class="text-xs-center">{{ props.item.code }}</td>
        <td class="text-xs-center">{{ props.item.mobile }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">{{ props.item.exam_committee_id }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["currentItem"],
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        { text: "name", value: "name" },
        { text: "degignation", value: "designation" },
        { text: "NID No", value: "nid_no" },
        { text: "code", value: "code" },
        { text: "mobile", value: "mobile" },
        { text: "status", value: "status" },
        { text: "exam_committee_id", value: "exam_committee_id" }
      ]
    };
  },
  computed: {
    getExamCommitteeMembers() {
      // console.log("--->", this.currentItem);
      return this.currentItem;
    }
  }
};
</script>
