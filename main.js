import * as Three from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import {  secondaryRotation, secondaryRotationTens } from "./clock_parts/Seconds";
import { createFacelessCube } from "./clock_parts/facelessModel";
//Create Scene
const scene = new Three.Scene();
const canvas = document.querySelector(".webgl");

const facelessCube = createFacelessCube();
scene.add(facelessCube);

//Viewport Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Lights
const ambientLights = new Three.AmbientLight(0xffffff, 125);
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


const loader = new GLTFLoader();
loader.load(
  "assets/scene.gltf",
  function (gltf) {
    cube = gltf.scene;
    secondsUnitCube = gltf.scene.clone();
    secondsUpperCube = gltf.scene.clone();
    secondsUnitCube.position.x = 300;
    secondsUpperCube.position.x = 300;
    secondsUpperCube.position.y = 300;
    secondsUnitCube.rotation.x = Math.PI;

    scene.add(cube);
    scene.add(secondsUnitCube);
    scene.add(secondsUpperCube);
    
    secondsUpperCube.visible = false;
    secondaryRotation(secondsUnitCube, secondsUpperCube);
    secondaryRotationTens(cube, facelessCube);
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
