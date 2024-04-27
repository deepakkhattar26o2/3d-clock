import * as Three from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import {
  secondsTensRotation,
  secondsUnitRotation,
} from "./clock_parts/Seconds";
import { createFacelessCube } from "./clock_parts/facelessModel";
import { minutesTensRotation, minutesUnitRotation } from "./clock_parts/Minutes";
//Create Scene
const scene = new Three.Scene();
const canvas = document.querySelector(".webgl");

//Seconds Cubes Covers
const secondsTensCubeCover = createFacelessCube();
const secondsUnitCubeCover = createFacelessCube();
secondsUnitCubeCover.position.x = 700;
secondsTensCubeCover.position.x = 400;
scene.add(secondsTensCubeCover);
scene.add(secondsUnitCubeCover);
secondsUnitCubeCover.visible = false;
//Seconds Cubes Covers
const minutesUnitCubeCover = createFacelessCube();
const minutesTensCubeCover = createFacelessCube();
minutesTensCubeCover.position.x=-300;
scene.add(minutesTensCubeCover);
scene.add(minutesUnitCubeCover);

//Viewport Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Lights
const ambientLights = new Three.AmbientLight(0xffffff, 50);
scene.add(ambientLights);

//Camera
const camera = new Three.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 1800;
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

// cube variables
var secondsTensCube;
var secondsUnitCube;
var secondsUpperCube;
var minutesUnitCube;
var minutesUpperCube;
var minutesTensCube;


const loader = new GLTFLoader();
loader.load(
  "assets/scene.gltf",
  function (gltf) {
    //seconds cubes
    secondsTensCube = gltf.scene;
    secondsUnitCube = gltf.scene.clone();
    secondsUpperCube = gltf.scene.clone();

    //minutes cubes
    minutesUnitCube = gltf.scene.clone();
    minutesUpperCube = gltf.scene.clone();
    minutesTensCube = gltf.scene.clone();

    //seconds cubes positions
    secondsTensCube.position.x = 400;
    secondsUnitCube.position.x = 700;
    secondsUpperCube.position.x = 700;
    secondsUpperCube.position.y = 300;
    secondsUnitCube.rotation.x = Math.PI;

    //minutes cubes positions
    minutesUpperCube.position.y=300;
    minutesTensCube.position.x=-300;
    //adding seconds cubes to the scene
    scene.add(secondsTensCube);
    scene.add(secondsUnitCube);
    scene.add(secondsUpperCube);

    //adding minutes cubes to the scene
    scene.add(minutesUnitCube);
    scene.add(minutesUpperCube)
    scene.add(minutesTensCube)
    //handling seconds cubes rotations
    secondsUpperCube.visible = false;
    secondsUnitRotation(secondsUnitCube, secondsUpperCube, secondsUnitCubeCover);
    secondsTensRotation(secondsTensCube, secondsTensCubeCover);

    //handling minutes cubes rotations
    minutesUpperCube.visible = false; 
    minutesUnitRotation(minutesUnitCube, minutesUpperCube, minutesUnitCubeCover);
    minutesTensRotation(minutesTensCube, minutesTensCubeCover);

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
