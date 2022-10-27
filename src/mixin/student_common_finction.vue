<script>
export default {
  data() {
    return {};
  },
  methods: {
    goTo(val) {
      this.$router.push({ path: val }).catch(err => {});
    }
  },
  computed: {}
};
</script>
