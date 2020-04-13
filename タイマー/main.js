const app1 = new Vue({
  el: '#app',
  data: {
    timerCount: 0,
    timerObject: null,
    seconds: '00',
    minutes: '00',
  },
  methods: {
    convert: function() {
      this.seconds = (this.timerCount%60).toString(10);
      if (this.seconds.length == 1) {
        this.seconds = '0' + this.seconds;
      }
      this.minutes = (Math.floor(this.timerCount/60)).toString(10);
      if (this.minutes.length == 1) {
        this.minutes = '0' + this.minutes;
      }
    },
    count: function() {
      this.timerCount++;
      // console.log(this.timerCount);
      this.convert();
    },
    start: function() {
      console.log('OK');
      this.timerCount = 0;
      this.timerObject = setInterval(this.count, 1000);
    }
  },
  mounted: function(){
    this.start();
  }
});