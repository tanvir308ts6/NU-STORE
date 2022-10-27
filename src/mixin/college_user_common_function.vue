<script>
export default {
  data() {
    return {};
  },
  methods: {
    goTo(val) {
      this.$router.push({ path: val }).catch(err => {});
    },
    logout(val = "/cu-login") {
      localStorage.clear();
      this.$router.push({ path: val }).catch(err => {});
    },
    convertFloat(val) {
      let value = Number(val);
      return value.toFixed(2);
    }
  },
  computed: {}
};
</script>
