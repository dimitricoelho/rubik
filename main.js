const cubeFactory = () => ({
  colors: ["Y", "B", "G", "R", "O", "W"],
  faces: [[], [], [], [], [], []],
  scramble() {
    let counters = [8, 8, 8, 8, 8, 8]; // 8 positions to assign colors on each face except for the center
    for (let i = 0; i < 6; i++) {
      this.faces[i][0] = i; // position 0 on the face array indicates the side of the face in relation to the person
      for (let j = 1; j < 10; j++) {
        if (j === 5) {
          this.faces[i][j] = this.colors[i];
        } else {
          let color;
          do {
            color = Math.floor(Math.random() * 6);
          } while (counters[color] === 0);
          this.faces[i][j] = this.colors[color];
          counters[color]--;
        }
      }
    }
  },
  getRow(face, row, reverse = false) {
    faceRow = [];
    switch (row) {
      case 0:
        faceRow = this.faces[face].slice(1, 4);
        break;
      case 1:
        faceRow = this.faces[face].slice(4, 7);
        break;
      case 2:
        faceRow = this.faces[face].slice(7);
        break;
    }
    if (reverse) faceRow.reverse();
    return faceRow;
  },
  getCol(face, col, reverse = false) {
    faceCol = [];
    switch (col) {
      case 0:
        faceCol = [
          this.faces[face][1],
          this.faces[face][4],
          this.faces[face][7],
        ];
        break;
      case 1:
        faceCol = [
          this.faces[face][2],
          this.faces[face][5],
          this.faces[face][8],
        ];
        break;
      case 2:
        faceCol = [
          this.faces[face][3],
          this.faces[face][6],
          this.faces[face][9],
        ];
        break;
    }
    if (reverse) faceCol.reverse();
    return faceCol;
  },
  turnFace(n, clockwise = true) {
    let newFace = [];
    newFace[0] = this.faces[n][0]; // 0 = side of face
    newFace[5] = this.faces[n][5]; // 5 = center piece of face
    if (clockwise) {
      newFace[1] = this.faces[n][7];
      newFace[2] = this.faces[n][4];
      newFace[3] = this.faces[n][1];
      newFace[4] = this.faces[n][8];
      newFace[6] = this.faces[n][2];
      newFace[7] = this.faces[n][9];
      newFace[8] = this.faces[n][6];
      newFace[9] = this.faces[n][3];
    } else {
      newFace[1] = this.faces[n][3];
      newFace[2] = this.faces[n][6];
      newFace[3] = this.faces[n][9];
      newFace[4] = this.faces[n][2];
      newFace[6] = this.faces[n][8];
      newFace[7] = this.faces[n][1];
      newFace[8] = this.faces[n][4];
      newFace[9] = this.faces[n][7];
    }
    this.faces[n] = newFace;
  },
});

let cube = cubeFactory();

cube.scramble();
console.log(cube.faces);
//cube.turnFace(0);
console.log(cube.getCol(5, 0, 1));
