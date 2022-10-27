<template>
  <div>
    <Header :fromHome="true"></Header>

    <!--Full width header End-->

    <!-- Main content Start -->
    <div class="main-content">
      <!-- Banner Section Start -->
      <div id="rs-banner" class="rs-banner style6">
        <div class="container">
          <div class="banner-content text-center">
            <h1 class="banner-title white-color"> NU Examination Management System </h1>
          </div>
          <!-- <div class="shape-img left">
            <img
              class="animate slideInLeft wow"
              data-wow-duration="1.5s"
              :src="require('@/assets/images/bg/home6/icon/1.png')"
              alt="images"
            />
          </div>
          <div class="shape-img center">
            <div class="inner">
              <img
                class="animate slideInUp wow"
                data-wow-duration="1.5s"
                :src="require('@/assets/images/bg/home6/icon/2.png')"
                alt="images"
              />
              <div class="spiner one">
                <img
                  class="spine-r"
                  :src="require('@/assets/images/banner/home6/spine-sm.png')"
                  alt="images"
                />
                <img
                  class="spine"
                  :src="require('@/assets/images/banner/home6/spine.png')"
                  alt="images"
                />
              </div>
              <div class="spiner two">
                <img
                  class="spine-r"
                  :src="require('@/assets/images/banner/home6/spine-sm.png')"
                  alt="images"
                />
                <img
                  class="spine"
                  :src="require('@/assets/images/banner/home6/spine.png')"
                  alt="images"
                />
              </div>
              <div class="spiner three">
                <img
                  class="spine-r"
                  :src="require('@/assets/images/banner/home6/spine-sm.png')"
                  alt="images"
                />
                <img
                  class="spine"
                  :src="require('@/assets/images/banner/home6/spine.png')"
                  alt="images"
                />
              </div>
            </div>
          </div>
          <div class="shape-img right">
            <img
              class="animate slideInRight wow"
              data-wow-duration="1.5s"
              :src="require('@/assets/images/bg/home6/icon/3.png')"
              alt="images"
            />
          </div> -->
        </div>
      </div>
      <!-- Banner Section End -->

      <div id="rs-about" class="rs-about style6 pt-10 pb-80 bg4">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-3">
                  <div
                    class="nav flex-column nav-pills"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      class="nav-link active navigation__list"
                      href="/login"
                      aria-selected="true"
                      >NU Admin Login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/login"
                      aria-selected="false"
                      >NU User login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/student-login"
                      aria-selected="false"
                      >Student login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/c-login"
                      aria-selected="false"
                      >College login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/cu-login"
                      aria-selected="false"
                      >College User login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/login"
                      aria-selected="false"
                      >Examiner/Head-Examiner Web login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/login"
                      aria-selected="false"
                      >Invigilator Web login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/login"
                      aria-selected="false"
                      >Center/Regional-center login</a
                    >
                    <a
                      class="nav-link navigation__list"
                      href="/org-login"
                      aria-selected="false"
                      >Organization login</a
                    >
                  </div>
                </div>
                <div class="col-lg-9">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <div class="information">
                        <p class="">
                          Development and implementation of Examination
                          Management System (EMS) for National University
                        </p>
                        <h2>Introduction:</h2>

                        <p>
                          Established in 1992 by an Act of Parliament of
                          Bangladesh as an affiliating University, the National
                          University caters the general education at graduate
                          and post-graduate level in colleges/professional
                          institutions hitherto remained affiliated to different
                          public universities in the country. At present, more
                          than 2.8 million students (Male 1.5 and Female 1.3)
                          are studying in 2249 colleges/institutions (Government
                          275, Non-government 1974; Honors 770+, Masters [both
                          preliminary and final] 145; Women's 123) affiliated to
                          this university.
                        </p>
                        <p>
                          Unlike other universities of Bangladesh, the National
                          University is an off-campus University spread to the
                          length and breadth of the country through its
                          affiliated bodies. Besides the Headquarters at
                          Gazipur, there are six Regional Centers in six
                          administrative divisions to run the affairs of the
                          University.
                        </p>
                        <p>
                          The University offers BA, BSS, BBS, B.Sc.,
                          Post-graduate and Professional degrees through field
                          level institutions. However, it also conducts MS,
                          M.Phil. And Ph.D. Programmes on a limited scale at the
                          Gazipur campus. The National University is expanding
                          in terms of number of students, courses and
                          institutions day by day. Today this university plays
                          the most significant role to provide opportunities for
                          higher education among the students living especially
                          in rural and semi-urban areas. The university has
                          taken a lot of important steps to improve the standard
                          of education by formulating a modern uniform
                          curriculum, providing training of the teachers and
                          supplying teaching materials to the affiliated
                          institutions.
                        </p>
                        <p>
                          The examination division conducts all the examinations
                          of the university. Under the overall supervision of
                          the Vice-Chancellor of the university, the controller
                          of examinations as the head of the division is fully
                          responsible for all activities relating to
                          examinations and publication of examination results.
                          The division is composed of one controller of
                          examinations, fifteen deputy controllers, thirty-seven
                          assistant controllers, eighty-four section officers,
                          fifteen sub-technical officers and about five hundred
                          supporting staffs.
                        </p>
                        <P>
                          Examination division in collaboration with the ICT
                          Division and Admission Cell of the university
                          accomplishes the responsibilities of registration of
                          of of students, processing of marks and preparation of
                          examination examination results. Till now results of
                          the Degree, Honors, Masters and all professional exams
                          (approx. 105 exams per year in 43 disciplines) are
                          being being processed and prepared in 32 bit litho
                          code based OMR system.
                        </P>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="shape-animate">
            <div class="transparent left">
              <img
                :src="require('@/assets/images/about/home6/line/1.png')"
                alt="images"
              />
            </div>
            <div class="transparent right">
              <img
                :src="require('@/assets/images/about/home6/line/2.png')"
                alt="images"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main content End -->
    <Footer></Footer>
  </div>
</template>

<script>
// import carousel from "@/components/utils/carousel.vue";
import Footer from "@/views/util/footer.vue";
import Header from "@/views/util/header.vue";
export default {
  components: {
    // carousel
    Footer,
    Header,
  },
};
</script>

<style scoped src="@/assets/css/bootstrap.min.css"></style>
<style scoped src="@/assets/css/font-awesome.min.css"></style>
<style scoped src="@/assets/css/animate.css"></style>
<style scoped src="@/assets/css/rsmenu-main.css"></style>
<style scoped src="@/assets/css/style.css"></style>
<style scoped src="@/assets/css/responsive.css"></style>
