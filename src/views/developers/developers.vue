<template>
  <v-container>
    <v-layout
      class="row"
      v-for="(organization, org_index) in organizations"
      :key="org_index"
    >
    <v-divider></v-divider>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-title>{{ organization.name }}</v-card-title>
        </v-card>
        <v-divider></v-divider>
        <v-layout class="row">
          <v-flex
            xs4
            sm4
            v-for="(developer, dev_index) in organization.developers"
            :key="dev_index"
          >
            <v-divider></v-divider>
            <v-card>
              <v-img
                height="200px"
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              >
                <v-divider></v-divider>

                <v-card-title class="white--text mt-8">
                  <v-avatar size="56">
                    <img
                      alt="user"
                      src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                    />
                  </v-avatar>
                  <p class="ml-3">
                    <strong>{{ developer.name }}</strong>
                  </p>
                  <!-- <p>{{ developer.bio }}</p> -->
                </v-card-title>
              </v-img>

              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">
                  Info
                </div>

                <v-timeline align-top dense>
                  <v-timeline-item
                    v-for="(information, info_index) in developer.information"
                    :key="info_index"
                    :color="information.color"
                    small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ information.title }}</strong>
                      </div>
                      <div>
                        <a :href="information.link">{{ information.link }}</a>
                      </div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    organizations: [
      {
        name: "Bigm Resource Ltd.",
        developers: [
          {
            name: "Iqbal Hossain",
            bio: "status",
            information: [
              {
                title: "CV",
                link: "http://abc.com",
                color: "deep-purple lighten-1"
              },
              {
                title: "FaceBook",
                link: "http://abc.com",
                color: "blue"
              },
              {
                title: "LinkedIn",
                link: "http://abc.com",
                color: "green"
              }
            ]
          },
          {
            name: "Iqbal Hossain",
            bio: "status",
            information: [
              {
                title: "CV",
                link: "http://abc.com",
                color: "deep-purple lighten-1"
              },
              {
                title: "LinkedIn",
                link: "http://abc.com",
                color: "green"
              }
            ]
          },
          {
            name: "Iqbal Hossain",
            bio: "status",
            information: [
              {
                title: "CV",
                link: "http://abc.com",
                color: "deep-purple lighten-1"
              },
              {
                title: "LinkedIn",
                link: "http://abc.com",
                color: "green"
              }
            ]
          }
        ]
      },
      {
        name: "i360 Bangladesh",
        developers: [
          {
            name: "Iqbal Hossain",
            bio: "status",
            information: [
              {
                title: "CV",
                link: "http://abc.com",
                color: "deep-purple lighten-1"
              },
              {
                title: "LinkedIn",
                link: "http://abc.com",
                color: "green"
              }
            ]
          },
          {
            name: "Iqbal Hossain",
            bio: "status",
            information: [
              {
                title: "CV",
                link: "http://abc.com",
                color: "deep-purple lighten-1"
              },
              {
                title: "LinkedIn",
                link: "http://abc.com",
                color: "green"
              }
            ]
          },
          {
            name: "Iqbal Hossain",
            bio: "status",
            information: [
              {
                title: "CV",
                link: "http://abc.com",
                color: "deep-purple lighten-1"
              },
              {
                title: "LinkedIn",
                link: "http://abc.com",
                color: "green"
              }
            ]
          }
        ]
      }
    ],
    messages: [
      {
        from: "You",
        message: `Sure, I'll see you later.`,
        time: "10:42am",
        color: "deep-purple lighten-1"
      },
      {
        from: "John Doe",
        message: "Yeah, sure. Does 1:00pm work?",
        time: "10:37am",
        color: "green"
      },
      {
        from: "You",
        message: "Did you still want to grab lunch today?",
        time: "9:47am",
        color: "deep-purple lighten-1"
      }
    ]
  })
};
</script>
