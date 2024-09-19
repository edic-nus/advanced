import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import Stats from "three/addons/libs/stats.module.js";

// ----------------------------------------------------------------
// You can change the height of the render here
// If you need to change the width of the render, adjust the width of the div through css instead
let height = 400;

// For the following parameters, it is in the order of x , y , z
// adjust the position of the render
let position = [0, -1, 0];

// adjust the scale of the render,
// adjust this number uniformly until your render can be seen clearly as demonstrated
let scale = [0.05, 0.05, 0.05];

// adjust the rotation of the render
// it uses Euler rotation calculations
// for most cases you can work around the Math.PI / 2 value because it is a 90 degree rotation
let rotation = [-Math.PI / 2, 0, 0];

// if you want to visualize the axes for ease of development
// you can turn it by setting it to true here
let enableAxes = false;

let stlFilePath = "../assets/benchy.stl";

// ----------------------------------------------------------------
const element = document.getElementById("render");
let width = element.clientWidth;

if (width > window.innerWidth) {
  width = window.innerWidth * 0.7;
  height = (height * width) / 600;
  console.log(width, height);
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
if (enableAxes) scene.add(new THREE.AxesHelper(5));
scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));
addShadowedLight(1, 1, 1, 0xffffff, 3.5);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 2;
camera.position.x = 2;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
element.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const stats = new Stats();
document.body.appendChild(stats.dom);

function addShadowedLight(x, y, z, color, intensity) {
  const directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);

  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.bias = -0.002;
}

const loader = new STLLoader();
loader.load(
  stlFilePath,
  function (geometry) {
    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0x111111,
      shininess: 20,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);

    scene.add(mesh);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  },
);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
