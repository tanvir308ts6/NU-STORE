<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>improvement Subject</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>{{
          `Any ${getAdminFormFillUpSubject.form_fill_up.improvement_papers} of ${getAdminFormFillUpSubject.improvement_subject.length}`
        }}</v-btn>
        <v-btn flat>
          <span v-if="$parent.$parent.$parent.confirm_by_student.length"
            >Selected Paper Code -[</span
          >
          <slot
            v-for="(selected, index) in $parent.$parent.$parent
              .confirm_by_student"
          >
            <span :key="index" v-if="index">,{{ selected.paper_code }}</span>
            <span :key="index" v-else>{{ selected.paper_code }}</span>
          </slot>
          <span v-if="$parent.$parent.$parent.confirm_by_student.length"
            >]</span
          >
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getAdminFormFillUpSubject.improvement_subject"
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
        <tr :active="props.selected" @click="props.selected = !props.selected">
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
          <td class="text-xs-center">{{ props.item.prev_grade }}</td>
          <!-- <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>-->
        </tr>
      </template>
    </v-data-table>
    <!-- <pre>{{getAdminFormFillUpSubject.improvement_subject.length}}</pre> -->
    <!-- <pre>{{getAdminFormFillUpSubject.improvement_subject}}</pre> -->
  </div>
</template>
<script>
export default {
  computed: {
    getAdminFormFillUpSubject() {
      return this.$store.getters.getAdminFormFillUpSubject;
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
      },
      {
        text: "prev. Grade",
        value: "prev_grade"
      }
    ]
  }),
  watch: {
    selected: function(val, oldval) {
      this.$parent.$parent.$parent.selected.improvement_subject = val;
      if (
        val.length >=
        this.getAdminFormFillUpSubject.form_fill_up.improvement_papers
      ) {
        this.getAdminFormFillUpSubject.improvement_subject = val;
      } else {
        const prev_subject = JSON.parse(
          localStorage.getItem("admin_form_fill_up_subject")
        );
        this.getAdminFormFillUpSubject.improvement_subject =
          prev_subject.improvement_subject;
      }
    }
  },
  created() {
    // this.toggleAll();
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else
        this.selected = this.getAdminFormFillUpSubject.improvement_subject.slice();
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
