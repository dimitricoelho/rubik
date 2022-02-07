const cubeFactory = () => ({
  // Create colors set: Yellow, Red, Orange, Green, Blue, and White
  colors: ["Y", "R", "O", "G", "B", "W"],
  // Create sides set
  sides: ["Front", "Up", "Down", "Left", "Right", "Back"],
  // Create empty faces
  faces: [[], [], [], [], [], []],
  // Scramble the cube and assign Yellow to Front face + Red to Up face
  scramble() {
    let counters = [8, 8, 8, 8, 8, 8]; // 8 pieces of each color to be assigned to each face except for the centre piece
    for (let i = 0; i < 6; i++) {
      // check each of the 6 faces
      this.faces[i][0] = i; // position 0 on the face array indicates the side of the face in relation to the person
      for (let j = 1; j < 10; j++) {
        // check each of the 9 pieces in each face
        if (j === 5) {
          // assign color to the centre piece
          this.faces[i][j] = this.colors[i];
        } else {
          // assign colors to the other pieces
          let color;
          do {
            color = Math.floor(Math.random() * 6);
          } while (counters[color] === 0); // look for another color if all instances of a specific color have already been used
          this.faces[i][j] = this.colors[color];
          counters[color]--;
        }
      }
    }
  },
  // Get a row of a face (row = 0..2: left to right) and optionally reverse the order of its pieces
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
  // Get a column of a face (col = 0..2: top to bottom) and optionally reverse the order of its pieces
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
  // Assign a sequence of pieces to a specific row
  setRow(face, row, seq) {
    this.faces[face][row * 3 + 1] = seq[0];
    this.faces[face][row * 3 + 2] = seq[1];
    this.faces[face][row * 3 + 3] = seq[2];
  },
  // Assign a sequence of pieces to a specific column
  setCol(face, col, seq) {
    this.faces[face][col + 1] = seq[0];
    this.faces[face][col + 4] = seq[1];
    this.faces[face][col + 7] = seq[2];
  },
  // Turn a face of the cube (clockwise or counterclockwise): rotate face + move pieces of edges connected to turned face
  turnFace(face, clockwise = true) {
    // Rotate face
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
    // Move pieces of edges connected to turned face
    let seq = [];
    switch (this.faces[face][0]) {
      case 0: // if the Front face is turned
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
      case 1: // if the Up face is turned
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
      case 2: // if the Down face is turned
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
      case 3: // if the Left face is turned
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
      case 4: // if the Right face is turned
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
      case 5: // if the Back face is turned
        if (clockwise) {
          seq = this.getRow(1, 0, 1);
          this.setRow(1, 0, this.getCol(3, 2));
          this.setCol(3, 2, this.getRow(2, 2, 1));
          this.setRow(2, 2, this.getCol(4, 0));
          this.setCol(4, 0, seq);
        } else {
          seq = this.getRow(1, 0);
          this.setRow(1, 0, this.getCol(4, 0, 1));
          this.setCol(4, 0, this.getRow(2, 2));
          this.setRow(2, 2, this.getCol(3, 2, 1));
          this.setCol(3, 2, seq);
        }
        break;
    }
  },
  // Print cube faces to console
  show() {
    for (let i = 0; i < 6; i++) {
      console.log(`${this.sides[i]} Face (${i}):`);
      for (let j = 0; j < 3; j++) {
        let row = this.getRow(i, j);
        console.log(`[${row[0]}][${row[1]}][${row[2]}]`);
      }
    }
  },
  // Shortcut methods for each face.
  // For instance: cube.F() to turn Front face clockwise, and cube.F(0) to turn Front face counterclockwise
  // turn Front face clockwise (1) or counterclockwise (0)
  F(clockwise = true) {
    this.turnFace(0, clockwise);
    console.log(`F${clockwise ? "" : "'"}`);
  },
  // turn Up face clockwise (1) or counterclockwise (0)
  U(clockwise = true) {
    this.turnFace(1, clockwise);
    console.log(`U${clockwise ? "" : "'"}`);
  },
  // turn Down face clockwise (1) or counterclockwise (0)
  D(clockwise = true) {
    this.turnFace(2, clockwise);
    console.log(`D${clockwise ? "" : "'"}`);
  },
  // turn Left face clockwise (1) or counterclockwise (0)
  L(clockwise = true) {
    this.turnFace(3, clockwise);
    console.log(`L${clockwise ? "" : "'"}`);
  },
  // turn Right face clockwise (1) or counterclockwise (0)
  R(clockwise = true) {
    this.turnFace(4, clockwise);
    console.log(`R${clockwise ? "" : "'"}`);
  },
  // turn Back face clockwise (1) or counterclockwise (0)
  B(clockwise = true) {
    this.turnFace(5, clockwise);
    console.log(`B${clockwise ? "" : "'"}`);
  },
});

// create cube object
let cube = cubeFactory();
// scramble cube
cube.scramble();
// print cube faces
cube.show();
// turn Front face counterclockwise
cube.F(0);
// print changed cube faces
cube.show();
