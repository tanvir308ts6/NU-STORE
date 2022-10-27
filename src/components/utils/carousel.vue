<template>
  <v-carousel hide-delimiters height="300">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src: require("@/assets/slider/1.jpg")
        },
        {
          src: require("@/assets/slider/2.jpg")
        },
        {
          src: require("@/assets/slider/3.jpg")
        },
        {
          src: require("@/assets/slider/4.jpg")
        },
        {
          src: require("@/assets/slider/5.jpg")
        }
      ]
    };
  }
};
</script>
