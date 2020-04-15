const app = new Vue({
  el: '#app',
  data: {
    color: "green",
    direction: ["left", "right", "top", "bottom"],

    moveCount: 50,
    timerCount: 0,
    timerObject: null,
    seconds: '00',
    minutes: '00',
    blockData: [
      [
        { id: 0, color: "blue", number: 1 },
        { id: 1, color: "blue", number: 2 },
        { id: 2, color: "blue", number: 3 },
        { id: 3, color: "blue", number: 4 },
      ],
      [
        { id: 4, color: "orange", number: 5 },
        { id: 5, color: "orange", number: 6 },
        { id: 6, color: "orange", number: 7 },
        { id: 7, color: "orange", number: 8 },
      ],
      [
        { id: 8, color: "yellow", number: 9 },
        { id: 9, color: "yellow", number: 10 },
        { id: 10, color: "", number: null },
        { id: 11, color: "yellow", number: 12 },
      ],
      [
        { id: 12, color: "green", number: 13 },
        { id: 13, color: "green", number: 14 },
        { id: 14, color: "yellow", number: 11 },
        { id: 15, color: "green", number: 15 },
      ]
    ]
  },
  methods: {
    clickEvent: function(x, y) {
      // console.log(`You clicked ${(x)+4*(y)+1}(${x},${y})`);
      //blockdata[y][x]      
      if (x>0) {
        if (!this.blockData[y][x-1].number) {
          // console.log(`left is empty`);
          this.move(x,y,"left");
        }
      }
      if (x<3) {
        if (!this.blockData[y][x+1].number) {
          // console.log(`right is empty`);
          this.move(x,y,"right");
        }
      }
      if (y>0) {
        if (!this.blockData[y-1][x].number) {
          // console.log(`top is empty`);
          this.move(x,y,"top");
        }
      }
      if (y<3) {
        if (!this.blockData[y+1][x].number) {
          // console.log(`bottom is empty`);
          this.move(x,y,"bottom");
        }
      }
      this.checkCorrect();
    },
    move: function(x,y,direction) {
      let pointX = x, pointY = y;

      if (direction === "left") pointX--;
      if (direction === "right") pointX++;
      if (direction === "top") pointY--;
      if (direction === "bottom")pointY++;
      this.blockData[pointY][pointX].color = this.blockData[y][x].color;
      this.blockData[pointY][pointX].number = this.blockData[y][x].number;
      this.blockData[y][x].color = "";
      this.blockData[y][x].number = null;
    },
    checkCorrect: function() {
      for(let i=0; i<15; i++) {
        let p = this.blockData[Math.floor(i/4)][i%4].number;
        if (p-(i+1)) {
          // console.log("No");
          return;
        }
      }
      console.log("Yes");
      this.stop();
      localStorage.setItem('count', this.timerCount.toString());
      location.href = './result.html';
      return;
    },
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
    },
    stop: function() {
      clearInterval(this.timerObject);
    }
  },
  mounted: function () {
    console.log('mounted');
    let holeX, holeY;
    for(let i=0; i<16; i++) {
      if (!this.blockData[Math.floor(i/4)][i%4].number) {
        holeX = i%4;
        holeY = Math.floor(i/4);
      }
    }
    // console.log(holeX, holeY);
    for(let i=0; i<this.moveCount; i++) {
      let dir = this.direction[Math.floor(Math.random()*4)];
      if (dir == "left" && holeX<3) {
        this.move(holeX+1, holeY, "left");
        holeX++;
      }
      if (dir == "right" && holeX>0) {
        this.move(holeX-1, holeY, "right");
        holeX--;
      }
      if (dir == "top" && holeY<3) {
        this.move(holeX, holeY+1, "top");
        holeY++;
      }
      if (dir == "bottom" && holeY>0) {
        this.move(holeX, holeY-1, "bottom");
        holeY--;
      }
    }
    this.start();
  }
})