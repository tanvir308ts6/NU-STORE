<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="atModal"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title
            >Certificate Verification Student Attachment</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="close">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="attachments"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.index + 1 }}</td>
                  <td>
                    {{ props.item.attachment_name }}
                  </td>
                  <td><img
                      :src="getBaseUrl + '/' + props.item.attachment_path"
                      alt="Image"
                      style="height: 100px; width: 100px;"
                    />
                    
                  </td>
                  <td>
                    <v-btn
                      small
                      target="_blank"
                      color="success"
                      :href="getBaseUrl + '/' + props.item.attachment_path"
                      >View File</v-btn
                    >
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
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
  props: ["atModal", "atData"],
  data() {
    return {
      attachments: [],
      headers: [
        {
          text: "SL",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Attachemnt Name", value: "attachment.attachment_name" },
        { text: "File", value: "attachment.attachment_name" },
        { text: "View File", value: "attachment.attachment_name" }
      ]
    };
  },
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl;
    }
  },
  mounted() {
    this.attachments = this.atData;
  },
  methods: {
    close() {
      this.$emit("update:atModal", false);
      this.$emit("update:dialogStatus", true);
    }
  }
};
</script>
