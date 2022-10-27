<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialogStatus"
      persistent
      transition="dialog-bottom-transition"
      :max-width="500"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Send Remarks</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card>
            <v-layout row wrap align-center>
              <v-flex xs12 sm12 offset-sm0>
                <v-card class="pl-3">
                  <v-card-title class="headline">Other Details</v-card-title>
                  <v-layout row wrap align-center>
                    <v-flex xs12 md4 lg6>
                      <v-textarea
                        
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12 md4 lg6>
                      <v-select
                       
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-spacer class="pb-4"></v-spacer>

                  <v-card-actions>
                    <div class="justify-center layout px-0 mt-2">
                      <v-btn color="primary" dark>
                        >Submit
                      </v-btn>
                    </div>
                  </v-card-actions>
                  <v-spacer class="pb-4"></v-spacer>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
          <!-- <pre>{{profile}}</pre> -->
          <!-- <pre>{{dialogData}}</pre> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

export default {
  props: ["dialogStatus", "dialogData"],
  data() {
    // return {
    //   dialog: true,
    //   searchParam: {},
    //   formData: {},
    //   college: {
    //     web_url: "",
    //     email: "",
    //     mobile: "",
    //     phone: "",
    //     fax: ""
    //   }
    // };
  },
  methods: {
    // save() {
    //   let self = this;
    //   this.$root.$confirm("Are you sure?").then(confirm => {
    //     if (confirm) {
    //       self.$store
    //         .dispatch("updateCollegeProfile", self.profile)
    //         .then(success => {
    //           this.close();
    //         });
    //     }
    //   });
     
    // },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
