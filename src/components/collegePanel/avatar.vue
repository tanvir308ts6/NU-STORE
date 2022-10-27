<template>
  <v-container grid-list-md>
    <v-layout row wrap v-if="college">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4 my-2">
          <h3>
            <span class="display-1">{{ college.college_name }}</span>
          </h3>
          <table>
            <tr>
              <td align="left">EIIN Code</td>
              <td>:</td>
              <td>{{ college.college_eiin }}</td>
            </tr>
            <tr>
              <td align="left">College Code</td>
              <td>:</td>
              <td>{{ college.college_code }}</td>
            </tr>
            <tr>
              <td align="left">Address</td>
              <td>:</td>
              <td>{{ college.address }}</td>
            </tr>
          </table>
        </div>
      </v-flex>
      <v-flex xs3 sm3 md3 layout>
        <v-avatar
          lass="mr-4"
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img
            :src="
              college.photo_url
                ? college.photo_url
                : 'https://via.placeholder.com/1000'
            "
            alt="avatar"
          />
        </v-avatar>
        <!-- <v-switch v-model="tile" label="Tile"></v-switch> -->
      </v-flex>
    </v-layout>
    <!-- <pre>{{college}}</pre> -->
  </v-container>
</template>
<script>
export default {
  data: () => ({
    slider: 156,
    tile: true
  }),

  computed: {
    college() {
      return this.$store.getters.getAuthCollege;
    },
    avatarSize() {
      return `${this.slider}px`;
    }
  }
};
</script>
