const epsilon = 0.001;
let rotationSpeed = Math.PI / 16;

function rotate(cube) {
  var number2 = setInterval(() => {
    let target = Math.PI / 2;
    let deltaCondition = Math.abs(cube.rotation.x - target) > epsilon;
    if (deltaCondition) {
      cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
    } else {
      clearInterval(number2);
      var number3 = setInterval(() => {
        let target = -Math.PI / 2;
        let deltaCondition = Math.abs(cube.rotation.z - target) > epsilon;
        if (deltaCondition) {
          cube.rotation.z -=
            Math.sign(cube.rotation.z - target) * rotationSpeed;
        } else {
          clearInterval(number3);
          var number4 = setInterval(() => {
            let target = Math.PI / 2;
            let deltaCondition = Math.abs(target - cube.rotation.z) > epsilon;
            if (deltaCondition) {
              cube.rotation.z +=
                Math.sign(target - cube.rotation.z) * rotationSpeed;
            } else {
              clearInterval(number4);
              var number5 = setInterval(() => {
                let target = -Math.PI;
                let deltaCondition =
                  Math.abs(cube.rotation.z - target) > epsilon;
                if (deltaCondition) {
                  cube.rotation.z -=
                    Math.sign(cube.rotation.z - target) * rotationSpeed;
                } else {
                  clearInterval(number5);
                  var number6 = setInterval(() => {
                    let target = 0;
                    let deltaCondition =
                      Math.abs(cube.rotation.x - target) > epsilon;
                    if (deltaCondition) {
                      cube.rotation.x -=
                        Math.sign(cube.rotation.x - target) * rotationSpeed;
                    } else {
                      clearInterval(number6);
                      var number1 = setInterval(() => {
                        let xtarget = Math.PI;
                        let xdeltaCondition =
                          Math.abs(xtarget - cube.rotation.x) > epsilon;

                        if (xdeltaCondition) {
                          cube.rotation.x +=
                            Math.sign(xtarget - cube.rotation.x) *
                            rotationSpeed;
                        } else {
                          clearInterval(number1);
                          cube.rotation.z = 0;
                          rotate(cube);
                        }
                      }, 5);
                    }
                  }, 5);
                }
              }, 5);
            }
          }, 5);
        }
      }, 5);
    }
  }, 5);
}
