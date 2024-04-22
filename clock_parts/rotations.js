const epsilon = 0.001;
let rotationSpeed = Math.PI / 16;


export default {
    1: function (cube) {
      let one = setInterval(() => {
        let xtarget = Math.PI;
        let xdeltaCondition = Math.abs(xtarget - cube.rotation.x) > epsilon;
  
        if (xdeltaCondition) {
          cube.rotation.x += Math.sign(xtarget - cube.rotation.x) * rotationSpeed;
        } else {
          cube.rotation.z = 0;
          clearInterval(one);
        }
      }, 10);
    },
    2: function (cube) {
      let two = setInterval(() => {
        let target = Math.PI / 2;
        let deltaCondition = Math.abs(cube.rotation.x - target) > epsilon;
        if (deltaCondition) {
          cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
        } else {
          clearInterval(two);
        }
      }, 10);
    },
  
    3: function (cube) {
      let three = setInterval(() => {
        let target = -Math.PI / 2;
        let deltaCondition = Math.abs(cube.rotation.z - target) > epsilon;
        if (deltaCondition) {
          cube.rotation.z -= Math.sign(cube.rotation.z - target) * rotationSpeed;
        } else {
          clearInterval(three);
        }
      }, 10);
    },
    4: function (cube) {
      let four = setInterval(() => {
        let target = Math.PI / 2;
        let deltaCondition = Math.abs(target - cube.rotation.z) > epsilon;
        if (deltaCondition) {
          cube.rotation.z += Math.sign(target - cube.rotation.z) * rotationSpeed;
        } else {
          clearInterval(four);
        }
      }, 10);
    },
    5: function (cube) {
      let five = setInterval(() => {
        let target = -Math.PI;
        let deltaCondition = Math.abs(cube.rotation.z - target) > epsilon;
        if (deltaCondition) {
          cube.rotation.z -= Math.sign(cube.rotation.z - target) * rotationSpeed;
        } else {
          clearInterval(five);
        }
      }, 10);
    },
    6: function (cube) {
      let six = setInterval(() => {
        let target = 0;
        let deltaCondition = Math.abs(cube.rotation.x - target) > epsilon;
        if (deltaCondition) {
          cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
        } else {
          clearInterval(six);
        }
      }, 10);
    },
  };
  