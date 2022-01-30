const colors = ["Y", "W", "B", "G", "R", "O"];
const faces = [];
for (let i = 0; i < 6; i++) {
  faces[i] = ["", "", "", "", colors[i], "", "", "", ""];
}

let counters = [8, 8, 8, 8, 8, 8];
const populateFaces = () => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      if (j !== 4) {
        do {
          color = Math.floor(Math.random() * 6);
        } while (counters[color] === 0);
        faces[i][j] = colors[color];
        counters[color]--;
      }
    }
  }
};

const turnFace = (face, clockwise) => {
  let newFace = [];
  newFace[4] = face[4];
  if (clockwise) {
    newFace[0] = face[6];
    newFace[1] = face[3];
    newFace[2] = face[0];
    newFace[3] = face[7];
    newFace[5] = face[1];
    newFace[6] = face[8];
    newFace[7] = face[5];
    newFace[8] = face[2];
  } else {
    newFace[0] = face[2];
    newFace[1] = face[5];
    newFace[2] = face[8];
    newFace[3] = face[1];
    newFace[5] = face[7];
    newFace[6] = face[0];
    newFace[7] = face[3];
    newFace[8] = face[6];
  }
  return newFace;
};

populateFaces();
console.log(faces);
faces[5] = turnFace(faces[5], false);
console.log(faces);
