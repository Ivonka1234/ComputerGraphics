import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Floor ===
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// Box with standard material
const standardGeometry = new THREE.BoxGeometry(1, 1, 1);
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 0xff5555,
  metalness: 0.7,
  roughness: 0.3,
  emissive:0x220044,
});
const standardMesh = new THREE.Mesh(standardGeometry, standardMaterial);
standardMesh.position.set(-2.5, 0, 0);
scene.add(standardMesh);
// Sphere with phong material
const phongGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const phongMaterial = new THREE.MeshPhongMaterial({
  color: 0x55ff55,
  shininess: 100,
  specular: 0xffffff,
});
const phongMesh = new THREE.Mesh(phongGeometry, phongMaterial);
phongMesh.position.set(0, 0, 0);
scene.add(phongMesh);
// Cone with basic material
const basicGeometry = new THREE.ConeGeometry(0.8, 1.5, 32);
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0x5555ff,
});
const basicMesh = new THREE.Mesh(basicGeometry, basicMaterial);
basicMesh.position.set(2.5, 0, 0);
scene.add(basicMesh);

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);

  standardMesh.rotation.y += 0.01;
  phongMesh.rotation.x += 0.01; 
  phongMesh.rotation.y += 0.01;

  basicMesh.rotation.x += 0.01; 
  basicMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}


animate();
