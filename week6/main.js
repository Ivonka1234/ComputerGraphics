import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()
const scene=new THREE.Scene()
const ambientLight=new THREE.AmbientLight(0xffffff,0.8)
gui.add(ambientLight,'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)
const directinalLight=new THREE.DirectionalLight(0xffffff,1.3)
directinalLight.castShadow=true
directinalLight.position.set(2,2,-1)
gui.add(directinalLight,'intensity').min(0).max(3).step(0.001)
scene.add(directinalLight)

const spotLight=new THREE.SpotLight(0xffffff,2,10,Math.PI*0.3)
spotLight.castShadow=true
spotLight.position.set(0,2,2)
scene.add(spotLight)
scene.add(spotLight.target)

const pointLight=new THREE.PointLight(0xffffff,2)
pointLight.castShadow=true
pointLight.position.set(-1,1,0)
scene.add(pointLight)

const material=new THREE.MeshStandardMaterial({  color: 0xffffff,roughness:0.8})
gui.add(material,'metalness').min(0).max(1).step(0.001)
gui.add(material,'roughness').min(0).max(1).step(0.001)

const shape =new THREE.Mesh(
    new THREE.SphereGeometry(0.5,32,32),
    material
)
shape.castShadow=true
const plane=new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    material
)
plane.receiveShadow=true
plane.rotation.x=-Math.PI*0.5
plane.position.y=0

scene.add(shape,plane)

const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}

const camera= new THREE.PerspectiveCamera(
    75,
    sizes.width/sizes.height,    
    0.1,
    100 
)
camera.position.set(1,1,5)
scene.add(camera)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled=true;
renderer.setSize(sizes.width,sizes.height );
document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true

const clock=new THREE.Clock()
function tick(){
    const elapsedTime=clock.getElapsedTime()
    shape.position.x=Math.cos(elapsedTime)*1.5
    shape.position.z=Math.sin(elapsedTime)*1.5
    shape.position.y=Math.abs(Math.sin(elapsedTime*3))+ 0.5

    // sphereShadow.position.x=shape.position.x
    // sphereShadow.position.z=shape.position.z
    // sphereShadow.material.opacity=(1-shape.position.y)*0.3
    controls.update()
    renderer.render(scene,camera)
    requestAnimationFrame(tick)
}
tick()