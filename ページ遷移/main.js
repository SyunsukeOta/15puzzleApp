const app = new Vue({
  el: '#app1',
  data: {
    clickCount: 0,
  },
  methods: {
    clicked: function() {
      this.clickCount++;
      console.log(`${this.clickCount}回クリックされました。`);
      this.checkClickCount();
    },
    checkClickCount: function() {
      if (this.clickCount>=5) {
        console.log('5回以上クリックされました。');
        location.href = './a.html';
      }
    }
  }
});