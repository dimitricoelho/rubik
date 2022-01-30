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

populateFaces();
console.log(faces);
