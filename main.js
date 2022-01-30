const cubeFactory = () => ({
  colors: ["Y", "W", "B", "G", "R", "O"],
  faces: [[], [], [], [], [], []],
  populateFaces() {
    let counters = [8, 8, 8, 8, 8, 8];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 9; j++) {
        if (j === 4) {
          this.faces[i].push(this.colors[i]);
        } else {
          let color;
          do {
            color = Math.floor(Math.random() * 6);
          } while (counters[color] === 0);
          this.faces[i].push(this.colors[color]);
          counters[color]--;
        }
      }
    }
  },
  turnFace(n, clockwise) {
    let newFace = [];
    newFace[4] = this.faces[n][4];
    if (clockwise) {
      newFace[0] = this.faces[n][6];
      newFace[1] = this.faces[n][3];
      newFace[2] = this.faces[n][0];
      newFace[3] = this.faces[n][7];
      newFace[5] = this.faces[n][1];
      newFace[6] = this.faces[n][8];
      newFace[7] = this.faces[n][5];
      newFace[8] = this.faces[n][2];
    } else {
      newFace[0] = this.faces[n][2];
      newFace[1] = this.faces[n][5];
      newFace[2] = this.faces[n][8];
      newFace[3] = this.faces[n][1];
      newFace[5] = this.faces[n][7];
      newFace[6] = this.faces[n][0];
      newFace[7] = this.faces[n][3];
      newFace[8] = this.faces[n][6];
    }
    this.faces[n] = newFace;
  },
});

let cube = cubeFactory();

cube.populateFaces();
console.log(cube.faces);
cube.turnFace(5, true);
console.log(cube.faces);
