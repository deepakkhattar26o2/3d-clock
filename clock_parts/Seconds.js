import rotations from "./rotations";
export function secondaryRotation(cube, upperCube) {
  let target = 2;
  let upperTarget = 1;
  setInterval(() => {
    if (target < 7) {
      rotations[target](cube);
      target++;
    } else if (target == 7 && upperTarget < 5) {
      upperCube.visible = true;
      rotations[upperTarget](upperCube);
      upperTarget++;
    } else {
      upperCube.visible = false;
      rotations["1"](cube);
      upperTarget = 1;
      target = 2;
    }
  }, 1000);
}

export function secondaryRotationTens(cube, facelessCube) {
  let target = 1;
  setInterval(() => {
    if (target < 6) {
      rotations[target](cube);
      facelessCube.visible = false;
      target++;
    } else if (target == 6) {
      facelessCube.visible = true;
      target = 1;
    }
  }, 10000);
}
