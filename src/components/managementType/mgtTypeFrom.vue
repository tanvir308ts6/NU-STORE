<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card color="primary" flat>
        <v-card-title>
          <span class="headline white--text">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn
            fab
            class="ma-0 pa-0"
            small
            color="white black--text "
            @click="close"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>

      <v-card-text>
        <v-card flat class="pr-3 scroll">
          <v-form>
            <v-text-field
              name="menu_name"
              label="Management Type"
              v-model="getSchema.menu_name"
              v-validate="'required'"
              :error-messages="errors.collect('management')"
              data-vv-name="management"
              prepend-icon="edit"
              required
            ></v-text-field>

            <v-select
              v-model="getSchema.menu_url"
              :items="status"
              item-value="value"
              item-text="status"
              auto-grow
              label="Status"
              name="status"
              :error-messages="errors.collect('management')"
              data-vv-name="management"
              rows="1"
              prepend-icon="edit"
            ></v-select>
          </v-form>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn
            color="primary  white--text"
            @click.stop.prevent="validationForm()"
            >{{ buttonTitle }}
          </v-btn>
          <v-btn color="primary  white--text" @click="clear">Reset</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "mgtTypeFrom"
};
</script>

<style scoped></style>
