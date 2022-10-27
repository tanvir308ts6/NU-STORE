<template>
  <div class="mt-4">
    <v-data-table
      :headers="headers"
      :items="getPVExamStudentList"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs">{{ props.item.name }}</td>
        <td>
          <v-text-field
            type="number"
            hide-details
            v-model="marks"
          ></v-text-field>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: "",
      marks: "",
      headers: [
        {
          text: "ID",
          align: "left",
          value: "id"
        },
        { text: "Exam Name", value: "exam_name" },
        { text: "Exam Date", value: "marks" }
      ]
    };
  },
  created() {
    this.$store.dispatch("callPracticalVivaExamData");
    this.$store.dispatch("fetchStudentData");
  },
  computed: {
    getPVExamStudentList() {
      return this.$store.getters.getStudentItems;
    }
  },
  methods: {
    newItem() {
      this.formDialogStatus = true;
    }
  }
};
</script>
