<template>
  <div>
    <!--Full width header Start-->
    <Header :fromHome="false"></Header>
    <!--Full width header End-->

    <!-- Main content Start -->
    <div class="main-content">
      <!-- Breadcrumbs Start -->
      <div class="rs-breadcrumbs breadcrumbs-overlay">
        <div class="breadcrumbs-img">
          <img :src="require('@/assets/images/breadcrumbs/1.jpg')" alt="Breadcrumbs Image" />
        </div>
        <div class="breadcrumbs-text white-color">
          <h1 class="page-title">User Manual</h1>
          <ul>
            <li>
              <a class="active" href="index.html">Home</a>
            </li>
            <li>User Manual</li>
          </ul>
        </div>
      </div>
      <!-- Breadcrumbs End -->

      <!-- UserManuals Section Start -->
      <div id="rs-about" class="rs-about style1 pt-50 pb-50 ">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12 pr-70 md-pr-15">
              <h3 class="bg-custum  text-center p-3">NU EMS User Manuals</h3>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Module Name</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Center User</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Center User.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Exam Controller</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Exam Controller.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Examiner App</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Examiner App.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Examiner Web</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Examiner Web.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Head Examiner App</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Head Examiner App.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>Head Examiner Web</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Head Examiner Web.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>ICT Director</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'ICT Director.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>Invigilator App</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Invigilator App.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>Invigilator Web</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Invigilator.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">11</th>
                    <td>NU Admin</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'NU Admin.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">14</th>
                    <td>NU User</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'NU User.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">15</th>
                    <td>Programmer</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Programmer.pdf'" target="_blank">Download</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">16</th>
                    <td>Re-scrutinizer</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Re-scrutinizer pdf.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">17</th>
                    <td>Regional Center User</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'Regional Center User.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">18</th>
                    <td>System Analyst</td>
                    <td>
                      <a :href="getBaseUrl + '/' + 'System Analyst.pdf'" target="_blank"
                        >Download</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="col-lg-12">
                              <div class="center">
                                   <div class="pagination">
                                        <a href="#">&laquo;</a>
                                        <a href="#">1</a>
                                        <a href="#" class="active">2</a>
                                        <a href="#">3</a>
                                        <a href="#">4</a>
                                        <a href="#">5</a>
                                        <a href="#">6</a>
                                        <a href="#">&raquo;</a>
                                   </div>
                              </div>
                              </div> -->
          </div>
        </div>
      </div>
      <!-- UserManuals Section End -->
    </div>
    <!-- Main content End -->
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/views/util/footer.vue";
import Header from "@/views/util/header.vue";
export default {
  components: {
    // carousel
    Footer,
    Header,
  },
  computed: {
    getBaseUrl() {
      return this.$store.getters.getBaseUrl + "/user-manual";
    },
  },
  methods: {
  
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
