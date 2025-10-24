/*for this a assignment i decided to chose the main entrance area of our campus
the main road to the rectorate the parking on the left and the visible buildings from the right like 
the stuent services the light green building and the bife/copyshop that you can see the pink building
and at the end of the road the rectorate builldinng where i visualy separated the lecture hall because it 
is a bit smaller then the rectorate*/
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

//camera
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(15, 10, 20);
camera.lookAt(0, 0, 0);
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//ground 
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(25, 45),
  new THREE.MeshLambertMaterial({ color: 0x008800 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.05;
scene.add(ground);

//materials
const roadMaterial = new THREE.MeshPhongMaterial({  color: 0x2f2f2f, shininess: 60});
const sidewalkMaterial = new THREE.MeshPhongMaterial({  color: 0xaaaaaa, shininess: 40 });
const roundaboutMaterial = new THREE.MeshStandardMaterial({ color: 0x0daa16, roughness: 0.5 });
const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.3 });
const lightCapMaterial = new THREE.MeshStandardMaterial({ color: 0xffd27f, emissive: 0xffd27f, emissiveIntensity: 1.5 });

//the main road and the sidewalsk
const road = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 33), roadMaterial);
road.position.set(0, 0, 6);
scene.add(road);

const sidewalkLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 33), sidewalkMaterial);
sidewalkLeft.position.set(-3, 0.05, 6);
scene.add(sidewalkLeft);

const sidewalkRight = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 33), sidewalkMaterial);
sidewalkRight.position.set(3, 0.05,6);
scene.add(sidewalkRight);

//roundabout before the buildings
const roundabout = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.2, 30), roundaboutMaterial);
roundabout.position.set(0, 0.1, -11.5);
scene.add(roundabout);

//the road before the buildings
const roadHorizontal = new THREE.Mesh(new THREE.BoxGeometry(25, 0.1, 3.8), roadMaterial);
roadHorizontal.position.set(0, 0, -12);
scene.add(roadHorizontal);

const sidewalkHorizontalLeft = new THREE.Mesh(new THREE.BoxGeometry(25, 0.1, 0.75), sidewalkMaterial);
sidewalkHorizontalLeft.position.set(0, 0.05, -10.125);
scene.add(sidewalkHorizontalLeft);

const sidewalkHorizontalRight = new THREE.Mesh(new THREE.BoxGeometry(25, 0.1, 2), sidewalkMaterial);
sidewalkHorizontalRight.position.set(0, 0.05, -15);
scene.add(sidewalkHorizontalRight);

//sidewalks
const rightSidewalkPositions = [2, 8, 16];
rightSidewalkPositions.forEach(zPos => {
  const sw = new THREE.Mesh(new THREE.BoxGeometry(9, 0.1, 1), sidewalkMaterial);
  sw.position.set(8, 0.05, zPos);
  scene.add(sw);
});



//parking area
const parking = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.1, 29),
  new THREE.MeshPhongMaterial({  color: 0x737373, shininess: 40 })
);
parking.position.set(-10, 0.05, 8);
scene.add(parking);

//four buildings: the rectorate,amfitheatre,bife entrance and the student services
const bigBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(17, 6, 6),
  new THREE.MeshStandardMaterial({ color: 0x1e90ff, metalness: 0.3, roughness: 0.4 })
);
bigBuilding.position.set(-4, 3, -18);
scene.add(bigBuilding);

const smallBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(8, 4, 4),
  new THREE.MeshStandardMaterial({ color: 0x87b8ff, metalness: 0.3, roughness: 0.4 })
);
smallBuilding.position.set(8, 2, -18);
scene.add(smallBuilding);

const lightGreenBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(7.5, 2, 3),
  new THREE.MeshStandardMaterial({ color: 0x90ee90, metalness: 0.2, roughness: 0.5 })
);
lightGreenBuilding.position.set(8.5, 1, 0);
scene.add(lightGreenBuilding);

const pinkBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(2, 3, 5),
  new THREE.MeshStandardMaterial({ color: 0xff69b4, metalness: 0.3, roughness: 0.4 })
);
pinkBuilding.position.set(11.5, 1.5, 8);
scene.add(pinkBuilding);
//lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(-10, 15, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

//streetlights adding the spotlight 
function createStreetLight(x, z) {
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 8), poleMaterial);
  pole.position.set(x, 2, z);
  scene.add(pole);

  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), lightCapMaterial);
  cap.position.set(x, 4, z);
  scene.add(cap);

  const spot = new THREE.SpotLight(0xffd27f, 35, 25, Math.PI / 4, 0.3, 2);
  spot.position.set(x, 4, z);
  spot.target.position.set(x - 1.5, 0, z);
  scene.add(spot);
  scene.add(spot.target);
}

// Place streetlights on the right sidewalk
const streetZPositions = [-10, -3, 4, 11, 17];
streetZPositions.forEach(zPos => createStreetLight(3, zPos));



window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});


function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
