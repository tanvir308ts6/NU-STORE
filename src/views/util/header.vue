<template>
  <div>
    <div class="full-width-header header-style2 modify1 header-home6">
      <!--Header Start-->
      <header class="rs-header">
        <!-- Menu Start -->
        <div class="menu-area menu-sticky">
          <div class="container">
            <div class="row y-middle">
              <div :class="[fromHome == true ? 'col-xl-5 col-lg-5' : 'col-lg-5']">
                <div class="logo-cat-wrap">
                  <div :class="['logo-part', $vuetify.breakpoint.mdAndDown ? 'row-wrap' : 'row']">
                    <a href="/" class="col-3">
                      <img :src="require('@/assets/images/nu_logo_r.53c3c0be.png')" />
                    </a>
                    <span class="col-8 pt-4">NU Examination Management System</span>
                  </div>
                </div>
              </div>

              <div :class="['text-center', fromHome == true ? 'col-xl-7 col-lg-6' : 'col-lg-7 ']">
                <div class="rs-menu-area">
                  <div class="main-menu pr-90 md-pr-15">
                    <div class="mobile-menu">
                      <a
                        :class="[
                          'rs-menu-toggle',
                          openMenuSt == true || $vuetify.breakpoint.mdAndUp
                            ? 'rs-menu-toggle-open'
                            : '',
                        ]"
                        @click="openMenu()"
                      >
                        <i class="fa fa-bars"></i>
                      </a>
                    </div>
                    <nav
                      :class="[openMenuSt == true || $vuetify.breakpoint.mdAndUp ? 'rs-menu' : '']"
                    >
                      <ul class="nav-menu">
                        <li class=" ">
                          <a @click="goHome()">Home</a>
                        </li>
                        <li class="">
                          <a @click="goAbout()">About</a>
                        </li>
                        <li class="">
                          <a @click="goManual()">User Manual</a>
                        </li>
                        <!-- <li class="">
                          <a @click="goContact()">Contact</a>
                        </li> -->
                      </ul>
                      <!-- //.nav-menu -->
                    </nav>
                  </div>
                  <!-- //.main-menu -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Menu End -->
      </header>
      <!--Header End-->

      <!-- v-progress-circular -->
      <v-layout row justify-center>
        <v-dialog v-model="progress_status" persistent fullscreen content-class="loading-dialog">
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-progress-circular
                indeterminate
                :size="100"
                :width="10"
                :color="progress_color"
              ></v-progress-circular>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>
    </div>
    <!--Full width header End-->
  </div>
</template>
<script>
export default {
  props: ["fromHome"],
  data() {
    return {
      openMenuSt: false,
      script0: document.createElement("script"),
      script1: document.createElement("script"),
      script2: document.createElement("script"),
      script3: document.createElement("script"),
    };
  },
  // beforeDestroy() { document.head.removeChild(this.script0);
  //     document.head.removeChild(this.script1);
  //     document.head.removeChild(this.script2);
  //     document.head.removeChild(this.script3);},
  mounted() {
    console.log(this.fromHome);
    this.checkFavoriteStore();
  },

  computed: {
    //loading
    progress_status() {
      return this.$store.getters.getLoading;
    },
    progress_color() {
      return this.$store.getters.getLoadingColor;
    },
  },
  methods: {
    openMenu() {
      console.log("hererrrrrrrrrrrr");
      this.openMenuSt = !this.openMenuSt;
    },
    checkFavoriteStore() {
      // const script0 = document.createElement("script");
      this.script0.setAttribute(":src", require("@/assets/js/main.js"));
      this.script0.setAttribute("type", "text/babel");
      this.script0.async = true;
      document.head.appendChild(this.script0);
      // const script1 = document.createElement("script");
      this.script1.setAttribute("src", require("@/assets/js/jquery.min.js"));
      this.script1.setAttribute("type", "text/babel");
      this.script1.async = true;
      document.head.appendChild(this.script1);
      // const script2 = document.createElement("script");
      this.script2.setAttribute(":src", require("@/assets/js/bootstrap.min.js"));
      this.script2.setAttribute("type", "text/babel");
      this.script2.async = true;
      document.head.appendChild(this.script2);
      // const script3 = document.createElement("script");
      this.script3.setAttribute(":src", require("@/assets/js/rsmenu-main.js"));
      this.script3.setAttribute("type", "text/babel");
      this.script3.async = true;
      document.head.appendChild(this.script3);
    },
    goLogin() {
      this.$router.push("/login");
    },
    goAbout() {
      this.$router.push("/about");
      this.$store.commit("SET_LOADING", { color: "success" });
      this.$router.go("/about");
    },
    goHome() {
      this.$router.push("/");
      this.$store.commit("SET_LOADING", { color: "success" });
      this.$router.go("/");
    },
    goManual() {
      this.$router.push("/user-manual");
      this.$store.commit("SET_LOADING", { color: "success" });
      this.$router.go("/user-manual");
    },
    //     goContact() {
    //       this.$router.push("/contact");
    //     },
    // press() {
    //   this.$refs.confirm
    //     .open("Delete", "Are you sure?", { color: "red" })
    //     .then(confirm => {
    //       console.log("confirm pressed");
    //     });
    // }
  },
};
</script>
<style scoped src="@/assets/css/bootstrap.min.css"></style>
<style scoped src="@/assets/css/font-awesome.min.css"></style>
<style scoped src="@/assets/css/animate.css"></style>
<style scoped src="@/assets/css/rsmenu-main.css"></style>
<style scoped src="@/assets/css/style.css"></style>
<style scoped src="@/assets/css/responsive.css"></style>
