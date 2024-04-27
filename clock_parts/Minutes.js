import rotations from "./rotations";
export function minutesUnitRotation(cube, upperCube, facelessCube) {
  let target = 1;
  let upperTarget = 1;
  setInterval(() => {
    if (target < 7) {
      rotations[target](cube);
      facelessCube.visible = false;
      target++;
    } else if (target == 7 && upperTarget < 4) {
      upperCube.visible = true;
      rotations[upperTarget](upperCube);
      upperTarget++;
    } else {
      upperCube.visible = false;
      facelessCube.visible = true;
      // rotations["1"](cube);
      upperTarget = 1;
      target = 1;
    }
  }, 60000);
}

export function minutesTensRotation(cube, facelessCube) {
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
  }, 600000);
}
