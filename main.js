import * as Three from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

//Create Scene
const scene = new Three.Scene();
const canvas = document.querySelector(".webgl");

const geometry = new Three.BoxGeometry(
  180.00004768371582,
  180.0000802678567,
  222.0000802678567
);
const material = new Three.MeshBasicMaterial({ color: "#FF743E" });
const facelessCube = new Three.Mesh(geometry, material);

scene.add(facelessCube);

//Viewport Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Lights
// const lights = new Three.PointLight(0xffffff, 1, 100);
const ambientLights = new Three.AmbientLight(0xffffff, 125);
// lights.position.set(0,10,10)
scene.add(ambientLights);

//Camera
const camera = new Three.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 1500;
scene.add(camera);

//Rendering
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.enablePan = false;
controls.enableZoom = false;

var cube;
var secondsUnitCube;
var secondsUpperCube;
const epsilon = 0.001;
let rotationSpeed = Math.PI / 16;

let rotations = {
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

const loader = new GLTFLoader();
loader.load(
  "assets/scene.gltf",
  function (gltf) {
    cube = gltf.scene;
    secondsUnitCube = gltf.scene.clone();
    secondsUpperCube = gltf.scene.clone();
    const box = new Three.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Three.Vector3());
    console.log(size);
    secondsUnitCube.position.x = 300;
    secondsUpperCube.position.x = 300;
    secondsUpperCube.position.y = 300;
    secondsUnitCube.rotation.x = Math.PI;

    scene.add(cube);
    scene.add(secondsUnitCube);
    scene.add(secondsUpperCube);
    secondsUpperCube.visible = false;
    // rotate(cube);
    secondaryRotation(secondsUnitCube);
    secondaryRotationTens(cube);
    // rotate(secondsUnitCube)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

const loop = () => {
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
};

loop();
// function rotate(cube) {
//   var number2 = setInterval(() => {
//     let target = Math.PI / 2;
//     let deltaCondition = Math.abs(cube.rotation.x - target) > epsilon;
//     if (deltaCondition) {
//       cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
//     } else {
//       clearInterval(number2);
//       var number3 = setInterval(() => {
//         let target = -Math.PI / 2;
//         let deltaCondition = Math.abs(cube.rotation.z - target) > epsilon;
//         if (deltaCondition) {
//           cube.rotation.z -=
//             Math.sign(cube.rotation.z - target) * rotationSpeed;
//         } else {
//           clearInterval(number3);
//           var number4 = setInterval(() => {
//             let target = Math.PI / 2;
//             let deltaCondition = Math.abs(target - cube.rotation.z) > epsilon;
//             if (deltaCondition) {
//               cube.rotation.z +=
//                 Math.sign(target - cube.rotation.z) * rotationSpeed;
//             } else {
//               clearInterval(number4);
//               var number5 = setInterval(() => {
//                 let target = -Math.PI;
//                 let deltaCondition =
//                   Math.abs(cube.rotation.z - target) > epsilon;
//                 if (deltaCondition) {
//                   cube.rotation.z -=
//                     Math.sign(cube.rotation.z - target) * rotationSpeed;
//                 } else {
//                   clearInterval(number5);
//                   var number6 = setInterval(() => {
//                     let target = 0;
//                     let deltaCondition =
//                       Math.abs(cube.rotation.x - target) > epsilon;
//                     if (deltaCondition) {
//                       cube.rotation.x -=
//                         Math.sign(cube.rotation.x - target) * rotationSpeed;
//                     } else {
//                       clearInterval(number6);
//                       var number1 = setInterval(() => {
//                         let xtarget = Math.PI;
//                         let xdeltaCondition =
//                           Math.abs(xtarget  - cube.rotation.x) >
//                           epsilon;

//                         if (xdeltaCondition) {
//                           cube.rotation.x +=
//                             Math.sign(xtarget - cube.rotation.x) *
//                             rotationSpeed;
//                         } else {
//                           clearInterval(number1);
//                           cube.rotation.z = 0;
//                           rotate(cube);
//                         }
//                       }, 5);
//                     }
//                   }, 5);
//                 }
//               }, 5);
//             }
//           }, 5);
//         }
//       }, 5);
//     }
//   }, 5);
// }

function secondaryRotation(cube) {
  let target = 2;
  let upperTarget = 1;
  setInterval(() => {
    if (target < 7) {
      rotations[target](cube);
      target++;
    } else if (target == 7 && upperTarget < 5) {
      secondsUpperCube.visible = true;
      rotations[upperTarget](secondsUpperCube);
      upperTarget++;
    } else {
      secondsUpperCube.visible = false;
      rotations["1"](cube);
      upperTarget = 1;
      target = 2;
    }
  }, 1000);
}

function secondaryRotationTens(cube) {
  let target = 1;
  setInterval(() => {
    if (target < 6) {
      facelessCube.visible = false;
      rotations[target](cube);
      target++;
    } 
    else if(target==6){
      facelessCube.visible=true;
      target=1;
    }
  }, 10000);
}
