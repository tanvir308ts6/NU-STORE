<template>
  <div>
    <student-list></student-list>
  </div>
</template>

<script>
import studentList from "@/components/probable/studentList.vue";

export default {
  components: {
    "student-list": studentList
  }
};
</script>
