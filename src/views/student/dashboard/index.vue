<template>
  <v-container fluid>
    <span class>
      <div class="display-1 mb-4">
        <small>Academic Calendar</small>
        <calendar></calendar>
      </div>
    </span>
  </v-container>
</template>
<script>
import calendar from "@/components/student/dashboard/calendar.vue";
export default {
  components: {
    calendar
  },
  computed: {
    authStudent() {
      return this.$store.getters.getAuthStudent;
    }
  }
};
</script>
<style lang="scss">
.student-profile {
  tr {
    th {
      text-align: left;
    }
  }
}
</style>
