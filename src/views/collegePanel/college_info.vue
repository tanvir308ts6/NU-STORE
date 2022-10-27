<template>
  <div id="ColleheInfo">
    <v-layout row wrap v-if="college">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4">
          <span class="headline">
            <span>{{ college.college_name }}</span
            >,
            <span v-if="college.districts.district_name">{{
              college.districts.district_name
            }}</span>
          </span>
          <br />
          <h2>
            College Code :
            {{ college.college_code }}
          </h2>
        </div>
      </v-flex>
    </v-layout>

    <!-- <pre>{{college}}</pre> -->
  </div>
</template>
<script>
export default {
  computed: {
    college() {
      return this.$store.getters.getAuthCollege;
    }
  },
  mounted() {}
};
</script>
