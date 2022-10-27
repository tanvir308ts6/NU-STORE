<template>
  <v-bottom-sheet v-model="calDialog" inset>
    <v-card>
      <!-- <span class>
        <div class="title ma-4 pt-3">
          <v-icon large color="primary">calendar_today</v-icon>
          <span class="ml-2">Calendar</span>
        </div>
      </span>-->
      <v-card class="px-4 pb-5 pt-2">
        <v-layout wrap>
          <v-flex xs12 class="mb-3">
            <v-sheet height="500">
              <v-calendar
                ref="calendar"
                v-model="start"
                :type="type"
                :end="end"
                color="primary"
              ></v-calendar>
            </v-sheet>
          </v-flex>

          <v-flex sm4 xs12 class="text-sm-left text-xs-center">
            <v-btn @click="$refs.calendar.prev()">
              <v-icon dark left>keyboard_arrow_left</v-icon>Prev
            </v-btn>
          </v-flex>
          <v-flex sm4 xs12 class="text-xs-center">
            <v-select
              v-model="type"
              :items="typeOptions"
              label="Type"
            ></v-select>
          </v-flex>
          <v-flex sm4 xs12 class="text-sm-right text-xs-center">
            <v-btn @click="$refs.calendar.next()">
              Next
              <v-icon right dark>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>
  </v-bottom-sheet>
</template>
<script>
export default {
  props: ["calStatus"],
  data: () => ({
    calDialog: false,
    sheet: true,
    type: "month",
    start: "2019-01-01",
    end: "2019-01-06",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "4 Day", value: "4day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" }
      // { text: "Custom Daily", value: "custom-daily" },
      // { text: "Custom Weekly", value: "custom-weekly" }
    ]
  }),
  watch: {
    calStatus(val) {
      console.log("calStatus", this.calStatus);
      this.calDialog = val;
    },
    calDialog(val) {
      if (!val) this.close();
    }
  },
  methods: {
    close() {
      this.$emit("update:calStatus", false);
    }
  }
};
</script>
