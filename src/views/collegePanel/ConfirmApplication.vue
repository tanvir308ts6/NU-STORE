<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-md>
            <v-toolbar flat dark :height="35">
              <v-toolbar-title>{{ `Confirm Data Entry` }}</v-toolbar-title>
            </v-toolbar>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-form v-model="valid" v-on:submit.prevent="search">
            <v-container fluid grid-list-md>
              <v-card color="white">
                <v-layout row>
                  <v-text-field
                    class="mt-0"
                    flat
                    hide-details
                    label="REG No."
                    prepend-inner-icon="search"
                    single-line
                    solo
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn @click="search" color="info" dark>Search</v-btn>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: false
    };
  },
  watch: {},
  methods: {
    search() {
      console.log("search calling >>>>>>>");
    }
  }
};
</script>
