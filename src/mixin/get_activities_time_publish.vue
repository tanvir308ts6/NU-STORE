<script>
import moment from "moment";
export default {
  data() {
    return {
      publishMsg: "",
      publishState: 0,
      timeOut: true,
      paramGetTime: {},
      paramPublish: {},
      paramTimePublishBoth: {},
    };
  },
  methods: {
    // get status
    publishActivityUpdating() {
       console.log("here stas",this.paramPublish );
      this.$store
        .dispatch("searchExamTimeLineData", this.paramPublish)
        .then((data) => {
          this.publishState = data.data[0].active;
          this.publishMsg =
            data.data[0].activity_name + " activity Published !!";
        });
    },
    //get time
    getActivitiesTime() {
      console.log("here time", this.paramGetTime);
      this.$store
        .dispatch("searchExamTimeLineData", this.paramGetTime)
        .then((data) => {
          if (data) {
            console.log("tag", data.data[0].end_date);
            this.time(data.data[0].end_date);
          }
        });
    },
    //get time & status both
    getTimePublishStatusBoth() {
      this.$store
        .dispatch("searchExamTimeLineData", this.paramTimePublishBoth)
        .then((data) => {
          if (data) {
            console.log("tag", data.data[0].end_date);
            this.time(data.data[0].end_date);
            this.publishState = data.data[0].active;
            this.publishMsg =
              data.data[0].activity_name + " activity Published !!";
          }
        });
    },
    time(time) {
      console.log("time", time);
      const today = moment(new Date(), "YYYY-MM-DD", true);
      console.log(JSON.stringify(today, null, 2));

      const tmp = moment(time, "YYYY-MM-DD", true).add(1, "days"); // bcz if its 20th sept then it come as "2020-09-19T18:00:00.000Z" so added 1 day
      console.log(JSON.stringify(tmp, null, 2));

      const isAfterToday = tmp.isSameOrAfter(today, "second");
      console.log(isAfterToday);

      if (isAfterToday) {
        this.timeOut = false;
      } else {
        this.timeOut = true;
      }
    },
  },
};
</script>
