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
  setRow(face, row, seq) {
    this.faces[face][row * 3 + 1] = seq[0];
    this.faces[face][row * 3 + 2] = seq[1];
    this.faces[face][row * 3 + 3] = seq[2];
  },
  setCol(face, col, seq) {
    this.faces[face][col + 1] = seq[0];
    this.faces[face][col + 4] = seq[1];
    this.faces[face][col + 7] = seq[2];
  },
  turnFace(face, clockwise = true) {
    // rotate face
    let newFace = [];
    if (clockwise) {
      newFace = [this.faces[face][0]].concat(
        this.getCol(face, 0, 1),
        this.getCol(face, 1, 1),
        this.getCol(face, 2, 1)
      );
    } else {
      newFace = [this.faces[face][0]].concat(
        this.getCol(face, 2),
        this.getCol(face, 1),
        this.getCol(face, 0)
      );
    }
    this.faces[face] = newFace;
    // change edges connected to face
    let seq = [];
    switch (this.faces[face][0]) {
      case 0:
        if (clockwise) {
          seq = this.getRow(1, 2);
          this.setRow(1, 2, this.getCol(3, 2, 1));
          this.setCol(3, 2, this.getRow(2, 0));
          this.setRow(2, 0, this.getCol(4, 0, 1));
          this.setCol(4, 0, seq);
        } else {
          seq = this.getRow(1, 2, 1);
          this.setRow(1, 2, this.getCol(4, 0));
          this.setCol(4, 0, this.getRow(2, 0, 1));
          this.setRow(2, 0, this.getCol(3, 2));
          this.setCol(3, 2, seq);
        }
        break;
      case 1:
        if (clockwise) {
          seq = this.getRow(5, 0);
          this.setRow(5, 0, this.getRow(3, 0));
          this.setRow(3, 0, this.getRow(0, 0));
          this.setRow(0, 0, this.getRow(4, 0));
          this.setRow(4, 0, seq);
        } else {
          seq = this.getRow(5, 0);
          this.setRow(5, 0, this.getRow(4, 0));
          this.setRow(4, 0, this.getRow(0, 0));
          this.setRow(0, 0, this.getRow(3, 0));
          this.setRow(3, 0, seq);
        }
        break;
      case 2:
        if (clockwise) {
          seq = this.getRow(0, 2);
          this.setRow(0, 2, this.getRow(3, 2));
          this.setRow(3, 2, this.getRow(5, 2));
          this.setRow(5, 2, this.getRow(4, 2));
          this.setRow(4, 2, seq);
        } else {
          seq = this.getRow(0, 2);
          this.setRow(0, 2, this.getRow(4, 2));
          this.setRow(4, 2, this.getRow(5, 2));
          this.setRow(5, 2, this.getRow(3, 2));
          this.setRow(3, 2, seq);
        }
        break;
      case 3:
        if (clockwise) {
          seq = this.getCol(1, 0);
          this.setCol(1, 0, this.getCol(5, 2, 1));
          this.setCol(5, 2, this.getCol(2, 0, 1));
          this.setCol(2, 0, this.getCol(0, 0));
          this.setCol(0, 0, seq);
        } else {
          seq = this.getCol(1, 0, 1);
          this.setCol(1, 0, this.getCol(0, 0));
          this.setCol(0, 0, this.getCol(2, 0));
          this.setCol(2, 0, this.getCol(5, 2, 1));
          this.setCol(5, 2, seq);
        }
        break;
      case 4:
        if (clockwise) {
          seq = this.getCol(1, 2, 1);
          this.setCol(1, 2, this.getCol(0, 2));
          this.setCol(0, 2, this.getCol(2, 2));
          this.setCol(2, 2, this.getCol(5, 0, 1));
          this.setCol(5, 0, seq);
        } else {
          seq = this.getCol(1, 2);
          this.setCol(1, 2, this.getCol(5, 0, 1));
          this.setCol(5, 0, this.getCol(2, 2, 1));
          this.setCol(2, 2, this.getCol(0, 2));
          this.setCol(0, 2, seq);
        }
        break;
    }
  },
});

let cube = cubeFactory();

cube.scramble();
console.log(cube.faces);
console.log("--------------cw------------------");
cube.turnFace(4, 1);
console.log(cube.faces);
console.log("--------------ccw-----------------");
cube.turnFace(4, 0);
cube.turnFace(4, 0);
console.log(cube.faces);
