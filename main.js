import * as Three from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Create Scene
const scene = new Three.Scene();
const canvas = document.querySelector(".webgl");

//Dice model
//create cube
// const geometry = new Three.BoxGeometry( 2, 2, 2 );
// const material = new Three.MeshBasicMaterial( {color: "#00ff83"} );
// const cube = new Three.Mesh(geometry, material);

// scene.add(cube);

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
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

var cube;

const loader = new GLTFLoader();
loader.load(
  "assets/scene.gltf",
  function (gltf) {
    cube = gltf.scene;
    scene.add(gltf.scene);
    //ROTATIONS
    //num1
    cube.rotation.x = Math.PI;
    // //num3
    // cube.rotation.y-=Math.PI/2
    // cube.rotation.x+=Math.PI/2
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

const epsilon = 0.001;
let rotationSpeed = Math.PI / 128;

let rotations = {
  2: () => {
    let target = Math.PI / 2;
    if (Math.abs(cube.rotation.x - target) > epsilon) {
      cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
    }
  },

  3: () => {
    let target = -Math.PI / 2;

    if (Math.abs(cube.rotation.y - target) > epsilon) {
      cube.rotation.y -= Math.sign(cube.rotation.y - target) * rotationSpeed;
    }
  },
};

const loop = () => {
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
};

loop();
function rotate(){
  var number2 = setInterval(() => {
    if (cube) {
      let target = Math.PI / 2;
      let deltaCondition = Math.abs(cube.rotation.x - target) > epsilon;
      if (deltaCondition) {
        cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
      } else {
        clearInterval(number2);
        var number3 = setInterval(() => {
          if (cube) {
            let target = -Math.PI / 2;
            let deltaCondition = Math.abs(cube.rotation.z - target) > epsilon;
            if (deltaCondition) {
              cube.rotation.z -= Math.sign(cube.rotation.z - target) * rotationSpeed;
            } else {
              clearInterval(number3);
              var number4 = setInterval(() => {
                let target = Math.PI / 2;
                let deltaCondition = Math.abs(target - cube.rotation.z) > epsilon;
                if (deltaCondition) {
                  cube.rotation.z += Math.sign(target - cube.rotation.z) * rotationSpeed;
                } else {
                  clearInterval(number4);
                  var number5 = setInterval(() => {
                    let target = -Math.PI;
                    let deltaCondition = Math.abs(cube.rotation.z - target) > epsilon;
                    if (deltaCondition) {
                      cube.rotation.z -=Math.sign(cube.rotation.z - target) * rotationSpeed;
                    }
                    else{
                      clearInterval(number5)
                      var number6 = setInterval(()=>{
                        let target = 0;
                        let deltaCondition = Math.abs(cube.rotation.x - target ) > epsilon;
                        if (deltaCondition) {
                          cube.rotation.x -= Math.sign(cube.rotation.x - target) * rotationSpeed;
                        }
                        else{
                          clearInterval(number6)
                          var number1 = setInterval(()=>{
                            let xtarget = Math.PI
                            let xdeltaCondition = Math.abs(xtarget - target-cube.rotation.x ) > epsilon;
                            
                            if (xdeltaCondition) {
                              cube.rotation.x += Math.sign(xtarget - cube.rotation.x) * rotationSpeed;
                            }
                            else{
                              clearInterval(number1);
                              cube.rotation.z=0
                              rotate();
                            }

                          }, 5)
                        }
                      }, 5)
                    }
                  }, 5);
                }
              }, 5);
            }
          }
        }, 5);
      }
    }
  }, 5);
}

rotate();

// setInterval(()=>{
//   cube.rotation.z-=Math.PI/128
// }, 10)
