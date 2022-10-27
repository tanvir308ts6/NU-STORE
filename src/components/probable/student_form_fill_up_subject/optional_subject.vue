<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>Optional Subject</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getStudentFormFillUpSubject.optional_subject"
      select-all
      item-key="paper_code"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <!-- <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>-->
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="[
              'column sortable',
              pagination.descending ? 'desc' : 'asc',
              header.value === pagination.sortBy ? 'active' : ''
            ]"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr
          :active="props.selected"
          @click="props.selected = !props.selected"
          v-if="
            !props.item.prev_grade &&
              props.item.core_paper.paper_type_info.name == 'optional'
          "
        >
          <td>
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.core_paper.paper_name }}</td>
          <td class="text-xs-center">{{ props.item.core_paper.paper_code }}</td>
          <td class="text-xs-center">
            {{ props.item.core_paper.paper_types.paper_type }}
          </td>
          <!-- <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>-->
        </tr>
      </template>
    </v-data-table>
    <!-- <pre>{{selected}}</pre> -->
  </div>
</template>
<script>
export default {
  name: "FormFillUpOptionalSubject",
  computed: {
    getStudentFormFillUpSubject() {
      return this.$store.getters.getStudentFormFillUpSubject;
    }
  },
  data: () => ({
    selected: [],
    pagination: {},
    headers: [
      {
        text: "Paper Name",
        align: "left",
        value: "core_paper.paper_name"
      },
      {
        text: "Paper Code",
        value: "core_paper.paper_code"
      },
      {
        text: "Paper Type",
        value: "core_paper.paper_types.paper_type"
      }
    ]
  }),
  watch: {
    selected: function(val, oldval) {
      this.$parent.$parent.selected.optional_subject = val;
    }
  },
  created() {
    // this.toggleAll();
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else
        this.selected = this.getStudentFormFillUpSubject.optional_subject.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index === "date") {
          if (!isDesc) {
            return compare(a.date, b.date);
          } else {
            return compare(b.date, a.date);
          }
        }
      });
      return items;
    }
  }
};
</script>
