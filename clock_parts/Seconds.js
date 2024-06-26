import rotations from "./rotations";
export function secondsUnitRotation(cube, upperCube, facelessCube) {
  let target = 2;
  let upperTarget = 1;
  setInterval(() => {
    if (target < 7) {
      facelessCube.visible=false;
      rotations[target](cube);
      target++;
    } else if (target == 7 && upperTarget < 5) {
      upperCube.visible = true;
      rotations[upperTarget](upperCube);
      upperTarget++;
    } else {
      upperCube.visible = false;
      facelessCube.visible=true;
      upperTarget = 1;
      target = 1;
    }
  }, 1000);
}

export function secondsTensRotation(cube, facelessCube) {
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
