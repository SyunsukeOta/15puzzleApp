const app = new Vue({
  el: '#app',
  data: {
    color: "green",
    direction: ["left", "right", "top", "bottom"],
    shuffleCount: 0,
    holeX: 0,
    holeY: 0,
    dir: "left",
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
          this.move("left");
        }
      }
      if (x<3) {
        if (!this.blockData[y][x+1].number) {
          // console.log(`right is empty`);
          this.move("right");
        }
      }
      if (y>0) {
        if (!this.blockData[y-1][x].number) {
          // console.log(`top is empty`);
          this.move("top");
        }
      }
      if (y<3) {
        if (!this.blockData[y+1][x].number) {
          // console.log(`bottom is empty`);
          this.move("bottom");
        }
      }
      this.checkCorrect();
    },
    move: function(direction) {
      let pointX = this.holeY, pointY = this.holeY;
      if (direction == "left") {
        pointX--;
      } else if (direction == "right") {
        pointX++;
      } else if (direction == "top") {
        pointY--;
      } else if (direction == "bottom") {
        pointY++;
      }
      this.blockData[this.holeY][this.holeX].color = this.blockData[pointY][pointX].color;
      this.blockData[this.holeY][this.holeX].number = this.blockData[pointY][pointX].number;
      this.blockData[pointY][pointX].color = "";
      this.blockData[pointY][pointX].number = null;
    },
    checkCorrect: function() {
      for(let i=0; i<15; i++) {
        let p = this.blockData[Math.floor(i/4)][i%4].number;
        if (p-(i+1)) {
          // console.log("No");
          return;
        }
      }
      setTimeout(()=> { alert("おめでとう。"); }, 200);
      console.log("Yes");
      return;
    },
    keyAction(e) {
      console.log(e.code);
      if (e.code == "ArrowLeft") {
        this.dir = this.direction[0];
      } else if (e.code == "ArrowRight") {
        this.dir = this.direction[1];
      } else if (e.code == "ArrowUp") {
        this.dir = this.direction[2];
      } else if (e.code == "ArrowDown") {
        this.dir = this.direction[3];
      } else return;
      this.dirMove();
      this.checkCorrect();
    },
    setHole() {
      for(let i=0; i<16; i++) {
        if (!this.blockData[Math.floor(i/4)][i%4].number) {
          this.holeX = i%4;
          this.holeY = Math.floor(i/4);
        }
      }
    },
    dirMove() {
      if (this.dir == "left" && this.holeX!=0) {
        this.move(this.dir);
        this.holeX--;
      } else if (this.dir == "right" && this.holeX!=3) {
        this.move(this.dir);
        this.holeX++;
      } else if (this.dir == "top" && this.holeY!=0) {
        this.move(this.dir);
        this.holeY--;
      } else if (this.dir == "bottom" && this.holeY!=3) {
        this.move(this.dir);
        this.holeY++;
      }
    }
  },
  mounted: function () {
    console.log('mounted');
    this.setHole();
    console.log(this.holeX, this.holeY);
    for(let i=0; i<this.shuffleCount; i++) {
      this.dir = this.direction[Math.floor(Math.random()*4)];
      this.dirMove();
      console.log(this.holeX, this.holeY);
      
    }
  },
  created() {
    //キーコードによる動作の登録
    document.addEventListener("keydown", this.keyAction);
  },
  beforeDestroy() {
    //キーコードによる動作の削除
    document.removeEventListener("keyup", this.keyAction);
  }
})