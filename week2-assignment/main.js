import * as THREE from 'three';
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x202020);
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=7;
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry=new THREE.BoxGeometry(1,1,1);
const material=new THREE.MeshBasicMaterial({color:0xff0000 });
const cudeMesh=new THREE.Mesh(geometry,material);
// scene.add(cudeMesh);  

// cudeMesh.position.x=0.7;
// cudeMesh.position.y=-0.6;
// cudeMesh.position.z=1;
// cudeMesh.position.set(0.7,-0.6,1);
console.log("Distance from camera",cudeMesh.position.distanceTo(camera.position));

//Axes helper
const axes=new THREE.AxesHelper(14)
scene.add(axes)
//scaling
// cudeMesh.scale.set(2,0.25,0.5)
//rotating
// cudeMesh.rotation.x=Math.PI*0.25
// cudeMesh.rotation.y=Math.PI*0.25
// cudeMesh.rotation.z=Math.PI*0.25


// cudeMesh.position.x=0.7;
// cudeMesh.position.y=-0.6;
// cudeMesh.position.z=1;
// cudeMesh.scale.set(2,0.25,0.5)
// cudeMesh.rotation.y=Math.PI*0.25
// cudeMesh.rotation.z=Math.PI*0.25


const group=new THREE.Group()
group.scale.y=2
group.scale.x=2

scene.add(group)


function createHeartMesh(color = 0xff0000) {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,  
      depth: 2,  
      bevelEnabled: true,  
      bevelThickness: 1,  
      bevelSize: 1,  
      bevelSegments: 2,  
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ color })
    );
    mesh.scale.set(0.12,-0.12, 0.12); 
    return mesh;
}


const heart1 = createHeartMesh(0xffc0cb); 
heart1.position.x = -2.5;
group.add(heart1);

const heart2 = createHeartMesh(0x8e7cc3); 
heart2.position.x = 0;
group.add(heart2);

const heart3 = createHeartMesh(0x990000); 
heart3.position.x = 2.5;
group.add(heart3);

const light =new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);
function animate(){
    requestAnimationFrame(animate);
    // cudeMesh.rotation.x+=0.01;
    //  cudeMesh.rotation.y+=0.01;
        heart1.rotation.y += 0.01;
    heart2.rotation.y += 0.01;
    heart3.rotation.y += 0.01;
    renderer.render(scene,camera);
}
animate();
